/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/affine-hull/aff.js":
/*!*****************************************!*\
  !*** ./node_modules/affine-hull/aff.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = affineHull

var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")

function linearlyIndependent(points, d) {
  var nhull = new Array(d+1)
  for(var i=0; i<points.length; ++i) {
    nhull[i] = points[i]
  }
  for(var i=0; i<=points.length; ++i) {
    for(var j=points.length; j<=d; ++j) {
      var x = new Array(d)
      for(var k=0; k<d; ++k) {
        x[k] = Math.pow(j+1-i, k)
      }
      nhull[j] = x
    }
    var o = orient.apply(void 0, nhull)
    if(o) {
      return true
    }
  }
  return false
}

function affineHull(points) {
  var n = points.length
  if(n === 0) {
    return []
  }
  if(n === 1) {
    return [0]
  }
  var d = points[0].length
  var frame = [ points[0] ]
  var index = [ 0 ]
  for(var i=1; i<n; ++i) {
    frame.push(points[i])
    if(!linearlyIndependent(frame, d)) {
      frame.pop()
      continue
    }
    index.push(i)
    if(index.length === d+1) {
      return index
    }
  }
  return index
}

/***/ }),

/***/ "./node_modules/bit-twiddle/twiddle.js":
/*!*********************************************!*\
  !*** ./node_modules/bit-twiddle/twiddle.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

 "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}



/***/ }),

/***/ "./node_modules/convex-hull/ch.js":
/*!****************************************!*\
  !*** ./node_modules/convex-hull/ch.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var convexHull1d = __webpack_require__(/*! ./lib/ch1d */ "./node_modules/convex-hull/lib/ch1d.js")
var convexHull2d = __webpack_require__(/*! ./lib/ch2d */ "./node_modules/convex-hull/lib/ch2d.js")
var convexHullnd = __webpack_require__(/*! ./lib/chnd */ "./node_modules/convex-hull/lib/chnd.js")

module.exports = convexHull

function convexHull(points) {
  var n = points.length
  if(n === 0) {
    return []
  } else if(n === 1) {
    return [[0]]
  }
  var d = points[0].length
  if(d === 0) {
    return []
  } else if(d === 1) {
    return convexHull1d(points)
  } else if(d === 2) {
    return convexHull2d(points)
  }
  return convexHullnd(points, d)
}

/***/ }),

/***/ "./node_modules/convex-hull/lib/ch1d.js":
/*!**********************************************!*\
  !*** ./node_modules/convex-hull/lib/ch1d.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = convexHull1d

function convexHull1d(points) {
  var lo = 0
  var hi = 0
  for(var i=1; i<points.length; ++i) {
    if(points[i][0] < points[lo][0]) {
      lo = i
    }
    if(points[i][0] > points[hi][0]) {
      hi = i
    }
  }
  if(lo < hi) {
    return [[lo], [hi]]
  } else if(lo > hi) {
    return [[hi], [lo]]
  } else {
    return [[lo]]
  }
}

/***/ }),

/***/ "./node_modules/convex-hull/lib/ch2d.js":
/*!**********************************************!*\
  !*** ./node_modules/convex-hull/lib/ch2d.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = convexHull2D

var monotoneHull = __webpack_require__(/*! monotone-convex-hull-2d */ "./node_modules/monotone-convex-hull-2d/index.js")

function convexHull2D(points) {
  var hull = monotoneHull(points)
  var h = hull.length
  if(h <= 2) {
    return []
  }
  var edges = new Array(h)
  var a = hull[h-1]
  for(var i=0; i<h; ++i) {
    var b = hull[i]
    edges[i] = [a,b]
    a = b
  }
  return edges
}


/***/ }),

/***/ "./node_modules/convex-hull/lib/chnd.js":
/*!**********************************************!*\
  !*** ./node_modules/convex-hull/lib/chnd.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = convexHullnD

var ich = __webpack_require__(/*! incremental-convex-hull */ "./node_modules/incremental-convex-hull/ich.js")
var aff = __webpack_require__(/*! affine-hull */ "./node_modules/affine-hull/aff.js")

function permute(points, front) {
  var n = points.length
  var npoints = new Array(n)
  for(var i=0; i<front.length; ++i) {
    npoints[i] = points[front[i]]
  }
  var ptr = front.length
  for(var i=0; i<n; ++i) {
    if(front.indexOf(i) < 0) {
      npoints[ptr++] = points[i]
    }
  }
  return npoints
}

function invPermute(cells, front) {
  var nc = cells.length
  var nf = front.length
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      var x = c[j]
      if(x < nf) {
        c[j] = front[x]
      } else {
        x = x - nf
        for(var k=0; k<nf; ++k) {
          if(x >= front[k]) {
            x += 1
          }
        }
        c[j] = x
      }
    }
  }
  return cells
}

function convexHullnD(points, d) {
  try {
    return ich(points, true)
  } catch(e) {
    //If point set is degenerate, try to find a basis and rerun it
    var ah = aff(points)
    if(ah.length <= d) {
      //No basis, no try
      return []
    }
    var npoints = permute(points, ah)
    var nhull   = ich(npoints, true)
    return invPermute(nhull, ah)
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/shared/styles/normalize.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/shared/styles/normalize.css ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html {
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  text-rendering: optimizeSpeed;
  font-weight: 400;
  line-height: 22px;
  min-height: 100vh;
  background-color: var(--gray);
  overflow: hidden;
}

img,
video {
  display: block;
  max-width: 100%;
}

iframe,
button {
  border: 0;
}

table {
  border-spacing: 0;
}

button {
  cursor: pointer;
}

figure {
  margin: 0;
}

ul {
  list-style-type: none;
}

p {
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
}
`, "",{"version":3,"sources":["webpack://./src/shared/styles/normalize.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;AACzB;;AAEA;;;EAGE,SAAS;EACT,UAAU;EACV,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,8BAA8B;EAC9B,6BAA6B;EAC7B,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;EACjB,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA;;EAEE,cAAc;EACd,eAAe;AACjB;;AAEA;;EAEE,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,iBAAiB;AACnB","sourcesContent":["html {\n  scroll-behavior: smooth;\n}\n\n*,\n*::before,\n*::after {\n  margin: 0;\n  padding: 0;\n  outline: none;\n  box-sizing: border-box;\n}\n\nbody {\n  font-size: 16px;\n  -webkit-text-size-adjust: 100%;\n  text-rendering: optimizeSpeed;\n  font-weight: 400;\n  line-height: 22px;\n  min-height: 100vh;\n  background-color: var(--gray);\n  overflow: hidden;\n}\n\nimg,\nvideo {\n  display: block;\n  max-width: 100%;\n}\n\niframe,\nbutton {\n  border: 0;\n}\n\ntable {\n  border-spacing: 0;\n}\n\nbutton {\n  cursor: pointer;\n}\n\nfigure {\n  margin: 0;\n}\n\nul {\n  list-style-type: none;\n}\n\np {\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 28px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/shared/styles/variables.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/shared/styles/variables.css ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --white: #ffffff;
  --accent10: #9a95cf;
  --accent20: #beb5f4;
  --gray: #f6f5f5;
  --gray10: #E5E5E5;
  --gray20: #9e9d9d;
}
`, "",{"version":3,"sources":["webpack://./src/shared/styles/variables.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,iBAAiB;AACnB","sourcesContent":[":root {\n  --white: #ffffff;\n  --accent10: #9a95cf;\n  --accent20: #beb5f4;\n  --gray: #f6f5f5;\n  --gray10: #E5E5E5;\n  --gray20: #9e9d9d;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/incremental-convex-hull/ich.js":
/*!*****************************************************!*\
  !*** ./node_modules/incremental-convex-hull/ich.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


//High level idea:
// 1. Use Clarkson's incremental construction to find convex hull
// 2. Point location in triangulation by jump and walk

module.exports = incrementalConvexHull

var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")
var compareCell = (__webpack_require__(/*! simplicial-complex */ "./node_modules/simplicial-complex/topology.js").compareCells)

function compareInt(a, b) {
  return a - b
}

function Simplex(vertices, adjacent, boundary) {
  this.vertices = vertices
  this.adjacent = adjacent
  this.boundary = boundary
  this.lastVisited = -1
}

Simplex.prototype.flip = function() {
  var t = this.vertices[0]
  this.vertices[0] = this.vertices[1]
  this.vertices[1] = t
  var u = this.adjacent[0]
  this.adjacent[0] = this.adjacent[1]
  this.adjacent[1] = u
}

function GlueFacet(vertices, cell, index) {
  this.vertices = vertices
  this.cell = cell
  this.index = index
}

function compareGlue(a, b) {
  return compareCell(a.vertices, b.vertices)
}

function bakeOrient(d) {
  var code = ["function orient(){var tuple=this.tuple;return test("]
  for(var i=0; i<=d; ++i) {
    if(i > 0) {
      code.push(",")
    }
    code.push("tuple[", i, "]")
  }
  code.push(")}return orient")
  var proc = new Function("test", code.join(""))
  var test = orient[d+1]
  if(!test) {
    test = orient
  }
  return proc(test)
}

var BAKED = []

function Triangulation(dimension, vertices, simplices) {
  this.dimension = dimension
  this.vertices = vertices
  this.simplices = simplices
  this.interior = simplices.filter(function(c) {
    return !c.boundary
  })

  this.tuple = new Array(dimension+1)
  for(var i=0; i<=dimension; ++i) {
    this.tuple[i] = this.vertices[i]
  }

  var o = BAKED[dimension]
  if(!o) {
    o = BAKED[dimension] = bakeOrient(dimension)
  }
  this.orient = o
}

var proto = Triangulation.prototype

//Degenerate situation where we are on boundary, but coplanar to face
proto.handleBoundaryDegeneracy = function(cell, point) {
  var d = this.dimension
  var n = this.vertices.length - 1
  var tuple = this.tuple
  var verts = this.vertices

  //Dumb solution: Just do dfs from boundary cell until we find any peak, or terminate
  var toVisit = [ cell ]
  cell.lastVisited = -n
  while(toVisit.length > 0) {
    cell = toVisit.pop()
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent
    for(var i=0; i<=d; ++i) {
      var neighbor = cellAdj[i]
      if(!neighbor.boundary || neighbor.lastVisited <= -n) {
        continue
      }
      var nv = neighbor.vertices
      for(var j=0; j<=d; ++j) {
        var vv = nv[j]
        if(vv < 0) {
          tuple[j] = point
        } else {
          tuple[j] = verts[vv]
        }
      }
      var o = this.orient()
      if(o > 0) {
        return neighbor
      }
      neighbor.lastVisited = -n
      if(o === 0) {
        toVisit.push(neighbor)
      }
    }
  }
  return null
}

proto.walk = function(point, random) {
  //Alias local properties
  var n = this.vertices.length - 1
  var d = this.dimension
  var verts = this.vertices
  var tuple = this.tuple

  //Compute initial jump cell
  var initIndex = random ? (this.interior.length * Math.random())|0 : (this.interior.length-1)
  var cell = this.interior[ initIndex ]

  //Start walking
outerLoop:
  while(!cell.boundary) {
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent

    for(var i=0; i<=d; ++i) {
      tuple[i] = verts[cellVerts[i]]
    }
    cell.lastVisited = n

    //Find farthest adjacent cell
    for(var i=0; i<=d; ++i) {
      var neighbor = cellAdj[i]
      if(neighbor.lastVisited >= n) {
        continue
      }
      var prev = tuple[i]
      tuple[i] = point
      var o = this.orient()
      tuple[i] = prev
      if(o < 0) {
        cell = neighbor
        continue outerLoop
      } else {
        if(!neighbor.boundary) {
          neighbor.lastVisited = n
        } else {
          neighbor.lastVisited = -n
        }
      }
    }
    return
  }

  return cell
}

proto.addPeaks = function(point, cell) {
  var n = this.vertices.length - 1
  var d = this.dimension
  var verts = this.vertices
  var tuple = this.tuple
  var interior = this.interior
  var simplices = this.simplices

  //Walking finished at boundary, time to add peaks
  var tovisit = [ cell ]

  //Stretch initial boundary cell into a peak
  cell.lastVisited = n
  cell.vertices[cell.vertices.indexOf(-1)] = n
  cell.boundary = false
  interior.push(cell)

  //Record a list of all new boundaries created by added peaks so we can glue them together when we are all done
  var glueFacets = []

  //Do a traversal of the boundary walking outward from starting peak
  while(tovisit.length > 0) {
    //Pop off peak and walk over adjacent cells
    var cell = tovisit.pop()
    var cellVerts = cell.vertices
    var cellAdj = cell.adjacent
    var indexOfN = cellVerts.indexOf(n)
    if(indexOfN < 0) {
      continue
    }

    for(var i=0; i<=d; ++i) {
      if(i === indexOfN) {
        continue
      }

      //For each boundary neighbor of the cell
      var neighbor = cellAdj[i]
      if(!neighbor.boundary || neighbor.lastVisited >= n) {
        continue
      }

      var nv = neighbor.vertices

      //Test if neighbor is a peak
      if(neighbor.lastVisited !== -n) {      
        //Compute orientation of p relative to each boundary peak
        var indexOfNeg1 = 0
        for(var j=0; j<=d; ++j) {
          if(nv[j] < 0) {
            indexOfNeg1 = j
            tuple[j] = point
          } else {
            tuple[j] = verts[nv[j]]
          }
        }
        var o = this.orient()

        //Test if neighbor cell is also a peak
        if(o > 0) {
          nv[indexOfNeg1] = n
          neighbor.boundary = false
          interior.push(neighbor)
          tovisit.push(neighbor)
          neighbor.lastVisited = n
          continue
        } else {
          neighbor.lastVisited = -n
        }
      }

      var na = neighbor.adjacent

      //Otherwise, replace neighbor with new face
      var vverts = cellVerts.slice()
      var vadj = cellAdj.slice()
      var ncell = new Simplex(vverts, vadj, true)
      simplices.push(ncell)

      //Connect to neighbor
      var opposite = na.indexOf(cell)
      if(opposite < 0) {
        continue
      }
      na[opposite] = ncell
      vadj[indexOfN] = neighbor

      //Connect to cell
      vverts[i] = -1
      vadj[i] = cell
      cellAdj[i] = ncell

      //Flip facet
      ncell.flip()

      //Add to glue list
      for(var j=0; j<=d; ++j) {
        var uu = vverts[j]
        if(uu < 0 || uu === n) {
          continue
        }
        var nface = new Array(d-1)
        var nptr = 0
        for(var k=0; k<=d; ++k) {
          var vv = vverts[k]
          if(vv < 0 || k === j) {
            continue
          }
          nface[nptr++] = vv
        }
        glueFacets.push(new GlueFacet(nface, ncell, j))
      }
    }
  }

  //Glue boundary facets together
  glueFacets.sort(compareGlue)

  for(var i=0; i+1<glueFacets.length; i+=2) {
    var a = glueFacets[i]
    var b = glueFacets[i+1]
    var ai = a.index
    var bi = b.index
    if(ai < 0 || bi < 0) {
      continue
    }
    a.cell.adjacent[a.index] = b.cell
    b.cell.adjacent[b.index] = a.cell
  }
}

proto.insert = function(point, random) {
  //Add point
  var verts = this.vertices
  verts.push(point)

  var cell = this.walk(point, random)
  if(!cell) {
    return
  }

  //Alias local properties
  var d = this.dimension
  var tuple = this.tuple

  //Degenerate case: If point is coplanar to cell, then walk until we find a non-degenerate boundary
  for(var i=0; i<=d; ++i) {
    var vv = cell.vertices[i]
    if(vv < 0) {
      tuple[i] = point
    } else {
      tuple[i] = verts[vv]
    }
  }
  var o = this.orient(tuple)
  if(o < 0) {
    return
  } else if(o === 0) {
    cell = this.handleBoundaryDegeneracy(cell, point)
    if(!cell) {
      return
    }
  }

  //Add peaks
  this.addPeaks(point, cell)
}

//Extract all boundary cells
proto.boundary = function() {
  var d = this.dimension
  var boundary = []
  var cells = this.simplices
  var nc = cells.length
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    if(c.boundary) {
      var bcell = new Array(d)
      var cv = c.vertices
      var ptr = 0
      var parity = 0
      for(var j=0; j<=d; ++j) {
        if(cv[j] >= 0) {
          bcell[ptr++] = cv[j]
        } else {
          parity = j&1
        }
      }
      if(parity === (d&1)) {
        var t = bcell[0]
        bcell[0] = bcell[1]
        bcell[1] = t
      }
      boundary.push(bcell)
    }
  }
  return boundary
}

function incrementalConvexHull(points, randomSearch) {
  var n = points.length
  if(n === 0) {
    throw new Error("Must have at least d+1 points")
  }
  var d = points[0].length
  if(n <= d) {
    throw new Error("Must input at least d+1 points")
  }

  //FIXME: This could be degenerate, but need to select d+1 non-coplanar points to bootstrap process
  var initialSimplex = points.slice(0, d+1)

  //Make sure initial simplex is positively oriented
  var o = orient.apply(void 0, initialSimplex)
  if(o === 0) {
    throw new Error("Input not in general position")
  }
  var initialCoords = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    initialCoords[i] = i
  }
  if(o < 0) {
    initialCoords[0] = 1
    initialCoords[1] = 0
  }

  //Create initial topological index, glue pointers together (kind of messy)
  var initialCell = new Simplex(initialCoords, new Array(d+1), false)
  var boundary = initialCell.adjacent
  var list = new Array(d+2)
  for(var i=0; i<=d; ++i) {
    var verts = initialCoords.slice()
    for(var j=0; j<=d; ++j) {
      if(j === i) {
        verts[j] = -1
      }
    }
    var t = verts[0]
    verts[0] = verts[1]
    verts[1] = t
    var cell = new Simplex(verts, new Array(d+1), true)
    boundary[i] = cell
    list[i] = cell
  }
  list[d+1] = initialCell
  for(var i=0; i<=d; ++i) {
    var verts = boundary[i].vertices
    var adj = boundary[i].adjacent
    for(var j=0; j<=d; ++j) {
      var v = verts[j]
      if(v < 0) {
        adj[j] = initialCell
        continue
      }
      for(var k=0; k<=d; ++k) {
        if(boundary[k].vertices.indexOf(v) < 0) {
          adj[j] = boundary[k]
        }
      }
    }
  }

  //Initialize triangles
  var triangles = new Triangulation(d, initialSimplex, list)

  //Insert remaining points
  var useRandom = !!randomSearch
  for(var i=d+1; i<n; ++i) {
    triangles.insert(points[i], useRandom)
  }
  
  //Extract boundary cells
  return triangles.boundary()
}

/***/ }),

/***/ "./node_modules/monotone-convex-hull-2d/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/monotone-convex-hull-2d/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = monotoneConvexHull2D

var orient = (__webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")[3])

function monotoneConvexHull2D(points) {
  var n = points.length

  if(n < 3) {
    var result = new Array(n)
    for(var i=0; i<n; ++i) {
      result[i] = i
    }

    if(n === 2 &&
       points[0][0] === points[1][0] &&
       points[0][1] === points[1][1]) {
      return [0]
    }

    return result
  }

  //Sort point indices along x-axis
  var sorted = new Array(n)
  for(var i=0; i<n; ++i) {
    sorted[i] = i
  }
  sorted.sort(function(a,b) {
    var d = points[a][0]-points[b][0]
    if(d) {
      return d
    }
    return points[a][1] - points[b][1]
  })

  //Construct upper and lower hulls
  var lower = [sorted[0], sorted[1]]
  var upper = [sorted[0], sorted[1]]

  for(var i=2; i<n; ++i) {
    var idx = sorted[i]
    var p   = points[idx]

    //Insert into lower list
    var m = lower.length
    while(m > 1 && orient(
        points[lower[m-2]], 
        points[lower[m-1]], 
        p) <= 0) {
      m -= 1
      lower.pop()
    }
    lower.push(idx)

    //Insert into upper list
    m = upper.length
    while(m > 1 && orient(
        points[upper[m-2]], 
        points[upper[m-1]], 
        p) >= 0) {
      m -= 1
      upper.pop()
    }
    upper.push(idx)
  }

  //Merge lists together
  var result = new Array(upper.length + lower.length - 2)
  var ptr    = 0
  for(var i=0, nl=lower.length; i<nl; ++i) {
    result[ptr++] = lower[i]
  }
  for(var j=upper.length-2; j>0; --j) {
    result[ptr++] = upper[j]
  }

  //Return result
  return result
}

/***/ }),

/***/ "./node_modules/robust-orientation/orientation.js":
/*!********************************************************!*\
  !*** ./node_modules/robust-orientation/orientation.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var robustSum = __webpack_require__(/*! robust-sum */ "./node_modules/robust-sum/robust-sum.js")
var robustScale = __webpack_require__(/*! robust-scale */ "./node_modules/robust-scale/robust-scale.js")
var robustSubtract = __webpack_require__(/*! robust-subtract */ "./node_modules/robust-subtract/robust-diff.js")

var NUM_EXPAND = 5

var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
var ERRBOUND4   = (7.0 + 56.0 * EPSILON) * EPSILON

function orientation_3(sum, prod, scale, sub) {
  return function orientation3Exact(m0, m1, m2) {
    var p = sum(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])))
    var n = sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0]))
    var d = sub(p, n)
    return d[d.length - 1]
  }
}

function orientation_4(sum, prod, scale, sub) {
  return function orientation4Exact(m0, m1, m2, m3) {
    var p = sum(sum(scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m1[2]), sum(scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), -m2[2]), scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m3[2]))), sum(scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m3[2]))))
    var n = sum(sum(scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m0[2]), sum(scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m2[2]), scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m3[2]))), sum(scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m2[2]))))
    var d = sub(p, n)
    return d[d.length - 1]
  }
}

function orientation_5(sum, prod, scale, sub) {
  return function orientation5Exact(m0, m1, m2, m3, m4) {
    var p = sum(sum(sum(scale(sum(scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m2[2]), sum(scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), -m3[2]), scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m4[2]))), m1[3]), sum(scale(sum(scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m1[2]), sum(scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m3[2]), scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m4[2]))), -m2[3]), scale(sum(scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m1[2]), sum(scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m2[2]), scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m4[2]))), m3[3]))), sum(scale(sum(scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m1[2]), sum(scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), -m2[2]), scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m3[2]))), -m4[3]), sum(scale(sum(scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m1[2]), sum(scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m3[2]), scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m4[2]))), m0[3]), scale(sum(scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m0[2]), sum(scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m3[2]), scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), m4[2]))), -m1[3])))), sum(sum(scale(sum(scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m4[2]))), m3[3]), sum(scale(sum(scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m3[2]))), -m4[3]), scale(sum(scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m1[2]), sum(scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), -m2[2]), scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m3[2]))), m0[3]))), sum(scale(sum(scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m0[2]), sum(scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m2[2]), scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m3[2]))), -m1[3]), sum(scale(sum(scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m3[2]))), m2[3]), scale(sum(scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m2[2]))), -m3[3])))))
    var n = sum(sum(sum(scale(sum(scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m2[2]), sum(scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), -m3[2]), scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m4[2]))), m0[3]), scale(sum(scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m0[2]), sum(scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m3[2]), scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), m4[2]))), -m2[3])), sum(scale(sum(scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m0[2]), sum(scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m2[2]), scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m4[2]))), m3[3]), scale(sum(scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m0[2]), sum(scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m2[2]), scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m3[2]))), -m4[3]))), sum(sum(scale(sum(scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m1[2]), sum(scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m2[2]), scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m4[2]))), m0[3]), scale(sum(scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m0[2]), sum(scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m2[2]), scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m4[2]))), -m1[3])), sum(scale(sum(scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m4[2]))), m2[3]), scale(sum(scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m0[2]), sum(scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), -m1[2]), scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m2[2]))), -m4[3]))))
    var d = sub(p, n)
    return d[d.length - 1]
  }
}

function orientation(n) {
  var fn =
    n === 3 ? orientation_3 :
    n === 4 ? orientation_4 : orientation_5

  return fn(robustSum, twoProduct, robustScale, robustSubtract)
}

var orientation3Exact = orientation(3)
var orientation4Exact = orientation(4)

var CACHED = [
  function orientation0() { return 0 },
  function orientation1() { return 0 },
  function orientation2(a, b) {
    return b[0] - a[0]
  },
  function orientation3(a, b, c) {
    var l = (a[1] - c[1]) * (b[0] - c[0])
    var r = (a[0] - c[0]) * (b[1] - c[1])
    var det = l - r
    var s
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r)
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s
    if(det >= tol || det <= -tol) {
      return det
    }
    return orientation3Exact(a, b, c)
  },
  function orientation4(a,b,c,d) {
    var adx = a[0] - d[0]
    var bdx = b[0] - d[0]
    var cdx = c[0] - d[0]
    var ady = a[1] - d[1]
    var bdy = b[1] - d[1]
    var cdy = c[1] - d[1]
    var adz = a[2] - d[2]
    var bdz = b[2] - d[2]
    var cdz = c[2] - d[2]
    var bdxcdy = bdx * cdy
    var cdxbdy = cdx * bdy
    var cdxady = cdx * ady
    var adxcdy = adx * cdy
    var adxbdy = adx * bdy
    var bdxady = bdx * ady
    var det = adz * (bdxcdy - cdxbdy)
            + bdz * (cdxady - adxcdy)
            + cdz * (adxbdy - bdxady)
    var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz)
                  + (Math.abs(cdxady) + Math.abs(adxcdy)) * Math.abs(bdz)
                  + (Math.abs(adxbdy) + Math.abs(bdxady)) * Math.abs(cdz)
    var tol = ERRBOUND4 * permanent
    if ((det > tol) || (-det > tol)) {
      return det
    }
    return orientation4Exact(a,b,c,d)
  }
]

function slowOrient(args) {
  var proc = CACHED[args.length]
  if(!proc) {
    proc = CACHED[args.length] = orientation(args.length)
  }
  return proc.apply(undefined, args)
}

function proc (slow, o0, o1, o2, o3, o4, o5) {
  return function getOrientation(a0, a1, a2, a3, a4) {
    switch (arguments.length) {
      case 0:
      case 1:
        return 0;
      case 2:
        return o2(a0, a1)
      case 3:
        return o3(a0, a1, a2)
      case 4:
        return o4(a0, a1, a2, a3)
      case 5:
        return o5(a0, a1, a2, a3, a4)
    }

    var s = new Array(arguments.length)
    for (var i = 0; i < arguments.length; ++i) {
      s[i] = arguments[i]
    }
    return slow(s)
  }
}

function generateOrientationProc() {
  while(CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length))
  }
  module.exports = proc.apply(undefined, [slowOrient].concat(CACHED))
  for(var i=0; i<=NUM_EXPAND; ++i) {
    module.exports[i] = CACHED[i]
  }
}

generateOrientationProc()

/***/ }),

/***/ "./node_modules/robust-scale/robust-scale.js":
/*!***************************************************!*\
  !*** ./node_modules/robust-scale/robust-scale.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var twoSum = __webpack_require__(/*! two-sum */ "./node_modules/two-sum/two-sum.js")

module.exports = scaleLinearExpansion

function scaleLinearExpansion(e, scale) {
  var n = e.length
  if(n === 1) {
    var ts = twoProduct(e[0], scale)
    if(ts[0]) {
      return ts
    }
    return [ ts[1] ]
  }
  var g = new Array(2 * n)
  var q = [0.1, 0.1]
  var t = [0.1, 0.1]
  var count = 0
  twoProduct(e[0], scale, q)
  if(q[0]) {
    g[count++] = q[0]
  }
  for(var i=1; i<n; ++i) {
    twoProduct(e[i], scale, t)
    var pq = q[1]
    twoSum(pq, t[0], q)
    if(q[0]) {
      g[count++] = q[0]
    }
    var a = t[1]
    var b = q[1]
    var x = a + b
    var bv = x - a
    var y = b - bv
    q[1] = x
    if(y) {
      g[count++] = y
    }
  }
  if(q[1]) {
    g[count++] = q[1]
  }
  if(count === 0) {
    g[count++] = 0.0
  }
  g.length = count
  return g
}

/***/ }),

/***/ "./node_modules/robust-subtract/robust-diff.js":
/*!*****************************************************!*\
  !*** ./node_modules/robust-subtract/robust-diff.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


module.exports = robustSubtract

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b
  var bv = x - a
  var av = x - bv
  var br = b - bv
  var ar = a - av
  var y = ar + br
  if(y) {
    return [y, x]
  }
  return [x]
}

function robustSubtract(e, f) {
  var ne = e.length|0
  var nf = f.length|0
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], -f[0])
  }
  var n = ne + nf
  var g = new Array(n)
  var count = 0
  var eptr = 0
  var fptr = 0
  var abs = Math.abs
  var ei = e[eptr]
  var ea = abs(ei)
  var fi = -f[fptr]
  var fa = abs(fi)
  var a, b
  if(ea < fa) {
    b = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    b = fi
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
      fa = abs(fi)
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    a = fi
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
      fa = abs(fi)
    }
  }
  var x = a + b
  var bv = x - a
  var y = b - bv
  var q0 = y
  var q1 = x
  var _x, _bv, _av, _br, _ar
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei
      eptr += 1
      if(eptr < ne) {
        ei = e[eptr]
        ea = abs(ei)
      }
    } else {
      a = fi
      fptr += 1
      if(fptr < nf) {
        fi = -f[fptr]
        fa = abs(fi)
      }
    }
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
  }
  while(eptr < ne) {
    a = ei
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
    }
  }
  while(fptr < nf) {
    a = fi
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    } 
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
    }
  }
  if(q0) {
    g[count++] = q0
  }
  if(q1) {
    g[count++] = q1
  }
  if(!count) {
    g[count++] = 0.0  
  }
  g.length = count
  return g
}

/***/ }),

/***/ "./node_modules/robust-sum/robust-sum.js":
/*!***********************************************!*\
  !*** ./node_modules/robust-sum/robust-sum.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


module.exports = linearExpansionSum

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b
  var bv = x - a
  var av = x - bv
  var br = b - bv
  var ar = a - av
  var y = ar + br
  if(y) {
    return [y, x]
  }
  return [x]
}

function linearExpansionSum(e, f) {
  var ne = e.length|0
  var nf = f.length|0
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0])
  }
  var n = ne + nf
  var g = new Array(n)
  var count = 0
  var eptr = 0
  var fptr = 0
  var abs = Math.abs
  var ei = e[eptr]
  var ea = abs(ei)
  var fi = f[fptr]
  var fa = abs(fi)
  var a, b
  if(ea < fa) {
    b = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    b = fi
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
      fa = abs(fi)
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    a = fi
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
      fa = abs(fi)
    }
  }
  var x = a + b
  var bv = x - a
  var y = b - bv
  var q0 = y
  var q1 = x
  var _x, _bv, _av, _br, _ar
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei
      eptr += 1
      if(eptr < ne) {
        ei = e[eptr]
        ea = abs(ei)
      }
    } else {
      a = fi
      fptr += 1
      if(fptr < nf) {
        fi = f[fptr]
        fa = abs(fi)
      }
    }
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
  }
  while(eptr < ne) {
    a = ei
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
    }
  }
  while(fptr < nf) {
    a = fi
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    } 
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
    }
  }
  if(q0) {
    g[count++] = q0
  }
  if(q1) {
    g[count++] = q1
  }
  if(!count) {
    g[count++] = 0.0  
  }
  g.length = count
  return g
}

/***/ }),

/***/ "./node_modules/simplicial-complex/topology.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplicial-complex/topology.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
 "use restrict";

var bits      = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
  , UnionFind = __webpack_require__(/*! union-find */ "./node_modules/union-find/index.js")

//Returns the dimension of a cell complex
function dimension(cells) {
  var d = 0
    , max = Math.max
  for(var i=0, il=cells.length; i<il; ++i) {
    d = max(d, cells[i].length)
  }
  return d-1
}
exports.dimension = dimension

//Counts the number of vertices in faces
function countVertices(cells) {
  var vc = -1
    , max = Math.max
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
    for(var j=0, jl=c.length; j<jl; ++j) {
      vc = max(vc, c[j])
    }
  }
  return vc+1
}
exports.countVertices = countVertices

//Returns a deep copy of cells
function cloneCells(cells) {
  var ncells = new Array(cells.length)
  for(var i=0, il=cells.length; i<il; ++i) {
    ncells[i] = cells[i].slice(0)
  }
  return ncells
}
exports.cloneCells = cloneCells

//Ranks a pair of cells up to permutation
function compareCells(a, b) {
  var n = a.length
    , t = a.length - b.length
    , min = Math.min
  if(t) {
    return t
  }
  switch(n) {
    case 0:
      return 0;
    case 1:
      return a[0] - b[0];
    case 2:
      var d = a[0]+a[1]-b[0]-b[1]
      if(d) {
        return d
      }
      return min(a[0],a[1]) - min(b[0],b[1])
    case 3:
      var l1 = a[0]+a[1]
        , m1 = b[0]+b[1]
      d = l1+a[2] - (m1+b[2])
      if(d) {
        return d
      }
      var l0 = min(a[0], a[1])
        , m0 = min(b[0], b[1])
        , d  = min(l0, a[2]) - min(m0, b[2])
      if(d) {
        return d
      }
      return min(l0+a[2], l1) - min(m0+b[2], m1)
    
    //TODO: Maybe optimize n=4 as well?
    
    default:
      var as = a.slice(0)
      as.sort()
      var bs = b.slice(0)
      bs.sort()
      for(var i=0; i<n; ++i) {
        t = as[i] - bs[i]
        if(t) {
          return t
        }
      }
      return 0
  }
}
exports.compareCells = compareCells

function compareZipped(a, b) {
  return compareCells(a[0], b[0])
}

//Puts a cell complex into normal order for the purposes of findCell queries
function normalize(cells, attr) {
  if(attr) {
    var len = cells.length
    var zipped = new Array(len)
    for(var i=0; i<len; ++i) {
      zipped[i] = [cells[i], attr[i]]
    }
    zipped.sort(compareZipped)
    for(var i=0; i<len; ++i) {
      cells[i] = zipped[i][0]
      attr[i] = zipped[i][1]
    }
    return cells
  } else {
    cells.sort(compareCells)
    return cells
  }
}
exports.normalize = normalize

//Removes all duplicate cells in the complex
function unique(cells) {
  if(cells.length === 0) {
    return []
  }
  var ptr = 1
    , len = cells.length
  for(var i=1; i<len; ++i) {
    var a = cells[i]
    if(compareCells(a, cells[i-1])) {
      if(i === ptr) {
        ptr++
        continue
      }
      cells[ptr++] = a
    }
  }
  cells.length = ptr
  return cells
}
exports.unique = unique;

//Finds a cell in a normalized cell complex
function findCell(cells, c) {
  var lo = 0
    , hi = cells.length-1
    , r  = -1
  while (lo <= hi) {
    var mid = (lo + hi) >> 1
      , s   = compareCells(cells[mid], c)
    if(s <= 0) {
      if(s === 0) {
        r = mid
      }
      lo = mid + 1
    } else if(s > 0) {
      hi = mid - 1
    }
  }
  return r
}
exports.findCell = findCell;

//Builds an index for an n-cell.  This is more general than dual, but less efficient
function incidence(from_cells, to_cells) {
  var index = new Array(from_cells.length)
  for(var i=0, il=index.length; i<il; ++i) {
    index[i] = []
  }
  var b = []
  for(var i=0, n=to_cells.length; i<n; ++i) {
    var c = to_cells[i]
    var cl = c.length
    for(var k=1, kn=(1<<cl); k<kn; ++k) {
      b.length = bits.popCount(k)
      var l = 0
      for(var j=0; j<cl; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j]
        }
      }
      var idx=findCell(from_cells, b)
      if(idx < 0) {
        continue
      }
      while(true) {
        index[idx++].push(i)
        if(idx >= from_cells.length || compareCells(from_cells[idx], b) !== 0) {
          break
        }
      }
    }
  }
  return index
}
exports.incidence = incidence

//Computes the dual of the mesh.  This is basically an optimized version of buildIndex for the situation where from_cells is just the list of vertices
function dual(cells, vertex_count) {
  if(!vertex_count) {
    return incidence(unique(skeleton(cells, 0)), cells, 0)
  }
  var res = new Array(vertex_count)
  for(var i=0; i<vertex_count; ++i) {
    res[i] = []
  }
  for(var i=0, len=cells.length; i<len; ++i) {
    var c = cells[i]
    for(var j=0, cl=c.length; j<cl; ++j) {
      res[c[j]].push(i)
    }
  }
  return res
}
exports.dual = dual

//Enumerates all cells in the complex
function explode(cells) {
  var result = []
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
      , cl = c.length|0
    for(var j=1, jl=(1<<cl); j<jl; ++j) {
      var b = []
      for(var k=0; k<cl; ++k) {
        if((j >>> k) & 1) {
          b.push(c[k])
        }
      }
      result.push(b)
    }
  }
  return normalize(result)
}
exports.explode = explode

//Enumerates all of the n-cells of a cell complex
function skeleton(cells, n) {
  if(n < 0) {
    return []
  }
  var result = []
    , k0     = (1<<(n+1))-1
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var k=k0; k<(1<<c.length); k=bits.nextCombination(k)) {
      var b = new Array(n+1)
        , l = 0
      for(var j=0; j<c.length; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j]
        }
      }
      result.push(b)
    }
  }
  return normalize(result)
}
exports.skeleton = skeleton;

//Computes the boundary of all cells, does not remove duplicates
function boundary(cells) {
  var res = []
  for(var i=0,il=cells.length; i<il; ++i) {
    var c = cells[i]
    for(var j=0,cl=c.length; j<cl; ++j) {
      var b = new Array(c.length-1)
      for(var k=0, l=0; k<cl; ++k) {
        if(k !== j) {
          b[l++] = c[k]
        }
      }
      res.push(b)
    }
  }
  return normalize(res)
}
exports.boundary = boundary;

//Computes connected components for a dense cell complex
function connectedComponents_dense(cells, vertex_count) {
  var labels = new UnionFind(vertex_count)
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      for(var k=j+1; k<c.length; ++k) {
        labels.link(c[j], c[k])
      }
    }
  }
  var components = []
    , component_labels = labels.ranks
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(cells[i][0])
    if(component_labels[l] < 0) {
      component_labels[l] = components.length
      components.push([cells[i].slice(0)])
    } else {
      components[component_labels[l]].push(cells[i].slice(0))
    }
  }
  return components
}

//Computes connected components for a sparse graph
function connectedComponents_sparse(cells) {
  var vertices  = unique(normalize(skeleton(cells, 0)))
    , labels    = new UnionFind(vertices.length)
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i]
    for(var j=0; j<c.length; ++j) {
      var vj = findCell(vertices, [c[j]])
      for(var k=j+1; k<c.length; ++k) {
        labels.link(vj, findCell(vertices, [c[k]]))
      }
    }
  }
  var components        = []
    , component_labels  = labels.ranks
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(findCell(vertices, [cells[i][0]]));
    if(component_labels[l] < 0) {
      component_labels[l] = components.length
      components.push([cells[i].slice(0)])
    } else {
      components[component_labels[l]].push(cells[i].slice(0))
    }
  }
  return components
}

//Computes connected components for a cell complex
function connectedComponents(cells, vertex_count) {
  if(vertex_count) {
    return connectedComponents_dense(cells, vertex_count)
  }
  return connectedComponents_sparse(cells)
}
exports.connectedComponents = connectedComponents


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/two-product/two-product.js":
/*!*************************************************!*\
  !*** ./node_modules/two-product/two-product.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


module.exports = twoProduct

var SPLITTER = +(Math.pow(2, 27) + 1.0)

function twoProduct(a, b, result) {
  var x = a * b

  var c = SPLITTER * a
  var abig = c - a
  var ahi = c - abig
  var alo = a - ahi

  var d = SPLITTER * b
  var bbig = d - b
  var bhi = d - bbig
  var blo = b - bhi

  var err1 = x - (ahi * bhi)
  var err2 = err1 - (alo * bhi)
  var err3 = err2 - (ahi * blo)

  var y = alo * blo - err3

  if(result) {
    result[0] = y
    result[1] = x
    return result
  }

  return [ y, x ]
}

/***/ }),

/***/ "./node_modules/two-sum/two-sum.js":
/*!*****************************************!*\
  !*** ./node_modules/two-sum/two-sum.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


module.exports = fastTwoSum

function fastTwoSum(a, b, result) {
	var x = a + b
	var bv = x - a
	var av = x - bv
	var br = b - bv
	var ar = a - av
	if(result) {
		result[0] = ar + br
		result[1] = x
		return result
	}
	return [ar+br, x]
}

/***/ }),

/***/ "./node_modules/union-find/index.js":
/*!******************************************!*\
  !*** ./node_modules/union-find/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";
 "use restrict";

module.exports = UnionFind;

function UnionFind(count) {
  this.roots = new Array(count);
  this.ranks = new Array(count);
  
  for(var i=0; i<count; ++i) {
    this.roots[i] = i;
    this.ranks[i] = 0;
  }
}

var proto = UnionFind.prototype

Object.defineProperty(proto, "length", {
  "get": function() {
    return this.roots.length
  }
})

proto.makeSet = function() {
  var n = this.roots.length;
  this.roots.push(n);
  this.ranks.push(0);
  return n;
}

proto.find = function(x) {
  var x0 = x
  var roots = this.roots;
  while(roots[x] !== x) {
    x = roots[x]
  }
  while(roots[x0] !== x) {
    var y = roots[x0]
    roots[x0] = x
    x0 = y
  }
  return x;
}

proto.link = function(x, y) {
  var xr = this.find(x)
    , yr = this.find(y);
  if(xr === yr) {
    return;
  }
  var ranks = this.ranks
    , roots = this.roots
    , xd    = ranks[xr]
    , yd    = ranks[yr];
  if(xd < yd) {
    roots[xr] = yr;
  } else if(yd < xd) {
    roots[yr] = xr;
  } else {
    roots[yr] = xr;
    ++ranks[xr];
  }
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ randomUUID });


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
    if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
        return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0,_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");

function validate(uuid) {
    return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);


/***/ }),

/***/ "./src/app/App.js":
/*!************************!*\
  !*** ./src/app/App.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _widgets_AppHeader_model_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @widgets/AppHeader/model/events */ "./src/widgets/AppHeader/model/events.js");
/* harmony import */ var _entities_grid_model_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities/grid/model/Grid */ "./src/entities/grid/model/Grid.js");
/* harmony import */ var _features_polygon_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @features/polygon/create */ "./src/features/polygon/create.js");
/* harmony import */ var _features_canvas_dropPolygon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @features/canvas/dropPolygon */ "./src/features/canvas/dropPolygon.js");
/* harmony import */ var _lib_hooks_useBufferPolygons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/hooks/useBufferPolygons */ "./src/app/lib/hooks/useBufferPolygons.js");
/* harmony import */ var _entities_canvas_model_domEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @entities/canvas/model/domEvents */ "./src/entities/canvas/model/domEvents.js");
/* harmony import */ var _shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/lib/eventBus */ "./src/shared/lib/eventBus.js");
/* harmony import */ var _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/model/canvasEvents */ "./src/shared/model/canvasEvents.js");
/* harmony import */ var _widgets_BufferContainer_model_events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @widgets/BufferContainer/model/events */ "./src/widgets/BufferContainer/model/events.js");
/* harmony import */ var _entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @entities/scene/lib/scene */ "./src/entities/scene/lib/scene.js");
/* harmony import */ var _lib_hooks_useAppStorage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/hooks/useAppStorage */ "./src/app/lib/hooks/useAppStorage.js");
/* harmony import */ var _lib_sceneLoader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/sceneLoader */ "./src/app/lib/sceneLoader.js");
/* harmony import */ var _shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @shared/model/componentTypes */ "./src/shared/model/componentTypes.js");














const {
  getBufferPolygons,
  setBufferPolygons,
  addPolygonToBuffer,
  removePolygonFromBuffer,
} = (0,_lib_hooks_useBufferPolygons__WEBPACK_IMPORTED_MODULE_4__.useBufferPolygons)();

const { loadAppData, saveAppData, clearAppData } = (0,_lib_hooks_useAppStorage__WEBPACK_IMPORTED_MODULE_10__.useAppStorage)();

class App extends HTMLElement {
  constructor() {
    super();

    this.bufferContainer = null;
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.initListeners();
    this.bufferContainer = this.querySelector("buffer-container");

    const grid = new _entities_grid_model_Grid__WEBPACK_IMPORTED_MODULE_1__.Grid({
      offset: 50,
    });

    (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_9__.addSceneElement)(grid);
    const { bufferPolygons, scenePolygons } = loadAppData();

    if (bufferPolygons) {
      setBufferPolygons(bufferPolygons);
      this.updateBuffer();
    }

    if (scenePolygons) {
      (0,_lib_sceneLoader__WEBPACK_IMPORTED_MODULE_11__.loadSceneComponents)(scenePolygons);
    }
  }

  onPolygonDroppedOnCanvas({ detail }) {
    (0,_features_canvas_dropPolygon__WEBPACK_IMPORTED_MODULE_3__.onPolygonDropped)(detail, getBufferPolygons());
    removePolygonFromBuffer(detail.elementId);
    this.updateBuffer();
  }

  onPolygonOutOfCanvas({ id }) {
    this.style.cursor = "grab";
    this.bufferContainer.setIsExpectingElement(id);
  }

  onPolygonDroppedToBufferContainer() {
    const element = (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_9__.getSceneElementById)(this.bufferContainer.expectedElementId);

    if (!element) {
      console.error("can't find dropped element from canvas to buffer");
      return;
    }

    addPolygonToBuffer((0,_features_polygon_create__WEBPACK_IMPORTED_MODULE_2__.createSvgPolygonData)(element));

    this.updateBuffer();
    (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_9__.removeSceneElement)(this.bufferContainer.expectedElementId);
    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_6__.publishEvent)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_7__.canvasEvents.RENDER_SCENE);
  }

  onMouseUp() {
    if (!this.bufferContainer.isExpectingElement) {
      return;
    }

    this.bufferContainer.cancelExpectingElement();
    this.style.cursor = "default";
  }

  updateBuffer() {
    this.bufferContainer.setAttribute(
      "polygons",
      JSON.stringify(getBufferPolygons()),
    );
  }

  initListeners() {
    this.addEventListener(_widgets_AppHeader_model_events__WEBPACK_IMPORTED_MODULE_0__.headerEvents.CREATE_CLICK, (e) => {
      setBufferPolygons((0,_features_polygon_create__WEBPACK_IMPORTED_MODULE_2__.createRandomSvgPolygonData)());
      this.updateBuffer();
    });

    this.addEventListener(_widgets_AppHeader_model_events__WEBPACK_IMPORTED_MODULE_0__.headerEvents.SAVE_CLICK, () =>
      saveAppData(
        getBufferPolygons(),
        (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_9__.getSceneElements)().filter((el) => el.getType() !== _shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_12__.componentTypes.GRID),
      ),
    );

    this.addEventListener(_widgets_AppHeader_model_events__WEBPACK_IMPORTED_MODULE_0__.headerEvents.CLEAR_CLICK, () => {
      setBufferPolygons([]);
      (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_9__.clearScene)();
      clearAppData();
      this.updateBuffer();
      (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_6__.publishEvent)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_7__.canvasEvents.RENDER_SCENE);
    });

    this.addEventListener(
      _entities_canvas_model_domEvents__WEBPACK_IMPORTED_MODULE_5__.canvasDomEvents.DROP_ELEMENT,
      this.onPolygonDroppedOnCanvas.bind(this),
    );

    this.addEventListener(
      _widgets_BufferContainer_model_events__WEBPACK_IMPORTED_MODULE_8__.bufferContainerEvents.ELEMENT_DROPPED,
      this.onPolygonDroppedToBufferContainer.bind(this),
    );

    this.addEventListener("mouseup", this.onMouseUp.bind(this));

    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_6__.subscribe)(
      _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_7__.canvasEvents.MOVED_ELEMENT_OUTSIDE,
      this.onPolygonOutOfCanvas.bind(this),
    );
  }

  render() {
    return `
      <app-header></app-header>
      <default-main-layout>
          <buffer-container></buffer-container>    
          <droppable-canvas></droppable-canvas>    
      </default-main-layout>
    `;
  }
}

customElements.define("app-component", App);


/***/ }),

/***/ "./src/app/lib/hooks/useAppStorage.js":
/*!********************************************!*\
  !*** ./src/app/lib/hooks/useAppStorage.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAppStorage: () => (/* binding */ useAppStorage)
/* harmony export */ });
const appStorageKey = {
  bufferContainerData: "bufferContainerData",
  canvasData: "canvasData",
};

const useAppStorage = () => {
  const loadAppData = () => {
    const parseLoadedData = (data) => JSON.parse(data);
    const load = (key) => window.localStorage.getItem(key);

    const { bufferContainerData, canvasData } = appStorageKey;

    return {
      bufferPolygons: parseLoadedData(load(bufferContainerData)),
      scenePolygons: parseLoadedData(load(canvasData)),
    };
  };

  const saveAppData = (bufferPolygons, scenePolygons) => {
    const save = (key, data) =>
      window.localStorage.setItem(key, JSON.stringify(data));

    const { bufferContainerData, canvasData } = appStorageKey;

    save(bufferContainerData, bufferPolygons);
    save(canvasData, scenePolygons);
  };

  const clearAppData = () => {
    const clear = (key) => window.localStorage.removeItem(key);

    const { bufferContainerData, canvasData } = appStorageKey;

    clear(bufferContainerData);
    clear(canvasData);
  };

  return {
    loadAppData,
    saveAppData,
    clearAppData,
  };
};


/***/ }),

/***/ "./src/app/lib/hooks/useBufferPolygons.js":
/*!************************************************!*\
  !*** ./src/app/lib/hooks/useBufferPolygons.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBufferPolygons: () => (/* binding */ useBufferPolygons)
/* harmony export */ });
const useBufferPolygons = () => {
  const buffer = {
    polygons: [],
  };

  const setBufferPolygons = (newPolygons) => (buffer.polygons = newPolygons);

  const getBufferPolygons = () => [...buffer.polygons];

  const addPolygonToBuffer = (polygon) => buffer.polygons.push(polygon);

  const removePolygonFromBuffer = (polygonId) => {
    buffer.polygons = buffer.polygons.filter(({ id }) => id !== polygonId);
  };

  return {
    getBufferPolygons,
    setBufferPolygons,
    addPolygonToBuffer,
    removePolygonFromBuffer,
  };
};


/***/ }),

/***/ "./src/app/lib/sceneLoader.js":
/*!************************************!*\
  !*** ./src/app/lib/sceneLoader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadSceneComponents: () => (/* binding */ loadSceneComponents)
/* harmony export */ });
/* harmony import */ var _entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @entities/scene/lib/scene */ "./src/entities/scene/lib/scene.js");
/* harmony import */ var _entities_polygon_model_Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities/polygon/model/Polygon */ "./src/entities/polygon/model/Polygon.js");



const componentVariants = {
  POLYGON: _entities_polygon_model_Polygon__WEBPACK_IMPORTED_MODULE_1__.Polygon,
};

const loadSceneComponents = (components) => {
  components.forEach((componentData) => {
    const componentBuildFunction = componentVariants[componentData.type];

    if (!componentBuildFunction) {
      return;
    }

    const component = new componentBuildFunction(componentData);

    if (!component) {
      return;
    }

    (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_0__.addSceneElement)(component);
  });
};


/***/ }),

/***/ "./src/entities/canvas/index.js":
/*!**************************************!*\
  !*** ./src/entities/canvas/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/entities/canvas/ui/index.js");



/***/ }),

/***/ "./src/entities/canvas/lib/canvasSize.js":
/*!***********************************************!*\
  !*** ./src/entities/canvas/lib/canvasSize.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanvasSize: () => (/* binding */ getCanvasSize)
/* harmony export */ });
const contentContainer = {
  verticalPadding: 64,
  horizontalPadding: 80,
  gap: 16,
};

const headerHeight = 74;
const bufferContainerHeight = 150;

const getCanvasSize = () => ({
  width: window.innerWidth - contentContainer.horizontalPadding,
  height:
    window.innerHeight -
    contentContainer.verticalPadding -
    contentContainer.gap -
    headerHeight -
    bufferContainerHeight,
});


/***/ }),

/***/ "./src/entities/canvas/lib/mappers/coordinates.js":
/*!********************************************************!*\
  !*** ./src/entities/canvas/lib/mappers/coordinates.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapScreenCoordinatesToCanvas: () => (/* binding */ mapScreenCoordinatesToCanvas)
/* harmony export */ });
const mapScreenCoordinatesToCanvas = (
  canvas,
  { clientX, clientY },
  { x, y, scale },
) => {
  const rect = canvas.getBoundingClientRect();

  return {
    canvasX: (clientX - rect.left - x) / scale,
    canvasY: (clientY - rect.top - y) / scale,
  };
};


/***/ }),

/***/ "./src/entities/canvas/model/domEvents.js":
/*!************************************************!*\
  !*** ./src/entities/canvas/model/domEvents.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvasDomEvents: () => (/* binding */ canvasDomEvents),
/* harmony export */   createDropElementEvent: () => (/* binding */ createDropElementEvent)
/* harmony export */ });
const canvasDomEvents = {
  DROP_ELEMENT: "DROP_ELEMENT",
};

const createDefaultCanvasEvent = (event, detail) =>
  new CustomEvent(event, {
    composed: true,
    bubbles: true,
    detail,
  });

const createDropElementEvent = (detail) =>
  createDefaultCanvasEvent(canvasDomEvents.DROP_ELEMENT, detail);


/***/ }),

/***/ "./src/entities/canvas/ui/BaseCanvas.js":
/*!**********************************************!*\
  !*** ./src/entities/canvas/ui/BaseCanvas.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseCanvas: () => (/* binding */ BaseCanvas)
/* harmony export */ });
/* harmony import */ var _lib_canvasSize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/canvasSize */ "./src/entities/canvas/lib/canvasSize.js");


class BaseCanvas extends HTMLElement {
  constructor() {
    super();
    this.canvas = null;
    this.ctx = null;
  }

  init() {
    this.canvas = this.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.backgroundColor = "white";
    this.setScale();
  }

  setScale() {
    const ratio = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width * ratio;
    const height = rect.height * ratio;

    this.ctx.scale(ratio, ratio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.init();
  }

  render() {
    const { width, height } = (0,_lib_canvasSize__WEBPACK_IMPORTED_MODULE_0__.getCanvasSize)();

    return `
        <style>
            canvas {
                flex: 1
                border-radius: 10px;
                user-select: none;
            }
         </style>
        <canvas width="${width}" height="${height}" draggable="false"></canvas>`;
  }
}


/***/ }),

/***/ "./src/entities/canvas/ui/ContolledCanvas.js":
/*!***************************************************!*\
  !*** ./src/entities/canvas/ui/ContolledCanvas.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ControlledCanvas: () => (/* binding */ ControlledCanvas)
/* harmony export */ });
/* harmony import */ var _BaseCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCanvas */ "./src/entities/canvas/ui/BaseCanvas.js");
/* harmony import */ var _entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities/scene/lib/scene */ "./src/entities/scene/lib/scene.js");
/* harmony import */ var _shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/lib/eventBus */ "./src/shared/lib/eventBus.js");
/* harmony import */ var _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/model/canvasEvents */ "./src/shared/model/canvasEvents.js");
/* harmony import */ var _lib_mappers_coordinates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/mappers/coordinates */ "./src/entities/canvas/lib/mappers/coordinates.js");
/* harmony import */ var _entities_scene_model_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @entities/scene/model/events */ "./src/entities/scene/model/events.js");








class ControlledCanvas extends _BaseCanvas__WEBPACK_IMPORTED_MODULE_0__.BaseCanvas {
  constructor() {
    super();
    this.viewportTransform = {
      x: 0,
      y: 0,
      scale: 1,
    };
    this.prevMousePosition = {
      x: 0,
      y: 0,
    };
    this.controls = {
      panning: true,
      elementMovement: false,
    };
    this.mouseMoveListener = null;
    this.movingElementId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.initListeners();
    this.renderScene();
  }

  initListeners() {
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
    this.canvas.addEventListener("wheel", this.onMouseWheel.bind(this));
    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.subscribe)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.RENDER_SCENE, this.renderScene.bind(this));
    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.subscribe)(
      _entities_scene_model_events__WEBPACK_IMPORTED_MODULE_5__.sceneEvents.SELECTED_ELEMENT,
      this.onSceneElementSelected.bind(this),
    );
  }

  onMouseDown({ clientX, clientY }) {
    this.prevMousePosition.y = clientY;
    this.prevMousePosition.x = clientX;

    const { canvasX, canvasY } = (0,_lib_mappers_coordinates__WEBPACK_IMPORTED_MODULE_4__.mapScreenCoordinatesToCanvas)(
      this.canvas,
      { clientX, clientY },
      this.viewportTransform,
    );

    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.publishEvent)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.MOUSE_DOWN, { x: canvasX, y: canvasY });

    this.mouseMoveListener = this.onMouseMove.bind(this);
    this.canvas.addEventListener("mousemove", this.mouseMoveListener, false);
  }

  onMouseMove({ clientX, clientY }) {
    if (this.controls.panning) {
      this.viewportTransform.x += clientX - this.prevMousePosition.x;
      this.viewportTransform.y += clientY - this.prevMousePosition.y;
    }

    if (this.movingElementId && this.controls.elementMovement) {
      (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.publishEvent)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.MOVE_ELEMENT, {
        id: this.movingElementId,
        dx: clientX - this.prevMousePosition.x,
        dy: clientY - this.prevMousePosition.y,
      });
    }

    this.prevMousePosition.x = clientX;
    this.prevMousePosition.y = clientY;

    this.renderScene();
  }

  onMouseUp() {
    this.canvas.removeEventListener("mousemove", this.mouseMoveListener, false);
    this.resetControls();
  }

  onMouseOut() {
    if (this.movingElementId) {
      (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.publishEvent)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.MOVED_ELEMENT_OUTSIDE, {
        id: this.movingElementId,
      });
    }

    this.onMouseUp();
  }

  onMouseWheel(event) {
    event.preventDefault();
    const { clientX, clientY, deltaY } = event;
    const { x: oldX, y: oldY, scale: oldScale } = this.viewportTransform;

    const invertedDelta = deltaY * -0.01;
    const newScale = oldScale + invertedDelta;

    if (newScale <= 0) {
      return;
    }

    const updatePosition = (oldValue, newValue) =>
      newValue - (newValue - oldValue) * (newScale / oldScale);

    this.viewportTransform.x = updatePosition(oldX, clientX);
    this.viewportTransform.y = updatePosition(oldY, clientY);
    this.viewportTransform.scale = newScale;

    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.publishEvent)(
      invertedDelta > 0 ? _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.ZOOM_IN : _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.ZOOM_OUT,
    );

    this.renderScene();
  }

  onSceneElementSelected(elementId) {
    this.controls.panning = false;
    this.controls.elementMovement = true;
    this.movingElementId = elementId;
  }

  resetControls() {
    this.controls.panning = true;
    this.controls.elementMovement = false;
    this.movingElementId = null;
  }

  applyTransform() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const { scale, x, y } = this.viewportTransform;
    this.ctx.setTransform(scale, 0, 0, scale, x, y);
  }

  renderScene() {
    this.applyTransform();
    (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_1__.getSceneElements)().forEach((el) => el.draw(this.ctx));
  }
}

customElements.define("controlled-canvas", ControlledCanvas);


/***/ }),

/***/ "./src/entities/canvas/ui/DroppableCanvas.js":
/*!***************************************************!*\
  !*** ./src/entities/canvas/ui/DroppableCanvas.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContolledCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContolledCanvas */ "./src/entities/canvas/ui/ContolledCanvas.js");
/* harmony import */ var _lib_mappers_coordinates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/mappers/coordinates */ "./src/entities/canvas/lib/mappers/coordinates.js");
/* harmony import */ var _model_domEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/domEvents */ "./src/entities/canvas/model/domEvents.js");




class DroppableCanvas extends _ContolledCanvas__WEBPACK_IMPORTED_MODULE_0__.ControlledCanvas {
  initListeners() {
    super.initListeners();
    this.canvas.addEventListener("dragover", this.onDragOverElement.bind(this));
    this.canvas.addEventListener("drop", this.onDropElement.bind(this));
  }

  onDragOverElement(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  onDropElement(event) {
    event.preventDefault();

    const elementId = event.dataTransfer.getData("text/plain");

    if (!elementId) {
      return;
    }

    const { canvasX, canvasY } = (0,_lib_mappers_coordinates__WEBPACK_IMPORTED_MODULE_1__.mapScreenCoordinatesToCanvas)(
      this.canvas,
      event,
      this.viewportTransform,
    );

    this.dispatchEvent(
      (0,_model_domEvents__WEBPACK_IMPORTED_MODULE_2__.createDropElementEvent)({
        elementId,
        x: canvasX,
        y: canvasY,
      }),
    );
  }
}

customElements.define("droppable-canvas", DroppableCanvas);


/***/ }),

/***/ "./src/entities/canvas/ui/index.js":
/*!*****************************************!*\
  !*** ./src/entities/canvas/ui/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DroppableCanvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DroppableCanvas */ "./src/entities/canvas/ui/DroppableCanvas.js");



/***/ }),

/***/ "./src/entities/grid/model/Grid.js":
/*!*****************************************!*\
  !*** ./src/entities/grid/model/Grid.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var _shared_model_BaseSceneElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/model/BaseSceneElement */ "./src/shared/model/BaseSceneElement.js");
/* harmony import */ var _shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/lib/eventBus */ "./src/shared/lib/eventBus.js");
/* harmony import */ var _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/model/canvasEvents */ "./src/shared/model/canvasEvents.js");
/* harmony import */ var _shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/model/componentTypes */ "./src/shared/model/componentTypes.js");





class Grid extends _shared_model_BaseSceneElement__WEBPACK_IMPORTED_MODULE_0__.BaseSceneElement {
  constructor({
    id,
    lineWidth = 1,
    cellWidth = 25,
    cellHeight = 25,
    offset = 0,
    fontSize = 8,
    textOffset = 25,
    color = "#000000",
  } = {}) {
    super(_shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_3__.componentTypes.GRID, id);

    this.originOptions = { cellWidth, cellHeight };
    this.options = { lineWidth, cellWidth, cellHeight, offset, color };
    this.measureOptions = { fontSize, offset: textOffset };

    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__.subscribe)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_2__.canvasEvents.ZOOM_IN, this.increaseCellSize.bind(this));
    (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__.subscribe)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_2__.canvasEvents.ZOOM_OUT, this.decreaseCellSize.bind(this));
  }

  increaseCellSize() {
    const { cellWidth, cellHeight } = this.originOptions;
    this.options.cellWidth += cellWidth;
    this.options.cellHeight += cellHeight;
  }

  decreaseCellSize() {
    const { cellWidth, cellHeight } = this.originOptions;

    this.options.cellWidth -= cellWidth;
    this.options.cellHeight -= cellHeight;
  }

  draw(ctx) {
    const { lineWidth, color } = this.options;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    this.drawVerticalLines(ctx);
    this.drawHorizontalLines(ctx);
  }

  drawVerticalLine(ctx, startX, startY, endX, endY, text) {
    const { offset: measureOffset } = this.measureOptions;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    if (text) {
      this.drawMeasureText(ctx, startX, endY + measureOffset, text);
    }
    ctx.stroke();
  }

  drawVerticalLines(ctx) {
    const { cellWidth, offset } = this.options;

    const maxHeight = ctx.canvas.height - offset;
    const maxWidth = ctx.canvas.width - offset;

    for (let i = offset; i <= maxWidth; i += cellWidth) {
      this.drawVerticalLine(ctx, i, offset, i, maxHeight, `${i - offset}`);
    }

    this.drawVerticalLine(ctx, maxWidth, offset, maxWidth, maxHeight);

    this.drawDefaultText(
      ctx,
      `${maxWidth - offset}`,
      maxWidth,
      maxHeight + this.measureOptions.offset,
    );
  }

  drawHorizontalLine(ctx, startX, startY, endX, endY, text) {
    const { offset: measureOffset } = this.measureOptions;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);

    if (text) {
      this.drawMeasureText(ctx, startX - measureOffset, endY, text, true);
    }

    ctx.stroke();
  }

  drawHorizontalLines(ctx) {
    const { cellHeight, offset } = this.options;
    const { offset: measureOffset } = this.measureOptions;

    const maxHeight = ctx.canvas.height - offset;
    const maxWidth = ctx.canvas.width - offset;

    for (let i = offset; i < maxHeight; i += cellHeight) {
      this.drawHorizontalLine(ctx, offset, i, maxWidth, i, `${maxHeight - i}`);
    }

    this.drawHorizontalLine(ctx, offset, maxHeight, maxWidth, maxHeight, "0");
  }

  drawMeasureText(ctx, x, y, text, isHorizontalAlign = false) {
    const { fontSize } = this.measureOptions;
    const { width } = ctx.measureText(text);

    const xPosition = isHorizontalAlign ? x : x - width / 2;
    const yPosition = isHorizontalAlign ? y + fontSize / 2 : y;
    this.drawDefaultText(ctx, text, xPosition, yPosition);
  }

  drawDefaultText(ctx, text, x, y) {
    const { fontSize } = this.measureOptions;
    ctx.font = `${fontSize}px serif`;
    ctx.strokeText(text, x, y);
  }
}


/***/ }),

/***/ "./src/entities/index.js":
/*!*******************************!*\
  !*** ./src/entities/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/entities/canvas/index.js");
/* harmony import */ var _polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polygon */ "./src/entities/polygon/index.js");




/***/ }),

/***/ "./src/entities/polygon/index.js":
/*!***************************************!*\
  !*** ./src/entities/polygon/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_PolygonSvg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/PolygonSvg */ "./src/entities/polygon/ui/PolygonSvg.js");



/***/ }),

/***/ "./src/entities/polygon/lib/mappers/points.js":
/*!****************************************************!*\
  !*** ./src/entities/polygon/lib/mappers/points.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapPolygonPointsToSvgPoints: () => (/* binding */ mapPolygonPointsToSvgPoints)
/* harmony export */ });
const mapPolygonPointsToSvgPoints = (points) =>
  points.map(({ x, y }) => `${x},${y}`).join(" ");


/***/ }),

/***/ "./src/entities/polygon/lib/points.js":
/*!********************************************!*\
  !*** ./src/entities/polygon/lib/points.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPolygonPoints: () => (/* binding */ createPolygonPoints)
/* harmony export */ });
/* harmony import */ var convex_hull__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! convex-hull */ "./node_modules/convex-hull/ch.js");
/* harmony import */ var convex_hull__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(convex_hull__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_lib_hooks_useArrayRange__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/lib/hooks/useArrayRange */ "./src/shared/lib/hooks/useArrayRange.js");



const createPolygonPoints = (pointsCount, maxWidth, maxHeight) => {
  const vertices = (0,_shared_lib_hooks_useArrayRange__WEBPACK_IMPORTED_MODULE_1__.useArrayRange)(pointsCount).map(() => ({
    x: Math.random() * maxWidth,
    y: Math.random() * maxHeight,
  }));

  const convexHullVertices = vertices.map(({ x, y }) => [x, y]);

  return convex_hull__WEBPACK_IMPORTED_MODULE_0___default()(convexHullVertices).map(([prev, next], index) => {
    if (index === 0) {
      return vertices[prev];
    }

    return vertices[next];
  });
};


/***/ }),

/***/ "./src/entities/polygon/model/Polygon.js":
/*!***********************************************!*\
  !*** ./src/entities/polygon/model/Polygon.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Polygon: () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _shared_model_BaseSceneElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/model/BaseSceneElement */ "./src/shared/model/BaseSceneElement.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/entities/polygon/model/constants.js");
/* harmony import */ var _shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/model/componentTypes */ "./src/shared/model/componentTypes.js");




class Polygon extends _shared_model_BaseSceneElement__WEBPACK_IMPORTED_MODULE_0__.BaseSceneElement {
  constructor({
    id,
    position,
    points,
    color = _constants__WEBPACK_IMPORTED_MODULE_1__.polygonOptions.color,
    borderColor = _constants__WEBPACK_IMPORTED_MODULE_1__.polygonOptions.borderColor,
    borderWidth = _constants__WEBPACK_IMPORTED_MODULE_1__.polygonOptions.borderWidth,
  }) {
    super(_shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_2__.componentTypes.POLYGON, id);
    this.position = position;
    this.points = points;
    this.options = { color, borderColor, borderWidth };
  }

  draw(ctx) {
    const { x: globalX, y: globalY } = this.position;
    const { color, borderColor, borderWidth } = this.options;

    ctx.fillStyle = color;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.beginPath();

    this.points.forEach(({ x, y }) => {
      ctx.lineTo(globalX + x, globalY + y);
    });

    ctx.fill();
    ctx.stroke();
  }

  translate(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
  }
}


/***/ }),

/***/ "./src/entities/polygon/model/constants.js":
/*!*************************************************!*\
  !*** ./src/entities/polygon/model/constants.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   polygonOptions: () => (/* binding */ polygonOptions)
/* harmony export */ });
const polygonOptions = {
  svgPolygonWidth: 75,
  svgPolygonHeight: 75,
  color: "#950227",
  borderColor: "#45272e",
  borderWidth: 3,
};


/***/ }),

/***/ "./src/entities/polygon/ui/PolygonSvg.js":
/*!***********************************************!*\
  !*** ./src/entities/polygon/ui/PolygonSvg.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/constants */ "./src/entities/polygon/model/constants.js");


class PolygonSvg extends HTMLElement {
  get height() {
    return this.getAttribute("height");
  }

  set height(newHeight) {
    this.setAttribute("height", newHeight);
  }

  get width() {
    return this.getAttribute("width");
  }

  set width(newWidth) {
    this.setAttribute("width", newWidth);
  }

  get points() {
    return this.getAttribute("points");
  }

  set points(newPoints) {
    this.setAttribute("points", newPoints);
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.initListeners();
  }

  initListeners() {
    this.querySelector("div")?.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
    });
  }

  render() {
    const { color, borderColor, borderWidth } = _model_constants__WEBPACK_IMPORTED_MODULE_0__.polygonOptions;

    return `
     <div draggable="true"> 
        <svg height="${this.height}" width="${this.width}"  xmlns="http://www.w3.org/2000/svg">
            <polygon points="${this.points}" style="fill:${color};stroke:${borderColor};stroke-width:${borderWidth}"></polygon>
        </svg>
    </div>
    `;
  }
}

customElements.define("polygon-svg", PolygonSvg);


/***/ }),

/***/ "./src/entities/scene/lib/hooks/useScene.js":
/*!**************************************************!*\
  !*** ./src/entities/scene/lib/hooks/useScene.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useScene: () => (/* binding */ useScene)
/* harmony export */ });
/* harmony import */ var _shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/model/componentTypes */ "./src/shared/model/componentTypes.js");


const useScene = () => {
  const scene = {
    children: [],
  };

  const addSceneElement = (element) => scene.children.push(element);

  const removeSceneElement = (targetId) =>
    (scene.children = scene.children.filter((el) => targetId !== el.getId()));

  const clearScene = () =>
    (scene.children = scene.children.filter(
      (el) => el.getType() === _shared_model_componentTypes__WEBPACK_IMPORTED_MODULE_0__.componentTypes.GRID,
    ));

  const getSceneElements = () => [...scene.children];

  const getSceneElementById = (id) =>
    scene.children.find((el) => el.getId() === id);

  return {
    addSceneElement,
    removeSceneElement,
    getSceneElements,
    getSceneElementById,
    clearScene,
  };
};


/***/ }),

/***/ "./src/entities/scene/lib/hooks/useSceneListeners.js":
/*!***********************************************************!*\
  !*** ./src/entities/scene/lib/hooks/useSceneListeners.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSceneListeners: () => (/* binding */ useSceneListeners)
/* harmony export */ });
/* harmony import */ var _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/model/canvasEvents */ "./src/shared/model/canvasEvents.js");
/* harmony import */ var _shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/lib/eventBus */ "./src/shared/lib/eventBus.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scene */ "./src/entities/scene/lib/scene.js");
/* harmony import */ var _model_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../model/events */ "./src/entities/scene/model/events.js");
/* harmony import */ var _intersection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../intersection */ "./src/entities/scene/lib/intersection.js");






const useSceneListeners = () => {
  const onSceneSelected = ({ x, y }) => {
    const res = (0,_scene__WEBPACK_IMPORTED_MODULE_2__.getSceneElements)().filter((el) =>
      (0,_intersection__WEBPACK_IMPORTED_MODULE_4__.isGraphicalObjectIntersected)(x, y, el),
    );

    if (res.length) {
      (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__.publishEvent)(_model_events__WEBPACK_IMPORTED_MODULE_3__.sceneEvents.SELECTED_ELEMENT, res[0].getId());
    }
  };

  const onElementMove = ({ id, dx, dy }) => {
    const el = (0,_scene__WEBPACK_IMPORTED_MODULE_2__.getSceneElementById)(id);

    if (el) {
      el.translate(dx, dy);
    }
  };

  (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__.subscribe)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_0__.canvasEvents.MOUSE_DOWN, onSceneSelected);
  (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_1__.subscribe)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_0__.canvasEvents.MOVE_ELEMENT, onElementMove);
};


/***/ }),

/***/ "./src/entities/scene/lib/intersection.js":
/*!************************************************!*\
  !*** ./src/entities/scene/lib/intersection.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isGraphicalObjectIntersected: () => (/* binding */ isGraphicalObjectIntersected)
/* harmony export */ });
const isGraphicalObjectIntersected = (x, y, object) => {
  const { points, position } = object;

  if (!points || !position) {
    return false;
  }

  const xs = points.map(({ x }) => x + position.x);
  const ys = points.map(({ y }) => y + position.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return x >= minX && x <= maxX && y >= minY && y <= maxY;
};


/***/ }),

/***/ "./src/entities/scene/lib/scene.js":
/*!*****************************************!*\
  !*** ./src/entities/scene/lib/scene.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSceneElement: () => (/* binding */ addSceneElement),
/* harmony export */   clearScene: () => (/* binding */ clearScene),
/* harmony export */   getSceneElementById: () => (/* binding */ getSceneElementById),
/* harmony export */   getSceneElements: () => (/* binding */ getSceneElements),
/* harmony export */   removeSceneElement: () => (/* binding */ removeSceneElement)
/* harmony export */ });
/* harmony import */ var _hooks_useScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hooks/useScene */ "./src/entities/scene/lib/hooks/useScene.js");
/* harmony import */ var _hooks_useSceneListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/useSceneListeners */ "./src/entities/scene/lib/hooks/useSceneListeners.js");



const {
  addSceneElement,
  removeSceneElement,
  getSceneElements,
  getSceneElementById,
  clearScene,
} = (0,_hooks_useScene__WEBPACK_IMPORTED_MODULE_0__.useScene)();

(0,_hooks_useSceneListeners__WEBPACK_IMPORTED_MODULE_1__.useSceneListeners)();


/***/ }),

/***/ "./src/entities/scene/model/events.js":
/*!********************************************!*\
  !*** ./src/entities/scene/model/events.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sceneEvents: () => (/* binding */ sceneEvents)
/* harmony export */ });
const sceneEvents = {
  SELECTED_ELEMENT: "SELECTED_ELEMENT",
};


/***/ }),

/***/ "./src/features/canvas/dropPolygon.js":
/*!********************************************!*\
  !*** ./src/features/canvas/dropPolygon.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onPolygonDropped: () => (/* binding */ onPolygonDropped)
/* harmony export */ });
/* harmony import */ var _entities_polygon_model_Polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @entities/polygon/model/Polygon */ "./src/entities/polygon/model/Polygon.js");
/* harmony import */ var _entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities/scene/lib/scene */ "./src/entities/scene/lib/scene.js");
/* harmony import */ var _shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/lib/eventBus */ "./src/shared/lib/eventBus.js");
/* harmony import */ var _shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/model/canvasEvents */ "./src/shared/model/canvasEvents.js");
/* harmony import */ var _entities_polygon_model_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @entities/polygon/model/constants */ "./src/entities/polygon/model/constants.js");






function onPolygonDropped({ x, y, elementId }, bufferPolygons) {
  const elementData = bufferPolygons.find(({ id }) => id === elementId);

  if (!elementData) {
    return;
  }

  const { id, points } = elementData;

  const polygon = new _entities_polygon_model_Polygon__WEBPACK_IMPORTED_MODULE_0__.Polygon({
    id,
    position: { x, y },
    points,
    borderWidth: _entities_polygon_model_constants__WEBPACK_IMPORTED_MODULE_4__.polygonOptions.borderWidth,
  });

  (0,_entities_scene_lib_scene__WEBPACK_IMPORTED_MODULE_1__.addSceneElement)(polygon);
  (0,_shared_lib_eventBus__WEBPACK_IMPORTED_MODULE_2__.publishEvent)(_shared_model_canvasEvents__WEBPACK_IMPORTED_MODULE_3__.canvasEvents.RENDER_SCENE);
}


/***/ }),

/***/ "./src/features/polygon/create.js":
/*!****************************************!*\
  !*** ./src/features/polygon/create.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPolygonSvgElement: () => (/* binding */ createPolygonSvgElement),
/* harmony export */   createRandomSvgPolygonData: () => (/* binding */ createRandomSvgPolygonData),
/* harmony export */   createSvgPolygonData: () => (/* binding */ createSvgPolygonData)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _entities_polygon_model_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @entities/polygon/model/constants */ "./src/entities/polygon/model/constants.js");
/* harmony import */ var _shared_lib_hooks_useGetRandomArbitrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/lib/hooks/useGetRandomArbitrary */ "./src/shared/lib/hooks/useGetRandomArbitrary.js");
/* harmony import */ var _shared_lib_hooks_useArrayRange__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/lib/hooks/useArrayRange */ "./src/shared/lib/hooks/useArrayRange.js");
/* harmony import */ var _entities_polygon_lib_points__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @entities/polygon/lib/points */ "./src/entities/polygon/lib/points.js");
/* harmony import */ var _entities_polygon_lib_mappers_points__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @entities/polygon/lib/mappers/points */ "./src/entities/polygon/lib/mappers/points.js");







const createRandomSvgPolygonData = () => {
  const polygonCount = (0,_shared_lib_hooks_useGetRandomArbitrary__WEBPACK_IMPORTED_MODULE_2__.useGetRandomArbitrary)(5, 20);
  const buffer = (0,_shared_lib_hooks_useArrayRange__WEBPACK_IMPORTED_MODULE_3__.useArrayRange)(polygonCount);

  return buffer.map(() => createSvgPolygonData());
};

const createSvgPolygonData = ({ points, id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])() } = {}) => {
  const { svgPolygonWidth: width, svgPolygonHeight: height } = _entities_polygon_model_constants__WEBPACK_IMPORTED_MODULE_1__.polygonOptions;

  return {
    id,
    points: points || (0,_entities_polygon_lib_points__WEBPACK_IMPORTED_MODULE_4__.createPolygonPoints)(10, width, height),
    options: {
      width,
      height,
    },
  };
};

const createPolygonSvgElement = ({ id, points, options }) => {
  const mappedPoints = (0,_entities_polygon_lib_mappers_points__WEBPACK_IMPORTED_MODULE_5__.mapPolygonPointsToSvgPoints)(points);

  const element = document.createElement("polygon-svg");
  element.id = id;
  element.points = mappedPoints;
  element.width = options.width;
  element.height = options.height;

  return element;
};


/***/ }),

/***/ "./src/shared/lib/eventBus.js":
/*!************************************!*\
  !*** ./src/shared/lib/eventBus.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   publishEvent: () => (/* binding */ publishEvent),
/* harmony export */   subscribe: () => (/* binding */ subscribe),
/* harmony export */   unsubscribe: () => (/* binding */ unsubscribe)
/* harmony export */ });
const listeners = {};

const subscribe = (event, callback) => {
  if (!listeners[event]) {
    listeners[event] = [];
  }

  listeners[event].push(callback);
};

const unsubscribe = (event, callback) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event] = listeners[event].filter((cb) => cb !== callback);
};

const publishEvent = (event, data) => {
  if (!listeners[event]) {
    return;
  }

  listeners[event].forEach((callback) => callback(data));
};


/***/ }),

/***/ "./src/shared/lib/hooks/useArrayRange.js":
/*!***********************************************!*\
  !*** ./src/shared/lib/hooks/useArrayRange.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useArrayRange: () => (/* binding */ useArrayRange)
/* harmony export */ });
const useArrayRange = (range) => Array.from(Array(range).keys());


/***/ }),

/***/ "./src/shared/lib/hooks/useGetRandomArbitrary.js":
/*!*******************************************************!*\
  !*** ./src/shared/lib/hooks/useGetRandomArbitrary.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGetRandomArbitrary: () => (/* binding */ useGetRandomArbitrary)
/* harmony export */ });
const useGetRandomArbitrary = (min, max) =>
  Math.round(Math.random() * (max - min) + min);


/***/ }),

/***/ "./src/shared/model/BaseSceneElement.js":
/*!**********************************************!*\
  !*** ./src/shared/model/BaseSceneElement.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseSceneElement: () => (/* binding */ BaseSceneElement)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


class BaseSceneElement {
  constructor(type, id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
    this.id = id;
    this.type = type;
  }

  draw(ctx) {}

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }
}


/***/ }),

/***/ "./src/shared/model/canvasEvents.js":
/*!******************************************!*\
  !*** ./src/shared/model/canvasEvents.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvasEvents: () => (/* binding */ canvasEvents)
/* harmony export */ });
const canvasEvents = {
  ZOOM_IN: "ZOOM_IN",
  ZOOM_OUT: "ZOOM_OUT",
  MOUSE_DOWN: "MOUSE_DOWN",
  MOVE_ELEMENT: "MOVE_ELEMENT",
  MOVED_ELEMENT_OUTSIDE: "MOVED_ELEMENT_OUTSIDE",
  RENDER_SCENE: "RENDER",
};


/***/ }),

/***/ "./src/shared/model/componentTypes.js":
/*!********************************************!*\
  !*** ./src/shared/model/componentTypes.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentTypes: () => (/* binding */ componentTypes)
/* harmony export */ });
const componentTypes = {
  GRID: "GRID",
  POLYGON: "POLYGON",
};


/***/ }),

/***/ "./src/shared/styles/normalize.css":
/*!*****************************************!*\
  !*** ./src/shared/styles/normalize.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./src/shared/styles/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/shared/styles/variables.css":
/*!*****************************************!*\
  !*** ./src/shared/styles/variables.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./variables.css */ "./node_modules/css-loader/dist/cjs.js!./src/shared/styles/variables.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_variables_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/shared/ui/buttons/BaseButton.js":
/*!*********************************************!*\
  !*** ./src/shared/ui/buttons/BaseButton.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseButton: () => (/* binding */ BaseButton)
/* harmony export */ });
class BaseButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
  }

  get className() {
    return this.getAttribute("className");
  }

  set className(newClassName) {
    return this.setAttribute("className", newClassName);
  }

  render() {
    return `
        <button class="${this.className}">
            <slot></slot>
        </button>`;
  }
}

customElements.define("base-button", BaseButton);


/***/ }),

/***/ "./src/shared/ui/buttons/DefaultButton.js":
/*!************************************************!*\
  !*** ./src/shared/ui/buttons/DefaultButton.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseButton */ "./src/shared/ui/buttons/BaseButton.js");


class DefaultButton extends _BaseButton__WEBPACK_IMPORTED_MODULE_0__.BaseButton {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "closed" });
    this.shadow.innerHTML = this.render();
  }

  render() {
    return `
        <style>
        .button {
          background-color: var(--accent10);
          border: none;
          font-weight: 600;
          font-family: inherit;
          color: var(--white);
          border-radius: 16px;
          padding: 12px 24px;
          font-size: 16px;
          line-height: 120%;
        
          &:hover {
            cursor: pointer;
            transition: all ease 0.3s;
            background-color: var(--accent20);
          }
        }
        
        </style>
        
        <base-button className="button"/>
    `;
  }
}

customElements.define("default-button", DefaultButton);


/***/ }),

/***/ "./src/shared/ui/index.js":
/*!********************************!*\
  !*** ./src/shared/ui/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buttons_BaseButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttons/BaseButton */ "./src/shared/ui/buttons/BaseButton.js");
/* harmony import */ var _buttons_DefaultButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttons/DefaultButton */ "./src/shared/ui/buttons/DefaultButton.js");
/* harmony import */ var _layouts_DefaultMainLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layouts/DefaultMainLayout */ "./src/shared/ui/layouts/DefaultMainLayout.js");
/* harmony import */ var _layouts_DefaultMainLayout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_layouts_DefaultMainLayout__WEBPACK_IMPORTED_MODULE_2__);





/***/ }),

/***/ "./src/shared/ui/layouts/DefaultMainLayout.js":
/*!****************************************************!*\
  !*** ./src/shared/ui/layouts/DefaultMainLayout.js ***!
  \****************************************************/
/***/ (() => {

class DefaultMainLayout extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "closed" });
    this.shadow.innerHTML = this.render();
  }

  render() {
    return `
        <style>
            main {
                padding: 32px 40px;
                display: flex;
                flex-direction: column;
                gap: 16px;  
            }
        </style>
        
        <main>
            <slot></slot>
        </main>`;
  }
}

customElements.define("default-main-layout", DefaultMainLayout);


/***/ }),

/***/ "./src/widgets/AppHeader/index.js":
/*!****************************************!*\
  !*** ./src/widgets/AppHeader/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/widgets/AppHeader/ui/index.js");



/***/ }),

/***/ "./src/widgets/AppHeader/model/events.js":
/*!***********************************************!*\
  !*** ./src/widgets/AppHeader/model/events.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDefaultHeaderEvent: () => (/* binding */ createDefaultHeaderEvent),
/* harmony export */   headerEvents: () => (/* binding */ headerEvents)
/* harmony export */ });
const headerEvents = {
  CREATE_CLICK: "CREATE_CLICK",
  CLEAR_CLICK: "CLEAR_CLICK",
  SAVE_CLICK: "SAVE_CLICK",
};

const createDefaultHeaderEvent = (eventName) =>
  new CustomEvent(eventName, { bubbles: true, composed: true });


/***/ }),

/***/ "./src/widgets/AppHeader/ui/AppHeader.js":
/*!***********************************************!*\
  !*** ./src/widgets/AppHeader/ui/AppHeader.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/events */ "./src/widgets/AppHeader/model/events.js");


class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
    this.initListeners();
  }

  initListeners() {
    this.querySelector("#createButton")?.addEventListener(
      "click",
      this.onCreate.bind(this),
    );

    this.querySelector("#saveButton")?.addEventListener(
      "click",
      this.onSave.bind(this),
    );

    this.querySelector("#clearButton")?.addEventListener(
      "click",
      this.onClear.bind(this),
    );
  }

  onCreate() {
    this.dispatchEvent((0,_model_events__WEBPACK_IMPORTED_MODULE_0__.createDefaultHeaderEvent)(_model_events__WEBPACK_IMPORTED_MODULE_0__.headerEvents.CREATE_CLICK));
  }

  onClear() {
    this.dispatchEvent((0,_model_events__WEBPACK_IMPORTED_MODULE_0__.createDefaultHeaderEvent)(_model_events__WEBPACK_IMPORTED_MODULE_0__.headerEvents.CLEAR_CLICK));
  }

  onSave() {
    this.dispatchEvent((0,_model_events__WEBPACK_IMPORTED_MODULE_0__.createDefaultHeaderEvent)(_model_events__WEBPACK_IMPORTED_MODULE_0__.headerEvents.SAVE_CLICK));
  }

  render() {
    return `
        <app-header-layout>
            <default-button id="createButton">Создать</default-button>
            <div slot="right-element">
                <default-button id="saveButton">Сохранить</default-button>
                <default-button id="clearButton">Сбросить</default-button>
            </div>
        </app-header-layout>        
    `;
  }
}

customElements.define("app-header", AppHeader);


/***/ }),

/***/ "./src/widgets/AppHeader/ui/index.js":
/*!*******************************************!*\
  !*** ./src/widgets/AppHeader/ui/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layouts_AppHeaderLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/AppHeaderLayout */ "./src/widgets/AppHeader/ui/layouts/AppHeaderLayout.js");
/* harmony import */ var _layouts_AppHeaderLayout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_layouts_AppHeaderLayout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppHeader */ "./src/widgets/AppHeader/ui/AppHeader.js");




/***/ }),

/***/ "./src/widgets/AppHeader/ui/layouts/AppHeaderLayout.js":
/*!*************************************************************!*\
  !*** ./src/widgets/AppHeader/ui/layouts/AppHeaderLayout.js ***!
  \*************************************************************/
/***/ (() => {

class AppHeaderLayout extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.render();
  }

  render() {
    return `
        <style>
            nav {
                background-color: var(--white);
                padding: 14px 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--gray10);
            }
        </style>
        <nav>
            <slot name="left-element"></slot>
            <slot></slot>
            <slot name="right-element"></slot>
        </nav>
    `;
  }
}

customElements.define("app-header-layout", AppHeaderLayout);


/***/ }),

/***/ "./src/widgets/BufferContainer/index.js":
/*!**********************************************!*\
  !*** ./src/widgets/BufferContainer/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/widgets/BufferContainer/ui/index.js");



/***/ }),

/***/ "./src/widgets/BufferContainer/model/events.js":
/*!*****************************************************!*\
  !*** ./src/widgets/BufferContainer/model/events.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bufferContainerEvents: () => (/* binding */ bufferContainerEvents),
/* harmony export */   createElementDroppedEvent: () => (/* binding */ createElementDroppedEvent)
/* harmony export */ });
const bufferContainerEvents = {
  ELEMENT_DROPPED: "ELEMENT_DROPPED",
};

const createBufferContainerEvent = (event) =>
  new CustomEvent(event, { composed: true, bubbles: true });

const createElementDroppedEvent = () =>
  createBufferContainerEvent(bufferContainerEvents.ELEMENT_DROPPED);


/***/ }),

/***/ "./src/widgets/BufferContainer/ui/BaseBufferContainer.js":
/*!***************************************************************!*\
  !*** ./src/widgets/BufferContainer/ui/BaseBufferContainer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseBufferContainer: () => (/* binding */ BaseBufferContainer)
/* harmony export */ });
/* harmony import */ var _features_polygon_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @features/polygon/create */ "./src/features/polygon/create.js");


class BaseBufferContainer extends HTMLElement {
  constructor() {
    super();
    this.polygonContainer = null;
    this.placeholder = null;
  }

  get polygons() {
    return this.getAttribute("polygons");
  }

  set polygons(polygons) {
    this.setAttribute("polygons", polygons);
    this.onPolygonChanged();
  }

  static get observedAttributes() {
    return ["polygons"];
  }

  attributeChangedCallback(prop, prev, next) {
    if (prev === next) {
      return;
    }

    this[prop] = next;
  }

  clearBuffer() {
    if (!this.polygonContainer) {
      return;
    }

    while (this.polygonContainer.firstChild) {
      this.polygonContainer.removeChild(this.polygonContainer.firstChild);
    }
  }

  onPolygonChanged() {
    if (!this.polygons) {
      return;
    }

    this.clearBuffer();
    const parsedPolygons = JSON.parse(this.polygons);

    if (!parsedPolygons) {
      return;
    }

    if (!parsedPolygons.length) {
      this.placeholder.setAttribute("visible", true);
      return;
    }

    parsedPolygons.forEach((polygon) => {
      const svgElement = (0,_features_polygon_create__WEBPACK_IMPORTED_MODULE_0__.createPolygonSvgElement)(polygon);
      this.polygonContainer.appendChild(svgElement);
    });

    this.placeholder.setAttribute("visible", false);
  }
}


/***/ }),

/***/ "./src/widgets/BufferContainer/ui/BufferContainer.js":
/*!***********************************************************!*\
  !*** ./src/widgets/BufferContainer/ui/BufferContainer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entities_polygon_model_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @entities/polygon/model/constants */ "./src/entities/polygon/model/constants.js");
/* harmony import */ var _BaseBufferContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseBufferContainer */ "./src/widgets/BufferContainer/ui/BaseBufferContainer.js");
/* harmony import */ var _model_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/events */ "./src/widgets/BufferContainer/model/events.js");




class BufferContainer extends _BaseBufferContainer__WEBPACK_IMPORTED_MODULE_1__.BaseBufferContainer {
  constructor() {
    super();
    this.container = null;
    this.isExpectingElement = false;
    this.expectedElementId = null;
  }

  setIsExpectingElement(id) {
    this.expectedElementId = id;
    this.isExpectingElement = true;
  }

  cancelExpectingElement() {
    this.expectedElementId = null;
    this.isExpectingElement = false;
  }

  onPolygonDropped() {
    if (!this.isExpectingElement) {
      return;
    }

    this.container.classList.remove("dropZone");
    this.dispatchEvent((0,_model_events__WEBPACK_IMPORTED_MODULE_2__.createElementDroppedEvent)());
  }

  onPolygonOutBuffer() {
    if (!this.isExpectingElement) {
      return;
    }

    this.container.classList.remove("dropZone");
  }

  onPolygonOverBuffer() {
    if (!this.isExpectingElement) {
      return;
    }

    this.container.classList.add("dropZone");
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.container = this.querySelector(".container");
    this.polygonContainer = this.querySelector(".polygonContainer");
    this.placeholder = this.querySelector("buffer-empty-placeholder");
    this.initListeners();
  }

  initListeners() {
    this.addEventListener("mouseup", this.onPolygonDropped.bind(this));
    this.addEventListener("mouseover", this.onPolygonOverBuffer.bind(this));
    this.addEventListener("mouseout", this.onPolygonOutBuffer.bind(this));
  }

  render() {
    return `
        <style>
            .container {
                background-color: var(--white);
                border-radius: 10px;
                height: 150px;
                border: 3px solid transparent;
            }

            .dropZone {
                border: 3px solid var(--gray10);
            }
            
            .polygonContainer {
                display: grid;
                grid-template-columns: repeat(auto-fill, ${_entities_polygon_model_constants__WEBPACK_IMPORTED_MODULE_0__.polygonOptions.svgPolygonWidth}px);
            }
        </style>
        
        <div class="container">
            <div class="polygonContainer"></div>
            <buffer-empty-placeholder visible="true"></buffer-empty-placeholder>
        </div>    
    `;
  }
}

customElements.define("buffer-container", BufferContainer);


/***/ }),

/***/ "./src/widgets/BufferContainer/ui/EmptyPlaceholder.js":
/*!************************************************************!*\
  !*** ./src/widgets/BufferContainer/ui/EmptyPlaceholder.js ***!
  \************************************************************/
/***/ (() => {

class EmptyPlaceholder extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
    this.container = this.querySelector(".placeholderContainer");
    this.setVisibility(this.getAttribute("visible") === "true");
  }

  static get observedAttributes() {
    return ["visible"];
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "visible" && this.container) {
      this.setVisibility(newValue === "true");
    }
  }

  setVisibility(isVisible) {
    isVisible
      ? this.container.classList.remove("hidden")
      : this.container.classList.add("hidden");
  }

  render() {
    return `
        <style>
            .placeholderContainer {
                display: flex;
                min-height: 150px;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 4px;
             }
             
             .hidden {
                display: none;
             }
     
             .placeholderText {
                color: var(--gray20)
             }
        </style>
        <div class="placeholderContainer hidden">
            <span class="placeholderText">Буферный контейнер пуст</span>
            <span class="placeholderText">Создайте или перенесите полигоны из рабочей зоны</span>
        </div>`;
  }
}

customElements.define("buffer-empty-placeholder", EmptyPlaceholder);


/***/ }),

/***/ "./src/widgets/BufferContainer/ui/index.js":
/*!*************************************************!*\
  !*** ./src/widgets/BufferContainer/ui/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BufferContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BufferContainer */ "./src/widgets/BufferContainer/ui/BufferContainer.js");
/* harmony import */ var _EmptyPlaceholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmptyPlaceholder */ "./src/widgets/BufferContainer/ui/EmptyPlaceholder.js");
/* harmony import */ var _EmptyPlaceholder__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_EmptyPlaceholder__WEBPACK_IMPORTED_MODULE_1__);




/***/ }),

/***/ "./src/widgets/index.js":
/*!******************************!*\
  !*** ./src/widgets/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppHeader */ "./src/widgets/AppHeader/index.js");
/* harmony import */ var _BufferContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferContainer */ "./src/widgets/BufferContainer/index.js");




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/app/App.js");
/* harmony import */ var _shared_styles_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/styles/normalize.css */ "./src/shared/styles/normalize.css");
/* harmony import */ var _shared_styles_variables_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/styles/variables.css */ "./src/shared/styles/variables.css");
/* harmony import */ var _shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/ui */ "./src/shared/ui/index.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @entities */ "./src/entities/index.js");
/* harmony import */ var _widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @widgets */ "./src/widgets/index.js");







})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBWTs7QUFFWjs7QUFFQSxhQUFhLG1CQUFPLENBQUMsNEVBQW9COztBQUV6QztBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDLDZCQUE2QixNQUFNO0FBQ25DO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhLENBQUM7O0FBRWQ7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQixlQUFlO0FBQ2YsZUFBZTs7QUFFZjtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBLDZCQUE2QjtBQUM3Qiw2QkFBNkIsY0FBYztBQUMzQyw2QkFBNkIsY0FBYztBQUMzQyw2QkFBNkIsY0FBYztBQUMzQztBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBLG1CQUFtQixHQUFHO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMU1ZOztBQUVaLG1CQUFtQixtQkFBTyxDQUFDLDBEQUFZO0FBQ3ZDLG1CQUFtQixtQkFBTyxDQUFDLDBEQUFZO0FBQ3ZDLG1CQUFtQixtQkFBTyxDQUFDLDBEQUFZOztBQUV2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDeEJZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN0Qlk7O0FBRVo7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsZ0ZBQXlCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJZOztBQUVaOztBQUVBLFVBQVUsbUJBQU8sQ0FBQyw4RUFBeUI7QUFDM0MsVUFBVSxtQkFBTyxDQUFDLHNEQUFhOztBQUUvQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLHFCQUFxQixNQUFNO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFDZ0g7QUFDakI7QUFDL0YsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGtHQUFrRyxZQUFZLE9BQU8sT0FBTyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxNQUFNLFVBQVUsVUFBVSxPQUFPLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksZ0NBQWdDLDRCQUE0QixHQUFHLDhCQUE4QixjQUFjLGVBQWUsa0JBQWtCLDJCQUEyQixHQUFHLFVBQVUsb0JBQW9CLG1DQUFtQyxrQ0FBa0MscUJBQXFCLHNCQUFzQixzQkFBc0Isa0NBQWtDLHFCQUFxQixHQUFHLGlCQUFpQixtQkFBbUIsb0JBQW9CLEdBQUcscUJBQXFCLGNBQWMsR0FBRyxXQUFXLHNCQUFzQixHQUFHLFlBQVksb0JBQW9CLEdBQUcsWUFBWSxjQUFjLEdBQUcsUUFBUSwwQkFBMEIsR0FBRyxPQUFPLHFCQUFxQixvQkFBb0Isc0JBQXNCLEdBQUcscUJBQXFCO0FBQzlxQztBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9EdkM7QUFDZ0g7QUFDakI7QUFDL0YsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGtHQUFrRyxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxpQ0FBaUMscUJBQXFCLHdCQUF3Qix3QkFBd0Isb0JBQW9CLHNCQUFzQixzQkFBc0IsR0FBRyxxQkFBcUI7QUFDalg7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7O0FDZjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNmWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLDRFQUFvQjtBQUN6QyxrQkFBa0IsNkdBQTBDOztBQUU1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMscUJBQXFCO0FBQ3RELGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixNQUFNO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsTUFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGVBQWUsdUJBQXVCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDakRZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQzNKWTs7QUFFWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUMzSmEsQ0FBQzs7QUFFZCxnQkFBZ0IsbUJBQU8sQ0FBQyww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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRDJCO0FBQ0M7Ozs7Ozs7Ozs7Ozs7OztBQ0RQO0FBQ007Ozs7Ozs7VUNEM0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkEsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FlO0FBQ3VCO0FBQ0E7QUFDbEI7QUFDRDtBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9hZmZpbmUtaHVsbC9hZmYuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9iaXQtdHdpZGRsZS90d2lkZGxlLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvY29udmV4LWh1bGwvY2guanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9jb252ZXgtaHVsbC9saWIvY2gxZC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vbm9kZV9tb2R1bGVzL2NvbnZleC1odWxsL2xpYi9jaDJkLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvY29udmV4LWh1bGwvbGliL2NobmQuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvc3R5bGVzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvc3R5bGVzL3ZhcmlhYmxlcy5jc3MiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtY29udmV4LWh1bGwvaWNoLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvbW9ub3RvbmUtY29udmV4LWh1bGwtMmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9yb2J1c3Qtb3JpZW50YXRpb24vb3JpZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9yb2J1c3Qtc2NhbGUvcm9idXN0LXNjYWxlLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvcm9idXN0LXN1YnRyYWN0L3JvYnVzdC1kaWZmLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvcm9idXN0LXN1bS9yb2J1c3Qtc3VtLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvc2ltcGxpY2lhbC1jb21wbGV4L3RvcG9sb2d5LmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy90d28tcHJvZHVjdC90d28tcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vbm9kZV9tb2R1bGVzL3R3by1zdW0vdHdvLXN1bS5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vbm9kZV9tb2R1bGVzL3VuaW9uLWZpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9hcHAvQXBwLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvYXBwL2xpYi9ob29rcy91c2VBcHBTdG9yYWdlLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvYXBwL2xpYi9ob29rcy91c2VCdWZmZXJQb2x5Z29ucy5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL2FwcC9saWIvc2NlbmVMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9jYW52YXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9jYW52YXMvbGliL2NhbnZhc1NpemUuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9jYW52YXMvbGliL21hcHBlcnMvY29vcmRpbmF0ZXMuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9jYW52YXMvbW9kZWwvZG9tRXZlbnRzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvY2FudmFzL3VpL0Jhc2VDYW52YXMuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9jYW52YXMvdWkvQ29udG9sbGVkQ2FudmFzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvY2FudmFzL3VpL0Ryb3BwYWJsZUNhbnZhcy5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL2VudGl0aWVzL2NhbnZhcy91aS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL2VudGl0aWVzL2dyaWQvbW9kZWwvR3JpZC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL2VudGl0aWVzL2luZGV4LmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvcG9seWdvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL2VudGl0aWVzL3BvbHlnb24vbGliL21hcHBlcnMvcG9pbnRzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvcG9seWdvbi9saWIvcG9pbnRzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvcG9seWdvbi9tb2RlbC9Qb2x5Z29uLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvcG9seWdvbi9tb2RlbC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9wb2x5Z29uL3VpL1BvbHlnb25TdmcuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9zY2VuZS9saWIvaG9va3MvdXNlU2NlbmUuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9zY2VuZS9saWIvaG9va3MvdXNlU2NlbmVMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9lbnRpdGllcy9zY2VuZS9saWIvaW50ZXJzZWN0aW9uLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvc2NlbmUvbGliL3NjZW5lLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZW50aXRpZXMvc2NlbmUvbW9kZWwvZXZlbnRzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZmVhdHVyZXMvY2FudmFzL2Ryb3BQb2x5Z29uLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvZmVhdHVyZXMvcG9seWdvbi9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvbGliL2V2ZW50QnVzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvc2hhcmVkL2xpYi9ob29rcy91c2VBcnJheVJhbmdlLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvc2hhcmVkL2xpYi9ob29rcy91c2VHZXRSYW5kb21BcmJpdHJhcnkuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvbW9kZWwvQmFzZVNjZW5lRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3NoYXJlZC9tb2RlbC9jYW52YXNFdmVudHMuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvbW9kZWwvY29tcG9uZW50VHlwZXMuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvc3R5bGVzL25vcm1hbGl6ZS5jc3M/NTEwNyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3NoYXJlZC9zdHlsZXMvdmFyaWFibGVzLmNzcz83MjZiIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvc2hhcmVkL3VpL2J1dHRvbnMvQmFzZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3NoYXJlZC91aS9idXR0b25zL0RlZmF1bHRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvdWkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9zaGFyZWQvdWkvbGF5b3V0cy9EZWZhdWx0TWFpbkxheW91dC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3dpZGdldHMvQXBwSGVhZGVyL2luZGV4LmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvd2lkZ2V0cy9BcHBIZWFkZXIvbW9kZWwvZXZlbnRzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvd2lkZ2V0cy9BcHBIZWFkZXIvdWkvQXBwSGVhZGVyLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvd2lkZ2V0cy9BcHBIZWFkZXIvdWkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy93aWRnZXRzL0FwcEhlYWRlci91aS9sYXlvdXRzL0FwcEhlYWRlckxheW91dC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3dpZGdldHMvQnVmZmVyQ29udGFpbmVyL2luZGV4LmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvd2lkZ2V0cy9CdWZmZXJDb250YWluZXIvbW9kZWwvZXZlbnRzLmpzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svLi9zcmMvd2lkZ2V0cy9CdWZmZXJDb250YWluZXIvdWkvQmFzZUJ1ZmZlckNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3dpZGdldHMvQnVmZmVyQ29udGFpbmVyL3VpL0J1ZmZlckNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3dpZGdldHMvQnVmZmVyQ29udGFpbmVyL3VpL0VtcHR5UGxhY2Vob2xkZXIuanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy93aWRnZXRzL0J1ZmZlckNvbnRhaW5lci91aS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrLy4vc3JjL3dpZGdldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYi1jb21wb25lbnRzLXRhc2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWItY29tcG9uZW50cy10YXNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2ViLWNvbXBvbmVudHMtdGFzay8uL3NyYy9hcHAvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYWZmaW5lSHVsbFxuXG52YXIgb3JpZW50ID0gcmVxdWlyZSgncm9idXN0LW9yaWVudGF0aW9uJylcblxuZnVuY3Rpb24gbGluZWFybHlJbmRlcGVuZGVudChwb2ludHMsIGQpIHtcbiAgdmFyIG5odWxsID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgbmh1bGxbaV0gPSBwb2ludHNbaV1cbiAgfVxuICBmb3IodmFyIGk9MDsgaTw9cG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yKHZhciBqPXBvaW50cy5sZW5ndGg7IGo8PWQ7ICsraikge1xuICAgICAgdmFyIHggPSBuZXcgQXJyYXkoZClcbiAgICAgIGZvcih2YXIgaz0wOyBrPGQ7ICsraykge1xuICAgICAgICB4W2tdID0gTWF0aC5wb3coaisxLWksIGspXG4gICAgICB9XG4gICAgICBuaHVsbFtqXSA9IHhcbiAgICB9XG4gICAgdmFyIG8gPSBvcmllbnQuYXBwbHkodm9pZCAwLCBuaHVsbClcbiAgICBpZihvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gYWZmaW5lSHVsbChwb2ludHMpIHtcbiAgdmFyIG4gPSBwb2ludHMubGVuZ3RoXG4gIGlmKG4gPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBpZihuID09PSAxKSB7XG4gICAgcmV0dXJuIFswXVxuICB9XG4gIHZhciBkID0gcG9pbnRzWzBdLmxlbmd0aFxuICB2YXIgZnJhbWUgPSBbIHBvaW50c1swXSBdXG4gIHZhciBpbmRleCA9IFsgMCBdXG4gIGZvcih2YXIgaT0xOyBpPG47ICsraSkge1xuICAgIGZyYW1lLnB1c2gocG9pbnRzW2ldKVxuICAgIGlmKCFsaW5lYXJseUluZGVwZW5kZW50KGZyYW1lLCBkKSkge1xuICAgICAgZnJhbWUucG9wKClcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGluZGV4LnB1c2goaSlcbiAgICBpZihpbmRleC5sZW5ndGggPT09IGQrMSkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmRleFxufSIsIi8qKlxuICogQml0IHR3aWRkbGluZyBoYWNrcyBmb3IgSmF2YVNjcmlwdC5cbiAqXG4gKiBBdXRob3I6IE1pa29sYSBMeXNlbmtvXG4gKlxuICogUG9ydGVkIGZyb20gU3RhbmZvcmQgYml0IHR3aWRkbGluZyBoYWNrIGxpYnJhcnk6XG4gKiAgICBodHRwOi8vZ3JhcGhpY3Muc3RhbmZvcmQuZWR1L35zZWFuZGVyL2JpdGhhY2tzLmh0bWxcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjsgXCJ1c2UgcmVzdHJpY3RcIjtcblxuLy9OdW1iZXIgb2YgYml0cyBpbiBhbiBpbnRlZ2VyXG52YXIgSU5UX0JJVFMgPSAzMjtcblxuLy9Db25zdGFudHNcbmV4cG9ydHMuSU5UX0JJVFMgID0gSU5UX0JJVFM7XG5leHBvcnRzLklOVF9NQVggICA9ICAweDdmZmZmZmZmO1xuZXhwb3J0cy5JTlRfTUlOICAgPSAtMTw8KElOVF9CSVRTLTEpO1xuXG4vL1JldHVybnMgLTEsIDAsICsxIGRlcGVuZGluZyBvbiBzaWduIG9mIHhcbmV4cG9ydHMuc2lnbiA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICh2ID4gMCkgLSAodiA8IDApO1xufVxuXG4vL0NvbXB1dGVzIGFic29sdXRlIHZhbHVlIG9mIGludGVnZXJcbmV4cG9ydHMuYWJzID0gZnVuY3Rpb24odikge1xuICB2YXIgbWFzayA9IHYgPj4gKElOVF9CSVRTLTEpO1xuICByZXR1cm4gKHYgXiBtYXNrKSAtIG1hc2s7XG59XG5cbi8vQ29tcHV0ZXMgbWluaW11bSBvZiBpbnRlZ2VycyB4IGFuZCB5XG5leHBvcnRzLm1pbiA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIHkgXiAoKHggXiB5KSAmIC0oeCA8IHkpKTtcbn1cblxuLy9Db21wdXRlcyBtYXhpbXVtIG9mIGludGVnZXJzIHggYW5kIHlcbmV4cG9ydHMubWF4ID0gZnVuY3Rpb24oeCwgeSkge1xuICByZXR1cm4geCBeICgoeCBeIHkpICYgLSh4IDwgeSkpO1xufVxuXG4vL0NoZWNrcyBpZiBhIG51bWJlciBpcyBhIHBvd2VyIG9mIHR3b1xuZXhwb3J0cy5pc1BvdzIgPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAhKHYgJiAodi0xKSkgJiYgKCEhdik7XG59XG5cbi8vQ29tcHV0ZXMgbG9nIGJhc2UgMiBvZiB2XG5leHBvcnRzLmxvZzIgPSBmdW5jdGlvbih2KSB7XG4gIHZhciByLCBzaGlmdDtcbiAgciA9ICAgICAodiA+IDB4RkZGRikgPDwgNDsgdiA+Pj49IHI7XG4gIHNoaWZ0ID0gKHYgPiAweEZGICApIDw8IDM7IHYgPj4+PSBzaGlmdDsgciB8PSBzaGlmdDtcbiAgc2hpZnQgPSAodiA+IDB4RiAgICkgPDwgMjsgdiA+Pj49IHNoaWZ0OyByIHw9IHNoaWZ0O1xuICBzaGlmdCA9ICh2ID4gMHgzICAgKSA8PCAxOyB2ID4+Pj0gc2hpZnQ7IHIgfD0gc2hpZnQ7XG4gIHJldHVybiByIHwgKHYgPj4gMSk7XG59XG5cbi8vQ29tcHV0ZXMgbG9nIGJhc2UgMTAgb2YgdlxuZXhwb3J0cy5sb2cxMCA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICAodiA+PSAxMDAwMDAwMDAwKSA/IDkgOiAodiA+PSAxMDAwMDAwMDApID8gOCA6ICh2ID49IDEwMDAwMDAwKSA/IDcgOlxuICAgICAgICAgICh2ID49IDEwMDAwMDApID8gNiA6ICh2ID49IDEwMDAwMCkgPyA1IDogKHYgPj0gMTAwMDApID8gNCA6XG4gICAgICAgICAgKHYgPj0gMTAwMCkgPyAzIDogKHYgPj0gMTAwKSA/IDIgOiAodiA+PSAxMCkgPyAxIDogMDtcbn1cblxuLy9Db3VudHMgbnVtYmVyIG9mIGJpdHNcbmV4cG9ydHMucG9wQ291bnQgPSBmdW5jdGlvbih2KSB7XG4gIHYgPSB2IC0gKCh2ID4+PiAxKSAmIDB4NTU1NTU1NTUpO1xuICB2ID0gKHYgJiAweDMzMzMzMzMzKSArICgodiA+Pj4gMikgJiAweDMzMzMzMzMzKTtcbiAgcmV0dXJuICgodiArICh2ID4+PiA0KSAmIDB4RjBGMEYwRikgKiAweDEwMTAxMDEpID4+PiAyNDtcbn1cblxuLy9Db3VudHMgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zXG5mdW5jdGlvbiBjb3VudFRyYWlsaW5nWmVyb3Modikge1xuICB2YXIgYyA9IDMyO1xuICB2ICY9IC12O1xuICBpZiAodikgYy0tO1xuICBpZiAodiAmIDB4MDAwMEZGRkYpIGMgLT0gMTY7XG4gIGlmICh2ICYgMHgwMEZGMDBGRikgYyAtPSA4O1xuICBpZiAodiAmIDB4MEYwRjBGMEYpIGMgLT0gNDtcbiAgaWYgKHYgJiAweDMzMzMzMzMzKSBjIC09IDI7XG4gIGlmICh2ICYgMHg1NTU1NTU1NSkgYyAtPSAxO1xuICByZXR1cm4gYztcbn1cbmV4cG9ydHMuY291bnRUcmFpbGluZ1plcm9zID0gY291bnRUcmFpbGluZ1plcm9zO1xuXG4vL1JvdW5kcyB0byBuZXh0IHBvd2VyIG9mIDJcbmV4cG9ydHMubmV4dFBvdzIgPSBmdW5jdGlvbih2KSB7XG4gIHYgKz0gdiA9PT0gMDtcbiAgLS12O1xuICB2IHw9IHYgPj4+IDE7XG4gIHYgfD0gdiA+Pj4gMjtcbiAgdiB8PSB2ID4+PiA0O1xuICB2IHw9IHYgPj4+IDg7XG4gIHYgfD0gdiA+Pj4gMTY7XG4gIHJldHVybiB2ICsgMTtcbn1cblxuLy9Sb3VuZHMgZG93biB0byBwcmV2aW91cyBwb3dlciBvZiAyXG5leHBvcnRzLnByZXZQb3cyID0gZnVuY3Rpb24odikge1xuICB2IHw9IHYgPj4+IDE7XG4gIHYgfD0gdiA+Pj4gMjtcbiAgdiB8PSB2ID4+PiA0O1xuICB2IHw9IHYgPj4+IDg7XG4gIHYgfD0gdiA+Pj4gMTY7XG4gIHJldHVybiB2IC0gKHY+Pj4xKTtcbn1cblxuLy9Db21wdXRlcyBwYXJpdHkgb2Ygd29yZFxuZXhwb3J0cy5wYXJpdHkgPSBmdW5jdGlvbih2KSB7XG4gIHYgXj0gdiA+Pj4gMTY7XG4gIHYgXj0gdiA+Pj4gODtcbiAgdiBePSB2ID4+PiA0O1xuICB2ICY9IDB4ZjtcbiAgcmV0dXJuICgweDY5OTYgPj4+IHYpICYgMTtcbn1cblxudmFyIFJFVkVSU0VfVEFCTEUgPSBuZXcgQXJyYXkoMjU2KTtcblxuKGZ1bmN0aW9uKHRhYikge1xuICBmb3IodmFyIGk9MDsgaTwyNTY7ICsraSkge1xuICAgIHZhciB2ID0gaSwgciA9IGksIHMgPSA3O1xuICAgIGZvciAodiA+Pj49IDE7IHY7IHYgPj4+PSAxKSB7XG4gICAgICByIDw8PSAxO1xuICAgICAgciB8PSB2ICYgMTtcbiAgICAgIC0tcztcbiAgICB9XG4gICAgdGFiW2ldID0gKHIgPDwgcykgJiAweGZmO1xuICB9XG59KShSRVZFUlNFX1RBQkxFKTtcblxuLy9SZXZlcnNlIGJpdHMgaW4gYSAzMiBiaXQgd29yZFxuZXhwb3J0cy5yZXZlcnNlID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gIChSRVZFUlNFX1RBQkxFWyB2ICAgICAgICAgJiAweGZmXSA8PCAyNCkgfFxuICAgICAgICAgIChSRVZFUlNFX1RBQkxFWyh2ID4+PiA4KSAgJiAweGZmXSA8PCAxNikgfFxuICAgICAgICAgIChSRVZFUlNFX1RBQkxFWyh2ID4+PiAxNikgJiAweGZmXSA8PCA4KSAgfFxuICAgICAgICAgICBSRVZFUlNFX1RBQkxFWyh2ID4+PiAyNCkgJiAweGZmXTtcbn1cblxuLy9JbnRlcmxlYXZlIGJpdHMgb2YgMiBjb29yZGluYXRlcyB3aXRoIDE2IGJpdHMuICBVc2VmdWwgZm9yIGZhc3QgcXVhZHRyZWUgY29kZXNcbmV4cG9ydHMuaW50ZXJsZWF2ZTIgPSBmdW5jdGlvbih4LCB5KSB7XG4gIHggJj0gMHhGRkZGO1xuICB4ID0gKHggfCAoeCA8PCA4KSkgJiAweDAwRkYwMEZGO1xuICB4ID0gKHggfCAoeCA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICB4ID0gKHggfCAoeCA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICB4ID0gKHggfCAoeCA8PCAxKSkgJiAweDU1NTU1NTU1O1xuXG4gIHkgJj0gMHhGRkZGO1xuICB5ID0gKHkgfCAoeSA8PCA4KSkgJiAweDAwRkYwMEZGO1xuICB5ID0gKHkgfCAoeSA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICB5ID0gKHkgfCAoeSA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICB5ID0gKHkgfCAoeSA8PCAxKSkgJiAweDU1NTU1NTU1O1xuXG4gIHJldHVybiB4IHwgKHkgPDwgMSk7XG59XG5cbi8vRXh0cmFjdHMgdGhlIG50aCBpbnRlcmxlYXZlZCBjb21wb25lbnRcbmV4cG9ydHMuZGVpbnRlcmxlYXZlMiA9IGZ1bmN0aW9uKHYsIG4pIHtcbiAgdiA9ICh2ID4+PiBuKSAmIDB4NTU1NTU1NTU7XG4gIHYgPSAodiB8ICh2ID4+PiAxKSkgICYgMHgzMzMzMzMzMztcbiAgdiA9ICh2IHwgKHYgPj4+IDIpKSAgJiAweDBGMEYwRjBGO1xuICB2ID0gKHYgfCAodiA+Pj4gNCkpICAmIDB4MDBGRjAwRkY7XG4gIHYgPSAodiB8ICh2ID4+PiAxNikpICYgMHgwMDBGRkZGO1xuICByZXR1cm4gKHYgPDwgMTYpID4+IDE2O1xufVxuXG5cbi8vSW50ZXJsZWF2ZSBiaXRzIG9mIDMgY29vcmRpbmF0ZXMsIGVhY2ggd2l0aCAxMCBiaXRzLiAgVXNlZnVsIGZvciBmYXN0IG9jdHJlZSBjb2Rlc1xuZXhwb3J0cy5pbnRlcmxlYXZlMyA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgeCAmPSAweDNGRjtcbiAgeCAgPSAoeCB8ICh4PDwxNikpICYgNDI3ODE5MDMzNTtcbiAgeCAgPSAoeCB8ICh4PDw4KSkgICYgMjUxNzE5Njk1O1xuICB4ICA9ICh4IHwgKHg8PDQpKSAgJiAzMjcyMzU2MDM1O1xuICB4ICA9ICh4IHwgKHg8PDIpKSAgJiAxMjI3MTMzNTEzO1xuXG4gIHkgJj0gMHgzRkY7XG4gIHkgID0gKHkgfCAoeTw8MTYpKSAmIDQyNzgxOTAzMzU7XG4gIHkgID0gKHkgfCAoeTw8OCkpICAmIDI1MTcxOTY5NTtcbiAgeSAgPSAoeSB8ICh5PDw0KSkgICYgMzI3MjM1NjAzNTtcbiAgeSAgPSAoeSB8ICh5PDwyKSkgICYgMTIyNzEzMzUxMztcbiAgeCB8PSAoeSA8PCAxKTtcbiAgXG4gIHogJj0gMHgzRkY7XG4gIHogID0gKHogfCAoejw8MTYpKSAmIDQyNzgxOTAzMzU7XG4gIHogID0gKHogfCAoejw8OCkpICAmIDI1MTcxOTY5NTtcbiAgeiAgPSAoeiB8ICh6PDw0KSkgICYgMzI3MjM1NjAzNTtcbiAgeiAgPSAoeiB8ICh6PDwyKSkgICYgMTIyNzEzMzUxMztcbiAgXG4gIHJldHVybiB4IHwgKHogPDwgMik7XG59XG5cbi8vRXh0cmFjdHMgbnRoIGludGVybGVhdmVkIGNvbXBvbmVudCBvZiBhIDMtdHVwbGVcbmV4cG9ydHMuZGVpbnRlcmxlYXZlMyA9IGZ1bmN0aW9uKHYsIG4pIHtcbiAgdiA9ICh2ID4+PiBuKSAgICAgICAmIDEyMjcxMzM1MTM7XG4gIHYgPSAodiB8ICh2Pj4+MikpICAgJiAzMjcyMzU2MDM1O1xuICB2ID0gKHYgfCAodj4+PjQpKSAgICYgMjUxNzE5Njk1O1xuICB2ID0gKHYgfCAodj4+PjgpKSAgICYgNDI3ODE5MDMzNTtcbiAgdiA9ICh2IHwgKHY+Pj4xNikpICAmIDB4M0ZGO1xuICByZXR1cm4gKHY8PDIyKT4+MjI7XG59XG5cbi8vQ29tcHV0ZXMgbmV4dCBjb21iaW5hdGlvbiBpbiBjb2xleGljb2dyYXBoaWMgb3JkZXIgKHRoaXMgaXMgbWlzdGFrZW5seSBjYWxsZWQgbmV4dFBlcm11dGF0aW9uIG9uIHRoZSBiaXQgdHdpZGRsaW5nIGhhY2tzIHBhZ2UpXG5leHBvcnRzLm5leHRDb21iaW5hdGlvbiA9IGZ1bmN0aW9uKHYpIHtcbiAgdmFyIHQgPSB2IHwgKHYgLSAxKTtcbiAgcmV0dXJuICh0ICsgMSkgfCAoKCh+dCAmIC1+dCkgLSAxKSA+Pj4gKGNvdW50VHJhaWxpbmdaZXJvcyh2KSArIDEpKTtcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNvbnZleEh1bGwxZCA9IHJlcXVpcmUoJy4vbGliL2NoMWQnKVxudmFyIGNvbnZleEh1bGwyZCA9IHJlcXVpcmUoJy4vbGliL2NoMmQnKVxudmFyIGNvbnZleEh1bGxuZCA9IHJlcXVpcmUoJy4vbGliL2NobmQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZleEh1bGxcblxuZnVuY3Rpb24gY29udmV4SHVsbChwb2ludHMpIHtcbiAgdmFyIG4gPSBwb2ludHMubGVuZ3RoXG4gIGlmKG4gPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfSBlbHNlIGlmKG4gPT09IDEpIHtcbiAgICByZXR1cm4gW1swXV1cbiAgfVxuICB2YXIgZCA9IHBvaW50c1swXS5sZW5ndGhcbiAgaWYoZCA9PT0gMCkge1xuICAgIHJldHVybiBbXVxuICB9IGVsc2UgaWYoZCA9PT0gMSkge1xuICAgIHJldHVybiBjb252ZXhIdWxsMWQocG9pbnRzKVxuICB9IGVsc2UgaWYoZCA9PT0gMikge1xuICAgIHJldHVybiBjb252ZXhIdWxsMmQocG9pbnRzKVxuICB9XG4gIHJldHVybiBjb252ZXhIdWxsbmQocG9pbnRzLCBkKVxufSIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gY29udmV4SHVsbDFkXG5cbmZ1bmN0aW9uIGNvbnZleEh1bGwxZChwb2ludHMpIHtcbiAgdmFyIGxvID0gMFxuICB2YXIgaGkgPSAwXG4gIGZvcih2YXIgaT0xOyBpPHBvaW50cy5sZW5ndGg7ICsraSkge1xuICAgIGlmKHBvaW50c1tpXVswXSA8IHBvaW50c1tsb11bMF0pIHtcbiAgICAgIGxvID0gaVxuICAgIH1cbiAgICBpZihwb2ludHNbaV1bMF0gPiBwb2ludHNbaGldWzBdKSB7XG4gICAgICBoaSA9IGlcbiAgICB9XG4gIH1cbiAgaWYobG8gPCBoaSkge1xuICAgIHJldHVybiBbW2xvXSwgW2hpXV1cbiAgfSBlbHNlIGlmKGxvID4gaGkpIHtcbiAgICByZXR1cm4gW1toaV0sIFtsb11dXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtbbG9dXVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY29udmV4SHVsbDJEXG5cbnZhciBtb25vdG9uZUh1bGwgPSByZXF1aXJlKCdtb25vdG9uZS1jb252ZXgtaHVsbC0yZCcpXG5cbmZ1bmN0aW9uIGNvbnZleEh1bGwyRChwb2ludHMpIHtcbiAgdmFyIGh1bGwgPSBtb25vdG9uZUh1bGwocG9pbnRzKVxuICB2YXIgaCA9IGh1bGwubGVuZ3RoXG4gIGlmKGggPD0gMikge1xuICAgIHJldHVybiBbXVxuICB9XG4gIHZhciBlZGdlcyA9IG5ldyBBcnJheShoKVxuICB2YXIgYSA9IGh1bGxbaC0xXVxuICBmb3IodmFyIGk9MDsgaTxoOyArK2kpIHtcbiAgICB2YXIgYiA9IGh1bGxbaV1cbiAgICBlZGdlc1tpXSA9IFthLGJdXG4gICAgYSA9IGJcbiAgfVxuICByZXR1cm4gZWRnZXNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZleEh1bGxuRFxuXG52YXIgaWNoID0gcmVxdWlyZSgnaW5jcmVtZW50YWwtY29udmV4LWh1bGwnKVxudmFyIGFmZiA9IHJlcXVpcmUoJ2FmZmluZS1odWxsJylcblxuZnVuY3Rpb24gcGVybXV0ZShwb2ludHMsIGZyb250KSB7XG4gIHZhciBuID0gcG9pbnRzLmxlbmd0aFxuICB2YXIgbnBvaW50cyA9IG5ldyBBcnJheShuKVxuICBmb3IodmFyIGk9MDsgaTxmcm9udC5sZW5ndGg7ICsraSkge1xuICAgIG5wb2ludHNbaV0gPSBwb2ludHNbZnJvbnRbaV1dXG4gIH1cbiAgdmFyIHB0ciA9IGZyb250Lmxlbmd0aFxuICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICBpZihmcm9udC5pbmRleE9mKGkpIDwgMCkge1xuICAgICAgbnBvaW50c1twdHIrK10gPSBwb2ludHNbaV1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5wb2ludHNcbn1cblxuZnVuY3Rpb24gaW52UGVybXV0ZShjZWxscywgZnJvbnQpIHtcbiAgdmFyIG5jID0gY2VsbHMubGVuZ3RoXG4gIHZhciBuZiA9IGZyb250Lmxlbmd0aFxuICBmb3IodmFyIGk9MDsgaTxuYzsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIGZvcih2YXIgaj0wOyBqPGMubGVuZ3RoOyArK2opIHtcbiAgICAgIHZhciB4ID0gY1tqXVxuICAgICAgaWYoeCA8IG5mKSB7XG4gICAgICAgIGNbal0gPSBmcm9udFt4XVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IHggLSBuZlxuICAgICAgICBmb3IodmFyIGs9MDsgazxuZjsgKytrKSB7XG4gICAgICAgICAgaWYoeCA+PSBmcm9udFtrXSkge1xuICAgICAgICAgICAgeCArPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNbal0gPSB4XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjZWxsc1xufVxuXG5mdW5jdGlvbiBjb252ZXhIdWxsbkQocG9pbnRzLCBkKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGljaChwb2ludHMsIHRydWUpXG4gIH0gY2F0Y2goZSkge1xuICAgIC8vSWYgcG9pbnQgc2V0IGlzIGRlZ2VuZXJhdGUsIHRyeSB0byBmaW5kIGEgYmFzaXMgYW5kIHJlcnVuIGl0XG4gICAgdmFyIGFoID0gYWZmKHBvaW50cylcbiAgICBpZihhaC5sZW5ndGggPD0gZCkge1xuICAgICAgLy9ObyBiYXNpcywgbm8gdHJ5XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgdmFyIG5wb2ludHMgPSBwZXJtdXRlKHBvaW50cywgYWgpXG4gICAgdmFyIG5odWxsICAgPSBpY2gobnBvaW50cywgdHJ1ZSlcbiAgICByZXR1cm4gaW52UGVybXV0ZShuaHVsbCwgYWgpXG4gIH1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgaHRtbCB7XG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xufVxuXG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbmJvZHkge1xuICBmb250LXNpemU6IDE2cHg7XG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheSk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbmltZyxcbnZpZGVvIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuaWZyYW1lLFxuYnV0dG9uIHtcbiAgYm9yZGVyOiAwO1xufVxuXG50YWJsZSB7XG4gIGJvcmRlci1zcGFjaW5nOiAwO1xufVxuXG5idXR0b24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmZpZ3VyZSB7XG4gIG1hcmdpbjogMDtcbn1cblxudWwge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG59XG5cbnAge1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2hhcmVkL3N0eWxlcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBOzs7RUFHRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsOEJBQThCO0VBQzlCLDZCQUE2QjtFQUM3QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQiw2QkFBNkI7RUFDN0IsZ0JBQWdCO0FBQ2xCOztBQUVBOztFQUVFLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBOztFQUVFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJodG1sIHtcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyYXkpO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaW1nLFxcbnZpZGVvIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG5pZnJhbWUsXFxuYnV0dG9uIHtcXG4gIGJvcmRlcjogMDtcXG59XFxuXFxudGFibGUge1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmZpZ3VyZSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbnVsIHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG59XFxuXFxucCB7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI4cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgOnJvb3Qge1xuICAtLXdoaXRlOiAjZmZmZmZmO1xuICAtLWFjY2VudDEwOiAjOWE5NWNmO1xuICAtLWFjY2VudDIwOiAjYmViNWY0O1xuICAtLWdyYXk6ICNmNmY1ZjU7XG4gIC0tZ3JheTEwOiAjRTVFNUU1O1xuICAtLWdyYXkyMDogIzllOWQ5ZDtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3NoYXJlZC9zdHlsZXMvdmFyaWFibGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0td2hpdGU6ICNmZmZmZmY7XFxuICAtLWFjY2VudDEwOiAjOWE5NWNmO1xcbiAgLS1hY2NlbnQyMDogI2JlYjVmNDtcXG4gIC0tZ3JheTogI2Y2ZjVmNTtcXG4gIC0tZ3JheTEwOiAjRTVFNUU1O1xcbiAgLS1ncmF5MjA6ICM5ZTlkOWQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCJcblxuLy9IaWdoIGxldmVsIGlkZWE6XG4vLyAxLiBVc2UgQ2xhcmtzb24ncyBpbmNyZW1lbnRhbCBjb25zdHJ1Y3Rpb24gdG8gZmluZCBjb252ZXggaHVsbFxuLy8gMi4gUG9pbnQgbG9jYXRpb24gaW4gdHJpYW5ndWxhdGlvbiBieSBqdW1wIGFuZCB3YWxrXG5cbm1vZHVsZS5leHBvcnRzID0gaW5jcmVtZW50YWxDb252ZXhIdWxsXG5cbnZhciBvcmllbnQgPSByZXF1aXJlKFwicm9idXN0LW9yaWVudGF0aW9uXCIpXG52YXIgY29tcGFyZUNlbGwgPSByZXF1aXJlKFwic2ltcGxpY2lhbC1jb21wbGV4XCIpLmNvbXBhcmVDZWxsc1xuXG5mdW5jdGlvbiBjb21wYXJlSW50KGEsIGIpIHtcbiAgcmV0dXJuIGEgLSBiXG59XG5cbmZ1bmN0aW9uIFNpbXBsZXgodmVydGljZXMsIGFkamFjZW50LCBib3VuZGFyeSkge1xuICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXNcbiAgdGhpcy5hZGphY2VudCA9IGFkamFjZW50XG4gIHRoaXMuYm91bmRhcnkgPSBib3VuZGFyeVxuICB0aGlzLmxhc3RWaXNpdGVkID0gLTFcbn1cblxuU2ltcGxleC5wcm90b3R5cGUuZmxpcCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdCA9IHRoaXMudmVydGljZXNbMF1cbiAgdGhpcy52ZXJ0aWNlc1swXSA9IHRoaXMudmVydGljZXNbMV1cbiAgdGhpcy52ZXJ0aWNlc1sxXSA9IHRcbiAgdmFyIHUgPSB0aGlzLmFkamFjZW50WzBdXG4gIHRoaXMuYWRqYWNlbnRbMF0gPSB0aGlzLmFkamFjZW50WzFdXG4gIHRoaXMuYWRqYWNlbnRbMV0gPSB1XG59XG5cbmZ1bmN0aW9uIEdsdWVGYWNldCh2ZXJ0aWNlcywgY2VsbCwgaW5kZXgpIHtcbiAgdGhpcy52ZXJ0aWNlcyA9IHZlcnRpY2VzXG4gIHRoaXMuY2VsbCA9IGNlbGxcbiAgdGhpcy5pbmRleCA9IGluZGV4XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVHbHVlKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVDZWxsKGEudmVydGljZXMsIGIudmVydGljZXMpXG59XG5cbmZ1bmN0aW9uIGJha2VPcmllbnQoZCkge1xuICB2YXIgY29kZSA9IFtcImZ1bmN0aW9uIG9yaWVudCgpe3ZhciB0dXBsZT10aGlzLnR1cGxlO3JldHVybiB0ZXN0KFwiXVxuICBmb3IodmFyIGk9MDsgaTw9ZDsgKytpKSB7XG4gICAgaWYoaSA+IDApIHtcbiAgICAgIGNvZGUucHVzaChcIixcIilcbiAgICB9XG4gICAgY29kZS5wdXNoKFwidHVwbGVbXCIsIGksIFwiXVwiKVxuICB9XG4gIGNvZGUucHVzaChcIil9cmV0dXJuIG9yaWVudFwiKVxuICB2YXIgcHJvYyA9IG5ldyBGdW5jdGlvbihcInRlc3RcIiwgY29kZS5qb2luKFwiXCIpKVxuICB2YXIgdGVzdCA9IG9yaWVudFtkKzFdXG4gIGlmKCF0ZXN0KSB7XG4gICAgdGVzdCA9IG9yaWVudFxuICB9XG4gIHJldHVybiBwcm9jKHRlc3QpXG59XG5cbnZhciBCQUtFRCA9IFtdXG5cbmZ1bmN0aW9uIFRyaWFuZ3VsYXRpb24oZGltZW5zaW9uLCB2ZXJ0aWNlcywgc2ltcGxpY2VzKSB7XG4gIHRoaXMuZGltZW5zaW9uID0gZGltZW5zaW9uXG4gIHRoaXMudmVydGljZXMgPSB2ZXJ0aWNlc1xuICB0aGlzLnNpbXBsaWNlcyA9IHNpbXBsaWNlc1xuICB0aGlzLmludGVyaW9yID0gc2ltcGxpY2VzLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuICFjLmJvdW5kYXJ5XG4gIH0pXG5cbiAgdGhpcy50dXBsZSA9IG5ldyBBcnJheShkaW1lbnNpb24rMSlcbiAgZm9yKHZhciBpPTA7IGk8PWRpbWVuc2lvbjsgKytpKSB7XG4gICAgdGhpcy50dXBsZVtpXSA9IHRoaXMudmVydGljZXNbaV1cbiAgfVxuXG4gIHZhciBvID0gQkFLRURbZGltZW5zaW9uXVxuICBpZighbykge1xuICAgIG8gPSBCQUtFRFtkaW1lbnNpb25dID0gYmFrZU9yaWVudChkaW1lbnNpb24pXG4gIH1cbiAgdGhpcy5vcmllbnQgPSBvXG59XG5cbnZhciBwcm90byA9IFRyaWFuZ3VsYXRpb24ucHJvdG90eXBlXG5cbi8vRGVnZW5lcmF0ZSBzaXR1YXRpb24gd2hlcmUgd2UgYXJlIG9uIGJvdW5kYXJ5LCBidXQgY29wbGFuYXIgdG8gZmFjZVxucHJvdG8uaGFuZGxlQm91bmRhcnlEZWdlbmVyYWN5ID0gZnVuY3Rpb24oY2VsbCwgcG9pbnQpIHtcbiAgdmFyIGQgPSB0aGlzLmRpbWVuc2lvblxuICB2YXIgbiA9IHRoaXMudmVydGljZXMubGVuZ3RoIC0gMVxuICB2YXIgdHVwbGUgPSB0aGlzLnR1cGxlXG4gIHZhciB2ZXJ0cyA9IHRoaXMudmVydGljZXNcblxuICAvL0R1bWIgc29sdXRpb246IEp1c3QgZG8gZGZzIGZyb20gYm91bmRhcnkgY2VsbCB1bnRpbCB3ZSBmaW5kIGFueSBwZWFrLCBvciB0ZXJtaW5hdGVcbiAgdmFyIHRvVmlzaXQgPSBbIGNlbGwgXVxuICBjZWxsLmxhc3RWaXNpdGVkID0gLW5cbiAgd2hpbGUodG9WaXNpdC5sZW5ndGggPiAwKSB7XG4gICAgY2VsbCA9IHRvVmlzaXQucG9wKClcbiAgICB2YXIgY2VsbFZlcnRzID0gY2VsbC52ZXJ0aWNlc1xuICAgIHZhciBjZWxsQWRqID0gY2VsbC5hZGphY2VudFxuICAgIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICAgIHZhciBuZWlnaGJvciA9IGNlbGxBZGpbaV1cbiAgICAgIGlmKCFuZWlnaGJvci5ib3VuZGFyeSB8fCBuZWlnaGJvci5sYXN0VmlzaXRlZCA8PSAtbikge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgdmFyIG52ID0gbmVpZ2hib3IudmVydGljZXNcbiAgICAgIGZvcih2YXIgaj0wOyBqPD1kOyArK2opIHtcbiAgICAgICAgdmFyIHZ2ID0gbnZbal1cbiAgICAgICAgaWYodnYgPCAwKSB7XG4gICAgICAgICAgdHVwbGVbal0gPSBwb2ludFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHR1cGxlW2pdID0gdmVydHNbdnZdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBvID0gdGhpcy5vcmllbnQoKVxuICAgICAgaWYobyA+IDApIHtcbiAgICAgICAgcmV0dXJuIG5laWdoYm9yXG4gICAgICB9XG4gICAgICBuZWlnaGJvci5sYXN0VmlzaXRlZCA9IC1uXG4gICAgICBpZihvID09PSAwKSB7XG4gICAgICAgIHRvVmlzaXQucHVzaChuZWlnaGJvcilcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxucHJvdG8ud2FsayA9IGZ1bmN0aW9uKHBvaW50LCByYW5kb20pIHtcbiAgLy9BbGlhcyBsb2NhbCBwcm9wZXJ0aWVzXG4gIHZhciBuID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGggLSAxXG4gIHZhciBkID0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIHZlcnRzID0gdGhpcy52ZXJ0aWNlc1xuICB2YXIgdHVwbGUgPSB0aGlzLnR1cGxlXG5cbiAgLy9Db21wdXRlIGluaXRpYWwganVtcCBjZWxsXG4gIHZhciBpbml0SW5kZXggPSByYW5kb20gPyAodGhpcy5pbnRlcmlvci5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKXwwIDogKHRoaXMuaW50ZXJpb3IubGVuZ3RoLTEpXG4gIHZhciBjZWxsID0gdGhpcy5pbnRlcmlvclsgaW5pdEluZGV4IF1cblxuICAvL1N0YXJ0IHdhbGtpbmdcbm91dGVyTG9vcDpcbiAgd2hpbGUoIWNlbGwuYm91bmRhcnkpIHtcbiAgICB2YXIgY2VsbFZlcnRzID0gY2VsbC52ZXJ0aWNlc1xuICAgIHZhciBjZWxsQWRqID0gY2VsbC5hZGphY2VudFxuXG4gICAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgICAgdHVwbGVbaV0gPSB2ZXJ0c1tjZWxsVmVydHNbaV1dXG4gICAgfVxuICAgIGNlbGwubGFzdFZpc2l0ZWQgPSBuXG5cbiAgICAvL0ZpbmQgZmFydGhlc3QgYWRqYWNlbnQgY2VsbFxuICAgIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICAgIHZhciBuZWlnaGJvciA9IGNlbGxBZGpbaV1cbiAgICAgIGlmKG5laWdoYm9yLmxhc3RWaXNpdGVkID49IG4pIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHZhciBwcmV2ID0gdHVwbGVbaV1cbiAgICAgIHR1cGxlW2ldID0gcG9pbnRcbiAgICAgIHZhciBvID0gdGhpcy5vcmllbnQoKVxuICAgICAgdHVwbGVbaV0gPSBwcmV2XG4gICAgICBpZihvIDwgMCkge1xuICAgICAgICBjZWxsID0gbmVpZ2hib3JcbiAgICAgICAgY29udGludWUgb3V0ZXJMb29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighbmVpZ2hib3IuYm91bmRhcnkpIHtcbiAgICAgICAgICBuZWlnaGJvci5sYXN0VmlzaXRlZCA9IG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZWlnaGJvci5sYXN0VmlzaXRlZCA9IC1uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gY2VsbFxufVxuXG5wcm90by5hZGRQZWFrcyA9IGZ1bmN0aW9uKHBvaW50LCBjZWxsKSB7XG4gIHZhciBuID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGggLSAxXG4gIHZhciBkID0gdGhpcy5kaW1lbnNpb25cbiAgdmFyIHZlcnRzID0gdGhpcy52ZXJ0aWNlc1xuICB2YXIgdHVwbGUgPSB0aGlzLnR1cGxlXG4gIHZhciBpbnRlcmlvciA9IHRoaXMuaW50ZXJpb3JcbiAgdmFyIHNpbXBsaWNlcyA9IHRoaXMuc2ltcGxpY2VzXG5cbiAgLy9XYWxraW5nIGZpbmlzaGVkIGF0IGJvdW5kYXJ5LCB0aW1lIHRvIGFkZCBwZWFrc1xuICB2YXIgdG92aXNpdCA9IFsgY2VsbCBdXG5cbiAgLy9TdHJldGNoIGluaXRpYWwgYm91bmRhcnkgY2VsbCBpbnRvIGEgcGVha1xuICBjZWxsLmxhc3RWaXNpdGVkID0gblxuICBjZWxsLnZlcnRpY2VzW2NlbGwudmVydGljZXMuaW5kZXhPZigtMSldID0gblxuICBjZWxsLmJvdW5kYXJ5ID0gZmFsc2VcbiAgaW50ZXJpb3IucHVzaChjZWxsKVxuXG4gIC8vUmVjb3JkIGEgbGlzdCBvZiBhbGwgbmV3IGJvdW5kYXJpZXMgY3JlYXRlZCBieSBhZGRlZCBwZWFrcyBzbyB3ZSBjYW4gZ2x1ZSB0aGVtIHRvZ2V0aGVyIHdoZW4gd2UgYXJlIGFsbCBkb25lXG4gIHZhciBnbHVlRmFjZXRzID0gW11cblxuICAvL0RvIGEgdHJhdmVyc2FsIG9mIHRoZSBib3VuZGFyeSB3YWxraW5nIG91dHdhcmQgZnJvbSBzdGFydGluZyBwZWFrXG4gIHdoaWxlKHRvdmlzaXQubGVuZ3RoID4gMCkge1xuICAgIC8vUG9wIG9mZiBwZWFrIGFuZCB3YWxrIG92ZXIgYWRqYWNlbnQgY2VsbHNcbiAgICB2YXIgY2VsbCA9IHRvdmlzaXQucG9wKClcbiAgICB2YXIgY2VsbFZlcnRzID0gY2VsbC52ZXJ0aWNlc1xuICAgIHZhciBjZWxsQWRqID0gY2VsbC5hZGphY2VudFxuICAgIHZhciBpbmRleE9mTiA9IGNlbGxWZXJ0cy5pbmRleE9mKG4pXG4gICAgaWYoaW5kZXhPZk4gPCAwKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGZvcih2YXIgaT0wOyBpPD1kOyArK2kpIHtcbiAgICAgIGlmKGkgPT09IGluZGV4T2ZOKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vRm9yIGVhY2ggYm91bmRhcnkgbmVpZ2hib3Igb2YgdGhlIGNlbGxcbiAgICAgIHZhciBuZWlnaGJvciA9IGNlbGxBZGpbaV1cbiAgICAgIGlmKCFuZWlnaGJvci5ib3VuZGFyeSB8fCBuZWlnaGJvci5sYXN0VmlzaXRlZCA+PSBuKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciBudiA9IG5laWdoYm9yLnZlcnRpY2VzXG5cbiAgICAgIC8vVGVzdCBpZiBuZWlnaGJvciBpcyBhIHBlYWtcbiAgICAgIGlmKG5laWdoYm9yLmxhc3RWaXNpdGVkICE9PSAtbikgeyAgICAgIFxuICAgICAgICAvL0NvbXB1dGUgb3JpZW50YXRpb24gb2YgcCByZWxhdGl2ZSB0byBlYWNoIGJvdW5kYXJ5IHBlYWtcbiAgICAgICAgdmFyIGluZGV4T2ZOZWcxID0gMFxuICAgICAgICBmb3IodmFyIGo9MDsgajw9ZDsgKytqKSB7XG4gICAgICAgICAgaWYobnZbal0gPCAwKSB7XG4gICAgICAgICAgICBpbmRleE9mTmVnMSA9IGpcbiAgICAgICAgICAgIHR1cGxlW2pdID0gcG9pbnRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHVwbGVbal0gPSB2ZXJ0c1tudltqXV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG8gPSB0aGlzLm9yaWVudCgpXG5cbiAgICAgICAgLy9UZXN0IGlmIG5laWdoYm9yIGNlbGwgaXMgYWxzbyBhIHBlYWtcbiAgICAgICAgaWYobyA+IDApIHtcbiAgICAgICAgICBudltpbmRleE9mTmVnMV0gPSBuXG4gICAgICAgICAgbmVpZ2hib3IuYm91bmRhcnkgPSBmYWxzZVxuICAgICAgICAgIGludGVyaW9yLnB1c2gobmVpZ2hib3IpXG4gICAgICAgICAgdG92aXNpdC5wdXNoKG5laWdoYm9yKVxuICAgICAgICAgIG5laWdoYm9yLmxhc3RWaXNpdGVkID0gblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmVpZ2hib3IubGFzdFZpc2l0ZWQgPSAtblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBuYSA9IG5laWdoYm9yLmFkamFjZW50XG5cbiAgICAgIC8vT3RoZXJ3aXNlLCByZXBsYWNlIG5laWdoYm9yIHdpdGggbmV3IGZhY2VcbiAgICAgIHZhciB2dmVydHMgPSBjZWxsVmVydHMuc2xpY2UoKVxuICAgICAgdmFyIHZhZGogPSBjZWxsQWRqLnNsaWNlKClcbiAgICAgIHZhciBuY2VsbCA9IG5ldyBTaW1wbGV4KHZ2ZXJ0cywgdmFkaiwgdHJ1ZSlcbiAgICAgIHNpbXBsaWNlcy5wdXNoKG5jZWxsKVxuXG4gICAgICAvL0Nvbm5lY3QgdG8gbmVpZ2hib3JcbiAgICAgIHZhciBvcHBvc2l0ZSA9IG5hLmluZGV4T2YoY2VsbClcbiAgICAgIGlmKG9wcG9zaXRlIDwgMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgbmFbb3Bwb3NpdGVdID0gbmNlbGxcbiAgICAgIHZhZGpbaW5kZXhPZk5dID0gbmVpZ2hib3JcblxuICAgICAgLy9Db25uZWN0IHRvIGNlbGxcbiAgICAgIHZ2ZXJ0c1tpXSA9IC0xXG4gICAgICB2YWRqW2ldID0gY2VsbFxuICAgICAgY2VsbEFkaltpXSA9IG5jZWxsXG5cbiAgICAgIC8vRmxpcCBmYWNldFxuICAgICAgbmNlbGwuZmxpcCgpXG5cbiAgICAgIC8vQWRkIHRvIGdsdWUgbGlzdFxuICAgICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgICB2YXIgdXUgPSB2dmVydHNbal1cbiAgICAgICAgaWYodXUgPCAwIHx8IHV1ID09PSBuKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmZhY2UgPSBuZXcgQXJyYXkoZC0xKVxuICAgICAgICB2YXIgbnB0ciA9IDBcbiAgICAgICAgZm9yKHZhciBrPTA7IGs8PWQ7ICsraykge1xuICAgICAgICAgIHZhciB2diA9IHZ2ZXJ0c1trXVxuICAgICAgICAgIGlmKHZ2IDwgMCB8fCBrID09PSBqKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZmFjZVtucHRyKytdID0gdnZcbiAgICAgICAgfVxuICAgICAgICBnbHVlRmFjZXRzLnB1c2gobmV3IEdsdWVGYWNldChuZmFjZSwgbmNlbGwsIGopKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vR2x1ZSBib3VuZGFyeSBmYWNldHMgdG9nZXRoZXJcbiAgZ2x1ZUZhY2V0cy5zb3J0KGNvbXBhcmVHbHVlKVxuXG4gIGZvcih2YXIgaT0wOyBpKzE8Z2x1ZUZhY2V0cy5sZW5ndGg7IGkrPTIpIHtcbiAgICB2YXIgYSA9IGdsdWVGYWNldHNbaV1cbiAgICB2YXIgYiA9IGdsdWVGYWNldHNbaSsxXVxuICAgIHZhciBhaSA9IGEuaW5kZXhcbiAgICB2YXIgYmkgPSBiLmluZGV4XG4gICAgaWYoYWkgPCAwIHx8IGJpIDwgMCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgYS5jZWxsLmFkamFjZW50W2EuaW5kZXhdID0gYi5jZWxsXG4gICAgYi5jZWxsLmFkamFjZW50W2IuaW5kZXhdID0gYS5jZWxsXG4gIH1cbn1cblxucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24ocG9pbnQsIHJhbmRvbSkge1xuICAvL0FkZCBwb2ludFxuICB2YXIgdmVydHMgPSB0aGlzLnZlcnRpY2VzXG4gIHZlcnRzLnB1c2gocG9pbnQpXG5cbiAgdmFyIGNlbGwgPSB0aGlzLndhbGsocG9pbnQsIHJhbmRvbSlcbiAgaWYoIWNlbGwpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vQWxpYXMgbG9jYWwgcHJvcGVydGllc1xuICB2YXIgZCA9IHRoaXMuZGltZW5zaW9uXG4gIHZhciB0dXBsZSA9IHRoaXMudHVwbGVcblxuICAvL0RlZ2VuZXJhdGUgY2FzZTogSWYgcG9pbnQgaXMgY29wbGFuYXIgdG8gY2VsbCwgdGhlbiB3YWxrIHVudGlsIHdlIGZpbmQgYSBub24tZGVnZW5lcmF0ZSBib3VuZGFyeVxuICBmb3IodmFyIGk9MDsgaTw9ZDsgKytpKSB7XG4gICAgdmFyIHZ2ID0gY2VsbC52ZXJ0aWNlc1tpXVxuICAgIGlmKHZ2IDwgMCkge1xuICAgICAgdHVwbGVbaV0gPSBwb2ludFxuICAgIH0gZWxzZSB7XG4gICAgICB0dXBsZVtpXSA9IHZlcnRzW3Z2XVxuICAgIH1cbiAgfVxuICB2YXIgbyA9IHRoaXMub3JpZW50KHR1cGxlKVxuICBpZihvIDwgMCkge1xuICAgIHJldHVyblxuICB9IGVsc2UgaWYobyA9PT0gMCkge1xuICAgIGNlbGwgPSB0aGlzLmhhbmRsZUJvdW5kYXJ5RGVnZW5lcmFjeShjZWxsLCBwb2ludClcbiAgICBpZighY2VsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgLy9BZGQgcGVha3NcbiAgdGhpcy5hZGRQZWFrcyhwb2ludCwgY2VsbClcbn1cblxuLy9FeHRyYWN0IGFsbCBib3VuZGFyeSBjZWxsc1xucHJvdG8uYm91bmRhcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGQgPSB0aGlzLmRpbWVuc2lvblxuICB2YXIgYm91bmRhcnkgPSBbXVxuICB2YXIgY2VsbHMgPSB0aGlzLnNpbXBsaWNlc1xuICB2YXIgbmMgPSBjZWxscy5sZW5ndGhcbiAgZm9yKHZhciBpPTA7IGk8bmM7ICsraSkge1xuICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICBpZihjLmJvdW5kYXJ5KSB7XG4gICAgICB2YXIgYmNlbGwgPSBuZXcgQXJyYXkoZClcbiAgICAgIHZhciBjdiA9IGMudmVydGljZXNcbiAgICAgIHZhciBwdHIgPSAwXG4gICAgICB2YXIgcGFyaXR5ID0gMFxuICAgICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgICBpZihjdltqXSA+PSAwKSB7XG4gICAgICAgICAgYmNlbGxbcHRyKytdID0gY3Zbal1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJpdHkgPSBqJjFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYocGFyaXR5ID09PSAoZCYxKSkge1xuICAgICAgICB2YXIgdCA9IGJjZWxsWzBdXG4gICAgICAgIGJjZWxsWzBdID0gYmNlbGxbMV1cbiAgICAgICAgYmNlbGxbMV0gPSB0XG4gICAgICB9XG4gICAgICBib3VuZGFyeS5wdXNoKGJjZWxsKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYm91bmRhcnlcbn1cblxuZnVuY3Rpb24gaW5jcmVtZW50YWxDb252ZXhIdWxsKHBvaW50cywgcmFuZG9tU2VhcmNoKSB7XG4gIHZhciBuID0gcG9pbnRzLmxlbmd0aFxuICBpZihuID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBoYXZlIGF0IGxlYXN0IGQrMSBwb2ludHNcIilcbiAgfVxuICB2YXIgZCA9IHBvaW50c1swXS5sZW5ndGhcbiAgaWYobiA8PSBkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBpbnB1dCBhdCBsZWFzdCBkKzEgcG9pbnRzXCIpXG4gIH1cblxuICAvL0ZJWE1FOiBUaGlzIGNvdWxkIGJlIGRlZ2VuZXJhdGUsIGJ1dCBuZWVkIHRvIHNlbGVjdCBkKzEgbm9uLWNvcGxhbmFyIHBvaW50cyB0byBib290c3RyYXAgcHJvY2Vzc1xuICB2YXIgaW5pdGlhbFNpbXBsZXggPSBwb2ludHMuc2xpY2UoMCwgZCsxKVxuXG4gIC8vTWFrZSBzdXJlIGluaXRpYWwgc2ltcGxleCBpcyBwb3NpdGl2ZWx5IG9yaWVudGVkXG4gIHZhciBvID0gb3JpZW50LmFwcGx5KHZvaWQgMCwgaW5pdGlhbFNpbXBsZXgpXG4gIGlmKG8gPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnB1dCBub3QgaW4gZ2VuZXJhbCBwb3NpdGlvblwiKVxuICB9XG4gIHZhciBpbml0aWFsQ29vcmRzID0gbmV3IEFycmF5KGQrMSlcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIGluaXRpYWxDb29yZHNbaV0gPSBpXG4gIH1cbiAgaWYobyA8IDApIHtcbiAgICBpbml0aWFsQ29vcmRzWzBdID0gMVxuICAgIGluaXRpYWxDb29yZHNbMV0gPSAwXG4gIH1cblxuICAvL0NyZWF0ZSBpbml0aWFsIHRvcG9sb2dpY2FsIGluZGV4LCBnbHVlIHBvaW50ZXJzIHRvZ2V0aGVyIChraW5kIG9mIG1lc3N5KVxuICB2YXIgaW5pdGlhbENlbGwgPSBuZXcgU2ltcGxleChpbml0aWFsQ29vcmRzLCBuZXcgQXJyYXkoZCsxKSwgZmFsc2UpXG4gIHZhciBib3VuZGFyeSA9IGluaXRpYWxDZWxsLmFkamFjZW50XG4gIHZhciBsaXN0ID0gbmV3IEFycmF5KGQrMilcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHZhciB2ZXJ0cyA9IGluaXRpYWxDb29yZHMuc2xpY2UoKVxuICAgIGZvcih2YXIgaj0wOyBqPD1kOyArK2opIHtcbiAgICAgIGlmKGogPT09IGkpIHtcbiAgICAgICAgdmVydHNbal0gPSAtMVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdCA9IHZlcnRzWzBdXG4gICAgdmVydHNbMF0gPSB2ZXJ0c1sxXVxuICAgIHZlcnRzWzFdID0gdFxuICAgIHZhciBjZWxsID0gbmV3IFNpbXBsZXgodmVydHMsIG5ldyBBcnJheShkKzEpLCB0cnVlKVxuICAgIGJvdW5kYXJ5W2ldID0gY2VsbFxuICAgIGxpc3RbaV0gPSBjZWxsXG4gIH1cbiAgbGlzdFtkKzFdID0gaW5pdGlhbENlbGxcbiAgZm9yKHZhciBpPTA7IGk8PWQ7ICsraSkge1xuICAgIHZhciB2ZXJ0cyA9IGJvdW5kYXJ5W2ldLnZlcnRpY2VzXG4gICAgdmFyIGFkaiA9IGJvdW5kYXJ5W2ldLmFkamFjZW50XG4gICAgZm9yKHZhciBqPTA7IGo8PWQ7ICsraikge1xuICAgICAgdmFyIHYgPSB2ZXJ0c1tqXVxuICAgICAgaWYodiA8IDApIHtcbiAgICAgICAgYWRqW2pdID0gaW5pdGlhbENlbGxcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaz0wOyBrPD1kOyArK2spIHtcbiAgICAgICAgaWYoYm91bmRhcnlba10udmVydGljZXMuaW5kZXhPZih2KSA8IDApIHtcbiAgICAgICAgICBhZGpbal0gPSBib3VuZGFyeVtrXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9Jbml0aWFsaXplIHRyaWFuZ2xlc1xuICB2YXIgdHJpYW5nbGVzID0gbmV3IFRyaWFuZ3VsYXRpb24oZCwgaW5pdGlhbFNpbXBsZXgsIGxpc3QpXG5cbiAgLy9JbnNlcnQgcmVtYWluaW5nIHBvaW50c1xuICB2YXIgdXNlUmFuZG9tID0gISFyYW5kb21TZWFyY2hcbiAgZm9yKHZhciBpPWQrMTsgaTxuOyArK2kpIHtcbiAgICB0cmlhbmdsZXMuaW5zZXJ0KHBvaW50c1tpXSwgdXNlUmFuZG9tKVxuICB9XG4gIFxuICAvL0V4dHJhY3QgYm91bmRhcnkgY2VsbHNcbiAgcmV0dXJuIHRyaWFuZ2xlcy5ib3VuZGFyeSgpXG59IiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gbW9ub3RvbmVDb252ZXhIdWxsMkRcblxudmFyIG9yaWVudCA9IHJlcXVpcmUoJ3JvYnVzdC1vcmllbnRhdGlvbicpWzNdXG5cbmZ1bmN0aW9uIG1vbm90b25lQ29udmV4SHVsbDJEKHBvaW50cykge1xuICB2YXIgbiA9IHBvaW50cy5sZW5ndGhcblxuICBpZihuIDwgMykge1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobilcbiAgICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICAgIHJlc3VsdFtpXSA9IGlcbiAgICB9XG5cbiAgICBpZihuID09PSAyICYmXG4gICAgICAgcG9pbnRzWzBdWzBdID09PSBwb2ludHNbMV1bMF0gJiZcbiAgICAgICBwb2ludHNbMF1bMV0gPT09IHBvaW50c1sxXVsxXSkge1xuICAgICAgcmV0dXJuIFswXVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8vU29ydCBwb2ludCBpbmRpY2VzIGFsb25nIHgtYXhpc1xuICB2YXIgc29ydGVkID0gbmV3IEFycmF5KG4pXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIHNvcnRlZFtpXSA9IGlcbiAgfVxuICBzb3J0ZWQuc29ydChmdW5jdGlvbihhLGIpIHtcbiAgICB2YXIgZCA9IHBvaW50c1thXVswXS1wb2ludHNbYl1bMF1cbiAgICBpZihkKSB7XG4gICAgICByZXR1cm4gZFxuICAgIH1cbiAgICByZXR1cm4gcG9pbnRzW2FdWzFdIC0gcG9pbnRzW2JdWzFdXG4gIH0pXG5cbiAgLy9Db25zdHJ1Y3QgdXBwZXIgYW5kIGxvd2VyIGh1bGxzXG4gIHZhciBsb3dlciA9IFtzb3J0ZWRbMF0sIHNvcnRlZFsxXV1cbiAgdmFyIHVwcGVyID0gW3NvcnRlZFswXSwgc29ydGVkWzFdXVxuXG4gIGZvcih2YXIgaT0yOyBpPG47ICsraSkge1xuICAgIHZhciBpZHggPSBzb3J0ZWRbaV1cbiAgICB2YXIgcCAgID0gcG9pbnRzW2lkeF1cblxuICAgIC8vSW5zZXJ0IGludG8gbG93ZXIgbGlzdFxuICAgIHZhciBtID0gbG93ZXIubGVuZ3RoXG4gICAgd2hpbGUobSA+IDEgJiYgb3JpZW50KFxuICAgICAgICBwb2ludHNbbG93ZXJbbS0yXV0sIFxuICAgICAgICBwb2ludHNbbG93ZXJbbS0xXV0sIFxuICAgICAgICBwKSA8PSAwKSB7XG4gICAgICBtIC09IDFcbiAgICAgIGxvd2VyLnBvcCgpXG4gICAgfVxuICAgIGxvd2VyLnB1c2goaWR4KVxuXG4gICAgLy9JbnNlcnQgaW50byB1cHBlciBsaXN0XG4gICAgbSA9IHVwcGVyLmxlbmd0aFxuICAgIHdoaWxlKG0gPiAxICYmIG9yaWVudChcbiAgICAgICAgcG9pbnRzW3VwcGVyW20tMl1dLCBcbiAgICAgICAgcG9pbnRzW3VwcGVyW20tMV1dLCBcbiAgICAgICAgcCkgPj0gMCkge1xuICAgICAgbSAtPSAxXG4gICAgICB1cHBlci5wb3AoKVxuICAgIH1cbiAgICB1cHBlci5wdXNoKGlkeClcbiAgfVxuXG4gIC8vTWVyZ2UgbGlzdHMgdG9nZXRoZXJcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheSh1cHBlci5sZW5ndGggKyBsb3dlci5sZW5ndGggLSAyKVxuICB2YXIgcHRyICAgID0gMFxuICBmb3IodmFyIGk9MCwgbmw9bG93ZXIubGVuZ3RoOyBpPG5sOyArK2kpIHtcbiAgICByZXN1bHRbcHRyKytdID0gbG93ZXJbaV1cbiAgfVxuICBmb3IodmFyIGo9dXBwZXIubGVuZ3RoLTI7IGo+MDsgLS1qKSB7XG4gICAgcmVzdWx0W3B0cisrXSA9IHVwcGVyW2pdXG4gIH1cblxuICAvL1JldHVybiByZXN1bHRcbiAgcmV0dXJuIHJlc3VsdFxufSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciB0d29Qcm9kdWN0ID0gcmVxdWlyZShcInR3by1wcm9kdWN0XCIpXG52YXIgcm9idXN0U3VtID0gcmVxdWlyZShcInJvYnVzdC1zdW1cIilcbnZhciByb2J1c3RTY2FsZSA9IHJlcXVpcmUoXCJyb2J1c3Qtc2NhbGVcIilcbnZhciByb2J1c3RTdWJ0cmFjdCA9IHJlcXVpcmUoXCJyb2J1c3Qtc3VidHJhY3RcIilcblxudmFyIE5VTV9FWFBBTkQgPSA1XG5cbnZhciBFUFNJTE9OICAgICA9IDEuMTEwMjIzMDI0NjI1MTU2NWUtMTZcbnZhciBFUlJCT1VORDMgICA9ICgzLjAgKyAxNi4wICogRVBTSUxPTikgKiBFUFNJTE9OXG52YXIgRVJSQk9VTkQ0ICAgPSAoNy4wICsgNTYuMCAqIEVQU0lMT04pICogRVBTSUxPTlxuXG5mdW5jdGlvbiBvcmllbnRhdGlvbl8zKHN1bSwgcHJvZCwgc2NhbGUsIHN1Yikge1xuICByZXR1cm4gZnVuY3Rpb24gb3JpZW50YXRpb24zRXhhY3QobTAsIG0xLCBtMikge1xuICAgIHZhciBwID0gc3VtKHN1bShwcm9kKG0xWzFdLCBtMlswXSksIHByb2QoLW0yWzFdLCBtMVswXSkpLCBzdW0ocHJvZChtMFsxXSwgbTFbMF0pLCBwcm9kKC1tMVsxXSwgbTBbMF0pKSlcbiAgICB2YXIgbiA9IHN1bShwcm9kKG0wWzFdLCBtMlswXSksIHByb2QoLW0yWzFdLCBtMFswXSkpXG4gICAgdmFyIGQgPSBzdWIocCwgbilcbiAgICByZXR1cm4gZFtkLmxlbmd0aCAtIDFdXG4gIH1cbn1cblxuZnVuY3Rpb24gb3JpZW50YXRpb25fNChzdW0sIHByb2QsIHNjYWxlLCBzdWIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9yaWVudGF0aW9uNEV4YWN0KG0wLCBtMSwgbTIsIG0zKSB7XG4gICAgdmFyIHAgPSBzdW0oc3VtKHNjYWxlKHN1bShwcm9kKG0yWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMlswXSkpLCBtMVsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMVsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTFbMF0pKSwgLW0yWzJdKSwgc2NhbGUoc3VtKHByb2QobTFbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0xWzBdKSksIG0zWzJdKSkpLCBzdW0oc2NhbGUoc3VtKHByb2QobTFbMV0sIG0zWzBdKSwgcHJvZCgtbTNbMV0sIG0xWzBdKSksIG0wWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMFswXSkpLCAtbTFbMl0pLCBzY2FsZShzdW0ocHJvZChtMFsxXSwgbTFbMF0pLCBwcm9kKC1tMVsxXSwgbTBbMF0pKSwgbTNbMl0pKSkpXG4gICAgdmFyIG4gPSBzdW0oc3VtKHNjYWxlKHN1bShwcm9kKG0yWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMlswXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTBbMF0pKSwgLW0yWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0wWzBdKSksIG0zWzJdKSkpLCBzdW0oc2NhbGUoc3VtKHByb2QobTFbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0xWzBdKSksIG0wWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtMlswXSksIHByb2QoLW0yWzFdLCBtMFswXSkpLCAtbTFbMl0pLCBzY2FsZShzdW0ocHJvZChtMFsxXSwgbTFbMF0pLCBwcm9kKC1tMVsxXSwgbTBbMF0pKSwgbTJbMl0pKSkpXG4gICAgdmFyIGQgPSBzdWIocCwgbilcbiAgICByZXR1cm4gZFtkLmxlbmd0aCAtIDFdXG4gIH1cbn1cblxuZnVuY3Rpb24gb3JpZW50YXRpb25fNShzdW0sIHByb2QsIHNjYWxlLCBzdWIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9yaWVudGF0aW9uNUV4YWN0KG0wLCBtMSwgbTIsIG0zLCBtNCkge1xuICAgIHZhciBwID0gc3VtKHN1bShzdW0oc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0zWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtM1swXSkpLCBtMlsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMlsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTJbMF0pKSwgLW0zWzJdKSwgc2NhbGUoc3VtKHByb2QobTJbMV0sIG0zWzBdKSwgcHJvZCgtbTNbMV0sIG0yWzBdKSksIG00WzJdKSkpLCBtMVszXSksIHN1bShzY2FsZShzdW0oc2NhbGUoc3VtKHByb2QobTNbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0zWzBdKSksIG0xWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtMVswXSkpLCAtbTNbMl0pLCBzY2FsZShzdW0ocHJvZChtMVsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTFbMF0pKSwgbTRbMl0pKSksIC1tMlszXSksIHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtMlsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTJbMF0pKSwgbTFbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTFbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0xWzBdKSksIC1tMlsyXSksIHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtMlswXSksIHByb2QoLW0yWzFdLCBtMVswXSkpLCBtNFsyXSkpKSwgbTNbM10pKSksIHN1bShzY2FsZShzdW0oc2NhbGUoc3VtKHByb2QobTJbMV0sIG0zWzBdKSwgcHJvZCgtbTNbMV0sIG0yWzBdKSksIG0xWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMVswXSkpLCAtbTJbMl0pLCBzY2FsZShzdW0ocHJvZChtMVsxXSwgbTJbMF0pLCBwcm9kKC1tMlsxXSwgbTFbMF0pKSwgbTNbMl0pKSksIC1tNFszXSksIHN1bShzY2FsZShzdW0oc2NhbGUoc3VtKHByb2QobTNbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0zWzBdKSksIG0xWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtMVswXSkpLCAtbTNbMl0pLCBzY2FsZShzdW0ocHJvZChtMVsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTFbMF0pKSwgbTRbMl0pKSksIG0wWzNdKSwgc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0zWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtM1swXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTBbMF0pKSwgLW0zWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0zWzBdKSwgcHJvZCgtbTNbMV0sIG0wWzBdKSksIG00WzJdKSkpLCAtbTFbM10pKSkpLCBzdW0oc3VtKHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtMVsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTFbMF0pKSwgbTBbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTBbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0wWzBdKSksIC1tMVsyXSksIHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtMVswXSksIHByb2QoLW0xWzFdLCBtMFswXSkpLCBtNFsyXSkpKSwgbTNbM10pLCBzdW0oc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMVswXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTBbMF0pKSwgLW0xWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0xWzBdKSwgcHJvZCgtbTFbMV0sIG0wWzBdKSksIG0zWzJdKSkpLCAtbTRbM10pLCBzY2FsZShzdW0oc2NhbGUoc3VtKHByb2QobTJbMV0sIG0zWzBdKSwgcHJvZCgtbTNbMV0sIG0yWzBdKSksIG0xWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMVswXSkpLCAtbTJbMl0pLCBzY2FsZShzdW0ocHJvZChtMVsxXSwgbTJbMF0pLCBwcm9kKC1tMlsxXSwgbTFbMF0pKSwgbTNbMl0pKSksIG0wWzNdKSkpLCBzdW0oc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0yWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMlswXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTBbMF0pKSwgLW0yWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0wWzBdKSksIG0zWzJdKSkpLCAtbTFbM10pLCBzdW0oc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMVswXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTBbMF0pKSwgLW0xWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0xWzBdKSwgcHJvZCgtbTFbMV0sIG0wWzBdKSksIG0zWzJdKSkpLCBtMlszXSksIHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtMVsxXSwgbTJbMF0pLCBwcm9kKC1tMlsxXSwgbTFbMF0pKSwgbTBbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTBbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0wWzBdKSksIC1tMVsyXSksIHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtMVswXSksIHByb2QoLW0xWzFdLCBtMFswXSkpLCBtMlsyXSkpKSwgLW0zWzNdKSkpKSlcbiAgICB2YXIgbiA9IHN1bShzdW0oc3VtKHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtM1sxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTNbMF0pKSwgbTJbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTJbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0yWzBdKSksIC1tM1syXSksIHNjYWxlKHN1bShwcm9kKG0yWzFdLCBtM1swXSksIHByb2QoLW0zWzFdLCBtMlswXSkpLCBtNFsyXSkpKSwgbTBbM10pLCBzY2FsZShzdW0oc2NhbGUoc3VtKHByb2QobTNbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0zWzBdKSksIG0wWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtMFswXSkpLCAtbTNbMl0pLCBzY2FsZShzdW0ocHJvZChtMFsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTBbMF0pKSwgbTRbMl0pKSksIC1tMlszXSkpLCBzdW0oc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0yWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtMlswXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTBbMF0pKSwgLW0yWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0wWzBdKSksIG00WzJdKSkpLCBtM1szXSksIHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtMlsxXSwgbTNbMF0pLCBwcm9kKC1tM1sxXSwgbTJbMF0pKSwgbTBbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTBbMV0sIG0zWzBdKSwgcHJvZCgtbTNbMV0sIG0wWzBdKSksIC1tMlsyXSksIHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtMlswXSksIHByb2QoLW0yWzFdLCBtMFswXSkpLCBtM1syXSkpKSwgLW00WzNdKSkpLCBzdW0oc3VtKHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtMlsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTJbMF0pKSwgbTFbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTFbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0xWzBdKSksIC1tMlsyXSksIHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtMlswXSksIHByb2QoLW0yWzFdLCBtMVswXSkpLCBtNFsyXSkpKSwgbTBbM10pLCBzY2FsZShzdW0oc2NhbGUoc3VtKHByb2QobTJbMV0sIG00WzBdKSwgcHJvZCgtbTRbMV0sIG0yWzBdKSksIG0wWzJdKSwgc3VtKHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtMFswXSkpLCAtbTJbMl0pLCBzY2FsZShzdW0ocHJvZChtMFsxXSwgbTJbMF0pLCBwcm9kKC1tMlsxXSwgbTBbMF0pKSwgbTRbMl0pKSksIC1tMVszXSkpLCBzdW0oc2NhbGUoc3VtKHNjYWxlKHN1bShwcm9kKG0xWzFdLCBtNFswXSksIHByb2QoLW00WzFdLCBtMVswXSkpLCBtMFsyXSksIHN1bShzY2FsZShzdW0ocHJvZChtMFsxXSwgbTRbMF0pLCBwcm9kKC1tNFsxXSwgbTBbMF0pKSwgLW0xWzJdKSwgc2NhbGUoc3VtKHByb2QobTBbMV0sIG0xWzBdKSwgcHJvZCgtbTFbMV0sIG0wWzBdKSksIG00WzJdKSkpLCBtMlszXSksIHNjYWxlKHN1bShzY2FsZShzdW0ocHJvZChtMVsxXSwgbTJbMF0pLCBwcm9kKC1tMlsxXSwgbTFbMF0pKSwgbTBbMl0pLCBzdW0oc2NhbGUoc3VtKHByb2QobTBbMV0sIG0yWzBdKSwgcHJvZCgtbTJbMV0sIG0wWzBdKSksIC1tMVsyXSksIHNjYWxlKHN1bShwcm9kKG0wWzFdLCBtMVswXSksIHByb2QoLW0xWzFdLCBtMFswXSkpLCBtMlsyXSkpKSwgLW00WzNdKSkpKVxuICAgIHZhciBkID0gc3ViKHAsIG4pXG4gICAgcmV0dXJuIGRbZC5sZW5ndGggLSAxXVxuICB9XG59XG5cbmZ1bmN0aW9uIG9yaWVudGF0aW9uKG4pIHtcbiAgdmFyIGZuID1cbiAgICBuID09PSAzID8gb3JpZW50YXRpb25fMyA6XG4gICAgbiA9PT0gNCA/IG9yaWVudGF0aW9uXzQgOiBvcmllbnRhdGlvbl81XG5cbiAgcmV0dXJuIGZuKHJvYnVzdFN1bSwgdHdvUHJvZHVjdCwgcm9idXN0U2NhbGUsIHJvYnVzdFN1YnRyYWN0KVxufVxuXG52YXIgb3JpZW50YXRpb24zRXhhY3QgPSBvcmllbnRhdGlvbigzKVxudmFyIG9yaWVudGF0aW9uNEV4YWN0ID0gb3JpZW50YXRpb24oNClcblxudmFyIENBQ0hFRCA9IFtcbiAgZnVuY3Rpb24gb3JpZW50YXRpb24wKCkgeyByZXR1cm4gMCB9LFxuICBmdW5jdGlvbiBvcmllbnRhdGlvbjEoKSB7IHJldHVybiAwIH0sXG4gIGZ1bmN0aW9uIG9yaWVudGF0aW9uMihhLCBiKSB7XG4gICAgcmV0dXJuIGJbMF0gLSBhWzBdXG4gIH0sXG4gIGZ1bmN0aW9uIG9yaWVudGF0aW9uMyhhLCBiLCBjKSB7XG4gICAgdmFyIGwgPSAoYVsxXSAtIGNbMV0pICogKGJbMF0gLSBjWzBdKVxuICAgIHZhciByID0gKGFbMF0gLSBjWzBdKSAqIChiWzFdIC0gY1sxXSlcbiAgICB2YXIgZGV0ID0gbCAtIHJcbiAgICB2YXIgc1xuICAgIGlmKGwgPiAwKSB7XG4gICAgICBpZihyIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGRldFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IGwgKyByXG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGwgPCAwKSB7XG4gICAgICBpZihyID49IDApIHtcbiAgICAgICAgcmV0dXJuIGRldFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IC0obCArIHIpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkZXRcbiAgICB9XG4gICAgdmFyIHRvbCA9IEVSUkJPVU5EMyAqIHNcbiAgICBpZihkZXQgPj0gdG9sIHx8IGRldCA8PSAtdG9sKSB7XG4gICAgICByZXR1cm4gZGV0XG4gICAgfVxuICAgIHJldHVybiBvcmllbnRhdGlvbjNFeGFjdChhLCBiLCBjKVxuICB9LFxuICBmdW5jdGlvbiBvcmllbnRhdGlvbjQoYSxiLGMsZCkge1xuICAgIHZhciBhZHggPSBhWzBdIC0gZFswXVxuICAgIHZhciBiZHggPSBiWzBdIC0gZFswXVxuICAgIHZhciBjZHggPSBjWzBdIC0gZFswXVxuICAgIHZhciBhZHkgPSBhWzFdIC0gZFsxXVxuICAgIHZhciBiZHkgPSBiWzFdIC0gZFsxXVxuICAgIHZhciBjZHkgPSBjWzFdIC0gZFsxXVxuICAgIHZhciBhZHogPSBhWzJdIC0gZFsyXVxuICAgIHZhciBiZHogPSBiWzJdIC0gZFsyXVxuICAgIHZhciBjZHogPSBjWzJdIC0gZFsyXVxuICAgIHZhciBiZHhjZHkgPSBiZHggKiBjZHlcbiAgICB2YXIgY2R4YmR5ID0gY2R4ICogYmR5XG4gICAgdmFyIGNkeGFkeSA9IGNkeCAqIGFkeVxuICAgIHZhciBhZHhjZHkgPSBhZHggKiBjZHlcbiAgICB2YXIgYWR4YmR5ID0gYWR4ICogYmR5XG4gICAgdmFyIGJkeGFkeSA9IGJkeCAqIGFkeVxuICAgIHZhciBkZXQgPSBhZHogKiAoYmR4Y2R5IC0gY2R4YmR5KVxuICAgICAgICAgICAgKyBiZHogKiAoY2R4YWR5IC0gYWR4Y2R5KVxuICAgICAgICAgICAgKyBjZHogKiAoYWR4YmR5IC0gYmR4YWR5KVxuICAgIHZhciBwZXJtYW5lbnQgPSAoTWF0aC5hYnMoYmR4Y2R5KSArIE1hdGguYWJzKGNkeGJkeSkpICogTWF0aC5hYnMoYWR6KVxuICAgICAgICAgICAgICAgICAgKyAoTWF0aC5hYnMoY2R4YWR5KSArIE1hdGguYWJzKGFkeGNkeSkpICogTWF0aC5hYnMoYmR6KVxuICAgICAgICAgICAgICAgICAgKyAoTWF0aC5hYnMoYWR4YmR5KSArIE1hdGguYWJzKGJkeGFkeSkpICogTWF0aC5hYnMoY2R6KVxuICAgIHZhciB0b2wgPSBFUlJCT1VORDQgKiBwZXJtYW5lbnRcbiAgICBpZiAoKGRldCA+IHRvbCkgfHwgKC1kZXQgPiB0b2wpKSB7XG4gICAgICByZXR1cm4gZGV0XG4gICAgfVxuICAgIHJldHVybiBvcmllbnRhdGlvbjRFeGFjdChhLGIsYyxkKVxuICB9XG5dXG5cbmZ1bmN0aW9uIHNsb3dPcmllbnQoYXJncykge1xuICB2YXIgcHJvYyA9IENBQ0hFRFthcmdzLmxlbmd0aF1cbiAgaWYoIXByb2MpIHtcbiAgICBwcm9jID0gQ0FDSEVEW2FyZ3MubGVuZ3RoXSA9IG9yaWVudGF0aW9uKGFyZ3MubGVuZ3RoKVxuICB9XG4gIHJldHVybiBwcm9jLmFwcGx5KHVuZGVmaW5lZCwgYXJncylcbn1cblxuZnVuY3Rpb24gcHJvYyAoc2xvdywgbzAsIG8xLCBvMiwgbzMsIG80LCBvNSkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbzIoYTAsIGExKVxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbzMoYTAsIGExLCBhMilcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuIG80KGEwLCBhMSwgYTIsIGEzKVxuICAgICAgY2FzZSA1OlxuICAgICAgICByZXR1cm4gbzUoYTAsIGExLCBhMiwgYTMsIGE0KVxuICAgIH1cblxuICAgIHZhciBzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHNbaV0gPSBhcmd1bWVudHNbaV1cbiAgICB9XG4gICAgcmV0dXJuIHNsb3cocylcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU9yaWVudGF0aW9uUHJvYygpIHtcbiAgd2hpbGUoQ0FDSEVELmxlbmd0aCA8PSBOVU1fRVhQQU5EKSB7XG4gICAgQ0FDSEVELnB1c2gob3JpZW50YXRpb24oQ0FDSEVELmxlbmd0aCkpXG4gIH1cbiAgbW9kdWxlLmV4cG9ydHMgPSBwcm9jLmFwcGx5KHVuZGVmaW5lZCwgW3Nsb3dPcmllbnRdLmNvbmNhdChDQUNIRUQpKVxuICBmb3IodmFyIGk9MDsgaTw9TlVNX0VYUEFORDsgKytpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHNbaV0gPSBDQUNIRURbaV1cbiAgfVxufVxuXG5nZW5lcmF0ZU9yaWVudGF0aW9uUHJvYygpIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHR3b1Byb2R1Y3QgPSByZXF1aXJlKFwidHdvLXByb2R1Y3RcIilcbnZhciB0d29TdW0gPSByZXF1aXJlKFwidHdvLXN1bVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNjYWxlTGluZWFyRXhwYW5zaW9uXG5cbmZ1bmN0aW9uIHNjYWxlTGluZWFyRXhwYW5zaW9uKGUsIHNjYWxlKSB7XG4gIHZhciBuID0gZS5sZW5ndGhcbiAgaWYobiA9PT0gMSkge1xuICAgIHZhciB0cyA9IHR3b1Byb2R1Y3QoZVswXSwgc2NhbGUpXG4gICAgaWYodHNbMF0pIHtcbiAgICAgIHJldHVybiB0c1xuICAgIH1cbiAgICByZXR1cm4gWyB0c1sxXSBdXG4gIH1cbiAgdmFyIGcgPSBuZXcgQXJyYXkoMiAqIG4pXG4gIHZhciBxID0gWzAuMSwgMC4xXVxuICB2YXIgdCA9IFswLjEsIDAuMV1cbiAgdmFyIGNvdW50ID0gMFxuICB0d29Qcm9kdWN0KGVbMF0sIHNjYWxlLCBxKVxuICBpZihxWzBdKSB7XG4gICAgZ1tjb3VudCsrXSA9IHFbMF1cbiAgfVxuICBmb3IodmFyIGk9MTsgaTxuOyArK2kpIHtcbiAgICB0d29Qcm9kdWN0KGVbaV0sIHNjYWxlLCB0KVxuICAgIHZhciBwcSA9IHFbMV1cbiAgICB0d29TdW0ocHEsIHRbMF0sIHEpXG4gICAgaWYocVswXSkge1xuICAgICAgZ1tjb3VudCsrXSA9IHFbMF1cbiAgICB9XG4gICAgdmFyIGEgPSB0WzFdXG4gICAgdmFyIGIgPSBxWzFdXG4gICAgdmFyIHggPSBhICsgYlxuICAgIHZhciBidiA9IHggLSBhXG4gICAgdmFyIHkgPSBiIC0gYnZcbiAgICBxWzFdID0geFxuICAgIGlmKHkpIHtcbiAgICAgIGdbY291bnQrK10gPSB5XG4gICAgfVxuICB9XG4gIGlmKHFbMV0pIHtcbiAgICBnW2NvdW50KytdID0gcVsxXVxuICB9XG4gIGlmKGNvdW50ID09PSAwKSB7XG4gICAgZ1tjb3VudCsrXSA9IDAuMFxuICB9XG4gIGcubGVuZ3RoID0gY291bnRcbiAgcmV0dXJuIGdcbn0iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHJvYnVzdFN1YnRyYWN0XG5cbi8vRWFzeSBjYXNlOiBBZGQgdHdvIHNjYWxhcnNcbmZ1bmN0aW9uIHNjYWxhclNjYWxhcihhLCBiKSB7XG4gIHZhciB4ID0gYSArIGJcbiAgdmFyIGJ2ID0geCAtIGFcbiAgdmFyIGF2ID0geCAtIGJ2XG4gIHZhciBiciA9IGIgLSBidlxuICB2YXIgYXIgPSBhIC0gYXZcbiAgdmFyIHkgPSBhciArIGJyXG4gIGlmKHkpIHtcbiAgICByZXR1cm4gW3ksIHhdXG4gIH1cbiAgcmV0dXJuIFt4XVxufVxuXG5mdW5jdGlvbiByb2J1c3RTdWJ0cmFjdChlLCBmKSB7XG4gIHZhciBuZSA9IGUubGVuZ3RofDBcbiAgdmFyIG5mID0gZi5sZW5ndGh8MFxuICBpZihuZSA9PT0gMSAmJiBuZiA9PT0gMSkge1xuICAgIHJldHVybiBzY2FsYXJTY2FsYXIoZVswXSwgLWZbMF0pXG4gIH1cbiAgdmFyIG4gPSBuZSArIG5mXG4gIHZhciBnID0gbmV3IEFycmF5KG4pXG4gIHZhciBjb3VudCA9IDBcbiAgdmFyIGVwdHIgPSAwXG4gIHZhciBmcHRyID0gMFxuICB2YXIgYWJzID0gTWF0aC5hYnNcbiAgdmFyIGVpID0gZVtlcHRyXVxuICB2YXIgZWEgPSBhYnMoZWkpXG4gIHZhciBmaSA9IC1mW2ZwdHJdXG4gIHZhciBmYSA9IGFicyhmaSlcbiAgdmFyIGEsIGJcbiAgaWYoZWEgPCBmYSkge1xuICAgIGIgPSBlaVxuICAgIGVwdHIgKz0gMVxuICAgIGlmKGVwdHIgPCBuZSkge1xuICAgICAgZWkgPSBlW2VwdHJdXG4gICAgICBlYSA9IGFicyhlaSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYiA9IGZpXG4gICAgZnB0ciArPSAxXG4gICAgaWYoZnB0ciA8IG5mKSB7XG4gICAgICBmaSA9IC1mW2ZwdHJdXG4gICAgICBmYSA9IGFicyhmaSlcbiAgICB9XG4gIH1cbiAgaWYoKGVwdHIgPCBuZSAmJiBlYSA8IGZhKSB8fCAoZnB0ciA+PSBuZikpIHtcbiAgICBhID0gZWlcbiAgICBlcHRyICs9IDFcbiAgICBpZihlcHRyIDwgbmUpIHtcbiAgICAgIGVpID0gZVtlcHRyXVxuICAgICAgZWEgPSBhYnMoZWkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGEgPSBmaVxuICAgIGZwdHIgKz0gMVxuICAgIGlmKGZwdHIgPCBuZikge1xuICAgICAgZmkgPSAtZltmcHRyXVxuICAgICAgZmEgPSBhYnMoZmkpXG4gICAgfVxuICB9XG4gIHZhciB4ID0gYSArIGJcbiAgdmFyIGJ2ID0geCAtIGFcbiAgdmFyIHkgPSBiIC0gYnZcbiAgdmFyIHEwID0geVxuICB2YXIgcTEgPSB4XG4gIHZhciBfeCwgX2J2LCBfYXYsIF9iciwgX2FyXG4gIHdoaWxlKGVwdHIgPCBuZSAmJiBmcHRyIDwgbmYpIHtcbiAgICBpZihlYSA8IGZhKSB7XG4gICAgICBhID0gZWlcbiAgICAgIGVwdHIgKz0gMVxuICAgICAgaWYoZXB0ciA8IG5lKSB7XG4gICAgICAgIGVpID0gZVtlcHRyXVxuICAgICAgICBlYSA9IGFicyhlaSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYSA9IGZpXG4gICAgICBmcHRyICs9IDFcbiAgICAgIGlmKGZwdHIgPCBuZikge1xuICAgICAgICBmaSA9IC1mW2ZwdHJdXG4gICAgICAgIGZhID0gYWJzKGZpKVxuICAgICAgfVxuICAgIH1cbiAgICBiID0gcTBcbiAgICB4ID0gYSArIGJcbiAgICBidiA9IHggLSBhXG4gICAgeSA9IGIgLSBidlxuICAgIGlmKHkpIHtcbiAgICAgIGdbY291bnQrK10gPSB5XG4gICAgfVxuICAgIF94ID0gcTEgKyB4XG4gICAgX2J2ID0gX3ggLSBxMVxuICAgIF9hdiA9IF94IC0gX2J2XG4gICAgX2JyID0geCAtIF9idlxuICAgIF9hciA9IHExIC0gX2F2XG4gICAgcTAgPSBfYXIgKyBfYnJcbiAgICBxMSA9IF94XG4gIH1cbiAgd2hpbGUoZXB0ciA8IG5lKSB7XG4gICAgYSA9IGVpXG4gICAgYiA9IHEwXG4gICAgeCA9IGEgKyBiXG4gICAgYnYgPSB4IC0gYVxuICAgIHkgPSBiIC0gYnZcbiAgICBpZih5KSB7XG4gICAgICBnW2NvdW50KytdID0geVxuICAgIH1cbiAgICBfeCA9IHExICsgeFxuICAgIF9idiA9IF94IC0gcTFcbiAgICBfYXYgPSBfeCAtIF9idlxuICAgIF9iciA9IHggLSBfYnZcbiAgICBfYXIgPSBxMSAtIF9hdlxuICAgIHEwID0gX2FyICsgX2JyXG4gICAgcTEgPSBfeFxuICAgIGVwdHIgKz0gMVxuICAgIGlmKGVwdHIgPCBuZSkge1xuICAgICAgZWkgPSBlW2VwdHJdXG4gICAgfVxuICB9XG4gIHdoaWxlKGZwdHIgPCBuZikge1xuICAgIGEgPSBmaVxuICAgIGIgPSBxMFxuICAgIHggPSBhICsgYlxuICAgIGJ2ID0geCAtIGFcbiAgICB5ID0gYiAtIGJ2XG4gICAgaWYoeSkge1xuICAgICAgZ1tjb3VudCsrXSA9IHlcbiAgICB9IFxuICAgIF94ID0gcTEgKyB4XG4gICAgX2J2ID0gX3ggLSBxMVxuICAgIF9hdiA9IF94IC0gX2J2XG4gICAgX2JyID0geCAtIF9idlxuICAgIF9hciA9IHExIC0gX2F2XG4gICAgcTAgPSBfYXIgKyBfYnJcbiAgICBxMSA9IF94XG4gICAgZnB0ciArPSAxXG4gICAgaWYoZnB0ciA8IG5mKSB7XG4gICAgICBmaSA9IC1mW2ZwdHJdXG4gICAgfVxuICB9XG4gIGlmKHEwKSB7XG4gICAgZ1tjb3VudCsrXSA9IHEwXG4gIH1cbiAgaWYocTEpIHtcbiAgICBnW2NvdW50KytdID0gcTFcbiAgfVxuICBpZighY291bnQpIHtcbiAgICBnW2NvdW50KytdID0gMC4wICBcbiAgfVxuICBnLmxlbmd0aCA9IGNvdW50XG4gIHJldHVybiBnXG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBsaW5lYXJFeHBhbnNpb25TdW1cblxuLy9FYXN5IGNhc2U6IEFkZCB0d28gc2NhbGFyc1xuZnVuY3Rpb24gc2NhbGFyU2NhbGFyKGEsIGIpIHtcbiAgdmFyIHggPSBhICsgYlxuICB2YXIgYnYgPSB4IC0gYVxuICB2YXIgYXYgPSB4IC0gYnZcbiAgdmFyIGJyID0gYiAtIGJ2XG4gIHZhciBhciA9IGEgLSBhdlxuICB2YXIgeSA9IGFyICsgYnJcbiAgaWYoeSkge1xuICAgIHJldHVybiBbeSwgeF1cbiAgfVxuICByZXR1cm4gW3hdXG59XG5cbmZ1bmN0aW9uIGxpbmVhckV4cGFuc2lvblN1bShlLCBmKSB7XG4gIHZhciBuZSA9IGUubGVuZ3RofDBcbiAgdmFyIG5mID0gZi5sZW5ndGh8MFxuICBpZihuZSA9PT0gMSAmJiBuZiA9PT0gMSkge1xuICAgIHJldHVybiBzY2FsYXJTY2FsYXIoZVswXSwgZlswXSlcbiAgfVxuICB2YXIgbiA9IG5lICsgbmZcbiAgdmFyIGcgPSBuZXcgQXJyYXkobilcbiAgdmFyIGNvdW50ID0gMFxuICB2YXIgZXB0ciA9IDBcbiAgdmFyIGZwdHIgPSAwXG4gIHZhciBhYnMgPSBNYXRoLmFic1xuICB2YXIgZWkgPSBlW2VwdHJdXG4gIHZhciBlYSA9IGFicyhlaSlcbiAgdmFyIGZpID0gZltmcHRyXVxuICB2YXIgZmEgPSBhYnMoZmkpXG4gIHZhciBhLCBiXG4gIGlmKGVhIDwgZmEpIHtcbiAgICBiID0gZWlcbiAgICBlcHRyICs9IDFcbiAgICBpZihlcHRyIDwgbmUpIHtcbiAgICAgIGVpID0gZVtlcHRyXVxuICAgICAgZWEgPSBhYnMoZWkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGIgPSBmaVxuICAgIGZwdHIgKz0gMVxuICAgIGlmKGZwdHIgPCBuZikge1xuICAgICAgZmkgPSBmW2ZwdHJdXG4gICAgICBmYSA9IGFicyhmaSlcbiAgICB9XG4gIH1cbiAgaWYoKGVwdHIgPCBuZSAmJiBlYSA8IGZhKSB8fCAoZnB0ciA+PSBuZikpIHtcbiAgICBhID0gZWlcbiAgICBlcHRyICs9IDFcbiAgICBpZihlcHRyIDwgbmUpIHtcbiAgICAgIGVpID0gZVtlcHRyXVxuICAgICAgZWEgPSBhYnMoZWkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGEgPSBmaVxuICAgIGZwdHIgKz0gMVxuICAgIGlmKGZwdHIgPCBuZikge1xuICAgICAgZmkgPSBmW2ZwdHJdXG4gICAgICBmYSA9IGFicyhmaSlcbiAgICB9XG4gIH1cbiAgdmFyIHggPSBhICsgYlxuICB2YXIgYnYgPSB4IC0gYVxuICB2YXIgeSA9IGIgLSBidlxuICB2YXIgcTAgPSB5XG4gIHZhciBxMSA9IHhcbiAgdmFyIF94LCBfYnYsIF9hdiwgX2JyLCBfYXJcbiAgd2hpbGUoZXB0ciA8IG5lICYmIGZwdHIgPCBuZikge1xuICAgIGlmKGVhIDwgZmEpIHtcbiAgICAgIGEgPSBlaVxuICAgICAgZXB0ciArPSAxXG4gICAgICBpZihlcHRyIDwgbmUpIHtcbiAgICAgICAgZWkgPSBlW2VwdHJdXG4gICAgICAgIGVhID0gYWJzKGVpKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhID0gZmlcbiAgICAgIGZwdHIgKz0gMVxuICAgICAgaWYoZnB0ciA8IG5mKSB7XG4gICAgICAgIGZpID0gZltmcHRyXVxuICAgICAgICBmYSA9IGFicyhmaSlcbiAgICAgIH1cbiAgICB9XG4gICAgYiA9IHEwXG4gICAgeCA9IGEgKyBiXG4gICAgYnYgPSB4IC0gYVxuICAgIHkgPSBiIC0gYnZcbiAgICBpZih5KSB7XG4gICAgICBnW2NvdW50KytdID0geVxuICAgIH1cbiAgICBfeCA9IHExICsgeFxuICAgIF9idiA9IF94IC0gcTFcbiAgICBfYXYgPSBfeCAtIF9idlxuICAgIF9iciA9IHggLSBfYnZcbiAgICBfYXIgPSBxMSAtIF9hdlxuICAgIHEwID0gX2FyICsgX2JyXG4gICAgcTEgPSBfeFxuICB9XG4gIHdoaWxlKGVwdHIgPCBuZSkge1xuICAgIGEgPSBlaVxuICAgIGIgPSBxMFxuICAgIHggPSBhICsgYlxuICAgIGJ2ID0geCAtIGFcbiAgICB5ID0gYiAtIGJ2XG4gICAgaWYoeSkge1xuICAgICAgZ1tjb3VudCsrXSA9IHlcbiAgICB9XG4gICAgX3ggPSBxMSArIHhcbiAgICBfYnYgPSBfeCAtIHExXG4gICAgX2F2ID0gX3ggLSBfYnZcbiAgICBfYnIgPSB4IC0gX2J2XG4gICAgX2FyID0gcTEgLSBfYXZcbiAgICBxMCA9IF9hciArIF9iclxuICAgIHExID0gX3hcbiAgICBlcHRyICs9IDFcbiAgICBpZihlcHRyIDwgbmUpIHtcbiAgICAgIGVpID0gZVtlcHRyXVxuICAgIH1cbiAgfVxuICB3aGlsZShmcHRyIDwgbmYpIHtcbiAgICBhID0gZmlcbiAgICBiID0gcTBcbiAgICB4ID0gYSArIGJcbiAgICBidiA9IHggLSBhXG4gICAgeSA9IGIgLSBidlxuICAgIGlmKHkpIHtcbiAgICAgIGdbY291bnQrK10gPSB5XG4gICAgfSBcbiAgICBfeCA9IHExICsgeFxuICAgIF9idiA9IF94IC0gcTFcbiAgICBfYXYgPSBfeCAtIF9idlxuICAgIF9iciA9IHggLSBfYnZcbiAgICBfYXIgPSBxMSAtIF9hdlxuICAgIHEwID0gX2FyICsgX2JyXG4gICAgcTEgPSBfeFxuICAgIGZwdHIgKz0gMVxuICAgIGlmKGZwdHIgPCBuZikge1xuICAgICAgZmkgPSBmW2ZwdHJdXG4gICAgfVxuICB9XG4gIGlmKHEwKSB7XG4gICAgZ1tjb3VudCsrXSA9IHEwXG4gIH1cbiAgaWYocTEpIHtcbiAgICBnW2NvdW50KytdID0gcTFcbiAgfVxuICBpZighY291bnQpIHtcbiAgICBnW2NvdW50KytdID0gMC4wICBcbiAgfVxuICBnLmxlbmd0aCA9IGNvdW50XG4gIHJldHVybiBnXG59IiwiXCJ1c2Ugc3RyaWN0XCI7IFwidXNlIHJlc3RyaWN0XCI7XG5cbnZhciBiaXRzICAgICAgPSByZXF1aXJlKFwiYml0LXR3aWRkbGVcIilcbiAgLCBVbmlvbkZpbmQgPSByZXF1aXJlKFwidW5pb24tZmluZFwiKVxuXG4vL1JldHVybnMgdGhlIGRpbWVuc2lvbiBvZiBhIGNlbGwgY29tcGxleFxuZnVuY3Rpb24gZGltZW5zaW9uKGNlbGxzKSB7XG4gIHZhciBkID0gMFxuICAgICwgbWF4ID0gTWF0aC5tYXhcbiAgZm9yKHZhciBpPTAsIGlsPWNlbGxzLmxlbmd0aDsgaTxpbDsgKytpKSB7XG4gICAgZCA9IG1heChkLCBjZWxsc1tpXS5sZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGQtMVxufVxuZXhwb3J0cy5kaW1lbnNpb24gPSBkaW1lbnNpb25cblxuLy9Db3VudHMgdGhlIG51bWJlciBvZiB2ZXJ0aWNlcyBpbiBmYWNlc1xuZnVuY3Rpb24gY291bnRWZXJ0aWNlcyhjZWxscykge1xuICB2YXIgdmMgPSAtMVxuICAgICwgbWF4ID0gTWF0aC5tYXhcbiAgZm9yKHZhciBpPTAsIGlsPWNlbGxzLmxlbmd0aDsgaTxpbDsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIGZvcih2YXIgaj0wLCBqbD1jLmxlbmd0aDsgajxqbDsgKytqKSB7XG4gICAgICB2YyA9IG1heCh2YywgY1tqXSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZjKzFcbn1cbmV4cG9ydHMuY291bnRWZXJ0aWNlcyA9IGNvdW50VmVydGljZXNcblxuLy9SZXR1cm5zIGEgZGVlcCBjb3B5IG9mIGNlbGxzXG5mdW5jdGlvbiBjbG9uZUNlbGxzKGNlbGxzKSB7XG4gIHZhciBuY2VsbHMgPSBuZXcgQXJyYXkoY2VsbHMubGVuZ3RoKVxuICBmb3IodmFyIGk9MCwgaWw9Y2VsbHMubGVuZ3RoOyBpPGlsOyArK2kpIHtcbiAgICBuY2VsbHNbaV0gPSBjZWxsc1tpXS5zbGljZSgwKVxuICB9XG4gIHJldHVybiBuY2VsbHNcbn1cbmV4cG9ydHMuY2xvbmVDZWxscyA9IGNsb25lQ2VsbHNcblxuLy9SYW5rcyBhIHBhaXIgb2YgY2VsbHMgdXAgdG8gcGVybXV0YXRpb25cbmZ1bmN0aW9uIGNvbXBhcmVDZWxscyhhLCBiKSB7XG4gIHZhciBuID0gYS5sZW5ndGhcbiAgICAsIHQgPSBhLmxlbmd0aCAtIGIubGVuZ3RoXG4gICAgLCBtaW4gPSBNYXRoLm1pblxuICBpZih0KSB7XG4gICAgcmV0dXJuIHRcbiAgfVxuICBzd2l0Y2gobikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBhWzBdIC0gYlswXTtcbiAgICBjYXNlIDI6XG4gICAgICB2YXIgZCA9IGFbMF0rYVsxXS1iWzBdLWJbMV1cbiAgICAgIGlmKGQpIHtcbiAgICAgICAgcmV0dXJuIGRcbiAgICAgIH1cbiAgICAgIHJldHVybiBtaW4oYVswXSxhWzFdKSAtIG1pbihiWzBdLGJbMV0pXG4gICAgY2FzZSAzOlxuICAgICAgdmFyIGwxID0gYVswXSthWzFdXG4gICAgICAgICwgbTEgPSBiWzBdK2JbMV1cbiAgICAgIGQgPSBsMSthWzJdIC0gKG0xK2JbMl0pXG4gICAgICBpZihkKSB7XG4gICAgICAgIHJldHVybiBkXG4gICAgICB9XG4gICAgICB2YXIgbDAgPSBtaW4oYVswXSwgYVsxXSlcbiAgICAgICAgLCBtMCA9IG1pbihiWzBdLCBiWzFdKVxuICAgICAgICAsIGQgID0gbWluKGwwLCBhWzJdKSAtIG1pbihtMCwgYlsyXSlcbiAgICAgIGlmKGQpIHtcbiAgICAgICAgcmV0dXJuIGRcbiAgICAgIH1cbiAgICAgIHJldHVybiBtaW4obDArYVsyXSwgbDEpIC0gbWluKG0wK2JbMl0sIG0xKVxuICAgIFxuICAgIC8vVE9ETzogTWF5YmUgb3B0aW1pemUgbj00IGFzIHdlbGw/XG4gICAgXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBhcyA9IGEuc2xpY2UoMClcbiAgICAgIGFzLnNvcnQoKVxuICAgICAgdmFyIGJzID0gYi5zbGljZSgwKVxuICAgICAgYnMuc29ydCgpXG4gICAgICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICAgICAgdCA9IGFzW2ldIC0gYnNbaV1cbiAgICAgICAgaWYodCkge1xuICAgICAgICAgIHJldHVybiB0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAwXG4gIH1cbn1cbmV4cG9ydHMuY29tcGFyZUNlbGxzID0gY29tcGFyZUNlbGxzXG5cbmZ1bmN0aW9uIGNvbXBhcmVaaXBwZWQoYSwgYikge1xuICByZXR1cm4gY29tcGFyZUNlbGxzKGFbMF0sIGJbMF0pXG59XG5cbi8vUHV0cyBhIGNlbGwgY29tcGxleCBpbnRvIG5vcm1hbCBvcmRlciBmb3IgdGhlIHB1cnBvc2VzIG9mIGZpbmRDZWxsIHF1ZXJpZXNcbmZ1bmN0aW9uIG5vcm1hbGl6ZShjZWxscywgYXR0cikge1xuICBpZihhdHRyKSB7XG4gICAgdmFyIGxlbiA9IGNlbGxzLmxlbmd0aFxuICAgIHZhciB6aXBwZWQgPSBuZXcgQXJyYXkobGVuKVxuICAgIGZvcih2YXIgaT0wOyBpPGxlbjsgKytpKSB7XG4gICAgICB6aXBwZWRbaV0gPSBbY2VsbHNbaV0sIGF0dHJbaV1dXG4gICAgfVxuICAgIHppcHBlZC5zb3J0KGNvbXBhcmVaaXBwZWQpXG4gICAgZm9yKHZhciBpPTA7IGk8bGVuOyArK2kpIHtcbiAgICAgIGNlbGxzW2ldID0gemlwcGVkW2ldWzBdXG4gICAgICBhdHRyW2ldID0gemlwcGVkW2ldWzFdXG4gICAgfVxuICAgIHJldHVybiBjZWxsc1xuICB9IGVsc2Uge1xuICAgIGNlbGxzLnNvcnQoY29tcGFyZUNlbGxzKVxuICAgIHJldHVybiBjZWxsc1xuICB9XG59XG5leHBvcnRzLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZVxuXG4vL1JlbW92ZXMgYWxsIGR1cGxpY2F0ZSBjZWxscyBpbiB0aGUgY29tcGxleFxuZnVuY3Rpb24gdW5pcXVlKGNlbGxzKSB7XG4gIGlmKGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIHZhciBwdHIgPSAxXG4gICAgLCBsZW4gPSBjZWxscy5sZW5ndGhcbiAgZm9yKHZhciBpPTE7IGk8bGVuOyArK2kpIHtcbiAgICB2YXIgYSA9IGNlbGxzW2ldXG4gICAgaWYoY29tcGFyZUNlbGxzKGEsIGNlbGxzW2ktMV0pKSB7XG4gICAgICBpZihpID09PSBwdHIpIHtcbiAgICAgICAgcHRyKytcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNlbGxzW3B0cisrXSA9IGFcbiAgICB9XG4gIH1cbiAgY2VsbHMubGVuZ3RoID0gcHRyXG4gIHJldHVybiBjZWxsc1xufVxuZXhwb3J0cy51bmlxdWUgPSB1bmlxdWU7XG5cbi8vRmluZHMgYSBjZWxsIGluIGEgbm9ybWFsaXplZCBjZWxsIGNvbXBsZXhcbmZ1bmN0aW9uIGZpbmRDZWxsKGNlbGxzLCBjKSB7XG4gIHZhciBsbyA9IDBcbiAgICAsIGhpID0gY2VsbHMubGVuZ3RoLTFcbiAgICAsIHIgID0gLTFcbiAgd2hpbGUgKGxvIDw9IGhpKSB7XG4gICAgdmFyIG1pZCA9IChsbyArIGhpKSA+PiAxXG4gICAgICAsIHMgICA9IGNvbXBhcmVDZWxscyhjZWxsc1ttaWRdLCBjKVxuICAgIGlmKHMgPD0gMCkge1xuICAgICAgaWYocyA9PT0gMCkge1xuICAgICAgICByID0gbWlkXG4gICAgICB9XG4gICAgICBsbyA9IG1pZCArIDFcbiAgICB9IGVsc2UgaWYocyA+IDApIHtcbiAgICAgIGhpID0gbWlkIC0gMVxuICAgIH1cbiAgfVxuICByZXR1cm4gclxufVxuZXhwb3J0cy5maW5kQ2VsbCA9IGZpbmRDZWxsO1xuXG4vL0J1aWxkcyBhbiBpbmRleCBmb3IgYW4gbi1jZWxsLiAgVGhpcyBpcyBtb3JlIGdlbmVyYWwgdGhhbiBkdWFsLCBidXQgbGVzcyBlZmZpY2llbnRcbmZ1bmN0aW9uIGluY2lkZW5jZShmcm9tX2NlbGxzLCB0b19jZWxscykge1xuICB2YXIgaW5kZXggPSBuZXcgQXJyYXkoZnJvbV9jZWxscy5sZW5ndGgpXG4gIGZvcih2YXIgaT0wLCBpbD1pbmRleC5sZW5ndGg7IGk8aWw7ICsraSkge1xuICAgIGluZGV4W2ldID0gW11cbiAgfVxuICB2YXIgYiA9IFtdXG4gIGZvcih2YXIgaT0wLCBuPXRvX2NlbGxzLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICB2YXIgYyA9IHRvX2NlbGxzW2ldXG4gICAgdmFyIGNsID0gYy5sZW5ndGhcbiAgICBmb3IodmFyIGs9MSwga249KDE8PGNsKTsgazxrbjsgKytrKSB7XG4gICAgICBiLmxlbmd0aCA9IGJpdHMucG9wQ291bnQoaylcbiAgICAgIHZhciBsID0gMFxuICAgICAgZm9yKHZhciBqPTA7IGo8Y2w7ICsraikge1xuICAgICAgICBpZihrICYgKDE8PGopKSB7XG4gICAgICAgICAgYltsKytdID0gY1tqXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgaWR4PWZpbmRDZWxsKGZyb21fY2VsbHMsIGIpXG4gICAgICBpZihpZHggPCAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgIGluZGV4W2lkeCsrXS5wdXNoKGkpXG4gICAgICAgIGlmKGlkeCA+PSBmcm9tX2NlbGxzLmxlbmd0aCB8fCBjb21wYXJlQ2VsbHMoZnJvbV9jZWxsc1tpZHhdLCBiKSAhPT0gMCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4XG59XG5leHBvcnRzLmluY2lkZW5jZSA9IGluY2lkZW5jZVxuXG4vL0NvbXB1dGVzIHRoZSBkdWFsIG9mIHRoZSBtZXNoLiAgVGhpcyBpcyBiYXNpY2FsbHkgYW4gb3B0aW1pemVkIHZlcnNpb24gb2YgYnVpbGRJbmRleCBmb3IgdGhlIHNpdHVhdGlvbiB3aGVyZSBmcm9tX2NlbGxzIGlzIGp1c3QgdGhlIGxpc3Qgb2YgdmVydGljZXNcbmZ1bmN0aW9uIGR1YWwoY2VsbHMsIHZlcnRleF9jb3VudCkge1xuICBpZighdmVydGV4X2NvdW50KSB7XG4gICAgcmV0dXJuIGluY2lkZW5jZSh1bmlxdWUoc2tlbGV0b24oY2VsbHMsIDApKSwgY2VsbHMsIDApXG4gIH1cbiAgdmFyIHJlcyA9IG5ldyBBcnJheSh2ZXJ0ZXhfY291bnQpXG4gIGZvcih2YXIgaT0wOyBpPHZlcnRleF9jb3VudDsgKytpKSB7XG4gICAgcmVzW2ldID0gW11cbiAgfVxuICBmb3IodmFyIGk9MCwgbGVuPWNlbGxzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICBmb3IodmFyIGo9MCwgY2w9Yy5sZW5ndGg7IGo8Y2w7ICsraikge1xuICAgICAgcmVzW2Nbal1dLnB1c2goaSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuZXhwb3J0cy5kdWFsID0gZHVhbFxuXG4vL0VudW1lcmF0ZXMgYWxsIGNlbGxzIGluIHRoZSBjb21wbGV4XG5mdW5jdGlvbiBleHBsb2RlKGNlbGxzKSB7XG4gIHZhciByZXN1bHQgPSBbXVxuICBmb3IodmFyIGk9MCwgaWw9Y2VsbHMubGVuZ3RoOyBpPGlsOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgICAsIGNsID0gYy5sZW5ndGh8MFxuICAgIGZvcih2YXIgaj0xLCBqbD0oMTw8Y2wpOyBqPGpsOyArK2opIHtcbiAgICAgIHZhciBiID0gW11cbiAgICAgIGZvcih2YXIgaz0wOyBrPGNsOyArK2spIHtcbiAgICAgICAgaWYoKGogPj4+IGspICYgMSkge1xuICAgICAgICAgIGIucHVzaChjW2tdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChiKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplKHJlc3VsdClcbn1cbmV4cG9ydHMuZXhwbG9kZSA9IGV4cGxvZGVcblxuLy9FbnVtZXJhdGVzIGFsbCBvZiB0aGUgbi1jZWxscyBvZiBhIGNlbGwgY29tcGxleFxuZnVuY3Rpb24gc2tlbGV0b24oY2VsbHMsIG4pIHtcbiAgaWYobiA8IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICB2YXIgcmVzdWx0ID0gW11cbiAgICAsIGswICAgICA9ICgxPDwobisxKSktMVxuICBmb3IodmFyIGk9MDsgaTxjZWxscy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjID0gY2VsbHNbaV1cbiAgICBmb3IodmFyIGs9azA7IGs8KDE8PGMubGVuZ3RoKTsgaz1iaXRzLm5leHRDb21iaW5hdGlvbihrKSkge1xuICAgICAgdmFyIGIgPSBuZXcgQXJyYXkobisxKVxuICAgICAgICAsIGwgPSAwXG4gICAgICBmb3IodmFyIGo9MDsgajxjLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmKGsgJiAoMTw8aikpIHtcbiAgICAgICAgICBiW2wrK10gPSBjW2pdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKGIpXG4gICAgfVxuICB9XG4gIHJldHVybiBub3JtYWxpemUocmVzdWx0KVxufVxuZXhwb3J0cy5za2VsZXRvbiA9IHNrZWxldG9uO1xuXG4vL0NvbXB1dGVzIHRoZSBib3VuZGFyeSBvZiBhbGwgY2VsbHMsIGRvZXMgbm90IHJlbW92ZSBkdXBsaWNhdGVzXG5mdW5jdGlvbiBib3VuZGFyeShjZWxscykge1xuICB2YXIgcmVzID0gW11cbiAgZm9yKHZhciBpPTAsaWw9Y2VsbHMubGVuZ3RoOyBpPGlsOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgZm9yKHZhciBqPTAsY2w9Yy5sZW5ndGg7IGo8Y2w7ICsraikge1xuICAgICAgdmFyIGIgPSBuZXcgQXJyYXkoYy5sZW5ndGgtMSlcbiAgICAgIGZvcih2YXIgaz0wLCBsPTA7IGs8Y2w7ICsraykge1xuICAgICAgICBpZihrICE9PSBqKSB7XG4gICAgICAgICAgYltsKytdID0gY1trXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXMucHVzaChiKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbm9ybWFsaXplKHJlcylcbn1cbmV4cG9ydHMuYm91bmRhcnkgPSBib3VuZGFyeTtcblxuLy9Db21wdXRlcyBjb25uZWN0ZWQgY29tcG9uZW50cyBmb3IgYSBkZW5zZSBjZWxsIGNvbXBsZXhcbmZ1bmN0aW9uIGNvbm5lY3RlZENvbXBvbmVudHNfZGVuc2UoY2VsbHMsIHZlcnRleF9jb3VudCkge1xuICB2YXIgbGFiZWxzID0gbmV3IFVuaW9uRmluZCh2ZXJ0ZXhfY291bnQpXG4gIGZvcih2YXIgaT0wOyBpPGNlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGMgPSBjZWxsc1tpXVxuICAgIGZvcih2YXIgaj0wOyBqPGMubGVuZ3RoOyArK2opIHtcbiAgICAgIGZvcih2YXIgaz1qKzE7IGs8Yy5sZW5ndGg7ICsraykge1xuICAgICAgICBsYWJlbHMubGluayhjW2pdLCBjW2tdKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YXIgY29tcG9uZW50cyA9IFtdXG4gICAgLCBjb21wb25lbnRfbGFiZWxzID0gbGFiZWxzLnJhbmtzXG4gIGZvcih2YXIgaT0wOyBpPGNvbXBvbmVudF9sYWJlbHMubGVuZ3RoOyArK2kpIHtcbiAgICBjb21wb25lbnRfbGFiZWxzW2ldID0gLTFcbiAgfVxuICBmb3IodmFyIGk9MDsgaTxjZWxscy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBsID0gbGFiZWxzLmZpbmQoY2VsbHNbaV1bMF0pXG4gICAgaWYoY29tcG9uZW50X2xhYmVsc1tsXSA8IDApIHtcbiAgICAgIGNvbXBvbmVudF9sYWJlbHNbbF0gPSBjb21wb25lbnRzLmxlbmd0aFxuICAgICAgY29tcG9uZW50cy5wdXNoKFtjZWxsc1tpXS5zbGljZSgwKV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50X2xhYmVsc1tsXV0ucHVzaChjZWxsc1tpXS5zbGljZSgwKSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudHNcbn1cblxuLy9Db21wdXRlcyBjb25uZWN0ZWQgY29tcG9uZW50cyBmb3IgYSBzcGFyc2UgZ3JhcGhcbmZ1bmN0aW9uIGNvbm5lY3RlZENvbXBvbmVudHNfc3BhcnNlKGNlbGxzKSB7XG4gIHZhciB2ZXJ0aWNlcyAgPSB1bmlxdWUobm9ybWFsaXplKHNrZWxldG9uKGNlbGxzLCAwKSkpXG4gICAgLCBsYWJlbHMgICAgPSBuZXcgVW5pb25GaW5kKHZlcnRpY2VzLmxlbmd0aClcbiAgZm9yKHZhciBpPTA7IGk8Y2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYyA9IGNlbGxzW2ldXG4gICAgZm9yKHZhciBqPTA7IGo8Yy5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIHZqID0gZmluZENlbGwodmVydGljZXMsIFtjW2pdXSlcbiAgICAgIGZvcih2YXIgaz1qKzE7IGs8Yy5sZW5ndGg7ICsraykge1xuICAgICAgICBsYWJlbHMubGluayh2aiwgZmluZENlbGwodmVydGljZXMsIFtjW2tdXSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHZhciBjb21wb25lbnRzICAgICAgICA9IFtdXG4gICAgLCBjb21wb25lbnRfbGFiZWxzICA9IGxhYmVscy5yYW5rc1xuICBmb3IodmFyIGk9MDsgaTxjb21wb25lbnRfbGFiZWxzLmxlbmd0aDsgKytpKSB7XG4gICAgY29tcG9uZW50X2xhYmVsc1tpXSA9IC0xXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8Y2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgbCA9IGxhYmVscy5maW5kKGZpbmRDZWxsKHZlcnRpY2VzLCBbY2VsbHNbaV1bMF1dKSk7XG4gICAgaWYoY29tcG9uZW50X2xhYmVsc1tsXSA8IDApIHtcbiAgICAgIGNvbXBvbmVudF9sYWJlbHNbbF0gPSBjb21wb25lbnRzLmxlbmd0aFxuICAgICAgY29tcG9uZW50cy5wdXNoKFtjZWxsc1tpXS5zbGljZSgwKV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50X2xhYmVsc1tsXV0ucHVzaChjZWxsc1tpXS5zbGljZSgwKSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudHNcbn1cblxuLy9Db21wdXRlcyBjb25uZWN0ZWQgY29tcG9uZW50cyBmb3IgYSBjZWxsIGNvbXBsZXhcbmZ1bmN0aW9uIGNvbm5lY3RlZENvbXBvbmVudHMoY2VsbHMsIHZlcnRleF9jb3VudCkge1xuICBpZih2ZXJ0ZXhfY291bnQpIHtcbiAgICByZXR1cm4gY29ubmVjdGVkQ29tcG9uZW50c19kZW5zZShjZWxscywgdmVydGV4X2NvdW50KVxuICB9XG4gIHJldHVybiBjb25uZWN0ZWRDb21wb25lbnRzX3NwYXJzZShjZWxscylcbn1cbmV4cG9ydHMuY29ubmVjdGVkQ29tcG9uZW50cyA9IGNvbm5lY3RlZENvbXBvbmVudHNcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSB0d29Qcm9kdWN0XG5cbnZhciBTUExJVFRFUiA9ICsoTWF0aC5wb3coMiwgMjcpICsgMS4wKVxuXG5mdW5jdGlvbiB0d29Qcm9kdWN0KGEsIGIsIHJlc3VsdCkge1xuICB2YXIgeCA9IGEgKiBiXG5cbiAgdmFyIGMgPSBTUExJVFRFUiAqIGFcbiAgdmFyIGFiaWcgPSBjIC0gYVxuICB2YXIgYWhpID0gYyAtIGFiaWdcbiAgdmFyIGFsbyA9IGEgLSBhaGlcblxuICB2YXIgZCA9IFNQTElUVEVSICogYlxuICB2YXIgYmJpZyA9IGQgLSBiXG4gIHZhciBiaGkgPSBkIC0gYmJpZ1xuICB2YXIgYmxvID0gYiAtIGJoaVxuXG4gIHZhciBlcnIxID0geCAtIChhaGkgKiBiaGkpXG4gIHZhciBlcnIyID0gZXJyMSAtIChhbG8gKiBiaGkpXG4gIHZhciBlcnIzID0gZXJyMiAtIChhaGkgKiBibG8pXG5cbiAgdmFyIHkgPSBhbG8gKiBibG8gLSBlcnIzXG5cbiAgaWYocmVzdWx0KSB7XG4gICAgcmVzdWx0WzBdID0geVxuICAgIHJlc3VsdFsxXSA9IHhcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICByZXR1cm4gWyB5LCB4IF1cbn0iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZhc3RUd29TdW1cblxuZnVuY3Rpb24gZmFzdFR3b1N1bShhLCBiLCByZXN1bHQpIHtcblx0dmFyIHggPSBhICsgYlxuXHR2YXIgYnYgPSB4IC0gYVxuXHR2YXIgYXYgPSB4IC0gYnZcblx0dmFyIGJyID0gYiAtIGJ2XG5cdHZhciBhciA9IGEgLSBhdlxuXHRpZihyZXN1bHQpIHtcblx0XHRyZXN1bHRbMF0gPSBhciArIGJyXG5cdFx0cmVzdWx0WzFdID0geFxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXHRyZXR1cm4gW2FyK2JyLCB4XVxufSIsIlwidXNlIHN0cmljdFwiOyBcInVzZSByZXN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVuaW9uRmluZDtcblxuZnVuY3Rpb24gVW5pb25GaW5kKGNvdW50KSB7XG4gIHRoaXMucm9vdHMgPSBuZXcgQXJyYXkoY291bnQpO1xuICB0aGlzLnJhbmtzID0gbmV3IEFycmF5KGNvdW50KTtcbiAgXG4gIGZvcih2YXIgaT0wOyBpPGNvdW50OyArK2kpIHtcbiAgICB0aGlzLnJvb3RzW2ldID0gaTtcbiAgICB0aGlzLnJhbmtzW2ldID0gMDtcbiAgfVxufVxuXG52YXIgcHJvdG8gPSBVbmlvbkZpbmQucHJvdG90eXBlXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgXCJsZW5ndGhcIiwge1xuICBcImdldFwiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yb290cy5sZW5ndGhcbiAgfVxufSlcblxucHJvdG8ubWFrZVNldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbiA9IHRoaXMucm9vdHMubGVuZ3RoO1xuICB0aGlzLnJvb3RzLnB1c2gobik7XG4gIHRoaXMucmFua3MucHVzaCgwKTtcbiAgcmV0dXJuIG47XG59XG5cbnByb3RvLmZpbmQgPSBmdW5jdGlvbih4KSB7XG4gIHZhciB4MCA9IHhcbiAgdmFyIHJvb3RzID0gdGhpcy5yb290cztcbiAgd2hpbGUocm9vdHNbeF0gIT09IHgpIHtcbiAgICB4ID0gcm9vdHNbeF1cbiAgfVxuICB3aGlsZShyb290c1t4MF0gIT09IHgpIHtcbiAgICB2YXIgeSA9IHJvb3RzW3gwXVxuICAgIHJvb3RzW3gwXSA9IHhcbiAgICB4MCA9IHlcbiAgfVxuICByZXR1cm4geDtcbn1cblxucHJvdG8ubGluayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgdmFyIHhyID0gdGhpcy5maW5kKHgpXG4gICAgLCB5ciA9IHRoaXMuZmluZCh5KTtcbiAgaWYoeHIgPT09IHlyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByYW5rcyA9IHRoaXMucmFua3NcbiAgICAsIHJvb3RzID0gdGhpcy5yb290c1xuICAgICwgeGQgICAgPSByYW5rc1t4cl1cbiAgICAsIHlkICAgID0gcmFua3NbeXJdO1xuICBpZih4ZCA8IHlkKSB7XG4gICAgcm9vdHNbeHJdID0geXI7XG4gIH0gZWxzZSBpZih5ZCA8IHhkKSB7XG4gICAgcm9vdHNbeXJdID0geHI7XG4gIH0gZWxzZSB7XG4gICAgcm9vdHNbeXJdID0geHI7XG4gICAgKytyYW5rc1t4cl07XG4gIH1cbn0iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQgeyByYW5kb21VVUlEIH07XG4iLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLThdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMHxmZmZmZmZmZi1mZmZmLWZmZmYtZmZmZi1mZmZmZmZmZmZmZmYpJC9pO1xuIiwibGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJyB8fCAhY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGdldFJhbmRvbVZhbHVlcyA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn1cbiIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAgIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArXG4gICAgICAgIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICtcbiAgICAgICAgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gK1xuICAgICAgICAnLScgK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArXG4gICAgICAgIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICtcbiAgICAgICAgJy0nICtcbiAgICAgICAgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArXG4gICAgICAgICctJyArXG4gICAgICAgIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICtcbiAgICAgICAgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gK1xuICAgICAgICAnLScgK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gK1xuICAgICAgICBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gICAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7XG4gICAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdXVpZDtcbn1cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTtcbiIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gPz8gb3B0aW9ucy5ybmc/LigpID8/IHJuZygpO1xuICAgIGlmIChybmRzLmxlbmd0aCA8IDE2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZG9tIGJ5dGVzIGxlbmd0aCBtdXN0IGJlID49IDE2Jyk7XG4gICAgfVxuICAgIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG4gICAgaWYgKGJ1Zikge1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcbiAgICAgICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ICsgMTYgPiBidWYubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgVVVJRCBieXRlIHJhbmdlICR7b2Zmc2V0fToke29mZnNldCArIDE1fSBpcyBvdXQgb2YgYnVmZmVyIGJvdW5kc2ApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuZXhwb3J0IGRlZmF1bHQgdjQ7XG4iLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7XG4iLCJpbXBvcnQgeyBoZWFkZXJFdmVudHMgfSBmcm9tIFwiQHdpZGdldHMvQXBwSGVhZGVyL21vZGVsL2V2ZW50c1wiO1xuaW1wb3J0IHsgR3JpZCB9IGZyb20gXCJAZW50aXRpZXMvZ3JpZC9tb2RlbC9HcmlkXCI7XG5pbXBvcnQge1xuICBjcmVhdGVSYW5kb21TdmdQb2x5Z29uRGF0YSxcbiAgY3JlYXRlU3ZnUG9seWdvbkRhdGEsXG59IGZyb20gXCJAZmVhdHVyZXMvcG9seWdvbi9jcmVhdGVcIjtcbmltcG9ydCB7IG9uUG9seWdvbkRyb3BwZWQgfSBmcm9tIFwiQGZlYXR1cmVzL2NhbnZhcy9kcm9wUG9seWdvblwiO1xuaW1wb3J0IHsgdXNlQnVmZmVyUG9seWdvbnMgfSBmcm9tIFwiLi9saWIvaG9va3MvdXNlQnVmZmVyUG9seWdvbnNcIjtcbmltcG9ydCB7IGNhbnZhc0RvbUV2ZW50cyB9IGZyb20gXCJAZW50aXRpZXMvY2FudmFzL21vZGVsL2RvbUV2ZW50c1wiO1xuaW1wb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoRXZlbnQgfSBmcm9tIFwiQHNoYXJlZC9saWIvZXZlbnRCdXNcIjtcbmltcG9ydCB7IGNhbnZhc0V2ZW50cyB9IGZyb20gXCJAc2hhcmVkL21vZGVsL2NhbnZhc0V2ZW50c1wiO1xuaW1wb3J0IHsgYnVmZmVyQ29udGFpbmVyRXZlbnRzIH0gZnJvbSBcIkB3aWRnZXRzL0J1ZmZlckNvbnRhaW5lci9tb2RlbC9ldmVudHNcIjtcbmltcG9ydCB7XG4gIGdldFNjZW5lRWxlbWVudEJ5SWQsXG4gIHJlbW92ZVNjZW5lRWxlbWVudCxcbiAgZ2V0U2NlbmVFbGVtZW50cyxcbiAgYWRkU2NlbmVFbGVtZW50LFxuICBjbGVhclNjZW5lLFxufSBmcm9tIFwiQGVudGl0aWVzL3NjZW5lL2xpYi9zY2VuZVwiO1xuaW1wb3J0IHsgdXNlQXBwU3RvcmFnZSB9IGZyb20gXCIuL2xpYi9ob29rcy91c2VBcHBTdG9yYWdlXCI7XG5pbXBvcnQgeyBsb2FkU2NlbmVDb21wb25lbnRzIH0gZnJvbSBcIi4vbGliL3NjZW5lTG9hZGVyXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUeXBlcyB9IGZyb20gXCJAc2hhcmVkL21vZGVsL2NvbXBvbmVudFR5cGVzXCI7XG5cbmNvbnN0IHtcbiAgZ2V0QnVmZmVyUG9seWdvbnMsXG4gIHNldEJ1ZmZlclBvbHlnb25zLFxuICBhZGRQb2x5Z29uVG9CdWZmZXIsXG4gIHJlbW92ZVBvbHlnb25Gcm9tQnVmZmVyLFxufSA9IHVzZUJ1ZmZlclBvbHlnb25zKCk7XG5cbmNvbnN0IHsgbG9hZEFwcERhdGEsIHNhdmVBcHBEYXRhLCBjbGVhckFwcERhdGEgfSA9IHVzZUFwcFN0b3JhZ2UoKTtcblxuZXhwb3J0IGNsYXNzIEFwcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYnVmZmVyQ29udGFpbmVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmJ1ZmZlckNvbnRhaW5lciA9IHRoaXMucXVlcnlTZWxlY3RvcihcImJ1ZmZlci1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCBncmlkID0gbmV3IEdyaWQoe1xuICAgICAgb2Zmc2V0OiA1MCxcbiAgICB9KTtcblxuICAgIGFkZFNjZW5lRWxlbWVudChncmlkKTtcbiAgICBjb25zdCB7IGJ1ZmZlclBvbHlnb25zLCBzY2VuZVBvbHlnb25zIH0gPSBsb2FkQXBwRGF0YSgpO1xuXG4gICAgaWYgKGJ1ZmZlclBvbHlnb25zKSB7XG4gICAgICBzZXRCdWZmZXJQb2x5Z29ucyhidWZmZXJQb2x5Z29ucyk7XG4gICAgICB0aGlzLnVwZGF0ZUJ1ZmZlcigpO1xuICAgIH1cblxuICAgIGlmIChzY2VuZVBvbHlnb25zKSB7XG4gICAgICBsb2FkU2NlbmVDb21wb25lbnRzKHNjZW5lUG9seWdvbnMpO1xuICAgIH1cbiAgfVxuXG4gIG9uUG9seWdvbkRyb3BwZWRPbkNhbnZhcyh7IGRldGFpbCB9KSB7XG4gICAgb25Qb2x5Z29uRHJvcHBlZChkZXRhaWwsIGdldEJ1ZmZlclBvbHlnb25zKCkpO1xuICAgIHJlbW92ZVBvbHlnb25Gcm9tQnVmZmVyKGRldGFpbC5lbGVtZW50SWQpO1xuICAgIHRoaXMudXBkYXRlQnVmZmVyKCk7XG4gIH1cblxuICBvblBvbHlnb25PdXRPZkNhbnZhcyh7IGlkIH0pIHtcbiAgICB0aGlzLnN0eWxlLmN1cnNvciA9IFwiZ3JhYlwiO1xuICAgIHRoaXMuYnVmZmVyQ29udGFpbmVyLnNldElzRXhwZWN0aW5nRWxlbWVudChpZCk7XG4gIH1cblxuICBvblBvbHlnb25Ecm9wcGVkVG9CdWZmZXJDb250YWluZXIoKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGdldFNjZW5lRWxlbWVudEJ5SWQodGhpcy5idWZmZXJDb250YWluZXIuZXhwZWN0ZWRFbGVtZW50SWQpO1xuXG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiY2FuJ3QgZmluZCBkcm9wcGVkIGVsZW1lbnQgZnJvbSBjYW52YXMgdG8gYnVmZmVyXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFkZFBvbHlnb25Ub0J1ZmZlcihjcmVhdGVTdmdQb2x5Z29uRGF0YShlbGVtZW50KSk7XG5cbiAgICB0aGlzLnVwZGF0ZUJ1ZmZlcigpO1xuICAgIHJlbW92ZVNjZW5lRWxlbWVudCh0aGlzLmJ1ZmZlckNvbnRhaW5lci5leHBlY3RlZEVsZW1lbnRJZCk7XG4gICAgcHVibGlzaEV2ZW50KGNhbnZhc0V2ZW50cy5SRU5ERVJfU0NFTkUpO1xuICB9XG5cbiAgb25Nb3VzZVVwKCkge1xuICAgIGlmICghdGhpcy5idWZmZXJDb250YWluZXIuaXNFeHBlY3RpbmdFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5idWZmZXJDb250YWluZXIuY2FuY2VsRXhwZWN0aW5nRWxlbWVudCgpO1xuICAgIHRoaXMuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XG4gIH1cblxuICB1cGRhdGVCdWZmZXIoKSB7XG4gICAgdGhpcy5idWZmZXJDb250YWluZXIuc2V0QXR0cmlidXRlKFxuICAgICAgXCJwb2x5Z29uc1wiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoZ2V0QnVmZmVyUG9seWdvbnMoKSksXG4gICAgKTtcbiAgfVxuXG4gIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGhlYWRlckV2ZW50cy5DUkVBVEVfQ0xJQ0ssIChlKSA9PiB7XG4gICAgICBzZXRCdWZmZXJQb2x5Z29ucyhjcmVhdGVSYW5kb21TdmdQb2x5Z29uRGF0YSgpKTtcbiAgICAgIHRoaXMudXBkYXRlQnVmZmVyKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoaGVhZGVyRXZlbnRzLlNBVkVfQ0xJQ0ssICgpID0+XG4gICAgICBzYXZlQXBwRGF0YShcbiAgICAgICAgZ2V0QnVmZmVyUG9seWdvbnMoKSxcbiAgICAgICAgZ2V0U2NlbmVFbGVtZW50cygpLmZpbHRlcigoZWwpID0+IGVsLmdldFR5cGUoKSAhPT0gY29tcG9uZW50VHlwZXMuR1JJRCksXG4gICAgICApLFxuICAgICk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoaGVhZGVyRXZlbnRzLkNMRUFSX0NMSUNLLCAoKSA9PiB7XG4gICAgICBzZXRCdWZmZXJQb2x5Z29ucyhbXSk7XG4gICAgICBjbGVhclNjZW5lKCk7XG4gICAgICBjbGVhckFwcERhdGEoKTtcbiAgICAgIHRoaXMudXBkYXRlQnVmZmVyKCk7XG4gICAgICBwdWJsaXNoRXZlbnQoY2FudmFzRXZlbnRzLlJFTkRFUl9TQ0VORSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBjYW52YXNEb21FdmVudHMuRFJPUF9FTEVNRU5ULFxuICAgICAgdGhpcy5vblBvbHlnb25Ecm9wcGVkT25DYW52YXMuYmluZCh0aGlzKSxcbiAgICApO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgYnVmZmVyQ29udGFpbmVyRXZlbnRzLkVMRU1FTlRfRFJPUFBFRCxcbiAgICAgIHRoaXMub25Qb2x5Z29uRHJvcHBlZFRvQnVmZmVyQ29udGFpbmVyLmJpbmQodGhpcyksXG4gICAgKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKSk7XG5cbiAgICBzdWJzY3JpYmUoXG4gICAgICBjYW52YXNFdmVudHMuTU9WRURfRUxFTUVOVF9PVVRTSURFLFxuICAgICAgdGhpcy5vblBvbHlnb25PdXRPZkNhbnZhcy5iaW5kKHRoaXMpLFxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxhcHAtaGVhZGVyPjwvYXBwLWhlYWRlcj5cbiAgICAgIDxkZWZhdWx0LW1haW4tbGF5b3V0PlxuICAgICAgICAgIDxidWZmZXItY29udGFpbmVyPjwvYnVmZmVyLWNvbnRhaW5lcj4gICAgXG4gICAgICAgICAgPGRyb3BwYWJsZS1jYW52YXM+PC9kcm9wcGFibGUtY2FudmFzPiAgICBcbiAgICAgIDwvZGVmYXVsdC1tYWluLWxheW91dD5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1jb21wb25lbnRcIiwgQXBwKTtcbiIsImNvbnN0IGFwcFN0b3JhZ2VLZXkgPSB7XG4gIGJ1ZmZlckNvbnRhaW5lckRhdGE6IFwiYnVmZmVyQ29udGFpbmVyRGF0YVwiLFxuICBjYW52YXNEYXRhOiBcImNhbnZhc0RhdGFcIixcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBcHBTdG9yYWdlID0gKCkgPT4ge1xuICBjb25zdCBsb2FkQXBwRGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBwYXJzZUxvYWRlZERhdGEgPSAoZGF0YSkgPT4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBjb25zdCBsb2FkID0gKGtleSkgPT4gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG5cbiAgICBjb25zdCB7IGJ1ZmZlckNvbnRhaW5lckRhdGEsIGNhbnZhc0RhdGEgfSA9IGFwcFN0b3JhZ2VLZXk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnVmZmVyUG9seWdvbnM6IHBhcnNlTG9hZGVkRGF0YShsb2FkKGJ1ZmZlckNvbnRhaW5lckRhdGEpKSxcbiAgICAgIHNjZW5lUG9seWdvbnM6IHBhcnNlTG9hZGVkRGF0YShsb2FkKGNhbnZhc0RhdGEpKSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHNhdmVBcHBEYXRhID0gKGJ1ZmZlclBvbHlnb25zLCBzY2VuZVBvbHlnb25zKSA9PiB7XG4gICAgY29uc3Qgc2F2ZSA9IChrZXksIGRhdGEpID0+XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgICBjb25zdCB7IGJ1ZmZlckNvbnRhaW5lckRhdGEsIGNhbnZhc0RhdGEgfSA9IGFwcFN0b3JhZ2VLZXk7XG5cbiAgICBzYXZlKGJ1ZmZlckNvbnRhaW5lckRhdGEsIGJ1ZmZlclBvbHlnb25zKTtcbiAgICBzYXZlKGNhbnZhc0RhdGEsIHNjZW5lUG9seWdvbnMpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyQXBwRGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBjbGVhciA9IChrZXkpID0+IHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuXG4gICAgY29uc3QgeyBidWZmZXJDb250YWluZXJEYXRhLCBjYW52YXNEYXRhIH0gPSBhcHBTdG9yYWdlS2V5O1xuXG4gICAgY2xlYXIoYnVmZmVyQ29udGFpbmVyRGF0YSk7XG4gICAgY2xlYXIoY2FudmFzRGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBsb2FkQXBwRGF0YSxcbiAgICBzYXZlQXBwRGF0YSxcbiAgICBjbGVhckFwcERhdGEsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHVzZUJ1ZmZlclBvbHlnb25zID0gKCkgPT4ge1xuICBjb25zdCBidWZmZXIgPSB7XG4gICAgcG9seWdvbnM6IFtdLFxuICB9O1xuXG4gIGNvbnN0IHNldEJ1ZmZlclBvbHlnb25zID0gKG5ld1BvbHlnb25zKSA9PiAoYnVmZmVyLnBvbHlnb25zID0gbmV3UG9seWdvbnMpO1xuXG4gIGNvbnN0IGdldEJ1ZmZlclBvbHlnb25zID0gKCkgPT4gWy4uLmJ1ZmZlci5wb2x5Z29uc107XG5cbiAgY29uc3QgYWRkUG9seWdvblRvQnVmZmVyID0gKHBvbHlnb24pID0+IGJ1ZmZlci5wb2x5Z29ucy5wdXNoKHBvbHlnb24pO1xuXG4gIGNvbnN0IHJlbW92ZVBvbHlnb25Gcm9tQnVmZmVyID0gKHBvbHlnb25JZCkgPT4ge1xuICAgIGJ1ZmZlci5wb2x5Z29ucyA9IGJ1ZmZlci5wb2x5Z29ucy5maWx0ZXIoKHsgaWQgfSkgPT4gaWQgIT09IHBvbHlnb25JZCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCdWZmZXJQb2x5Z29ucyxcbiAgICBzZXRCdWZmZXJQb2x5Z29ucyxcbiAgICBhZGRQb2x5Z29uVG9CdWZmZXIsXG4gICAgcmVtb3ZlUG9seWdvbkZyb21CdWZmZXIsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgYWRkU2NlbmVFbGVtZW50IH0gZnJvbSBcIkBlbnRpdGllcy9zY2VuZS9saWIvc2NlbmVcIjtcbmltcG9ydCB7IFBvbHlnb24gfSBmcm9tIFwiQGVudGl0aWVzL3BvbHlnb24vbW9kZWwvUG9seWdvblwiO1xuXG5jb25zdCBjb21wb25lbnRWYXJpYW50cyA9IHtcbiAgUE9MWUdPTjogUG9seWdvbixcbn07XG5cbmV4cG9ydCBjb25zdCBsb2FkU2NlbmVDb21wb25lbnRzID0gKGNvbXBvbmVudHMpID0+IHtcbiAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnREYXRhKSA9PiB7XG4gICAgY29uc3QgY29tcG9uZW50QnVpbGRGdW5jdGlvbiA9IGNvbXBvbmVudFZhcmlhbnRzW2NvbXBvbmVudERhdGEudHlwZV07XG5cbiAgICBpZiAoIWNvbXBvbmVudEJ1aWxkRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29tcG9uZW50QnVpbGRGdW5jdGlvbihjb21wb25lbnREYXRhKTtcblxuICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWRkU2NlbmVFbGVtZW50KGNvbXBvbmVudCk7XG4gIH0pO1xufTtcbiIsImltcG9ydCBcIi4vdWlcIjtcbiIsImNvbnN0IGNvbnRlbnRDb250YWluZXIgPSB7XG4gIHZlcnRpY2FsUGFkZGluZzogNjQsXG4gIGhvcml6b250YWxQYWRkaW5nOiA4MCxcbiAgZ2FwOiAxNixcbn07XG5cbmNvbnN0IGhlYWRlckhlaWdodCA9IDc0O1xuY29uc3QgYnVmZmVyQ29udGFpbmVySGVpZ2h0ID0gMTUwO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FudmFzU2l6ZSA9ICgpID0+ICh7XG4gIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAtIGNvbnRlbnRDb250YWluZXIuaG9yaXpvbnRhbFBhZGRpbmcsXG4gIGhlaWdodDpcbiAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLVxuICAgIGNvbnRlbnRDb250YWluZXIudmVydGljYWxQYWRkaW5nIC1cbiAgICBjb250ZW50Q29udGFpbmVyLmdhcCAtXG4gICAgaGVhZGVySGVpZ2h0IC1cbiAgICBidWZmZXJDb250YWluZXJIZWlnaHQsXG59KTtcbiIsImV4cG9ydCBjb25zdCBtYXBTY3JlZW5Db29yZGluYXRlc1RvQ2FudmFzID0gKFxuICBjYW52YXMsXG4gIHsgY2xpZW50WCwgY2xpZW50WSB9LFxuICB7IHgsIHksIHNjYWxlIH0sXG4pID0+IHtcbiAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICByZXR1cm4ge1xuICAgIGNhbnZhc1g6IChjbGllbnRYIC0gcmVjdC5sZWZ0IC0geCkgLyBzY2FsZSxcbiAgICBjYW52YXNZOiAoY2xpZW50WSAtIHJlY3QudG9wIC0geSkgLyBzY2FsZSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY2FudmFzRG9tRXZlbnRzID0ge1xuICBEUk9QX0VMRU1FTlQ6IFwiRFJPUF9FTEVNRU5UXCIsXG59O1xuXG5jb25zdCBjcmVhdGVEZWZhdWx0Q2FudmFzRXZlbnQgPSAoZXZlbnQsIGRldGFpbCkgPT5cbiAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XG4gICAgY29tcG9zZWQ6IHRydWUsXG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBkZXRhaWwsXG4gIH0pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRHJvcEVsZW1lbnRFdmVudCA9IChkZXRhaWwpID0+XG4gIGNyZWF0ZURlZmF1bHRDYW52YXNFdmVudChjYW52YXNEb21FdmVudHMuRFJPUF9FTEVNRU5ULCBkZXRhaWwpO1xuIiwiaW1wb3J0IHsgZ2V0Q2FudmFzU2l6ZSB9IGZyb20gXCIuLi9saWIvY2FudmFzU2l6ZVwiO1xuXG5leHBvcnQgY2xhc3MgQmFzZUNhbnZhcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgdGhpcy5jdHggPSBudWxsO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XG4gICAgdGhpcy5zZXRTY2FsZSgpO1xuICB9XG5cbiAgc2V0U2NhbGUoKSB7XG4gICAgY29uc3QgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IHJlY3Qud2lkdGggKiByYXRpbztcbiAgICBjb25zdCBoZWlnaHQgPSByZWN0LmhlaWdodCAqIHJhdGlvO1xuXG4gICAgdGhpcy5jdHguc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZ2V0Q2FudmFzU2l6ZSgpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgY2FudmFzIHtcbiAgICAgICAgICAgICAgICBmbGV4OiAxXG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDxjYW52YXMgd2lkdGg9XCIke3dpZHRofVwiIGhlaWdodD1cIiR7aGVpZ2h0fVwiIGRyYWdnYWJsZT1cImZhbHNlXCI+PC9jYW52YXM+YDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUNhbnZhcyB9IGZyb20gXCIuL0Jhc2VDYW52YXNcIjtcbmltcG9ydCB7IGdldFNjZW5lRWxlbWVudHMgfSBmcm9tIFwiQGVudGl0aWVzL3NjZW5lL2xpYi9zY2VuZVwiO1xuaW1wb3J0IHsgcHVibGlzaEV2ZW50IH0gZnJvbSBcIkBzaGFyZWQvbGliL2V2ZW50QnVzXCI7XG5pbXBvcnQgeyBjYW52YXNFdmVudHMgfSBmcm9tIFwiQHNoYXJlZC9tb2RlbC9jYW52YXNFdmVudHNcIjtcbmltcG9ydCB7IHN1YnNjcmliZSB9IGZyb20gXCJAc2hhcmVkL2xpYi9ldmVudEJ1c1wiO1xuaW1wb3J0IHsgbWFwU2NyZWVuQ29vcmRpbmF0ZXNUb0NhbnZhcyB9IGZyb20gXCIuLi9saWIvbWFwcGVycy9jb29yZGluYXRlc1wiO1xuaW1wb3J0IHsgc2NlbmVFdmVudHMgfSBmcm9tIFwiQGVudGl0aWVzL3NjZW5lL21vZGVsL2V2ZW50c1wiO1xuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlZENhbnZhcyBleHRlbmRzIEJhc2VDYW52YXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmlld3BvcnRUcmFuc2Zvcm0gPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIHNjYWxlOiAxLFxuICAgIH07XG4gICAgdGhpcy5wcmV2TW91c2VQb3NpdGlvbiA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgIH07XG4gICAgdGhpcy5jb250cm9scyA9IHtcbiAgICAgIHBhbm5pbmc6IHRydWUsXG4gICAgICBlbGVtZW50TW92ZW1lbnQ6IGZhbHNlLFxuICAgIH07XG4gICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5tb3ZpbmdFbGVtZW50SWQgPSBudWxsO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnJlbmRlclNjZW5lKCk7XG4gIH1cblxuICBpbml0TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy5vbk1vdXNlT3V0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKHRoaXMpKTtcbiAgICBzdWJzY3JpYmUoY2FudmFzRXZlbnRzLlJFTkRFUl9TQ0VORSwgdGhpcy5yZW5kZXJTY2VuZS5iaW5kKHRoaXMpKTtcbiAgICBzdWJzY3JpYmUoXG4gICAgICBzY2VuZUV2ZW50cy5TRUxFQ1RFRF9FTEVNRU5ULFxuICAgICAgdGhpcy5vblNjZW5lRWxlbWVudFNlbGVjdGVkLmJpbmQodGhpcyksXG4gICAgKTtcbiAgfVxuXG4gIG9uTW91c2VEb3duKHsgY2xpZW50WCwgY2xpZW50WSB9KSB7XG4gICAgdGhpcy5wcmV2TW91c2VQb3NpdGlvbi55ID0gY2xpZW50WTtcbiAgICB0aGlzLnByZXZNb3VzZVBvc2l0aW9uLnggPSBjbGllbnRYO1xuXG4gICAgY29uc3QgeyBjYW52YXNYLCBjYW52YXNZIH0gPSBtYXBTY3JlZW5Db29yZGluYXRlc1RvQ2FudmFzKFxuICAgICAgdGhpcy5jYW52YXMsXG4gICAgICB7IGNsaWVudFgsIGNsaWVudFkgfSxcbiAgICAgIHRoaXMudmlld3BvcnRUcmFuc2Zvcm0sXG4gICAgKTtcblxuICAgIHB1Ymxpc2hFdmVudChjYW52YXNFdmVudHMuTU9VU0VfRE9XTiwgeyB4OiBjYW52YXNYLCB5OiBjYW52YXNZIH0pO1xuXG4gICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIsIGZhbHNlKTtcbiAgfVxuXG4gIG9uTW91c2VNb3ZlKHsgY2xpZW50WCwgY2xpZW50WSB9KSB7XG4gICAgaWYgKHRoaXMuY29udHJvbHMucGFubmluZykge1xuICAgICAgdGhpcy52aWV3cG9ydFRyYW5zZm9ybS54ICs9IGNsaWVudFggLSB0aGlzLnByZXZNb3VzZVBvc2l0aW9uLng7XG4gICAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtLnkgKz0gY2xpZW50WSAtIHRoaXMucHJldk1vdXNlUG9zaXRpb24ueTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb3ZpbmdFbGVtZW50SWQgJiYgdGhpcy5jb250cm9scy5lbGVtZW50TW92ZW1lbnQpIHtcbiAgICAgIHB1Ymxpc2hFdmVudChjYW52YXNFdmVudHMuTU9WRV9FTEVNRU5ULCB7XG4gICAgICAgIGlkOiB0aGlzLm1vdmluZ0VsZW1lbnRJZCxcbiAgICAgICAgZHg6IGNsaWVudFggLSB0aGlzLnByZXZNb3VzZVBvc2l0aW9uLngsXG4gICAgICAgIGR5OiBjbGllbnRZIC0gdGhpcy5wcmV2TW91c2VQb3NpdGlvbi55LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2TW91c2VQb3NpdGlvbi54ID0gY2xpZW50WDtcbiAgICB0aGlzLnByZXZNb3VzZVBvc2l0aW9uLnkgPSBjbGllbnRZO1xuXG4gICAgdGhpcy5yZW5kZXJTY2VuZSgpO1xuICB9XG5cbiAgb25Nb3VzZVVwKCkge1xuICAgIHRoaXMuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciwgZmFsc2UpO1xuICAgIHRoaXMucmVzZXRDb250cm9scygpO1xuICB9XG5cbiAgb25Nb3VzZU91dCgpIHtcbiAgICBpZiAodGhpcy5tb3ZpbmdFbGVtZW50SWQpIHtcbiAgICAgIHB1Ymxpc2hFdmVudChjYW52YXNFdmVudHMuTU9WRURfRUxFTUVOVF9PVVRTSURFLCB7XG4gICAgICAgIGlkOiB0aGlzLm1vdmluZ0VsZW1lbnRJZCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMub25Nb3VzZVVwKCk7XG4gIH1cblxuICBvbk1vdXNlV2hlZWwoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHsgY2xpZW50WCwgY2xpZW50WSwgZGVsdGFZIH0gPSBldmVudDtcbiAgICBjb25zdCB7IHg6IG9sZFgsIHk6IG9sZFksIHNjYWxlOiBvbGRTY2FsZSB9ID0gdGhpcy52aWV3cG9ydFRyYW5zZm9ybTtcblxuICAgIGNvbnN0IGludmVydGVkRGVsdGEgPSBkZWx0YVkgKiAtMC4wMTtcbiAgICBjb25zdCBuZXdTY2FsZSA9IG9sZFNjYWxlICsgaW52ZXJ0ZWREZWx0YTtcblxuICAgIGlmIChuZXdTY2FsZSA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSAob2xkVmFsdWUsIG5ld1ZhbHVlKSA9PlxuICAgICAgbmV3VmFsdWUgLSAobmV3VmFsdWUgLSBvbGRWYWx1ZSkgKiAobmV3U2NhbGUgLyBvbGRTY2FsZSk7XG5cbiAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtLnggPSB1cGRhdGVQb3NpdGlvbihvbGRYLCBjbGllbnRYKTtcbiAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtLnkgPSB1cGRhdGVQb3NpdGlvbihvbGRZLCBjbGllbnRZKTtcbiAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtLnNjYWxlID0gbmV3U2NhbGU7XG5cbiAgICBwdWJsaXNoRXZlbnQoXG4gICAgICBpbnZlcnRlZERlbHRhID4gMCA/IGNhbnZhc0V2ZW50cy5aT09NX0lOIDogY2FudmFzRXZlbnRzLlpPT01fT1VULFxuICAgICk7XG5cbiAgICB0aGlzLnJlbmRlclNjZW5lKCk7XG4gIH1cblxuICBvblNjZW5lRWxlbWVudFNlbGVjdGVkKGVsZW1lbnRJZCkge1xuICAgIHRoaXMuY29udHJvbHMucGFubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuY29udHJvbHMuZWxlbWVudE1vdmVtZW50ID0gdHJ1ZTtcbiAgICB0aGlzLm1vdmluZ0VsZW1lbnRJZCA9IGVsZW1lbnRJZDtcbiAgfVxuXG4gIHJlc2V0Q29udHJvbHMoKSB7XG4gICAgdGhpcy5jb250cm9scy5wYW5uaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmNvbnRyb2xzLmVsZW1lbnRNb3ZlbWVudCA9IGZhbHNlO1xuICAgIHRoaXMubW92aW5nRWxlbWVudElkID0gbnVsbDtcbiAgfVxuXG4gIGFwcGx5VHJhbnNmb3JtKCkge1xuICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICBjb25zdCB7IHNjYWxlLCB4LCB5IH0gPSB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtO1xuICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybShzY2FsZSwgMCwgMCwgc2NhbGUsIHgsIHkpO1xuICB9XG5cbiAgcmVuZGVyU2NlbmUoKSB7XG4gICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIGdldFNjZW5lRWxlbWVudHMoKS5mb3JFYWNoKChlbCkgPT4gZWwuZHJhdyh0aGlzLmN0eCkpO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImNvbnRyb2xsZWQtY2FudmFzXCIsIENvbnRyb2xsZWRDYW52YXMpO1xuIiwiaW1wb3J0IHsgQ29udHJvbGxlZENhbnZhcyB9IGZyb20gXCIuL0NvbnRvbGxlZENhbnZhc1wiO1xuaW1wb3J0IHsgbWFwU2NyZWVuQ29vcmRpbmF0ZXNUb0NhbnZhcyB9IGZyb20gXCIuLi9saWIvbWFwcGVycy9jb29yZGluYXRlc1wiO1xuaW1wb3J0IHsgY3JlYXRlRHJvcEVsZW1lbnRFdmVudCB9IGZyb20gXCIuLi9tb2RlbC9kb21FdmVudHNcIjtcblxuY2xhc3MgRHJvcHBhYmxlQ2FudmFzIGV4dGVuZHMgQ29udHJvbGxlZENhbnZhcyB7XG4gIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuaW5pdExpc3RlbmVycygpO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLm9uRHJhZ092ZXJFbGVtZW50LmJpbmQodGhpcykpO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMub25Ecm9wRWxlbWVudC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG9uRHJhZ092ZXJFbGVtZW50KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiO1xuICB9XG5cbiAgb25Ecm9wRWxlbWVudChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBlbGVtZW50SWQgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG5cbiAgICBpZiAoIWVsZW1lbnRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY2FudmFzWCwgY2FudmFzWSB9ID0gbWFwU2NyZWVuQ29vcmRpbmF0ZXNUb0NhbnZhcyhcbiAgICAgIHRoaXMuY2FudmFzLFxuICAgICAgZXZlbnQsXG4gICAgICB0aGlzLnZpZXdwb3J0VHJhbnNmb3JtLFxuICAgICk7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICBjcmVhdGVEcm9wRWxlbWVudEV2ZW50KHtcbiAgICAgICAgZWxlbWVudElkLFxuICAgICAgICB4OiBjYW52YXNYLFxuICAgICAgICB5OiBjYW52YXNZLFxuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJkcm9wcGFibGUtY2FudmFzXCIsIERyb3BwYWJsZUNhbnZhcyk7XG4iLCJpbXBvcnQgXCIuL0Ryb3BwYWJsZUNhbnZhc1wiO1xuIiwiaW1wb3J0IHsgQmFzZVNjZW5lRWxlbWVudCB9IGZyb20gXCJAc2hhcmVkL21vZGVsL0Jhc2VTY2VuZUVsZW1lbnRcIjtcbmltcG9ydCB7IHN1YnNjcmliZSB9IGZyb20gXCJAc2hhcmVkL2xpYi9ldmVudEJ1c1wiO1xuaW1wb3J0IHsgY2FudmFzRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvbW9kZWwvY2FudmFzRXZlbnRzXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUeXBlcyB9IGZyb20gXCJAc2hhcmVkL21vZGVsL2NvbXBvbmVudFR5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBHcmlkIGV4dGVuZHMgQmFzZVNjZW5lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBpZCxcbiAgICBsaW5lV2lkdGggPSAxLFxuICAgIGNlbGxXaWR0aCA9IDI1LFxuICAgIGNlbGxIZWlnaHQgPSAyNSxcbiAgICBvZmZzZXQgPSAwLFxuICAgIGZvbnRTaXplID0gOCxcbiAgICB0ZXh0T2Zmc2V0ID0gMjUsXG4gICAgY29sb3IgPSBcIiMwMDAwMDBcIixcbiAgfSA9IHt9KSB7XG4gICAgc3VwZXIoY29tcG9uZW50VHlwZXMuR1JJRCwgaWQpO1xuXG4gICAgdGhpcy5vcmlnaW5PcHRpb25zID0geyBjZWxsV2lkdGgsIGNlbGxIZWlnaHQgfTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IGxpbmVXaWR0aCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBvZmZzZXQsIGNvbG9yIH07XG4gICAgdGhpcy5tZWFzdXJlT3B0aW9ucyA9IHsgZm9udFNpemUsIG9mZnNldDogdGV4dE9mZnNldCB9O1xuXG4gICAgc3Vic2NyaWJlKGNhbnZhc0V2ZW50cy5aT09NX0lOLCB0aGlzLmluY3JlYXNlQ2VsbFNpemUuYmluZCh0aGlzKSk7XG4gICAgc3Vic2NyaWJlKGNhbnZhc0V2ZW50cy5aT09NX09VVCwgdGhpcy5kZWNyZWFzZUNlbGxTaXplLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaW5jcmVhc2VDZWxsU2l6ZSgpIHtcbiAgICBjb25zdCB7IGNlbGxXaWR0aCwgY2VsbEhlaWdodCB9ID0gdGhpcy5vcmlnaW5PcHRpb25zO1xuICAgIHRoaXMub3B0aW9ucy5jZWxsV2lkdGggKz0gY2VsbFdpZHRoO1xuICAgIHRoaXMub3B0aW9ucy5jZWxsSGVpZ2h0ICs9IGNlbGxIZWlnaHQ7XG4gIH1cblxuICBkZWNyZWFzZUNlbGxTaXplKCkge1xuICAgIGNvbnN0IHsgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0IH0gPSB0aGlzLm9yaWdpbk9wdGlvbnM7XG5cbiAgICB0aGlzLm9wdGlvbnMuY2VsbFdpZHRoIC09IGNlbGxXaWR0aDtcbiAgICB0aGlzLm9wdGlvbnMuY2VsbEhlaWdodCAtPSBjZWxsSGVpZ2h0O1xuICB9XG5cbiAgZHJhdyhjdHgpIHtcbiAgICBjb25zdCB7IGxpbmVXaWR0aCwgY29sb3IgfSA9IHRoaXMub3B0aW9ucztcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgdGhpcy5kcmF3VmVydGljYWxMaW5lcyhjdHgpO1xuICAgIHRoaXMuZHJhd0hvcml6b250YWxMaW5lcyhjdHgpO1xuICB9XG5cbiAgZHJhd1ZlcnRpY2FsTGluZShjdHgsIHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCB0ZXh0KSB7XG4gICAgY29uc3QgeyBvZmZzZXQ6IG1lYXN1cmVPZmZzZXQgfSA9IHRoaXMubWVhc3VyZU9wdGlvbnM7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgY3R4LmxpbmVUbyhlbmRYLCBlbmRZKTtcblxuICAgIGlmICh0ZXh0KSB7XG4gICAgICB0aGlzLmRyYXdNZWFzdXJlVGV4dChjdHgsIHN0YXJ0WCwgZW5kWSArIG1lYXN1cmVPZmZzZXQsIHRleHQpO1xuICAgIH1cbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICBkcmF3VmVydGljYWxMaW5lcyhjdHgpIHtcbiAgICBjb25zdCB7IGNlbGxXaWR0aCwgb2Zmc2V0IH0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBjb25zdCBtYXhIZWlnaHQgPSBjdHguY2FudmFzLmhlaWdodCAtIG9mZnNldDtcbiAgICBjb25zdCBtYXhXaWR0aCA9IGN0eC5jYW52YXMud2lkdGggLSBvZmZzZXQ7XG5cbiAgICBmb3IgKGxldCBpID0gb2Zmc2V0OyBpIDw9IG1heFdpZHRoOyBpICs9IGNlbGxXaWR0aCkge1xuICAgICAgdGhpcy5kcmF3VmVydGljYWxMaW5lKGN0eCwgaSwgb2Zmc2V0LCBpLCBtYXhIZWlnaHQsIGAke2kgLSBvZmZzZXR9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3VmVydGljYWxMaW5lKGN0eCwgbWF4V2lkdGgsIG9mZnNldCwgbWF4V2lkdGgsIG1heEhlaWdodCk7XG5cbiAgICB0aGlzLmRyYXdEZWZhdWx0VGV4dChcbiAgICAgIGN0eCxcbiAgICAgIGAke21heFdpZHRoIC0gb2Zmc2V0fWAsXG4gICAgICBtYXhXaWR0aCxcbiAgICAgIG1heEhlaWdodCArIHRoaXMubWVhc3VyZU9wdGlvbnMub2Zmc2V0LFxuICAgICk7XG4gIH1cblxuICBkcmF3SG9yaXpvbnRhbExpbmUoY3R4LCBzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgdGV4dCkge1xuICAgIGNvbnN0IHsgb2Zmc2V0OiBtZWFzdXJlT2Zmc2V0IH0gPSB0aGlzLm1lYXN1cmVPcHRpb25zO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xuICAgIGN0eC5saW5lVG8oZW5kWCwgZW5kWSk7XG5cbiAgICBpZiAodGV4dCkge1xuICAgICAgdGhpcy5kcmF3TWVhc3VyZVRleHQoY3R4LCBzdGFydFggLSBtZWFzdXJlT2Zmc2V0LCBlbmRZLCB0ZXh0LCB0cnVlKTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICBkcmF3SG9yaXpvbnRhbExpbmVzKGN0eCkge1xuICAgIGNvbnN0IHsgY2VsbEhlaWdodCwgb2Zmc2V0IH0gPSB0aGlzLm9wdGlvbnM7XG4gICAgY29uc3QgeyBvZmZzZXQ6IG1lYXN1cmVPZmZzZXQgfSA9IHRoaXMubWVhc3VyZU9wdGlvbnM7XG5cbiAgICBjb25zdCBtYXhIZWlnaHQgPSBjdHguY2FudmFzLmhlaWdodCAtIG9mZnNldDtcbiAgICBjb25zdCBtYXhXaWR0aCA9IGN0eC5jYW52YXMud2lkdGggLSBvZmZzZXQ7XG5cbiAgICBmb3IgKGxldCBpID0gb2Zmc2V0OyBpIDwgbWF4SGVpZ2h0OyBpICs9IGNlbGxIZWlnaHQpIHtcbiAgICAgIHRoaXMuZHJhd0hvcml6b250YWxMaW5lKGN0eCwgb2Zmc2V0LCBpLCBtYXhXaWR0aCwgaSwgYCR7bWF4SGVpZ2h0IC0gaX1gKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdIb3Jpem9udGFsTGluZShjdHgsIG9mZnNldCwgbWF4SGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0LCBcIjBcIik7XG4gIH1cblxuICBkcmF3TWVhc3VyZVRleHQoY3R4LCB4LCB5LCB0ZXh0LCBpc0hvcml6b250YWxBbGlnbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgeyBmb250U2l6ZSB9ID0gdGhpcy5tZWFzdXJlT3B0aW9ucztcbiAgICBjb25zdCB7IHdpZHRoIH0gPSBjdHgubWVhc3VyZVRleHQodGV4dCk7XG5cbiAgICBjb25zdCB4UG9zaXRpb24gPSBpc0hvcml6b250YWxBbGlnbiA/IHggOiB4IC0gd2lkdGggLyAyO1xuICAgIGNvbnN0IHlQb3NpdGlvbiA9IGlzSG9yaXpvbnRhbEFsaWduID8geSArIGZvbnRTaXplIC8gMiA6IHk7XG4gICAgdGhpcy5kcmF3RGVmYXVsdFRleHQoY3R4LCB0ZXh0LCB4UG9zaXRpb24sIHlQb3NpdGlvbik7XG4gIH1cblxuICBkcmF3RGVmYXVsdFRleHQoY3R4LCB0ZXh0LCB4LCB5KSB7XG4gICAgY29uc3QgeyBmb250U2l6ZSB9ID0gdGhpcy5tZWFzdXJlT3B0aW9ucztcbiAgICBjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IHNlcmlmYDtcbiAgICBjdHguc3Ryb2tlVGV4dCh0ZXh0LCB4LCB5KTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9jYW52YXNcIjtcbmltcG9ydCBcIi4vcG9seWdvblwiO1xuIiwiaW1wb3J0IFwiLi91aS9Qb2x5Z29uU3ZnXCI7XG4iLCJleHBvcnQgY29uc3QgbWFwUG9seWdvblBvaW50c1RvU3ZnUG9pbnRzID0gKHBvaW50cykgPT5cbiAgcG9pbnRzLm1hcCgoeyB4LCB5IH0pID0+IGAke3h9LCR7eX1gKS5qb2luKFwiIFwiKTtcbiIsImltcG9ydCBjb252ZXhIdWxsIGZyb20gXCJjb252ZXgtaHVsbFwiO1xuaW1wb3J0IHsgdXNlQXJyYXlSYW5nZSB9IGZyb20gXCJAc2hhcmVkL2xpYi9ob29rcy91c2VBcnJheVJhbmdlXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQb2x5Z29uUG9pbnRzID0gKHBvaW50c0NvdW50LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSA9PiB7XG4gIGNvbnN0IHZlcnRpY2VzID0gdXNlQXJyYXlSYW5nZShwb2ludHNDb3VudCkubWFwKCgpID0+ICh7XG4gICAgeDogTWF0aC5yYW5kb20oKSAqIG1heFdpZHRoLFxuICAgIHk6IE1hdGgucmFuZG9tKCkgKiBtYXhIZWlnaHQsXG4gIH0pKTtcblxuICBjb25zdCBjb252ZXhIdWxsVmVydGljZXMgPSB2ZXJ0aWNlcy5tYXAoKHsgeCwgeSB9KSA9PiBbeCwgeV0pO1xuXG4gIHJldHVybiBjb252ZXhIdWxsKGNvbnZleEh1bGxWZXJ0aWNlcykubWFwKChbcHJldiwgbmV4dF0sIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm4gdmVydGljZXNbcHJldl07XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcnRpY2VzW25leHRdO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBCYXNlU2NlbmVFbGVtZW50IH0gZnJvbSBcIkBzaGFyZWQvbW9kZWwvQmFzZVNjZW5lRWxlbWVudFwiO1xuaW1wb3J0IHsgcG9seWdvbk9wdGlvbnMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNvbXBvbmVudFR5cGVzIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9tb2RlbC9jb21wb25lbnRUeXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgUG9seWdvbiBleHRlbmRzIEJhc2VTY2VuZUVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgcG9zaXRpb24sXG4gICAgcG9pbnRzLFxuICAgIGNvbG9yID0gcG9seWdvbk9wdGlvbnMuY29sb3IsXG4gICAgYm9yZGVyQ29sb3IgPSBwb2x5Z29uT3B0aW9ucy5ib3JkZXJDb2xvcixcbiAgICBib3JkZXJXaWR0aCA9IHBvbHlnb25PcHRpb25zLmJvcmRlcldpZHRoLFxuICB9KSB7XG4gICAgc3VwZXIoY29tcG9uZW50VHlwZXMuUE9MWUdPTiwgaWQpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcbiAgICB0aGlzLm9wdGlvbnMgPSB7IGNvbG9yLCBib3JkZXJDb2xvciwgYm9yZGVyV2lkdGggfTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7XG4gICAgY29uc3QgeyB4OiBnbG9iYWxYLCB5OiBnbG9iYWxZIH0gPSB0aGlzLnBvc2l0aW9uO1xuICAgIGNvbnN0IHsgY29sb3IsIGJvcmRlckNvbG9yLCBib3JkZXJXaWR0aCB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IGJvcmRlckNvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBib3JkZXJXaWR0aDtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICB0aGlzLnBvaW50cy5mb3JFYWNoKCh7IHgsIHkgfSkgPT4ge1xuICAgICAgY3R4LmxpbmVUbyhnbG9iYWxYICsgeCwgZ2xvYmFsWSArIHkpO1xuICAgIH0pO1xuXG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxuICB0cmFuc2xhdGUoZHgsIGR5KSB7XG4gICAgdGhpcy5wb3NpdGlvbi54ICs9IGR4O1xuICAgIHRoaXMucG9zaXRpb24ueSArPSBkeTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHBvbHlnb25PcHRpb25zID0ge1xuICBzdmdQb2x5Z29uV2lkdGg6IDc1LFxuICBzdmdQb2x5Z29uSGVpZ2h0OiA3NSxcbiAgY29sb3I6IFwiIzk1MDIyN1wiLFxuICBib3JkZXJDb2xvcjogXCIjNDUyNzJlXCIsXG4gIGJvcmRlcldpZHRoOiAzLFxufTtcbiIsImltcG9ydCB7IHBvbHlnb25PcHRpb25zIH0gZnJvbSBcIi4uL21vZGVsL2NvbnN0YW50c1wiO1xuXG5jbGFzcyBQb2x5Z29uU3ZnIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBnZXQgaGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKTtcbiAgfVxuXG4gIHNldCBoZWlnaHQobmV3SGVpZ2h0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgbmV3SGVpZ2h0KTtcbiAgfVxuXG4gIGdldCB3aWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKTtcbiAgfVxuXG4gIHNldCB3aWR0aChuZXdXaWR0aCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgbmV3V2lkdGgpO1xuICB9XG5cbiAgZ2V0IHBvaW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJwb2ludHNcIik7XG4gIH1cblxuICBzZXQgcG9pbnRzKG5ld1BvaW50cykge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwicG9pbnRzXCIsIG5ld1BvaW50cyk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5pbml0TGlzdGVuZXJzKCk7XG4gIH1cblxuICBpbml0TGlzdGVuZXJzKCkge1xuICAgIHRoaXMucXVlcnlTZWxlY3RvcihcImRpdlwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCB0aGlzLmlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBib3JkZXJDb2xvciwgYm9yZGVyV2lkdGggfSA9IHBvbHlnb25PcHRpb25zO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgPGRpdiBkcmFnZ2FibGU9XCJ0cnVlXCI+IFxuICAgICAgICA8c3ZnIGhlaWdodD1cIiR7dGhpcy5oZWlnaHR9XCIgd2lkdGg9XCIke3RoaXMud2lkdGh9XCIgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIiR7dGhpcy5wb2ludHN9XCIgc3R5bGU9XCJmaWxsOiR7Y29sb3J9O3N0cm9rZToke2JvcmRlckNvbG9yfTtzdHJva2Utd2lkdGg6JHtib3JkZXJXaWR0aH1cIj48L3BvbHlnb24+XG4gICAgICAgIDwvc3ZnPlxuICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwicG9seWdvbi1zdmdcIiwgUG9seWdvblN2Zyk7XG4iLCJpbXBvcnQgeyBjb21wb25lbnRUeXBlcyB9IGZyb20gXCJAc2hhcmVkL21vZGVsL2NvbXBvbmVudFR5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VTY2VuZSA9ICgpID0+IHtcbiAgY29uc3Qgc2NlbmUgPSB7XG4gICAgY2hpbGRyZW46IFtdLFxuICB9O1xuXG4gIGNvbnN0IGFkZFNjZW5lRWxlbWVudCA9IChlbGVtZW50KSA9PiBzY2VuZS5jaGlsZHJlbi5wdXNoKGVsZW1lbnQpO1xuXG4gIGNvbnN0IHJlbW92ZVNjZW5lRWxlbWVudCA9ICh0YXJnZXRJZCkgPT5cbiAgICAoc2NlbmUuY2hpbGRyZW4gPSBzY2VuZS5jaGlsZHJlbi5maWx0ZXIoKGVsKSA9PiB0YXJnZXRJZCAhPT0gZWwuZ2V0SWQoKSkpO1xuXG4gIGNvbnN0IGNsZWFyU2NlbmUgPSAoKSA9PlxuICAgIChzY2VuZS5jaGlsZHJlbiA9IHNjZW5lLmNoaWxkcmVuLmZpbHRlcihcbiAgICAgIChlbCkgPT4gZWwuZ2V0VHlwZSgpID09PSBjb21wb25lbnRUeXBlcy5HUklELFxuICAgICkpO1xuXG4gIGNvbnN0IGdldFNjZW5lRWxlbWVudHMgPSAoKSA9PiBbLi4uc2NlbmUuY2hpbGRyZW5dO1xuXG4gIGNvbnN0IGdldFNjZW5lRWxlbWVudEJ5SWQgPSAoaWQpID0+XG4gICAgc2NlbmUuY2hpbGRyZW4uZmluZCgoZWwpID0+IGVsLmdldElkKCkgPT09IGlkKTtcblxuICByZXR1cm4ge1xuICAgIGFkZFNjZW5lRWxlbWVudCxcbiAgICByZW1vdmVTY2VuZUVsZW1lbnQsXG4gICAgZ2V0U2NlbmVFbGVtZW50cyxcbiAgICBnZXRTY2VuZUVsZW1lbnRCeUlkLFxuICAgIGNsZWFyU2NlbmUsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgY2FudmFzRXZlbnRzIH0gZnJvbSBcIkBzaGFyZWQvbW9kZWwvY2FudmFzRXZlbnRzXCI7XG5pbXBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2hFdmVudCB9IGZyb20gXCJAc2hhcmVkL2xpYi9ldmVudEJ1c1wiO1xuaW1wb3J0IHsgZ2V0U2NlbmVFbGVtZW50QnlJZCwgZ2V0U2NlbmVFbGVtZW50cyB9IGZyb20gXCIuLi9zY2VuZVwiO1xuaW1wb3J0IHsgc2NlbmVFdmVudHMgfSBmcm9tIFwiLi4vLi4vbW9kZWwvZXZlbnRzXCI7XG5pbXBvcnQgeyBpc0dyYXBoaWNhbE9iamVjdEludGVyc2VjdGVkIH0gZnJvbSBcIi4uL2ludGVyc2VjdGlvblwiO1xuXG5leHBvcnQgY29uc3QgdXNlU2NlbmVMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIGNvbnN0IG9uU2NlbmVTZWxlY3RlZCA9ICh7IHgsIHkgfSkgPT4ge1xuICAgIGNvbnN0IHJlcyA9IGdldFNjZW5lRWxlbWVudHMoKS5maWx0ZXIoKGVsKSA9PlxuICAgICAgaXNHcmFwaGljYWxPYmplY3RJbnRlcnNlY3RlZCh4LCB5LCBlbCksXG4gICAgKTtcblxuICAgIGlmIChyZXMubGVuZ3RoKSB7XG4gICAgICBwdWJsaXNoRXZlbnQoc2NlbmVFdmVudHMuU0VMRUNURURfRUxFTUVOVCwgcmVzWzBdLmdldElkKCkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBvbkVsZW1lbnRNb3ZlID0gKHsgaWQsIGR4LCBkeSB9KSA9PiB7XG4gICAgY29uc3QgZWwgPSBnZXRTY2VuZUVsZW1lbnRCeUlkKGlkKTtcblxuICAgIGlmIChlbCkge1xuICAgICAgZWwudHJhbnNsYXRlKGR4LCBkeSk7XG4gICAgfVxuICB9O1xuXG4gIHN1YnNjcmliZShjYW52YXNFdmVudHMuTU9VU0VfRE9XTiwgb25TY2VuZVNlbGVjdGVkKTtcbiAgc3Vic2NyaWJlKGNhbnZhc0V2ZW50cy5NT1ZFX0VMRU1FTlQsIG9uRWxlbWVudE1vdmUpO1xufTtcbiIsImV4cG9ydCBjb25zdCBpc0dyYXBoaWNhbE9iamVjdEludGVyc2VjdGVkID0gKHgsIHksIG9iamVjdCkgPT4ge1xuICBjb25zdCB7IHBvaW50cywgcG9zaXRpb24gfSA9IG9iamVjdDtcblxuICBpZiAoIXBvaW50cyB8fCAhcG9zaXRpb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB4cyA9IHBvaW50cy5tYXAoKHsgeCB9KSA9PiB4ICsgcG9zaXRpb24ueCk7XG4gIGNvbnN0IHlzID0gcG9pbnRzLm1hcCgoeyB5IH0pID0+IHkgKyBwb3NpdGlvbi55KTtcblxuICBjb25zdCBtaW5YID0gTWF0aC5taW4oLi4ueHMpO1xuICBjb25zdCBtYXhYID0gTWF0aC5tYXgoLi4ueHMpO1xuICBjb25zdCBtaW5ZID0gTWF0aC5taW4oLi4ueXMpO1xuICBjb25zdCBtYXhZID0gTWF0aC5tYXgoLi4ueXMpO1xuXG4gIHJldHVybiB4ID49IG1pblggJiYgeCA8PSBtYXhYICYmIHkgPj0gbWluWSAmJiB5IDw9IG1heFk7XG59O1xuIiwiaW1wb3J0IHsgdXNlU2NlbmUgfSBmcm9tIFwiLi9ob29rcy91c2VTY2VuZVwiO1xuaW1wb3J0IHsgdXNlU2NlbmVMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ob29rcy91c2VTY2VuZUxpc3RlbmVyc1wiO1xuXG5leHBvcnQgY29uc3Qge1xuICBhZGRTY2VuZUVsZW1lbnQsXG4gIHJlbW92ZVNjZW5lRWxlbWVudCxcbiAgZ2V0U2NlbmVFbGVtZW50cyxcbiAgZ2V0U2NlbmVFbGVtZW50QnlJZCxcbiAgY2xlYXJTY2VuZSxcbn0gPSB1c2VTY2VuZSgpO1xuXG51c2VTY2VuZUxpc3RlbmVycygpO1xuIiwiZXhwb3J0IGNvbnN0IHNjZW5lRXZlbnRzID0ge1xuICBTRUxFQ1RFRF9FTEVNRU5UOiBcIlNFTEVDVEVEX0VMRU1FTlRcIixcbn07XG4iLCJpbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSBcIkBlbnRpdGllcy9wb2x5Z29uL21vZGVsL1BvbHlnb25cIjtcbmltcG9ydCB7IGFkZFNjZW5lRWxlbWVudCB9IGZyb20gXCJAZW50aXRpZXMvc2NlbmUvbGliL3NjZW5lXCI7XG5pbXBvcnQgeyBwdWJsaXNoRXZlbnQgfSBmcm9tIFwiQHNoYXJlZC9saWIvZXZlbnRCdXNcIjtcbmltcG9ydCB7IGNhbnZhc0V2ZW50cyB9IGZyb20gXCJAc2hhcmVkL21vZGVsL2NhbnZhc0V2ZW50c1wiO1xuaW1wb3J0IHsgcG9seWdvbk9wdGlvbnMgfSBmcm9tIFwiQGVudGl0aWVzL3BvbHlnb24vbW9kZWwvY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvblBvbHlnb25Ecm9wcGVkKHsgeCwgeSwgZWxlbWVudElkIH0sIGJ1ZmZlclBvbHlnb25zKSB7XG4gIGNvbnN0IGVsZW1lbnREYXRhID0gYnVmZmVyUG9seWdvbnMuZmluZCgoeyBpZCB9KSA9PiBpZCA9PT0gZWxlbWVudElkKTtcblxuICBpZiAoIWVsZW1lbnREYXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBpZCwgcG9pbnRzIH0gPSBlbGVtZW50RGF0YTtcblxuICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24oe1xuICAgIGlkLFxuICAgIHBvc2l0aW9uOiB7IHgsIHkgfSxcbiAgICBwb2ludHMsXG4gICAgYm9yZGVyV2lkdGg6IHBvbHlnb25PcHRpb25zLmJvcmRlcldpZHRoLFxuICB9KTtcblxuICBhZGRTY2VuZUVsZW1lbnQocG9seWdvbik7XG4gIHB1Ymxpc2hFdmVudChjYW52YXNFdmVudHMuUkVOREVSX1NDRU5FKTtcbn1cbiIsImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgeyBwb2x5Z29uT3B0aW9ucyB9IGZyb20gXCJAZW50aXRpZXMvcG9seWdvbi9tb2RlbC9jb25zdGFudHNcIjtcbmltcG9ydCB7IHVzZUdldFJhbmRvbUFyYml0cmFyeSB9IGZyb20gXCJAc2hhcmVkL2xpYi9ob29rcy91c2VHZXRSYW5kb21BcmJpdHJhcnlcIjtcbmltcG9ydCB7IHVzZUFycmF5UmFuZ2UgfSBmcm9tIFwiQHNoYXJlZC9saWIvaG9va3MvdXNlQXJyYXlSYW5nZVwiO1xuaW1wb3J0IHsgY3JlYXRlUG9seWdvblBvaW50cyB9IGZyb20gXCJAZW50aXRpZXMvcG9seWdvbi9saWIvcG9pbnRzXCI7XG5pbXBvcnQgeyBtYXBQb2x5Z29uUG9pbnRzVG9TdmdQb2ludHMgfSBmcm9tIFwiQGVudGl0aWVzL3BvbHlnb24vbGliL21hcHBlcnMvcG9pbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSYW5kb21TdmdQb2x5Z29uRGF0YSA9ICgpID0+IHtcbiAgY29uc3QgcG9seWdvbkNvdW50ID0gdXNlR2V0UmFuZG9tQXJiaXRyYXJ5KDUsIDIwKTtcbiAgY29uc3QgYnVmZmVyID0gdXNlQXJyYXlSYW5nZShwb2x5Z29uQ291bnQpO1xuXG4gIHJldHVybiBidWZmZXIubWFwKCgpID0+IGNyZWF0ZVN2Z1BvbHlnb25EYXRhKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN2Z1BvbHlnb25EYXRhID0gKHsgcG9pbnRzLCBpZCA9IHV1aWR2NCgpIH0gPSB7fSkgPT4ge1xuICBjb25zdCB7IHN2Z1BvbHlnb25XaWR0aDogd2lkdGgsIHN2Z1BvbHlnb25IZWlnaHQ6IGhlaWdodCB9ID0gcG9seWdvbk9wdGlvbnM7XG5cbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBwb2ludHM6IHBvaW50cyB8fCBjcmVhdGVQb2x5Z29uUG9pbnRzKDEwLCB3aWR0aCwgaGVpZ2h0KSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBvbHlnb25TdmdFbGVtZW50ID0gKHsgaWQsIHBvaW50cywgb3B0aW9ucyB9KSA9PiB7XG4gIGNvbnN0IG1hcHBlZFBvaW50cyA9IG1hcFBvbHlnb25Qb2ludHNUb1N2Z1BvaW50cyhwb2ludHMpO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicG9seWdvbi1zdmdcIik7XG4gIGVsZW1lbnQuaWQgPSBpZDtcbiAgZWxlbWVudC5wb2ludHMgPSBtYXBwZWRQb2ludHM7XG4gIGVsZW1lbnQud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICBlbGVtZW50LmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuXG4gIHJldHVybiBlbGVtZW50O1xufTtcbiIsImNvbnN0IGxpc3RlbmVycyA9IHt9O1xuXG5leHBvcnQgY29uc3Qgc3Vic2NyaWJlID0gKGV2ZW50LCBjYWxsYmFjaykgPT4ge1xuICBpZiAoIWxpc3RlbmVyc1tldmVudF0pIHtcbiAgICBsaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gIH1cblxuICBsaXN0ZW5lcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xufTtcblxuZXhwb3J0IGNvbnN0IHVuc3Vic2NyaWJlID0gKGV2ZW50LCBjYWxsYmFjaykgPT4ge1xuICBpZiAoIWxpc3RlbmVyc1tldmVudF0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsaXN0ZW5lcnNbZXZlbnRdID0gbGlzdGVuZXJzW2V2ZW50XS5maWx0ZXIoKGNiKSA9PiBjYiAhPT0gY2FsbGJhY2spO1xufTtcblxuZXhwb3J0IGNvbnN0IHB1Ymxpc2hFdmVudCA9IChldmVudCwgZGF0YSkgPT4ge1xuICBpZiAoIWxpc3RlbmVyc1tldmVudF0pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsaXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhkYXRhKSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHVzZUFycmF5UmFuZ2UgPSAocmFuZ2UpID0+IEFycmF5LmZyb20oQXJyYXkocmFuZ2UpLmtleXMoKSk7XG4iLCJleHBvcnQgY29uc3QgdXNlR2V0UmFuZG9tQXJiaXRyYXJ5ID0gKG1pbiwgbWF4KSA9PlxuICBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbik7XG4iLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tIFwidXVpZFwiO1xuXG5leHBvcnQgY2xhc3MgQmFzZVNjZW5lRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGlkID0gdXVpZHY0KCkpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGRyYXcoY3R4KSB7fVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgY2FudmFzRXZlbnRzID0ge1xuICBaT09NX0lOOiBcIlpPT01fSU5cIixcbiAgWk9PTV9PVVQ6IFwiWk9PTV9PVVRcIixcbiAgTU9VU0VfRE9XTjogXCJNT1VTRV9ET1dOXCIsXG4gIE1PVkVfRUxFTUVOVDogXCJNT1ZFX0VMRU1FTlRcIixcbiAgTU9WRURfRUxFTUVOVF9PVVRTSURFOiBcIk1PVkVEX0VMRU1FTlRfT1VUU0lERVwiLFxuICBSRU5ERVJfU0NFTkU6IFwiUkVOREVSXCIsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGNvbXBvbmVudFR5cGVzID0ge1xuICBHUklEOiBcIkdSSURcIixcbiAgUE9MWUdPTjogXCJQT0xZR09OXCIsXG59O1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3ZhcmlhYmxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcbm9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi92YXJpYWJsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiZXhwb3J0IGNsYXNzIEJhc2VCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIGdldCBjbGFzc05hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIpO1xuICB9XG5cbiAgc2V0IGNsYXNzTmFtZShuZXdDbGFzc05hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIiwgbmV3Q2xhc3NOYW1lKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiJHt0aGlzLmNsYXNzTmFtZX1cIj5cbiAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgPC9idXR0b24+YDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJiYXNlLWJ1dHRvblwiLCBCYXNlQnV0dG9uKTtcbiIsImltcG9ydCB7IEJhc2VCdXR0b24gfSBmcm9tIFwiLi9CYXNlQnV0dG9uXCI7XG5cbmNsYXNzIERlZmF1bHRCdXR0b24gZXh0ZW5kcyBCYXNlQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcImNsb3NlZFwiIH0pO1xuICAgIHRoaXMuc2hhZG93LmlubmVySFRNTCA9IHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAuYnV0dG9uIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQxMCk7XG4gICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXdoaXRlKTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgIHBhZGRpbmc6IDEycHggMjRweDtcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEyMCU7XG4gICAgICAgIFxuICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYWxsIGVhc2UgMC4zcztcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudDIwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgIFxuICAgICAgICA8YmFzZS1idXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIvPlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiZGVmYXVsdC1idXR0b25cIiwgRGVmYXVsdEJ1dHRvbik7XG4iLCJpbXBvcnQgXCIuL2J1dHRvbnMvQmFzZUJ1dHRvblwiO1xuaW1wb3J0IFwiLi9idXR0b25zL0RlZmF1bHRCdXR0b25cIjtcbmltcG9ydCBcIi4vbGF5b3V0cy9EZWZhdWx0TWFpbkxheW91dFwiO1xuIiwiY2xhc3MgRGVmYXVsdE1haW5MYXlvdXQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcImNsb3NlZFwiIH0pO1xuICAgIHRoaXMuc2hhZG93LmlubmVySFRNTCA9IHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgbWFpbiB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMzJweCA0MHB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgICBnYXA6IDE2cHg7ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgXG4gICAgICAgIDxtYWluPlxuICAgICAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgICA8L21haW4+YDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJkZWZhdWx0LW1haW4tbGF5b3V0XCIsIERlZmF1bHRNYWluTGF5b3V0KTtcbiIsImltcG9ydCBcIi4vdWlcIjtcbiIsImV4cG9ydCBjb25zdCBoZWFkZXJFdmVudHMgPSB7XG4gIENSRUFURV9DTElDSzogXCJDUkVBVEVfQ0xJQ0tcIixcbiAgQ0xFQVJfQ0xJQ0s6IFwiQ0xFQVJfQ0xJQ0tcIixcbiAgU0FWRV9DTElDSzogXCJTQVZFX0NMSUNLXCIsXG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGVmYXVsdEhlYWRlckV2ZW50ID0gKGV2ZW50TmFtZSkgPT5cbiAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiIsImltcG9ydCB7IGNyZWF0ZURlZmF1bHRIZWFkZXJFdmVudCwgaGVhZGVyRXZlbnRzIH0gZnJvbSBcIi4uL21vZGVsL2V2ZW50c1wiO1xuXG5jbGFzcyBBcHBIZWFkZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yKFwiI2NyZWF0ZUJ1dHRvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiY2xpY2tcIixcbiAgICAgIHRoaXMub25DcmVhdGUuYmluZCh0aGlzKSxcbiAgICApO1xuXG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yKFwiI3NhdmVCdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICB0aGlzLm9uU2F2ZS5iaW5kKHRoaXMpLFxuICAgICk7XG5cbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCIjY2xlYXJCdXR0b25cIik/LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICB0aGlzLm9uQ2xlYXIuYmluZCh0aGlzKSxcbiAgICApO1xuICB9XG5cbiAgb25DcmVhdGUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZURlZmF1bHRIZWFkZXJFdmVudChoZWFkZXJFdmVudHMuQ1JFQVRFX0NMSUNLKSk7XG4gIH1cblxuICBvbkNsZWFyKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjcmVhdGVEZWZhdWx0SGVhZGVyRXZlbnQoaGVhZGVyRXZlbnRzLkNMRUFSX0NMSUNLKSk7XG4gIH1cblxuICBvblNhdmUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGNyZWF0ZURlZmF1bHRIZWFkZXJFdmVudChoZWFkZXJFdmVudHMuU0FWRV9DTElDSykpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxhcHAtaGVhZGVyLWxheW91dD5cbiAgICAgICAgICAgIDxkZWZhdWx0LWJ1dHRvbiBpZD1cImNyZWF0ZUJ1dHRvblwiPtCh0L7Qt9C00LDRgtGMPC9kZWZhdWx0LWJ1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgc2xvdD1cInJpZ2h0LWVsZW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGVmYXVsdC1idXR0b24gaWQ9XCJzYXZlQnV0dG9uXCI+0KHQvtGF0YDQsNC90LjRgtGMPC9kZWZhdWx0LWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGVmYXVsdC1idXR0b24gaWQ9XCJjbGVhckJ1dHRvblwiPtCh0LHRgNC+0YHQuNGC0Yw8L2RlZmF1bHQtYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYXBwLWhlYWRlci1sYXlvdXQ+ICAgICAgICBcbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1oZWFkZXJcIiwgQXBwSGVhZGVyKTtcbiIsImltcG9ydCBcIi4vbGF5b3V0cy9BcHBIZWFkZXJMYXlvdXRcIjtcbmltcG9ydCBcIi4vQXBwSGVhZGVyXCI7XG4iLCJjbGFzcyBBcHBIZWFkZXJMYXlvdXQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLnNoYWRvdy5pbm5lckhUTUwgPSB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgICAgIG5hdiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUpO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDE0cHggMjhweDtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1ncmF5MTApO1xuICAgICAgICAgICAgfVxuICAgICAgICA8L3N0eWxlPlxuICAgICAgICA8bmF2PlxuICAgICAgICAgICAgPHNsb3QgbmFtZT1cImxlZnQtZWxlbWVudFwiPjwvc2xvdD5cbiAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgICAgIDxzbG90IG5hbWU9XCJyaWdodC1lbGVtZW50XCI+PC9zbG90PlxuICAgICAgICA8L25hdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1oZWFkZXItbGF5b3V0XCIsIEFwcEhlYWRlckxheW91dCk7XG4iLCJpbXBvcnQgXCIuL3VpXCI7XG4iLCJleHBvcnQgY29uc3QgYnVmZmVyQ29udGFpbmVyRXZlbnRzID0ge1xuICBFTEVNRU5UX0RST1BQRUQ6IFwiRUxFTUVOVF9EUk9QUEVEXCIsXG59O1xuXG5jb25zdCBjcmVhdGVCdWZmZXJDb250YWluZXJFdmVudCA9IChldmVudCkgPT5cbiAgbmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7IGNvbXBvc2VkOiB0cnVlLCBidWJibGVzOiB0cnVlIH0pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudERyb3BwZWRFdmVudCA9ICgpID0+XG4gIGNyZWF0ZUJ1ZmZlckNvbnRhaW5lckV2ZW50KGJ1ZmZlckNvbnRhaW5lckV2ZW50cy5FTEVNRU5UX0RST1BQRUQpO1xuIiwiaW1wb3J0IHsgY3JlYXRlUG9seWdvblN2Z0VsZW1lbnQgfSBmcm9tIFwiQGZlYXR1cmVzL3BvbHlnb24vY3JlYXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBCYXNlQnVmZmVyQ29udGFpbmVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucG9seWdvbkNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IG51bGw7XG4gIH1cblxuICBnZXQgcG9seWdvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKFwicG9seWdvbnNcIik7XG4gIH1cblxuICBzZXQgcG9seWdvbnMocG9seWdvbnMpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShcInBvbHlnb25zXCIsIHBvbHlnb25zKTtcbiAgICB0aGlzLm9uUG9seWdvbkNoYW5nZWQoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJwb2x5Z29uc1wiXTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhwcm9wLCBwcmV2LCBuZXh0KSB7XG4gICAgaWYgKHByZXYgPT09IG5leHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzW3Byb3BdID0gbmV4dDtcbiAgfVxuXG4gIGNsZWFyQnVmZmVyKCkge1xuICAgIGlmICghdGhpcy5wb2x5Z29uQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMucG9seWdvbkNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLnBvbHlnb25Db250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5wb2x5Z29uQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIG9uUG9seWdvbkNoYW5nZWQoKSB7XG4gICAgaWYgKCF0aGlzLnBvbHlnb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhckJ1ZmZlcigpO1xuICAgIGNvbnN0IHBhcnNlZFBvbHlnb25zID0gSlNPTi5wYXJzZSh0aGlzLnBvbHlnb25zKTtcblxuICAgIGlmICghcGFyc2VkUG9seWdvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnNlZFBvbHlnb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlci5zZXRBdHRyaWJ1dGUoXCJ2aXNpYmxlXCIsIHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBhcnNlZFBvbHlnb25zLmZvckVhY2goKHBvbHlnb24pID0+IHtcbiAgICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBjcmVhdGVQb2x5Z29uU3ZnRWxlbWVudChwb2x5Z29uKTtcbiAgICAgIHRoaXMucG9seWdvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdFbGVtZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMucGxhY2Vob2xkZXIuc2V0QXR0cmlidXRlKFwidmlzaWJsZVwiLCBmYWxzZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHBvbHlnb25PcHRpb25zIH0gZnJvbSBcIkBlbnRpdGllcy9wb2x5Z29uL21vZGVsL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQmFzZUJ1ZmZlckNvbnRhaW5lciB9IGZyb20gXCIuL0Jhc2VCdWZmZXJDb250YWluZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnREcm9wcGVkRXZlbnQgfSBmcm9tIFwiLi4vbW9kZWwvZXZlbnRzXCI7XG5cbmNsYXNzIEJ1ZmZlckNvbnRhaW5lciBleHRlbmRzIEJhc2VCdWZmZXJDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLmlzRXhwZWN0aW5nRWxlbWVudCA9IGZhbHNlO1xuICAgIHRoaXMuZXhwZWN0ZWRFbGVtZW50SWQgPSBudWxsO1xuICB9XG5cbiAgc2V0SXNFeHBlY3RpbmdFbGVtZW50KGlkKSB7XG4gICAgdGhpcy5leHBlY3RlZEVsZW1lbnRJZCA9IGlkO1xuICAgIHRoaXMuaXNFeHBlY3RpbmdFbGVtZW50ID0gdHJ1ZTtcbiAgfVxuXG4gIGNhbmNlbEV4cGVjdGluZ0VsZW1lbnQoKSB7XG4gICAgdGhpcy5leHBlY3RlZEVsZW1lbnRJZCA9IG51bGw7XG4gICAgdGhpcy5pc0V4cGVjdGluZ0VsZW1lbnQgPSBmYWxzZTtcbiAgfVxuXG4gIG9uUG9seWdvbkRyb3BwZWQoKSB7XG4gICAgaWYgKCF0aGlzLmlzRXhwZWN0aW5nRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wWm9uZVwiKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3JlYXRlRWxlbWVudERyb3BwZWRFdmVudCgpKTtcbiAgfVxuXG4gIG9uUG9seWdvbk91dEJ1ZmZlcigpIHtcbiAgICBpZiAoIXRoaXMuaXNFeHBlY3RpbmdFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImRyb3Bab25lXCIpO1xuICB9XG5cbiAgb25Qb2x5Z29uT3ZlckJ1ZmZlcigpIHtcbiAgICBpZiAoIXRoaXMuaXNFeHBlY3RpbmdFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImRyb3Bab25lXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLnBvbHlnb25Db250YWluZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCIucG9seWdvbkNvbnRhaW5lclwiKTtcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiYnVmZmVyLWVtcHR5LXBsYWNlaG9sZGVyXCIpO1xuICAgIHRoaXMuaW5pdExpc3RlbmVycygpO1xuICB9XG5cbiAgaW5pdExpc3RlbmVycygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMub25Qb2x5Z29uRHJvcHBlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgdGhpcy5vblBvbHlnb25PdmVyQnVmZmVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMub25Qb2x5Z29uT3V0QnVmZmVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdoaXRlKTtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTUwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5kcm9wWm9uZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tZ3JheTEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLnBvbHlnb25Db250YWluZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCAke3BvbHlnb25PcHRpb25zLnN2Z1BvbHlnb25XaWR0aH1weCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9seWdvbkNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgICAgPGJ1ZmZlci1lbXB0eS1wbGFjZWhvbGRlciB2aXNpYmxlPVwidHJ1ZVwiPjwvYnVmZmVyLWVtcHR5LXBsYWNlaG9sZGVyPlxuICAgICAgICA8L2Rpdj4gICAgXG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJidWZmZXItY29udGFpbmVyXCIsIEJ1ZmZlckNvbnRhaW5lcik7XG4iLCJjbGFzcyBFbXB0eVBsYWNlaG9sZGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Vob2xkZXJDb250YWluZXJcIik7XG4gICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuZ2V0QXR0cmlidXRlKFwidmlzaWJsZVwiKSA9PT0gXCJ0cnVlXCIpO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInZpc2libGVcIl07XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgXywgbmV3VmFsdWUpIHtcbiAgICBpZiAobmFtZSA9PT0gXCJ2aXNpYmxlXCIgJiYgdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eShuZXdWYWx1ZSA9PT0gXCJ0cnVlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZpc2liaWxpdHkoaXNWaXNpYmxlKSB7XG4gICAgaXNWaXNpYmxlXG4gICAgICA/IHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIilcbiAgICAgIDogdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgICAucGxhY2Vob2xkZXJDb250YWluZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgbWluLWhlaWdodDogMTUwcHg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgIGdhcDogNHB4O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAuaGlkZGVuIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgIH1cbiAgICAgXG4gICAgICAgICAgICAgLnBsYWNlaG9sZGVyVGV4dCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWdyYXkyMClcbiAgICAgICAgICAgICB9XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwbGFjZWhvbGRlckNvbnRhaW5lciBoaWRkZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGxhY2Vob2xkZXJUZXh0XCI+0JHRg9GE0LXRgNC90YvQuSDQutC+0L3RgtC10LnQvdC10YAg0L/Rg9GB0YI8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBsYWNlaG9sZGVyVGV4dFwiPtCh0L7Qt9C00LDQudGC0LUg0LjQu9C4INC/0LXRgNC10L3QtdGB0LjRgtC1INC/0L7Qu9C40LPQvtC90Ysg0LjQtyDRgNCw0LHQvtGH0LXQuSDQt9C+0L3Rizwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJidWZmZXItZW1wdHktcGxhY2Vob2xkZXJcIiwgRW1wdHlQbGFjZWhvbGRlcik7XG4iLCJpbXBvcnQgXCIuL0J1ZmZlckNvbnRhaW5lclwiO1xuaW1wb3J0IFwiLi9FbXB0eVBsYWNlaG9sZGVyXCI7XG4iLCJpbXBvcnQgXCIuL0FwcEhlYWRlclwiO1xuaW1wb3J0IFwiLi9CdWZmZXJDb250YWluZXJcIjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vQXBwXCI7XG5pbXBvcnQgXCJAc2hhcmVkL3N0eWxlcy9ub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgXCJAc2hhcmVkL3N0eWxlcy92YXJpYWJsZXMuY3NzXCI7XG5pbXBvcnQgXCJAc2hhcmVkL3VpXCI7XG5pbXBvcnQgXCJAZW50aXRpZXNcIjtcbmltcG9ydCBcIkB3aWRnZXRzXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=