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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module) {

module.exports = JSON.parse("{\"login\":{\"1.0.0\":[{\"success\":[\"code\"]}]},\"wwReport\":{\"1.0.0\":[{\"object\":[\"logId\",\"key\",\"value\"]}]},\"chooseWxworkContact\":{\"1.0.0\":[{\"object\":[\"selected_vid\",\"type\",\"max_num\"]},{\"success\":[\"type\",\"contacts\"]}]},\"showUserProfile\":{\"1.0.0\":[{\"object\":[\"vid\"]}]},\"getEnterpriseUserInfo\":{\"1.0.0\":[{\"object\":[\"timeout\"]},{\"success\":[\"userInfo\",\"rawData\",\"signature\",\"encryptedData\",\"iv\"]}]},\"getAvatar\":{\"1.0.0\":[{\"object\":[\"timeout\"]},{\"success\":[\"avatar\"]}]},\"getCorpList\":{\"1.0.0\":[{\"success\":[\"infos\"]}]},\"getDepartmentList\":{\"1.0.0\":[{\"success\":[\"data\"]}]},\"getDepartmentUserList\":{\"1.0.0\":[{\"success\":[\"data\"]}]},\"postNotification\":{\"1.0.0\":[{\"object\":[\"name\",\"data\"]}]},\"wwLog\":{\"1.0.0\":[{\"object\":[\"level\",\"message\"]}]},\"selectConvAndAction\":{\"1.0.0\":[{\"object\":[\"actionType\",\"forbidCreateNew\",\"forbidSingleConv\",\"WeworkWelcomeHongbaoId\",\"WeworkWelcomeHongbaoWish\"]}]},\"sendMessageToWX\":{\"1.0.0\":[{\"object\":[\"text\",\"scene\",\"title\",\"description\",\"thumbImage\",\"media_message\"]}]},\"chooseWxworkVisibleRange\":{\"1.0.0\":[{\"object\":[\"range\"]}]},\"wwOpenUrlScheme\":{\"1.0.0\":[{\"object\":[\"urlScheme\"]}]},\"getQrCode\":{\"1.0.0\":[{\"object\":[\"timeout\"]},{\"success\":[\"qrCode\"]}]},\"getMobile\":{\"1.0.0\":[{\"object\":[\"timeout\"]},{\"success\":[\"encryptedData\",\"iv\"]}]},\"getEmail\":{\"1.0.0\":[{\"object\":[\"timeout\"]},{\"success\":[\"encryptedData\",\"iv\"]}]},\"selectEnterpriseContact\":{\"1.0.0\":[{\"object\":[\"fromDepartmentId\",\"mode\",\"type\",\"selectedDepartmentIds\",\"selectedUserIds\"]},{\"success\":[\"departmentList\",\"userList\"]}]},\"openEnterpriseChat\":{\"1.0.0\":[{\"object\":[\"useridlist\",\"userIds\",\"chatname\",\"groupName\",\"openIds\",\"externalUserIds\"]}]},\"selectExternalContact\":{\"1.0.0\":[{\"object\":[\"filterType\"]},{\"success\":[\"userIds\"]}]},\"openUserProfile\":{\"1.0.0\":[{\"object\":[\"type\",\"userid\"]}]},\"sendMessageToConv\":{\"1.0.0\":[{\"object\":[\"imageUrl\",\"title\",\"path\"]}]},\"updateForwardButton\":{\"1.0.0\":[{\"object\":[\"enable\"]}]},\"checkAppShareMessageEnable\":{\"1.0.0\":[{\"object\":[\"title\",\"path\"]}]},\"checkSession\":{\"1.0.0\":[]},\"authorize\":{\"1.0.0\":[{\"object\":[\"scope\"]}]},\"getUserInfo\":{\"1.0.0\":[{\"success\":[\"userInfo\",\"rawData\",\"signature\",\"encryptedData\",\"iv\"]},{\"object\":[\"withCredentials\",\"lang\",\"timeout\"]}]},\"openWechatMiniProgram\":{\"1.0.0\":[{\"object\":[\"userName\",\"path\",\"type\"]}]},\"getCurExternalContact\":{\"1.0.0\":[{\"success\":[\"userId\"]}]},\"getSetting\":{\"1.0.0\":[{\"success\":[\"authSetting\"]}]},\"getSystemInfo\":{\"1.0.0\":[{\"success\":[\"version\"]}]},\"bioassayAuthentication\":{\"1.0.0\":[{\"success\":[\"code\"],\"object\":[\"name\",\"idcard\"]}]},\"chooseAttach\":{\"1.0.0\":[{\"success\":[\"tempFilePaths\"],\"object\":[\"count\",\"sizeType\",\"sourceType\",\"tempFiles\"]}]},\"requestPayment\":{\"1.0.0\":[{\"object\":[\"timeStamp\",\"nonceStr\",\"package\",\"signType\",\"paySign\"]}]},\"shareAppMessageEx\":{\"1.0.0\":[{\"object\":[\"title\",\"imageUrl\",\"path\",\"selectedUserIds\",\"selectedExternalUserIds\"]}]},\"idcardVerify\":{\"1.0.0\":[{\"object\":[\"name\",\"idcard\"]}]},\"getNFCReaderState\":{\"1.0.0\":[{\"platform\":[\"android\"]}]},\"stopNFCReader\":{\"1.1.0\":[{\"platform\":[\"android\"]}]},\"startNFCReader\":{\"1.1.0\":[{\"platform\":[\"android\"]}]},\"onNFCReadMessage\":{\"1.1.0\":[{\"callback\":[\"messageType\",\"data\"]},{\"platform\":[\"android\"]}]},\"queryCurrHWOpenTalk\":{\"1.2.0\":[]},\"enterHWOpenTalk\":{\"1.2.0\":[{\"object\":[\"code\",\"ticket\"]}]},\"openEnterpriseContact\":{\"1.2.0\":[{\"object\":[\"departmentId\"]}]},\"startWecast\":{\"1.2.0\":[]},\"getMacAddress\":{\"1.2.1\":[{\"platform\":[\"android\"]}]},\"translateVoice\":{\"1.2.1\":[{\"object\":[\"localId\",\"isShowProgressTips\"]}]},\"openChatWithMsg\":{\"1.2.1\":[{\"object\":[\"userIds\",\"externalUserIds\",\"groupName\",\"chatId\",\"msg\"]}]},\"canIUsePrivate\":{\"1.2.1\":[{\"object\":[\"key\"]}]},\"operatePrivate\":{\"1.2.1\":[{\"object\":[\"key\",\"data\"]}]},\"bioassayFaceCompare\":{\"1.2.2\":[{\"success\":[\"code\"]}]},\"openDeviceProfile\":{\"1.2.3\":[{\"object\":[\"device_sn\"]}]},\"enableShareToWxMenuGlobal\":{\"1.2.4\":[{\"object\":[\"enable\"]}]},\"shareToExternalContact\":{\"1.2.6\":[{\"object\":[\"appid\",\"title\",\"imgUrl\",\"page\"]}],\"1.3.4\":[{\"object\":[\"appid\",\"title\",\"imgUrl\",\"page\",\"text\",\"attachments\"]}]},\"discoverDevice\":{\"1.2.7\":[{\"object\":[\"type\",\"qrcode_url\"]}]},\"applyCodeForRestrictedChat\":{\"1.2.8\":[]},\"openUrl\":{\"1.2.8\":[{\"object\":[\"title\",\"url\"]}]},\"shareToExternalChat\":{\"1.3.0\":[{\"object\":[\"appid\",\"title\",\"imgUrl\",\"page\"]}],\"1.3.4\":[{\"object\":[\"appid\",\"title\",\"imgUrl\",\"page\",\"text\",\"attachments\"]}]},\"getContext\":{\"1.3.1\":[{\"object\":[]}]},\"selectCorpGroupContact\":{\"1.3.4\":[{\"object\":[\"fromDepartmentId\",\"mode\",\"type\",\"selectedDepartmentIds\",\"selectedUserIds\",\"selectedOpenUserIds\",\"selectedCorpGroupDepartmentIds\",\"selectedCorpGroupUserIds\"]}]},\"setShareAttr\":{\"1.3.7\":[{\"object\":[\"withShareTicket\"]}]},\"getShareInfo\":{\"1.3.7\":[{\"object\":[\"shareTicket\"]}]},\"claimClassAdmin\":{\"1.3.7\":[{\"object\":[]}]},\"createCorpGroupChat\":{\"1.3.7\":[{\"object\":[\"groupName\",\"userIds\",\"openUserIds\",\"corpGroupUserIds\"]}]},\"openExistChat\":{\"1.3.7\":[{\"object\":[\"chatId\"]}]},\"updateCorpGroupChat\":{\"1.3.7\":[{\"object\":[\"chatId\",\"userIdsToAdd\",\"openUserIdsToAdd\",\"corpGroupUserIdsToAdd\"]}]},\"createSchoolPayment\":{\"1.3.7\":[{\"object\":[\"projectName\",\"amount\",\"payers\"]}]},\"shareToTrainee\":{\"1.3.8\":[{\"object\":[\"template_msg\",\"attachments\"],\"platform\":[\"android\",\"ios\"]}]},\"shareToTraineeChat\":{\"1.3.8\":[{\"object\":[\"text\",\"attachments\"],\"platform\":[\"android\",\"ios\"]}]},\"shareToExternalMoments\":{\"1.3.9\":[{\"object\":[\"text\",\"attachments\"],\"platform\":[\"android\",\"ios\"]}]},\"updateMomentsSetting\":{\"1.3.9\":[{\"object\":[\"signature\",\"imgUrl\"],\"platform\":[\"android\",\"ios\"]}]},\"navigateToKfChat\":{\"1.3.9\":[{\"object\":[\"openKfId\"]}]},\"selectPrivilegedContact\":{\"1.3.10\":[{\"object\":[\"fromDepartmentId\",\"mode\",\"selectedContextContact\",\"selectedOpenUserIds\",\"selectedTickets\"]}]},\"chooseMessageFile\":{\"1.3.11\":[{\"object\":[\"count\",\"type\",\"extension\"]}]},\"openThirdAppServiceChat\":{\"1.3.12\":[{\"object\":[]}]},\"navigateToApp\":{\"1.3.13\":[{\"object\":[\"serviceName\",\"interfaceName\",\"extraData\"],\"platform\":[\"android\",\"ios\"]}]},\"navigateBackApp\":{\"1.3.13\":[{\"object\":[\"serviceName\",\"interfaceName\",\"extraData\"],\"platform\":[\"android\",\"ios\"]}]}}");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/qy-app-service/canIUse/api.json
var api = __webpack_require__(0);

// CONCATENATED MODULE: ./src/qy-app-service/Utils.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function surroundByTryCatchFactory(fn, extend) {
  // if (getPlatform() === 'devtools') {
  //   return fn
  // }
  // 测试时不能把异常捕获，不然测试框架无法抛出正确的异常信息
  if (__wxConfig.karmaTest === true) {
    return fn;
  }

  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      if (Object.prototype.toString.apply(e) === "[object Error]") {
        if (e.type == "AppServiceSdkKnownError") {
          //已知错误，不上报，直接往上层抛
          throw e;
        } else {
          Reporter.errorReport({
            key: "appServiceSDKScriptError",
            error: e,
            extend: extend
          });
        }
      }
    }
  };
}

function _anyTypeToString(data) {
  var dataType = Object.prototype.toString.call(data).split(' ')[1].split(']')[0];

  if (dataType == 'Array' || dataType == 'Object') {
    try {
      data = JSON.stringify(data);
    } catch (e) {
      e.type = 'AppServiceSdkKnownError';
      throw e;
    }
  } else if (dataType == 'String' || dataType == 'Number' || dataType == 'Boolean') {
    data = data.toString();
  } else if (dataType == 'Date') {
    data = data.getTime().toString();
  } else if (dataType == 'Undefined') {
    data = 'undefined';
  } else if (dataType == 'Null') {
    data = 'null';
  } else {
    data = '';
  }

  return {
    data: data,
    dataType: dataType
  };
}

var anyTypeToString = surroundByTryCatchFactory(_anyTypeToString, 'anyTypeToString');

function _stringToAnyType(data, dataType) {
  if (dataType == 'String') {
    data = data;
  } else if (dataType == 'Array' || dataType == 'Object') {
    data = JSON.parse(data);
  } else if (dataType == 'Number') {
    data = parseFloat(data);
  } else if (dataType == 'Boolean') {
    data = data == 'true';
  } else if (dataType == 'Date') {
    data = new Date(parseInt(data));
  } else if (dataType == 'Undefined') {
    data = undefined;
  } else if (dataType == 'Null') {
    data = null;
  } else {
    data = '';
  }

  return data;
}

var stringToAnyType = surroundByTryCatchFactory(_stringToAnyType, 'stringToAnyType');
function getDataType(data) {
  return Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
}
function isObject(object) {
  return getDataType(object) === 'Object';
}
/**
必填参数的类型校验
*/

function paramCheck(value, expect) {
  var dept = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "parameter";
  var type = getDataType(expect);
  var valueType = getDataType(value);

  if (valueType != type) {
    return "".concat(dept, " should be ").concat(type, " instead of ").concat(valueType, ";");
  }

  result = "";

  switch (type) {
    case "Object":
      for (var key in expect) {
        result += paramCheck(value[key], expect[key], "".concat(dept, ".").concat(key));
      }

      break;

    case "Array":
      if (value.length < expect.length) {
        return "".concat(dept, " should have at least ").concat(expect.length, " item;");
      }

      for (var i = 0; i < expect.length; ++i) {
        result += paramCheck(value[i], expect[i], "".concat(dept, "[").concat(i, "]"));
      }

      break;

    default:
      break;
  }

  return result;
}
function getRealRoute(lastRoute, relativeRoute) {
  var needTrans = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (relativeRoute) {
    //console.log('relativeRoute', relativeRoute)
    if (needTrans) {
      relativeRoute = transWxmlToHtml(relativeRoute);
    }

    if (relativeRoute.indexOf('/') === 0) {
      // 如果相对路径是 / 开头，则直接返回
      return relativeRoute.substr(1);
    } else if (relativeRoute.indexOf('./') === 0) {
      // 如果是以 ./ 开头，则把 ./ 去掉
      return getRealRoute(lastRoute, relativeRoute.substr(2), false);
    } else {
      // 计算具体路径
      var relativeRouteParts = relativeRoute.split('/');
      var i, len;

      for (i = 0, len = relativeRouteParts.length; i < len; i++) {
        if (relativeRouteParts[i] !== '..') {
          break;
        }
      }

      relativeRouteParts.splice(0, i);
      var relativeRoute = relativeRouteParts.join('/');
      var lastRouteParts = lastRoute.length > 0 ? lastRoute.split('/') : [];
      lastRouteParts.splice(lastRouteParts.length - i - 1, i + 1);
      var finalRouteParts = lastRouteParts.concat(relativeRouteParts);
      var finalRoute = finalRouteParts.join('/');
      return finalRoute;
    }
  }(relativeRoute);
}
function getPlatform() {
  if (typeof window !== 'undefined' && window.navigator) {
    // 有 UA ，可能是 devtools 或旧的 Android
    if (window.navigator.userAgent.indexOf('appservice') > -1) {
      return 'devtools';
    } else if (window.navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      return 'android';
    } else {
      return '';
    }
  } else {
    // 没有 UA ，可能是 iOS 或新的 Android
    if (__wxConfig.platform === 'android') {
      return 'android';
    } else if (__wxConfig.platform === 'devtools') {
      return 'devtools';
    } else {
      return 'ios';
    }
  }
}
function urlEncodeFormData(data) {
  var needEncode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (_typeof(data) !== 'object') {
    return data;
  }

  var dataArray = [];

  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      if (needEncode) {
        try {
          dataArray.push("".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(data[k])));
        } catch (e) {
          dataArray.push("".concat(k, "=").concat(data[k]));
        }
      } else {
        dataArray.push("".concat(k, "=").concat(data[k]));
      }
    }
  }

  return dataArray.join('&');
}
function addQueryStringToUrl(url, data) {
  if (typeof url === 'string' && _typeof(data) === 'object' && Object.keys(data).length > 0) {
    var parts = url.split('?');
    var path = parts[0];
    var query = (parts[1] || '').split('&').reduce(function (pre, cur) {
      if (typeof cur === 'string' && cur.length > 0) {
        var _parts = cur.split('=');

        var key = _parts[0];
        var value = _parts[1];
        pre[key] = value;
      }

      return pre;
    }, {}); // 把 data 中的数据 encodeURIComponent

    var encodedData = Object.keys(data).reduce(function (ret, key) {
      if (_typeof(data[key]) === 'object') {
        ret[encodeURIComponent(key)] = encodeURIComponent(JSON.stringify(data[key]));
      } else {
        ret[encodeURIComponent(key)] = encodeURIComponent(data[key]);
      }

      return ret;
    }, {});
    return path + '?' + urlEncodeFormData(Utils_assign(query, encodedData));
  } else {
    return url;
  }
}
function validateUrl(url) {
  return /^(http|https):\/\/.*/i.test(url);
}
function Utils_assign() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  return objects.reduce(function (pre, cur) {
    for (var key in cur) {
      pre[key] = cur[key];
    }

    return pre;
  }, {});
}
function encodeUrlQuery(url) {
  if (typeof url === 'string') {
    var parts = url.split('?');
    var path = parts[0];
    var query = (parts[1] || '').split('&').reduce(function (pre, cur) {
      if (typeof cur === 'string' && cur.length > 0) {
        var _parts2 = cur.split('=');

        var key = _parts2[0];
        var value = _parts2[1];
        pre[key] = value;
      }

      return pre;
    }, {});
    var queryArray = [];

    for (var k in query) {
      if (query.hasOwnProperty(k)) {
        queryArray.push("".concat(k, "=").concat(encodeURIComponent(query[k])));
      }
    }

    if (queryArray.length > 0) {
      return "".concat(path, "?").concat(queryArray.join('&'));
    } else {
      return url;
    }
  } else {
    return url;
  }
}
function transWxmlToHtml(url) {
  if (typeof url !== 'string') {
    return url; //throw new AppServiceSdkKnownError('invalid url:' + url)
  } else {
    var path = url.split('?')[0];
    var query = url.split('?')[1]; //if (path.lastIndexOf('wxml') === path.length - 4) {
    //path = path.substring(0, path.length - 4) + 'html'
    //}
    // 调用时不写后缀名，直接在后面加 .html 后缀

    path += '.html';

    if (typeof query !== 'undefined') {
      return "".concat(path, "?").concat(query);
    } else {
      return path;
    }
  }
}
function removeHtmlSuffixFromUrl(url) {
  if (typeof url === 'string') {
    if (url.indexOf('?') !== -1) {
      return url.replace(/\.html\?/, '?');
    } else {
      return url.replace(/\.html$/, '');
    }
  } else {
    return url;
  }
} //AppServiceSdk 已知错误类型

var AppServiceSdkKnownError = /*#__PURE__*/function (_Error) {
  _inherits(AppServiceSdkKnownError, _Error);

  var _super = _createSuper(AppServiceSdkKnownError);

  function AppServiceSdkKnownError(msg) {
    var _this;

    _classCallCheck(this, AppServiceSdkKnownError);

    _this = _super.call(this, "APP-SERVICE-SDK:".concat(msg));
    _this.type = "AppServiceSdkKnownError";
    return _this;
  }

  return AppServiceSdkKnownError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }

  return to;
} // src: https://github.com/davidchambers/Base64.js/blob/master/base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

var btoa = btoa || function (input) {
  var str = String(input);
  var output = '';

  for (var block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);

    if (charCode > 0xFF) {
      throw new Error('"btoa" failed');
    }

    block = block << 8 | charCode;
  }

  return output;
};

var atob = atob || function (input) {
  var str = String(input).replace(/=+$/, '');
  var output = '';

  if (str.length % 4 === 1) {
    throw new Error('"atob" failed');
  }

  for (var bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

function arrayBufferToBase64(buffer) {
  var binaryString = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;

  for (var i = 0; i < len; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }

  return btoa(binaryString);
}
function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var len = binaryString.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
} // 这个接口不应该在 iOS 被调用，iOS JSCore 没有 Blob 和 FileReader

function blobToArrayBuffer(blob, callback) {
  var fileReader = new FileReader();

  fileReader.onload = function () {
    callback(this.result);
  };

  fileReader.readAsArrayBuffer(blob);
} // 把一个 Object 中的 value 都转换成 String 类型

function convertObjectValueToString(object) {
  return Object.keys(object).reduce(function (ret, key) {
    if (typeof object[key] === 'string') {
      ret[key] = object[key];
    } else if (typeof object[key] === 'number') {
      ret[key] = object[key] + '';
    } else {
      ret[key] = Object.prototype.toString.apply(object[key]);
    }

    return ret;
  }, {});
}
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
var clientVersion = __wxConfig.clientVersion || 1; //检查是否大于某个版本，输入参数是上一个发布版本

function checkClientVersion(ios, android) {
  var platform = getPlatform();

  switch (platform) {
    case 'devtools':
      {
        return true;
      }

    case 'ios':
      {
        return clientVersion > ios;
      }

    case 'android':
      {
        return clientVersion > android;
      }
  }

  return false;
}
function renameProperty(object, oldName, newName) {
  if (isObject(object) === false || oldName == newName) {
    return;
  }

  if (object.hasOwnProperty(oldName)) {
    object[newName] = object[oldName];
    delete object[oldName];
  }
}
function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }

  while (v2.length < len) {
    v2.push('0');
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i]);
    var num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
// CONCATENATED MODULE: ./src/qy-app-service/config.js
/* harmony default export */ var qy_app_service_config = ({
  "SDKVersion": "1.3.13"
});
// CONCATENATED MODULE: ./src/qy-app-service/canIUse/index.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function canIUse_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { canIUse_typeof = function _typeof(obj) { return typeof obj; }; } else { canIUse_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return canIUse_typeof(obj); }





var keysOfAPI = Object.keys(api);
/*
 * 从 obj 中找出符合条件的 version 列表
 */

var canIUse_getValidVersions = function getValidVersions(SDKVersion, name, obj) {
  if (!name) {
    return [];
  }

  var keys = Object.keys(obj);
  var index = keys.indexOf(name);

  if (index === -1) {
    return [];
  } else {
    var item = obj[keys[index]];
    var validVersions = Object.keys(item).filter(function (currentVersion) {
      return compareVersion(currentVersion, SDKVersion) <= 0 && canIUse_comparePlatForm(item[currentVersion]);
    });
    return validVersions;
  }
};

var canIUse_comparePlatForm = function comparePlatForm() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var platform = getPlatform();
  var result = true;

  for (var i = 0; i < config.length; i++) {
    if (config[i].platform) {
      result = config[i].platform.indexOf(platform) > -1;
    }
  }

  return result;
}; // 指定合法版本号，从列表返回符合条件的子项目


var getValidItemsWithSpecificVersions = function getValidItemsWithSpecificVersions(validVersions, list, key) {
  var ret = undefined;

  for (var i = 0; i < validVersions.length; i++) {
    var currentVersion = list[validVersions[i]];

    for (var j = 0; j < currentVersion.length; j++) {
      var currentProperty = currentVersion[j];

      if (typeof currentProperty === 'string' && currentProperty === key) {
        if (ret === undefined) {
          ret = [];
        }

        break;
      } else if (canIUse_typeof(currentProperty) === 'object' && currentProperty.hasOwnProperty(key)) {
        if (typeof ret === 'undefined') {
          ret = currentProperty[key];
        } else {
          ret = ret.concat(currentProperty[key]);
        }

        break;
      }
    }
  }

  return ret;
};
/*
 * 从 list 中找到一个 key 是否存在，数组的每一项是一个字符串或一个 Object，并返回其值
 *
 *"list": [
 *  "duration",
 *  {
 *    "timingFunction": [
 *      "linear",
 *      "ease",
 *      "ease-in",
 *      "ease-in-out",
 *      "ease-out",
 *      "step-start",
 *      "step-end"
 *    ]
 *  },
 *  "delay",
 *  "transformOrigin"
 *]
 */


var getValidItem = function getValidItem(list, key) {
  for (var i = 0; i < list.length; i++) {
    if (typeof list[i] === 'string' && list[i] === key) {
      return [];
    } else if (canIUse_typeof(list[i]) === 'object' && list[i].hasOwnProperty(key)) {
      return list[i][key];
    }
  }

  return undefined;
}; // 返回一个组件支持的某个属性


var getValidProperty = function getValidProperty(validVersions, component, property) {
  return getValidItemsWithSpecificVersions(validVersions, component, property);
}; // 返回一个接口支持的参数


var getValidArg = function getValidArg(validVersions, API, arg) {
  return getValidItemsWithSpecificVersions(validVersions, API, arg);
};

var canIUse_checkAPIs = function checkAPIs(SDKVersion, name, arg, property, value) {
  var validVersions;
  var validArgs;
  var validProperties;
  var validValues;
  validVersions = canIUse_getValidVersions(SDKVersion, name, api);

  if (validVersions.length === 0) {
    return false;
  } // 有 arg，检查 arg


  if (arg) {
    var API = api[name];
    validArgs = getValidArg(validVersions, API, arg);

    if (typeof validArgs === 'undefined') {
      return false;
    }
  } // 有 property，检查 property


  if (property) {
    validProperties = getValidItem(validArgs, property);

    if (typeof validProperties === 'undefined') {
      return false;
    }
  } // 有 value，检查 value


  if (value) {
    validValues = getValidItem(validProperties, value);

    if (typeof validValues === 'undefined') {
      return false;
    }
  }

  return true;
};

var canIUse_canIUse = function canIUse() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var customVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : qy_app_service_config.SDKVersion;

  if (typeof schema !== 'string') {
    throw new AppServiceSdkKnownError('canIUse: schema should be an object');
  }

  var parts = schema.split('.');

  if (canIUse_checkAPIs.apply(void 0, [customVersion].concat(_toConsumableArray(parts)))) {
    return true;
  }

  return false;
};


// CONCATENATED MODULE: ./src/qy-app-service/qyInterface.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // import { invokeMethod } from './BaseMethods'

var invokeMethod = null;
var onMethod = null;

function initInvokeHander() {
  try {
    var methods = wx.getBaseMethods(); // 这个方案只能被执行一次

    invokeMethod = methods.invokeMethod;
    onMethod = methods.onMethod;
  } catch (e) {}
}

if (getPlatform() === 'devtools') {
  if (typeof window != 'undefined') {
    window.initInvokeHander = initInvokeHander;
  }
} else {
  initInvokeHander();
}

var initOnPageCall = function initOnPageCall() {
  onMethod('onCheckAppShareMessageEnable', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var args,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              _context.next = 3;
              return invokeShareByKey('checkAppShareMessageEnable', args);

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function () {
      return _ref.apply(this, arguments);
    };
  }());
  onMethod('onForwardAppMessage', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var args,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              args = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _context2.next = 3;
              return invokeShareByKey('sendMessageToConv', args);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function () {
      return _ref2.apply(this, arguments);
    };
  }());
  onMethod('onNFCReadMessage', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var args,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _context3.next = 3;
              return invokeInCurrentPage('onNFCReadMessage', args);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function () {
      return _ref3.apply(this, arguments);
    };
  }());
  onMethod('onUserOpStatistic', /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var args,
          _args4 = arguments;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              args = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              _context4.next = 3;
              return invokeInCurrentPage('onUserOpStatistic', args);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function () {
      return _ref4.apply(this, arguments);
    };
  }());
};

var invokeShareByKey = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, args) {
    var pages, customShareData, shareData;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            pages = getCurrentPages();

            if (!(pages && pages.length > 0)) {
              _context5.next = 20;
              break;
            }

            _context5.next = 4;
            return invokeInCurrentPage('onShareAppMessage', args);

          case 4:
            _context5.t0 = _context5.sent;

            if (_context5.t0) {
              _context5.next = 7;
              break;
            }

            _context5.t0 = {};

          case 7:
            customShareData = _context5.t0;
            shareData = args;
            console.log('customShareData', customShareData);
            shareData.title = customShareData.title && typeof customShareData.title === 'string' ? customShareData.title : shareData.title;
            shareData.desc = customShareData.desc && typeof customShareData.desc === 'string' ? customShareData.desc : shareData.desc;

            if (typeof customShareData.imageUrl === 'string') {
              if (customShareData.imageUrl && !/^(http|https|wxfile|cloud):\/\//.test(customShareData.imageUrl)) {
                shareData.imageUrl = _getRealRoute('', customShareData.imageUrl || '');
              } else {
                shareData.imageUrl = customShareData.imageUrl;
              }
            }

            shareData.path = customShareData.path && typeof customShareData.path === 'string' ? addHtmlSuffixToUrl(customShareData.path) : shareData.path;
            shareData.success = customShareData.success;
            shareData.cancel = customShareData.cancel;
            shareData.fail = customShareData.fail;
            shareData.complete = customShareData.complete; // args[0] = shareData;

            invokeMethod("qy__".concat(key), shareData);
            return _context5.abrupt("return", shareData);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function invokeShareByKey(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();

var invokeInCurrentPage = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key) {
    var args,
        pages,
        currentPage,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            args = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            pages = getCurrentPages();

            if (!(pages && pages.length > 0)) {
              _context6.next = 7;
              break;
            }

            currentPage = pages[pages.length - 1];
            _context6.next = 6;
            return currentPage[key] && currentPage[key](args);

          case 6:
            return _context6.abrupt("return", _context6.sent);

          case 7:
            return _context6.abrupt("return", null);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function invokeInCurrentPage(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var addHtmlSuffixToUrl = function addHtmlSuffixToUrl(url) {
  if (typeof url !== 'string') {
    return url;
  }

  var path = url.split('?')[0];
  var query = url.split('?')[1];
  path += '.html';

  if (typeof query !== 'undefined') {
    return "".concat(path, "?").concat(query);
  }

  return path;
};

function _getRealRoute(lastRoute, relativeRoute) {
  if (relativeRoute.indexOf('/') === 0) {
    // 如果相对路径是 / 开头，则直接返回
    return relativeRoute.substr(1);
  } else if (relativeRoute.indexOf('./') === 0) {
    // 如果是以 ./ 开头，则把 ./ 去掉
    return _getRealRoute(lastRoute, relativeRoute.substr(2), false);
  } else {
    // 计算具体路径
    var relativeRouteParts = relativeRoute.split('/');
    var i;
    var len;

    for (i = 0, len = relativeRouteParts.length; i < len; i++) {
      if (relativeRouteParts[i] !== '..') {
        break;
      }
    }

    relativeRouteParts.splice(0, i);
    var lastRouteParts = lastRoute.length > 0 ? lastRoute.split('/') : [];
    lastRouteParts.splice(lastRouteParts.length - i - 1, i + 1);
    var finalRouteParts = lastRouteParts.concat(relativeRouteParts);
    var finalRoute = finalRouteParts.join('/');
    return finalRoute;
  }
}

if (getPlatform() === 'android') {
  initOnPageCall();
}

var login = function login() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  /*  */
  invokeMethod('qy__login', args, {});
};

var wwReport = function wwReport() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__wwReport', args, {});
};

var chooseWxworkContact = function chooseWxworkContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__chooseWxworkContact', args, {});
};

var showUserProfile = function showUserProfile() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__showUserProfile', args, {});
};

var getCorpList = function getCorpList() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getCorpList', args, {});
};

var getDepartmentList = function getDepartmentList() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getDepartmentList', args, {});
};

var getDepartmentUserList = function getDepartmentUserList() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getDepartmentUserList', args, {});
};

var postNotification = function postNotification() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__postNotification', args, {});
};

var wwLog = function wwLog() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__wwLog', args, {});
};

var selectConvAndAction = function selectConvAndAction() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__selectConvAndAction', args, {});
};

var sendMessageToWX = function sendMessageToWX() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__sendMessageToWX', args, {});
};

var chooseWxworkVisibleRange = function chooseWxworkVisibleRange() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__chooseWxworkVisibleRange', args, {});
};

var wwOpenUrlScheme = function wwOpenUrlScheme() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__wwOpenUrlScheme', args, {});
};

var openEnterpriseChat = function openEnterpriseChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openEnterpriseChat', args, {});
};

var selectEnterpriseContact = function selectEnterpriseContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__selectEnterpriseContact', args, {});
};

var selectExternalContact = function selectExternalContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__selectExternalContact', args, {});
};

var openUserProfile = function openUserProfile() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openUserProfile', args, {});
};

var getEnterpriseUserInfo = function getEnterpriseUserInfo() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getEnterpriseUserInfo', args, {});
};

var getMobile = function getMobile() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getMobile', args, {});
};

var getEmail = function getEmail() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getEmail', args, {});
};

var getAvatar = function getAvatar() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getAvatar', args, {});
};

var getQrCode = function getQrCode() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getQrCode', args, {});
};

var sendMessageToConv = function sendMessageToConv() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__sendMessageToConv', args, {});
};

var updateForwardButton = function updateForwardButton() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__updateForwardButton', args, {});
};

var checkAppShareMessageEnable = function checkAppShareMessageEnable() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__checkAppShareMessageEnable', args, {});
};

var checkSession = function checkSession() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__checkSession', args, {});
};

var authorize = function authorize() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__authorize', args, {});
};

var getUserInfo = function getUserInfo() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getUserInfo', args, {});
};

var openWechatMiniProgram = function openWechatMiniProgram() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openWechatMiniProgram', args, {});
};

var openWechatWebviewUrl = function openWechatWebviewUrl() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openWechatWebviewUrl', args, {});
};

var getCurExternalContact = function getCurExternalContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getCurExternalContact', args, {});
};

var getSetting = function getSetting() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getSetting', args, {});
};

var getSystemInfo = function getSystemInfo() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getSystemInfo', args, {});
};

var bioassayAuthentication = function bioassayAuthentication() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__bioassayAuthentication', args, {});
};

var chooseAttach = function chooseAttach() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__chooseAttach', args, {});
};

var requestPayment = function requestPayment() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__requestPayment', args, {});
};

var shareAppMessageEx = function shareAppMessageEx() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareAppMessageEx', args, {});
};

var idcardVerify = function idcardVerify() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__idcardVerify', args, {});
};

var openEnterpriseContact = function openEnterpriseContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openEnterpriseContact', args, {});
};

var chooseInvoice = function chooseInvoice() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__chooseInvoice', args, {});
};

var getNFCReaderState = function getNFCReaderState() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getNFCReaderState', args, {});
};

var startNFCReader = function startNFCReader() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__startNFCReader', args, {});
};

var stopNFCReader = function stopNFCReader() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__stopNFCReader', args, {});
};

var queryCurrHWOpenTalk = function queryCurrHWOpenTalk() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__queryCurrHWOpenTalk', args, {});
};

var enterHWOpenTalk = function enterHWOpenTalk() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__enterHWOpenTalk', args, {});
};

var startWecast = function startWecast() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__startWecast', args, {});
};

var getMacAddress = function getMacAddress() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getMacAddress', args, {});
};

var translateVoice = function translateVoice() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__translateVoice', args, {});
};

var openChatWithMsg = function openChatWithMsg() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openChatWithMsg', args, {});
};

var canIUsePrivate = function canIUsePrivate() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__canIUsePrivate', args, {});
};

var operatePrivate = function operatePrivate() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__operatePrivate', args, {});
};

var bioassayFaceCompare = function bioassayFaceCompare() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__bioassayFaceCompare', args, {});
};

var openDeviceProfile = function openDeviceProfile() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openDeviceProfile', args, {});
};

var enableShareToWxMenuGlobal = function enableShareToWxMenuGlobal() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__enableShareToWxMenuGlobal', args, {});
};

var shareToExternalContact = function shareToExternalContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareToExternalContact', args, {});
};

var discoverDevice = function discoverDevice() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__discoverDevice', args, {});
};

var applyCodeForRestrictedChat = function applyCodeForRestrictedChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__applyCodeForRestrictedChat', args, {});
};

var openUrl = function openUrl() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openUrl', args, {});
};

var shareToExternalChat = function shareToExternalChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareToExternalChat', args, {});
};

var getCurExternalChat = function getCurExternalChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getCurExternalChat', args, {});
};

var sendChatMessage = function sendChatMessage() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__sendChatMessage', args, {});
};

var getContext = function getContext() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getContext', args, {});
};

var updateEnterpriseChat = function updateEnterpriseChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__updateEnterpriseChat', args, {});
};

var openWebview = function openWebview() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openWebview', args, {});
};

var navigateToAddCustomer = function navigateToAddCustomer() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__navigateToAddCustomer', args, {});
};

var shareAppMessageToAdmin = function shareAppMessageToAdmin() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareAppMessageToAdmin', args, {});
};

var openSystemBrowserWithSt = function openSystemBrowserWithSt() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openSystemBrowserWithSt', args, {});
};

var startMeeting = function startMeeting() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__startMeeting', args, {});
};

var startLiving = function startLiving() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__startLiving', args, {});
};

var replayLiving = function replayLiving() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__replayLiving', args, {});
};

var downloadLivingReplay = function downloadLivingReplay() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__downloadLivingReplay', args, {});
};

var navigateBackNative = function navigateBackNative() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__navigateBackNative', args, {});
};

var hideChatAttachmentMenu = function hideChatAttachmentMenu() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__hideChatAttachmentMenu', args, {});
};

var selectCorpGroupContact = function selectCorpGroupContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__selectCorpGroupContact', args, {});
};

var setShareAttr = function setShareAttr() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__setShareAttr', args, {});
};

var getShareInfo = function getShareInfo() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__getShareInfo', args, {});
};

var claimClassAdmin = function claimClassAdmin() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__claimClassAdmin', args, {});
};

var createCorpGroupChat = function createCorpGroupChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__createCorpGroupChat', args, {});
};

var openExistChat = function openExistChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openExistChat', args, {});
};

var updateCorpGroupChat = function updateCorpGroupChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__updateCorpGroupChat', args, {});
};

var createSchoolPayment = function createSchoolPayment() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__createSchoolPayment', args, {});
};

var shareToTrainee = function shareToTrainee() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareToTrainee', args, {});
};

var shareToTraineeChat = function shareToTraineeChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareToTraineeChat', args, {});
};

var updateMomentsSetting = function updateMomentsSetting() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__updateMomentsSetting', args, {});
};

var shareToExternalMoments = function shareToExternalMoments() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__shareToExternalMoments', args, {});
};

var navigateToKfChat = function navigateToKfChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__navigateToKfChat', args, {});
};

var selectPrivilegedContact = function selectPrivilegedContact() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__selectPrivilegedContact', args, {});
};

var chooseMessageFile = function chooseMessageFile() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__chooseMessageFile', args, {});
};

var openThirdAppServiceChat = function openThirdAppServiceChat() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__openThirdAppServiceChat', args, {});
};

var navigateToApp = function navigateToApp() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__navigateToApp', args, {});
};

var navigateBackApp = function navigateBackApp() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  invokeMethod('qy__navigateBackApp', args, {});
};

/* harmony default export */ var qyInterface = ({
  login: login,
  wwLog: wwLog,
  wwReport: wwReport,
  updateEnterpriseChat: updateEnterpriseChat,
  getMobile: getMobile,
  getEmail: getEmail,
  getQrCode: getQrCode,
  getAvatar: getAvatar,
  authorize: authorize,
  getUserInfo: getUserInfo,
  checkSession: checkSession,
  getCorpList: getCorpList,
  getSetting: getSetting,
  chooseAttach: chooseAttach,
  getSystemInfo: getSystemInfo,
  updateForwardButton: updateForwardButton,
  sendMessageToConv: sendMessageToConv,
  openUserProfile: openUserProfile,
  wwOpenUrlScheme: wwOpenUrlScheme,
  sendMessageToWX: sendMessageToWX,
  showUserProfile: showUserProfile,
  postNotification: postNotification,
  getEnterpriseUserInfo: getEnterpriseUserInfo,
  selectExternalContact: selectExternalContact,
  chooseWxworkContact: chooseWxworkContact,
  getDepartmentList: getDepartmentList,
  openEnterpriseChat: openEnterpriseChat,
  selectConvAndAction: selectConvAndAction,
  selectEnterpriseContact: selectEnterpriseContact,
  getDepartmentUserList: getDepartmentUserList,
  getCurExternalContact: getCurExternalContact,
  openWechatMiniProgram: openWechatMiniProgram,
  chooseWxworkVisibleRange: chooseWxworkVisibleRange,
  checkAppShareMessageEnable: checkAppShareMessageEnable,
  bioassayAuthentication: bioassayAuthentication,
  requestPayment: requestPayment,
  shareAppMessageEx: shareAppMessageEx,
  idcardVerify: idcardVerify,
  openEnterpriseContact: openEnterpriseContact,
  // chooseInvoice,
  getNFCReaderState: getNFCReaderState,
  startNFCReader: startNFCReader,
  stopNFCReader: stopNFCReader,
  enterHWOpenTalk: enterHWOpenTalk,
  queryCurrHWOpenTalk: queryCurrHWOpenTalk,
  startWecast: startWecast,
  getMacAddress: getMacAddress,
  translateVoice: translateVoice,
  openChatWithMsg: openChatWithMsg,
  canIUsePrivate: canIUsePrivate,
  operatePrivate: operatePrivate,
  bioassayFaceCompare: bioassayFaceCompare,
  openDeviceProfile: openDeviceProfile,
  enableShareToWxMenuGlobal: enableShareToWxMenuGlobal,
  shareToExternalContact: shareToExternalContact,
  discoverDevice: discoverDevice,
  applyCodeForRestrictedChat: applyCodeForRestrictedChat,
  openWechatWebviewUrl: openWechatWebviewUrl,
  openUrl: openUrl,
  shareToExternalChat: shareToExternalChat,
  sendChatMessage: sendChatMessage,
  getCurExternalChat: getCurExternalChat,
  getContext: getContext,
  openWebview: openWebview,
  navigateToAddCustomer: navigateToAddCustomer,
  shareAppMessageToAdmin: shareAppMessageToAdmin,
  openSystemBrowserWithSt: openSystemBrowserWithSt,
  startMeeting: startMeeting,
  startLiving: startLiving,
  replayLiving: replayLiving,
  downloadLivingReplay: downloadLivingReplay,
  navigateBackNative: navigateBackNative,
  selectCorpGroupContact: selectCorpGroupContact,
  setShareAttr: setShareAttr,
  getShareInfo: getShareInfo,
  claimClassAdmin: claimClassAdmin,
  createCorpGroupChat: createCorpGroupChat,
  openExistChat: openExistChat,
  updateCorpGroupChat: updateCorpGroupChat,
  createSchoolPayment: createSchoolPayment,
  shareToTrainee: shareToTrainee,
  shareToTraineeChat: shareToTraineeChat,
  updateMomentsSetting: updateMomentsSetting,
  shareToExternalMoments: shareToExternalMoments,
  navigateToKfChat: navigateToKfChat,
  selectPrivilegedContact: selectPrivilegedContact,
  chooseMessageFile: chooseMessageFile,
  openThirdAppServiceChat: openThirdAppServiceChat,
  navigateToApp: navigateToApp,
  navigateBackApp: navigateBackApp
});
// CONCATENATED MODULE: ./src/qy-app-service/index.js



 // import { initOnPageCall } from './qyCallback'

qyInterface.canIUse = canIUse_canIUse;
qyInterface.version = {
  updateTime: "2020.9.09 16:00:00",
  info: "",
  version: qy_app_service_config.SDKVersion
};
qyInterface.isWxLoginSupport = true;

if (getPlatform() == 'ios') {
  delete qyInterface.getNFCReaderState;
  delete qyInterface.startNFCReader;
  delete qyInterface.stopNFCReader;
  delete qyInterface.getMacAddress;
} else if (getPlatform() == 'android') {// delete ios only interface
} // initOnPageCall();


wx.qy = qyInterface;

/***/ })
/******/ ]);