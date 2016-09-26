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
/*!*****************************!*\
  !*** ./js/gallery/index.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _photoswipe = __webpack_require__(/*! photoswipe */ 1);
	
	var _photoswipe2 = _interopRequireDefault(_photoswipe);
	
	var _photoswipeUiDefault = __webpack_require__(/*! photoswipe/dist/photoswipe-ui-default.js */ 2);
	
	var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);
	
	var _Gallery = __webpack_require__(/*! ./Gallery.js */ 3);
	
	var _Gallery2 = _interopRequireDefault(_Gallery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// eslint-disable-next-line no-unused-vars
	__webpack_require__(/*! ./gallery.scss */ 4); // eslint-disable-next-line no-unused-vars
	
	__webpack_require__(/*! ./photoswipe.scss */ 8);
	__webpack_require__(/*! ./photoswipe-default-skin/default-skin.scss */ 10);
	
	document.onreadystatechange = function () {
	  if (document.readyState === 'complete') {
	    _Gallery2.default.createGallery(_photoswipe2.default, _photoswipeUiDefault2.default);
	  }
	};

/***/ },
/* 1 */
/*!*****************************************!*\
  !*** ./~/photoswipe/dist/photoswipe.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! PhotoSwipe - v4.1.1 - 2015-12-24
	* http://photoswipe.com
	* Copyright (c) 2015 Dmitry Semenov; */
	(function (root, factory) { 
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.PhotoSwipe = factory();
		}
	})(this, function () {
	
		'use strict';
		var PhotoSwipe = function(template, UiClass, items, options){
	
	/*>>framework-bridge*/
	/**
	 *
	 * Set of generic functions used by gallery.
	 * 
	 * You're free to modify anything here as long as functionality is kept.
	 * 
	 */
	var framework = {
		features: null,
		bind: function(target, type, listener, unbind) {
			var methodName = (unbind ? 'remove' : 'add') + 'EventListener';
			type = type.split(' ');
			for(var i = 0; i < type.length; i++) {
				if(type[i]) {
					target[methodName]( type[i], listener, false);
				}
			}
		},
		isArray: function(obj) {
			return (obj instanceof Array);
		},
		createEl: function(classes, tag) {
			var el = document.createElement(tag || 'div');
			if(classes) {
				el.className = classes;
			}
			return el;
		},
		getScrollY: function() {
			var yOffset = window.pageYOffset;
			return yOffset !== undefined ? yOffset : document.documentElement.scrollTop;
		},
		unbind: function(target, type, listener) {
			framework.bind(target,type,listener,true);
		},
		removeClass: function(el, className) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
		},
		addClass: function(el, className) {
			if( !framework.hasClass(el,className) ) {
				el.className += (el.className ? ' ' : '') + className;
			}
		},
		hasClass: function(el, className) {
			return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
		},
		getChildByClass: function(parentEl, childClassName) {
			var node = parentEl.firstChild;
			while(node) {
				if( framework.hasClass(node, childClassName) ) {
					return node;
				}
				node = node.nextSibling;
			}
		},
		arraySearch: function(array, value, key) {
			var i = array.length;
			while(i--) {
				if(array[i][key] === value) {
					return i;
				} 
			}
			return -1;
		},
		extend: function(o1, o2, preventOverwrite) {
			for (var prop in o2) {
				if (o2.hasOwnProperty(prop)) {
					if(preventOverwrite && o1.hasOwnProperty(prop)) {
						continue;
					}
					o1[prop] = o2[prop];
				}
			}
		},
		easing: {
			sine: {
				out: function(k) {
					return Math.sin(k * (Math.PI / 2));
				},
				inOut: function(k) {
					return - (Math.cos(Math.PI * k) - 1) / 2;
				}
			},
			cubic: {
				out: function(k) {
					return --k * k * k + 1;
				}
			}
			/*
				elastic: {
					out: function ( k ) {
	
						var s, a = 0.1, p = 0.4;
						if ( k === 0 ) return 0;
						if ( k === 1 ) return 1;
						if ( !a || a < 1 ) { a = 1; s = p / 4; }
						else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
						return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );
	
					},
				},
				back: {
					out: function ( k ) {
						var s = 1.70158;
						return --k * k * ( ( s + 1 ) * k + s ) + 1;
					}
				}
			*/
		},
	
		/**
		 * 
		 * @return {object}
		 * 
		 * {
		 *  raf : request animation frame function
		 *  caf : cancel animation frame function
		 *  transfrom : transform property key (with vendor), or null if not supported
		 *  oldIE : IE8 or below
		 * }
		 * 
		 */
		detectFeatures: function() {
			if(framework.features) {
				return framework.features;
			}
			var helperEl = framework.createEl(),
				helperStyle = helperEl.style,
				vendor = '',
				features = {};
	
			// IE8 and below
			features.oldIE = document.all && !document.addEventListener;
	
			features.touch = 'ontouchstart' in window;
	
			if(window.requestAnimationFrame) {
				features.raf = window.requestAnimationFrame;
				features.caf = window.cancelAnimationFrame;
			}
	
			features.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled;
	
			// fix false-positive detection of old Android in new IE
			// (IE11 ua string contains "Android 4.0")
			
			if(!features.pointerEvent) { 
	
				var ua = navigator.userAgent;
	
				// Detect if device is iPhone or iPod and if it's older than iOS 8
				// http://stackoverflow.com/a/14223920
				// 
				// This detection is made because of buggy top/bottom toolbars
				// that don't trigger window.resize event.
				// For more info refer to _isFixedPosition variable in core.js
	
				if (/iP(hone|od)/.test(navigator.platform)) {
					var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
					if(v && v.length > 0) {
						v = parseInt(v[1], 10);
						if(v >= 1 && v < 8 ) {
							features.isOldIOSPhone = true;
						}
					}
				}
	
				// Detect old Android (before KitKat)
				// due to bugs related to position:fixed
				// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
				
				var match = ua.match(/Android\s([0-9\.]*)/);
				var androidversion =  match ? match[1] : 0;
				androidversion = parseFloat(androidversion);
				if(androidversion >= 1 ) {
					if(androidversion < 4.4) {
						features.isOldAndroid = true; // for fixed position bug & performance
					}
					features.androidVersion = androidversion; // for touchend bug
				}	
				features.isMobileOpera = /opera mini|opera mobi/i.test(ua);
	
				// p.s. yes, yes, UA sniffing is bad, propose your solution for above bugs.
			}
			
			var styleChecks = ['transform', 'perspective', 'animationName'],
				vendors = ['', 'webkit','Moz','ms','O'],
				styleCheckItem,
				styleName;
	
			for(var i = 0; i < 4; i++) {
				vendor = vendors[i];
	
				for(var a = 0; a < 3; a++) {
					styleCheckItem = styleChecks[a];
	
					// uppercase first letter of property name, if vendor is present
					styleName = vendor + (vendor ? 
											styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : 
											styleCheckItem);
				
					if(!features[styleCheckItem] && styleName in helperStyle ) {
						features[styleCheckItem] = styleName;
					}
				}
	
				if(vendor && !features.raf) {
					vendor = vendor.toLowerCase();
					features.raf = window[vendor+'RequestAnimationFrame'];
					if(features.raf) {
						features.caf = window[vendor+'CancelAnimationFrame'] || 
										window[vendor+'CancelRequestAnimationFrame'];
					}
				}
			}
				
			if(!features.raf) {
				var lastTime = 0;
				features.raf = function(fn) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { fn(currTime + timeToCall); }, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
				features.caf = function(id) { clearTimeout(id); };
			}
	
			// Detect SVG support
			features.svg = !!document.createElementNS && 
							!!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
	
			framework.features = features;
	
			return features;
		}
	};
	
	framework.detectFeatures();
	
	// Override addEventListener for old versions of IE
	if(framework.features.oldIE) {
	
		framework.bind = function(target, type, listener, unbind) {
			
			type = type.split(' ');
	
			var methodName = (unbind ? 'detach' : 'attach') + 'Event',
				evName,
				_handleEv = function() {
					listener.handleEvent.call(listener);
				};
	
			for(var i = 0; i < type.length; i++) {
				evName = type[i];
				if(evName) {
	
					if(typeof listener === 'object' && listener.handleEvent) {
						if(!unbind) {
							listener['oldIE' + evName] = _handleEv;
						} else {
							if(!listener['oldIE' + evName]) {
								return false;
							}
						}
	
						target[methodName]( 'on' + evName, listener['oldIE' + evName]);
					} else {
						target[methodName]( 'on' + evName, listener);
					}
	
				}
			}
		};
		
	}
	
	/*>>framework-bridge*/
	
	/*>>core*/
	//function(template, UiClass, items, options)
	
	var self = this;
	
	/**
	 * Static vars, don't change unless you know what you're doing.
	 */
	var DOUBLE_TAP_RADIUS = 25, 
		NUM_HOLDERS = 3;
	
	/**
	 * Options
	 */
	var _options = {
		allowPanToNext:true,
		spacing: 0.12,
		bgOpacity: 1,
		mouseUsed: false,
		loop: true,
		pinchToClose: true,
		closeOnScroll: true,
		closeOnVerticalDrag: true,
		verticalDragRange: 0.75,
		hideAnimationDuration: 333,
		showAnimationDuration: 333,
		showHideOpacity: false,
		focus: true,
		escKey: true,
		arrowKeys: true,
		mainScrollEndFriction: 0.35,
		panEndFriction: 0.35,
		isClickableElement: function(el) {
	        return el.tagName === 'A';
	    },
	    getDoubleTapZoom: function(isMouseClick, item) {
	    	if(isMouseClick) {
	    		return 1;
	    	} else {
	    		return item.initialZoomLevel < 0.7 ? 1 : 1.33;
	    	}
	    },
	    maxSpreadZoom: 1.33,
		modal: true,
	
		// not fully implemented yet
		scaleMode: 'fit' // TODO
	};
	framework.extend(_options, options);
	
	
	/**
	 * Private helper variables & functions
	 */
	
	var _getEmptyPoint = function() { 
			return {x:0,y:0}; 
		};
	
	var _isOpen,
		_isDestroying,
		_closedByScroll,
		_currentItemIndex,
		_containerStyle,
		_containerShiftIndex,
		_currPanDist = _getEmptyPoint(),
		_startPanOffset = _getEmptyPoint(),
		_panOffset = _getEmptyPoint(),
		_upMoveEvents, // drag move, drag end & drag cancel events array
		_downEvents, // drag start events array
		_globalEventHandlers,
		_viewportSize = {},
		_currZoomLevel,
		_startZoomLevel,
		_translatePrefix,
		_translateSufix,
		_updateSizeInterval,
		_itemsNeedUpdate,
		_currPositionIndex = 0,
		_offset = {},
		_slideSize = _getEmptyPoint(), // size of slide area, including spacing
		_itemHolders,
		_prevItemIndex,
		_indexDiff = 0, // difference of indexes since last content update
		_dragStartEvent,
		_dragMoveEvent,
		_dragEndEvent,
		_dragCancelEvent,
		_transformKey,
		_pointerEventEnabled,
		_isFixedPosition = true,
		_likelyTouchDevice,
		_modules = [],
		_requestAF,
		_cancelAF,
		_initalClassName,
		_initalWindowScrollY,
		_oldIE,
		_currentWindowScrollY,
		_features,
		_windowVisibleSize = {},
		_renderMaxResolution = false,
	
		// Registers PhotoSWipe module (History, Controller ...)
		_registerModule = function(name, module) {
			framework.extend(self, module.publicMethods);
			_modules.push(name);
		},
	
		_getLoopedId = function(index) {
			var numSlides = _getNumItems();
			if(index > numSlides - 1) {
				return index - numSlides;
			} else  if(index < 0) {
				return numSlides + index;
			}
			return index;
		},
		
		// Micro bind/trigger
		_listeners = {},
		_listen = function(name, fn) {
			if(!_listeners[name]) {
				_listeners[name] = [];
			}
			return _listeners[name].push(fn);
		},
		_shout = function(name) {
			var listeners = _listeners[name];
	
			if(listeners) {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
	
				for(var i = 0; i < listeners.length; i++) {
					listeners[i].apply(self, args);
				}
			}
		},
	
		_getCurrentTime = function() {
			return new Date().getTime();
		},
		_applyBgOpacity = function(opacity) {
			_bgOpacity = opacity;
			self.bg.style.opacity = opacity * _options.bgOpacity;
		},
	
		_applyZoomTransform = function(styleObj,x,y,zoom,item) {
			if(!_renderMaxResolution || (item && item !== self.currItem) ) {
				zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);	
			}
				
			styleObj[_transformKey] = _translatePrefix + x + 'px, ' + y + 'px' + _translateSufix + ' scale(' + zoom + ')';
		},
		_applyCurrentZoomPan = function( allowRenderResolution ) {
			if(_currZoomElementStyle) {
	
				if(allowRenderResolution) {
					if(_currZoomLevel > self.currItem.fitRatio) {
						if(!_renderMaxResolution) {
							_setImageSize(self.currItem, false, true);
							_renderMaxResolution = true;
						}
					} else {
						if(_renderMaxResolution) {
							_setImageSize(self.currItem);
							_renderMaxResolution = false;
						}
					}
				}
				
	
				_applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
			}
		},
		_applyZoomPanToItem = function(item) {
			if(item.container) {
	
				_applyZoomTransform(item.container.style, 
									item.initialPosition.x, 
									item.initialPosition.y, 
									item.initialZoomLevel,
									item);
			}
		},
		_setTranslateX = function(x, elStyle) {
			elStyle[_transformKey] = _translatePrefix + x + 'px, 0px' + _translateSufix;
		},
		_moveMainScroll = function(x, dragging) {
	
			if(!_options.loop && dragging) {
				var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x,
					delta = Math.round(x - _mainScrollPos.x);
	
				if( (newSlideIndexOffset < 0 && delta > 0) || 
					(newSlideIndexOffset >= _getNumItems() - 1 && delta < 0) ) {
					x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
				} 
			}
			
			_mainScrollPos.x = x;
			_setTranslateX(x, _containerStyle);
		},
		_calculatePanOffset = function(axis, zoomLevel) {
			var m = _midZoomPoint[axis] - _offset[axis];
			return _startPanOffset[axis] + _currPanDist[axis] + m - m * ( zoomLevel / _startZoomLevel );
		},
		
		_equalizePoints = function(p1, p2) {
			p1.x = p2.x;
			p1.y = p2.y;
			if(p2.id) {
				p1.id = p2.id;
			}
		},
		_roundPoint = function(p) {
			p.x = Math.round(p.x);
			p.y = Math.round(p.y);
		},
	
		_mouseMoveTimeout = null,
		_onFirstMouseMove = function() {
			// Wait until mouse move event is fired at least twice during 100ms
			// We do this, because some mobile browsers trigger it on touchstart
			if(_mouseMoveTimeout ) { 
				framework.unbind(document, 'mousemove', _onFirstMouseMove);
				framework.addClass(template, 'pswp--has_mouse');
				_options.mouseUsed = true;
				_shout('mouseUsed');
			}
			_mouseMoveTimeout = setTimeout(function() {
				_mouseMoveTimeout = null;
			}, 100);
		},
	
		_bindEvents = function() {
			framework.bind(document, 'keydown', self);
	
			if(_features.transform) {
				// don't bind click event in browsers that don't support transform (mostly IE8)
				framework.bind(self.scrollWrap, 'click', self);
			}
			
	
			if(!_options.mouseUsed) {
				framework.bind(document, 'mousemove', _onFirstMouseMove);
			}
	
			framework.bind(window, 'resize scroll', self);
	
			_shout('bindEvents');
		},
	
		_unbindEvents = function() {
			framework.unbind(window, 'resize', self);
			framework.unbind(window, 'scroll', _globalEventHandlers.scroll);
			framework.unbind(document, 'keydown', self);
			framework.unbind(document, 'mousemove', _onFirstMouseMove);
	
			if(_features.transform) {
				framework.unbind(self.scrollWrap, 'click', self);
			}
	
			if(_isDragging) {
				framework.unbind(window, _upMoveEvents, self);
			}
	
			_shout('unbindEvents');
		},
		
		_calculatePanBounds = function(zoomLevel, update) {
			var bounds = _calculateItemSize( self.currItem, _viewportSize, zoomLevel );
			if(update) {
				_currPanBounds = bounds;
			}
			return bounds;
		},
		
		_getMinZoomLevel = function(item) {
			if(!item) {
				item = self.currItem;
			}
			return item.initialZoomLevel;
		},
		_getMaxZoomLevel = function(item) {
			if(!item) {
				item = self.currItem;
			}
			return item.w > 0 ? _options.maxSpreadZoom : 1;
		},
	
		// Return true if offset is out of the bounds
		_modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
			if(destZoomLevel === self.currItem.initialZoomLevel) {
				destPanOffset[axis] = self.currItem.initialPosition[axis];
				return true;
			} else {
				destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel); 
	
				if(destPanOffset[axis] > destPanBounds.min[axis]) {
					destPanOffset[axis] = destPanBounds.min[axis];
					return true;
				} else if(destPanOffset[axis] < destPanBounds.max[axis] ) {
					destPanOffset[axis] = destPanBounds.max[axis];
					return true;
				}
			}
			return false;
		},
	
		_setupTransforms = function() {
	
			if(_transformKey) {
				// setup 3d transforms
				var allow3dTransform = _features.perspective && !_likelyTouchDevice;
				_translatePrefix = 'translate' + (allow3dTransform ? '3d(' : '(');
				_translateSufix = _features.perspective ? ', 0px)' : ')';	
				return;
			}
	
			// Override zoom/pan/move functions in case old browser is used (most likely IE)
			// (so they use left/top/width/height, instead of CSS transform)
		
			_transformKey = 'left';
			framework.addClass(template, 'pswp--ie');
	
			_setTranslateX = function(x, elStyle) {
				elStyle.left = x + 'px';
			};
			_applyZoomPanToItem = function(item) {
	
				var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
					s = item.container.style,
					w = zoomRatio * item.w,
					h = zoomRatio * item.h;
	
				s.width = w + 'px';
				s.height = h + 'px';
				s.left = item.initialPosition.x + 'px';
				s.top = item.initialPosition.y + 'px';
	
			};
			_applyCurrentZoomPan = function() {
				if(_currZoomElementStyle) {
	
					var s = _currZoomElementStyle,
						item = self.currItem,
						zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
						w = zoomRatio * item.w,
						h = zoomRatio * item.h;
	
					s.width = w + 'px';
					s.height = h + 'px';
	
	
					s.left = _panOffset.x + 'px';
					s.top = _panOffset.y + 'px';
				}
				
			};
		},
	
		_onKeyDown = function(e) {
			var keydownAction = '';
			if(_options.escKey && e.keyCode === 27) { 
				keydownAction = 'close';
			} else if(_options.arrowKeys) {
				if(e.keyCode === 37) {
					keydownAction = 'prev';
				} else if(e.keyCode === 39) { 
					keydownAction = 'next';
				}
			}
	
			if(keydownAction) {
				// don't do anything if special key pressed to prevent from overriding default browser actions
				// e.g. in Chrome on Mac cmd+arrow-left returns to previous page
				if( !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey ) {
					if(e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					} 
					self[keydownAction]();
				}
			}
		},
	
		_onGlobalClick = function(e) {
			if(!e) {
				return;
			}
	
			// don't allow click event to pass through when triggering after drag or some other gesture
			if(_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
	
		_updatePageScrollOffset = function() {
			self.setScrollOffset(0, framework.getScrollY());		
		};
		
	
	
		
	
	
	
	// Micro animation engine
	var _animations = {},
		_numAnimations = 0,
		_stopAnimation = function(name) {
			if(_animations[name]) {
				if(_animations[name].raf) {
					_cancelAF( _animations[name].raf );
				}
				_numAnimations--;
				delete _animations[name];
			}
		},
		_registerStartAnimation = function(name) {
			if(_animations[name]) {
				_stopAnimation(name);
			}
			if(!_animations[name]) {
				_numAnimations++;
				_animations[name] = {};
			}
		},
		_stopAllAnimations = function() {
			for (var prop in _animations) {
	
				if( _animations.hasOwnProperty( prop ) ) {
					_stopAnimation(prop);
				} 
				
			}
		},
		_animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
			var startAnimTime = _getCurrentTime(), t;
			_registerStartAnimation(name);
	
			var animloop = function(){
				if ( _animations[name] ) {
					
					t = _getCurrentTime() - startAnimTime; // time diff
					//b - beginning (start prop)
					//d - anim duration
	
					if ( t >= d ) {
						_stopAnimation(name);
						onUpdate(endProp);
						if(onComplete) {
							onComplete();
						}
						return;
					}
					onUpdate( (endProp - b) * easingFn(t/d) + b );
	
					_animations[name].raf = _requestAF(animloop);
				}
			};
			animloop();
		};
		
	
	
	var publicMethods = {
	
		// make a few local variables and functions public
		shout: _shout,
		listen: _listen,
		viewportSize: _viewportSize,
		options: _options,
	
		isMainScrollAnimating: function() {
			return _mainScrollAnimating;
		},
		getZoomLevel: function() {
			return _currZoomLevel;
		},
		getCurrentIndex: function() {
			return _currentItemIndex;
		},
		isDragging: function() {
			return _isDragging;
		},	
		isZooming: function() {
			return _isZooming;
		},
		setScrollOffset: function(x,y) {
			_offset.x = x;
			_currentWindowScrollY = _offset.y = y;
			_shout('updateScrollOffset', _offset);
		},
		applyZoomPan: function(zoomLevel,panX,panY,allowRenderResolution) {
			_panOffset.x = panX;
			_panOffset.y = panY;
			_currZoomLevel = zoomLevel;
			_applyCurrentZoomPan( allowRenderResolution );
		},
	
		init: function() {
	
			if(_isOpen || _isDestroying) {
				return;
			}
	
			var i;
	
			self.framework = framework; // basic functionality
			self.template = template; // root DOM element of PhotoSwipe
			self.bg = framework.getChildByClass(template, 'pswp__bg');
	
			_initalClassName = template.className;
			_isOpen = true;
					
			_features = framework.detectFeatures();
			_requestAF = _features.raf;
			_cancelAF = _features.caf;
			_transformKey = _features.transform;
			_oldIE = _features.oldIE;
			
			self.scrollWrap = framework.getChildByClass(template, 'pswp__scroll-wrap');
			self.container = framework.getChildByClass(self.scrollWrap, 'pswp__container');
	
			_containerStyle = self.container.style; // for fast access
	
			// Objects that hold slides (there are only 3 in DOM)
			self.itemHolders = _itemHolders = [
				{el:self.container.children[0] , wrap:0, index: -1},
				{el:self.container.children[1] , wrap:0, index: -1},
				{el:self.container.children[2] , wrap:0, index: -1}
			];
	
			// hide nearby item holders until initial zoom animation finishes (to avoid extra Paints)
			_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'none';
	
			_setupTransforms();
	
			// Setup global events
			_globalEventHandlers = {
				resize: self.updateSize,
				scroll: _updatePageScrollOffset,
				keydown: _onKeyDown,
				click: _onGlobalClick
			};
	
			// disable show/hide effects on old browsers that don't support CSS animations or transforms, 
			// old IOS, Android and Opera mobile. Blackberry seems to work fine, even older models.
			var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
			if(!_features.animationName || !_features.transform || oldPhone) {
				_options.showAnimationDuration = _options.hideAnimationDuration = 0;
			}
	
			// init modules
			for(i = 0; i < _modules.length; i++) {
				self['init' + _modules[i]]();
			}
			
			// init
			if(UiClass) {
				var ui = self.ui = new UiClass(self, framework);
				ui.init();
			}
	
			_shout('firstUpdate');
			_currentItemIndex = _currentItemIndex || _options.index || 0;
			// validate index
			if( isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems() ) {
				_currentItemIndex = 0;
			}
			self.currItem = _getItemAt( _currentItemIndex );
	
			
			if(_features.isOldIOSPhone || _features.isOldAndroid) {
				_isFixedPosition = false;
			}
			
			template.setAttribute('aria-hidden', 'false');
			if(_options.modal) {
				if(!_isFixedPosition) {
					template.style.position = 'absolute';
					template.style.top = framework.getScrollY() + 'px';
				} else {
					template.style.position = 'fixed';
				}
			}
	
			if(_currentWindowScrollY === undefined) {
				_shout('initialLayout');
				_currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
			}
			
			// add classes to root element of PhotoSwipe
			var rootClasses = 'pswp--open ';
			if(_options.mainClass) {
				rootClasses += _options.mainClass + ' ';
			}
			if(_options.showHideOpacity) {
				rootClasses += 'pswp--animate_opacity ';
			}
			rootClasses += _likelyTouchDevice ? 'pswp--touch' : 'pswp--notouch';
			rootClasses += _features.animationName ? ' pswp--css_animation' : '';
			rootClasses += _features.svg ? ' pswp--svg' : '';
			framework.addClass(template, rootClasses);
	
			self.updateSize();
	
			// initial update
			_containerShiftIndex = -1;
			_indexDiff = null;
			for(i = 0; i < NUM_HOLDERS; i++) {
				_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
			}
	
			if(!_oldIE) {
				framework.bind(self.scrollWrap, _downEvents, self); // no dragging for old IE
			}	
	
			_listen('initialZoomInEnd', function() {
				self.setContent(_itemHolders[0], _currentItemIndex-1);
				self.setContent(_itemHolders[2], _currentItemIndex+1);
	
				_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'block';
	
				if(_options.focus) {
					// focus causes layout, 
					// which causes lag during the animation, 
					// that's why we delay it untill the initial zoom transition ends
					template.focus();
				}
				 
	
				_bindEvents();
			});
	
			// set content for center slide (first time)
			self.setContent(_itemHolders[1], _currentItemIndex);
			
			self.updateCurrItem();
	
			_shout('afterInit');
	
			if(!_isFixedPosition) {
	
				// On all versions of iOS lower than 8.0, we check size of viewport every second.
				// 
				// This is done to detect when Safari top & bottom bars appear, 
				// as this action doesn't trigger any events (like resize). 
				// 
				// On iOS8 they fixed this.
				// 
				// 10 Nov 2014: iOS 7 usage ~40%. iOS 8 usage 56%.
				
				_updateSizeInterval = setInterval(function() {
					if(!_numAnimations && !_isDragging && !_isZooming && (_currZoomLevel === self.currItem.initialZoomLevel)  ) {
						self.updateSize();
					}
				}, 1000);
			}
	
			framework.addClass(template, 'pswp--visible');
		},
	
		// Close the gallery, then destroy it
		close: function() {
			if(!_isOpen) {
				return;
			}
	
			_isOpen = false;
			_isDestroying = true;
			_shout('close');
			_unbindEvents();
	
			_showOrHide(self.currItem, null, true, self.destroy);
		},
	
		// destroys the gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
		destroy: function() {
			_shout('destroy');
	
			if(_showOrHideTimeout) {
				clearTimeout(_showOrHideTimeout);
			}
			
			template.setAttribute('aria-hidden', 'true');
			template.className = _initalClassName;
	
			if(_updateSizeInterval) {
				clearInterval(_updateSizeInterval);
			}
	
			framework.unbind(self.scrollWrap, _downEvents, self);
	
			// we unbind scroll event at the end, as closing animation may depend on it
			framework.unbind(window, 'scroll', self);
	
			_stopDragUpdateLoop();
	
			_stopAllAnimations();
	
			_listeners = null;
		},
	
		/**
		 * Pan image to position
		 * @param {Number} x     
		 * @param {Number} y     
		 * @param {Boolean} force Will ignore bounds if set to true.
		 */
		panTo: function(x,y,force) {
			if(!force) {
				if(x > _currPanBounds.min.x) {
					x = _currPanBounds.min.x;
				} else if(x < _currPanBounds.max.x) {
					x = _currPanBounds.max.x;
				}
	
				if(y > _currPanBounds.min.y) {
					y = _currPanBounds.min.y;
				} else if(y < _currPanBounds.max.y) {
					y = _currPanBounds.max.y;
				}
			}
			
			_panOffset.x = x;
			_panOffset.y = y;
			_applyCurrentZoomPan();
		},
		
		handleEvent: function (e) {
			e = e || window.event;
			if(_globalEventHandlers[e.type]) {
				_globalEventHandlers[e.type](e);
			}
		},
	
	
		goTo: function(index) {
	
			index = _getLoopedId(index);
	
			var diff = index - _currentItemIndex;
			_indexDiff = diff;
	
			_currentItemIndex = index;
			self.currItem = _getItemAt( _currentItemIndex );
			_currPositionIndex -= diff;
			
			_moveMainScroll(_slideSize.x * _currPositionIndex);
			
	
			_stopAllAnimations();
			_mainScrollAnimating = false;
	
			self.updateCurrItem();
		},
		next: function() {
			self.goTo( _currentItemIndex + 1);
		},
		prev: function() {
			self.goTo( _currentItemIndex - 1);
		},
	
		// update current zoom/pan objects
		updateCurrZoomItem: function(emulateSetContent) {
			if(emulateSetContent) {
				_shout('beforeChange', 0);
			}
	
			// itemHolder[1] is middle (current) item
			if(_itemHolders[1].el.children.length) {
				var zoomElement = _itemHolders[1].el.children[0];
				if( framework.hasClass(zoomElement, 'pswp__zoom-wrap') ) {
					_currZoomElementStyle = zoomElement.style;
				} else {
					_currZoomElementStyle = null;
				}
			} else {
				_currZoomElementStyle = null;
			}
			
			_currPanBounds = self.currItem.bounds;	
			_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
	
			_panOffset.x = _currPanBounds.center.x;
			_panOffset.y = _currPanBounds.center.y;
	
			if(emulateSetContent) {
				_shout('afterChange');
			}
		},
	
	
		invalidateCurrItems: function() {
			_itemsNeedUpdate = true;
			for(var i = 0; i < NUM_HOLDERS; i++) {
				if( _itemHolders[i].item ) {
					_itemHolders[i].item.needsUpdate = true;
				}
			}
		},
	
		updateCurrItem: function(beforeAnimation) {
	
			if(_indexDiff === 0) {
				return;
			}
	
			var diffAbs = Math.abs(_indexDiff),
				tempHolder;
	
			if(beforeAnimation && diffAbs < 2) {
				return;
			}
	
	
			self.currItem = _getItemAt( _currentItemIndex );
			_renderMaxResolution = false;
			
			_shout('beforeChange', _indexDiff);
	
			if(diffAbs >= NUM_HOLDERS) {
				_containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
				diffAbs = NUM_HOLDERS;
			}
			for(var i = 0; i < diffAbs; i++) {
				if(_indexDiff > 0) {
					tempHolder = _itemHolders.shift();
					_itemHolders[NUM_HOLDERS-1] = tempHolder; // move first to last
	
					_containerShiftIndex++;
					_setTranslateX( (_containerShiftIndex+2) * _slideSize.x, tempHolder.el.style);
					self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
				} else {
					tempHolder = _itemHolders.pop();
					_itemHolders.unshift( tempHolder ); // move last to first
	
					_containerShiftIndex--;
					_setTranslateX( _containerShiftIndex * _slideSize.x, tempHolder.el.style);
					self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
				}
				
			}
	
			// reset zoom/pan on previous item
			if(_currZoomElementStyle && Math.abs(_indexDiff) === 1) {
	
				var prevItem = _getItemAt(_prevItemIndex);
				if(prevItem.initialZoomLevel !== _currZoomLevel) {
					_calculateItemSize(prevItem , _viewportSize );
					_setImageSize(prevItem);
					_applyZoomPanToItem( prevItem ); 				
				}
	
			}
	
			// reset diff after update
			_indexDiff = 0;
	
			self.updateCurrZoomItem();
	
			_prevItemIndex = _currentItemIndex;
	
			_shout('afterChange');
			
		},
	
	
	
		updateSize: function(force) {
			
			if(!_isFixedPosition && _options.modal) {
				var windowScrollY = framework.getScrollY();
				if(_currentWindowScrollY !== windowScrollY) {
					template.style.top = windowScrollY + 'px';
					_currentWindowScrollY = windowScrollY;
				}
				if(!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
					return;
				}
				_windowVisibleSize.x = window.innerWidth;
				_windowVisibleSize.y = window.innerHeight;
	
				//template.style.width = _windowVisibleSize.x + 'px';
				template.style.height = _windowVisibleSize.y + 'px';
			}
	
	
	
			_viewportSize.x = self.scrollWrap.clientWidth;
			_viewportSize.y = self.scrollWrap.clientHeight;
	
			_updatePageScrollOffset();
	
			_slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
			_slideSize.y = _viewportSize.y;
	
			_moveMainScroll(_slideSize.x * _currPositionIndex);
	
			_shout('beforeResize'); // even may be used for example to switch image sources
	
	
			// don't re-calculate size on inital size update
			if(_containerShiftIndex !== undefined) {
	
				var holder,
					item,
					hIndex;
	
				for(var i = 0; i < NUM_HOLDERS; i++) {
					holder = _itemHolders[i];
					_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, holder.el.style);
	
					hIndex = _currentItemIndex+i-1;
	
					if(_options.loop && _getNumItems() > 2) {
						hIndex = _getLoopedId(hIndex);
					}
	
					// update zoom level on items and refresh source (if needsUpdate)
					item = _getItemAt( hIndex );
	
					// re-render gallery item if `needsUpdate`,
					// or doesn't have `bounds` (entirely new slide object)
					if( item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds) ) {
	
						self.cleanSlide( item );
						
						self.setContent( holder, hIndex );
	
						// if "center" slide
						if(i === 1) {
							self.currItem = item;
							self.updateCurrZoomItem(true);
						}
	
						item.needsUpdate = false;
	
					} else if(holder.index === -1 && hIndex >= 0) {
						// add content first time
						self.setContent( holder, hIndex );
					}
					if(item && item.container) {
						_calculateItemSize(item, _viewportSize);
						_setImageSize(item);
						_applyZoomPanToItem( item );
					}
					
				}
				_itemsNeedUpdate = false;
			}	
	
			_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
			_currPanBounds = self.currItem.bounds;
	
			if(_currPanBounds) {
				_panOffset.x = _currPanBounds.center.x;
				_panOffset.y = _currPanBounds.center.y;
				_applyCurrentZoomPan( true );
			}
			
			_shout('resize');
		},
		
		// Zoom current item to
		zoomTo: function(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
			/*
				if(destZoomLevel === 'fit') {
					destZoomLevel = self.currItem.fitRatio;
				} else if(destZoomLevel === 'fill') {
					destZoomLevel = self.currItem.fillRatio;
				}
			*/
	
			if(centerPoint) {
				_startZoomLevel = _currZoomLevel;
				_midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x ;
				_midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y ;
				_equalizePoints(_startPanOffset, _panOffset);
			}
	
			var destPanBounds = _calculatePanBounds(destZoomLevel, false),
				destPanOffset = {};
	
			_modifyDestPanOffset('x', destPanBounds, destPanOffset, destZoomLevel);
			_modifyDestPanOffset('y', destPanBounds, destPanOffset, destZoomLevel);
	
			var initialZoomLevel = _currZoomLevel;
			var initialPanOffset = {
				x: _panOffset.x,
				y: _panOffset.y
			};
	
			_roundPoint(destPanOffset);
	
			var onUpdate = function(now) {
				if(now === 1) {
					_currZoomLevel = destZoomLevel;
					_panOffset.x = destPanOffset.x;
					_panOffset.y = destPanOffset.y;
				} else {
					_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
					_panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
					_panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
				}
	
				if(updateFn) {
					updateFn(now);
				}
	
				_applyCurrentZoomPan( now === 1 );
			};
	
			if(speed) {
				_animateProp('customZoomTo', 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
			} else {
				onUpdate(1);
			}
		}
	
	
	};
	
	
	/*>>core*/
	
	/*>>gestures*/
	/**
	 * Mouse/touch/pointer event handlers.
	 * 
	 * separated from @core.js for readability
	 */
	
	var MIN_SWIPE_DISTANCE = 30,
		DIRECTION_CHECK_OFFSET = 10; // amount of pixels to drag to determine direction of swipe
	
	var _gestureStartTime,
		_gestureCheckSpeedTime,
	
		// pool of objects that are used during dragging of zooming
		p = {}, // first point
		p2 = {}, // second point (for zoom gesture)
		delta = {},
		_currPoint = {},
		_startPoint = {},
		_currPointers = [],
		_startMainScrollPos = {},
		_releaseAnimData,
		_posPoints = [], // array of points during dragging, used to determine type of gesture
		_tempPoint = {},
	
		_isZoomingIn,
		_verticalDragInitiated,
		_oldAndroidTouchEndTimeout,
		_currZoomedItemIndex = 0,
		_centerPoint = _getEmptyPoint(),
		_lastReleaseTime = 0,
		_isDragging, // at least one pointer is down
		_isMultitouch, // at least two _pointers are down
		_zoomStarted, // zoom level changed during zoom gesture
		_moved,
		_dragAnimFrame,
		_mainScrollShifted,
		_currentPoints, // array of current touch points
		_isZooming,
		_currPointsDistance,
		_startPointsDistance,
		_currPanBounds,
		_mainScrollPos = _getEmptyPoint(),
		_currZoomElementStyle,
		_mainScrollAnimating, // true, if animation after swipe gesture is running
		_midZoomPoint = _getEmptyPoint(),
		_currCenterPoint = _getEmptyPoint(),
		_direction,
		_isFirstMove,
		_opacityChanged,
		_bgOpacity,
		_wasOverInitialZoom,
	
		_isEqualPoints = function(p1, p2) {
			return p1.x === p2.x && p1.y === p2.y;
		},
		_isNearbyPoints = function(touch0, touch1) {
			return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
		},
		_calculatePointsDistance = function(p1, p2) {
			_tempPoint.x = Math.abs( p1.x - p2.x );
			_tempPoint.y = Math.abs( p1.y - p2.y );
			return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
		},
		_stopDragUpdateLoop = function() {
			if(_dragAnimFrame) {
				_cancelAF(_dragAnimFrame);
				_dragAnimFrame = null;
			}
		},
		_dragUpdateLoop = function() {
			if(_isDragging) {
				_dragAnimFrame = _requestAF(_dragUpdateLoop);
				_renderMovement();
			}
		},
		_canPan = function() {
			return !(_options.scaleMode === 'fit' && _currZoomLevel ===  self.currItem.initialZoomLevel);
		},
		
		// find the closest parent DOM element
		_closestElement = function(el, fn) {
		  	if(!el || el === document) {
		  		return false;
		  	}
	
		  	// don't search elements above pswp__scroll-wrap
		  	if(el.getAttribute('class') && el.getAttribute('class').indexOf('pswp__scroll-wrap') > -1 ) {
		  		return false;
		  	}
	
		  	if( fn(el) ) {
		  		return el;
		  	}
	
		  	return _closestElement(el.parentNode, fn);
		},
	
		_preventObj = {},
		_preventDefaultEventBehaviour = function(e, isDown) {
		    _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);
	
			_shout('preventDragEvent', e, isDown, _preventObj);
			return _preventObj.prevent;
	
		},
		_convertTouchToPoint = function(touch, p) {
			p.x = touch.pageX;
			p.y = touch.pageY;
			p.id = touch.identifier;
			return p;
		},
		_findCenterOfPoints = function(p1, p2, pCenter) {
			pCenter.x = (p1.x + p2.x) * 0.5;
			pCenter.y = (p1.y + p2.y) * 0.5;
		},
		_pushPosPoint = function(time, x, y) {
			if(time - _gestureCheckSpeedTime > 50) {
				var o = _posPoints.length > 2 ? _posPoints.shift() : {};
				o.x = x;
				o.y = y; 
				_posPoints.push(o);
				_gestureCheckSpeedTime = time;
			}
		},
	
		_calculateVerticalDragOpacityRatio = function() {
			var yOffset = _panOffset.y - self.currItem.initialPosition.y; // difference between initial and current position
			return 1 -  Math.abs( yOffset / (_viewportSize.y / 2)  );
		},
	
		
		// points pool, reused during touch events
		_ePoint1 = {},
		_ePoint2 = {},
		_tempPointsArr = [],
		_tempCounter,
		_getTouchPoints = function(e) {
			// clean up previous points, without recreating array
			while(_tempPointsArr.length > 0) {
				_tempPointsArr.pop();
			}
	
			if(!_pointerEventEnabled) {
				if(e.type.indexOf('touch') > -1) {
	
					if(e.touches && e.touches.length > 0) {
						_tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
						if(e.touches.length > 1) {
							_tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
						}
					}
					
				} else {
					_ePoint1.x = e.pageX;
					_ePoint1.y = e.pageY;
					_ePoint1.id = '';
					_tempPointsArr[0] = _ePoint1;//_ePoint1;
				}
			} else {
				_tempCounter = 0;
				// we can use forEach, as pointer events are supported only in modern browsers
				_currPointers.forEach(function(p) {
					if(_tempCounter === 0) {
						_tempPointsArr[0] = p;
					} else if(_tempCounter === 1) {
						_tempPointsArr[1] = p;
					}
					_tempCounter++;
	
				});
			}
			return _tempPointsArr;
		},
	
		_panOrMoveMainScroll = function(axis, delta) {
	
			var panFriction,
				overDiff = 0,
				newOffset = _panOffset[axis] + delta[axis],
				startOverDiff,
				dir = delta[axis] > 0,
				newMainScrollPosition = _mainScrollPos.x + delta.x,
				mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x,
				newPanPos,
				newMainScrollPos;
	
			// calculate fdistance over the bounds and friction
			if(newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
				panFriction = _options.panEndFriction;
				// Linear increasing of friction, so at 1/4 of viewport it's at max value. 
				// Looks not as nice as was expected. Left for history.
				// panFriction = (1 - (_panOffset[axis] + delta[axis] + panBounds.min[axis]) / (_viewportSize[axis] / 4) );
			} else {
				panFriction = 1;
			}
			
			newOffset = _panOffset[axis] + delta[axis] * panFriction;
	
			// move main scroll or start panning
			if(_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {
	
	
				if(!_currZoomElementStyle) {
					
					newMainScrollPos = newMainScrollPosition;
	
				} else if(_direction === 'h' && axis === 'x' && !_zoomStarted ) {
					
					if(dir) {
						if(newOffset > _currPanBounds.min[axis]) {
							panFriction = _options.panEndFriction;
							overDiff = _currPanBounds.min[axis] - newOffset;
							startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
						}
						
						// drag right
						if( (startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1 ) {
							newMainScrollPos = newMainScrollPosition;
							if(mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
								newMainScrollPos = _startMainScrollPos.x;
							}
						} else {
							if(_currPanBounds.min.x !== _currPanBounds.max.x) {
								newPanPos = newOffset;
							}
							
						}
	
					} else {
	
						if(newOffset < _currPanBounds.max[axis] ) {
							panFriction =_options.panEndFriction;
							overDiff = newOffset - _currPanBounds.max[axis];
							startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
						}
	
						if( (startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1 ) {
							newMainScrollPos = newMainScrollPosition;
	
							if(mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
								newMainScrollPos = _startMainScrollPos.x;
							}
	
						} else {
							if(_currPanBounds.min.x !== _currPanBounds.max.x) {
								newPanPos = newOffset;
							}
						}
	
					}
	
	
					//
				}
	
				if(axis === 'x') {
	
					if(newMainScrollPos !== undefined) {
						_moveMainScroll(newMainScrollPos, true);
						if(newMainScrollPos === _startMainScrollPos.x) {
							_mainScrollShifted = false;
						} else {
							_mainScrollShifted = true;
						}
					}
	
					if(_currPanBounds.min.x !== _currPanBounds.max.x) {
						if(newPanPos !== undefined) {
							_panOffset.x = newPanPos;
						} else if(!_mainScrollShifted) {
							_panOffset.x += delta.x * panFriction;
						}
					}
	
					return newMainScrollPos !== undefined;
				}
	
			}
	
			if(!_mainScrollAnimating) {
				
				if(!_mainScrollShifted) {
					if(_currZoomLevel > self.currItem.fitRatio) {
						_panOffset[axis] += delta[axis] * panFriction;
					
					}
				}
	
				
			}
			
		},
	
		// Pointerdown/touchstart/mousedown handler
		_onDragStart = function(e) {
	
			// Allow dragging only via left mouse button.
			// As this handler is not added in IE8 - we ignore e.which
			// 
			// http://www.quirksmode.org/js/events_properties.html
			// https://developer.mozilla.org/en-US/docs/Web/API/event.button
			if(e.type === 'mousedown' && e.button > 0  ) {
				return;
			}
	
			if(_initialZoomRunning) {
				e.preventDefault();
				return;
			}
	
			if(_oldAndroidTouchEndTimeout && e.type === 'mousedown') {
				return;
			}
	
			if(_preventDefaultEventBehaviour(e, true)) {
				e.preventDefault();
			}
	
	
	
			_shout('pointerDown');
	
			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				if(pointerIndex < 0) {
					pointerIndex = _currPointers.length;
				}
				_currPointers[pointerIndex] = {x:e.pageX, y:e.pageY, id: e.pointerId};
			}
			
	
	
			var startPointsList = _getTouchPoints(e),
				numPoints = startPointsList.length;
	
			_currentPoints = null;
	
			_stopAllAnimations();
	
			// init drag
			if(!_isDragging || numPoints === 1) {
	
				
	
				_isDragging = _isFirstMove = true;
				framework.bind(window, _upMoveEvents, self);
	
				_isZoomingIn = 
					_wasOverInitialZoom = 
					_opacityChanged = 
					_verticalDragInitiated = 
					_mainScrollShifted = 
					_moved = 
					_isMultitouch = 
					_zoomStarted = false;
	
				_direction = null;
	
				_shout('firstTouchStart', startPointsList);
	
				_equalizePoints(_startPanOffset, _panOffset);
	
				_currPanDist.x = _currPanDist.y = 0;
				_equalizePoints(_currPoint, startPointsList[0]);
				_equalizePoints(_startPoint, _currPoint);
	
				//_equalizePoints(_startMainScrollPos, _mainScrollPos);
				_startMainScrollPos.x = _slideSize.x * _currPositionIndex;
	
				_posPoints = [{
					x: _currPoint.x,
					y: _currPoint.y
				}];
	
				_gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();
	
				//_mainScrollAnimationEnd(true);
				_calculatePanBounds( _currZoomLevel, true );
				
				// Start rendering
				_stopDragUpdateLoop();
				_dragUpdateLoop();
				
			}
	
			// init zoom
			if(!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
				_startZoomLevel = _currZoomLevel;
				_zoomStarted = false; // true if zoom changed at least once
	
				_isZooming = _isMultitouch = true;
				_currPanDist.y = _currPanDist.x = 0;
	
				_equalizePoints(_startPanOffset, _panOffset);
	
				_equalizePoints(p, startPointsList[0]);
				_equalizePoints(p2, startPointsList[1]);
	
				_findCenterOfPoints(p, p2, _currCenterPoint);
	
				_midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
				_midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
				_currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
			}
	
	
		},
	
		// Pointermove/touchmove/mousemove handler
		_onDragMove = function(e) {
	
			e.preventDefault();
	
			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				if(pointerIndex > -1) {
					var p = _currPointers[pointerIndex];
					p.x = e.pageX;
					p.y = e.pageY; 
				}
			}
	
			if(_isDragging) {
				var touchesList = _getTouchPoints(e);
				if(!_direction && !_moved && !_isZooming) {
	
					if(_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
						// if main scroll position is shifted – direction is always horizontal
						_direction = 'h';
					} else {
						var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
						// check the direction of movement
						if(Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
							_direction = diff > 0 ? 'h' : 'v';
							_currentPoints = touchesList;
						}
					}
					
				} else {
					_currentPoints = touchesList;
				}
			}	
		},
		// 
		_renderMovement =  function() {
	
			if(!_currentPoints) {
				return;
			}
	
			var numPoints = _currentPoints.length;
	
			if(numPoints === 0) {
				return;
			}
	
			_equalizePoints(p, _currentPoints[0]);
	
			delta.x = p.x - _currPoint.x;
			delta.y = p.y - _currPoint.y;
	
			if(_isZooming && numPoints > 1) {
				// Handle behaviour for more than 1 point
	
				_currPoint.x = p.x;
				_currPoint.y = p.y;
			
				// check if one of two points changed
				if( !delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2) ) {
					return;
				}
	
				_equalizePoints(p2, _currentPoints[1]);
	
	
				if(!_zoomStarted) {
					_zoomStarted = true;
					_shout('zoomGestureStarted');
				}
				
				// Distance between two points
				var pointsDistance = _calculatePointsDistance(p,p2);
	
				var zoomLevel = _calculateZoomLevel(pointsDistance);
	
				// slightly over the of initial zoom level
				if(zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
					_wasOverInitialZoom = true;
				}
	
				// Apply the friction if zoom level is out of the bounds
				var zoomFriction = 1,
					minZoomLevel = _getMinZoomLevel(),
					maxZoomLevel = _getMaxZoomLevel();
	
				if ( zoomLevel < minZoomLevel ) {
					
					if(_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
						// fade out background if zooming out
						var minusDiff = minZoomLevel - zoomLevel;
						var percent = 1 - minusDiff / (minZoomLevel / 1.2);
	
						_applyBgOpacity(percent);
						_shout('onPinchClose', percent);
						_opacityChanged = true;
					} else {
						zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
						if(zoomFriction > 1) {
							zoomFriction = 1;
						}
						zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
					}
					
				} else if ( zoomLevel > maxZoomLevel ) {
					// 1.5 - extra zoom level above the max. E.g. if max is x6, real max 6 + 1.5 = 7.5
					zoomFriction = (zoomLevel - maxZoomLevel) / ( minZoomLevel * 6 );
					if(zoomFriction > 1) {
						zoomFriction = 1;
					}
					zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
				}
	
				if(zoomFriction < 0) {
					zoomFriction = 0;
				}
	
				// distance between touch points after friction is applied
				_currPointsDistance = pointsDistance;
	
				// _centerPoint - The point in the middle of two pointers
				_findCenterOfPoints(p, p2, _centerPoint);
			
				// paning with two pointers pressed
				_currPanDist.x += _centerPoint.x - _currCenterPoint.x;
				_currPanDist.y += _centerPoint.y - _currCenterPoint.y;
				_equalizePoints(_currCenterPoint, _centerPoint);
	
				_panOffset.x = _calculatePanOffset('x', zoomLevel);
				_panOffset.y = _calculatePanOffset('y', zoomLevel);
	
				_isZoomingIn = zoomLevel > _currZoomLevel;
				_currZoomLevel = zoomLevel;
				_applyCurrentZoomPan();
	
			} else {
	
				// handle behaviour for one point (dragging or panning)
	
				if(!_direction) {
					return;
				}
	
				if(_isFirstMove) {
					_isFirstMove = false;
	
					// subtract drag distance that was used during the detection direction  
	
					if( Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
						delta.x -= _currentPoints[0].x - _startPoint.x;
					}
					
					if( Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
						delta.y -= _currentPoints[0].y - _startPoint.y;
					}
				}
	
				_currPoint.x = p.x;
				_currPoint.y = p.y;
	
				// do nothing if pointers position hasn't changed
				if(delta.x === 0 && delta.y === 0) {
					return;
				}
	
				if(_direction === 'v' && _options.closeOnVerticalDrag) {
					if(!_canPan()) {
						_currPanDist.y += delta.y;
						_panOffset.y += delta.y;
	
						var opacityRatio = _calculateVerticalDragOpacityRatio();
	
						_verticalDragInitiated = true;
						_shout('onVerticalDrag', opacityRatio);
	
						_applyBgOpacity(opacityRatio);
						_applyCurrentZoomPan();
						return ;
					}
				}
	
				_pushPosPoint(_getCurrentTime(), p.x, p.y);
	
				_moved = true;
				_currPanBounds = self.currItem.bounds;
				
				var mainScrollChanged = _panOrMoveMainScroll('x', delta);
				if(!mainScrollChanged) {
					_panOrMoveMainScroll('y', delta);
	
					_roundPoint(_panOffset);
					_applyCurrentZoomPan();
				}
	
			}
	
		},
		
		// Pointerup/pointercancel/touchend/touchcancel/mouseup event handler
		_onDragRelease = function(e) {
	
			if(_features.isOldAndroid ) {
	
				if(_oldAndroidTouchEndTimeout && e.type === 'mouseup') {
					return;
				}
	
				// on Android (v4.1, 4.2, 4.3 & possibly older) 
				// ghost mousedown/up event isn't preventable via e.preventDefault,
				// which causes fake mousedown event
				// so we block mousedown/up for 600ms
				if( e.type.indexOf('touch') > -1 ) {
					clearTimeout(_oldAndroidTouchEndTimeout);
					_oldAndroidTouchEndTimeout = setTimeout(function() {
						_oldAndroidTouchEndTimeout = 0;
					}, 600);
				}
				
			}
	
			_shout('pointerUp');
	
			if(_preventDefaultEventBehaviour(e, false)) {
				e.preventDefault();
			}
	
			var releasePoint;
	
			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				
				if(pointerIndex > -1) {
					releasePoint = _currPointers.splice(pointerIndex, 1)[0];
	
					if(navigator.pointerEnabled) {
						releasePoint.type = e.pointerType || 'mouse';
					} else {
						var MSPOINTER_TYPES = {
							4: 'mouse', // event.MSPOINTER_TYPE_MOUSE
							2: 'touch', // event.MSPOINTER_TYPE_TOUCH 
							3: 'pen' // event.MSPOINTER_TYPE_PEN
						};
						releasePoint.type = MSPOINTER_TYPES[e.pointerType];
	
						if(!releasePoint.type) {
							releasePoint.type = e.pointerType || 'mouse';
						}
					}
	
				}
			}
	
			var touchList = _getTouchPoints(e),
				gestureType,
				numPoints = touchList.length;
	
			if(e.type === 'mouseup') {
				numPoints = 0;
			}
	
			// Do nothing if there were 3 touch points or more
			if(numPoints === 2) {
				_currentPoints = null;
				return true;
			}
	
			// if second pointer released
			if(numPoints === 1) {
				_equalizePoints(_startPoint, touchList[0]);
			}				
	
	
			// pointer hasn't moved, send "tap release" point
			if(numPoints === 0 && !_direction && !_mainScrollAnimating) {
				if(!releasePoint) {
					if(e.type === 'mouseup') {
						releasePoint = {x: e.pageX, y: e.pageY, type:'mouse'};
					} else if(e.changedTouches && e.changedTouches[0]) {
						releasePoint = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type:'touch'};
					}		
				}
	
				_shout('touchRelease', e, releasePoint);
			}
	
			// Difference in time between releasing of two last touch points (zoom gesture)
			var releaseTimeDiff = -1;
	
			// Gesture completed, no pointers left
			if(numPoints === 0) {
				_isDragging = false;
				framework.unbind(window, _upMoveEvents, self);
	
				_stopDragUpdateLoop();
	
				if(_isZooming) {
					// Two points released at the same time
					releaseTimeDiff = 0;
				} else if(_lastReleaseTime !== -1) {
					releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
				}
			}
			_lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;
			
			if(releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
				gestureType = 'zoom';
			} else {
				gestureType = 'swipe';
			}
	
			if(_isZooming && numPoints < 2) {
				_isZooming = false;
	
				// Only second point released
				if(numPoints === 1) {
					gestureType = 'zoomPointerUp';
				}
				_shout('zoomGestureEnded');
			}
	
			_currentPoints = null;
			if(!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
				// nothing to animate
				return;
			}
		
			_stopAllAnimations();
	
			
			if(!_releaseAnimData) {
				_releaseAnimData = _initDragReleaseAnimationData();
			}
			
			_releaseAnimData.calculateSwipeSpeed('x');
	
	
			if(_verticalDragInitiated) {
	
				var opacityRatio = _calculateVerticalDragOpacityRatio();
	
				if(opacityRatio < _options.verticalDragRange) {
					self.close();
				} else {
					var initalPanY = _panOffset.y,
						initialBgOpacity = _bgOpacity;
	
					_animateProp('verticalDrag', 0, 1, 300, framework.easing.cubic.out, function(now) {
						
						_panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;
	
						_applyBgOpacity(  (1 - initialBgOpacity) * now + initialBgOpacity );
						_applyCurrentZoomPan();
					});
	
					_shout('onVerticalDrag', 1);
				}
	
				return;
			}
	
	
			// main scroll 
			if(  (_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
				var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
				if(itemChanged) {
					return;
				}
				gestureType = 'zoomPointerUp';
			}
	
			// prevent zoom/pan animation when main scroll animation runs
			if(_mainScrollAnimating) {
				return;
			}
			
			// Complete simple zoom gesture (reset zoom level if it's out of the bounds)  
			if(gestureType !== 'swipe') {
				_completeZoomGesture();
				return;
			}
		
			// Complete pan gesture if main scroll is not shifted, and it's possible to pan current image
			if(!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
				_completePanGesture(_releaseAnimData);
			}
		},
	
	
		// Returns object with data about gesture
		// It's created only once and then reused
		_initDragReleaseAnimationData  = function() {
			// temp local vars
			var lastFlickDuration,
				tempReleasePos;
	
			// s = this
			var s = {
				lastFlickOffset: {},
				lastFlickDist: {},
				lastFlickSpeed: {},
				slowDownRatio:  {},
				slowDownRatioReverse:  {},
				speedDecelerationRatio:  {},
				speedDecelerationRatioAbs:  {},
				distanceOffset:  {},
				backAnimDestination: {},
				backAnimStarted: {},
				calculateSwipeSpeed: function(axis) {
					
	
					if( _posPoints.length > 1) {
						lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
						tempReleasePos = _posPoints[_posPoints.length-2][axis];
					} else {
						lastFlickDuration = _getCurrentTime() - _gestureStartTime; // total gesture duration
						tempReleasePos = _startPoint[axis];
					}
					s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
					s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
					if(s.lastFlickDist[axis] > 20) {
						s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
					} else {
						s.lastFlickSpeed[axis] = 0;
					}
					if( Math.abs(s.lastFlickSpeed[axis]) < 0.1 ) {
						s.lastFlickSpeed[axis] = 0;
					}
					
					s.slowDownRatio[axis] = 0.95;
					s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
					s.speedDecelerationRatio[axis] = 1;
				},
	
				calculateOverBoundsAnimOffset: function(axis, speed) {
					if(!s.backAnimStarted[axis]) {
	
						if(_panOffset[axis] > _currPanBounds.min[axis]) {
							s.backAnimDestination[axis] = _currPanBounds.min[axis];
							
						} else if(_panOffset[axis] < _currPanBounds.max[axis]) {
							s.backAnimDestination[axis] = _currPanBounds.max[axis];
						}
	
						if(s.backAnimDestination[axis] !== undefined) {
							s.slowDownRatio[axis] = 0.7;
							s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
							if(s.speedDecelerationRatioAbs[axis] < 0.05) {
	
								s.lastFlickSpeed[axis] = 0;
								s.backAnimStarted[axis] = true;
	
								_animateProp('bounceZoomPan'+axis,_panOffset[axis], 
									s.backAnimDestination[axis], 
									speed || 300, 
									framework.easing.sine.out, 
									function(pos) {
										_panOffset[axis] = pos;
										_applyCurrentZoomPan();
									}
								);
	
							}
						}
					}
				},
	
				// Reduces the speed by slowDownRatio (per 10ms)
				calculateAnimOffset: function(axis) {
					if(!s.backAnimStarted[axis]) {
						s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + 
													s.slowDownRatioReverse[axis] - 
													s.slowDownRatioReverse[axis] * s.timeDiff / 10);
	
						s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
						s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
						_panOffset[axis] += s.distanceOffset[axis];
	
					}
				},
	
				panAnimLoop: function() {
					if ( _animations.zoomPan ) {
						_animations.zoomPan.raf = _requestAF(s.panAnimLoop);
	
						s.now = _getCurrentTime();
						s.timeDiff = s.now - s.lastNow;
						s.lastNow = s.now;
						
						s.calculateAnimOffset('x');
						s.calculateAnimOffset('y');
	
						_applyCurrentZoomPan();
						
						s.calculateOverBoundsAnimOffset('x');
						s.calculateOverBoundsAnimOffset('y');
	
	
						if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {
	
							// round pan position
							_panOffset.x = Math.round(_panOffset.x);
							_panOffset.y = Math.round(_panOffset.y);
							_applyCurrentZoomPan();
							
							_stopAnimation('zoomPan');
							return;
						}
					}
	
				}
			};
			return s;
		},
	
		_completePanGesture = function(animData) {
			// calculate swipe speed for Y axis (paanning)
			animData.calculateSwipeSpeed('y');
	
			_currPanBounds = self.currItem.bounds;
			
			animData.backAnimDestination = {};
			animData.backAnimStarted = {};
	
			// Avoid acceleration animation if speed is too low
			if(Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05 ) {
				animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;
	
				// Run pan drag release animation. E.g. if you drag image and release finger without momentum.
				animData.calculateOverBoundsAnimOffset('x');
				animData.calculateOverBoundsAnimOffset('y');
				return true;
			}
	
			// Animation loop that controls the acceleration after pan gesture ends
			_registerStartAnimation('zoomPan');
			animData.lastNow = _getCurrentTime();
			animData.panAnimLoop();
		},
	
	
		_finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData) {
			var itemChanged;
			if(!_mainScrollAnimating) {
				_currZoomedItemIndex = _currentItemIndex;
			}
	
	
			
			var itemsDiff;
	
			if(gestureType === 'swipe') {
				var totalShiftDist = _currPoint.x - _startPoint.x,
					isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;
	
				// if container is shifted for more than MIN_SWIPE_DISTANCE, 
				// and last flick gesture was in right direction
				if(totalShiftDist > MIN_SWIPE_DISTANCE && 
					(isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20) ) {
					// go to prev item
					itemsDiff = -1;
				} else if(totalShiftDist < -MIN_SWIPE_DISTANCE && 
					(isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20) ) {
					// go to next item
					itemsDiff = 1;
				}
			}
	
			var nextCircle;
	
			if(itemsDiff) {
				
				_currentItemIndex += itemsDiff;
	
				if(_currentItemIndex < 0) {
					_currentItemIndex = _options.loop ? _getNumItems()-1 : 0;
					nextCircle = true;
				} else if(_currentItemIndex >= _getNumItems()) {
					_currentItemIndex = _options.loop ? 0 : _getNumItems()-1;
					nextCircle = true;
				}
	
				if(!nextCircle || _options.loop) {
					_indexDiff += itemsDiff;
					_currPositionIndex -= itemsDiff;
					itemChanged = true;
				}
				
	
				
			}
	
			var animateToX = _slideSize.x * _currPositionIndex;
			var animateToDist = Math.abs( animateToX - _mainScrollPos.x );
			var finishAnimDuration;
	
	
			if(!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData.lastFlickSpeed.x > 0) {
				// "return to current" duration, e.g. when dragging from slide 0 to -1
				finishAnimDuration = 333; 
			} else {
				finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? 
										animateToDist / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 
										333;
	
				finishAnimDuration = Math.min(finishAnimDuration, 400);
				finishAnimDuration = Math.max(finishAnimDuration, 250);
			}
	
			if(_currZoomedItemIndex === _currentItemIndex) {
				itemChanged = false;
			}
			
			_mainScrollAnimating = true;
			
			_shout('mainScrollAnimStart');
	
			_animateProp('mainScroll', _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, 
				_moveMainScroll,
				function() {
					_stopAllAnimations();
					_mainScrollAnimating = false;
					_currZoomedItemIndex = -1;
					
					if(itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
						self.updateCurrItem();
					}
					
					_shout('mainScrollAnimComplete');
				}
			);
	
			if(itemChanged) {
				self.updateCurrItem(true);
			}
	
			return itemChanged;
		},
	
		_calculateZoomLevel = function(touchesDistance) {
			return  1 / _startPointsDistance * touchesDistance * _startZoomLevel;
		},
	
		// Resets zoom if it's out of bounds
		_completeZoomGesture = function() {
			var destZoomLevel = _currZoomLevel,
				minZoomLevel = _getMinZoomLevel(),
				maxZoomLevel = _getMaxZoomLevel();
	
			if ( _currZoomLevel < minZoomLevel ) {
				destZoomLevel = minZoomLevel;
			} else if ( _currZoomLevel > maxZoomLevel ) {
				destZoomLevel = maxZoomLevel;
			}
	
			var destOpacity = 1,
				onUpdate,
				initialOpacity = _bgOpacity;
	
			if(_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
				//_closedByScroll = true;
				self.close();
				return true;
			}
	
			if(_opacityChanged) {
				onUpdate = function(now) {
					_applyBgOpacity(  (destOpacity - initialOpacity) * now + initialOpacity );
				};
			}
	
			self.zoomTo(destZoomLevel, 0, 200,  framework.easing.cubic.out, onUpdate);
			return true;
		};
	
	
	_registerModule('Gestures', {
		publicMethods: {
	
			initGestures: function() {
	
				// helper function that builds touch/pointer/mouse events
				var addEventNames = function(pref, down, move, up, cancel) {
					_dragStartEvent = pref + down;
					_dragMoveEvent = pref + move;
					_dragEndEvent = pref + up;
					if(cancel) {
						_dragCancelEvent = pref + cancel;
					} else {
						_dragCancelEvent = '';
					}
				};
	
				_pointerEventEnabled = _features.pointerEvent;
				if(_pointerEventEnabled && _features.touch) {
					// we don't need touch events, if browser supports pointer events
					_features.touch = false;
				}
	
				if(_pointerEventEnabled) {
					if(navigator.pointerEnabled) {
						addEventNames('pointer', 'down', 'move', 'up', 'cancel');
					} else {
						// IE10 pointer events are case-sensitive
						addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
					}
				} else if(_features.touch) {
					addEventNames('touch', 'start', 'move', 'end', 'cancel');
					_likelyTouchDevice = true;
				} else {
					addEventNames('mouse', 'down', 'move', 'up');	
				}
	
				_upMoveEvents = _dragMoveEvent + ' ' + _dragEndEvent  + ' ' +  _dragCancelEvent;
				_downEvents = _dragStartEvent;
	
				if(_pointerEventEnabled && !_likelyTouchDevice) {
					_likelyTouchDevice = (navigator.maxTouchPoints > 1) || (navigator.msMaxTouchPoints > 1);
				}
				// make variable public
				self.likelyTouchDevice = _likelyTouchDevice; 
				
				_globalEventHandlers[_dragStartEvent] = _onDragStart;
				_globalEventHandlers[_dragMoveEvent] = _onDragMove;
				_globalEventHandlers[_dragEndEvent] = _onDragRelease; // the Kraken
	
				if(_dragCancelEvent) {
					_globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
				}
	
				// Bind mouse events on device with detected hardware touch support, in case it supports multiple types of input.
				if(_features.touch) {
					_downEvents += ' mousedown';
					_upMoveEvents += ' mousemove mouseup';
					_globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
					_globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
					_globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
				}
	
				if(!_likelyTouchDevice) {
					// don't allow pan to next slide from zoomed state on Desktop
					_options.allowPanToNext = false;
				}
			}
	
		}
	});
	
	
	/*>>gestures*/
	
	/*>>show-hide-transition*/
	/**
	 * show-hide-transition.js:
	 *
	 * Manages initial opening or closing transition.
	 *
	 * If you're not planning to use transition for gallery at all,
	 * you may set options hideAnimationDuration and showAnimationDuration to 0,
	 * and just delete startAnimation function.
	 * 
	 */
	
	
	var _showOrHideTimeout,
		_showOrHide = function(item, img, out, completeFn) {
	
			if(_showOrHideTimeout) {
				clearTimeout(_showOrHideTimeout);
			}
	
			_initialZoomRunning = true;
			_initialContentSet = true;
			
			// dimensions of small thumbnail {x:,y:,w:}.
			// Height is optional, as calculated based on large image.
			var thumbBounds; 
			if(item.initialLayout) {
				thumbBounds = item.initialLayout;
				item.initialLayout = null;
			} else {
				thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
			}
	
			var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;
	
			var onComplete = function() {
				_stopAnimation('initialZoom');
				if(!out) {
					_applyBgOpacity(1);
					if(img) {
						img.style.display = 'block';
					}
					framework.addClass(template, 'pswp--animated-in');
					_shout('initialZoom' + (out ? 'OutEnd' : 'InEnd'));
				} else {
					self.template.removeAttribute('style');
					self.bg.removeAttribute('style');
				}
	
				if(completeFn) {
					completeFn();
				}
				_initialZoomRunning = false;
			};
	
			// if bounds aren't provided, just open gallery without animation
			if(!duration || !thumbBounds || thumbBounds.x === undefined) {
	
				_shout('initialZoom' + (out ? 'Out' : 'In') );
	
				_currZoomLevel = item.initialZoomLevel;
				_equalizePoints(_panOffset,  item.initialPosition );
				_applyCurrentZoomPan();
	
				template.style.opacity = out ? 0 : 1;
				_applyBgOpacity(1);
	
				if(duration) {
					setTimeout(function() {
						onComplete();
					}, duration);
				} else {
					onComplete();
				}
	
				return;
			}
	
			var startAnimation = function() {
				var closeWithRaf = _closedByScroll,
					fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
				
				// apply hw-acceleration to image
				if(item.miniImg) {
					item.miniImg.style.webkitBackfaceVisibility = 'hidden';
				}
	
				if(!out) {
					_currZoomLevel = thumbBounds.w / item.w;
					_panOffset.x = thumbBounds.x;
					_panOffset.y = thumbBounds.y - _initalWindowScrollY;
	
					self[fadeEverything ? 'template' : 'bg'].style.opacity = 0.001;
					_applyCurrentZoomPan();
				}
	
				_registerStartAnimation('initialZoom');
				
				if(out && !closeWithRaf) {
					framework.removeClass(template, 'pswp--animated-in');
				}
	
				if(fadeEverything) {
					if(out) {
						framework[ (closeWithRaf ? 'remove' : 'add') + 'Class' ](template, 'pswp--animate_opacity');
					} else {
						setTimeout(function() {
							framework.addClass(template, 'pswp--animate_opacity');
						}, 30);
					}
				}
	
				_showOrHideTimeout = setTimeout(function() {
	
					_shout('initialZoom' + (out ? 'Out' : 'In') );
					
	
					if(!out) {
	
						// "in" animation always uses CSS transitions (instead of rAF).
						// CSS transition work faster here, 
						// as developer may also want to animate other things, 
						// like ui on top of sliding area, which can be animated just via CSS
						
						_currZoomLevel = item.initialZoomLevel;
						_equalizePoints(_panOffset,  item.initialPosition );
						_applyCurrentZoomPan();
						_applyBgOpacity(1);
	
						if(fadeEverything) {
							template.style.opacity = 1;
						} else {
							_applyBgOpacity(1);
						}
	
						_showOrHideTimeout = setTimeout(onComplete, duration + 20);
					} else {
	
						// "out" animation uses rAF only when PhotoSwipe is closed by browser scroll, to recalculate position
						var destZoomLevel = thumbBounds.w / item.w,
							initialPanOffset = {
								x: _panOffset.x,
								y: _panOffset.y
							},
							initialZoomLevel = _currZoomLevel,
							initalBgOpacity = _bgOpacity,
							onUpdate = function(now) {
								
								if(now === 1) {
									_currZoomLevel = destZoomLevel;
									_panOffset.x = thumbBounds.x;
									_panOffset.y = thumbBounds.y  - _currentWindowScrollY;
								} else {
									_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
									_panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
									_panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
								}
								
								_applyCurrentZoomPan();
								if(fadeEverything) {
									template.style.opacity = 1 - now;
								} else {
									_applyBgOpacity( initalBgOpacity - now * initalBgOpacity );
								}
							};
	
						if(closeWithRaf) {
							_animateProp('initialZoom', 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
						} else {
							onUpdate(1);
							_showOrHideTimeout = setTimeout(onComplete, duration + 20);
						}
					}
				
				}, out ? 25 : 90); // Main purpose of this delay is to give browser time to paint and
						// create composite layers of PhotoSwipe UI parts (background, controls, caption, arrows).
						// Which avoids lag at the beginning of scale transition.
			};
			startAnimation();
	
			
		};
	
	/*>>show-hide-transition*/
	
	/*>>items-controller*/
	/**
	*
	* Controller manages gallery items, their dimensions, and their content.
	* 
	*/
	
	var _items,
		_tempPanAreaSize = {},
		_imagesToAppendPool = [],
		_initialContentSet,
		_initialZoomRunning,
		_controllerDefaultOptions = {
			index: 0,
			errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
			forceProgressiveLoading: false, // TODO
			preload: [1,1],
			getNumItemsFn: function() {
				return _items.length;
			}
		};
	
	
	var _getItemAt,
		_getNumItems,
		_initialIsLoop,
		_getZeroBounds = function() {
			return {
				center:{x:0,y:0}, 
				max:{x:0,y:0}, 
				min:{x:0,y:0}
			};
		},
		_calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH ) {
			var bounds = item.bounds;
	
			// position of element when it's centered
			bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
			bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;
	
			// maximum pan position
			bounds.max.x = (realPanElementW > _tempPanAreaSize.x) ? 
								Math.round(_tempPanAreaSize.x - realPanElementW) : 
								bounds.center.x;
			
			bounds.max.y = (realPanElementH > _tempPanAreaSize.y) ? 
								Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : 
								bounds.center.y;
			
			// minimum pan position
			bounds.min.x = (realPanElementW > _tempPanAreaSize.x) ? 0 : bounds.center.x;
			bounds.min.y = (realPanElementH > _tempPanAreaSize.y) ? item.vGap.top : bounds.center.y;
		},
		_calculateItemSize = function(item, viewportSize, zoomLevel) {
	
			if (item.src && !item.loadError) {
				var isInitial = !zoomLevel;
				
				if(isInitial) {
					if(!item.vGap) {
						item.vGap = {top:0,bottom:0};
					}
					// allows overriding vertical margin for individual items
					_shout('parseVerticalMargin', item);
				}
	
	
				_tempPanAreaSize.x = viewportSize.x;
				_tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;
	
				if (isInitial) {
					var hRatio = _tempPanAreaSize.x / item.w;
					var vRatio = _tempPanAreaSize.y / item.h;
	
					item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
					//item.fillRatio = hRatio > vRatio ? hRatio : vRatio;
	
					var scaleMode = _options.scaleMode;
	
					if (scaleMode === 'orig') {
						zoomLevel = 1;
					} else if (scaleMode === 'fit') {
						zoomLevel = item.fitRatio;
					}
	
					if (zoomLevel > 1) {
						zoomLevel = 1;
					}
	
					item.initialZoomLevel = zoomLevel;
					
					if(!item.bounds) {
						// reuse bounds object
						item.bounds = _getZeroBounds(); 
					}
				}
	
				if(!zoomLevel) {
					return;
				}
	
				_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);
	
				if (isInitial && zoomLevel === item.initialZoomLevel) {
					item.initialPosition = item.bounds.center;
				}
	
				return item.bounds;
			} else {
				item.w = item.h = 0;
				item.initialZoomLevel = item.fitRatio = 1;
				item.bounds = _getZeroBounds();
				item.initialPosition = item.bounds.center;
	
				// if it's not image, we return zero bounds (content is not zoomable)
				return item.bounds;
			}
			
		},
	
		
	
	
		_appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
			
	
			if(item.loadError) {
				return;
			}
	
			if(img) {
	
				item.imageAppended = true;
				_setImageSize(item, img, (item === self.currItem && _renderMaxResolution) );
				
				baseDiv.appendChild(img);
	
				if(keepPlaceholder) {
					setTimeout(function() {
						if(item && item.loaded && item.placeholder) {
							item.placeholder.style.display = 'none';
							item.placeholder = null;
						}
					}, 500);
				}
			}
		},
		
	
	
		_preloadImage = function(item) {
			item.loading = true;
			item.loaded = false;
			var img = item.img = framework.createEl('pswp__img', 'img');
			var onComplete = function() {
				item.loading = false;
				item.loaded = true;
	
				if(item.loadComplete) {
					item.loadComplete(item);
				} else {
					item.img = null; // no need to store image object
				}
				img.onload = img.onerror = null;
				img = null;
			};
			img.onload = onComplete;
			img.onerror = function() {
				item.loadError = true;
				onComplete();
			};		
	
			img.src = item.src;// + '?a=' + Math.random();
	
			return img;
		},
		_checkForError = function(item, cleanUp) {
			if(item.src && item.loadError && item.container) {
	
				if(cleanUp) {
					item.container.innerHTML = '';
				}
	
				item.container.innerHTML = _options.errorMsg.replace('%url%',  item.src );
				return true;
				
			}
		},
		_setImageSize = function(item, img, maxRes) {
			if(!item.src) {
				return;
			}
	
			if(!img) {
				img = item.container.lastChild;
			}
	
			var w = maxRes ? item.w : Math.round(item.w * item.fitRatio),
				h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
			
			if(item.placeholder && !item.loaded) {
				item.placeholder.style.width = w + 'px';
				item.placeholder.style.height = h + 'px';
			}
	
			img.style.width = w + 'px';
			img.style.height = h + 'px';
		},
		_appendImagesPool = function() {
	
			if(_imagesToAppendPool.length) {
				var poolItem;
	
				for(var i = 0; i < _imagesToAppendPool.length; i++) {
					poolItem = _imagesToAppendPool[i];
					if( poolItem.holder.index === poolItem.index ) {
						_appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
					}
				}
				_imagesToAppendPool = [];
			}
		};
		
	
	
	_registerModule('Controller', {
	
		publicMethods: {
	
			lazyLoadItem: function(index) {
				index = _getLoopedId(index);
				var item = _getItemAt(index);
	
				if(!item || ((item.loaded || item.loading) && !_itemsNeedUpdate)) {
					return;
				}
	
				_shout('gettingData', index, item);
	
				if (!item.src) {
					return;
				}
	
				_preloadImage(item);
			},
			initController: function() {
				framework.extend(_options, _controllerDefaultOptions, true);
				self.items = _items = items;
				_getItemAt = self.getItemAt;
				_getNumItems = _options.getNumItemsFn; //self.getNumItems;
	
	
	
				_initialIsLoop = _options.loop;
				if(_getNumItems() < 3) {
					_options.loop = false; // disable loop if less then 3 items
				}
	
				_listen('beforeChange', function(diff) {
	
					var p = _options.preload,
						isNext = diff === null ? true : (diff >= 0),
						preloadBefore = Math.min(p[0], _getNumItems() ),
						preloadAfter = Math.min(p[1], _getNumItems() ),
						i;
	
	
					for(i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
						self.lazyLoadItem(_currentItemIndex+i);
					}
					for(i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
						self.lazyLoadItem(_currentItemIndex-i);
					}
				});
	
				_listen('initialLayout', function() {
					self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
				});
	
				_listen('mainScrollAnimComplete', _appendImagesPool);
				_listen('initialZoomInEnd', _appendImagesPool);
	
	
	
				_listen('destroy', function() {
					var item;
					for(var i = 0; i < _items.length; i++) {
						item = _items[i];
						// remove reference to DOM elements, for GC
						if(item.container) {
							item.container = null; 
						}
						if(item.placeholder) {
							item.placeholder = null;
						}
						if(item.img) {
							item.img = null;
						}
						if(item.preloader) {
							item.preloader = null;
						}
						if(item.loadError) {
							item.loaded = item.loadError = false;
						}
					}
					_imagesToAppendPool = null;
				});
			},
	
	
			getItemAt: function(index) {
				if (index >= 0) {
					return _items[index] !== undefined ? _items[index] : false;
				}
				return false;
			},
	
			allowProgressiveImg: function() {
				// 1. Progressive image loading isn't working on webkit/blink 
				//    when hw-acceleration (e.g. translateZ) is applied to IMG element.
				//    That's why in PhotoSwipe parent element gets zoom transform, not image itself.
				//    
				// 2. Progressive image loading sometimes blinks in webkit/blink when applying animation to parent element.
				//    That's why it's disabled on touch devices (mainly because of swipe transition)
				//    
				// 3. Progressive image loading sometimes doesn't work in IE (up to 11).
	
				// Don't allow progressive loading on non-large touch devices
				return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200; 
				// 1200 - to eliminate touch devices with large screen (like Chromebook Pixel)
			},
	
			setContent: function(holder, index) {
	
				if(_options.loop) {
					index = _getLoopedId(index);
				}
	
				var prevItem = self.getItemAt(holder.index);
				if(prevItem) {
					prevItem.container = null;
				}
		
				var item = self.getItemAt(index),
					img;
				
				if(!item) {
					holder.el.innerHTML = '';
					return;
				}
	
				// allow to override data
				_shout('gettingData', index, item);
	
				holder.index = index;
				holder.item = item;
	
				// base container DIV is created only once for each of 3 holders
				var baseDiv = item.container = framework.createEl('pswp__zoom-wrap'); 
	
				
	
				if(!item.src && item.html) {
					if(item.html.tagName) {
						baseDiv.appendChild(item.html);
					} else {
						baseDiv.innerHTML = item.html;
					}
				}
	
				_checkForError(item);
	
				_calculateItemSize(item, _viewportSize);
				
				if(item.src && !item.loadError && !item.loaded) {
	
					item.loadComplete = function(item) {
	
						// gallery closed before image finished loading
						if(!_isOpen) {
							return;
						}
	
						// check if holder hasn't changed while image was loading
						if(holder && holder.index === index ) {
							if( _checkForError(item, true) ) {
								item.loadComplete = item.img = null;
								_calculateItemSize(item, _viewportSize);
								_applyZoomPanToItem(item);
	
								if(holder.index === _currentItemIndex) {
									// recalculate dimensions
									self.updateCurrZoomItem();
								}
								return;
							}
							if( !item.imageAppended ) {
								if(_features.transform && (_mainScrollAnimating || _initialZoomRunning) ) {
									_imagesToAppendPool.push({
										item:item,
										baseDiv:baseDiv,
										img:item.img,
										index:index,
										holder:holder,
										clearPlaceholder:true
									});
								} else {
									_appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
								}
							} else {
								// remove preloader & mini-img
								if(!_initialZoomRunning && item.placeholder) {
									item.placeholder.style.display = 'none';
									item.placeholder = null;
								}
							}
						}
	
						item.loadComplete = null;
						item.img = null; // no need to store image element after it's added
	
						_shout('imageLoadComplete', index, item);
					};
	
					if(framework.features.transform) {
						
						var placeholderClassName = 'pswp__img pswp__img--placeholder'; 
						placeholderClassName += (item.msrc ? '' : ' pswp__img--placeholder--blank');
	
						var placeholder = framework.createEl(placeholderClassName, item.msrc ? 'img' : '');
						if(item.msrc) {
							placeholder.src = item.msrc;
						}
						
						_setImageSize(item, placeholder);
	
						baseDiv.appendChild(placeholder);
						item.placeholder = placeholder;
	
					}
					
	
					
	
					if(!item.loading) {
						_preloadImage(item);
					}
	
	
					if( self.allowProgressiveImg() ) {
						// just append image
						if(!_initialContentSet && _features.transform) {
							_imagesToAppendPool.push({
								item:item, 
								baseDiv:baseDiv, 
								img:item.img, 
								index:index, 
								holder:holder
							});
						} else {
							_appendImage(index, item, baseDiv, item.img, true, true);
						}
					}
					
				} else if(item.src && !item.loadError) {
					// image object is created every time, due to bugs of image loading & delay when switching images
					img = framework.createEl('pswp__img', 'img');
					img.style.opacity = 1;
					img.src = item.src;
					_setImageSize(item, img);
					_appendImage(index, item, baseDiv, img, true);
				}
				
	
				if(!_initialContentSet && index === _currentItemIndex) {
					_currZoomElementStyle = baseDiv.style;
					_showOrHide(item, (img ||item.img) );
				} else {
					_applyZoomPanToItem(item);
				}
	
				holder.el.innerHTML = '';
				holder.el.appendChild(baseDiv);
			},
	
			cleanSlide: function( item ) {
				if(item.img ) {
					item.img.onload = item.img.onerror = null;
				}
				item.loaded = item.loading = item.img = item.imageAppended = false;
			}
	
		}
	});
	
	/*>>items-controller*/
	
	/*>>tap*/
	/**
	 * tap.js:
	 *
	 * Displatches tap and double-tap events.
	 * 
	 */
	
	var tapTimer,
		tapReleasePoint = {},
		_dispatchTapEvent = function(origEvent, releasePoint, pointerType) {		
			var e = document.createEvent( 'CustomEvent' ),
				eDetail = {
					origEvent:origEvent, 
					target:origEvent.target, 
					releasePoint: releasePoint, 
					pointerType:pointerType || 'touch'
				};
	
			e.initCustomEvent( 'pswpTap', true, true, eDetail );
			origEvent.target.dispatchEvent(e);
		};
	
	_registerModule('Tap', {
		publicMethods: {
			initTap: function() {
				_listen('firstTouchStart', self.onTapStart);
				_listen('touchRelease', self.onTapRelease);
				_listen('destroy', function() {
					tapReleasePoint = {};
					tapTimer = null;
				});
			},
			onTapStart: function(touchList) {
				if(touchList.length > 1) {
					clearTimeout(tapTimer);
					tapTimer = null;
				}
			},
			onTapRelease: function(e, releasePoint) {
				if(!releasePoint) {
					return;
				}
	
				if(!_moved && !_isMultitouch && !_numAnimations) {
					var p0 = releasePoint;
					if(tapTimer) {
						clearTimeout(tapTimer);
						tapTimer = null;
	
						// Check if taped on the same place
						if ( _isNearbyPoints(p0, tapReleasePoint) ) {
							_shout('doubleTap', p0);
							return;
						}
					}
	
					if(releasePoint.type === 'mouse') {
						_dispatchTapEvent(e, releasePoint, 'mouse');
						return;
					}
	
					var clickedTagName = e.target.tagName.toUpperCase();
					// avoid double tap delay on buttons and elements that have class pswp__single-tap
					if(clickedTagName === 'BUTTON' || framework.hasClass(e.target, 'pswp__single-tap') ) {
						_dispatchTapEvent(e, releasePoint);
						return;
					}
	
					_equalizePoints(tapReleasePoint, p0);
	
					tapTimer = setTimeout(function() {
						_dispatchTapEvent(e, releasePoint);
						tapTimer = null;
					}, 300);
				}
			}
		}
	});
	
	/*>>tap*/
	
	/*>>desktop-zoom*/
	/**
	 *
	 * desktop-zoom.js:
	 *
	 * - Binds mousewheel event for paning zoomed image.
	 * - Manages "dragging", "zoomed-in", "zoom-out" classes.
	 *   (which are used for cursors and zoom icon)
	 * - Adds toggleDesktopZoom function.
	 * 
	 */
	
	var _wheelDelta;
		
	_registerModule('DesktopZoom', {
	
		publicMethods: {
	
			initDesktopZoom: function() {
	
				if(_oldIE) {
					// no zoom for old IE (<=8)
					return;
				}
	
				if(_likelyTouchDevice) {
					// if detected hardware touch support, we wait until mouse is used,
					// and only then apply desktop-zoom features
					_listen('mouseUsed', function() {
						self.setupDesktopZoom();
					});
				} else {
					self.setupDesktopZoom(true);
				}
	
			},
	
			setupDesktopZoom: function(onInit) {
	
				_wheelDelta = {};
	
				var events = 'wheel mousewheel DOMMouseScroll';
				
				_listen('bindEvents', function() {
					framework.bind(template, events,  self.handleMouseWheel);
				});
	
				_listen('unbindEvents', function() {
					if(_wheelDelta) {
						framework.unbind(template, events, self.handleMouseWheel);
					}
				});
	
				self.mouseZoomedIn = false;
	
				var hasDraggingClass,
					updateZoomable = function() {
						if(self.mouseZoomedIn) {
							framework.removeClass(template, 'pswp--zoomed-in');
							self.mouseZoomedIn = false;
						}
						if(_currZoomLevel < 1) {
							framework.addClass(template, 'pswp--zoom-allowed');
						} else {
							framework.removeClass(template, 'pswp--zoom-allowed');
						}
						removeDraggingClass();
					},
					removeDraggingClass = function() {
						if(hasDraggingClass) {
							framework.removeClass(template, 'pswp--dragging');
							hasDraggingClass = false;
						}
					};
	
				_listen('resize' , updateZoomable);
				_listen('afterChange' , updateZoomable);
				_listen('pointerDown', function() {
					if(self.mouseZoomedIn) {
						hasDraggingClass = true;
						framework.addClass(template, 'pswp--dragging');
					}
				});
				_listen('pointerUp', removeDraggingClass);
	
				if(!onInit) {
					updateZoomable();
				}
				
			},
	
			handleMouseWheel: function(e) {
	
				if(_currZoomLevel <= self.currItem.fitRatio) {
					if( _options.modal ) {
	
						if (!_options.closeOnScroll || _numAnimations || _isDragging) {
							e.preventDefault();
						} else if(_transformKey && Math.abs(e.deltaY) > 2) {
							// close PhotoSwipe
							// if browser supports transforms & scroll changed enough
							_closedByScroll = true;
							self.close();
						}
	
					}
					return true;
				}
	
				// allow just one event to fire
				e.stopPropagation();
	
				// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
				_wheelDelta.x = 0;
	
				if('deltaX' in e) {
					if(e.deltaMode === 1 /* DOM_DELTA_LINE */) {
						// 18 - average line height
						_wheelDelta.x = e.deltaX * 18;
						_wheelDelta.y = e.deltaY * 18;
					} else {
						_wheelDelta.x = e.deltaX;
						_wheelDelta.y = e.deltaY;
					}
				} else if('wheelDelta' in e) {
					if(e.wheelDeltaX) {
						_wheelDelta.x = -0.16 * e.wheelDeltaX;
					}
					if(e.wheelDeltaY) {
						_wheelDelta.y = -0.16 * e.wheelDeltaY;
					} else {
						_wheelDelta.y = -0.16 * e.wheelDelta;
					}
				} else if('detail' in e) {
					_wheelDelta.y = e.detail;
				} else {
					return;
				}
	
				_calculatePanBounds(_currZoomLevel, true);
	
				var newPanX = _panOffset.x - _wheelDelta.x,
					newPanY = _panOffset.y - _wheelDelta.y;
	
				// only prevent scrolling in nonmodal mode when not at edges
				if (_options.modal ||
					(
					newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x &&
					newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y
					) ) {
					e.preventDefault();
				}
	
				// TODO: use rAF instead of mousewheel?
				self.panTo(newPanX, newPanY);
			},
	
			toggleDesktopZoom: function(centerPoint) {
				centerPoint = centerPoint || {x:_viewportSize.x/2 + _offset.x, y:_viewportSize.y/2 + _offset.y };
	
				var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
				var zoomOut = _currZoomLevel === doubleTapZoomLevel;
				
				self.mouseZoomedIn = !zoomOut;
	
				self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
				framework[ (!zoomOut ? 'add' : 'remove') + 'Class'](template, 'pswp--zoomed-in');
			}
	
		}
	});
	
	
	/*>>desktop-zoom*/
	
	/*>>history*/
	/**
	 *
	 * history.js:
	 *
	 * - Back button to close gallery.
	 * 
	 * - Unique URL for each slide: example.com/&pid=1&gid=3
	 *   (where PID is picture index, and GID and gallery index)
	 *   
	 * - Switch URL when slides change.
	 * 
	 */
	
	
	var _historyDefaultOptions = {
		history: true,
		galleryUID: 1
	};
	
	var _historyUpdateTimeout,
		_hashChangeTimeout,
		_hashAnimCheckTimeout,
		_hashChangedByScript,
		_hashChangedByHistory,
		_hashReseted,
		_initialHash,
		_historyChanged,
		_closedFromURL,
		_urlChangedOnce,
		_windowLoc,
	
		_supportsPushState,
	
		_getHash = function() {
			return _windowLoc.hash.substring(1);
		},
		_cleanHistoryTimeouts = function() {
	
			if(_historyUpdateTimeout) {
				clearTimeout(_historyUpdateTimeout);
			}
	
			if(_hashAnimCheckTimeout) {
				clearTimeout(_hashAnimCheckTimeout);
			}
		},
	
		// pid - Picture index
		// gid - Gallery index
		_parseItemIndexFromURL = function() {
			var hash = _getHash(),
				params = {};
	
			if(hash.length < 5) { // pid=1
				return params;
			}
	
			var i, vars = hash.split('&');
			for (i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');	
				if(pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}
			if(_options.galleryPIDs) {
				// detect custom pid in hash and search for it among the items collection
				var searchfor = params.pid;
				params.pid = 0; // if custom pid cannot be found, fallback to the first item
				for(i = 0; i < _items.length; i++) {
					if(_items[i].pid === searchfor) {
						params.pid = i;
						break;
					}
				}
			} else {
				params.pid = parseInt(params.pid,10)-1;
			}
			if( params.pid < 0 ) {
				params.pid = 0;
			}
			return params;
		},
		_updateHash = function() {
	
			if(_hashAnimCheckTimeout) {
				clearTimeout(_hashAnimCheckTimeout);
			}
	
	
			if(_numAnimations || _isDragging) {
				// changing browser URL forces layout/paint in some browsers, which causes noticable lag during animation
				// that's why we update hash only when no animations running
				_hashAnimCheckTimeout = setTimeout(_updateHash, 500);
				return;
			}
			
			if(_hashChangedByScript) {
				clearTimeout(_hashChangeTimeout);
			} else {
				_hashChangedByScript = true;
			}
	
	
			var pid = (_currentItemIndex + 1);
			var item = _getItemAt( _currentItemIndex );
			if(item.hasOwnProperty('pid')) {
				// carry forward any custom pid assigned to the item
				pid = item.pid;
			}
			var newHash = _initialHash + '&'  +  'gid=' + _options.galleryUID + '&' + 'pid=' + pid;
	
			if(!_historyChanged) {
				if(_windowLoc.hash.indexOf(newHash) === -1) {
					_urlChangedOnce = true;
				}
				// first time - add new hisory record, then just replace
			}
	
			var newURL = _windowLoc.href.split('#')[0] + '#' +  newHash;
	
			if( _supportsPushState ) {
	
				if('#' + newHash !== window.location.hash) {
					history[_historyChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
				}
	
			} else {
				if(_historyChanged) {
					_windowLoc.replace( newURL );
				} else {
					_windowLoc.hash = newHash;
				}
			}
			
			
	
			_historyChanged = true;
			_hashChangeTimeout = setTimeout(function() {
				_hashChangedByScript = false;
			}, 60);
		};
	
	
	
		
	
	_registerModule('History', {
	
		
	
		publicMethods: {
			initHistory: function() {
	
				framework.extend(_options, _historyDefaultOptions, true);
	
				if( !_options.history ) {
					return;
				}
	
	
				_windowLoc = window.location;
				_urlChangedOnce = false;
				_closedFromURL = false;
				_historyChanged = false;
				_initialHash = _getHash();
				_supportsPushState = ('pushState' in history);
	
	
				if(_initialHash.indexOf('gid=') > -1) {
					_initialHash = _initialHash.split('&gid=')[0];
					_initialHash = _initialHash.split('?gid=')[0];
				}
				
	
				_listen('afterChange', self.updateURL);
				_listen('unbindEvents', function() {
					framework.unbind(window, 'hashchange', self.onHashChange);
				});
	
	
				var returnToOriginal = function() {
					_hashReseted = true;
					if(!_closedFromURL) {
	
						if(_urlChangedOnce) {
							history.back();
						} else {
	
							if(_initialHash) {
								_windowLoc.hash = _initialHash;
							} else {
								if (_supportsPushState) {
	
									// remove hash from url without refreshing it or scrolling to top
									history.pushState('', document.title,  _windowLoc.pathname + _windowLoc.search );
								} else {
									_windowLoc.hash = '';
								}
							}
						}
						
					}
	
					_cleanHistoryTimeouts();
				};
	
	
				_listen('unbindEvents', function() {
					if(_closedByScroll) {
						// if PhotoSwipe is closed by scroll, we go "back" before the closing animation starts
						// this is done to keep the scroll position
						returnToOriginal();
					}
				});
				_listen('destroy', function() {
					if(!_hashReseted) {
						returnToOriginal();
					}
				});
				_listen('firstUpdate', function() {
					_currentItemIndex = _parseItemIndexFromURL().pid;
				});
	
				
	
				
				var index = _initialHash.indexOf('pid=');
				if(index > -1) {
					_initialHash = _initialHash.substring(0, index);
					if(_initialHash.slice(-1) === '&') {
						_initialHash = _initialHash.slice(0, -1);
					}
				}
				
	
				setTimeout(function() {
					if(_isOpen) { // hasn't destroyed yet
						framework.bind(window, 'hashchange', self.onHashChange);
					}
				}, 40);
				
			},
			onHashChange: function() {
	
				if(_getHash() === _initialHash) {
	
					_closedFromURL = true;
					self.close();
					return;
				}
				if(!_hashChangedByScript) {
	
					_hashChangedByHistory = true;
					self.goTo( _parseItemIndexFromURL().pid );
					_hashChangedByHistory = false;
				}
				
			},
			updateURL: function() {
	
				// Delay the update of URL, to avoid lag during transition, 
				// and to not to trigger actions like "refresh page sound" or "blinking favicon" to often
				
				_cleanHistoryTimeouts();
				
	
				if(_hashChangedByHistory) {
					return;
				}
	
				if(!_historyChanged) {
					_updateHash(); // first time
				} else {
					_historyUpdateTimeout = setTimeout(_updateHash, 800);
				}
			}
		
		}
	});
	
	
	/*>>history*/
		framework.extend(self, publicMethods); };
		return PhotoSwipe;
	});

/***/ },
/* 2 */
/*!****************************************************!*\
  !*** ./~/photoswipe/dist/photoswipe-ui-default.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! PhotoSwipe Default UI - 4.1.1 - 2015-12-24
	* http://photoswipe.com
	* Copyright (c) 2015 Dmitry Semenov; */
	/**
	*
	* UI on top of main sliding area (caption, arrows, close button, etc.).
	* Built just using public methods/properties of PhotoSwipe.
	* 
	*/
	(function (root, factory) { 
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.PhotoSwipeUI_Default = factory();
		}
	})(this, function () {
	
		'use strict';
	
	
	
	var PhotoSwipeUI_Default =
	 function(pswp, framework) {
	
		var ui = this;
		var _overlayUIUpdated = false,
			_controlsVisible = true,
			_fullscrenAPI,
			_controls,
			_captionContainer,
			_fakeCaptionContainer,
			_indexIndicator,
			_shareButton,
			_shareModal,
			_shareModalHidden = true,
			_initalCloseOnScrollValue,
			_isIdle,
			_listen,
	
			_loadingIndicator,
			_loadingIndicatorHidden,
			_loadingIndicatorTimeout,
	
			_galleryHasOneSlide,
	
			_options,
			_defaultUIOptions = {
				barsSize: {top:44, bottom:'auto'},
				closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'], 
				timeToIdle: 4000, 
				timeToIdleOutside: 1000,
				loadingIndicatorDelay: 1000, // 2s
				
				addCaptionHTMLFn: function(item, captionEl /*, isFake */) {
					if(!item.title) {
						captionEl.children[0].innerHTML = '';
						return false;
					}
					captionEl.children[0].innerHTML = item.title;
					return true;
				},
	
				closeEl:true,
				captionEl: true,
				fullscreenEl: true,
				zoomEl: true,
				shareEl: true,
				counterEl: true,
				arrowEl: true,
				preloaderEl: true,
	
				tapToClose: false,
				tapToToggleControls: true,
	
				clickToCloseNonZoomable: true,
	
				shareButtons: [
					{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
					{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
					{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+
														'?url={{url}}&media={{image_url}}&description={{text}}'},
					{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
				],
				getImageURLForShare: function( /* shareButtonData */ ) {
					return pswp.currItem.src || '';
				},
				getPageURLForShare: function( /* shareButtonData */ ) {
					return window.location.href;
				},
				getTextForShare: function( /* shareButtonData */ ) {
					return pswp.currItem.title || '';
				},
					
				indexIndicatorSep: ' / ',
				fitControlsWidth: 1200
	
			},
			_blockControlsTap,
			_blockControlsTapTimeout;
	
	
	
		var _onControlsTap = function(e) {
				if(_blockControlsTap) {
					return true;
				}
	
	
				e = e || window.event;
	
				if(_options.timeToIdle && _options.mouseUsed && !_isIdle) {
					// reset idle timer
					_onIdleMouseMove();
				}
	
	
				var target = e.target || e.srcElement,
					uiElement,
					clickedClass = target.getAttribute('class') || '',
					found;
	
				for(var i = 0; i < _uiElements.length; i++) {
					uiElement = _uiElements[i];
					if(uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name ) > -1 ) {
						uiElement.onTap();
						found = true;
	
					}
				}
	
				if(found) {
					if(e.stopPropagation) {
						e.stopPropagation();
					}
					_blockControlsTap = true;
	
					// Some versions of Android don't prevent ghost click event 
					// when preventDefault() was called on touchstart and/or touchend.
					// 
					// This happens on v4.3, 4.2, 4.1, 
					// older versions strangely work correctly, 
					// but just in case we add delay on all of them)	
					var tapDelay = framework.features.isOldAndroid ? 600 : 30;
					_blockControlsTapTimeout = setTimeout(function() {
						_blockControlsTap = false;
					}, tapDelay);
				}
	
			},
			_fitControlsInViewport = function() {
				return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
			},
			_togglePswpClass = function(el, cName, add) {
				framework[ (add ? 'add' : 'remove') + 'Class' ](el, 'pswp__' + cName);
			},
	
			// add class when there is just one item in the gallery
			// (by default it hides left/right arrows and 1ofX counter)
			_countNumItems = function() {
				var hasOneSlide = (_options.getNumItemsFn() === 1);
	
				if(hasOneSlide !== _galleryHasOneSlide) {
					_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
					_galleryHasOneSlide = hasOneSlide;
				}
			},
			_toggleShareModalClass = function() {
				_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
			},
			_toggleShareModal = function() {
	
				_shareModalHidden = !_shareModalHidden;
				
				
				if(!_shareModalHidden) {
					_toggleShareModalClass();
					setTimeout(function() {
						if(!_shareModalHidden) {
							framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
						}
					}, 30);
				} else {
					framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
					setTimeout(function() {
						if(_shareModalHidden) {
							_toggleShareModalClass();
						}
					}, 300);
				}
				
				if(!_shareModalHidden) {
					_updateShareURLs();
				}
				return false;
			},
	
			_openWindowPopup = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;
	
				pswp.shout('shareLinkClick', e, target);
	
				if(!target.href) {
					return false;
				}
	
				if( target.hasAttribute('download') ) {
					return true;
				}
	
				window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,'+
											'location=yes,width=550,height=420,top=100,left=' + 
											(window.screen ? Math.round(screen.width / 2 - 275) : 100)  );
	
				if(!_shareModalHidden) {
					_toggleShareModal();
				}
				
				return false;
			},
			_updateShareURLs = function() {
				var shareButtonOut = '',
					shareButtonData,
					shareURL,
					image_url,
					page_url,
					share_text;
	
				for(var i = 0; i < _options.shareButtons.length; i++) {
					shareButtonData = _options.shareButtons[i];
	
					image_url = _options.getImageURLForShare(shareButtonData);
					page_url = _options.getPageURLForShare(shareButtonData);
					share_text = _options.getTextForShare(shareButtonData);
	
					shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url) )
										.replace('{{image_url}}', encodeURIComponent(image_url) )
										.replace('{{raw_image_url}}', image_url )
										.replace('{{text}}', encodeURIComponent(share_text) );
	
					shareButtonOut += '<a href="' + shareURL + '" target="_blank" '+
										'class="pswp__share--' + shareButtonData.id + '"' +
										(shareButtonData.download ? 'download' : '') + '>' + 
										shareButtonData.label + '</a>';
	
					if(_options.parseShareButtonOut) {
						shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
					}
				}
				_shareModal.children[0].innerHTML = shareButtonOut;
				_shareModal.children[0].onclick = _openWindowPopup;
	
			},
			_hasCloseClass = function(target) {
				for(var  i = 0; i < _options.closeElClasses.length; i++) {
					if( framework.hasClass(target, 'pswp__' + _options.closeElClasses[i]) ) {
						return true;
					}
				}
			},
			_idleInterval,
			_idleTimer,
			_idleIncrement = 0,
			_onIdleMouseMove = function() {
				clearTimeout(_idleTimer);
				_idleIncrement = 0;
				if(_isIdle) {
					ui.setIdle(false);
				}
			},
			_onMouseLeaveWindow = function(e) {
				e = e ? e : window.event;
				var from = e.relatedTarget || e.toElement;
				if (!from || from.nodeName === 'HTML') {
					clearTimeout(_idleTimer);
					_idleTimer = setTimeout(function() {
						ui.setIdle(true);
					}, _options.timeToIdleOutside);
				}
			},
			_setupFullscreenAPI = function() {
				if(_options.fullscreenEl && !framework.features.isOldAndroid) {
					if(!_fullscrenAPI) {
						_fullscrenAPI = ui.getFullscreenAPI();
					}
					if(_fullscrenAPI) {
						framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
						ui.updateFullscreen();
						framework.addClass(pswp.template, 'pswp--supports-fs');
					} else {
						framework.removeClass(pswp.template, 'pswp--supports-fs');
					}
				}
			},
			_setupLoadingIndicator = function() {
				// Setup loading indicator
				if(_options.preloaderEl) {
				
					_toggleLoadingIndicator(true);
	
					_listen('beforeChange', function() {
	
						clearTimeout(_loadingIndicatorTimeout);
	
						// display loading indicator with delay
						_loadingIndicatorTimeout = setTimeout(function() {
	
							if(pswp.currItem && pswp.currItem.loading) {
	
								if( !pswp.allowProgressiveImg() || (pswp.currItem.img && !pswp.currItem.img.naturalWidth)  ) {
									// show preloader if progressive loading is not enabled, 
									// or image width is not defined yet (because of slow connection)
									_toggleLoadingIndicator(false); 
									// items-controller.js function allowProgressiveImg
								}
								
							} else {
								_toggleLoadingIndicator(true); // hide preloader
							}
	
						}, _options.loadingIndicatorDelay);
						
					});
					_listen('imageLoadComplete', function(index, item) {
						if(pswp.currItem === item) {
							_toggleLoadingIndicator(true);
						}
					});
	
				}
			},
			_toggleLoadingIndicator = function(hide) {
				if( _loadingIndicatorHidden !== hide ) {
					_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
					_loadingIndicatorHidden = hide;
				}
			},
			_applyNavBarGaps = function(item) {
				var gap = item.vGap;
	
				if( _fitControlsInViewport() ) {
					
					var bars = _options.barsSize; 
					if(_options.captionEl && bars.bottom === 'auto') {
						if(!_fakeCaptionContainer) {
							_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
							_fakeCaptionContainer.appendChild( framework.createEl('pswp__caption__center') );
							_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
							framework.addClass(_controls, 'pswp__ui--fit');
						}
						if( _options.addCaptionHTMLFn(item, _fakeCaptionContainer, true) ) {
	
							var captionSize = _fakeCaptionContainer.clientHeight;
							gap.bottom = parseInt(captionSize,10) || 44;
						} else {
							gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
						}
					} else {
						gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
					}
					
					// height of top bar is static, no need to calculate it
					gap.top = bars.top;
				} else {
					gap.top = gap.bottom = 0;
				}
			},
			_setupIdle = function() {
				// Hide controls when mouse is used
				if(_options.timeToIdle) {
					_listen('mouseUsed', function() {
						
						framework.bind(document, 'mousemove', _onIdleMouseMove);
						framework.bind(document, 'mouseout', _onMouseLeaveWindow);
	
						_idleInterval = setInterval(function() {
							_idleIncrement++;
							if(_idleIncrement === 2) {
								ui.setIdle(true);
							}
						}, _options.timeToIdle / 2);
					});
				}
			},
			_setupHidingControlsDuringGestures = function() {
	
				// Hide controls on vertical drag
				_listen('onVerticalDrag', function(now) {
					if(_controlsVisible && now < 0.95) {
						ui.hideControls();
					} else if(!_controlsVisible && now >= 0.95) {
						ui.showControls();
					}
				});
	
				// Hide controls when pinching to close
				var pinchControlsHidden;
				_listen('onPinchClose' , function(now) {
					if(_controlsVisible && now < 0.9) {
						ui.hideControls();
						pinchControlsHidden = true;
					} else if(pinchControlsHidden && !_controlsVisible && now > 0.9) {
						ui.showControls();
					}
				});
	
				_listen('zoomGestureEnded', function() {
					pinchControlsHidden = false;
					if(pinchControlsHidden && !_controlsVisible) {
						ui.showControls();
					}
				});
	
			};
	
	
	
		var _uiElements = [
			{ 
				name: 'caption', 
				option: 'captionEl',
				onInit: function(el) {  
					_captionContainer = el; 
				} 
			},
			{ 
				name: 'share-modal', 
				option: 'shareEl',
				onInit: function(el) {  
					_shareModal = el;
				},
				onTap: function() {
					_toggleShareModal();
				} 
			},
			{ 
				name: 'button--share', 
				option: 'shareEl',
				onInit: function(el) { 
					_shareButton = el;
				},
				onTap: function() {
					_toggleShareModal();
				} 
			},
			{ 
				name: 'button--zoom', 
				option: 'zoomEl',
				onTap: pswp.toggleDesktopZoom
			},
			{ 
				name: 'counter', 
				option: 'counterEl',
				onInit: function(el) {  
					_indexIndicator = el;
				} 
			},
			{ 
				name: 'button--close', 
				option: 'closeEl',
				onTap: pswp.close
			},
			{ 
				name: 'button--arrow--left', 
				option: 'arrowEl',
				onTap: pswp.prev
			},
			{ 
				name: 'button--arrow--right', 
				option: 'arrowEl',
				onTap: pswp.next
			},
			{ 
				name: 'button--fs', 
				option: 'fullscreenEl',
				onTap: function() {  
					if(_fullscrenAPI.isFullscreen()) {
						_fullscrenAPI.exit();
					} else {
						_fullscrenAPI.enter();
					}
				} 
			},
			{ 
				name: 'preloader', 
				option: 'preloaderEl',
				onInit: function(el) {  
					_loadingIndicator = el;
				} 
			}
	
		];
	
		var _setupUIElements = function() {
			var item,
				classAttr,
				uiElement;
	
			var loopThroughChildElements = function(sChildren) {
				if(!sChildren) {
					return;
				}
	
				var l = sChildren.length;
				for(var i = 0; i < l; i++) {
					item = sChildren[i];
					classAttr = item.className;
	
					for(var a = 0; a < _uiElements.length; a++) {
						uiElement = _uiElements[a];
	
						if(classAttr.indexOf('pswp__' + uiElement.name) > -1  ) {
	
							if( _options[uiElement.option] ) { // if element is not disabled from options
								
								framework.removeClass(item, 'pswp__element--disabled');
								if(uiElement.onInit) {
									uiElement.onInit(item);
								}
								
								//item.style.display = 'block';
							} else {
								framework.addClass(item, 'pswp__element--disabled');
								//item.style.display = 'none';
							}
						}
					}
				}
			};
			loopThroughChildElements(_controls.children);
	
			var topBar =  framework.getChildByClass(_controls, 'pswp__top-bar');
			if(topBar) {
				loopThroughChildElements( topBar.children );
			}
		};
	
	
		
	
		ui.init = function() {
	
			// extend options
			framework.extend(pswp.options, _defaultUIOptions, true);
	
			// create local link for fast access
			_options = pswp.options;
	
			// find pswp__ui element
			_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');
	
			// create local link
			_listen = pswp.listen;
	
	
			_setupHidingControlsDuringGestures();
	
			// update controls when slides change
			_listen('beforeChange', ui.update);
	
			// toggle zoom on double-tap
			_listen('doubleTap', function(point) {
				var initialZoomLevel = pswp.currItem.initialZoomLevel;
				if(pswp.getZoomLevel() !== initialZoomLevel) {
					pswp.zoomTo(initialZoomLevel, point, 333);
				} else {
					pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
				}
			});
	
			// Allow text selection in caption
			_listen('preventDragEvent', function(e, isDown, preventObj) {
				var t = e.target || e.srcElement;
				if(
					t && 
					t.getAttribute('class') && e.type.indexOf('mouse') > -1 && 
					( t.getAttribute('class').indexOf('__caption') > 0 || (/(SMALL|STRONG|EM)/i).test(t.tagName) ) 
				) {
					preventObj.prevent = false;
				}
			});
	
			// bind events for UI
			_listen('bindEvents', function() {
				framework.bind(_controls, 'pswpTap click', _onControlsTap);
				framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
	
				if(!pswp.likelyTouchDevice) {
					framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
				}
			});
	
			// unbind events for UI
			_listen('unbindEvents', function() {
				if(!_shareModalHidden) {
					_toggleShareModal();
				}
	
				if(_idleInterval) {
					clearInterval(_idleInterval);
				}
				framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
				framework.unbind(document, 'mousemove', _onIdleMouseMove);
				framework.unbind(_controls, 'pswpTap click', _onControlsTap);
				framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
				framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
	
				if(_fullscrenAPI) {
					framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
					if(_fullscrenAPI.isFullscreen()) {
						_options.hideAnimationDuration = 0;
						_fullscrenAPI.exit();
					}
					_fullscrenAPI = null;
				}
			});
	
	
			// clean up things when gallery is destroyed
			_listen('destroy', function() {
				if(_options.captionEl) {
					if(_fakeCaptionContainer) {
						_controls.removeChild(_fakeCaptionContainer);
					}
					framework.removeClass(_captionContainer, 'pswp__caption--empty');
				}
	
				if(_shareModal) {
					_shareModal.children[0].onclick = null;
				}
				framework.removeClass(_controls, 'pswp__ui--over-close');
				framework.addClass( _controls, 'pswp__ui--hidden');
				ui.setIdle(false);
			});
			
	
			if(!_options.showAnimationDuration) {
				framework.removeClass( _controls, 'pswp__ui--hidden');
			}
			_listen('initialZoomIn', function() {
				if(_options.showAnimationDuration) {
					framework.removeClass( _controls, 'pswp__ui--hidden');
				}
			});
			_listen('initialZoomOut', function() {
				framework.addClass( _controls, 'pswp__ui--hidden');
			});
	
			_listen('parseVerticalMargin', _applyNavBarGaps);
			
			_setupUIElements();
	
			if(_options.shareEl && _shareButton && _shareModal) {
				_shareModalHidden = true;
			}
	
			_countNumItems();
	
			_setupIdle();
	
			_setupFullscreenAPI();
	
			_setupLoadingIndicator();
		};
	
		ui.setIdle = function(isIdle) {
			_isIdle = isIdle;
			_togglePswpClass(_controls, 'ui--idle', isIdle);
		};
	
		ui.update = function() {
			// Don't update UI if it's hidden
			if(_controlsVisible && pswp.currItem) {
				
				ui.updateIndexIndicator();
	
				if(_options.captionEl) {
					_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);
	
					_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
				}
	
				_overlayUIUpdated = true;
	
			} else {
				_overlayUIUpdated = false;
			}
	
			if(!_shareModalHidden) {
				_toggleShareModal();
			}
	
			_countNumItems();
		};
	
		ui.updateFullscreen = function(e) {
	
			if(e) {
				// some browsers change window scroll position during the fullscreen
				// so PhotoSwipe updates it just in case
				setTimeout(function() {
					pswp.setScrollOffset( 0, framework.getScrollY() );
				}, 50);
			}
			
			// toogle pswp--fs class on root element
			framework[ (_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class' ](pswp.template, 'pswp--fs');
		};
	
		ui.updateIndexIndicator = function() {
			if(_options.counterEl) {
				_indexIndicator.innerHTML = (pswp.getCurrentIndex()+1) + 
											_options.indexIndicatorSep + 
											_options.getNumItemsFn();
			}
		};
		
		ui.onGlobalTap = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
	
			if(_blockControlsTap) {
				return;
			}
	
			if(e.detail && e.detail.pointerType === 'mouse') {
	
				// close gallery if clicked outside of the image
				if(_hasCloseClass(target)) {
					pswp.close();
					return;
				}
	
				if(framework.hasClass(target, 'pswp__img')) {
					if(pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
						if(_options.clickToCloseNonZoomable) {
							pswp.close();
						}
					} else {
						pswp.toggleDesktopZoom(e.detail.releasePoint);
					}
				}
				
			} else {
	
				// tap anywhere (except buttons) to toggle visibility of controls
				if(_options.tapToToggleControls) {
					if(_controlsVisible) {
						ui.hideControls();
					} else {
						ui.showControls();
					}
				}
	
				// tap to close gallery
				if(_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target)) ) {
					pswp.close();
					return;
				}
				
			}
		};
		ui.onMouseOver = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
	
			// add class when mouse is over an element that should close the gallery
			_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
		};
	
		ui.hideControls = function() {
			framework.addClass(_controls,'pswp__ui--hidden');
			_controlsVisible = false;
		};
	
		ui.showControls = function() {
			_controlsVisible = true;
			if(!_overlayUIUpdated) {
				ui.update();
			}
			framework.removeClass(_controls,'pswp__ui--hidden');
		};
	
		ui.supportsFullscreen = function() {
			var d = document;
			return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
		};
	
		ui.getFullscreenAPI = function() {
			var dE = document.documentElement,
				api,
				tF = 'fullscreenchange';
	
			if (dE.requestFullscreen) {
				api = {
					enterK: 'requestFullscreen',
					exitK: 'exitFullscreen',
					elementK: 'fullscreenElement',
					eventK: tF
				};
	
			} else if(dE.mozRequestFullScreen ) {
				api = {
					enterK: 'mozRequestFullScreen',
					exitK: 'mozCancelFullScreen',
					elementK: 'mozFullScreenElement',
					eventK: 'moz' + tF
				};
	
				
	
			} else if(dE.webkitRequestFullscreen) {
				api = {
					enterK: 'webkitRequestFullscreen',
					exitK: 'webkitExitFullscreen',
					elementK: 'webkitFullscreenElement',
					eventK: 'webkit' + tF
				};
	
			} else if(dE.msRequestFullscreen) {
				api = {
					enterK: 'msRequestFullscreen',
					exitK: 'msExitFullscreen',
					elementK: 'msFullscreenElement',
					eventK: 'MSFullscreenChange'
				};
			}
	
			if(api) {
				api.enter = function() { 
					// disable close-on-scroll in fullscreen
					_initalCloseOnScrollValue = _options.closeOnScroll; 
					_options.closeOnScroll = false; 
	
					if(this.enterK === 'webkitRequestFullscreen') {
						pswp.template[this.enterK]( Element.ALLOW_KEYBOARD_INPUT );
					} else {
						return pswp.template[this.enterK](); 
					}
				};
				api.exit = function() { 
					_options.closeOnScroll = _initalCloseOnScrollValue;
	
					return document[this.exitK](); 
	
				};
				api.isFullscreen = function() { return document[this.elementK]; };
			}
	
			return api;
		};
	
	
	
	};
	return PhotoSwipeUI_Default;
	
	
	});


/***/ },
/* 3 */
/*!*******************************!*\
  !*** ./js/gallery/Gallery.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULTS = {
	  pswpClassName: '.pswp',
	  galleryClassName: '.gallery-anchor',
	  thumbsSelector: '.gallery-thumb-selector > a',
	  masonryParams: {
	    gutter: 20,
	    itemSelector: '.gallery-thumb-selector',
	    columnWidth: '.gallery-col-sizer'
	  },
	  photoSwipeParams: {}
	};
	
	function getThumbBoundsFnClosure(galleryAnchor, thumbsSelector) {
	  return function (index) {
	    // find thumbnail element
	    var thumbnails = galleryAnchor.querySelectorAll(thumbsSelector);
	    var currentThumbnail = thumbnails.item(index);
	
	    // get window scroll Y
	    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
	    // optionally get horizontal scroll
	
	    // get position of element relative to viewport
	    var rect = currentThumbnail.getBoundingClientRect();
	
	    // w = width
	    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
	  };
	}
	
	var Gallery = function () {
	  function Gallery(galleryAnchor, tools) {
	    var opts = arguments.length <= 2 || arguments[2] === undefined ? DEFAULTS : arguments[2];
	
	    _classCallCheck(this, Gallery);
	
	    this.galleryAnchor = galleryAnchor;
	    this.tools = tools;
	    this.opts = opts;
	  }
	
	  _createClass(Gallery, [{
	    key: 'init',
	    value: function init() {
	      this.initGalleryEvents();
	      this.buildThumbnailsGrid();
	    }
	  }, {
	    key: 'onThumbClick',
	    value: function onThumbClick(event) {
	      event.preventDefault();
	      var thumb = event.currentTarget;
	      var thumbIndex = this.getThumbIndex(thumb);
	      this.openPhotoSwipe(this.getPswpAnchor(), thumbIndex, this.parseThumbs(), this.preparePhotoSwipeParams(thumbIndex));
	    }
	  }, {
	    key: 'buildThumbnailsGrid',
	    value: function buildThumbnailsGrid() {
	      var Masonry = this.tools.Masonry;
	      if (Masonry !== null) {
	        Masonry = new Masonry(this.galleryAnchor, this.opts.masonryParams);
	      }
	      return Masonry;
	    }
	  }, {
	    key: 'openPhotoSwipe',
	    value: function openPhotoSwipe(pswpAnchor, thumbIndex, items, opts) {
	      var pswp = new this.tools.PhotoSwipe(pswpAnchor, this.tools.PhotoSwipeUIDefault, items, opts);
	      pswp.init();
	    }
	  }, {
	    key: 'initGalleryEvents',
	    value: function initGalleryEvents() {
	      var _this = this;
	
	      var figures = Array.prototype.slice.call(this.galleryAnchor.querySelectorAll(this.opts.thumbsSelector));
	      figures.forEach(function (fig) {
	        return fig.addEventListener('click', function (e) {
	          return _this.onThumbClick(e);
	        });
	      });
	    }
	  }, {
	    key: 'getPswpAnchor',
	    value: function getPswpAnchor() {
	      return document.querySelector(this.opts.pswpClassName);
	    }
	  }, {
	    key: 'parseThumbs',
	    value: function parseThumbs() {
	      var figures = Array.prototype.slice.call(this.galleryAnchor.querySelectorAll(this.opts.thumbsSelector));
	      var items = figures.map(function (figLink) {
	        var fig = figLink.parentNode;
	        var item = {
	          src: figLink.getAttribute('href'),
	          w: parseInt(figLink.getAttribute('data-width'), 10),
	          h: parseInt(figLink.getAttribute('data-height'), 10)
	        };
	        var figCaption = fig.querySelector('figcaption');
	        if (figCaption !== null) {
	          item.title = figCaption.innerHTML;
	        }
	        var figThumbImg = figLink.querySelector('img');
	        if (figThumbImg !== null) {
	          item.msrc = figThumbImg.getAttribute('src');
	        }
	        return item;
	      });
	      return items;
	    }
	  }, {
	    key: 'getThumbIndex',
	    value: function getThumbIndex(figLink) {
	      return parseInt(figLink.getAttribute('data-index'), 10);
	    }
	  }, {
	    key: 'preparePhotoSwipeParams',
	    value: function preparePhotoSwipeParams(thumbIndex) {
	      var params = _extends({}, this.opts.photoSwipeParams);
	      params.index = thumbIndex;
	      params.getThumbBoundsFn = getThumbBoundsFnClosure(this.galleryAnchor, this.opts.thumbsSelector);
	      return params;
	    }
	  }], [{
	    key: 'createGallery',
	    value: function createGallery(PhotoSwipe, PhotoSwipeUIDefault) {
	      var opts = arguments.length <= 2 || arguments[2] === undefined ? DEFAULTS : arguments[2];
	      var Masonry = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	      var newOpts = _extends(DEFAULTS, opts);
	      var galleryAnchor = document.querySelector(newOpts.galleryClassName);
	      if (galleryAnchor !== null) {
	        var tools = { Masonry: Masonry, PhotoSwipe: PhotoSwipe, PhotoSwipeUIDefault: PhotoSwipeUIDefault };
	        var gallery = new Gallery(galleryAnchor, tools, newOpts);
	        gallery.init();
	      }
	      return null;
	    }
	  }]);
	
	  return Gallery;
	}();
	
	exports.default = Gallery;

/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./js/gallery/gallery.scss ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/postcss-loader!./../../~/sass-loader!./gallery.scss */ 5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./gallery.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./gallery.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/*!***********************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/sass-loader!./js/gallery/gallery.scss ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 6)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Material Design Lite */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/*\n * What follows is the result of much research on cross-browser styling.\n * Credit left inline and big thanks to Nicolas Gallagher, Jonathan Neal,\n * Kroc Camen, and the H5BP dev community and team.\n */\n/* ==========================================================================\n   Base styles: opinionated defaults\n   ========================================================================== */\nhtml {\n  color: rgba(0,0,0, 0.87);\n  font-size: 1em;\n  line-height: 1.4; }\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none; }\n::selection {\n  background: #b3d4fc;\n  text-shadow: none; }\n\n/*\n * A better looking default horizontal rule\n */\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0; }\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle; }\n\n/*\n * Remove default fieldset styles.\n */\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0; }\n\n/*\n * Allow only vertical resizing of textareas.\n */\ntextarea {\n  resize: vertical; }\n\n/* ==========================================================================\n   Browser Upgrade Prompt\n   ========================================================================== */\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0; }\n\n/* ==========================================================================\n   Author's custom styles\n   ========================================================================== */\n/* ==========================================================================\n   Helper classes\n   ========================================================================== */\n/*\n * Hide visually and from screen readers:\n */\n.hidden {\n  display: none !important; }\n\n/*\n * Hide only visually, but have it available for screen readers:\n * http://snook.ca/archives/html_and_css/hiding-content-for-accessibility\n */\n.visuallyhidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n/*\n * Extends the .visuallyhidden class to allow the element\n * to be focusable when navigated to via the keyboard:\n * https://www.drupal.org/node/897638\n */\n.visuallyhidden.focusable:active,\n.visuallyhidden.focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n\n/*\n * Hide visually and from screen readers, but maintain layout\n */\n.invisible {\n  visibility: hidden; }\n\n/*\n * Clearfix: contain floats\n *\n * For modern browsers\n * 1. The space content is one way to avoid an Opera bug when the\n *    `contenteditable` attribute is included anywhere else in the document.\n *    Otherwise it causes space to appear at the top and bottom of elements\n *    that receive the `clearfix` class.\n * 2. The use of `table` rather than `block` is only necessary if using\n *    `:before` to contain the top-margins of child elements.\n */\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  /* 1 */\n  display: table;\n  /* 2 */ }\n\n.clearfix:after {\n  clear: both; }\n\n/* ==========================================================================\n   EXAMPLE Media Queries for Responsive Design.\n   These examples override the primary ('mobile first') styles.\n   Modify as content requires.\n   ========================================================================== */\n@media only screen and (min-width: 35em) {\n  /* Style adjustments for viewports that meet the condition */ }\n\n@media print, (-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 1.25dppx), (min-resolution: 120dpi) {\n  /* Style adjustments for high resolution devices */ }\n\n/* ==========================================================================\n   Print styles.\n   Inlined to avoid the additional HTTP request:\n   http://www.phpied.com/delay-loading-your-print-css/\n   ========================================================================== */\n@media print {\n  *,\n  *:before,\n  *:after,\n  *:first-letter {\n    background: transparent !important;\n    color: #000 !important;\n    /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  a[href]:after {\n    content: \" (\" attr(href) \")\"; }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\"; }\n  /*\n     * Don't show links that are fragment identifiers,\n     * or use the `javascript:` pseudo protocol\n     */\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\"; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  /*\n     * Printing Tables:\n     * http://css-discuss.incutio.com/wiki/Printing_Tables\n     */\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  img {\n    max-width: 100% !important; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Remove the unwanted box around FAB buttons */\n/* More info: http://goo.gl/IPwKi */\na, .mdl-accordion, .mdl-button, .mdl-card, .mdl-checkbox, .mdl-dropdown-menu,\n.mdl-icon-toggle, .mdl-item, .mdl-radio, .mdl-slider, .mdl-switch, .mdl-tabs__tab {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); }\n\n/*\n * Make html take up the entire screen\n * Then set touch-action to avoid touch delay on mobile IE\n */\nhtml {\n  width: 100%;\n  height: 100%;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation; }\n\n/*\n* Make body take up the entire screen\n* Remove body margin so layout containers don't cause extra overflow.\n*/\nbody {\n  width: 100%;\n  min-height: 100%;\n  margin: 0; }\n\n/*\n * Main display reset for IE support.\n * Source: http://weblog.west-wind.com/posts/2015/Jan/12/main-HTML5-Tag-not-working-in-Internet-Explorer-91011\n */\nmain {\n  display: block; }\n\n/*\n* Apply no display to elements with the hidden attribute.\n* IE 9 and 10 support.\n*/\n*[hidden] {\n  display: none !important; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\nhtml, body {\n  font-family: \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 20px; }\n\nh1, h2, h3, h4, h5, h6, p {\n  margin: 0;\n  padding: 0; }\n\n/**\n  * Styles for HTML elements\n  */\nh1 small, h2 small, h3 small, h4 small, h5 small, h6 small {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em;\n  opacity: 0.54;\n  font-size: 0.6em; }\n\nh1 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em;\n  margin-top: 24px;\n  margin-bottom: 24px; }\n\nh2 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 48px;\n  margin-top: 24px;\n  margin-bottom: 24px; }\n\nh3 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px;\n  margin-top: 24px;\n  margin-bottom: 24px; }\n\nh4 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px;\n  -moz-osx-font-smoothing: grayscale;\n  margin-top: 24px;\n  margin-bottom: 16px; }\n\nh5 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em;\n  margin-top: 24px;\n  margin-bottom: 16px; }\n\nh6 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em;\n  margin-top: 24px;\n  margin-bottom: 16px; }\n\np {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  margin-bottom: 16px; }\n\na {\n  color: rgb(255,82,82);\n  font-weight: 500; }\n\nblockquote {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  position: relative;\n  font-size: 24px;\n  font-weight: 300;\n  font-style: italic;\n  line-height: 1.35;\n  letter-spacing: 0.08em; }\n  blockquote:before {\n    position: absolute;\n    left: -0.5em;\n    content: '\\201C'; }\n  blockquote:after {\n    content: '\\201D';\n    margin-left: -0.05em; }\n\nmark {\n  background-color: #f4ff81; }\n\ndt {\n  font-weight: 700; }\n\naddress {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0;\n  font-style: normal; }\n\nul, ol {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n/**\n * Class Name Styles\n */\n.mdl-typography--display-4 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 112px;\n  font-weight: 300;\n  line-height: 1;\n  letter-spacing: -0.04em; }\n\n.mdl-typography--display-4-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 112px;\n  font-weight: 300;\n  line-height: 1;\n  letter-spacing: -0.04em;\n  opacity: 0.54; }\n\n.mdl-typography--display-3 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em; }\n\n.mdl-typography--display-3-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 56px;\n  font-weight: 400;\n  line-height: 1.35;\n  letter-spacing: -0.02em;\n  opacity: 0.54; }\n\n.mdl-typography--display-2 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 48px; }\n\n.mdl-typography--display-2-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 48px;\n  opacity: 0.54; }\n\n.mdl-typography--display-1 {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px; }\n\n.mdl-typography--display-1-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px;\n  opacity: 0.54; }\n\n.mdl-typography--headline {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px;\n  -moz-osx-font-smoothing: grayscale; }\n\n.mdl-typography--headline-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px;\n  -moz-osx-font-smoothing: grayscale;\n  opacity: 0.87; }\n\n.mdl-typography--title {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em; }\n\n.mdl-typography--title-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em;\n  opacity: 0.87; }\n\n.mdl-typography--subhead {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em; }\n\n.mdl-typography--subhead-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em;\n  opacity: 0.87; }\n\n.mdl-typography--body-2 {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-2-color-contrast {\n  font-size: 14px;\n  font-weight: bold;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--body-1 {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-1-color-contrast {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--body-2-force-preferred-font {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-2-force-preferred-font-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--body-1-force-preferred-font {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0; }\n\n.mdl-typography--body-1-force-preferred-font-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--caption {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--caption-force-preferred-font {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--caption-color-contrast {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.54; }\n\n.mdl-typography--caption-force-preferred-font-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.54; }\n\n.mdl-typography--menu {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--menu-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--button {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 1;\n  letter-spacing: 0; }\n\n.mdl-typography--button-color-contrast {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 1;\n  letter-spacing: 0;\n  opacity: 0.87; }\n\n.mdl-typography--text-left {\n  text-align: left; }\n\n.mdl-typography--text-right {\n  text-align: right; }\n\n.mdl-typography--text-center {\n  text-align: center; }\n\n.mdl-typography--text-justify {\n  text-align: justify; }\n\n.mdl-typography--text-nowrap {\n  white-space: nowrap; }\n\n.mdl-typography--text-lowercase {\n  text-transform: lowercase; }\n\n.mdl-typography--text-uppercase {\n  text-transform: uppercase; }\n\n.mdl-typography--text-capitalize {\n  text-transform: capitalize; }\n\n.mdl-typography--font-thin {\n  font-weight: 200 !important; }\n\n.mdl-typography--font-light {\n  font-weight: 300 !important; }\n\n.mdl-typography--font-regular {\n  font-weight: 400 !important; }\n\n.mdl-typography--font-medium {\n  font-weight: 500 !important; }\n\n.mdl-typography--font-bold {\n  font-weight: 700 !important; }\n\n.mdl-typography--font-black {\n  font-weight: 900 !important; }\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  word-wrap: normal;\n  font-feature-settings: 'liga';\n  -webkit-font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-color-text--red {\n  color: rgb(244,67,54) !important; }\n\n.mdl-color--red {\n  background-color: rgb(244,67,54) !important; }\n\n.mdl-color-text--red-50 {\n  color: rgb(255,235,238) !important; }\n\n.mdl-color--red-50 {\n  background-color: rgb(255,235,238) !important; }\n\n.mdl-color-text--red-100 {\n  color: rgb(255,205,210) !important; }\n\n.mdl-color--red-100 {\n  background-color: rgb(255,205,210) !important; }\n\n.mdl-color-text--red-200 {\n  color: rgb(239,154,154) !important; }\n\n.mdl-color--red-200 {\n  background-color: rgb(239,154,154) !important; }\n\n.mdl-color-text--red-300 {\n  color: rgb(229,115,115) !important; }\n\n.mdl-color--red-300 {\n  background-color: rgb(229,115,115) !important; }\n\n.mdl-color-text--red-400 {\n  color: rgb(239,83,80) !important; }\n\n.mdl-color--red-400 {\n  background-color: rgb(239,83,80) !important; }\n\n.mdl-color-text--red-500 {\n  color: rgb(244,67,54) !important; }\n\n.mdl-color--red-500 {\n  background-color: rgb(244,67,54) !important; }\n\n.mdl-color-text--red-600 {\n  color: rgb(229,57,53) !important; }\n\n.mdl-color--red-600 {\n  background-color: rgb(229,57,53) !important; }\n\n.mdl-color-text--red-700 {\n  color: rgb(211,47,47) !important; }\n\n.mdl-color--red-700 {\n  background-color: rgb(211,47,47) !important; }\n\n.mdl-color-text--red-800 {\n  color: rgb(198,40,40) !important; }\n\n.mdl-color--red-800 {\n  background-color: rgb(198,40,40) !important; }\n\n.mdl-color-text--red-900 {\n  color: rgb(183,28,28) !important; }\n\n.mdl-color--red-900 {\n  background-color: rgb(183,28,28) !important; }\n\n.mdl-color-text--red-A100 {\n  color: rgb(255,138,128) !important; }\n\n.mdl-color--red-A100 {\n  background-color: rgb(255,138,128) !important; }\n\n.mdl-color-text--red-A200 {\n  color: rgb(255,82,82) !important; }\n\n.mdl-color--red-A200 {\n  background-color: rgb(255,82,82) !important; }\n\n.mdl-color-text--red-A400 {\n  color: rgb(255,23,68) !important; }\n\n.mdl-color--red-A400 {\n  background-color: rgb(255,23,68) !important; }\n\n.mdl-color-text--red-A700 {\n  color: rgb(213,0,0) !important; }\n\n.mdl-color--red-A700 {\n  background-color: rgb(213,0,0) !important; }\n\n.mdl-color-text--pink {\n  color: rgb(233,30,99) !important; }\n\n.mdl-color--pink {\n  background-color: rgb(233,30,99) !important; }\n\n.mdl-color-text--pink-50 {\n  color: rgb(252,228,236) !important; }\n\n.mdl-color--pink-50 {\n  background-color: rgb(252,228,236) !important; }\n\n.mdl-color-text--pink-100 {\n  color: rgb(248,187,208) !important; }\n\n.mdl-color--pink-100 {\n  background-color: rgb(248,187,208) !important; }\n\n.mdl-color-text--pink-200 {\n  color: rgb(244,143,177) !important; }\n\n.mdl-color--pink-200 {\n  background-color: rgb(244,143,177) !important; }\n\n.mdl-color-text--pink-300 {\n  color: rgb(240,98,146) !important; }\n\n.mdl-color--pink-300 {\n  background-color: rgb(240,98,146) !important; }\n\n.mdl-color-text--pink-400 {\n  color: rgb(236,64,122) !important; }\n\n.mdl-color--pink-400 {\n  background-color: rgb(236,64,122) !important; }\n\n.mdl-color-text--pink-500 {\n  color: rgb(233,30,99) !important; }\n\n.mdl-color--pink-500 {\n  background-color: rgb(233,30,99) !important; }\n\n.mdl-color-text--pink-600 {\n  color: rgb(216,27,96) !important; }\n\n.mdl-color--pink-600 {\n  background-color: rgb(216,27,96) !important; }\n\n.mdl-color-text--pink-700 {\n  color: rgb(194,24,91) !important; }\n\n.mdl-color--pink-700 {\n  background-color: rgb(194,24,91) !important; }\n\n.mdl-color-text--pink-800 {\n  color: rgb(173,20,87) !important; }\n\n.mdl-color--pink-800 {\n  background-color: rgb(173,20,87) !important; }\n\n.mdl-color-text--pink-900 {\n  color: rgb(136,14,79) !important; }\n\n.mdl-color--pink-900 {\n  background-color: rgb(136,14,79) !important; }\n\n.mdl-color-text--pink-A100 {\n  color: rgb(255,128,171) !important; }\n\n.mdl-color--pink-A100 {\n  background-color: rgb(255,128,171) !important; }\n\n.mdl-color-text--pink-A200 {\n  color: rgb(255,64,129) !important; }\n\n.mdl-color--pink-A200 {\n  background-color: rgb(255,64,129) !important; }\n\n.mdl-color-text--pink-A400 {\n  color: rgb(245,0,87) !important; }\n\n.mdl-color--pink-A400 {\n  background-color: rgb(245,0,87) !important; }\n\n.mdl-color-text--pink-A700 {\n  color: rgb(197,17,98) !important; }\n\n.mdl-color--pink-A700 {\n  background-color: rgb(197,17,98) !important; }\n\n.mdl-color-text--purple {\n  color: rgb(156,39,176) !important; }\n\n.mdl-color--purple {\n  background-color: rgb(156,39,176) !important; }\n\n.mdl-color-text--purple-50 {\n  color: rgb(243,229,245) !important; }\n\n.mdl-color--purple-50 {\n  background-color: rgb(243,229,245) !important; }\n\n.mdl-color-text--purple-100 {\n  color: rgb(225,190,231) !important; }\n\n.mdl-color--purple-100 {\n  background-color: rgb(225,190,231) !important; }\n\n.mdl-color-text--purple-200 {\n  color: rgb(206,147,216) !important; }\n\n.mdl-color--purple-200 {\n  background-color: rgb(206,147,216) !important; }\n\n.mdl-color-text--purple-300 {\n  color: rgb(186,104,200) !important; }\n\n.mdl-color--purple-300 {\n  background-color: rgb(186,104,200) !important; }\n\n.mdl-color-text--purple-400 {\n  color: rgb(171,71,188) !important; }\n\n.mdl-color--purple-400 {\n  background-color: rgb(171,71,188) !important; }\n\n.mdl-color-text--purple-500 {\n  color: rgb(156,39,176) !important; }\n\n.mdl-color--purple-500 {\n  background-color: rgb(156,39,176) !important; }\n\n.mdl-color-text--purple-600 {\n  color: rgb(142,36,170) !important; }\n\n.mdl-color--purple-600 {\n  background-color: rgb(142,36,170) !important; }\n\n.mdl-color-text--purple-700 {\n  color: rgb(123,31,162) !important; }\n\n.mdl-color--purple-700 {\n  background-color: rgb(123,31,162) !important; }\n\n.mdl-color-text--purple-800 {\n  color: rgb(106,27,154) !important; }\n\n.mdl-color--purple-800 {\n  background-color: rgb(106,27,154) !important; }\n\n.mdl-color-text--purple-900 {\n  color: rgb(74,20,140) !important; }\n\n.mdl-color--purple-900 {\n  background-color: rgb(74,20,140) !important; }\n\n.mdl-color-text--purple-A100 {\n  color: rgb(234,128,252) !important; }\n\n.mdl-color--purple-A100 {\n  background-color: rgb(234,128,252) !important; }\n\n.mdl-color-text--purple-A200 {\n  color: rgb(224,64,251) !important; }\n\n.mdl-color--purple-A200 {\n  background-color: rgb(224,64,251) !important; }\n\n.mdl-color-text--purple-A400 {\n  color: rgb(213,0,249) !important; }\n\n.mdl-color--purple-A400 {\n  background-color: rgb(213,0,249) !important; }\n\n.mdl-color-text--purple-A700 {\n  color: rgb(170,0,255) !important; }\n\n.mdl-color--purple-A700 {\n  background-color: rgb(170,0,255) !important; }\n\n.mdl-color-text--deep-purple {\n  color: rgb(103,58,183) !important; }\n\n.mdl-color--deep-purple {\n  background-color: rgb(103,58,183) !important; }\n\n.mdl-color-text--deep-purple-50 {\n  color: rgb(237,231,246) !important; }\n\n.mdl-color--deep-purple-50 {\n  background-color: rgb(237,231,246) !important; }\n\n.mdl-color-text--deep-purple-100 {\n  color: rgb(209,196,233) !important; }\n\n.mdl-color--deep-purple-100 {\n  background-color: rgb(209,196,233) !important; }\n\n.mdl-color-text--deep-purple-200 {\n  color: rgb(179,157,219) !important; }\n\n.mdl-color--deep-purple-200 {\n  background-color: rgb(179,157,219) !important; }\n\n.mdl-color-text--deep-purple-300 {\n  color: rgb(149,117,205) !important; }\n\n.mdl-color--deep-purple-300 {\n  background-color: rgb(149,117,205) !important; }\n\n.mdl-color-text--deep-purple-400 {\n  color: rgb(126,87,194) !important; }\n\n.mdl-color--deep-purple-400 {\n  background-color: rgb(126,87,194) !important; }\n\n.mdl-color-text--deep-purple-500 {\n  color: rgb(103,58,183) !important; }\n\n.mdl-color--deep-purple-500 {\n  background-color: rgb(103,58,183) !important; }\n\n.mdl-color-text--deep-purple-600 {\n  color: rgb(94,53,177) !important; }\n\n.mdl-color--deep-purple-600 {\n  background-color: rgb(94,53,177) !important; }\n\n.mdl-color-text--deep-purple-700 {\n  color: rgb(81,45,168) !important; }\n\n.mdl-color--deep-purple-700 {\n  background-color: rgb(81,45,168) !important; }\n\n.mdl-color-text--deep-purple-800 {\n  color: rgb(69,39,160) !important; }\n\n.mdl-color--deep-purple-800 {\n  background-color: rgb(69,39,160) !important; }\n\n.mdl-color-text--deep-purple-900 {\n  color: rgb(49,27,146) !important; }\n\n.mdl-color--deep-purple-900 {\n  background-color: rgb(49,27,146) !important; }\n\n.mdl-color-text--deep-purple-A100 {\n  color: rgb(179,136,255) !important; }\n\n.mdl-color--deep-purple-A100 {\n  background-color: rgb(179,136,255) !important; }\n\n.mdl-color-text--deep-purple-A200 {\n  color: rgb(124,77,255) !important; }\n\n.mdl-color--deep-purple-A200 {\n  background-color: rgb(124,77,255) !important; }\n\n.mdl-color-text--deep-purple-A400 {\n  color: rgb(101,31,255) !important; }\n\n.mdl-color--deep-purple-A400 {\n  background-color: rgb(101,31,255) !important; }\n\n.mdl-color-text--deep-purple-A700 {\n  color: rgb(98,0,234) !important; }\n\n.mdl-color--deep-purple-A700 {\n  background-color: rgb(98,0,234) !important; }\n\n.mdl-color-text--indigo {\n  color: rgb(63,81,181) !important; }\n\n.mdl-color--indigo {\n  background-color: rgb(63,81,181) !important; }\n\n.mdl-color-text--indigo-50 {\n  color: rgb(232,234,246) !important; }\n\n.mdl-color--indigo-50 {\n  background-color: rgb(232,234,246) !important; }\n\n.mdl-color-text--indigo-100 {\n  color: rgb(197,202,233) !important; }\n\n.mdl-color--indigo-100 {\n  background-color: rgb(197,202,233) !important; }\n\n.mdl-color-text--indigo-200 {\n  color: rgb(159,168,218) !important; }\n\n.mdl-color--indigo-200 {\n  background-color: rgb(159,168,218) !important; }\n\n.mdl-color-text--indigo-300 {\n  color: rgb(121,134,203) !important; }\n\n.mdl-color--indigo-300 {\n  background-color: rgb(121,134,203) !important; }\n\n.mdl-color-text--indigo-400 {\n  color: rgb(92,107,192) !important; }\n\n.mdl-color--indigo-400 {\n  background-color: rgb(92,107,192) !important; }\n\n.mdl-color-text--indigo-500 {\n  color: rgb(63,81,181) !important; }\n\n.mdl-color--indigo-500 {\n  background-color: rgb(63,81,181) !important; }\n\n.mdl-color-text--indigo-600 {\n  color: rgb(57,73,171) !important; }\n\n.mdl-color--indigo-600 {\n  background-color: rgb(57,73,171) !important; }\n\n.mdl-color-text--indigo-700 {\n  color: rgb(48,63,159) !important; }\n\n.mdl-color--indigo-700 {\n  background-color: rgb(48,63,159) !important; }\n\n.mdl-color-text--indigo-800 {\n  color: rgb(40,53,147) !important; }\n\n.mdl-color--indigo-800 {\n  background-color: rgb(40,53,147) !important; }\n\n.mdl-color-text--indigo-900 {\n  color: rgb(26,35,126) !important; }\n\n.mdl-color--indigo-900 {\n  background-color: rgb(26,35,126) !important; }\n\n.mdl-color-text--indigo-A100 {\n  color: rgb(140,158,255) !important; }\n\n.mdl-color--indigo-A100 {\n  background-color: rgb(140,158,255) !important; }\n\n.mdl-color-text--indigo-A200 {\n  color: rgb(83,109,254) !important; }\n\n.mdl-color--indigo-A200 {\n  background-color: rgb(83,109,254) !important; }\n\n.mdl-color-text--indigo-A400 {\n  color: rgb(61,90,254) !important; }\n\n.mdl-color--indigo-A400 {\n  background-color: rgb(61,90,254) !important; }\n\n.mdl-color-text--indigo-A700 {\n  color: rgb(48,79,254) !important; }\n\n.mdl-color--indigo-A700 {\n  background-color: rgb(48,79,254) !important; }\n\n.mdl-color-text--blue {\n  color: rgb(33,150,243) !important; }\n\n.mdl-color--blue {\n  background-color: rgb(33,150,243) !important; }\n\n.mdl-color-text--blue-50 {\n  color: rgb(227,242,253) !important; }\n\n.mdl-color--blue-50 {\n  background-color: rgb(227,242,253) !important; }\n\n.mdl-color-text--blue-100 {\n  color: rgb(187,222,251) !important; }\n\n.mdl-color--blue-100 {\n  background-color: rgb(187,222,251) !important; }\n\n.mdl-color-text--blue-200 {\n  color: rgb(144,202,249) !important; }\n\n.mdl-color--blue-200 {\n  background-color: rgb(144,202,249) !important; }\n\n.mdl-color-text--blue-300 {\n  color: rgb(100,181,246) !important; }\n\n.mdl-color--blue-300 {\n  background-color: rgb(100,181,246) !important; }\n\n.mdl-color-text--blue-400 {\n  color: rgb(66,165,245) !important; }\n\n.mdl-color--blue-400 {\n  background-color: rgb(66,165,245) !important; }\n\n.mdl-color-text--blue-500 {\n  color: rgb(33,150,243) !important; }\n\n.mdl-color--blue-500 {\n  background-color: rgb(33,150,243) !important; }\n\n.mdl-color-text--blue-600 {\n  color: rgb(30,136,229) !important; }\n\n.mdl-color--blue-600 {\n  background-color: rgb(30,136,229) !important; }\n\n.mdl-color-text--blue-700 {\n  color: rgb(25,118,210) !important; }\n\n.mdl-color--blue-700 {\n  background-color: rgb(25,118,210) !important; }\n\n.mdl-color-text--blue-800 {\n  color: rgb(21,101,192) !important; }\n\n.mdl-color--blue-800 {\n  background-color: rgb(21,101,192) !important; }\n\n.mdl-color-text--blue-900 {\n  color: rgb(13,71,161) !important; }\n\n.mdl-color--blue-900 {\n  background-color: rgb(13,71,161) !important; }\n\n.mdl-color-text--blue-A100 {\n  color: rgb(130,177,255) !important; }\n\n.mdl-color--blue-A100 {\n  background-color: rgb(130,177,255) !important; }\n\n.mdl-color-text--blue-A200 {\n  color: rgb(68,138,255) !important; }\n\n.mdl-color--blue-A200 {\n  background-color: rgb(68,138,255) !important; }\n\n.mdl-color-text--blue-A400 {\n  color: rgb(41,121,255) !important; }\n\n.mdl-color--blue-A400 {\n  background-color: rgb(41,121,255) !important; }\n\n.mdl-color-text--blue-A700 {\n  color: rgb(41,98,255) !important; }\n\n.mdl-color--blue-A700 {\n  background-color: rgb(41,98,255) !important; }\n\n.mdl-color-text--light-blue {\n  color: rgb(3,169,244) !important; }\n\n.mdl-color--light-blue {\n  background-color: rgb(3,169,244) !important; }\n\n.mdl-color-text--light-blue-50 {\n  color: rgb(225,245,254) !important; }\n\n.mdl-color--light-blue-50 {\n  background-color: rgb(225,245,254) !important; }\n\n.mdl-color-text--light-blue-100 {\n  color: rgb(179,229,252) !important; }\n\n.mdl-color--light-blue-100 {\n  background-color: rgb(179,229,252) !important; }\n\n.mdl-color-text--light-blue-200 {\n  color: rgb(129,212,250) !important; }\n\n.mdl-color--light-blue-200 {\n  background-color: rgb(129,212,250) !important; }\n\n.mdl-color-text--light-blue-300 {\n  color: rgb(79,195,247) !important; }\n\n.mdl-color--light-blue-300 {\n  background-color: rgb(79,195,247) !important; }\n\n.mdl-color-text--light-blue-400 {\n  color: rgb(41,182,246) !important; }\n\n.mdl-color--light-blue-400 {\n  background-color: rgb(41,182,246) !important; }\n\n.mdl-color-text--light-blue-500 {\n  color: rgb(3,169,244) !important; }\n\n.mdl-color--light-blue-500 {\n  background-color: rgb(3,169,244) !important; }\n\n.mdl-color-text--light-blue-600 {\n  color: rgb(3,155,229) !important; }\n\n.mdl-color--light-blue-600 {\n  background-color: rgb(3,155,229) !important; }\n\n.mdl-color-text--light-blue-700 {\n  color: rgb(2,136,209) !important; }\n\n.mdl-color--light-blue-700 {\n  background-color: rgb(2,136,209) !important; }\n\n.mdl-color-text--light-blue-800 {\n  color: rgb(2,119,189) !important; }\n\n.mdl-color--light-blue-800 {\n  background-color: rgb(2,119,189) !important; }\n\n.mdl-color-text--light-blue-900 {\n  color: rgb(1,87,155) !important; }\n\n.mdl-color--light-blue-900 {\n  background-color: rgb(1,87,155) !important; }\n\n.mdl-color-text--light-blue-A100 {\n  color: rgb(128,216,255) !important; }\n\n.mdl-color--light-blue-A100 {\n  background-color: rgb(128,216,255) !important; }\n\n.mdl-color-text--light-blue-A200 {\n  color: rgb(64,196,255) !important; }\n\n.mdl-color--light-blue-A200 {\n  background-color: rgb(64,196,255) !important; }\n\n.mdl-color-text--light-blue-A400 {\n  color: rgb(0,176,255) !important; }\n\n.mdl-color--light-blue-A400 {\n  background-color: rgb(0,176,255) !important; }\n\n.mdl-color-text--light-blue-A700 {\n  color: rgb(0,145,234) !important; }\n\n.mdl-color--light-blue-A700 {\n  background-color: rgb(0,145,234) !important; }\n\n.mdl-color-text--cyan {\n  color: rgb(0,188,212) !important; }\n\n.mdl-color--cyan {\n  background-color: rgb(0,188,212) !important; }\n\n.mdl-color-text--cyan-50 {\n  color: rgb(224,247,250) !important; }\n\n.mdl-color--cyan-50 {\n  background-color: rgb(224,247,250) !important; }\n\n.mdl-color-text--cyan-100 {\n  color: rgb(178,235,242) !important; }\n\n.mdl-color--cyan-100 {\n  background-color: rgb(178,235,242) !important; }\n\n.mdl-color-text--cyan-200 {\n  color: rgb(128,222,234) !important; }\n\n.mdl-color--cyan-200 {\n  background-color: rgb(128,222,234) !important; }\n\n.mdl-color-text--cyan-300 {\n  color: rgb(77,208,225) !important; }\n\n.mdl-color--cyan-300 {\n  background-color: rgb(77,208,225) !important; }\n\n.mdl-color-text--cyan-400 {\n  color: rgb(38,198,218) !important; }\n\n.mdl-color--cyan-400 {\n  background-color: rgb(38,198,218) !important; }\n\n.mdl-color-text--cyan-500 {\n  color: rgb(0,188,212) !important; }\n\n.mdl-color--cyan-500 {\n  background-color: rgb(0,188,212) !important; }\n\n.mdl-color-text--cyan-600 {\n  color: rgb(0,172,193) !important; }\n\n.mdl-color--cyan-600 {\n  background-color: rgb(0,172,193) !important; }\n\n.mdl-color-text--cyan-700 {\n  color: rgb(0,151,167) !important; }\n\n.mdl-color--cyan-700 {\n  background-color: rgb(0,151,167) !important; }\n\n.mdl-color-text--cyan-800 {\n  color: rgb(0,131,143) !important; }\n\n.mdl-color--cyan-800 {\n  background-color: rgb(0,131,143) !important; }\n\n.mdl-color-text--cyan-900 {\n  color: rgb(0,96,100) !important; }\n\n.mdl-color--cyan-900 {\n  background-color: rgb(0,96,100) !important; }\n\n.mdl-color-text--cyan-A100 {\n  color: rgb(132,255,255) !important; }\n\n.mdl-color--cyan-A100 {\n  background-color: rgb(132,255,255) !important; }\n\n.mdl-color-text--cyan-A200 {\n  color: rgb(24,255,255) !important; }\n\n.mdl-color--cyan-A200 {\n  background-color: rgb(24,255,255) !important; }\n\n.mdl-color-text--cyan-A400 {\n  color: rgb(0,229,255) !important; }\n\n.mdl-color--cyan-A400 {\n  background-color: rgb(0,229,255) !important; }\n\n.mdl-color-text--cyan-A700 {\n  color: rgb(0,184,212) !important; }\n\n.mdl-color--cyan-A700 {\n  background-color: rgb(0,184,212) !important; }\n\n.mdl-color-text--teal {\n  color: rgb(0,150,136) !important; }\n\n.mdl-color--teal {\n  background-color: rgb(0,150,136) !important; }\n\n.mdl-color-text--teal-50 {\n  color: rgb(224,242,241) !important; }\n\n.mdl-color--teal-50 {\n  background-color: rgb(224,242,241) !important; }\n\n.mdl-color-text--teal-100 {\n  color: rgb(178,223,219) !important; }\n\n.mdl-color--teal-100 {\n  background-color: rgb(178,223,219) !important; }\n\n.mdl-color-text--teal-200 {\n  color: rgb(128,203,196) !important; }\n\n.mdl-color--teal-200 {\n  background-color: rgb(128,203,196) !important; }\n\n.mdl-color-text--teal-300 {\n  color: rgb(77,182,172) !important; }\n\n.mdl-color--teal-300 {\n  background-color: rgb(77,182,172) !important; }\n\n.mdl-color-text--teal-400 {\n  color: rgb(38,166,154) !important; }\n\n.mdl-color--teal-400 {\n  background-color: rgb(38,166,154) !important; }\n\n.mdl-color-text--teal-500 {\n  color: rgb(0,150,136) !important; }\n\n.mdl-color--teal-500 {\n  background-color: rgb(0,150,136) !important; }\n\n.mdl-color-text--teal-600 {\n  color: rgb(0,137,123) !important; }\n\n.mdl-color--teal-600 {\n  background-color: rgb(0,137,123) !important; }\n\n.mdl-color-text--teal-700 {\n  color: rgb(0,121,107) !important; }\n\n.mdl-color--teal-700 {\n  background-color: rgb(0,121,107) !important; }\n\n.mdl-color-text--teal-800 {\n  color: rgb(0,105,92) !important; }\n\n.mdl-color--teal-800 {\n  background-color: rgb(0,105,92) !important; }\n\n.mdl-color-text--teal-900 {\n  color: rgb(0,77,64) !important; }\n\n.mdl-color--teal-900 {\n  background-color: rgb(0,77,64) !important; }\n\n.mdl-color-text--teal-A100 {\n  color: rgb(167,255,235) !important; }\n\n.mdl-color--teal-A100 {\n  background-color: rgb(167,255,235) !important; }\n\n.mdl-color-text--teal-A200 {\n  color: rgb(100,255,218) !important; }\n\n.mdl-color--teal-A200 {\n  background-color: rgb(100,255,218) !important; }\n\n.mdl-color-text--teal-A400 {\n  color: rgb(29,233,182) !important; }\n\n.mdl-color--teal-A400 {\n  background-color: rgb(29,233,182) !important; }\n\n.mdl-color-text--teal-A700 {\n  color: rgb(0,191,165) !important; }\n\n.mdl-color--teal-A700 {\n  background-color: rgb(0,191,165) !important; }\n\n.mdl-color-text--green {\n  color: rgb(76,175,80) !important; }\n\n.mdl-color--green {\n  background-color: rgb(76,175,80) !important; }\n\n.mdl-color-text--green-50 {\n  color: rgb(232,245,233) !important; }\n\n.mdl-color--green-50 {\n  background-color: rgb(232,245,233) !important; }\n\n.mdl-color-text--green-100 {\n  color: rgb(200,230,201) !important; }\n\n.mdl-color--green-100 {\n  background-color: rgb(200,230,201) !important; }\n\n.mdl-color-text--green-200 {\n  color: rgb(165,214,167) !important; }\n\n.mdl-color--green-200 {\n  background-color: rgb(165,214,167) !important; }\n\n.mdl-color-text--green-300 {\n  color: rgb(129,199,132) !important; }\n\n.mdl-color--green-300 {\n  background-color: rgb(129,199,132) !important; }\n\n.mdl-color-text--green-400 {\n  color: rgb(102,187,106) !important; }\n\n.mdl-color--green-400 {\n  background-color: rgb(102,187,106) !important; }\n\n.mdl-color-text--green-500 {\n  color: rgb(76,175,80) !important; }\n\n.mdl-color--green-500 {\n  background-color: rgb(76,175,80) !important; }\n\n.mdl-color-text--green-600 {\n  color: rgb(67,160,71) !important; }\n\n.mdl-color--green-600 {\n  background-color: rgb(67,160,71) !important; }\n\n.mdl-color-text--green-700 {\n  color: rgb(56,142,60) !important; }\n\n.mdl-color--green-700 {\n  background-color: rgb(56,142,60) !important; }\n\n.mdl-color-text--green-800 {\n  color: rgb(46,125,50) !important; }\n\n.mdl-color--green-800 {\n  background-color: rgb(46,125,50) !important; }\n\n.mdl-color-text--green-900 {\n  color: rgb(27,94,32) !important; }\n\n.mdl-color--green-900 {\n  background-color: rgb(27,94,32) !important; }\n\n.mdl-color-text--green-A100 {\n  color: rgb(185,246,202) !important; }\n\n.mdl-color--green-A100 {\n  background-color: rgb(185,246,202) !important; }\n\n.mdl-color-text--green-A200 {\n  color: rgb(105,240,174) !important; }\n\n.mdl-color--green-A200 {\n  background-color: rgb(105,240,174) !important; }\n\n.mdl-color-text--green-A400 {\n  color: rgb(0,230,118) !important; }\n\n.mdl-color--green-A400 {\n  background-color: rgb(0,230,118) !important; }\n\n.mdl-color-text--green-A700 {\n  color: rgb(0,200,83) !important; }\n\n.mdl-color--green-A700 {\n  background-color: rgb(0,200,83) !important; }\n\n.mdl-color-text--light-green {\n  color: rgb(139,195,74) !important; }\n\n.mdl-color--light-green {\n  background-color: rgb(139,195,74) !important; }\n\n.mdl-color-text--light-green-50 {\n  color: rgb(241,248,233) !important; }\n\n.mdl-color--light-green-50 {\n  background-color: rgb(241,248,233) !important; }\n\n.mdl-color-text--light-green-100 {\n  color: rgb(220,237,200) !important; }\n\n.mdl-color--light-green-100 {\n  background-color: rgb(220,237,200) !important; }\n\n.mdl-color-text--light-green-200 {\n  color: rgb(197,225,165) !important; }\n\n.mdl-color--light-green-200 {\n  background-color: rgb(197,225,165) !important; }\n\n.mdl-color-text--light-green-300 {\n  color: rgb(174,213,129) !important; }\n\n.mdl-color--light-green-300 {\n  background-color: rgb(174,213,129) !important; }\n\n.mdl-color-text--light-green-400 {\n  color: rgb(156,204,101) !important; }\n\n.mdl-color--light-green-400 {\n  background-color: rgb(156,204,101) !important; }\n\n.mdl-color-text--light-green-500 {\n  color: rgb(139,195,74) !important; }\n\n.mdl-color--light-green-500 {\n  background-color: rgb(139,195,74) !important; }\n\n.mdl-color-text--light-green-600 {\n  color: rgb(124,179,66) !important; }\n\n.mdl-color--light-green-600 {\n  background-color: rgb(124,179,66) !important; }\n\n.mdl-color-text--light-green-700 {\n  color: rgb(104,159,56) !important; }\n\n.mdl-color--light-green-700 {\n  background-color: rgb(104,159,56) !important; }\n\n.mdl-color-text--light-green-800 {\n  color: rgb(85,139,47) !important; }\n\n.mdl-color--light-green-800 {\n  background-color: rgb(85,139,47) !important; }\n\n.mdl-color-text--light-green-900 {\n  color: rgb(51,105,30) !important; }\n\n.mdl-color--light-green-900 {\n  background-color: rgb(51,105,30) !important; }\n\n.mdl-color-text--light-green-A100 {\n  color: rgb(204,255,144) !important; }\n\n.mdl-color--light-green-A100 {\n  background-color: rgb(204,255,144) !important; }\n\n.mdl-color-text--light-green-A200 {\n  color: rgb(178,255,89) !important; }\n\n.mdl-color--light-green-A200 {\n  background-color: rgb(178,255,89) !important; }\n\n.mdl-color-text--light-green-A400 {\n  color: rgb(118,255,3) !important; }\n\n.mdl-color--light-green-A400 {\n  background-color: rgb(118,255,3) !important; }\n\n.mdl-color-text--light-green-A700 {\n  color: rgb(100,221,23) !important; }\n\n.mdl-color--light-green-A700 {\n  background-color: rgb(100,221,23) !important; }\n\n.mdl-color-text--lime {\n  color: rgb(205,220,57) !important; }\n\n.mdl-color--lime {\n  background-color: rgb(205,220,57) !important; }\n\n.mdl-color-text--lime-50 {\n  color: rgb(249,251,231) !important; }\n\n.mdl-color--lime-50 {\n  background-color: rgb(249,251,231) !important; }\n\n.mdl-color-text--lime-100 {\n  color: rgb(240,244,195) !important; }\n\n.mdl-color--lime-100 {\n  background-color: rgb(240,244,195) !important; }\n\n.mdl-color-text--lime-200 {\n  color: rgb(230,238,156) !important; }\n\n.mdl-color--lime-200 {\n  background-color: rgb(230,238,156) !important; }\n\n.mdl-color-text--lime-300 {\n  color: rgb(220,231,117) !important; }\n\n.mdl-color--lime-300 {\n  background-color: rgb(220,231,117) !important; }\n\n.mdl-color-text--lime-400 {\n  color: rgb(212,225,87) !important; }\n\n.mdl-color--lime-400 {\n  background-color: rgb(212,225,87) !important; }\n\n.mdl-color-text--lime-500 {\n  color: rgb(205,220,57) !important; }\n\n.mdl-color--lime-500 {\n  background-color: rgb(205,220,57) !important; }\n\n.mdl-color-text--lime-600 {\n  color: rgb(192,202,51) !important; }\n\n.mdl-color--lime-600 {\n  background-color: rgb(192,202,51) !important; }\n\n.mdl-color-text--lime-700 {\n  color: rgb(175,180,43) !important; }\n\n.mdl-color--lime-700 {\n  background-color: rgb(175,180,43) !important; }\n\n.mdl-color-text--lime-800 {\n  color: rgb(158,157,36) !important; }\n\n.mdl-color--lime-800 {\n  background-color: rgb(158,157,36) !important; }\n\n.mdl-color-text--lime-900 {\n  color: rgb(130,119,23) !important; }\n\n.mdl-color--lime-900 {\n  background-color: rgb(130,119,23) !important; }\n\n.mdl-color-text--lime-A100 {\n  color: rgb(244,255,129) !important; }\n\n.mdl-color--lime-A100 {\n  background-color: rgb(244,255,129) !important; }\n\n.mdl-color-text--lime-A200 {\n  color: rgb(238,255,65) !important; }\n\n.mdl-color--lime-A200 {\n  background-color: rgb(238,255,65) !important; }\n\n.mdl-color-text--lime-A400 {\n  color: rgb(198,255,0) !important; }\n\n.mdl-color--lime-A400 {\n  background-color: rgb(198,255,0) !important; }\n\n.mdl-color-text--lime-A700 {\n  color: rgb(174,234,0) !important; }\n\n.mdl-color--lime-A700 {\n  background-color: rgb(174,234,0) !important; }\n\n.mdl-color-text--yellow {\n  color: rgb(255,235,59) !important; }\n\n.mdl-color--yellow {\n  background-color: rgb(255,235,59) !important; }\n\n.mdl-color-text--yellow-50 {\n  color: rgb(255,253,231) !important; }\n\n.mdl-color--yellow-50 {\n  background-color: rgb(255,253,231) !important; }\n\n.mdl-color-text--yellow-100 {\n  color: rgb(255,249,196) !important; }\n\n.mdl-color--yellow-100 {\n  background-color: rgb(255,249,196) !important; }\n\n.mdl-color-text--yellow-200 {\n  color: rgb(255,245,157) !important; }\n\n.mdl-color--yellow-200 {\n  background-color: rgb(255,245,157) !important; }\n\n.mdl-color-text--yellow-300 {\n  color: rgb(255,241,118) !important; }\n\n.mdl-color--yellow-300 {\n  background-color: rgb(255,241,118) !important; }\n\n.mdl-color-text--yellow-400 {\n  color: rgb(255,238,88) !important; }\n\n.mdl-color--yellow-400 {\n  background-color: rgb(255,238,88) !important; }\n\n.mdl-color-text--yellow-500 {\n  color: rgb(255,235,59) !important; }\n\n.mdl-color--yellow-500 {\n  background-color: rgb(255,235,59) !important; }\n\n.mdl-color-text--yellow-600 {\n  color: rgb(253,216,53) !important; }\n\n.mdl-color--yellow-600 {\n  background-color: rgb(253,216,53) !important; }\n\n.mdl-color-text--yellow-700 {\n  color: rgb(251,192,45) !important; }\n\n.mdl-color--yellow-700 {\n  background-color: rgb(251,192,45) !important; }\n\n.mdl-color-text--yellow-800 {\n  color: rgb(249,168,37) !important; }\n\n.mdl-color--yellow-800 {\n  background-color: rgb(249,168,37) !important; }\n\n.mdl-color-text--yellow-900 {\n  color: rgb(245,127,23) !important; }\n\n.mdl-color--yellow-900 {\n  background-color: rgb(245,127,23) !important; }\n\n.mdl-color-text--yellow-A100 {\n  color: rgb(255,255,141) !important; }\n\n.mdl-color--yellow-A100 {\n  background-color: rgb(255,255,141) !important; }\n\n.mdl-color-text--yellow-A200 {\n  color: rgb(255,255,0) !important; }\n\n.mdl-color--yellow-A200 {\n  background-color: rgb(255,255,0) !important; }\n\n.mdl-color-text--yellow-A400 {\n  color: rgb(255,234,0) !important; }\n\n.mdl-color--yellow-A400 {\n  background-color: rgb(255,234,0) !important; }\n\n.mdl-color-text--yellow-A700 {\n  color: rgb(255,214,0) !important; }\n\n.mdl-color--yellow-A700 {\n  background-color: rgb(255,214,0) !important; }\n\n.mdl-color-text--amber {\n  color: rgb(255,193,7) !important; }\n\n.mdl-color--amber {\n  background-color: rgb(255,193,7) !important; }\n\n.mdl-color-text--amber-50 {\n  color: rgb(255,248,225) !important; }\n\n.mdl-color--amber-50 {\n  background-color: rgb(255,248,225) !important; }\n\n.mdl-color-text--amber-100 {\n  color: rgb(255,236,179) !important; }\n\n.mdl-color--amber-100 {\n  background-color: rgb(255,236,179) !important; }\n\n.mdl-color-text--amber-200 {\n  color: rgb(255,224,130) !important; }\n\n.mdl-color--amber-200 {\n  background-color: rgb(255,224,130) !important; }\n\n.mdl-color-text--amber-300 {\n  color: rgb(255,213,79) !important; }\n\n.mdl-color--amber-300 {\n  background-color: rgb(255,213,79) !important; }\n\n.mdl-color-text--amber-400 {\n  color: rgb(255,202,40) !important; }\n\n.mdl-color--amber-400 {\n  background-color: rgb(255,202,40) !important; }\n\n.mdl-color-text--amber-500 {\n  color: rgb(255,193,7) !important; }\n\n.mdl-color--amber-500 {\n  background-color: rgb(255,193,7) !important; }\n\n.mdl-color-text--amber-600 {\n  color: rgb(255,179,0) !important; }\n\n.mdl-color--amber-600 {\n  background-color: rgb(255,179,0) !important; }\n\n.mdl-color-text--amber-700 {\n  color: rgb(255,160,0) !important; }\n\n.mdl-color--amber-700 {\n  background-color: rgb(255,160,0) !important; }\n\n.mdl-color-text--amber-800 {\n  color: rgb(255,143,0) !important; }\n\n.mdl-color--amber-800 {\n  background-color: rgb(255,143,0) !important; }\n\n.mdl-color-text--amber-900 {\n  color: rgb(255,111,0) !important; }\n\n.mdl-color--amber-900 {\n  background-color: rgb(255,111,0) !important; }\n\n.mdl-color-text--amber-A100 {\n  color: rgb(255,229,127) !important; }\n\n.mdl-color--amber-A100 {\n  background-color: rgb(255,229,127) !important; }\n\n.mdl-color-text--amber-A200 {\n  color: rgb(255,215,64) !important; }\n\n.mdl-color--amber-A200 {\n  background-color: rgb(255,215,64) !important; }\n\n.mdl-color-text--amber-A400 {\n  color: rgb(255,196,0) !important; }\n\n.mdl-color--amber-A400 {\n  background-color: rgb(255,196,0) !important; }\n\n.mdl-color-text--amber-A700 {\n  color: rgb(255,171,0) !important; }\n\n.mdl-color--amber-A700 {\n  background-color: rgb(255,171,0) !important; }\n\n.mdl-color-text--orange {\n  color: rgb(255,152,0) !important; }\n\n.mdl-color--orange {\n  background-color: rgb(255,152,0) !important; }\n\n.mdl-color-text--orange-50 {\n  color: rgb(255,243,224) !important; }\n\n.mdl-color--orange-50 {\n  background-color: rgb(255,243,224) !important; }\n\n.mdl-color-text--orange-100 {\n  color: rgb(255,224,178) !important; }\n\n.mdl-color--orange-100 {\n  background-color: rgb(255,224,178) !important; }\n\n.mdl-color-text--orange-200 {\n  color: rgb(255,204,128) !important; }\n\n.mdl-color--orange-200 {\n  background-color: rgb(255,204,128) !important; }\n\n.mdl-color-text--orange-300 {\n  color: rgb(255,183,77) !important; }\n\n.mdl-color--orange-300 {\n  background-color: rgb(255,183,77) !important; }\n\n.mdl-color-text--orange-400 {\n  color: rgb(255,167,38) !important; }\n\n.mdl-color--orange-400 {\n  background-color: rgb(255,167,38) !important; }\n\n.mdl-color-text--orange-500 {\n  color: rgb(255,152,0) !important; }\n\n.mdl-color--orange-500 {\n  background-color: rgb(255,152,0) !important; }\n\n.mdl-color-text--orange-600 {\n  color: rgb(251,140,0) !important; }\n\n.mdl-color--orange-600 {\n  background-color: rgb(251,140,0) !important; }\n\n.mdl-color-text--orange-700 {\n  color: rgb(245,124,0) !important; }\n\n.mdl-color--orange-700 {\n  background-color: rgb(245,124,0) !important; }\n\n.mdl-color-text--orange-800 {\n  color: rgb(239,108,0) !important; }\n\n.mdl-color--orange-800 {\n  background-color: rgb(239,108,0) !important; }\n\n.mdl-color-text--orange-900 {\n  color: rgb(230,81,0) !important; }\n\n.mdl-color--orange-900 {\n  background-color: rgb(230,81,0) !important; }\n\n.mdl-color-text--orange-A100 {\n  color: rgb(255,209,128) !important; }\n\n.mdl-color--orange-A100 {\n  background-color: rgb(255,209,128) !important; }\n\n.mdl-color-text--orange-A200 {\n  color: rgb(255,171,64) !important; }\n\n.mdl-color--orange-A200 {\n  background-color: rgb(255,171,64) !important; }\n\n.mdl-color-text--orange-A400 {\n  color: rgb(255,145,0) !important; }\n\n.mdl-color--orange-A400 {\n  background-color: rgb(255,145,0) !important; }\n\n.mdl-color-text--orange-A700 {\n  color: rgb(255,109,0) !important; }\n\n.mdl-color--orange-A700 {\n  background-color: rgb(255,109,0) !important; }\n\n.mdl-color-text--deep-orange {\n  color: rgb(255,87,34) !important; }\n\n.mdl-color--deep-orange {\n  background-color: rgb(255,87,34) !important; }\n\n.mdl-color-text--deep-orange-50 {\n  color: rgb(251,233,231) !important; }\n\n.mdl-color--deep-orange-50 {\n  background-color: rgb(251,233,231) !important; }\n\n.mdl-color-text--deep-orange-100 {\n  color: rgb(255,204,188) !important; }\n\n.mdl-color--deep-orange-100 {\n  background-color: rgb(255,204,188) !important; }\n\n.mdl-color-text--deep-orange-200 {\n  color: rgb(255,171,145) !important; }\n\n.mdl-color--deep-orange-200 {\n  background-color: rgb(255,171,145) !important; }\n\n.mdl-color-text--deep-orange-300 {\n  color: rgb(255,138,101) !important; }\n\n.mdl-color--deep-orange-300 {\n  background-color: rgb(255,138,101) !important; }\n\n.mdl-color-text--deep-orange-400 {\n  color: rgb(255,112,67) !important; }\n\n.mdl-color--deep-orange-400 {\n  background-color: rgb(255,112,67) !important; }\n\n.mdl-color-text--deep-orange-500 {\n  color: rgb(255,87,34) !important; }\n\n.mdl-color--deep-orange-500 {\n  background-color: rgb(255,87,34) !important; }\n\n.mdl-color-text--deep-orange-600 {\n  color: rgb(244,81,30) !important; }\n\n.mdl-color--deep-orange-600 {\n  background-color: rgb(244,81,30) !important; }\n\n.mdl-color-text--deep-orange-700 {\n  color: rgb(230,74,25) !important; }\n\n.mdl-color--deep-orange-700 {\n  background-color: rgb(230,74,25) !important; }\n\n.mdl-color-text--deep-orange-800 {\n  color: rgb(216,67,21) !important; }\n\n.mdl-color--deep-orange-800 {\n  background-color: rgb(216,67,21) !important; }\n\n.mdl-color-text--deep-orange-900 {\n  color: rgb(191,54,12) !important; }\n\n.mdl-color--deep-orange-900 {\n  background-color: rgb(191,54,12) !important; }\n\n.mdl-color-text--deep-orange-A100 {\n  color: rgb(255,158,128) !important; }\n\n.mdl-color--deep-orange-A100 {\n  background-color: rgb(255,158,128) !important; }\n\n.mdl-color-text--deep-orange-A200 {\n  color: rgb(255,110,64) !important; }\n\n.mdl-color--deep-orange-A200 {\n  background-color: rgb(255,110,64) !important; }\n\n.mdl-color-text--deep-orange-A400 {\n  color: rgb(255,61,0) !important; }\n\n.mdl-color--deep-orange-A400 {\n  background-color: rgb(255,61,0) !important; }\n\n.mdl-color-text--deep-orange-A700 {\n  color: rgb(221,44,0) !important; }\n\n.mdl-color--deep-orange-A700 {\n  background-color: rgb(221,44,0) !important; }\n\n.mdl-color-text--brown {\n  color: rgb(121,85,72) !important; }\n\n.mdl-color--brown {\n  background-color: rgb(121,85,72) !important; }\n\n.mdl-color-text--brown-50 {\n  color: rgb(239,235,233) !important; }\n\n.mdl-color--brown-50 {\n  background-color: rgb(239,235,233) !important; }\n\n.mdl-color-text--brown-100 {\n  color: rgb(215,204,200) !important; }\n\n.mdl-color--brown-100 {\n  background-color: rgb(215,204,200) !important; }\n\n.mdl-color-text--brown-200 {\n  color: rgb(188,170,164) !important; }\n\n.mdl-color--brown-200 {\n  background-color: rgb(188,170,164) !important; }\n\n.mdl-color-text--brown-300 {\n  color: rgb(161,136,127) !important; }\n\n.mdl-color--brown-300 {\n  background-color: rgb(161,136,127) !important; }\n\n.mdl-color-text--brown-400 {\n  color: rgb(141,110,99) !important; }\n\n.mdl-color--brown-400 {\n  background-color: rgb(141,110,99) !important; }\n\n.mdl-color-text--brown-500 {\n  color: rgb(121,85,72) !important; }\n\n.mdl-color--brown-500 {\n  background-color: rgb(121,85,72) !important; }\n\n.mdl-color-text--brown-600 {\n  color: rgb(109,76,65) !important; }\n\n.mdl-color--brown-600 {\n  background-color: rgb(109,76,65) !important; }\n\n.mdl-color-text--brown-700 {\n  color: rgb(93,64,55) !important; }\n\n.mdl-color--brown-700 {\n  background-color: rgb(93,64,55) !important; }\n\n.mdl-color-text--brown-800 {\n  color: rgb(78,52,46) !important; }\n\n.mdl-color--brown-800 {\n  background-color: rgb(78,52,46) !important; }\n\n.mdl-color-text--brown-900 {\n  color: rgb(62,39,35) !important; }\n\n.mdl-color--brown-900 {\n  background-color: rgb(62,39,35) !important; }\n\n.mdl-color-text--grey {\n  color: rgb(158,158,158) !important; }\n\n.mdl-color--grey {\n  background-color: rgb(158,158,158) !important; }\n\n.mdl-color-text--grey-50 {\n  color: rgb(250,250,250) !important; }\n\n.mdl-color--grey-50 {\n  background-color: rgb(250,250,250) !important; }\n\n.mdl-color-text--grey-100 {\n  color: rgb(245,245,245) !important; }\n\n.mdl-color--grey-100 {\n  background-color: rgb(245,245,245) !important; }\n\n.mdl-color-text--grey-200 {\n  color: rgb(238,238,238) !important; }\n\n.mdl-color--grey-200 {\n  background-color: rgb(238,238,238) !important; }\n\n.mdl-color-text--grey-300 {\n  color: rgb(224,224,224) !important; }\n\n.mdl-color--grey-300 {\n  background-color: rgb(224,224,224) !important; }\n\n.mdl-color-text--grey-400 {\n  color: rgb(189,189,189) !important; }\n\n.mdl-color--grey-400 {\n  background-color: rgb(189,189,189) !important; }\n\n.mdl-color-text--grey-500 {\n  color: rgb(158,158,158) !important; }\n\n.mdl-color--grey-500 {\n  background-color: rgb(158,158,158) !important; }\n\n.mdl-color-text--grey-600 {\n  color: rgb(117,117,117) !important; }\n\n.mdl-color--grey-600 {\n  background-color: rgb(117,117,117) !important; }\n\n.mdl-color-text--grey-700 {\n  color: rgb(97,97,97) !important; }\n\n.mdl-color--grey-700 {\n  background-color: rgb(97,97,97) !important; }\n\n.mdl-color-text--grey-800 {\n  color: rgb(66,66,66) !important; }\n\n.mdl-color--grey-800 {\n  background-color: rgb(66,66,66) !important; }\n\n.mdl-color-text--grey-900 {\n  color: rgb(33,33,33) !important; }\n\n.mdl-color--grey-900 {\n  background-color: rgb(33,33,33) !important; }\n\n.mdl-color-text--blue-grey {\n  color: rgb(96,125,139) !important; }\n\n.mdl-color--blue-grey {\n  background-color: rgb(96,125,139) !important; }\n\n.mdl-color-text--blue-grey-50 {\n  color: rgb(236,239,241) !important; }\n\n.mdl-color--blue-grey-50 {\n  background-color: rgb(236,239,241) !important; }\n\n.mdl-color-text--blue-grey-100 {\n  color: rgb(207,216,220) !important; }\n\n.mdl-color--blue-grey-100 {\n  background-color: rgb(207,216,220) !important; }\n\n.mdl-color-text--blue-grey-200 {\n  color: rgb(176,190,197) !important; }\n\n.mdl-color--blue-grey-200 {\n  background-color: rgb(176,190,197) !important; }\n\n.mdl-color-text--blue-grey-300 {\n  color: rgb(144,164,174) !important; }\n\n.mdl-color--blue-grey-300 {\n  background-color: rgb(144,164,174) !important; }\n\n.mdl-color-text--blue-grey-400 {\n  color: rgb(120,144,156) !important; }\n\n.mdl-color--blue-grey-400 {\n  background-color: rgb(120,144,156) !important; }\n\n.mdl-color-text--blue-grey-500 {\n  color: rgb(96,125,139) !important; }\n\n.mdl-color--blue-grey-500 {\n  background-color: rgb(96,125,139) !important; }\n\n.mdl-color-text--blue-grey-600 {\n  color: rgb(84,110,122) !important; }\n\n.mdl-color--blue-grey-600 {\n  background-color: rgb(84,110,122) !important; }\n\n.mdl-color-text--blue-grey-700 {\n  color: rgb(69,90,100) !important; }\n\n.mdl-color--blue-grey-700 {\n  background-color: rgb(69,90,100) !important; }\n\n.mdl-color-text--blue-grey-800 {\n  color: rgb(55,71,79) !important; }\n\n.mdl-color--blue-grey-800 {\n  background-color: rgb(55,71,79) !important; }\n\n.mdl-color-text--blue-grey-900 {\n  color: rgb(38,50,56) !important; }\n\n.mdl-color--blue-grey-900 {\n  background-color: rgb(38,50,56) !important; }\n\n.mdl-color--black {\n  background-color: rgb(0,0,0) !important; }\n\n.mdl-color-text--black {\n  color: rgb(0,0,0) !important; }\n\n.mdl-color--white {\n  background-color: rgb(255,255,255) !important; }\n\n.mdl-color-text--white {\n  color: rgb(255,255,255) !important; }\n\n.mdl-color--primary {\n  background-color: rgb(96,125,139) !important; }\n\n.mdl-color--primary-contrast {\n  background-color: rgb(255,255,255) !important; }\n\n.mdl-color--primary-dark {\n  background-color: rgb(69,90,100) !important; }\n\n.mdl-color--accent {\n  background-color: rgb(255,82,82) !important; }\n\n.mdl-color--accent-contrast {\n  background-color: rgb(255,255,255) !important; }\n\n.mdl-color-text--primary {\n  color: rgb(96,125,139) !important; }\n\n.mdl-color-text--primary-contrast {\n  color: rgb(255,255,255) !important; }\n\n.mdl-color-text--primary-dark {\n  color: rgb(69,90,100) !important; }\n\n.mdl-color-text--accent {\n  color: rgb(255,82,82) !important; }\n\n.mdl-color-text--accent-contrast {\n  color: rgb(255,255,255) !important; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-ripple {\n  background: rgb(0,0,0);\n  border-radius: 50%;\n  height: 50px;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 50px;\n  overflow: hidden; }\n  .mdl-ripple.is-animating {\n    -webkit-transition: width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.2, 1);\n    transition: width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1), width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1), width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.2, 1); }\n  .mdl-ripple.is-visible {\n    opacity: 0.3; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-animation--default {\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdl-animation--fast-out-slow-in {\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdl-animation--linear-out-slow-in {\n  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }\n\n.mdl-animation--fast-out-linear-in {\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 1, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-badge {\n  position: relative;\n  white-space: nowrap;\n  margin-right: 24px; }\n  .mdl-badge:not([data-badge]) {\n    margin-right: auto; }\n  .mdl-badge[data-badge]:after {\n    content: attr(data-badge);\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: absolute;\n    top: -11px;\n    right: -24px;\n    font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n    font-weight: 600;\n    font-size: 12px;\n    width: 22px;\n    height: 22px;\n    border-radius: 50%;\n    background: rgb(255,82,82);\n    color: rgb(255,255,255); }\n    .mdl-button .mdl-badge[data-badge]:after {\n      top: -10px;\n      right: -5px; }\n  .mdl-badge.mdl-badge--no-background[data-badge]:after {\n    color: rgb(255,82,82);\n    background: rgba(255,255,255,0.2);\n    box-shadow: 0 0 1px gray; }\n  .mdl-badge.mdl-badge--overlap {\n    margin-right: 10px; }\n    .mdl-badge.mdl-badge--overlap:after {\n      right: -10px; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-button {\n  background: transparent;\n  border: none;\n  border-radius: 2px;\n  color: rgb(0,0,0);\n  position: relative;\n  height: 36px;\n  margin: 0;\n  min-width: 64px;\n  padding: 0 16px;\n  display: inline-block;\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  line-height: 1;\n  letter-spacing: 0;\n  overflow: hidden;\n  will-change: box-shadow;\n  -webkit-transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  outline: none;\n  cursor: pointer;\n  text-decoration: none;\n  text-align: center;\n  line-height: 36px;\n  vertical-align: middle; }\n  .mdl-button::-moz-focus-inner {\n    border: 0; }\n  .mdl-button:hover {\n    background-color: rgba(158,158,158, 0.20); }\n  .mdl-button:focus:not(:active) {\n    background-color: rgba(0,0,0, 0.12); }\n  .mdl-button:active {\n    background-color: rgba(158,158,158, 0.40); }\n  .mdl-button.mdl-button--colored {\n    color: rgb(96,125,139); }\n    .mdl-button.mdl-button--colored:focus:not(:active) {\n      background-color: rgba(0,0,0, 0.12); }\n\ninput.mdl-button[type=\"submit\"] {\n  -webkit-appearance: none; }\n\n.mdl-button--raised {\n  background: rgba(158,158,158, 0.20);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .mdl-button--raised:active {\n    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);\n    background-color: rgba(158,158,158, 0.40); }\n  .mdl-button--raised:focus:not(:active) {\n    box-shadow: 0 0 8px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.36);\n    background-color: rgba(158,158,158, 0.40); }\n  .mdl-button--raised.mdl-button--colored {\n    background: rgb(96,125,139);\n    color: rgb(255,255,255); }\n    .mdl-button--raised.mdl-button--colored:hover {\n      background-color: rgb(96,125,139); }\n    .mdl-button--raised.mdl-button--colored:active {\n      background-color: rgb(96,125,139); }\n    .mdl-button--raised.mdl-button--colored:focus:not(:active) {\n      background-color: rgb(96,125,139); }\n    .mdl-button--raised.mdl-button--colored .mdl-ripple {\n      background: rgb(255,255,255); }\n\n.mdl-button--fab {\n  border-radius: 50%;\n  font-size: 24px;\n  height: 56px;\n  margin: auto;\n  min-width: 56px;\n  width: 56px;\n  padding: 0;\n  overflow: hidden;\n  background: rgba(158,158,158, 0.20);\n  box-shadow: 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24);\n  position: relative;\n  line-height: normal; }\n  .mdl-button--fab .material-icons {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-12px, -12px);\n            transform: translate(-12px, -12px);\n    line-height: 24px;\n    width: 24px; }\n  .mdl-button--fab.mdl-button--mini-fab {\n    height: 40px;\n    min-width: 40px;\n    width: 40px; }\n  .mdl-button--fab .mdl-button__ripple-container {\n    border-radius: 50%;\n    -webkit-mask-image: -webkit-radial-gradient(circle, white, black); }\n  .mdl-button--fab:active {\n    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);\n    background-color: rgba(158,158,158, 0.40); }\n  .mdl-button--fab:focus:not(:active) {\n    box-shadow: 0 0 8px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.36);\n    background-color: rgba(158,158,158, 0.40); }\n  .mdl-button--fab.mdl-button--colored {\n    background: rgb(255,82,82);\n    color: rgb(255,255,255); }\n    .mdl-button--fab.mdl-button--colored:hover {\n      background-color: rgb(255,82,82); }\n    .mdl-button--fab.mdl-button--colored:focus:not(:active) {\n      background-color: rgb(255,82,82); }\n    .mdl-button--fab.mdl-button--colored:active {\n      background-color: rgb(255,82,82); }\n    .mdl-button--fab.mdl-button--colored .mdl-ripple {\n      background: rgb(255,255,255); }\n\n.mdl-button--icon {\n  border-radius: 50%;\n  font-size: 24px;\n  height: 32px;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 32px;\n  width: 32px;\n  padding: 0;\n  overflow: hidden;\n  color: inherit;\n  line-height: normal; }\n  .mdl-button--icon .material-icons {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-12px, -12px);\n            transform: translate(-12px, -12px);\n    line-height: 24px;\n    width: 24px; }\n  .mdl-button--icon.mdl-button--mini-icon {\n    height: 24px;\n    min-width: 24px;\n    width: 24px; }\n    .mdl-button--icon.mdl-button--mini-icon .material-icons {\n      top: 0px;\n      left: 0px; }\n  .mdl-button--icon .mdl-button__ripple-container {\n    border-radius: 50%;\n    -webkit-mask-image: -webkit-radial-gradient(circle, white, black); }\n\n.mdl-button__ripple-container {\n  display: block;\n  height: 100%;\n  left: 0px;\n  position: absolute;\n  top: 0px;\n  width: 100%;\n  z-index: 0;\n  overflow: hidden; }\n  .mdl-button[disabled] .mdl-button__ripple-container .mdl-ripple,\n  .mdl-button.mdl-button--disabled .mdl-button__ripple-container .mdl-ripple {\n    background-color: transparent; }\n\n.mdl-button--primary.mdl-button--primary {\n  color: rgb(96,125,139); }\n  .mdl-button--primary.mdl-button--primary .mdl-ripple {\n    background: rgb(255,255,255); }\n  .mdl-button--primary.mdl-button--primary.mdl-button--raised, .mdl-button--primary.mdl-button--primary.mdl-button--fab {\n    color: rgb(255,255,255);\n    background-color: rgb(96,125,139); }\n\n.mdl-button--accent.mdl-button--accent {\n  color: rgb(255,82,82); }\n  .mdl-button--accent.mdl-button--accent .mdl-ripple {\n    background: rgb(255,255,255); }\n  .mdl-button--accent.mdl-button--accent.mdl-button--raised, .mdl-button--accent.mdl-button--accent.mdl-button--fab {\n    color: rgb(255,255,255);\n    background-color: rgb(255,82,82); }\n\n.mdl-button[disabled][disabled], .mdl-button.mdl-button--disabled.mdl-button--disabled {\n  color: rgba(0,0,0, 0.26);\n  cursor: default;\n  background-color: transparent; }\n\n.mdl-button--fab[disabled][disabled], .mdl-button--fab.mdl-button--disabled.mdl-button--disabled {\n  background-color: rgba(0,0,0, 0.12);\n  color: rgba(0,0,0, 0.26); }\n\n.mdl-button--raised[disabled][disabled], .mdl-button--raised.mdl-button--disabled.mdl-button--disabled {\n  background-color: rgba(0,0,0, 0.12);\n  color: rgba(0,0,0, 0.26);\n  box-shadow: none; }\n\n.mdl-button--colored[disabled][disabled], .mdl-button--colored.mdl-button--disabled.mdl-button--disabled {\n  color: rgba(0,0,0, 0.26); }\n\n.mdl-button .material-icons {\n  vertical-align: middle; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-card {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  font-size: 16px;\n  font-weight: 400;\n  min-height: 200px;\n  overflow: hidden;\n  width: 330px;\n  z-index: 1;\n  position: relative;\n  background: rgb(255,255,255);\n  border-radius: 2px;\n  box-sizing: border-box; }\n\n.mdl-card__media {\n  background-color: rgb(255,82,82);\n  background-repeat: repeat;\n  background-position: 50% 50%;\n  background-size: cover;\n  background-origin: padding-box;\n  background-attachment: scroll;\n  box-sizing: border-box; }\n\n.mdl-card__title {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: rgb(0,0,0);\n  display: block;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: stretch;\n      -ms-flex-pack: stretch;\n          justify-content: stretch;\n  line-height: normal;\n  padding: 16px 16px;\n  -webkit-perspective-origin: 165px 56px;\n          perspective-origin: 165px 56px;\n  -webkit-transform-origin: 165px 56px;\n          transform-origin: 165px 56px;\n  box-sizing: border-box; }\n  .mdl-card__title.mdl-card--border {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1); }\n\n.mdl-card__title-text {\n  -ms-flex-item-align: end;\n      align-self: flex-end;\n  color: inherit;\n  display: block;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 24px;\n  font-weight: 300;\n  line-height: normal;\n  overflow: hidden;\n  -webkit-transform-origin: 149px 48px;\n          transform-origin: 149px 48px;\n  margin: 0; }\n\n.mdl-card__subtitle-text {\n  font-size: 14px;\n  color: rgba(0,0,0, 0.54);\n  margin: 0; }\n\n.mdl-card__supporting-text {\n  color: rgba(0,0,0, 0.54);\n  font-size: 1rem;\n  line-height: 18px;\n  overflow: hidden;\n  padding: 16px 16px;\n  width: 90%; }\n\n.mdl-card__actions {\n  font-size: 16px;\n  line-height: normal;\n  width: 100%;\n  background-color: transparent;\n  padding: 8px;\n  box-sizing: border-box; }\n  .mdl-card__actions.mdl-card--border {\n    border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\n.mdl-card--expand {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n\n.mdl-card__menu {\n  position: absolute;\n  right: 16px;\n  top: 16px; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-checkbox {\n  position: relative;\n  z-index: 1;\n  vertical-align: middle;\n  display: inline-block;\n  box-sizing: border-box;\n  width: 100%;\n  height: 24px;\n  margin: 0;\n  padding: 0; }\n  .mdl-checkbox.is-upgraded {\n    padding-left: 24px; }\n\n.mdl-checkbox__input {\n  line-height: 24px; }\n  .mdl-checkbox.is-upgraded .mdl-checkbox__input {\n    position: absolute;\n    width: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    opacity: 0;\n    -ms-appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    appearance: none;\n    border: none; }\n\n.mdl-checkbox__box-outline {\n  position: absolute;\n  top: 3px;\n  left: 0;\n  display: inline-block;\n  box-sizing: border-box;\n  width: 16px;\n  height: 16px;\n  margin: 0;\n  cursor: pointer;\n  overflow: hidden;\n  border: 2px solid rgba(0,0,0, 0.54);\n  border-radius: 2px;\n  z-index: 2; }\n  .mdl-checkbox.is-checked .mdl-checkbox__box-outline {\n    border: 2px solid rgb(96,125,139); }\n  fieldset[disabled] .mdl-checkbox .mdl-checkbox__box-outline,\n  .mdl-checkbox.is-disabled .mdl-checkbox__box-outline {\n    border: 2px solid rgba(0,0,0, 0.26);\n    cursor: auto; }\n\n.mdl-checkbox__focus-helper {\n  position: absolute;\n  top: 3px;\n  left: 0;\n  display: inline-block;\n  box-sizing: border-box;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background-color: transparent; }\n  .mdl-checkbox.is-focused .mdl-checkbox__focus-helper {\n    box-shadow: 0 0 0px 8px rgba(0, 0, 0, 0.1);\n    background-color: rgba(0, 0, 0, 0.1); }\n  .mdl-checkbox.is-focused.is-checked .mdl-checkbox__focus-helper {\n    box-shadow: 0 0 0px 8px rgba(96,125,139, 0.26);\n    background-color: rgba(96,125,139, 0.26); }\n\n.mdl-checkbox__tick-outline {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  -webkit-mask: url(\"/images/tick-mask.svg?embed\");\n          mask: url(\"/images/tick-mask.svg?embed\");\n  background: transparent;\n  -webkit-transition-duration: 0.28s;\n          transition-duration: 0.28s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  -webkit-transition-property: background;\n  transition-property: background; }\n  .mdl-checkbox.is-checked .mdl-checkbox__tick-outline {\n    background: rgb(96,125,139) url(\"/images/tick.svg?embed\"); }\n  fieldset[disabled] .mdl-checkbox.is-checked .mdl-checkbox__tick-outline,\n  .mdl-checkbox.is-checked.is-disabled .mdl-checkbox__tick-outline {\n    background: rgba(0,0,0, 0.26) url(\"/images/tick.svg?embed\"); }\n\n.mdl-checkbox__label {\n  position: relative;\n  cursor: pointer;\n  font-size: 16px;\n  line-height: 24px;\n  margin: 0; }\n  fieldset[disabled] .mdl-checkbox .mdl-checkbox__label,\n  .mdl-checkbox.is-disabled .mdl-checkbox__label {\n    color: rgba(0,0,0, 0.26);\n    cursor: auto; }\n\n.mdl-checkbox__ripple-container {\n  position: absolute;\n  z-index: 2;\n  top: -6px;\n  left: -10px;\n  box-sizing: border-box;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  cursor: pointer;\n  overflow: hidden;\n  -webkit-mask-image: -webkit-radial-gradient(circle, white, black); }\n  .mdl-checkbox__ripple-container .mdl-ripple {\n    background: rgb(96,125,139); }\n  fieldset[disabled] .mdl-checkbox .mdl-checkbox__ripple-container,\n  .mdl-checkbox.is-disabled .mdl-checkbox__ripple-container {\n    cursor: auto; }\n  fieldset[disabled] .mdl-checkbox .mdl-checkbox__ripple-container .mdl-ripple,\n  .mdl-checkbox.is-disabled .mdl-checkbox__ripple-container .mdl-ripple {\n    background: transparent; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-chip {\n  height: 32px;\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  line-height: 32px;\n  padding: 0 12px;\n  border: 0;\n  border-radius: 16px;\n  background-color: #dedede;\n  display: inline-block;\n  color: rgba(0,0,0, 0.87);\n  margin: 2px 0;\n  font-size: 0;\n  white-space: nowrap; }\n  .mdl-chip__text {\n    font-size: 13px;\n    vertical-align: middle;\n    display: inline-block; }\n  .mdl-chip__action {\n    height: 24px;\n    width: 24px;\n    background: transparent;\n    opacity: 0.54;\n    display: inline-block;\n    cursor: pointer;\n    text-align: center;\n    vertical-align: middle;\n    padding: 0;\n    margin: 0 0 0 4px;\n    font-size: 13px;\n    text-decoration: none;\n    color: rgba(0,0,0, 0.87);\n    border: none;\n    outline: none;\n    overflow: hidden; }\n  .mdl-chip__contact {\n    height: 32px;\n    width: 32px;\n    border-radius: 16px;\n    display: inline-block;\n    vertical-align: middle;\n    margin-right: 8px;\n    overflow: hidden;\n    text-align: center;\n    font-size: 18px;\n    line-height: 32px; }\n  .mdl-chip:focus {\n    outline: 0;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .mdl-chip:active {\n    background-color: #d6d6d6; }\n  .mdl-chip--deletable {\n    padding-right: 4px; }\n  .mdl-chip--contact {\n    padding-left: 0; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-data-table {\n  position: relative;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-collapse: collapse;\n  white-space: nowrap;\n  font-size: 13px;\n  background-color: rgb(255,255,255); }\n  .mdl-data-table thead {\n    padding-bottom: 3px; }\n    .mdl-data-table thead .mdl-data-table__select {\n      margin-top: 0; }\n  .mdl-data-table tbody tr {\n    position: relative;\n    height: 48px;\n    -webkit-transition-duration: 0.28s;\n            transition-duration: 0.28s;\n    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    -webkit-transition-property: background-color;\n    transition-property: background-color; }\n    .mdl-data-table tbody tr.is-selected {\n      background-color: #e0e0e0; }\n    .mdl-data-table tbody tr:hover {\n      background-color: #eeeeee; }\n  .mdl-data-table td, .mdl-data-table th {\n    padding: 0 18px 12px 18px;\n    text-align: right; }\n    .mdl-data-table td:first-of-type, .mdl-data-table th:first-of-type {\n      padding-left: 24px; }\n    .mdl-data-table td:last-of-type, .mdl-data-table th:last-of-type {\n      padding-right: 24px; }\n  .mdl-data-table td {\n    position: relative;\n    vertical-align: middle;\n    height: 48px;\n    border-top: 1px solid rgba(0, 0, 0, 0.12);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    padding-top: 12px;\n    box-sizing: border-box; }\n    .mdl-data-table td .mdl-data-table__select {\n      vertical-align: middle; }\n  .mdl-data-table th {\n    position: relative;\n    vertical-align: bottom;\n    text-overflow: ellipsis;\n    font-size: 14px;\n    font-weight: bold;\n    line-height: 24px;\n    letter-spacing: 0;\n    height: 48px;\n    font-size: 12px;\n    color: rgba(0, 0, 0, 0.54);\n    padding-bottom: 8px;\n    box-sizing: border-box; }\n    .mdl-data-table th.mdl-data-table__header--sorted-ascending, .mdl-data-table th.mdl-data-table__header--sorted-descending {\n      color: rgba(0, 0, 0, 0.87); }\n      .mdl-data-table th.mdl-data-table__header--sorted-ascending:before, .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n        font-family: 'Material Icons';\n        font-weight: normal;\n        font-style: normal;\n        font-size: 24px;\n        line-height: 1;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        word-wrap: normal;\n        font-feature-settings: 'liga';\n        -webkit-font-feature-settings: 'liga';\n        -webkit-font-smoothing: antialiased;\n        font-size: 16px;\n        content: \"\\E5D8\";\n        margin-right: 5px;\n        vertical-align: sub; }\n      .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover, .mdl-data-table th.mdl-data-table__header--sorted-descending:hover {\n        cursor: pointer; }\n        .mdl-data-table th.mdl-data-table__header--sorted-ascending:hover:before, .mdl-data-table th.mdl-data-table__header--sorted-descending:hover:before {\n          color: rgba(0, 0, 0, 0.26); }\n    .mdl-data-table th.mdl-data-table__header--sorted-descending:before {\n      content: \"\\E5DB\"; }\n\n.mdl-data-table__select {\n  width: 16px; }\n\n.mdl-data-table__cell--non-numeric.mdl-data-table__cell--non-numeric {\n  text-align: left; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-dialog {\n  border: none;\n  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2);\n  width: 280px; }\n  .mdl-dialog__title {\n    padding: 24px 24px 0;\n    margin: 0;\n    font-size: 2.5rem; }\n  .mdl-dialog__actions {\n    padding: 8px 8px 8px 24px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap; }\n    .mdl-dialog__actions > * {\n      margin-right: 8px;\n      height: 36px; }\n      .mdl-dialog__actions > *:first-child {\n        margin-right: 0; }\n    .mdl-dialog__actions--full-width {\n      padding: 0 0 8px 0; }\n      .mdl-dialog__actions--full-width > * {\n        height: 48px;\n        -webkit-box-flex: 0;\n            -ms-flex: 0 0 100%;\n                flex: 0 0 100%;\n        padding-right: 16px;\n        margin-right: 0;\n        text-align: right; }\n  .mdl-dialog__content {\n    padding: 20px 24px 24px 24px;\n    color: rgba(0,0,0, 0.54); }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-mega-footer {\n  padding: 16px 40px;\n  color: rgb(158,158,158);\n  background-color: rgb(66,66,66); }\n\n.mdl-mega-footer--top-section:after,\n.mdl-mega-footer--middle-section:after,\n.mdl-mega-footer--bottom-section:after,\n.mdl-mega-footer__top-section:after,\n.mdl-mega-footer__middle-section:after,\n.mdl-mega-footer__bottom-section:after {\n  content: '';\n  display: block;\n  clear: both; }\n\n.mdl-mega-footer--left-section,\n.mdl-mega-footer__left-section {\n  margin-bottom: 16px; }\n\n.mdl-mega-footer--right-section,\n.mdl-mega-footer__right-section {\n  margin-bottom: 16px; }\n\n.mdl-mega-footer--right-section a,\n.mdl-mega-footer__right-section a {\n  display: block;\n  margin-bottom: 16px;\n  color: inherit;\n  text-decoration: none; }\n\n@media screen and (min-width: 760px) {\n  .mdl-mega-footer--left-section,\n  .mdl-mega-footer__left-section {\n    float: left; }\n  .mdl-mega-footer--right-section,\n  .mdl-mega-footer__right-section {\n    float: right; }\n  .mdl-mega-footer--right-section a,\n  .mdl-mega-footer__right-section a {\n    display: inline-block;\n    margin-left: 16px;\n    line-height: 36px;\n    vertical-align: middle; } }\n\n.mdl-mega-footer--social-btn,\n.mdl-mega-footer__social-btn {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  margin: 0;\n  background-color: rgb(158,158,158);\n  border: none; }\n\n.mdl-mega-footer--drop-down-section,\n.mdl-mega-footer__drop-down-section {\n  display: block;\n  position: relative; }\n\n@media screen and (min-width: 760px) {\n  .mdl-mega-footer--drop-down-section,\n  .mdl-mega-footer__drop-down-section {\n    width: 33%; }\n  .mdl-mega-footer--drop-down-section:nth-child(1),\n  .mdl-mega-footer--drop-down-section:nth-child(2),\n  .mdl-mega-footer__drop-down-section:nth-child(1),\n  .mdl-mega-footer__drop-down-section:nth-child(2) {\n    float: left; }\n  .mdl-mega-footer--drop-down-section:nth-child(3),\n  .mdl-mega-footer__drop-down-section:nth-child(3) {\n    float: right; }\n    .mdl-mega-footer--drop-down-section:nth-child(3):after,\n    .mdl-mega-footer__drop-down-section:nth-child(3):after {\n      clear: right; }\n  .mdl-mega-footer--drop-down-section:nth-child(4),\n  .mdl-mega-footer__drop-down-section:nth-child(4) {\n    clear: right;\n    float: right; }\n  .mdl-mega-footer--middle-section:after,\n  .mdl-mega-footer__middle-section:after {\n    content: '';\n    display: block;\n    clear: both; }\n  .mdl-mega-footer--bottom-section,\n  .mdl-mega-footer__bottom-section {\n    padding-top: 0; } }\n\n@media screen and (min-width: 1024px) {\n  .mdl-mega-footer--drop-down-section,\n  .mdl-mega-footer--drop-down-section:nth-child(3),\n  .mdl-mega-footer--drop-down-section:nth-child(4),\n  .mdl-mega-footer__drop-down-section,\n  .mdl-mega-footer__drop-down-section:nth-child(3),\n  .mdl-mega-footer__drop-down-section:nth-child(4) {\n    width: 24%;\n    float: left; } }\n\n.mdl-mega-footer--heading-checkbox,\n.mdl-mega-footer__heading-checkbox {\n  position: absolute;\n  width: 100%;\n  height: 55.8px;\n  padding: 32px;\n  margin: 0;\n  margin-top: -16px;\n  cursor: pointer;\n  z-index: 1;\n  opacity: 0; }\n  .mdl-mega-footer--heading-checkbox + .mdl-mega-footer--heading:after,\n  .mdl-mega-footer--heading-checkbox + .mdl-mega-footer__heading:after,\n  .mdl-mega-footer__heading-checkbox + .mdl-mega-footer--heading:after,\n  .mdl-mega-footer__heading-checkbox + .mdl-mega-footer__heading:after {\n    font-family: 'Material Icons';\n    content: '\\E5CE'; }\n\n.mdl-mega-footer--heading-checkbox:checked ~ .mdl-mega-footer--link-list,\n.mdl-mega-footer--heading-checkbox:checked ~ .mdl-mega-footer__link-list,\n.mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer--heading + .mdl-mega-footer--link-list,\n.mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer__heading + .mdl-mega-footer__link-list,\n.mdl-mega-footer__heading-checkbox:checked ~ .mdl-mega-footer--link-list,\n.mdl-mega-footer__heading-checkbox:checked ~ .mdl-mega-footer__link-list,\n.mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer--heading + .mdl-mega-footer--link-list,\n.mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer__heading + .mdl-mega-footer__link-list {\n  display: none; }\n\n.mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer--heading:after,\n.mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer__heading:after,\n.mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer--heading:after,\n.mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer__heading:after {\n  font-family: 'Material Icons';\n  content: '\\E5CF'; }\n\n.mdl-mega-footer--heading,\n.mdl-mega-footer__heading {\n  position: relative;\n  width: 100%;\n  padding-right: 39.8px;\n  margin-bottom: 16px;\n  box-sizing: border-box;\n  font-size: 14px;\n  line-height: 23.8px;\n  font-weight: 500;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  color: rgb(224,224,224); }\n\n.mdl-mega-footer--heading:after,\n.mdl-mega-footer__heading:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: block;\n  width: 23.8px;\n  height: 23.8px;\n  background-size: cover; }\n\n.mdl-mega-footer--link-list,\n.mdl-mega-footer__link-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  margin-bottom: 32px; }\n  .mdl-mega-footer--link-list:after,\n  .mdl-mega-footer__link-list:after {\n    clear: both;\n    display: block;\n    content: ''; }\n\n.mdl-mega-footer--link-list li,\n.mdl-mega-footer__link-list li {\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  line-height: 20px; }\n\n.mdl-mega-footer--link-list a,\n.mdl-mega-footer__link-list a {\n  color: inherit;\n  text-decoration: none;\n  white-space: nowrap; }\n\n@media screen and (min-width: 760px) {\n  .mdl-mega-footer--heading-checkbox,\n  .mdl-mega-footer__heading-checkbox {\n    display: none; }\n    .mdl-mega-footer--heading-checkbox + .mdl-mega-footer--heading:after,\n    .mdl-mega-footer--heading-checkbox + .mdl-mega-footer__heading:after,\n    .mdl-mega-footer__heading-checkbox + .mdl-mega-footer--heading:after,\n    .mdl-mega-footer__heading-checkbox + .mdl-mega-footer__heading:after {\n      content: ''; }\n  .mdl-mega-footer--heading-checkbox:checked ~ .mdl-mega-footer--link-list,\n  .mdl-mega-footer--heading-checkbox:checked ~ .mdl-mega-footer__link-list,\n  .mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer__heading + .mdl-mega-footer__link-list,\n  .mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer--heading + .mdl-mega-footer--link-list,\n  .mdl-mega-footer__heading-checkbox:checked ~ .mdl-mega-footer--link-list,\n  .mdl-mega-footer__heading-checkbox:checked ~ .mdl-mega-footer__link-list,\n  .mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer__heading + .mdl-mega-footer__link-list,\n  .mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer--heading + .mdl-mega-footer--link-list {\n    display: block; }\n  .mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer--heading:after,\n  .mdl-mega-footer--heading-checkbox:checked + .mdl-mega-footer__heading:after,\n  .mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer--heading:after,\n  .mdl-mega-footer__heading-checkbox:checked + .mdl-mega-footer__heading:after {\n    content: ''; } }\n\n.mdl-mega-footer--bottom-section,\n.mdl-mega-footer__bottom-section {\n  padding-top: 16px;\n  margin-bottom: 16px; }\n\n.mdl-logo {\n  margin-bottom: 16px;\n  color: white; }\n\n.mdl-mega-footer--bottom-section .mdl-mega-footer--link-list li,\n.mdl-mega-footer__bottom-section .mdl-mega-footer__link-list li {\n  float: left;\n  margin-bottom: 0;\n  margin-right: 16px; }\n\n@media screen and (min-width: 760px) {\n  .mdl-logo {\n    float: left;\n    margin-bottom: 0;\n    margin-right: 16px; } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-mini-footer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n      flex-flow: row wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 32px 16px;\n  color: rgb(158,158,158);\n  background-color: rgb(66,66,66); }\n  .mdl-mini-footer:after {\n    content: '';\n    display: block; }\n  .mdl-mini-footer .mdl-logo {\n    line-height: 36px; }\n\n.mdl-mini-footer--link-list,\n.mdl-mini-footer__link-list {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n      flex-flow: row nowrap;\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n  .mdl-mini-footer--link-list li,\n  .mdl-mini-footer__link-list li {\n    margin-bottom: 0;\n    margin-right: 16px; }\n    @media screen and (min-width: 760px) {\n      .mdl-mini-footer--link-list li,\n      .mdl-mini-footer__link-list li {\n        line-height: 36px; } }\n  .mdl-mini-footer--link-list a,\n  .mdl-mini-footer__link-list a {\n    color: inherit;\n    text-decoration: none;\n    white-space: nowrap; }\n\n.mdl-mini-footer--left-section,\n.mdl-mini-footer__left-section {\n  display: inline-block;\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0; }\n\n.mdl-mini-footer--right-section,\n.mdl-mini-footer__right-section {\n  display: inline-block;\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.mdl-mini-footer--social-btn,\n.mdl-mini-footer__social-btn {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  margin: 0;\n  background-color: rgb(158,158,158);\n  border: none; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-icon-toggle {\n  position: relative;\n  z-index: 1;\n  vertical-align: middle;\n  display: inline-block;\n  height: 32px;\n  margin: 0;\n  padding: 0; }\n\n.mdl-icon-toggle__input {\n  line-height: 32px; }\n  .mdl-icon-toggle.is-upgraded .mdl-icon-toggle__input {\n    position: absolute;\n    width: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    opacity: 0;\n    -ms-appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    appearance: none;\n    border: none; }\n\n.mdl-icon-toggle__label {\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  height: 32px;\n  width: 32px;\n  min-width: 32px;\n  color: rgb(97,97,97);\n  border-radius: 50%;\n  padding: 0;\n  margin-left: 0;\n  margin-right: 0;\n  text-align: center;\n  background-color: transparent;\n  will-change: background-color;\n  -webkit-transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdl-icon-toggle__label.material-icons {\n    line-height: 32px;\n    font-size: 24px; }\n  .mdl-icon-toggle.is-checked .mdl-icon-toggle__label {\n    color: rgb(96,125,139); }\n  .mdl-icon-toggle.is-disabled .mdl-icon-toggle__label {\n    color: rgba(0,0,0, 0.26);\n    cursor: auto;\n    -webkit-transition: none;\n    transition: none; }\n  .mdl-icon-toggle.is-focused .mdl-icon-toggle__label {\n    background-color: rgba(0,0,0, 0.12); }\n  .mdl-icon-toggle.is-focused.is-checked .mdl-icon-toggle__label {\n    background-color: rgba(96,125,139, 0.26); }\n\n.mdl-icon-toggle__ripple-container {\n  position: absolute;\n  z-index: 2;\n  top: -2px;\n  left: -2px;\n  box-sizing: border-box;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  cursor: pointer;\n  overflow: hidden;\n  -webkit-mask-image: -webkit-radial-gradient(circle, white, black); }\n  .mdl-icon-toggle__ripple-container .mdl-ripple {\n    background: rgb(97,97,97); }\n  .mdl-icon-toggle.is-disabled .mdl-icon-toggle__ripple-container {\n    cursor: auto; }\n  .mdl-icon-toggle.is-disabled .mdl-icon-toggle__ripple-container .mdl-ripple {\n    background: transparent; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-list {\n  display: block;\n  padding: 8px 0;\n  list-style: none; }\n\n.mdl-list__item {\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.04em;\n  line-height: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 48px;\n  box-sizing: border-box;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 16px;\n  cursor: default;\n  color: rgba(0,0,0, 0.87);\n  overflow: hidden; }\n  .mdl-list__item .mdl-list__item-primary-content {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0;\n    -webkit-box-flex: 2;\n        -ms-flex-positive: 2;\n            flex-grow: 2;\n    text-decoration: none;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n    .mdl-list__item .mdl-list__item-primary-content .mdl-list__item-icon {\n      margin-right: 32px; }\n    .mdl-list__item .mdl-list__item-primary-content .mdl-list__item-avatar {\n      margin-right: 16px; }\n  .mdl-list__item .mdl-list__item-secondary-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-flow: column;\n        flex-flow: column;\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    margin-left: 16px; }\n    .mdl-list__item .mdl-list__item-secondary-content .mdl-list__item-secondary-action label {\n      display: inline; }\n    .mdl-list__item .mdl-list__item-secondary-content .mdl-list__item-secondary-info {\n      font-size: 12px;\n      font-weight: 400;\n      line-height: 1;\n      letter-spacing: 0;\n      color: rgba(0,0,0, 0.54); }\n    .mdl-list__item .mdl-list__item-secondary-content .mdl-list__item-sub-header {\n      padding: 0 0 0 16px; }\n\n.mdl-list__item-icon,\n.mdl-list__item-icon.material-icons {\n  height: 24px;\n  width: 24px;\n  font-size: 24px;\n  box-sizing: border-box;\n  color: rgb(117,117,117); }\n\n.mdl-list__item-avatar,\n.mdl-list__item-avatar.material-icons {\n  height: 40px;\n  width: 40px;\n  box-sizing: border-box;\n  border-radius: 50%;\n  background-color: rgb(117,117,117);\n  font-size: 40px;\n  color: white; }\n\n.mdl-list__item--two-line {\n  height: 72px; }\n  .mdl-list__item--two-line .mdl-list__item-primary-content {\n    height: 36px;\n    line-height: 20px;\n    display: block; }\n    .mdl-list__item--two-line .mdl-list__item-primary-content .mdl-list__item-avatar {\n      float: left; }\n    .mdl-list__item--two-line .mdl-list__item-primary-content .mdl-list__item-icon {\n      float: left;\n      margin-top: 6px; }\n    .mdl-list__item--two-line .mdl-list__item-primary-content .mdl-list__item-secondary-content {\n      height: 36px; }\n    .mdl-list__item--two-line .mdl-list__item-primary-content .mdl-list__item-sub-title {\n      font-size: 14px;\n      font-weight: 400;\n      line-height: 24px;\n      letter-spacing: 0;\n      line-height: 18px;\n      color: rgba(0,0,0, 0.54);\n      display: block;\n      padding: 0; }\n\n.mdl-list__item--three-line {\n  height: 88px; }\n  .mdl-list__item--three-line .mdl-list__item-primary-content {\n    height: 52px;\n    line-height: 20px;\n    display: block; }\n    .mdl-list__item--three-line .mdl-list__item-primary-content .mdl-list__item-avatar,\n    .mdl-list__item--three-line .mdl-list__item-primary-content .mdl-list__item-icon {\n      float: left; }\n  .mdl-list__item--three-line .mdl-list__item-secondary-content {\n    height: 52px; }\n  .mdl-list__item--three-line .mdl-list__item-text-body {\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 24px;\n    letter-spacing: 0;\n    line-height: 18px;\n    height: 52px;\n    color: rgba(0,0,0, 0.54);\n    display: block;\n    padding: 0; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-menu__container {\n  display: block;\n  margin: 0;\n  padding: 0;\n  border: none;\n  position: absolute;\n  overflow: visible;\n  height: 0;\n  width: 0;\n  visibility: hidden;\n  z-index: -1; }\n  .mdl-menu__container.is-visible, .mdl-menu__container.is-animating {\n    z-index: 999;\n    visibility: visible; }\n\n.mdl-menu__outline {\n  display: block;\n  background: rgb(255,255,255);\n  margin: 0;\n  padding: 0;\n  border: none;\n  border-radius: 2px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  opacity: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  will-change: transform;\n  -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: -1; }\n  .mdl-menu__container.is-visible .mdl-menu__outline {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    z-index: 999; }\n  .mdl-menu__outline.mdl-menu--bottom-right {\n    -webkit-transform-origin: 100% 0;\n            transform-origin: 100% 0; }\n  .mdl-menu__outline.mdl-menu--top-left {\n    -webkit-transform-origin: 0 100%;\n            transform-origin: 0 100%; }\n  .mdl-menu__outline.mdl-menu--top-right {\n    -webkit-transform-origin: 100% 100%;\n            transform-origin: 100% 100%; }\n\n.mdl-menu {\n  position: absolute;\n  list-style: none;\n  top: 0;\n  left: 0;\n  height: auto;\n  width: auto;\n  min-width: 124px;\n  padding: 8px 0;\n  margin: 0;\n  opacity: 0;\n  clip: rect(0 0 0 0);\n  z-index: -1; }\n  .mdl-menu__container.is-visible .mdl-menu {\n    opacity: 1;\n    z-index: 999; }\n  .mdl-menu.is-animating {\n    -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), clip 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), clip 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdl-menu.mdl-menu--bottom-right {\n    left: auto;\n    right: 0; }\n  .mdl-menu.mdl-menu--top-left {\n    top: auto;\n    bottom: 0; }\n  .mdl-menu.mdl-menu--top-right {\n    top: auto;\n    left: auto;\n    bottom: 0;\n    right: 0; }\n  .mdl-menu.mdl-menu--unaligned {\n    top: auto;\n    left: auto; }\n\n.mdl-menu__item {\n  display: block;\n  border: none;\n  color: rgba(0,0,0, 0.87);\n  background-color: transparent;\n  text-align: left;\n  margin: 0;\n  padding: 0 16px;\n  outline-color: rgb(189,189,189);\n  position: relative;\n  overflow: hidden;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  text-decoration: none;\n  cursor: pointer;\n  height: 48px;\n  line-height: 48px;\n  white-space: nowrap;\n  opacity: 0;\n  -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .mdl-menu__container.is-visible .mdl-menu__item {\n    opacity: 1; }\n  .mdl-menu__item::-moz-focus-inner {\n    border: 0; }\n  .mdl-menu__item--full-bleed-divider {\n    border-bottom: 1px solid rgba(0,0,0, 0.12); }\n  .mdl-menu__item[disabled], .mdl-menu__item[data-mdl-disabled] {\n    color: rgb(189,189,189);\n    background-color: transparent;\n    cursor: auto; }\n    .mdl-menu__item[disabled]:hover, .mdl-menu__item[data-mdl-disabled]:hover {\n      background-color: transparent; }\n    .mdl-menu__item[disabled]:focus, .mdl-menu__item[data-mdl-disabled]:focus {\n      background-color: transparent; }\n    .mdl-menu__item[disabled] .mdl-ripple, .mdl-menu__item[data-mdl-disabled] .mdl-ripple {\n      background: transparent; }\n  .mdl-menu__item:hover {\n    background-color: rgb(238,238,238); }\n  .mdl-menu__item:focus {\n    outline: none;\n    background-color: rgb(238,238,238); }\n  .mdl-menu__item:active {\n    background-color: rgb(224,224,224); }\n\n.mdl-menu__item--ripple-container {\n  display: block;\n  height: 100%;\n  left: 0px;\n  position: absolute;\n  top: 0px;\n  width: 100%;\n  z-index: 0;\n  overflow: hidden; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-progress {\n  display: block;\n  position: relative;\n  height: 4px;\n  width: 500px;\n  max-width: 100%; }\n\n.mdl-progress > .bar {\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 0%;\n  -webkit-transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdl-progress > .progressbar {\n  background-color: rgb(96,125,139);\n  z-index: 1;\n  left: 0; }\n\n.mdl-progress > .bufferbar {\n  background-image: -webkit-linear-gradient(left, rgba(255,255,255, 0.7), rgba(255,255,255, 0.7)), -webkit-linear-gradient(left, rgb(96,125,139), rgb(96,125,139));\n  background-image: linear-gradient(to right, rgba(255,255,255, 0.7), rgba(255,255,255, 0.7)), linear-gradient(to right, rgb(96,125,139), rgb(96,125,139));\n  z-index: 0;\n  left: 0; }\n\n.mdl-progress > .auxbar {\n  right: 0; }\n\n@supports (-webkit-appearance: none) {\n  .mdl-progress:not(.mdl-progress--indeterminate):not(.mdl-progress--indeterminate) > .auxbar,\n  .mdl-progress:not(.mdl-progress__indeterminate):not(.mdl-progress__indeterminate) > .auxbar {\n    background-image: -webkit-linear-gradient(left, rgba(255,255,255, 0.7), rgba(255,255,255, 0.7)), -webkit-linear-gradient(left, rgb(96,125,139), rgb(96,125,139));\n    background-image: linear-gradient(to right, rgba(255,255,255, 0.7), rgba(255,255,255, 0.7)), linear-gradient(to right, rgb(96,125,139), rgb(96,125,139));\n    -webkit-mask: url(\"/images/buffer.svg?embed\");\n            mask: url(\"/images/buffer.svg?embed\"); } }\n\n.mdl-progress:not(.mdl-progress--indeterminate) > .auxbar,\n.mdl-progress:not(.mdl-progress__indeterminate) > .auxbar {\n  background-image: -webkit-linear-gradient(left, rgba(255,255,255, 0.9), rgba(255,255,255, 0.9)), -webkit-linear-gradient(left, rgb(96,125,139), rgb(96,125,139));\n  background-image: linear-gradient(to right, rgba(255,255,255, 0.9), rgba(255,255,255, 0.9)), linear-gradient(to right, rgb(96,125,139), rgb(96,125,139)); }\n\n.mdl-progress.mdl-progress--indeterminate > .bar1,\n.mdl-progress.mdl-progress__indeterminate > .bar1 {\n  background-color: rgb(96,125,139);\n  -webkit-animation-name: indeterminate1;\n          animation-name: indeterminate1;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: linear;\n          animation-timing-function: linear; }\n\n.mdl-progress.mdl-progress--indeterminate > .bar3,\n.mdl-progress.mdl-progress__indeterminate > .bar3 {\n  background-image: none;\n  background-color: rgb(96,125,139);\n  -webkit-animation-name: indeterminate2;\n          animation-name: indeterminate2;\n  -webkit-animation-duration: 2s;\n          animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: linear;\n          animation-timing-function: linear; }\n\n@-webkit-keyframes indeterminate1 {\n  0% {\n    left: 0%;\n    width: 0%; }\n  50% {\n    left: 25%;\n    width: 75%; }\n  75% {\n    left: 100%;\n    width: 0%; } }\n\n@keyframes indeterminate1 {\n  0% {\n    left: 0%;\n    width: 0%; }\n  50% {\n    left: 25%;\n    width: 75%; }\n  75% {\n    left: 100%;\n    width: 0%; } }\n\n@-webkit-keyframes indeterminate2 {\n  0% {\n    left: 0%;\n    width: 0%; }\n  50% {\n    left: 0%;\n    width: 0%; }\n  75% {\n    left: 0%;\n    width: 25%; }\n  100% {\n    left: 100%;\n    width: 0%; } }\n\n@keyframes indeterminate2 {\n  0% {\n    left: 0%;\n    width: 0%; }\n  50% {\n    left: 0%;\n    width: 0%; }\n  75% {\n    left: 0%;\n    width: 25%; }\n  100% {\n    left: 100%;\n    width: 0%; } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-navigation {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  box-sizing: border-box; }\n\n.mdl-navigation__link {\n  color: rgb(66,66,66);\n  text-decoration: none;\n  margin: 0;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0;\n  opacity: 0.87; }\n  .mdl-navigation__link .material-icons {\n    vertical-align: middle; }\n\n.mdl-layout {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  overflow-y: auto;\n  overflow-x: hidden;\n  position: relative;\n  -webkit-overflow-scrolling: touch; }\n\n.mdl-layout.is-small-screen .mdl-layout--large-screen-only {\n  display: none; }\n\n.mdl-layout:not(.is-small-screen) .mdl-layout--small-screen-only {\n  display: none; }\n\n.mdl-layout__container {\n  position: absolute;\n  width: 100%;\n  height: 100%; }\n\n.mdl-layout__title,\n.mdl-layout-title {\n  display: block;\n  position: relative;\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 1;\n  letter-spacing: 0.02em;\n  font-weight: 400;\n  box-sizing: border-box; }\n\n.mdl-layout-spacer {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n\n.mdl-layout__drawer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  width: 240px;\n  height: 100%;\n  max-height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  box-sizing: border-box;\n  border-right: 1px solid rgb(224,224,224);\n  background: rgb(250,250,250);\n  -webkit-transform: translateX(-250px);\n          transform: translateX(-250px);\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  will-change: transform;\n  -webkit-transition-duration: 0.2s;\n          transition-duration: 0.2s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  -webkit-transition-property: -webkit-transform;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  color: rgb(66,66,66);\n  overflow: visible;\n  overflow-y: auto;\n  z-index: 5; }\n  .mdl-layout__drawer.is-visible {\n    -webkit-transform: translateX(0);\n            transform: translateX(0); }\n    .mdl-layout__drawer.is-visible ~ .mdl-layout__content.mdl-layout__content {\n      overflow: hidden; }\n  .mdl-layout__drawer > * {\n    -ms-flex-negative: 0;\n        flex-shrink: 0; }\n  .mdl-layout__drawer > .mdl-layout__title,\n  .mdl-layout__drawer > .mdl-layout-title {\n    line-height: 64px;\n    padding-left: 40px; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__drawer > .mdl-layout__title,\n      .mdl-layout__drawer > .mdl-layout-title {\n        line-height: 56px;\n        padding-left: 16px; } }\n  .mdl-layout__drawer .mdl-navigation {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n                -ms-grid-row-align: stretch;\n            align-items: stretch;\n    padding-top: 16px; }\n    .mdl-layout__drawer .mdl-navigation .mdl-navigation__link {\n      display: block;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n      padding: 16px 40px;\n      margin: 0;\n      color: #757575; }\n      @media screen and (max-width: 1024px) {\n        .mdl-layout__drawer .mdl-navigation .mdl-navigation__link {\n          padding: 16px 16px; } }\n      .mdl-layout__drawer .mdl-navigation .mdl-navigation__link:hover {\n        background-color: rgb(224,224,224); }\n      .mdl-layout__drawer .mdl-navigation .mdl-navigation__link--current {\n        background-color: rgb(224,224,224);\n        color: rgb(0,0,0); }\n  @media screen and (min-width: 1025px) {\n    .mdl-layout--fixed-drawer > .mdl-layout__drawer {\n      -webkit-transform: translateX(0);\n              transform: translateX(0); } }\n\n.mdl-layout__drawer-button {\n  display: block;\n  position: absolute;\n  height: 48px;\n  width: 48px;\n  border: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  overflow: hidden;\n  text-align: center;\n  cursor: pointer;\n  font-size: 26px;\n  line-height: 56px;\n  font-family: Helvetica, Arial, sans-serif;\n  margin: 8px 12px;\n  top: 0;\n  left: 0;\n  color: rgb(255,255,255);\n  z-index: 4; }\n  .mdl-layout__header .mdl-layout__drawer-button {\n    position: absolute;\n    color: rgb(255,255,255);\n    background-color: inherit; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__header .mdl-layout__drawer-button {\n        margin: 4px; } }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__drawer-button {\n      margin: 4px;\n      color: rgba(0, 0, 0, 0.5); } }\n  @media screen and (min-width: 1025px) {\n    .mdl-layout__drawer-button {\n      line-height: 54px; }\n      .mdl-layout--no-desktop-drawer-button .mdl-layout__drawer-button,\n      .mdl-layout--fixed-drawer > .mdl-layout__drawer-button,\n      .mdl-layout--no-drawer-button .mdl-layout__drawer-button {\n        display: none; } }\n\n.mdl-layout__header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  box-sizing: border-box;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  border: none;\n  min-height: 64px;\n  max-height: 1000px;\n  z-index: 3;\n  background-color: rgb(96,125,139);\n  color: rgb(255,255,255);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  -webkit-transition-duration: 0.2s;\n          transition-duration: 0.2s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  -webkit-transition-property: max-height, box-shadow;\n  transition-property: max-height, box-shadow; }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__header {\n      min-height: 56px; } }\n  .mdl-layout--fixed-drawer.is-upgraded:not(.is-small-screen) > .mdl-layout__header {\n    margin-left: 240px;\n    width: calc(100% - 240px); }\n  @media screen and (min-width: 1025px) {\n    .mdl-layout--fixed-drawer > .mdl-layout__header .mdl-layout__header-row {\n      padding-left: 40px; } }\n  .mdl-layout__header > .mdl-layout-icon {\n    position: absolute;\n    left: 40px;\n    top: 16px;\n    height: 32px;\n    width: 32px;\n    overflow: hidden;\n    z-index: 3;\n    display: block; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__header > .mdl-layout-icon {\n        left: 16px;\n        top: 12px; } }\n  .mdl-layout.has-drawer .mdl-layout__header > .mdl-layout-icon {\n    display: none; }\n  .mdl-layout__header.is-compact {\n    max-height: 64px; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__header.is-compact {\n        max-height: 56px; } }\n  .mdl-layout__header.is-compact.has-tabs {\n    height: 112px; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__header.is-compact.has-tabs {\n        min-height: 104px; } }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__header {\n      display: none; }\n    .mdl-layout--fixed-header > .mdl-layout__header {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; } }\n\n.mdl-layout__header--transparent.mdl-layout__header--transparent {\n  background-color: transparent;\n  box-shadow: none; }\n\n.mdl-layout__header--seamed {\n  box-shadow: none; }\n\n.mdl-layout__header--scroll {\n  box-shadow: none; }\n\n.mdl-layout__header--waterfall {\n  box-shadow: none;\n  overflow: hidden; }\n  .mdl-layout__header--waterfall.is-casting-shadow {\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .mdl-layout__header--waterfall.mdl-layout__header--waterfall-hide-top {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n\n.mdl-layout__header-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  box-sizing: border-box;\n  -ms-flex-item-align: stretch;\n      align-self: stretch;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 64px;\n  margin: 0;\n  padding: 0 40px 0 80px; }\n  .mdl-layout--no-drawer-button .mdl-layout__header-row {\n    padding-left: 40px; }\n  @media screen and (min-width: 1025px) {\n    .mdl-layout--no-desktop-drawer-button .mdl-layout__header-row {\n      padding-left: 40px; } }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__header-row {\n      height: 56px;\n      padding: 0 16px 0 72px; }\n      .mdl-layout--no-drawer-button .mdl-layout__header-row {\n        padding-left: 16px; } }\n  .mdl-layout__header-row > * {\n    -ms-flex-negative: 0;\n        flex-shrink: 0; }\n  .mdl-layout__header--scroll .mdl-layout__header-row {\n    width: 100%; }\n  .mdl-layout__header-row .mdl-navigation {\n    margin: 0;\n    padding: 0;\n    height: 64px;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n                -ms-grid-row-align: center;\n            align-items: center; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__header-row .mdl-navigation {\n        height: 56px; } }\n  .mdl-layout__header-row .mdl-navigation__link {\n    display: block;\n    color: rgb(255,255,255);\n    line-height: 64px;\n    padding: 0 24px; }\n    @media screen and (max-width: 1024px) {\n      .mdl-layout__header-row .mdl-navigation__link {\n        line-height: 56px;\n        padding: 0 16px; } }\n\n.mdl-layout__obfuscator {\n  background-color: transparent;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 4;\n  visibility: hidden;\n  -webkit-transition-property: background-color;\n  transition-property: background-color;\n  -webkit-transition-duration: 0.2s;\n          transition-duration: 0.2s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdl-layout__obfuscator.is-visible {\n    background-color: rgba(0, 0, 0, 0.5);\n    visibility: visible; }\n  @supports (pointer-events: auto) {\n    .mdl-layout__obfuscator {\n      background-color: rgba(0, 0, 0, 0.5);\n      opacity: 0;\n      -webkit-transition-property: opacity;\n      transition-property: opacity;\n      visibility: visible;\n      pointer-events: none; }\n      .mdl-layout__obfuscator.is-visible {\n        pointer-events: auto;\n        opacity: 1; } }\n\n.mdl-layout__content {\n  -ms-flex: 0 1 auto;\n  position: relative;\n  display: inline-block;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  z-index: 1;\n  -webkit-overflow-scrolling: touch; }\n  .mdl-layout--fixed-drawer > .mdl-layout__content {\n    margin-left: 240px; }\n  .mdl-layout__container.has-scrolling-header .mdl-layout__content {\n    overflow: visible; }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout--fixed-drawer > .mdl-layout__content {\n      margin-left: 0; }\n    .mdl-layout__container.has-scrolling-header .mdl-layout__content {\n      overflow-y: auto;\n      overflow-x: hidden; } }\n\n.mdl-layout__tab-bar {\n  height: 96px;\n  margin: 0;\n  width: calc(100% - 112px);\n  padding: 0 0 0 56px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: rgb(96,125,139);\n  overflow-y: hidden;\n  overflow-x: scroll; }\n  .mdl-layout__tab-bar::-webkit-scrollbar {\n    display: none; }\n  .mdl-layout--no-drawer-button .mdl-layout__tab-bar {\n    padding-left: 16px;\n    width: calc(100% - 32px); }\n  @media screen and (min-width: 1025px) {\n    .mdl-layout--no-desktop-drawer-button .mdl-layout__tab-bar {\n      padding-left: 16px;\n      width: calc(100% - 32px); } }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__tab-bar {\n      width: calc(100% - 60px);\n      padding: 0 0 0 60px; }\n      .mdl-layout--no-drawer-button .mdl-layout__tab-bar {\n        width: calc(100% - 8px);\n        padding-left: 4px; } }\n  .mdl-layout--fixed-tabs .mdl-layout__tab-bar {\n    padding: 0;\n    overflow: hidden;\n    width: 100%; }\n\n.mdl-layout__tab-bar-container {\n  position: relative;\n  height: 48px;\n  width: 100%;\n  border: none;\n  margin: 0;\n  z-index: 2;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  overflow: hidden; }\n  .mdl-layout__container > .mdl-layout__tab-bar-container {\n    position: absolute;\n    top: 0;\n    left: 0; }\n\n.mdl-layout__tab-bar-button {\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  height: 48px;\n  width: 56px;\n  z-index: 4;\n  text-align: center;\n  background-color: rgb(96,125,139);\n  color: transparent;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .mdl-layout--no-desktop-drawer-button .mdl-layout__tab-bar-button,\n  .mdl-layout--no-drawer-button .mdl-layout__tab-bar-button {\n    width: 16px; }\n    .mdl-layout--no-desktop-drawer-button .mdl-layout__tab-bar-button .material-icons,\n    .mdl-layout--no-drawer-button .mdl-layout__tab-bar-button .material-icons {\n      position: relative;\n      left: -4px; }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__tab-bar-button {\n      width: 60px; } }\n  .mdl-layout--fixed-tabs .mdl-layout__tab-bar-button {\n    display: none; }\n  .mdl-layout__tab-bar-button .material-icons {\n    line-height: 48px; }\n  .mdl-layout__tab-bar-button.is-active {\n    color: rgb(255,255,255); }\n\n.mdl-layout__tab-bar-left-button {\n  left: 0; }\n\n.mdl-layout__tab-bar-right-button {\n  right: 0; }\n\n.mdl-layout__tab {\n  margin: 0;\n  border: none;\n  padding: 0 24px 0 24px;\n  float: left;\n  position: relative;\n  display: block;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  text-decoration: none;\n  height: 48px;\n  line-height: 48px;\n  text-align: center;\n  font-weight: 500;\n  font-size: 14px;\n  text-transform: uppercase;\n  color: rgba(255,255,255, 0.6);\n  overflow: hidden; }\n  @media screen and (max-width: 1024px) {\n    .mdl-layout__tab {\n      padding: 0 12px 0 12px; } }\n  .mdl-layout--fixed-tabs .mdl-layout__tab {\n    float: none;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    padding: 0; }\n  .mdl-layout.is-upgraded .mdl-layout__tab.is-active {\n    color: rgb(255,255,255); }\n  .mdl-layout.is-upgraded .mdl-layout__tab.is-active::after {\n    height: 2px;\n    width: 100%;\n    display: block;\n    content: \" \";\n    bottom: 0;\n    left: 0;\n    position: absolute;\n    background: rgb(255,82,82);\n    -webkit-animation: border-expand 0.2s cubic-bezier(0.4, 0, 0.4, 1) 0.01s alternate forwards;\n            animation: border-expand 0.2s cubic-bezier(0.4, 0, 0.4, 1) 0.01s alternate forwards;\n    -webkit-transition: all 1s cubic-bezier(0.4, 0, 1, 1);\n    transition: all 1s cubic-bezier(0.4, 0, 1, 1); }\n  .mdl-layout__tab .mdl-layout__tab-ripple-container {\n    display: block;\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    left: 0;\n    top: 0;\n    z-index: 1;\n    overflow: hidden; }\n    .mdl-layout__tab .mdl-layout__tab-ripple-container .mdl-ripple {\n      background-color: rgb(255,255,255); }\n\n.mdl-layout__tab-panel {\n  display: block; }\n  .mdl-layout.is-upgraded .mdl-layout__tab-panel {\n    display: none; }\n  .mdl-layout.is-upgraded .mdl-layout__tab-panel.is-active {\n    display: block; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-radio {\n  position: relative;\n  font-size: 16px;\n  line-height: 24px;\n  display: inline-block;\n  box-sizing: border-box;\n  margin: 0;\n  padding-left: 0; }\n  .mdl-radio.is-upgraded {\n    padding-left: 24px; }\n\n.mdl-radio__button {\n  line-height: 24px; }\n  .mdl-radio.is-upgraded .mdl-radio__button {\n    position: absolute;\n    width: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    opacity: 0;\n    -ms-appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    appearance: none;\n    border: none; }\n\n.mdl-radio__outer-circle {\n  position: absolute;\n  top: 4px;\n  left: 0;\n  display: inline-block;\n  box-sizing: border-box;\n  width: 16px;\n  height: 16px;\n  margin: 0;\n  cursor: pointer;\n  border: 2px solid rgba(0,0,0, 0.54);\n  border-radius: 50%;\n  z-index: 2; }\n  .mdl-radio.is-checked .mdl-radio__outer-circle {\n    border: 2px solid rgb(96,125,139); }\n  .mdl-radio__outer-circle fieldset[disabled] .mdl-radio,\n  .mdl-radio.is-disabled .mdl-radio__outer-circle {\n    border: 2px solid rgba(0,0,0, 0.26);\n    cursor: auto; }\n\n.mdl-radio__inner-circle {\n  position: absolute;\n  z-index: 1;\n  margin: 0;\n  top: 8px;\n  left: 4px;\n  box-sizing: border-box;\n  width: 8px;\n  height: 8px;\n  cursor: pointer;\n  -webkit-transition-duration: 0.28s;\n          transition-duration: 0.28s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  -webkit-transition-property: -webkit-transform;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  -webkit-transform: scale3d(0, 0, 0);\n          transform: scale3d(0, 0, 0);\n  border-radius: 50%;\n  background: rgb(96,125,139); }\n  .mdl-radio.is-checked .mdl-radio__inner-circle {\n    -webkit-transform: scale3d(1, 1, 1);\n            transform: scale3d(1, 1, 1); }\n  fieldset[disabled] .mdl-radio .mdl-radio__inner-circle,\n  .mdl-radio.is-disabled .mdl-radio__inner-circle {\n    background: rgba(0,0,0, 0.26);\n    cursor: auto; }\n  .mdl-radio.is-focused .mdl-radio__inner-circle {\n    box-shadow: 0 0 0px 10px rgba(0, 0, 0, 0.1); }\n\n.mdl-radio__label {\n  cursor: pointer; }\n  fieldset[disabled] .mdl-radio .mdl-radio__label,\n  .mdl-radio.is-disabled .mdl-radio__label {\n    color: rgba(0,0,0, 0.26);\n    cursor: auto; }\n\n.mdl-radio__ripple-container {\n  position: absolute;\n  z-index: 2;\n  top: -9px;\n  left: -13px;\n  box-sizing: border-box;\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  cursor: pointer;\n  overflow: hidden;\n  -webkit-mask-image: -webkit-radial-gradient(circle, white, black); }\n  .mdl-radio__ripple-container .mdl-ripple {\n    background: rgb(96,125,139); }\n  fieldset[disabled] .mdl-radio .mdl-radio__ripple-container,\n  .mdl-radio.is-disabled .mdl-radio__ripple-container {\n    cursor: auto; }\n  fieldset[disabled] .mdl-radio .mdl-radio__ripple-container .mdl-ripple,\n  .mdl-radio.is-disabled .mdl-radio__ripple-container .mdl-ripple {\n    background: transparent; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n_:-ms-input-placeholder, :root .mdl-slider.mdl-slider.is-upgraded {\n  -ms-appearance: none;\n  height: 32px;\n  margin: 0; }\n\n.mdl-slider {\n  width: calc(100% - 40px);\n  margin: 0 20px; }\n  .mdl-slider.is-upgraded {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    height: 2px;\n    background: transparent;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n        user-select: none;\n    outline: 0;\n    padding: 0;\n    color: rgb(96,125,139);\n    -ms-flex-item-align: center;\n        align-self: center;\n    z-index: 1;\n    cursor: pointer;\n    /**************************** Tracks ****************************/\n    /**************************** Thumbs ****************************/\n    /**************************** 0-value ****************************/\n    /**************************** Disabled ****************************/ }\n    .mdl-slider.is-upgraded::-moz-focus-outer {\n      border: 0; }\n    .mdl-slider.is-upgraded::-ms-tooltip {\n      display: none; }\n    .mdl-slider.is-upgraded::-webkit-slider-runnable-track {\n      background: transparent; }\n    .mdl-slider.is-upgraded::-moz-range-track {\n      background: transparent;\n      border: none; }\n    .mdl-slider.is-upgraded::-ms-track {\n      background: none;\n      color: transparent;\n      height: 2px;\n      width: 100%;\n      border: none; }\n    .mdl-slider.is-upgraded::-ms-fill-lower {\n      padding: 0;\n      background: linear-gradient(to right, transparent, transparent 16px, rgb(96,125,139) 16px, rgb(96,125,139) 0); }\n    .mdl-slider.is-upgraded::-ms-fill-upper {\n      padding: 0;\n      background: linear-gradient(to left, transparent, transparent 16px, rgba(0,0,0, 0.26) 16px, rgba(0,0,0, 0.26) 0); }\n    .mdl-slider.is-upgraded::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      width: 12px;\n      height: 12px;\n      box-sizing: border-box;\n      border-radius: 50%;\n      background: rgb(96,125,139);\n      border: none;\n      -webkit-transition: border 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: border 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), border 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), border 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1); }\n    .mdl-slider.is-upgraded::-moz-range-thumb {\n      -moz-appearance: none;\n      width: 12px;\n      height: 12px;\n      box-sizing: border-box;\n      border-radius: 50%;\n      background-image: none;\n      background: rgb(96,125,139);\n      border: none; }\n    .mdl-slider.is-upgraded:focus:not(:active)::-webkit-slider-thumb {\n      box-shadow: 0 0 0 10px rgba(96,125,139, 0.26); }\n    .mdl-slider.is-upgraded:focus:not(:active)::-moz-range-thumb {\n      box-shadow: 0 0 0 10px rgba(96,125,139, 0.26); }\n    .mdl-slider.is-upgraded:active::-webkit-slider-thumb {\n      background-image: none;\n      background: rgb(96,125,139);\n      -webkit-transform: scale(1.5);\n              transform: scale(1.5); }\n    .mdl-slider.is-upgraded:active::-moz-range-thumb {\n      background-image: none;\n      background: rgb(96,125,139);\n      transform: scale(1.5); }\n    .mdl-slider.is-upgraded::-ms-thumb {\n      width: 32px;\n      height: 32px;\n      border: none;\n      border-radius: 50%;\n      background: rgb(96,125,139);\n      transform: scale(0.375);\n      -webkit-transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1); }\n    .mdl-slider.is-upgraded:focus:not(:active)::-ms-thumb {\n      background: radial-gradient(circle closest-side, rgb(96,125,139) 0%, rgb(96,125,139) 37.5%, rgba(96,125,139, 0.26) 37.5%, rgba(96,125,139, 0.26) 100%);\n      transform: scale(1); }\n    .mdl-slider.is-upgraded:active::-ms-thumb {\n      background: rgb(96,125,139);\n      transform: scale(0.5625); }\n    .mdl-slider.is-upgraded.is-lowest-value::-webkit-slider-thumb {\n      border: 2px solid rgba(0,0,0, 0.26);\n      background: transparent; }\n    .mdl-slider.is-upgraded.is-lowest-value::-moz-range-thumb {\n      border: 2px solid rgba(0,0,0, 0.26);\n      background: transparent; }\n    .mdl-slider.is-upgraded.is-lowest-value +\n.mdl-slider__background-flex > .mdl-slider__background-upper {\n      left: 6px; }\n    .mdl-slider.is-upgraded.is-lowest-value:focus:not(:active)::-webkit-slider-thumb {\n      box-shadow: 0 0 0 10px rgba(0,0,0, 0.12);\n      background: rgba(0,0,0, 0.12); }\n    .mdl-slider.is-upgraded.is-lowest-value:focus:not(:active)::-moz-range-thumb {\n      box-shadow: 0 0 0 10px rgba(0,0,0, 0.12);\n      background: rgba(0,0,0, 0.12); }\n    .mdl-slider.is-upgraded.is-lowest-value:active::-webkit-slider-thumb {\n      border: 1.6px solid rgba(0,0,0, 0.26);\n      -webkit-transform: scale(1.5);\n              transform: scale(1.5); }\n    .mdl-slider.is-upgraded.is-lowest-value:active +\n.mdl-slider__background-flex > .mdl-slider__background-upper {\n      left: 9px; }\n    .mdl-slider.is-upgraded.is-lowest-value:active::-moz-range-thumb {\n      border: 1.5px solid rgba(0,0,0, 0.26);\n      transform: scale(1.5); }\n    .mdl-slider.is-upgraded.is-lowest-value::-ms-thumb {\n      background: radial-gradient(circle closest-side, transparent 0%, transparent 66.67%, rgba(0,0,0, 0.26) 66.67%, rgba(0,0,0, 0.26) 100%); }\n    .mdl-slider.is-upgraded.is-lowest-value:focus:not(:active)::-ms-thumb {\n      background: radial-gradient(circle closest-side, rgba(0,0,0, 0.12) 0%, rgba(0,0,0, 0.12) 25%, rgba(0,0,0, 0.26) 25%, rgba(0,0,0, 0.26) 37.5%, rgba(0,0,0, 0.12) 37.5%, rgba(0,0,0, 0.12) 100%);\n      transform: scale(1); }\n    .mdl-slider.is-upgraded.is-lowest-value:active::-ms-thumb {\n      transform: scale(0.5625);\n      background: radial-gradient(circle closest-side, transparent 0%, transparent 77.78%, rgba(0,0,0, 0.26) 77.78%, rgba(0,0,0, 0.26) 100%); }\n    .mdl-slider.is-upgraded.is-lowest-value::-ms-fill-lower {\n      background: transparent; }\n    .mdl-slider.is-upgraded.is-lowest-value::-ms-fill-upper {\n      margin-left: 6px; }\n    .mdl-slider.is-upgraded.is-lowest-value:active::-ms-fill-upper {\n      margin-left: 9px; }\n    .mdl-slider.is-upgraded:disabled:focus::-webkit-slider-thumb, .mdl-slider.is-upgraded:disabled:active::-webkit-slider-thumb, .mdl-slider.is-upgraded:disabled::-webkit-slider-thumb {\n      -webkit-transform: scale(0.667);\n              transform: scale(0.667);\n      background: rgba(0,0,0, 0.26); }\n    .mdl-slider.is-upgraded:disabled:focus::-moz-range-thumb, .mdl-slider.is-upgraded:disabled:active::-moz-range-thumb, .mdl-slider.is-upgraded:disabled::-moz-range-thumb {\n      transform: scale(0.667);\n      background: rgba(0,0,0, 0.26); }\n    .mdl-slider.is-upgraded:disabled +\n.mdl-slider__background-flex > .mdl-slider__background-lower {\n      background-color: rgba(0,0,0, 0.26);\n      left: -6px; }\n    .mdl-slider.is-upgraded:disabled +\n.mdl-slider__background-flex > .mdl-slider__background-upper {\n      left: 6px; }\n    .mdl-slider.is-upgraded.is-lowest-value:disabled:focus::-webkit-slider-thumb, .mdl-slider.is-upgraded.is-lowest-value:disabled:active::-webkit-slider-thumb, .mdl-slider.is-upgraded.is-lowest-value:disabled::-webkit-slider-thumb {\n      border: 3px solid rgba(0,0,0, 0.26);\n      background: transparent;\n      -webkit-transform: scale(0.667);\n              transform: scale(0.667); }\n    .mdl-slider.is-upgraded.is-lowest-value:disabled:focus::-moz-range-thumb, .mdl-slider.is-upgraded.is-lowest-value:disabled:active::-moz-range-thumb, .mdl-slider.is-upgraded.is-lowest-value:disabled::-moz-range-thumb {\n      border: 3px solid rgba(0,0,0, 0.26);\n      background: transparent;\n      transform: scale(0.667); }\n    .mdl-slider.is-upgraded.is-lowest-value:disabled:active +\n.mdl-slider__background-flex > .mdl-slider__background-upper {\n      left: 6px; }\n    .mdl-slider.is-upgraded:disabled:focus::-ms-thumb, .mdl-slider.is-upgraded:disabled:active::-ms-thumb, .mdl-slider.is-upgraded:disabled::-ms-thumb {\n      transform: scale(0.25);\n      background: rgba(0,0,0, 0.26); }\n    .mdl-slider.is-upgraded.is-lowest-value:disabled:focus::-ms-thumb, .mdl-slider.is-upgraded.is-lowest-value:disabled:active::-ms-thumb, .mdl-slider.is-upgraded.is-lowest-value:disabled::-ms-thumb {\n      transform: scale(0.25);\n      background: radial-gradient(circle closest-side, transparent 0%, transparent 50%, rgba(0,0,0, 0.26) 50%, rgba(0,0,0, 0.26) 100%); }\n    .mdl-slider.is-upgraded:disabled::-ms-fill-lower {\n      margin-right: 6px;\n      background: linear-gradient(to right, transparent, transparent 25px, rgba(0,0,0, 0.26) 25px, rgba(0,0,0, 0.26) 0); }\n    .mdl-slider.is-upgraded:disabled::-ms-fill-upper {\n      margin-left: 6px; }\n    .mdl-slider.is-upgraded.is-lowest-value:disabled:active::-ms-fill-upper {\n      margin-left: 6px; }\n\n.mdl-slider__ie-container {\n  height: 18px;\n  overflow: visible;\n  border: none;\n  margin: none;\n  padding: none; }\n\n.mdl-slider__container {\n  height: 18px;\n  position: relative;\n  background: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row; }\n\n.mdl-slider__background-flex {\n  background: transparent;\n  position: absolute;\n  height: 2px;\n  width: calc(100% - 52px);\n  top: 50%;\n  left: 0;\n  margin: 0 26px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  border: 0;\n  padding: 0;\n  -webkit-transform: translate(0, -1px);\n          transform: translate(0, -1px); }\n\n.mdl-slider__background-lower {\n  background: rgb(96,125,139);\n  -webkit-box-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  position: relative;\n  border: 0;\n  padding: 0; }\n\n.mdl-slider__background-upper {\n  background: rgba(0,0,0, 0.26);\n  -webkit-box-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  position: relative;\n  border: 0;\n  padding: 0;\n  -webkit-transition: left 0.18s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: left 0.18s cubic-bezier(0.4, 0, 0.2, 1); }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-snackbar {\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  cursor: default;\n  background-color: #323232;\n  z-index: 3;\n  display: block;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  will-change: transform;\n  -webkit-transform: translate(0, 80px);\n          transform: translate(0, 80px);\n  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0.4, 0, 1, 1);\n  transition: -webkit-transform 0.25s cubic-bezier(0.4, 0, 1, 1);\n  transition: transform 0.25s cubic-bezier(0.4, 0, 1, 1);\n  transition: transform 0.25s cubic-bezier(0.4, 0, 1, 1), -webkit-transform 0.25s cubic-bezier(0.4, 0, 1, 1);\n  pointer-events: none; }\n  @media (max-width: 479px) {\n    .mdl-snackbar {\n      width: 100%;\n      left: 0;\n      min-height: 48px;\n      max-height: 80px; } }\n  @media (min-width: 480px) {\n    .mdl-snackbar {\n      min-width: 288px;\n      max-width: 568px;\n      border-radius: 2px;\n      -webkit-transform: translate(-50%, 80px);\n              transform: translate(-50%, 80px); } }\n  .mdl-snackbar--active {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n    pointer-events: auto;\n    -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1);\n    transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1);\n    transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1);\n    transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1); }\n    @media (min-width: 480px) {\n      .mdl-snackbar--active {\n        -webkit-transform: translate(-50%, 0);\n                transform: translate(-50%, 0); } }\n  .mdl-snackbar__text {\n    padding: 14px 12px 14px 24px;\n    vertical-align: middle;\n    color: white;\n    float: left; }\n  .mdl-snackbar__action {\n    background: transparent;\n    border: none;\n    color: rgb(255,82,82);\n    float: right;\n    text-transform: uppercase;\n    padding: 14px 24px 14px 12px;\n    font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n    font-size: 14px;\n    font-weight: 500;\n    text-transform: uppercase;\n    line-height: 1;\n    letter-spacing: 0;\n    overflow: hidden;\n    outline: none;\n    opacity: 0;\n    pointer-events: none;\n    cursor: pointer;\n    text-decoration: none;\n    text-align: center;\n    -ms-flex-item-align: center;\n        align-self: center; }\n    .mdl-snackbar__action::-moz-focus-inner {\n      border: 0; }\n    .mdl-snackbar__action:not([aria-hidden]) {\n      opacity: 1;\n      pointer-events: auto; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-spinner {\n  display: inline-block;\n  position: relative;\n  width: 28px;\n  height: 28px; }\n  .mdl-spinner:not(.is-upgraded).is-active:after {\n    content: \"Loading...\"; }\n  .mdl-spinner.is-upgraded.is-active {\n    -webkit-animation: mdl-spinner__container-rotate 1568.23529ms linear infinite;\n            animation: mdl-spinner__container-rotate 1568.23529ms linear infinite; }\n\n@-webkit-keyframes mdl-spinner__container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes mdl-spinner__container-rotate {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.mdl-spinner__layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0; }\n\n.mdl-spinner__layer-1 {\n  border-color: rgb(66,165,245); }\n  .mdl-spinner--single-color .mdl-spinner__layer-1 {\n    border-color: rgb(96,125,139); }\n  .mdl-spinner.is-active .mdl-spinner__layer-1 {\n    -webkit-animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n            animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.mdl-spinner__layer-2 {\n  border-color: rgb(244,67,54); }\n  .mdl-spinner--single-color .mdl-spinner__layer-2 {\n    border-color: rgb(96,125,139); }\n  .mdl-spinner.is-active .mdl-spinner__layer-2 {\n    -webkit-animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n            animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.mdl-spinner__layer-3 {\n  border-color: rgb(253,216,53); }\n  .mdl-spinner--single-color .mdl-spinner__layer-3 {\n    border-color: rgb(96,125,139); }\n  .mdl-spinner.is-active .mdl-spinner__layer-3 {\n    -webkit-animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n            animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.mdl-spinner__layer-4 {\n  border-color: rgb(76,175,80); }\n  .mdl-spinner--single-color .mdl-spinner__layer-4 {\n    border-color: rgb(96,125,139); }\n  .mdl-spinner.is-active .mdl-spinner__layer-4 {\n    -webkit-animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n            animation: mdl-spinner__fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, mdl-spinner__layer-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n@-webkit-keyframes mdl-spinner__fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); }\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg); }\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg); }\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg); }\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg); }\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg); }\n  to {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg); } }\n\n@keyframes mdl-spinner__fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); }\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg); }\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg); }\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg); }\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg); }\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg); }\n  to {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg); } }\n\n/**\n* HACK: Even though the intention is to have the current .mdl-spinner__layer-N\n* at `opacity: 1`, we set it to `opacity: 0.99` instead since this forces Chrome\n* to do proper subpixel rendering for the elements being animated. This is\n* especially visible in Chrome 39 on Ubuntu 14.04. See:\n*\n* - https://github.com/Polymer/paper-spinner/issues/9\n* - https://code.google.com/p/chromium/issues/detail?id=436255\n*/\n@-webkit-keyframes mdl-spinner__layer-1-fade-in-out {\n  from {\n    opacity: 0.99; }\n  25% {\n    opacity: 0.99; }\n  26% {\n    opacity: 0; }\n  89% {\n    opacity: 0; }\n  90% {\n    opacity: 0.99; }\n  100% {\n    opacity: 0.99; } }\n@keyframes mdl-spinner__layer-1-fade-in-out {\n  from {\n    opacity: 0.99; }\n  25% {\n    opacity: 0.99; }\n  26% {\n    opacity: 0; }\n  89% {\n    opacity: 0; }\n  90% {\n    opacity: 0.99; }\n  100% {\n    opacity: 0.99; } }\n\n@-webkit-keyframes mdl-spinner__layer-2-fade-in-out {\n  from {\n    opacity: 0; }\n  15% {\n    opacity: 0; }\n  25% {\n    opacity: 0.99; }\n  50% {\n    opacity: 0.99; }\n  51% {\n    opacity: 0; } }\n\n@keyframes mdl-spinner__layer-2-fade-in-out {\n  from {\n    opacity: 0; }\n  15% {\n    opacity: 0; }\n  25% {\n    opacity: 0.99; }\n  50% {\n    opacity: 0.99; }\n  51% {\n    opacity: 0; } }\n\n@-webkit-keyframes mdl-spinner__layer-3-fade-in-out {\n  from {\n    opacity: 0; }\n  40% {\n    opacity: 0; }\n  50% {\n    opacity: 0.99; }\n  75% {\n    opacity: 0.99; }\n  76% {\n    opacity: 0; } }\n\n@keyframes mdl-spinner__layer-3-fade-in-out {\n  from {\n    opacity: 0; }\n  40% {\n    opacity: 0; }\n  50% {\n    opacity: 0.99; }\n  75% {\n    opacity: 0.99; }\n  76% {\n    opacity: 0; } }\n\n@-webkit-keyframes mdl-spinner__layer-4-fade-in-out {\n  from {\n    opacity: 0; }\n  65% {\n    opacity: 0; }\n  75% {\n    opacity: 0.99; }\n  90% {\n    opacity: 0.99; }\n  100% {\n    opacity: 0; } }\n\n@keyframes mdl-spinner__layer-4-fade-in-out {\n  from {\n    opacity: 0; }\n  65% {\n    opacity: 0; }\n  75% {\n    opacity: 0.99; }\n  90% {\n    opacity: 0.99; }\n  100% {\n    opacity: 0; } }\n\n/**\n* Patch the gap that appear between the two adjacent\n* div.mdl-spinner__circle-clipper while the spinner is rotating\n* (appears on Chrome 38, Safari 7.1, and IE 11).\n*\n* Update: the gap no longer appears on Chrome when .mdl-spinner__layer-N's\n* opacity is 0.99, but still does on Safari and IE.\n*/\n.mdl-spinner__gap-patch {\n  position: absolute;\n  box-sizing: border-box;\n  top: 0;\n  left: 45%;\n  width: 10%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit; }\n  .mdl-spinner__gap-patch .mdl-spinner__circle {\n    width: 1000%;\n    left: -450%; }\n\n.mdl-spinner__circle-clipper {\n  display: inline-block;\n  position: relative;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit; }\n  .mdl-spinner__circle-clipper .mdl-spinner__circle {\n    width: 200%; }\n\n.mdl-spinner__circle {\n  box-sizing: border-box;\n  height: 100%;\n  border-width: 3px;\n  border-style: solid;\n  border-color: inherit;\n  border-bottom-color: transparent !important;\n  border-radius: 50%;\n  -webkit-animation: none;\n          animation: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n  .mdl-spinner__left .mdl-spinner__circle {\n    border-right-color: transparent !important;\n    -webkit-transform: rotate(129deg);\n            transform: rotate(129deg); }\n    .mdl-spinner.is-active .mdl-spinner__left .mdl-spinner__circle {\n      -webkit-animation: mdl-spinner__left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n              animation: mdl-spinner__left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n  .mdl-spinner__right .mdl-spinner__circle {\n    left: -100%;\n    border-left-color: transparent !important;\n    -webkit-transform: rotate(-129deg);\n            transform: rotate(-129deg); }\n    .mdl-spinner.is-active .mdl-spinner__right .mdl-spinner__circle {\n      -webkit-animation: mdl-spinner__right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n              animation: mdl-spinner__right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n@-webkit-keyframes mdl-spinner__left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg); }\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg); }\n  to {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg); } }\n\n@keyframes mdl-spinner__left-spin {\n  from {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg); }\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg); }\n  to {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg); } }\n\n@-webkit-keyframes mdl-spinner__right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg); }\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg); }\n  to {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg); } }\n\n@keyframes mdl-spinner__right-spin {\n  from {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg); }\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg); }\n  to {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg); } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-switch {\n  position: relative;\n  z-index: 1;\n  vertical-align: middle;\n  display: inline-block;\n  box-sizing: border-box;\n  width: 100%;\n  height: 24px;\n  margin: 0;\n  padding: 0;\n  overflow: visible;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n  .mdl-switch.is-upgraded {\n    padding-left: 28px; }\n\n.mdl-switch__input {\n  line-height: 24px; }\n  .mdl-switch.is-upgraded .mdl-switch__input {\n    position: absolute;\n    width: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    opacity: 0;\n    -ms-appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    appearance: none;\n    border: none; }\n\n.mdl-switch__track {\n  background: rgba(0,0,0, 0.26);\n  position: absolute;\n  left: 0;\n  top: 5px;\n  height: 14px;\n  width: 36px;\n  border-radius: 14px;\n  cursor: pointer; }\n  .mdl-switch.is-checked .mdl-switch__track {\n    background: rgba(96,125,139, 0.5); }\n  .mdl-switch__track fieldset[disabled] .mdl-switch,\n  .mdl-switch.is-disabled .mdl-switch__track {\n    background: rgba(0,0,0, 0.12);\n    cursor: auto; }\n\n.mdl-switch__thumb {\n  background: rgb(250,250,250);\n  position: absolute;\n  left: 0;\n  top: 2px;\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  cursor: pointer;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  -webkit-transition-duration: 0.28s;\n          transition-duration: 0.28s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  -webkit-transition-property: left;\n  transition-property: left; }\n  .mdl-switch.is-checked .mdl-switch__thumb {\n    background: rgb(96,125,139);\n    left: 16px;\n    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12); }\n  .mdl-switch__thumb fieldset[disabled] .mdl-switch,\n  .mdl-switch.is-disabled .mdl-switch__thumb {\n    background: rgb(189,189,189);\n    cursor: auto; }\n\n.mdl-switch__focus-helper {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-4px, -4px);\n          transform: translate(-4px, -4px);\n  display: inline-block;\n  box-sizing: border-box;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: transparent; }\n  .mdl-switch.is-focused .mdl-switch__focus-helper {\n    box-shadow: 0 0 0px 20px rgba(0, 0, 0, 0.1);\n    background-color: rgba(0, 0, 0, 0.1); }\n  .mdl-switch.is-focused.is-checked .mdl-switch__focus-helper {\n    box-shadow: 0 0 0px 20px rgba(96,125,139, 0.26);\n    background-color: rgba(96,125,139, 0.26); }\n\n.mdl-switch__label {\n  position: relative;\n  cursor: pointer;\n  font-size: 16px;\n  line-height: 24px;\n  margin: 0;\n  left: 24px; }\n  .mdl-switch__label fieldset[disabled] .mdl-switch,\n  .mdl-switch.is-disabled .mdl-switch__label {\n    color: rgb(189,189,189);\n    cursor: auto; }\n\n.mdl-switch__ripple-container {\n  position: absolute;\n  z-index: 2;\n  top: -12px;\n  left: -14px;\n  box-sizing: border-box;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  cursor: pointer;\n  overflow: hidden;\n  -webkit-mask-image: -webkit-radial-gradient(circle, white, black);\n  -webkit-transition-duration: 0.40s;\n          transition-duration: 0.40s;\n  -webkit-transition-timing-function: step-end;\n          transition-timing-function: step-end;\n  -webkit-transition-property: left;\n  transition-property: left; }\n  .mdl-switch__ripple-container .mdl-ripple {\n    background: rgb(96,125,139); }\n  .mdl-switch__ripple-container fieldset[disabled] .mdl-switch,\n  .mdl-switch.is-disabled .mdl-switch__ripple-container {\n    cursor: auto; }\n  fieldset[disabled] .mdl-switch .mdl-switch__ripple-container .mdl-ripple,\n  .mdl-switch.is-disabled .mdl-switch__ripple-container .mdl-ripple {\n    background: transparent; }\n  .mdl-switch.is-checked .mdl-switch__ripple-container {\n    left: 2px; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-tabs {\n  display: block;\n  width: 100%; }\n\n.mdl-tabs__tab-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -ms-flex-line-pack: justify;\n      align-content: space-between;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  height: 48px;\n  padding: 0 0 0 0;\n  margin: 0;\n  border-bottom: 1px solid rgb(224,224,224); }\n\n.mdl-tabs__tab {\n  margin: 0;\n  border: none;\n  padding: 0 24px 0 24px;\n  float: left;\n  position: relative;\n  display: block;\n  text-decoration: none;\n  height: 48px;\n  line-height: 48px;\n  text-align: center;\n  font-weight: 500;\n  font-size: 14px;\n  text-transform: uppercase;\n  color: rgba(0,0,0, 0.54);\n  overflow: hidden; }\n  .mdl-tabs.is-upgraded .mdl-tabs__tab.is-active {\n    color: rgba(0,0,0, 0.87); }\n  .mdl-tabs.is-upgraded .mdl-tabs__tab.is-active:after {\n    height: 2px;\n    width: 100%;\n    display: block;\n    content: \" \";\n    bottom: 0px;\n    left: 0px;\n    position: absolute;\n    background: rgb(96,125,139);\n    -webkit-animation: border-expand 0.2s cubic-bezier(0.4, 0, 0.4, 1) 0.01s alternate forwards;\n            animation: border-expand 0.2s cubic-bezier(0.4, 0, 0.4, 1) 0.01s alternate forwards;\n    -webkit-transition: all 1s cubic-bezier(0.4, 0, 1, 1);\n    transition: all 1s cubic-bezier(0.4, 0, 1, 1); }\n  .mdl-tabs__tab .mdl-tabs__ripple-container {\n    display: block;\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    left: 0px;\n    top: 0px;\n    z-index: 1;\n    overflow: hidden; }\n    .mdl-tabs__tab .mdl-tabs__ripple-container .mdl-ripple {\n      background: rgb(96,125,139); }\n\n.mdl-tabs__panel {\n  display: block; }\n  .mdl-tabs.is-upgraded .mdl-tabs__panel {\n    display: none; }\n  .mdl-tabs.is-upgraded .mdl-tabs__panel.is-active {\n    display: block; }\n\n@-webkit-keyframes border-expand {\n  0% {\n    opacity: 0;\n    width: 0; }\n  100% {\n    opacity: 1;\n    width: 100%; } }\n\n@keyframes border-expand {\n  0% {\n    opacity: 0;\n    width: 0; }\n  100% {\n    opacity: 1;\n    width: 100%; } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-textfield {\n  position: relative;\n  font-size: 16px;\n  display: inline-block;\n  box-sizing: border-box;\n  width: 300px;\n  max-width: 100%;\n  margin: 0;\n  padding: 20px 0; }\n  .mdl-textfield .mdl-button {\n    position: absolute;\n    bottom: 20px; }\n\n.mdl-textfield--align-right {\n  text-align: right; }\n\n.mdl-textfield--full-width {\n  width: 100%; }\n\n.mdl-textfield--expandable {\n  min-width: 32px;\n  width: auto;\n  min-height: 32px; }\n  .mdl-textfield--expandable .mdl-button--icon {\n    top: 16px; }\n\n.mdl-textfield__input {\n  border: none;\n  border-bottom: 1px solid rgba(0,0,0, 0.12);\n  display: block;\n  font-size: 16px;\n  font-family: \"Helvetica\", \"Arial\", sans-serif;\n  margin: 0;\n  padding: 4px 0;\n  width: 100%;\n  background: none;\n  text-align: left;\n  color: inherit; }\n  .mdl-textfield__input[type=\"number\"] {\n    -moz-appearance: textfield; }\n  .mdl-textfield__input[type=\"number\"]::-webkit-inner-spin-button, .mdl-textfield__input[type=\"number\"]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0; }\n  .mdl-textfield.is-focused .mdl-textfield__input {\n    outline: none; }\n  .mdl-textfield.is-invalid .mdl-textfield__input {\n    border-color: rgb(213,0,0);\n    box-shadow: none; }\n  fieldset[disabled] .mdl-textfield .mdl-textfield__input,\n  .mdl-textfield.is-disabled .mdl-textfield__input {\n    background-color: transparent;\n    border-bottom: 1px dotted rgba(0,0,0, 0.12);\n    color: rgba(0,0,0, 0.26); }\n\n.mdl-textfield textarea.mdl-textfield__input {\n  display: block; }\n\n.mdl-textfield__label {\n  bottom: 0;\n  color: rgba(0,0,0, 0.26);\n  font-size: 16px;\n  left: 0;\n  right: 0;\n  pointer-events: none;\n  position: absolute;\n  display: block;\n  top: 24px;\n  width: 100%;\n  overflow: hidden;\n  white-space: nowrap;\n  text-align: left; }\n  .mdl-textfield.is-dirty .mdl-textfield__label,\n  .mdl-textfield.has-placeholder .mdl-textfield__label {\n    visibility: hidden; }\n  .mdl-textfield--floating-label .mdl-textfield__label {\n    -webkit-transition-duration: 0.2s;\n            transition-duration: 0.2s;\n    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdl-textfield--floating-label.has-placeholder .mdl-textfield__label {\n    -webkit-transition: none;\n    transition: none; }\n  fieldset[disabled] .mdl-textfield .mdl-textfield__label,\n  .mdl-textfield.is-disabled.is-disabled .mdl-textfield__label {\n    color: rgba(0,0,0, 0.26); }\n  .mdl-textfield--floating-label.is-focused .mdl-textfield__label,\n  .mdl-textfield--floating-label.is-dirty .mdl-textfield__label,\n  .mdl-textfield--floating-label.has-placeholder .mdl-textfield__label {\n    color: rgb(96,125,139);\n    font-size: 12px;\n    top: 4px;\n    visibility: visible; }\n  .mdl-textfield--floating-label.is-focused .mdl-textfield__expandable-holder .mdl-textfield__label,\n  .mdl-textfield--floating-label.is-dirty .mdl-textfield__expandable-holder .mdl-textfield__label,\n  .mdl-textfield--floating-label.has-placeholder .mdl-textfield__expandable-holder .mdl-textfield__label {\n    top: -16px; }\n  .mdl-textfield--floating-label.is-invalid .mdl-textfield__label {\n    color: rgb(213,0,0);\n    font-size: 12px; }\n  .mdl-textfield__label:after {\n    background-color: rgb(96,125,139);\n    bottom: 20px;\n    content: '';\n    height: 2px;\n    left: 45%;\n    position: absolute;\n    -webkit-transition-duration: 0.2s;\n            transition-duration: 0.2s;\n    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    visibility: hidden;\n    width: 10px; }\n  .mdl-textfield.is-focused .mdl-textfield__label:after {\n    left: 0;\n    visibility: visible;\n    width: 100%; }\n  .mdl-textfield.is-invalid .mdl-textfield__label:after {\n    background-color: rgb(213,0,0); }\n\n.mdl-textfield__error {\n  color: rgb(213,0,0);\n  position: absolute;\n  font-size: 12px;\n  margin-top: 3px;\n  visibility: hidden;\n  display: block; }\n  .mdl-textfield.is-invalid .mdl-textfield__error {\n    visibility: visible; }\n\n.mdl-textfield__expandable-holder {\n  display: inline-block;\n  position: relative;\n  margin-left: 32px;\n  -webkit-transition-duration: 0.2s;\n          transition-duration: 0.2s;\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  display: inline-block;\n  max-width: 0.1px; }\n  .mdl-textfield.is-focused .mdl-textfield__expandable-holder, .mdl-textfield.is-dirty .mdl-textfield__expandable-holder {\n    max-width: 600px; }\n  .mdl-textfield__expandable-holder .mdl-textfield__label:after {\n    bottom: 0; }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-tooltip {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transform-origin: top center;\n          transform-origin: top center;\n  z-index: 999;\n  background: rgba(97,97,97, 0.9);\n  border-radius: 2px;\n  color: rgb(255,255,255);\n  display: inline-block;\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 14px;\n  max-width: 170px;\n  position: fixed;\n  top: -500px;\n  left: -500px;\n  padding: 8px;\n  text-align: center; }\n\n.mdl-tooltip.is-active {\n  -webkit-animation: pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards;\n          animation: pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards; }\n\n.mdl-tooltip--large {\n  line-height: 14px;\n  font-size: 14px;\n  padding: 16px; }\n\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  50% {\n    -webkit-transform: scale(0.99);\n            transform: scale(0.99); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n    visibility: visible; } }\n\n@keyframes pulse {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0; }\n  50% {\n    -webkit-transform: scale(0.99);\n            transform: scale(0.99); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1;\n    visibility: visible; } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* Typography */\n/* Shadows */\n/* Animations */\n/* Dialog */\n.mdl-shadow--2dp {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }\n\n.mdl-shadow--3dp {\n  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12); }\n\n.mdl-shadow--4dp {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--6dp {\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--8dp {\n  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--16dp {\n  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); }\n\n.mdl-shadow--24dp {\n  box-shadow: 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px 3px rgba(0, 0, 0, 0.2); }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*\n* NOTE: Some rules here are applied using duplicate selectors.\n* This is on purpose to increase their specificity when applied.\n* For example: `.mdl-cell--1-col-phone.mdl-cell--1-col-phone`\n*/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.mdl-grid {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n      flex-flow: row wrap;\n  margin: 0 auto 0 auto;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  .mdl-grid.mdl-grid--no-spacing {\n    padding: 0; }\n\n.mdl-cell {\n  box-sizing: border-box; }\n\n.mdl-cell--top {\n  -ms-flex-item-align: start;\n      align-self: flex-start; }\n\n.mdl-cell--middle {\n  -ms-flex-item-align: center;\n      align-self: center; }\n\n.mdl-cell--bottom {\n  -ms-flex-item-align: end;\n      align-self: flex-end; }\n\n.mdl-cell--stretch {\n  -ms-flex-item-align: stretch;\n      align-self: stretch; }\n\n.mdl-grid.mdl-grid--no-spacing > .mdl-cell {\n  margin: 0; }\n\n.mdl-cell--order-1 {\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1; }\n\n.mdl-cell--order-2 {\n  -webkit-box-ordinal-group: 3;\n      -ms-flex-order: 2;\n          order: 2; }\n\n.mdl-cell--order-3 {\n  -webkit-box-ordinal-group: 4;\n      -ms-flex-order: 3;\n          order: 3; }\n\n.mdl-cell--order-4 {\n  -webkit-box-ordinal-group: 5;\n      -ms-flex-order: 4;\n          order: 4; }\n\n.mdl-cell--order-5 {\n  -webkit-box-ordinal-group: 6;\n      -ms-flex-order: 5;\n          order: 5; }\n\n.mdl-cell--order-6 {\n  -webkit-box-ordinal-group: 7;\n      -ms-flex-order: 6;\n          order: 6; }\n\n.mdl-cell--order-7 {\n  -webkit-box-ordinal-group: 8;\n      -ms-flex-order: 7;\n          order: 7; }\n\n.mdl-cell--order-8 {\n  -webkit-box-ordinal-group: 9;\n      -ms-flex-order: 8;\n          order: 8; }\n\n.mdl-cell--order-9 {\n  -webkit-box-ordinal-group: 10;\n      -ms-flex-order: 9;\n          order: 9; }\n\n.mdl-cell--order-10 {\n  -webkit-box-ordinal-group: 11;\n      -ms-flex-order: 10;\n          order: 10; }\n\n.mdl-cell--order-11 {\n  -webkit-box-ordinal-group: 12;\n      -ms-flex-order: 11;\n          order: 11; }\n\n.mdl-cell--order-12 {\n  -webkit-box-ordinal-group: 13;\n      -ms-flex-order: 12;\n          order: 12; }\n\n@media (max-width: 479px) {\n  .mdl-grid {\n    padding: 8px; }\n  .mdl-cell {\n    margin: 8px;\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell {\n      width: 100%; }\n  .mdl-cell--hide-phone {\n    display: none !important; }\n  .mdl-cell--order-1-phone.mdl-cell--order-1-phone {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .mdl-cell--order-2-phone.mdl-cell--order-2-phone {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2; }\n  .mdl-cell--order-3-phone.mdl-cell--order-3-phone {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3; }\n  .mdl-cell--order-4-phone.mdl-cell--order-4-phone {\n    -webkit-box-ordinal-group: 5;\n        -ms-flex-order: 4;\n            order: 4; }\n  .mdl-cell--order-5-phone.mdl-cell--order-5-phone {\n    -webkit-box-ordinal-group: 6;\n        -ms-flex-order: 5;\n            order: 5; }\n  .mdl-cell--order-6-phone.mdl-cell--order-6-phone {\n    -webkit-box-ordinal-group: 7;\n        -ms-flex-order: 6;\n            order: 6; }\n  .mdl-cell--order-7-phone.mdl-cell--order-7-phone {\n    -webkit-box-ordinal-group: 8;\n        -ms-flex-order: 7;\n            order: 7; }\n  .mdl-cell--order-8-phone.mdl-cell--order-8-phone {\n    -webkit-box-ordinal-group: 9;\n        -ms-flex-order: 8;\n            order: 8; }\n  .mdl-cell--order-9-phone.mdl-cell--order-9-phone {\n    -webkit-box-ordinal-group: 10;\n        -ms-flex-order: 9;\n            order: 9; }\n  .mdl-cell--order-10-phone.mdl-cell--order-10-phone {\n    -webkit-box-ordinal-group: 11;\n        -ms-flex-order: 10;\n            order: 10; }\n  .mdl-cell--order-11-phone.mdl-cell--order-11-phone {\n    -webkit-box-ordinal-group: 12;\n        -ms-flex-order: 11;\n            order: 11; }\n  .mdl-cell--order-12-phone.mdl-cell--order-12-phone {\n    -webkit-box-ordinal-group: 13;\n        -ms-flex-order: 12;\n            order: 12; }\n  .mdl-cell--1-col,\n  .mdl-cell--1-col-phone.mdl-cell--1-col-phone {\n    width: calc(25% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--1-col, .mdl-grid--no-spacing >\n    .mdl-cell--1-col-phone.mdl-cell--1-col-phone {\n      width: 25%; }\n  .mdl-cell--2-col,\n  .mdl-cell--2-col-phone.mdl-cell--2-col-phone {\n    width: calc(50% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--2-col, .mdl-grid--no-spacing >\n    .mdl-cell--2-col-phone.mdl-cell--2-col-phone {\n      width: 50%; }\n  .mdl-cell--3-col,\n  .mdl-cell--3-col-phone.mdl-cell--3-col-phone {\n    width: calc(75% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--3-col, .mdl-grid--no-spacing >\n    .mdl-cell--3-col-phone.mdl-cell--3-col-phone {\n      width: 75%; }\n  .mdl-cell--4-col,\n  .mdl-cell--4-col-phone.mdl-cell--4-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--4-col, .mdl-grid--no-spacing >\n    .mdl-cell--4-col-phone.mdl-cell--4-col-phone {\n      width: 100%; }\n  .mdl-cell--5-col,\n  .mdl-cell--5-col-phone.mdl-cell--5-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--5-col, .mdl-grid--no-spacing >\n    .mdl-cell--5-col-phone.mdl-cell--5-col-phone {\n      width: 100%; }\n  .mdl-cell--6-col,\n  .mdl-cell--6-col-phone.mdl-cell--6-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--6-col, .mdl-grid--no-spacing >\n    .mdl-cell--6-col-phone.mdl-cell--6-col-phone {\n      width: 100%; }\n  .mdl-cell--7-col,\n  .mdl-cell--7-col-phone.mdl-cell--7-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--7-col, .mdl-grid--no-spacing >\n    .mdl-cell--7-col-phone.mdl-cell--7-col-phone {\n      width: 100%; }\n  .mdl-cell--8-col,\n  .mdl-cell--8-col-phone.mdl-cell--8-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--8-col, .mdl-grid--no-spacing >\n    .mdl-cell--8-col-phone.mdl-cell--8-col-phone {\n      width: 100%; }\n  .mdl-cell--9-col,\n  .mdl-cell--9-col-phone.mdl-cell--9-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--9-col, .mdl-grid--no-spacing >\n    .mdl-cell--9-col-phone.mdl-cell--9-col-phone {\n      width: 100%; }\n  .mdl-cell--10-col,\n  .mdl-cell--10-col-phone.mdl-cell--10-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--10-col, .mdl-grid--no-spacing >\n    .mdl-cell--10-col-phone.mdl-cell--10-col-phone {\n      width: 100%; }\n  .mdl-cell--11-col,\n  .mdl-cell--11-col-phone.mdl-cell--11-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--11-col, .mdl-grid--no-spacing >\n    .mdl-cell--11-col-phone.mdl-cell--11-col-phone {\n      width: 100%; }\n  .mdl-cell--12-col,\n  .mdl-cell--12-col-phone.mdl-cell--12-col-phone {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--12-col, .mdl-grid--no-spacing >\n    .mdl-cell--12-col-phone.mdl-cell--12-col-phone {\n      width: 100%; }\n  .mdl-cell--1-offset,\n  .mdl-cell--1-offset-phone.mdl-cell--1-offset-phone {\n    margin-left: calc(25% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--1-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--1-offset-phone.mdl-cell--1-offset-phone {\n      margin-left: 25%; }\n  .mdl-cell--2-offset,\n  .mdl-cell--2-offset-phone.mdl-cell--2-offset-phone {\n    margin-left: calc(50% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--2-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--2-offset-phone.mdl-cell--2-offset-phone {\n      margin-left: 50%; }\n  .mdl-cell--3-offset,\n  .mdl-cell--3-offset-phone.mdl-cell--3-offset-phone {\n    margin-left: calc(75% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--3-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--3-offset-phone.mdl-cell--3-offset-phone {\n      margin-left: 75%; } }\n\n@media (min-width: 480px) and (max-width: 839px) {\n  .mdl-grid {\n    padding: 8px; }\n  .mdl-cell {\n    margin: 8px;\n    width: calc(50% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell {\n      width: 50%; }\n  .mdl-cell--hide-tablet {\n    display: none !important; }\n  .mdl-cell--order-1-tablet.mdl-cell--order-1-tablet {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .mdl-cell--order-2-tablet.mdl-cell--order-2-tablet {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2; }\n  .mdl-cell--order-3-tablet.mdl-cell--order-3-tablet {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3; }\n  .mdl-cell--order-4-tablet.mdl-cell--order-4-tablet {\n    -webkit-box-ordinal-group: 5;\n        -ms-flex-order: 4;\n            order: 4; }\n  .mdl-cell--order-5-tablet.mdl-cell--order-5-tablet {\n    -webkit-box-ordinal-group: 6;\n        -ms-flex-order: 5;\n            order: 5; }\n  .mdl-cell--order-6-tablet.mdl-cell--order-6-tablet {\n    -webkit-box-ordinal-group: 7;\n        -ms-flex-order: 6;\n            order: 6; }\n  .mdl-cell--order-7-tablet.mdl-cell--order-7-tablet {\n    -webkit-box-ordinal-group: 8;\n        -ms-flex-order: 7;\n            order: 7; }\n  .mdl-cell--order-8-tablet.mdl-cell--order-8-tablet {\n    -webkit-box-ordinal-group: 9;\n        -ms-flex-order: 8;\n            order: 8; }\n  .mdl-cell--order-9-tablet.mdl-cell--order-9-tablet {\n    -webkit-box-ordinal-group: 10;\n        -ms-flex-order: 9;\n            order: 9; }\n  .mdl-cell--order-10-tablet.mdl-cell--order-10-tablet {\n    -webkit-box-ordinal-group: 11;\n        -ms-flex-order: 10;\n            order: 10; }\n  .mdl-cell--order-11-tablet.mdl-cell--order-11-tablet {\n    -webkit-box-ordinal-group: 12;\n        -ms-flex-order: 11;\n            order: 11; }\n  .mdl-cell--order-12-tablet.mdl-cell--order-12-tablet {\n    -webkit-box-ordinal-group: 13;\n        -ms-flex-order: 12;\n            order: 12; }\n  .mdl-cell--1-col,\n  .mdl-cell--1-col-tablet.mdl-cell--1-col-tablet {\n    width: calc(12.5% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--1-col, .mdl-grid--no-spacing >\n    .mdl-cell--1-col-tablet.mdl-cell--1-col-tablet {\n      width: 12.5%; }\n  .mdl-cell--2-col,\n  .mdl-cell--2-col-tablet.mdl-cell--2-col-tablet {\n    width: calc(25% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--2-col, .mdl-grid--no-spacing >\n    .mdl-cell--2-col-tablet.mdl-cell--2-col-tablet {\n      width: 25%; }\n  .mdl-cell--3-col,\n  .mdl-cell--3-col-tablet.mdl-cell--3-col-tablet {\n    width: calc(37.5% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--3-col, .mdl-grid--no-spacing >\n    .mdl-cell--3-col-tablet.mdl-cell--3-col-tablet {\n      width: 37.5%; }\n  .mdl-cell--4-col,\n  .mdl-cell--4-col-tablet.mdl-cell--4-col-tablet {\n    width: calc(50% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--4-col, .mdl-grid--no-spacing >\n    .mdl-cell--4-col-tablet.mdl-cell--4-col-tablet {\n      width: 50%; }\n  .mdl-cell--5-col,\n  .mdl-cell--5-col-tablet.mdl-cell--5-col-tablet {\n    width: calc(62.5% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--5-col, .mdl-grid--no-spacing >\n    .mdl-cell--5-col-tablet.mdl-cell--5-col-tablet {\n      width: 62.5%; }\n  .mdl-cell--6-col,\n  .mdl-cell--6-col-tablet.mdl-cell--6-col-tablet {\n    width: calc(75% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--6-col, .mdl-grid--no-spacing >\n    .mdl-cell--6-col-tablet.mdl-cell--6-col-tablet {\n      width: 75%; }\n  .mdl-cell--7-col,\n  .mdl-cell--7-col-tablet.mdl-cell--7-col-tablet {\n    width: calc(87.5% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--7-col, .mdl-grid--no-spacing >\n    .mdl-cell--7-col-tablet.mdl-cell--7-col-tablet {\n      width: 87.5%; }\n  .mdl-cell--8-col,\n  .mdl-cell--8-col-tablet.mdl-cell--8-col-tablet {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--8-col, .mdl-grid--no-spacing >\n    .mdl-cell--8-col-tablet.mdl-cell--8-col-tablet {\n      width: 100%; }\n  .mdl-cell--9-col,\n  .mdl-cell--9-col-tablet.mdl-cell--9-col-tablet {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--9-col, .mdl-grid--no-spacing >\n    .mdl-cell--9-col-tablet.mdl-cell--9-col-tablet {\n      width: 100%; }\n  .mdl-cell--10-col,\n  .mdl-cell--10-col-tablet.mdl-cell--10-col-tablet {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--10-col, .mdl-grid--no-spacing >\n    .mdl-cell--10-col-tablet.mdl-cell--10-col-tablet {\n      width: 100%; }\n  .mdl-cell--11-col,\n  .mdl-cell--11-col-tablet.mdl-cell--11-col-tablet {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--11-col, .mdl-grid--no-spacing >\n    .mdl-cell--11-col-tablet.mdl-cell--11-col-tablet {\n      width: 100%; }\n  .mdl-cell--12-col,\n  .mdl-cell--12-col-tablet.mdl-cell--12-col-tablet {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--12-col, .mdl-grid--no-spacing >\n    .mdl-cell--12-col-tablet.mdl-cell--12-col-tablet {\n      width: 100%; }\n  .mdl-cell--1-offset,\n  .mdl-cell--1-offset-tablet.mdl-cell--1-offset-tablet {\n    margin-left: calc(12.5% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--1-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--1-offset-tablet.mdl-cell--1-offset-tablet {\n      margin-left: 12.5%; }\n  .mdl-cell--2-offset,\n  .mdl-cell--2-offset-tablet.mdl-cell--2-offset-tablet {\n    margin-left: calc(25% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--2-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--2-offset-tablet.mdl-cell--2-offset-tablet {\n      margin-left: 25%; }\n  .mdl-cell--3-offset,\n  .mdl-cell--3-offset-tablet.mdl-cell--3-offset-tablet {\n    margin-left: calc(37.5% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--3-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--3-offset-tablet.mdl-cell--3-offset-tablet {\n      margin-left: 37.5%; }\n  .mdl-cell--4-offset,\n  .mdl-cell--4-offset-tablet.mdl-cell--4-offset-tablet {\n    margin-left: calc(50% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--4-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--4-offset-tablet.mdl-cell--4-offset-tablet {\n      margin-left: 50%; }\n  .mdl-cell--5-offset,\n  .mdl-cell--5-offset-tablet.mdl-cell--5-offset-tablet {\n    margin-left: calc(62.5% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--5-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--5-offset-tablet.mdl-cell--5-offset-tablet {\n      margin-left: 62.5%; }\n  .mdl-cell--6-offset,\n  .mdl-cell--6-offset-tablet.mdl-cell--6-offset-tablet {\n    margin-left: calc(75% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--6-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--6-offset-tablet.mdl-cell--6-offset-tablet {\n      margin-left: 75%; }\n  .mdl-cell--7-offset,\n  .mdl-cell--7-offset-tablet.mdl-cell--7-offset-tablet {\n    margin-left: calc(87.5% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--7-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--7-offset-tablet.mdl-cell--7-offset-tablet {\n      margin-left: 87.5%; } }\n\n@media (min-width: 840px) {\n  .mdl-grid {\n    padding: 8px; }\n  .mdl-cell {\n    margin: 8px;\n    width: calc(33.33333% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell {\n      width: 33.33333%; }\n  .mdl-cell--hide-desktop {\n    display: none !important; }\n  .mdl-cell--order-1-desktop.mdl-cell--order-1-desktop {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1; }\n  .mdl-cell--order-2-desktop.mdl-cell--order-2-desktop {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2; }\n  .mdl-cell--order-3-desktop.mdl-cell--order-3-desktop {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3; }\n  .mdl-cell--order-4-desktop.mdl-cell--order-4-desktop {\n    -webkit-box-ordinal-group: 5;\n        -ms-flex-order: 4;\n            order: 4; }\n  .mdl-cell--order-5-desktop.mdl-cell--order-5-desktop {\n    -webkit-box-ordinal-group: 6;\n        -ms-flex-order: 5;\n            order: 5; }\n  .mdl-cell--order-6-desktop.mdl-cell--order-6-desktop {\n    -webkit-box-ordinal-group: 7;\n        -ms-flex-order: 6;\n            order: 6; }\n  .mdl-cell--order-7-desktop.mdl-cell--order-7-desktop {\n    -webkit-box-ordinal-group: 8;\n        -ms-flex-order: 7;\n            order: 7; }\n  .mdl-cell--order-8-desktop.mdl-cell--order-8-desktop {\n    -webkit-box-ordinal-group: 9;\n        -ms-flex-order: 8;\n            order: 8; }\n  .mdl-cell--order-9-desktop.mdl-cell--order-9-desktop {\n    -webkit-box-ordinal-group: 10;\n        -ms-flex-order: 9;\n            order: 9; }\n  .mdl-cell--order-10-desktop.mdl-cell--order-10-desktop {\n    -webkit-box-ordinal-group: 11;\n        -ms-flex-order: 10;\n            order: 10; }\n  .mdl-cell--order-11-desktop.mdl-cell--order-11-desktop {\n    -webkit-box-ordinal-group: 12;\n        -ms-flex-order: 11;\n            order: 11; }\n  .mdl-cell--order-12-desktop.mdl-cell--order-12-desktop {\n    -webkit-box-ordinal-group: 13;\n        -ms-flex-order: 12;\n            order: 12; }\n  .mdl-cell--1-col,\n  .mdl-cell--1-col-desktop.mdl-cell--1-col-desktop {\n    width: calc(8.33333% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--1-col, .mdl-grid--no-spacing >\n    .mdl-cell--1-col-desktop.mdl-cell--1-col-desktop {\n      width: 8.33333%; }\n  .mdl-cell--2-col,\n  .mdl-cell--2-col-desktop.mdl-cell--2-col-desktop {\n    width: calc(16.66667% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--2-col, .mdl-grid--no-spacing >\n    .mdl-cell--2-col-desktop.mdl-cell--2-col-desktop {\n      width: 16.66667%; }\n  .mdl-cell--3-col,\n  .mdl-cell--3-col-desktop.mdl-cell--3-col-desktop {\n    width: calc(25% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--3-col, .mdl-grid--no-spacing >\n    .mdl-cell--3-col-desktop.mdl-cell--3-col-desktop {\n      width: 25%; }\n  .mdl-cell--4-col,\n  .mdl-cell--4-col-desktop.mdl-cell--4-col-desktop {\n    width: calc(33.33333% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--4-col, .mdl-grid--no-spacing >\n    .mdl-cell--4-col-desktop.mdl-cell--4-col-desktop {\n      width: 33.33333%; }\n  .mdl-cell--5-col,\n  .mdl-cell--5-col-desktop.mdl-cell--5-col-desktop {\n    width: calc(41.66667% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--5-col, .mdl-grid--no-spacing >\n    .mdl-cell--5-col-desktop.mdl-cell--5-col-desktop {\n      width: 41.66667%; }\n  .mdl-cell--6-col,\n  .mdl-cell--6-col-desktop.mdl-cell--6-col-desktop {\n    width: calc(50% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--6-col, .mdl-grid--no-spacing >\n    .mdl-cell--6-col-desktop.mdl-cell--6-col-desktop {\n      width: 50%; }\n  .mdl-cell--7-col,\n  .mdl-cell--7-col-desktop.mdl-cell--7-col-desktop {\n    width: calc(58.33333% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--7-col, .mdl-grid--no-spacing >\n    .mdl-cell--7-col-desktop.mdl-cell--7-col-desktop {\n      width: 58.33333%; }\n  .mdl-cell--8-col,\n  .mdl-cell--8-col-desktop.mdl-cell--8-col-desktop {\n    width: calc(66.66667% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--8-col, .mdl-grid--no-spacing >\n    .mdl-cell--8-col-desktop.mdl-cell--8-col-desktop {\n      width: 66.66667%; }\n  .mdl-cell--9-col,\n  .mdl-cell--9-col-desktop.mdl-cell--9-col-desktop {\n    width: calc(75% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--9-col, .mdl-grid--no-spacing >\n    .mdl-cell--9-col-desktop.mdl-cell--9-col-desktop {\n      width: 75%; }\n  .mdl-cell--10-col,\n  .mdl-cell--10-col-desktop.mdl-cell--10-col-desktop {\n    width: calc(83.33333% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--10-col, .mdl-grid--no-spacing >\n    .mdl-cell--10-col-desktop.mdl-cell--10-col-desktop {\n      width: 83.33333%; }\n  .mdl-cell--11-col,\n  .mdl-cell--11-col-desktop.mdl-cell--11-col-desktop {\n    width: calc(91.66667% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--11-col, .mdl-grid--no-spacing >\n    .mdl-cell--11-col-desktop.mdl-cell--11-col-desktop {\n      width: 91.66667%; }\n  .mdl-cell--12-col,\n  .mdl-cell--12-col-desktop.mdl-cell--12-col-desktop {\n    width: calc(100% - 16px); }\n    .mdl-grid--no-spacing > .mdl-cell--12-col, .mdl-grid--no-spacing >\n    .mdl-cell--12-col-desktop.mdl-cell--12-col-desktop {\n      width: 100%; }\n  .mdl-cell--1-offset,\n  .mdl-cell--1-offset-desktop.mdl-cell--1-offset-desktop {\n    margin-left: calc(8.33333% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--1-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--1-offset-desktop.mdl-cell--1-offset-desktop {\n      margin-left: 8.33333%; }\n  .mdl-cell--2-offset,\n  .mdl-cell--2-offset-desktop.mdl-cell--2-offset-desktop {\n    margin-left: calc(16.66667% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--2-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--2-offset-desktop.mdl-cell--2-offset-desktop {\n      margin-left: 16.66667%; }\n  .mdl-cell--3-offset,\n  .mdl-cell--3-offset-desktop.mdl-cell--3-offset-desktop {\n    margin-left: calc(25% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--3-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--3-offset-desktop.mdl-cell--3-offset-desktop {\n      margin-left: 25%; }\n  .mdl-cell--4-offset,\n  .mdl-cell--4-offset-desktop.mdl-cell--4-offset-desktop {\n    margin-left: calc(33.33333% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--4-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--4-offset-desktop.mdl-cell--4-offset-desktop {\n      margin-left: 33.33333%; }\n  .mdl-cell--5-offset,\n  .mdl-cell--5-offset-desktop.mdl-cell--5-offset-desktop {\n    margin-left: calc(41.66667% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--5-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--5-offset-desktop.mdl-cell--5-offset-desktop {\n      margin-left: 41.66667%; }\n  .mdl-cell--6-offset,\n  .mdl-cell--6-offset-desktop.mdl-cell--6-offset-desktop {\n    margin-left: calc(50% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--6-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--6-offset-desktop.mdl-cell--6-offset-desktop {\n      margin-left: 50%; }\n  .mdl-cell--7-offset,\n  .mdl-cell--7-offset-desktop.mdl-cell--7-offset-desktop {\n    margin-left: calc(58.33333% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--7-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--7-offset-desktop.mdl-cell--7-offset-desktop {\n      margin-left: 58.33333%; }\n  .mdl-cell--8-offset,\n  .mdl-cell--8-offset-desktop.mdl-cell--8-offset-desktop {\n    margin-left: calc(66.66667% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--8-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--8-offset-desktop.mdl-cell--8-offset-desktop {\n      margin-left: 66.66667%; }\n  .mdl-cell--9-offset,\n  .mdl-cell--9-offset-desktop.mdl-cell--9-offset-desktop {\n    margin-left: calc(75% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--9-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--9-offset-desktop.mdl-cell--9-offset-desktop {\n      margin-left: 75%; }\n  .mdl-cell--10-offset,\n  .mdl-cell--10-offset-desktop.mdl-cell--10-offset-desktop {\n    margin-left: calc(83.33333% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--10-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--10-offset-desktop.mdl-cell--10-offset-desktop {\n      margin-left: 83.33333%; }\n  .mdl-cell--11-offset,\n  .mdl-cell--11-offset-desktop.mdl-cell--11-offset-desktop {\n    margin-left: calc(91.66667% + 8px); }\n    .mdl-grid.mdl-grid--no-spacing > .mdl-cell--11-offset, .mdl-grid.mdl-grid--no-spacing >\n    .mdl-cell--11-offset-desktop.mdl-cell--11-offset-desktop {\n      margin-left: 91.66667%; } }\n\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/*------------------------------------*    $CONTENTS\n\\*------------------------------------*/\n/**\n * STYLE GUIDE VARIABLES------------------Declarations of Sass variables\n * -----Typography\n * -----Colors\n * -----Textfield\n * -----Switch\n * -----Spinner\n * -----Radio\n * -----Menu\n * -----List\n * -----Layout\n * -----Icon toggles\n * -----Footer\n * -----Column\n * -----Checkbox\n * -----Card\n * -----Button\n * -----Animation\n * -----Progress\n * -----Badge\n * -----Shadows\n * -----Grid\n * -----Data table\n * -----Dialog\n * -----Snackbar\n * -----Tooltip\n * -----Chip\n *\n * Even though all variables have the `!default` directive, most of them\n * should not be changed as they are dependent one another. This can cause\n * visual distortions (like alignment issues) that are hard to track down\n * and fix.\n */\n/* ==========  TYPOGRAPHY  ========== */\n/* We're splitting fonts into \"preferred\" and \"performance\" in order to optimize\n   page loading. For important text, such as the body, we want it to load\n   immediately and not wait for the web font load, whereas for other sections,\n   such as headers and titles, we're OK with things taking a bit longer to load.\n   We do have some optional classes and parameters in the mixins, in case you\n   definitely want to make sure you're using the preferred font and don't mind\n   the performance hit.\n   We should be able to improve on this once CSS Font Loading L3 becomes more\n   widely available.\n*/\n/* ==========  COLORS  ========== */\n/**\n*\n* Material design color palettes.\n* @see http://www.google.com/design/spec/style/color.html\n*\n**/\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  Color Palettes  ========== */\n/* colors.scss */\n/**\n * Copyright 2015 Google Inc. All Rights Reserved.\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n/* ==========  IMAGES  ========== */\n/* ==========  Color & Themes  ========== */\n/* ==========  Typography  ========== */\n/* ==========  Components  ========== */\n/* ==========  Standard Buttons  ========== */\n/* ==========  Icon Toggles  ========== */\n/* ==========  Radio Buttons  ========== */\n/* ==========  Ripple effect  ========== */\n/* ==========  Layout  ========== */\n/* ==========  Content Tabs  ========== */\n/* ==========  Checkboxes  ========== */\n/* ==========  Switches  ========== */\n/* ==========  Spinner  ========== */\n/* ==========  Text fields  ========== */\n/* ==========  Card  ========== */\n/* ==========  Sliders ========== */\n/* ========== Progress ========== */\n/* ==========  List ========== */\n/* ==========  Item ========== */\n/* ==========  Dropdown menu ========== */\n/* ==========  Tooltips  ========== */\n/* ==========  Footer  ========== */\n/* TEXTFIELD */\n/* SWITCH */\n/* SPINNER */\n/* RADIO */\n/* MENU */\n/* LIST */\n/* LAYOUT */\n/* ICON TOGGLE */\n/* FOOTER */\n/*mega-footer*/\n/*mini-footer*/\n/* CHECKBOX */\n/* CARD */\n/* Card dimensions */\n/* Cover image */\n/* BUTTON */\n/**\n *\n * Dimensions\n *\n */\n/* ANIMATION */\n/* PROGRESS */\n/* BADGE */\n/* SHADOWS */\n/* GRID */\n/* DATA TABLE */\n/* DIALOG */\n/* SNACKBAR */\n/* TOOLTIP */\n/* CHIP */\n.gallery {\n  -webkit-column-count: 3;\n     -moz-column-count: 3;\n          column-count: 3;\n  font-size: 0;\n  margin: 36px 0;\n  -webkit-column-gap: 18px;\n     -moz-column-gap: 18px;\n          column-gap: 18px; }\n  .gallery .gallery__thumb-img {\n    max-width: 100%;\n    height: auto; }\n  .gallery .gallery__thumb-figure, .gallery .gallery__thumb-figure--no-radius {\n    text-align: center;\n    width: 100%;\n    box-sizing: border-box;\n    display: inline-block;\n    margin-bottom: 18px;\n    background-color: white;\n    padding: 18px;\n    border-radius: 3px;\n    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.18); }\n  .gallery .gallery__thumb-figure--no-radius {\n    border-radius: 0;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n    border: 1px solid #e9e5e5; }\n\n@media (min-width: 480px) and (max-width: 839px) {\n  .gallery {\n    -webkit-column-count: 2;\n       -moz-column-count: 2;\n            column-count: 2; } }\n\n@media (max-width: 479px) {\n  .gallery {\n    -webkit-column-count: 1;\n       -moz-column-count: 1;\n            column-count: 1; } }\n\n.gallery--flat {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n      flex-flow: row wrap; }\n  .gallery--flat .gallery__thumb-figure, .gallery--flat .gallery .gallery__thumb-figure--no-radius, .gallery .gallery--flat .gallery__thumb-figure--no-radius {\n    width: 25%; }\n  .gallery--flat .gallery__thumb-img {\n    width: 100%;\n    height: auto; }\n\n@media (min-width: 480px) and (max-width: 839px) {\n  .gallery--flat .gallery__thumb-figure, .gallery--flat .gallery .gallery__thumb-figure--no-radius, .gallery .gallery--flat .gallery__thumb-figure--no-radius {\n    width: 50%; } }\n\n@media (max-width: 479px) {\n  .gallery--flat .gallery__thumb-figure, .gallery--flat .gallery .gallery__thumb-figure--no-radius, .gallery .gallery--flat .gallery__thumb-figure--no-radius {\n    width: 100%; } }\n", ""]);
	
	// exports


/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/*!************************************!*\
  !*** ./js/gallery/photoswipe.scss ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/postcss-loader!./../../~/sass-loader!./photoswipe.scss */ 9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./photoswipe.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./photoswipe.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/*!**************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/sass-loader!./js/gallery/photoswipe.scss ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 6)();
	// imports
	
	
	// module
	exports.push([module.id, "/*! PhotoSwipe main CSS by Dmitry Semenov | photoswipe.com | MIT license */\n/*\n\tStyles for basic PhotoSwipe functionality (sliding area, open/close transitions)\n*/\n/* pswp = photoswipe */\n.pswp {\n  display: none;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  overflow: hidden;\n  -ms-touch-action: none;\n  touch-action: none;\n  z-index: 1500;\n  -webkit-text-size-adjust: 100%;\n  /* create separate layer, to avoid paint on window.onscroll in webkit/blink */\n  -webkit-backface-visibility: hidden;\n  outline: none; }\n  .pswp * {\n    box-sizing: border-box; }\n  .pswp img {\n    max-width: none; }\n\n/* style is added when JS option showHideOpacity is set to true */\n.pswp--animate_opacity {\n  /* 0.001, because opacity:0 doesn't trigger Paint action, which causes lag at start of transition */\n  opacity: 0.001;\n  will-change: opacity;\n  /* for open/close transition */\n  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);\n  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }\n\n.pswp--open {\n  display: block; }\n\n.pswp--zoom-allowed .pswp__img {\n  /* autoprefixer: off */\n  cursor: -webkit-zoom-in;\n  cursor: -moz-zoom-in;\n  cursor: zoom-in; }\n\n.pswp--zoomed-in .pswp__img {\n  /* autoprefixer: off */\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab; }\n\n.pswp--dragging .pswp__img {\n  /* autoprefixer: off */\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing; }\n\n/*\n\tBackground is added as a separate element.\n\tAs animating opacity is much faster than animating rgba() background-color.\n*/\n.pswp__bg {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: 0;\n  -webkit-backface-visibility: hidden;\n  will-change: opacity; }\n\n.pswp__scroll-wrap {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n.pswp__container,\n.pswp__zoom-wrap {\n  -ms-touch-action: none;\n  touch-action: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n\n/* Prevent selection and tap highlights */\n.pswp__container,\n.pswp__img {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none; }\n\n.pswp__zoom-wrap {\n  position: absolute;\n  width: 100%;\n  -webkit-transform-origin: left top;\n  transform-origin: left top;\n  /* for open/close transition */\n  -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);\n  transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);\n  transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1);\n  transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1), -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1); }\n\n.pswp__bg {\n  will-change: opacity;\n  /* for open/close transition */\n  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);\n  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }\n\n.pswp--animated-in .pswp__bg,\n.pswp--animated-in .pswp__zoom-wrap {\n  -webkit-transition: none;\n  transition: none; }\n\n.pswp__container,\n.pswp__zoom-wrap {\n  -webkit-backface-visibility: hidden; }\n\n.pswp__item {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  overflow: hidden; }\n\n.pswp__img {\n  position: absolute;\n  width: auto;\n  height: auto;\n  top: 0;\n  left: 0; }\n\n/*\n\tstretched thumbnail or div placeholder element (see below)\n\tstyle is added to avoid flickering in webkit/blink when layers overlap\n*/\n.pswp__img--placeholder {\n  -webkit-backface-visibility: hidden; }\n\n/*\n\tdiv element that matches size of large image\n\tlarge image loads on top of it\n*/\n.pswp__img--placeholder--blank {\n  background: #222; }\n\n.pswp--ie .pswp__img {\n  width: 100% !important;\n  height: auto !important;\n  left: 0;\n  top: 0; }\n\n/*\n\tError message appears when image is not loaded\n\t(JS option errorMsg controls markup)\n*/\n.pswp__error-msg {\n  position: absolute;\n  left: 0;\n  top: 50%;\n  width: 100%;\n  text-align: center;\n  font-size: 14px;\n  line-height: 16px;\n  margin-top: -8px;\n  color: #CCC; }\n\n.pswp__error-msg a {\n  color: #CCC;\n  text-decoration: underline; }\n", ""]);
	
	// exports


/***/ },
/* 10 */
/*!**************************************************************!*\
  !*** ./js/gallery/photoswipe-default-skin/default-skin.scss ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../../~/css-loader!./../../../~/postcss-loader!./../../../~/sass-loader!./default-skin.scss */ 11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../~/style-loader/addStyles.js */ 7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/sass-loader/index.js!./default-skin.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/sass-loader/index.js!./default-skin.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/*!****************************************************************************************************************!*\
  !*** ./~/css-loader!./~/postcss-loader!./~/sass-loader!./js/gallery/photoswipe-default-skin/default-skin.scss ***!
  \****************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../~/css-loader/lib/css-base.js */ 6)();
	// imports
	
	
	// module
	exports.push([module.id, "/*! PhotoSwipe Default UI CSS by Dmitry Semenov | photoswipe.com | MIT license */\n/*\n\n\tContents:\n\n\t1. Buttons\n\t2. Share modal and links\n\t3. Index indicator (\"1 of X\" counter)\n\t4. Caption\n\t5. Loading indicator\n\t6. Additional styles (root element, top bar, idle state, hidden state, etc.)\n\n*/\n/*\n\t\n\t1. Buttons\n\n */\n/* <button> css reset */\n.pswp__button {\n  width: 44px;\n  height: 44px;\n  position: relative;\n  background: none;\n  cursor: pointer;\n  overflow: visible;\n  -webkit-appearance: none;\n  display: block;\n  border: 0;\n  padding: 0;\n  margin: 0;\n  float: right;\n  opacity: 0.75;\n  -webkit-transition: opacity 0.2s;\n  transition: opacity 0.2s;\n  box-shadow: none; }\n  .pswp__button:focus, .pswp__button:hover {\n    opacity: 1; }\n  .pswp__button:active {\n    outline: none;\n    opacity: 0.9; }\n  .pswp__button::-moz-focus-inner {\n    padding: 0;\n    border: 0; }\n\n/* pswp__ui--over-close class it added when mouse is over element that should close gallery */\n.pswp__ui--over-close .pswp__button--close {\n  opacity: 1; }\n\n.pswp__button,\n.pswp__button--arrow--left:before,\n.pswp__button--arrow--right:before {\n  background: url(" + __webpack_require__(/*! ./default-skin.png */ 12) + ") 0 0 no-repeat;\n  background-size: 264px 88px;\n  width: 44px;\n  height: 44px; }\n\n@media (-webkit-min-device-pixel-ratio: 1.1), (-webkit-min-device-pixel-ratio: 1.09375), (min-resolution: 105dpi), (min-resolution: 1.1dppx) {\n  /* Serve SVG sprite if browser supports SVG and resolution is more than 105dpi */\n  .pswp--svg .pswp__button,\n  .pswp--svg .pswp__button--arrow--left:before,\n  .pswp--svg .pswp__button--arrow--right:before {\n    background-image: url(" + __webpack_require__(/*! ./default-skin.svg */ 13) + "); }\n  .pswp--svg .pswp__button--arrow--left,\n  .pswp--svg .pswp__button--arrow--right {\n    background: none; } }\n\n.pswp__button--close {\n  background-position: 0 -44px; }\n\n.pswp__button--share {\n  background-position: -44px -44px; }\n\n.pswp__button--fs {\n  display: none; }\n\n.pswp--supports-fs .pswp__button--fs {\n  display: block; }\n\n.pswp--fs .pswp__button--fs {\n  background-position: -44px 0; }\n\n.pswp__button--zoom {\n  display: none;\n  background-position: -88px 0; }\n\n.pswp--zoom-allowed .pswp__button--zoom {\n  display: block; }\n\n.pswp--zoomed-in .pswp__button--zoom {\n  background-position: -132px 0; }\n\n/* no arrows on touch screens */\n.pswp--touch .pswp__button--arrow--left,\n.pswp--touch .pswp__button--arrow--right {\n  visibility: hidden; }\n\n/*\n\tArrow buttons hit area\n\t(icon is added to :before pseudo-element)\n*/\n.pswp__button--arrow--left,\n.pswp__button--arrow--right {\n  background: none;\n  top: 50%;\n  margin-top: -50px;\n  width: 70px;\n  height: 100px;\n  position: absolute; }\n\n.pswp__button--arrow--left {\n  left: 0; }\n\n.pswp__button--arrow--right {\n  right: 0; }\n\n.pswp__button--arrow--left:before,\n.pswp__button--arrow--right:before {\n  content: '';\n  top: 35px;\n  background-color: rgba(0, 0, 0, 0.3);\n  height: 30px;\n  width: 32px;\n  position: absolute; }\n\n.pswp__button--arrow--left:before {\n  left: 6px;\n  background-position: -138px -44px; }\n\n.pswp__button--arrow--right:before {\n  right: 6px;\n  background-position: -94px -44px; }\n\n/*\n\n\t2. Share modal/popup and links\n\n */\n.pswp__counter,\n.pswp__share-modal {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n      user-select: none; }\n\n.pswp__share-modal {\n  display: block;\n  background: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  padding: 10px;\n  position: absolute;\n  z-index: 1600;\n  opacity: 0;\n  -webkit-transition: opacity 0.25s ease-out;\n  transition: opacity 0.25s ease-out;\n  -webkit-backface-visibility: hidden;\n  will-change: opacity; }\n\n.pswp__share-modal--hidden {\n  display: none; }\n\n.pswp__share-tooltip {\n  z-index: 1620;\n  position: absolute;\n  background: #FFF;\n  top: 56px;\n  border-radius: 2px;\n  display: block;\n  width: auto;\n  right: 44px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);\n  -webkit-transform: translateY(6px);\n          transform: translateY(6px);\n  -webkit-transition: -webkit-transform 0.25s;\n  transition: -webkit-transform 0.25s;\n  transition: transform 0.25s;\n  transition: transform 0.25s, -webkit-transform 0.25s;\n  -webkit-backface-visibility: hidden;\n  will-change: transform; }\n  .pswp__share-tooltip a {\n    display: block;\n    padding: 8px 12px;\n    color: #000;\n    text-decoration: none;\n    font-size: 14px;\n    line-height: 18px; }\n    .pswp__share-tooltip a:hover {\n      text-decoration: none;\n      color: #000; }\n    .pswp__share-tooltip a:first-child {\n      /* round corners on the first/last list item */\n      border-radius: 2px 2px 0 0; }\n    .pswp__share-tooltip a:last-child {\n      border-radius: 0 0 2px 2px; }\n\n.pswp__share-modal--fade-in {\n  opacity: 1; }\n  .pswp__share-modal--fade-in .pswp__share-tooltip {\n    -webkit-transform: translateY(0);\n            transform: translateY(0); }\n\n/* increase size of share links on touch devices */\n.pswp--touch .pswp__share-tooltip a {\n  padding: 16px 12px; }\n\na.pswp__share--facebook:before {\n  content: '';\n  display: block;\n  width: 0;\n  height: 0;\n  position: absolute;\n  top: -12px;\n  right: 15px;\n  border: 6px solid transparent;\n  border-bottom-color: #FFF;\n  -webkit-pointer-events: none;\n  -moz-pointer-events: none;\n  pointer-events: none; }\n\na.pswp__share--facebook:hover {\n  background: #3E5C9A;\n  color: #FFF; }\n  a.pswp__share--facebook:hover:before {\n    border-bottom-color: #3E5C9A; }\n\na.pswp__share--twitter:hover {\n  background: #55ACEE;\n  color: #FFF; }\n\na.pswp__share--pinterest:hover {\n  background: #CCC;\n  color: #CE272D; }\n\na.pswp__share--download:hover {\n  background: #DDD; }\n\n/*\n\n\t3. Index indicator (\"1 of X\" counter)\n\n */\n.pswp__counter {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 44px;\n  font-size: 13px;\n  line-height: 44px;\n  color: #FFF;\n  opacity: 0.75;\n  padding: 0 10px; }\n\n/*\n\t\n\t4. Caption\n\n */\n.pswp__caption {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  min-height: 44px; }\n  .pswp__caption small {\n    font-size: 11px;\n    color: #BBB; }\n\n.pswp__caption__center {\n  text-align: left;\n  max-width: 420px;\n  margin: 0 auto;\n  font-size: 13px;\n  padding: 10px;\n  line-height: 20px;\n  color: #CCC; }\n\n.pswp__caption--empty {\n  display: none; }\n\n/* Fake caption element, used to calculate height of next/prev image */\n.pswp__caption--fake {\n  visibility: hidden; }\n\n/*\n\n\t5. Loading indicator (preloader)\n\n\tYou can play with it here - http://codepen.io/dimsemenov/pen/yyBWoR\n\n */\n.pswp__preloader {\n  width: 44px;\n  height: 44px;\n  position: absolute;\n  top: 0;\n  left: 50%;\n  margin-left: -22px;\n  opacity: 0;\n  -webkit-transition: opacity 0.25s ease-out;\n  transition: opacity 0.25s ease-out;\n  will-change: opacity;\n  direction: ltr; }\n\n.pswp__preloader__icn {\n  width: 20px;\n  height: 20px;\n  margin: 12px; }\n\n.pswp__preloader--active {\n  opacity: 1; }\n  .pswp__preloader--active .pswp__preloader__icn {\n    /* We use .gif in browsers that don't support CSS animation */\n    background: url(" + __webpack_require__(/*! ./preloader.gif */ 14) + ") 0 0 no-repeat; }\n\n.pswp--css_animation .pswp__preloader--active {\n  opacity: 1; }\n  .pswp--css_animation .pswp__preloader--active .pswp__preloader__icn {\n    -webkit-animation: clockwise 500ms linear infinite;\n            animation: clockwise 500ms linear infinite; }\n  .pswp--css_animation .pswp__preloader--active .pswp__preloader__donut {\n    -webkit-animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite;\n            animation: donut-rotate 1000ms cubic-bezier(0.4, 0, 0.22, 1) infinite; }\n\n.pswp--css_animation .pswp__preloader__icn {\n  background: none;\n  opacity: 0.75;\n  width: 14px;\n  height: 14px;\n  position: absolute;\n  left: 15px;\n  top: 15px;\n  margin: 0; }\n\n.pswp--css_animation .pswp__preloader__cut {\n  /* \n\t\t\tThe idea of animating inner circle is based on Polymer (\"material\") loading indicator \n\t\t\t by Keanu Lee https://blog.keanulee.com/2014/10/20/the-tale-of-three-spinners.html\n\t\t*/\n  position: relative;\n  width: 7px;\n  height: 14px;\n  overflow: hidden; }\n\n.pswp--css_animation .pswp__preloader__donut {\n  box-sizing: border-box;\n  width: 14px;\n  height: 14px;\n  border: 2px solid #FFF;\n  border-radius: 50%;\n  border-left-color: transparent;\n  border-bottom-color: transparent;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: none;\n  margin: 0; }\n\n@media screen and (max-width: 1024px) {\n  .pswp__preloader {\n    position: relative;\n    left: auto;\n    top: auto;\n    margin: 0;\n    float: right; } }\n\n@-webkit-keyframes clockwise {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes clockwise {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@-webkit-keyframes donut-rotate {\n  0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n  50% {\n    -webkit-transform: rotate(-140deg);\n            transform: rotate(-140deg); }\n  100% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); } }\n\n@keyframes donut-rotate {\n  0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n  50% {\n    -webkit-transform: rotate(-140deg);\n            transform: rotate(-140deg); }\n  100% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); } }\n\n/*\n\t\n\t6. Additional styles\n\n */\n/* root element of UI */\n.pswp__ui {\n  -webkit-font-smoothing: auto;\n  visibility: visible;\n  opacity: 1;\n  z-index: 1550; }\n\n/* top black bar with buttons and \"1 of X\" indicator */\n.pswp__top-bar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 44px;\n  width: 100%; }\n\n.pswp__caption,\n.pswp__top-bar,\n.pswp--has_mouse .pswp__button--arrow--left,\n.pswp--has_mouse .pswp__button--arrow--right {\n  -webkit-backface-visibility: hidden;\n  will-change: opacity;\n  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);\n  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); }\n\n/* pswp--has_mouse class is added only when two subsequent mousemove events occur */\n.pswp--has_mouse .pswp__button--arrow--left,\n.pswp--has_mouse .pswp__button--arrow--right {\n  visibility: visible; }\n\n.pswp__top-bar,\n.pswp__caption {\n  background-color: rgba(0, 0, 0, 0.5); }\n\n/* pswp__ui--fit class is added when main image \"fits\" between top bar and bottom bar (caption) */\n.pswp__ui--fit .pswp__top-bar,\n.pswp__ui--fit .pswp__caption {\n  background-color: rgba(0, 0, 0, 0.3); }\n\n/* pswp__ui--idle class is added when mouse isn't moving for several seconds (JS option timeToIdle) */\n.pswp__ui--idle .pswp__top-bar {\n  opacity: 0; }\n\n.pswp__ui--idle .pswp__button--arrow--left,\n.pswp__ui--idle .pswp__button--arrow--right {\n  opacity: 0; }\n\n/*\n\tpswp__ui--hidden class is added when controls are hidden\n\te.g. when user taps to toggle visibility of controls\n*/\n.pswp__ui--hidden .pswp__top-bar,\n.pswp__ui--hidden .pswp__caption,\n.pswp__ui--hidden .pswp__button--arrow--left,\n.pswp__ui--hidden .pswp__button--arrow--right {\n  /* Force paint & create composition layer for controls. */\n  opacity: 0.001; }\n\n/* pswp__ui--one-slide class is added when there is just one item in gallery */\n.pswp__ui--one-slide .pswp__button--arrow--left,\n.pswp__ui--one-slide .pswp__button--arrow--right,\n.pswp__ui--one-slide .pswp__counter {\n  display: none; }\n\n.pswp__element--disabled {\n  display: none !important; }\n\n.pswp--minimal--dark .pswp__top-bar {\n  background: none; }\n", ""]);
	
	// exports


/***/ },
/* 12 */
/*!*************************************************************!*\
  !*** ./js/gallery/photoswipe-default-skin/default-skin.png ***!
  \*************************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABYCAQAAACjBqE3AAAB6klEQVR4Ae3bsWpUQRTG8YkkanwCa7GzVotsI/gEgk9h4Vu4ySLYmMYgbJrc3lrwZbJwC0FMt4j7F6Y4oIZrsXtgxvx/1c0ufEX4cnbmLCmSJEmSJEmSJEmSJP3XCBPvbJU+8doWmDFwyZpLBmYlNJebz0KwzykwsuSYJSNwykEJreV2BaBMaLIQZ2xYcFgqDlmw4ayE/FwL0dDk4Qh4W37DAjgqIT+3HRbigjH+iikVdxgZStgyN0Su2sXIeTwTT+esdpcbIlfNAuZ/TxresG4zV8kYWSZNiKUTokMMSWeIwTNEn4fK2TW3gRNgVkJLuVksROA9G+bEvoATNlBCa7nZXEwdxEZxzpKRKFh+bsv8LmPFmhX1OwfIz81jIRJQ5eeqG9B+riRJkiRJkiRJkiRJkiRJkiRJUkvA/8RQoEpKlJWINFkJ62AlrEP/mNBibnv2yz/A3t7Uq3LcpoxP8COjC1T5vxoAD5VdoEqdDrd5QuW1swtUSaueh3zkiuBiqgtA2OlkeMcP/uDqugsJdbjHF65VdPMKwS0+WQc/MgKvrIOHysB9vgPwk8+85hmPbnQdvHZyDMAFD7L3EOpgMcVdvnHFS0/vlatrXvCVx0U9gt3fxvnA0/hB4nmRJEmSJEmSJEmSJGmHfgFLaDPoMu5xWwAAAABJRU5ErkJggg=="

/***/ },
/* 13 */
/*!*************************************************************!*\
  !*** ./js/gallery/photoswipe-default-skin/default-skin.svg ***!
  \*************************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjY0IiBoZWlnaHQ9Ijg4IiB2aWV3Qm94PSIwIDAgMjY0IDg4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5kZWZhdWx0LXNraW4gMjwvdGl0bGU+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Zz48cGF0aCBkPSJNNjcuMDAyIDU5LjV2My43NjhjLTYuMzA3Ljg0LTkuMTg0IDUuNzUtMTAuMDAyIDkuNzMyIDIuMjItMi44MyA1LjU2NC01LjA5OCAxMC4wMDItNS4wOThWNzEuNUw3MyA2NS41ODUgNjcuMDAyIDU5LjV6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJNMTMgMjl2LTVoMnYzaDN2MmgtNXpNMTMgMTVoNXYyaC0zdjNoLTJ2LTV6TTMxIDE1djVoLTJ2LTNoLTN2LTJoNXpNMzEgMjloLTV2LTJoM3YtM2gydjV6IiBpZD0iU2hhcGUiLz48L2c+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTYyIDI0djVoLTJ2LTNoLTN2LTJoNXpNNjIgMjBoLTV2LTJoM3YtM2gydjV6TTcwIDIwdi01aDJ2M2gzdjJoLTV6TTcwIDI0aDV2MmgtM3YzaC0ydi01eiIvPjwvZz48cGF0aCBkPSJNMjAuNTg2IDY2bC01LjY1Ni01LjY1NiAxLjQxNC0xLjQxNEwyMiA2NC41ODZsNS42NTYtNS42NTYgMS40MTQgMS40MTRMMjMuNDE0IDY2bDUuNjU2IDUuNjU2LTEuNDE0IDEuNDE0TDIyIDY3LjQxNGwtNS42NTYgNS42NTYtMS40MTQtMS40MTRMMjAuNTg2IDY2eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMTEuNzg1IDY1LjAzTDExMCA2My41bDMtMy41aC0xMHYtMmgxMGwtMy0zLjUgMS43ODUtMS40NjhMMTE3IDU5bC01LjIxNSA2LjAzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNTIuMjE1IDY1LjAzTDE1NCA2My41bC0zLTMuNWgxMHYtMmgtMTBsMy0zLjUtMS43ODUtMS40NjhMMTQ3IDU5bDUuMjE1IDYuMDN6IiBmaWxsPSIjZmZmIi8+PGc+PHBhdGggaWQ9IlJlY3RhbmdsZS0xMSIgZmlsbD0iI2ZmZiIgZD0iTTE2MC45NTcgMjguNTQzbC0zLjI1LTMuMjUtMS40MTMgMS40MTQgMy4yNSAzLjI1eiIvPjxwYXRoIGQ9Ik0xNTIuNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIGlkPSJPdmFsLTEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUwIDIxaDV2MWgtNXoiLz48L2c+PGc+PHBhdGggZD0iTTExNi45NTcgMjguNTQzbC0xLjQxNCAxLjQxNC0zLjI1LTMuMjUgMS40MTQtMS40MTQgMy4yNSAzLjI1eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDguNSAyN2MzLjAzOCAwIDUuNS0yLjQ2MiA1LjUtNS41cy0yLjQ2Mi01LjUtNS41LTUuNS01LjUgMi40NjItNS41IDUuNSAyLjQ2MiA1LjUgNS41IDUuNXoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA2IDIxaDV2MWgtNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTA5LjA0MyAxOS4wMDhsLS4wODUgNS0xLS4wMTcuMDg1LTV6Ii8+PC9nPjwvZz48L2c+PC9zdmc+"

/***/ },
/* 14 */
/*!**********************************************************!*\
  !*** ./js/gallery/photoswipe-default-skin/preloader.gif ***!
  \**********************************************************/
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhFAAUAPMIAIeHhz8/P1dXVycnJ8/Pz7e3t5+fn29vb////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAIACwAAAAAFAAUAEAEUxDJSatFxtwaggWAdIyHJAhXoRYSQUhDPGx0TbmujahbXGWZWqdDAYEsp5NupLPkdDwE7oXwWVasimzWrAE1tKFHErQRK8eL8mMUlRBJVI307uoiACH5BAUHAAgALAEAAQASABIAAAROEMkpS6E4W5upMdUmEQT2feFIltMJYivbvhnZ3R0A4NMwIDodz+cL7nDEn5CH8DGZh8MtEMBEoxkqlXKVIgQCibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpjaE4W5spANUmFQX2feFIltMJYivbvhnZ3d1x4BNBIDodz+cL7nDEn5CH8DGZAsFtMMBEoxkqlXKVIgIBibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpAaA4W5vpOdUmGQb2feFIltMJYivbvhnZ3Z0g4FNRIDodz+cL7nDEn5CH8DGZgcCNQMBEoxkqlXKVIgYDibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpz6E4W5upENUmAQD2feFIltMJYivbvhnZ3V0Q4JNhIDodz+cL7nDEn5CH8DGZg8GtUMBEoxkqlXKVIggEibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkphaA4W5tpCNUmHQf2feFIltMJYivbvhnZ3d0w4BMAIDodz+cL7nDEn5CH8DGZBMLNYMBEoxkqlXKVIgoFibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpQ6A4W5vpGNUmCQL2feFIltMJYivbvhnZ3R1B4NNxIDodz+cL7nDEn5CH8DGZhcINAMBEoxkqlXKVIgwGibbK9YLBYvLtHH5K0J0IACH5BAUHAAcALAEAAQASABIAAANCeLo6wzA6FxkhbaoQ4L3ZxnXLh0EjWZ4RV71VUcCLIByyTNt2PsO8m452sBGJBsNxkUwuD03lAQBASqnUJ7aq5UYSADs="

/***/ }
/******/ ]);
//# sourceMappingURL=gallery.js.map