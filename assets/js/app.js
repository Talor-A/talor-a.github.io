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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_resources/js/app.js":
/*!******************************!*\
  !*** ./_resources/js/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var themePreference = function themePreference() {
  var hasLocalStorage = localStorage.getItem('theme');
  var supports = false;
  var theme;

  if (hasLocalStorage === 'light') {
    theme = 'light';
  }

  if (hasLocalStorage === 'dark') {
    theme = 'dark';
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = hasLocalStorage || 'dark';
    supports = true;
  }

  ;

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    theme = hasLocalStorage || 'light';
    supports = true;
  }

  ;

  if (window.matchMedia("(prefers-color-scheme: no-preference)").matches) {
    theme = hasLocalStorage || 'none';
    supports = true;
  }

  ;
  return {
    supports: supports,
    theme: theme
  };
};

document.addEventListener('DOMContentLoaded', function (e) {
  console.clear();
  var userThemePreference = themePreference();
  var toggle = document.querySelector('.darkmode-toggle');
  var html = document.documentElement;

  var setTheme = function setTheme() {
    switch (userThemePreference.theme) {
      case 'dark':
        toggle.checked = true;
        html.classList.add('dark');
        html.classList.remove('light');
        break;

      case 'light':
        toggle.checked = false;
        html.classList.remove('dark');
        html.classList.add('light');
        break;
    }
  };

  setTheme(); // clearStorage.addEventListener('click', e => {
  //   localStorage.removeItem('theme')
  //   console.info('local storage cleared')
  // }, false)

  toggle.addEventListener('click', function (e) {
    console.log('toggle');

    if (toggle.checked) {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, false);
}, false);

/***/ }),

/***/ "./_resources/scss/app.scss":
/*!**********************************!*\
  !*** ./_resources/scss/app.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./_resources/js/app.js ./_resources/scss/app.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ta/code/jekyll-mix/_resources/js/app.js */"./_resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/ta/code/jekyll-mix/_resources/scss/app.scss */"./_resources/scss/app.scss");


/***/ })

/******/ });
//# sourceMappingURL=app.js.map