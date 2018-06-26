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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(17);
} else {
  module.exports = require('./cjs/react.development.js');
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(12);

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._75 = 0;
  this._83 = 0;
  this._18 = null;
  this._38 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._47 = null;
Promise._71 = null;
Promise._44 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._83 === 3) {
    self = self._18;
  }
  if (Promise._47) {
    Promise._47(self);
  }
  if (self._83 === 0) {
    if (self._75 === 0) {
      self._75 = 1;
      self._38 = deferred;
      return;
    }
    if (self._75 === 1) {
      self._75 = 2;
      self._38 = [self._38, deferred];
      return;
    }
    self._38.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._83 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._83 === 1) {
        resolve(deferred.promise, self._18);
      } else {
        reject(deferred.promise, self._18);
      }
      return;
    }
    var ret = tryCallOne(cb, self._18);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._83 = 3;
      self._18 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._83 = 1;
  self._18 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._83 = 2;
  self._18 = newValue;
  if (Promise._71) {
    Promise._71(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._75 === 1) {
    handle(self, self._38);
    self._38 = null;
  }
  if (self._75 === 2) {
    for (var i = 0; i < self._38.length; i++) {
      handle(self, self._38[i]);
    }
    self._38 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


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
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	STRING: 'string',
  ARRAY: 'array',
  ARRAY_MULTIPLE: 'array_multiple',
  ARRAY_INDEX: 'array_index',
  ARRAY_EQUAL: 'array_equal',
  OBJECT: 'object',
  ALL: 'all'
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Format = __webpack_require__(35)

/** @function
 * @name Format
 * @param {Array} response data
*/
module.exports = (data) => {
	if(data === null)
		return Format.badRequest('Bad Request', [])
	else if (!data.length)
		return Format.notFound('No data Found', [])
  else
    return Format.success('OK', data)
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(10);
module.exports = __webpack_require__(15);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  __webpack_require__(11).enable();
  window.Promise = __webpack_require__(13);
}

// fetch() polyfill for making API calls.
__webpack_require__(14);

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(1);

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (false) {
  require('raf').polyfill(global);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(2);

var DEFAULT_WHITELIST = [
  ReferenceError,
  TypeError,
  RangeError
];

var enabled = false;
exports.disable = disable;
function disable() {
  enabled = false;
  Promise._47 = null;
  Promise._71 = null;
}

exports.enable = enable;
function enable(options) {
  options = options || {};
  if (enabled) disable();
  enabled = true;
  var id = 0;
  var displayId = 0;
  var rejections = {};
  Promise._47 = function (promise) {
    if (
      promise._83 === 2 && // IS REJECTED
      rejections[promise._56]
    ) {
      if (rejections[promise._56].logged) {
        onHandled(promise._56);
      } else {
        clearTimeout(rejections[promise._56].timeout);
      }
      delete rejections[promise._56];
    }
  };
  Promise._71 = function (promise, err) {
    if (promise._75 === 0) { // not yet handled
      promise._56 = id++;
      rejections[promise._56] = {
        displayId: null,
        error: err,
        timeout: setTimeout(
          onUnhandled.bind(null, promise._56),
          // For reference errors and type errors, this almost always
          // means the programmer made a mistake, so log them after just
          // 100ms
          // otherwise, wait 2 seconds to see if they get handled
          matchWhitelist(err, DEFAULT_WHITELIST)
            ? 100
            : 2000
        ),
        logged: false
      };
    }
  };
  function onUnhandled(id) {
    if (
      options.allRejections ||
      matchWhitelist(
        rejections[id].error,
        options.whitelist || DEFAULT_WHITELIST
      )
    ) {
      rejections[id].displayId = displayId++;
      if (options.onUnhandled) {
        rejections[id].logged = true;
        options.onUnhandled(
          rejections[id].displayId,
          rejections[id].error
        );
      } else {
        rejections[id].logged = true;
        logError(
          rejections[id].displayId,
          rejections[id].error
        );
      }
    }
  }
  function onHandled(id) {
    if (rejections[id].logged) {
      if (options.onHandled) {
        options.onHandled(rejections[id].displayId, rejections[id].error);
      } else if (!rejections[id].onUnhandled) {
        console.warn(
          'Promise Rejection Handled (id: ' + rejections[id].displayId + '):'
        );
        console.warn(
          '  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' +
          rejections[id].displayId + '.'
        );
      }
    }
  }
}

function logError(id, error) {
  console.warn('Possible Unhandled Promise Rejection (id: ' + id + '):');
  var errStr = (error && (error.stack || error)) + '';
  errStr.split('\n').forEach(function (line) {
    console.warn('  ' + line);
  });
}

function matchWhitelist(error, list) {
  return list.some(function (cls) {
    return error instanceof cls;
  });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(2);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._44);
  p._83 = 1;
  p._18 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._83 === 3) {
            val = val._18;
          }
          if (val._83 === 1) return res(i, val._18);
          if (val._83 === 2) reject(val._18);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_min_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bootstrap_dist_css_bootstrap_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_css__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__App__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__registerServiceWorker__ = __webpack_require__(41);
__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__App__["a" /* default */],null),document.getElementById('root'));Object(__WEBPACK_IMPORTED_MODULE_5__registerServiceWorker__["a" /* default */])();

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.1
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var k=__webpack_require__(1),n=__webpack_require__(4),p=__webpack_require__(5),q=__webpack_require__(6),r="function"===typeof Symbol&&Symbol.for,t=r?Symbol.for("react.element"):60103,u=r?Symbol.for("react.portal"):60106,v=r?Symbol.for("react.fragment"):60107,w=r?Symbol.for("react.strict_mode"):60108,x=r?Symbol.for("react.profiler"):60114,y=r?Symbol.for("react.provider"):60109,z=r?Symbol.for("react.context"):60110,A=r?Symbol.for("react.async_mode"):60111,B=
r?Symbol.for("react.forward_ref"):60112;r&&Symbol.for("react.timeout");var C="function"===typeof Symbol&&Symbol.iterator;function D(a){for(var b=arguments.length-1,e="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)e+="&args[]="+encodeURIComponent(arguments[c+1]);n(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e)}
var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function F(a,b,e){this.props=a;this.context=b;this.refs=p;this.updater=e||E}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?D("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function G(){}
G.prototype=F.prototype;function H(a,b,e){this.props=a;this.context=b;this.refs=p;this.updater=e||E}var I=H.prototype=new G;I.constructor=H;k(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,c)&&!L.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];d.children=l}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:t,type:a,key:g,ref:h,props:d,_owner:J.current}}
function N(a){return"object"===typeof a&&null!==a&&a.$$typeof===t}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,e,c){if(P.length){var d=P.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a)}
function S(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case t:case u:g=!0}}if(g)return e(c,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+T(d,h);g+=S(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=C&&a[C]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),
h=0;!(d=a.next()).done;)d=d.value,f=b+T(d,h++),g+=S(d,f,e,c);else"object"===d&&(e=""+a,D("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function T(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function U(a,b){a.func.call(a.context,b,a.count++)}
function V(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?W(a,c,e,q.thatReturnsArgument):null!=a&&(N(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+e,a={$$typeof:t,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function W(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(O,"$&/")+"/");b=Q(b,g,c,d);null==a||S(a,"",V,b);R(b)}
var X={Children:{map:function(a,b,e){if(null==a)return a;var c=[];W(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=Q(null,null,b,e);null==a||S(a,"",U,b);R(b)},count:function(a){return null==a?0:S(a,"",q.thatReturnsNull,null)},toArray:function(a){var b=[];W(a,b,null,q.thatReturnsArgument);return b},only:function(a){N(a)?void 0:D("143");return a}},createRef:function(){return{current:null}},Component:F,PureComponent:H,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:z,
_calculateChangedBits:b,_defaultValue:a,_currentValue:a,_currentValue2:a,_changedBits:0,_changedBits2:0,Provider:null,Consumer:null};a.Provider={$$typeof:y,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:B,render:a}},Fragment:v,StrictMode:w,unstable_AsyncMode:A,unstable_Profiler:x,createElement:M,cloneElement:function(a,b,e){null===a||void 0===a?D("267",a):void 0;var c=void 0,d=k({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=J.current);void 0!==
b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)K.call(b,c)&&!L.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==l?l[c]:b[c])}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];d.children=l}return{$$typeof:t,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.4.1",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:J,
assign:k}},Y={default:X},Z=Y&&X||Y;module.exports=Z.default?Z.default:Z;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(19);
} else {
  module.exports = require('./cjs/react-dom.development.js');
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.4.1
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(4),ba=__webpack_require__(0),m=__webpack_require__(20),p=__webpack_require__(1),v=__webpack_require__(6),da=__webpack_require__(21),ea=__webpack_require__(22),fa=__webpack_require__(23),ha=__webpack_require__(5);
function A(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c)}ba?void 0:A("227");
function ia(a,b,c,d,e,f,g,h,k){this._hasCaughtError=!1;this._caughtError=null;var n=Array.prototype.slice.call(arguments,3);try{b.apply(c,n)}catch(r){this._caughtError=r,this._hasCaughtError=!0}}
var B={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){ia.apply(B,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){B.invokeGuardedCallback.apply(this,arguments);if(B.hasCaughtError()){var n=B.clearCaughtError();B._hasRethrowError||(B._hasRethrowError=!0,B._rethrowError=n)}},rethrowCaughtError:function(){return ka.apply(B,arguments)},hasCaughtError:function(){return B._hasCaughtError},clearCaughtError:function(){if(B._hasCaughtError){var a=
B._caughtError;B._caughtError=null;B._hasCaughtError=!1;return a}A("198")}};function ka(){if(B._hasRethrowError){var a=B._rethrowError;B._rethrowError=null;B._hasRethrowError=!1;throw a;}}var la=null,ma={};
function na(){if(la)for(var a in ma){var b=ma[a],c=la.indexOf(a);-1<c?void 0:A("96",a);if(!oa[c]){b.extractEvents?void 0:A("97",a);oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;pa.hasOwnProperty(h)?A("99",h):void 0;pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&qa(k[e],g,h);e=!0}else f.registrationName?(qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:A("98",d,a)}}}}
function qa(a,b,c){ra[a]?A("100",a):void 0;ra[a]=b;sa[a]=b.eventTypes[c].dependencies}var oa=[],pa={},ra={},sa={};function ta(a){la?A("101"):void 0;la=Array.prototype.slice.call(a);na()}function ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ma.hasOwnProperty(c)&&ma[c]===d||(ma[c]?A("102",c):void 0,ma[c]=d,b=!0)}b&&na()}
var va={plugins:oa,eventNameDispatchConfigs:pa,registrationNameModules:ra,registrationNameDependencies:sa,possibleRegistrationNames:null,injectEventPluginOrder:ta,injectEventPluginsByName:ua},wa=null,xa=null,ya=null;function za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=ya(d);B.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
function Aa(a,b){null==b?A("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function Ba(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Ca=null;
function Da(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)za(a,b,c[e],d[e]);else c&&za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function Ea(a){return Da(a,!0)}function Fa(a){return Da(a,!1)}var Ga={injectEventPluginOrder:ta,injectEventPluginsByName:ua};
function Ha(a,b){var c=a.stateNode;if(!c)return null;var d=wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;c&&"function"!==typeof c?A("231",b,typeof c):void 0;
return c}function Ia(a,b){null!==a&&(Ca=Aa(Ca,a));a=Ca;Ca=null;a&&(b?Ba(a,Ea):Ba(a,Fa),Ca?A("95"):void 0,B.rethrowCaughtError())}function Ja(a,b,c,d){for(var e=null,f=0;f<oa.length;f++){var g=oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=Aa(e,g))}Ia(e,!1)}var Ka={injection:Ga,getListener:Ha,runEventsInBatch:Ia,runExtractedEventsInBatch:Ja},La=Math.random().toString(36).slice(2),C="__reactInternalInstance$"+La,Ma="__reactEventHandlers$"+La;
function Na(a){if(a[C])return a[C];for(;!a[C];)if(a.parentNode)a=a.parentNode;else return null;a=a[C];return 5===a.tag||6===a.tag?a:null}function Oa(a){if(5===a.tag||6===a.tag)return a.stateNode;A("33")}function Pa(a){return a[Ma]||null}var Qa={precacheFiberNode:function(a,b){b[C]=a},getClosestInstanceFromNode:Na,getInstanceFromNode:function(a){a=a[C];return!a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:Oa,getFiberCurrentPropsFromNode:Pa,updateFiberProps:function(a,b){a[Ma]=b}};
function F(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Ra(a,b,c){for(var d=[];a;)d.push(a),a=F(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)}function Sa(a,b,c){if(b=Ha(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a)}function Ta(a){a&&a.dispatchConfig.phasedRegistrationNames&&Ra(a._targetInst,Sa,a)}
function Ua(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?F(b):null;Ra(b,Sa,a)}}function Va(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ha(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a))}function Xa(a){a&&a.dispatchConfig.registrationName&&Va(a._targetInst,null,a)}function Ya(a){Ba(a,Ta)}
function Za(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=F(h))g++;h=0;for(var k=f;k;k=F(k))h++;for(;0<g-h;)e=F(e),g--;for(;0<h-g;)f=F(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=F(e);f=F(f)}e=null}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=F(c)}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=F(d)}for(d=0;d<e.length;d++)Va(e[d],"bubbled",a);for(a=c.length;0<a--;)Va(c[a],"captured",b)}
var $a={accumulateTwoPhaseDispatches:Ya,accumulateTwoPhaseDispatchesSkipTarget:function(a){Ba(a,Ua)},accumulateEnterLeaveDispatches:Za,accumulateDirectDispatches:function(a){Ba(a,Xa)}};function ab(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var bb={animationend:ab("Animation","AnimationEnd"),animationiteration:ab("Animation","AnimationIteration"),animationstart:ab("Animation","AnimationStart"),transitionend:ab("Transition","TransitionEnd")},cb={},db={};m.canUseDOM&&(db=document.createElement("div").style,"AnimationEvent"in window||(delete bb.animationend.animation,delete bb.animationiteration.animation,delete bb.animationstart.animation),"TransitionEvent"in window||delete bb.transitionend.transition);
function eb(a){if(cb[a])return cb[a];if(!bb[a])return a;var b=bb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in db)return cb[a]=b[c];return a}var fb=eb("animationend"),gb=eb("animationiteration"),hb=eb("animationstart"),ib=eb("transitionend"),jb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kb=null;
function lb(){!kb&&m.canUseDOM&&(kb="textContent"in document.documentElement?"textContent":"innerText");return kb}var G={_root:null,_startText:null,_fallbackText:null};function mb(){if(G._fallbackText)return G._fallbackText;var a,b=G._startText,c=b.length,d,e=nb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);G._fallbackText=e.slice(a,1<d?1-d:void 0);return G._fallbackText}function nb(){return"value"in G._root?G._root.value:G._root[lb()]}
var ob="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),pb={type:null,target:null,currentTarget:v.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function H(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?v.thatReturnsTrue:v.thatReturnsFalse;this.isPropagationStopped=v.thatReturnsFalse;return this}
p(H.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=v.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=v.thatReturnsTrue)},persist:function(){this.isPersistent=v.thatReturnsTrue},isPersistent:v.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<ob.length;a++)this[ob[a]]=null}});H.Interface=pb;H.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;p(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=p({},d.Interface,a);c.extend=d.extend;qb(c);return c};qb(H);
function rb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function sb(a){a instanceof this?void 0:A("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function qb(a){a.eventPool=[];a.getPooled=rb;a.release=sb}var tb=H.extend({data:null}),ub=H.extend({data:null}),vb=[9,13,27,32],wb=m.canUseDOM&&"CompositionEvent"in window,xb=null;m.canUseDOM&&"documentMode"in document&&(xb=document.documentMode);
var yb=m.canUseDOM&&"TextEvent"in window&&!xb,zb=m.canUseDOM&&(!wb||xb&&8<xb&&11>=xb),Ab=String.fromCharCode(32),Bb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Cb=!1;
function Db(a,b){switch(a){case "keyup":return-1!==vb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function Eb(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Fb=!1;function Gb(a,b){switch(a){case "compositionend":return Eb(b);case "keypress":if(32!==b.which)return null;Cb=!0;return Ab;case "textInput":return a=b.data,a===Ab&&Cb?null:a;default:return null}}
function Hb(a,b){if(Fb)return"compositionend"===a||!wb&&Db(a,b)?(a=mb(),G._root=null,G._startText=null,G._fallbackText=null,Fb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return zb?null:b.data;default:return null}}
var Ib={eventTypes:Bb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(wb)b:{switch(a){case "compositionstart":e=Bb.compositionStart;break b;case "compositionend":e=Bb.compositionEnd;break b;case "compositionupdate":e=Bb.compositionUpdate;break b}e=void 0}else Fb?Db(a,c)&&(e=Bb.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=Bb.compositionStart);e?(zb&&(Fb||e!==Bb.compositionStart?e===Bb.compositionEnd&&Fb&&(f=mb()):(G._root=d,G._startText=nb(),Fb=!0)),e=tb.getPooled(e,b,c,d),f?e.data=
f:(f=Eb(c),null!==f&&(e.data=f)),Ya(e),f=e):f=null;(a=yb?Gb(a,c):Hb(a,c))?(b=ub.getPooled(Bb.beforeInput,b,c,d),b.data=a,Ya(b)):b=null;return null===f?b:null===b?f:[f,b]}},Jb=null,Kb={injectFiberControlledHostComponent:function(a){Jb=a}},Lb=null,Mb=null;function Nb(a){if(a=xa(a)){Jb&&"function"===typeof Jb.restoreControlledState?void 0:A("194");var b=wa(a.stateNode);Jb.restoreControlledState(a.stateNode,a.type,b)}}function Ob(a){Lb?Mb?Mb.push(a):Mb=[a]:Lb=a}
function Pb(){return null!==Lb||null!==Mb}function Qb(){if(Lb){var a=Lb,b=Mb;Mb=Lb=null;Nb(a);if(b)for(a=0;a<b.length;a++)Nb(b[a])}}var Rb={injection:Kb,enqueueStateRestore:Ob,needsStateRestore:Pb,restoreStateIfNeeded:Qb};function Sb(a,b){return a(b)}function Tb(a,b,c){return a(b,c)}function Ub(){}var Vb=!1;function Wb(a,b){if(Vb)return a(b);Vb=!0;try{return Sb(a,b)}finally{Vb=!1,Pb()&&(Ub(),Qb())}}
var Xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Xb[a.type]:"textarea"===b?!0:!1}function Zb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}
function $b(a,b){if(!m.canUseDOM||b&&!("addEventListener"in document))return!1;a="on"+a;b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function ac(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function bc(a){var b=ac(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function cc(a){a._valueTracker||(a._valueTracker=bc(a))}function dc(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ac(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
var ec=ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fc="function"===typeof Symbol&&Symbol.for,gc=fc?Symbol.for("react.element"):60103,hc=fc?Symbol.for("react.portal"):60106,ic=fc?Symbol.for("react.fragment"):60107,jc=fc?Symbol.for("react.strict_mode"):60108,kc=fc?Symbol.for("react.profiler"):60114,lc=fc?Symbol.for("react.provider"):60109,mc=fc?Symbol.for("react.context"):60110,pc=fc?Symbol.for("react.async_mode"):60111,qc=fc?Symbol.for("react.forward_ref"):60112,rc=fc?Symbol.for("react.timeout"):
60113,sc="function"===typeof Symbol&&Symbol.iterator;function tc(a){if(null===a||"undefined"===typeof a)return null;a=sc&&a[sc]||a["@@iterator"];return"function"===typeof a?a:null}
function uc(a){var b=a.type;if("function"===typeof b)return b.displayName||b.name;if("string"===typeof b)return b;switch(b){case pc:return"AsyncMode";case mc:return"Context.Consumer";case ic:return"ReactFragment";case hc:return"ReactPortal";case kc:return"Profiler("+a.pendingProps.id+")";case lc:return"Context.Provider";case jc:return"StrictMode";case rc:return"Timeout"}if("object"===typeof b&&null!==b)switch(b.$$typeof){case qc:return a=b.render.displayName||b.render.name||"",""!==a?"ForwardRef("+
a+")":"ForwardRef"}return null}function vc(a){var b="";do{a:switch(a.tag){case 0:case 1:case 2:case 5:var c=a._debugOwner,d=a._debugSource;var e=uc(a);var f=null;c&&(f=uc(c));c=d;e="\n    in "+(e||"Unknown")+(c?" (at "+c.fileName.replace(/^.*[\\\/]/,"")+":"+c.lineNumber+")":f?" (created by "+f+")":"");break a;default:e=""}b+=e;a=a.return}while(a);return b}
var wc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xc={},zc={};function Ac(a){if(zc.hasOwnProperty(a))return!0;if(xc.hasOwnProperty(a))return!1;if(wc.test(a))return zc[a]=!0;xc[a]=!0;return!1}
function Bc(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function Cc(a,b,c,d){if(null===b||"undefined"===typeof b||Bc(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}
function I(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b}var J={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){J[a]=new I(a,0,!1,a,null)});
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];J[b]=new I(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){J[a]=new I(a,2,!1,a.toLowerCase(),null)});["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(a){J[a]=new I(a,2,!1,a,null)});
"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){J[a]=new I(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){J[a]=new I(a,3,!0,a.toLowerCase(),null)});["capture","download"].forEach(function(a){J[a]=new I(a,4,!1,a.toLowerCase(),null)});
["cols","rows","size","span"].forEach(function(a){J[a]=new I(a,6,!1,a.toLowerCase(),null)});["rowSpan","start"].forEach(function(a){J[a]=new I(a,5,!1,a.toLowerCase(),null)});var Dc=/[\-:]([a-z])/g;function Ec(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Dc,
Ec);J[b]=new I(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Dc,Ec);J[b]=new I(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Dc,Ec);J[b]=new I(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});J.tabIndex=new I("tabIndex",1,!1,"tabindex",null);
function Fc(a,b,c,d){var e=J.hasOwnProperty(b)?J[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Cc(b,c,e,d)&&(c=null),d||null===e?Ac(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function Gc(a,b){var c=b.checked;return p({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Hc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ic(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Jc(a,b){b=b.checked;null!=b&&Fc(a,"checked",b,!1)}
function Kc(a,b){Jc(a,b);var c=Ic(b.value);if(null!=c)if("number"===b.type){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);b.hasOwnProperty("value")?Lc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Lc(a,b.type,Ic(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Mc(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){b=""+a._wrapperState.initialValue;var d=a.value;c||b===d||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==c&&(a.name=c)}function Lc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}
function Ic(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}var Nc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Oc(a,b,c){a=H.getPooled(Nc.change,a,b,c);a.type="change";Ob(c);Ya(a);return a}var Pc=null,Qc=null;function Rc(a){Ia(a,!1)}function Sc(a){var b=Oa(a);if(dc(b))return a}
function Tc(a,b){if("change"===a)return b}var Uc=!1;m.canUseDOM&&(Uc=$b("input")&&(!document.documentMode||9<document.documentMode));function Vc(){Pc&&(Pc.detachEvent("onpropertychange",Wc),Qc=Pc=null)}function Wc(a){"value"===a.propertyName&&Sc(Qc)&&(a=Oc(Qc,a,Zb(a)),Wb(Rc,a))}function Xc(a,b,c){"focus"===a?(Vc(),Pc=b,Qc=c,Pc.attachEvent("onpropertychange",Wc)):"blur"===a&&Vc()}function Yc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Sc(Qc)}
function Zc(a,b){if("click"===a)return Sc(b)}function $c(a,b){if("input"===a||"change"===a)return Sc(b)}
var ad={eventTypes:Nc,_isInputEventSupported:Uc,extractEvents:function(a,b,c,d){var e=b?Oa(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Tc:Yb(e)?Uc?f=$c:(f=Yc,g=Xc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Zc);if(f&&(f=f(a,b)))return Oc(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Lc(e,"number",e.value)}},bd=H.extend({view:null,detail:null}),cd={Alt:"altKey",
Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=cd[a])?!!b[a]:!1}function ed(){return dd}
var fd=bd.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ed,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}}),gd=fd.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null}),hd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},
mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},id={eventTypes:hd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||
e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Na(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,k=void 0,n=void 0;if("mouseout"===a||"mouseover"===a)g=fd,h=hd.mouseLeave,k=hd.mouseEnter,n="mouse";else if("pointerout"===a||"pointerover"===a)g=gd,h=hd.pointerLeave,k=hd.pointerEnter,n="pointer";a=null==f?e:Oa(f);e=null==b?e:Oa(b);h=g.getPooled(h,f,c,d);h.type=n+"leave";h.target=a;h.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=n+"enter";c.target=e;c.relatedTarget=a;Za(h,
c,f,b);return[h,c]}};function jd(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function kd(a){2!==jd(a)?A("188"):void 0}
function ld(a){var b=a.alternate;if(!b)return b=jd(a),3===b?A("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return kd(e),a;if(g===d)return kd(e),b;g=g.sibling}A("188")}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:A("189")}}c.alternate!==d?A("190"):void 0}3!==c.tag?A("188"):void 0;return c.stateNode.current===c?a:b}function md(a){a=ld(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function nd(a){a=ld(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}var od=H.extend({animationName:null,elapsedTime:null,pseudoElement:null}),pd=H.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),qd=bd.extend({relatedTarget:null});
function rd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var sd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ud=bd.extend({key:function(a){if(a.key){var b=sd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=rd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?td[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ed,charCode:function(a){return"keypress"===
a.type?rd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?rd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),vd=fd.extend({dataTransfer:null}),wd=bd.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ed}),xd=H.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),yd=fd.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in
a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),zd=[["abort","abort"],[fb,"animationEnd"],[gb,"animationIteration"],[hb,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ib,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Ad={},Bd={};function Cd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Ad[a]=b;Bd[c]=b}
[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],
["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Cd(a,!0)});zd.forEach(function(a){Cd(a,!1)});
var Dd={eventTypes:Ad,isInteractiveTopLevelEventType:function(a){a=Bd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Bd[a];if(!e)return null;switch(a){case "keypress":if(0===rd(c))return null;case "keydown":case "keyup":a=ud;break;case "blur":case "focus":a=qd;break;case "click":if(2===c.button)return null;case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=fd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
vd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=wd;break;case fb:case gb:case hb:a=od;break;case ib:a=xd;break;case "scroll":a=bd;break;case "wheel":a=yd;break;case "copy":case "cut":case "paste":a=pd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=gd;break;default:a=H}b=a.getPooled(e,b,c,d);Ya(b);return b}},Ed=Dd.isInteractiveTopLevelEventType,
Fd=[];function Gd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c.return;)c=c.return;c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=Na(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],Ja(a.topLevelType,b,a.nativeEvent,Zb(a.nativeEvent))}var Hd=!0;function Id(a){Hd=!!a}function K(a,b){if(!b)return null;var c=(Ed(a)?Kd:Ld).bind(null,a);b.addEventListener(a,c,!1)}
function Md(a,b){if(!b)return null;var c=(Ed(a)?Kd:Ld).bind(null,a);b.addEventListener(a,c,!0)}function Kd(a,b){Tb(Ld,a,b)}function Ld(a,b){if(Hd){var c=Zb(b);c=Na(c);null===c||"number"!==typeof c.tag||2===jd(c)||(c=null);if(Fd.length){var d=Fd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Wb(Gd,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Fd.length&&Fd.push(a)}}}
var Nd={get _enabled(){return Hd},setEnabled:Id,isEnabled:function(){return Hd},trapBubbledEvent:K,trapCapturedEvent:Md,dispatchEvent:Ld},Od={},Pd=0,Qd="_reactListenersID"+(""+Math.random()).slice(2);function Rd(a){Object.prototype.hasOwnProperty.call(a,Qd)||(a[Qd]=Pd++,Od[a[Qd]]={});return Od[a[Qd]]}function Sd(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Td(a,b){var c=Sd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Sd(c)}}function Ud(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Vd=m.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Wd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Xd=null,Yd=null,Zd=null,$d=!1;
function ae(a,b){if($d||null==Xd||Xd!==da())return null;var c=Xd;"selectionStart"in c&&Ud(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Zd&&ea(Zd,c)?null:(Zd=c,a=H.getPooled(Wd.select,Yd,a,b),a.type="select",a.target=Xd,Ya(a),a)}
var be={eventTypes:Wd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Rd(e);f=sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0}f=!e}if(f)return null;e=b?Oa(b):window;switch(a){case "focus":if(Yb(e)||"true"===e.contentEditable)Xd=e,Yd=b,Zd=null;break;case "blur":Zd=Yd=Xd=null;break;case "mousedown":$d=!0;break;case "contextmenu":case "mouseup":return $d=!1,ae(c,d);case "selectionchange":if(Vd)break;
case "keydown":case "keyup":return ae(c,d)}return null}};Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa=Qa.getFiberCurrentPropsFromNode;xa=Qa.getInstanceFromNode;ya=Qa.getNodeFromInstance;Ga.injectEventPluginsByName({SimpleEventPlugin:Dd,EnterLeaveEventPlugin:id,ChangeEventPlugin:ad,SelectEventPlugin:be,BeforeInputEventPlugin:Ib});
var ce="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,de=Date,ee=setTimeout,fe=clearTimeout,ge=void 0;if("object"===typeof performance&&"function"===typeof performance.now){var he=performance;ge=function(){return he.now()}}else ge=function(){return de.now()};var ie=void 0,je=void 0;
if(m.canUseDOM){var ke="function"===typeof ce?ce:function(){A("276")},L=null,le=null,me=-1,ne=!1,oe=!1,pe=0,qe=33,re=33,se={didTimeout:!1,timeRemaining:function(){var a=pe-ge();return 0<a?a:0}},ue=function(a,b){var c=a.scheduledCallback,d=!1;try{c(b),d=!0}finally{je(a),d||(ne=!0,window.postMessage(te,"*"))}},te="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===te&&(ne=!1,null!==L)){if(null!==L){var b=ge();if(!(-1===
me||me>b)){a=-1;for(var c=[],d=L;null!==d;){var e=d.timeoutTime;-1!==e&&e<=b?c.push(d):-1!==e&&(-1===a||e<a)&&(a=e);d=d.next}if(0<c.length)for(se.didTimeout=!0,b=0,d=c.length;b<d;b++)ue(c[b],se);me=a}}for(a=ge();0<pe-a&&null!==L;)a=L,se.didTimeout=!1,ue(a,se),a=ge();null===L||oe||(oe=!0,ke(ve))}},!1);var ve=function(a){oe=!1;var b=a-pe+re;b<re&&qe<re?(8>b&&(b=8),re=b<qe?qe:b):qe=b;pe=a+re;ne||(ne=!0,window.postMessage(te,"*"))};ie=function(a,b){var c=-1;null!=b&&"number"===typeof b.timeout&&(c=ge()+
b.timeout);if(-1===me||-1!==c&&c<me)me=c;a={scheduledCallback:a,timeoutTime:c,prev:null,next:null};null===L?L=a:(b=a.prev=le,null!==b&&(b.next=a));le=a;oe||(oe=!0,ke(ve));return a};je=function(a){if(null!==a.prev||L===a){var b=a.next,c=a.prev;a.next=null;a.prev=null;null!==b?null!==c?(c.next=b,b.prev=c):(b.prev=null,L=b):null!==c?(c.next=null,le=c):le=L=null}}}else{var we=new Map;ie=function(a){var b={scheduledCallback:a,timeoutTime:0,next:null,prev:null},c=ee(function(){a({timeRemaining:function(){return Infinity},
didTimeout:!1})});we.set(a,c);return b};je=function(a){var b=we.get(a.scheduledCallback);we.delete(a);fe(b)}}function xe(a){var b="";ba.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}function ye(a,b){a=p({children:void 0},b);if(b=xe(b.children))a.children=b;return a}
function ze(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Ae(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}}function Be(a,b){null!=b.dangerouslySetInnerHTML?A("91"):void 0;return p({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Ce(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?A("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:A("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c}}
function De(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)}function Ee(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)}var Fe={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Ge(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function He(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Ge(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Ie=void 0,Je=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Fe.svg||"innerHTML"in a)a.innerHTML=b;else{Ie=Ie||document.createElement("div");Ie.innerHTML="<svg>"+b+"</svg>";for(b=Ie.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Ke(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var Le={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Me=["Webkit","ms","Moz","O"];Object.keys(Le).forEach(function(a){Me.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Le[b]=Le[a]})});
function Ne(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Le.hasOwnProperty(e)&&Le[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var Oe=p({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function Pe(a,b,c){b&&(Oe[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?A("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?A("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:A("61")),null!=b.style&&"object"!==typeof b.style?A("62",c()):void 0)}
function Qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var Re=v.thatReturns("");
function Se(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Rd(a);b=sa[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Md("scroll",a);break;case "focus":case "blur":Md("focus",a);Md("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":$b(e,!0)&&Md(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===jb.indexOf(e)&&K(e,a)}c[e]=!0}}}
function Te(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===Fe.html&&(d=Ge(a));d===Fe.html?"script"===a?(a=c.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function Ue(a,b){return(9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
function Ve(a,b,c,d){var e=Qe(b,c);switch(b){case "iframe":case "object":K("load",a);var f=c;break;case "video":case "audio":for(f=0;f<jb.length;f++)K(jb[f],a);f=c;break;case "source":K("error",a);f=c;break;case "img":case "image":case "link":K("error",a);K("load",a);f=c;break;case "form":K("reset",a);K("submit",a);f=c;break;case "details":K("toggle",a);f=c;break;case "input":Hc(a,c);f=Gc(a,c);K("invalid",a);Se(d,"onChange");break;case "option":f=ye(a,c);break;case "select":Ae(a,c);f=p({},c,{value:void 0});
K("invalid",a);Se(d,"onChange");break;case "textarea":Ce(a,c);f=Be(a,c);K("invalid",a);Se(d,"onChange");break;default:f=c}Pe(b,f,Re);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?Ne(a,k,Re):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Je(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&Ke(a,k):"number"===typeof k&&Ke(a,""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ra.hasOwnProperty(h)?null!=k&&Se(d,
h):null!=k&&Fc(a,h,k,e))}switch(b){case "input":cc(a);Mc(a,c,!1);break;case "textarea":cc(a);Ee(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?ze(a,!!c.multiple,b,!1):null!=c.defaultValue&&ze(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=v)}}
function We(a,b,c,d,e){var f=null;switch(b){case "input":c=Gc(a,c);d=Gc(a,d);f=[];break;case "option":c=ye(a,c);d=ye(a,d);f=[];break;case "select":c=p({},c,{value:void 0});d=p({},d,{value:void 0});f=[];break;case "textarea":c=Be(a,c);d=Be(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=v)}Pe(b,d,Re);b=a=void 0;var g=null;for(a in c)if(!d.hasOwnProperty(a)&&c.hasOwnProperty(a)&&null!=c[a])if("style"===a){var h=c[a];for(b in h)h.hasOwnProperty(b)&&(g||
(g={}),g[b]="")}else"dangerouslySetInnerHTML"!==a&&"children"!==a&&"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(ra.hasOwnProperty(a)?f||(f=[]):(f=f||[]).push(a,null));for(a in d){var k=d[a];h=null!=c?c[a]:void 0;if(d.hasOwnProperty(a)&&k!==h&&(null!=k||null!=h))if("style"===a)if(h){for(b in h)!h.hasOwnProperty(b)||k&&k.hasOwnProperty(b)||(g||(g={}),g[b]="");for(b in k)k.hasOwnProperty(b)&&h[b]!==k[b]&&(g||(g={}),g[b]=k[b])}else g||(f||(f=[]),f.push(a,g)),
g=k;else"dangerouslySetInnerHTML"===a?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(a,""+k)):"children"===a?h===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(a,""+k):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&(ra.hasOwnProperty(a)?(null!=k&&Se(e,a),f||h===k||(f=[])):(f=f||[]).push(a,k))}g&&(f=f||[]).push("style",g);return f}
function Xe(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Jc(a,e);Qe(c,d);d=Qe(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?Ne(a,h,Re):"dangerouslySetInnerHTML"===g?Je(a,h):"children"===g?Ke(a,h):Fc(a,g,h,d)}switch(c){case "input":Kc(a,e);break;case "textarea":De(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?ze(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?
ze(a,!!e.multiple,e.defaultValue,!0):ze(a,!!e.multiple,e.multiple?[]:"",!1))}}
function Ye(a,b,c,d,e){switch(b){case "iframe":case "object":K("load",a);break;case "video":case "audio":for(d=0;d<jb.length;d++)K(jb[d],a);break;case "source":K("error",a);break;case "img":case "image":case "link":K("error",a);K("load",a);break;case "form":K("reset",a);K("submit",a);break;case "details":K("toggle",a);break;case "input":Hc(a,c);K("invalid",a);Se(e,"onChange");break;case "select":Ae(a,c);K("invalid",a);Se(e,"onChange");break;case "textarea":Ce(a,c),K("invalid",a),Se(e,"onChange")}Pe(b,
c,Re);d=null;for(var f in c)if(c.hasOwnProperty(f)){var g=c[f];"children"===f?"string"===typeof g?a.textContent!==g&&(d=["children",g]):"number"===typeof g&&a.textContent!==""+g&&(d=["children",""+g]):ra.hasOwnProperty(f)&&null!=g&&Se(e,f)}switch(b){case "input":cc(a);Mc(a,c,!0);break;case "textarea":cc(a);Ee(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=v)}return d}function Ze(a,b){return a.nodeValue!==b}
var $e={createElement:Te,createTextNode:Ue,setInitialProperties:Ve,diffProperties:We,updateProperties:Xe,diffHydratedProperties:Ye,diffHydratedText:Ze,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Kc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;
c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Pa(d);e?void 0:A("90");dc(d);Kc(d,e)}}}break;case "textarea":De(a,c);break;case "select":b=c.value,null!=b&&ze(a,!!c.multiple,b,!1)}}},af=null,bf=null;function cf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function df(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html}var ef=ge,ff=ie,gf=je;function hf(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function jf(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}new Set;var kf=[],lf=-1;function mf(a){return{current:a}}
function M(a){0>lf||(a.current=kf[lf],kf[lf]=null,lf--)}function N(a,b){lf++;kf[lf]=a.current;a.current=b}var nf=mf(ha),O=mf(!1),of=ha;function pf(a){return qf(a)?of:nf.current}
function rf(a,b){var c=a.type.contextTypes;if(!c)return ha;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function qf(a){return 2===a.tag&&null!=a.type.childContextTypes}function sf(a){qf(a)&&(M(O,a),M(nf,a))}function tf(a){M(O,a);M(nf,a)}
function uf(a,b,c){nf.current!==ha?A("168"):void 0;N(nf,b,a);N(O,c,a)}function vf(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:A("108",uc(a)||"Unknown",e);return p({},b,c)}function wf(a){if(!qf(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||ha;of=nf.current;N(nf,b,a);N(O,O.current,a);return!0}
function xf(a,b){var c=a.stateNode;c?void 0:A("169");if(b){var d=vf(a,of);c.__reactInternalMemoizedMergedChildContext=d;M(O,a);M(nf,a);N(nf,d,a)}else M(O,a);N(O,b,a)}
function yf(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=null;this.index=0;this.ref=null;this.pendingProps=b;this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null}
function zf(a,b,c){var d=a.alternate;null===d?(d=new yf(a.tag,b,a.key,a.mode),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=b,d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
function Af(a,b,c){var d=a.type,e=a.key;a=a.props;if("function"===typeof d)var f=d.prototype&&d.prototype.isReactComponent?2:0;else if("string"===typeof d)f=5;else switch(d){case ic:return Bf(a.children,b,c,e);case pc:f=11;b|=3;break;case jc:f=11;b|=2;break;case kc:return d=new yf(15,a,e,b|4),d.type=kc,d.expirationTime=c,d;case rc:f=16;b|=2;break;default:a:{switch("object"===typeof d&&null!==d?d.$$typeof:null){case lc:f=13;break a;case mc:f=12;break a;case qc:f=14;break a;default:A("130",null==d?
d:typeof d,"")}f=void 0}}b=new yf(f,a,e,b);b.type=d;b.expirationTime=c;return b}function Bf(a,b,c,d){a=new yf(10,a,d,b);a.expirationTime=c;return a}function Cf(a,b,c){a=new yf(6,a,null,b);a.expirationTime=c;return a}function Df(a,b,c){b=new yf(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function Ef(a,b,c){b=new yf(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:c,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null};return b.stateNode=a}var Ff=null,Gf=null;function Hf(a){return function(b){try{return a(b)}catch(c){}}}
function If(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);Ff=Hf(function(a){return b.onCommitFiberRoot(c,a)});Gf=Hf(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0}function Jf(a){"function"===typeof Ff&&Ff(a)}function Kf(a){"function"===typeof Gf&&Gf(a)}var Lf=!1;
function Mf(a){return{expirationTime:0,baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Nf(a){return{expirationTime:a.expirationTime,baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Of(a){return{expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Pf(a,b,c){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);if(0===a.expirationTime||a.expirationTime>c)a.expirationTime=c}
function Qf(a,b,c){var d=a.alternate;if(null===d){var e=a.updateQueue;var f=null;null===e&&(e=a.updateQueue=Mf(a.memoizedState))}else e=a.updateQueue,f=d.updateQueue,null===e?null===f?(e=a.updateQueue=Mf(a.memoizedState),f=d.updateQueue=Mf(d.memoizedState)):e=a.updateQueue=Nf(f):null===f&&(f=d.updateQueue=Nf(e));null===f||e===f?Pf(e,b,c):null===e.lastUpdate||null===f.lastUpdate?(Pf(e,b,c),Pf(f,b,c)):(Pf(e,b,c),f.lastUpdate=b)}
function Rf(a,b,c){var d=a.updateQueue;d=null===d?a.updateQueue=Mf(a.memoizedState):Sf(a,d);null===d.lastCapturedUpdate?d.firstCapturedUpdate=d.lastCapturedUpdate=b:(d.lastCapturedUpdate.next=b,d.lastCapturedUpdate=b);if(0===d.expirationTime||d.expirationTime>c)d.expirationTime=c}function Sf(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Nf(b));return b}
function Tf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-1025|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return p({},d,e);case 2:Lf=!0}return d}
function Uf(a,b,c,d,e){Lf=!1;if(!(0===b.expirationTime||b.expirationTime>e)){b=Sf(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,n=f;null!==k;){var r=k.expirationTime;if(r>e){if(null===g&&(g=k,f=n),0===h||h>r)h=r}else n=Tf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k));k=k.next}r=null;for(k=b.firstCapturedUpdate;null!==k;){var w=k.expirationTime;if(w>e){if(null===r&&(r=k,null===
g&&(f=n)),0===h||h>w)h=w}else n=Tf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k));k=k.next}null===g&&(b.lastUpdate=null);null===r?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===r&&(f=n);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=r;b.expirationTime=h;a.memoizedState=n}}
function Vf(a,b){"function"!==typeof a?A("191",a):void 0;a.call(b)}
function Wf(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);a=b.firstEffect;for(b.firstEffect=b.lastEffect=null;null!==a;){var d=a.callback;null!==d&&(a.callback=null,Vf(d,c));a=a.nextEffect}a=b.firstCapturedEffect;for(b.firstCapturedEffect=b.lastCapturedEffect=null;null!==a;)b=a.callback,null!==b&&(a.callback=null,Vf(b,c)),a=a.nextEffect}
function Xf(a,b){return{value:a,source:b,stack:vc(b)}}var Yf=mf(null),Zf=mf(null),$f=mf(0);function ag(a){var b=a.type._context;N($f,b._changedBits,a);N(Zf,b._currentValue,a);N(Yf,a,a);b._currentValue=a.pendingProps.value;b._changedBits=a.stateNode}function bg(a){var b=$f.current,c=Zf.current;M(Yf,a);M(Zf,a);M($f,a);a=a.type._context;a._currentValue=c;a._changedBits=b}var cg={},dg=mf(cg),eg=mf(cg),fg=mf(cg);function gg(a){a===cg?A("174"):void 0;return a}
function ig(a,b){N(fg,b,a);N(eg,a,a);N(dg,cg,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:He(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=He(b,c)}M(dg,a);N(dg,b,a)}function jg(a){M(dg,a);M(eg,a);M(fg,a)}function kg(a){eg.current===a&&(M(dg,a),M(eg,a))}function lg(a,b,c){var d=a.memoizedState;b=b(c,d);d=null===b||void 0===b?d:p({},d,b);a.memoizedState=d;a=a.updateQueue;null!==a&&0===a.expirationTime&&(a.baseState=d)}
var pg={isMounted:function(a){return(a=a._reactInternalFiber)?2===jd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=mg();d=ng(d,a);var e=Of(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Qf(a,e,d);og(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=mg();d=ng(d,a);var e=Of(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Qf(a,e,d);og(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=mg();c=ng(c,a);var d=Of(c);d.tag=2;void 0!==
b&&null!==b&&(d.callback=b);Qf(a,d,c);og(a,c)}};function qg(a,b,c,d,e,f){var g=a.stateNode;a=a.type;return"function"===typeof g.shouldComponentUpdate?g.shouldComponentUpdate(c,e,f):a.prototype&&a.prototype.isPureReactComponent?!ea(b,c)||!ea(d,e):!0}
function rg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&pg.enqueueReplaceState(b,b.state,null)}
function sg(a,b){var c=a.type,d=a.stateNode,e=a.pendingProps,f=pf(a);d.props=e;d.state=a.memoizedState;d.refs=ha;d.context=rf(a,f);f=a.updateQueue;null!==f&&(Uf(a,f,e,d,b),d.state=a.memoizedState);f=a.type.getDerivedStateFromProps;"function"===typeof f&&(lg(a,f,e),d.state=a.memoizedState);"function"===typeof c.getDerivedStateFromProps||"function"===typeof d.getSnapshotBeforeUpdate||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||(c=d.state,"function"===typeof d.componentWillMount&&
d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount(),c!==d.state&&pg.enqueueReplaceState(d,d.state,null),f=a.updateQueue,null!==f&&(Uf(a,f,e,d,b),d.state=a.memoizedState));"function"===typeof d.componentDidMount&&(a.effectTag|=4)}var tg=Array.isArray;
function ug(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(2!==c.tag?A("110"):void 0,d=c.stateNode);d?void 0:A("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs===ha?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}"string"!==typeof a?A("148"):void 0;c._owner?void 0:A("254",a)}return a}
function vg(a,b){"textarea"!==a.type&&A("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function wg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=zf(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Cf(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=ug(a,b,c),d.return=a,d;d=Af(c,a.mode,d);d.ref=ug(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Df(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function r(a,b,c,d,f){if(null===b||10!==b.tag)return b=Bf(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function w(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Cf(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case gc:return c=Af(b,a.mode,c),c.ref=ug(a,null,b),c.return=a,c;case hc:return b=Df(b,a.mode,c),b.return=a,b}if(tg(b)||tc(b))return b=Bf(b,a.mode,c,null),b.return=
a,b;vg(a,b)}return null}function P(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case gc:return c.key===e?c.type===ic?r(a,b,c.props.children,d,e):k(a,b,c,d):null;case hc:return c.key===e?n(a,b,c,d):null}if(tg(c)||tc(c))return null!==e?null:r(a,b,c,d,null);vg(a,c)}return null}function nc(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);
if("object"===typeof d&&null!==d){switch(d.$$typeof){case gc:return a=a.get(null===d.key?c:d.key)||null,d.type===ic?r(b,a,d.props.children,e,d.key):k(b,a,d,e);case hc:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e)}if(tg(d)||tc(d))return a=a.get(c)||null,r(b,a,d,e,null);vg(b,d)}return null}function Jd(e,g,h,k){for(var u=null,x=null,t=g,q=g=0,n=null;null!==t&&q<h.length;q++){t.index>q?(n=t,t=null):n=t.sibling;var l=P(e,t,h[q],k);if(null===l){null===t&&(t=n);break}a&&t&&null===l.alternate&&b(e,
t);g=f(l,g,q);null===x?u=l:x.sibling=l;x=l;t=n}if(q===h.length)return c(e,t),u;if(null===t){for(;q<h.length;q++)if(t=w(e,h[q],k))g=f(t,g,q),null===x?u=t:x.sibling=t,x=t;return u}for(t=d(e,t);q<h.length;q++)if(n=nc(t,e,q,h[q],k))a&&null!==n.alternate&&t.delete(null===n.key?q:n.key),g=f(n,g,q),null===x?u=n:x.sibling=n,x=n;a&&t.forEach(function(a){return b(e,a)});return u}function E(e,g,h,k){var u=tc(h);"function"!==typeof u?A("150"):void 0;h=u.call(h);null==h?A("151"):void 0;for(var t=u=null,n=g,x=
g=0,y=null,l=h.next();null!==n&&!l.done;x++,l=h.next()){n.index>x?(y=n,n=null):y=n.sibling;var r=P(e,n,l.value,k);if(null===r){n||(n=y);break}a&&n&&null===r.alternate&&b(e,n);g=f(r,g,x);null===t?u=r:t.sibling=r;t=r;n=y}if(l.done)return c(e,n),u;if(null===n){for(;!l.done;x++,l=h.next())l=w(e,l.value,k),null!==l&&(g=f(l,g,x),null===t?u=l:t.sibling=l,t=l);return u}for(n=d(e,n);!l.done;x++,l=h.next())l=nc(n,e,x,l.value,k),null!==l&&(a&&null!==l.alternate&&n.delete(null===l.key?x:l.key),g=f(l,g,x),null===
t?u=l:t.sibling=l,t=l);a&&n.forEach(function(a){return b(e,a)});return u}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ic&&null===f.key;k&&(f=f.props.children);var n="object"===typeof f&&null!==f;if(n)switch(f.$$typeof){case gc:a:{n=f.key;for(k=d;null!==k;){if(k.key===n)if(10===k.tag?f.type===ic:k.type===f.type){c(a,k.sibling);d=e(k,f.type===ic?f.props.children:f.props,h);d.ref=ug(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=k.sibling}f.type===ic?(d=Bf(f.props.children,
a.mode,h,f.key),d.return=a,a=d):(h=Af(f,a.mode,h),h.ref=ug(a,d,f),h.return=a,a=h)}return g(a);case hc:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Df(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=
a,a=d):(c(a,d),d=Cf(f,a.mode,h),d.return=a,a=d),g(a);if(tg(f))return Jd(a,d,f,h);if(tc(f))return E(a,d,f,h);n&&vg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 2:case 1:h=a.type,A("152",h.displayName||h.name||"Component")}return c(a,d)}}var xg=wg(!0),yg=wg(!1),zg=null,Ag=null,Bg=!1;function Cg(a,b){var c=new yf(5,null,null,0);c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function Dg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return!1}}function Eg(a){if(Bg){var b=Ag;if(b){var c=b;if(!Dg(a,b)){b=hf(c);if(!b||!Dg(a,b)){a.effectTag|=2;Bg=!1;zg=a;return}Cg(zg,c)}zg=a;Ag=jf(b)}else a.effectTag|=2,Bg=!1,zg=a}}
function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;zg=a}function Gg(a){if(a!==zg)return!1;if(!Bg)return Fg(a),Bg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!df(b,a.memoizedProps))for(b=Ag;b;)Cg(a,b),b=hf(b);Fg(a);Ag=zg?hf(a.stateNode):null;return!0}function Hg(){Ag=zg=null;Bg=!1}function Q(a,b,c){Ig(a,b,c,b.expirationTime)}function Ig(a,b,c,d){b.child=null===a?yg(b,null,c,d):xg(b,a.child,c,d)}
function Jg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function Kg(a,b,c,d,e){Jg(a,b);var f=0!==(b.effectTag&64);if(!c&&!f)return d&&xf(b,!1),R(a,b);c=b.stateNode;ec.current=b;var g=f?null:c.render();b.effectTag|=1;f&&(Ig(a,b,null,e),b.child=null);Ig(a,b,g,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&xf(b,!0);return b.child}
function Lg(a){var b=a.stateNode;b.pendingContext?uf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&uf(a,b.context,!1);ig(a,b.containerInfo)}
function Mg(a,b,c,d){var e=a.child;null!==e&&(e.return=a);for(;null!==e;){switch(e.tag){case 12:var f=e.stateNode|0;if(e.type===b&&0!==(f&c)){for(f=e;null!==f;){var g=f.alternate;if(0===f.expirationTime||f.expirationTime>d)f.expirationTime=d,null!==g&&(0===g.expirationTime||g.expirationTime>d)&&(g.expirationTime=d);else if(null!==g&&(0===g.expirationTime||g.expirationTime>d))g.expirationTime=d;else break;f=f.return}f=null}else f=e.child;break;case 13:f=e.type===a.type?null:e.child;break;default:f=
e.child}if(null!==f)f.return=e;else for(f=e;null!==f;){if(f===a){f=null;break}e=f.sibling;if(null!==e){e.return=f.return;f=e;break}f=f.return}e=f}}
function Qg(a,b,c){var d=b.type._context,e=b.pendingProps,f=b.memoizedProps,g=!0;if(O.current)g=!1;else if(f===e)return b.stateNode=0,ag(b),R(a,b);var h=e.value;b.memoizedProps=e;if(null===f)h=1073741823;else if(f.value===e.value){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R(a,b);h=0}else{var k=f.value;if(k===h&&(0!==k||1/k===1/h)||k!==k&&h!==h){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R(a,b);h=0}else if(h="function"===typeof d._calculateChangedBits?d._calculateChangedBits(k,
h):1073741823,h|=0,0===h){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R(a,b)}else Mg(b,d,h,c)}b.stateNode=h;ag(b);Q(a,b,e.children);return b.child}function R(a,b){null!==a&&b.child!==a.child?A("153"):void 0;if(null!==b.child){a=b.child;var c=zf(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=zf(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}
function Rg(a,b,c){if(0===b.expirationTime||b.expirationTime>c){switch(b.tag){case 3:Lg(b);break;case 2:wf(b);break;case 4:ig(b,b.stateNode.containerInfo);break;case 13:ag(b)}return null}switch(b.tag){case 0:null!==a?A("155"):void 0;var d=b.type,e=b.pendingProps,f=pf(b);f=rf(b,f);d=d(e,f);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render&&void 0===d.$$typeof?(f=b.type,b.tag=2,b.memoizedState=null!==d.state&&void 0!==d.state?d.state:null,f=f.getDerivedStateFromProps,"function"===
typeof f&&lg(b,f,e),e=wf(b),d.updater=pg,b.stateNode=d,d._reactInternalFiber=b,sg(b,c),a=Kg(a,b,!0,e,c)):(b.tag=1,Q(a,b,d),b.memoizedProps=e,a=b.child);return a;case 1:return e=b.type,c=b.pendingProps,O.current||b.memoizedProps!==c?(d=pf(b),d=rf(b,d),e=e(c,d),b.effectTag|=1,Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 2:e=wf(b);if(null===a)if(null===b.stateNode){var g=b.pendingProps,h=b.type;d=pf(b);var k=2===b.tag&&null!=b.type.contextTypes;f=k?rf(b,d):ha;g=new h(g,f);b.memoizedState=null!==
g.state&&void 0!==g.state?g.state:null;g.updater=pg;b.stateNode=g;g._reactInternalFiber=b;k&&(k=b.stateNode,k.__reactInternalMemoizedUnmaskedChildContext=d,k.__reactInternalMemoizedMaskedChildContext=f);sg(b,c);d=!0}else{h=b.type;d=b.stateNode;k=b.memoizedProps;f=b.pendingProps;d.props=k;var n=d.context;g=pf(b);g=rf(b,g);var r=h.getDerivedStateFromProps;(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(k!==f||n!==g)&&rg(b,d,f,g);Lf=!1;var w=b.memoizedState;n=d.state=w;var P=b.updateQueue;null!==P&&(Uf(b,P,f,d,c),n=b.memoizedState);k!==f||w!==n||O.current||Lf?("function"===typeof r&&(lg(b,r,f),n=b.memoizedState),(k=Lf||qg(b,k,f,w,n,g))?(h||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||("function"===typeof d.componentWillMount&&d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount()),"function"===typeof d.componentDidMount&&
(b.effectTag|=4)):("function"===typeof d.componentDidMount&&(b.effectTag|=4),b.memoizedProps=f,b.memoizedState=n),d.props=f,d.state=n,d.context=g,d=k):("function"===typeof d.componentDidMount&&(b.effectTag|=4),d=!1)}else h=b.type,d=b.stateNode,f=b.memoizedProps,k=b.pendingProps,d.props=f,n=d.context,g=pf(b),g=rf(b,g),r=h.getDerivedStateFromProps,(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
(f!==k||n!==g)&&rg(b,d,k,g),Lf=!1,n=b.memoizedState,w=d.state=n,P=b.updateQueue,null!==P&&(Uf(b,P,k,d,c),w=b.memoizedState),f!==k||n!==w||O.current||Lf?("function"===typeof r&&(lg(b,r,k),w=b.memoizedState),(r=Lf||qg(b,f,k,n,w,g))?(h||"function"!==typeof d.UNSAFE_componentWillUpdate&&"function"!==typeof d.componentWillUpdate||("function"===typeof d.componentWillUpdate&&d.componentWillUpdate(k,w,g),"function"===typeof d.UNSAFE_componentWillUpdate&&d.UNSAFE_componentWillUpdate(k,w,g)),"function"===typeof d.componentDidUpdate&&
(b.effectTag|=4),"function"===typeof d.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),b.memoizedProps=k,b.memoizedState=w),d.props=k,d.state=w,d.context=g,d=r):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||
f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),d=!1);return Kg(a,b,d,e,c);case 3:Lg(b);e=b.updateQueue;if(null!==e)if(d=b.memoizedState,d=null!==d?d.element:null,Uf(b,e,b.pendingProps,null,c),e=b.memoizedState.element,e===d)Hg(),a=R(a,b);else{d=b.stateNode;if(d=(null===a||null===a.child)&&d.hydrate)Ag=jf(b.stateNode.containerInfo),zg=b,d=Bg=!0;d?(b.effectTag|=2,b.child=yg(b,null,e,c)):(Hg(),Q(a,b,e));a=b.child}else Hg(),a=R(a,b);return a;case 5:a:{gg(fg.current);e=gg(dg.current);d=He(e,
b.type);e!==d&&(N(eg,b,b),N(dg,d,b));null===a&&Eg(b);e=b.type;k=b.memoizedProps;d=b.pendingProps;f=null!==a?a.memoizedProps:null;if(!O.current&&k===d){if(k=b.mode&1&&!!d.hidden)b.expirationTime=1073741823;if(!k||1073741823!==c){a=R(a,b);break a}}k=d.children;df(e,d)?k=null:f&&df(e,f)&&(b.effectTag|=16);Jg(a,b);1073741823!==c&&b.mode&1&&d.hidden?(b.expirationTime=1073741823,b.memoizedProps=d,a=null):(Q(a,b,k),b.memoizedProps=d,a=b.child)}return a;case 6:return null===a&&Eg(b),b.memoizedProps=b.pendingProps,
null;case 16:return null;case 4:return ig(b,b.stateNode.containerInfo),e=b.pendingProps,O.current||b.memoizedProps!==e?(null===a?b.child=xg(b,null,e,c):Q(a,b,e),b.memoizedProps=e,a=b.child):a=R(a,b),a;case 14:return e=b.type.render,c=b.pendingProps,d=b.ref,O.current||b.memoizedProps!==c||d!==(null!==a?a.ref:null)?(e=e(c,d),Q(a,b,e),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 10:return c=b.pendingProps,O.current||b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 11:return c=
b.pendingProps.children,O.current||null!==c&&b.memoizedProps!==c?(Q(a,b,c),b.memoizedProps=c,a=b.child):a=R(a,b),a;case 15:return c=b.pendingProps,b.memoizedProps===c?a=R(a,b):(Q(a,b,c.children),b.memoizedProps=c,a=b.child),a;case 13:return Qg(a,b,c);case 12:a:if(d=b.type,f=b.pendingProps,k=b.memoizedProps,e=d._currentValue,g=d._changedBits,O.current||0!==g||k!==f){b.memoizedProps=f;h=f.unstable_observedBits;if(void 0===h||null===h)h=1073741823;b.stateNode=h;if(0!==(g&h))Mg(b,d,g,c);else if(k===f){a=
R(a,b);break a}c=f.children;c=c(e);b.effectTag|=1;Q(a,b,c);a=b.child}else a=R(a,b);return a;default:A("156")}}function Sg(a){a.effectTag|=4}var Tg=void 0,Ug=void 0,Vg=void 0;Tg=function(){};Ug=function(a,b,c){(b.updateQueue=c)&&Sg(b)};Vg=function(a,b,c,d){c!==d&&Sg(b)};
function Wg(a,b){var c=b.pendingProps;switch(b.tag){case 1:return null;case 2:return sf(b),null;case 3:jg(b);tf(b);var d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b),b.effectTag&=-3;Tg(b);return null;case 5:kg(b);d=gg(fg.current);var e=b.type;if(null!==a&&null!=b.stateNode){var f=a.memoizedProps,g=b.stateNode,h=gg(dg.current);g=We(g,e,f,c,d);Ug(a,b,g,e,f,c,d,h);a.ref!==b.ref&&(b.effectTag|=128)}else{if(!c)return null===b.stateNode?
A("166"):void 0,null;a=gg(dg.current);if(Gg(b))c=b.stateNode,e=b.type,f=b.memoizedProps,c[C]=b,c[Ma]=f,d=Ye(c,e,f,a,d),b.updateQueue=d,null!==d&&Sg(b);else{a=Te(e,c,d,a);a[C]=b;a[Ma]=c;a:for(f=b.child;null!==f;){if(5===f.tag||6===f.tag)a.appendChild(f.stateNode);else if(4!==f.tag&&null!==f.child){f.child.return=f;f=f.child;continue}if(f===b)break;for(;null===f.sibling;){if(null===f.return||f.return===b)break a;f=f.return}f.sibling.return=f.return;f=f.sibling}Ve(a,e,c,d);cf(e,c)&&Sg(b);b.stateNode=
a}null!==b.ref&&(b.effectTag|=128)}return null;case 6:if(a&&null!=b.stateNode)Vg(a,b,a.memoizedProps,c);else{if("string"!==typeof c)return null===b.stateNode?A("166"):void 0,null;d=gg(fg.current);gg(dg.current);Gg(b)?(d=b.stateNode,c=b.memoizedProps,d[C]=b,Ze(d,c)&&Sg(b)):(d=Ue(c,d),d[C]=b,b.stateNode=d)}return null;case 14:return null;case 16:return null;case 10:return null;case 11:return null;case 15:return null;case 4:return jg(b),Tg(b),null;case 13:return bg(b),null;case 12:return null;case 0:A("167");
default:A("156")}}function Xg(a,b){var c=b.source;null===b.stack&&null!==c&&vc(c);null!==c&&uc(c);b=b.value;null!==a&&2===a.tag&&uc(a);try{b&&b.suppressReactErrorLogging||console.error(b)}catch(d){d&&d.suppressReactErrorLogging||console.error(d)}}function Yg(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Zg(a,c)}else b.current=null}
function $g(a){"function"===typeof Kf&&Kf(a);switch(a.tag){case 2:Yg(a);var b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Zg(a,c)}break;case 5:Yg(a);break;case 4:ah(a)}}function bh(a){return 5===a.tag||3===a.tag||4===a.tag}
function ch(a){a:{for(var b=a.return;null!==b;){if(bh(b)){var c=b;break a}b=b.return}A("160");c=void 0}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:A("161")}c.effectTag&16&&(Ke(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||bh(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h)}else b.insertBefore(e.stateNode,c);else d?(f=b,g=e.stateNode,8===f.nodeType?f.parentNode.insertBefore(g,f):f.appendChild(g)):b.appendChild(e.stateNode);else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===
e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}
function ah(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?A("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return}c=!0}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if($g(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return}g.sibling.return=g.return;g=g.sibling}e?
(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode)}else if(4===b.tag?d=b.stateNode.containerInfo:$g(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1)}b.sibling.return=b.return;b=b.sibling}}
function dh(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&(c[Ma]=d,Xe(c,f,e,a,d))}break;case 6:null===b.stateNode?A("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 15:break;case 16:break;default:A("163")}}function eh(a,b,c){c=Of(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){fh(d);Xg(a,b)};return c}
function gh(a,b,c){c=Of(c);c.tag=3;var d=a.stateNode;null!==d&&"function"===typeof d.componentDidCatch&&(c.callback=function(){null===hh?hh=new Set([this]):hh.add(this);var c=b.value,d=b.stack;Xg(a,b);this.componentDidCatch(c,{componentStack:null!==d?d:""})});return c}
function ih(a,b,c,d,e,f){c.effectTag|=512;c.firstEffect=c.lastEffect=null;d=Xf(d,c);a=b;do{switch(a.tag){case 3:a.effectTag|=1024;d=eh(a,d,f);Rf(a,d,f);return;case 2:if(b=d,c=a.stateNode,0===(a.effectTag&64)&&null!==c&&"function"===typeof c.componentDidCatch&&(null===hh||!hh.has(c))){a.effectTag|=1024;d=gh(a,b,f);Rf(a,d,f);return}}a=a.return}while(null!==a)}
function jh(a){switch(a.tag){case 2:sf(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return jg(a),tf(a),b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 5:return kg(a),null;case 16:return b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 4:return jg(a),null;case 13:return bg(a),null;default:return null}}var kh=ef(),lh=2,mh=kh,nh=0,oh=0,ph=!1,S=null,qh=null,T=0,rh=-1,sh=!1,U=null,th=!1,uh=!1,hh=null;
function vh(){if(null!==S)for(var a=S.return;null!==a;){var b=a;switch(b.tag){case 2:sf(b);break;case 3:jg(b);tf(b);break;case 5:kg(b);break;case 4:jg(b);break;case 13:bg(b)}a=a.return}qh=null;T=0;rh=-1;sh=!1;S=null;uh=!1}
function wh(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&512)){b=Wg(b,a,T);var e=a;if(1073741823===T||1073741823!==e.expirationTime){var f=0;switch(e.tag){case 3:case 2:var g=e.updateQueue;null!==g&&(f=g.expirationTime)}for(g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f}if(null!==b)return b;null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&
(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{uh=!0;break}}else{a=jh(a,sh,T);if(null!==a)return a.effectTag&=511,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=512);if(null!==d)return d;if(null!==c)a=c;else break}}return null}
function xh(a){var b=Rg(a.alternate,a,T);null===b&&(b=wh(a));ec.current=null;return b}
function yh(a,b,c){ph?A("243"):void 0;ph=!0;if(b!==T||a!==qh||null===S)vh(),qh=a,T=b,rh=-1,S=zf(qh.current,null,T),a.pendingCommitExpirationTime=0;var d=!1;sh=!c||T<=lh;do{try{if(c)for(;null!==S&&!zh();)S=xh(S);else for(;null!==S;)S=xh(S)}catch(f){if(null===S)d=!0,fh(f);else{null===S?A("271"):void 0;c=S;var e=c.return;if(null===e){d=!0;fh(f);break}ih(a,e,c,f,sh,T,mh);S=wh(c)}}break}while(1);ph=!1;if(d)return null;if(null===S){if(uh)return a.pendingCommitExpirationTime=b,a.current.alternate;sh?A("262"):
void 0;0<=rh&&setTimeout(function(){var b=a.current.expirationTime;0!==b&&(0===a.remainingExpirationTime||a.remainingExpirationTime<b)&&Ah(a,b)},rh);Bh(a.current.expirationTime)}return null}
function Zg(a,b){var c;a:{ph&&!th?A("263"):void 0;for(c=a.return;null!==c;){switch(c.tag){case 2:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromCatch||"function"===typeof d.componentDidCatch&&(null===hh||!hh.has(d))){a=Xf(b,a);a=gh(c,a,1);Qf(c,a,1);og(c,1);c=void 0;break a}break;case 3:a=Xf(b,a);a=eh(c,a,1);Qf(c,a,1);og(c,1);c=void 0;break a}c=c.return}3===a.tag&&(c=Xf(b,a),c=eh(a,c,1),Qf(a,c,1),og(a,1));c=void 0}return c}
function Ch(){var a=2+25*(((mg()-2+500)/25|0)+1);a<=nh&&(a=nh+1);return nh=a}function ng(a,b){a=0!==oh?oh:ph?th?1:T:b.mode&1?Dh?2+10*(((a-2+15)/10|0)+1):2+25*(((a-2+500)/25|0)+1):1;Dh&&(0===Eh||a>Eh)&&(Eh=a);return a}
function og(a,b){for(;null!==a;){if(0===a.expirationTime||a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a.return)if(3===a.tag){var c=a.stateNode;!ph&&0!==T&&b<T&&vh();var d=c.current.expirationTime;ph&&!th&&qh===c||Ah(c,d);Fh>Gh&&A("185")}else break;a=a.return}}function mg(){mh=ef()-kh;return lh=(mh/10|0)+2}
function Hh(a){var b=oh;oh=2+25*(((mg()-2+500)/25|0)+1);try{return a()}finally{oh=b}}function Ih(a,b,c,d,e){var f=oh;oh=1;try{return a(b,c,d,e)}finally{oh=f}}var Jh=null,V=null,Kh=0,Lh=void 0,W=!1,X=null,Y=0,Eh=0,Mh=!1,Nh=!1,Oh=null,Ph=null,Z=!1,Qh=!1,Dh=!1,Rh=null,Gh=1E3,Fh=0,Sh=1;function Th(a){if(0!==Kh){if(a>Kh)return;null!==Lh&&gf(Lh)}var b=ef()-kh;Kh=a;Lh=ff(Uh,{timeout:10*(a-2)-b})}
function Ah(a,b){if(null===a.nextScheduledRoot)a.remainingExpirationTime=b,null===V?(Jh=V=a,a.nextScheduledRoot=a):(V=V.nextScheduledRoot=a,V.nextScheduledRoot=Jh);else{var c=a.remainingExpirationTime;if(0===c||b<c)a.remainingExpirationTime=b}W||(Z?Qh&&(X=a,Y=1,Vh(a,1,!1)):1===b?Wh():Th(b))}
function Xh(){var a=0,b=null;if(null!==V)for(var c=V,d=Jh;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===V?A("244"):void 0;if(d===d.nextScheduledRoot){Jh=V=d.nextScheduledRoot=null;break}else if(d===Jh)Jh=e=d.nextScheduledRoot,V.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===V){V=c;V.nextScheduledRoot=Jh;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot}else{if(0===a||e<a)a=e,b=d;if(d===V)break;
c=d;d=d.nextScheduledRoot}}c=X;null!==c&&c===b&&1===a?Fh++:Fh=0;X=b;Y=a}function Uh(a){Yh(0,!0,a)}function Wh(){Yh(1,!1,null)}function Yh(a,b,c){Ph=c;Xh();if(b)for(;null!==X&&0!==Y&&(0===a||a>=Y)&&(!Mh||mg()>=Y);)mg(),Vh(X,Y,!Mh),Xh();else for(;null!==X&&0!==Y&&(0===a||a>=Y);)Vh(X,Y,!1),Xh();null!==Ph&&(Kh=0,Lh=null);0!==Y&&Th(Y);Ph=null;Mh=!1;Zh()}function $h(a,b){W?A("253"):void 0;X=a;Y=b;Vh(a,b,!1);Wh();Zh()}
function Zh(){Fh=0;if(null!==Rh){var a=Rh;Rh=null;for(var b=0;b<a.length;b++){var c=a[b];try{c._onComplete()}catch(d){Nh||(Nh=!0,Oh=d)}}}if(Nh)throw a=Oh,Oh=null,Nh=!1,a;}function Vh(a,b,c){W?A("245"):void 0;W=!0;c?(c=a.finishedWork,null!==c?ai(a,c,b):(c=yh(a,b,!0),null!==c&&(zh()?a.finishedWork=c:ai(a,c,b)))):(c=a.finishedWork,null!==c?ai(a,c,b):(c=yh(a,b,!1),null!==c&&ai(a,c,b)));W=!1}
function ai(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===Rh?Rh=[d]:Rh.push(d),d._defer)){a.finishedWork=b;a.remainingExpirationTime=0;return}a.finishedWork=null;th=ph=!0;c=b.stateNode;c.current===b?A("177"):void 0;d=c.pendingCommitExpirationTime;0===d?A("261"):void 0;c.pendingCommitExpirationTime=0;mg();ec.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var e=b.firstEffect}else e=b;else e=b.firstEffect;af=Hd;var f=da();if(Ud(f)){if("selectionStart"in
f)var g={start:f.selectionStart,end:f.selectionEnd};else a:{var h=window.getSelection&&window.getSelection();if(h&&0!==h.rangeCount){g=h.anchorNode;var k=h.anchorOffset,n=h.focusNode;h=h.focusOffset;try{g.nodeType,n.nodeType}catch(Wa){g=null;break a}var r=0,w=-1,P=-1,nc=0,Jd=0,E=f,t=null;b:for(;;){for(var x;;){E!==g||0!==k&&3!==E.nodeType||(w=r+k);E!==n||0!==h&&3!==E.nodeType||(P=r+h);3===E.nodeType&&(r+=E.nodeValue.length);if(null===(x=E.firstChild))break;t=E;E=x}for(;;){if(E===f)break b;t===g&&
++nc===k&&(w=r);t===n&&++Jd===h&&(P=r);if(null!==(x=E.nextSibling))break;E=t;t=E.parentNode}E=x}g=-1===w||-1===P?null:{start:w,end:P}}else g=null}g=g||{start:0,end:0}}else g=null;bf={focusedElem:f,selectionRange:g};Id(!1);for(U=e;null!==U;){f=!1;g=void 0;try{for(;null!==U;){if(U.effectTag&256){var u=U.alternate;k=U;switch(k.tag){case 2:if(k.effectTag&256&&null!==u){var y=u.memoizedProps,D=u.memoizedState,ja=k.stateNode;ja.props=k.memoizedProps;ja.state=k.memoizedState;var mi=ja.getSnapshotBeforeUpdate(y,
D);ja.__reactInternalSnapshotBeforeUpdate=mi}break;case 3:case 5:case 6:case 4:break;default:A("163")}}U=U.nextEffect}}catch(Wa){f=!0,g=Wa}f&&(null===U?A("178"):void 0,Zg(U,g),null!==U&&(U=U.nextEffect))}for(U=e;null!==U;){u=!1;y=void 0;try{for(;null!==U;){var q=U.effectTag;q&16&&Ke(U.stateNode,"");if(q&128){var z=U.alternate;if(null!==z){var l=z.ref;null!==l&&("function"===typeof l?l(null):l.current=null)}}switch(q&14){case 2:ch(U);U.effectTag&=-3;break;case 6:ch(U);U.effectTag&=-3;dh(U.alternate,
U);break;case 4:dh(U.alternate,U);break;case 8:D=U,ah(D),D.return=null,D.child=null,D.alternate&&(D.alternate.child=null,D.alternate.return=null)}U=U.nextEffect}}catch(Wa){u=!0,y=Wa}u&&(null===U?A("178"):void 0,Zg(U,y),null!==U&&(U=U.nextEffect))}l=bf;z=da();q=l.focusedElem;u=l.selectionRange;if(z!==q&&fa(document.documentElement,q)){null!==u&&Ud(q)&&(z=u.start,l=u.end,void 0===l&&(l=z),"selectionStart"in q?(q.selectionStart=z,q.selectionEnd=Math.min(l,q.value.length)):window.getSelection&&(z=window.getSelection(),
y=q[lb()].length,l=Math.min(u.start,y),u=void 0===u.end?l:Math.min(u.end,y),!z.extend&&l>u&&(y=u,u=l,l=y),y=Td(q,l),D=Td(q,u),y&&D&&(1!==z.rangeCount||z.anchorNode!==y.node||z.anchorOffset!==y.offset||z.focusNode!==D.node||z.focusOffset!==D.offset)&&(ja=document.createRange(),ja.setStart(y.node,y.offset),z.removeAllRanges(),l>u?(z.addRange(ja),z.extend(D.node,D.offset)):(ja.setEnd(D.node,D.offset),z.addRange(ja)))));z=[];for(l=q;l=l.parentNode;)1===l.nodeType&&z.push({element:l,left:l.scrollLeft,
top:l.scrollTop});"function"===typeof q.focus&&q.focus();for(q=0;q<z.length;q++)l=z[q],l.element.scrollLeft=l.left,l.element.scrollTop=l.top}bf=null;Id(af);af=null;c.current=b;for(U=e;null!==U;){e=!1;q=void 0;try{for(z=d;null!==U;){var hg=U.effectTag;if(hg&36){var oc=U.alternate;l=U;u=z;switch(l.tag){case 2:var ca=l.stateNode;if(l.effectTag&4)if(null===oc)ca.props=l.memoizedProps,ca.state=l.memoizedState,ca.componentDidMount();else{var wi=oc.memoizedProps,xi=oc.memoizedState;ca.props=l.memoizedProps;
ca.state=l.memoizedState;ca.componentDidUpdate(wi,xi,ca.__reactInternalSnapshotBeforeUpdate)}var Ng=l.updateQueue;null!==Ng&&(ca.props=l.memoizedProps,ca.state=l.memoizedState,Wf(l,Ng,ca,u));break;case 3:var Og=l.updateQueue;if(null!==Og){y=null;if(null!==l.child)switch(l.child.tag){case 5:y=l.child.stateNode;break;case 2:y=l.child.stateNode}Wf(l,Og,y,u)}break;case 5:var yi=l.stateNode;null===oc&&l.effectTag&4&&cf(l.type,l.memoizedProps)&&yi.focus();break;case 6:break;case 4:break;case 15:break;case 16:break;
default:A("163")}}if(hg&128){l=void 0;var yc=U.ref;if(null!==yc){var Pg=U.stateNode;switch(U.tag){case 5:l=Pg;break;default:l=Pg}"function"===typeof yc?yc(l):yc.current=l}}var zi=U.nextEffect;U.nextEffect=null;U=zi}}catch(Wa){e=!0,q=Wa}e&&(null===U?A("178"):void 0,Zg(U,q),null!==U&&(U=U.nextEffect))}ph=th=!1;"function"===typeof Jf&&Jf(b.stateNode);b=c.current.expirationTime;0===b&&(hh=null);a.remainingExpirationTime=b}function zh(){return null===Ph||Ph.timeRemaining()>Sh?!1:Mh=!0}
function fh(a){null===X?A("246"):void 0;X.remainingExpirationTime=0;Nh||(Nh=!0,Oh=a)}function Bh(a){null===X?A("246"):void 0;X.remainingExpirationTime=a}function bi(a,b){var c=Z;Z=!0;try{return a(b)}finally{(Z=c)||W||Wh()}}function ci(a,b){if(Z&&!Qh){Qh=!0;try{return a(b)}finally{Qh=!1}}return a(b)}function di(a,b){W?A("187"):void 0;var c=Z;Z=!0;try{return Ih(a,b)}finally{Z=c,Wh()}}
function ei(a,b,c){if(Dh)return a(b,c);Z||W||0===Eh||(Yh(Eh,!1,null),Eh=0);var d=Dh,e=Z;Z=Dh=!0;try{return a(b,c)}finally{Dh=d,(Z=e)||W||Wh()}}function fi(a){var b=Z;Z=!0;try{Ih(a)}finally{(Z=b)||W||Yh(1,!1,null)}}
function gi(a,b,c,d,e){var f=b.current;if(c){c=c._reactInternalFiber;var g;b:{2===jd(c)&&2===c.tag?void 0:A("170");for(g=c;3!==g.tag;){if(qf(g)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}(g=g.return)?void 0:A("171")}g=g.stateNode.context}c=qf(c)?vf(c,g):g}else c=ha;null===b.context?b.context=c:b.pendingContext=c;b=e;e=Of(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);Qf(f,e,d);og(f,d);return d}
function hi(a){var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?A("188"):A("268",Object.keys(a)));a=md(b);return null===a?null:a.stateNode}function ii(a,b,c,d){var e=b.current,f=mg();e=ng(f,e);return gi(a,b,c,e,d)}function ji(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}
function ki(a){var b=a.findFiberByHostInstance;return If(p({},a,{findHostInstanceByFiber:function(a){a=md(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))}
var li={updateContainerAtExpirationTime:gi,createContainer:function(a,b,c){return Ef(a,b,c)},updateContainer:ii,flushRoot:$h,requestWork:Ah,computeUniqueAsyncExpiration:Ch,batchedUpdates:bi,unbatchedUpdates:ci,deferredUpdates:Hh,syncUpdates:Ih,interactiveUpdates:ei,flushInteractiveUpdates:function(){W||0===Eh||(Yh(Eh,!1,null),Eh=0)},flushControlled:fi,flushSync:di,getPublicRootInstance:ji,findHostInstance:hi,findHostInstanceWithNoPortals:function(a){a=nd(a);return null===a?null:a.stateNode},injectIntoDevTools:ki};
function ni(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:hc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}Kb.injectFiberControlledHostComponent($e);function oi(a){this._expirationTime=Ch();this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0}
oi.prototype.render=function(a){this._defer?void 0:A("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new pi;gi(a,b,null,c,d._onCommit);return d};oi.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
oi.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:A("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?A("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this}this._defer=!1;$h(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children)}else this._next=
null,this._defer=!1};oi.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0,a[b])()}};function pi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this)}pi.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a)}};
pi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?A("191",c):void 0;c()}}};function qi(a,b,c){this._internalRoot=Ef(a,b,c)}qi.prototype.render=function(a,b){var c=this._internalRoot,d=new pi;b=void 0===b?null:b;null!==b&&d.then(b);ii(a,c,null,d._onCommit);return d};
qi.prototype.unmount=function(a){var b=this._internalRoot,c=new pi;a=void 0===a?null:a;null!==a&&c.then(a);ii(null,b,null,c._onCommit);return c};qi.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new pi;c=void 0===c?null:c;null!==c&&e.then(c);ii(b,d,a,e._onCommit);return e};
qi.prototype.createBatch=function(){var a=new oi(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a)}return a};function ri(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Sb=li.batchedUpdates;Tb=li.interactiveUpdates;Ub=li.flushInteractiveUpdates;
function si(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qi(a,!1,b)}
function ti(a,b,c,d,e){ri(c)?void 0:A("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=ji(f._internalRoot);g.call(a)}}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)}else{f=c._reactRootContainer=si(c,d);if("function"===typeof e){var h=e;e=function(){var a=ji(f._internalRoot);h.call(a)}}ci(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e)})}return ji(f._internalRoot)}
function ui(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;ri(b)?void 0:A("200");return ni(a,b,null,c)}
var vi={createPortal:ui,findDOMNode:function(a){return null==a?null:1===a.nodeType?a:hi(a)},hydrate:function(a,b,c){return ti(null,a,b,!0,c)},render:function(a,b,c){return ti(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?A("38"):void 0;return ti(a,b,c,!1,d)},unmountComponentAtNode:function(a){ri(a)?void 0:A("40");return a._reactRootContainer?(ci(function(){ti(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:function(){return ui.apply(void 0,
arguments)},unstable_batchedUpdates:bi,unstable_deferredUpdates:Hh,unstable_interactiveUpdates:ei,flushSync:di,unstable_flushControlled:fi,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Ka,EventPluginRegistry:va,EventPropagators:$a,ReactControlledComponent:Rb,ReactDOMComponentTree:Qa,ReactDOMEventListener:Nd},unstable_createRoot:function(a,b){return new qi(a,!0,null!=b&&!0===b.hydrate)}};ki({findFiberByHostInstance:Na,bundleType:0,version:"16.4.1",rendererPackageName:"react-dom"});
var Ai={default:vi},Bi=Ai&&vi||Ai;module.exports=Bi.default?Bi.default:Bi;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(24);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(25);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_countries_api__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_countries_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_countries_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_css__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CountryCards__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Pagination__ = __webpack_require__(40);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var App=function(_Component){_inherits(App,_Component);function App(){var _ref;var _temp,_this,_ret;_classCallCheck(this,App);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=App.__proto__||Object.getPrototypeOf(App)).call.apply(_ref,[this].concat(args))),_this),_this.state={allCountries:[],currentCountries:[],currentPage:null,totalPages:null},_this.onPageChanged=function(data){var allCountries=_this.state.allCountries;var currentPage=data.currentPage,totalPages=data.totalPages,pageLimit=data.pageLimit;var offset=(currentPage-1)*pageLimit;var currentCountries=allCountries.slice(offset,offset+pageLimit);_this.setState({currentPage:currentPage,currentCountries:currentCountries,totalPages:totalPages});},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(App,[{key:'componentDidMount',value:function componentDidMount(){var _Countries$findAll=__WEBPACK_IMPORTED_MODULE_1_countries_api___default.a.findAll(),_Countries$findAll$da=_Countries$findAll.data,allCountries=_Countries$findAll$da===undefined?[]:_Countries$findAll$da;this.setState({allCountries:allCountries});}},{key:'render',value:function render(){var _state=this.state,allCountries=_state.allCountries,currentCountries=_state.currentCountries,currentPage=_state.currentPage,totalPages=_state.totalPages;var totalCountries=allCountries.length;if(totalCountries===0)return null;var headerClass=['text-dark py-2 pr-4 m-0',currentPage?'border-gray border-right':''].join(' ').trim();return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'container mb-5'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'row d-flex flex-row py-5'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'d-flex flex-row align-items-center'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('h2',{className:headerClass},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('strong',{className:'text-secondary'},totalCountries),' Countries'),currentPage&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'current-page d-inline-block h-100 pl-4 text-secondary'},'Page ',__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'font-weight-bold'},currentPage),' / ',__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'font-weight-bold'},totalPages))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'d-flex flex-row py-4 align-items-center'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Pagination__["a" /* default */],{totalRecords:totalCountries,pageLimit:18,pageNeighbours:1,onPageChanged:this.onPageChanged}))),currentCountries.map(function(country){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_CountryCards__["a" /* default */],{key:country.cca3,country:country});})));}}]);return App;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Countries = __webpack_require__(29)
/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = Countries;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Types = __webpack_require__(30)
const Constant = __webpack_require__(7)
const Service = __webpack_require__(31)
const Responder = __webpack_require__(8)

let Queries = {
  /**
   * @function find
   * common handler for all the available APIs
   */
  find : (prop, value, index) => {
    let findBy = typeof prop === 'string' ? Types[prop] : 'Ghost'
    prop = (prop === 'lat' || prop === 'lng') ? 'latlng' : prop

    switch(findBy) {
      case Constant.STRING:
        return Service.findByString(prop, value)
        break
      case Constant.ARRAY:
        return Service.findInArray(prop, value)
        break
      case Constant.ARRAY_MULTIPLE:
        return Service.findArrayMultiple(prop, value)
        break
      case Constant.ARRAY_INDEX:
        return Service.findArrayIndex(prop, value, index)
        break
      case Constant.ARRAY_EQUAL:
        return Service.findArrayEqual(prop, value)
        break
      case Constant.OBJECT:
        return Service.findInObject(prop, value, index)
        break
      case Constant.ALL:
        return Service.findAll()
        break
      default:
        return Responder(null)
    }
  },
 /**
 * @api {get} findByCountryCode Request Country By its  code ISO 3166-1 alpha-2
 * @apiName findByCountryCode
 *
 * @apiParam {String} code unique country code.
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
	findByCountryCode : (code) => {
		return Queries.find('cca2', code)
	},
 /**
 * @api {get} findByCCN3 Request Country By its ISO 3166-1 numeric
 * @apiName findByCCN3
 *
 * @apiParam {String} code unique code ISO 3166-1 numeric.
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByCCN3 : (code) => {
    return Queries.find('ccn3', code)
  },
  /**
 * @api {get} findByCCA3 Request Country By its ISO 3166-1 alpha-3
 * @apiName findByCCA3
 *
 * @apiParam {String} code unique code ISO ISO 3166-1 alpha-3
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByCCA3 : (code) => {
    return Queries.find('cca3', code)
  },
   /**
 * @api {get} findByCIOC Request Country By its International Olympic Committee
 * @apiName findByCIOC
 *
 * @apiParam {String} code unique code International Olympic Committee
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByCIOC : (code) => {
    return Queries.find('cca3', code)
  },
    /**
 * @api {get} findByCapital Request Country By its Capital
 * @apiName findByCapital
 *
 * @apiParam {String} code Capital
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByCapital : (code) => {
    return Queries.find('capital', code)
  },
   /**
 * @api {get} findBySubRegion Request Countries By sub region
 * @apiName findBySubRegion
 *
 * @apiParam {String} code sub region value
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findBySubRegion : (code) => {
    return Queries.find('subregion', code)
  },
   /**
 * @api {get} findByRegion Request Countries By region
 * @apiName findByRegion
 *
 * @apiParam {String} code region value
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByRegion : (code) => {
    return Queries.find('region', code)
  },
   /**
 * @api {get} findByResidentName Request Country By name of residents
 * @apiName findByResidentName
 *
 * @apiParam {String} code name of residents
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByResidentName : (code) => {
    return Queries.find('demonym', code)
  },
/**
 * @api {get} findByLandLock Request Countries By landlocked status
 * @apiName findByLandLock
 *
 * @apiParam {String} code landlocked status
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByLandLock : (code) => {
    return Queries.find('landlocked', code)
  },
/**
 * @api {get} findByArea Request Countries By land area in km²
 * @apiName findByArea
 *
 * @apiParam {Number} code land area in km²
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByArea : (code) => {
    return Queries.find('area', code)
  },
/**
 * @api {get} findByCurrency Request Countries By ISO 4217 currency code(s)
 * @apiName findByCurrency
 *
 * @apiParam {String} code ISO 4217 currency code(s)
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByCurrency: (code) => {
    return Queries.find('currency', code)
  },
/**
 * @api {get} findByCallingCode Request Country By calling code(s)
 * @apiName findByCallingCode
 *
 * @apiParam {String} code calling code(s)
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByCallingCode: (code) => {
    return Queries.find('callingCode', code)
  },
/**
 * @api {get} findBySpellings Request Countries By alternative spellings
 * @apiName findBySpellings
 *
 * @apiParam {String} code alternative spellings
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findBySpellings: (code) => {
    return Queries.find('altSpellings', code)
  },
/**
 * @api {get} findByBorders Request Countries By land borders
 * @apiName findByBorders
 *
 * @apiParam {String} code land borders
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByBorders: (code) => {
    return Queries.find('borders', code)
  },
/**
 * @api {get} findByTLD Request Countries By country code top-level domain
 * @apiName findByTLD
 *
 * @apiParam {String} code country code top-level domain
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByTLD: (code) => {
    return Queries.find('tld', code)
  },
/**
 * @api {get} findByLat Request Country By latitude
 * @apiName findByLat
 *
 * @apiParam {Number} code latitude
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByLat: (code) => {
    return Queries.find('lat', code, 0)
  },
/**
 * @api {get} findByLong Request Country By longitude
 * @apiName findByLong
 *
 * @apiParam {Number} code longitude
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByLong: (code) => {
    return Queries.find('lng', code, 1)
  },
/**
 * @api {get} findByLatLong Request Country By latitude and longitude
 * @apiName findByLatLong
 *
 * @apiParam {Array} code [latitude ,longitude]
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByLatLong: (code) => {
    return Queries.find('latlng', code)
  },
/**
 * @api {get} findByName Request Country By common name in english
 * @apiName findByName
 *
 * @apiParam {String} code common name in english
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByName: (code) => {
    return Queries.find('name', code, 'common')
  },
/**
 * @api {get} findByOfficialName Request Country By official name in english
 * @apiName findByOfficialName
 *
 * @apiParam {String} code official name in english
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByOfficialName: (code) => {
    return Queries.find('name', code, 'official')
  },
/**
 * @api {get} findByLanguage Request Countries By list of official languages
 * @apiName findByLanguage
 *
 * @apiParam {String} code list of official languages
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findByLanguage: (code) => {
    return Queries.find('languages', code)
  },
  /**
 * @api {get} findAll Request All Countries
 * @apiName findAll
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findAll: () => {
    return Queries.find('all')
  },
  /**
 * @api {get} findById Request Country By its  unique identfiaction number
 * @apiName findById
 *
 * @apiParam {Number} id unique identification number.
 *
 * @apiSuccess {Object[]} response "response" is only a placeholder.
 * @apiSuccess {Number}   response.statusCode  Response Code.
 * @apiSuccess {Boolean}  response.error  Error.
 * @apiSuccess {String}   response.message  Response message.
 * @apiSuccess {Array[]}  response.data  Array containing country Object.
 */
  findById : (id) => {
    return Queries.find('id', id)
  },
}

/**
 * `API` constructor.
 *
 * @api public
*/
module.exports = Queries

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Constant = __webpack_require__(7)

const types = {
  'cca2': Constant.STRING,
  'ccn3': Constant.STRING,
  'cca3': Constant.STRING,
  'cioc': Constant.STRING,
  'capital': Constant.STRING,
  'region': Constant.STRING,
  'subregion': Constant.STRING,
  'demonym': Constant.STRING,
  'landlocked': Constant.STRING,
  'area': Constant.STRING,
  'id': Constant.STRING,
  'currency': Constant.ARRAY,
  'callingCode': Constant.ARRAY,
  'altSpellings': Constant.ARRAY_MULTIPLE,
  'borders': Constant.ARRAY_MULTIPLE,
  'tld': Constant.ARRAY_MULTIPLE,
  'lat': Constant.ARRAY_INDEX,
  'lng': Constant.ARRAY_INDEX,
  'latlng': Constant.ARRAY_EQUAL,
  'name': Constant.OBJECT,
  'languages': Constant.ARRAY_MULTIPLE,
  'all': Constant.ALL
}

module.exports = types

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const DATA = __webpack_require__(32)
const _ = __webpack_require__(33)
const Responder = __webpack_require__(8)

const findByString = (prop, value) => {
  let filtered = _.filter(DATA, (c) => {
    if(_.isEqual(c[prop], value)) {
      return c
    }
  });
  return Responder(filtered)
}

const findInArray = (prop, value) => {
  let filtered = _.filter(DATA, (c) => {
    if(_.contains(c[prop], value)) {
      return c
    }
  });
  return Responder(filtered)
}

const findArrayMultiple = (prop, value) => {
  let filtered = _.filter(DATA, (c) => {
    return _(c[prop]).values().some( (v) => {
      return v === value
    })
  })
  return Responder(filtered)
}

const findArrayIndex = (prop, value, index) => {
  let filtered = _.filter(DATA, (c) => {
    if(_.isEqual(c[prop][index], value)) {
      return c
    }
  });
  return Responder(filtered)
}

const findArrayEqual = (prop, values) => {
  let filtered = _.filter(DATA, (c) => {
    if(_.isEqual(c[prop], values)) {
      return c
    }
  });
  return Responder(filtered)
}

const findInObject = (prop, value, index) => {
  let match = {}
    match[value] = true

  let filtered = _.filter(DATA, (val) => {
    return match[val[prop][index]];
});
  return Responder(filtered)
}

const findAll = () => {
  return Responder(DATA)
}

module.exports = {
  findByString: findByString,
  findArrayEqual: findArrayEqual,
  findArrayIndex: findArrayIndex,
  findArrayMultiple: findArrayMultiple,
  findInArray: findInArray,
  findInObject: findInObject,
  findAll: findAll
}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = [{"name":{"common":"Aruba","official":"Aruba","native":{"nld":{"official":"Aruba","common":"Aruba"},"pap":{"official":"Aruba","common":"Aruba"}}},"tld":[".aw"],"cca2":"AW","ccn3":"533","cca3":"ABW","cioc":"ARU","currency":["AWG"],"callingCode":["297"],"capital":"Oranjestad","altSpellings":["AW"],"region":"Americas","subregion":"Caribbean","languages":{"nld":"Dutch","pap":"Papiamento"},"translations":{"deu":{"official":"Aruba","common":"Aruba"},"fra":{"official":"Aruba","common":"Aruba"},"hrv":{"official":"Aruba","common":"Aruba"},"ita":{"official":"Aruba","common":"Aruba"},"jpn":{"official":"アルバ","common":"アルバ"},"nld":{"official":"Aruba","common":"Aruba"},"por":{"official":"Aruba","common":"Aruba"},"rus":{"official":"Аруба","common":"Аруба"},"spa":{"official":"Aruba","common":"Aruba"},"fin":{"official":"Aruba","common":"Aruba"},"zho":{"official":"阿鲁巴","common":"阿鲁巴"}},"latlng":[12.5,-69.96666666],"demonym":"Aruban","landlocked":false,"borders":[],"area":180,"id":1},{"name":{"common":"Afghanistan","official":"Islamic Republic of Afghanistan","native":{"prs":{"official":"جمهوری اسلامی افغانستان","common":"افغانستان"},"pus":{"official":"د افغانستان اسلامي جمهوریت","common":"افغانستان"},"tuk":{"official":"Owganystan Yslam Respublikasy","common":"Owganystan"}}},"tld":[".af"],"cca2":"AF","ccn3":"004","cca3":"AFG","cioc":"AFG","currency":["AFN"],"callingCode":["93"],"capital":"Kabul","altSpellings":["AF","Afġānistān"],"region":"Asia","subregion":"Southern Asia","languages":{"prs":"Dari","pus":"Pashto","tuk":"Turkmen"},"translations":{"cym":{"official":"Islamic Republic of Afghanistan","common":"Affganistan"},"deu":{"official":"Islamische Republik Afghanistan","common":"Afghanistan"},"fra":{"official":"République islamique d'Afghanistan","common":"Afghanistan"},"hrv":{"official":"Islamska Republika Afganistan","common":"Afganistan"},"ita":{"official":"Repubblica islamica dell'Afghanistan","common":"Afghanistan"},"jpn":{"official":"アフガニスタン·イスラム共和国","common":"アフガニスタン"},"nld":{"official":"Islamitische Republiek Afghanistan","common":"Afghanistan"},"por":{"official":"República Islâmica do Afeganistão","common":"Afeganistão"},"rus":{"official":"Исламская Республика Афганистан","common":"Афганистан"},"spa":{"official":"República Islámica de Afganistán","common":"Afganistán"},"fin":{"official":"Afganistanin islamilainen tasavalta","common":"Afganistan"},"zho":{"official":"阿富汗伊斯兰共和国","common":"阿富汗"}},"latlng":[33,65],"demonym":"Afghan","landlocked":true,"borders":["IRN","PAK","TKM","UZB","TJK","CHN"],"area":652230,"id":2},{"name":{"common":"Angola","official":"Republic of Angola","native":{"por":{"official":"República de Angola","common":"Angola"}}},"tld":[".ao"],"cca2":"AO","ccn3":"024","cca3":"AGO","cioc":"ANG","currency":["AOA"],"callingCode":["244"],"capital":"Luanda","altSpellings":["AO","República de Angola","ʁɛpublika de an'ɡɔla"],"region":"Africa","subregion":"Middle Africa","languages":{"por":"Portuguese"},"translations":{"cym":{"official":"Republic of Angola","common":"Angola"},"deu":{"official":"Republik Angola","common":"Angola"},"fra":{"official":"République d'Angola","common":"Angola"},"hrv":{"official":"Republika Angola","common":"Angola"},"ita":{"official":"Repubblica dell'Angola","common":"Angola"},"jpn":{"official":"アンゴラ共和国","common":"アンゴラ"},"nld":{"official":"Republiek Angola","common":"Angola"},"por":{"official":"República de Angola","common":"Angola"},"rus":{"official":"Республика Ангола","common":"Ангола"},"spa":{"official":"República de Angola","common":"Angola"},"fin":{"official":"Angolan tasavalta","common":"Angola"},"zho":{"official":"安哥拉共和国","common":"安哥拉"}},"latlng":[-12.5,18.5],"demonym":"Angolan","landlocked":false,"borders":["COG","COD","ZMB","NAM"],"area":1246700,"id":3},{"name":{"common":"Anguilla","official":"Anguilla","native":{"eng":{"official":"Anguilla","common":"Anguilla"}}},"tld":[".ai"],"cca2":"AI","ccn3":"660","cca3":"AIA","cioc":"","currency":["XCD"],"callingCode":["1264"],"capital":"The Valley","altSpellings":["AI"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Anguilla","common":"Anguilla"},"fra":{"official":"Anguilla","common":"Anguilla"},"hrv":{"official":"Anguilla","common":"Angvila"},"ita":{"official":"Anguilla","common":"Anguilla"},"jpn":{"official":"アングィラ","common":"アンギラ"},"nld":{"official":"Anguilla","common":"Anguilla"},"por":{"official":"Anguilla","common":"Anguilla"},"rus":{"official":"Ангилья","common":"Ангилья"},"spa":{"official":"Anguila","common":"Anguilla"},"fin":{"official":"Anguilla","common":"Anguilla"},"zho":{"official":"安圭拉","common":"安圭拉"}},"latlng":[18.25,-63.16666666],"demonym":"Anguillian","landlocked":false,"borders":[],"area":91,"id":4},{"name":{"common":"Åland Islands","official":"Åland Islands","native":{"swe":{"official":"Landskapet Åland","common":"Åland"}}},"tld":[".ax"],"cca2":"AX","ccn3":"248","cca3":"ALA","cioc":"","currency":["EUR"],"callingCode":["358"],"capital":"Mariehamn","altSpellings":["AX","Aaland","Aland","Ahvenanmaa"],"region":"Europe","subregion":"Northern Europe","languages":{"swe":"Swedish"},"translations":{"deu":{"official":"Åland-Inseln","common":"Åland"},"fra":{"official":"Ahvenanmaa","common":"Ahvenanmaa"},"hrv":{"official":"Aland Islands","common":"Ålandski otoci"},"ita":{"official":"Isole Åland","common":"Isole Aland"},"jpn":{"official":"オーランド諸島","common":"オーランド諸島"},"nld":{"official":"Åland eilanden","common":"Ålandeilanden"},"por":{"official":"Ilhas Åland","common":"Alândia"},"rus":{"official":"Аландские острова","common":"Аландские острова"},"spa":{"official":"Islas Åland","common":"Alandia"},"fin":{"official":"Ahvenanmaan maakunta","common":"Ahvenanmaa"},"zho":{"official":"奥兰群岛","common":"奥兰群岛"}},"latlng":[60.116667,19.9],"demonym":"Ålandish","landlocked":false,"borders":[],"area":1580,"id":5},{"name":{"common":"Albania","official":"Republic of Albania","native":{"sqi":{"official":"Republika e Shqipërisë","common":"Shqipëria"}}},"tld":[".al"],"cca2":"AL","ccn3":"008","cca3":"ALB","cioc":"ALB","currency":["ALL"],"callingCode":["355"],"capital":"Tirana","altSpellings":["AL","Shqipëri","Shqipëria","Shqipnia"],"region":"Europe","subregion":"Southern Europe","languages":{"sqi":"Albanian"},"translations":{"cym":{"official":"Republic of Albania","common":"Albania"},"deu":{"official":"Republik Albanien","common":"Albanien"},"fra":{"official":"République d'Albanie","common":"Albanie"},"hrv":{"official":"Republika Albanija","common":"Albanija"},"ita":{"official":"Repubblica d'Albania","common":"Albania"},"jpn":{"official":"アルバニア共和国","common":"アルバニア"},"nld":{"official":"Republiek Albanië","common":"Albanië"},"por":{"official":"República da Albânia","common":"Albânia"},"rus":{"official":"Республика Албания","common":"Албания"},"spa":{"official":"República de Albania","common":"Albania"},"fin":{"official":"Albanian tasavalta","common":"Albania"},"zho":{"official":"阿尔巴尼亚共和国","common":"阿尔巴尼亚"}},"latlng":[41,20],"demonym":"Albanian","landlocked":false,"borders":["MNE","GRC","MKD","UNK"],"area":28748,"id":6},{"name":{"common":"Andorra","official":"Principality of Andorra","native":{"cat":{"official":"Principat d'Andorra","common":"Andorra"}}},"tld":[".ad"],"cca2":"AD","ccn3":"020","cca3":"AND","cioc":"AND","currency":["EUR"],"callingCode":["376"],"capital":"Andorra la Vella","altSpellings":["AD","Principality of Andorra","Principat d'Andorra"],"region":"Europe","subregion":"Southern Europe","languages":{"cat":"Catalan"},"translations":{"cym":{"official":"Principality of Andorra","common":"Andorra"},"deu":{"official":"Fürstentum Andorra","common":"Andorra"},"fra":{"official":"Principauté d'Andorre","common":"Andorre"},"hrv":{"official":"Kneževina Andora","common":"Andora"},"ita":{"official":"Principato di Andorra","common":"Andorra"},"jpn":{"official":"アンドラ公国","common":"アンドラ"},"nld":{"official":"Prinsdom Andorra","common":"Andorra"},"por":{"official":"Principado de Andorra","common":"Andorra"},"rus":{"official":"Княжество Андорра","common":"Андорра"},"spa":{"official":"Principado de Andorra","common":"Andorra"},"fin":{"official":"Andorran ruhtinaskunta","common":"Andorra"},"zho":{"official":"安道尔公国","common":"安道尔"}},"latlng":[42.5,1.5],"demonym":"Andorran","landlocked":true,"borders":["FRA","ESP"],"area":468,"id":7},{"name":{"common":"United Arab Emirates","official":"United Arab Emirates","native":{"ara":{"official":"الإمارات العربية المتحدة","common":"دولة الإمارات العربية المتحدة"}}},"tld":[".ae","امارات."],"cca2":"AE","ccn3":"784","cca3":"ARE","cioc":"UAE","currency":["AED"],"callingCode":["971"],"capital":"Abu Dhabi","altSpellings":["AE","UAE","Emirates"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Vereinigte Arabische Emirate","common":"Vereinigte Arabische Emirate"},"fra":{"official":"Émirats arabes unis","common":"Émirats arabes unis"},"hrv":{"official":"Ujedinjeni Arapski Emirati","common":"Ujedinjeni Arapski Emirati"},"ita":{"official":"Emirati Arabi Uniti","common":"Emirati Arabi Uniti"},"jpn":{"official":"アラブ首長国連邦","common":"アラブ首長国連邦"},"nld":{"official":"Verenigde Arabische Emiraten","common":"Verenigde Arabische Emiraten"},"por":{"official":"Emirados Árabes Unidos","common":"Emirados Árabes Unidos"},"rus":{"official":"Объединенные Арабские Эмираты","common":"Объединённые Арабские Эмираты"},"spa":{"official":"Emiratos Árabes Unidos","common":"Emiratos Árabes Unidos"},"fin":{"official":"Yhdistyneet arabiemiirikunnat","common":"Arabiemiraatit"},"zho":{"official":"阿拉伯联合酋长国","common":"阿拉伯联合酋长国"}},"latlng":[24,54],"demonym":"Emirati","landlocked":false,"borders":["OMN","SAU"],"area":83600,"id":8},{"name":{"common":"Argentina","official":"Argentine Republic","native":{"grn":{"official":"Argentine Republic","common":"Argentina"},"spa":{"official":"República Argentina","common":"Argentina"}}},"tld":[".ar"],"cca2":"AR","ccn3":"032","cca3":"ARG","cioc":"ARG","currency":["ARS"],"callingCode":["54"],"capital":"Buenos Aires","altSpellings":["AR","Argentine Republic","República Argentina"],"region":"Americas","subregion":"South America","languages":{"grn":"Guaraní","spa":"Spanish"},"translations":{"cym":{"official":"Argentine Republic","common":"Ariannin"},"deu":{"official":"Argentinische Republik","common":"Argentinien"},"fra":{"official":"République argentine","common":"Argentine"},"hrv":{"official":"Argentinski Republika","common":"Argentina"},"ita":{"official":"Repubblica Argentina","common":"Argentina"},"jpn":{"official":"アルゼンチン共和国","common":"アルゼンチン"},"nld":{"official":"Argentijnse Republiek","common":"Argentinië"},"por":{"official":"República Argentina","common":"Argentina"},"rus":{"official":"Аргентинская Республика","common":"Аргентина"},"spa":{"official":"República Argentina","common":"Argentina"},"fin":{"official":"Argentiinan tasavalta","common":"Argentiina"},"zho":{"official":"阿根廷共和国","common":"阿根廷"}},"latlng":[-34,-64],"demonym":"Argentinean","landlocked":false,"borders":["BOL","BRA","CHL","PRY","URY"],"area":2780400,"id":9},{"name":{"common":"Armenia","official":"Republic of Armenia","native":{"hye":{"official":"Հայաստանի Հանրապետություն","common":"Հայաստան"},"rus":{"official":"Республика Армения","common":"Армения"}}},"tld":[".am"],"cca2":"AM","ccn3":"051","cca3":"ARM","cioc":"ARM","currency":["AMD"],"callingCode":["374"],"capital":"Yerevan","altSpellings":["AM","Hayastan","Republic of Armenia","Հայաստանի Հանրապետություն"],"region":"Asia","subregion":"Western Asia","languages":{"hye":"Armenian","rus":"Russian"},"translations":{"cym":{"official":"Republic of Armenia","common":"Armenia"},"deu":{"official":"Republik Armenien","common":"Armenien"},"fra":{"official":"République d'Arménie","common":"Arménie"},"hrv":{"official":"Republika Armenija","common":"Armenija"},"ita":{"official":"Repubblica di Armenia","common":"Armenia"},"jpn":{"official":"アルメニア共和国","common":"アルメニア"},"nld":{"official":"Republiek Armenië","common":"Armenië"},"por":{"official":"República da Arménia","common":"Arménia"},"rus":{"official":"Республика Армения","common":"Армения"},"spa":{"official":"República de Armenia","common":"Armenia"},"fin":{"official":"Armenian tasavalta","common":"Armenia"},"zho":{"official":"亚美尼亚共和国","common":"亚美尼亚"}},"latlng":[40,45],"demonym":"Armenian","landlocked":true,"borders":["AZE","GEO","IRN","TUR"],"area":29743,"id":10},{"name":{"common":"American Samoa","official":"American Samoa","native":{"eng":{"official":"American Samoa","common":"American Samoa"},"smo":{"official":"Sāmoa Amelika","common":"Sāmoa Amelika"}}},"tld":[".as"],"cca2":"AS","ccn3":"016","cca3":"ASM","cioc":"ASA","currency":["USD"],"callingCode":["1684"],"capital":"Pago Pago","altSpellings":["AS","Amerika Sāmoa","Amelika Sāmoa","Sāmoa Amelika"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","smo":"Samoan"},"translations":{"deu":{"official":"Amerikanisch-Samoa","common":"Amerikanisch-Samoa"},"fra":{"official":"Samoa américaines","common":"Samoa américaines"},"hrv":{"official":"američka Samoa","common":"Američka Samoa"},"ita":{"official":"Samoa americane","common":"Samoa Americane"},"jpn":{"official":"米サモア","common":"アメリカ領サモア"},"nld":{"official":"Amerikaans Samoa","common":"Amerikaans Samoa"},"por":{"official":"Samoa americana","common":"Samoa Americana"},"rus":{"official":"американское Самоа","common":"Американское Самоа"},"spa":{"official":"Samoa Americana","common":"Samoa Americana"},"fin":{"official":"Amerikan Samoa","common":"Amerikan Samoa"},"zho":{"official":"美属萨摩亚","common":"美属萨摩亚"}},"latlng":[-14.33333333,-170],"demonym":"American Samoan","landlocked":false,"borders":[],"area":199,"id":11},{"name":{"common":"Antarctica","official":"Antarctica","native":{}},"tld":[".aq"],"cca2":"AQ","ccn3":"010","cca3":"ATA","cioc":"","currency":[],"callingCode":[],"capital":"","altSpellings":["AQ"],"region":"","subregion":"","languages":{},"translations":{"cym":{"official":"Antarctica","common":"Antarctica"},"deu":{"official":"Antarktika","common":"Antarktis"},"fra":{"official":"Antarctique","common":"Antarctique"},"hrv":{"official":"Antarktika","common":"Antarktika"},"ita":{"official":"Antartide","common":"Antartide"},"jpn":{"official":"南極大陸","common":"南極"},"nld":{"official":"Antarctica","common":"Antarctica"},"por":{"official":"Antártica","common":"Antártida"},"rus":{"official":"Антарктида","common":"Антарктида"},"spa":{"official":"Antártida","common":"Antártida"},"fin":{"official":"Etelämanner","common":"Etelämanner"},"zho":{"official":"南极洲","common":"南极洲"}},"latlng":[-90,0],"demonym":"Antarctican","landlocked":false,"borders":[],"area":14000000,"id":12},{"name":{"common":"French Southern and Antarctic Lands","official":"Territory of the French Southern and Antarctic Lands","native":{"fra":{"official":"Territoire des Terres australes et antarctiques françaises","common":"Terres australes et antarctiques françaises"}}},"tld":[".tf"],"cca2":"TF","ccn3":"260","cca3":"ATF","cioc":"","currency":["EUR"],"callingCode":[],"capital":"Port-aux-Français","altSpellings":["TF","French Southern Territories"],"region":"","subregion":"","languages":{"fra":"French"},"translations":{"deu":{"official":"Gebiet der Französisch Süd-und Antarktisgebiete","common":"Französische Süd-und Antarktisgebiete"},"fra":{"official":"Territoire des Terres australes et antarctiques françaises","common":"Terres australes et antarctiques françaises"},"hrv":{"official":"Teritoriju Francuski južni i antarktički teritoriji","common":"Francuski južni i antarktički teritoriji"},"ita":{"official":"Territorio della australi e antartiche francesi Terre","common":"Territori Francesi del Sud"},"jpn":{"official":"フランス領南方·南極地域の領土","common":"フランス領南方・南極地域"},"nld":{"official":"Grondgebied van de Franse Zuidelijke en Antarctische gebieden","common":"Franse Gebieden in de zuidelijke Indische Oceaan"},"por":{"official":"Território do Sul e Antártica Francesa","common":"Terras Austrais e Antárticas Francesas"},"rus":{"official":"Территория Французские Южные и Антарктические земли","common":"Французские Южные и Антарктические территории"},"spa":{"official":"Territorio del Francés Tierras australes y antárticas","common":"Tierras Australes y Antárticas Francesas"},"fin":{"official":"Ranskan eteläiset ja antarktiset alueet","common":"Ranskan eteläiset ja antarktiset alueet"},"zho":{"official":"法国南部和南极土地","common":"法国南部和南极土地"}},"latlng":[-49.25,69.167],"demonym":"French","landlocked":false,"borders":[],"area":7747,"id":13},{"name":{"common":"Antigua and Barbuda","official":"Antigua and Barbuda","native":{"eng":{"official":"Antigua and Barbuda","common":"Antigua and Barbuda"}}},"tld":[".ag"],"cca2":"AG","ccn3":"028","cca3":"ATG","cioc":"ANT","currency":["XCD"],"callingCode":["1268"],"capital":"Saint John's","altSpellings":["AG"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"cym":{"official":"Antigua and Barbuda","common":"Antigwa a Barbiwda"},"deu":{"official":"Antigua und Barbuda","common":"Antigua und Barbuda"},"fra":{"official":"Antigua -et-Barbuda","common":"Antigua-et-Barbuda"},"hrv":{"official":"Antigva i Barbuda","common":"Antigva i Barbuda"},"ita":{"official":"Antigua e Barbuda","common":"Antigua e Barbuda"},"jpn":{"official":"アンチグアバーブーダ","common":"アンティグア・バーブーダ"},"nld":{"official":"Antigua en Barbuda","common":"Antigua en Barbuda"},"por":{"official":"Antigua e Barbuda","common":"Antígua e Barbuda"},"rus":{"official":"Антигуа и Барбуда","common":"Антигуа и Барбуда"},"spa":{"official":"Antigua y Barbuda","common":"Antigua y Barbuda"},"fin":{"official":"Antigua ja Barbuda","common":"Antigua ja Barbuda"},"zho":{"official":"安提瓜和巴布达","common":"安提瓜和巴布达"}},"latlng":[17.05,-61.8],"demonym":"Antiguan, Barbudan","landlocked":false,"borders":[],"area":442,"id":14},{"name":{"common":"Australia","official":"Commonwealth of Australia","native":{"eng":{"official":"Commonwealth of Australia","common":"Australia"}}},"tld":[".au"],"cca2":"AU","ccn3":"036","cca3":"AUS","cioc":"AUS","currency":["AUD"],"callingCode":["61"],"capital":"Canberra","altSpellings":["AU"],"region":"Oceania","subregion":"Australia and New Zealand","languages":{"eng":"English"},"translations":{"cym":{"official":"Commonwealth of Australia","common":"Awstralia"},"deu":{"official":"Commonwealth Australien","common":"Australien"},"fra":{"official":"Australie","common":"Australie"},"hrv":{"official":"Commonwealth of Australia","common":"Australija"},"ita":{"official":"Commonwealth dell'Australia","common":"Australia"},"jpn":{"official":"オーストラリア連邦","common":"オーストラリア"},"nld":{"official":"Gemenebest van Australië","common":"Australië"},"por":{"official":"Comunidade da Austrália","common":"Austrália"},"rus":{"official":"Содружество Австралии","common":"Австралия"},"spa":{"official":"Mancomunidad de Australia","common":"Australia"},"fin":{"official":"Australian liittovaltio","common":"Australia"},"zho":{"official":"澳大利亚联邦","common":"澳大利亚"}},"latlng":[-27,133],"demonym":"Australian","landlocked":false,"borders":[],"area":7692024,"id":15},{"name":{"common":"Austria","official":"Republic of Austria","native":{"bar":{"official":"Republik Österreich","common":"Österreich"}}},"tld":[".at"],"cca2":"AT","ccn3":"040","cca3":"AUT","cioc":"AUT","currency":["EUR"],"callingCode":["43"],"capital":"Vienna","altSpellings":["AT","Osterreich","Oesterreich"],"region":"Europe","subregion":"Western Europe","languages":{"bar":"Austro-Bavarian German"},"translations":{"cym":{"official":"Republic of Austria","common":"Awstria"},"deu":{"official":"Republik Österreich","common":"Österreich"},"fra":{"official":"République d'Autriche","common":"Autriche"},"hrv":{"official":"Republika Austrija","common":"Austrija"},"ita":{"official":"Repubblica d'Austria","common":"Austria"},"jpn":{"official":"オーストリア共和国","common":"オーストリア"},"nld":{"official":"Republiek Oostenrijk","common":"Oostenrijk"},"por":{"official":"República da Áustria","common":"Áustria"},"rus":{"official":"Австрийская Республика","common":"Австрия"},"spa":{"official":"República de Austria","common":"Austria"},"fin":{"official":"Itävallan tasavalta","common":"Itävalta"},"zho":{"official":"奥地利共和国","common":"奥地利"}},"latlng":[47.33333333,13.33333333],"demonym":"Austrian","landlocked":true,"borders":["CZE","DEU","HUN","ITA","LIE","SVK","SVN","CHE"],"area":83871,"id":16},{"name":{"common":"Azerbaijan","official":"Republic of Azerbaijan","native":{"aze":{"official":"Azərbaycan Respublikası","common":"Azərbaycan"},"rus":{"official":"Азербайджанская Республика","common":"Азербайджан"}}},"tld":[".az"],"cca2":"AZ","ccn3":"031","cca3":"AZE","cioc":"AZE","currency":["AZN"],"callingCode":["994"],"capital":"Baku","altSpellings":["AZ","Republic of Azerbaijan","Azərbaycan Respublikası"],"region":"Asia","subregion":"Western Asia","languages":{"aze":"Azerbaijani","rus":"Russian"},"translations":{"cym":{"official":"Republic of Azerbaijan","common":"Aserbaijan"},"deu":{"official":"Republik Aserbaidschan","common":"Aserbaidschan"},"fra":{"official":"République d'Azerbaïdjan","common":"Azerbaïdjan"},"hrv":{"official":"Republika Azerbajdžan","common":"Azerbajdžan"},"ita":{"official":"Repubblica dell'Azerbaigian","common":"Azerbaijan"},"jpn":{"official":"アゼルバイジャン共和国","common":"アゼルバイジャン"},"nld":{"official":"Republiek Azerbeidzjan","common":"Azerbeidzjan"},"por":{"official":"República do Azerbaijão","common":"Azerbeijão"},"rus":{"official":"Азербайджанская Республика","common":"Азербайджан"},"spa":{"official":"República de Azerbaiyán","common":"Azerbaiyán"},"fin":{"official":"Azerbaidzanin tasavalta","common":"Azerbaidzan"},"zho":{"official":"阿塞拜疆共和国","common":"阿塞拜疆"}},"latlng":[40.5,47.5],"demonym":"Azerbaijani","landlocked":true,"borders":["ARM","GEO","IRN","RUS","TUR"],"area":86600,"id":17},{"name":{"common":"Burundi","official":"Republic of Burundi","native":{"fra":{"official":"République du Burundi","common":"Burundi"},"run":{"official":"Republika y'Uburundi ","common":"Uburundi"}}},"tld":[".bi"],"cca2":"BI","ccn3":"108","cca3":"BDI","cioc":"BDI","currency":["BIF"],"callingCode":["257"],"capital":"Bujumbura","altSpellings":["BI","Republic of Burundi","Republika y'Uburundi","République du Burundi"],"region":"Africa","subregion":"Eastern Africa","languages":{"fra":"French","run":"Kirundi"},"translations":{"cym":{"official":"Republic of Burundi","common":"Bwrwndi"},"deu":{"official":"Republik Burundi","common":"Burundi"},"fra":{"official":"République du Burundi","common":"Burundi"},"hrv":{"official":"Burundi","common":"Burundi"},"ita":{"official":"Repubblica del Burundi","common":"Burundi"},"jpn":{"official":"ブルンジ共和国","common":"ブルンジ"},"nld":{"official":"Republiek Burundi","common":"Burundi"},"por":{"official":"República do Burundi","common":"Burundi"},"rus":{"official":"Республика Бурунди","common":"Бурунди"},"spa":{"official":"República de Burundi","common":"Burundi"},"fin":{"official":"Burundin tasavalta","common":"Burundi"},"zho":{"official":"布隆迪共和国","common":"布隆迪"}},"latlng":[-3.5,30],"demonym":"Burundian","landlocked":true,"borders":["COD","RWA","TZA"],"area":27834,"id":18},{"name":{"common":"Belgium","official":"Kingdom of Belgium","native":{"deu":{"official":"Königreich Belgien","common":"Belgien"},"fra":{"official":"Royaume de Belgique","common":"Belgique"},"nld":{"official":"Koninkrijk België","common":"België"}}},"tld":[".be"],"cca2":"BE","ccn3":"056","cca3":"BEL","cioc":"BEL","currency":["EUR"],"callingCode":["32"],"capital":"Brussels","altSpellings":["BE","België","Belgie","Belgien","Belgique","Kingdom of Belgium","Koninkrijk België","Royaume de Belgique","Königreich Belgien"],"region":"Europe","subregion":"Western Europe","languages":{"deu":"German","fra":"French","nld":"Dutch"},"translations":{"cym":{"official":"Kingdom of Belgium","common":"Gwlad Belg"},"deu":{"official":"Königreich Belgien","common":"Belgien"},"fra":{"official":"Royaume de Belgique","common":"Belgique"},"hrv":{"official":"Kraljevina Belgija","common":"Belgija"},"ita":{"official":"Regno del Belgio","common":"Belgio"},"jpn":{"official":"ベルギー王国","common":"ベルギー"},"nld":{"official":"Koninkrijk België","common":"België"},"por":{"official":"Reino da Bélgica","common":"Bélgica"},"rus":{"official":"Королевство Бельгия","common":"Бельгия"},"spa":{"official":"Reino de Bélgica","common":"Bélgica"},"fin":{"official":"Belgian kuningaskunta","common":"Belgia"},"zho":{"official":"比利时王国","common":"比利时"}},"latlng":[50.83333333,4],"demonym":"Belgian","landlocked":false,"borders":["FRA","DEU","LUX","NLD"],"area":30528,"id":19},{"name":{"common":"Benin","official":"Republic of Benin","native":{"fra":{"official":"République du Bénin","common":"Bénin"}}},"tld":[".bj"],"cca2":"BJ","ccn3":"204","cca3":"BEN","cioc":"BEN","currency":["XOF"],"callingCode":["229"],"capital":"Porto-Novo","altSpellings":["BJ","Republic of Benin","République du Bénin"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"cym":{"official":"Republic of Benin","common":"Benin"},"deu":{"official":"Republik Benin","common":"Benin"},"fra":{"official":"République du Bénin","common":"Bénin"},"hrv":{"official":"Republika Benin","common":"Benin"},"ita":{"official":"Repubblica del Benin","common":"Benin"},"jpn":{"official":"ベナン共和国","common":"ベナン"},"nld":{"official":"Republiek Benin","common":"Benin"},"por":{"official":"República do Benin","common":"Benin"},"rus":{"official":"Республика Бенин","common":"Бенин"},"spa":{"official":"República de Benin","common":"Benín"},"fin":{"official":"Beninin tasavalta","common":"Benin"},"zho":{"official":"贝宁共和国","common":"贝宁"}},"latlng":[9.5,2.25],"demonym":"Beninese","landlocked":false,"borders":["BFA","NER","NGA","TGO"],"area":112622,"id":20},{"name":{"common":"Burkina Faso","official":"Burkina Faso","native":{"fra":{"official":"République du Burkina","common":"Burkina Faso"}}},"tld":[".bf"],"cca2":"BF","ccn3":"854","cca3":"BFA","cioc":"BUR","currency":["XOF"],"callingCode":["226"],"capital":"Ouagadougou","altSpellings":["BF"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"cym":{"official":"Burkina Faso","common":"Burkina Faso"},"deu":{"official":"Burkina Faso","common":"Burkina Faso"},"fra":{"official":"République du Burkina","common":"Burkina Faso"},"hrv":{"official":"Burkina Faso","common":"Burkina Faso"},"ita":{"official":"Burkina Faso","common":"Burkina Faso"},"jpn":{"official":"ブルキナファソ","common":"ブルキナファソ"},"nld":{"official":"Burkina Faso","common":"Burkina Faso"},"por":{"official":"Burkina Faso","common":"Burkina Faso"},"rus":{"official":"Буркина -Фасо","common":"Буркина-Фасо"},"spa":{"official":"Burkina Faso","common":"Burkina Faso"},"fin":{"official":"Burkina Faso","common":"Burkina Faso"},"zho":{"official":"布基纳法索","common":"布基纳法索"}},"latlng":[13,-2],"demonym":"Burkinabe","landlocked":true,"borders":["BEN","CIV","GHA","MLI","NER","TGO"],"area":272967,"id":21},{"name":{"common":"Bangladesh","official":"People's Republic of Bangladesh","native":{"ben":{"official":"বাংলাদেশ গণপ্রজাতন্ত্রী","common":"বাংলাদেশ"}}},"tld":[".bd"],"cca2":"BD","ccn3":"050","cca3":"BGD","cioc":"BAN","currency":["BDT"],"callingCode":["880"],"capital":"Dhaka","altSpellings":["BD","People's Republic of Bangladesh","Gônôprôjatôntri Bangladesh"],"region":"Asia","subregion":"Southern Asia","languages":{"ben":"Bengali"},"translations":{"cym":{"official":"People's Republic of Bangladesh","common":"Bangladesh"},"deu":{"official":"Volksrepublik Bangladesch","common":"Bangladesch"},"fra":{"official":"La République populaire du Bangladesh","common":"Bangladesh"},"hrv":{"official":"Narodna Republika Bangladeš","common":"Bangladeš"},"ita":{"official":"Repubblica popolare del Bangladesh","common":"Bangladesh"},"jpn":{"official":"バングラデシュ人民共和国","common":"バングラデシュ"},"nld":{"official":"Volksrepubliek Bangladesh","common":"Bangladesh"},"por":{"official":"República Popular do Bangladesh","common":"Bangladesh"},"rus":{"official":"Народная Республика Бангладеш","common":"Бангладеш"},"spa":{"official":"República Popular de Bangladesh","common":"Bangladesh"},"fin":{"official":"Bangladeshin kansantasavalta","common":"Bangladesh"},"zho":{"official":"孟加拉人民共和国","common":"孟加拉国"}},"latlng":[24,90],"demonym":"Bangladeshi","landlocked":false,"borders":["MMR","IND"],"area":147570,"id":22},{"name":{"common":"Bulgaria","official":"Republic of Bulgaria","native":{"bul":{"official":"Република България","common":"България"}}},"tld":[".bg"],"cca2":"BG","ccn3":"100","cca3":"BGR","cioc":"BUL","currency":["BGN"],"callingCode":["359"],"capital":"Sofia","altSpellings":["BG","Republic of Bulgaria","Република България"],"region":"Europe","subregion":"Eastern Europe","languages":{"bul":"Bulgarian"},"translations":{"cym":{"official":"Republic of Bulgaria","common":"Bwlgaria"},"deu":{"official":"Republik Bulgarien","common":"Bulgarien"},"fra":{"official":"République de Bulgarie","common":"Bulgarie"},"hrv":{"official":"Republika Bugarska","common":"Bugarska"},"ita":{"official":"Repubblica di Bulgaria","common":"Bulgaria"},"jpn":{"official":"ブルガリア共和国","common":"ブルガリア"},"nld":{"official":"Republiek Bulgarije","common":"Bulgarije"},"por":{"official":"República da Bulgária","common":"Bulgária"},"rus":{"official":"Республика Болгария","common":"Болгария"},"spa":{"official":"República de Bulgaria","common":"Bulgaria"},"fin":{"official":"Bulgarian tasavalta","common":"Bulgaria"},"zho":{"official":"保加利亚共和国","common":"保加利亚"}},"latlng":[43,25],"demonym":"Bulgarian","landlocked":false,"borders":["GRC","MKD","ROU","SRB","TUR"],"area":110879,"id":23},{"name":{"common":"Bahrain","official":"Kingdom of Bahrain","native":{"ara":{"official":"مملكة البحرين","common":"‏البحرين"}}},"tld":[".bh"],"cca2":"BH","ccn3":"048","cca3":"BHR","cioc":"BRN","currency":["BHD"],"callingCode":["973"],"capital":"Manama","altSpellings":["BH","Kingdom of Bahrain","Mamlakat al-Baḥrayn"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"cym":{"official":"Kingdom of Bahrain","common":"Bahrain"},"deu":{"official":"Königreich Bahrain","common":"Bahrain"},"fra":{"official":"Royaume de Bahreïn","common":"Bahreïn"},"hrv":{"official":"Kraljevina Bahrein","common":"Bahrein"},"ita":{"official":"Regno del Bahrain","common":"Bahrein"},"jpn":{"official":"バーレーン王国","common":"バーレーン"},"nld":{"official":"Koninkrijk Bahrein","common":"Bahrein"},"por":{"official":"Reino do Bahrein","common":"Bahrein"},"rus":{"official":"Королевство Бахрейн","common":"Бахрейн"},"spa":{"official":"Reino de Bahrein","common":"Bahrein"},"fin":{"official":"Bahrainin kuningaskunta","common":"Bahrain"},"zho":{"official":"巴林王国","common":"巴林"}},"latlng":[26,50.55],"demonym":"Bahraini","landlocked":false,"borders":[],"area":765,"id":24},{"name":{"common":"Bahamas","official":"Commonwealth of the Bahamas","native":{"eng":{"official":"Commonwealth of the Bahamas","common":"Bahamas"}}},"tld":[".bs"],"cca2":"BS","ccn3":"044","cca3":"BHS","cioc":"BAH","currency":["BSD"],"callingCode":["1242"],"capital":"Nassau","altSpellings":["BS","Commonwealth of the Bahamas"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"cym":{"official":"Commonwealth of the Bahamas","common":"Bahamas"},"deu":{"official":"Commonwealth der Bahamas","common":"Bahamas"},"fra":{"official":"Commonwealth des Bahamas","common":"Bahamas"},"hrv":{"official":"Zajednica Bahama","common":"Bahami"},"ita":{"official":"Commonwealth delle Bahamas","common":"Bahamas"},"jpn":{"official":"バハマ","common":"バハマ"},"nld":{"official":"Gemenebest van de Bahama's","common":"Bahama’s"},"por":{"official":"Comunidade das Bahamas","common":"Bahamas"},"rus":{"official":"Содружество Багамских Островов","common":"Багамские Острова"},"spa":{"official":"Commonwealth de las Bahamas","common":"Bahamas"},"fin":{"official":"Bahaman liittovaltio","common":"Bahamasaaret"},"zho":{"official":"巴哈马联邦","common":"巴哈马"}},"latlng":[24.25,-76],"demonym":"Bahamian","landlocked":false,"borders":[],"area":13943,"id":25},{"name":{"common":"Bosnia and Herzegovina","official":"Bosnia and Herzegovina","native":{"bos":{"official":"Bosna i Hercegovina","common":"Bosna i Hercegovina"},"hrv":{"official":"Bosna i Hercegovina","common":"Bosna i Hercegovina"},"srp":{"official":"Боснa и Херцеговина","common":"Боснa и Херцеговина"}}},"tld":[".ba"],"cca2":"BA","ccn3":"070","cca3":"BIH","cioc":"BIH","currency":["BAM"],"callingCode":["387"],"capital":"Sarajevo","altSpellings":["BA","Bosnia-Herzegovina","Босна и Херцеговина"],"region":"Europe","subregion":"Southern Europe","languages":{"bos":"Bosnian","hrv":"Croatian","srp":"Serbian"},"translations":{"cym":{"official":"Bosnia and Herzegovina","common":"Bosnia a Hercegovina"},"deu":{"official":"Bosnien und Herzegowina","common":"Bosnien und Herzegowina"},"fra":{"official":"Bosnie-et-Herzégovine","common":"Bosnie-Herzégovine"},"hrv":{"official":"Bosna i Hercegovina","common":"Bosna i Hercegovina"},"ita":{"official":"Bosnia-Erzegovina","common":"Bosnia ed Erzegovina"},"jpn":{"official":"ボスニア·ヘルツェゴビナ","common":"ボスニア・ヘルツェゴビナ"},"nld":{"official":"Bosnië-Herzegovina","common":"Bosnië en Herzegovina"},"por":{"official":"Bósnia e Herzegovina","common":"Bósnia e Herzegovina"},"rus":{"official":"Босния и Герцеговина","common":"Босния и Герцеговина"},"spa":{"official":"Bosnia y Herzegovina","common":"Bosnia y Herzegovina"},"fin":{"official":"Bosnia ja Hertsegovina","common":"Bosnia ja Hertsegovina"},"zho":{"official":"波斯尼亚和黑塞哥维那","common":"波斯尼亚和黑塞哥维那"}},"latlng":[44,18],"demonym":"Bosnian, Herzegovinian","landlocked":false,"borders":["HRV","MNE","SRB"],"area":51209,"id":26},{"name":{"common":"Saint Barthélemy","official":"Collectivity of Saint Barthélemy","native":{"fra":{"official":"Collectivité de Saint-Barthélemy","common":"Saint-Barthélemy"}}},"tld":[".bl"],"cca2":"BL","ccn3":"652","cca3":"BLM","cioc":"","currency":["EUR"],"callingCode":["590"],"capital":"Gustavia","altSpellings":["BL","St. Barthelemy","Collectivity of Saint Barthélemy","Collectivité de Saint-Barthélemy"],"region":"Americas","subregion":"Caribbean","languages":{"fra":"French"},"translations":{"deu":{"official":"Gebietskörperschaft Saint -Barthélemy","common":"Saint-Barthélemy"},"fra":{"official":"Collectivité de Saint-Barthélemy","common":"Saint-Barthélemy"},"hrv":{"official":"Kolektivnost sv Barthélemy","common":"Saint Barthélemy"},"ita":{"official":"Collettività di Saint Barthélemy","common":"Antille Francesi"},"jpn":{"official":"サン·バルテルミー島の集合体","common":"サン・バルテルミー"},"nld":{"official":"Gemeenschap Saint Barthélemy","common":"Saint Barthélemy"},"por":{"official":"Coletividade de Saint Barthélemy","common":"São Bartolomeu"},"rus":{"official":"Коллективность Санкт -Бартельми","common":"Сен-Бартелеми"},"spa":{"official":"Colectividad de San Barthélemy","common":"San Bartolomé"},"fin":{"official":"Saint-Barthélemyn yhteisö","common":"Saint-Barthélemy"},"zho":{"official":"圣巴泰勒米集体","common":"圣巴泰勒米"}},"latlng":[18.5,-63.41666666],"demonym":"Saint Barthélemy Islander","landlocked":false,"borders":[],"area":21,"id":27},{"name":{"common":"Belarus","official":"Republic of Belarus","native":{"bel":{"official":"Рэспубліка Беларусь","common":"Белару́сь"},"rus":{"official":"Республика Беларусь","common":"Белоруссия"}}},"tld":[".by"],"cca2":"BY","ccn3":"112","cca3":"BLR","cioc":"BLR","currency":["BYR"],"callingCode":["375"],"capital":"Minsk","altSpellings":["BY","Bielaruś","Republic of Belarus","Белоруссия","Республика Беларусь","Belorussiya","Respublika Belarus’"],"region":"Europe","subregion":"Eastern Europe","languages":{"bel":"Belarusian","rus":"Russian"},"translations":{"cym":{"official":"Republic of Belarus","common":"Belarws"},"deu":{"official":"Republik Belarus","common":"Weißrussland"},"fra":{"official":"République de Biélorussie","common":"Biélorussie"},"hrv":{"official":"Republika Bjelorusija","common":"Bjelorusija"},"ita":{"official":"Repubblica di Belarus","common":"Bielorussia"},"jpn":{"official":"ベラルーシ共和国","common":"ベラルーシ"},"nld":{"official":"Republiek Belarus","common":"Wit-Rusland"},"por":{"official":"República da Bielorrússia","common":"Bielorússia"},"rus":{"official":"Республика Беларусь","common":"Белоруссия"},"spa":{"official":"República de Belarús","common":"Bielorrusia"},"fin":{"official":"Valko-Venäjän tasavalta","common":"Valko-Venäjä"},"zho":{"official":"白俄罗斯共和国","common":"白俄罗斯"}},"latlng":[53,28],"demonym":"Belarusian","landlocked":true,"borders":["LVA","LTU","POL","RUS","UKR"],"area":207600,"id":28},{"name":{"common":"Belize","official":"Belize","native":{"bjz":{"official":"Belize","common":"Belize"},"eng":{"official":"Belize","common":"Belize"},"spa":{"official":"Belice","common":"Belice"}}},"tld":[".bz"],"cca2":"BZ","ccn3":"084","cca3":"BLZ","cioc":"BIZ","currency":["BZD"],"callingCode":["501"],"capital":"Belmopan","altSpellings":["BZ"],"region":"Americas","subregion":"Central America","languages":{"bjz":"Belizean Creole","eng":"English","spa":"Spanish"},"translations":{"cym":{"official":"Belize","common":"Belize"},"deu":{"official":"Belize","common":"Belize"},"fra":{"official":"Belize","common":"Belize"},"hrv":{"official":"Belize","common":"Belize"},"ita":{"official":"Belize","common":"Belize"},"jpn":{"official":"ベリーズ","common":"ベリーズ"},"nld":{"official":"Belize","common":"Belize"},"por":{"official":"Belize","common":"Belize"},"rus":{"official":"Белиз","common":"Белиз"},"spa":{"official":"Belice","common":"Belice"},"fin":{"official":"Belize","common":"Belize"},"zho":{"official":"伯利兹","common":"伯利兹"}},"latlng":[17.25,-88.75],"demonym":"Belizean","landlocked":false,"borders":["GTM","MEX"],"area":22966,"id":29},{"name":{"common":"Bermuda","official":"Bermuda","native":{"eng":{"official":"Bermuda","common":"Bermuda"}}},"tld":[".bm"],"cca2":"BM","ccn3":"060","cca3":"BMU","cioc":"BER","currency":["BMD"],"callingCode":["1441"],"capital":"Hamilton","altSpellings":["BM","The Islands of Bermuda","The Bermudas","Somers Isles"],"region":"Americas","subregion":"Northern America","languages":{"eng":"English"},"translations":{"cym":{"official":"Bermuda","common":"Bermiwda"},"deu":{"official":"Bermuda","common":"Bermuda"},"fra":{"official":"Bermudes","common":"Bermudes"},"hrv":{"official":"Bermuda","common":"Bermudi"},"ita":{"official":"Bermuda","common":"Bermuda"},"jpn":{"official":"バミューダ","common":"バミューダ"},"nld":{"official":"Bermuda","common":"Bermuda"},"por":{"official":"Bermudas","common":"Bermudas"},"rus":{"official":"Бермудские острова","common":"Бермудские Острова"},"spa":{"official":"Bermuda","common":"Bermudas"},"fin":{"official":"Bermuda","common":"Bermuda"},"zho":{"official":"百慕大","common":"百慕大"}},"latlng":[32.33333333,-64.75],"demonym":"Bermudian","landlocked":false,"borders":[],"area":54,"id":30},{"name":{"common":"Bolivia","official":"Plurinational State of Bolivia","native":{"aym":{"official":"Wuliwya Suyu","common":"Wuliwya"},"grn":{"official":"Tetã Volívia","common":"Volívia"},"que":{"official":"Buliwya Mamallaqta","common":"Buliwya"},"spa":{"official":"Estado Plurinacional de Bolivia","common":"Bolivia"}}},"tld":[".bo"],"cca2":"BO","ccn3":"068","cca3":"BOL","cioc":"BOL","currency":["BOB","BOV"],"callingCode":["591"],"capital":"Sucre","altSpellings":["BO","Buliwya","Wuliwya","Bolivia, Plurinational State of","Plurinational State of Bolivia","Estado Plurinacional de Bolivia","Buliwya Mamallaqta","Wuliwya Suyu","Tetã Volívia"],"region":"Americas","subregion":"South America","languages":{"aym":"Aymara","grn":"Guaraní","que":"Quechua","spa":"Spanish"},"translations":{"cym":{"official":"Plurinational State of Bolivia","common":"Bolifia"},"deu":{"official":"Multinationaler Staat von Bolivien","common":"Bolivien"},"fra":{"official":"État plurinational de Bolivie","common":"Bolivie"},"hrv":{"official":"Plurinational State of Bolivia","common":"Bolivija"},"ita":{"official":"Stato Plurinazionale della Bolivia","common":"Bolivia"},"jpn":{"official":"ボリビアの多民族国","common":"ボリビア多民族国"},"nld":{"official":"Plurinationale Staat van Bolivia","common":"Bolivia"},"por":{"official":"Estado Plurinacional da Bolívia","common":"Bolívia"},"rus":{"official":"Многонациональное Государство Боливия","common":"Боливия"},"spa":{"official":"Estado Plurinacional de Bolivia","common":"Bolivia"},"fin":{"official":"Bolivian monikansainen valtio","common":"Bolivia"},"zho":{"official":"多民族玻利维亚国","common":"玻利维亚"}},"latlng":[-17,-65],"demonym":"Bolivian","landlocked":true,"borders":["ARG","BRA","CHL","PRY","PER"],"area":1098581,"id":31},{"name":{"common":"Brazil","official":"Federative Republic of Brazil","native":{"por":{"official":"República Federativa do Brasil","common":"Brasil"}}},"tld":[".br"],"cca2":"BR","ccn3":"076","cca3":"BRA","cioc":"BRA","currency":["BRL"],"callingCode":["55"],"capital":"Brasília","altSpellings":["BR","Brasil","Federative Republic of Brazil","República Federativa do Brasil"],"region":"Americas","subregion":"South America","languages":{"por":"Portuguese"},"translations":{"cym":{"official":"Federative Republic of Brazil","common":"Brasil"},"deu":{"official":"Föderative Republik Brasilien","common":"Brasilien"},"fra":{"official":"République fédérative du Brésil","common":"Brésil"},"hrv":{"official":"Savezne Republike Brazil","common":"Brazil"},"ita":{"official":"Repubblica federativa del Brasile","common":"Brasile"},"jpn":{"official":"ブラジル連邦共和国","common":"ブラジル"},"nld":{"official":"Federale Republiek Brazilië","common":"Brazilië"},"por":{"official":"República Federativa do Brasil","common":"Brasil"},"rus":{"official":"Федеративная Республика Бразилия","common":"Бразилия"},"spa":{"official":"República Federativa del Brasil","common":"Brasil"},"fin":{"official":"Brasilian liittotasavalta","common":"Brasilia"},"zho":{"official":"巴西联邦共和国","common":"巴西"}},"latlng":[-10,-55],"demonym":"Brazilian","landlocked":false,"borders":["ARG","BOL","COL","GUF","GUY","PRY","PER","SUR","URY","VEN"],"area":8515767,"id":32},{"name":{"common":"Barbados","official":"Barbados","native":{"eng":{"official":"Barbados","common":"Barbados"}}},"tld":[".bb"],"cca2":"BB","ccn3":"052","cca3":"BRB","cioc":"BAR","currency":["BBD"],"callingCode":["1246"],"capital":"Bridgetown","altSpellings":["BB"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"cym":{"official":"Barbados","common":"Barbados"},"deu":{"official":"Barbados","common":"Barbados"},"fra":{"official":"Barbade","common":"Barbade"},"hrv":{"official":"Barbados","common":"Barbados"},"ita":{"official":"Barbados","common":"Barbados"},"jpn":{"official":"バルバドス","common":"バルバドス"},"nld":{"official":"Barbados","common":"Barbados"},"por":{"official":"Barbados","common":"Barbados"},"rus":{"official":"Барбадос","common":"Барбадос"},"spa":{"official":"Barbados","common":"Barbados"},"fin":{"official":"Barbados","common":"Barbados"},"zho":{"official":"巴巴多斯","common":"巴巴多斯"}},"latlng":[13.16666666,-59.53333333],"demonym":"Barbadian","landlocked":false,"borders":[],"area":430,"id":33},{"name":{"common":"Brunei","official":"Nation of Brunei, Abode of Peace","native":{"msa":{"official":"Nation of Brunei, Abode Damai","common":"Negara Brunei Darussalam"}}},"tld":[".bn"],"cca2":"BN","ccn3":"096","cca3":"BRN","cioc":"BRU","currency":["BND"],"callingCode":["673"],"capital":"Bandar Seri Begawan","altSpellings":["BN","Brunei Darussalam","Nation of Brunei","the Abode of Peace"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"msa":"Malay"},"translations":{"cym":{"official":"Nation of Brunei, Abode of Peace","common":"Brunei"},"deu":{"official":"Nation von Brunei, Wohnung des Friedens","common":"Brunei"},"fra":{"official":"État de Brunei Darussalam","common":"Brunei"},"hrv":{"official":"Nacija od Bruneja, Kuću Mira","common":"Brunej"},"ita":{"official":"Nazione di Brunei, Dimora della Pace","common":"Brunei"},"jpn":{"official":"ブルネイ、平和の精舎の国家","common":"ブルネイ・ダルサラーム"},"nld":{"official":"Natie van Brunei, de verblijfplaats van de Vrede","common":"Brunei"},"por":{"official":"Nação do Brunei, Morada da Paz","common":"Brunei"},"rus":{"official":"Нация Бруней, обитель мира","common":"Бруней"},"spa":{"official":"Nación de Brunei, Morada de la Paz","common":"Brunei"},"fin":{"official":"Brunei Darussalamin valtio","common":"Brunei"},"zho":{"official":"文莱和平之国","common":"文莱"}},"latlng":[4.5,114.66666666],"demonym":"Bruneian","landlocked":false,"borders":["MYS"],"area":5765,"id":34},{"name":{"common":"Bhutan","official":"Kingdom of Bhutan","native":{"dzo":{"official":"འབྲུག་རྒྱལ་ཁབ་","common":"འབྲུག་ཡུལ་"}}},"tld":[".bt"],"cca2":"BT","ccn3":"064","cca3":"BTN","cioc":"BHU","currency":["BTN","INR"],"callingCode":["975"],"capital":"Thimphu","altSpellings":["BT","Kingdom of Bhutan"],"region":"Asia","subregion":"Southern Asia","languages":{"dzo":"Dzongkha"},"translations":{"cym":{"official":"Kingdom of Bhutan","common":"Bhwtan"},"deu":{"official":"Königreich Bhutan","common":"Bhutan"},"fra":{"official":"Royaume du Bhoutan","common":"Bhoutan"},"hrv":{"official":"Kraljevina Butan","common":"Butan"},"ita":{"official":"Regno del Bhutan","common":"Bhutan"},"jpn":{"official":"ブータン王国","common":"ブータン"},"nld":{"official":"Koninkrijk Bhutan","common":"Bhutan"},"por":{"official":"Reino do Butão","common":"Butão"},"rus":{"official":"Королевство Бутан","common":"Бутан"},"spa":{"official":"Reino de Bután","common":"Bután"},"fin":{"official":"Bhutanin kuningaskunta","common":"Bhutan"},"zho":{"official":"不丹王国","common":"不丹"}},"latlng":[27.5,90.5],"demonym":"Bhutanese","landlocked":true,"borders":["CHN","IND"],"area":38394,"id":35},{"name":{"common":"Bouvet Island","official":"Bouvet Island","native":{"nor":{"official":"Bouvetøya","common":"Bouvetøya"}}},"tld":[".bv"],"cca2":"BV","ccn3":"074","cca3":"BVT","cioc":"","currency":["NOK"],"callingCode":[],"capital":"","altSpellings":["BV","Bouvetøya","Bouvet-øya"],"region":"","subregion":"","languages":{"nor":"Norwegian"},"translations":{"deu":{"official":"Bouvet-Insel","common":"Bouvetinsel"},"fra":{"official":"Île Bouvet","common":"Île Bouvet"},"hrv":{"official":"Bouvet Island","common":"Otok Bouvet"},"ita":{"official":"Isola Bouvet","common":"Isola Bouvet"},"jpn":{"official":"ブーヴェ島","common":"ブーベ島"},"nld":{"official":"Bouvet Island","common":"Bouveteiland"},"por":{"official":"Ilha Bouvet","common":"Ilha Bouvet"},"rus":{"official":"Остров Буве","common":"Остров Буве"},"spa":{"official":"Isla Bouvet","common":"Isla Bouvet"},"fin":{"official":"Bouvet'nsaari","common":"Bouvet'nsaari"},"zho":{"official":"布维岛","common":"布维岛"}},"latlng":[-54.43333333,3.4],"demonym":"","landlocked":false,"borders":[],"area":49,"id":36},{"name":{"common":"Botswana","official":"Republic of Botswana","native":{"eng":{"official":"Republic of Botswana","common":"Botswana"},"tsn":{"official":"Lefatshe la Botswana","common":"Botswana"}}},"tld":[".bw"],"cca2":"BW","ccn3":"072","cca3":"BWA","cioc":"BOT","currency":["BWP"],"callingCode":["267"],"capital":"Gaborone","altSpellings":["BW","Republic of Botswana","Lefatshe la Botswana"],"region":"Africa","subregion":"Southern Africa","languages":{"eng":"English","tsn":"Tswana"},"translations":{"deu":{"official":"Republik Botsuana","common":"Botswana"},"fra":{"official":"République du Botswana","common":"Botswana"},"hrv":{"official":"Republika Bocvana","common":"Bocvana"},"ita":{"official":"Repubblica del Botswana","common":"Botswana"},"jpn":{"official":"ボツワナ共和国","common":"ボツワナ"},"nld":{"official":"Republiek Botswana","common":"Botswana"},"por":{"official":"República do Botswana","common":"Botswana"},"rus":{"official":"Республика Ботсвана","common":"Ботсвана"},"spa":{"official":"República de Botswana","common":"Botswana"},"fin":{"official":"Botswanan tasavalta","common":"Botswana"},"zho":{"official":"博茨瓦纳共和国","common":"博茨瓦纳"}},"latlng":[-22,24],"demonym":"Motswana","landlocked":true,"borders":["NAM","ZAF","ZMB","ZWE"],"area":582000,"id":37},{"name":{"common":"Central African Republic","official":"Central African Republic","native":{"fra":{"official":"République centrafricaine","common":"République centrafricaine"},"sag":{"official":"Ködörösêse tî Bêafrîka","common":"Bêafrîka"}}},"tld":[".cf"],"cca2":"CF","ccn3":"140","cca3":"CAF","cioc":"CAF","currency":["XAF"],"callingCode":["236"],"capital":"Bangui","altSpellings":["CF","Central African Republic","République centrafricaine"],"region":"Africa","subregion":"Middle Africa","languages":{"fra":"French","sag":"Sango"},"translations":{"cym":{"official":"Central African Republic","common":"Gweriniaeth Canolbarth Affrica"},"deu":{"official":"Zentralafrikanische Republik","common":"Zentralafrikanische Republik"},"fra":{"official":"République centrafricaine","common":"République centrafricaine"},"hrv":{"official":"Centralna Afrička Republika","common":"Srednjoafrička Republika"},"ita":{"official":"Repubblica Centrafricana","common":"Repubblica Centrafricana"},"jpn":{"official":"中央アフリカ共和国","common":"中央アフリカ共和国"},"nld":{"official":"Centraal-Afrikaanse Republiek","common":"Centraal-Afrikaanse Republiek"},"por":{"official":"República Centro-Africano","common":"República Centro-Africana"},"rus":{"official":"Центрально-Африканская Республика","common":"Центральноафриканская Республика"},"spa":{"official":"República Centroafricana","common":"República Centroafricana"},"fin":{"official":"Keski-Afrikan tasavalta","common":"Keski-Afrikan tasavalta"},"zho":{"official":"中非共和国","common":"中非共和国"}},"latlng":[7,21],"demonym":"Central African","landlocked":true,"borders":["CMR","TCD","COD","COG","SSD","SDN"],"area":622984,"id":38},{"name":{"common":"Canada","official":"Canada","native":{"eng":{"official":"Canada","common":"Canada"},"fra":{"official":"Canada","common":"Canada"}}},"tld":[".ca"],"cca2":"CA","ccn3":"124","cca3":"CAN","cioc":"CAN","currency":["CAD"],"callingCode":["1"],"capital":"Ottawa","altSpellings":["CA"],"region":"Americas","subregion":"Northern America","languages":{"eng":"English","fra":"French"},"translations":{"cym":{"official":"Canada","common":"Canada"},"deu":{"official":"Kanada","common":"Kanada"},"fra":{"official":"Canada","common":"Canada"},"hrv":{"official":"Kanada","common":"Kanada"},"ita":{"official":"Canada","common":"Canada"},"jpn":{"official":"カナダ","common":"カナダ"},"nld":{"official":"Canada","common":"Canada"},"por":{"official":"Canadá","common":"Canadá"},"rus":{"official":"Канада","common":"Канада"},"spa":{"official":"Canadá","common":"Canadá"},"fin":{"official":"Kanada","common":"Kanada"},"zho":{"official":"加拿大","common":"加拿大"}},"latlng":[60,-95],"demonym":"Canadian","landlocked":false,"borders":["USA"],"area":9984670,"id":39},{"name":{"common":"Cocos (Keeling) Islands","official":"Territory of the Cocos (Keeling) Islands","native":{"eng":{"official":"Territory of the Cocos (Keeling) Islands","common":"Cocos (Keeling) Islands"}}},"tld":[".cc"],"cca2":"CC","ccn3":"166","cca3":"CCK","cioc":"","currency":["AUD"],"callingCode":["61"],"capital":"West Island","altSpellings":["CC","Territory of the Cocos (Keeling) Islands","Keeling Islands"],"region":"Oceania","subregion":"Australia and New Zealand","languages":{"eng":"English"},"translations":{"cym":{"official":"Territory of the Cocos (Keeling) Islands","common":"Ynysoedd Cocos"},"deu":{"official":"Gebiet der Cocos (Keeling) Islands","common":"Kokosinseln"},"fra":{"official":"Territoire des îles Cocos (Keeling)","common":"Îles Cocos"},"hrv":{"official":"Teritoriju Kokosovi (Keeling) Islands","common":"Kokosovi Otoci"},"ita":{"official":"Territorio della (Keeling) Isole Cocos","common":"Isole Cocos e Keeling"},"jpn":{"official":"ココス諸島の領土","common":"ココス（キーリング）諸島"},"nld":{"official":"Grondgebied van de Eilanden Cocos (Keeling )","common":"Cocoseilanden"},"por":{"official":"Território dos Cocos (Keeling)","common":"Ilhas Cocos (Keeling)"},"rus":{"official":"Территория Кокосовые (Килинг) острова","common":"Кокосовые острова"},"spa":{"official":"Territorio de los (Keeling) Islas Cocos","common":"Islas Cocos o Islas Keeling"},"fin":{"official":"Kookossaaret","common":"Kookossaaret"},"zho":{"official":"科科斯","common":"科科斯"}},"latlng":[-12.5,96.83333333],"demonym":"Cocos Islander","landlocked":false,"borders":[],"area":14,"id":40},{"name":{"common":"Switzerland","official":"Swiss Confederation","native":{"fra":{"official":"Confédération suisse","common":"Suisse"},"gsw":{"official":"Schweizerische Eidgenossenschaft","common":"Schweiz"},"ita":{"official":"Confederazione Svizzera","common":"Svizzera"},"roh":{"official":"Confederaziun svizra","common":"Svizra"}}},"tld":[".ch"],"cca2":"CH","ccn3":"756","cca3":"CHE","cioc":"SUI","currency":["CHE","CHF","CHW"],"callingCode":["41"],"capital":"Bern","altSpellings":["CH","Swiss Confederation","Schweiz","Suisse","Svizzera","Svizra"],"region":"Europe","subregion":"Western Europe","languages":{"fra":"French","gsw":"Swiss German","ita":"Italian","roh":"Romansh"},"translations":{"deu":{"official":"Schweizerische Eidgenossenschaft","common":"Schweiz"},"fra":{"official":"Confédération suisse","common":"Suisse"},"hrv":{"official":"švicarska Konfederacija","common":"Švicarska"},"ita":{"official":"Confederazione svizzera","common":"Svizzera"},"jpn":{"official":"スイス連邦","common":"スイス"},"nld":{"official":"Zwitserse Confederatie","common":"Zwitserland"},"por":{"official":"Confederação Suíça","common":"Suíça"},"rus":{"official":"Швейцарская Конфедерация","common":"Швейцария"},"spa":{"official":"Confederación Suiza","common":"Suiza"},"fin":{"official":"Sveitsin valaliitto","common":"Sveitsi"},"zho":{"official":"瑞士联邦","common":"瑞士"}},"latlng":[47,8],"demonym":"Swiss","landlocked":true,"borders":["AUT","FRA","ITA","LIE","DEU"],"area":41284,"id":41},{"name":{"common":"Chile","official":"Republic of Chile","native":{"spa":{"official":"República de Chile","common":"Chile"}}},"tld":[".cl"],"cca2":"CL","ccn3":"152","cca3":"CHL","cioc":"CHI","currency":["CLF","CLP"],"callingCode":["56"],"capital":"Santiago","altSpellings":["CL","Republic of Chile","República de Chile"],"region":"Americas","subregion":"South America","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Republic of Chile","common":"Chile"},"deu":{"official":"Republik Chile","common":"Chile"},"fra":{"official":"République du Chili","common":"Chili"},"hrv":{"official":"Republika Čile","common":"Čile"},"ita":{"official":"Repubblica del Cile","common":"Cile"},"jpn":{"official":"チリ共和国","common":"チリ"},"nld":{"official":"Republiek Chili","common":"Chili"},"por":{"official":"República do Chile","common":"Chile"},"rus":{"official":"Республика Чили","common":"Чили"},"spa":{"official":"República de Chile","common":"Chile"},"fin":{"official":"Chilen tasavalta","common":"Chile"},"zho":{"official":"智利共和国","common":"智利"}},"latlng":[-30,-71],"demonym":"Chilean","landlocked":false,"borders":["ARG","BOL","PER"],"area":756102,"id":42},{"name":{"common":"China","official":"People's Republic of China","native":{"zho":{"official":"中华人民共和国","common":"中国"}}},"tld":[".cn",".中国",".中國",".公司",".网络"],"cca2":"CN","ccn3":"156","cca3":"CHN","cioc":"CHN","currency":["CNY"],"callingCode":["86"],"capital":"Beijing","altSpellings":["CN","Zhōngguó","Zhongguo","Zhonghua","People's Republic of China","中华人民共和国","Zhōnghuá Rénmín Gònghéguó"],"region":"Asia","subregion":"Eastern Asia","languages":{"zho":"Chinese"},"translations":{"cym":{"official":"People's Republic of China","common":"Tsieina"},"deu":{"official":"Volksrepublik China","common":"China"},"fra":{"official":"République populaire de Chine","common":"Chine"},"hrv":{"official":"Narodna Republika Kina","common":"Kina"},"ita":{"official":"Repubblica popolare cinese","common":"Cina"},"jpn":{"official":"中華人民共和国","common":"中国"},"nld":{"official":"Volksrepubliek China","common":"China"},"por":{"official":"República Popular da China","common":"China"},"rus":{"official":"Народная Республика Китай","common":"Китай"},"spa":{"official":"República Popular de China","common":"China"},"fin":{"official":"Kiinan kansantasavalta","common":"Kiina"}},"latlng":[35,105],"demonym":"Chinese","landlocked":false,"borders":["AFG","BTN","MMR","HKG","IND","KAZ","PRK","KGZ","LAO","MAC","MNG","PAK","RUS","TJK","VNM"],"area":9706961,"id":43},{"name":{"common":"Ivory Coast","official":"Republic of Côte d'Ivoire","native":{"fra":{"official":"République de Côte d'Ivoire","common":"Côte d'Ivoire"}}},"tld":[".ci"],"cca2":"CI","ccn3":"384","cca3":"CIV","cioc":"CIV","currency":["XOF"],"callingCode":["225"],"capital":"Yamoussoukro","altSpellings":["CI","Côte d'Ivoire","Ivory Coast","Republic of Côte d'Ivoire","République de Côte d'Ivoire"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Republik Côte d'Ivoire","common":"Elfenbeinküste"},"fra":{"official":"République de Côte d' Ivoire","common":"Côte d'Ivoire"},"hrv":{"official":"Republika Côte d'Ivoire","common":"Obala Bjelokosti"},"ita":{"official":"Repubblica della Costa d'Avorio","common":"Costa d'Avorio"},"jpn":{"official":"コートジボワール共和国","common":"コートジボワール"},"nld":{"official":"Republiek Ivoorkust","common":"Ivoorkust"},"por":{"official":"República da Côte d'Ivoire","common":"Costa do Marfim"},"rus":{"official":"Республика Кот-д'Ивуаре","common":"Кот-д’Ивуар"},"spa":{"official":"República de Côte d'Ivoire","common":"Costa de Marfil"},"fin":{"official":"Norsunluurannikon tasavalta","common":"Norsunluurannikko"},"zho":{"official":"科特迪瓦共和国","common":"科特迪瓦"}},"latlng":[8,-5],"demonym":"Ivorian","landlocked":false,"borders":["BFA","GHA","GIN","LBR","MLI"],"area":322463,"id":44},{"name":{"common":"Cameroon","official":"Republic of Cameroon","native":{"eng":{"official":"Republic of Cameroon","common":"Cameroon"},"fra":{"official":"République du Cameroun","common":"Cameroun"}}},"tld":[".cm"],"cca2":"CM","ccn3":"120","cca3":"CMR","cioc":"CMR","currency":["XAF"],"callingCode":["237"],"capital":"Yaoundé","altSpellings":["CM","Republic of Cameroon","République du Cameroun"],"region":"Africa","subregion":"Middle Africa","languages":{"eng":"English","fra":"French"},"translations":{"cym":{"official":"Republic of Cameroon","common":"Camerŵn"},"deu":{"official":"Republik Kamerun","common":"Kamerun"},"fra":{"official":"République du Cameroun","common":"Cameroun"},"hrv":{"official":"Republika Kamerun","common":"Kamerun"},"ita":{"official":"Repubblica del Camerun","common":"Camerun"},"jpn":{"official":"カメルーン共和国","common":"カメルーン"},"nld":{"official":"Republiek Kameroen","common":"Kameroen"},"por":{"official":"República dos Camarões","common":"Camarões"},"rus":{"official":"Республика Камерун","common":"Камерун"},"spa":{"official":"República de Camerún","common":"Camerún"},"fin":{"official":"Kamerunin tasavalta","common":"Kamerun"},"zho":{"official":"喀麦隆共和国","common":"喀麦隆"}},"latlng":[6,12],"demonym":"Cameroonian","landlocked":false,"borders":["CAF","TCD","COG","GNQ","GAB","NGA"],"area":475442,"id":45},{"name":{"common":"DR Congo","official":"Democratic Republic of the Congo","native":{"fra":{"official":"République démocratique du Congo","common":"RD Congo"},"kon":{"official":"Repubilika ya Kongo Demokratiki","common":"Repubilika ya Kongo Demokratiki"},"lin":{"official":"Republiki ya Kongó Demokratiki","common":"Republiki ya Kongó Demokratiki"},"lua":{"official":"Ditunga dia Kongu wa Mungalaata","common":"Ditunga dia Kongu wa Mungalaata"},"swa":{"official":"Jamhuri ya Kidemokrasia ya Kongo","common":"Jamhuri ya Kidemokrasia ya Kongo"}}},"tld":[".cd"],"cca2":"CD","ccn3":"180","cca3":"COD","cioc":"COD","currency":["CDF"],"callingCode":["243"],"capital":"Kinshasa","altSpellings":["CD","DR Congo","Congo-Kinshasa","Congo, the Democratic Republic of the","DRC"],"region":"Africa","subregion":"Middle Africa","languages":{"fra":"French","kon":"Kikongo","lin":"Lingala","lua":"Tshiluba","swa":"Swahili"},"translations":{"cym":{"official":"Democratic Republic of the Congo","common":"Gweriniaeth Ddemocrataidd Congo"},"deu":{"official":"Demokratische Republik Kongo","common":"Kongo (Dem. Rep.)"},"fra":{"official":"République démocratique du Congo","common":"Congo (Rép. dém.)"},"hrv":{"official":"Demokratska Republika Kongo","common":"Kongo, Demokratska Republika"},"ita":{"official":"Repubblica Democratica del Congo","common":"Congo (Rep. Dem.)"},"jpn":{"official":"コンゴ民主共和国","common":"コンゴ民主共和国"},"nld":{"official":"Democratische Republiek Congo","common":"Congo (DRC)"},"por":{"official":"República Democrática do Congo","common":"República Democrática do Congo"},"rus":{"official":"Демократическая Республика Конго","common":"Демократическая Республика Конго"},"spa":{"official":"República Democrática del Congo","common":"Congo (Rep. Dem.)"},"fin":{"official":"Kongon demokraattinen tasavalta","common":"Kongon demokraattinen tasavalta"},"zho":{"official":"刚果民主共和国","common":"民主刚果"}},"latlng":[0,25],"demonym":"Congolese","landlocked":false,"borders":["AGO","BDI","CAF","COG","RWA","SSD","TZA","UGA","ZMB"],"area":2344858,"id":46},{"name":{"common":"Republic of the Congo","official":"Republic of the Congo","native":{"fra":{"official":"République du Congo","common":"République du Congo"},"kon":{"official":"Repubilika ya Kongo","common":"Repubilika ya Kongo"},"lin":{"official":"Republíki ya Kongó","common":"Republíki ya Kongó"}}},"tld":[".cg"],"cca2":"CG","ccn3":"178","cca3":"COG","cioc":"CGO","currency":["XAF"],"callingCode":["242"],"capital":"Brazzaville","altSpellings":["CG","Congo","Congo-Brazzaville"],"region":"Africa","subregion":"Middle Africa","languages":{"fra":"French","kon":"Kikongo","lin":"Lingala"},"translations":{"cym":{"official":"Republic of the Congo","common":"Gweriniaeth y Congo"},"deu":{"official":"Republik Kongo","common":"Kongo"},"fra":{"official":"République du Congo","common":"Congo"},"hrv":{"official":"Republika Kongo","common":"Kongo"},"ita":{"official":"Repubblica del Congo","common":"Congo"},"jpn":{"official":"コンゴ共和国","common":"コンゴ共和国"},"nld":{"official":"Republiek Congo","common":"Congo"},"por":{"official":"República do Congo","common":"Congo"},"rus":{"official":"Республика Конго","common":"Республика Конго"},"spa":{"official":"República del Congo","common":"Congo"},"fin":{"official":"Kongon tasavalta","common":"Kongo-Brazzaville"},"zho":{"official":"刚果共和国","common":"刚果"}},"latlng":[-1,15],"demonym":"Congolese","landlocked":false,"borders":["AGO","CMR","CAF","COD","GAB"],"area":342000,"id":47},{"name":{"common":"Cook Islands","official":"Cook Islands","native":{"eng":{"official":"Cook Islands","common":"Cook Islands"},"rar":{"official":"Kūki 'Āirani","common":"Kūki 'Āirani"}}},"tld":[".ck"],"cca2":"CK","ccn3":"184","cca3":"COK","cioc":"COK","currency":["NZD"],"callingCode":["682"],"capital":"Avarua","altSpellings":["CK","Kūki 'Āirani"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","rar":"Cook Islands Māori"},"translations":{"cym":{"official":"Cook Islands","common":"Ynysoedd Cook"},"deu":{"official":"Cook-Inseln","common":"Cookinseln"},"fra":{"official":"Îles Cook","common":"Îles Cook"},"hrv":{"official":"Cook Islands","common":"Cookovo Otočje"},"ita":{"official":"Isole Cook","common":"Isole Cook"},"jpn":{"official":"クック諸島","common":"クック諸島"},"nld":{"official":"Cook eilanden","common":"Cookeilanden"},"por":{"official":"Ilhas Cook","common":"Ilhas Cook"},"rus":{"official":"острова Кука","common":"Острова Кука"},"spa":{"official":"Islas Cook","common":"Islas Cook"},"fin":{"official":"Cookinsaaret","common":"Cookinsaaret"},"zho":{"official":"库克群岛","common":"库克群岛"}},"latlng":[-21.23333333,-159.76666666],"demonym":"Cook Islander","landlocked":false,"borders":[],"area":236,"id":48},{"name":{"common":"Colombia","official":"Republic of Colombia","native":{"spa":{"official":"República de Colombia","common":"Colombia"}}},"tld":[".co"],"cca2":"CO","ccn3":"170","cca3":"COL","cioc":"COL","currency":["COP"],"callingCode":["57"],"capital":"Bogotá","altSpellings":["CO","Republic of Colombia","República de Colombia"],"region":"Americas","subregion":"South America","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Republic of Colombia","common":"Colombia"},"deu":{"official":"Republik Kolumbien","common":"Kolumbien"},"fra":{"official":"République de Colombie","common":"Colombie"},"hrv":{"official":"Republika Kolumbija","common":"Kolumbija"},"ita":{"official":"Repubblica di Colombia","common":"Colombia"},"jpn":{"official":"コロンビア共和国","common":"コロンビア"},"nld":{"official":"Republiek Colombia","common":"Colombia"},"por":{"official":"República da Colômbia","common":"Colômbia"},"rus":{"official":"Республика Колумбия","common":"Колумбия"},"spa":{"official":"República de Colombia","common":"Colombia"},"fin":{"official":"Kolumbian tasavalta","common":"Kolumbia"},"zho":{"official":"哥伦比亚共和国","common":"哥伦比亚"}},"latlng":[4,-72],"demonym":"Colombian","landlocked":false,"borders":["BRA","ECU","PAN","PER","VEN"],"area":1141748,"id":49},{"name":{"common":"Comoros","official":"Union of the Comoros","native":{"ara":{"official":"الاتحاد القمري","common":"القمر‎"},"fra":{"official":"Union des Comores","common":"Comores"},"zdj":{"official":"Udzima wa Komori","common":"Komori"}}},"tld":[".km"],"cca2":"KM","ccn3":"174","cca3":"COM","cioc":"COM","currency":["KMF"],"callingCode":["269"],"capital":"Moroni","altSpellings":["KM","Union of the Comoros","Union des Comores","Udzima wa Komori","al-Ittiḥād al-Qumurī"],"region":"Africa","subregion":"Eastern Africa","languages":{"ara":"Arabic","fra":"French","zdj":"Comorian"},"translations":{"cym":{"official":"Union of the Comoros","common":"Comoros"},"deu":{"official":"Union der Komoren","common":"Union der Komoren"},"fra":{"official":"Union des Comores","common":"Comores"},"hrv":{"official":"Savez Komori","common":"Komori"},"ita":{"official":"Unione delle Comore","common":"Comore"},"jpn":{"official":"コモロ連合","common":"コモロ"},"nld":{"official":"Unie van de Comoren","common":"Comoren"},"por":{"official":"União das Comores","common":"Comores"},"rus":{"official":"Союз Коморских Островов","common":"Коморы"},"spa":{"official":"Unión de las Comoras","common":"Comoras"},"fin":{"official":"Komorien liitto","common":"Komorit"},"zho":{"official":"科摩罗联盟","common":"科摩罗"}},"latlng":[-12.16666666,44.25],"demonym":"Comoran","landlocked":false,"borders":[],"area":1862,"id":50},{"name":{"common":"Cape Verde","official":"Republic of Cabo Verde","native":{"por":{"official":"República de Cabo Verde","common":"Cabo Verde"}}},"tld":[".cv"],"cca2":"CV","ccn3":"132","cca3":"CPV","cioc":"CPV","currency":["CVE"],"callingCode":["238"],"capital":"Praia","altSpellings":["CV","Republic of Cabo Verde","República de Cabo Verde"],"region":"Africa","subregion":"Western Africa","languages":{"por":"Portuguese"},"translations":{"cym":{"official":"Republic of Cabo Verde","common":"Cape Verde"},"deu":{"official":"Republik Cabo Verde","common":"Kap Verde"},"fra":{"official":"République du Cap-Vert","common":"Îles du Cap-Vert"},"hrv":{"official":"Republika Cabo Verde","common":"Zelenortska Republika"},"ita":{"official":"Repubblica di Capo Verde","common":"Capo Verde"},"jpn":{"official":"カーボベルデ共和国","common":"カーボベルデ"},"nld":{"official":"Republiek van Cabo Verde","common":"Kaapverdië"},"por":{"official":"República de Cabo Verde","common":"Cabo Verde"},"rus":{"official":"Республика Кабо -Верде","common":"Кабо-Верде"},"spa":{"official":"República de Cabo Verde","common":"Cabo Verde"},"fin":{"official":"Kap Verden tasavalta","common":"Kap Verde"},"zho":{"official":"佛得角共和国","common":"佛得角"}},"latlng":[16,-24],"demonym":"Cape Verdian","landlocked":false,"borders":[],"area":4033,"id":51},{"name":{"common":"Costa Rica","official":"Republic of Costa Rica","native":{"spa":{"official":"República de Costa Rica","common":"Costa Rica"}}},"tld":[".cr"],"cca2":"CR","ccn3":"188","cca3":"CRI","cioc":"CRC","currency":["CRC"],"callingCode":["506"],"capital":"San José","altSpellings":["CR","Republic of Costa Rica","República de Costa Rica"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Republic of Costa Rica","common":"Costa Rica"},"deu":{"official":"Republik Costa Rica","common":"Costa Rica"},"fra":{"official":"République du Costa Rica","common":"Costa Rica"},"hrv":{"official":"Republika Kostarika","common":"Kostarika"},"ita":{"official":"Repubblica di Costa Rica","common":"Costa Rica"},"jpn":{"official":"コスタリカ共和国","common":"コスタリカ"},"nld":{"official":"Republiek Costa Rica","common":"Costa Rica"},"por":{"official":"República da Costa Rica","common":"Costa Rica"},"rus":{"official":"Республика Коста-Рика","common":"Коста-Рика"},"spa":{"official":"República de Costa Rica","common":"Costa Rica"},"fin":{"official":"Costa Rican tasavalta","common":"Costa Rica"},"zho":{"official":"哥斯达黎加共和国","common":"哥斯达黎加"}},"latlng":[10,-84],"demonym":"Costa Rican","landlocked":false,"borders":["NIC","PAN"],"area":51100,"id":52},{"name":{"common":"Cuba","official":"Republic of Cuba","native":{"spa":{"official":"República de Cuba","common":"Cuba"}}},"tld":[".cu"],"cca2":"CU","ccn3":"192","cca3":"CUB","cioc":"CUB","currency":["CUC","CUP"],"callingCode":["53"],"capital":"Havana","altSpellings":["CU","Republic of Cuba","República de Cuba"],"region":"Americas","subregion":"Caribbean","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Republic of Cuba","common":"Ciwba"},"deu":{"official":"Republik Kuba","common":"Kuba"},"fra":{"official":"République de Cuba","common":"Cuba"},"hrv":{"official":"Republika Kuba","common":"Kuba"},"ita":{"official":"Repubblica di Cuba","common":"Cuba"},"jpn":{"official":"キューバ共和国","common":"キューバ"},"nld":{"official":"Republiek Cuba","common":"Cuba"},"por":{"official":"República de Cuba","common":"Cuba"},"rus":{"official":"Республика Куба","common":"Куба"},"spa":{"official":"República de Cuba","common":"Cuba"},"fin":{"official":"Kuuban tasavalta","common":"Kuuba"},"zho":{"official":"古巴共和国","common":"古巴"}},"latlng":[21.5,-80],"demonym":"Cuban","landlocked":false,"borders":[],"area":109884,"id":53},{"name":{"common":"Curaçao","official":"Country of Curaçao","native":{"eng":{"official":"Country of Curaçao","common":"Curaçao"},"nld":{"official":"Land Curaçao","common":"Curaçao"},"pap":{"official":"Pais Kòrsou","common":"Pais Kòrsou"}}},"tld":[".cw"],"cca2":"CW","ccn3":"531","cca3":"CUW","cioc":"","currency":["ANG"],"callingCode":["5999"],"capital":"Willemstad","altSpellings":["CW","Curacao","Kòrsou","Country of Curaçao","Land Curaçao","Pais Kòrsou"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English","nld":"Dutch","pap":"Papiamento"},"translations":{"deu":{"official":"Land Curaçao","common":"Curaçao"},"fra":{"official":"Curaçao","common":"Curaçao"},"nld":{"official":"Land Curaçao","common":"Curaçao"},"por":{"official":"País de Curaçao","common":"ilha da Curação"},"rus":{"official":"Страна Кюрасао","common":"Кюрасао"},"spa":{"official":"País de Curazao","common":"Curazao"},"fin":{"official":"Curaçao","common":"Curaçao"},"zho":{"official":"库拉索","common":"库拉索"}},"latlng":[12.116667,-68.933333],"demonym":"Dutch","landlocked":false,"borders":[],"area":444,"id":54},{"name":{"common":"Christmas Island","official":"Territory of Christmas Island","native":{"eng":{"official":"Territory of Christmas Island","common":"Christmas Island"}}},"tld":[".cx"],"cca2":"CX","ccn3":"162","cca3":"CXR","cioc":"","currency":["AUD"],"callingCode":["61"],"capital":"Flying Fish Cove","altSpellings":["CX","Territory of Christmas Island"],"region":"Oceania","subregion":"Australia and New Zealand","languages":{"eng":"English"},"translations":{"cym":{"official":"Territory of Christmas Island","common":"Ynys y Nadolig"},"deu":{"official":"Gebiet der Weihnachtsinsel","common":"Weihnachtsinsel"},"fra":{"official":"Territoire de l'île Christmas","common":"Île Christmas"},"hrv":{"official":"Teritorij Božićni otok","common":"Božićni otok"},"ita":{"official":"Territorio di Christmas Island","common":"Isola di Natale"},"jpn":{"official":"クリスマス島の領土","common":"クリスマス島"},"nld":{"official":"Grondgebied van Christmas Island","common":"Christmaseiland"},"por":{"official":"Território da Ilha Christmas","common":"Ilha do Natal"},"rus":{"official":"Территория острова Рождества","common":"Остров Рождества"},"spa":{"official":"Territorio de la Isla de Navidad","common":"Isla de Navidad"},"fin":{"official":"Joulusaaren alue","common":"Joulusaari"},"zho":{"official":"圣诞岛","common":"圣诞岛"}},"latlng":[-10.5,105.66666666],"demonym":"Christmas Island","landlocked":false,"borders":[],"area":135,"id":55},{"name":{"common":"Cayman Islands","official":"Cayman Islands","native":{"eng":{"official":"Cayman Islands","common":"Cayman Islands"}}},"tld":[".ky"],"cca2":"KY","ccn3":"136","cca3":"CYM","cioc":"CAY","currency":["KYD"],"callingCode":["1345"],"capital":"George Town","altSpellings":["KY"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"cym":{"official":"Cayman Islands","common":"Ynysoedd_Cayman"},"deu":{"official":"Cayman-Inseln","common":"Kaimaninseln"},"fra":{"official":"Îles Caïmans","common":"Îles Caïmans"},"hrv":{"official":"Kajmanski otoci","common":"Kajmanski otoci"},"ita":{"official":"Isole Cayman","common":"Isole Cayman"},"jpn":{"official":"ケイマン諸島","common":"ケイマン諸島"},"nld":{"official":"Caymaneilanden","common":"Caymaneilanden"},"por":{"official":"Ilhas Cayman","common":"Ilhas Caimão"},"rus":{"official":"Каймановы острова","common":"Каймановы острова"},"spa":{"official":"Islas Caimán","common":"Islas Caimán"},"fin":{"official":"Caymansaaret","common":"Caymansaaret"},"zho":{"official":"开曼群岛","common":"开曼群岛"}},"latlng":[19.5,-80.5],"demonym":"Caymanian","landlocked":false,"borders":[],"area":264,"id":56},{"name":{"common":"Cyprus","official":"Republic of Cyprus","native":{"ell":{"official":"Δημοκρατία της Κύπρος","common":"Κύπρος"},"tur":{"official":"Kıbrıs Cumhuriyeti","common":"Kıbrıs"}}},"tld":[".cy"],"cca2":"CY","ccn3":"196","cca3":"CYP","cioc":"CYP","currency":["EUR"],"callingCode":["357"],"capital":"Nicosia","altSpellings":["CY","Kýpros","Kıbrıs","Republic of Cyprus","Κυπριακή Δημοκρατία","Kıbrıs Cumhuriyeti"],"region":"Europe","subregion":"Eastern Europe","languages":{"ell":"Greek","tur":"Turkish"},"translations":{"cym":{"official":"Republic of Cyprus","common":"Cyprus"},"deu":{"official":"Republik Zypern","common":"Zypern"},"fra":{"official":"République de Chypre","common":"Chypre"},"hrv":{"official":"Republika Cipar","common":"Cipar"},"ita":{"official":"Repubblica di Cipro","common":"Cipro"},"jpn":{"official":"キプロス共和国","common":"キプロス"},"nld":{"official":"Republiek Cyprus","common":"Cyprus"},"por":{"official":"República de Chipre","common":"Chipre"},"rus":{"official":"Республика Кипр","common":"Кипр"},"spa":{"official":"República de Chipre","common":"Chipre"},"fin":{"official":"Kyproksen tasavalta","common":"Kypros"},"zho":{"official":"塞浦路斯共和国","common":"塞浦路斯"}},"latlng":[35,33],"demonym":"Cypriot","landlocked":false,"borders":["GBR"],"area":9251,"id":57},{"name":{"common":"Czech Republic","official":"Czech Republic","native":{"ces":{"official":"česká republika","common":"Česká republika"},"slk":{"official":"Česká republika","common":"Česká republika"}}},"tld":[".cz"],"cca2":"CZ","ccn3":"203","cca3":"CZE","cioc":"CZE","currency":["CZK"],"callingCode":["420"],"capital":"Prague","altSpellings":["CZ","Česká republika","Česko"],"region":"Europe","subregion":"Eastern Europe","languages":{"ces":"Czech","slk":"Slovak"},"translations":{"cym":{"official":"Czech Republic","common":"Y Weriniaeth Tsiec"},"deu":{"official":"Tschechische Republik","common":"Tschechische Republik"},"fra":{"official":"République tchèque","common":"République tchèque"},"hrv":{"official":"Češka","common":"Češka"},"ita":{"official":"Repubblica Ceca","common":"Repubblica Ceca"},"jpn":{"official":"チェコ共和国","common":"チェコ"},"nld":{"official":"Tsjechische Republiek","common":"Tsjechië"},"por":{"official":"República Checa","common":"República Checa"},"rus":{"official":"Чешская Республика","common":"Чехия"},"spa":{"official":"República Checa","common":"República Checa"},"fin":{"official":"Tšekin tasavalta","common":"Tšekki"},"zho":{"official":"捷克共和国","common":"捷克"}},"latlng":[49.75,15.5],"demonym":"Czech","landlocked":true,"borders":["AUT","DEU","POL","SVK"],"area":78865,"id":58},{"name":{"common":"Germany","official":"Federal Republic of Germany","native":{"deu":{"official":"Bundesrepublik Deutschland","common":"Deutschland"}}},"tld":[".de"],"cca2":"DE","ccn3":"276","cca3":"DEU","cioc":"GER","currency":["EUR"],"callingCode":["49"],"capital":"Berlin","altSpellings":["DE","Federal Republic of Germany","Bundesrepublik Deutschland"],"region":"Europe","subregion":"Western Europe","languages":{"deu":"German"},"translations":{"deu":{"official":"Bundesrepublik Deutschland","common":"Deutschland"},"fra":{"official":"République fédérale d'Allemagne","common":"Allemagne"},"hrv":{"official":"Njemačka Federativna Republika","common":"Njemačka"},"ita":{"official":"Repubblica federale di Germania","common":"Germania"},"jpn":{"official":"ドイツ連邦共和国","common":"ドイツ"},"nld":{"official":"Bondsrepubliek Duitsland","common":"Duitsland"},"por":{"official":"República Federal da Alemanha","common":"Alemanha"},"rus":{"official":"Федеративная Республика Германия","common":"Германия"},"spa":{"official":"República Federal de Alemania","common":"Alemania"},"fin":{"official":"Saksan liittotasavalta","common":"Saksa"},"zho":{"official":"德意志联邦共和国","common":"德国"}},"latlng":[51,9],"demonym":"German","landlocked":false,"borders":["AUT","BEL","CZE","DNK","FRA","LUX","NLD","POL","CHE"],"area":357114,"id":59},{"name":{"common":"Djibouti","official":"Republic of Djibouti","native":{"ara":{"official":"جمهورية جيبوتي","common":"جيبوتي‎"},"fra":{"official":"République de Djibouti","common":"Djibouti"}}},"tld":[".dj"],"cca2":"DJ","ccn3":"262","cca3":"DJI","cioc":"DJI","currency":["DJF"],"callingCode":["253"],"capital":"Djibouti","altSpellings":["DJ","Jabuuti","Gabuuti","Republic of Djibouti","République de Djibouti","Gabuutih Ummuuno","Jamhuuriyadda Jabuuti"],"region":"Africa","subregion":"Eastern Africa","languages":{"ara":"Arabic","fra":"French"},"translations":{"cym":{"official":"Republic of Djibouti","common":"Djibouti"},"deu":{"official":"Republik Dschibuti","common":"Dschibuti"},"fra":{"official":"République de Djibouti","common":"Djibouti"},"hrv":{"official":"Republika Džibuti","common":"Džibuti"},"ita":{"official":"Repubblica di Gibuti","common":"Gibuti"},"jpn":{"official":"ジブチ共和国","common":"ジブチ"},"nld":{"official":"Republiek Djibouti","common":"Djibouti"},"por":{"official":"República do Djibouti","common":"Djibouti"},"rus":{"official":"Республика Джибути","common":"Джибути"},"spa":{"official":"República de Djibouti","common":"Djibouti"},"fin":{"official":"Dijiboutin tasavalta","common":"Dijibouti"},"zho":{"official":"吉布提共和国","common":"吉布提"}},"latlng":[11.5,43],"demonym":"Djibouti","landlocked":false,"borders":["ERI","ETH","SOM"],"area":23200,"id":60},{"name":{"common":"Dominica","official":"Commonwealth of Dominica","native":{"eng":{"official":"Commonwealth of Dominica","common":"Dominica"}}},"tld":[".dm"],"cca2":"DM","ccn3":"212","cca3":"DMA","cioc":"DMA","currency":["XCD"],"callingCode":["1767"],"capital":"Roseau","altSpellings":["DM","Dominique","Wai‘tu kubuli","Commonwealth of Dominica"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"cym":{"official":"Commonwealth of Dominica","common":"Dominica"},"deu":{"official":"Commonwealth von Dominica","common":"Dominica"},"fra":{"official":"Commonwealth de la Dominique","common":"Dominique"},"hrv":{"official":"Zajednica Dominika","common":"Dominika"},"ita":{"official":"Commonwealth di Dominica","common":"Dominica"},"jpn":{"official":"ドミニカ国","common":"ドミニカ国"},"nld":{"official":"Gemenebest Dominica","common":"Dominica"},"por":{"official":"Comunidade da Dominica","common":"Dominica"},"rus":{"official":"Содружество Доминики","common":"Доминика"},"spa":{"official":"Mancomunidad de Dominica","common":"Dominica"},"fin":{"official":"Dominican liittovaltio","common":"Dominica"},"zho":{"official":"多米尼加共和国","common":"多米尼加"}},"latlng":[15.41666666,-61.33333333],"demonym":"Dominican","landlocked":false,"borders":[],"area":751,"id":61},{"name":{"common":"Denmark","official":"Kingdom of Denmark","native":{"dan":{"official":"Kongeriget Danmark","common":"Danmark"}}},"tld":[".dk"],"cca2":"DK","ccn3":"208","cca3":"DNK","cioc":"DEN","currency":["DKK"],"callingCode":["45"],"capital":"Copenhagen","altSpellings":["DK","Danmark","Kingdom of Denmark","Kongeriget Danmark"],"region":"Europe","subregion":"Northern Europe","languages":{"dan":"Danish"},"translations":{"cym":{"official":"Kingdom of Denmark","common":"Denmarc"},"deu":{"official":"Königreich Dänemark","common":"Dänemark"},"fra":{"official":"Royaume du Danemark","common":"Danemark"},"hrv":{"official":"Kraljevina Danska","common":"Danska"},"ita":{"official":"Regno di Danimarca","common":"Danimarca"},"jpn":{"official":"デンマーク王国","common":"デンマーク"},"nld":{"official":"Koninkrijk Denemarken","common":"Denemarken"},"por":{"official":"Reino da Dinamarca","common":"Dinamarca"},"rus":{"official":"Королевство Дания","common":"Дания"},"spa":{"official":"Reino de Dinamarca","common":"Dinamarca"},"fin":{"official":"Tanskan kuningaskunta","common":"Tanska"},"zho":{"official":"丹麦王国","common":"丹麦"}},"latlng":[56,10],"demonym":"Danish","landlocked":false,"borders":["DEU"],"area":43094,"id":62},{"name":{"common":"Dominican Republic","official":"Dominican Republic","native":{"spa":{"official":"República Dominicana","common":"República Dominicana"}}},"tld":[".do"],"cca2":"DO","ccn3":"214","cca3":"DOM","cioc":"DOM","currency":["DOP"],"callingCode":["1809","1829","1849"],"capital":"Santo Domingo","altSpellings":["DO"],"region":"Americas","subregion":"Caribbean","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Dominican Republic","common":"Gweriniaeth_Dominica"},"deu":{"official":"Dominikanische Republik","common":"Dominikanische Republik"},"fra":{"official":"République Dominicaine","common":"République dominicaine"},"hrv":{"official":"Dominikanska Republika","common":"Dominikanska Republika"},"ita":{"official":"Repubblica Dominicana","common":"Repubblica Dominicana"},"jpn":{"official":"ドミニカ共和国","common":"ドミニカ共和国"},"nld":{"official":"Dominicaanse Republiek","common":"Dominicaanse Republiek"},"por":{"official":"República Dominicana","common":"República Dominicana"},"rus":{"official":"Доминиканская Республика","common":"Доминиканская Республика"},"spa":{"official":"República Dominicana","common":"República Dominicana"},"fin":{"official":"Dominikaaninen tasavalta","common":"Dominikaaninen tasavalta"},"zho":{"official":"多明尼加共和国","common":"多明尼加"}},"latlng":[19,-70.66666666],"demonym":"Dominican","landlocked":false,"borders":["HTI"],"area":48671,"id":63},{"name":{"common":"Algeria","official":"People's Democratic Republic of Algeria","native":{"ara":{"official":"الجمهورية الديمقراطية الشعبية الجزائرية","common":"الجزائر"}}},"tld":[".dz","الجزائر."],"cca2":"DZ","ccn3":"012","cca3":"DZA","cioc":"ALG","currency":["DZD"],"callingCode":["213"],"capital":"Algiers","altSpellings":["DZ","Dzayer","Algérie"],"region":"Africa","subregion":"Northern Africa","languages":{"ara":"Arabic"},"translations":{"cym":{"official":"People's Democratic Republic of Algeria","common":"Algeria"},"deu":{"official":"Demokratische Volksrepublik Algerien","common":"Algerien"},"fra":{"official":"République démocratique et populaire d'Algérie","common":"Algérie"},"hrv":{"official":"Narodna Demokratska Republika Alžir","common":"Alžir"},"ita":{"official":"Repubblica popolare democratica di Algeria","common":"Algeria"},"jpn":{"official":"アルジェリア人民民主共和国","common":"アルジェリア"},"nld":{"official":"Democratische Volksrepubliek Algerije","common":"Algerije"},"por":{"official":"República Argelina Democrática e Popular","common":"Argélia"},"rus":{"official":"Народно-Демократическая Республика Алжир","common":"Алжир"},"spa":{"official":"República Argelina Democrática y Popular","common":"Argelia"},"fin":{"official":"Algerian demokraattinen kansantasavalta","common":"Algeria"},"zho":{"official":"阿尔及利亚人民民主共和国","common":"阿尔及利亚"}},"latlng":[28,3],"demonym":"Algerian","landlocked":false,"borders":["TUN","LBY","NER","ESH","MRT","MLI","MAR"],"area":2381741,"id":64},{"name":{"common":"Ecuador","official":"Republic of Ecuador","native":{"spa":{"official":"República del Ecuador","common":"Ecuador"}}},"tld":[".ec"],"cca2":"EC","ccn3":"218","cca3":"ECU","cioc":"ECU","currency":["USD"],"callingCode":["593"],"capital":"Quito","altSpellings":["EC","Republic of Ecuador","República del Ecuador"],"region":"Americas","subregion":"South America","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Republic of Ecuador","common":"Ecwador"},"deu":{"official":"Republik Ecuador","common":"Ecuador"},"fra":{"official":"République de l'Équateur","common":"Équateur"},"hrv":{"official":"Republika Ekvador","common":"Ekvador"},"ita":{"official":"Repubblica dell'Ecuador","common":"Ecuador"},"jpn":{"official":"エクアドル共和国","common":"エクアドル"},"nld":{"official":"Republiek Ecuador","common":"Ecuador"},"por":{"official":"República do Equador","common":"Equador"},"rus":{"official":"Республика Эквадор","common":"Эквадор"},"spa":{"official":"República del Ecuador","common":"Ecuador"},"fin":{"official":"Ecuadorin tasavalta","common":"Ecuador"},"zho":{"official":"厄瓜多尔共和国","common":"厄瓜多尔"}},"latlng":[-2,-77.5],"demonym":"Ecuadorean","landlocked":false,"borders":["COL","PER"],"area":276841,"id":65},{"name":{"common":"Egypt","official":"Arab Republic of Egypt","native":{"ara":{"official":"جمهورية مصر العربية","common":"مصر"}}},"tld":[".eg",".مصر"],"cca2":"EG","ccn3":"818","cca3":"EGY","cioc":"EGY","currency":["EGP"],"callingCode":["20"],"capital":"Cairo","altSpellings":["EG","Arab Republic of Egypt"],"region":"Africa","subregion":"Northern Africa","languages":{"ara":"Arabic"},"translations":{"cym":{"official":"Arab Republic of Egypt","common":"Yr Aifft"},"deu":{"official":"Arabische Republik Ägypten","common":"Ägypten"},"fra":{"official":"République arabe d'Égypte","common":"Égypte"},"hrv":{"official":"Arapska Republika Egipat","common":"Egipat"},"ita":{"official":"Repubblica araba d'Egitto","common":"Egitto"},"jpn":{"official":"エジプト·アラブ共和国","common":"エジプト"},"nld":{"official":"Arabische Republiek Egypte","common":"Egypte"},"por":{"official":"República Árabe do Egipto","common":"Egito"},"rus":{"official":"Арабская Республика Египет","common":"Египет"},"spa":{"official":"República Árabe de Egipto","common":"Egipto"},"fin":{"official":"Egyptin arabitasavalta","common":"Egypti"},"zho":{"official":"阿拉伯埃及共和国","common":"埃及"}},"latlng":[27,30],"demonym":"Egyptian","landlocked":false,"borders":["ISR","LBY","SDN"],"area":1002450,"id":66},{"name":{"common":"Eritrea","official":"State of Eritrea","native":{"ara":{"official":"دولة إرتريا","common":"إرتريا‎"},"eng":{"official":"State of Eritrea","common":"Eritrea"},"tir":{"official":"ሃገረ ኤርትራ","common":"ኤርትራ"}}},"tld":[".er"],"cca2":"ER","ccn3":"232","cca3":"ERI","cioc":"ERI","currency":["ERN"],"callingCode":["291"],"capital":"Asmara","altSpellings":["ER","State of Eritrea","ሃገረ ኤርትራ","Dawlat Iritriyá","ʾErtrā","Iritriyā"],"region":"Africa","subregion":"Eastern Africa","languages":{"ara":"Arabic","eng":"English","tir":"Tigrinya"},"translations":{"cym":{"official":"State of Eritrea","common":"Eritrea"},"deu":{"official":"Staat Eritrea","common":"Eritrea"},"fra":{"official":"État d'Érythrée","common":"Érythrée"},"hrv":{"official":"Država Eritreji","common":"Eritreja"},"ita":{"official":"Stato di Eritrea","common":"Eritrea"},"jpn":{"official":"エリトリア国","common":"エリトリア"},"nld":{"official":"Staat Eritrea","common":"Eritrea"},"por":{"official":"Estado da Eritreia","common":"Eritreia"},"rus":{"official":"Государство Эритрея","common":"Эритрея"},"spa":{"official":"Estado de Eritrea","common":"Eritrea"},"fin":{"official":"Eritrean valtio","common":"Eritrea"},"zho":{"official":"厄立特里亚","common":"厄立特里亚"}},"latlng":[15,39],"demonym":"Eritrean","landlocked":false,"borders":["DJI","ETH","SDN"],"area":117600,"id":67},{"name":{"common":"Western Sahara","official":"Sahrawi Arab Democratic Republic","native":{"ber":{"official":"Sahrawi Arab Democratic Republic","common":"Western Sahara"},"mey":{"official":"الجمهورية العربية الصحراوية الديمقراطية","common":"الصحراء الغربية"},"spa":{"official":"República Árabe Saharaui Democrática","common":"Sahara Occidental"}}},"tld":[".eh"],"cca2":"EH","ccn3":"732","cca3":"ESH","cioc":"","currency":["MAD","DZD","MRO"],"callingCode":["212"],"capital":"El Aaiún","altSpellings":["EH","Taneẓroft Tutrimt"],"region":"Africa","subregion":"Northern Africa","languages":{"ber":"Berber","mey":"Hassaniya","spa":"Spanish"},"translations":{"deu":{"official":"Demokratische Arabische Republik Sahara","common":"Westsahara"},"fra":{"official":"République arabe sahraouie démocratique","common":"Sahara Occidental"},"hrv":{"official":"Sahrawi Arab Demokratska Republika","common":"Zapadna Sahara"},"ita":{"official":"Repubblica Araba Saharawi Democratica","common":"Sahara Occidentale"},"jpn":{"official":"サハラアラブ民主共和国","common":"西サハラ"},"nld":{"official":"Sahrawi Arabische Democratische Republiek","common":"Westelijke Sahara"},"por":{"official":"República Árabe Saharaui Democrática","common":"Saara Ocidental"},"rus":{"official":"Sahrawi Арабская Демократическая Республика","common":"Западная Сахара"},"spa":{"official":"República Árabe Saharaui Democrática","common":"Sahara Occidental"},"fin":{"official":"Länsi-Sahara","common":"Länsi-Sahara"},"zho":{"official":"阿拉伯撒哈拉民主共和国","common":"西撒哈拉"}},"latlng":[24.5,-13],"demonym":"Sahrawi","landlocked":false,"borders":["DZA","MRT","MAR"],"area":266000,"id":68},{"name":{"common":"Spain","official":"Kingdom of Spain","native":{"cat":{"official":"Regne d'Espanya","common":"Espanya"},"eus":{"official":"Espainiako Erresuma","common":"Espainia"},"glg":{"official":"Reino de España","common":""},"oci":{"official":"Reialme d'Espanha","common":"Espanha"},"spa":{"official":"Reino de España","common":"España"}}},"tld":[".es"],"cca2":"ES","ccn3":"724","cca3":"ESP","cioc":"ESP","currency":["EUR"],"callingCode":["34"],"capital":"Madrid","altSpellings":["ES","Kingdom of Spain","Reino de España"],"region":"Europe","subregion":"Southern Europe","languages":{"cat":"Catalan","eus":"Basque","glg":"Galician","oci":"Occitan","spa":"Spanish"},"translations":{"deu":{"official":"Königreich Spanien","common":"Spanien"},"fra":{"official":"Royaume d'Espagne","common":"Espagne"},"hrv":{"official":"Kraljevina Španjolska","common":"Španjolska"},"ita":{"official":"Regno di Spagna","common":"Spagna"},"jpn":{"official":"スペイン王国","common":"スペイン"},"nld":{"official":"Koninkrijk Spanje","common":"Spanje"},"por":{"official":"Reino de Espanha","common":"Espanha"},"rus":{"official":"Королевство Испания","common":"Испания"},"spa":{"official":"Reino de España","common":"España"},"fin":{"official":"Espanjan kuningaskunta","common":"Espanja"},"zho":{"official":"西班牙王国","common":"西班牙"}},"latlng":[40,-4],"demonym":"Spanish","landlocked":false,"borders":["AND","FRA","GIB","PRT","MAR"],"area":505992,"id":69},{"name":{"common":"Estonia","official":"Republic of Estonia","native":{"est":{"official":"Eesti Vabariik","common":"Eesti"}}},"tld":[".ee"],"cca2":"EE","ccn3":"233","cca3":"EST","cioc":"EST","currency":["EUR"],"callingCode":["372"],"capital":"Tallinn","altSpellings":["EE","Eesti","Republic of Estonia","Eesti Vabariik"],"region":"Europe","subregion":"Northern Europe","languages":{"est":"Estonian"},"translations":{"cym":{"official":"Republic of Estonia","common":"Estonia"},"deu":{"official":"Republik Estland","common":"Estland"},"fra":{"official":"République d'Estonie","common":"Estonie"},"hrv":{"official":"Republika Estonija","common":"Estonija"},"ita":{"official":"Repubblica di Estonia","common":"Estonia"},"jpn":{"official":"エストニア共和国","common":"エストニア"},"nld":{"official":"Republiek Estland","common":"Estland"},"por":{"official":"República da Estónia","common":"Estónia"},"rus":{"official":"Эстонская Республика","common":"Эстония"},"spa":{"official":"República de Estonia","common":"Estonia"},"fin":{"official":"Viron tasavalta","common":"Viro"},"zho":{"official":"爱沙尼亚共和国","common":"爱沙尼亚"}},"latlng":[59,26],"demonym":"Estonian","landlocked":false,"borders":["LVA","RUS"],"area":45227,"id":70},{"name":{"common":"Ethiopia","official":"Federal Democratic Republic of Ethiopia","native":{"amh":{"official":"የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ","common":"ኢትዮጵያ"}}},"tld":[".et"],"cca2":"ET","ccn3":"231","cca3":"ETH","cioc":"ETH","currency":["ETB"],"callingCode":["251"],"capital":"Addis Ababa","altSpellings":["ET","ʾĪtyōṗṗyā","Federal Democratic Republic of Ethiopia","የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ"],"region":"Africa","subregion":"Eastern Africa","languages":{"amh":"Amharic"},"translations":{"cym":{"official":"Federal Democratic Republic of Ethiopia","common":"Ethiopia"},"deu":{"official":"Demokratische Bundesrepublik Äthiopien","common":"Äthiopien"},"fra":{"official":"République fédérale démocratique d'Éthiopie","common":"Éthiopie"},"hrv":{"official":"Savezna Demokratska Republika Etiopija","common":"Etiopija"},"ita":{"official":"Repubblica federale democratica di Etiopia","common":"Etiopia"},"jpn":{"official":"エチオピア連邦民主共和国","common":"エチオピア"},"nld":{"official":"Federale Democratische Republiek Ethiopië","common":"Ethiopië"},"por":{"official":"República Federal Democrática da Etiópia","common":"Etiópia"},"rus":{"official":"Федеративная Демократическая Республика Эфиопия","common":"Эфиопия"},"spa":{"official":"República Democrática Federal de Etiopía","common":"Etiopía"},"fin":{"official":"Etiopian demokraattinen liittotasavalta","common":"Etiopia"},"zho":{"official":"埃塞俄比亚联邦民主共和国","common":"埃塞俄比亚"}},"latlng":[8,38],"demonym":"Ethiopian","landlocked":true,"borders":["DJI","ERI","KEN","SOM","SSD","SDN"],"area":1104300,"id":71},{"name":{"common":"Finland","official":"Republic of Finland","native":{"fin":{"official":"Suomen tasavalta","common":"Suomi"},"swe":{"official":"Republiken Finland","common":"Finland"}}},"tld":[".fi"],"cca2":"FI","ccn3":"246","cca3":"FIN","cioc":"FIN","currency":["EUR"],"callingCode":["358"],"capital":"Helsinki","altSpellings":["FI","Suomi","Republic of Finland","Suomen tasavalta","Republiken Finland"],"region":"Europe","subregion":"Northern Europe","languages":{"fin":"Finnish","swe":"Swedish"},"translations":{"deu":{"official":"Republik Finnland","common":"Finnland"},"fra":{"official":"République de Finlande","common":"Finlande"},"hrv":{"official":"Republika Finska","common":"Finska"},"ita":{"official":"Repubblica di Finlandia","common":"Finlandia"},"jpn":{"official":"フィンランド共和国","common":"フィンランド"},"nld":{"official":"Republiek Finland","common":"Finland"},"por":{"official":"República da Finlândia","common":"Finlândia"},"rus":{"official":"Финляндская Республика","common":"Финляндия"},"spa":{"official":"República de Finlandia","common":"Finlandia"},"fin":{"official":"Suomen tasavalta","common":"Suomi"},"zho":{"official":"芬兰共和国","common":"芬兰"}},"latlng":[64,26],"demonym":"Finnish","landlocked":false,"borders":["NOR","SWE","RUS"],"area":338424,"id":72},{"name":{"common":"Fiji","official":"Republic of Fiji","native":{"eng":{"official":"Republic of Fiji","common":"Fiji"},"fij":{"official":"Matanitu Tugalala o Viti","common":"Viti"},"hif":{"official":"रिपब्लिक ऑफ फीजी","common":"फिजी"}}},"tld":[".fj"],"cca2":"FJ","ccn3":"242","cca3":"FJI","cioc":"FIJ","currency":["FJD"],"callingCode":["679"],"capital":"Suva","altSpellings":["FJ","Viti","Republic of Fiji","Matanitu ko Viti","Fijī Gaṇarājya"],"region":"Oceania","subregion":"Melanesia","languages":{"eng":"English","fij":"Fijian","hif":"Fiji Hindi"},"translations":{"deu":{"official":"Republik Fidschi","common":"Fidschi"},"fra":{"official":"République des Fidji","common":"Fidji"},"hrv":{"official":"Republika Fidži","common":"Fiđi"},"ita":{"official":"Repubblica di Figi","common":"Figi"},"jpn":{"official":"フィジー共和国","common":"フィジー"},"nld":{"official":"Republiek Fiji","common":"Fiji"},"por":{"official":"República de Fiji","common":"Fiji"},"rus":{"official":"Республика Фиджи","common":"Фиджи"},"spa":{"official":"República de Fiji","common":"Fiyi"},"fin":{"official":"Fidžin tasavalta","common":"Fidži"},"zho":{"official":"斐济共和国","common":"斐济"}},"latlng":[-18,175],"demonym":"Fijian","landlocked":false,"borders":[],"area":18272,"id":73},{"name":{"common":"Falkland Islands","official":"Falkland Islands","native":{"eng":{"official":"Falkland Islands","common":"Falkland Islands"}}},"tld":[".fk"],"cca2":"FK","ccn3":"238","cca3":"FLK","cioc":"","currency":["FKP"],"callingCode":["500"],"capital":"Stanley","altSpellings":["FK","Islas Malvinas","Falkland Islands (Malvinas)"],"region":"Americas","subregion":"South America","languages":{"eng":"English"},"translations":{"deu":{"official":"Falkland-Inseln","common":"Falklandinseln"},"fra":{"official":"Îles Malouines","common":"Îles Malouines"},"hrv":{"official":"Falklandski otoci","common":"Falklandski Otoci"},"ita":{"official":"Isole Falkland","common":"Isole Falkland o Isole Malvine"},"jpn":{"official":"フォークランド","common":"フォークランド（マルビナス）諸島"},"nld":{"official":"Falkland eilanden","common":"Falklandeilanden"},"por":{"official":"Ilhas Malvinas","common":"Ilhas Malvinas"},"rus":{"official":"Фолклендские острова","common":"Фолклендские острова"},"spa":{"official":"islas Malvinas","common":"Islas Malvinas"},"fin":{"official":"Falkandinsaaret","common":"Falkandinsaaret"},"zho":{"official":"福克兰群岛","common":"福克兰群岛"}},"latlng":[-51.75,-59],"demonym":"Falkland Islander","landlocked":false,"borders":[],"area":12173,"id":74},{"name":{"common":"France","official":"French Republic","native":{"fra":{"official":"République française","common":"France"}}},"tld":[".fr"],"cca2":"FR","ccn3":"250","cca3":"FRA","cioc":"FRA","currency":["EUR"],"callingCode":["33"],"capital":"Paris","altSpellings":["FR","French Republic","République française"],"region":"Europe","subregion":"Western Europe","languages":{"fra":"French"},"translations":{"deu":{"official":"Französische Republik","common":"Frankreich"},"fra":{"official":"République française","common":"France"},"hrv":{"official":"Francuska Republika","common":"Francuska"},"ita":{"official":"Repubblica francese","common":"Francia"},"jpn":{"official":"フランス共和国","common":"フランス"},"nld":{"official":"Franse Republiek","common":"Frankrijk"},"por":{"official":"República Francesa","common":"França"},"rus":{"official":"Французская Республика","common":"Франция"},"spa":{"official":"República francés","common":"Francia"},"fin":{"official":"Ranskan tasavalta","common":"Ranska"},"zho":{"official":"法兰西共和国","common":"法国"}},"latlng":[46,2],"demonym":"French","landlocked":false,"borders":["AND","BEL","DEU","ITA","LUX","MCO","ESP","CHE"],"area":551695,"id":75},{"name":{"common":"Faroe Islands","official":"Faroe Islands","native":{"dan":{"official":"Færøerne","common":"Færøerne"},"fao":{"official":"Føroyar","common":"Føroyar"}}},"tld":[".fo"],"cca2":"FO","ccn3":"234","cca3":"FRO","cioc":"","currency":["DKK"],"callingCode":["298"],"capital":"Tórshavn","altSpellings":["FO","Føroyar","Færøerne"],"region":"Europe","subregion":"Northern Europe","languages":{"dan":"Danish","fao":"Faroese"},"translations":{"deu":{"official":"Färöer","common":"Färöer-Inseln"},"fra":{"official":"Îles Féroé","common":"Îles Féroé"},"hrv":{"official":"Farski Otoci","common":"Farski Otoci"},"ita":{"official":"Isole Faroe","common":"Isole Far Oer"},"jpn":{"official":"フェロー諸島","common":"フェロー諸島"},"nld":{"official":"Faeröer","common":"Faeröer"},"por":{"official":"Ilhas Faroe","common":"Ilhas Faroé"},"rus":{"official":"Фарерские острова","common":"Фарерские острова"},"spa":{"official":"Islas Feroe","common":"Islas Faroe"},"fin":{"official":"Färsaaret","common":"Färsaaret"},"zho":{"official":"法罗群岛","common":"法罗群岛"}},"latlng":[62,-7],"demonym":"Faroese","landlocked":false,"borders":[],"area":1393,"id":76},{"name":{"common":"Micronesia","official":"Federated States of Micronesia","native":{"eng":{"official":"Federated States of Micronesia","common":"Micronesia"}}},"tld":[".fm"],"cca2":"FM","ccn3":"583","cca3":"FSM","cioc":"FSM","currency":["USD"],"callingCode":["691"],"capital":"Palikir","altSpellings":["FM","Federated States of Micronesia","Micronesia, Federated States of"],"region":"Oceania","subregion":"Micronesia","languages":{"eng":"English"},"translations":{"deu":{"official":"Föderierte Staaten von Mikronesien","common":"Mikronesien"},"fra":{"official":"États fédérés de Micronésie","common":"Micronésie"},"hrv":{"official":"Savezne Države Mikronezije","common":"Mikronezija"},"ita":{"official":"Stati federati di Micronesia","common":"Micronesia"},"jpn":{"official":"ミクロネシア連邦","common":"ミクロネシア連邦"},"nld":{"official":"Federale Staten van Micronesia","common":"Micronesië"},"por":{"official":"Estados Federados da Micronésia","common":"Micronésia"},"rus":{"official":"Федеративные Штаты Микронезии","common":"Федеративные Штаты Микронезии"},"spa":{"official":"Estados Federados de Micronesia","common":"Micronesia"},"fin":{"official":"Mikronesian liittovaltio","common":"Mikronesia"},"zho":{"official":"密克罗尼西亚联邦","common":"密克罗尼西亚"}},"latlng":[6.91666666,158.25],"demonym":"Micronesian","landlocked":false,"borders":[],"area":702,"id":77},{"name":{"common":"Gabon","official":"Gabonese Republic","native":{"fra":{"official":"République gabonaise","common":"Gabon"}}},"tld":[".ga"],"cca2":"GA","ccn3":"266","cca3":"GAB","cioc":"GAB","currency":["XAF"],"callingCode":["241"],"capital":"Libreville","altSpellings":["GA","Gabonese Republic","République Gabonaise"],"region":"Africa","subregion":"Middle Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Gabunische Republik","common":"Gabun"},"fra":{"official":"République gabonaise","common":"Gabon"},"hrv":{"official":"Gabon Republika","common":"Gabon"},"ita":{"official":"Repubblica gabonese","common":"Gabon"},"jpn":{"official":"ガボン共和国","common":"ガボン"},"nld":{"official":"Republiek Gabon","common":"Gabon"},"por":{"official":"República do Gabão","common":"Gabão"},"rus":{"official":"Габона Республика","common":"Габон"},"spa":{"official":"República de Gabón","common":"Gabón"},"fin":{"official":"Gabonin tasavalta","common":"Gabon"},"zho":{"official":"加蓬共和国","common":"加蓬"}},"latlng":[-1,11.75],"demonym":"Gabonese","landlocked":false,"borders":["CMR","COG","GNQ"],"area":267668,"id":78},{"name":{"common":"United Kingdom","official":"United Kingdom of Great Britain and Northern Ireland","native":{"eng":{"official":"United Kingdom of Great Britain and Northern Ireland","common":"United Kingdom"}}},"tld":[".uk"],"cca2":"GB","ccn3":"826","cca3":"GBR","cioc":"GBR","currency":["GBP"],"callingCode":["44"],"capital":"London","altSpellings":["GB","UK","Great Britain"],"region":"Europe","subregion":"Northern Europe","languages":{"eng":"English"},"translations":{"deu":{"official":"Vereinigtes Königreich Großbritannien und Nordirland","common":"Vereinigtes Königreich"},"fra":{"official":"Royaume-Uni de Grande-Bretagne et d'Irlande du Nord","common":"Royaume-Uni"},"hrv":{"official":"Ujedinjeno Kraljevstvo Velike Britanije i Sjeverne Irske","common":"Ujedinjeno Kraljevstvo"},"ita":{"official":"Regno Unito di Gran Bretagna e Irlanda del Nord","common":"Regno Unito"},"jpn":{"official":"グレート·ブリテンおよび北アイルランド連合王国","common":"イギリス"},"nld":{"official":"Verenigd Koninkrijk van Groot-Brittannië en Noord-Ierland","common":"Verenigd Koninkrijk"},"por":{"official":"Reino Unido da Grã-Bretanha e Irlanda do Norte","common":"Reino Unido"},"rus":{"official":"Соединенное Королевство Великобритании и Северной Ирландии","common":"Великобритания"},"spa":{"official":"Reino Unido de Gran Bretaña e Irlanda del Norte","common":"Reino Unido"},"fin":{"official":"Ison-Britannian ja Pohjois-Irlannin yhdistynyt kuningaskunta","common":"Yhdistynyt kuningaskunta"},"zho":{"official":"大不列颠及北爱尔兰联合王国","common":"英国"}},"latlng":[54,-2],"demonym":"British","landlocked":false,"borders":["IRL"],"area":242900,"id":79},{"name":{"common":"Georgia","official":"Georgia","native":{"kat":{"official":"საქართველო","common":"საქართველო"}}},"tld":[".ge"],"cca2":"GE","ccn3":"268","cca3":"GEO","cioc":"GEO","currency":["GEL"],"callingCode":["995"],"capital":"Tbilisi","altSpellings":["GE","Sakartvelo"],"region":"Asia","subregion":"Western Asia","languages":{"kat":"Georgian"},"translations":{"deu":{"official":"Georgia","common":"Georgien"},"fra":{"official":"République de Géorgie","common":"Géorgie"},"hrv":{"official":"Gruzija","common":"Gruzija"},"ita":{"official":"Georgia","common":"Georgia"},"jpn":{"official":"グルジア","common":"グルジア"},"nld":{"official":"Georgia","common":"Georgië"},"por":{"official":"Georgia","common":"Geórgia"},"rus":{"official":"Грузия","common":"Грузия"},"spa":{"official":"Georgia","common":"Georgia"},"fin":{"official":"Georgia","common":"Georgia"},"zho":{"official":"格鲁吉亚","common":"格鲁吉亚"}},"latlng":[42,43.5],"demonym":"Georgian","landlocked":false,"borders":["ARM","AZE","RUS","TUR"],"area":69700,"id":80},{"name":{"common":"Guernsey","official":"Bailiwick of Guernsey","native":{"eng":{"official":"Bailiwick of Guernsey","common":"Guernsey"},"fra":{"official":"Bailliage de Guernesey","common":"Guernesey"},"nfr":{"official":"Dgèrnésiais","common":"Dgèrnésiais"}}},"tld":[".gg"],"cca2":"GG","ccn3":"831","cca3":"GGY","cioc":"","currency":["GBP"],"callingCode":["44"],"capital":"St. Peter Port","altSpellings":["GG","Bailiwick of Guernsey","Bailliage de Guernesey"],"region":"Europe","subregion":"Northern Europe","languages":{"eng":"English","fra":"French","nfr":"Guernésiais"},"translations":{"deu":{"official":"Guernsey","common":"Guernsey"},"fra":{"official":"Bailliage de Guernesey","common":"Guernesey"},"hrv":{"official":"Struka Guernsey","common":"Guernsey"},"ita":{"official":"Baliato di Guernsey","common":"Guernsey"},"jpn":{"official":"ガーンジーの得意分野","common":"ガーンジー"},"nld":{"official":"Baljuwschap Guernsey","common":"Guernsey"},"por":{"official":"Bailiado de Guernsey","common":"Guernsey"},"rus":{"official":"Коронное владение Гернси","common":"Гернси"},"spa":{"official":"Bailía de Guernsey","common":"Guernsey"},"fin":{"official":"Guernsey","common":"Guernsey"},"zho":{"official":"根西岛","common":"根西岛"}},"latlng":[49.46666666,-2.58333333],"demonym":"Channel Islander","landlocked":false,"borders":[],"area":78,"id":81},{"name":{"common":"Ghana","official":"Republic of Ghana","native":{"eng":{"official":"Republic of Ghana","common":"Ghana"}}},"tld":[".gh"],"cca2":"GH","ccn3":"288","cca3":"GHA","cioc":"GHA","currency":["GHS"],"callingCode":["233"],"capital":"Accra","altSpellings":["GH"],"region":"Africa","subregion":"Western Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Ghana","common":"Ghana"},"fra":{"official":"République du Ghana","common":"Ghana"},"hrv":{"official":"Republika Gana","common":"Gana"},"ita":{"official":"Repubblica del Ghana","common":"Ghana"},"jpn":{"official":"ガーナ共和国","common":"ガーナ"},"nld":{"official":"Republiek Ghana","common":"Ghana"},"por":{"official":"República do Gana","common":"Gana"},"rus":{"official":"Республика Гана","common":"Гана"},"spa":{"official":"República de Ghana","common":"Ghana"},"fin":{"official":"Ghanan tasavalta","common":"Ghana"},"zho":{"official":"加纳共和国","common":"加纳"}},"latlng":[8,-2],"demonym":"Ghanaian","landlocked":false,"borders":["BFA","CIV","TGO"],"area":238533,"id":82},{"name":{"common":"Gibraltar","official":"Gibraltar","native":{"eng":{"official":"Gibraltar","common":"Gibraltar"}}},"tld":[".gi"],"cca2":"GI","ccn3":"292","cca3":"GIB","cioc":"","currency":["GIP"],"callingCode":["350"],"capital":"Gibraltar","altSpellings":["GI"],"region":"Europe","subregion":"Southern Europe","languages":{"eng":"English"},"translations":{"deu":{"official":"Gibraltar","common":"Gibraltar"},"fra":{"official":"Gibraltar","common":"Gibraltar"},"hrv":{"official":"Gibraltar","common":"Gibraltar"},"ita":{"official":"Gibilterra","common":"Gibilterra"},"jpn":{"official":"ジブラルタル","common":"ジブラルタル"},"nld":{"official":"Gibraltar","common":"Gibraltar"},"por":{"official":"Gibraltar","common":"Gibraltar"},"rus":{"official":"Гибралтар","common":"Гибралтар"},"spa":{"official":"Gibraltar","common":"Gibraltar"},"fin":{"official":"Gibraltar","common":"Gibraltar"},"zho":{"official":"直布罗陀","common":"直布罗陀"}},"latlng":[36.13333333,-5.35],"demonym":"Gibraltar","landlocked":false,"borders":["ESP"],"area":6,"id":83},{"name":{"common":"Guinea","official":"Republic of Guinea","native":{"fra":{"official":"République de Guinée","common":"Guinée"}}},"tld":[".gn"],"cca2":"GN","ccn3":"324","cca3":"GIN","cioc":"GUI","currency":["GNF"],"callingCode":["224"],"capital":"Conakry","altSpellings":["GN","Republic of Guinea","République de Guinée"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Republik Guinea","common":"Guinea"},"fra":{"official":"République de Guinée","common":"Guinée"},"hrv":{"official":"Republika Gvineja","common":"Gvineja"},"ita":{"official":"Repubblica di Guinea","common":"Guinea"},"jpn":{"official":"ギニア共和国","common":"ギニア"},"nld":{"official":"Republiek Guinee","common":"Guinee"},"por":{"official":"República da Guiné","common":"Guiné"},"rus":{"official":"Республика Гвинея","common":"Гвинея"},"spa":{"official":"República de Guinea","common":"Guinea"},"fin":{"official":"Guinean tasavalta","common":"Guinea"},"zho":{"official":"几内亚共和国","common":"几内亚"}},"latlng":[11,-10],"demonym":"Guinean","landlocked":false,"borders":["CIV","GNB","LBR","MLI","SEN","SLE"],"area":245857,"id":84},{"name":{"common":"Guadeloupe","official":"Guadeloupe","native":{"fra":{"official":"Guadeloupe","common":"Guadeloupe"}}},"tld":[".gp"],"cca2":"GP","ccn3":"312","cca3":"GLP","cioc":"","currency":["EUR"],"callingCode":["590"],"capital":"Basse-Terre","altSpellings":["GP","Gwadloup"],"region":"Americas","subregion":"Caribbean","languages":{"fra":"French"},"translations":{"deu":{"official":"Guadeloupe","common":"Guadeloupe"},"fra":{"official":"Guadeloupe","common":"Guadeloupe"},"hrv":{"official":"Gvadalupa","common":"Gvadalupa"},"ita":{"official":"Guadeloupe","common":"Guadeloupa"},"jpn":{"official":"グアドループ島","common":"グアドループ"},"nld":{"official":"Guadeloupe","common":"Guadeloupe"},"por":{"official":"Guadalupe","common":"Guadalupe"},"rus":{"official":"Гваделупа","common":"Гваделупа"},"spa":{"official":"Guadalupe","common":"Guadalupe"},"fin":{"official":"Guadeloupen departmentti","common":"Guadeloupe"},"zho":{"official":"瓜德罗普岛","common":"瓜德罗普岛"}},"latlng":[16.25,-61.583333],"demonym":"Guadeloupian","landlocked":false,"borders":[],"area":1628,"id":85},{"name":{"common":"Gambia","official":"Republic of the Gambia","native":{"eng":{"official":"Republic of the Gambia","common":"Gambia"}}},"tld":[".gm"],"cca2":"GM","ccn3":"270","cca3":"GMB","cioc":"GAM","currency":["GMD"],"callingCode":["220"],"capital":"Banjul","altSpellings":["GM","Republic of the Gambia"],"region":"Africa","subregion":"Western Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Gambia","common":"Gambia"},"fra":{"official":"République de Gambie","common":"Gambie"},"hrv":{"official":"Republika Gambija","common":"Gambija"},"ita":{"official":"Repubblica del Gambia","common":"Gambia"},"jpn":{"official":"ガンビア共和国","common":"ガンビア"},"nld":{"official":"Republiek Gambia","common":"Gambia"},"por":{"official":"República da Gâmbia","common":"Gâmbia"},"rus":{"official":"Республика Гамбия","common":"Гамбия"},"spa":{"official":"República de Gambia","common":"Gambia"},"fin":{"official":"Gambian tasavalta","common":"Gambia"},"zho":{"official":"冈比亚共和国","common":"冈比亚"}},"latlng":[13.46666666,-16.56666666],"demonym":"Gambian","landlocked":false,"borders":["SEN"],"area":10689,"id":86},{"name":{"common":"Guinea-Bissau","official":"Republic of Guinea-Bissau","native":{"por":{"official":"República da Guiné-Bissau","common":"Guiné-Bissau"}}},"tld":[".gw"],"cca2":"GW","ccn3":"624","cca3":"GNB","cioc":"GBS","currency":["XOF"],"callingCode":["245"],"capital":"Bissau","altSpellings":["GW","Republic of Guinea-Bissau","República da Guiné-Bissau"],"region":"Africa","subregion":"Western Africa","languages":{"por":"Portuguese"},"translations":{"deu":{"official":"Republik Guinea-Bissau","common":"Guinea-Bissau"},"fra":{"official":"République de Guinée-Bissau","common":"Guinée-Bissau"},"hrv":{"official":"Republika Gvineja Bisau","common":"Gvineja Bisau"},"ita":{"official":"Repubblica di Guinea-Bissau","common":"Guinea-Bissau"},"jpn":{"official":"ギニアビサウ共和国","common":"ギニアビサウ"},"nld":{"official":"Republiek Guinee-Bissau","common":"Guinee-Bissau"},"por":{"official":"República da Guiné-Bissau","common":"Guiné-Bissau"},"rus":{"official":"Республика Гвинея -Бисау","common":"Гвинея-Бисау"},"spa":{"official":"República de Guinea-Bissau","common":"Guinea-Bisáu"},"fin":{"official":"Guinea-Bissaun tasavalta","common":"Guinea-Bissau"},"zho":{"official":"几内亚比绍共和国","common":"几内亚比绍"}},"latlng":[12,-15],"demonym":"Guinea-Bissauan","landlocked":false,"borders":["GIN","SEN"],"area":36125,"id":87},{"name":{"common":"Equatorial Guinea","official":"Republic of Equatorial Guinea","native":{"fra":{"official":"République de la Guinée Équatoriale","common":"Guinée équatoriale"},"por":{"official":"República da Guiné Equatorial","common":"Guiné Equatorial"},"spa":{"official":"República de Guinea Ecuatorial","common":"Guinea Ecuatorial"}}},"tld":[".gq"],"cca2":"GQ","ccn3":"226","cca3":"GNQ","cioc":"GEQ","currency":["XAF"],"callingCode":["240"],"capital":"Malabo","altSpellings":["GQ","Republic of Equatorial Guinea","República de Guinea Ecuatorial","République de Guinée équatoriale","República da Guiné Equatorial"],"region":"Africa","subregion":"Middle Africa","languages":{"fra":"French","por":"Portuguese","spa":"Spanish"},"translations":{"cym":{"official":"Republic of Equatorial Guinea","common":"Gini Gyhydeddol"},"deu":{"official":"Republik Äquatorialguinea","common":"Äquatorialguinea"},"fra":{"official":"République de Guinée équatoriale","common":"Guinée équatoriale"},"hrv":{"official":"Republika Ekvatorska Gvineja","common":"Ekvatorijalna Gvineja"},"ita":{"official":"Repubblica della Guinea Equatoriale","common":"Guinea Equatoriale"},"jpn":{"official":"赤道ギニア共和国","common":"赤道ギニア"},"nld":{"official":"Republiek Equatoriaal-Guinea","common":"Equatoriaal-Guinea"},"por":{"official":"República da Guiné Equatorial","common":"Guiné Equatorial"},"rus":{"official":"Республика Экваториальная Гвинея","common":"Экваториальная Гвинея"},"spa":{"official":"República de Guinea Ecuatorial","common":"Guinea Ecuatorial"},"fin":{"official":"Päiväntasaajan Guinean tasavalta","common":"Päiväntasaajan Guinea"},"zho":{"official":"赤道几内亚共和国","common":"赤道几内亚"}},"latlng":[2,10],"demonym":"Equatorial Guinean","landlocked":false,"borders":["CMR","GAB"],"area":28051,"id":88},{"name":{"common":"Greece","official":"Hellenic Republic","native":{"ell":{"official":"Ελληνική Δημοκρατία","common":"Ελλάδα"}}},"tld":[".gr"],"cca2":"GR","ccn3":"300","cca3":"GRC","cioc":"GRE","currency":["EUR"],"callingCode":["30"],"capital":"Athens","altSpellings":["GR","Elláda","Hellenic Republic","Ελληνική Δημοκρατία"],"region":"Europe","subregion":"Southern Europe","languages":{"ell":"Greek"},"translations":{"deu":{"official":"Hellenische Republik","common":"Griechenland"},"fra":{"official":"République hellénique","common":"Grèce"},"hrv":{"official":"Helenska Republika","common":"Grčka"},"ita":{"official":"Repubblica ellenica","common":"Grecia"},"jpn":{"official":"ギリシャ共和国","common":"ギリシャ"},"nld":{"official":"Helleense Republiek","common":"Griekenland"},"por":{"official":"República Helénica","common":"Grécia"},"rus":{"official":"Греческая Республика","common":"Греция"},"spa":{"official":"República Helénica","common":"Grecia"},"fin":{"official":"Helleenien tasavalta","common":"Kreikka"},"zho":{"official":"希腊共和国","common":"希腊"}},"latlng":[39,22],"demonym":"Greek","landlocked":false,"borders":["ALB","BGR","TUR","MKD"],"area":131990,"id":89},{"name":{"common":"Grenada","official":"Grenada","native":{"eng":{"official":"Grenada","common":"Grenada"}}},"tld":[".gd"],"cca2":"GD","ccn3":"308","cca3":"GRD","cioc":"GRN","currency":["XCD"],"callingCode":["1473"],"capital":"St. George's","altSpellings":["GD"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Grenada","common":"Grenada"},"fra":{"official":"Grenade","common":"Grenade"},"hrv":{"official":"Grenada","common":"Grenada"},"ita":{"official":"Grenada","common":"Grenada"},"jpn":{"official":"グレナダ","common":"グレナダ"},"nld":{"official":"Grenada","common":"Grenada"},"por":{"official":"Grenada","common":"Granada"},"rus":{"official":"Гренада","common":"Гренада"},"spa":{"official":"Granada","common":"Grenada"},"fin":{"official":"Grenada","common":"Grenada"},"zho":{"official":"格林纳达","common":"格林纳达"}},"latlng":[12.11666666,-61.66666666],"demonym":"Grenadian","landlocked":false,"borders":[],"area":344,"id":90},{"name":{"common":"Greenland","official":"Greenland","native":{"kal":{"official":"Kalaallit Nunaat","common":"Kalaallit Nunaat"}}},"tld":[".gl"],"cca2":"GL","ccn3":"304","cca3":"GRL","cioc":"","currency":["DKK"],"callingCode":["299"],"capital":"Nuuk","altSpellings":["GL","Grønland"],"region":"Americas","subregion":"Northern America","languages":{"kal":"Greenlandic"},"translations":{"deu":{"official":"Grönland","common":"Grönland"},"fra":{"official":"Groenland","common":"Groenland"},"hrv":{"official":"Grenland","common":"Grenland"},"ita":{"official":"Groenlandia","common":"Groenlandia"},"jpn":{"official":"グリーンランド","common":"グリーンランド"},"nld":{"official":"Groenland","common":"Groenland"},"por":{"official":"Groenlândia","common":"Gronelândia"},"rus":{"official":"Гренландия","common":"Гренландия"},"spa":{"official":"Groenlandia","common":"Groenlandia"},"fin":{"official":"Groönlanti","common":"Groönlanti"},"zho":{"official":"格陵兰","common":"格陵兰"}},"latlng":[72,-40],"demonym":"Greenlandic","landlocked":false,"borders":[],"area":2166086,"id":91},{"name":{"common":"Guatemala","official":"Republic of Guatemala","native":{"spa":{"official":"República de Guatemala","common":"Guatemala"}}},"tld":[".gt"],"cca2":"GT","ccn3":"320","cca3":"GTM","cioc":"GUA","currency":["GTQ"],"callingCode":["502"],"capital":"Guatemala City","altSpellings":["GT"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Republik Guatemala","common":"Guatemala"},"fra":{"official":"République du Guatemala","common":"Guatemala"},"hrv":{"official":"Republika Gvatemala","common":"Gvatemala"},"ita":{"official":"Repubblica del Guatemala","common":"Guatemala"},"jpn":{"official":"グアテマラ共和国","common":"グアテマラ"},"nld":{"official":"Republiek Guatemala","common":"Guatemala"},"por":{"official":"República da Guatemala","common":"Guatemala"},"rus":{"official":"Республика Гватемала","common":"Гватемала"},"spa":{"official":"República de Guatemala","common":"Guatemala"},"fin":{"official":"Guatemalan tasavalta","common":"Guatemala"},"zho":{"official":"危地马拉共和国","common":"危地马拉"}},"latlng":[15.5,-90.25],"demonym":"Guatemalan","landlocked":false,"borders":["BLZ","SLV","HND","MEX"],"area":108889,"id":92},{"name":{"common":"French Guiana","official":"Guiana","native":{"fra":{"official":"Guyanes","common":"Guyane française"}}},"tld":[".gf"],"cca2":"GF","ccn3":"254","cca3":"GUF","cioc":"","currency":["EUR"],"callingCode":["594"],"capital":"Cayenne","altSpellings":["GF","Guiana","Guyane"],"region":"Americas","subregion":"South America","languages":{"fra":"French"},"translations":{"deu":{"official":"Guayana","common":"Französisch Guyana"},"fra":{"official":"Guyane","common":"Guyane"},"hrv":{"official":"Gijana","common":"Francuska Gvajana"},"ita":{"official":"Guiana","common":"Guyana francese"},"jpn":{"official":"ギアナ","common":"フランス領ギアナ"},"nld":{"official":"Guyana","common":"Frans-Guyana"},"por":{"official":"Guiana","common":"Guiana Francesa"},"rus":{"official":"Гвиана","common":"Французская Гвиана"},"spa":{"official":"Guayana","common":"Guayana Francesa"},"fin":{"official":"Ranskan Guayana","common":"Ranskan Guayana"},"zho":{"official":"法属圭亚那","common":"法属圭亚那"}},"latlng":[4,-53],"demonym":"","landlocked":false,"borders":["BRA","SUR"],"area":83534,"id":93},{"name":{"common":"Guam","official":"Guam","native":{"cha":{"official":"Guåhån","common":"Guåhån"},"eng":{"official":"Guam","common":"Guam"},"spa":{"official":"Guam","common":"Guam"}}},"tld":[".gu"],"cca2":"GU","ccn3":"316","cca3":"GUM","cioc":"GUM","currency":["USD"],"callingCode":["1671"],"capital":"Hagåtña","altSpellings":["GU","Guåhån"],"region":"Oceania","subregion":"Micronesia","languages":{"cha":"Chamorro","eng":"English","spa":"Spanish"},"translations":{"deu":{"official":"Guam","common":"Guam"},"fra":{"official":"Guam","common":"Guam"},"hrv":{"official":"Guam","common":"Guam"},"ita":{"official":"Guam","common":"Guam"},"jpn":{"official":"グアム","common":"グアム"},"nld":{"official":"Guam","common":"Guam"},"por":{"official":"Guam","common":"Guam"},"rus":{"official":"Гуам","common":"Гуам"},"spa":{"official":"Guam","common":"Guam"},"fin":{"official":"Guam","common":"Guam"},"zho":{"official":"关岛","common":"关岛"}},"latlng":[13.46666666,144.78333333],"demonym":"Guamanian","landlocked":false,"borders":[],"area":549,"id":94},{"name":{"common":"Guyana","official":"Co-operative Republic of Guyana","native":{"eng":{"official":"Co-operative Republic of Guyana","common":"Guyana"}}},"tld":[".gy"],"cca2":"GY","ccn3":"328","cca3":"GUY","cioc":"GUY","currency":["GYD"],"callingCode":["592"],"capital":"Georgetown","altSpellings":["GY","Co-operative Republic of Guyana"],"region":"Americas","subregion":"South America","languages":{"eng":"English"},"translations":{"deu":{"official":"Kooperative Republik Guyana","common":"Guyana"},"fra":{"official":"République coopérative de Guyana","common":"Guyana"},"hrv":{"official":"Zadruga Republika Gvajana","common":"Gvajana"},"ita":{"official":"Co -operative Republic of Guyana","common":"Guyana"},"jpn":{"official":"ガイアナの協同共和国","common":"ガイアナ"},"nld":{"official":"Coöperatieve Republiek Guyana","common":"Guyana"},"por":{"official":"Co -operative República da Guiana","common":"Guiana"},"rus":{"official":"Кооперативная Республика Гайана","common":"Гайана"},"spa":{"official":"República Cooperativa de Guyana","common":"Guyana"},"fin":{"official":"Guayanan osuustoiminnallinen tasavalta","common":"Guayana"},"zho":{"official":"圭亚那共和国","common":"圭亚那"}},"latlng":[5,-59],"demonym":"Guyanese","landlocked":false,"borders":["BRA","SUR","VEN"],"area":214969,"id":95},{"name":{"common":"Hong Kong","official":"Hong Kong Special Administrative Region of the People's Republic of China","native":{"eng":{"official":"Hong Kong Special Administrative Region of the People's Republic of China","common":"Hong Kong"},"zho":{"official":"中华人民共和国香港特别行政区","common":"香港"}}},"tld":[".hk",".香港"],"cca2":"HK","ccn3":"344","cca3":"HKG","cioc":"HKG","currency":["HKD"],"callingCode":["852"],"capital":"City of Victoria","altSpellings":["HK"],"region":"Asia","subregion":"Eastern Asia","languages":{"eng":"English","zho":"Chinese"},"translations":{"deu":{"official":"Sonderverwaltungszone der Volksrepublik China","common":"Hongkong"},"fra":{"official":"Région administrative spéciale de Hong Kong de la République populaire de Chine","common":"Hong Kong"},"hrv":{"official":"Hong Kong Posebnog upravnog područjaNarodne Republike Kine","common":"Hong Kong"},"ita":{"official":"Hong Kong Regione amministrativa speciale della Repubblica Popolare Cinese","common":"Hong Kong"},"jpn":{"official":"中華人民共和国香港特別行政区","common":"香港"},"nld":{"official":"Hong Kong Speciale Administratieve Regio van de Volksrepubliek China","common":"Hongkong"},"por":{"official":"Hong Kong Região Administrativa Especial da República Popular da China","common":"Hong Kong"},"rus":{"official":"Hong Kong Специальный административный район Китайской Народной Республики Китая","common":"Гонконг"},"spa":{"official":"Hong Kong Región Administrativa Especial de la República Popular China","common":"Hong Kong"},"fin":{"official":"Hong Kongin erityishallintoalue","common":"Hongkong"}},"latlng":[22.267,114.188],"demonym":"Hong Konger","landlocked":false,"borders":["CHN"],"area":1104,"id":96},{"name":{"common":"Heard Island and McDonald Islands","official":"Heard Island and McDonald Islands","native":{"eng":{"official":"Heard Island and McDonald Islands","common":"Heard Island and McDonald Islands"}}},"tld":[".hm",".aq"],"cca2":"HM","ccn3":"334","cca3":"HMD","cioc":"","currency":["AUD"],"callingCode":[],"capital":"","altSpellings":["HM","Heard Island and McDonald Islands"],"region":"","subregion":"","languages":{"eng":"English"},"translations":{"deu":{"official":"Heard und McDonaldinseln","common":"Heard und die McDonaldinseln"},"fra":{"official":"Des îles Heard et McDonald","common":"Îles Heard-et-MacDonald"},"hrv":{"official":"Otok Heard i otočje McDonald","common":"Otok Heard i otočje McDonald"},"ita":{"official":"Isole Heard e McDonald","common":"Isole Heard e McDonald"},"jpn":{"official":"ハード島とマクドナルド諸島","common":"ハード島とマクドナルド諸島"},"nld":{"official":"Heard en McDonaldeilanden","common":"Heard-en McDonaldeilanden"},"por":{"official":"Ilha Heard e Ilhas McDonald","common":"Ilha Heard e Ilhas McDonald"},"rus":{"official":"Остров Херд и острова Макдональд","common":"Остров Херд и острова Макдональд"},"spa":{"official":"Islas Heard y McDonald","common":"Islas Heard y McDonald"},"fin":{"official":"Heard ja McDonaldinsaaret","common":"Heard ja McDonaldinsaaret"},"zho":{"official":"赫德岛和麦当劳群岛","common":"赫德岛和麦当劳群岛"}},"latlng":[-53.1,72.51666666],"demonym":"Heard and McDonald Islander","landlocked":false,"borders":[],"area":412,"id":97},{"name":{"common":"Honduras","official":"Republic of Honduras","native":{"spa":{"official":"República de Honduras","common":"Honduras"}}},"tld":[".hn"],"cca2":"HN","ccn3":"340","cca3":"HND","cioc":"HON","currency":["HNL"],"callingCode":["504"],"capital":"Tegucigalpa","altSpellings":["HN","Republic of Honduras","República de Honduras"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Republik Honduras","common":"Honduras"},"fra":{"official":"République du Honduras","common":"Honduras"},"hrv":{"official":"Republika Honduras","common":"Honduras"},"ita":{"official":"Repubblica di Honduras","common":"Honduras"},"jpn":{"official":"ホンジュラス共和国","common":"ホンジュラス"},"nld":{"official":"Republiek Honduras","common":"Honduras"},"por":{"official":"República de Honduras","common":"Honduras"},"rus":{"official":"Республика Гондурас","common":"Гондурас"},"spa":{"official":"República de Honduras","common":"Honduras"},"fin":{"official":"Hondurasin tasavalta","common":"Honduras"},"zho":{"official":"洪都拉斯共和国","common":"洪都拉斯"}},"latlng":[15,-86.5],"demonym":"Honduran","landlocked":false,"borders":["GTM","SLV","NIC"],"area":112492,"id":98},{"name":{"common":"Croatia","official":"Republic of Croatia","native":{"hrv":{"official":"Republika Hrvatska","common":"Hrvatska"}}},"tld":[".hr"],"cca2":"HR","ccn3":"191","cca3":"HRV","cioc":"CRO","currency":["HRK"],"callingCode":["385"],"capital":"Zagreb","altSpellings":["HR","Hrvatska","Republic of Croatia","Republika Hrvatska"],"region":"Europe","subregion":"Southern Europe","languages":{"hrv":"Croatian"},"translations":{"cym":{"official":"Republic of Croatia","common":"Croatia"},"deu":{"official":"Republik Kroatien","common":"Kroatien"},"fra":{"official":"République de Croatie","common":"Croatie"},"hrv":{"official":"Republika Hrvatska","common":"Hrvatska"},"ita":{"official":"Repubblica di Croazia","common":"Croazia"},"jpn":{"official":"クロアチア共和国","common":"クロアチア"},"nld":{"official":"Republiek Kroatië","common":"Kroatië"},"por":{"official":"República da Croácia","common":"Croácia"},"rus":{"official":"Республика Хорватия","common":"Хорватия"},"spa":{"official":"República de Croacia","common":"Croacia"},"fin":{"official":"Kroatian tasavalta","common":"Kroatia"},"zho":{"official":"克罗地亚共和国","common":"克罗地亚"}},"latlng":[45.16666666,15.5],"demonym":"Croatian","landlocked":false,"borders":["BIH","HUN","MNE","SRB","SVN"],"area":56594,"id":99},{"name":{"common":"Haiti","official":"Republic of Haiti","native":{"fra":{"official":"République d'Haïti","common":"Haïti"},"hat":{"official":"Repiblik Ayiti","common":"Ayiti"}}},"tld":[".ht"],"cca2":"HT","ccn3":"332","cca3":"HTI","cioc":"HAI","currency":["HTG","USD"],"callingCode":["509"],"capital":"Port-au-Prince","altSpellings":["HT","Republic of Haiti","République d'Haïti","Repiblik Ayiti"],"region":"Americas","subregion":"Caribbean","languages":{"fra":"French","hat":"Haitian Creole"},"translations":{"deu":{"official":"Republik Haiti","common":"Haiti"},"fra":{"official":"République d'Haïti","common":"Haïti"},"hrv":{"official":"Republika Haiti","common":"Haiti"},"ita":{"official":"Repubblica di Haiti","common":"Haiti"},"jpn":{"official":"ハイチ共和国","common":"ハイチ"},"nld":{"official":"Republiek Haïti","common":"Haïti"},"por":{"official":"República do Haiti","common":"Haiti"},"rus":{"official":"Республика Гаити","common":"Гаити"},"spa":{"official":"República de Haití","common":"Haiti"},"fin":{"official":"Haitin tasavalta","common":"Haiti"},"zho":{"official":"海地共和国","common":"海地"}},"latlng":[19,-72.41666666],"demonym":"Haitian","landlocked":false,"borders":["DOM"],"area":27750,"id":100},{"name":{"common":"Hungary","official":"Hungary","native":{"hun":{"official":"Magyarország","common":"Magyarország"}}},"tld":[".hu"],"cca2":"HU","ccn3":"348","cca3":"HUN","cioc":"HUN","currency":["HUF"],"callingCode":["36"],"capital":"Budapest","altSpellings":["HU"],"region":"Europe","subregion":"Eastern Europe","languages":{"hun":"Hungarian"},"translations":{"deu":{"official":"Ungarn","common":"Ungarn"},"fra":{"official":"Hongrie","common":"Hongrie"},"hrv":{"official":"Madžarska","common":"Mađarska"},"ita":{"official":"Ungheria","common":"Ungheria"},"jpn":{"official":"ハンガリー","common":"ハンガリー"},"nld":{"official":"Hongarije","common":"Hongarije"},"por":{"official":"Hungria","common":"Hungria"},"rus":{"official":"Венгрия","common":"Венгрия"},"spa":{"official":"Hungría","common":"Hungría"},"fin":{"official":"Unkari","common":"Unkari"},"zho":{"official":"匈牙利","common":"匈牙利"}},"latlng":[47,20],"demonym":"Hungarian","landlocked":true,"borders":["AUT","HRV","ROU","SRB","SVK","SVN","UKR"],"area":93028,"id":101},{"name":{"common":"Indonesia","official":"Republic of Indonesia","native":{"ind":{"official":"Republik Indonesia","common":"Indonesia"}}},"tld":[".id"],"cca2":"ID","ccn3":"360","cca3":"IDN","cioc":"INA","currency":["IDR"],"callingCode":["62"],"capital":"Jakarta","altSpellings":["ID","Republic of Indonesia","Republik Indonesia"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"ind":"Indonesian"},"translations":{"deu":{"official":"Republik Indonesien","common":"Indonesien"},"fra":{"official":"République d'Indonésie","common":"Indonésie"},"hrv":{"official":"Republika Indonezija","common":"Indonezija"},"ita":{"official":"Repubblica di Indonesia","common":"Indonesia"},"jpn":{"official":"インドネシア共和国","common":"インドネシア"},"nld":{"official":"Republiek Indonesië","common":"Indonesië"},"por":{"official":"República da Indonésia","common":"Indonésia"},"rus":{"official":"Республика Индонезия","common":"Индонезия"},"spa":{"official":"República de Indonesia","common":"Indonesia"},"fin":{"official":"Indonesian tasavalta","common":"Indonesia"},"zho":{"official":"印度尼西亚共和国","common":"印度尼西亚"}},"latlng":[-5,120],"demonym":"Indonesian","landlocked":false,"borders":["TLS","MYS","PNG"],"area":1904569,"id":102},{"name":{"common":"Isle of Man","official":"Isle of Man","native":{"eng":{"official":"Isle of Man","common":"Isle of Man"},"glv":{"official":"Ellan Vannin or Mannin","common":"Mannin"}}},"tld":[".im"],"cca2":"IM","ccn3":"833","cca3":"IMN","cioc":"","currency":["GBP"],"callingCode":["44"],"capital":"Douglas","altSpellings":["IM","Ellan Vannin","Mann","Mannin"],"region":"Europe","subregion":"Northern Europe","languages":{"eng":"English","glv":"Manx"},"translations":{"deu":{"official":"Isle of Man","common":"Insel Man"},"fra":{"official":"Isle of Man","common":"Île de Man"},"hrv":{"official":"Mana ostrvo","common":"Otok Man"},"ita":{"official":"Isola di Man","common":"Isola di Man"},"jpn":{"official":"マン島","common":"マン島"},"nld":{"official":"Isle of Man","common":"Isle of Man"},"por":{"official":"Isle of Man","common":"Ilha de Man"},"rus":{"official":"Остров Мэн","common":"Остров Мэн"},"spa":{"official":"Isla de Man","common":"Isla de Man"},"fin":{"official":"Mansaari","common":"Mansaari"},"zho":{"official":"马恩岛","common":"马恩岛"}},"latlng":[54.25,-4.5],"demonym":"Manx","landlocked":false,"borders":[],"area":572,"id":103},{"name":{"common":"India","official":"Republic of India","native":{"eng":{"official":"Republic of India","common":"India"},"hin":{"official":"भारत गणराज्य","common":"भारत"},"tam":{"official":"இந்தியக் குடியரசு","common":"இந்தியா"}}},"tld":[".in"],"cca2":"IN","ccn3":"356","cca3":"IND","cioc":"IND","currency":["INR"],"callingCode":["91"],"capital":"New Delhi","altSpellings":["IN","Bhārat","Republic of India","Bharat Ganrajya","இந்தியா"],"region":"Asia","subregion":"Southern Asia","languages":{"eng":"English","hin":"Hindi","tam":"Tamil"},"translations":{"deu":{"official":"Republik Indien","common":"Indien"},"fra":{"official":"République de l'Inde","common":"Inde"},"hrv":{"official":"Republika Indija","common":"Indija"},"ita":{"official":"Repubblica dell'India","common":"India"},"jpn":{"official":"インド共和国","common":"インド"},"nld":{"official":"Republiek India","common":"India"},"por":{"official":"República da Índia","common":"Índia"},"rus":{"official":"Республика Индия","common":"Индия"},"spa":{"official":"República de la India","common":"India"},"fin":{"official":"Intian tasavalta","common":"Intia"},"zho":{"official":"印度共和国","common":"印度"}},"latlng":[20,77],"demonym":"Indian","landlocked":false,"borders":["AFG","BGD","BTN","MMR","CHN","NPL","PAK","LKA"],"area":3287590,"id":104},{"name":{"common":"British Indian Ocean Territory","official":"British Indian Ocean Territory","native":{"eng":{"official":"British Indian Ocean Territory","common":"British Indian Ocean Territory"}}},"tld":[".io"],"cca2":"IO","ccn3":"086","cca3":"IOT","cioc":"","currency":["USD"],"callingCode":["246"],"capital":"Diego Garcia","altSpellings":["IO"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English"},"translations":{"cym":{"official":"British Indian Ocean Territory","common":"Tiriogaeth Brydeinig Cefnfor India"},"deu":{"official":"Britisch-Indischer Ozean","common":"Britisches Territorium im Indischen Ozean"},"fra":{"official":"Territoire britannique de l' océan Indien","common":"Territoire britannique de l'océan Indien"},"hrv":{"official":"British Indian Ocean Territory","common":"Britanski Indijskooceanski teritorij"},"ita":{"official":"Territorio britannico dell'Oceano Indiano","common":"Territorio britannico dell'oceano indiano"},"jpn":{"official":"イギリス領インド洋地域","common":"イギリス領インド洋地域"},"nld":{"official":"Brits Indische Oceaan Territorium","common":"Britse Gebieden in de Indische Oceaan"},"por":{"official":"British Indian Ocean Territory","common":"Território Britânico do Oceano Índico"},"rus":{"official":"Британская территория Индийского океана","common":"Британская территория в Индийском океане"},"spa":{"official":"Territorio Británico del Océano Índico","common":"Territorio Británico del Océano Índico"},"fin":{"official":"Brittiläinen Intian valtameren alue","common":"Brittiläinen Intian valtameren alue"},"zho":{"official":"英属印度洋领地","common":"英属印度洋领地"}},"latlng":[-6,71.5],"demonym":"Indian","landlocked":false,"borders":[],"area":60,"id":105},{"name":{"common":"Ireland","official":"Republic of Ireland","native":{"eng":{"official":"Republic of Ireland","common":"Ireland"},"gle":{"official":"Poblacht na hÉireann","common":"Éire"}}},"tld":[".ie"],"cca2":"IE","ccn3":"372","cca3":"IRL","cioc":"IRL","currency":["EUR"],"callingCode":["353"],"capital":"Dublin","altSpellings":["IE","Éire","Republic of Ireland","Poblacht na hÉireann"],"region":"Europe","subregion":"Northern Europe","languages":{"eng":"English","gle":"Irish"},"translations":{"deu":{"official":"Republik Irland","common":"Irland"},"fra":{"official":"République d'Irlande","common":"Irlande"},"hrv":{"official":"Republika Irska","common":"Irska"},"ita":{"official":"Repubblica d'Irlanda","common":"Irlanda"},"jpn":{"official":"アイルランド共和国","common":"アイルランド"},"nld":{"official":"Republic of Ireland","common":"Ierland"},"por":{"official":"República da Irlanda","common":"Irlanda"},"rus":{"official":"Ирландия","common":"Ирландия"},"spa":{"official":"República de Irlanda","common":"Irlanda"},"fin":{"official":"Irlannin tasavalta","common":"Irlanti"},"zho":{"official":"爱尔兰共和国","common":"爱尔兰"}},"latlng":[53,-8],"demonym":"Irish","landlocked":false,"borders":["GBR"],"area":70273,"id":106},{"name":{"common":"Iran","official":"Islamic Republic of Iran","native":{"fas":{"official":"جمهوری اسلامی ایران","common":"ایران"}}},"tld":[".ir","ایران."],"cca2":"IR","ccn3":"364","cca3":"IRN","cioc":"IRI","currency":["IRR"],"callingCode":["98"],"capital":"Tehran","altSpellings":["IR","Islamic Republic of Iran","Iran, Islamic Republic of","Jomhuri-ye Eslāmi-ye Irān"],"region":"Asia","subregion":"Southern Asia","languages":{"fas":"Persian"},"translations":{"deu":{"official":"Islamische Republik Iran","common":"Iran"},"fra":{"official":"République islamique d'Iran","common":"Iran"},"hrv":{"official":"Islamska Republika Iran","common":"Iran"},"jpn":{"official":"イラン·イスラム共和国","common":"イラン・イスラム共和国"},"nld":{"official":"Islamitische Republiek Iran","common":"Iran"},"por":{"official":"República Islâmica do Irã","common":"Irão"},"rus":{"official":"Исламская Республика Иран","common":"Иран"},"spa":{"official":"República Islámica de Irán","common":"Iran"},"fin":{"official":"Iranin islamilainen tasavalta","common":"Iran"},"zho":{"official":"伊朗伊斯兰共和国","common":"伊朗"}},"latlng":[32,53],"demonym":"Iranian","landlocked":false,"borders":["AFG","ARM","AZE","IRQ","PAK","TUR","TKM"],"area":1648195,"id":107},{"name":{"common":"Iraq","official":"Republic of Iraq","native":{"ara":{"official":"جمهورية العراق","common":"العراق"},"arc":{"official":"ܩܘܼܛܢܵܐ ܐܝܼܪܲܩ","common":"ܩܘܼܛܢܵܐ"},"ckb":{"official":"کۆماری عێراق","common":"کۆماری"}}},"tld":[".iq"],"cca2":"IQ","ccn3":"368","cca3":"IRQ","cioc":"IRQ","currency":["IQD"],"callingCode":["964"],"capital":"Baghdad","altSpellings":["IQ","Republic of Iraq","Jumhūriyyat al-‘Irāq"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic","arc":"Aramaic","ckb":"Sorani"},"translations":{"deu":{"official":"Republik Irak","common":"Irak"},"fra":{"official":"République d'Irak","common":"Irak"},"hrv":{"official":"Republika Irak","common":"Irak"},"ita":{"official":"Repubblica dell'Iraq","common":"Iraq"},"jpn":{"official":"イラク共和国","common":"イラク"},"nld":{"official":"Republiek Irak","common":"Irak"},"por":{"official":"República do Iraque","common":"Iraque"},"rus":{"official":"Республика Ирак","common":"Ирак"},"spa":{"official":"República de Irak","common":"Irak"},"fin":{"official":"Irakin tasavalta","common":"Irak"},"zho":{"official":"伊拉克共和国","common":"伊拉克"}},"latlng":[33,44],"demonym":"Iraqi","landlocked":false,"borders":["IRN","JOR","KWT","SAU","SYR","TUR"],"area":438317,"id":108},{"name":{"common":"Iceland","official":"Iceland","native":{"isl":{"official":"Ísland","common":"Ísland"}}},"tld":[".is"],"cca2":"IS","ccn3":"352","cca3":"ISL","cioc":"ISL","currency":["ISK"],"callingCode":["354"],"capital":"Reykjavik","altSpellings":["IS","Island","Republic of Iceland","Lýðveldið Ísland"],"region":"Europe","subregion":"Northern Europe","languages":{"isl":"Icelandic"},"translations":{"deu":{"official":"Island","common":"Island"},"fra":{"official":"République d'Islande","common":"Islande"},"hrv":{"official":"Island","common":"Island"},"ita":{"official":"Islanda","common":"Islanda"},"jpn":{"official":"アイスランド","common":"アイスランド"},"nld":{"official":"IJsland","common":"IJsland"},"por":{"official":"Islândia","common":"Islândia"},"rus":{"official":"Исландия","common":"Исландия"},"spa":{"official":"Islandia","common":"Islandia"},"fin":{"official":"Islanti","common":"Islanti"},"zho":{"official":"冰岛","common":"冰岛"}},"latlng":[65,-18],"demonym":"Icelander","landlocked":false,"borders":[],"area":103000,"id":109},{"name":{"common":"Israel","official":"State of Israel","native":{"ara":{"official":"دولة إسرائيل","common":"إسرائيل"},"heb":{"official":"מדינת ישראל","common":"ישראל"}}},"tld":[".il"],"cca2":"IL","ccn3":"376","cca3":"ISR","cioc":"ISR","currency":["ILS"],"callingCode":["972"],"capital":"Jerusalem","altSpellings":["IL","State of Israel","Medīnat Yisrā'el"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic","heb":"Hebrew"},"translations":{"deu":{"official":"Staat Israel","common":"Israel"},"fra":{"official":"État d'Israël","common":"Israël"},"hrv":{"official":"Država Izrael","common":"Izrael"},"ita":{"official":"Stato di Israele","common":"Israele"},"jpn":{"official":"イスラエル国","common":"イスラエル"},"nld":{"official":"Staat Israël","common":"Israël"},"por":{"official":"Estado de Israel","common":"Israel"},"rus":{"official":"Государство Израиль","common":"Израиль"},"spa":{"official":"Estado de Israel","common":"Israel"},"fin":{"official":"Israelin valtio","common":"Israel"},"zho":{"official":"以色列国","common":"以色列"}},"latlng":[31.47,35.13],"demonym":"Israeli","landlocked":false,"borders":["EGY","JOR","LBN","SYR"],"area":20770,"id":110},{"name":{"common":"Italy","official":"Italian Republic","native":{"bar":{"official":"Italienische Republik","common":"Italien"},"ita":{"official":"Repubblica italiana","common":"Italia"},"srd":{"official":"Repubbricanu Italia","common":"Italia"}}},"tld":[".it"],"cca2":"IT","ccn3":"380","cca3":"ITA","cioc":"ITA","currency":["EUR"],"callingCode":["39"],"capital":"Rome","altSpellings":["IT","Italian Republic","Repubblica italiana"],"region":"Europe","subregion":"Southern Europe","languages":{"bar":"Austro-Bavarian German","ita":"Italian","srd":"Sardinian"},"translations":{"deu":{"official":"Italienische Republik","common":"Italien"},"fra":{"official":"République italienne","common":"Italie"},"hrv":{"official":"talijanska Republika","common":"Italija"},"ita":{"official":"Repubblica italiana","common":"Italia"},"jpn":{"official":"イタリア共和国","common":"イタリア"},"nld":{"official":"Italiaanse Republiek","common":"Italië"},"por":{"official":"República Italiana","common":"Itália"},"rus":{"official":"итальянская Республика","common":"Италия"},"spa":{"official":"República Italiana","common":"Italia"},"fin":{"official":"Italian tasavalta","common":"Italia"},"zho":{"official":"意大利共和国","common":"意大利"}},"latlng":[42.83333333,12.83333333],"demonym":"Italian","landlocked":false,"borders":["AUT","FRA","SMR","SVN","CHE","VAT"],"area":301336,"id":111},{"name":{"common":"Jamaica","official":"Jamaica","native":{"eng":{"official":"Jamaica","common":"Jamaica"},"jam":{"official":"Jamaica","common":"Jamaica"}}},"tld":[".jm"],"cca2":"JM","ccn3":"388","cca3":"JAM","cioc":"JAM","currency":["JMD"],"callingCode":["1876"],"capital":"Kingston","altSpellings":["JM"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English","jam":"Jamaican Patois"},"translations":{"deu":{"official":"Jamaika","common":"Jamaika"},"fra":{"official":"Jamaïque","common":"Jamaïque"},"hrv":{"official":"Jamajka","common":"Jamajka"},"ita":{"official":"Giamaica","common":"Giamaica"},"jpn":{"official":"ジャマイカ","common":"ジャマイカ"},"nld":{"official":"Jamaica","common":"Jamaica"},"por":{"official":"Jamaica","common":"Jamaica"},"rus":{"official":"Ямайка","common":"Ямайка"},"spa":{"official":"Jamaica","common":"Jamaica"},"fin":{"official":"Jamaika","common":"Jamaika"},"zho":{"official":"牙买加","common":"牙买加"}},"latlng":[18.25,-77.5],"demonym":"Jamaican","landlocked":false,"borders":[],"area":10991,"id":112},{"name":{"common":"Jersey","official":"Bailiwick of Jersey","native":{"eng":{"official":"Bailiwick of Jersey","common":"Jersey"},"fra":{"official":"Bailliage de Jersey","common":"Jersey"},"nrf":{"official":"Bailliage dé Jèrri","common":"Jèrri"}}},"tld":[".je"],"cca2":"JE","ccn3":"832","cca3":"JEY","cioc":"","currency":["GBP"],"callingCode":["44"],"capital":"Saint Helier","altSpellings":["JE","Bailiwick of Jersey","Bailliage de Jersey","Bailliage dé Jèrri"],"region":"Europe","subregion":"Northern Europe","languages":{"eng":"English","fra":"French","nrf":"Jèrriais"},"translations":{"deu":{"official":"Vogtei Jersey","common":"Jersey"},"fra":{"official":"Bailliage de Jersey","common":"Jersey"},"hrv":{"official":"Struka od Jersey","common":"Jersey"},"ita":{"official":"Baliato di Jersey","common":"Isola di Jersey"},"jpn":{"official":"ジャージの得意分野","common":"ジャージー"},"nld":{"official":"Baljuwschap Jersey","common":"Jersey"},"por":{"official":"Bailiado de Jersey","common":"Jersey"},"rus":{"official":"Коронное владение Джерси","common":"Джерси"},"spa":{"official":"Bailía de Jersey","common":"Jersey"},"fin":{"official":"Jersey","common":"Jersey"},"zho":{"official":"泽西岛","common":"泽西岛"}},"latlng":[49.25,-2.16666666],"demonym":"Channel Islander","landlocked":false,"borders":[],"area":116,"id":113},{"name":{"common":"Jordan","official":"Hashemite Kingdom of Jordan","native":{"ara":{"official":"المملكة الأردنية الهاشمية","common":"الأردن"}}},"tld":[".jo","الاردن."],"cca2":"JO","ccn3":"400","cca3":"JOR","cioc":"JOR","currency":["JOD"],"callingCode":["962"],"capital":"Amman","altSpellings":["JO","Hashemite Kingdom of Jordan","al-Mamlakah al-Urdunīyah al-Hāshimīyah"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Haschemitisches Königreich Jordanien","common":"Jordanien"},"fra":{"official":"Royaume hachémite de Jordanie","common":"Jordanie"},"hrv":{"official":"Hašemitske Kraljevine Jordan","common":"Jordan"},"ita":{"official":"Regno hascemita di Giordania","common":"Giordania"},"jpn":{"official":"ヨルダン·ハシミテ王国","common":"ヨルダン"},"nld":{"official":"Hasjemitisch Koninkrijk Jordanië","common":"Jordanië"},"por":{"official":"Reino Hachemita da Jordânia","common":"Jordânia"},"rus":{"official":"Иорданского Хашимитского Королевства","common":"Иордания"},"spa":{"official":"Reino Hachemita de Jordania","common":"Jordania"},"fin":{"official":"Jordanian hašemiittinen kunigaskunta","common":"Jordania"},"zho":{"official":"约旦哈希姆王国","common":"约旦"}},"latlng":[31,36],"demonym":"Jordanian","landlocked":false,"borders":["IRQ","ISR","SAU","SYR"],"area":89342,"id":114},{"name":{"common":"Japan","official":"Japan","native":{"jpn":{"official":"日本","common":"日本"}}},"tld":[".jp",".みんな"],"cca2":"JP","ccn3":"392","cca3":"JPN","cioc":"JPN","currency":["JPY"],"callingCode":["81"],"capital":"Tokyo","altSpellings":["JP","Nippon","Nihon"],"region":"Asia","subregion":"Eastern Asia","languages":{"jpn":"Japanese"},"translations":{"deu":{"official":"Japan","common":"Japan"},"fra":{"official":"Japon","common":"Japon"},"hrv":{"official":"Japan","common":"Japan"},"ita":{"official":"Giappone","common":"Giappone"},"jpn":{"official":"日本","common":"日本"},"nld":{"official":"Japan","common":"Japan"},"por":{"official":"Japão","common":"Japão"},"rus":{"official":"Япония","common":"Япония"},"spa":{"official":"Japón","common":"Japón"},"fin":{"official":"Japani","common":"Japani"},"zho":{"official":"日本国","common":"日本"}},"latlng":[36,138],"demonym":"Japanese","landlocked":false,"borders":[],"area":377930,"id":115},{"name":{"common":"Kazakhstan","official":"Republic of Kazakhstan","native":{"kaz":{"official":"Қазақстан Республикасы","common":"Қазақстан"},"rus":{"official":"Республика Казахстан","common":"Казахстан"}}},"tld":[".kz",".қаз"],"cca2":"KZ","ccn3":"398","cca3":"KAZ","cioc":"KAZ","currency":["KZT"],"callingCode":["76","77"],"capital":"Astana","altSpellings":["KZ","Qazaqstan","Казахстан","Republic of Kazakhstan","Қазақстан Республикасы","Qazaqstan Respublïkası","Республика Казахстан","Respublika Kazakhstan"],"region":"Asia","subregion":"Central Asia","languages":{"kaz":"Kazakh","rus":"Russian"},"translations":{"deu":{"official":"Republik Kasachstan","common":"Kasachstan"},"fra":{"official":"République du Kazakhstan","common":"Kazakhstan"},"hrv":{"official":"Republika Kazahstan","common":"Kazahstan"},"ita":{"official":"Repubblica del Kazakhstan","common":"Kazakistan"},"jpn":{"official":"カザフスタン共和国","common":"カザフスタン"},"nld":{"official":"Republiek Kazachstan","common":"Kazachstan"},"por":{"official":"República do Cazaquistão","common":"Cazaquistão"},"rus":{"official":"Республика Казахстан","common":"Казахстан"},"spa":{"official":"República de Kazajstán","common":"Kazajistán"},"fin":{"official":"Kazakstanin tasavalta","common":"Kazakstan"},"zho":{"official":"哈萨克斯坦共和国","common":"哈萨克斯坦"}},"latlng":[48,68],"demonym":"Kazakhstani","landlocked":true,"borders":["CHN","KGZ","RUS","TKM","UZB"],"area":2724900,"id":116},{"name":{"common":"Kenya","official":"Republic of Kenya","native":{"eng":{"official":"Republic of Kenya","common":"Kenya"},"swa":{"official":"Republic of Kenya","common":"Kenya"}}},"tld":[".ke"],"cca2":"KE","ccn3":"404","cca3":"KEN","cioc":"KEN","currency":["KES"],"callingCode":["254"],"capital":"Nairobi","altSpellings":["KE","Republic of Kenya","Jamhuri ya Kenya"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","swa":"Swahili"},"translations":{"deu":{"official":"Republik Kenia","common":"Kenia"},"fra":{"official":"République du Kenya","common":"Kenya"},"hrv":{"official":"Republika Kenija","common":"Kenija"},"ita":{"official":"Repubblica del Kenya","common":"Kenya"},"jpn":{"official":"ケニア共和国","common":"ケニア"},"nld":{"official":"Republiek Kenia","common":"Kenia"},"por":{"official":"República do Quénia","common":"Quénia"},"rus":{"official":"Республика Кения","common":"Кения"},"spa":{"official":"República de Kenya","common":"Kenia"},"fin":{"official":"Kenian tasavalta","common":"Kenia"},"zho":{"official":"肯尼亚共和国","common":"肯尼亚"}},"latlng":[1,38],"demonym":"Kenyan","landlocked":false,"borders":["ETH","SOM","SSD","TZA","UGA"],"area":580367,"id":117},{"name":{"common":"Kyrgyzstan","official":"Kyrgyz Republic","native":{"kir":{"official":"Кыргыз Республикасы","common":"Кыргызстан"},"rus":{"official":"Кыргызская Республика","common":"Киргизия"}}},"tld":[".kg"],"cca2":"KG","ccn3":"417","cca3":"KGZ","cioc":"KGZ","currency":["KGS"],"callingCode":["996"],"capital":"Bishkek","altSpellings":["KG","Киргизия","Kyrgyz Republic","Кыргыз Республикасы","Kyrgyz Respublikasy"],"region":"Asia","subregion":"Central Asia","languages":{"kir":"Kyrgyz","rus":"Russian"},"translations":{"deu":{"official":"Kirgisische Republik","common":"Kirgisistan"},"fra":{"official":"République kirghize","common":"Kirghizistan"},"hrv":{"official":"Kirgistanu","common":"Kirgistan"},"ita":{"official":"Kirghizistan","common":"Kirghizistan"},"jpn":{"official":"キルギス共和国","common":"キルギス"},"nld":{"official":"Kirgizische Republiek","common":"Kirgizië"},"por":{"official":"República do Quirguistão","common":"Quirguistão"},"rus":{"official":"Кыргызская Республика","common":"Киргизия"},"spa":{"official":"República Kirguisa","common":"Kirguizistán"},"fin":{"official":"Kirgisian tasavalta","common":"Kirgisia"},"zho":{"official":"吉尔吉斯斯坦共和国","common":"吉尔吉斯斯坦"}},"latlng":[41,75],"demonym":"Kirghiz","landlocked":true,"borders":["CHN","KAZ","TJK","UZB"],"area":199951,"id":118},{"name":{"common":"Cambodia","official":"Kingdom of Cambodia","native":{"khm":{"official":"ព្រះរាជាណាចក្រកម្ពុជា","common":"Kâmpŭchéa"}}},"tld":[".kh"],"cca2":"KH","ccn3":"116","cca3":"KHM","cioc":"CAM","currency":["KHR"],"callingCode":["855"],"capital":"Phnom Penh","altSpellings":["KH","Kingdom of Cambodia"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"khm":"Khmer"},"translations":{"cym":{"official":"Kingdom of Cambodia","common":"Cambodia"},"deu":{"official":"Königreich Kambodscha","common":"Kambodscha"},"fra":{"official":"Royaume du Cambodge","common":"Cambodge"},"hrv":{"official":"Kraljevina Kambodža","common":"Kambodža"},"ita":{"official":"Regno di Cambogia","common":"Cambogia"},"jpn":{"official":"カンボジア王国","common":"カンボジア"},"nld":{"official":"Koninkrijk Cambodja","common":"Cambodja"},"por":{"official":"Reino do Camboja","common":"Camboja"},"rus":{"official":"Королевство Камбоджа","common":"Камбоджа"},"spa":{"official":"Reino de Camboya","common":"Camboya"},"fin":{"official":"Kambodžan kuningaskunta","common":"Kambodža"},"zho":{"official":"柬埔寨王国","common":"柬埔寨"}},"latlng":[13,105],"demonym":"Cambodian","landlocked":false,"borders":["LAO","THA","VNM"],"area":181035,"id":119},{"name":{"common":"Kiribati","official":"Independent and Sovereign Republic of Kiribati","native":{"eng":{"official":"Independent and Sovereign Republic of Kiribati","common":"Kiribati"},"gil":{"official":"Ribaberiki Kiribati","common":"Kiribati"}}},"tld":[".ki"],"cca2":"KI","ccn3":"296","cca3":"KIR","cioc":"KIR","currency":["AUD"],"callingCode":["686"],"capital":"South Tarawa","altSpellings":["KI","Republic of Kiribati","Ribaberiki Kiribati"],"region":"Oceania","subregion":"Micronesia","languages":{"eng":"English","gil":"Gilbertese"},"translations":{"deu":{"official":"Unabhängige und souveräne Republik Kiribati","common":"Kiribati"},"fra":{"official":"République de Kiribati","common":"Kiribati"},"hrv":{"official":"Samostalne i suverene Republike Kiribati","common":"Kiribati"},"ita":{"official":"Repubblica indipendente e sovrano di Kiribati","common":"Kiribati"},"jpn":{"official":"キリバスの独立と主権共和国","common":"キリバス"},"nld":{"official":"Onafhankelijke en soevereine republiek Kiribati","common":"Kiribati"},"por":{"official":"Independente e soberano República de Kiribati","common":"Kiribati"},"rus":{"official":"Независимой и суверенной Республики Кирибати","common":"Кирибати"},"spa":{"official":"República Independiente y Soberano de Kiribati","common":"Kiribati"},"fin":{"official":"Kiribatin tasavalta","common":"Kiribati"},"zho":{"official":"基里巴斯共和国","common":"基里巴斯"}},"latlng":[1.41666666,173],"demonym":"I-Kiribati","landlocked":false,"borders":[],"area":811,"id":120},{"name":{"common":"Saint Kitts and Nevis","official":"Federation of Saint Christopher and Nevisa","native":{"eng":{"official":"Federation of Saint Christopher and Nevisa","common":"Saint Kitts and Nevis"}}},"tld":[".kn"],"cca2":"KN","ccn3":"659","cca3":"KNA","cioc":"SKN","currency":["XCD"],"callingCode":["1869"],"capital":"Basseterre","altSpellings":["KN","Federation of Saint Christopher and Nevis"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Föderation von Saint Kitts und Nevisa","common":"Saint Christopher und Nevis"},"fra":{"official":"Fédération de Saint -Christophe-et Nevisa","common":"Saint-Christophe-et-Niévès"},"hrv":{"official":"Federacija Sv.Kristofora i Nevisa","common":"Sveti Kristof i Nevis"},"ita":{"official":"Federazione di Saint Christopher e Nevisa","common":"Saint Kitts e Nevis"},"jpn":{"official":"セントクリストファーNevisa連盟","common":"セントクリストファー・ネイビス"},"nld":{"official":"Federatie van Saint Kitts en Nevisa","common":"Saint Kitts en Nevis"},"por":{"official":"Federação de São Cristóvão e Nevisa","common":"São Cristóvão e Nevis"},"rus":{"official":"Федерация Сент-Кристофер и Nevisa","common":"Сент-Китс и Невис"},"spa":{"official":"Federación de San Cristóbal y Nevisa","common":"San Cristóbal y Nieves"},"fin":{"official":"Saint Christopherin ja Nevisin federaatio","common":"Saint Kitts ja Nevis"},"zho":{"official":"圣克里斯托弗和尼维斯联邦","common":"圣基茨和尼维斯"}},"latlng":[17.33333333,-62.75],"demonym":"Kittitian or Nevisian","landlocked":false,"borders":[],"area":261,"id":121},{"name":{"common":"South Korea","official":"Republic of Korea","native":{"kor":{"official":"한국","common":"대한민국"}}},"tld":[".kr",".한국"],"cca2":"KR","ccn3":"410","cca3":"KOR","cioc":"KOR","currency":["KRW"],"callingCode":["82"],"capital":"Seoul","altSpellings":["KR","Korea, Republic of","Republic of Korea"],"region":"Asia","subregion":"Eastern Asia","languages":{"kor":"Korean"},"translations":{"deu":{"official":"Republik Korea","common":"Südkorea"},"fra":{"official":"République de Corée","common":"Corée du Sud"},"hrv":{"official":"Republika Koreja","common":"Južna Koreja"},"ita":{"official":"Repubblica di Corea","common":"Corea del Sud"},"jpn":{"official":"大韓民国","common":"大韓民国"},"nld":{"official":"Republiek Korea","common":"Zuid-Korea"},"por":{"official":"República da Coreia","common":"Coreia do Sul"},"rus":{"official":"Республика Корея","common":"Южная Корея"},"spa":{"official":"República de Corea","common":"Corea del Sur"},"fin":{"official":"Korean tasavalta","common":"Etelä-Korea"},"zho":{"official":"大韩民国","common":"韩国"}},"latlng":[37,127.5],"demonym":"South Korean","landlocked":false,"borders":["PRK"],"area":100210,"id":122},{"name":{"common":"Kosovo","official":"Republic of Kosovo","native":{"sqi":{"official":"Republika e Kosovës","common":"Kosova"},"srp":{"official":"Република Косово","common":"Косово"}}},"tld":[],"cca2":"XK","ccn3":"","cca3":"UNK","cioc":"KOS","currency":["EUR"],"callingCode":["383"],"capital":"Pristina","altSpellings":["XK","Република Косово"],"region":"Europe","subregion":"Eastern Europe","languages":{"sqi":"Albanian","srp":"Serbian"},"translations":{"deu":{"official":"Republik Kosovo","common":"Kosovo"},"fra":{"official":"République du Kosovo","common":"Kosovo"},"hrv":{"official":"Republika Kosovo","common":"Kosovo"},"por":{"official":"República do Kosovo","common":"Kosovo"},"rus":{"official":"Республика Косово","common":"Республика Косово"},"spa":{"official":"República de Kosovo","common":"Kosovo"},"fin":{"official":"Kosovon tasavalta","common":"Kosovo"},"zho":{"official":"科索沃共和国","common":"科索沃"}},"latlng":[42.666667,21.166667],"demonym":"Kosovar","landlocked":true,"borders":["ALB","MKD","MNE","SRB"],"area":10908,"id":123},{"name":{"common":"Kuwait","official":"State of Kuwait","native":{"ara":{"official":"دولة الكويت","common":"الكويت"}}},"tld":[".kw"],"cca2":"KW","ccn3":"414","cca3":"KWT","cioc":"KUW","currency":["KWD"],"callingCode":["965"],"capital":"Kuwait City","altSpellings":["KW","State of Kuwait","Dawlat al-Kuwait"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Staat Kuwait","common":"Kuwait"},"fra":{"official":"État du Koweït","common":"Koweït"},"hrv":{"official":"Država Kuvajt","common":"Kuvajt"},"ita":{"official":"Stato del Kuwait","common":"Kuwait"},"jpn":{"official":"クウェート国","common":"クウェート"},"nld":{"official":"Staat Koeweit","common":"Koeweit"},"por":{"official":"Estado do Kuwait","common":"Kuwait"},"rus":{"official":"Государство Кувейт","common":"Кувейт"},"spa":{"official":"Estado de Kuwait","common":"Kuwait"},"fin":{"official":"Kuwaitin valtio","common":"Kuwait"},"zho":{"official":"科威特国","common":"科威特"}},"latlng":[29.5,45.75],"demonym":"Kuwaiti","landlocked":false,"borders":["IRQ","SAU"],"area":17818,"id":124},{"name":{"common":"Laos","official":"Lao People's Democratic Republic","native":{"lao":{"official":"ສາທາລະນະ ຊາທິປະໄຕ ຄົນລາວ ຂອງ","common":"ສປປລາວ"}}},"tld":[".la"],"cca2":"LA","ccn3":"418","cca3":"LAO","cioc":"LAO","currency":["LAK"],"callingCode":["856"],"capital":"Vientiane","altSpellings":["LA","Lao","Lao People's Democratic Republic","Sathalanalat Paxathipatai Paxaxon Lao"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"lao":"Lao"},"translations":{"deu":{"official":"Laos, Demokratische Volksrepublik","common":"Laos"},"fra":{"official":"République démocratique populaire lao","common":"Laos"},"hrv":{"official":"Narodna Demokratska Republika","common":"Laos"},"ita":{"official":"Repubblica democratica popolare del Laos","common":"Laos"},"jpn":{"official":"ラオス人民民主共和国","common":"ラオス人民民主共和国"},"nld":{"official":"Lao Democratische Volksrepubliek","common":"Laos"},"por":{"official":"Laos, República Democrática","common":"Laos"},"rus":{"official":"Лаосская Народно-Демократическая Республика","common":"Лаос"},"spa":{"official":"República Democrática Popular Lao","common":"Laos"},"fin":{"official":"Laosin demokraattinen kansantasavalta","common":"Laos"},"zho":{"official":"老挝人民民主共和国","common":"老挝"}},"latlng":[18,105],"demonym":"Laotian","landlocked":true,"borders":["MMR","KHM","CHN","THA","VNM"],"area":236800,"id":125},{"name":{"common":"Lebanon","official":"Lebanese Republic","native":{"ara":{"official":"الجمهورية اللبنانية","common":"لبنان"},"fra":{"official":"République libanaise","common":"Liban"}}},"tld":[".lb"],"cca2":"LB","ccn3":"422","cca3":"LBN","cioc":"LIB","currency":["LBP"],"callingCode":["961"],"capital":"Beirut","altSpellings":["LB","Lebanese Republic","Al-Jumhūrīyah Al-Libnānīyah"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic","fra":"French"},"translations":{"deu":{"official":"Libanesische Republik","common":"Libanon"},"fra":{"official":"République libanaise","common":"Liban"},"hrv":{"official":"Libanonska Republika","common":"Libanon"},"ita":{"official":"Repubblica libanese","common":"Libano"},"jpn":{"official":"レバノン共和国","common":"レバノン"},"nld":{"official":"Libanese Republiek","common":"Libanon"},"por":{"official":"República Libanesa","common":"Líbano"},"rus":{"official":"Ливанская Республика","common":"Ливан"},"spa":{"official":"República Libanesa","common":"Líbano"},"fin":{"official":"Libanonin tasavalta","common":"Libanon"},"zho":{"official":"黎巴嫩共和国","common":"黎巴嫩"}},"latlng":[33.83333333,35.83333333],"demonym":"Lebanese","landlocked":false,"borders":["ISR","SYR"],"area":10452,"id":126},{"name":{"common":"Liberia","official":"Republic of Liberia","native":{"eng":{"official":"Republic of Liberia","common":"Liberia"}}},"tld":[".lr"],"cca2":"LR","ccn3":"430","cca3":"LBR","cioc":"LBR","currency":["LRD"],"callingCode":["231"],"capital":"Monrovia","altSpellings":["LR","Republic of Liberia"],"region":"Africa","subregion":"Western Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Liberia","common":"Liberia"},"fra":{"official":"République du Libéria","common":"Liberia"},"hrv":{"official":"Republika Liberija","common":"Liberija"},"ita":{"official":"Repubblica di Liberia","common":"Liberia"},"jpn":{"official":"リベリア共和国","common":"リベリア"},"nld":{"official":"Republiek Liberia","common":"Liberia"},"por":{"official":"República da Libéria","common":"Libéria"},"rus":{"official":"Республика Либерия","common":"Либерия"},"spa":{"official":"República de Liberia","common":"Liberia"},"fin":{"official":"Liberian tasavalta","common":"Liberia"},"zho":{"official":"利比里亚共和国","common":"利比里亚"}},"latlng":[6.5,-9.5],"demonym":"Liberian","landlocked":false,"borders":["GIN","CIV","SLE"],"area":111369,"id":127},{"name":{"common":"Libya","official":"State of Libya","native":{"ara":{"official":"الدولة ليبيا","common":"‏ليبيا"}}},"tld":[".ly"],"cca2":"LY","ccn3":"434","cca3":"LBY","cioc":"LBA","currency":["LYD"],"callingCode":["218"],"capital":"Tripoli","altSpellings":["LY","State of Libya","Dawlat Libya"],"region":"Africa","subregion":"Northern Africa","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Staat Libyen","common":"Libyen"},"fra":{"official":"Grande République arabe libyenne populaire et socialiste","common":"Libye"},"hrv":{"official":"Država Libiji","common":"Libija"},"ita":{"official":"Stato della Libia","common":"Libia"},"jpn":{"official":"リビアの国家","common":"リビア"},"nld":{"official":"Staat van Libië","common":"Libië"},"por":{"official":"Estado da Líbia","common":"Líbia"},"rus":{"official":"Государство Ливии","common":"Ливия"},"spa":{"official":"Estado de Libia","common":"Libia"},"fin":{"official":"Libyan valtio","common":"Libya"},"zho":{"official":"利比亚国","common":"利比亚"}},"latlng":[25,17],"demonym":"Libyan","landlocked":false,"borders":["DZA","TCD","EGY","NER","SDN","TUN"],"area":1759540,"id":128},{"name":{"common":"Saint Lucia","official":"Saint Lucia","native":{"eng":{"official":"Saint Lucia","common":"Saint Lucia"}}},"tld":[".lc"],"cca2":"LC","ccn3":"662","cca3":"LCA","cioc":"LCA","currency":["XCD"],"callingCode":["1758"],"capital":"Castries","altSpellings":["LC"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"St. Lucia","common":"Saint Lucia"},"fra":{"official":"Sainte-Lucie","common":"Sainte-Lucie"},"hrv":{"official":"Sveta Lucija","common":"Sveta Lucija"},"ita":{"official":"Santa Lucia","common":"Santa Lucia"},"jpn":{"official":"セントルシア","common":"セントルシア"},"nld":{"official":"Saint Lucia","common":"Saint Lucia"},"por":{"official":"Santa Lúcia","common":"Santa Lúcia"},"rus":{"official":"Сент-Люсия","common":"Сент-Люсия"},"spa":{"official":"Santa Lucía","common":"Santa Lucía"},"fin":{"official":"Saint Lucia","common":"Saint Lucia"},"zho":{"official":"圣卢西亚","common":"圣卢西亚"}},"latlng":[13.88333333,-60.96666666],"demonym":"Saint Lucian","landlocked":false,"borders":[],"area":616,"id":129},{"name":{"common":"Liechtenstein","official":"Principality of Liechtenstein","native":{"deu":{"official":"Fürstentum Liechtenstein","common":"Liechtenstein"}}},"tld":[".li"],"cca2":"LI","ccn3":"438","cca3":"LIE","cioc":"LIE","currency":["CHF"],"callingCode":["423"],"capital":"Vaduz","altSpellings":["LI","Principality of Liechtenstein","Fürstentum Liechtenstein"],"region":"Europe","subregion":"Western Europe","languages":{"deu":"German"},"translations":{"deu":{"official":"Fürstentum Liechtenstein","common":"Liechtenstein"},"fra":{"official":"Principauté du Liechtenstein","common":"Liechtenstein"},"hrv":{"official":"Kneževina Lihtenštajn","common":"Lihtenštajn"},"ita":{"official":"Principato del Liechtenstein","common":"Liechtenstein"},"jpn":{"official":"リヒテンシュタイン公国","common":"リヒテンシュタイン"},"nld":{"official":"Vorstendom Liechtenstein","common":"Liechtenstein"},"por":{"official":"Principado de Liechtenstein","common":"Liechtenstein"},"rus":{"official":"Княжество Лихтенштейн","common":"Лихтенштейн"},"spa":{"official":"Principado de Liechtenstein","common":"Liechtenstein"},"fin":{"official":"Liechensteinin ruhtinaskunta","common":"Liechenstein"},"zho":{"official":"列支敦士登公国","common":"列支敦士登"}},"latlng":[47.26666666,9.53333333],"demonym":"Liechtensteiner","landlocked":true,"borders":["AUT","CHE"],"area":160,"id":130},{"name":{"common":"Sri Lanka","official":"Democratic Socialist Republic of Sri Lanka","native":{"sin":{"official":"ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය","common":"ශ්‍රී ලංකාව"},"tam":{"official":"இலங்கை சனநாயக சோசலிசக் குடியரசு","common":"இலங்கை"}}},"tld":[".lk",".இலங்கை",".ලංකා"],"cca2":"LK","ccn3":"144","cca3":"LKA","cioc":"SRI","currency":["LKR"],"callingCode":["94"],"capital":"Colombo","altSpellings":["LK","ilaṅkai","Democratic Socialist Republic of Sri Lanka"],"region":"Asia","subregion":"Southern Asia","languages":{"sin":"Sinhala","tam":"Tamil"},"translations":{"deu":{"official":"Demokratische Sozialistische Republik Sri Lanka","common":"Sri Lanka"},"fra":{"official":"République démocratique socialiste du Sri Lanka","common":"Sri Lanka"},"hrv":{"official":"Demokratska Socijalističke Republike Šri Lanke","common":"Šri Lanka"},"ita":{"official":"Repubblica democratica socialista dello Sri Lanka","common":"Sri Lanka"},"jpn":{"official":"スリランカ民主社会主義共和国","common":"スリランカ"},"nld":{"official":"Democratische Socialistische Republiek Sri Lanka","common":"Sri Lanka"},"por":{"official":"República Democrática Socialista do Sri Lanka","common":"Sri Lanka"},"rus":{"official":"Демократическая Социалистическая Республика Шри-Ланка","common":"Шри-Ланка"},"spa":{"official":"República Democrática Socialista de Sri Lanka","common":"Sri Lanka"},"fin":{"official":"Sri Lankan demokraattinen sosialistinen tasavalta","common":"Sri Lanka"},"zho":{"official":"斯里兰卡民主社会主义共和国","common":"斯里兰卡"}},"latlng":[7,81],"demonym":"Sri Lankan","landlocked":false,"borders":["IND"],"area":65610,"id":131},{"name":{"common":"Lesotho","official":"Kingdom of Lesotho","native":{"eng":{"official":"Kingdom of Lesotho","common":"Lesotho"},"sot":{"official":"Kingdom of Lesotho","common":"Lesotho"}}},"tld":[".ls"],"cca2":"LS","ccn3":"426","cca3":"LSO","cioc":"LES","currency":["LSL","ZAR"],"callingCode":["266"],"capital":"Maseru","altSpellings":["LS","Kingdom of Lesotho","Muso oa Lesotho"],"region":"Africa","subregion":"Southern Africa","languages":{"eng":"English","sot":"Sotho"},"translations":{"deu":{"official":"Königreich Lesotho","common":"Lesotho"},"fra":{"official":"Royaume du Lesotho","common":"Lesotho"},"hrv":{"official":"Kraljevina Lesoto","common":"Lesoto"},"ita":{"official":"Regno del Lesotho","common":"Lesotho"},"jpn":{"official":"レソト王国","common":"レソト"},"nld":{"official":"Koninkrijk Lesotho","common":"Lesotho"},"por":{"official":"Reino do Lesoto","common":"Lesoto"},"rus":{"official":"Королевство Лесото","common":"Лесото"},"spa":{"official":"Reino de Lesotho","common":"Lesotho"},"fin":{"official":"Lesothon kuningaskunta","common":"Lesotho"},"zho":{"official":"莱索托王国","common":"莱索托"}},"latlng":[-29.5,28.5],"demonym":"Mosotho","landlocked":true,"borders":["ZAF"],"area":30355,"id":132},{"name":{"common":"Lithuania","official":"Republic of Lithuania","native":{"lit":{"official":"Lietuvos Respublikos","common":"Lietuva"}}},"tld":[".lt"],"cca2":"LT","ccn3":"440","cca3":"LTU","cioc":"LTU","currency":["EUR"],"callingCode":["370"],"capital":"Vilnius","altSpellings":["LT","Republic of Lithuania","Lietuvos Respublika"],"region":"Europe","subregion":"Northern Europe","languages":{"lit":"Lithuanian"},"translations":{"deu":{"official":"Republik Litauen","common":"Litauen"},"fra":{"official":"République de Lituanie","common":"Lituanie"},"hrv":{"official":"Republika Litva","common":"Litva"},"ita":{"official":"Repubblica di Lituania","common":"Lituania"},"jpn":{"official":"リトアニア共和国","common":"リトアニア"},"nld":{"official":"Republiek Litouwen","common":"Litouwen"},"por":{"official":"República da Lituânia","common":"Lituânia"},"rus":{"official":"Литовская Республика","common":"Литва"},"spa":{"official":"República de Lituania","common":"Lituania"},"fin":{"official":"Liettuan tasavalta","common":"Liettua"},"zho":{"official":"立陶宛共和国","common":"立陶宛"}},"latlng":[56,24],"demonym":"Lithuanian","landlocked":false,"borders":["BLR","LVA","POL","RUS"],"area":65300,"id":133},{"name":{"common":"Luxembourg","official":"Grand Duchy of Luxembourg","native":{"deu":{"official":"Großherzogtum Luxemburg","common":"Luxemburg"},"fra":{"official":"Grand-Duché de Luxembourg","common":"Luxembourg"},"ltz":{"official":"Groussherzogtum Lëtzebuerg","common":"Lëtzebuerg"}}},"tld":[".lu"],"cca2":"LU","ccn3":"442","cca3":"LUX","cioc":"LUX","currency":["EUR"],"callingCode":["352"],"capital":"Luxembourg","altSpellings":["LU","Grand Duchy of Luxembourg","Grand-Duché de Luxembourg","Großherzogtum Luxemburg","Groussherzogtum Lëtzebuerg"],"region":"Europe","subregion":"Western Europe","languages":{"deu":"German","fra":"French","ltz":"Luxembourgish"},"translations":{"deu":{"official":"Großherzogtum Luxemburg,","common":"Luxemburg"},"fra":{"official":"Grand-Duché de Luxembourg","common":"Luxembourg"},"hrv":{"official":"Veliko Vojvodstvo Luksemburg","common":"Luksemburg"},"ita":{"official":"Granducato di Lussemburgo","common":"Lussemburgo"},"jpn":{"official":"ルクセンブルク大公国","common":"ルクセンブルク"},"nld":{"official":"Groothertogdom Luxemburg","common":"Luxemburg"},"por":{"official":"Grão-Ducado do Luxemburgo","common":"Luxemburgo"},"rus":{"official":"Великое Герцогство Люксембург","common":"Люксембург"},"spa":{"official":"Gran Ducado de Luxemburgo","common":"Luxemburgo"},"fin":{"official":"Luxemburgin suurherttuakunta","common":"Luxemburg"},"zho":{"official":"卢森堡大公国","common":"卢森堡"}},"latlng":[49.75,6.16666666],"demonym":"Luxembourger","landlocked":true,"borders":["BEL","FRA","DEU"],"area":2586,"id":134},{"name":{"common":"Latvia","official":"Republic of Latvia","native":{"lav":{"official":"Latvijas Republikas","common":"Latvija"}}},"tld":[".lv"],"cca2":"LV","ccn3":"428","cca3":"LVA","cioc":"LAT","currency":["EUR"],"callingCode":["371"],"capital":"Riga","altSpellings":["LV","Republic of Latvia","Latvijas Republika"],"region":"Europe","subregion":"Northern Europe","languages":{"lav":"Latvian"},"translations":{"deu":{"official":"Republik Lettland","common":"Lettland"},"fra":{"official":"République de Lettonie","common":"Lettonie"},"hrv":{"official":"Republika Latvija","common":"Latvija"},"ita":{"official":"Repubblica di Lettonia","common":"Lettonia"},"jpn":{"official":"ラトビア共和国","common":"ラトビア"},"nld":{"official":"Republiek Letland","common":"Letland"},"por":{"official":"República da Letónia","common":"Letónia"},"rus":{"official":"Латвийская Республика","common":"Латвия"},"spa":{"official":"República de Letonia","common":"Letonia"},"fin":{"official":"Latvian tasavalta","common":"Latvia"},"zho":{"official":"拉脱维亚共和国","common":"拉脱维亚"}},"latlng":[57,25],"demonym":"Latvian","landlocked":false,"borders":["BLR","EST","LTU","RUS"],"area":64559,"id":135},{"name":{"common":"Macau","official":"Macao Special Administrative Region of the People's Republic of China","native":{"por":{"official":"Região Administrativa Especial de Macau da República Popular da China","common":"Macau"},"zho":{"official":"中华人民共和国澳门特别行政区","common":"澳门"}}},"tld":[".mo"],"cca2":"MO","ccn3":"446","cca3":"MAC","cioc":"","currency":["MOP"],"callingCode":["853"],"capital":"","altSpellings":["MO","澳门","Macao","Macao Special Administrative Region of the People's Republic of China","中華人民共和國澳門特別行政區","Região Administrativa Especial de Macau da República Popular da China"],"region":"Asia","subregion":"Eastern Asia","languages":{"por":"Portuguese","zho":"Chinese"},"translations":{"deu":{"official":"Sonderverwaltungsregion Macau der Volksrepublik China","common":"Macao"},"fra":{"official":"Région administrative spéciale de Macao de la République populaire de Chine","common":"Macao"},"hrv":{"official":"Makao Posebnog upravnog područjaNarodne Republike Kine","common":"Makao"},"ita":{"official":"Macao Regione amministrativa speciale della Repubblica Popolare Cinese","common":"Macao"},"jpn":{"official":"中華人民共和国マカオ特別行政区","common":"マカオ"},"nld":{"official":"Speciale Administratieve Regio Macau van de Volksrepubliek China","common":"Macao"},"por":{"official":"Macau Região Administrativa Especial da República Popular da China","common":"Macau"},"rus":{"official":"Специальный административный район Макао Китайской Народной Республики Китай","common":"Макао"},"spa":{"official":"Macao, Región Administrativa Especial de la República Popular China","common":"Macao"},"fin":{"official":"Macaon Kiinan kansantasavallan erityishallintoalue","common":"Macao"}},"latlng":[22.16666666,113.55],"demonym":"Chinese","landlocked":false,"borders":["CHN"],"area":30,"id":136},{"name":{"common":"Saint Martin","official":"Saint Martin","native":{"fra":{"official":"Saint-Martin","common":"Saint-Martin"}}},"tld":[".fr",".gp"],"cca2":"MF","ccn3":"663","cca3":"MAF","cioc":"","currency":["EUR"],"callingCode":["590"],"capital":"Marigot","altSpellings":["MF","Collectivity of Saint Martin","Collectivité de Saint-Martin","Saint Martin (French part)"],"region":"Americas","subregion":"Caribbean","languages":{"fra":"French"},"translations":{"deu":{"official":"St. Martin","common":"Saint Martin"},"fra":{"official":"Saint-Martin","common":"Saint-Martin"},"hrv":{"official":"Saint Martin","common":"Sveti Martin"},"ita":{"official":"saint Martin","common":"Saint Martin"},"jpn":{"official":"サンマルタン島","common":"サン・マルタン（フランス領）"},"nld":{"official":"Saint Martin","common":"Saint-Martin"},"por":{"official":"saint Martin","common":"São Martinho"},"rus":{"official":"Сен-Мартен","common":"Сен-Мартен"},"spa":{"official":"Saint Martin","common":"Saint Martin"},"fin":{"official":"Saint-Martin","common":"Saint-Martin"},"zho":{"official":"圣马丁","common":"圣马丁"}},"latlng":[18.08333333,-63.95],"demonym":"Saint Martin Islander","landlocked":false,"borders":["SXM"],"area":53,"id":137},{"name":{"common":"Morocco","official":"Kingdom of Morocco","native":{"ara":{"official":"المملكة المغربية","common":"المغرب"},"ber":{"official":"ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ","common":"ⵍⵎⴰⵖⵔⵉⴱ"}}},"tld":[".ma","المغرب."],"cca2":"MA","ccn3":"504","cca3":"MAR","cioc":"MAR","currency":["MAD"],"callingCode":["212"],"capital":"Rabat","altSpellings":["MA","Kingdom of Morocco","Al-Mamlakah al-Maġribiyah"],"region":"Africa","subregion":"Northern Africa","languages":{"ara":"Arabic","ber":"Berber"},"translations":{"deu":{"official":"Königreich Marokko","common":"Marokko"},"fra":{"official":"Royaume du Maroc","common":"Maroc"},"hrv":{"official":"Kraljevina Maroko","common":"Maroko"},"ita":{"official":"Regno del Marocco","common":"Marocco"},"jpn":{"official":"モロッコ王国","common":"モロッコ"},"nld":{"official":"Koninkrijk Marokko","common":"Marokko"},"por":{"official":"Reino de Marrocos","common":"Marrocos"},"rus":{"official":"Королевство Марокко","common":"Марокко"},"spa":{"official":"Reino de Marruecos","common":"Marruecos"},"fin":{"official":"Marokon kuningaskunta","common":"Marokko"},"zho":{"official":"摩洛哥王国","common":"摩洛哥"}},"latlng":[32,-5],"demonym":"Moroccan","landlocked":false,"borders":["DZA","ESH","ESP"],"area":446550,"id":138},{"name":{"common":"Monaco","official":"Principality of Monaco","native":{"fra":{"official":"Principauté de Monaco","common":"Monaco"}}},"tld":[".mc"],"cca2":"MC","ccn3":"492","cca3":"MCO","cioc":"MON","currency":["EUR"],"callingCode":["377"],"capital":"Monaco","altSpellings":["MC","Principality of Monaco","Principauté de Monaco"],"region":"Europe","subregion":"Western Europe","languages":{"fra":"French"},"translations":{"deu":{"official":"Fürstentum Monaco","common":"Monaco"},"fra":{"official":"Principauté de Monaco","common":"Monaco"},"hrv":{"official":"Kneževina Monako","common":"Monako"},"ita":{"official":"Principato di Monaco","common":"Principato di Monaco"},"jpn":{"official":"モナコ公国","common":"モナコ"},"nld":{"official":"Vorstendom Monaco","common":"Monaco"},"por":{"official":"Principado do Mónaco","common":"Mónaco"},"rus":{"official":"Княжество Монако","common":"Монако"},"spa":{"official":"Principado de Mónaco","common":"Mónaco"},"fin":{"official":"Monacon ruhtinaskunta","common":"Monaco"},"zho":{"official":"摩纳哥公国","common":"摩纳哥"}},"latlng":[43.73333333,7.4],"demonym":"Monegasque","landlocked":false,"borders":["FRA"],"area":2.02,"id":139},{"name":{"common":"Moldova","official":"Republic of Moldova","native":{"ron":{"official":"Republica Moldova","common":"Moldova"}}},"tld":[".md"],"cca2":"MD","ccn3":"498","cca3":"MDA","cioc":"MDA","currency":["MDL"],"callingCode":["373"],"capital":"Chișinău","altSpellings":["MD","Moldova, Republic of","Republic of Moldova","Republica Moldova"],"region":"Europe","subregion":"Eastern Europe","languages":{"ron":"Moldavian"},"translations":{"deu":{"official":"Republik Moldau","common":"Moldawie"},"fra":{"official":"République de Moldavie","common":"Moldavie"},"hrv":{"official":"Moldavija","common":"Moldova"},"ita":{"official":"Repubblica di Moldova","common":"Moldavia"},"jpn":{"official":"モルドバ共和国","common":"モルドバ共和国"},"nld":{"official":"Republiek Moldavië","common":"Moldavië"},"por":{"official":"República da Moldávia","common":"Moldávia"},"rus":{"official":"Молдова","common":"Молдавия"},"spa":{"official":"República de Moldova","common":"Moldavia"},"fin":{"official":"Moldovan tasavalta","common":"Moldova"},"zho":{"official":"摩尔多瓦共和国","common":"摩尔多瓦"}},"latlng":[47,29],"demonym":"Moldovan","landlocked":true,"borders":["ROU","UKR"],"area":33846,"id":140},{"name":{"common":"Madagascar","official":"Republic of Madagascar","native":{"fra":{"official":"République de Madagascar","common":"Madagascar"},"mlg":{"official":"Repoblikan'i Madagasikara","common":"Madagasikara"}}},"tld":[".mg"],"cca2":"MG","ccn3":"450","cca3":"MDG","cioc":"MAD","currency":["MGA"],"callingCode":["261"],"capital":"Antananarivo","altSpellings":["MG","Republic of Madagascar","Repoblikan'i Madagasikara","République de Madagascar"],"region":"Africa","subregion":"Eastern Africa","languages":{"fra":"French","mlg":"Malagasy"},"translations":{"deu":{"official":"Republik Madagaskar","common":"Madagaskar"},"fra":{"official":"République de Madagascar","common":"Madagascar"},"hrv":{"official":"Republika Madagaskar","common":"Madagaskar"},"ita":{"official":"Repubblica del Madagascar","common":"Madagascar"},"jpn":{"official":"マダガスカル共和国","common":"マダガスカル"},"nld":{"official":"Republiek Madagaskar","common":"Madagaskar"},"por":{"official":"República de Madagáscar","common":"Madagáscar"},"rus":{"official":"Республика Мадагаскар","common":"Мадагаскар"},"spa":{"official":"República de Madagascar","common":"Madagascar"},"fin":{"official":"Madagaskarin tasavalta","common":"Madagaskar"},"zho":{"official":"马达加斯加共和国","common":"马达加斯加"}},"latlng":[-20,47],"demonym":"Malagasy","landlocked":false,"borders":[],"area":587041,"id":141},{"name":{"common":"Maldives","official":"Republic of the Maldives","native":{"div":{"official":"ދިވެހިރާއްޖޭގެ ޖުމްހޫރިއްޔާ","common":"ދިވެހިރާއްޖޭގެ"}}},"tld":[".mv"],"cca2":"MV","ccn3":"462","cca3":"MDV","cioc":"MDV","currency":["MVR"],"callingCode":["960"],"capital":"Malé","altSpellings":["MV","Maldive Islands","Republic of the Maldives","Dhivehi Raajjeyge Jumhooriyya"],"region":"Asia","subregion":"Southern Asia","languages":{"div":"Maldivian"},"translations":{"deu":{"official":"Republik Malediven","common":"Malediven"},"fra":{"official":"République des Maldives","common":"Maldives"},"hrv":{"official":"Republika Maldivi","common":"Maldivi"},"ita":{"official":"Repubblica delle Maldive","common":"Maldive"},"jpn":{"official":"モルディブ共和国","common":"モルディブ"},"nld":{"official":"Republiek van de Malediven","common":"Maldiven"},"por":{"official":"República das Maldivas","common":"Maldivas"},"rus":{"official":"Республика Мальдивы","common":"Мальдивы"},"spa":{"official":"República de las Maldivas","common":"Maldivas"},"fin":{"official":"Malediivien tasavalta","common":"Malediivit"},"zho":{"official":"马尔代夫共和国","common":"马尔代夫"}},"latlng":[3.25,73],"demonym":"Maldivan","landlocked":false,"borders":[],"area":300,"id":142},{"name":{"common":"Mexico","official":"United Mexican States","native":{"spa":{"official":"Estados Unidos Mexicanos","common":"México"}}},"tld":[".mx"],"cca2":"MX","ccn3":"484","cca3":"MEX","cioc":"MEX","currency":["MXN"],"callingCode":["52"],"capital":"Mexico City","altSpellings":["MX","Mexicanos","United Mexican States","Estados Unidos Mexicanos"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Vereinigte Mexikanische Staaten","common":"Mexiko"},"fra":{"official":"États-Unis du Mexique","common":"Mexique"},"hrv":{"official":"Sjedinjene Meksičke Države","common":"Meksiko"},"ita":{"official":"Stati Uniti del Messico","common":"Messico"},"jpn":{"official":"メキシコ合衆国","common":"メキシコ"},"nld":{"official":"Verenigde Mexicaanse Staten","common":"Mexico"},"por":{"official":"Estados Unidos Mexicanos","common":"México"},"rus":{"official":"Мексиканских Соединенных Штатов","common":"Мексика"},"spa":{"official":"Estados Unidos Mexicanos","common":"México"},"fin":{"official":"Meksikon yhdysvallat","common":"Meksiko"},"zho":{"official":"墨西哥合众国","common":"墨西哥"}},"latlng":[23,-102],"demonym":"Mexican","landlocked":false,"borders":["BLZ","GTM","USA"],"area":1964375,"id":143},{"name":{"common":"Marshall Islands","official":"Republic of the Marshall Islands","native":{"eng":{"official":"Republic of the Marshall Islands","common":"Marshall Islands"},"mah":{"official":"Republic of the Marshall Islands","common":"M̧ajeļ"}}},"tld":[".mh"],"cca2":"MH","ccn3":"584","cca3":"MHL","cioc":"MHL","currency":["USD"],"callingCode":["692"],"capital":"Majuro","altSpellings":["MH","Republic of the Marshall Islands","Aolepān Aorōkin M̧ajeļ"],"region":"Oceania","subregion":"Micronesia","languages":{"eng":"English","mah":"Marshallese"},"translations":{"deu":{"official":"Republik der Marshall-Inseln","common":"Marshallinseln"},"fra":{"official":"République des Îles Marshall","common":"Îles Marshall"},"hrv":{"official":"Republika Maršalovi Otoci","common":"Maršalovi Otoci"},"ita":{"official":"Repubblica delle Isole Marshall","common":"Isole Marshall"},"jpn":{"official":"マーシャル諸島共和国","common":"マーシャル諸島"},"nld":{"official":"Republiek van de Marshall-eilanden","common":"Marshalleilanden"},"por":{"official":"República das Ilhas Marshall","common":"Ilhas Marshall"},"rus":{"official":"Республика Маршалловы острова","common":"Маршалловы Острова"},"spa":{"official":"República de las Islas Marshall","common":"Islas Marshall"},"fin":{"official":"Marshallinsaarten tasavalta","common":"Marshallinsaaret"},"zho":{"official":"马绍尔群岛共和国","common":"马绍尔群岛"}},"latlng":[9,168],"demonym":"Marshallese","landlocked":false,"borders":[],"area":181,"id":144},{"name":{"common":"Macedonia","official":"Republic of Macedonia","native":{"mkd":{"official":"Република Македонија","common":"Македонија"}}},"tld":[".mk"],"cca2":"MK","ccn3":"807","cca3":"MKD","cioc":"MKD","currency":["MKD"],"callingCode":["389"],"capital":"Skopje","altSpellings":["MK","Macedonia, the Former Yugoslav Republic of","Republic of Macedonia","Република Македонија"],"region":"Europe","subregion":"Southern Europe","languages":{"mkd":"Macedonian"},"translations":{"deu":{"official":"Republik Mazedonien","common":"Mazedonien"},"fra":{"official":"République de Macédoine","common":"Macédoine"},"hrv":{"official":"Republika Makedonija","common":"Makedonija"},"ita":{"official":"Repubblica di Macedonia","common":"Macedonia"},"jpn":{"official":"マケドニア共和国","common":"マケドニア旧ユーゴスラビア共和国"},"nld":{"official":"Republic of Macedonia","common":"Macedonië"},"por":{"official":"República da Macedónia","common":"Macedónia"},"rus":{"official":"Республика Македония","common":"Республика Македония"},"spa":{"official":"República de Macedonia","common":"Macedonia"},"fin":{"official":"Makedonian tasavalta","common":"Makedonia"},"zho":{"official":"马其顿共和国","common":"马其顿"}},"latlng":[41.83333333,22],"demonym":"Macedonian","landlocked":true,"borders":["ALB","BGR","GRC","UNK","SRB"],"area":25713,"id":145},{"name":{"common":"Mali","official":"Republic of Mali","native":{"fra":{"official":"République du Mali","common":"Mali"}}},"tld":[".ml"],"cca2":"ML","ccn3":"466","cca3":"MLI","cioc":"MLI","currency":["XOF"],"callingCode":["223"],"capital":"Bamako","altSpellings":["ML","Republic of Mali","République du Mali"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Republik Mali","common":"Mali"},"fra":{"official":"République du Mali","common":"Mali"},"hrv":{"official":"Republika Mali","common":"Mali"},"ita":{"official":"Repubblica del Mali","common":"Mali"},"jpn":{"official":"マリ共和国","common":"マリ"},"nld":{"official":"Republiek Mali","common":"Mali"},"por":{"official":"República do Mali","common":"Mali"},"rus":{"official":"Республика Мали","common":"Мали"},"spa":{"official":"República de Malí","common":"Mali"},"fin":{"official":"Malin tasavalta","common":"Mali"},"zho":{"official":"马里共和国","common":"马里"}},"latlng":[17,-4],"demonym":"Malian","landlocked":true,"borders":["DZA","BFA","GIN","CIV","MRT","NER","SEN"],"area":1240192,"id":146},{"name":{"common":"Malta","official":"Republic of Malta","native":{"eng":{"official":"Republic of Malta","common":"Malta"},"mlt":{"official":"Repubblika ta ' Malta","common":"Malta"}}},"tld":[".mt"],"cca2":"MT","ccn3":"470","cca3":"MLT","cioc":"MLT","currency":["EUR"],"callingCode":["356"],"capital":"Valletta","altSpellings":["MT","Republic of Malta","Repubblika ta' Malta"],"region":"Europe","subregion":"Southern Europe","languages":{"eng":"English","mlt":"Maltese"},"translations":{"deu":{"official":"Republik Malta","common":"Malta"},"fra":{"official":"République de Malte","common":"Malte"},"hrv":{"official":"Republika Malta","common":"Malta"},"ita":{"official":"Repubblica di Malta","common":"Malta"},"jpn":{"official":"マルタ共和国","common":"マルタ"},"nld":{"official":"Republiek Malta","common":"Malta"},"por":{"official":"República de Malta","common":"Malta"},"rus":{"official":"Республика Мальта","common":"Мальта"},"spa":{"official":"República de Malta","common":"Malta"},"fin":{"official":"Maltan tasavalta","common":"Malta"},"zho":{"official":"马耳他共和国","common":"马耳他"}},"latlng":[35.83333333,14.58333333],"demonym":"Maltese","landlocked":false,"borders":[],"area":316,"id":147},{"name":{"common":"Myanmar","official":"Republic of the Union of Myanmar","native":{"mya":{"official":"ပြည်ထောင်စု သမ္မတ မြန်မာနိုင်ငံတော်","common":"မြန်မာ"}}},"tld":[".mm"],"cca2":"MM","ccn3":"104","cca3":"MMR","cioc":"MYA","currency":["MMK"],"callingCode":["95"],"capital":"Naypyidaw","altSpellings":["MM","Burma","Republic of the Union of Myanmar","Pyidaunzu Thanmăda Myăma Nainngandaw"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"mya":"Burmese"},"translations":{"deu":{"official":"Republik der Union von Myanmar","common":"Myanmar"},"fra":{"official":"République de l'Union du Myanmar","common":"Birmanie"},"hrv":{"official":"Republika Unije Mijanmar","common":"Mijanmar"},"ita":{"official":"Repubblica dell'Unione di Myanmar","common":"Birmania"},"jpn":{"official":"ミャンマー連邦共和国","common":"ミャンマー"},"nld":{"official":"Republiek van de Unie van Myanmar","common":"Myanmar"},"por":{"official":"República da União de Myanmar","common":"Myanmar"},"rus":{"official":"Республика Союза Мьянма","common":"Мьянма"},"spa":{"official":"República de la Unión de Myanmar","common":"Myanmar"},"fin":{"official":"Myanmarin liiton tasavalta","common":"Myanmar"},"zho":{"official":"缅甸联邦共和国","common":"缅甸"}},"latlng":[22,98],"demonym":"Bamar","landlocked":false,"borders":["BGD","CHN","IND","LAO","THA"],"area":676578,"id":148},{"name":{"common":"Montenegro","official":"Montenegro","native":{"srp":{"official":"Црна Гора","common":"Црна Гора"}}},"tld":[".me"],"cca2":"ME","ccn3":"499","cca3":"MNE","cioc":"MNE","currency":["EUR"],"callingCode":["382"],"capital":"Podgorica","altSpellings":["ME","Crna Gora"],"region":"Europe","subregion":"Southern Europe","languages":{"srp":"Montenegrin"},"translations":{"deu":{"official":"Montenegro","common":"Montenegro"},"fra":{"official":"Monténégro","common":"Monténégro"},"hrv":{"official":"Crna Gora","common":"Crna Gora"},"ita":{"official":"Montenegro","common":"Montenegro"},"jpn":{"official":"モンテネグロ","common":"モンテネグロ"},"nld":{"official":"Montenegro","common":"Montenegro"},"por":{"official":"Montenegro","common":"Montenegro"},"rus":{"official":"Черногория","common":"Черногория"},"spa":{"official":"Montenegro","common":"Montenegro"},"fin":{"official":"Montenegro","common":"Montenegro"},"zho":{"official":"黑山","common":"黑山"}},"latlng":[42.5,19.3],"demonym":"Montenegrin","landlocked":false,"borders":["ALB","BIH","HRV","UNK","SRB"],"area":13812,"id":149},{"name":{"common":"Mongolia","official":"Mongolia","native":{"mon":{"official":"Монгол улс","common":"Монгол улс"}}},"tld":[".mn"],"cca2":"MN","ccn3":"496","cca3":"MNG","cioc":"MGL","currency":["MNT"],"callingCode":["976"],"capital":"Ulan Bator","altSpellings":["MN"],"region":"Asia","subregion":"Eastern Asia","languages":{"mon":"Mongolian"},"translations":{"deu":{"official":"Mongolei","common":"Mongolei"},"fra":{"official":"Mongolie","common":"Mongolie"},"hrv":{"official":"Mongolija","common":"Mongolija"},"ita":{"official":"Mongolia","common":"Mongolia"},"jpn":{"official":"モンゴル","common":"モンゴル"},"nld":{"official":"Mongolië","common":"Mongolië"},"por":{"official":"Mongólia","common":"Mongólia"},"rus":{"official":"Монголия","common":"Монголия"},"spa":{"official":"Mongolia","common":"Mongolia"},"fin":{"official":"Mongolian tasavalta","common":"Mongolia"},"zho":{"official":"蒙古","common":"蒙古"}},"latlng":[46,105],"demonym":"Mongolian","landlocked":true,"borders":["CHN","RUS"],"area":1564110,"id":150},{"name":{"common":"Northern Mariana Islands","official":"Commonwealth of the Northern Mariana Islands","native":{"cal":{"official":"Commonwealth of the Northern Mariana Islands","common":"Northern Mariana Islands"},"cha":{"official":"Sankattan Siha Na Islas Mariånas","common":"Na Islas Mariånas"},"eng":{"official":"Commonwealth of the Northern Mariana Islands","common":"Northern Mariana Islands"}}},"tld":[".mp"],"cca2":"MP","ccn3":"580","cca3":"MNP","cioc":"","currency":["USD"],"callingCode":["1670"],"capital":"Saipan","altSpellings":["MP","Commonwealth of the Northern Mariana Islands","Sankattan Siha Na Islas Mariånas"],"region":"Oceania","subregion":"Micronesia","languages":{"cal":"Carolinian","cha":"Chamorro","eng":"English"},"translations":{"deu":{"official":"Commonwealth der Nördlichen Marianen","common":"Nördliche Marianen"},"fra":{"official":"Commonwealth des îles Mariannes du Nord","common":"Îles Mariannes du Nord"},"hrv":{"official":"Zajednica je Sjeverni Marijanski otoci","common":"Sjevernomarijanski otoci"},"ita":{"official":"Commonwealth delle Isole Marianne Settentrionali","common":"Isole Marianne Settentrionali"},"jpn":{"official":"北マリアナ諸島","common":"北マリアナ諸島"},"nld":{"official":"Commonwealth van de Noordelijke Marianen","common":"Noordelijke Marianeneilanden"},"por":{"official":"Comunidade das Ilhas Marianas do Norte","common":"Marianas Setentrionais"},"rus":{"official":"Содружество Северных Марианских островов","common":"Северные Марианские острова"},"spa":{"official":"Mancomunidad de las Islas Marianas del Norte","common":"Islas Marianas del Norte"},"fin":{"official":"Pohjois-Mariaanit","common":"Pohjois-Mariaanit"},"zho":{"official":"北马里亚纳群岛","common":"北马里亚纳群岛"}},"latlng":[15.2,145.75],"demonym":"American","landlocked":false,"borders":[],"area":464,"id":151},{"name":{"common":"Mozambique","official":"Republic of Mozambique","native":{"por":{"official":"República de Moçambique","common":"Moçambique"}}},"tld":[".mz"],"cca2":"MZ","ccn3":"508","cca3":"MOZ","cioc":"MOZ","currency":["MZN"],"callingCode":["258"],"capital":"Maputo","altSpellings":["MZ","Republic of Mozambique","República de Moçambique"],"region":"Africa","subregion":"Eastern Africa","languages":{"por":"Portuguese"},"translations":{"deu":{"official":"Republik Mosambik","common":"Mosambik"},"fra":{"official":"République du Mozambique","common":"Mozambique"},"hrv":{"official":"Republika Mozambiku","common":"Mozambik"},"ita":{"official":"Repubblica del Mozambico","common":"Mozambico"},"jpn":{"official":"モザンビーク共和国","common":"モザンビーク"},"nld":{"official":"Republiek Mozambique","common":"Mozambique"},"por":{"official":"República de Moçambique","common":"Moçambique"},"rus":{"official":"Республика Мозамбик","common":"Мозамбик"},"spa":{"official":"República de Mozambique","common":"Mozambique"},"fin":{"official":"Mosambikin tasavalta","common":"Mosambik"},"zho":{"official":"莫桑比克共和国","common":"莫桑比克"}},"latlng":[-18.25,35],"demonym":"Mozambican","landlocked":false,"borders":["MWI","ZAF","SWZ","TZA","ZMB","ZWE"],"area":801590,"id":152},{"name":{"common":"Mauritania","official":"Islamic Republic of Mauritania","native":{"ara":{"official":"الجمهورية الإسلامية الموريتانية","common":"موريتانيا"}}},"tld":[".mr"],"cca2":"MR","ccn3":"478","cca3":"MRT","cioc":"MTN","currency":["MRO"],"callingCode":["222"],"capital":"Nouakchott","altSpellings":["MR","Islamic Republic of Mauritania","al-Jumhūriyyah al-ʾIslāmiyyah al-Mūrītāniyyah"],"region":"Africa","subregion":"Western Africa","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Islamische Republik Mauretanien","common":"Mauretanien"},"fra":{"official":"République islamique de Mauritanie","common":"Mauritanie"},"hrv":{"official":"Islamska Republika Mauritanija","common":"Mauritanija"},"ita":{"official":"Repubblica islamica di Mauritania","common":"Mauritania"},"jpn":{"official":"モーリタニア·イスラム共和国","common":"モーリタニア"},"nld":{"official":"Islamitische Republiek Mauritanië","common":"Mauritanië"},"por":{"official":"República Islâmica da Mauritânia","common":"Mauritânia"},"rus":{"official":"Исламская Республика Мавритания","common":"Мавритания"},"spa":{"official":"República Islámica de Mauritania","common":"Mauritania"},"fin":{"official":"Mauritanian islamilainen tasavalta","common":"Mauritania"},"zho":{"official":"毛里塔尼亚伊斯兰共和国","common":"毛里塔尼亚"}},"latlng":[20,-12],"demonym":"Mauritanian","landlocked":false,"borders":["DZA","MLI","SEN","ESH"],"area":1030700,"id":153},{"name":{"common":"Montserrat","official":"Montserrat","native":{"eng":{"official":"Montserrat","common":"Montserrat"}}},"tld":[".ms"],"cca2":"MS","ccn3":"500","cca3":"MSR","cioc":"","currency":["XCD"],"callingCode":["1664"],"capital":"Plymouth","altSpellings":["MS"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Montserrat","common":"Montserrat"},"fra":{"official":"Montserrat","common":"Montserrat"},"hrv":{"official":"Montserrat","common":"Montserrat"},"ita":{"official":"Montserrat","common":"Montserrat"},"jpn":{"official":"モントセラト","common":"モントセラト"},"nld":{"official":"Montserrat","common":"Montserrat"},"por":{"official":"Montserrat","common":"Montserrat"},"rus":{"official":"Монтсеррат","common":"Монтсеррат"},"spa":{"official":"Montserrat","common":"Montserrat"},"fin":{"official":"Montserrat","common":"Montserrat"},"zho":{"official":"蒙特塞拉特","common":"蒙特塞拉特"}},"latlng":[16.75,-62.2],"demonym":"Montserratian","landlocked":false,"borders":[],"area":102,"id":154},{"name":{"common":"Martinique","official":"Martinique","native":{"fra":{"official":"Martinique","common":"Martinique"}}},"tld":[".mq"],"cca2":"MQ","ccn3":"474","cca3":"MTQ","cioc":"","currency":["EUR"],"callingCode":["596"],"capital":"Fort-de-France","altSpellings":["MQ"],"region":"Americas","subregion":"Caribbean","languages":{"fra":"French"},"translations":{"deu":{"official":"Martinique","common":"Martinique"},"fra":{"official":"Martinique","common":"Martinique"},"hrv":{"official":"Martinique","common":"Martinique"},"ita":{"official":"Martinique","common":"Martinica"},"jpn":{"official":"マルティニーク島","common":"マルティニーク"},"nld":{"official":"Martinique","common":"Martinique"},"por":{"official":"Martinique","common":"Martinica"},"rus":{"official":"Мартиника","common":"Мартиника"},"spa":{"official":"Martinica","common":"Martinica"},"fin":{"official":"Martinique","common":"Martinique"},"zho":{"official":"马提尼克","common":"马提尼克"}},"latlng":[14.666667,-61],"demonym":"French","landlocked":false,"borders":[],"area":1128,"id":155},{"name":{"common":"Mauritius","official":"Republic of Mauritius","native":{"eng":{"official":"Republic of Mauritius","common":"Mauritius"},"fra":{"official":"République de Maurice","common":"Maurice"},"mfe":{"official":"Republik Moris","common":"Moris"}}},"tld":[".mu"],"cca2":"MU","ccn3":"480","cca3":"MUS","cioc":"MRI","currency":["MUR"],"callingCode":["230"],"capital":"Port Louis","altSpellings":["MU","Republic of Mauritius","République de Maurice"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","fra":"French","mfe":"Mauritian Creole"},"translations":{"deu":{"official":"Republik Mauritius","common":"Mauritius"},"fra":{"official":"République de Maurice","common":"Île Maurice"},"hrv":{"official":"Republika Mauricijus","common":"Mauricijus"},"ita":{"official":"Repubblica di Mauritius","common":"Mauritius"},"jpn":{"official":"モーリシャス共和国","common":"モーリシャス"},"nld":{"official":"Republiek Mauritius","common":"Mauritius"},"por":{"official":"República das Maurícias","common":"Maurício"},"rus":{"official":"Республика Маврикий","common":"Маврикий"},"spa":{"official":"República de Mauricio","common":"Mauricio"},"fin":{"official":"Mauritiuksen tasavalta","common":"Mauritius"},"zho":{"official":"毛里求斯共和国","common":"毛里求斯"}},"latlng":[-20.28333333,57.55],"demonym":"Mauritian","landlocked":false,"borders":[],"area":2040,"id":156},{"name":{"common":"Malawi","official":"Republic of Malawi","native":{"eng":{"official":"Republic of Malawi","common":"Malawi"},"nya":{"official":"Chalo cha Malawi, Dziko la Malaŵi","common":"Malaŵi"}}},"tld":[".mw"],"cca2":"MW","ccn3":"454","cca3":"MWI","cioc":"MAW","currency":["MWK"],"callingCode":["265"],"capital":"Lilongwe","altSpellings":["MW","Republic of Malawi"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","nya":"Chewa"},"translations":{"deu":{"official":"Republik Malawi","common":"Malawi"},"fra":{"official":"République du Malawi","common":"Malawi"},"hrv":{"official":"Republika Malavi","common":"Malavi"},"ita":{"official":"Repubblica del Malawi","common":"Malawi"},"jpn":{"official":"マラウイ共和国","common":"マラウイ"},"nld":{"official":"Republiek Malawi","common":"Malawi"},"por":{"official":"República do Malawi","common":"Malawi"},"rus":{"official":"Республика Малави","common":"Малави"},"spa":{"official":"República de Malawi","common":"Malawi"},"fin":{"official":"Malawin tasavalta","common":"Malawi"},"zho":{"official":"马拉维共和国","common":"马拉维"}},"latlng":[-13.5,34],"demonym":"Malawian","landlocked":true,"borders":["MOZ","TZA","ZMB"],"area":118484,"id":157},{"name":{"common":"Malaysia","official":"Malaysia","native":{"eng":{"official":"Malaysia","common":"Malaysia"},"msa":{"official":"مليسيا","common":"مليسيا"}}},"tld":[".my"],"cca2":"MY","ccn3":"458","cca3":"MYS","cioc":"MAS","currency":["MYR"],"callingCode":["60"],"capital":"Kuala Lumpur","altSpellings":["MY"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"eng":"English","msa":"Malay"},"translations":{"deu":{"official":"Malaysia","common":"Malaysia"},"fra":{"official":"Fédération de Malaisie","common":"Malaisie"},"hrv":{"official":"Malezija","common":"Malezija"},"ita":{"official":"Malaysia","common":"Malesia"},"jpn":{"official":"マレーシア","common":"マレーシア"},"nld":{"official":"Maleisië","common":"Maleisië"},"por":{"official":"Malásia","common":"Malásia"},"rus":{"official":"Малайзия","common":"Малайзия"},"spa":{"official":"Malasia","common":"Malasia"},"fin":{"official":"Malesia","common":"Malesia"},"zho":{"official":"马来西亚","common":"马来西亚"}},"latlng":[2.5,112.5],"demonym":"Malaysian","landlocked":false,"borders":["BRN","IDN","THA"],"area":330803,"id":158},{"name":{"common":"Mayotte","official":"Department of Mayotte","native":{"fra":{"official":"Département de Mayotte","common":"Mayotte"}}},"tld":[".yt"],"cca2":"YT","ccn3":"175","cca3":"MYT","cioc":"","currency":["EUR"],"callingCode":["262"],"capital":"Mamoudzou","altSpellings":["YT","Department of Mayotte","Département de Mayotte"],"region":"Africa","subregion":"Eastern Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Übersee-Département Mayotte","common":"Mayotte"},"fra":{"official":"Département de Mayotte","common":"Mayotte"},"hrv":{"official":"Odjel Mayotte","common":"Mayotte"},"ita":{"official":"Dipartimento di Mayotte","common":"Mayotte"},"jpn":{"official":"マヨット科","common":"マヨット"},"nld":{"official":"Afdeling Mayotte","common":"Mayotte"},"por":{"official":"Departamento de Mayotte","common":"Mayotte"},"rus":{"official":"Департамент Майотта","common":"Майотта"},"spa":{"official":"Departamento de Mayotte","common":"Mayotte"},"fin":{"official":"Mayotte","common":"Mayotte"},"zho":{"official":"马约特","common":"马约特"}},"latlng":[-12.83333333,45.16666666],"demonym":"Mahoran","landlocked":false,"borders":[],"area":374,"id":159},{"name":{"common":"Namibia","official":"Republic of Namibia","native":{"afr":{"official":"Republiek van Namibië","common":"Namibië"},"deu":{"official":"Republik Namibia","common":"Namibia"},"eng":{"official":"Republic of Namibia","common":"Namibia"},"her":{"official":"Republic of Namibia","common":"Namibia"},"hgm":{"official":"Republic of Namibia","common":"Namibia"},"kwn":{"official":"Republic of Namibia","common":"Namibia"},"loz":{"official":"Republic of Namibia","common":"Namibia"},"ndo":{"official":"Republic of Namibia","common":"Namibia"},"tsn":{"official":"Lefatshe la Namibia","common":"Namibia"}}},"tld":[".na"],"cca2":"NA","ccn3":"516","cca3":"NAM","cioc":"NAM","currency":["NAD","ZAR"],"callingCode":["264"],"capital":"Windhoek","altSpellings":["NA","Namibië","Republic of Namibia"],"region":"Africa","subregion":"Southern Africa","languages":{"afr":"Afrikaans","deu":"German","eng":"English","her":"Herero","hgm":"Khoekhoe","kwn":"Kwangali","loz":"Lozi","ndo":"Ndonga","tsn":"Tswana"},"translations":{"deu":{"official":"Republik Namibia","common":"Namibia"},"fra":{"official":"République de Namibie","common":"Namibie"},"hrv":{"official":"Republika Namibija","common":"Namibija"},"ita":{"official":"Repubblica di Namibia","common":"Namibia"},"jpn":{"official":"ナミビア共和国","common":"ナミビア"},"nld":{"official":"Republiek Namibië","common":"Namibië"},"por":{"official":"República da Namíbia","common":"Namíbia"},"rus":{"official":"Республика Намибия","common":"Намибия"},"spa":{"official":"República de Namibia","common":"Namibia"},"fin":{"official":"Namibian tasavalta","common":"Namibia"},"zho":{"official":"纳米比亚共和国","common":"纳米比亚"}},"latlng":[-22,17],"demonym":"Namibian","landlocked":false,"borders":["AGO","BWA","ZAF","ZMB"],"area":825615,"id":160},{"name":{"common":"New Caledonia","official":"New Caledonia","native":{"fra":{"official":"Nouvelle-Calédonie","common":"Nouvelle-Calédonie"}}},"tld":[".nc"],"cca2":"NC","ccn3":"540","cca3":"NCL","cioc":"","currency":["XPF"],"callingCode":["687"],"capital":"Nouméa","altSpellings":["NC"],"region":"Oceania","subregion":"Melanesia","languages":{"fra":"French"},"translations":{"deu":{"official":"Neukaledonien","common":"Neukaledonien"},"fra":{"official":"Nouvelle-Calédonie","common":"Nouvelle-Calédonie"},"hrv":{"official":"Nova Kaledonija","common":"Nova Kaledonija"},"ita":{"official":"Nuova Caledonia","common":"Nuova Caledonia"},"jpn":{"official":"ニューカレドニア","common":"ニューカレドニア"},"nld":{"official":"nieuw -Caledonië","common":"Nieuw-Caledonië"},"por":{"official":"New Caledonia","common":"Nova Caledónia"},"rus":{"official":"Новая Каледония","common":"Новая Каледония"},"spa":{"official":"nueva Caledonia","common":"Nueva Caledonia"},"fin":{"official":"Uusi-Kaledonia","common":"Uusi-Kaledonia"},"zho":{"official":"新喀里多尼亚","common":"新喀里多尼亚"}},"latlng":[-21.5,165.5],"demonym":"New Caledonian","landlocked":false,"borders":[],"area":18575,"id":161},{"name":{"common":"Niger","official":"Republic of Niger","native":{"fra":{"official":"République du Niger","common":"Niger"}}},"tld":[".ne"],"cca2":"NE","ccn3":"562","cca3":"NER","cioc":"NIG","currency":["XOF"],"callingCode":["227"],"capital":"Niamey","altSpellings":["NE","Nijar"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Republik Niger","common":"Niger"},"fra":{"official":"République du Niger","common":"Niger"},"hrv":{"official":"Republika Niger","common":"Niger"},"ita":{"official":"Repubblica del Niger","common":"Niger"},"jpn":{"official":"ニジェール共和国","common":"ニジェール"},"nld":{"official":"Republiek Niger","common":"Niger"},"por":{"official":"República do Níger","common":"Níger"},"rus":{"official":"Республика Нигер","common":"Нигер"},"spa":{"official":"República de Níger","common":"Níger"},"fin":{"official":"Nigerin tasavalta","common":"Niger"},"zho":{"official":"尼日尔共和国","common":"尼日尔"}},"latlng":[16,8],"demonym":"Nigerien","landlocked":true,"borders":["DZA","BEN","BFA","TCD","LBY","MLI","NGA"],"area":1267000,"id":162},{"name":{"common":"Norfolk Island","official":"Territory of Norfolk Island","native":{"eng":{"official":"Territory of Norfolk Island","common":"Norfolk Island"},"pih":{"official":"Teratri of Norf'k Ailen","common":"Norf'k Ailen"}}},"tld":[".nf"],"cca2":"NF","ccn3":"574","cca3":"NFK","cioc":"","currency":["AUD"],"callingCode":["672"],"capital":"Kingston","altSpellings":["NF","Territory of Norfolk Island","Teratri of Norf'k Ailen"],"region":"Oceania","subregion":"Australia and New Zealand","languages":{"eng":"English","pih":"Norfuk"},"translations":{"deu":{"official":"Gebiet der Norfolk-Insel","common":"Norfolkinsel"},"fra":{"official":"Territoire de l'île Norfolk","common":"Île Norfolk"},"hrv":{"official":"Teritorij Norfolk Island","common":"Otok Norfolk"},"ita":{"official":"Territorio di Norfolk Island","common":"Isola Norfolk"},"jpn":{"official":"ノーフォーク島の領土","common":"ノーフォーク島"},"nld":{"official":"Grondgebied van Norfolk Island","common":"Norfolkeiland"},"por":{"official":"Território da Ilha Norfolk","common":"Ilha Norfolk"},"rus":{"official":"Территория острова Норфолк","common":"Норфолк"},"spa":{"official":"Territorio de la Isla Norfolk","common":"Isla de Norfolk"},"fin":{"official":"Norfolkinsaaren territorio","common":"Norfolkinsaari"},"zho":{"official":"诺福克岛","common":"诺福克岛"}},"latlng":[-29.03333333,167.95],"demonym":"Norfolk Islander","landlocked":false,"borders":[],"area":36,"id":163},{"name":{"common":"Nigeria","official":"Federal Republic of Nigeria","native":{"eng":{"official":"Federal Republic of Nigeria","common":"Nigeria"}}},"tld":[".ng"],"cca2":"NG","ccn3":"566","cca3":"NGA","cioc":"NGR","currency":["NGN"],"callingCode":["234"],"capital":"Abuja","altSpellings":["NG","Nijeriya","Naíjíríà","Federal Republic of Nigeria"],"region":"Africa","subregion":"Western Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Bundesrepublik Nigeria","common":"Nigeria"},"fra":{"official":"République fédérale du Nigeria","common":"Nigéria"},"hrv":{"official":"Savezna Republika Nigerija","common":"Nigerija"},"ita":{"official":"Repubblica federale di Nigeria","common":"Nigeria"},"jpn":{"official":"ナイジェリア連邦共和国","common":"ナイジェリア"},"nld":{"official":"Federale Republiek Nigeria","common":"Nigeria"},"por":{"official":"República Federal da Nigéria","common":"Nigéria"},"rus":{"official":"Федеративная Республика Нигерия","common":"Нигерия"},"spa":{"official":"República Federal de Nigeria","common":"Nigeria"},"fin":{"official":"Nigerian liittotasavalta","common":"Nigeria"},"zho":{"official":"尼日利亚联邦共和国","common":"尼日利亚"}},"latlng":[10,8],"demonym":"Nigerian","landlocked":false,"borders":["BEN","CMR","TCD","NER"],"area":923768,"id":164},{"name":{"common":"Nicaragua","official":"Republic of Nicaragua","native":{"spa":{"official":"República de Nicaragua","common":"Nicaragua"}}},"tld":[".ni"],"cca2":"NI","ccn3":"558","cca3":"NIC","cioc":"NCA","currency":["NIO"],"callingCode":["505"],"capital":"Managua","altSpellings":["NI","Republic of Nicaragua","República de Nicaragua"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Republik Nicaragua","common":"Nicaragua"},"fra":{"official":"République du Nicaragua","common":"Nicaragua"},"hrv":{"official":"Republika Nikaragva","common":"Nikaragva"},"ita":{"official":"Repubblica del Nicaragua","common":"Nicaragua"},"jpn":{"official":"ニカラグア共和国","common":"ニカラグア"},"nld":{"official":"Republiek Nicaragua","common":"Nicaragua"},"por":{"official":"República da Nicarágua","common":"Nicarágua"},"rus":{"official":"Республика Никарагуа","common":"Никарагуа"},"spa":{"official":"República de Nicaragua","common":"Nicaragua"},"fin":{"official":"Nicaraguan tasavalta","common":"Nicaragua"},"zho":{"official":"尼加拉瓜共和国","common":"尼加拉瓜"}},"latlng":[13,-85],"demonym":"Nicaraguan","landlocked":false,"borders":["CRI","HND"],"area":130373,"id":165},{"name":{"common":"Niue","official":"Niue","native":{"eng":{"official":"Niue","common":"Niue"},"niu":{"official":"Niuē","common":"Niuē"}}},"tld":[".nu"],"cca2":"NU","ccn3":"570","cca3":"NIU","cioc":"","currency":["NZD"],"callingCode":["683"],"capital":"Alofi","altSpellings":["NU"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","niu":"Niuean"},"translations":{"deu":{"official":"Niue","common":"Niue"},"fra":{"official":"Niue","common":"Niue"},"hrv":{"official":"Niue","common":"Niue"},"ita":{"official":"Niue","common":"Niue"},"jpn":{"official":"ニウエ","common":"ニウエ"},"nld":{"official":"Niue","common":"Niue"},"por":{"official":"Niue","common":"Niue"},"rus":{"official":"Ниуэ","common":"Ниуэ"},"spa":{"official":"Niue","common":"Niue"},"fin":{"official":"Niue","common":"Niue"},"zho":{"official":"纽埃","common":"纽埃"}},"latlng":[-19.03333333,-169.86666666],"demonym":"Niuean","landlocked":false,"borders":[],"area":260,"id":166},{"name":{"common":"Netherlands","official":"Netherlands","native":{"nld":{"official":"Nederland","common":"Nederland"}}},"tld":[".nl"],"cca2":"NL","ccn3":"528","cca3":"NLD","cioc":"NED","currency":["EUR"],"callingCode":["31"],"capital":"Amsterdam","altSpellings":["NL","Holland","Nederland"],"region":"Europe","subregion":"Western Europe","languages":{"nld":"Dutch"},"translations":{"deu":{"official":"Niederlande","common":"Niederlande"},"fra":{"official":"Pays-Bas","common":"Pays-Bas"},"hrv":{"official":"Holandija","common":"Nizozemska"},"ita":{"official":"Paesi Bassi","common":"Paesi Bassi"},"jpn":{"official":"オランダ","common":"オランダ"},"nld":{"official":"Nederland","common":"Nederland"},"por":{"official":"Holanda","common":"Holanda"},"rus":{"official":"Нидерланды","common":"Нидерланды"},"spa":{"official":"Países Bajos","common":"Países Bajos"},"fin":{"official":"Alankomaat","common":"Alankomaat"},"zho":{"official":"荷兰","common":"荷兰"}},"latlng":[52.5,5.75],"demonym":"Dutch","landlocked":false,"borders":["BEL","DEU"],"area":41850,"id":167},{"name":{"common":"Norway","official":"Kingdom of Norway","native":{"nno":{"official":"Kongeriket Noreg","common":"Noreg"},"nob":{"official":"Kongeriket Norge","common":"Norge"},"smi":{"official":"Norgga gonagasriika","common":"Norgga"}}},"tld":[".no"],"cca2":"NO","ccn3":"578","cca3":"NOR","cioc":"NOR","currency":["NOK"],"callingCode":["47"],"capital":"Oslo","altSpellings":["NO","Norge","Noreg","Kingdom of Norway","Kongeriket Norge","Kongeriket Noreg"],"region":"Europe","subregion":"Northern Europe","languages":{"nno":"Norwegian Nynorsk","nob":"Norwegian Bokmål","smi":"Sami"},"translations":{"deu":{"official":"Königreich Norwegen","common":"Norwegen"},"fra":{"official":"Royaume de Norvège","common":"Norvège"},"hrv":{"official":"Kraljevina Norveška","common":"Norveška"},"ita":{"official":"Regno di Norvegia","common":"Norvegia"},"jpn":{"official":"ノルウェー王国","common":"ノルウェー"},"nld":{"official":"Koninkrijk Noorwegen","common":"Noorwegen"},"por":{"official":"Reino da Noruega","common":"Noruega"},"rus":{"official":"Королевство Норвегия","common":"Норвегия"},"spa":{"official":"Reino de Noruega","common":"Noruega"},"fin":{"official":"Norjan kuningaskunta","common":"Norja"},"zho":{"official":"挪威王国","common":"挪威"}},"latlng":[62,10],"demonym":"Norwegian","landlocked":false,"borders":["FIN","SWE","RUS"],"area":323802,"id":168},{"name":{"common":"Nepal","official":"Federal Democratic Republic of Nepal","native":{"nep":{"official":"नेपाल संघीय लोकतान्त्रिक गणतन्त्र","common":"नपल"}}},"tld":[".np"],"cca2":"NP","ccn3":"524","cca3":"NPL","cioc":"NEP","currency":["NPR"],"callingCode":["977"],"capital":"Kathmandu","altSpellings":["NP","Federal Democratic Republic of Nepal","Loktāntrik Ganatantra Nepāl"],"region":"Asia","subregion":"Southern Asia","languages":{"nep":"Nepali"},"translations":{"deu":{"official":"Demokratischen Bundesrepublik Nepal","common":"Népal"},"fra":{"official":"République du Népal","common":"Népal"},"hrv":{"official":"Savezna Demokratska Republika Nepal","common":"Nepal"},"ita":{"official":"Repubblica federale democratica del Nepal","common":"Nepal"},"jpn":{"official":"ネパール連邦民主共和国","common":"ネパール"},"nld":{"official":"Federale Democratische Republiek Nepal","common":"Nepal"},"por":{"official":"República Democrática Federal do Nepal","common":"Nepal"},"rus":{"official":"Федеративная Демократическая Республика Непал","common":"Непал"},"spa":{"official":"República Democrática Federal de Nepal","common":"Nepal"},"fin":{"official":"Nepalin demokraattinen liittotasavalta","common":"Nepal"},"zho":{"official":"尼泊尔联邦民主共和国","common":"尼泊尔"}},"latlng":[28,84],"demonym":"Nepalese","landlocked":true,"borders":["CHN","IND"],"area":147181,"id":169},{"name":{"common":"Nauru","official":"Republic of Nauru","native":{"eng":{"official":"Republic of Nauru","common":"Nauru"},"nau":{"official":"Republic of Nauru","common":"Nauru"}}},"tld":[".nr"],"cca2":"NR","ccn3":"520","cca3":"NRU","cioc":"NRU","currency":["AUD"],"callingCode":["674"],"capital":"Yaren","altSpellings":["NR","Naoero","Pleasant Island","Republic of Nauru","Ripublik Naoero"],"region":"Oceania","subregion":"Micronesia","languages":{"eng":"English","nau":"Nauru"},"translations":{"deu":{"official":"Republik Nauru","common":"Nauru"},"fra":{"official":"République de Nauru","common":"Nauru"},"hrv":{"official":"Republika Nauru","common":"Nauru"},"ita":{"official":"Repubblica di Nauru","common":"Nauru"},"jpn":{"official":"ナウル共和国","common":"ナウル"},"nld":{"official":"Republiek Nauru","common":"Nauru"},"por":{"official":"República de Nauru","common":"Nauru"},"rus":{"official":"Республика Науру","common":"Науру"},"spa":{"official":"República de Nauru","common":"Nauru"},"fin":{"official":"Naurun tasavalta","common":"Nauru"},"zho":{"official":"瑙鲁共和国","common":"瑙鲁"}},"latlng":[-0.53333333,166.91666666],"demonym":"Nauruan","landlocked":false,"borders":[],"area":21,"id":170},{"name":{"common":"New Zealand","official":"New Zealand","native":{"eng":{"official":"New Zealand","common":"New Zealand"},"mri":{"official":"Aotearoa","common":"Aotearoa"},"nzs":{"official":"New Zealand","common":"New Zealand"}}},"tld":[".nz"],"cca2":"NZ","ccn3":"554","cca3":"NZL","cioc":"NZL","currency":["NZD"],"callingCode":["64"],"capital":"Wellington","altSpellings":["NZ","Aotearoa"],"region":"Oceania","subregion":"Australia and New Zealand","languages":{"eng":"English","mri":"Māori","nzs":"New Zealand Sign Language"},"translations":{"deu":{"official":"Neuseeland","common":"Neuseeland"},"fra":{"official":"Nouvelle-Zélande","common":"Nouvelle-Zélande"},"hrv":{"official":"Novi Zeland","common":"Novi Zeland"},"ita":{"official":"Nuova Zelanda","common":"Nuova Zelanda"},"jpn":{"official":"ニュージーランド","common":"ニュージーランド"},"nld":{"official":"Nieuw Zeeland","common":"Nieuw-Zeeland"},"por":{"official":"nova Zelândia","common":"Nova Zelândia"},"rus":{"official":"Новая Зеландия","common":"Новая Зеландия"},"spa":{"official":"nueva Zelanda","common":"Nueva Zelanda"},"fin":{"official":"Uusi-Seelanti","common":"Uusi-Seelanti"},"zho":{"official":"新西兰","common":"新西兰"}},"latlng":[-41,174],"demonym":"New Zealander","landlocked":false,"borders":[],"area":270467,"id":171},{"name":{"common":"Oman","official":"Sultanate of Oman","native":{"ara":{"official":"سلطنة عمان","common":"عمان"}}},"tld":[".om"],"cca2":"OM","ccn3":"512","cca3":"OMN","cioc":"OMA","currency":["OMR"],"callingCode":["968"],"capital":"Muscat","altSpellings":["OM","Sultanate of Oman","Salṭanat ʻUmān"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Sultanat Oman","common":"Oman"},"fra":{"official":"Sultanat d'Oman","common":"Oman"},"hrv":{"official":"Sultanat Oman","common":"Oman"},"ita":{"official":"Sultanato dell'Oman","common":"oman"},"jpn":{"official":"オマーン·スルタン国","common":"オマーン"},"nld":{"official":"Sultanaat van Oman","common":"Oman"},"por":{"official":"Sultanato de Omã","common":"Omã"},"rus":{"official":"Султанат Оман","common":"Оман"},"spa":{"official":"Sultanato de Omán","common":"Omán"},"fin":{"official":"Omanin sulttaanikunta","common":"Oman"},"zho":{"official":"阿曼苏丹国","common":"阿曼"}},"latlng":[21,57],"demonym":"Omani","landlocked":false,"borders":["SAU","ARE","YEM"],"area":309500,"id":172},{"name":{"common":"Pakistan","official":"Islamic Republic of Pakistan","native":{"eng":{"official":"Islamic Republic of Pakistan","common":"Pakistan"},"urd":{"official":"اسلامی جمہوریۂ پاكستان","common":"پاكستان"}}},"tld":[".pk"],"cca2":"PK","ccn3":"586","cca3":"PAK","cioc":"PAK","currency":["PKR"],"callingCode":["92"],"capital":"Islamabad","altSpellings":["PK","Pākistān","Islamic Republic of Pakistan","Islāmī Jumhūriya'eh Pākistān"],"region":"Asia","subregion":"Southern Asia","languages":{"eng":"English","urd":"Urdu"},"translations":{"deu":{"official":"Islamische Republik Pakistan","common":"Pakistan"},"fra":{"official":"République islamique du Pakistan","common":"Pakistan"},"hrv":{"official":"Islamska Republika Pakistan","common":"Pakistan"},"ita":{"official":"Repubblica islamica del Pakistan","common":"Pakistan"},"jpn":{"official":"パキスタン","common":"パキスタン"},"nld":{"official":"Islamitische Republiek Pakistan","common":"Pakistan"},"por":{"official":"República Islâmica do Paquistão","common":"Paquistão"},"rus":{"official":"Исламская Республика Пакистан","common":"Пакистан"},"spa":{"official":"República Islámica de Pakistán","common":"Pakistán"},"fin":{"official":"Pakistanin islamilainen tasavalta","common":"Pakistan"},"zho":{"official":"巴基斯坦伊斯兰共和国","common":"巴基斯坦"}},"latlng":[30,70],"demonym":"Pakistani","landlocked":false,"borders":["AFG","CHN","IND","IRN"],"area":881912,"id":173},{"name":{"common":"Panama","official":"Republic of Panama","native":{"spa":{"official":"República de Panamá","common":"Panamá"}}},"tld":[".pa"],"cca2":"PA","ccn3":"591","cca3":"PAN","cioc":"PAN","currency":["PAB","USD"],"callingCode":["507"],"capital":"Panama City","altSpellings":["PA","Republic of Panama","República de Panamá"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Republik Panama","common":"Panama"},"fra":{"official":"République du Panama","common":"Panama"},"hrv":{"official":"Republika Panama","common":"Panama"},"ita":{"official":"Repubblica di Panama","common":"Panama"},"jpn":{"official":"パナマ共和国","common":"パナマ"},"nld":{"official":"Republiek Panama","common":"Panama"},"por":{"official":"República do Panamá","common":"Panamá"},"rus":{"official":"Республика Панама","common":"Панама"},"spa":{"official":"República de Panamá","common":"Panamá"},"fin":{"official":"Panaman tasavalta","common":"Panama"},"zho":{"official":"巴拿马共和国","common":"巴拿马"}},"latlng":[9,-80],"demonym":"Panamanian","landlocked":false,"borders":["COL","CRI"],"area":75417,"id":174},{"name":{"common":"Pitcairn Islands","official":"Pitcairn Group of Islands","native":{"eng":{"official":"Pitcairn Group of Islands","common":"Pitcairn Islands"}}},"tld":[".pn"],"cca2":"PN","ccn3":"612","cca3":"PCN","cioc":"","currency":["NZD"],"callingCode":["64"],"capital":"Adamstown","altSpellings":["PN","Pitcairn","Pitcairn Henderson Ducie and Oeno Islands"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English"},"translations":{"deu":{"official":"Pitcairn Inselgruppe","common":"Pitcairn"},"fra":{"official":"Groupe d'îles Pitcairn","common":"Îles Pitcairn"},"hrv":{"official":"Pitcairn skupine otoka","common":"Pitcairnovo otočje"},"ita":{"official":"Pitcairn gruppo di isole","common":"Isole Pitcairn"},"jpn":{"official":"島のピトケアングループ","common":"ピトケアン"},"nld":{"official":"Pitcairn groep eilanden","common":"Pitcairneilanden"},"por":{"official":"Pitcairn grupo de ilhas","common":"Ilhas Pitcairn"},"rus":{"official":"Питкэрн группа островов","common":"Острова Питкэрн"},"spa":{"official":"Grupo de Islas Pitcairn","common":"Islas Pitcairn"},"fin":{"official":"Pitcairn","common":"Pitcairn"},"zho":{"official":"皮特凯恩群岛","common":"皮特凯恩群岛"}},"latlng":[-25.06666666,-130.1],"demonym":"Pitcairn Islander","landlocked":false,"borders":[],"area":47,"id":175},{"name":{"common":"Peru","official":"Republic of Peru","native":{"aym":{"official":"Piruw Suyu","common":"Piruw"},"que":{"official":"Piruw Ripuwlika","common":"Piruw"},"spa":{"official":"República del Perú","common":"Perú"}}},"tld":[".pe"],"cca2":"PE","ccn3":"604","cca3":"PER","cioc":"PER","currency":["PEN"],"callingCode":["51"],"capital":"Lima","altSpellings":["PE","Republic of Peru","República del Perú"],"region":"Americas","subregion":"South America","languages":{"aym":"Aymara","que":"Quechua","spa":"Spanish"},"translations":{"deu":{"official":"Republik Peru","common":"Peru"},"fra":{"official":"République du Pérou","common":"Pérou"},"hrv":{"official":"Republika Peru","common":"Peru"},"ita":{"official":"Repubblica del Perù","common":"Perù"},"jpn":{"official":"ペルー共和国","common":"ペルー"},"nld":{"official":"Republiek Peru","common":"Peru"},"por":{"official":"República do Peru","common":"Perú"},"rus":{"official":"Республика Перу","common":"Перу"},"spa":{"official":"República de Perú","common":"Perú"},"fin":{"official":"Perun tasavalta","common":"Peru"},"zho":{"official":"秘鲁共和国","common":"秘鲁"}},"latlng":[-10,-76],"demonym":"Peruvian","landlocked":false,"borders":["BOL","BRA","CHL","COL","ECU"],"area":1285216,"id":176},{"name":{"common":"Philippines","official":"Republic of the Philippines","native":{"eng":{"official":"Republic of the Philippines","common":"Philippines"},"fil":{"official":"Republic of the Philippines","common":"Pilipinas"}}},"tld":[".ph"],"cca2":"PH","ccn3":"608","cca3":"PHL","cioc":"PHI","currency":["PHP"],"callingCode":["63"],"capital":"Manila","altSpellings":["PH","Republic of the Philippines","Repúblika ng Pilipinas"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"eng":"English","fil":"Filipino"},"translations":{"deu":{"official":"Republik der Philippinen","common":"Philippinen"},"fra":{"official":"République des Philippines","common":"Philippines"},"hrv":{"official":"Republika Filipini","common":"Filipini"},"ita":{"official":"Repubblica delle Filippine","common":"Filippine"},"jpn":{"official":"フィリピン共和国","common":"フィリピン"},"nld":{"official":"Republiek der Filipijnen","common":"Filipijnen"},"por":{"official":"República das Filipinas","common":"Filipinas"},"rus":{"official":"Республика Филиппины","common":"Филиппины"},"spa":{"official":"República de las Filipinas","common":"Filipinas"},"fin":{"official":"Filippiinien tasavalta","common":"Filippiinit"},"zho":{"official":"菲律宾共和国","common":"菲律宾"}},"latlng":[13,122],"demonym":"Filipino","landlocked":false,"borders":[],"area":342353,"id":177},{"name":{"common":"Palau","official":"Republic of Palau","native":{"eng":{"official":"Republic of Palau","common":"Palau"},"pau":{"official":"Beluu er a Belau","common":"Belau"}}},"tld":[".pw"],"cca2":"PW","ccn3":"585","cca3":"PLW","cioc":"PLW","currency":["USD"],"callingCode":["680"],"capital":"Ngerulmud","altSpellings":["PW","Republic of Palau","Beluu er a Belau"],"region":"Oceania","subregion":"Micronesia","languages":{"eng":"English","pau":"Palauan"},"translations":{"deu":{"official":"Palau","common":"Palau"},"fra":{"official":"République des Palaos (Palau)","common":"Palaos (Palau)"},"hrv":{"official":"Republika Palau","common":"Palau"},"ita":{"official":"Repubblica di Palau","common":"Palau"},"jpn":{"official":"パラオ共和国","common":"パラオ"},"nld":{"official":"Republiek van Palau","common":"Palau"},"por":{"official":"República de Palau","common":"Palau"},"rus":{"official":"Республика Палау","common":"Палау"},"spa":{"official":"República de Palau","common":"Palau"},"fin":{"official":"Palaun tasavalta","common":"Palau"},"zho":{"official":"帕劳共和国","common":"帕劳"}},"latlng":[7.5,134.5],"demonym":"Palauan","landlocked":false,"borders":[],"area":459,"id":178},{"name":{"common":"Papua New Guinea","official":"Independent State of Papua New Guinea","native":{"eng":{"official":"Independent State of Papua New Guinea","common":"Papua New Guinea"},"hmo":{"official":"Independen Stet bilong Papua Niugini","common":"Papua Niu Gini"},"tpi":{"official":"Independen Stet bilong Papua Niugini","common":"Papua Niugini"}}},"tld":[".pg"],"cca2":"PG","ccn3":"598","cca3":"PNG","cioc":"PNG","currency":["PGK"],"callingCode":["675"],"capital":"Port Moresby","altSpellings":["PG","Independent State of Papua New Guinea","Independen Stet bilong Papua Niugini"],"region":"Oceania","subregion":"Melanesia","languages":{"eng":"English","hmo":"Hiri Motu","tpi":"Tok Pisin"},"translations":{"deu":{"official":"Unabhängige Staat Papua-Neuguinea","common":"Papua-Neuguinea"},"fra":{"official":"État indépendant de Papouasie-Nouvelle-Guinée","common":"Papouasie-Nouvelle-Guinée"},"hrv":{"official":"Nezavisna Država Papui Novoj Gvineji","common":"Papua Nova Gvineja"},"ita":{"official":"Stato indipendente di Papua Nuova Guinea","common":"Papua Nuova Guinea"},"jpn":{"official":"パプアニューギニア独立国","common":"パプアニューギニア"},"nld":{"official":"Onafhankelijke Staat Papoea -Nieuw-Guinea","common":"Papoea-Nieuw-Guinea"},"por":{"official":"Estado Independente da Papua Nova Guiné","common":"Papua Nova Guiné"},"rus":{"official":"Независимое Государство Папуа-Новой Гвинеи","common":"Папуа — Новая Гвинея"},"spa":{"official":"Estado Independiente de Papúa Nueva Guinea","common":"Papúa Nueva Guinea"},"fin":{"official":"Papua-Uuden-Guinean Itsenäinen valtio","common":"Papua-Uusi-Guinea"},"zho":{"official":"巴布亚新几内亚","common":"巴布亚新几内亚"}},"latlng":[-6,147],"demonym":"Papua New Guinean","landlocked":false,"borders":["IDN"],"area":462840,"id":179},{"name":{"common":"Poland","official":"Republic of Poland","native":{"pol":{"official":"Rzeczpospolita Polska","common":"Polska"}}},"tld":[".pl"],"cca2":"PL","ccn3":"616","cca3":"POL","cioc":"POL","currency":["PLN"],"callingCode":["48"],"capital":"Warsaw","altSpellings":["PL","Republic of Poland","Rzeczpospolita Polska"],"region":"Europe","subregion":"Eastern Europe","languages":{"pol":"Polish"},"translations":{"deu":{"official":"Republik Polen","common":"Polen"},"fra":{"official":"République de Pologne","common":"Pologne"},"hrv":{"official":"Republika Poljska","common":"Poljska"},"ita":{"official":"Repubblica di Polonia","common":"Polonia"},"jpn":{"official":"ポーランド共和国","common":"ポーランド"},"nld":{"official":"Republiek Polen","common":"Polen"},"por":{"official":"República da Polónia","common":"Polónia"},"rus":{"official":"Республика Польша","common":"Польша"},"spa":{"official":"República de Polonia","common":"Polonia"},"fin":{"official":"Puolan tasavalta","common":"Puola"},"zho":{"official":"波兰共和国","common":"波兰"}},"latlng":[52,20],"demonym":"Polish","landlocked":false,"borders":["BLR","CZE","DEU","LTU","RUS","SVK","UKR"],"area":312679,"id":180},{"name":{"common":"Puerto Rico","official":"Commonwealth of Puerto Rico","native":{"eng":{"official":"Commonwealth of Puerto Rico","common":"Puerto Rico"},"spa":{"official":"Estado Libre Asociado de Puerto Rico","common":"Puerto Rico"}}},"tld":[".pr"],"cca2":"PR","ccn3":"630","cca3":"PRI","cioc":"PUR","currency":["USD"],"callingCode":["1787","1939"],"capital":"San Juan","altSpellings":["PR","Commonwealth of Puerto Rico","Estado Libre Asociado de Puerto Rico"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English","spa":"Spanish"},"translations":{"deu":{"official":"Commonwealth von Puerto Rico","common":"Puerto Rico"},"fra":{"official":"Porto Rico","common":"Porto Rico"},"hrv":{"official":"Zajednica Puerto Rico","common":"Portoriko"},"ita":{"official":"Commonwealth di Porto Rico","common":"Porto Rico"},"jpn":{"official":"プエルトリコのコモンウェルス","common":"プエルトリコ"},"nld":{"official":"Gemenebest van Puerto Rico","common":"Puerto Rico"},"por":{"official":"Commonwealth of Puerto Rico","common":"Porto Rico"},"rus":{"official":"Содружество Пуэрто-Рико","common":"Пуэрто-Рико"},"spa":{"official":"Asociado de Puerto Rico","common":"Puerto Rico"},"fin":{"official":"Puerto Rico","common":"Puerto Rico"},"zho":{"official":"波多黎各联邦","common":"波多黎各"}},"latlng":[18.25,-66.5],"demonym":"Puerto Rican","landlocked":false,"borders":[],"area":8870,"id":181},{"name":{"common":"North Korea","official":"Democratic People's Republic of Korea","native":{"kor":{"official":"조선 민주주의 인민 공화국","common":"북한"}}},"tld":[".kp"],"cca2":"KP","ccn3":"408","cca3":"PRK","cioc":"PRK","currency":["KPW"],"callingCode":["850"],"capital":"Pyongyang","altSpellings":["KP","Democratic People's Republic of Korea","조선민주주의인민공화국","Chosŏn Minjujuŭi Inmin Konghwaguk","Korea, Democratic People's Republic of"],"region":"Asia","subregion":"Eastern Asia","languages":{"kor":"Korean"},"translations":{"deu":{"official":"Demokratische Volksrepublik Korea","common":"Nordkorea"},"fra":{"official":"République populaire démocratique de Corée","common":"Corée du Nord"},"hrv":{"official":"Demokratska Narodna Republika Koreja","common":"Sjeverna Koreja"},"ita":{"official":"Repubblica democratica popolare di Corea","common":"Corea del Nord"},"jpn":{"official":"朝鮮民主主義人民共和国","common":"朝鮮民主主義人民共和国"},"nld":{"official":"Democratische Volksrepubliek Korea","common":"Noord-Korea"},"por":{"official":"República Popular Democrática da Coreia","common":"Coreia do Norte"},"rus":{"official":"Корейская Народно-Демократическая Республика Корея","common":"Северная Корея"},"spa":{"official":"República Popular Democrática de Corea","common":"Corea del Norte"},"fin":{"official":"Korean demokraattinen kansantasavalta","common":"Pohjois-Korea"},"zho":{"official":"朝鲜人民民主共和国","common":"朝鲜"}},"latlng":[40,127],"demonym":"North Korean","landlocked":false,"borders":["CHN","KOR","RUS"],"area":120538,"id":182},{"name":{"common":"Portugal","official":"Portuguese Republic","native":{"por":{"official":"República português","common":"Portugal"}}},"tld":[".pt"],"cca2":"PT","ccn3":"620","cca3":"PRT","cioc":"POR","currency":["EUR"],"callingCode":["351"],"capital":"Lisbon","altSpellings":["PT","Portuguesa","Portuguese Republic","República Portuguesa"],"region":"Europe","subregion":"Southern Europe","languages":{"por":"Portuguese"},"translations":{"deu":{"official":"Portugiesische Republik","common":"Portugal"},"fra":{"official":"République portugaise","common":"Portugal"},"hrv":{"official":"Portugalska Republika","common":"Portugal"},"ita":{"official":"Repubblica portoghese","common":"Portogallo"},"jpn":{"official":"ポルトガル共和国","common":"ポルトガル"},"nld":{"official":"Portugese Republiek","common":"Portugal"},"por":{"official":"República português","common":"Portugal"},"rus":{"official":"Португальская Республика","common":"Португалия"},"spa":{"official":"República Portuguesa","common":"Portugal"},"fin":{"official":"Portugalin tasavalta","common":"Portugali"},"zho":{"official":"葡萄牙共和国","common":"葡萄牙"}},"latlng":[39.5,-8],"demonym":"Portuguese","landlocked":false,"borders":["ESP"],"area":92090,"id":183},{"name":{"common":"Paraguay","official":"Republic of Paraguay","native":{"grn":{"official":"Tetã Paraguái","common":"Paraguái"},"spa":{"official":"República de Paraguay","common":"Paraguay"}}},"tld":[".py"],"cca2":"PY","ccn3":"600","cca3":"PRY","cioc":"PAR","currency":["PYG"],"callingCode":["595"],"capital":"Asunción","altSpellings":["PY","Republic of Paraguay","República del Paraguay","Tetã Paraguái"],"region":"Americas","subregion":"South America","languages":{"grn":"Guaraní","spa":"Spanish"},"translations":{"deu":{"official":"Republik Paraguay","common":"Paraguay"},"fra":{"official":"République du Paraguay","common":"Paraguay"},"hrv":{"official":"Republika Paragvaj","common":"Paragvaj"},"ita":{"official":"Repubblica del Paraguay","common":"Paraguay"},"jpn":{"official":"パラグアイ共和国","common":"パラグアイ"},"nld":{"official":"Republiek Paraguay","common":"Paraguay"},"por":{"official":"República do Paraguai","common":"Paraguai"},"rus":{"official":"Республика Парагвай","common":"Парагвай"},"spa":{"official":"República de Paraguay","common":"Paraguay"},"fin":{"official":"Paraguayn tasavalta","common":"Paraguay"},"zho":{"official":"巴拉圭共和国","common":"巴拉圭"}},"latlng":[-23,-58],"demonym":"Paraguayan","landlocked":true,"borders":["ARG","BOL","BRA"],"area":406752,"id":184},{"name":{"common":"Palestine","official":"State of Palestine","native":{"ara":{"official":"دولة فلسطين","common":"فلسطين"}}},"tld":[".ps","فلسطين."],"cca2":"PS","ccn3":"275","cca3":"PSE","cioc":"PLE","currency":["ILS"],"callingCode":["970"],"capital":"Ramallah","altSpellings":["PS","Palestine, State of","State of Palestine","Dawlat Filasṭin"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Staat Palästina","common":"Palästina"},"fra":{"official":"État de Palestine","common":"Palestine"},"hrv":{"official":"State of Palestine","common":"Palestina"},"ita":{"official":"Stato di Palestina","common":"Palestina"},"jpn":{"official":"パレスチナ自治政府","common":"パレスチナ"},"nld":{"official":"Staat Palestina","common":"Palestijnse gebieden"},"por":{"official":"Estado da Palestina","common":"Palestina"},"rus":{"official":"Государство Палестина","common":"Палестина"},"spa":{"official":"Estado de Palestina","common":"Palestina"},"fin":{"official":"Palestiinan valtio","common":"Palestiina"},"zho":{"official":"巴勒斯坦国","common":"巴勒斯坦"}},"latlng":[31.9,35.2],"demonym":"Palestinian","landlocked":false,"borders":["ISR","EGY","JOR"],"area":6220,"id":185},{"name":{"common":"French Polynesia","official":"French Polynesia","native":{"fra":{"official":"Polynésie française","common":"Polynésie française"}}},"tld":[".pf"],"cca2":"PF","ccn3":"258","cca3":"PYF","cioc":"","currency":["XPF"],"callingCode":["689"],"capital":"Papeetē","altSpellings":["PF","Polynésie française","French Polynesia","Pōrīnetia Farāni"],"region":"Oceania","subregion":"Polynesia","languages":{"fra":"French"},"translations":{"deu":{"official":"Französisch-Polynesien","common":"Französisch-Polynesien"},"fra":{"official":"Polynésie française","common":"Polynésie française"},"hrv":{"official":"Francuska Polinezija","common":"Francuska Polinezija"},"ita":{"official":"Polinesia Francese","common":"Polinesia Francese"},"jpn":{"official":"フランス領ポリネシア","common":"フランス領ポリネシア"},"nld":{"official":"Frans-Polynesië","common":"Frans-Polynesië"},"por":{"official":"Polinésia Francesa","common":"Polinésia Francesa"},"rus":{"official":"Французская Полинезия","common":"Французская Полинезия"},"spa":{"official":"Polinesia francés","common":"Polinesia Francesa"},"fin":{"official":"Ranskan Polynesia","common":"Ranskan Polynesia"},"zho":{"official":"法属波利尼西亚","common":"法属波利尼西亚"}},"latlng":[-15,-140],"demonym":"French Polynesian","landlocked":false,"borders":[],"area":4167,"id":186},{"name":{"common":"Qatar","official":"State of Qatar","native":{"ara":{"official":"دولة قطر","common":"قطر"}}},"tld":[".qa","قطر."],"cca2":"QA","ccn3":"634","cca3":"QAT","cioc":"QAT","currency":["QAR"],"callingCode":["974"],"capital":"Doha","altSpellings":["QA","State of Qatar","Dawlat Qaṭar"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Staat Katar","common":"Katar"},"fra":{"official":"État du Qatar","common":"Qatar"},"hrv":{"official":"Država Katar","common":"Katar"},"ita":{"official":"Stato del Qatar","common":"Qatar"},"jpn":{"official":"カタール国","common":"カタール"},"nld":{"official":"Staat Qatar","common":"Qatar"},"por":{"official":"Estado do Qatar","common":"Catar"},"rus":{"official":"Государство Катар","common":"Катар"},"spa":{"official":"Estado de Qatar","common":"Catar"},"fin":{"official":"Qatarin valtio","common":"Qatar"},"zho":{"official":"卡塔尔国","common":"卡塔尔"}},"latlng":[25.5,51.25],"demonym":"Qatari","landlocked":false,"borders":["SAU"],"area":11586,"id":187},{"name":{"common":"Réunion","official":"Réunion Island","native":{"fra":{"official":"Ile de la Réunion","common":"La Réunion"}}},"tld":[".re"],"cca2":"RE","ccn3":"638","cca3":"REU","cioc":"","currency":["EUR"],"callingCode":["262"],"capital":"Saint-Denis","altSpellings":["RE","Reunion"],"region":"Africa","subregion":"Eastern Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Réunion","common":"Réunion"},"fra":{"official":"Ile de la Réunion","common":"Réunion"},"hrv":{"official":"Réunion Island","common":"Réunion"},"ita":{"official":"Réunion","common":"Riunione"},"jpn":{"official":"レユニオン島","common":"レユニオン"},"nld":{"official":"Réunion","common":"Réunion"},"por":{"official":"Ilha da Reunião","common":"Reunião"},"rus":{"official":"Реюньон","common":"Реюньон"},"spa":{"official":"Isla de la Reunión","common":"Reunión"},"fin":{"official":"Réunion","common":"Réunion"},"zho":{"official":"留尼旺岛","common":"留尼旺岛"}},"latlng":[-21.15,55.5],"demonym":"French","landlocked":false,"borders":[],"area":2511,"id":188},{"name":{"common":"Romania","official":"Romania","native":{"ron":{"official":"România","common":"România"}}},"tld":[".ro"],"cca2":"RO","ccn3":"642","cca3":"ROU","cioc":"ROU","currency":["RON"],"callingCode":["40"],"capital":"Bucharest","altSpellings":["RO","Rumania","Roumania","România"],"region":"Europe","subregion":"Eastern Europe","languages":{"ron":"Romanian"},"translations":{"deu":{"official":"Rumänien","common":"Rumänien"},"fra":{"official":"Roumanie","common":"Roumanie"},"hrv":{"official":"Rumunija","common":"Rumunjska"},"ita":{"official":"Romania","common":"Romania"},"jpn":{"official":"ルーマニア","common":"ルーマニア"},"nld":{"official":"Roemenië","common":"Roemenië"},"por":{"official":"Romênia","common":"Roménia"},"rus":{"official":"Румыния","common":"Румыния"},"spa":{"official":"Rumania","common":"Rumania"},"fin":{"official":"Romania","common":"Romania"},"zho":{"official":"罗马尼亚","common":"罗马尼亚"}},"latlng":[46,25],"demonym":"Romanian","landlocked":false,"borders":["BGR","HUN","MDA","SRB","UKR"],"area":238391,"id":189},{"name":{"common":"Russia","official":"Russian Federation","native":{"rus":{"official":"Русская Федерация","common":"Россия"}}},"tld":[".ru",".su",".рф"],"cca2":"RU","ccn3":"643","cca3":"RUS","cioc":"RUS","currency":["RUB"],"callingCode":["7"],"capital":"Moscow","altSpellings":["RU","Rossiya","Russian Federation","Российская Федерация","Rossiyskaya Federatsiya"],"region":"Europe","subregion":"Eastern Europe","languages":{"rus":"Russian"},"translations":{"deu":{"official":"Russische Föderation","common":"Russland"},"fra":{"official":"Fédération de Russie","common":"Russie"},"hrv":{"official":"Ruska Federacija","common":"Rusija"},"ita":{"official":"Federazione russa","common":"Russia"},"jpn":{"official":"ロシア連邦","common":"ロシア連邦"},"nld":{"official":"Russische Federatie","common":"Rusland"},"por":{"official":"Federação Russa","common":"Rússia"},"rus":{"official":"Россия Федерация","common":"Россия"},"spa":{"official":"Federación de Rusia","common":"Rusia"},"fin":{"official":"Venäjän federaatio","common":"Venäjä"},"zho":{"official":"俄罗斯联邦","common":"俄罗斯"}},"latlng":[60,100],"demonym":"Russian","landlocked":false,"borders":["AZE","BLR","CHN","EST","FIN","GEO","KAZ","PRK","LVA","LTU","MNG","NOR","POL","UKR"],"area":17098242,"id":190},{"name":{"common":"Rwanda","official":"Republic of Rwanda","native":{"eng":{"official":"Republic of Rwanda","common":"Rwanda"},"fra":{"official":"République rwandaise","common":"Rwanda"},"kin":{"official":"Repubulika y'u Rwanda","common":"Rwanda"}}},"tld":[".rw"],"cca2":"RW","ccn3":"646","cca3":"RWA","cioc":"RWA","currency":["RWF"],"callingCode":["250"],"capital":"Kigali","altSpellings":["RW","Republic of Rwanda","Repubulika y'u Rwanda","République du Rwanda"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","fra":"French","kin":"Kinyarwanda"},"translations":{"deu":{"official":"Republik Ruanda","common":"Ruanda"},"fra":{"official":"République rwandaise","common":"Rwanda"},"hrv":{"official":"Republika Ruandi","common":"Ruanda"},"ita":{"official":"Repubblica del Ruanda","common":"Ruanda"},"jpn":{"official":"ルワンダ共和国","common":"ルワンダ"},"nld":{"official":"Republiek Rwanda","common":"Rwanda"},"por":{"official":"República do Ruanda","common":"Ruanda"},"rus":{"official":"Республика Руанда","common":"Руанда"},"spa":{"official":"República de Rwanda","common":"Ruanda"},"fin":{"official":"Ruandan tasavalta","common":"Ruanda"},"zho":{"official":"卢旺达共和国","common":"卢旺达"}},"latlng":[-2,30],"demonym":"Rwandan","landlocked":true,"borders":["BDI","COD","TZA","UGA"],"area":26338,"id":191},{"name":{"common":"Saudi Arabia","official":"Kingdom of Saudi Arabia","native":{"ara":{"official":"المملكة العربية السعودية","common":"العربية السعودية"}}},"tld":[".sa",".السعودية"],"cca2":"SA","ccn3":"682","cca3":"SAU","cioc":"KSA","currency":["SAR"],"callingCode":["966"],"capital":"Riyadh","altSpellings":["Saudi","SA","Kingdom of Saudi Arabia","Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Königreich Saudi-Arabien","common":"Saudi-Arabien"},"fra":{"official":"Royaume d'Arabie Saoudite","common":"Arabie Saoudite"},"hrv":{"official":"Kraljevina Saudijska Arabija","common":"Saudijska Arabija"},"ita":{"official":"Arabia Saudita","common":"Arabia Saudita"},"jpn":{"official":"サウジアラビア王国","common":"サウジアラビア"},"nld":{"official":"Koninkrijk van Saoedi-Arabië","common":"Saoedi-Arabië"},"por":{"official":"Reino da Arábia Saudita","common":"Arábia Saudita"},"rus":{"official":"Королевство Саудовская Аравия","common":"Саудовская Аравия"},"spa":{"official":"Reino de Arabia Saudita","common":"Arabia Saudí"},"fin":{"official":"Saudi-Arabian kuningaskunta","common":"Saudi-Arabia"},"zho":{"official":"沙特阿拉伯王国","common":"沙特阿拉伯"}},"latlng":[25,45],"demonym":"Saudi Arabian","landlocked":false,"borders":["IRQ","JOR","KWT","OMN","QAT","ARE","YEM"],"area":2149690,"id":192},{"name":{"common":"Sudan","official":"Republic of the Sudan","native":{"ara":{"official":"جمهورية السودان","common":"السودان"},"eng":{"official":"Republic of the Sudan","common":"Sudan"}}},"tld":[".sd"],"cca2":"SD","ccn3":"729","cca3":"SDN","cioc":"SUD","currency":["SDG"],"callingCode":["249"],"capital":"Khartoum","altSpellings":["SD","Republic of the Sudan","Jumhūrīyat as-Sūdān"],"region":"Africa","subregion":"Northern Africa","languages":{"ara":"Arabic","eng":"English"},"translations":{"deu":{"official":"Republik Sudan","common":"Sudan"},"fra":{"official":"République du Soudan","common":"Soudan"},"hrv":{"official":"Republika Sudan","common":"Sudan"},"ita":{"official":"Repubblica del Sudan","common":"Sudan"},"jpn":{"official":"スーダン共和国","common":"スーダン"},"nld":{"official":"Republiek Soedan","common":"Soedan"},"por":{"official":"República do Sudão","common":"Sudão"},"rus":{"official":"Республика Судан","common":"Судан"},"spa":{"official":"República de Sudán","common":"Sudán"},"fin":{"official":"Sudanin tasavalta","common":"Sudan"},"zho":{"official":"苏丹共和国","common":"苏丹"}},"latlng":[15,30],"demonym":"Sudanese","landlocked":false,"borders":["CAF","TCD","EGY","ERI","ETH","LBY","SSD"],"area":1886068,"id":193},{"name":{"common":"Senegal","official":"Republic of Senegal","native":{"fra":{"official":"République du Sénégal","common":"Sénégal"}}},"tld":[".sn"],"cca2":"SN","ccn3":"686","cca3":"SEN","cioc":"SEN","currency":["XOF"],"callingCode":["221"],"capital":"Dakar","altSpellings":["SN","Republic of Senegal","République du Sénégal"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Republik Senegal","common":"Senegal"},"fra":{"official":"République du Sénégal","common":"Sénégal"},"hrv":{"official":"Republika Senegal","common":"Senegal"},"ita":{"official":"Repubblica del Senegal","common":"Senegal"},"jpn":{"official":"セネガル共和国","common":"セネガル"},"nld":{"official":"Republiek Senegal","common":"Senegal"},"por":{"official":"República do Senegal","common":"Senegal"},"rus":{"official":"Республика Сенегал","common":"Сенегал"},"spa":{"official":"República de Senegal","common":"Senegal"},"fin":{"official":"Senegalin tasavalta","common":"Senegal"},"zho":{"official":"塞内加尔共和国","common":"塞内加尔"}},"latlng":[14,-14],"demonym":"Senegalese","landlocked":false,"borders":["GMB","GIN","GNB","MLI","MRT"],"area":196722,"id":194},{"name":{"common":"Singapore","official":"Republic of Singapore","native":{"zho":{"official":"新加坡共和国","common":"新加坡"},"eng":{"official":"Republic of Singapore","common":"Singapore"},"msa":{"official":"Republik Singapura","common":"Singapura"},"tam":{"official":"சிங்கப்பூர் குடியரசு","common":"சிங்கப்பூர்"}}},"tld":[".sg",".新加坡",".சிங்கப்பூர்"],"cca2":"SG","ccn3":"702","cca3":"SGP","cioc":"SIN","currency":["SGD"],"callingCode":["65"],"capital":"Singapore","altSpellings":["SG","Singapura","Republik Singapura","新加坡共和国"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"zho":"Chinese","eng":"English","msa":"Malay","tam":"Tamil"},"translations":{"deu":{"official":"Republik Singapur","common":"Singapur"},"fra":{"official":"République de Singapour","common":"Singapour"},"hrv":{"official":"Republika Singapur","common":"Singapur"},"ita":{"official":"Repubblica di Singapore","common":"Singapore"},"jpn":{"official":"シンガポール共和国","common":"シンガポール"},"nld":{"official":"Republiek Singapore","common":"Singapore"},"por":{"official":"República de Singapura","common":"Singapura"},"rus":{"official":"Республика Сингапур","common":"Сингапур"},"spa":{"official":"República de Singapur","common":"Singapur"},"fin":{"official":"Singaporen tasavalta","common":"Singapore"}},"latlng":[1.36666666,103.8],"demonym":"Singaporean","landlocked":false,"borders":[],"area":710,"id":195},{"name":{"common":"South Georgia","official":"South Georgia and the South Sandwich Islands","native":{"eng":{"official":"South Georgia and the South Sandwich Islands","common":"South Georgia"}}},"tld":[".gs"],"cca2":"GS","ccn3":"239","cca3":"SGS","cioc":"","currency":["GBP"],"callingCode":["500"],"capital":"King Edward Point","altSpellings":["GS","South Georgia and the South Sandwich Islands"],"region":"Americas","subregion":"South America","languages":{"eng":"English"},"translations":{"deu":{"official":"Südgeorgien und die Südlichen Sandwichinseln","common":"Südgeorgien und die Südlichen Sandwichinseln"},"fra":{"official":"Géorgie du Sud et les îles Sandwich du Sud","common":"Géorgie du Sud-et-les Îles Sandwich du Sud"},"hrv":{"official":"Južna Džordžija i Otoci Južni Sendvič","common":"Južna Georgija i otočje Južni Sandwich"},"ita":{"official":"Georgia del Sud e isole Sandwich del Sud","common":"Georgia del Sud e Isole Sandwich Meridionali"},"jpn":{"official":"サウスジョージア·サウスサンドウィッチ諸島","common":"サウスジョージア・サウスサンドウィッチ諸島"},"nld":{"official":"Zuid-Georgië en de Zuidelijke Sandwich-eilanden","common":"Zuid-Georgia en Zuidelijke Sandwicheilanden"},"por":{"official":"Geórgia do Sul e Sandwich do Sul","common":"Ilhas Geórgia do Sul e Sandwich do Sul"},"rus":{"official":"Южная Георгия и Южные Сандвичевы острова","common":"Южная Георгия и Южные Сандвичевы острова"},"spa":{"official":"Georgia del Sur y las Islas Sandwich del Sur","common":"Islas Georgias del Sur y Sandwich del Sur"},"fin":{"official":"Etelä-Georgia ja Eteläiset Sandwichsaaret","common":"Etelä-Georgia ja Eteläiset Sandwichsaaret"},"zho":{"official":"南乔治亚岛和南桑威奇群岛","common":"南乔治亚"}},"latlng":[-54.5,-37],"demonym":"South Georgian South Sandwich Islander","landlocked":false,"borders":[],"area":3903,"id":196},{"name":{"common":"Svalbard and Jan Mayen","official":"Svalbard og Jan Mayen","native":{"nor":{"official":"Svalbard og Jan Mayen","common":"Svalbard og Jan Mayen"}}},"tld":[".sj"],"cca2":"SJ","ccn3":"744","cca3":"SJM","cioc":"","currency":["NOK"],"callingCode":["4779"],"capital":"Longyearbyen","altSpellings":["SJ","Svalbard and Jan Mayen Islands"],"region":"Europe","subregion":"Northern Europe","languages":{"nor":"Norwegian"},"translations":{"deu":{"official":"Inselgruppe Spitzbergen","common":"Spitzbergen"},"fra":{"official":"Jan Mayen Svalbard","common":"Svalbard et Jan Mayen"},"hrv":{"official":"Svalbard og Jan Mayen","common":"Svalbard i Jan Mayen"},"ita":{"official":"Svalbard og Jan Mayen","common":"Svalbard e Jan Mayen"},"jpn":{"official":"スバールバル諸島OGヤンマイエン","common":"スヴァールバル諸島およびヤンマイエン島"},"nld":{"official":"Svalbard og Jan Mayen","common":"Svalbard en Jan Mayen"},"por":{"official":"Svalbard og Jan Mayen","common":"Ilhas Svalbard e Jan Mayen"},"rus":{"official":"Свальбарда ог Ян-Майен","common":"Шпицберген и Ян-Майен"},"spa":{"official":"Svalbard og Jan Mayen","common":"Islas Svalbard y Jan Mayen"},"fin":{"official":"Huippuvuoret","common":"Huippuvuoret"},"zho":{"official":"斯瓦尔巴特","common":"斯瓦尔巴特"}},"latlng":[78,20],"demonym":"Norwegian","landlocked":false,"borders":[],"area":-1,"id":197},{"name":{"common":"Solomon Islands","official":"Solomon Islands","native":{"eng":{"official":"Solomon Islands","common":"Solomon Islands"}}},"tld":[".sb"],"cca2":"SB","ccn3":"090","cca3":"SLB","cioc":"SOL","currency":["SBD"],"callingCode":["677"],"capital":"Honiara","altSpellings":["SB"],"region":"Oceania","subregion":"Melanesia","languages":{"eng":"English"},"translations":{"deu":{"official":"Salomon-Inseln","common":"Salomonen"},"fra":{"official":"Îles Salomon","common":"Îles Salomon"},"hrv":{"official":"Solomonski Otoci","common":"Solomonski Otoci"},"ita":{"official":"Isole Salomone","common":"Isole Salomone"},"jpn":{"official":"ソロモン諸島","common":"ソロモン諸島"},"nld":{"official":"Solomon eilanden","common":"Salomonseilanden"},"por":{"official":"Ilhas Salomão","common":"Ilhas Salomão"},"rus":{"official":"Соломоновы острова","common":"Соломоновы Острова"},"spa":{"official":"islas Salomón","common":"Islas Salomón"},"fin":{"official":"Salomonsaaret","common":"Salomonsaaret"},"zho":{"official":"所罗门群岛","common":"所罗门群岛"}},"latlng":[-8,159],"demonym":"Solomon Islander","landlocked":false,"borders":[],"area":28896,"id":198},{"name":{"common":"Sierra Leone","official":"Republic of Sierra Leone","native":{"eng":{"official":"Republic of Sierra Leone","common":"Sierra Leone"}}},"tld":[".sl"],"cca2":"SL","ccn3":"694","cca3":"SLE","cioc":"SLE","currency":["SLL"],"callingCode":["232"],"capital":"Freetown","altSpellings":["SL","Republic of Sierra Leone"],"region":"Africa","subregion":"Western Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Sierra Leone","common":"Sierra Leone"},"fra":{"official":"République de Sierra Leone","common":"Sierra Leone"},"hrv":{"official":"Republika Sijera Leone","common":"Sijera Leone"},"ita":{"official":"Repubblica della Sierra Leone","common":"Sierra Leone"},"jpn":{"official":"シエラレオネ共和国","common":"シエラレオネ"},"nld":{"official":"Republiek Sierra Leone","common":"Sierra Leone"},"por":{"official":"República da Serra Leoa","common":"Serra Leoa"},"rus":{"official":"Республика Сьерра-Леоне","common":"Сьерра-Леоне"},"spa":{"official":"República de Sierra Leona","common":"Sierra Leone"},"fin":{"official":"Sierra Leonen tasavalta","common":"Sierra Leone"},"zho":{"official":"塞拉利昂共和国","common":"塞拉利昂"}},"latlng":[8.5,-11.5],"demonym":"Sierra Leonean","landlocked":false,"borders":["GIN","LBR"],"area":71740,"id":199},{"name":{"common":"El Salvador","official":"Republic of El Salvador","native":{"spa":{"official":"República de El Salvador","common":"El Salvador"}}},"tld":[".sv"],"cca2":"SV","ccn3":"222","cca3":"SLV","cioc":"ESA","currency":["SVC","USD"],"callingCode":["503"],"capital":"San Salvador","altSpellings":["SV","Republic of El Salvador","República de El Salvador"],"region":"Americas","subregion":"Central America","languages":{"spa":"Spanish"},"translations":{"cym":{"official":"Republic of El Salvador","common":"El Salvador"},"deu":{"official":"Republik El Salvador","common":"El Salvador"},"fra":{"official":"République du Salvador","common":"Salvador"},"hrv":{"official":"Republika El Salvador","common":"Salvador"},"ita":{"official":"Repubblica di El Salvador","common":"El Salvador"},"jpn":{"official":"エルサルバドル共和国","common":"エルサルバドル"},"nld":{"official":"Republiek El Salvador","common":"El Salvador"},"por":{"official":"República de El Salvador","common":"El Salvador"},"rus":{"official":"Республика Эль-Сальвадор","common":"Сальвадор"},"spa":{"official":"República de El Salvador","common":"El Salvador"},"fin":{"official":"El Salvadorin tasavalta","common":"El Salvador"},"zho":{"official":"萨尔瓦多共和国","common":"萨尔瓦多"}},"latlng":[13.83333333,-88.91666666],"demonym":"Salvadoran","landlocked":false,"borders":["GTM","HND"],"area":21041,"id":200},{"name":{"common":"San Marino","official":"Most Serene Republic of San Marino","native":{"ita":{"official":"Serenissima Repubblica di San Marino","common":"San Marino"}}},"tld":[".sm"],"cca2":"SM","ccn3":"674","cca3":"SMR","cioc":"SMR","currency":["EUR"],"callingCode":["378"],"capital":"City of San Marino","altSpellings":["SM","Republic of San Marino","Repubblica di San Marino"],"region":"Europe","subregion":"Southern Europe","languages":{"ita":"Italian"},"translations":{"deu":{"official":"Republik San Marino","common":"San Marino"},"fra":{"official":"République de Saint-Marin","common":"Saint-Marin"},"hrv":{"official":"Većina Serene Republika San Marino","common":"San Marino"},"ita":{"official":"Serenissima Repubblica di San Marino","common":"San Marino"},"jpn":{"official":"サンマリノのほとんどセリーヌ共和国","common":"サンマリノ"},"nld":{"official":"Meest Serene Republiek San Marino","common":"San Marino"},"por":{"official":"Sereníssima República de San Marino","common":"San Marino"},"rus":{"official":"Большинство Serene Республика Сан-Марино","common":"Сан-Марино"},"spa":{"official":"Serenísima República de San Marino","common":"San Marino"},"fin":{"official":"San Marinon seesteinen tasavalta","common":"San Marino"},"zho":{"official":"圣马力诺共和国","common":"圣马力诺"}},"latlng":[43.76666666,12.41666666],"demonym":"Sammarinese","landlocked":true,"borders":["ITA"],"area":61,"id":201},{"name":{"common":"Somalia","official":"Federal Republic of Somalia","native":{"ara":{"official":"جمهورية الصومال‎‎","common":"الصومال‎‎"},"som":{"official":"Jamhuuriyadda Federaalka Soomaaliya","common":"Soomaaliya"}}},"tld":[".so"],"cca2":"SO","ccn3":"706","cca3":"SOM","cioc":"SOM","currency":["SOS"],"callingCode":["252"],"capital":"Mogadishu","altSpellings":["SO","aṣ-Ṣūmāl","Federal Republic of Somalia","Jamhuuriyadda Federaalka Soomaaliya","Jumhūriyyat aṣ-Ṣūmāl al-Fiderāliyya"],"region":"Africa","subregion":"Eastern Africa","languages":{"ara":"Arabic","som":"Somali"},"translations":{"deu":{"official":"Bundesrepublik Somalia","common":"Somalia"},"fra":{"official":"République fédérale de Somalie","common":"Somalie"},"hrv":{"official":"Savezna Republika Somaliji","common":"Somalija"},"ita":{"official":"Repubblica federale di Somalia","common":"Somalia"},"jpn":{"official":"ソマリア連邦共和国","common":"ソマリア"},"nld":{"official":"Federale Republiek Somalië","common":"Somalië"},"por":{"official":"República Federal da Somália","common":"Somália"},"rus":{"official":"Федеративная Республика Сомали","common":"Сомали"},"spa":{"official":"República Federal de Somalia","common":"Somalia"},"fin":{"official":"Somalian liittotasavalta","common":"Somalia"},"zho":{"official":"索马里共和国","common":"索马里"}},"latlng":[10,49],"demonym":"Somali","landlocked":false,"borders":["DJI","ETH","KEN"],"area":637657,"id":202},{"name":{"common":"Saint Pierre and Miquelon","official":"Saint Pierre and Miquelon","native":{"fra":{"official":"Collectivité territoriale de Saint-Pierre-et-Miquelon","common":"Saint-Pierre-et-Miquelon"}}},"tld":[".pm"],"cca2":"PM","ccn3":"666","cca3":"SPM","cioc":"","currency":["EUR"],"callingCode":["508"],"capital":"Saint-Pierre","altSpellings":["PM","Collectivité territoriale de Saint-Pierre-et-Miquelon"],"region":"Americas","subregion":"Northern America","languages":{"fra":"French"},"translations":{"deu":{"official":"St. Pierre und Miquelon","common":"Saint-Pierre und Miquelon"},"fra":{"official":"Saint-Pierre-et-Miquelon","common":"Saint-Pierre-et-Miquelon"},"hrv":{"official":"Saint Pierre i Miquelon","common":"Sveti Petar i Mikelon"},"ita":{"official":"Saint Pierre e Miquelon","common":"Saint-Pierre e Miquelon"},"jpn":{"official":"サンピエール島·ミクロン島","common":"サンピエール島・ミクロン島"},"nld":{"official":"Saint-Pierre en Miquelon","common":"Saint Pierre en Miquelon"},"por":{"official":"Saint Pierre e Miquelon","common":"Saint-Pierre e Miquelon"},"rus":{"official":"Сен-Пьер и Микелон","common":"Сен-Пьер и Микелон"},"spa":{"official":"San Pedro y Miquelón","common":"San Pedro y Miquelón"},"fin":{"official":"Saint-Pierre ja Miquelon","common":"Saint-Pierre ja Miquelon"},"zho":{"official":"圣皮埃尔和密克隆","common":"圣皮埃尔和密克隆"}},"latlng":[46.83333333,-56.33333333],"demonym":"French","landlocked":false,"borders":[],"area":242,"id":203},{"name":{"common":"Serbia","official":"Republic of Serbia","native":{"srp":{"official":"Република Србија","common":"Србија"}}},"tld":[".rs",".срб"],"cca2":"RS","ccn3":"688","cca3":"SRB","cioc":"SRB","currency":["RSD"],"callingCode":["381"],"capital":"Belgrade","altSpellings":["RS","Srbija","Republic of Serbia","Република Србија","Republika Srbija"],"region":"Europe","subregion":"Southern Europe","languages":{"srp":"Serbian"},"translations":{"deu":{"official":"Republik Serbien","common":"Serbien"},"fra":{"official":"République de Serbie","common":"Serbie"},"hrv":{"official":"Republika Srbija","common":"Srbija"},"ita":{"official":"Repubblica di Serbia","common":"Serbia"},"jpn":{"official":"セルビア共和国","common":"セルビア"},"nld":{"official":"Republiek Servië","common":"Servië"},"por":{"official":"República da Sérvia","common":"Sérvia"},"rus":{"official":"Республика Сербия","common":"Сербия"},"spa":{"official":"República de Serbia","common":"Serbia"},"fin":{"official":"Serbian tasavalta","common":"Serbia"},"zho":{"official":"塞尔维亚共和国","common":"塞尔维亚"}},"latlng":[44,21],"demonym":"Serbian","landlocked":true,"borders":["BIH","BGR","HRV","HUN","UNK","MKD","MNE","ROU"],"area":88361,"id":204},{"name":{"common":"South Sudan","official":"Republic of South Sudan","native":{"eng":{"official":"Republic of South Sudan","common":"South Sudan"}}},"tld":[".ss"],"cca2":"SS","ccn3":"728","cca3":"SSD","cioc":"","currency":["SSP"],"callingCode":["211"],"capital":"Juba","altSpellings":["SS"],"region":"Africa","subregion":"Middle Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Südsudan","common":"Südsudan"},"fra":{"official":"République du Soudan du Sud","common":"Soudan du Sud"},"hrv":{"official":"Republika Južni Sudan","common":"Južni Sudan"},"ita":{"official":"Repubblica del Sudan del Sud","common":"Sudan del sud"},"jpn":{"official":"南スーダン共和国","common":"南スーダン"},"nld":{"official":"Republiek Zuid-Soedan","common":"Zuid-Soedan"},"por":{"official":"República do Sudão do Sul","common":"Sudão do Sul"},"rus":{"official":"Республика Южный Судан","common":"Южный Судан"},"spa":{"official":"República de Sudán del Sur","common":"Sudán del Sur"},"fin":{"official":"Etelä-Sudanin tasavalta","common":"Etelä-Sudan"},"zho":{"official":"南苏丹共和国","common":"南苏丹"}},"latlng":[7,30],"demonym":"South Sudanese","landlocked":true,"borders":["CAF","COD","ETH","KEN","SDN","UGA"],"area":619745,"id":205},{"name":{"common":"São Tomé and Príncipe","official":"Democratic Republic of São Tomé and Príncipe","native":{"por":{"official":"República Democrática do São Tomé e Príncipe","common":"São Tomé e Príncipe"}}},"tld":[".st"],"cca2":"ST","ccn3":"678","cca3":"STP","cioc":"STP","currency":["STD"],"callingCode":["239"],"capital":"São Tomé","altSpellings":["ST","Democratic Republic of São Tomé and Príncipe","Sao Tome and Principe","República Democrática de São Tomé e Príncipe"],"region":"Africa","subregion":"Middle Africa","languages":{"por":"Portuguese"},"translations":{"deu":{"official":"Demokratische Republik São Tomé und Príncipe","common":"São Tomé und Príncipe"},"fra":{"official":"République démocratique de São Tomé et Príncipe","common":"São Tomé et Príncipe"},"hrv":{"official":"Demokratska Republika São Tome i Principe","common":"Sveti Toma i Princip"},"ita":{"official":"Repubblica democratica di São Tomé e Príncipe","common":"São Tomé e Príncipe"},"jpn":{"official":"サントメ·プリンシペ民主共和国","common":"サントメ・プリンシペ"},"nld":{"official":"Democratische Republiek Sao Tomé en Principe","common":"Sao Tomé en Principe"},"por":{"official":"República Democrática de São Tomé e Príncipe","common":"São Tomé e Príncipe"},"rus":{"official":"Демократическая Республика Сан-Томе и Принсипи","common":"Сан-Томе и Принсипи"},"spa":{"official":"República Democrática de Santo Tomé y Príncipe","common":"Santo Tomé y Príncipe"},"fin":{"official":"São Tomé ja Príncipen demokraattinen tasavalta","common":"São Téme ja Príncipe"},"zho":{"official":"圣多美和普林西比民主共和国","common":"圣多美和普林西比"}},"latlng":[1,7],"demonym":"Sao Tomean","landlocked":false,"borders":[],"area":964,"id":206},{"name":{"common":"Suriname","official":"Republic of Suriname","native":{"nld":{"official":"Republiek Suriname","common":"Suriname"}}},"tld":[".sr"],"cca2":"SR","ccn3":"740","cca3":"SUR","cioc":"SUR","currency":["SRD"],"callingCode":["597"],"capital":"Paramaribo","altSpellings":["SR","Sarnam","Sranangron","Republic of Suriname","Republiek Suriname"],"region":"Americas","subregion":"South America","languages":{"nld":"Dutch"},"translations":{"deu":{"official":"Republik Suriname","common":"Suriname"},"fra":{"official":"République du Suriname","common":"Surinam"},"hrv":{"official":"Republika Surinam","common":"Surinam"},"ita":{"official":"Repubblica del Suriname","common":"Suriname"},"jpn":{"official":"スリナム共和国","common":"スリナム"},"nld":{"official":"Republiek Suriname","common":"Suriname"},"por":{"official":"República do Suriname","common":"Suriname"},"rus":{"official":"Республика Суринам","common":"Суринам"},"spa":{"official":"República de Suriname","common":"Surinam"},"fin":{"official":"Surinamen tasavalta","common":"Suriname"},"zho":{"official":"苏里南共和国","common":"苏里南"}},"latlng":[4,-56],"demonym":"Surinamer","landlocked":false,"borders":["BRA","GUF","GUY"],"area":163820,"id":207},{"name":{"common":"Slovakia","official":"Slovak Republic","native":{"slk":{"official":"Slovenská republika","common":"Slovensko"}}},"tld":[".sk"],"cca2":"SK","ccn3":"703","cca3":"SVK","cioc":"SVK","currency":["EUR"],"callingCode":["421"],"capital":"Bratislava","altSpellings":["SK","Slovak Republic","Slovenská republika"],"region":"Europe","subregion":"Eastern Europe","languages":{"slk":"Slovak"},"translations":{"deu":{"official":"Slowakische Republik","common":"Slowakei"},"fra":{"official":"République slovaque","common":"Slovaquie"},"hrv":{"official":"slovačka","common":"Slovačka"},"ita":{"official":"Repubblica slovacca","common":"Slovacchia"},"jpn":{"official":"スロバキア共和国","common":"スロバキア"},"nld":{"official":"Slowaakse Republiek","common":"Slowakije"},"por":{"official":"República Eslovaca","common":"Eslováquia"},"rus":{"official":"Словацкая Республика","common":"Словакия"},"spa":{"official":"República Eslovaca","common":"República Eslovaca"},"fin":{"official":"Slovakian tasavalta","common":"Slovakia"},"zho":{"official":"斯洛伐克共和国","common":"斯洛伐克"}},"latlng":[48.66666666,19.5],"demonym":"Slovak","landlocked":true,"borders":["AUT","CZE","HUN","POL","UKR"],"area":49037,"id":208},{"name":{"common":"Slovenia","official":"Republic of Slovenia","native":{"slv":{"official":"Republika Slovenija","common":"Slovenija"}}},"tld":[".si"],"cca2":"SI","ccn3":"705","cca3":"SVN","cioc":"SLO","currency":["EUR"],"callingCode":["386"],"capital":"Ljubljana","altSpellings":["SI","Republic of Slovenia","Republika Slovenija"],"region":"Europe","subregion":"Southern Europe","languages":{"slv":"Slovene"},"translations":{"deu":{"official":"Republik Slowenien","common":"Slowenien"},"fra":{"official":"République de Slovénie","common":"Slovénie"},"hrv":{"official":"Republika Slovenija","common":"Slovenija"},"ita":{"official":"Repubblica di Slovenia","common":"Slovenia"},"jpn":{"official":"スロベニア共和国","common":"スロベニア"},"nld":{"official":"Republiek Slovenië","common":"Slovenië"},"por":{"official":"República da Eslovénia","common":"Eslovénia"},"rus":{"official":"Республика Словения","common":"Словения"},"spa":{"official":"República de Eslovenia","common":"Eslovenia"},"fin":{"official":"Slovenian tasavalta","common":"Slovenia"},"zho":{"official":"斯洛文尼亚共和国","common":"斯洛文尼亚"}},"latlng":[46.11666666,14.81666666],"demonym":"Slovene","landlocked":false,"borders":["AUT","HRV","ITA","HUN"],"area":20273,"id":209},{"name":{"common":"Sweden","official":"Kingdom of Sweden","native":{"swe":{"official":"Konungariket Sverige","common":"Sverige"}}},"tld":[".se"],"cca2":"SE","ccn3":"752","cca3":"SWE","cioc":"SWE","currency":["SEK"],"callingCode":["46"],"capital":"Stockholm","altSpellings":["SE","Kingdom of Sweden","Konungariket Sverige"],"region":"Europe","subregion":"Northern Europe","languages":{"swe":"Swedish"},"translations":{"deu":{"official":"Königreich Schweden","common":"Schweden"},"fra":{"official":"Royaume de Suède","common":"Suède"},"hrv":{"official":"Kraljevina Švedska","common":"Švedska"},"ita":{"official":"Regno di Svezia","common":"Svezia"},"jpn":{"official":"スウェーデン王国","common":"スウェーデン"},"nld":{"official":"Koninkrijk Zweden","common":"Zweden"},"por":{"official":"Reino da Suécia","common":"Suécia"},"rus":{"official":"Королевство Швеция","common":"Швеция"},"spa":{"official":"Reino de Suecia","common":"Suecia"},"fin":{"official":"Ruotsin kuningaskunta","common":"Ruotsi"},"zho":{"official":"瑞典王国","common":"瑞典"}},"latlng":[62,15],"demonym":"Swedish","landlocked":false,"borders":["FIN","NOR"],"area":450295,"id":210},{"name":{"common":"Swaziland","official":"Kingdom of Swaziland","native":{"eng":{"official":"Kingdom of Swaziland","common":"Swaziland"},"ssw":{"official":"Kingdom of Swaziland","common":"Swaziland"}}},"tld":[".sz"],"cca2":"SZ","ccn3":"748","cca3":"SWZ","cioc":"SWZ","currency":["SZL"],"callingCode":["268"],"capital":"Lobamba","altSpellings":["SZ","weSwatini","Swatini","Ngwane","Kingdom of Swaziland","Umbuso waseSwatini"],"region":"Africa","subregion":"Southern Africa","languages":{"eng":"English","ssw":"Swazi"},"translations":{"deu":{"official":"Königreich Swasiland","common":"Swasiland"},"fra":{"official":"Royaume du Swaziland","common":"Swaziland"},"hrv":{"official":"Kraljevina Svazi","common":"Svazi"},"ita":{"official":"Regno dello Swaziland","common":"Swaziland"},"jpn":{"official":"スワジランド王国","common":"スワジランド"},"nld":{"official":"Koninkrijk Swaziland","common":"Swaziland"},"por":{"official":"Reino da Suazilândia","common":"Suazilândia"},"rus":{"official":"Королевство Свазиленд","common":"Свазиленд"},"spa":{"official":"Reino de Swazilandia","common":"Suazilandia"},"fin":{"official":"Swazimaan kuningaskunta","common":"Swazimaa"},"zho":{"official":"斯威士兰王国","common":"斯威士兰"}},"latlng":[-26.5,31.5],"demonym":"Swazi","landlocked":true,"borders":["MOZ","ZAF"],"area":17364,"id":211},{"name":{"common":"Sint Maarten","official":"Sint Maarten","native":{"eng":{"official":"Sint Maarten","common":"Sint Maarten"},"fra":{"official":"Saint-Martin","common":"Saint-Martin"},"nld":{"official":"Sint Maarten","common":"Sint Maarten"}}},"tld":[".sx"],"cca2":"SX","ccn3":"534","cca3":"SXM","cioc":"","currency":["ANG"],"callingCode":["1721"],"capital":"Philipsburg","altSpellings":["SX","Sint Maarten (Dutch part)"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English","fra":"French","nld":"Dutch"},"translations":{"deu":{"official":"Sint Maarten","common":"Sint Maarten"},"fra":{"official":"Sint Maarten","common":"Saint-Martin"},"ita":{"official":"Sint Maarten","common":"Sint Maarten"},"jpn":{"official":"シントマールテン島","common":"シント・マールテン"},"nld":{"official":"Sint Maarten","common":"Sint Maarten"},"por":{"official":"Sint Maarten","common":"São Martinho"},"rus":{"official":"Синт-Маартен","common":"Синт-Мартен"},"spa":{"official":"Sint Maarten","common":"Sint Maarten"},"fin":{"official":"Sint Maarten","common":"Sint Maarten"},"zho":{"official":"圣马丁岛","common":"圣马丁岛"}},"latlng":[18.033333,-63.05],"demonym":"St. Maartener","landlocked":false,"borders":["MAF"],"area":34,"id":212},{"name":{"common":"Seychelles","official":"Republic of Seychelles","native":{"crs":{"official":"Repiblik Sesel","common":"Sesel"},"eng":{"official":"Republic of Seychelles","common":"Seychelles"},"fra":{"official":"République des Seychelles","common":"Seychelles"}}},"tld":[".sc"],"cca2":"SC","ccn3":"690","cca3":"SYC","cioc":"SEY","currency":["SCR"],"callingCode":["248"],"capital":"Victoria","altSpellings":["SC","Republic of Seychelles","Repiblik Sesel","République des Seychelles"],"region":"Africa","subregion":"Eastern Africa","languages":{"crs":"Seychellois Creole","eng":"English","fra":"French"},"translations":{"deu":{"official":"Republik der Seychellen","common":"Seychellen"},"fra":{"official":"République des Seychelles","common":"Seychelles"},"hrv":{"official":"Republika Sejšeli","common":"Sejšeli"},"ita":{"official":"Repubblica delle Seychelles","common":"Seychelles"},"jpn":{"official":"セイシェル共和国","common":"セーシェル"},"nld":{"official":"Republiek der Seychellen","common":"Seychellen"},"por":{"official":"República das Seychelles","common":"Seicheles"},"rus":{"official":"Республика Сейшельские Острова","common":"Сейшельские Острова"},"spa":{"official":"República de las Seychelles","common":"Seychelles"},"fin":{"official":"Seychellien tasavalta","common":"Seychellit"},"zho":{"official":"塞舌尔共和国","common":"塞舌尔"}},"latlng":[-4.58333333,55.66666666],"demonym":"Seychellois","landlocked":false,"borders":[],"area":452,"id":213},{"name":{"common":"Syria","official":"Syrian Arab Republic","native":{"ara":{"official":"الجمهورية العربية السورية","common":"سوريا"}}},"tld":[".sy","سوريا."],"cca2":"SY","ccn3":"760","cca3":"SYR","cioc":"SYR","currency":["SYP"],"callingCode":["963"],"capital":"Damascus","altSpellings":["SY","Syrian Arab Republic","Al-Jumhūrīyah Al-ʻArabīyah As-Sūrīyah"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Arabische Republik Syrien","common":"Syrien"},"fra":{"official":"République arabe syrienne","common":"Syrie"},"hrv":{"official":"Sirijska Arapska Republika","common":"Sirija"},"ita":{"official":"Repubblica araba siriana","common":"Siria"},"jpn":{"official":"シリアアラブ共和国","common":"シリア・アラブ共和国"},"nld":{"official":"Syrische Arabische Republiek","common":"Syrië"},"por":{"official":"República Árabe Síria","common":"Síria"},"rus":{"official":"Сирийская Арабская Республика","common":"Сирия"},"spa":{"official":"República Árabe Siria","common":"Siria"},"fin":{"official":"Syyrian arabitasavalta","common":"Syyria"},"zho":{"official":"叙利亚阿拉伯共和国","common":"叙利亚"}},"latlng":[35,38],"demonym":"Syrian","landlocked":false,"borders":["IRQ","ISR","JOR","LBN","TUR"],"area":185180,"id":214},{"name":{"common":"Turks and Caicos Islands","official":"Turks and Caicos Islands","native":{"eng":{"official":"Turks and Caicos Islands","common":"Turks and Caicos Islands"}}},"tld":[".tc"],"cca2":"TC","ccn3":"796","cca3":"TCA","cioc":"","currency":["USD"],"callingCode":["1649"],"capital":"Cockburn Town","altSpellings":["TC"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Turks und Caicos Inseln","common":"Turks-und Caicosinseln"},"fra":{"official":"Îles Turques et Caïques","common":"Îles Turques-et-Caïques"},"hrv":{"official":"Otoci Turks i Caicos","common":"Otoci Turks i Caicos"},"ita":{"official":"Turks e Caicos","common":"Isole Turks e Caicos"},"jpn":{"official":"タークス·カイコス諸島","common":"タークス・カイコス諸島"},"nld":{"official":"Turks-en Caicoseilanden","common":"Turks-en Caicoseilanden"},"por":{"official":"Ilhas Turks e Caicos","common":"Ilhas Turks e Caicos"},"rus":{"official":"Теркс и Кайкос острова","common":"Теркс и Кайкос"},"spa":{"official":"Islas Turcas y Caicos","common":"Islas Turks y Caicos"},"fin":{"official":"Turks-ja Caicossaaret","common":"Turks-ja Caicossaaret"},"zho":{"official":"特克斯和凯科斯群岛","common":"特克斯和凯科斯群岛"}},"latlng":[21.75,-71.58333333],"demonym":"Turks and Caicos Islander","landlocked":false,"borders":[],"area":948,"id":215},{"name":{"common":"Chad","official":"Republic of Chad","native":{"ara":{"official":"جمهورية تشاد","common":"تشاد‎"},"fra":{"official":"République du Tchad","common":"Tchad"}}},"tld":[".td"],"cca2":"TD","ccn3":"148","cca3":"TCD","cioc":"CHA","currency":["XAF"],"callingCode":["235"],"capital":"N'Djamena","altSpellings":["TD","Tchad","Republic of Chad","République du Tchad"],"region":"Africa","subregion":"Middle Africa","languages":{"ara":"Arabic","fra":"French"},"translations":{"cym":{"official":"Republic of Chad","common":"Tsiad"},"deu":{"official":"Republik Tschad","common":"Tschad"},"fra":{"official":"République du Tchad","common":"Tchad"},"hrv":{"official":"Čadu","common":"Čad"},"ita":{"official":"Repubblica del Ciad","common":"Ciad"},"jpn":{"official":"チャド共和国","common":"チャド"},"nld":{"official":"Republiek Tsjaad","common":"Tsjaad"},"por":{"official":"República do Chade","common":"Chade"},"rus":{"official":"Республика Чад","common":"Чад"},"spa":{"official":"República de Chad","common":"Chad"},"fin":{"official":"Tšadin tasavalta","common":"Tšad"},"zho":{"official":"乍得共和国","common":"乍得"}},"latlng":[15,19],"demonym":"Chadian","landlocked":true,"borders":["CMR","CAF","LBY","NER","NGA","SSD"],"area":1284000,"id":216},{"name":{"common":"Togo","official":"Togolese Republic","native":{"fra":{"official":"République togolaise","common":"Togo"}}},"tld":[".tg"],"cca2":"TG","ccn3":"768","cca3":"TGO","cioc":"TOG","currency":["XOF"],"callingCode":["228"],"capital":"Lomé","altSpellings":["TG","Togolese","Togolese Republic","République Togolaise"],"region":"Africa","subregion":"Western Africa","languages":{"fra":"French"},"translations":{"deu":{"official":"Republik Togo","common":"Togo"},"fra":{"official":"République togolaise","common":"Togo"},"hrv":{"official":"Togolese Republika","common":"Togo"},"ita":{"official":"Repubblica del Togo","common":"Togo"},"jpn":{"official":"トーゴ共和国","common":"トーゴ"},"nld":{"official":"Republiek Togo","common":"Togo"},"por":{"official":"República do Togo","common":"Togo"},"rus":{"official":"Того Республика","common":"Того"},"spa":{"official":"República de Togo","common":"Togo"},"fin":{"official":"Togon tasavalta","common":"Togo"},"zho":{"official":"多哥共和国","common":"多哥"}},"latlng":[8,1.16666666],"demonym":"Togolese","landlocked":false,"borders":["BEN","BFA","GHA"],"area":56785,"id":217},{"name":{"common":"Thailand","official":"Kingdom of Thailand","native":{"tha":{"official":"ราชอาณาจักรไทย","common":"ประเทศไทย"}}},"tld":[".th",".ไทย"],"cca2":"TH","ccn3":"764","cca3":"THA","cioc":"THA","currency":["THB"],"callingCode":["66"],"capital":"Bangkok","altSpellings":["TH","Prathet","Thai","Kingdom of Thailand","ราชอาณาจักรไทย","Ratcha Anachak Thai"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"tha":"Thai"},"translations":{"deu":{"official":"Königreich Thailand","common":"Thailand"},"fra":{"official":"Royaume de Thaïlande","common":"Thaïlande"},"hrv":{"official":"Kraljevina Tajland","common":"Tajland"},"ita":{"official":"Regno di Thailandia","common":"Tailandia"},"jpn":{"official":"タイ王国","common":"タイ"},"nld":{"official":"Koninkrijk Thailand","common":"Thailand"},"por":{"official":"Reino da Tailândia","common":"Tailândia"},"rus":{"official":"Королевство Таиланд","common":"Таиланд"},"spa":{"official":"Reino de Tailandia","common":"Tailandia"},"fin":{"official":"Thaimaan kuningaskunta","common":"Thaimaa"},"zho":{"official":"泰王国","common":"泰国"}},"latlng":[15,100],"demonym":"Thai","landlocked":false,"borders":["MMR","KHM","LAO","MYS"],"area":513120,"id":218},{"name":{"common":"Tajikistan","official":"Republic of Tajikistan","native":{"rus":{"official":"Республика Таджикистан","common":"Таджикистан"},"tgk":{"official":"Ҷумҳурии Тоҷикистон","common":"Тоҷикистон"}}},"tld":[".tj"],"cca2":"TJ","ccn3":"762","cca3":"TJK","cioc":"TJK","currency":["TJS"],"callingCode":["992"],"capital":"Dushanbe","altSpellings":["TJ","Toçikiston","Republic of Tajikistan","Ҷумҳурии Тоҷикистон","Çumhuriyi Toçikiston"],"region":"Asia","subregion":"Central Asia","languages":{"rus":"Russian","tgk":"Tajik"},"translations":{"deu":{"official":"Republik Tadschikistan","common":"Tadschikistan"},"fra":{"official":"République du Tadjikistan","common":"Tadjikistan"},"hrv":{"official":"Republika Tadžikistan","common":"Tađikistan"},"ita":{"official":"Repubblica del Tajikistan","common":"Tagikistan"},"jpn":{"official":"タジキスタン共和国","common":"タジキスタン"},"nld":{"official":"Tadzjikistan","common":"Tadzjikistan"},"por":{"official":"República do Tajiquistão","common":"Tajiquistão"},"rus":{"official":"Республика Таджикистан","common":"Таджикистан"},"spa":{"official":"República de Tayikistán","common":"Tayikistán"},"fin":{"official":"Tadžikistanin tasavalta","common":"Tadžikistan"},"zho":{"official":"塔吉克斯坦共和国","common":"塔吉克斯坦"}},"latlng":[39,71],"demonym":"Tadzhik","landlocked":true,"borders":["AFG","CHN","KGZ","UZB"],"area":143100,"id":219},{"name":{"common":"Tokelau","official":"Tokelau","native":{"eng":{"official":"Tokelau","common":"Tokelau"},"smo":{"official":"Tokelau","common":"Tokelau"},"tkl":{"official":"Tokelau","common":"Tokelau"}}},"tld":[".tk"],"cca2":"TK","ccn3":"772","cca3":"TKL","cioc":"","currency":["NZD"],"callingCode":["690"],"capital":"Fakaofo","altSpellings":["TK"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","smo":"Samoan","tkl":"Tokelauan"},"translations":{"deu":{"official":"Tokelau","common":"Tokelau"},"fra":{"official":"Îles Tokelau","common":"Tokelau"},"hrv":{"official":"Tokelau","common":"Tokelau"},"ita":{"official":"Tokelau","common":"Isole Tokelau"},"jpn":{"official":"トケラウ諸島","common":"トケラウ"},"nld":{"official":"Tokelau","common":"Tokelau"},"por":{"official":"Tokelau","common":"Tokelau"},"rus":{"official":"Токелау","common":"Токелау"},"spa":{"official":"Tokelau","common":"Islas Tokelau"},"fin":{"official":"Tokelau","common":"Tokelau"},"zho":{"official":"托克劳","common":"托克劳"}},"latlng":[-9,-172],"demonym":"Tokelauan","landlocked":false,"borders":[],"area":12,"id":220},{"name":{"common":"Turkmenistan","official":"Turkmenistan","native":{"rus":{"official":"Туркменистан","common":"Туркмения"},"tuk":{"official":"Türkmenistan","common":"Türkmenistan"}}},"tld":[".tm"],"cca2":"TM","ccn3":"795","cca3":"TKM","cioc":"TKM","currency":["TMT"],"callingCode":["993"],"capital":"Ashgabat","altSpellings":["TM"],"region":"Asia","subregion":"Central Asia","languages":{"rus":"Russian","tuk":"Turkmen"},"translations":{"deu":{"official":"Turkmenistan","common":"Turkmenistan"},"fra":{"official":"Turkménistan","common":"Turkménistan"},"hrv":{"official":"Turkmenistan","common":"Turkmenistan"},"ita":{"official":"Turkmenistan","common":"Turkmenistan"},"jpn":{"official":"トルクメニスタン","common":"トルクメニスタン"},"nld":{"official":"Turkmenistan","common":"Turkmenistan"},"por":{"official":"Turcomenistão","common":"Turquemenistão"},"rus":{"official":"Туркменистан","common":"Туркмения"},"spa":{"official":"Turkmenistán","common":"Turkmenistán"},"fin":{"official":"Turkmenistan","common":"Turkmenistan"},"zho":{"official":"土库曼斯坦","common":"土库曼斯坦"}},"latlng":[40,60],"demonym":"Turkmen","landlocked":true,"borders":["AFG","IRN","KAZ","UZB"],"area":488100,"id":221},{"name":{"common":"Timor-Leste","official":"Democratic Republic of Timor-Leste","native":{"por":{"official":"República Democrática de Timor-Leste","common":"Timor-Leste"},"tet":{"official":"Repúblika Demokrátika Timór-Leste","common":"Timór-Leste"}}},"tld":[".tl"],"cca2":"TL","ccn3":"626","cca3":"TLS","cioc":"TLS","currency":["USD"],"callingCode":["670"],"capital":"Dili","altSpellings":["TL","East Timor","Democratic Republic of Timor-Leste","República Democrática de Timor-Leste","Repúblika Demokrátika Timór-Leste","Timór Lorosa'e","Timor Lorosae"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"por":"Portuguese","tet":"Tetum"},"translations":{"deu":{"official":"Demokratische Republik Timor-Leste","common":"Timor-Leste"},"fra":{"official":"République démocratique du Timor oriental","common":"Timor oriental"},"hrv":{"official":"Demokratska Republika Timor-Leste","common":"Istočni Timor"},"ita":{"official":"Repubblica Democratica di Timor Est","common":"Timor Est"},"jpn":{"official":"東ティモール民主共和国","common":"東ティモール"},"nld":{"official":"Democratische Republiek Oost-Timor","common":"Oost-Timor"},"por":{"official":"República Democrática de Timor-Leste","common":"Timor-Leste"},"rus":{"official":"Демократическая Республика Тимор -Лешти","common":"Восточный Тимор"},"spa":{"official":"República Democrática de Timor-Leste","common":"Timor Oriental"},"fin":{"official":"Itä-Timorin demokraattinen tasavalta","common":"Itä-Timor"},"zho":{"official":"东帝汶民主共和国","common":"东帝汶"}},"latlng":[-8.83333333,125.91666666],"demonym":"East Timorese","landlocked":false,"borders":["IDN"],"area":14874,"id":222},{"name":{"common":"Tonga","official":"Kingdom of Tonga","native":{"eng":{"official":"Kingdom of Tonga","common":"Tonga"},"ton":{"official":"Kingdom of Tonga","common":"Tonga"}}},"tld":[".to"],"cca2":"TO","ccn3":"776","cca3":"TON","cioc":"TGA","currency":["TOP"],"callingCode":["676"],"capital":"Nuku'alofa","altSpellings":["TO"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","ton":"Tongan"},"translations":{"deu":{"official":"Königreich Tonga","common":"Tonga"},"fra":{"official":"Royaume des Tonga","common":"Tonga"},"hrv":{"official":"Kraljevina Tonga","common":"Tonga"},"ita":{"official":"Regno di Tonga","common":"Tonga"},"jpn":{"official":"トンガ王国","common":"トンガ"},"nld":{"official":"Koninkrijk Tonga","common":"Tonga"},"por":{"official":"Reino de Tonga","common":"Tonga"},"rus":{"official":"Королевство Тонга","common":"Тонга"},"spa":{"official":"Reino de Tonga","common":"Tonga"},"fin":{"official":"Tongan kuningaskunta","common":"Tonga"},"zho":{"official":"汤加王国","common":"汤加"}},"latlng":[-20,-175],"demonym":"Tongan","landlocked":false,"borders":[],"area":747,"id":223},{"name":{"common":"Trinidad and Tobago","official":"Republic of Trinidad and Tobago","native":{"eng":{"official":"Republic of Trinidad and Tobago","common":"Trinidad and Tobago"}}},"tld":[".tt"],"cca2":"TT","ccn3":"780","cca3":"TTO","cioc":"TTO","currency":["TTD"],"callingCode":["1868"],"capital":"Port of Spain","altSpellings":["TT","Republic of Trinidad and Tobago"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Trinidad und Tobago","common":"Trinidad und Tobago"},"fra":{"official":"République de Trinité-et-Tobago","common":"Trinité-et-Tobago"},"hrv":{"official":"Republika Trinidad i Tobago","common":"Trinidad i Tobago"},"ita":{"official":"Repubblica di Trinidad e Tobago","common":"Trinidad e Tobago"},"jpn":{"official":"トリニダード·トバゴ共和国","common":"トリニダード・トバゴ"},"nld":{"official":"Republiek Trinidad en Tobago","common":"Trinidad en Tobago"},"por":{"official":"República de Trinidad e Tobago","common":"Trinidade e Tobago"},"rus":{"official":"Республика Тринидад и Тобаго","common":"Тринидад и Тобаго"},"spa":{"official":"República de Trinidad y Tobago","common":"Trinidad y Tobago"},"fin":{"official":"Trinidadin ja Tobagon tasavalta","common":"Trinidad ja Tobago"},"zho":{"official":"特立尼达和多巴哥共和国","common":"特立尼达和多巴哥"}},"latlng":[11,-61],"demonym":"Trinidadian","landlocked":false,"borders":[],"area":5130,"id":224},{"name":{"common":"Tunisia","official":"Tunisian Republic","native":{"ara":{"official":"الجمهورية التونسية","common":"تونس"}}},"tld":[".tn"],"cca2":"TN","ccn3":"788","cca3":"TUN","cioc":"TUN","currency":["TND"],"callingCode":["216"],"capital":"Tunis","altSpellings":["TN","Republic of Tunisia","al-Jumhūriyyah at-Tūnisiyyah"],"region":"Africa","subregion":"Northern Africa","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Tunesische Republik","common":"Tunesien"},"fra":{"official":"République tunisienne","common":"Tunisie"},"hrv":{"official":"Tuniski Republika","common":"Tunis"},"ita":{"official":"Repubblica tunisina","common":"Tunisia"},"jpn":{"official":"チュニジア共和国","common":"チュニジア"},"nld":{"official":"Republiek Tunesië","common":"Tunesië"},"por":{"official":"República da Tunísia","common":"Tunísia"},"rus":{"official":"Тунисской Республики","common":"Тунис"},"spa":{"official":"República de Túnez","common":"Túnez"},"fin":{"official":"Tunisian tasavalta","common":"Tunisia"},"zho":{"official":"突尼斯共和国","common":"突尼斯"}},"latlng":[34,9],"demonym":"Tunisian","landlocked":false,"borders":["DZA","LBY"],"area":163610,"id":225},{"name":{"common":"Turkey","official":"Republic of Turkey","native":{"tur":{"official":"Türkiye Cumhuriyeti","common":"Türkiye"}}},"tld":[".tr"],"cca2":"TR","ccn3":"792","cca3":"TUR","cioc":"TUR","currency":["TRY"],"callingCode":["90"],"capital":"Ankara","altSpellings":["TR","Turkiye","Republic of Turkey","Türkiye Cumhuriyeti"],"region":"Asia","subregion":"Western Asia","languages":{"tur":"Turkish"},"translations":{"deu":{"official":"Republik Türkei","common":"Türkei"},"fra":{"official":"République de Turquie","common":"Turquie"},"hrv":{"official":"Republika Turska","common":"Turska"},"ita":{"official":"Repubblica di Turchia","common":"Turchia"},"jpn":{"official":"トルコ共和国","common":"トルコ"},"nld":{"official":"Republiek Turkije","common":"Turkije"},"por":{"official":"República da Turquia","common":"Turquia"},"rus":{"official":"Республика Турции","common":"Турция"},"spa":{"official":"República de Turquía","common":"Turquía"},"fin":{"official":"Turkin tasavalta","common":"Turkki"},"zho":{"official":"土耳其共和国","common":"土耳其"}},"latlng":[39,35],"demonym":"Turkish","landlocked":false,"borders":["ARM","AZE","BGR","GEO","GRC","IRN","IRQ","SYR"],"area":783562,"id":226},{"name":{"common":"Tuvalu","official":"Tuvalu","native":{"eng":{"official":"Tuvalu","common":"Tuvalu"},"tvl":{"official":"Tuvalu","common":"Tuvalu"}}},"tld":[".tv"],"cca2":"TV","ccn3":"798","cca3":"TUV","cioc":"TUV","currency":["AUD"],"callingCode":["688"],"capital":"Funafuti","altSpellings":["TV"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","tvl":"Tuvaluan"},"translations":{"deu":{"official":"Tuvalu","common":"Tuvalu"},"fra":{"official":"Tuvalu","common":"Tuvalu"},"hrv":{"official":"Tuvalu","common":"Tuvalu"},"ita":{"official":"Tuvalu","common":"Tuvalu"},"jpn":{"official":"ツバル","common":"ツバル"},"nld":{"official":"Tuvalu","common":"Tuvalu"},"por":{"official":"Tuvalu","common":"Tuvalu"},"rus":{"official":"Тувалу","common":"Тувалу"},"spa":{"official":"Tuvalu","common":"Tuvalu"},"fin":{"official":"Tuvalu","common":"Tuvalu"},"zho":{"official":"图瓦卢","common":"图瓦卢"}},"latlng":[-8,178],"demonym":"Tuvaluan","landlocked":false,"borders":[],"area":26,"id":227},{"name":{"common":"Taiwan","official":"Republic of China (Taiwan)","native":{"zho":{"official":"中华民国","common":"臺灣"}}},"tld":[".tw",".台湾",".台灣"],"cca2":"TW","ccn3":"158","cca3":"TWN","cioc":"TPE","currency":["TWD"],"callingCode":["886"],"capital":"Taipei","altSpellings":["TW","Táiwān","Republic of China","中華民國","Zhōnghuá Mínguó","Chinese Taipei for IOC","Taiwan, Province of China"],"region":"Asia","subregion":"Eastern Asia","languages":{"zho":"Chinese"},"translations":{"deu":{"official":"Republik China (Taiwan)","common":"Taiwan"},"fra":{"official":"République de Chine (Taïwan)","common":"Taïwan"},"hrv":{"official":"Republika Kina","common":"Tajvan"},"ita":{"official":"Repubblica cinese (Taiwan)","common":"Taiwan"},"jpn":{"official":"中華民国","common":"台湾（台湾省/中華民国）"},"nld":{"official":"Republiek China (Taiwan)","common":"Taiwan"},"por":{"official":"República da China","common":"Ilha Formosa"},"rus":{"official":"Китайская Республика","common":"Тайвань"},"spa":{"official":"República de China en Taiwán","common":"Taiwán"},"fin":{"official":"Kiinan tasavalta","common":"Taiwan"}},"latlng":[23.5,121],"demonym":"Taiwanese","landlocked":false,"borders":[],"area":36193,"id":228},{"name":{"common":"Tanzania","official":"United Republic of Tanzania","native":{"eng":{"official":"United Republic of Tanzania","common":"Tanzania"},"swa":{"official":"Jamhuri ya Muungano wa Tanzania","common":"Tanzania"}}},"tld":[".tz"],"cca2":"TZ","ccn3":"834","cca3":"TZA","cioc":"TAN","currency":["TZS"],"callingCode":["255"],"capital":"Dodoma","altSpellings":["TZ","Tanzania, United Republic of","United Republic of Tanzania","Jamhuri ya Muungano wa Tanzania"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","swa":"Swahili"},"translations":{"deu":{"official":"Vereinigte Republik Tansania","common":"Tansania"},"fra":{"official":"République -Unie de Tanzanie","common":"Tanzanie"},"hrv":{"official":"Ujedinjena Republika Tanzanija","common":"Tanzanija"},"ita":{"official":"Repubblica Unita di Tanzania","common":"Tanzania"},"jpn":{"official":"タンザニア連合共和国","common":"タンザニア"},"nld":{"official":"Verenigde Republiek Tanzania","common":"Tanzania"},"por":{"official":"República Unida da Tanzânia","common":"Tanzânia"},"rus":{"official":"Объединенная Республика Танзания","common":"Танзания"},"spa":{"official":"República Unida de Tanzania","common":"Tanzania"},"fin":{"official":"Tansanian yhdistynyt tasavalta","common":"Tansania"},"zho":{"official":"坦桑尼亚联合共和国","common":"坦桑尼亚"}},"latlng":[-6,35],"demonym":"Tanzanian","landlocked":false,"borders":["BDI","COD","KEN","MWI","MOZ","RWA","UGA","ZMB"],"area":945087,"id":229},{"name":{"common":"Uganda","official":"Republic of Uganda","native":{"eng":{"official":"Republic of Uganda","common":"Uganda"},"swa":{"official":"Republic of Uganda","common":"Uganda"}}},"tld":[".ug"],"cca2":"UG","ccn3":"800","cca3":"UGA","cioc":"UGA","currency":["UGX"],"callingCode":["256"],"capital":"Kampala","altSpellings":["UG","Republic of Uganda","Jamhuri ya Uganda"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English","swa":"Swahili"},"translations":{"deu":{"official":"Republik Uganda","common":"Uganda"},"fra":{"official":"République de l'Ouganda","common":"Ouganda"},"hrv":{"official":"Republika Uganda","common":"Uganda"},"ita":{"official":"Repubblica di Uganda","common":"Uganda"},"jpn":{"official":"ウガンダ共和国","common":"ウガンダ"},"nld":{"official":"Republiek Uganda","common":"Oeganda"},"por":{"official":"República do Uganda","common":"Uganda"},"rus":{"official":"Республика Уганда","common":"Уганда"},"spa":{"official":"República de Uganda","common":"Uganda"},"fin":{"official":"Ugandan tasavalta","common":"Uganda"},"zho":{"official":"乌干达共和国","common":"乌干达"}},"latlng":[1,32],"demonym":"Ugandan","landlocked":true,"borders":["COD","KEN","RWA","SSD","TZA"],"area":241550,"id":230},{"name":{"common":"Ukraine","official":"Ukraine","native":{"rus":{"official":"Украина","common":"Украина"},"ukr":{"official":"Україна","common":"Україна"}}},"tld":[".ua",".укр"],"cca2":"UA","ccn3":"804","cca3":"UKR","cioc":"UKR","currency":["UAH"],"callingCode":["380"],"capital":"Kiev","altSpellings":["UA","Ukrayina"],"region":"Europe","subregion":"Eastern Europe","languages":{"rus":"Russian","ukr":"Ukrainian"},"translations":{"deu":{"official":"Ukraine","common":"Ukraine"},"fra":{"official":"Ukraine","common":"Ukraine"},"hrv":{"official":"Ukrajina","common":"Ukrajina"},"ita":{"official":"Ucraina","common":"Ucraina"},"jpn":{"official":"ウクライナ","common":"ウクライナ"},"nld":{"official":"Oekraïne","common":"Oekraïne"},"por":{"official":"Ucrânia","common":"Ucrânia"},"rus":{"official":"Украина","common":"Украина"},"spa":{"official":"Ucrania","common":"Ucrania"},"fin":{"official":"Ukraina","common":"Ukraina"},"zho":{"official":"乌克兰","common":"乌克兰"}},"latlng":[49,32],"demonym":"Ukrainian","landlocked":false,"borders":["BLR","HUN","MDA","POL","ROU","RUS","SVK"],"area":603500,"id":231},{"name":{"common":"United States Minor Outlying Islands","official":"United States Minor Outlying Islands","native":{"eng":{"official":"United States Minor Outlying Islands","common":"United States Minor Outlying Islands"}}},"tld":[".us"],"cca2":"UM","ccn3":"581","cca3":"UMI","cioc":"","currency":["USD"],"callingCode":[],"capital":"","altSpellings":["UM"],"region":"Americas","subregion":"Northern America","languages":{"eng":"English"},"translations":{"deu":{"official":"USA, kleinere ausgelagerte Inseln","common":"Kleinere Inselbesitzungen der Vereinigten Staaten"},"fra":{"official":"Îles mineures éloignées des États-Unis","common":"Îles mineures éloignées des États-Unis"},"hrv":{"official":"Mali udaljeni otoci SAD-a","common":"Mali udaljeni otoci SAD-a"},"ita":{"official":"Stati Uniti Isole Minori","common":"Isole minori esterne degli Stati Uniti d'America"},"jpn":{"official":"アメリカ合衆国外諸島","common":"合衆国領有小離島"},"nld":{"official":"Kleine afgelegen eilanden van de Verenigde Staten","common":"Kleine afgelegen eilanden van de Verenigde Staten"},"por":{"official":"Estados Unidos Ilhas Menores Distantes","common":"Ilhas Menores Distantes dos Estados Unidos"},"rus":{"official":"Внешние малые острова США","common":"Внешние малые острова США"},"spa":{"official":"Estados Unidos Islas menores alejadas de","common":"Islas Ultramarinas Menores de Estados Unidos"},"fin":{"official":"Yhdysvaltain asumattomat saaret","common":"Yhdysvaltain asumattomat saaret"},"zho":{"official":"美国本土外小岛屿","common":"美国本土外小岛屿"}},"latlng":[],"demonym":"American","landlocked":false,"borders":[],"area":34.2,"id":232},{"name":{"common":"Uruguay","official":"Oriental Republic of Uruguay","native":{"spa":{"official":"República Oriental del Uruguay","common":"Uruguay"}}},"tld":[".uy"],"cca2":"UY","ccn3":"858","cca3":"URY","cioc":"URU","currency":["UYI","UYU"],"callingCode":["598"],"capital":"Montevideo","altSpellings":["UY","Oriental Republic of Uruguay","República Oriental del Uruguay"],"region":"Americas","subregion":"South America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Republik Östlich des Uruguay","common":"Uruguay"},"fra":{"official":"République orientale de l'Uruguay","common":"Uruguay"},"hrv":{"official":"Orijentalna Republika Urugvaj","common":"Urugvaj"},"ita":{"official":"Repubblica Orientale dell'Uruguay","common":"Uruguay"},"jpn":{"official":"ウルグアイ東方共和国","common":"ウルグアイ"},"nld":{"official":"Oosterse Republiek Uruguay","common":"Uruguay"},"por":{"official":"República Oriental do Uruguai","common":"Uruguai"},"rus":{"official":"Восточной Республики Уругвай","common":"Уругвай"},"spa":{"official":"República Oriental del Uruguay","common":"Uruguay"},"fin":{"official":"Uruguayn itäinen tasavalta","common":"Uruguay"},"zho":{"official":"乌拉圭东岸共和国","common":"乌拉圭"}},"latlng":[-33,-56],"demonym":"Uruguayan","landlocked":false,"borders":["ARG","BRA"],"area":181034,"id":233},{"name":{"common":"United States","official":"United States of America","native":{"eng":{"official":"United States of America","common":"United States"}}},"tld":[".us"],"cca2":"US","ccn3":"840","cca3":"USA","cioc":"USA","currency":["USD","USN","USS"],"callingCode":["1"],"capital":"Washington D.C.","altSpellings":["US","USA","United States of America"],"region":"Americas","subregion":"Northern America","languages":{"eng":"English"},"translations":{"deu":{"official":"Vereinigte Staaten von Amerika","common":"Vereinigte Staaten von Amerika"},"fra":{"official":"Les états-unis d'Amérique","common":"États-Unis"},"hrv":{"official":"Sjedinjene Države Amerike","common":"Sjedinjene Američke Države"},"ita":{"official":"Stati Uniti d'America","common":"Stati Uniti d'America"},"jpn":{"official":"アメリカ合衆国","common":"アメリカ合衆国"},"nld":{"official":"Verenigde Staten van Amerika","common":"Verenigde Staten"},"por":{"official":"Estados Unidos da América","common":"Estados Unidos"},"rus":{"official":"Соединенные Штаты Америки","common":"Соединённые Штаты Америки"},"spa":{"official":"Estados Unidos de América","common":"Estados Unidos"},"fin":{"official":"Amerikan yhdysvallat","common":"Yhdysvallat"},"zho":{"official":"美利坚合众国","common":"美国"}},"latlng":[38,-97],"demonym":"American","landlocked":false,"borders":["CAN","MEX"],"area":9372610,"id":234},{"name":{"common":"Uzbekistan","official":"Republic of Uzbekistan","native":{"rus":{"official":"Республика Узбекистан","common":"Узбекистан"},"uzb":{"official":"O'zbekiston Respublikasi","common":"O‘zbekiston"}}},"tld":[".uz"],"cca2":"UZ","ccn3":"860","cca3":"UZB","cioc":"UZB","currency":["UZS"],"callingCode":["998"],"capital":"Tashkent","altSpellings":["UZ","Republic of Uzbekistan","O‘zbekiston Respublikasi","Ўзбекистон Республикаси"],"region":"Asia","subregion":"Central Asia","languages":{"rus":"Russian","uzb":"Uzbek"},"translations":{"deu":{"official":"Republik Usbekistan","common":"Usbekistan"},"fra":{"official":"République d'Ouzbékistan","common":"Ouzbékistan"},"hrv":{"official":"Republika Uzbekistan","common":"Uzbekistan"},"ita":{"official":"Repubblica di Uzbekistan","common":"Uzbekistan"},"jpn":{"official":"ウズベキスタン共和国","common":"ウズベキスタン"},"nld":{"official":"Republiek Oezbekistan","common":"Oezbekistan"},"por":{"official":"República do Usbequistão","common":"Uzbequistão"},"rus":{"official":"Республика Узбекистан","common":"Узбекистан"},"spa":{"official":"República de Uzbekistán","common":"Uzbekistán"},"fin":{"official":"Uzbekistanin tasavalta","common":"Uzbekistan"},"zho":{"official":"乌兹别克斯坦共和国","common":"乌兹别克斯坦"}},"latlng":[41,64],"demonym":"Uzbekistani","landlocked":true,"borders":["AFG","KAZ","KGZ","TJK","TKM"],"area":447400,"id":235},{"name":{"common":"Vatican City","official":"Vatican City State","native":{"ita":{"official":"Stato della Città del Vaticano","common":"Vaticano"},"lat":{"official":"Status Civitatis Vaticanæ","common":"Vaticanæ"}}},"tld":[".va"],"cca2":"VA","ccn3":"336","cca3":"VAT","cioc":"","currency":["EUR"],"callingCode":["3906698","379"],"capital":"Vatican City","altSpellings":["VA","Holy See (Vatican City State)","Vatican City State","Stato della Città del Vaticano"],"region":"Europe","subregion":"Southern Europe","languages":{"ita":"Italian","lat":"Latin"},"translations":{"deu":{"official":"Staat Vatikanstadt","common":"Vatikanstadt"},"fra":{"official":"Cité du Vatican","common":"Cité du Vatican"},"hrv":{"official":"Vatikan","common":"Vatikan"},"ita":{"official":"Città del Vaticano","common":"Città del Vaticano"},"jpn":{"official":"バチカン市国の状態","common":"バチカン市国"},"nld":{"official":"Vaticaanstad","common":"Vaticaanstad"},"por":{"official":"Cidade do Vaticano","common":"Cidade do Vaticano"},"rus":{"official":"Город-государство Ватикан","common":"Ватикан"},"spa":{"official":"Ciudad del Vaticano","common":"Ciudad del Vaticano"},"fin":{"official":"Vatikaanin kaupunkivaltio","common":"Vatikaani"},"zho":{"official":"梵蒂冈城国","common":"梵蒂冈"}},"latlng":[41.9,12.45],"demonym":"Italian","landlocked":true,"borders":["ITA"],"area":0.44,"id":236},{"name":{"common":"Saint Vincent and the Grenadines","official":"Saint Vincent and the Grenadines","native":{"eng":{"official":"Saint Vincent and the Grenadines","common":"Saint Vincent and the Grenadines"}}},"tld":[".vc"],"cca2":"VC","ccn3":"670","cca3":"VCT","cioc":"VIN","currency":["XCD"],"callingCode":["1784"],"capital":"Kingstown","altSpellings":["VC"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"St. Vincent und die Grenadinen","common":"Saint Vincent und die Grenadinen"},"fra":{"official":"Saint-Vincent-et-les Grenadines","common":"Saint-Vincent-et-les-Grenadines"},"hrv":{"official":"Sveti Vincent i Grenadini","common":"Sveti Vincent i Grenadini"},"ita":{"official":"Saint Vincent e Grenadine","common":"Saint Vincent e Grenadine"},"jpn":{"official":"セントビンセントおよびグレナディーン諸島","common":"セントビンセントおよびグレナディーン諸島"},"nld":{"official":"Saint Vincent en de Grenadines","common":"Saint Vincent en de Grenadines"},"por":{"official":"São Vicente e Granadinas","common":"São Vincente e Granadinas"},"rus":{"official":"Сент-Винсент и Гренадины","common":"Сент-Винсент и Гренадины"},"spa":{"official":"San Vicente y las Granadinas","common":"San Vicente y Granadinas"},"fin":{"official":"Saint Vincent ja Grenadiinit","common":"Saint Vincent ja Grenadiinit"},"zho":{"official":"圣文森特和格林纳丁斯","common":"圣文森特和格林纳丁斯"}},"latlng":[13.25,-61.2],"demonym":"Saint Vincentian","landlocked":false,"borders":[],"area":389,"id":237},{"name":{"common":"Venezuela","official":"Bolivarian Republic of Venezuela","native":{"spa":{"official":"República Bolivariana de Venezuela","common":"Venezuela"}}},"tld":[".ve"],"cca2":"VE","ccn3":"862","cca3":"VEN","cioc":"VEN","currency":["VEF"],"callingCode":["58"],"capital":"Caracas","altSpellings":["VE","Bolivarian Republic of Venezuela","Venezuela, Bolivarian Republic of","República Bolivariana de Venezuela"],"region":"Americas","subregion":"South America","languages":{"spa":"Spanish"},"translations":{"deu":{"official":"Bolivarische Republik Venezuela","common":"Venezuela"},"fra":{"official":"République bolivarienne du Venezuela","common":"Venezuela"},"hrv":{"official":"BOLIVARIJANSKA Republika Venezuela","common":"Venezuela"},"ita":{"official":"Repubblica Bolivariana del Venezuela","common":"Venezuela"},"jpn":{"official":"ベネズエラ·ボリバル共和国","common":"ベネズエラ・ボリバル共和国"},"nld":{"official":"Bolivariaanse Republiek Venezuela","common":"Venezuela"},"por":{"official":"República Bolivariana da Venezuela","common":"Venezuela"},"rus":{"official":"Боливарианская Республика Венесуэла","common":"Венесуэла"},"spa":{"official":"República Bolivariana de Venezuela","common":"Venezuela"},"fin":{"official":"Venezuelan bolivariaainen tasavalta","common":"Venezuela"},"zho":{"official":"委内瑞拉玻利瓦尔共和国","common":"委内瑞拉"}},"latlng":[8,-66],"demonym":"Venezuelan","landlocked":false,"borders":["BRA","COL","GUY"],"area":916445,"id":238},{"name":{"common":"British Virgin Islands","official":"Virgin Islands","native":{"eng":{"official":"Virgin Islands","common":"British Virgin Islands"}}},"tld":[".vg"],"cca2":"VG","ccn3":"092","cca3":"VGB","cioc":"IVB","currency":["USD"],"callingCode":["1284"],"capital":"Road Town","altSpellings":["VG","Virgin Islands, British"],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Jungferninseln","common":"Britische Jungferninseln"},"fra":{"official":"îles Vierges","common":"Îles Vierges britanniques"},"hrv":{"official":"Djevičanski Otoci","common":"Britanski Djevičanski Otoci"},"ita":{"official":"Isole Vergini","common":"Isole Vergini Britanniche"},"jpn":{"official":"バージン諸島","common":"イギリス領ヴァージン諸島"},"nld":{"official":"Maagdeneilanden","common":"Britse Maagdeneilanden"},"por":{"official":"Ilhas Virgens","common":"Ilhas Virgens"},"rus":{"official":"Виргинские острова","common":"Британские Виргинские острова"},"spa":{"official":"Islas Vírgenes","common":"Islas Vírgenes del Reino Unido"},"fin":{"official":"Brittiläiset Neitsytsaaret","common":"Neitsytsaaret"},"zho":{"official":"英属维尔京群岛","common":"英属维尔京群岛"}},"latlng":[18.431383,-64.62305],"demonym":"Virgin Islander","landlocked":false,"borders":[],"area":151,"id":239},{"name":{"common":"United States Virgin Islands","official":"Virgin Islands of the United States","native":{"eng":{"official":"Virgin Islands of the United States","common":"United States Virgin Islands"}}},"tld":[".vi"],"cca2":"VI","ccn3":"850","cca3":"VIR","cioc":"ISV","currency":["USD"],"callingCode":["1340"],"capital":"Charlotte Amalie","altSpellings":["VI","Virgin Islands, U.S."],"region":"Americas","subregion":"Caribbean","languages":{"eng":"English"},"translations":{"deu":{"official":"Jungferninseln der Vereinigten Staaten","common":"Amerikanische Jungferninseln"},"fra":{"official":"Îles Vierges des États-Unis","common":"Îles Vierges des États-Unis"},"hrv":{"official":"Djevičanski Otoci SAD","common":"Američki Djevičanski Otoci"},"ita":{"official":"Isole Vergini degli Stati Uniti","common":"Isole Vergini americane"},"jpn":{"official":"米国のバージン諸島","common":"アメリカ領ヴァージン諸島"},"nld":{"official":"Maagdeneilanden van de Verenigde Staten","common":"Amerikaanse Maagdeneilanden"},"por":{"official":"Ilhas Virgens dos Estados Unidos","common":"Ilhas Virgens dos Estados Unidos"},"rus":{"official":"Виргинские острова Соединенных Штатов","common":"Виргинские Острова"},"spa":{"official":"Islas Vírgenes de los Estados Unidos","common":"Islas Vírgenes de los Estados Unidos"},"fin":{"official":"Yhdysvaltain Neitsytsaaret","common":"Neitsytsaaret"},"zho":{"official":"美属维尔京群岛","common":"美属维尔京群岛"}},"latlng":[18.35,-64.933333],"demonym":"Virgin Islander","landlocked":false,"borders":[],"area":347,"id":240},{"name":{"common":"Vietnam","official":"Socialist Republic of Vietnam","native":{"vie":{"official":"Cộng hòa xã hội chủ nghĩa Việt Nam","common":"Việt Nam"}}},"tld":[".vn"],"cca2":"VN","ccn3":"704","cca3":"VNM","cioc":"VIE","currency":["VND"],"callingCode":["84"],"capital":"Hanoi","altSpellings":["VN","Socialist Republic of Vietnam","Cộng hòa Xã hội chủ nghĩa Việt Nam","Viet Nam"],"region":"Asia","subregion":"South-Eastern Asia","languages":{"vie":"Vietnamese"},"translations":{"deu":{"official":"Sozialistische Republik Vietnam","common":"Vietnam"},"fra":{"official":"République socialiste du Viêt Nam","common":"Viêt Nam"},"hrv":{"official":"Socijalistička Republika Vijetnam","common":"Vijetnam"},"ita":{"official":"Repubblica socialista del Vietnam","common":"Vietnam"},"jpn":{"official":"ベトナム社会主義共和国","common":"ベトナム"},"nld":{"official":"Socialistische Republiek Vietnam","common":"Vietnam"},"por":{"official":"República Socialista do Vietname","common":"Vietname"},"rus":{"official":"Социалистическая Республика Вьетнам","common":"Вьетнам"},"spa":{"official":"República Socialista de Vietnam","common":"Vietnam"},"fin":{"official":"Vietnamin sosialistinen tasavalta","common":"Vietnam"},"zho":{"official":"越南社会主义共和国","common":"越南"}},"latlng":[16.16666666,107.83333333],"demonym":"Vietnamese","landlocked":false,"borders":["KHM","CHN","LAO"],"area":331212,"id":241},{"name":{"common":"Vanuatu","official":"Republic of Vanuatu","native":{"bis":{"official":"Ripablik blong Vanuatu","common":"Vanuatu"},"eng":{"official":"Republic of Vanuatu","common":"Vanuatu"},"fra":{"official":"République de Vanuatu","common":"Vanuatu"}}},"tld":[".vu"],"cca2":"VU","ccn3":"548","cca3":"VUT","cioc":"VAN","currency":["VUV"],"callingCode":["678"],"capital":"Port Vila","altSpellings":["VU","Republic of Vanuatu","Ripablik blong Vanuatu","République de Vanuatu"],"region":"Oceania","subregion":"Melanesia","languages":{"bis":"Bislama","eng":"English","fra":"French"},"translations":{"deu":{"official":"Vanuatu","common":"Vanuatu"},"fra":{"official":"République de Vanuatu","common":"Vanuatu"},"hrv":{"official":"Republika Vanuatu","common":"Vanuatu"},"ita":{"official":"Repubblica di Vanuatu","common":"Vanuatu"},"jpn":{"official":"バヌアツ共和国","common":"バヌアツ"},"nld":{"official":"Republiek Vanuatu","common":"Vanuatu"},"por":{"official":"República de Vanuatu","common":"Vanuatu"},"rus":{"official":"Республика Вануату","common":"Вануату"},"spa":{"official":"República de Vanuatu","common":"Vanuatu"},"fin":{"official":"Vanuatun tasavalta","common":"Vanuatu"},"zho":{"official":"瓦努阿图共和国","common":"瓦努阿图"}},"latlng":[-16,167],"demonym":"Ni-Vanuatu","landlocked":false,"borders":[],"area":12189,"id":242},{"name":{"common":"Wallis and Futuna","official":"Territory of the Wallis and Futuna Islands","native":{"fra":{"official":"Territoire des îles Wallis et Futuna","common":"Wallis et Futuna"}}},"tld":[".wf"],"cca2":"WF","ccn3":"876","cca3":"WLF","cioc":"","currency":["XPF"],"callingCode":["681"],"capital":"Mata-Utu","altSpellings":["WF","Territory of the Wallis and Futuna Islands","Territoire des îles Wallis et Futuna"],"region":"Oceania","subregion":"Polynesia","languages":{"fra":"French"},"translations":{"deu":{"official":"Gebiet der Wallis und Futuna","common":"Wallis und Futuna"},"fra":{"official":"Territoire des îles Wallis et Futuna","common":"Wallis-et-Futuna"},"hrv":{"official":"Teritoriju Wallis i Futuna","common":"Wallis i Fortuna"},"ita":{"official":"Territorio delle Isole Wallis e Futuna","common":"Wallis e Futuna"},"jpn":{"official":"ウォリス·フツナ諸島の領土","common":"ウォリス・フツナ"},"nld":{"official":"Grondgebied van de Wallis en Futuna","common":"Wallis en Futuna"},"por":{"official":"Território das Ilhas Wallis e Futuna","common":"Wallis e Futuna"},"rus":{"official":"Территория Уоллис и Футуна острова","common":"Уоллис и Футуна"},"spa":{"official":"Territorio de las Islas Wallis y Futuna","common":"Wallis y Futuna"},"fin":{"official":"Wallisin ja Futunan yhteisö","common":"Wallis ja Futuna"},"zho":{"official":"瓦利斯和富图纳群岛","common":"瓦利斯和富图纳群岛"}},"latlng":[-13.3,-176.2],"demonym":"Wallis and Futuna Islander","landlocked":false,"borders":[],"area":142,"id":243},{"name":{"common":"Samoa","official":"Independent State of Samoa","native":{"eng":{"official":"Independent State of Samoa","common":"Samoa"},"smo":{"official":"Malo Saʻoloto Tutoʻatasi o Sāmoa","common":"Sāmoa"}}},"tld":[".ws"],"cca2":"WS","ccn3":"882","cca3":"WSM","cioc":"SAM","currency":["WST"],"callingCode":["685"],"capital":"Apia","altSpellings":["WS","Independent State of Samoa","Malo Saʻoloto Tutoʻatasi o Sāmoa"],"region":"Oceania","subregion":"Polynesia","languages":{"eng":"English","smo":"Samoan"},"translations":{"deu":{"official":"Unabhängige Staat Samoa","common":"Samoa"},"fra":{"official":"Samoa","common":"Samoa"},"hrv":{"official":"Nezavisna Država Samoa","common":"Samoa"},"ita":{"official":"Stato indipendente di Samoa","common":"Samoa"},"jpn":{"official":"サモア独立国","common":"サモア"},"nld":{"official":"Onafhankelijke Staat Samoa","common":"Samoa"},"por":{"official":"Estado Independente de Samoa","common":"Samoa"},"rus":{"official":"Независимое Государство Самоа","common":"Самоа"},"spa":{"official":"Estado Independiente de Samoa","common":"Samoa"},"fin":{"official":"Samoan itsenäinen valtio","common":"Samoa"},"zho":{"official":"萨摩亚独立国","common":"萨摩亚"}},"latlng":[-13.58333333,-172.33333333],"demonym":"Samoan","landlocked":false,"borders":[],"area":2842,"id":244},{"name":{"common":"Yemen","official":"Republic of Yemen","native":{"ara":{"official":"الجمهورية اليمنية","common":"اليَمَن"}}},"tld":[".ye"],"cca2":"YE","ccn3":"887","cca3":"YEM","cioc":"YEM","currency":["YER"],"callingCode":["967"],"capital":"Sana'a","altSpellings":["YE","Yemeni Republic","al-Jumhūriyyah al-Yamaniyyah"],"region":"Asia","subregion":"Western Asia","languages":{"ara":"Arabic"},"translations":{"deu":{"official":"Republik Jemen","common":"Jemen"},"fra":{"official":"République du Yémen","common":"Yémen"},"hrv":{"official":"Republika Jemen","common":"Jemen"},"ita":{"official":"Repubblica dello Yemen","common":"Yemen"},"jpn":{"official":"イエメン共和国","common":"イエメン"},"nld":{"official":"Republiek Jemen","common":"Jemen"},"por":{"official":"República do Iêmen","common":"Iémen"},"rus":{"official":"Йеменская Республика","common":"Йемен"},"spa":{"official":"República de Yemen","common":"Yemen"},"fin":{"official":"Jemenin tasavalta","common":"Jemen"},"zho":{"official":"也门共和国","common":"也门"}},"latlng":[15,48],"demonym":"Yemeni","landlocked":false,"borders":["OMN","SAU"],"area":527968,"id":245},{"name":{"common":"South Africa","official":"Republic of South Africa","native":{"afr":{"official":"Republiek van Suid-Afrika","common":"South Africa"},"eng":{"official":"Republic of South Africa","common":"South Africa"},"nbl":{"official":"IRiphabliki yeSewula Afrika","common":"Sewula Afrika"},"nso":{"official":"Rephaboliki ya Afrika-Borwa ","common":"Afrika-Borwa"},"sot":{"official":"Rephaboliki ya Afrika Borwa","common":"Afrika Borwa"},"ssw":{"official":"IRiphabhulikhi yeNingizimu Afrika","common":"Ningizimu Afrika"},"tsn":{"official":"Rephaboliki ya Aforika Borwa","common":"Aforika Borwa"},"tso":{"official":"Riphabliki ra Afrika Dzonga","common":"Afrika Dzonga"},"ven":{"official":"Riphabuḽiki ya Afurika Tshipembe","common":"Afurika Tshipembe"},"xho":{"official":"IRiphabliki yaseMzantsi Afrika","common":"Mzantsi Afrika"},"zul":{"official":"IRiphabliki yaseNingizimu Afrika","common":"Ningizimu Afrika"}}},"tld":[".za"],"cca2":"ZA","ccn3":"710","cca3":"ZAF","cioc":"RSA","currency":["ZAR"],"callingCode":["27"],"capital":"Pretoria","altSpellings":["ZA","RSA","Suid-Afrika","Republic of South Africa"],"region":"Africa","subregion":"Southern Africa","languages":{"afr":"Afrikaans","eng":"English","nbl":"Southern Ndebele","nso":"Northern Sotho","sot":"Southern Sotho","ssw":"Swazi","tsn":"Tswana","tso":"Tsonga","ven":"Venda","xho":"Xhosa","zul":"Zulu"},"translations":{"deu":{"official":"Republik Südafrika","common":"Republik Südafrika"},"fra":{"official":"République d'Afrique du Sud","common":"Afrique du Sud"},"hrv":{"official":"Južnoafrička Republika","common":"Južnoafrička Republika"},"ita":{"official":"Repubblica del Sud Africa","common":"Sud Africa"},"jpn":{"official":"南アフリカ共和国","common":"南アフリカ"},"nld":{"official":"Zuid -Afrika","common":"Zuid-Afrika"},"por":{"official":"República da África do Sul","common":"África do Sul"},"rus":{"official":"Южно-Африканская Республика","common":"Южно-Африканская Республика"},"spa":{"official":"República de Sudáfrica","common":"República de Sudáfrica"},"fin":{"official":"Etelä-Afrikan tasavalta","common":"Etelä-Afrikka"},"zho":{"official":"南非共和国","common":"南非"}},"latlng":[-29,24],"demonym":"South African","landlocked":false,"borders":["BWA","LSO","MOZ","NAM","SWZ","ZWE"],"area":1221037,"id":246},{"name":{"common":"Zambia","official":"Republic of Zambia","native":{"eng":{"official":"Republic of Zambia","common":"Zambia"}}},"tld":[".zm"],"cca2":"ZM","ccn3":"894","cca3":"ZMB","cioc":"ZAM","currency":["ZMW"],"callingCode":["260"],"capital":"Lusaka","altSpellings":["ZM","Republic of Zambia"],"region":"Africa","subregion":"Eastern Africa","languages":{"eng":"English"},"translations":{"deu":{"official":"Republik Sambia","common":"Sambia"},"fra":{"official":"République de Zambie","common":"Zambie"},"hrv":{"official":"Republika Zambija","common":"Zambija"},"ita":{"official":"Repubblica di Zambia","common":"Zambia"},"jpn":{"official":"ザンビア共和国","common":"ザンビア"},"nld":{"official":"Republiek Zambia","common":"Zambia"},"por":{"official":"República da Zâmbia","common":"Zâmbia"},"rus":{"official":"Республика Замбия","common":"Замбия"},"spa":{"official":"República de Zambia","common":"Zambia"},"fin":{"official":"Sambian tasavalta","common":"Sambia"},"zho":{"official":"赞比亚共和国","common":"赞比亚"}},"latlng":[-15,30],"demonym":"Zambian","landlocked":true,"borders":["AGO","BWA","COD","MWI","MOZ","NAM","TZA","ZWE"],"area":752612,"id":247},{"name":{"common":"Zimbabwe","official":"Republic of Zimbabwe","native":{"bwg":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"eng":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"kck":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"khi":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"ndc":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"nde":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"nya":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"sna":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"sot":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"toi":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"tsn":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"tso":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"ven":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"xho":{"official":"Republic of Zimbabwe","common":"Zimbabwe"},"zib":{"official":"Republic of Zimbabwe","common":"Zimbabwe"}}},"tld":[".zw"],"cca2":"ZW","ccn3":"716","cca3":"ZWE","cioc":"ZIM","currency":["ZWL"],"callingCode":["263"],"capital":"Harare","altSpellings":["ZW","Republic of Zimbabwe"],"region":"Africa","subregion":"Eastern Africa","languages":{"bwg":"Chibarwe","eng":"English","kck":"Kalanga","khi":"Khoisan","ndc":"Ndau","nde":"Northern Ndebele","nya":"Chewa","sna":"Shona","sot":"Sotho","toi":"Tonga","tsn":"Tswana","tso":"Tsonga","ven":"Venda","xho":"Xhosa","zib":"Zimbabwean Sign Language"},"translations":{"deu":{"official":"Republik Simbabwe","common":"Simbabwe"},"fra":{"official":"République du Zimbabwe","common":"Zimbabwe"},"hrv":{"official":"Republika Zimbabve","common":"Zimbabve"},"ita":{"official":"Repubblica dello Zimbabwe","common":"Zimbabwe"},"jpn":{"official":"ジンバブエ共和国","common":"ジンバブエ"},"nld":{"official":"Republiek Zimbabwe","common":"Zimbabwe"},"por":{"official":"República do Zimbabwe","common":"Zimbabwe"},"rus":{"official":"Республика Зимбабве","common":"Зимбабве"},"spa":{"official":"República de Zimbabue","common":"Zimbabue"},"fin":{"official":"Zimbabwen tasavalta","common":"Zimbabwe"},"zho":{"official":"津巴布韦共和国","common":"津巴布韦"}},"latlng":[-20,30],"demonym":"Zimbabwean","landlocked":true,"borders":["BWA","MOZ","ZAF","ZMB"],"area":390757,"id":248}]

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.9.1';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArguments(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArguments(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArguments(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArguments(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArguments(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArguments = restArguments;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return has(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(34)(module)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Format = __webpack_require__(36)
/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = Format;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * `format` constructor.
 *
 * @api public
*/
 
module.exports = {


	create : (statusCode, error, message, data) => {
		
		if(!statusCode) throw new Error('Status code is required')
		if( isNaN( Number( statusCode)))	throw new Error('Status code not a number')

		this.statusCode = statusCode
	 	this.error = error || null
		this.data  = data || null
		this.message = checkStatusCode(this.statusCode, message)

		return this
	},

	success: (message, data) => {
		this.statusCode = 200
		this.error = false
		this.data  = data || null
		this.message  = message || 'OK'

		return this
	},

	badRequest: (message, data) => {
		this.statusCode = 400
		this.error = true
		this.data  = data || null
		this.message  = message || 'Bad Request'

		return this
	},

	
	unAuthorized: (message, data) => {
		this.statusCode = 401
		this.error = true
		this.data  = data || null
		this.message  = message || 'Unauth­orized'

		return this
	},

	forbidden: (message, data) => {
		this.statusCode = 403
		this.error = true
		this.data  = data || null
		this.message  = message || 'Forbidden'

		return this
	},

	notFound: (message, data) => {
		this.statusCode = 404
		this.error = true
		this.data  = data || null
		this.message  = message || 'Not Found'

		return this
	},

	notAllowed: (message, data) => {
		this.statusCode = 405
		this.error = true
		this.data  = data || null
		this.message  = message || 'Method Not Allowed'

		return this
	},

	requestTimeout: (message, data) => {
		this.statusCode = 408
		this.error = true
		this.data  = data || null
		this.message  = message || 'Request Timeout'

		return this
	},

	internalError: (message, data) => {
		this.statusCode = 500
		this.error = true
		this.data  = data || null
		this.message  = message || 'Internal Server Error'

		return this
	},

	badGateway: (message, data) => {
		this.statusCode = 502
		this.error = true
		this.data  = data || null
		this.message  = message || 'Bad Gateway'

		return this
	},

	unavailable: (message, data) => {
		this.statusCode = 503
		this.error = true
		this.data  = data || null
		this.message  = message || 'Service Unavai­lable'

		return this
	},

	gatewayTimeout: (message, data) => {
		this.statusCode = 504
		this.error = true
		this.data  = data || null
		this.message  = message || 'Gateway Timeout'

		return this
	}

}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_flags__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_flags___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_flags__);
var divContainerStyle={border:'gray',borderRight:'2px',display:'flex',alignItems:'center',borderRadius:'25px'};var spanStyle={display:'block',textColor:'dark',fontWeight:'bold'};var CountryCard=function CountryCard(props){var _ref=props.country||{},_ref$cca=_ref.cca2,code2=_ref$cca===undefined?'':_ref$cca,_ref$region=_ref.region,region=_ref$region===undefined?null:_ref$region,_ref$name=_ref.name,name=_ref$name===undefined?{}:_ref$name;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'col-sm-6 col-md-4 country-card'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{style:divContainerStyle,className:'country-card-container'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'h-100 position-relative border-gray border-right px-2 bg-white rounded-left'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_flags___default.a,{country:code2,format:'png',pngSize:64,basePath:'./img/flags',className:'d-block h-100'})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div',{className:'px-3'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{style:spanStyle,className:'country-name d-block'},name.common),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'country-region text-secondary text-uppercase'},region))));};/* harmony default export */ __webpack_exports__["a"] = (CountryCard);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(0));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-flags"] = factory(require("react"));
	else
		root["react-flags"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _flagsJson5 = __webpack_require__(13);

	var _flagsJson52 = _interopRequireDefault(_flagsJson5);

	var _lodashCollectionFind = __webpack_require__(14);

	var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

	var _filterLoaderCca2Cca3WorldCountriesCountriesJson = __webpack_require__(63);

	var _filterLoaderCca2Cca3WorldCountriesCountriesJson2 = _interopRequireDefault(_filterLoaderCca2Cca3WorldCountriesCountriesJson);

	var Flag = (function (_React$Component) {
	  _inherits(Flag, _React$Component);

	  function Flag() {
	    _classCallCheck(this, Flag);

	    _get(Object.getPrototypeOf(Flag.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Flag, [{
	    key: 'cca3To2',

	    /**
	     * React properties
	     */

	    /**
	     * React lifecycle
	     */

	    // Get information about a country using the alpha-3 ISO code.
	    value: function cca3To2(cca3) {
	      var country = (0, _lodashCollectionFind2['default'])(_filterLoaderCca2Cca3WorldCountriesCountriesJson2['default'], { cca3: cca3 });
	      return country ? country.cca2 : '_unknown';
	    }

	    /**
	     * React render
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var country = this.props.name ? this.props.name : this.props.country;

	      country = country.length === 3 ? this.cca3To2(country) : country;

	      var type = this.props.shiny ? 'shiny' : 'flat';

	      var folder = this.props.format === 'icns' || this.props.format === 'ico' ? this.props.format : this.props.pngSize;

	      var altText = this.props.alt ? this.props.alt : country;

	      var file = country.charAt(0) === '_' ? country : country.toUpperCase();

	      var flag = ~_flagsJson52['default'].flags.indexOf(file) ? file : '_unknown';

	      return _react2['default'].createElement('img', {
	        alt: altText,
	        src: this.props.basePath + '/flags-iso/' + type + '/' + folder + '/' + flag + '.' + this.props.format,
	        className: this.props.className,
	        width: this.props.width,
	        height: this.props.height
	      });
	    }
	  }]);

	  return Flag;
	})(_react2['default'].Component);

	Flag.propTypes = {
	  // Alternative text of the flag <img> HTML tag.
	  alt: _propTypes2['default'].string,

	  // Base path to the content of /vendor
	  basePath: _propTypes2['default'].string,

	  // Country or region for this flag. (Legacy)
	  country: _propTypes2['default'].string,

	  // File format of the flag.
	  format: _propTypes2['default'].oneOf(['png', 'icns', 'ico']),

	  // Height of the flag <img> HTML tag.
	  height: _propTypes2['default'].number,

	  // Image className
	  className: _propTypes2['default'].string,

	  // Name of country or region for this flag. (Legacy)
	  name: _propTypes2['default'].string,

	  // Size of the PNG country flag
	  pngSize: _propTypes2['default'].oneOf([16, 24, 32, 48, 64]),

	  // Shiny or Flat
	  shiny: _propTypes2['default'].bool,

	  // Width of the flag <img> HTML tag.
	  width: _propTypes2['default'].number
	};

	Flag.defaultProps = function () {
	  return {
	    basePath: '/img/flags',

	    country: '_unknown',

	    name: null,

	    format: 'png',

	    pngSize: 32,

	    shiny: false,

	    className: '',

	    width: null,

	    height: null,

	    alt: null
	  };
	};

	exports['default'] = Flag;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(5)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(12)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(8);
	var assign = __webpack_require__(9);

	var ReactPropTypesSecret = __webpack_require__(10);
	var checkPropTypes = __webpack_require__(11);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(7);
	  var warning = __webpack_require__(8);
	  var ReactPropTypesSecret = __webpack_require__(10);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var ReactPropTypesSecret = __webpack_require__(10);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = {
		"flags": [
			"_abkhazia",
			"_basque-country",
			"_british-antarctic-territory",
			"_commonwealth",
			"_england",
			"_gosquared",
			"_kosovo",
			"_mars",
			"_nagorno-karabakh",
			"_nato",
			"_northern-cyprus",
			"_olympics",
			"_red-cross",
			"_scotland",
			"_somaliland",
			"_south-ossetia",
			"_united-nations",
			"_unknown",
			"_wales",
			"AD",
			"AE",
			"AF",
			"AG",
			"AI",
			"AL",
			"AM",
			"AN",
			"AO",
			"AQ",
			"AR",
			"AS",
			"AT",
			"AU",
			"AW",
			"AX",
			"AZ",
			"BA",
			"BB",
			"BD",
			"BE",
			"BF",
			"BG",
			"BH",
			"BI",
			"BJ",
			"BL",
			"BM",
			"BN",
			"BO",
			"BR",
			"BS",
			"BT",
			"BW",
			"BY",
			"BZ",
			"CA",
			"CC",
			"CD",
			"CF",
			"CG",
			"CH",
			"CI",
			"CK",
			"CL",
			"CM",
			"CN",
			"CO",
			"CR",
			"CU",
			"CV",
			"CW",
			"CX",
			"CY",
			"CZ",
			"DE",
			"DJ",
			"DK",
			"DM",
			"DO",
			"DZ",
			"EC",
			"EE",
			"EG",
			"EH",
			"ER",
			"ES",
			"ET",
			"EU",
			"FI",
			"FJ",
			"FK",
			"FM",
			"FO",
			"FR",
			"GA",
			"GB",
			"GD",
			"GE",
			"GG",
			"GH",
			"GI",
			"GL",
			"GM",
			"GN",
			"GQ",
			"GR",
			"GS",
			"GT",
			"GU",
			"GW",
			"GY",
			"HK",
			"HN",
			"HR",
			"HT",
			"HU",
			"IC",
			"ID",
			"IE",
			"IL",
			"IM",
			"IN",
			"IQ",
			"IR",
			"IS",
			"IT",
			"JE",
			"JM",
			"JO",
			"JP",
			"KE",
			"KG",
			"KH",
			"KI",
			"KM",
			"KN",
			"KP",
			"KR",
			"KW",
			"KY",
			"KZ",
			"LA",
			"LB",
			"LC",
			"LI",
			"LK",
			"LR",
			"LS",
			"LT",
			"LU",
			"LV",
			"LY",
			"MA",
			"MC",
			"MD",
			"ME",
			"MF",
			"MG",
			"MH",
			"MK",
			"ML",
			"MM",
			"MN",
			"MO",
			"MP",
			"MQ",
			"MR",
			"MS",
			"MT",
			"MU",
			"MV",
			"MW",
			"MX",
			"MY",
			"MZ",
			"NA",
			"NC",
			"NE",
			"NF",
			"NG",
			"NI",
			"NL",
			"NO",
			"NP",
			"NR",
			"NU",
			"NZ",
			"OM",
			"PA",
			"PE",
			"PF",
			"PG",
			"PH",
			"PK",
			"PL",
			"PN",
			"PR",
			"PS",
			"PT",
			"PW",
			"PY",
			"QA",
			"RO",
			"RS",
			"RU",
			"RW",
			"SA",
			"SB",
			"SC",
			"SD",
			"SE",
			"SG",
			"SH",
			"SI",
			"SK",
			"SL",
			"SM",
			"SN",
			"SO",
			"SR",
			"SS",
			"ST",
			"SV",
			"SY",
			"SZ",
			"TC",
			"TD",
			"TF",
			"TG",
			"TH",
			"TJ",
			"TK",
			"TL",
			"TM",
			"TN",
			"TO",
			"TR",
			"TT",
			"TV",
			"TW",
			"TZ",
			"UA",
			"UG",
			"US",
			"UY",
			"UZ",
			"VA",
			"VC",
			"VE",
			"VG",
			"VI",
			"VN",
			"VU",
			"WF",
			"WS",
			"YE",
			"YT",
			"ZA",
			"ZM",
			"ZW"
		]
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(15),
	    createFind = __webpack_require__(36);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	 * invoked with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias detect
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.result(_.find(users, function(chr) {
	 *   return chr.age < 40;
	 * }), 'user');
	 * // => 'barney'
	 *
	 * // using the `_.matches` callback shorthand
	 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	 * // => 'pebbles'
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.result(_.find(users, 'active', false), 'user');
	 * // => 'fred'
	 *
	 * // using the `_.property` callback shorthand
	 * _.result(_.find(users, 'active'), 'user');
	 * // => 'barney'
	 */
	var find = createFind(baseEach);

	module.exports = find;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(16),
	    createBaseEach = __webpack_require__(35);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(17),
	    keys = __webpack_require__(21);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(18);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(19);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    isArrayLike = __webpack_require__(26),
	    isObject = __webpack_require__(20),
	    shimKeys = __webpack_require__(30);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(23);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(24),
	    isObjectLike = __webpack_require__(25);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(27),
	    isLength = __webpack_require__(29);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(28);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(32),
	    isIndex = __webpack_require__(33),
	    isLength = __webpack_require__(29),
	    keysIn = __webpack_require__(34);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(26),
	    isObjectLike = __webpack_require__(25);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(22),
	    isLength = __webpack_require__(29),
	    isObjectLike = __webpack_require__(25);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(31),
	    isArray = __webpack_require__(32),
	    isIndex = __webpack_require__(33),
	    isLength = __webpack_require__(29),
	    isObject = __webpack_require__(20);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(27),
	    isLength = __webpack_require__(29),
	    toObject = __webpack_require__(19);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	var baseCallback = __webpack_require__(37),
	    baseFind = __webpack_require__(61),
	    baseFindIndex = __webpack_require__(62),
	    isArray = __webpack_require__(32);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(eachFunc, fromRight) {
	  return function(collection, predicate, thisArg) {
	    predicate = baseCallback(predicate, thisArg, 3);
	    if (isArray(collection)) {
	      var index = baseFindIndex(collection, predicate, fromRight);
	      return index > -1 ? collection[index] : undefined;
	    }
	    return baseFind(collection, predicate, eachFunc);
	  };
	}

	module.exports = createFind;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(38),
	    baseMatchesProperty = __webpack_require__(50),
	    bindCallback = __webpack_require__(57),
	    identity = __webpack_require__(58),
	    property = __webpack_require__(59);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(39),
	    getMatchData = __webpack_require__(47),
	    toObject = __webpack_require__(19);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(40),
	    toObject = __webpack_require__(19);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(41),
	    isObject = __webpack_require__(20),
	    isObjectLike = __webpack_require__(25);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(42),
	    equalByTag = __webpack_require__(44),
	    equalObjects = __webpack_require__(45),
	    isArray = __webpack_require__(32),
	    isTypedArray = __webpack_require__(46);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(43);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(21);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(29),
	    isObjectLike = __webpack_require__(25);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(48),
	    pairs = __webpack_require__(49);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(21),
	    toObject = __webpack_require__(19);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(51),
	    baseIsEqual = __webpack_require__(40),
	    baseSlice = __webpack_require__(52),
	    isArray = __webpack_require__(32),
	    isKey = __webpack_require__(53),
	    isStrictComparable = __webpack_require__(48),
	    last = __webpack_require__(54),
	    toObject = __webpack_require__(19),
	    toPath = __webpack_require__(55);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(19);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(32),
	    toObject = __webpack_require__(19);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(56),
	    isArray = __webpack_require__(32);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(58);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(28),
	    basePropertyDeep = __webpack_require__(60),
	    isKey = __webpack_require__(53);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(51),
	    toPath = __webpack_require__(55);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	 * without support for callback shorthands and `this` binding, which iterates
	 * over `collection` using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element
	 *  instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for callback shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = [{"cca2":"AW","cca3":"ABW"},{"cca2":"AF","cca3":"AFG"},{"cca2":"AO","cca3":"AGO"},{"cca2":"AI","cca3":"AIA"},{"cca2":"AX","cca3":"ALA"},{"cca2":"AL","cca3":"ALB"},{"cca2":"AD","cca3":"AND"},{"cca2":"AE","cca3":"ARE"},{"cca2":"AR","cca3":"ARG"},{"cca2":"AM","cca3":"ARM"},{"cca2":"AS","cca3":"ASM"},{"cca2":"AQ","cca3":"ATA"},{"cca2":"TF","cca3":"ATF"},{"cca2":"AG","cca3":"ATG"},{"cca2":"AU","cca3":"AUS"},{"cca2":"AT","cca3":"AUT"},{"cca2":"AZ","cca3":"AZE"},{"cca2":"BI","cca3":"BDI"},{"cca2":"BE","cca3":"BEL"},{"cca2":"BJ","cca3":"BEN"},{"cca2":"BF","cca3":"BFA"},{"cca2":"BD","cca3":"BGD"},{"cca2":"BG","cca3":"BGR"},{"cca2":"BH","cca3":"BHR"},{"cca2":"BS","cca3":"BHS"},{"cca2":"BA","cca3":"BIH"},{"cca2":"BL","cca3":"BLM"},{"cca2":"BY","cca3":"BLR"},{"cca2":"BZ","cca3":"BLZ"},{"cca2":"BM","cca3":"BMU"},{"cca2":"BO","cca3":"BOL"},{"cca2":"BR","cca3":"BRA"},{"cca2":"BB","cca3":"BRB"},{"cca2":"BN","cca3":"BRN"},{"cca2":"BT","cca3":"BTN"},{"cca2":"BV","cca3":"BVT"},{"cca2":"BW","cca3":"BWA"},{"cca2":"CF","cca3":"CAF"},{"cca2":"CA","cca3":"CAN"},{"cca2":"CC","cca3":"CCK"},{"cca2":"CH","cca3":"CHE"},{"cca2":"CL","cca3":"CHL"},{"cca2":"CN","cca3":"CHN"},{"cca2":"CI","cca3":"CIV"},{"cca2":"CM","cca3":"CMR"},{"cca2":"CD","cca3":"COD"},{"cca2":"CG","cca3":"COG"},{"cca2":"CK","cca3":"COK"},{"cca2":"CO","cca3":"COL"},{"cca2":"KM","cca3":"COM"},{"cca2":"CV","cca3":"CPV"},{"cca2":"CR","cca3":"CRI"},{"cca2":"CU","cca3":"CUB"},{"cca2":"CW","cca3":"CUW"},{"cca2":"CX","cca3":"CXR"},{"cca2":"KY","cca3":"CYM"},{"cca2":"CY","cca3":"CYP"},{"cca2":"CZ","cca3":"CZE"},{"cca2":"DE","cca3":"DEU"},{"cca2":"DJ","cca3":"DJI"},{"cca2":"DM","cca3":"DMA"},{"cca2":"DK","cca3":"DNK"},{"cca2":"DO","cca3":"DOM"},{"cca2":"DZ","cca3":"DZA"},{"cca2":"EC","cca3":"ECU"},{"cca2":"EG","cca3":"EGY"},{"cca2":"ER","cca3":"ERI"},{"cca2":"EH","cca3":"ESH"},{"cca2":"ES","cca3":"ESP"},{"cca2":"EE","cca3":"EST"},{"cca2":"ET","cca3":"ETH"},{"cca2":"FI","cca3":"FIN"},{"cca2":"FJ","cca3":"FJI"},{"cca2":"FK","cca3":"FLK"},{"cca2":"FR","cca3":"FRA"},{"cca2":"FO","cca3":"FRO"},{"cca2":"FM","cca3":"FSM"},{"cca2":"GA","cca3":"GAB"},{"cca2":"GB","cca3":"GBR"},{"cca2":"GE","cca3":"GEO"},{"cca2":"GG","cca3":"GGY"},{"cca2":"GH","cca3":"GHA"},{"cca2":"GI","cca3":"GIB"},{"cca2":"GN","cca3":"GIN"},{"cca2":"GP","cca3":"GLP"},{"cca2":"GM","cca3":"GMB"},{"cca2":"GW","cca3":"GNB"},{"cca2":"GQ","cca3":"GNQ"},{"cca2":"GR","cca3":"GRC"},{"cca2":"GD","cca3":"GRD"},{"cca2":"GL","cca3":"GRL"},{"cca2":"GT","cca3":"GTM"},{"cca2":"GF","cca3":"GUF"},{"cca2":"GU","cca3":"GUM"},{"cca2":"GY","cca3":"GUY"},{"cca2":"HK","cca3":"HKG"},{"cca2":"HM","cca3":"HMD"},{"cca2":"HN","cca3":"HND"},{"cca2":"HR","cca3":"HRV"},{"cca2":"HT","cca3":"HTI"},{"cca2":"HU","cca3":"HUN"},{"cca2":"ID","cca3":"IDN"},{"cca2":"IM","cca3":"IMN"},{"cca2":"IN","cca3":"IND"},{"cca2":"IO","cca3":"IOT"},{"cca2":"IE","cca3":"IRL"},{"cca2":"IR","cca3":"IRN"},{"cca2":"IQ","cca3":"IRQ"},{"cca2":"IS","cca3":"ISL"},{"cca2":"IL","cca3":"ISR"},{"cca2":"IT","cca3":"ITA"},{"cca2":"JM","cca3":"JAM"},{"cca2":"JE","cca3":"JEY"},{"cca2":"JO","cca3":"JOR"},{"cca2":"JP","cca3":"JPN"},{"cca2":"KZ","cca3":"KAZ"},{"cca2":"KE","cca3":"KEN"},{"cca2":"KG","cca3":"KGZ"},{"cca2":"KH","cca3":"KHM"},{"cca2":"KI","cca3":"KIR"},{"cca2":"KN","cca3":"KNA"},{"cca2":"KR","cca3":"KOR"},{"cca2":"XK","cca3":"UNK"},{"cca2":"KW","cca3":"KWT"},{"cca2":"LA","cca3":"LAO"},{"cca2":"LB","cca3":"LBN"},{"cca2":"LR","cca3":"LBR"},{"cca2":"LY","cca3":"LBY"},{"cca2":"LC","cca3":"LCA"},{"cca2":"LI","cca3":"LIE"},{"cca2":"LK","cca3":"LKA"},{"cca2":"LS","cca3":"LSO"},{"cca2":"LT","cca3":"LTU"},{"cca2":"LU","cca3":"LUX"},{"cca2":"LV","cca3":"LVA"},{"cca2":"MO","cca3":"MAC"},{"cca2":"MF","cca3":"MAF"},{"cca2":"MA","cca3":"MAR"},{"cca2":"MC","cca3":"MCO"},{"cca2":"MD","cca3":"MDA"},{"cca2":"MG","cca3":"MDG"},{"cca2":"MV","cca3":"MDV"},{"cca2":"MX","cca3":"MEX"},{"cca2":"MH","cca3":"MHL"},{"cca2":"MK","cca3":"MKD"},{"cca2":"ML","cca3":"MLI"},{"cca2":"MT","cca3":"MLT"},{"cca2":"MM","cca3":"MMR"},{"cca2":"ME","cca3":"MNE"},{"cca2":"MN","cca3":"MNG"},{"cca2":"MP","cca3":"MNP"},{"cca2":"MZ","cca3":"MOZ"},{"cca2":"MR","cca3":"MRT"},{"cca2":"MS","cca3":"MSR"},{"cca2":"MQ","cca3":"MTQ"},{"cca2":"MU","cca3":"MUS"},{"cca2":"MW","cca3":"MWI"},{"cca2":"MY","cca3":"MYS"},{"cca2":"YT","cca3":"MYT"},{"cca2":"NA","cca3":"NAM"},{"cca2":"NC","cca3":"NCL"},{"cca2":"NE","cca3":"NER"},{"cca2":"NF","cca3":"NFK"},{"cca2":"NG","cca3":"NGA"},{"cca2":"NI","cca3":"NIC"},{"cca2":"NU","cca3":"NIU"},{"cca2":"NL","cca3":"NLD"},{"cca2":"NO","cca3":"NOR"},{"cca2":"NP","cca3":"NPL"},{"cca2":"NR","cca3":"NRU"},{"cca2":"NZ","cca3":"NZL"},{"cca2":"OM","cca3":"OMN"},{"cca2":"PK","cca3":"PAK"},{"cca2":"PA","cca3":"PAN"},{"cca2":"PN","cca3":"PCN"},{"cca2":"PE","cca3":"PER"},{"cca2":"PH","cca3":"PHL"},{"cca2":"PW","cca3":"PLW"},{"cca2":"PG","cca3":"PNG"},{"cca2":"PL","cca3":"POL"},{"cca2":"PR","cca3":"PRI"},{"cca2":"KP","cca3":"PRK"},{"cca2":"PT","cca3":"PRT"},{"cca2":"PY","cca3":"PRY"},{"cca2":"PS","cca3":"PSE"},{"cca2":"PF","cca3":"PYF"},{"cca2":"QA","cca3":"QAT"},{"cca2":"RE","cca3":"REU"},{"cca2":"RO","cca3":"ROU"},{"cca2":"RU","cca3":"RUS"},{"cca2":"RW","cca3":"RWA"},{"cca2":"SA","cca3":"SAU"},{"cca2":"SD","cca3":"SDN"},{"cca2":"SN","cca3":"SEN"},{"cca2":"SG","cca3":"SGP"},{"cca2":"GS","cca3":"SGS"},{"cca2":"SJ","cca3":"SJM"},{"cca2":"SB","cca3":"SLB"},{"cca2":"SL","cca3":"SLE"},{"cca2":"SV","cca3":"SLV"},{"cca2":"SM","cca3":"SMR"},{"cca2":"SO","cca3":"SOM"},{"cca2":"PM","cca3":"SPM"},{"cca2":"RS","cca3":"SRB"},{"cca2":"SS","cca3":"SSD"},{"cca2":"ST","cca3":"STP"},{"cca2":"SR","cca3":"SUR"},{"cca2":"SK","cca3":"SVK"},{"cca2":"SI","cca3":"SVN"},{"cca2":"SE","cca3":"SWE"},{"cca2":"SZ","cca3":"SWZ"},{"cca2":"SX","cca3":"SXM"},{"cca2":"SC","cca3":"SYC"},{"cca2":"SY","cca3":"SYR"},{"cca2":"TC","cca3":"TCA"},{"cca2":"TD","cca3":"TCD"},{"cca2":"TG","cca3":"TGO"},{"cca2":"TH","cca3":"THA"},{"cca2":"TJ","cca3":"TJK"},{"cca2":"TK","cca3":"TKL"},{"cca2":"TM","cca3":"TKM"},{"cca2":"TL","cca3":"TLS"},{"cca2":"TO","cca3":"TON"},{"cca2":"TT","cca3":"TTO"},{"cca2":"TN","cca3":"TUN"},{"cca2":"TR","cca3":"TUR"},{"cca2":"TV","cca3":"TUV"},{"cca2":"TW","cca3":"TWN"},{"cca2":"TZ","cca3":"TZA"},{"cca2":"UG","cca3":"UGA"},{"cca2":"UA","cca3":"UKR"},{"cca2":"UM","cca3":"UMI"},{"cca2":"UY","cca3":"URY"},{"cca2":"US","cca3":"USA"},{"cca2":"UZ","cca3":"UZB"},{"cca2":"VA","cca3":"VAT"},{"cca2":"VC","cca3":"VCT"},{"cca2":"VE","cca3":"VEN"},{"cca2":"VG","cca3":"VGB"},{"cca2":"VI","cca3":"VIR"},{"cca2":"VN","cca3":"VNM"},{"cca2":"VU","cca3":"VUT"},{"cca2":"WF","cca3":"WLF"},{"cca2":"WS","cca3":"WSM"},{"cca2":"YE","cca3":"YEM"},{"cca2":"ZA","cca3":"ZAF"},{"cca2":"ZM","cca3":"ZMB"},{"cca2":"ZW","cca3":"ZWE"}]

/***/ })
/******/ ])
});
;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var LEFT_PAGE='LEFT';var RIGHT_PAGE='RIGHT';var range=function range(from,to){var step=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1;var i=from;var range=[];while(i<=to){range.push(i);i+=step;}return range;};var Pagination=function(_Component){_inherits(Pagination,_Component);// Need to find a way to destructuring without using constructor (who isn't needed)
function Pagination(props){_classCallCheck(this,Pagination);var _this=_possibleConstructorReturn(this,(Pagination.__proto__||Object.getPrototypeOf(Pagination)).call(this,props));_initialiseProps.call(_this);var _props$totalRecords=props.totalRecords,totalRecords=_props$totalRecords===undefined?null:_props$totalRecords,_props$pageLimit=props.pageLimit,pageLimit=_props$pageLimit===undefined?30:_props$pageLimit,_props$pageNeighbours=props.pageNeighbours,pageNeighbours=_props$pageNeighbours===undefined?0:_props$pageNeighbours;_this.pageLimit=typeof pageLimit==='number'?pageLimit:30;_this.totalRecords=typeof totalRecords==='number'?totalRecords:0;_this.pageNeighbours=typeof pageNeighbours==='number'?Math.max(0,Math.min(pageNeighbours,2)):0;_this.totalPages=Math.ceil(_this.totalRecords/_this.pageLimit);_this.state={currentPage:1};return _this;}_createClass(Pagination,[{key:'componentDidMount',value:function componentDidMount(){this.goToPage(1);}},{key:'render',value:function render(){var _this2=this;if(!this.totalRecords||this.totalPages===1)return null;var currentPage=this.state.currentPage;var pages=this.fetchPageNumbers();return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react__["Fragment"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('nav',{'aria-label':'Countries Pagination'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('ul',{className:'pagination'},pages.map(function(page,index){if(page===LEFT_PAGE)return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{key:index,className:'page-item'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{className:'page-link',href:'#','aria-label':'Previous',onClick:_this2.handleMoveLeft},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{'aria-hidden':'true'},'\xAB'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'sr-only'},'Previous')));if(page===RIGHT_PAGE)return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{key:index,className:'page-item'},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{className:'page-link',href:'#','aria-label':'Next',onClick:_this2.handleMoveRight},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{'aria-hidden':'true'},'\xBB'),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span',{className:'sr-only'},'Next')));return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('li',{key:index,className:'page-item'+(currentPage===page?' active':'')},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a',{className:'page-link',href:'#',onClick:_this2.handleClick(page)},page));}))));}}]);return Pagination;}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);var _initialiseProps=function _initialiseProps(){var _this3=this;this.goToPage=function(page){var _props$onPageChanged=_this3.props.onPageChanged,onPageChanged=_props$onPageChanged===undefined?function(f){return f;}:_props$onPageChanged;var currentPage=Math.max(0,Math.min(page,_this3.totalPages));var paginationData={currentPage:currentPage,totalPages:_this3.totalPages,pageLimit:_this3.pageLimit,totalRecords:_this3.totalRecords};_this3.setState({currentPage:currentPage},function(){return onPageChanged(paginationData);});};this.handleClick=function(page){return function(evt){evt.preventDefault();_this3.goToPage(page);};};this.handleMoveLeft=function(evt){evt.preventDefault();_this3.goToPage(_this3.state.currentPage-_this3.pageNeighbours*2-1);};this.handleMoveRight=function(evt){evt.preventDefault();_this3.goToPage(_this3.state.currentPage+_this3.pageNeighbours*2+1);};this.fetchPageNumbers=function(){var totalPages=_this3.totalPages;var currentPage=_this3.state.currentPage;var pageNeighbours=_this3.pageNeighbours;var totalNumbers=_this3.pageNeighbours*2+3;var totalBlocks=totalNumbers+2;if(totalPages>totalBlocks){var startPage=Math.max(2,currentPage-pageNeighbours);var endPage=Math.min(totalPages-1,currentPage+pageNeighbours);var pages=range(startPage,endPage);var hasLeftSpill=startPage>2;var hasRightSpill=totalPages-endPage>1;var spillOffset=totalNumbers-(pages.length+1);switch(true){case hasLeftSpill&&!hasRightSpill:{var extraPages=range(startPage-spillOffset,startPage-1);pages=[LEFT_PAGE].concat(_toConsumableArray(extraPages),_toConsumableArray(pages));break;}case!hasLeftSpill&&hasRightSpill:{var _extraPages=range(endPage+1,endPage+spillOffset);pages=[].concat(_toConsumableArray(pages),_toConsumableArray(_extraPages),[RIGHT_PAGE]);break;}case hasLeftSpill&&hasRightSpill:default:{pages=[LEFT_PAGE].concat(_toConsumableArray(pages),[RIGHT_PAGE]);break;}}return[1].concat(_toConsumableArray(pages),[totalPages]);}return range(1,totalPages);};};/* harmony default export */ __webpack_exports__["a"] = (Pagination);;

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
/* unused harmony export unregister */
// In production, we register a service worker to serve assets from local cache.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.
// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.
var isLocalhost=Boolean(window.location.hostname==='localhost'||// [::1] is the IPv6 localhost address.
window.location.hostname==='[::1]'||// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(){if("production"==='production'&&'serviceWorker'in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("",window.location);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
return;}window.addEventListener('load',function(){var swUrl=""+'/service-worker.js';if(isLocalhost){// This is running on localhost. Lets check if a service worker still exists or not.
checkValidServiceWorker(swUrl);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log('This web app is being served cache-first by a service '+'worker. To learn more, visit https://goo.gl/SC7cgQ');});}else{// Is not local host. Just register service worker
registerValidSW(swUrl);}});}}function registerValidSW(swUrl){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;installingWorker.onstatechange=function(){if(installingWorker.state==='installed'){if(navigator.serviceWorker.controller){// At this point, the old content will have been purged and
// the fresh content will have been added to the cache.
// It's the perfect time to display a "New content is
// available; please refresh." message in your web app.
console.log('New content is available; please refresh.');}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log('Content is cached for offline use.');}}};};}).catch(function(error){console.error('Error during service worker registration:',error);});}function checkValidServiceWorker(swUrl){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
if(response.status===404||response.headers.get('content-type').indexOf('javascript')===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl);}}).catch(function(){console.log('No internet connection found. App is running in offline mode.');});}function unregister(){if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();});}}

/***/ })
/******/ ]);
//# sourceMappingURL=main.114b4ece.js.map