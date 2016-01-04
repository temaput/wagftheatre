/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************!*\
  !*** ./uifactory/main.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! ./styles/reset.scss */ 5);
	__webpack_require__(/*! ./styles/basic.scss */ 7);
	__webpack_require__(/*! ./styles/layout.scss */ 9);
	__webpack_require__(/*! ./styles/topmenu.scss */ 11);
	__webpack_require__(/*! ./styles/toparea.scss */ 13);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/*!*************************************!*\
  !*** ./uifactory/styles/reset.scss ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./reset.scss */ 6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./reset.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./reset.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./uifactory/styles/reset.scss ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*------------------------------------------------*/\n/*-----------------[RESET]------------------------*/\n/*------------------------------------------------*/\n/* http://meyerweb.com/eric/tools/css/reset/ */\n/* v1.0 | 20080212 */\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, font, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-size: 100%;\n  vertical-align: baseline;\n  background: transparent; }\n\nbody {\n  line-height: 1; }\n\nol, ul {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after, q:before, q:after {\n  content: '';\n  content: none; }\n\n/* remember to define focus styles! */\n:focus {\n  outline: 0; }\n\n/* remember to highlight inserts somehow! */\nins {\n  text-decoration: none; }\n\ndel {\n  text-decoration: line-through; }\n\n/* tables still need 'cellspacing=\"0\"' in the markup */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\narticle, aside, footer, header, hgroup, nav, section {\n  display: block; }\n", ""]);
	
	// exports


/***/ },
/* 7 */
/*!*************************************!*\
  !*** ./uifactory/styles/basic.scss ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./basic.scss */ 8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./basic.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./basic.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./uifactory/styles/basic.scss ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*------------------------------------------------*/\n/*-----------------[BASIC STYLES]-----------------*/\n/*------------------------------------------------*/\n/*------------------------------------------------*/\n/*-----------------[COLORS]------------------------*/\n/*------------------------------------------------*/\nhtml {\n  -webkit-font-smoothing: antialiased; }\n\nbody {\n  color: #959494;\n  background-color: #25383b;\n  font-weight: 300; }\n\nbody, input, textarea {\n  font-size: 16px; }\n\nbody, input, textarea {\n  font-family: 'Open Sans', Arial, sans-serif; }\n\n#top-area h1, .et-description h2, .et-home-testimonial blockquote p, .description h2, .alt-description h2, blockquote p, #comments, #reply-title, #footer-logo, #et-logo {\n  font-family: 'Raleway', Arial, sans-serif; }\n\nimg {\n  max-width: 100%;\n  height: auto; }\n\n#ie8 img {\n  width: auto; }\n\nembed, iframe, object, video {\n  max-width: 100%; }\n\na {\n  text-decoration: none;\n  color: #4bb6f5; }\n\na:hover {\n  text-decoration: underline; }\n\n.clear {\n  clear: both; }\n\n.ui-tabs-hide {\n  display: none; }\n\nbr.clear {\n  margin: 0px;\n  padding: 0px; }\n\nh1, h2, h3, h4, h5, h6 {\n  padding-bottom: 5px;\n  color: #333;\n  line-height: 1em;\n  font-weight: normal; }\n\nh1 a, h2 a, h3 a, h4 a, h5 a, h6 a {\n  color: inherit; }\n\nh1 {\n  font-size: 30px; }\n\nh2 {\n  font-size: 24px; }\n\nh3 {\n  font-size: 22px; }\n\nh4 {\n  font-size: 18px; }\n\nh5 {\n  font-size: 16px; }\n\nh6 {\n  font-size: 14px; }\n\np {\n  padding-bottom: 10px;\n  line-height: 28px; }\n\nstrong {\n  font-weight: bold;\n  color: #1c1c1c; }\n\ncite, em, i {\n  font-style: italic; }\n\npre, code {\n  font-family: Courier New, monospace;\n  margin-bottom: 10px; }\n\nins {\n  text-decoration: none; }\n\nsup, sub {\n  height: 0;\n  line-height: 1;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  bottom: 0.8em; }\n\nsub {\n  top: 0.3em; }\n\ndl {\n  margin: 0 0 1.5em 0; }\n\ndl dt {\n  font-weight: bold; }\n\ndd {\n  margin-left: 1.5em; }\n\nblockquote p {\n  padding-bottom: 0px; }\n\ninput[type=text], input.text, input.title, textarea, select {\n  background-color: #fff;\n  border: 1px solid #bbb;\n  padding: 2px;\n  color: #4e4e4e; }\n\ninput[type=text]:focus, input.text:focus, input.title:focus, textarea:focus, select:focus {\n  border-color: #2d3940;\n  color: #3e3e3e; }\n\ninput[type=text], input.text, input.title, textarea, select {\n  margin: 0.5em 0; }\n\ntextarea {\n  padding: 4px; }\n\nimg#about-image {\n  float: left;\n  margin: 3px 8px 8px 0px; }\n\n.container {\n  text-align: left;\n  margin: 0 auto;\n  width: 960px;\n  position: relative; }\n\n/*------------------------------------------------*/\n/*-----------------[TABLETS]-----------------*/\n/*------------------------------------------------*/\n@media only screen and (min-width: 768px) and (max-width: 960px) {\n  .container {\n    width: 728px; } }\n\n/*------------------------------------------------*/\n/*-----------------[PHONES]-----------------*/\n/*------------------------------------------------*/\n@media only screen and (max-width: 767px) {\n  .container {\n    width: 440px; } }\n\n@media only screen and (max-width: 479px) {\n  .container {\n    width: 280px; } }\n", ""]);
	
	// exports


/***/ },
/* 9 */
/*!**************************************!*\
  !*** ./uifactory/styles/layout.scss ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./layout.scss */ 10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./layout.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./layout.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/*!*********************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./uifactory/styles/layout.scss ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*------------------------------------------------*/\n/*-----------------[COLORS]------------------------*/\n/*------------------------------------------------*/\n.home-block {\n  padding-top: 115px;\n  background-color: #fff; }\n  .home-block:nth-of-type(2n) {\n    background-color: #fafafa;\n    border-top: 1px solid #e6e6e6;\n    border-bottom: 1px solid #e6e6e6;\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.03); }\n  .home-block header {\n    text-align: center;\n    margin-bottom: 53px; }\n    .home-block header h1 {\n      color: #333;\n      font-size: 24px;\n      font-weight: 800;\n      padding-bottom: 7px; }\n    .home-block header h2 {\n      font-size: 16px;\n      font-weight: 300;\n      color: #959494; }\n", ""]);
	
	// exports


/***/ },
/* 11 */
/*!***************************************!*\
  !*** ./uifactory/styles/topmenu.scss ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./topmenu.scss */ 12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./topmenu.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./topmenu.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/*!**********************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./uifactory/styles/topmenu.scss ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*------------------------------------------------*/\n/*-----------------[COLORS]------------------------*/\n/*------------------------------------------------*/\n#top-menu {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n  position: relative;\n  background: #25383b; }\n  #top-menu .mobile-top-menu {\n    display: none; }\n  #top-menu .container {\n    padding: 32px 0 0;\n    text-align: center; }\n    #top-menu .container:after {\n      visibility: hidden;\n      display: block;\n      font-size: 0;\n      content: \" \";\n      clear: both;\n      height: 0; }\n  #top-menu .menu-logo {\n    float: left;\n    margin-top: -15px; }\n    #top-menu .menu-logo img {\n      max-height: 40px; }\n  #top-menu nav > ul > li {\n    display: inline-block; }\n    #top-menu nav > ul > li a {\n      padding-bottom: 32px; }\n    #top-menu nav > ul > li.current-menu-item > a {\n      font-weight: 800; }\n  #top-menu a {\n    color: #fff;\n    text-decoration: none;\n    padding: 0 12px;\n    display: block; }\n    #top-menu a:hover {\n      color: rgba(255, 255, 255, 0.9); }\n\nbody.home .menu-logo {\n  display: none; }\n\n/*------------------------------------------------*/\n/*-----------------[TABLETS]-----------------*/\n/*------------------------------------------------*/\n@media only screen and (max-width: 767px) {\n  #top-menu .menu-logo {\n    float: none;\n    margin-bottom: 20px; }\n  #top-menu nav {\n    display: none; }\n  #top-menu .container {\n    padding-bottom: 32px; }\n  #top-menu .mobile-top-menu {\n    display: block; }\n  #top-menu .menu-container {\n    position: relative;\n    display: inline-block;\n    color: #fff;\n    cursor: pointer;\n    padding: 0 12px; }\n    #top-menu .menu-container > .menu-arrow {\n      display: block;\n      background: url(\"/static/images/mobile-arrow.png\") no-repeat;\n      width: 15px;\n      height: 10px;\n      position: absolute;\n      top: 5px;\n      right: -16px;\n      transition: all 0.5s ease-in-out; }\n    #top-menu .menu-container.opened > .menu-arrow {\n      transform: rotate(-180deg); }\n    #top-menu .menu-container .menu-nav {\n      position: absolute;\n      top: 46px;\n      left: -26px;\n      text-align: left; }\n      #top-menu .menu-container .menu-nav .menuItem {\n        display: block; }\n      #top-menu .menu-container .menu-nav .subMenu {\n        display: block !important;\n        visibility: visible !important; }\n        #top-menu .menu-container .menu-nav .subMenu a {\n          padding-left: 45px !important; }\n        #top-menu .menu-container .menu-nav .subMenu .subMenu a {\n          padding-left: 65px !important; } }\n\n/*------------------------------------------------*/\n/*-----------------[PHONES]-----------------*/\n/*------------------------------------------------*/\n@media only screen and (max-width: 479px) {\n  #top-menu nav {\n    display: none; } }\n", ""]);
	
	// exports


/***/ },
/* 13 */
/*!***************************************!*\
  !*** ./uifactory/styles/toparea.scss ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./toparea.scss */ 14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./toparea.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./toparea.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/*!**********************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./uifactory/styles/toparea.scss ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*------------------------------------------------*/\n/*-----------------[COLORS]------------------------*/\n/*------------------------------------------------*/\n#top-area {\n  background: center top / cover no-repeat fixed;\n  padding: 127px 0 68px; }\n  #top-area .container {\n    text-align: center; }\n    #top-area .container:after {\n      visibility: hidden;\n      display: block;\n      font-size: 0;\n      content: \" \";\n      clear: both;\n      height: 0; }\n  #top-area h1 {\n    margin-bottom: 21px;\n    font-weight: 100;\n    font-size: 100px;\n    color: #fff; }\n    #top-area h1 a {\n      text-decoration: none; }\n\n.tagline {\n  font-size: 24px;\n  color: #fff;\n  font-weight: 800;\n  text-transform: uppercase;\n  padding: 17px 32px 19px;\n  background-color: #c24c4c;\n  margin: 0 auto 60px;\n  display: block; }\n  .tagline a {\n    color: inherit; }\n    .tagline a:hover {\n      color: rgba(255, 255, 255, 0.9);\n      text-decoration: none; }\n\na.action-button {\n  border-radius: 6px;\n  padding: 25px 33px;\n  font-size: 30px;\n  color: #fff;\n  display: inline-block;\n  background-color: #25383b;\n  text-decoration: none; }\n  a.action-button:hover {\n    color: rgba(255, 255, 255, 0.9); }\n\nbody.home #top-area {\n  padding: 130px 0 141px; }\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map