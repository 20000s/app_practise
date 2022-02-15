(function() {
  /* eslint-disable no-unreachable */
  try {
    
var targets = {
  Function: Function,
  Object: Object,
  Array: Array,
  String: String,
  WeakMap: WeakMap,
  Element: Element,
  ShadowRoot: ShadowRoot
};
var sandbox = Object.create(null);
define(sandbox, 'protected', Object.create(null));
define(sandbox, 'singleton', Object.create(null));

for (var _i = 0, _Object$keys = Object.keys(targets); _i < _Object$keys.length; _i++) {
  var name = _Object$keys[_i];
  define(sandbox.singleton, name, targets[name]);
  define(sandbox["protected"], name, protectObject(targets[name]));

  if (targets[name].prototype) {
    define(sandbox["protected"][name], 'prototype', protectObject(targets[name].prototype));
    Object.freeze(sandbox["protected"][name].prototype);
  }

  Object.freeze(sandbox["protected"][name]);
}
/**
 * 因为 `Function.prototype.call` 可能被篡改，因此将 `Function.prototype.call.call` 保存下来
 *
 * `WeixinSandBox.singleton.call(A, ...args) === A.call(...args)`
 */


define(sandbox.singleton, 'call', Function.prototype.call.bind(Function.prototype.call));
/**
 * 业务侧判断 `WeixinSandBox.__secret__` 与客户端注入的相等，以此确保 `WeixinSandBox` 是安全的
 */

Object.defineProperty(sandbox, '__secret__', {
  value: '__WEIXIN_SANDBOX_SECRET_VALUE__'
});
Object.freeze(sandbox["protected"]);
Object.freeze(sandbox.singleton);
Object.freeze(sandbox);
define(window, 'WeixinSandBox', sandbox);

function define(object, key, value) {
  Object.defineProperty(object, key, {
    value: value,
    enumerable: true
  });
}

function protectObject(object) {
  var descriptors = Object.getOwnPropertyDescriptors(object);
  var result = Object.create(null);

  for (var _i2 = 0, _Object$keys2 = Object.keys(descriptors); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];

    if (key === 'prototype') {
      continue;
    }

    var item = Object.create(null);
    define(item, 'value', descriptors[key].value);
    define(item, 'get', descriptors[key].get);
    define(item, 'set', descriptors[key].set);
    define(result, key, Object.freeze(item));
  }

  return result;
}

  } catch (error) {
    reportError(error)
  }
  function reportError(error) {
    var encode = window.encodeURIComponent;
    try {
      var img = new window.Image();
      var href = encode(window.location.href);
      var msg = encode(JSON.stringify({ msg: error.message, stack: error.stack }));
      img.src = '//badjs2.qq.com/badjs?id=1385&uin=1008&from=' + href + '&msg[0]=' + msg + '&target[0]=wwperf.js&level[0]=4&count=1&_t=' + (+new Date());
    } catch (error) {
      // noop
    }
  }
})()
