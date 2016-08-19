(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["linesDraw\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"] = factory();
	else
		root["linesDraw\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var shortid = __webpack_require__(1);
	var scrollMagic = __webpack_require__(10);
	var velocity = __webpack_require__(11);
	__webpack_require__(12);
	
	var Point = __webpack_require__(13);
	var Line = __webpack_require__(14);
	var Trigger = __webpack_require__(15);
	
	var css = __webpack_require__(16);
	
	var linesDrawer = {
	    linesToDraw: [],
	    lines: [],
	    options: {
	        'triggersContainerAppendTo': 'body',
	        'triggersContainerId': '#triggers', //container where all the triggers will be created with opacity 0
	        'animationDuration': 400, //duration for the effect when scroll in miliseconds
	        'triggerScroll': '#scrollTrigger', //where the trigger scroll starts to search for triggers TODO
	        'addScrollmagicIndicators': false
	    },
	
	    getPoint: function (x, y) {
	        return new Point(x, y);
	    },
	
	    getLine: function (p1, p2, color, trigger) {
	        color = typeof color !== 'undefined' ? color : "#000000";
	        return new Line(p1, p2, color, trigger);
	    },
	
	    getTrigger: function (top) {
	        if (Number(top) === top && top % 1 === 0) {
	            var trigger = new Trigger(top);
	            var triggerContainer = document.getElementById(this.options['triggersContainerId']);
	            if (triggerContainer === null) {
	                var triggers = document.createElement('div');
	                triggers.id = this.options['triggersContainerId'];
	                triggers.className = 'trigger';
	                if (this.options['triggersContainerAppendTo'] === 'body') {
	                    document.getElementsByTagName('body')[0].appendChild(triggers);
	                } else {
	                    document.getElementById(this.options['triggersContainerAppendTo']).appendChild(triggers);
	                }
	                triggerContainer = triggers;
	            }
	            triggerContainer.appendChild(trigger);
	            return trigger;
	        } else {
	            console.log('Only Integer allowed!');
	        }
	    },
	
	    addDrawedLine: function (line) {
	        this.lines.push(line);
	    },
	
	    addLines: function (lines) {
	        Array.prototype.push.apply(this.linesToDraw, lines);
	    },
	
	    createLine: function (pointA, pointB, color, triggerObj) {
	        var uuid = shortid.generate();
	        var length, height, width, float = 'left';
	        var line = document.createElement("div");
	        var pointX = pointA.x;
	
	        length = this.calculateLenght(pointA, pointB);
	        if (this.calculateDirection(pointA, pointB) == 'horizontal') {
	            height = '2';
	            width = length;
	        } else {
	            height = length;
	            width = '2';
	        }
	        if (this.calculateLoR(pointA, pointB) == 'right') {
	            float = 'right';
	            if (pointA.x > pointB.x) {
	                float = 'right';
	                pointX = window.innerWidth - width - pointB.x - 19;
	            }
	        }
	
	        var styles = 'border: 1px solid ' + color + '; '
	            + 'width: ' + width + 'px; '
	            + 'height: ' + height + 'px;'
	            + 'top: ' + pointA.y + 'px; '
	            + float + ': ' + pointX + 'px; '
	            + 'float: ' + float + '; ';
	        line.setAttribute('style', styles);
	        line.setAttribute('id', "line_" + uuid);
	        line.setAttribute('class', 'drawed_line');
	        line.setAttribute('data-trigger', triggerObj.id);
	        this.addDrawedLine(line);
	        return line;
	    },
	
	    createAllLines: function (appendId) {
	        var that = this;
	        var ln = null;
	        this.linesToDraw.forEach(function (sl) {
	            ln = that.createLine(sl.startPoint, sl.endPoint, sl.colorSelected, sl.triggerObj);
	            appendId.appendChild(ln);
	        });
	    },
	
	    calculateLenght: function (p1, p2) {
	        var pa = p1.x - p2.x,
	            pb = p1.y - p2.y;
	        return Math.sqrt(pa * pa + pb * pb);
	    },
	
	    calculateDirection: function (p1, p2) {
	        var pa = p1.x - p2.x;
	        if (pa == 0) {
	            return 'vertical';
	        } else {
	            return 'horizontal';
	        }
	    },
	
	    //Calculate if line direction is left or right
	    calculateLoR: function (p1, p2) {
	        if (p1.x > p2.x) {
	            return 'right';
	        } else {
	            return 'left';
	        }
	    },
	
	    //calculate if line direction is up or down
	    calculateUoD: function (p1, p2) {
	        if (p1.y > p2.y) {
	            return 'up';
	        } else {
	            return 'down';
	        }
	    },
	
	    callback: function (event) {
			// console.log("Event fired! (" + event.type + ")");
	    },
	
	
	    scrollAnimate: function () {
	        var duration = this.options['animationDuration'];
	
	        if (this.options['addScrollmagicIndicators'] === true) {
	            __webpack_require__(20);
	        }
	
	        // var controller = new scrollMagic.Controller({addIndicators:this.options['addScrollmagicIndicators']});
	        var controller = new scrollMagic.Controller({addIndicators: true});
	        this.lines.forEach(function (line) {
	            var height = line.style.height;
	            var width = line.style.width;
	            line.style.height = 0;
	            line.style.width = 0;
	            console.log(line.getAttribute('data-trigger'));
	            var scene = new scrollMagic.Scene({
					triggerElement: "#" + line.getAttribute('data-trigger'), loglevel: 3
	            });
				console.log(line.getAttribute('id'));
				scene.setVelocity("#" + line.getAttribute('id'), {
	                opacity: 1,
	                    width: width,
	                    height: height
	            }, {duration: duration});
	            scene.addTo(controller);
	        });
	    },
	
	
	    mouseCoordenatesOnTitle: function () {
	        document.onmousemove = function (e) {
	            var cursorX = e.pageX;
	            var cursorY = e.pageY;
	            document.getElementsByTagName('body')[0].innerHTML('x:' + cursorX + ' - y:' + cursorY);
	        }
	    }
	};
	
	module.exports = linesDrawer;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(3);
	var encode = __webpack_require__(5);
	var decode = __webpack_require__(7);
	var isValid = __webpack_require__(8);
	
	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;
	
	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;
	
	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(9) || 0;
	
	// Counter is used when shortid is called multiple times in one second.
	var counter;
	
	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;
	
	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {
	
	    var str = '';
	
	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
	
	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }
	
	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);
	
	    return str;
	}
	
	
	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}
	
	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}
	
	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }
	
	    return alphabet.shuffled();
	}
	
	
	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(4);
	
	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;
	
	var shuffled;
	
	function reset() {
	    shuffled = false;
	}
	
	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }
	
	    if (_alphabet_ === alphabet) {
	        return;
	    }
	
	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }
	
	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });
	
	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }
	
	    alphabet = _alphabet_;
	    reset();
	}
	
	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}
	
	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}
	
	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }
	
	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;
	
	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}
	
	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}
	
	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}
	
	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
	
	var seed = 1;
	
	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}
	
	function setSeed(_seed_) {
	    seed = _seed_;
	}
	
	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(6);
	
	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;
	
	    var str = '';
	
	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}
	
	module.exports = encode;


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto
	
	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}
	
	module.exports = randomByte;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(3);
	
	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}
	
	module.exports = decode;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(3);
	
	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }
	
	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}
	
	module.exports = isShortId;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * ScrollMagic v2.0.5 (2015-04-29)
	 * The javascript library for magical scroll interactions.
	 * (c) 2015 Jan Paepke (@janpaepke)
	 * Project Website: http://scrollmagic.io
	 * 
	 * @version 2.0.5
	 * @license Dual licensed under MIT license and GPL.
	 * @author Jan Paepke - e-mail@janpaepke.de
	 *
	 * @file ScrollMagic main library.
	 */
	/**
	 * @namespace ScrollMagic
	 */
	(function (root, factory) {
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// CommonJS
			module.exports = factory();
		} else {
			// Browser global
			root.ScrollMagic = factory();
		}
	}(this, function () {
		"use strict";
	
		var ScrollMagic = function () {
			_util.log(2, '(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use \'new ScrollMagic.Controller()\' to create a new controller instance. Use \'new ScrollMagic.Scene()\' to instance a scene.');
		};
	
		ScrollMagic.version = "2.0.5";
	
		// TODO: temporary workaround for chrome's scroll jitter bug
		window.addEventListener("mousewheel", function () {});
	
		// global const
		var PIN_SPACER_ATTRIBUTE = "data-scrollmagic-pin-spacer";
	
		/**
		 * The main class that is needed once per scroll container.
		 *
		 * @class
		 *
		 * @example
		 * // basic initialization
		 * var controller = new ScrollMagic.Controller();
		 *
		 * // passing options
		 * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
		 *
		 * @param {object} [options] - An object containing one or more options for the controller.
		 * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
		 * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
		 * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
		 * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
		 ** `0` => silent
		 ** `1` => errors
		 ** `2` => errors, warnings
		 ** `3` => errors, warnings, debuginfo
		 * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
		 This interval polls these parameters to fire the necessary events.  
		 If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
		 *
		 */
		ScrollMagic.Controller = function (options) {
	/*
		 * ----------------------------------------------------------------
		 * settings
		 * ----------------------------------------------------------------
		 */
			var
			NAMESPACE = 'ScrollMagic.Controller',
				SCROLL_DIRECTION_FORWARD = 'FORWARD',
				SCROLL_DIRECTION_REVERSE = 'REVERSE',
				SCROLL_DIRECTION_PAUSED = 'PAUSED',
				DEFAULT_OPTIONS = CONTROLLER_OPTIONS.defaults;
	
	/*
		 * ----------------------------------------------------------------
		 * private vars
		 * ----------------------------------------------------------------
		 */
			var
			Controller = this,
				_options = _util.extend({}, DEFAULT_OPTIONS, options),
				_sceneObjects = [],
				_updateScenesOnNextCycle = false,
				// can be boolean (true => all scenes) or an array of scenes to be updated
				_scrollPos = 0,
				_scrollDirection = SCROLL_DIRECTION_PAUSED,
				_isDocument = true,
				_viewPortSize = 0,
				_enabled = true,
				_updateTimeout, _refreshTimeout;
	
	/*
		 * ----------------------------------------------------------------
		 * private functions
		 * ----------------------------------------------------------------
		 */
	
			/**
			 * Internal constructor function of the ScrollMagic Controller
			 * @private
			 */
			var construct = function () {
				for (var key in _options) {
					if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
						log(2, "WARNING: Unknown option \"" + key + "\"");
						delete _options[key];
					}
				}
				_options.container = _util.get.elements(_options.container)[0];
				// check ScrollContainer
				if (!_options.container) {
					log(1, "ERROR creating object " + NAMESPACE + ": No valid scroll container supplied");
					throw NAMESPACE + " init failed."; // cancel
				}
				_isDocument = _options.container === window || _options.container === document.body || !document.body.contains(_options.container);
				// normalize to window
				if (_isDocument) {
					_options.container = window;
				}
				// update container size immediately
				_viewPortSize = getViewportSize();
				// set event handlers
				_options.container.addEventListener("resize", onChange);
				_options.container.addEventListener("scroll", onChange);
	
				_options.refreshInterval = parseInt(_options.refreshInterval) || DEFAULT_OPTIONS.refreshInterval;
				scheduleRefresh();
	
				log(3, "added new " + NAMESPACE + " controller (v" + ScrollMagic.version + ")");
			};
	
			/**
			 * Schedule the next execution of the refresh function
			 * @private
			 */
			var scheduleRefresh = function () {
				if (_options.refreshInterval > 0) {
					_refreshTimeout = window.setTimeout(refresh, _options.refreshInterval);
				}
			};
	
			/**
			 * Default function to get scroll pos - overwriteable using `Controller.scrollPos(newFunction)`
			 * @private
			 */
			var getScrollPos = function () {
				return _options.vertical ? _util.get.scrollTop(_options.container) : _util.get.scrollLeft(_options.container);
			};
	
			/**
			 * Returns the current viewport Size (width vor horizontal, height for vertical)
			 * @private
			 */
			var getViewportSize = function () {
				return _options.vertical ? _util.get.height(_options.container) : _util.get.width(_options.container);
			};
	
			/**
			 * Default function to set scroll pos - overwriteable using `Controller.scrollTo(newFunction)`
			 * Make available publicly for pinned mousewheel workaround.
			 * @private
			 */
			var setScrollPos = this._setScrollPos = function (pos) {
				if (_options.vertical) {
					if (_isDocument) {
						window.scrollTo(_util.get.scrollLeft(), pos);
					} else {
						_options.container.scrollTop = pos;
					}
				} else {
					if (_isDocument) {
						window.scrollTo(pos, _util.get.scrollTop());
					} else {
						_options.container.scrollLeft = pos;
					}
				}
			};
	
			/**
			 * Handle updates in cycles instead of on scroll (performance)
			 * @private
			 */
			var updateScenes = function () {
				if (_enabled && _updateScenesOnNextCycle) {
					// determine scenes to update
					var scenesToUpdate = _util.type.Array(_updateScenesOnNextCycle) ? _updateScenesOnNextCycle : _sceneObjects.slice(0);
					// reset scenes
					_updateScenesOnNextCycle = false;
					var oldScrollPos = _scrollPos;
					// update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)
					_scrollPos = Controller.scrollPos();
					var deltaScroll = _scrollPos - oldScrollPos;
					if (deltaScroll !== 0) { // scroll position changed?
						_scrollDirection = (deltaScroll > 0) ? SCROLL_DIRECTION_FORWARD : SCROLL_DIRECTION_REVERSE;
					}
					// reverse order of scenes if scrolling reverse
					if (_scrollDirection === SCROLL_DIRECTION_REVERSE) {
						scenesToUpdate.reverse();
					}
					// update scenes
					scenesToUpdate.forEach(function (scene, index) {
						log(3, "updating Scene " + (index + 1) + "/" + scenesToUpdate.length + " (" + _sceneObjects.length + " total)");
						scene.update(true);
					});
					if (scenesToUpdate.length === 0 && _options.loglevel >= 3) {
						log(3, "updating 0 Scenes (nothing added to controller)");
					}
				}
			};
	
			/**
			 * Initializes rAF callback
			 * @private
			 */
			var debounceUpdate = function () {
				_updateTimeout = _util.rAF(updateScenes);
			};
	
			/**
			 * Handles Container changes
			 * @private
			 */
			var onChange = function (e) {
				log(3, "event fired causing an update:", e.type);
				if (e.type == "resize") {
					// resize
					_viewPortSize = getViewportSize();
					_scrollDirection = SCROLL_DIRECTION_PAUSED;
				}
				// schedule update
				if (_updateScenesOnNextCycle !== true) {
					_updateScenesOnNextCycle = true;
					debounceUpdate();
				}
			};
	
			var refresh = function () {
				if (!_isDocument) {
					// simulate resize event. Only works for viewport relevant param (performance)
					if (_viewPortSize != getViewportSize()) {
						var resizeEvent;
						try {
							resizeEvent = new Event('resize', {
								bubbles: false,
								cancelable: false
							});
						} catch (e) { // stupid IE
							resizeEvent = document.createEvent("Event");
							resizeEvent.initEvent("resize", false, false);
						}
						_options.container.dispatchEvent(resizeEvent);
					}
				}
				_sceneObjects.forEach(function (scene, index) { // refresh all scenes
					scene.refresh();
				});
				scheduleRefresh();
			};
	
			/**
			 * Send a debug message to the console.
			 * provided publicly with _log for plugins
			 * @private
			 *
			 * @param {number} loglevel - The loglevel required to initiate output for the message.
			 * @param {...mixed} output - One or more variables that should be passed to the console.
			 */
			var log = this._log = function (loglevel, output) {
				if (_options.loglevel >= loglevel) {
					Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");
					_util.log.apply(window, arguments);
				}
			};
			// for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins
			this._options = _options;
	
			/**
			 * Sort scenes in ascending order of their start offset.
			 * @private
			 *
			 * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
			 * @return {array} The sorted array of Scenes.
			 */
			var sortScenes = function (ScenesArray) {
				if (ScenesArray.length <= 1) {
					return ScenesArray;
				} else {
					var scenes = ScenesArray.slice(0);
					scenes.sort(function (a, b) {
						return a.scrollOffset() > b.scrollOffset() ? 1 : -1;
					});
					return scenes;
				}
			};
	
			/**
			 * ----------------------------------------------------------------
			 * public functions
			 * ----------------------------------------------------------------
			 */
	
			/**
			 * Add one ore more scene(s) to the controller.  
			 * This is the equivalent to `Scene.addTo(controller)`.
			 * @public
			 * @example
			 * // with a previously defined scene
			 * controller.addScene(scene);
			 *
			 * // with a newly created scene.
			 * controller.addScene(new ScrollMagic.Scene({duration : 0}));
			 *
			 * // adding multiple scenes
			 * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
			 *
			 * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
			 * @return {Controller} Parent object for chaining.
			 */
			this.addScene = function (newScene) {
				if (_util.type.Array(newScene)) {
					newScene.forEach(function (scene, index) {
						Controller.addScene(scene);
					});
				} else if (newScene instanceof ScrollMagic.Scene) {
					if (newScene.controller() !== Controller) {
						newScene.addTo(Controller);
					} else if (_sceneObjects.indexOf(newScene) < 0) {
						// new scene
						_sceneObjects.push(newScene); // add to array
						_sceneObjects = sortScenes(_sceneObjects); // sort
						newScene.on("shift.controller_sort", function () { // resort whenever scene moves
							_sceneObjects = sortScenes(_sceneObjects);
						});
						// insert Global defaults.
						for (var key in _options.globalSceneOptions) {
							if (newScene[key]) {
								newScene[key].call(newScene, _options.globalSceneOptions[key]);
							}
						}
						log(3, "adding Scene (now " + _sceneObjects.length + " total)");
					}
				} else {
					log(1, "ERROR: invalid argument supplied for '.addScene()'");
				}
				return Controller;
			};
	
			/**
			 * Remove one ore more scene(s) from the controller.  
			 * This is the equivalent to `Scene.remove()`.
			 * @public
			 * @example
			 * // remove a scene from the controller
			 * controller.removeScene(scene);
			 *
			 * // remove multiple scenes from the controller
			 * controller.removeScene([scene, scene2, scene3]);
			 *
			 * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
			 * @returns {Controller} Parent object for chaining.
			 */
			this.removeScene = function (Scene) {
				if (_util.type.Array(Scene)) {
					Scene.forEach(function (scene, index) {
						Controller.removeScene(scene);
					});
				} else {
					var index = _sceneObjects.indexOf(Scene);
					if (index > -1) {
						Scene.off("shift.controller_sort");
						_sceneObjects.splice(index, 1);
						log(3, "removing Scene (now " + _sceneObjects.length + " left)");
						Scene.remove();
					}
				}
				return Controller;
			};
	
			/**
			 * Update one ore more scene(s) according to the scroll position of the container.  
			 * This is the equivalent to `Scene.update()`.  
			 * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
			 * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
			 * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
			 * @public
			 * @example
			 * // update a specific scene on next cycle
			 * controller.updateScene(scene);
			 *
			 * // update a specific scene immediately
			 * controller.updateScene(scene, true);
			 *
			 * // update multiple scenes scene on next cycle
			 * controller.updateScene([scene1, scene2, scene3]);
			 *
			 * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
			 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
			 This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
			 * @return {Controller} Parent object for chaining.
			 */
			this.updateScene = function (Scene, immediately) {
				if (_util.type.Array(Scene)) {
					Scene.forEach(function (scene, index) {
						Controller.updateScene(scene, immediately);
					});
				} else {
					if (immediately) {
						Scene.update(true);
					} else if (_updateScenesOnNextCycle !== true && Scene instanceof ScrollMagic.Scene) { // if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
						// prep array for next update cycle
						_updateScenesOnNextCycle = _updateScenesOnNextCycle || [];
						if (_updateScenesOnNextCycle.indexOf(Scene) == -1) {
							_updateScenesOnNextCycle.push(Scene);
						}
						_updateScenesOnNextCycle = sortScenes(_updateScenesOnNextCycle); // sort
						debounceUpdate();
					}
				}
				return Controller;
			};
	
			/**
			 * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
			 * See `Controller.updateScene()` for more information about what this means.  
			 * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
			 * The only application for this method is when ScrollMagic fails to detect these events.  
			 * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
			 * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
			 * @public
			 * @example
			 * // update the controller on next cycle (saves performance due to elimination of redundant updates)
			 * controller.update();
			 *
			 * // update the controller immediately
			 * controller.update(true);
			 *
			 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
			 * @return {Controller} Parent object for chaining.
			 */
			this.update = function (immediately) {
				onChange({
					type: "resize"
				}); // will update size and set _updateScenesOnNextCycle to true
				if (immediately) {
					updateScenes();
				}
				return Controller;
			};
	
			/**
			 * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
			 * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
			 * @public
			 *
			 * @since 1.1.0
			 * @example
			 * // scroll to an offset of 100
			 * controller.scrollTo(100);
			 *
			 * // scroll to a DOM element
			 * controller.scrollTo("#anchor");
			 *
			 * // scroll to the beginning of a scene
			 * var scene = new ScrollMagic.Scene({offset: 200});
			 * controller.scrollTo(scene);
			 *
			 * // define a new scroll position modification function (jQuery animate instead of jump)
			 * controller.scrollTo(function (newScrollPos) {
			 *	$("html, body").animate({scrollTop: newScrollPos});
			 * });
			 * controller.scrollTo(100); // call as usual, but the new function will be used instead
			 *
			 * // define a new scroll function with an additional parameter
			 * controller.scrollTo(function (newScrollPos, message) {
			 *  console.log(message);
			 *	$(this).animate({scrollTop: newScrollPos});
			 * });
			 * // call as usual, but supply an extra parameter to the defined custom function
			 * controller.scrollTo(100, "my message");
			 *
			 * // define a new scroll function with an additional parameter containing multiple variables
			 * controller.scrollTo(function (newScrollPos, options) {
			 *  someGlobalVar = options.a + options.b;
			 *	$(this).animate({scrollTop: newScrollPos});
			 * });
			 * // call as usual, but supply an extra parameter containing multiple options
			 * controller.scrollTo(100, {a: 1, b: 2});
			 *
			 * // define a new scroll function with a callback supplied as an additional parameter
			 * controller.scrollTo(function (newScrollPos, callback) {
			 *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
			 * });
			 * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
			 * controller.scrollTo(100, function() {
			 *	console.log("scroll has finished.");
			 * });
			 *
			 * @param {mixed} scrollTarget - The supplied argument can be one of these types:
			 * 1. `number` -> The container will scroll to this new scroll offset.
			 * 2. `string` or `object` -> Can be a selector or a DOM object.  
			 *  The container will scroll to the position of this element.
			 * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
			 * 4. `function` -> This function will be used for future scroll position modifications.  
			 *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
			 *  It may also optionally receive an optional additional parameter (see below)  
			 *  _**NOTE:**  
			 *  All other options will still work as expected, using the new function to scroll._
			 * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
			 * @returns {Controller} Parent object for chaining.
			 */
			this.scrollTo = function (scrollTarget, additionalParameter) {
				if (_util.type.Number(scrollTarget)) { // excecute
					setScrollPos.call(_options.container, scrollTarget, additionalParameter);
				} else if (scrollTarget instanceof ScrollMagic.Scene) { // scroll to scene
					if (scrollTarget.controller() === Controller) { // check if the controller is associated with this scene
						Controller.scrollTo(scrollTarget.scrollOffset(), additionalParameter);
					} else {
						log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", scrollTarget);
					}
				} else if (_util.type.Function(scrollTarget)) { // assign new scroll function
					setScrollPos = scrollTarget;
				} else { // scroll to element
					var elem = _util.get.elements(scrollTarget)[0];
					if (elem) {
						// if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
						while (elem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
							elem = elem.parentNode;
						}
	
						var
						param = _options.vertical ? "top" : "left",
							// which param is of interest ?
							containerOffset = _util.get.offset(_options.container),
							// container position is needed because element offset is returned in relation to document, not in relation to container.
							elementOffset = _util.get.offset(elem);
	
						if (!_isDocument) { // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
							containerOffset[param] -= Controller.scrollPos();
						}
	
						Controller.scrollTo(elementOffset[param] - containerOffset[param], additionalParameter);
					} else {
						log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", scrollTarget);
					}
				}
				return Controller;
			};
	
			/**
			 * **Get** the current scrollPosition or **Set** a new method to calculate it.  
			 * -> **GET**:
			 * When used as a getter this function will return the current scroll position.  
			 * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
			 * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
			 *
			 * -> **SET**:
			 * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
			 * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
			 * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
			 * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
			 * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
			 *
			 * To change the current scroll position please use `Controller.scrollTo()`.
			 * @public
			 *
			 * @example
			 * // get the current scroll Position
			 * var scrollPos = controller.scrollPos();
			 *
			 * // set a new scroll position calculation method
			 * controller.scrollPos(function () {
			 *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
			 * });
			 *
			 * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
			 * @returns {(number|Controller)} Current scroll position or parent object for chaining.
			 */
			this.scrollPos = function (scrollPosMethod) {
				if (!arguments.length) { // get
					return getScrollPos.call(Controller);
				} else { // set
					if (_util.type.Function(scrollPosMethod)) {
						getScrollPos = scrollPosMethod;
					} else {
						log(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.");
					}
				}
				return Controller;
			};
	
			/**
			 * **Get** all infos or one in particular about the controller.
			 * @public
			 * @example
			 * // returns the current scroll position (number)
			 * var scrollPos = controller.info("scrollPos");
			 *
			 * // returns all infos as an object
			 * var infos = controller.info();
			 *
			 * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
			 Valid options are:
			 ** `"size"` => the current viewport size of the container
			 ** `"vertical"` => true if vertical scrolling, otherwise false
			 ** `"scrollPos"` => the current scroll position
			 ** `"scrollDirection"` => the last known direction of the scroll
			 ** `"container"` => the container element
			 ** `"isDocument"` => true if container element is the document.
			 * @returns {(mixed|object)} The requested info(s).
			 */
			this.info = function (about) {
				var values = {
					size: _viewPortSize,
					// contains height or width (in regard to orientation);
					vertical: _options.vertical,
					scrollPos: _scrollPos,
					scrollDirection: _scrollDirection,
					container: _options.container,
					isDocument: _isDocument
				};
				if (!arguments.length) { // get all as an object
					return values;
				} else if (values[about] !== undefined) {
					return values[about];
				} else {
					log(1, "ERROR: option \"" + about + "\" is not available");

				}
			};
	
			/**
			 * **Get** or **Set** the current loglevel option value.
			 * @public
			 *
			 * @example
			 * // get the current value
			 * var loglevel = controller.loglevel();
			 *
			 * // set a new value
			 * controller.loglevel(3);
			 *
			 * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
			 * @returns {(number|Controller)} Current loglevel or parent object for chaining.
			 */
			this.loglevel = function (newLoglevel) {
				if (!arguments.length) { // get
					return _options.loglevel;
				} else if (_options.loglevel != newLoglevel) { // set
					_options.loglevel = newLoglevel;
				}
				return Controller;
			};
	
			/**
			 * **Get** or **Set** the current enabled state of the controller.  
			 * This can be used to disable all Scenes connected to the controller without destroying or removing them.
			 * @public
			 *
			 * @example
			 * // get the current value
			 * var enabled = controller.enabled();
			 *
			 * // disable the controller
			 * controller.enabled(false);
			 *
			 * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
			 * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
			 */
			this.enabled = function (newState) {
				if (!arguments.length) { // get
					return _enabled;
				} else if (_enabled != newState) { // set
					_enabled = !! newState;
					Controller.updateScene(_sceneObjects, true);
				}
				return Controller;
			};
	
			/**
			 * Destroy the Controller, all Scenes and everything.
			 * @public
			 *
			 * @example
			 * // without resetting the scenes
			 * controller = controller.destroy();
			 *
			 * // with scene reset
			 * controller = controller.destroy(true);
			 *
			 * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
			 * @returns {null} Null to unset handler variables.
			 */
			this.destroy = function (resetScenes) {
				window.clearTimeout(_refreshTimeout);
				var i = _sceneObjects.length;
				while (i--) {
					_sceneObjects[i].destroy(resetScenes);
				}
				_options.container.removeEventListener("resize", onChange);
				_options.container.removeEventListener("scroll", onChange);
				_util.cAF(_updateTimeout);
				log(3, "destroyed " + NAMESPACE + " (reset: " + (resetScenes ? "true" : "false") + ")");
				return null;
			};
	
			// INIT
			construct();
			return Controller;
		};
	
		// store pagewide controller options
		var CONTROLLER_OPTIONS = {
			defaults: {
				container: window,
				vertical: true,
				globalSceneOptions: {},
				loglevel: 2,
				refreshInterval: 100
			}
		};
	/*
	 * method used to add an option to ScrollMagic Scenes.
	 */
		ScrollMagic.Controller.addOption = function (name, defaultValue) {
			CONTROLLER_OPTIONS.defaults[name] = defaultValue;
		};
		// instance extension function for plugins
		ScrollMagic.Controller.extend = function (extension) {
			var oldClass = this;
			ScrollMagic.Controller = function () {
				oldClass.apply(this, arguments);
				this.$super = _util.extend({}, this); // copy parent state
				return extension.apply(this, arguments) || this;
			};
			_util.extend(ScrollMagic.Controller, oldClass); // copy properties
			ScrollMagic.Controller.prototype = oldClass.prototype; // copy prototype
			ScrollMagic.Controller.prototype.constructor = ScrollMagic.Controller; // restore constructor
		};
	
	
		/**
		 * A Scene defines where the controller should react and how.
		 *
		 * @class
		 *
		 * @example
		 * // create a standard scene and add it to a controller
		 * new ScrollMagic.Scene()
		 *		.addTo(controller);
		 *
		 * // create a scene with custom options and assign a handler to it.
		 * var scene = new ScrollMagic.Scene({
		 * 		duration: 100,
		 *		offset: 200,
		 *		triggerHook: "onEnter",
		 *		reverse: false
		 * });
		 *
		 * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
		 Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
		 When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
		 * @param {(number|function)} [options.duration=0] - The duration of the scene. 
		 If `0` tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.  
		 A function retuning the duration value is also supported. Please see `Scene.duration()` for details.
		 * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
		 * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
		 * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
		 Can also be defined using a string:
		 ** `"onEnter"` => `1`
		 ** `"onCenter"` => `0.5`
		 ** `"onLeave"` => `0`
		 * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
		 * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
		 ** `0` => silent
		 ** `1` => errors
		 ** `2` => errors, warnings
		 ** `3` => errors, warnings, debuginfo
		 * 
		 */
		ScrollMagic.Scene = function (options) {
	
	/*
		 * ----------------------------------------------------------------
		 * settings
		 * ----------------------------------------------------------------
		 */
	
			var
			NAMESPACE = 'ScrollMagic.Scene',
				SCENE_STATE_BEFORE = 'BEFORE',
				SCENE_STATE_DURING = 'DURING',
				SCENE_STATE_AFTER = 'AFTER',
				DEFAULT_OPTIONS = SCENE_OPTIONS.defaults;
	
	/*
		 * ----------------------------------------------------------------
		 * private vars
		 * ----------------------------------------------------------------
		 */
	
			var
			Scene = this,
				_options = _util.extend({}, DEFAULT_OPTIONS, options),
				_state = SCENE_STATE_BEFORE,
				_progress = 0,
				_scrollOffset = {
					start: 0,
					end: 0
				},
				// reflects the controllers's scroll position for the start and end of the scene respectively
				_triggerPos = 0,
				_enabled = true,
				_durationUpdateMethod, _controller;
	
			/**
			 * Internal constructor function of the ScrollMagic Scene
			 * @private
			 */
			var construct = function () {
				for (var key in _options) { // check supplied options
					if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
						log(2, "WARNING: Unknown option \"" + key + "\"");
						delete _options[key];
					}
				}
				// add getters/setters for all possible options
				for (var optionName in DEFAULT_OPTIONS) {
					addSceneOption(optionName);
				}
				// validate all options
				validateOption();
			};
	
	/*
	 * ----------------------------------------------------------------
	 * Event Management
	 * ----------------------------------------------------------------
	 */
	
			var _listeners = {};
			/**
			 * Scene start event.  
			 * Fires whenever the scroll position its the starting point of the scene.  
			 * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
			 *
			 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
			 *
			 * @event ScrollMagic.Scene#start
			 *
			 * @example
			 * scene.on("start", function (event) {
			 * 	console.log("Hit start point of scene.");
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {number} event.progress - Reflects the current progress of the scene
			 * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
			 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
			 */
			/**
			 * Scene end event.  
			 * Fires whenever the scroll position its the ending point of the scene.  
			 * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
			 *
			 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
			 *
			 * @event ScrollMagic.Scene#end
			 *
			 * @example
			 * scene.on("end", function (event) {
			 * 	console.log("Hit end point of scene.");
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {number} event.progress - Reflects the current progress of the scene
			 * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
			 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
			 */
			/**
			 * Scene enter event.  
			 * Fires whenever the scene enters the "DURING" state.  
			 * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
			 *
			 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
			 *
			 * @event ScrollMagic.Scene#enter
			 *
			 * @example
			 * scene.on("enter", function (event) {
			 * 	console.log("Scene entered.");
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {number} event.progress - Reflects the current progress of the scene
			 * @property {string} event.state - The current state of the scene - always `"DURING"`
			 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
			 */
			/**
			 * Scene leave event.  
			 * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
			 * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
			 *
			 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
			 *
			 * @event ScrollMagic.Scene#leave
			 *
			 * @example
			 * scene.on("leave", function (event) {
			 * 	console.log("Scene left.");
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {number} event.progress - Reflects the current progress of the scene
			 * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
			 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
			 */
			/**
			 * Scene update event.  
			 * Fires whenever the scene is updated (but not necessarily changes the progress).
			 *
			 * @event ScrollMagic.Scene#update
			 *
			 * @example
			 * scene.on("update", function (event) {
			 * 	console.log("Scene updated.");
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
			 * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
			 * @property {number} event.scrollPos - The current scroll position of the container
			 */
			/**
			 * Scene progress event.  
			 * Fires whenever the progress of the scene changes.
			 *
			 * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
			 *
			 * @event ScrollMagic.Scene#progress
			 *
			 * @example
			 * scene.on("progress", function (event) {
			 * 	console.log("Scene progress changed to " + event.progress);
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {number} event.progress - Reflects the current progress of the scene
			 * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
			 * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
			 */
			/**
			 * Scene change event.  
			 * Fires whenvever a property of the scene is changed.
			 *
			 * @event ScrollMagic.Scene#change
			 *
			 * @example
			 * scene.on("change", function (event) {
			 * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {string} event.what - Indicates what value has been changed
			 * @property {mixed} event.newval - The new value of the changed property
			 */
			/**
			 * Scene shift event.  
			 * Fires whenvever the start or end **scroll offset** of the scene change.
			 * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
			 * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
			 * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
			 *
			 * @event ScrollMagic.Scene#shift
			 * @since 1.1.0
			 *
			 * @example
			 * scene.on("shift", function (event) {
			 * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {string} event.reason - Indicates why the scene has shifted
			 */
			/**
			 * Scene destroy event.  
			 * Fires whenvever the scene is destroyed.
			 * This can be used to tidy up custom behaviour used in events.
			 *
			 * @event ScrollMagic.Scene#destroy
			 * @since 1.1.0
			 *
			 * @example
			 * scene.on("enter", function (event) {
			 *        // add custom action
			 *        $("#my-elem").left("200");
			 *      })
			 *      .on("destroy", function (event) {
			 *        // reset my element to start position
			 *        if (event.reset) {
			 *          $("#my-elem").left("0");
			 *        }
			 *      });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
			 */
			/**
			 * Scene add event.  
			 * Fires when the scene is added to a controller.
			 * This is mostly used by plugins to know that change might be due.
			 *
			 * @event ScrollMagic.Scene#add
			 * @since 2.0.0
			 *
			 * @example
			 * scene.on("add", function (event) {
			 * 	console.log('Scene was added to a new controller.');
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 * @property {boolean} event.controller - The controller object the scene was added to.
			 */
			/**
			 * Scene remove event.  
			 * Fires when the scene is removed from a controller.
			 * This is mostly used by plugins to know that change might be due.
			 *
			 * @event ScrollMagic.Scene#remove
			 * @since 2.0.0
			 *
			 * @example
			 * scene.on("remove", function (event) {
			 * 	console.log('Scene was removed from its controller.');
			 * });
			 *
			 * @property {object} event - The event Object passed to each callback
			 * @property {string} event.type - The name of the event
			 * @property {Scene} event.target - The Scene object that triggered this event
			 */
	
			/**
			 * Add one ore more event listener.  
			 * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
			 * @method ScrollMagic.Scene#on
			 *
			 * @example
			 * function callback (event) {
			 * 		console.log("Event fired! (" + event.type + ")");
			 * }
			 * // add listeners
			 * scene.on("change update progress start end enter leave", callback);
			 *
			 * @param {string} names - The name or names of the event the callback should be attached to.
			 * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
			 * @returns {Scene} Parent object for chaining.
			 */
			this.on = function (names, callback) {
				if (_util.type.Function(callback)) {
					names = names.trim().split(' ');
					names.forEach(function (fullname) {
						var
						nameparts = fullname.split('.'),
							eventname = nameparts[0],
							namespace = nameparts[1];
						if (eventname != "*") { // disallow wildcards
							if (!_listeners[eventname]) {
								_listeners[eventname] = [];
							}
							_listeners[eventname].push({
								namespace: namespace || '',
								callback: callback
							});
						}
					});
				} else {
					log(1, "ERROR when calling '.on()': Supplied callback for '" + names + "' is not a valid function!");
				}
				return Scene;
			};
	
			/**
			 * Remove one or more event listener.
			 * @method ScrollMagic.Scene#off
			 *
			 * @example
			 * function callback (event) {
			 * 		console.log("Event fired! (" + event.type + ")");
			 * }
			 * // add listeners
			 * scene.on("change update", callback);
			 * // remove listeners
			 * scene.off("change update", callback);
			 *
			 * @param {string} names - The name or names of the event that should be removed.
			 * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
			 * @returns {Scene} Parent object for chaining.
			 */
			this.off = function (names, callback) {
				if (!names) {
					log(1, "ERROR: Invalid event name supplied.");
					return Scene;
				}
				names = names.trim().split(' ');
				names.forEach(function (fullname, key) {
					var
					nameparts = fullname.split('.'),
						eventname = nameparts[0],
						namespace = nameparts[1] || '',
						removeList = eventname === '*' ? Object.keys(_listeners) : [eventname];
					removeList.forEach(function (remove) {
						var
						list = _listeners[remove] || [],
							i = list.length;
						while (i--) {
							var listener = list[i];
							if (listener && (namespace === listener.namespace || namespace === '*') && (!callback || callback == listener.callback)) {
								list.splice(i, 1);
							}
						}
						if (!list.length) {
							delete _listeners[remove];
						}
					});
				});
				return Scene;
			};
	
			/**
			 * Trigger an event.
			 * @method ScrollMagic.Scene#trigger
			 *
			 * @example
			 * this.trigger("change");
			 *
			 * @param {string} name - The name of the event that should be triggered.
			 * @param {object} [vars] - An object containing info that should be passed to the callback.
			 * @returns {Scene} Parent object for chaining.
			 */
			this.trigger = function (name, vars) {
				if (name) {
					var
					nameparts = name.trim().split('.'),
						eventname = nameparts[0],
						namespace = nameparts[1],
						listeners = _listeners[eventname];
					log(3, 'event fired:', eventname, vars ? "->" : '', vars || '');
					if (listeners) {
						listeners.forEach(function (listener, key) {
							if (!namespace || namespace === listener.namespace) {
								listener.callback.call(Scene, new ScrollMagic.Event(eventname, listener.namespace, Scene, vars));
							}
						});
					}
				} else {
					log(1, "ERROR: Invalid event name supplied.");
				}
				return Scene;
			};
	
			// set event listeners
			Scene.on("change.internal", function (e) {
				if (e.what !== "loglevel" && e.what !== "tweenChanges") { // no need for a scene update scene with these options...
					if (e.what === "triggerElement") {
						updateTriggerElementPosition();
					} else if (e.what === "reverse") { // the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
						Scene.update();
					}
				}
			}).on("shift.internal", function (e) {
				updateScrollOffset();
				Scene.update(); // update scene to reflect new position
			});
	
			/**
			 * Send a debug message to the console.
			 * @private
			 * but provided publicly with _log for plugins
			 *
			 * @param {number} loglevel - The loglevel required to initiate output for the message.
			 * @param {...mixed} output - One or more variables that should be passed to the console.
			 */
			var log = this._log = function (loglevel, output) {
				if (_options.loglevel >= loglevel) {
					Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");
					_util.log.apply(window, arguments);
				}
			};
	
			/**
			 * Add the scene to a controller.  
			 * This is the equivalent to `Controller.addScene(scene)`.
			 * @method ScrollMagic.Scene#addTo
			 *
			 * @example
			 * // add a scene to a ScrollMagic Controller
			 * scene.addTo(controller);
			 *
			 * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
			 * @returns {Scene} Parent object for chaining.
			 */
			this.addTo = function (controller) {
				if (!(controller instanceof ScrollMagic.Controller)) {
					log(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
				} else if (_controller != controller) {
					// new controller
					if (_controller) { // was associated to a different controller before, so remove it...
						_controller.removeScene(Scene);
					}
					_controller = controller;
					validateOption();
					updateDuration(true);
					updateTriggerElementPosition(true);
					updateScrollOffset();
					_controller.info("container").addEventListener('resize', onContainerResize);
					controller.addScene(Scene);
					Scene.trigger("add", {
						controller: _controller
					});
					log(3, "added " + NAMESPACE + " to controller");
					Scene.update();
				}
				return Scene;
			};
	
			/**
			 * **Get** or **Set** the current enabled state of the scene.  
			 * This can be used to disable this scene without removing or destroying it.
			 * @method ScrollMagic.Scene#enabled
			 *
			 * @example
			 * // get the current value
			 * var enabled = scene.enabled();
			 *
			 * // disable the scene
			 * scene.enabled(false);
			 *
			 * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
			 * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
			 */
			this.enabled = function (newState) {
				if (!arguments.length) { // get
					return _enabled;
				} else if (_enabled != newState) { // set
					_enabled = !! newState;
					Scene.update(true);
				}
				return Scene;
			};
	
			/**
			 * Remove the scene from the controller.  
			 * This is the equivalent to `Controller.removeScene(scene)`.
			 * The scene will not be updated anymore until you readd it to a controller.
			 * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
			 * @method ScrollMagic.Scene#remove
			 * @example
			 * // remove the scene from its controller
			 * scene.remove();
			 *
			 * @returns {Scene} Parent object for chaining.
			 */
			this.remove = function () {
				if (_controller) {
					_controller.info("container").removeEventListener('resize', onContainerResize);
					var tmpParent = _controller;
					_controller = undefined;
					tmpParent.removeScene(Scene);
					Scene.trigger("remove");
					log(3, "removed " + NAMESPACE + " from controller");
				}
				return Scene;
			};
	
			/**
			 * Destroy the scene and everything.
			 * @method ScrollMagic.Scene#destroy
			 * @example
			 * // destroy the scene without resetting the pin and tween to their initial positions
			 * scene = scene.destroy();
			 *
			 * // destroy the scene and reset the pin and tween
			 * scene = scene.destroy(true);
			 *
			 * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
			 * @returns {null} Null to unset handler variables.
			 */
			this.destroy = function (reset) {
				Scene.trigger("destroy", {
					reset: reset
				});
				Scene.remove();
				Scene.off("*.*");
				log(3, "destroyed " + NAMESPACE + " (reset: " + (reset ? "true" : "false") + ")");
				return null;
			};
	
	
			/**
			 * Updates the Scene to reflect the current state.  
			 * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
			 * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
			 * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
			 * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
			 * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
			 * @method ScrollMagic.Scene#update
			 * @example
			 * // update the scene on next tick
			 * scene.update();
			 *
			 * // update the scene immediately
			 * scene.update(true);
			 *
			 * @fires Scene.update
			 *
			 * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
			 * @returns {Scene} Parent object for chaining.
			 */
			this.update = function (immediately) {
				if (_controller) {
					if (immediately) {
						if (_controller.enabled() && _enabled) {
							var
							scrollPos = _controller.info("scrollPos"),
								newProgress;
	
							if (_options.duration > 0) {
								newProgress = (scrollPos - _scrollOffset.start) / (_scrollOffset.end - _scrollOffset.start);
							} else {
								newProgress = scrollPos >= _scrollOffset.start ? 1 : 0;
							}
	
							Scene.trigger("update", {
								startPos: _scrollOffset.start,
								endPos: _scrollOffset.end,
								scrollPos: scrollPos
							});
	
							Scene.progress(newProgress);
						} else if (_pin && _state === SCENE_STATE_DURING) {
							updatePinState(true); // unpin in position
						}
					} else {
						_controller.updateScene(Scene, false);
					}
				}
				return Scene;
			};
	
			/**
			 * Updates dynamic scene variables like the trigger element position or the duration.
			 * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
			 * 
			 * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
			 * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
			 *
			 * @method ScrollMagic.Scene#refresh
			 * @since 1.1.0
			 * @example
			 * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
			 * 
			 * // change the position of the trigger
			 * $("#trigger").css("top", 500);
			 * // immediately let the scene know of this change
			 * scene.refresh();
			 *
			 * @fires {@link Scene.shift}, if the trigger element position or the duration changed
			 * @fires {@link Scene.change}, if the duration changed
			 *
			 * @returns {Scene} Parent object for chaining.
			 */
			this.refresh = function () {
				updateDuration();
				updateTriggerElementPosition();
				// update trigger element position
				return Scene;
			};
	
			/**
			 * **Get** or **Set** the scene's progress.  
			 * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
			 * The order in which the events are fired depends on the duration of the scene:
			 *  1. Scenes with `duration == 0`:  
			 *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
			 *  When the trigger position of the scene is passed the events are always fired in this order:  
			 *  `enter`, `start`, `progress` when scrolling forward  
			 *  and  
			 *  `progress`, `start`, `leave` when scrolling in reverse
			 *  2. Scenes with `duration > 0`:  
			 *  Scenes with a set duration have a defined start and end point.  
			 *  When scrolling past the start position of the scene it will fire these events in this order:  
			 *  `enter`, `start`, `progress`  
			 *  When continuing to scroll and passing the end point it will fire these events:  
			 *  `progress`, `end`, `leave`  
			 *  When reversing through the end point these events are fired:  
			 *  `enter`, `end`, `progress`  
			 *  And when continuing to scroll past the start position in reverse it will fire:  
			 *  `progress`, `start`, `leave`  
			 *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
			 * 
			 * In short:  
			 * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
			 * `start` and `end` will always trigger at their respective position.
			 * 
			 * Please review the event descriptions for details on the events and the event object that is passed to the callback.
			 * 
			 * @method ScrollMagic.Scene#progress
			 * @example
			 * // get the current scene progress
			 * var progress = scene.progress();
			 *
			 * // set new scene progress
			 * scene.progress(0.3);
			 *
			 * @fires {@link Scene.enter}, when used as setter
			 * @fires {@link Scene.start}, when used as setter
			 * @fires {@link Scene.progress}, when used as setter
			 * @fires {@link Scene.end}, when used as setter
			 * @fires {@link Scene.leave}, when used as setter
			 *
			 * @param {number} [progress] - The new progress value of the scene `[0-1]`.
			 * @returns {number} `get` -  Current scene progress.
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
			this.progress = function (progress) {
				if (!arguments.length) { // get
					return _progress;
				} else { // set
					var
					doUpdate = false,
						oldState = _state,
						scrollDirection = _controller ? _controller.info("scrollDirection") : 'PAUSED',
						reverseOrForward = _options.reverse || progress >= _progress;
					if (_options.duration === 0) {
						// zero duration scenes
						doUpdate = _progress != progress;
						_progress = progress < 1 && reverseOrForward ? 0 : 1;
						_state = _progress === 0 ? SCENE_STATE_BEFORE : SCENE_STATE_DURING;
					} else {
						// scenes with start and end
						if (progress < 0 && _state !== SCENE_STATE_BEFORE && reverseOrForward) {
							// go back to initial state
							_progress = 0;
							_state = SCENE_STATE_BEFORE;
							doUpdate = true;
						} else if (progress >= 0 && progress < 1 && reverseOrForward) {
							_progress = progress;
							_state = SCENE_STATE_DURING;
							doUpdate = true;
						} else if (progress >= 1 && _state !== SCENE_STATE_AFTER) {
							_progress = 1;
							_state = SCENE_STATE_AFTER;
							doUpdate = true;
						} else if (_state === SCENE_STATE_DURING && !reverseOrForward) {
							updatePinState(); // in case we scrolled backwards mid-scene and reverse is disabled => update the pin position, so it doesn't move back as well.
						}
					}
					if (doUpdate) {
						// fire events
						var
						eventVars = {
							progress: _progress,
							state: _state,
							scrollDirection: scrollDirection
						},
							stateChanged = _state != oldState;
	
						var trigger = function (eventName) { // tmp helper to simplify code
							Scene.trigger(eventName, eventVars);
						};
	
						if (stateChanged) { // enter events
							if (oldState !== SCENE_STATE_DURING) {
								trigger("enter");
								trigger(oldState === SCENE_STATE_BEFORE ? "start" : "end");
							}
						}
						trigger("progress");
						if (stateChanged) { // leave events
							if (_state !== SCENE_STATE_DURING) {
								trigger(_state === SCENE_STATE_BEFORE ? "start" : "end");
								trigger("leave");
							}
						}
					}
	
					return Scene;
				}
			};
	
	
			/**
			 * Update the start and end scrollOffset of the container.
			 * The positions reflect what the controller's scroll position will be at the start and end respectively.
			 * Is called, when:
			 *   - Scene event "change" is called with: offset, triggerHook, duration 
			 *   - scroll container event "resize" is called
			 *   - the position of the triggerElement changes
			 *   - the controller changes -> addTo()
			 * @private
			 */
			var updateScrollOffset = function () {
				_scrollOffset = {
					start: _triggerPos + _options.offset
				};
				if (_controller && _options.triggerElement) {
					// take away triggerHook portion to get relative to top
					_scrollOffset.start -= _controller.info("size") * _options.triggerHook;
				}
				_scrollOffset.end = _scrollOffset.start + _options.duration;
			};
	
			/**
			 * Updates the duration if set to a dynamic function.
			 * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
			 * 
			 * @fires {@link Scene.change}, if the duration changed
			 * @fires {@link Scene.shift}, if the duration changed
			 *
			 * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
			 * @private
			 */
			var updateDuration = function (suppressEvents) {
				// update duration
				if (_durationUpdateMethod) {
					var varname = "duration";
					if (changeOption(varname, _durationUpdateMethod.call(Scene)) && !suppressEvents) { // set
						Scene.trigger("change", {
							what: varname,
							newval: _options[varname]
						});
						Scene.trigger("shift", {
							reason: varname
						});
					}
				}
			};
	
			/**
			 * Updates the position of the triggerElement, if present.
			 * This method is called ...
			 *  - ... when the triggerElement is changed
			 *  - ... when the scene is added to a (new) controller
			 *  - ... in regular intervals from the controller through scene.refresh().
			 * 
			 * @fires {@link Scene.shift}, if the position changed
			 *
			 * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
			 * @private
			 */
			var updateTriggerElementPosition = function (suppressEvents) {
				var
				elementPos = 0,
					telem = _options.triggerElement;
				if (_controller && telem) {
					var
					controllerInfo = _controller.info(),
						containerOffset = _util.get.offset(controllerInfo.container),
						// container position is needed because element offset is returned in relation to document, not in relation to container.
						param = controllerInfo.vertical ? "top" : "left"; // which param is of interest ?
					// if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.
					while (telem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
						telem = telem.parentNode;
					}
	
					var elementOffset = _util.get.offset(telem);
	
					if (!controllerInfo.isDocument) { // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
						containerOffset[param] -= _controller.scrollPos();
					}
	
					elementPos = elementOffset[param] - containerOffset[param];
				}
				var changed = elementPos != _triggerPos;
				_triggerPos = elementPos;
				if (changed && !suppressEvents) {
					Scene.trigger("shift", {
						reason: "triggerElementPosition"
					});
				}
			};
	
			/**
			 * Trigger a shift event, when the container is resized and the triggerHook is > 1.
			 * @private
			 */
			var onContainerResize = function (e) {
				if (_options.triggerHook > 0) {
					Scene.trigger("shift", {
						reason: "containerResize"
					});
				}
			};
	
			var _validate = _util.extend(SCENE_OPTIONS.validate, {
				// validation for duration handled internally for reference to private var _durationMethod
				duration: function (val) {
					if (_util.type.String(val) && val.match(/^(\.|\d)*\d+%$/)) {
						// percentage value
						var perc = parseFloat(val) / 100;
						val = function () {
							return _controller ? _controller.info("size") * perc : 0;
						};
					}
					if (_util.type.Function(val)) {
						// function
						_durationUpdateMethod = val;
						try {
							val = parseFloat(_durationUpdateMethod());
						} catch (e) {
							val = -1; // will cause error below
						}
					}
					// val has to be float
					val = parseFloat(val);
					if (!_util.type.Number(val) || val < 0) {
						if (_durationUpdateMethod) {
							_durationUpdateMethod = undefined;
							throw ["Invalid return value of supplied function for option \"duration\":", val];
						} else {
							throw ["Invalid value for option \"duration\":", val];
						}
					}
					return val;
				}
			});
	
			/**
			 * Checks the validity of a specific or all options and reset to default if neccessary.
			 * @private
			 */
			var validateOption = function (check) {
				check = arguments.length ? [check] : Object.keys(_validate);
				check.forEach(function (optionName, key) {
					var value;
					if (_validate[optionName]) { // there is a validation method for this option
						try { // validate value
							value = _validate[optionName](_options[optionName]);
						} catch (e) { // validation failed -> reset to default
							value = DEFAULT_OPTIONS[optionName];
							var logMSG = _util.type.String(e) ? [e] : e;
							if (_util.type.Array(logMSG)) {
								logMSG[0] = "ERROR: " + logMSG[0];
								logMSG.unshift(1); // loglevel 1 for error msg
								log.apply(this, logMSG);
							} else {
								log(1, "ERROR: Problem executing validation callback for option '" + optionName + "':", e.message);
							}
						} finally {
							_options[optionName] = value;
						}
					}
				});
			};
	
			/**
			 * Helper used by the setter/getters for scene options
			 * @private
			 */
			var changeOption = function (varname, newval) {
				var
				changed = false,
					oldval = _options[varname];
				if (_options[varname] != newval) {
					_options[varname] = newval;
					validateOption(varname); // resets to default if necessary
					changed = oldval != _options[varname];
				}
				return changed;
			};
	
			// generate getters/setters for all options
			var addSceneOption = function (optionName) {
				if (!Scene[optionName]) {
					Scene[optionName] = function (newVal) {
						if (!arguments.length) { // get
							return _options[optionName];
						} else {
							if (optionName === "duration") { // new duration is set, so any previously set function must be unset
								_durationUpdateMethod = undefined;
							}
							if (changeOption(optionName, newVal)) { // set
								Scene.trigger("change", {
									what: optionName,
									newval: _options[optionName]
								});
								if (SCENE_OPTIONS.shifts.indexOf(optionName) > -1) {
									Scene.trigger("shift", {
										reason: optionName
									});
								}
							}
						}
						return Scene;
					};
				}
			};
	
			/**
			 * **Get** or **Set** the duration option value.
			 * As a setter it also accepts a function returning a numeric value.  
			 * This is particularly useful for responsive setups.
			 *
			 * The duration is updated using the supplied function every time `Scene.refresh()` is called, which happens periodically from the controller (see ScrollMagic.Controller option `refreshInterval`).  
			 * _**NOTE:** Be aware that it's an easy way to kill performance, if you supply a function that has high CPU demand.  
			 * Even for size and position calculations it is recommended to use a variable to cache the value. (see example)  
			 * This counts double if you use the same function for multiple scenes._
			 *
			 * @method ScrollMagic.Scene#duration
			 * @example
			 * // get the current duration value
			 * var duration = scene.duration();
			 *
			 * // set a new duration
			 * scene.duration(300);
			 *
			 * // use a function to automatically adjust the duration to the window height.
			 * var durationValueCache;
			 * function getDuration () {
			 *   return durationValueCache;
			 * }
			 * function updateDuration (e) {
			 *   durationValueCache = window.innerHeight;
			 * }
			 * $(window).on("resize", updateDuration); // update the duration when the window size changes
			 * $(window).triggerHandler("resize"); // set to initial value
			 * scene.duration(getDuration); // supply duration method
			 *
			 * @fires {@link Scene.change}, when used as setter
			 * @fires {@link Scene.shift}, when used as setter
			 * @param {(number|function)} [newDuration] - The new duration of the scene.
			 * @returns {number} `get` -  Current scene duration.
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
	
			/**
			 * **Get** or **Set** the offset option value.
			 * @method ScrollMagic.Scene#offset
			 * @example
			 * // get the current offset
			 * var offset = scene.offset();
			 *
			 * // set a new offset
			 * scene.offset(100);
			 *
			 * @fires {@link Scene.change}, when used as setter
			 * @fires {@link Scene.shift}, when used as setter
			 * @param {number} [newOffset] - The new offset of the scene.
			 * @returns {number} `get` -  Current scene offset.
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
	
			/**
			 * **Get** or **Set** the triggerElement option value.
			 * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
			 * @method ScrollMagic.Scene#triggerElement
			 * @example
			 * // get the current triggerElement
			 * var triggerElement = scene.triggerElement();
			 *
			 * // set a new triggerElement using a selector
			 * scene.triggerElement("#trigger");
			 * // set a new triggerElement using a DOM object
			 * scene.triggerElement(document.getElementById("trigger"));
			 *
			 * @fires {@link Scene.change}, when used as setter
			 * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
			 * @returns {(string|object)} `get` -  Current triggerElement.
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
	
			/**
			 * **Get** or **Set** the triggerHook option value.
			 * @method ScrollMagic.Scene#triggerHook
			 * @example
			 * // get the current triggerHook value
			 * var triggerHook = scene.triggerHook();
			 *
			 * // set a new triggerHook using a string
			 * scene.triggerHook("onLeave");
			 * // set a new triggerHook using a number
			 * scene.triggerHook(0.7);
			 *
			 * @fires {@link Scene.change}, when used as setter
			 * @fires {@link Scene.shift}, when used as setter
			 * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
			 * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
	
			/**
			 * **Get** or **Set** the reverse option value.
			 * @method ScrollMagic.Scene#reverse
			 * @example
			 * // get the current reverse option
			 * var reverse = scene.reverse();
			 *
			 * // set new reverse option
			 * scene.reverse(false);
			 *
			 * @fires {@link Scene.change}, when used as setter
			 * @param {boolean} [newReverse] - The new reverse setting of the scene.
			 * @returns {boolean} `get` -  Current reverse option value.
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
	
			/**
			 * **Get** or **Set** the loglevel option value.
			 * @method ScrollMagic.Scene#loglevel
			 * @example
			 * // get the current loglevel
			 * var loglevel = scene.loglevel();
			 *
			 * // set new loglevel
			 * scene.loglevel(3);
			 *
			 * @fires {@link Scene.change}, when used as setter
			 * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
			 * @returns {number} `get` -  Current loglevel.
			 * @returns {Scene} `set` -  Parent object for chaining.
			 */
	
			/**
			 * **Get** the associated controller.
			 * @method ScrollMagic.Scene#controller
			 * @example
			 * // get the controller of a scene
			 * var controller = scene.controller();
			 *
			 * @returns {ScrollMagic.Controller} Parent controller or `undefined`
			 */
			this.controller = function () {
				return _controller;
			};
	
			/**
			 * **Get** the current state.
			 * @method ScrollMagic.Scene#state
			 * @example
			 * // get the current state
			 * var state = scene.state();
			 *
			 * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
			 */
			this.state = function () {
				return _state;
			};
	
			/**
			 * **Get** the current scroll offset for the start of the scene.  
			 * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
			 * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
			 * @method ScrollMagic.Scene#scrollOffset
			 * @example
			 * // get the current scroll offset for the start and end of the scene.
			 * var start = scene.scrollOffset();
			 * var end = scene.scrollOffset() + scene.duration();
			 * console.log("the scene starts at", start, "and ends at", end);
			 *
			 * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
			 */
			this.scrollOffset = function () {
				return _scrollOffset.start;
			};
	
			/**
			 * **Get** the trigger position of the scene (including the value of the `offset` option).  
			 * @method ScrollMagic.Scene#triggerPosition
			 * @example
			 * // get the scene's trigger position
			 * var triggerPosition = scene.triggerPosition();
			 *
			 * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
			 */
			this.triggerPosition = function () {
				var pos = _options.offset; // the offset is the basis
				if (_controller) {
					// get the trigger position
					if (_options.triggerElement) {
						// Element as trigger
						pos += _triggerPos;
					} else {
						// return the height of the triggerHook to start at the beginning
						pos += _controller.info("size") * Scene.triggerHook();
					}
				}
				return pos;
			};
	
			var
			_pin, _pinOptions;
	
			Scene.on("shift.internal", function (e) {
				var durationChanged = e.reason === "duration";
				if ((_state === SCENE_STATE_AFTER && durationChanged) || (_state === SCENE_STATE_DURING && _options.duration === 0)) {
					// if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
					updatePinState();
				}
				if (durationChanged) {
					updatePinDimensions();
				}
			}).on("progress.internal", function (e) {
				updatePinState();
			}).on("add.internal", function (e) {
				updatePinDimensions();
			}).on("destroy.internal", function (e) {
				Scene.removePin(e.reset);
			});
			/**
			 * Update the pin state.
			 * @private
			 */
			var updatePinState = function (forceUnpin) {
				if (_pin && _controller) {
					var
					containerInfo = _controller.info(),
						pinTarget = _pinOptions.spacer.firstChild; // may be pin element or another spacer, if cascading pins
					if (!forceUnpin && _state === SCENE_STATE_DURING) { // during scene or if duration is 0 and we are past the trigger
						// pinned state
						if (_util.css(pinTarget, "position") != "fixed") {
							// change state before updating pin spacer (position changes due to fixed collapsing might occur.)
							_util.css(pinTarget, {
								"position": "fixed"
							});
							// update pin spacer
							updatePinDimensions();
						}
	
						var
						fixedPos = _util.get.offset(_pinOptions.spacer, true),
							// get viewport position of spacer
							scrollDistance = _options.reverse || _options.duration === 0 ? containerInfo.scrollPos - _scrollOffset.start // quicker
							: Math.round(_progress * _options.duration * 10) / 10; // if no reverse and during pin the position needs to be recalculated using the progress
						// add scrollDistance
						fixedPos[containerInfo.vertical ? "top" : "left"] += scrollDistance;
	
						// set new values
						_util.css(_pinOptions.spacer.firstChild, {
							top: fixedPos.top,
							left: fixedPos.left
						});
					} else {
						// unpinned state
						var
						newCSS = {
							position: _pinOptions.inFlow ? "relative" : "absolute",
							top: 0,
							left: 0
						},
							change = _util.css(pinTarget, "position") != newCSS.position;
	
						if (!_pinOptions.pushFollowers) {
							newCSS[containerInfo.vertical ? "top" : "left"] = _options.duration * _progress;
						} else if (_options.duration > 0) { // only concerns scenes with duration
							if (_state === SCENE_STATE_AFTER && parseFloat(_util.css(_pinOptions.spacer, "padding-top")) === 0) {
								change = true; // if in after state but havent updated spacer yet (jumped past pin)
							} else if (_state === SCENE_STATE_BEFORE && parseFloat(_util.css(_pinOptions.spacer, "padding-bottom")) === 0) { // before
								change = true; // jumped past fixed state upward direction
							}
						}
						// set new values
						_util.css(pinTarget, newCSS);
						if (change) {
							// update pin spacer if state changed
							updatePinDimensions();
						}
					}
				}
			};
	
			/**
			 * Update the pin spacer and/or element size.
			 * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
			 * @private
			 */
			var updatePinDimensions = function () {
				if (_pin && _controller && _pinOptions.inFlow) { // no spacerresize, if original position is absolute
					var
					after = (_state === SCENE_STATE_AFTER),
						before = (_state === SCENE_STATE_BEFORE),
						during = (_state === SCENE_STATE_DURING),
						vertical = _controller.info("vertical"),
						pinTarget = _pinOptions.spacer.firstChild,
						// usually the pined element but can also be another spacer (cascaded pins)
						marginCollapse = _util.isMarginCollapseType(_util.css(_pinOptions.spacer, "display")),
						css = {};
	
					// set new size
					// if relsize: spacer -> pin | else: pin -> spacer
					if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
						if (during) {
							_util.css(_pin, {
								"width": _util.get.width(_pinOptions.spacer)
							});
						} else {
							_util.css(_pin, {
								"width": "100%"
							});
						}
					} else {
						// minwidth is needed for cascaded pins.
						css["min-width"] = _util.get.width(vertical ? _pin : pinTarget, true, true);
						css.width = during ? css["min-width"] : "auto";
					}
					if (_pinOptions.relSize.height) {
						if (during) {
							// the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
							_util.css(_pin, {
								"height": _util.get.height(_pinOptions.spacer) - (_pinOptions.pushFollowers ? _options.duration : 0)
							});
						} else {
							_util.css(_pin, {
								"height": "100%"
							});
						}
					} else {
						// margin is only included if it's a cascaded pin to resolve an IE9 bug
						css["min-height"] = _util.get.height(vertical ? pinTarget : _pin, true, !marginCollapse); // needed for cascading pins
						css.height = during ? css["min-height"] : "auto";
					}
	
					// add space for duration if pushFollowers is true
					if (_pinOptions.pushFollowers) {
						css["padding" + (vertical ? "Top" : "Left")] = _options.duration * _progress;
						css["padding" + (vertical ? "Bottom" : "Right")] = _options.duration * (1 - _progress);
					}
					_util.css(_pinOptions.spacer, css);
				}
			};
	
			/**
			 * Updates the Pin state (in certain scenarios)
			 * If the controller container is not the document and we are mid-pin-phase scrolling or resizing the main document can result to wrong pin positions.
			 * So this function is called on resize and scroll of the document.
			 * @private
			 */
			var updatePinInContainer = function () {
				if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
					updatePinState();
				}
			};
	
			/**
			 * Updates the Pin spacer size state (in certain scenarios)
			 * If container is resized during pin and relatively sized the size of the pin might need to be updated...
			 * So this function is called on resize of the container.
			 * @private
			 */
			var updateRelativePinSpacer = function () {
				if (_controller && _pin && // well, duh
				_state === SCENE_STATE_DURING && // element in pinned state?
				( // is width or height relatively sized, but not in relation to body? then we need to recalc.
				((_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) && _util.get.width(window) != _util.get.width(_pinOptions.spacer.parentNode)) || (_pinOptions.relSize.height && _util.get.height(window) != _util.get.height(_pinOptions.spacer.parentNode)))) {
					updatePinDimensions();
				}
			};
	
			/**
			 * Is called, when the mousewhel is used while over a pinned element inside a div container.
			 * If the scene is in fixed state scroll events would be counted towards the body. This forwards the event to the scroll container.
			 * @private
			 */
			var onMousewheelOverPin = function (e) {
				if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) { // in pin state
					e.preventDefault();
					_controller._setScrollPos(_controller.info("scrollPos") - ((e.wheelDelta || e[_controller.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || -e.detail * 30));
				}
			};
	
			/**
			 * Pin an element for the duration of the tween.  
			 * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
			 * Make sure only one pin is applied to an element at the same time.
			 * An element can be pinned multiple times, but only successively.
			 * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
			 * @method ScrollMagic.Scene#setPin
			 * @example
			 * // pin element and push all following elements down by the amount of the pin duration.
			 * scene.setPin("#pin");
			 *
			 * // pin element and keeping all following elements in their place. The pinned element will move past them.
			 * scene.setPin("#pin", {pushFollowers: false});
			 *
			 * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
			 * @param {object} [settings] - settings for the pin
			 * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
			 Ignored, when duration is `0`.
			 * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
			 *
			 * @returns {Scene} Parent object for chaining.
			 */
			this.setPin = function (element, settings) {
				var
				defaultSettings = {
					pushFollowers: true,
					spacerClass: "scrollmagic-pin-spacer"
				};
				settings = _util.extend({}, defaultSettings, settings);
	
				// validate Element
				element = _util.get.elements(element)[0];
				if (!element) {
					log(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
					return Scene; // cancel
				} else if (_util.css(element, "position") === "fixed") {
					log(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.");
					return Scene; // cancel
				}
	
				if (_pin) { // preexisting pin?
					if (_pin === element) {
						// same pin we already have -> do nothing
						return Scene; // cancel
					} else {
						// kill old pin
						Scene.removePin();
					}
	
				}
				_pin = element;
	
				var
				parentDisplay = _pin.parentNode.style.display,
					boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
	
				_pin.parentNode.style.display = 'none'; // hack start to force css to return stylesheet values instead of calculated px values.
				var
				inFlow = _util.css(_pin, "position") != "absolute",
					pinCSS = _util.css(_pin, boundsParams.concat(["display"])),
					sizeCSS = _util.css(_pin, ["width", "height"]);
				_pin.parentNode.style.display = parentDisplay; // hack end.
				if (!inFlow && settings.pushFollowers) {
					log(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.");
					settings.pushFollowers = false;
				}
				window.setTimeout(function () { // wait until all finished, because with responsive duration it will only be set after scene is added to controller
					if (_pin && _options.duration === 0 && settings.pushFollowers) {
						log(2, "WARNING: pushFollowers =", true, "has no effect, when scene duration is 0.");
					}
				}, 0);
	
				// create spacer and insert
				var
				spacer = _pin.parentNode.insertBefore(document.createElement('div'), _pin),
					spacerCSS = _util.extend(pinCSS, {
						position: inFlow ? "relative" : "absolute",
						boxSizing: "content-box",
						mozBoxSizing: "content-box",
						webkitBoxSizing: "content-box"
					});
	
				if (!inFlow) { // copy size if positioned absolutely, to work for bottom/right positioned elements.
					_util.extend(spacerCSS, _util.css(_pin, ["width", "height"]));
				}
	
				_util.css(spacer, spacerCSS);
				spacer.setAttribute(PIN_SPACER_ATTRIBUTE, "");
				_util.addClass(spacer, settings.spacerClass);
	
				// set the pin Options
				_pinOptions = {
					spacer: spacer,
					relSize: { // save if size is defined using % values. if so, handle spacer resize differently...
						width: sizeCSS.width.slice(-1) === "%",
						height: sizeCSS.height.slice(-1) === "%",
						autoFullWidth: sizeCSS.width === "auto" && inFlow && _util.isMarginCollapseType(pinCSS.display)
					},
					pushFollowers: settings.pushFollowers,
					inFlow: inFlow,
					// stores if the element takes up space in the document flow
				};
	
				if (!_pin.___origStyle) {
					_pin.___origStyle = {};
					var
					pinInlineCSS = _pin.style,
						copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
					copyStyles.forEach(function (val) {
						_pin.___origStyle[val] = pinInlineCSS[val] || "";
					});
				}
	
				// if relative size, transfer it to spacer and make pin calculate it...
				if (_pinOptions.relSize.width) {
					_util.css(spacer, {
						width: sizeCSS.width
					});
				}
				if (_pinOptions.relSize.height) {
					_util.css(spacer, {
						height: sizeCSS.height
					});
				}
	
				// now place the pin element inside the spacer	
				spacer.appendChild(_pin);
				// and set new css
				_util.css(_pin, {
					position: inFlow ? "relative" : "absolute",
					margin: "auto",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto"
				});
	
				if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
					_util.css(_pin, {
						boxSizing: "border-box",
						mozBoxSizing: "border-box",
						webkitBoxSizing: "border-box"
					});
				}
	
				// add listener to document to update pin position in case controller is not the document.
				window.addEventListener('scroll', updatePinInContainer);
				window.addEventListener('resize', updatePinInContainer);
				window.addEventListener('resize', updateRelativePinSpacer);
				// add mousewheel listener to catch scrolls over fixed elements
				_pin.addEventListener("mousewheel", onMousewheelOverPin);
				_pin.addEventListener("DOMMouseScroll", onMousewheelOverPin);
	
				log(3, "added pin");
	
				// finally update the pin to init
				updatePinState();
	
				return Scene;
			};
	
			/**
			 * Remove the pin from the scene.
			 * @method ScrollMagic.Scene#removePin
			 * @example
			 * // remove the pin from the scene without resetting it (the spacer is not removed)
			 * scene.removePin();
			 *
			 * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
			 * scene.removePin(true);
			 *
			 * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
			 * @returns {Scene} Parent object for chaining.
			 */
			this.removePin = function (reset) {
				if (_pin) {
					if (_state === SCENE_STATE_DURING) {
						updatePinState(true); // force unpin at position
					}
					if (reset || !_controller) { // if there's no controller no progress was made anyway...
						var pinTarget = _pinOptions.spacer.firstChild; // usually the pin element, but may be another spacer (cascaded pins)...
						if (pinTarget.hasAttribute(PIN_SPACER_ATTRIBUTE)) { // copy margins to child spacer
							var
							style = _pinOptions.spacer.style,
								values = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
							margins = {};
							values.forEach(function (val) {
								margins[val] = style[val] || "";
							});
							_util.css(pinTarget, margins);
						}
						_pinOptions.spacer.parentNode.insertBefore(pinTarget, _pinOptions.spacer);
						_pinOptions.spacer.parentNode.removeChild(_pinOptions.spacer);
						if (!_pin.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) { // if it's the last pin for this element -> restore inline styles
							// TODO: only correctly set for first pin (when cascading) - how to fix?
							_util.css(_pin, _pin.___origStyle);
							delete _pin.___origStyle;
						}
					}
					window.removeEventListener('scroll', updatePinInContainer);
					window.removeEventListener('resize', updatePinInContainer);
					window.removeEventListener('resize', updateRelativePinSpacer);
					_pin.removeEventListener("mousewheel", onMousewheelOverPin);
					_pin.removeEventListener("DOMMouseScroll", onMousewheelOverPin);
					_pin = undefined;
					log(3, "removed pin (reset: " + (reset ? "true" : "false") + ")");
				}
				return Scene;
			};
	
	
			var
			_cssClasses, _cssClassElems = [];
	
			Scene.on("destroy.internal", function (e) {
				Scene.removeClassToggle(e.reset);
			});
			/**
			 * Define a css class modification while the scene is active.  
			 * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
			 * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
			 * @method ScrollMagic.Scene#setClassToggle
			 * @example
			 * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
			 * scene.setClassToggle("#my-elem", "myclass");
			 *
			 * // add multiple classes to multiple elements defined by the selector '.classChange'
			 * scene.setClassToggle(".classChange", "class1 class2 class3");
			 *
			 * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
			 * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
			 *
			 * @returns {Scene} Parent object for chaining.
			 */
			this.setClassToggle = function (element, classes) {
				var elems = _util.get.elements(element);
				if (elems.length === 0 || !_util.type.String(classes)) {
					log(1, "ERROR calling method 'setClassToggle()': Invalid " + (elems.length === 0 ? "element" : "classes") + " supplied.");
					return Scene;
				}
				if (_cssClassElems.length > 0) {
					// remove old ones
					Scene.removeClassToggle();
				}
				_cssClasses = classes;
				_cssClassElems = elems;
				Scene.on("enter.internal_class leave.internal_class", function (e) {
					var toggle = e.type === "enter" ? _util.addClass : _util.removeClass;
					_cssClassElems.forEach(function (elem, key) {
						toggle(elem, _cssClasses);
					});
				});
				return Scene;
			};
	
			/**
			 * Remove the class binding from the scene.
			 * @method ScrollMagic.Scene#removeClassToggle
			 * @example
			 * // remove class binding from the scene without reset
			 * scene.removeClassToggle();
			 *
			 * // remove class binding and remove the changes it caused
			 * scene.removeClassToggle(true);
			 *
			 * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
			 * @returns {Scene} Parent object for chaining.
			 */
			this.removeClassToggle = function (reset) {
				if (reset) {
					_cssClassElems.forEach(function (elem, key) {
						_util.removeClass(elem, _cssClasses);
					});
				}
				Scene.off("start.internal_class end.internal_class");
				_cssClasses = undefined;
				_cssClassElems = [];
				return Scene;
			};
	
			// INIT
			construct();
			return Scene;
		};
	
		// store pagewide scene options
		var SCENE_OPTIONS = {
			defaults: {
				duration: 0,
				offset: 0,
				triggerElement: undefined,
				triggerHook: 0.5,
				reverse: true,
				loglevel: 2
			},
			validate: {
				offset: function (val) {
					val = parseFloat(val);
					if (!_util.type.Number(val)) {
						throw ["Invalid value for option \"offset\":", val];
					}
					return val;
				},
				triggerElement: function (val) {
					val = val || undefined;
					if (val) {
						var elem = _util.get.elements(val)[0];
						if (elem) {
							val = elem;
						} else {
							throw ["Element defined in option \"triggerElement\" was not found:", val];
						}
					}
					return val;
				},
				triggerHook: function (val) {
					var translate = {
						"onCenter": 0.5,
						"onEnter": 1,
						"onLeave": 0
					};
					if (_util.type.Number(val)) {
						val = Math.max(0, Math.min(parseFloat(val), 1)); //  make sure its betweeen 0 and 1
					} else if (val in translate) {
						val = translate[val];
					} else {
						throw ["Invalid value for option \"triggerHook\": ", val];
					}
					return val;
				},
				reverse: function (val) {
					return !!val; // force boolean
				},
				loglevel: function (val) {
					val = parseInt(val);
					if (!_util.type.Number(val) || val < 0 || val > 3) {
						throw ["Invalid value for option \"loglevel\":", val];
					}
					return val;
				}
			},
			// holder for  validation methods. duration validation is handled in 'getters-setters.js'
			shifts: ["duration", "offset", "triggerHook"],
			// list of options that trigger a `shift` event
		};
	/*
	 * method used to add an option to ScrollMagic Scenes.
	 * TODO: DOC (private for dev)
	 */
		ScrollMagic.Scene.addOption = function (name, defaultValue, validationCallback, shifts) {
			if (!(name in SCENE_OPTIONS.defaults)) {
				SCENE_OPTIONS.defaults[name] = defaultValue;
				SCENE_OPTIONS.validate[name] = validationCallback;
				if (shifts) {
					SCENE_OPTIONS.shifts.push(name);
				}
			} else {
				ScrollMagic._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + name + "', because it already exists.");
			}
		};
		// instance extension function for plugins
		// TODO: DOC (private for dev)
		ScrollMagic.Scene.extend = function (extension) {
			var oldClass = this;
			ScrollMagic.Scene = function () {
				oldClass.apply(this, arguments);
				this.$super = _util.extend({}, this); // copy parent state
				return extension.apply(this, arguments) || this;
			};
			_util.extend(ScrollMagic.Scene, oldClass); // copy properties
			ScrollMagic.Scene.prototype = oldClass.prototype; // copy prototype
			ScrollMagic.Scene.prototype.constructor = ScrollMagic.Scene; // restore constructor
		};
	
	
		/**
		 * TODO: DOCS (private for dev)
		 * @class
		 * @private
		 */
	
		ScrollMagic.Event = function (type, namespace, target, vars) {
			vars = vars || {};
			for (var key in vars) {
				this[key] = vars[key];
			}
			this.type = type;
			this.target = this.currentTarget = target;
			this.namespace = namespace || '';
			this.timeStamp = this.timestamp = Date.now();
			return this;
		};
	
	/*
	 * TODO: DOCS (private for dev)
	 */
	
		var _util = ScrollMagic._util = (function (window) {
			var U = {},
				i;
	
			/**
			 * ------------------------------
			 * internal helpers
			 * ------------------------------
			 */
	
			// parse float and fall back to 0.
			var floatval = function (number) {
				return parseFloat(number) || 0;
			};
			// get current style IE safe (otherwise IE would return calculated values for 'auto')
			var _getComputedStyle = function (elem) {
				return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem);
			};
	
			// get element dimension (width or height)
			var _dimension = function (which, elem, outer, includeMargin) {
				elem = (elem === document) ? window : elem;
				if (elem === window) {
					includeMargin = false;
				} else if (!_type.DomElement(elem)) {
					return 0;
				}
				which = which.charAt(0).toUpperCase() + which.substr(1).toLowerCase();
				var dimension = (outer ? elem['offset' + which] || elem['outer' + which] : elem['client' + which] || elem['inner' + which]) || 0;
				if (outer && includeMargin) {
					var style = _getComputedStyle(elem);
					dimension += which === 'Height' ? floatval(style.marginTop) + floatval(style.marginBottom) : floatval(style.marginLeft) + floatval(style.marginRight);
				}
				return dimension;
			};
			// converts 'margin-top' into 'marginTop'
			var _camelCase = function (str) {
				return str.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (g) {
					return g[1].toUpperCase();
				});
			};
	
			/**
			 * ------------------------------
			 * external helpers
			 * ------------------------------
			 */
	
			// extend obj – same as jQuery.extend({}, objA, objB)
			U.extend = function (obj) {
				obj = obj || {};
				for (i = 1; i < arguments.length; i++) {
					if (!arguments[i]) {
						continue;
					}
					for (var key in arguments[i]) {
						if (arguments[i].hasOwnProperty(key)) {
							obj[key] = arguments[i][key];
						}
					}
				}
				return obj;
			};
	
			// check if a css display type results in margin-collapse or not
			U.isMarginCollapseType = function (str) {
				return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(str) > -1;
			};
	
			// implementation of requestAnimationFrame
			// based on https://gist.github.com/paulirish/1579671
			var
			lastTime = 0,
				vendors = ['ms', 'moz', 'webkit', 'o'];
			var _requestAnimationFrame = window.requestAnimationFrame;
			var _cancelAnimationFrame = window.cancelAnimationFrame;
			// try vendor prefixes if the above doesn't work
			for (i = 0; !_requestAnimationFrame && i < vendors.length; ++i) {
				_requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
				_cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
			}
	
			// fallbacks
			if (!_requestAnimationFrame) {
				_requestAnimationFrame = function (callback) {
					var
					currTime = new Date().getTime(),
						timeToCall = Math.max(0, 16 - (currTime - lastTime)),
						id = window.setTimeout(function () {
							callback(currTime + timeToCall);
						}, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			}
			if (!_cancelAnimationFrame) {
				_cancelAnimationFrame = function (id) {
					window.clearTimeout(id);
				};
			}
			U.rAF = _requestAnimationFrame.bind(window);
			U.cAF = _cancelAnimationFrame.bind(window);
	
			var
			loglevels = ["error", "warn", "log"],
				console = window.console || {};
	
			console.log = console.log ||
			function () {}; // no console log, well - do nothing then...
			// make sure methods for all levels exist.
			for (i = 0; i < loglevels.length; i++) {
				var method = loglevels[i];
				if (!console[method]) {
					console[method] = console.log; // prefer .log over nothing
				}
			}
			U.log = function (loglevel) {
				if (loglevel > loglevels.length || loglevel <= 0) loglevel = loglevels.length;
				var now = new Date(),
					time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + ":" + ("00" + now.getMilliseconds()).slice(-3),
					method = loglevels[loglevel - 1],
					args = Array.prototype.splice.call(arguments, 1),
					func = Function.prototype.bind.call(console[method], console);
				args.unshift(time);
				func.apply(console, args);
			};
	
			/**
			 * ------------------------------
			 * type testing
			 * ------------------------------
			 */
	
			var _type = U.type = function (v) {
				return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
			};
			_type.String = function (v) {
				return _type(v) === 'string';
			};
			_type.Function = function (v) {
				return _type(v) === 'function';
			};
			_type.Array = function (v) {
				return Array.isArray(v);
			};
			_type.Number = function (v) {
				return !_type.Array(v) && (v - parseFloat(v) + 1) >= 0;
			};
			_type.DomElement = function (o) {
				return (
				typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
			};
	
			/**
			 * ------------------------------
			 * DOM Element info
			 * ------------------------------
			 */
			// always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors
			var _get = U.get = {};
			_get.elements = function (selector) {
				var arr = [];
				if (_type.String(selector)) {
					try {
						selector = document.querySelectorAll(selector);
					} catch (e) { // invalid selector
						return arr;
					}
				}
				if (_type(selector) === 'nodelist' || _type.Array(selector)) {
					for (var i = 0, ref = arr.length = selector.length; i < ref; i++) { // list of elements
						var elem = selector[i];
						arr[i] = _type.DomElement(elem) ? elem : _get.elements(elem); // if not an element, try to resolve recursively
					}
				} else if (_type.DomElement(selector) || selector === document || selector === window) {
					arr = [selector]; // only the element
				}
				return arr;
			};
			// get scroll top value
			_get.scrollTop = function (elem) {
				return (elem && typeof elem.scrollTop === 'number') ? elem.scrollTop : window.pageYOffset || 0;
			};
			// get scroll left value
			_get.scrollLeft = function (elem) {
				return (elem && typeof elem.scrollLeft === 'number') ? elem.scrollLeft : window.pageXOffset || 0;
			};
			// get element height
			_get.width = function (elem, outer, includeMargin) {
				return _dimension('width', elem, outer, includeMargin);
			};
			// get element width
			_get.height = function (elem, outer, includeMargin) {
				return _dimension('height', elem, outer, includeMargin);
			};
	
			// get element position (optionally relative to viewport)
			_get.offset = function (elem, relativeToViewport) {
				var offset = {
					top: 0,
					left: 0
				};
				if (elem && elem.getBoundingClientRect) { // check if available
					var rect = elem.getBoundingClientRect();
					offset.top = rect.top;
					offset.left = rect.left;
					if (!relativeToViewport) { // clientRect is by default relative to viewport...
						offset.top += _get.scrollTop();
						offset.left += _get.scrollLeft();
					}
				}
				return offset;
			};
	
			/**
			 * ------------------------------
			 * DOM Element manipulation
			 * ------------------------------
			 */
	
			U.addClass = function (elem, classname) {
				if (classname) {
					if (elem.classList) elem.classList.add(classname);
					else elem.className += ' ' + classname;
				}
			};
			U.removeClass = function (elem, classname) {
				if (classname) {
					if (elem.classList) elem.classList.remove(classname);
					else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			};
			// if options is string -> returns css value
			// if options is array -> returns object with css value pairs
			// if options is object -> set new css values
			U.css = function (elem, options) {
				if (_type.String(options)) {
					return _getComputedStyle(elem)[_camelCase(options)];
				} else if (_type.Array(options)) {
					var
					obj = {},
						style = _getComputedStyle(elem);
					options.forEach(function (option, key) {
						obj[option] = style[_camelCase(option)];
					});
					return obj;
				} else {
					for (var option in options) {
						var val = options[option];
						if (val == parseFloat(val)) { // assume pixel for seemingly numerical values
							val += 'px';
						}
						elem.style[_camelCase(option)] = val;
					}
				}
			};
	
			return U;
		}(window || {}));
	
		ScrollMagic.Scene.prototype.addIndicators = function () {
			ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');
			return this;
		};
		ScrollMagic.Scene.prototype.removeIndicators = function () {
			ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');
			return this;
		};
		ScrollMagic.Scene.prototype.setTween = function () {
			ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');
			return this;
		};
		ScrollMagic.Scene.prototype.removeTween = function () {
			ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');
			return this;
		};
		ScrollMagic.Scene.prototype.setVelocity = function () {
			ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');
			return this;
		};
		ScrollMagic.Scene.prototype.removeVelocity = function () {
			ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');
			return this;
		};
	
		return ScrollMagic;
	}));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
	/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
	!function(a){function b(a){var b=a.length,d=c.type(a);return"function"===d||c.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a}if(!a.jQuery){var c=function(a,b){return new c.fn.init(a,b)};c.isWindow=function(a){return null!=a&&a==a.window},c.type=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?e[g.call(a)]||"object":typeof a},c.isArray=Array.isArray||function(a){return"array"===c.type(a)},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(d){return!1}for(b in a);return void 0===b||f.call(a,b)},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;g>f&&(e=c.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=c.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=c.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=c.call(a[f],f,a[f]),e===!1)break;return a},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b]}else if(void 0!==b){var f=a[c.expando]||(a[c.expando]=++c.uuid);return d[f]=d[f]||{},d[f][b]=e,e}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&c.each(b,function(a,b){delete f[b]})},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=typeof h&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);j>i;i++)if(null!=(f=arguments[i]))for(e in f)a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d));return h},c.queue=function(a,d,e){function f(a,c){var d=c||[];return null!=a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;)a[e++]=b[d++];if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[]}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b)}))})},c.fn=c.prototype={init:function(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.")},offset:function(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function a(){for(var a=this.offsetParent||document;a&&"html"===!a.nodeType.toLowerCase&&"static"===a.style.position;)a=a.offsetParent;return a||document}var b=this[0],a=a.apply(b),d=this.offset(),e=/^(?:body|html)$/i.test(a.nodeName)?{top:0,left:0}:c(a).offset();return d.top-=parseFloat(b.style.marginTop)||0,d.left-=parseFloat(b.style.marginLeft)||0,a.style&&(e.top+=parseFloat(a.style.borderTopWidth)||0,e.left+=parseFloat(a.style.borderLeftWidth)||0),{top:d.top-e.top,left:d.left-e.left}}};var d={};c.expando="velocity"+(new Date).getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++)e["[object "+h[i]+"]"]=h[i].toLowerCase();c.fn.init.prototype=c.fn,a.Velocity={Utilities:c}}}(window),function(a){"object"==typeof module&&"object"==typeof module.exports?module.exports=a(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a()}(function(){return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a}function g(a){var b=m.data(a,"velocity");return null===b?d:b}function h(a){return function(b){return Math.round(b*a)*(1/a)}}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a}function g(a,b){return 3*b-6*a}function h(a){return 3*a}function i(a,b,c){return((f(b,c)*a+g(b,c))*a+h(b))*a}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b)}function k(b,c){for(var e=0;p>e;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f}return c}function l(){for(var b=0;t>b;++b)x[b]=i(b*u,a,d)}function m(b,c,e){var f,g,h=0;do g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;while(Math.abs(f)>r&&++h<s);return g}function n(b){for(var c=0,e=1,f=t-1;e!=f&&x[e]<=b;++e)c+=u;--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0==i?h:m(b,c,c+u)}function o(){y=!0,(a!=c||d!=e)&&l()}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array"in b;if(4!==arguments.length)return!1;for(var w=0;4>w;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e)};z.getControlPoints=function(){return[{x:a,y:c},{x:d,y:e}]};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A},z}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):p.isArray(a)&&4===a.length?i.apply(null,a):!1,c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c}function k(a){if(a){var b=(new Date).getTime(),c=t.State.calls.length;c>1e4&&(t.State.calls=e(t.State.calls));for(var f=0;c>f;f++)if(t.State.calls[f]){var h=t.State.calls[f],i=h[0],j=h[2],n=h[3],o=!!n,q=null;n||(n=t.State.calls[f][3]=b-16);for(var r=Math.min((b-n)/j.duration,1),s=0,u=i.length;u>s;s++){var w=i[s],y=w.element;if(g(y)){var z=!1;if(j.display!==d&&null!==j.display&&"none"!==j.display){if("flex"===j.display){var A=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(A,function(a,b){v.setPropertyValue(y,"display",b)})}v.setPropertyValue(y,"display",j.display)}j.visibility!==d&&"hidden"!==j.visibility&&v.setPropertyValue(y,"visibility",j.visibility);for(var B in w)if("element"!==B){var C,D=w[B],E=p.isString(D.easing)?t.Easings[D.easing]:D.easing;if(1===r)C=D.endValue;else{var F=D.endValue-D.startValue;if(C=D.startValue+F*E(r,j,F),!o&&C===D.currentValue)continue}if(D.currentValue=C,"tween"===B)q=C;else{if(v.Hooks.registered[B]){var G=v.Hooks.getRoot(B),H=g(y).rootPropertyValueCache[G];H&&(D.rootPropertyValue=H)}var I=v.setPropertyValue(y,B,D.currentValue+(0===parseFloat(C)?"":D.unitType),D.rootPropertyValue,D.scrollData);v.Hooks.registered[B]&&(g(y).rootPropertyValueCache[G]=v.Normalizations.registered[G]?v.Normalizations.registered[G]("extract",null,I[1]):I[1]),"transform"===I[0]&&(z=!0)}}j.mobileHA&&g(y).transformCache.translate3d===d&&(g(y).transformCache.translate3d="(0px, 0px, 0px)",z=!0),z&&v.flushTransformCache(y)}}j.display!==d&&"none"!==j.display&&(t.State.calls[f][2].display=!1),j.visibility!==d&&"hidden"!==j.visibility&&(t.State.calls[f][2].visibility=!1),j.progress&&j.progress.call(h[1],h[1],r,Math.max(0,n+j.duration-b),n,q),1===r&&l(f)}}t.State.isTicking&&x(k)}function l(a,b){if(!t.State.calls[a])return!1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility)),f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&g(l)){g(l).isAnimating=!1,g(l).rootPropertyValueCache={};var n=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=g(l).transformCache[b];g(l).transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(n=!0,delete g(l).transformCache[b])}),f.mobileHA&&(n=!0,delete g(l).transformCache.translate3d),n&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e)}catch(o){setTimeout(function(){throw o},1)}h&&f.loop!==!0&&h(e),g(l)&&f.loop===!0&&!b&&(m.each(g(l).tweensContainer,function(a,b){/^rotate/.test(a)&&360===parseFloat(b.endValue)&&(b.endValue=0,b.startValue=360),/^backgroundPosition/.test(a)&&100===parseFloat(b.endValue)&&"%"===b.unitType&&(b.endValue=0,b.startValue=100)}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue)}t.State.calls[a]=!1;for(var p=0,q=t.State.calls.length;q>p;p++)if(t.State.calls[p]!==!1){i=!0;break}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[])}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof b.SVGElement},isEmptyObject:function(a){for(var b in a)return!1;return!0}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,8>=n&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=n)return void(jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;;)if(h=c(h||i,g),j.push(1+h.x),k+=16,!(Math.abs(h.x)>l&&Math.abs(h.v)>l))break;return f?function(a){return j[a*(j.length-1)|0]}:k}}();t.Easings={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1])});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b]}var c,d,e;if(n)for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")])}for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");for(var a in e){var g=c+e[a],h=a;v.Hooks.registered[g]=[c,h]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},blur:function(a,b,c){switch(a){case"name":return t.State.isFirefox?"filter":"-webkit-filter";case"extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0}return d;case"inject":return parseFloat(c)?"blur("+c+")":"none"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){9>=n||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++)!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return"transform";case"extract":return g(c)===d||g(c).transformCache[b]===d?/^scale/i.test(b)?1:0:g(c).transformCache[b].replace(/[()]/g,"");case"inject":var f=!1;switch(b.substr(0,b.length-1)){case"translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":t.State.isAndroid&&g(c).transformCache[b]===d&&1>e&&(e=1),f=!/(\d)$/i.test(e);break;case"skew":f=!/(deg|\d)$/i.test(e);break;case"rotate":f=!/(deg|\d)$/i.test(e)}return f||(g(c).transformCache[b]="("+e+")"),g(c).transformCache[b]}}}();for(var a=0;a<v.Lists.colors.length;a++)!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return b;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case"inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(t.State.prefixMatches[a])return[t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a&&a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":/^(table)$/i.test(b)?"table":/^(tbody)$/i.test(b)?"table-row-group":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,f){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=m.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?o.getPropertyValue(c):o[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(i=m(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o)}if(!/^[\d-]/.test(i))if(g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c))if(/^(height|width)$/i.test(c))try{i=a.getBBox()[c]}catch(p){i=0}else i=a.getAttribute(c);else i=h(a,v.Names.prefixCheck(c)[0]);return v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||t.State.isAndroid&&!t.State.isChrome)&&g(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,f;m.each(g(a).transformCache,function(b){return e=g(a).transformCache[b],"transformPerspective"===b?(f=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),f&&(c="perspective"+f+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e=d;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=t.CSS.getPropertyValue(f,b));else{var h=t.CSS.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h}}),e};var w=function(){function a(){return h?B.promise||null:i}function e(){function a(){function a(a,b){var c=d,e=d,g=d;return p.isArray(a)?(c=a[0],!p.isArray(a[1])&&/^[\d-]/.test(a[1])||p.isFunction(a[1])||v.RegEx.isHex.test(a[1])?g=a[1]:(p.isString(a[1])&&!v.RegEx.isHex.test(a[1])||p.isArray(a[1]))&&(e=b?a[1]:j(a[1],h.duration),a[2]!==d&&(g=a[2]))):c=a,b||(e=e||h.easing),p.isFunction(c)&&(c=c.call(f,y,x)),p.isFunction(g)&&(g=g.call(f,y,x)),[c||0,e,g]}function l(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function n(){var a={myParent:f.parentNode||c.body,position:v.getPropertyValue(f,"position"),fontSize:v.getPropertyValue(f,"fontSize")},d=a.position===I.lastPosition&&a.myParent===I.lastParent,e=a.fontSize===I.lastFontSize;I.lastParent=a.myParent,I.lastPosition=a.position,I.lastFontSize=a.fontSize;var h=100,i={};if(e&&d)i.emToPx=I.lastEmToPx,i.percentToPxWidth=I.lastPercentToPxWidth,i.percentToPxHeight=I.lastPercentToPxHeight;else{var j=g(f).isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(j),a.myParent.appendChild(j),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(j,b,"hidden")}),t.CSS.setPropertyValue(j,"position",a.position),t.CSS.setPropertyValue(j,"fontSize",a.fontSize),t.CSS.setPropertyValue(j,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(j,b,h+"%")}),t.CSS.setPropertyValue(j,"paddingLeft",h+"em"),i.percentToPxWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(j,"width",null,!0))||1)/h,i.percentToPxHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(j,"height",null,!0))||1)/h,i.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(j,"paddingLeft"))||1)/h,a.myParent.removeChild(j)}return null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100),i.remToPx=I.remToPx,i.vwToPx=I.vwToPx,i.vhToPx=I.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),f),i}if(h.begin&&0===y)try{h.begin.call(o,o)}catch(r){setTimeout(function(){throw r},1)}if("scroll"===C){var u,w,z,A=/^x$/i.test(h.axis)?"Left":"Top",D=parseFloat(h.offset)||0;h.container?p.isWrapped(h.container)||p.isNode(h.container)?(h.container=h.container[0]||h.container,u=h.container["scroll"+A],z=u+m(f).position()[A.toLowerCase()]+D):h.container=null:(u=t.State.scrollAnchor[t.State["scrollProperty"+A]],w=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===A?"Top":"Left")]],z=m(f).offset()[A.toLowerCase()]+D),i={scroll:{rootPropertyValue:!1,startValue:u,currentValue:u,endValue:z,unitType:"",easing:h.easing,scrollData:{container:h.container,direction:A,alternateValue:w}},element:f},t.debug&&console.log("tweensContainer (scroll): ",i.scroll,f)}else if("reverse"===C){if(!g(f).tweensContainer)return void m.dequeue(f,h.queue);"none"===g(f).opts.display&&(g(f).opts.display="auto"),"hidden"===g(f).opts.visibility&&(g(f).opts.visibility="visible"),g(f).opts.loop=!1,g(f).opts.begin=null,g(f).opts.complete=null,s.easing||delete h.easing,s.duration||delete h.duration,h=m.extend({},g(f).opts,h);var E=m.extend(!0,{},g(f).tweensContainer);for(var F in E)if("element"!==F){var G=E[F].startValue;E[F].startValue=E[F].currentValue=E[F].endValue,E[F].endValue=G,p.isEmptyObject(s)||(E[F].easing=h.easing),t.debug&&console.log("reverse tweensContainer ("+F+"): "+JSON.stringify(E[F]),f)}i=E}else if("start"===C){var E;g(f).tweensContainer&&g(f).isAnimating===!0&&(E=g(f).tweensContainer),m.each(q,function(b,c){if(RegExp("^"+v.Lists.colors.join("$|^")+"$").test(b)){var e=a(c,!0),f=e[0],g=e[1],h=e[2];if(v.RegEx.isHex.test(f)){for(var i=["Red","Green","Blue"],j=v.Values.hexToRgb(f),k=h?v.Values.hexToRgb(h):d,l=0;l<i.length;l++){var m=[j[l]];g&&m.push(g),k!==d&&m.push(k[l]),q[b+i[l]]=m}delete q[b]}}});for(var H in q){var K=a(q[H]),L=K[0],M=K[1],N=K[2];H=v.Names.camelCase(H);var O=v.Hooks.getRoot(H),P=!1;if(g(f).isSVG||"tween"===O||v.Names.prefixCheck(O)[1]!==!1||v.Normalizations.registered[O]!==d){(h.display!==d&&null!==h.display&&"none"!==h.display||h.visibility!==d&&"hidden"!==h.visibility)&&/opacity|filter/.test(H)&&!N&&0!==L&&(N=0),h._cacheValues&&E&&E[H]?(N===d&&(N=E[H].endValue+E[H].unitType),P=g(f).rootPropertyValueCache[O]):v.Hooks.registered[H]?N===d?(P=v.getPropertyValue(f,O),N=v.getPropertyValue(f,H,P)):P=v.Hooks.templates[O][1]:N===d&&(N=v.getPropertyValue(f,H));var Q,R,S,T=!1;if(Q=l(H,N),N=Q[0],S=Q[1],Q=l(H,L),L=Q[0].replace(/^([+-\/*])=/,function(a,b){return T=b,""}),R=Q[1],N=parseFloat(N)||0,L=parseFloat(L)||0,"%"===R&&(/^(fontSize|lineHeight)$/.test(H)?(L/=100,R="em"):/^scale/.test(H)?(L/=100,R=""):/(Red|Green|Blue)$/i.test(H)&&(L=L/100*255,R="")),/[\/*]/.test(T))R=S;else if(S!==R&&0!==N)if(0===L)R=S;else{e=e||n();var U=/margin|padding|left|right|width|text|word|letter/i.test(H)||/X$/.test(H)||"x"===H?"x":"y";switch(S){case"%":N*="x"===U?e.percentToPxWidth:e.percentToPxHeight;break;case"px":break;default:N*=e[S+"ToPx"]}switch(R){case"%":N*=1/("x"===U?e.percentToPxWidth:e.percentToPxHeight);break;case"px":break;default:N*=1/e[R+"ToPx"]}}switch(T){case"+":L=N+L;break;case"-":L=N-L;break;case"*":L=N*L;break;case"/":L=N/L}i[H]={rootPropertyValue:P,startValue:N,currentValue:N,endValue:L,unitType:R,easing:M},t.debug&&console.log("tweensContainer ("+H+"): "+JSON.stringify(i[H]),f)}else t.debug&&console.log("Skipping ["+O+"] due to a lack of browser support.")}i.element=f}i.element&&(v.Values.addClass(f,"velocity-animating"),J.push(i),""===h.queue&&(g(f).tweensContainer=i,g(f).opts=h),g(f).isAnimating=!0,y===x-1?(t.State.calls.push([J,o,h,null,B.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):y++)}var e,f=this,h=m.extend({},t.defaults,s),i={};switch(g(f)===d&&t.init(f),parseFloat(h.delay)&&h.queue!==!1&&m.queue(f,h.queue,function(a){t.velocityQueueEntryFlag=!0,g(f).delayTimer={setTimeout:setTimeout(a,parseFloat(h.delay)),next:a}}),h.duration.toString().toLowerCase()){case"fast":h.duration=200;break;case"normal":h.duration=r;break;case"slow":h.duration=600;break;default:h.duration=parseFloat(h.duration)||1}t.mock!==!1&&(t.mock===!0?h.duration=h.delay=1:(h.duration*=parseFloat(t.mock)||1,h.delay*=parseFloat(t.mock)||1)),h.easing=j(h.easing,h.duration),h.begin&&!p.isFunction(h.begin)&&(h.begin=null),h.progress&&!p.isFunction(h.progress)&&(h.progress=null),h.complete&&!p.isFunction(h.complete)&&(h.complete=null),h.display!==d&&null!==h.display&&(h.display=h.display.toString().toLowerCase(),"auto"===h.display&&(h.display=t.CSS.Values.getDisplayType(f))),h.visibility!==d&&null!==h.visibility&&(h.visibility=h.visibility.toString().toLowerCase()),h.mobileHA=h.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,h.queue===!1?h.delay?setTimeout(a,h.delay):a():m.queue(f,h.queue,function(b,c){return c===!0?(B.promise&&B.resolver(o),!0):(t.velocityQueueEntryFlag=!0,void a(b))}),""!==h.queue&&"fx"!==h.queue||"inprogress"===m.queue(f)[0]||m.dequeue(f)}var h,i,n,o,q,s,u=arguments[0]&&(arguments[0].p||m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));if(p.isWrapped(this)?(h=!1,n=0,o=this,i=this):(h=!0,n=1,o=u?arguments[0].elements||arguments[0].e:arguments[0]),o=f(o)){u?(q=arguments[0].properties||arguments[0].p,s=arguments[0].options||arguments[0].o):(q=arguments[n],s=arguments[n+1]);var x=o.length,y=0;if(!/^(stop|finish|finishAll)$/i.test(q)&&!m.isPlainObject(s)){var z=n+1;s={};for(var A=z;A<arguments.length;A++)p.isArray(arguments[A])||!/^(fast|normal|slow)$/i.test(arguments[A])&&!/^\d/.test(arguments[A])?p.isString(arguments[A])||p.isArray(arguments[A])?s.easing=arguments[A]:p.isFunction(arguments[A])&&(s.complete=arguments[A]):s.duration=arguments[A]}var B={promise:null,resolver:null,rejecter:null};h&&t.Promise&&(B.promise=new t.Promise(function(a,b){B.resolver=a,B.rejecter=b}));var C;switch(q){case"scroll":C="scroll";break;case"reverse":C="reverse";break;case"finish":case"finishAll":case"stop":m.each(o,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer),"finishAll"!==q||s!==!0&&!p.isString(s)||(m.each(m.queue(b,p.isString(s)?s:""),function(a,b){p.isFunction(b)&&b()}),m.queue(b,p.isString(s)?s:"",[]))});var D=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=s===d?"":s;return f===!0||b[2].queue===f||s===d&&b[2].queue===!1?void m.each(o,function(c,d){d===e&&((s===!0||p.isString(s))&&(m.each(m.queue(d,p.isString(s)?s:""),function(a,b){p.isFunction(b)&&b(null,!0)
	}),m.queue(d,p.isString(s)?s:"",[])),"stop"===q?(g(d)&&g(d).tweensContainer&&f!==!1&&m.each(g(d).tweensContainer,function(a,b){b.endValue=b.currentValue}),D.push(a)):("finish"===q||"finishAll"===q)&&(b[2].duration=1))}):!0})}),"stop"===q&&(m.each(D,function(a,b){l(b,!0)}),B.promise&&B.resolver(o)),a();default:if(!m.isPlainObject(q)||p.isEmptyObject(q)){if(p.isString(q)&&t.Redirects[q]){var E=m.extend({},s),F=E.duration,G=E.delay||0;return E.backwards===!0&&(o=m.extend(!0,[],o).reverse()),m.each(o,function(a,b){parseFloat(E.stagger)?E.delay=G+parseFloat(E.stagger)*a:p.isFunction(E.stagger)&&(E.delay=G+E.stagger.call(b,a,x)),E.drag&&(E.duration=parseFloat(F)||(/^(callout|transition)/.test(q)?1e3:r),E.duration=Math.max(E.duration*(E.backwards?1-a/x:(a+1)/x),.75*E.duration,200)),t.Redirects[q].call(b,b,E||{},a,x,o,B.promise?B:d)}),a()}var H="Velocity: First argument ("+q+") was not a property map, a known action, or a registered redirect. Aborting.";return B.promise?B.rejecter(new Error(H)):console.log(H),a()}C="start"}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];m.each(o,function(a,b){p.isNode(b)&&e.call(b)});var K,E=m.extend({},t.defaults,s);if(E.loop=parseInt(E.loop),K=2*E.loop-1,E.loop)for(var L=0;K>L;L++){var M={delay:E.delay,progress:E.progress};L===K-1&&(M.display=E.display,M.visibility=E.visibility,M.complete=E.complete),w(o,"reverse",M)}return a()}};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function(a){return setTimeout(function(){a(!0)},16)},k()):x=b.requestAnimationFrame||o}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},n={};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){j&&j.call(g,g);for(var c in l){n[c]=a.style[c];var d=t.CSS.getPropertyValue(a,c);l[c]="Down"===b?[d,0]:[0,d]}n.overflow=a.style.overflow,a.style.overflow="hidden"},i.complete=function(){for(var b in n)a.style[b]=n[b];k&&k.call(g,g),h&&h.resolver(g)},t(a,l,i)}}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j={opacity:"In"===b?1:0},k=i.complete;i.complete=e!==f-1?i.begin=null:function(){k&&k.call(g,g),h&&h.resolver(g)},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,j,i)}}),t}(window.jQuery||window.Zepto||window,window,document)});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
	
	!function(e,i){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10),__webpack_require__(11)], __WEBPACK_AMD_DEFINE_FACTORY__ = (i), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?i(require("scrollmagic"),require("velocity")):i(e.ScrollMagic||e.jQuery&&e.jQuery.ScrollMagic,e.Velocity||e.jQuery&&e.jQuery.Velocity)}(this,function(e,i){"use strict";var t="animation.velocity",o=0;e.Scene.extend(function(){var r,u,n,c,l=this,s=e._util,a=0;l.on("progress.plugin_velocity",function(){v()}),l.on("destroy.plugin_velocity",function(e){l.off("*.plugin_velocity"),l.removeVelocity(e.reset)});var f=function(e,t,o){s.type.Array(e)?e.forEach(function(e){f(e,t,o)}):(i.Utilities.data(e,c)||i.Utilities.data(e,c,{reverseProps:s.css(e,Object.keys(u))}),i(e,t,o),void 0!==o.queue&&i.Utilities.dequeue(e,o.queue))},y=function(e,t){if(s.type.Array(e))e.forEach(function(e){y(e,t)});else{var o=i.Utilities.data(e,c);o&&o.reverseProps&&(i(e,o.reverseProps,t),void 0!==t.queue&&i.Utilities.dequeue(e,t.queue))}},v=function(){if(r){var e=l.progress();e!=a&&(0===l.duration()&&(e>0?f(r,u,n):y(r,n)),a=e)}};l.setVelocity=function(e,i,a){return r&&l.removeVelocity(),r=s.get.elements(e),u=i||{},n=a||{},c="ScrollMagic."+t+"["+o++ +"]",void 0!==n.queue&&(n.queue=c+"_queue"),v(),l},l.removeVelocity=function(e){return r&&(void 0!==n.queue&&i(r,"stop",n.queue),e&&y(r,{duration:0}),r.forEach(function(e){i.Utilities.removeData(e,c)}),r=u=n=c=void 0),l}})});

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var Point = function (x, y) {
	    this.x = x;
	    this.y = y;
	    return this;
	};
	module.exports = Point;


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	var Line = function (startPoint, endPoint, colorSelected, triggerObj) {
	    this.startPoint = startPoint;
	    this.endPoint = endPoint;
	    this.colorSelected = colorSelected;
	    this.triggerObj = triggerObj;
	};
	
	
	module.exports = Line;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var shortid = __webpack_require__(1);
	
	var Trigger = function (top) {
	    var uuid = shortid.generate();
	    var trigger = document.createElement('div');
	
	    trigger.style.top = top;

		trigger.setAttribute('id', 'trigger_' + uuid);
	    trigger.setAttribute('class', 'trigger');
	    return trigger;
	};
	module.exports = Trigger;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./basic-styles.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./basic-styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports
	
	
	// module
	exports.push([module.id, ".drawed_line{\n    opacity:0;\n    height:0;\n    position:absolute;\n}\n.trigger{\n    position: absolute;\n    height: 1px;\n    width: 1px;\n    opacity: 0;\n}", ""]);
	
	// exports


/***/ },
/* 18 */
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
/* 19 */
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
		if(false) {
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
	};
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
	
	!function(e,r){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (r), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):r("object"==typeof exports?require("scrollmagic"):e.ScrollMagic||e.jQuery&&e.jQuery.ScrollMagic)}(this,function(e){"use strict";var r="0.85em",t="9999",i=15,o=e._util,n=0;e.Scene.extend(function(){var e,r=this;r.addIndicators=function(t){if(!e){var i={name:"",indent:0,parent:void 0,colorStart:"green",colorEnd:"red",colorTrigger:"blue"};t=o.extend({},i,t),n++,e=new s(r,t),r.on("add.plugin_addIndicators",e.add),r.on("remove.plugin_addIndicators",e.remove),r.on("destroy.plugin_addIndicators",r.removeIndicators),r.controller()&&e.add()}return r},r.removeIndicators=function(){return e&&(e.remove(),this.off("*.plugin_addIndicators"),e=void 0),r}}),e.Controller.addOption("addIndicators",!1),e.Controller.extend(function(){var r=this,t=r.info(),n=t.container,s=t.isDocument,d=t.vertical,a={groups:[]};this._indicators=a;var g=function(){a.updateBoundsPositions()},p=function(){a.updateTriggerGroupPositions()};return n.addEventListener("resize",p),s||(window.addEventListener("resize",p),window.addEventListener("scroll",p)),n.addEventListener("resize",g),n.addEventListener("scroll",g),this._indicators.updateBoundsPositions=function(e){for(var r,t,s,g=e?[o.extend({},e.triggerGroup,{members:[e]})]:a.groups,p=g.length,u={},c=d?"left":"top",l=d?"width":"height",f=d?o.get.scrollLeft(n)+o.get.width(n)-i:o.get.scrollTop(n)+o.get.height(n)-i;p--;)for(s=g[p],r=s.members.length,t=o.get[l](s.element.firstChild);r--;)u[c]=f-t,o.css(s.members[r].bounds,u)},this._indicators.updateTriggerGroupPositions=function(e){for(var t,g,p,u,c,l=e?[e]:a.groups,f=l.length,m=s?document.body:n,h=s?{top:0,left:0}:o.get.offset(m,!0),v=d?o.get.width(n)-i:o.get.height(n)-i,b=d?"width":"height",G=d?"Y":"X";f--;)t=l[f],g=t.element,p=t.triggerHook*r.info("size"),u=o.get[b](g.firstChild.firstChild),c=p>u?"translate"+G+"(-100%)":"",o.css(g,{top:h.top+(d?p:v-t.members[0].options.indent),left:h.left+(d?v-t.members[0].options.indent:p)}),o.css(g.firstChild.firstChild,{"-ms-transform":c,"-webkit-transform":c,transform:c})},this._indicators.updateTriggerGroupLabel=function(e){var r="trigger"+(e.members.length>1?"":" "+e.members[0].options.name),t=e.element.firstChild.firstChild,i=t.textContent!==r;i&&(t.textContent=r,d&&a.updateBoundsPositions())},this.addScene=function(t){this._options.addIndicators&&t instanceof e.Scene&&t.controller()===r&&t.addIndicators(),this.$super.addScene.apply(this,arguments)},this.destroy=function(){n.removeEventListener("resize",p),s||(window.removeEventListener("resize",p),window.removeEventListener("scroll",p)),n.removeEventListener("resize",g),n.removeEventListener("scroll",g),this.$super.destroy.apply(this,arguments)},r});var s=function(e,r){var t,i,s=this,a=d.bounds(),g=d.start(r.colorStart),p=d.end(r.colorEnd),u=r.parent&&o.get.elements(r.parent)[0];r.name=r.name||n,g.firstChild.textContent+=" "+r.name,p.textContent+=" "+r.name,a.appendChild(g),a.appendChild(p),s.options=r,s.bounds=a,s.triggerGroup=void 0,this.add=function(){i=e.controller(),t=i.info("vertical");var r=i.info("isDocument");u||(u=r?document.body:i.info("container")),r||"static"!==o.css(u,"position")||o.css(u,{position:"relative"}),e.on("change.plugin_addIndicators",l),e.on("shift.plugin_addIndicators",c),G(),h(),setTimeout(function(){i._indicators.updateBoundsPositions(s)},0)},this.remove=function(){if(s.triggerGroup){if(e.off("change.plugin_addIndicators",l),e.off("shift.plugin_addIndicators",c),s.triggerGroup.members.length>1){var r=s.triggerGroup;r.members.splice(r.members.indexOf(s),1),i._indicators.updateTriggerGroupLabel(r),i._indicators.updateTriggerGroupPositions(r),s.triggerGroup=void 0}else b();m()}};var c=function(){h()},l=function(e){"triggerHook"===e.what&&G()},f=function(){var e=i.info("vertical");o.css(g.firstChild,{"border-bottom-width":e?1:0,"border-right-width":e?0:1,bottom:e?-1:r.indent,right:e?r.indent:-1,padding:e?"0 8px":"2px 4px"}),o.css(p,{"border-top-width":e?1:0,"border-left-width":e?0:1,top:e?"100%":"",right:e?r.indent:"",bottom:e?"":r.indent,left:e?"":"100%",padding:e?"0 8px":"2px 4px"}),u.appendChild(a)},m=function(){a.parentNode.removeChild(a)},h=function(){a.parentNode!==u&&f();var r={};r[t?"top":"left"]=e.triggerPosition(),r[t?"height":"width"]=e.duration(),o.css(a,r),o.css(p,{display:e.duration()>0?"":"none"})},v=function(){var n=d.trigger(r.colorTrigger),a={};a[t?"right":"bottom"]=0,a[t?"border-top-width":"border-left-width"]=1,o.css(n.firstChild,a),o.css(n.firstChild.firstChild,{padding:t?"0 8px 3px 8px":"3px 4px"}),document.body.appendChild(n);var g={triggerHook:e.triggerHook(),element:n,members:[s]};i._indicators.groups.push(g),s.triggerGroup=g,i._indicators.updateTriggerGroupLabel(g),i._indicators.updateTriggerGroupPositions(g)},b=function(){i._indicators.groups.splice(i._indicators.groups.indexOf(s.triggerGroup),1),s.triggerGroup.element.parentNode.removeChild(s.triggerGroup.element),s.triggerGroup=void 0},G=function(){var r=e.triggerHook(),t=1e-4;if(!(s.triggerGroup&&Math.abs(s.triggerGroup.triggerHook-r)<t)){for(var o,n=i._indicators.groups,d=n.length;d--;)if(o=n[d],Math.abs(o.triggerHook-r)<t)return s.triggerGroup&&(1===s.triggerGroup.members.length?b():(s.triggerGroup.members.splice(s.triggerGroup.members.indexOf(s),1),i._indicators.updateTriggerGroupLabel(s.triggerGroup),i._indicators.updateTriggerGroupPositions(s.triggerGroup))),o.members.push(s),s.triggerGroup=o,void i._indicators.updateTriggerGroupLabel(o);if(s.triggerGroup){if(1===s.triggerGroup.members.length)return s.triggerGroup.triggerHook=r,void i._indicators.updateTriggerGroupPositions(s.triggerGroup);s.triggerGroup.members.splice(s.triggerGroup.members.indexOf(s),1),i._indicators.updateTriggerGroupLabel(s.triggerGroup),i._indicators.updateTriggerGroupPositions(s.triggerGroup),s.triggerGroup=void 0}v()}}},d={start:function(e){var r=document.createElement("div");r.textContent="start",o.css(r,{position:"absolute",overflow:"visible","border-width":0,"border-style":"solid",color:e,"border-color":e});var t=document.createElement("div");return o.css(t,{position:"absolute",overflow:"visible",width:0,height:0}),t.appendChild(r),t},end:function(e){var r=document.createElement("div");return r.textContent="end",o.css(r,{position:"absolute",overflow:"visible","border-width":0,"border-style":"solid",color:e,"border-color":e}),r},bounds:function(){var e=document.createElement("div");return o.css(e,{position:"absolute",overflow:"visible","white-space":"nowrap","pointer-events":"none","font-size":r}),e.style.zIndex=t,e},trigger:function(e){var i=document.createElement("div");i.textContent="trigger",o.css(i,{position:"relative"});var n=document.createElement("div");o.css(n,{position:"absolute",overflow:"visible","border-width":0,"border-style":"solid",color:e,"border-color":e}),n.appendChild(i);var s=document.createElement("div");return o.css(s,{position:"fixed",overflow:"visible","white-space":"nowrap","pointer-events":"none","font-size":r}),s.style.zIndex=t,s.appendChild(n),s}}});

/***/ }
/******/ ])
});
//# sourceMappingURL=build.js.map