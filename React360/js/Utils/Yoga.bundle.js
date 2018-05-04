/*!
 * BSD License
 * 
 * For yoga software
 * 
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 *  * Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 *  * Neither the name Facebook nor the names of its contributors may be used to
 *    endorse or promote products derived from this software without specific
 *    prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Yoga"] = factory();
	else
		root["Yoga"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;((function(root,wrapper){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return wrapper}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(typeof module=="object"&&module.exports)module.exports=wrapper;else(root.nbind=root.nbind||{}).init=wrapper}))(this,(function(Module,cb){if(typeof Module=="function"){cb=Module;Module={}}Module.onRuntimeInitialized=(function(init,cb){return(function(){if(init)init.apply(this,arguments);try{Module.ccall("nbind_init")}catch(err){cb(err);return}cb(null,{bind:Module._nbind_value,reflect:Module.NBind.reflect,queryType:Module.NBind.queryType,toggleLightGC:Module.toggleLightGC,lib:Module})})})(Module.onRuntimeInitialized,cb);var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){if(!nodeFS)nodeFS=__webpack_require__(7);if(!nodePath)nodePath=__webpack_require__(8);filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function shell_read(){throw"no read() available"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function shell_print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function shell_printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}if(!Module["quit"]){Module["quit"]=(function(status,toThrow){throw toThrow})}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value;return value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource=null;function ensureJSsource(){if(!JSsource){JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){ensureJSsource();funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"=("+convertCode.returnValue+");"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){ensureJSsource();funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){var __cxa_demangle_func=Module["___cxa_demangle"]||Module["__cxa_demangle"];if(__cxa_demangle_func){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=__cxa_demangle_func(buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||134217728;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["fround"]){var froundBuffer=new Float32Array(1);Math["fround"]=(function(x){froundBuffer[0]=x;return froundBuffer[0]})}Math.fround=Math["fround"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[(function($0,$1,$2,$3,$4,$5,$6,$7){{return _nbind.callbackSignatureList[$0].apply(this,arguments)}})];function _emscripten_asm_const_iiiiiiii(code,a0,a1,a2,a3,a4,a5,a6){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5,a6)}function _emscripten_asm_const_iiiii(code,a0,a1,a2,a3){return ASM_CONSTS[code](a0,a1,a2,a3)}function _emscripten_asm_const_iiidddddd(code,a0,a1,a2,a3,a4,a5,a6,a7){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5,a6,a7)}function _emscripten_asm_const_iiididi(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5)}function _emscripten_asm_const_iiii(code,a0,a1,a2){return ASM_CONSTS[code](a0,a1,a2)}function _emscripten_asm_const_iiiid(code,a0,a1,a2,a3){return ASM_CONSTS[code](a0,a1,a2,a3)}function _emscripten_asm_const_iiiiii(code,a0,a1,a2,a3,a4){return ASM_CONSTS[code](a0,a1,a2,a3,a4)}STATIC_BASE=Runtime.GLOBAL_BASE;STATICTOP=STATIC_BASE+12832;__ATINIT__.push({func:(function(){__GLOBAL__sub_I_nbind_cc()})},{func:(function(){__GLOBAL__sub_I_common_cc()})},{func:(function(){__GLOBAL__sub_I_Binding_cc()})});allocate([1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,192,127,0,0,192,127,3,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,3,0,0,0,0,0,192,127,3,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,0,0,128,191,0,0,128,191,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,232,3,0,0,232,3,0,0,0,0,192,127,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,192,127,3,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,200,18,0,0,210,18,0,0,218,18,0,0,162,18,0,0,176,18,0,0,188,18,0,0,223,45,0,0,224,45,0,0,225,45,0,0,224,45,0,0,225,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,2,0,0,0,5,0,0,0,226,45,0,0,224,45,0,0,224,45,0,0,224,45,0,0,224,45,0,0,224,45,0,0,224,45,0,0,227,45,0,0,228,45,0,0,224,45,0,0,224,45,0,0,225,45,0,0,229,45,0,0,228,45,0,0,229,45,0,0,228,45,0,0,192,4,0,0,3,0,0,0,230,45,0,0,208,4,0,0,231,45,0,0,2,0,0,0,232,45,0,0,208,4,0,0,231,45,0,0,228,45,0,0,208,4,0,0,228,45,0,0,208,4,0,0,231,45,0,0,224,45,0,0,225,45,0,0,224,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6,0,0,0,7,0,0,0,2,0,0,0,8,0,0,0,226,45,0,0,225,45,0,0,224,45,0,0,233,45,0,0,233,45,0,0,225,45,0,0,225,45,0,0,228,45,0,0,224,45,0,0,228,45,0,0,225,45,0,0,224,45,0,0,228,45,0,0,225,45,0,0,228,45,0,0,92,5,0,0,3,0,0,0,100,5,0,0,1,0,0,0,232,45,0,0,228,45,0,0,124,5,0,0,225,45,0,0,224,45,0,0,2,0,0,0,233,45,0,0,124,5,0,0,204,23,0,0,144,5,0,0,2,0,0,0,227,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,11,0,0,0,192,5,0,0,224,45,0,0,224,45,0,0,2,0,0,0,223,45,0,0,192,5,0,0,229,45,0,0,225,45,0,0,228,45,0,0,225,45,0,0,229,45,0,0,2,0,0,0,238,45,0,0,244,5,0,0,48,24,0,0,241,45,0,0,254,45,0,0,255,45,0,0,0,46,0,0,1,46,0,0,2,46,0,0,231,45,0,0,225,45,0,0,3,46,0,0,4,46,0,0,5,46,0,0,6,46,0,0,7,46,0,0,224,45,0,0,0,0,0,0,228,45,0,0,61,24,0,0,229,45,0,0,66,24,0,0,9,46,0,0,71,24,0,0,192,4,0,0,83,24,0,0,104,6,0,0,96,24,0,0,10,46,0,0,115,24,0,0,11,46,0,0,124,24,0,0,0,0,0,0,3,0,0,0,112,6,0,0,1,0,0,0,230,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,12,0,0,0,13,0,0,0,2,0,0,0,14,0,0,0,228,45,0,0,12,46,0,0,172,6,0,0,231,45,0,0,180,6,0,0,188,6,0,0,2,0,0,0,196,6,0,0,7,0,0,0,12,46,0,0,7,0,0,0,172,6,0,0,1,0,0,0,0,46,0,0,228,45,0,0,12,46,0,0,180,6,0,0,228,45,0,0,12,46,0,0,172,6,0,0,228,45,0,0,12,46,0,0,254,45,0,0,254,45,0,0,10,46,0,0,254,45,0,0,12,46,0,0,10,46,0,0,254,45,0,0,12,46,0,0,180,6,0,0,10,46,0,0,254,45,0,0,12,46,0,0,231,45,0,0,10,46,0,0,254,45,0,0,48,7,0,0,231,45,0,0,2,0,0,0,12,46,0,0,228,45,0,0,231,45,0,0,231,45,0,0,231,45,0,0,231,45,0,0,10,46,0,0,12,46,0,0,192,4,0,0,228,45,0,0,192,4,0,0,192,4,0,0,192,4,0,0,192,4,0,0,192,4,0,0,228,45,0,0,172,6,0,0,192,4,0,0,0,0,0,0,0,0,0,0,2,0,0,0,15,0,0,0,16,0,0,0,2,0,0,0,17,0,0,0,156,7,0,0,2,0,0,0,13,46,0,0,226,45,0,0,231,45,0,0,176,7,0,0,5,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,22,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,188,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,9,0,0,5,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,3,0,0,0,30,46,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,108,105,115,116,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,105,116,101,109,115,0,67,111,117,108,100,32,110,111,116,32,101,120,116,101,110,100,32,97,108,108,111,99,97,116,105,111,110,32,102,111,114,32,105,116,101,109,115,0,37,115,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,110,111,100,101,0,67,97,110,110,111,116,32,114,101,115,101,116,32,97,32,110,111,100,101,32,119,104,105,99,104,32,115,116,105,108,108,32,104,97,115,32,99,104,105,108,100,114,101,110,32,97,116,116,97,99,104,101,100,0,67,97,110,110,111,116,32,114,101,115,101,116,32,97,32,110,111,100,101,32,115,116,105,108,108,32,97,116,116,97,99,104,101,100,32,116,111,32,97,32,112,97,114,101,110,116,0,67,97,110,110,111,116,32,115,101,116,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,58,32,78,111,100,101,115,32,119,105,116,104,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,99,104,105,108,100,114,101,110,46,0,67,104,105,108,100,32,97,108,114,101,97,100,121,32,104,97,115,32,97,32,112,97,114,101,110,116,44,32,105,116,32,109,117,115,116,32,98,101,32,114,101,109,111,118,101,100,32,102,105,114,115,116,46,0,67,97,110,110,111,116,32,97,100,100,32,99,104,105,108,100,58,32,78,111,100,101,115,32,119,105,116,104,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,99,104,105,108,100,114,101,110,46,0,79,110,108,121,32,108,101,97,102,32,110,111,100,101,115,32,119,105,116,104,32,99,117,115,116,111,109,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,115,104,111,117,108,100,32,109,97,110,117,97,108,108,121,32,109,97,114,107,32,116,104,101,109,115,101,108,118,101,115,32,97,115,32,100,105,114,116,121,0,67,97,110,110,111,116,32,103,101,116,32,108,97,121,111,117,116,32,112,114,111,112,101,114,116,105,101,115,32,111,102,32,109,117,108,116,105,45,101,100,103,101,32,115,104,111,114,116,104,97,110,100,115,0,123,0,108,97,121,111,117,116,58,32,123,0,119,105,100,116,104,58,32,37,103,44,32,0,104,101,105,103,104,116,58,32,37,103,44,32,0,116,111,112,58,32,37,103,44,32,0,108,101,102,116,58,32,37,103,0,109,97,114,103,105,110,58,32,91,108,58,37,103,44,116,58,37,103,44,114,58,37,103,44,98,58,37,103,44,115,116,97,114,116,58,37,103,44,101,110,100,58,37,103,93,0,98,111,114,100,101,114,58,32,91,108,58,37,103,44,116,58,37,103,44,114,58,37,103,44,98,58,37,103,44,115,116,97,114,116,58,37,103,44,101,110,100,58,37,103,93,0,112,97,100,100,105,110,103,58,32,91,108,58,37,103,44,116,58,37,103,44,114,58,37,103,44,98,58,37,103,44,115,116,97,114,116,58,37,103,44,101,110,100,58,37,103,93,0,125,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,99,111,108,117,109,110,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,99,111,108,117,109,110,45,114,101,118,101,114,115,101,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,114,111,119,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,114,111,119,45,114,101,118,101,114,115,101,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,99,101,110,116,101,114,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,115,112,97,99,101,45,97,114,111,117,110,100,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,115,112,97,99,101,45,98,101,116,119,101,101,110,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,115,116,114,101,116,99,104,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,115,116,114,101,116,99,104,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,102,108,101,120,45,115,116,97,114,116,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,115,116,114,101,116,99,104,39,44,32,0,102,108,101,120,71,114,111,119,0,102,108,101,120,83,104,114,105,110,107,0,102,108,101,120,66,97,115,105,115,0,111,118,101,114,102,108,111,119,58,32,39,104,105,100,100,101,110,39,44,32,0,111,118,101,114,102,108,111,119,58,32,39,118,105,115,105,98,108,101,39,44,32,0,111,118,101,114,102,108,111,119,58,32,39,115,99,114,111,108,108,39,44,32,0,109,97,114,103,105,110,0,109,97,114,103,105,110,76,101,102,116,0,109,97,114,103,105,110,82,105,103,104,116,0,109,97,114,103,105,110,84,111,112,0,109,97,114,103,105,110,66,111,116,116,111,109,0,109,97,114,103,105,110,83,116,97,114,116,0,109,97,114,103,105,110,69,110,100,0,112,97,100,100,105,110,103,0,112,97,100,100,105,110,103,76,101,102,116,0,112,97,100,100,105,110,103,82,105,103,104,116,0,112,97,100,100,105,110,103,84,111,112,0,112,97,100,100,105,110,103,66,111,116,116,111,109,0,112,97,100,100,105,110,103,83,116,97,114,116,0,112,97,100,100,105,110,103,69,110,100,0,98,111,114,100,101,114,87,105,100,116,104,0,98,111,114,100,101,114,76,101,102,116,87,105,100,116,104,0,98,111,114,100,101,114,82,105,103,104,116,87,105,100,116,104,0,98,111,114,100,101,114,84,111,112,87,105,100,116,104,0,98,111,114,100,101,114,66,111,116,116,111,109,87,105,100,116,104,0,98,111,114,100,101,114,83,116,97,114,116,87,105,100,116,104,0,98,111,114,100,101,114,69,110,100,87,105,100,116,104,0,119,105,100,116,104,0,104,101,105,103,104,116,0,109,97,120,87,105,100,116,104,0,109,97,120,72,101,105,103,104,116,0,109,105,110,87,105,100,116,104,0,109,105,110,72,101,105,103,104,116,0,112,111,115,105,116,105,111,110,58,32,39,97,98,115,111,108,117,116,101,39,44,32,0,108,101,102,116,0,114,105,103,104,116,0,116,111,112,0,98,111,116,116,111,109,0,99,104,105,108,100,114,101,110,58,32,91,10,0,93,125,44,10,0,125,44,10,0,112,116,0,37,0,37,115,58,32,37,103,37,115,44,32,0,67,97,110,110,111,116,32,103,101,116,32,99,111,109,112,117,116,101,100,32,118,97,108,117,101,32,111,102,32,109,117,108,116,105,45,101,100,103,101,32,115,104,111,114,116,104,97,110,100,115,0,37,115,58,32,37,103,44,32,0,32,32,0,37,115,37,100,46,123,91,115,107,105,112,112,101,100,93,32,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,97,119,58,32,37,102,32,97,104,58,32,37,102,32,61,62,32,100,58,32,40,37,102,44,32,37,102,41,32,37,115,10,0,42,0,37,115,37,100,46,123,37,115,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,97,119,58,32,37,102,32,97,104,58,32,37,102,32,37,115,10,0,37,115,37,100,46,125,37,115,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,100,58,32,40,37,102,44,32,37,102,41,32,37,115,10,0,79,117,116,32,111,102,32,99,97,99,104,101,32,101,110,116,114,105,101,115,33,0,97,118,97,105,108,97,98,108,101,87,105,100,116,104,32,105,115,32,105,110,100,101,102,105,110,105,116,101,32,115,111,32,119,105,100,116,104,77,101,97,115,117,114,101,77,111,100,101,32,109,117,115,116,32,98,101,32,89,71,77,101,97,115,117,114,101,77,111,100,101,85,110,100,101,102,105,110,101,100,0,97,118,97,105,108,97,98,108,101,72,101,105,103,104,116,32,105,115,32,105,110,100,101,102,105,110,105,116,101,32,115,111,32,104,101,105,103,104,116,77,101,97,115,117,114,101,77,111,100,101,32,109,117,115,116,32,98,101,32,89,71,77,101,97,115,117,114,101,77,111,100,101,85,110,100,101,102,105,110,101,100,0,102,108,101,120,0,115,116,114,101,116,99,104,0,97,98,115,45,109,101,97,115,117,114,101,0,97,98,115,45,108,97,121,111,117,116,0,69,120,112,101,99,116,32,99,117,115,116,111,109,32,98,97,115,101,108,105,110,101,32,102,117,110,99,116,105,111,110,32,116,111,32,110,111,116,32,114,101,116,117,114,110,32,78,97,78,0,109,101,97,115,117,114,101,0,69,120,112,101,99,116,101,100,32,110,111,100,101,32,116,111,32,104,97,118,101,32,99,117,115,116,111,109,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,0,76,65,89,95,85,78,68,69,70,73,78,69,68,0,76,65,89,95,69,88,65,67,84,76,89,0,76,65,89,95,65,84,95,77,79,83,84,0,85,78,68,69,70,73,78,69,68,0,69,88,65,67,84,76,89,0,65,84,95,77,79,83,84,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,105,110,105,116,105,97,108,0,78,111,100,101,0,99,114,101,97,116,101,0,100,101,115,116,114,111,121,0,114,101,115,101,116,0,99,111,112,121,83,116,121,108,101,0,115,101,116,80,111,115,105,116,105,111,110,84,121,112,101,0,115,101,116,80,111,115,105,116,105,111,110,0,115,101,116,80,111,115,105,116,105,111,110,80,101,114,99,101,110,116,0,115,101,116,65,108,105,103,110,67,111,110,116,101,110,116,0,115,101,116,65,108,105,103,110,73,116,101,109,115,0,115,101,116,65,108,105,103,110,83,101,108,102,0,115,101,116,70,108,101,120,68,105,114,101,99,116,105,111,110,0,115,101,116,70,108,101,120,87,114,97,112,0,115,101,116,74,117,115,116,105,102,121,67,111,110,116,101,110,116,0,115,101,116,77,97,114,103,105,110,0,115,101,116,77,97,114,103,105,110,80,101,114,99,101,110,116,0,115,101,116,77,97,114,103,105,110,65,117,116,111,0,115,101,116,79,118,101,114,102,108,111,119,0,115,101,116,68,105,115,112,108,97,121,0,115,101,116,70,108,101,120,0,115,101,116,70,108,101,120,66,97,115,105,115,0,115,101,116,70,108,101,120,66,97,115,105,115,80,101,114,99,101,110,116,0,115,101,116,70,108,101,120,71,114,111,119,0,115,101,116,70,108,101,120,83,104,114,105,110,107,0,115,101,116,87,105,100,116,104,0,115,101,116,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,87,105,100,116,104,65,117,116,111,0,115,101,116,72,101,105,103,104,116,0,115,101,116,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,72,101,105,103,104,116,65,117,116,111,0,115,101,116,77,105,110,87,105,100,116,104,0,115,101,116,77,105,110,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,77,105,110,72,101,105,103,104,116,0,115,101,116,77,105,110,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,77,97,120,87,105,100,116,104,0,115,101,116,77,97,120,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,77,97,120,72,101,105,103,104,116,0,115,101,116,77,97,120,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,65,115,112,101,99,116,82,97,116,105,111,0,115,101,116,66,111,114,100,101,114,0,115,101,116,80,97,100,100,105,110,103,0,115,101,116,80,97,100,100,105,110,103,80,101,114,99,101,110,116,0,103,101,116,80,111,115,105,116,105,111,110,84,121,112,101,0,103,101,116,80,111,115,105,116,105,111,110,0,103,101,116,65,108,105,103,110,67,111,110,116,101,110,116,0,103,101,116,65,108,105,103,110,73,116,101,109,115,0,103,101,116,65,108,105,103,110,83,101,108,102,0,103,101,116,70,108,101,120,68,105,114,101,99,116,105,111,110,0,103,101,116,70,108,101,120,87,114,97,112,0,103,101,116,74,117,115,116,105,102,121,67,111,110,116,101,110,116,0,103,101,116,77,97,114,103,105,110,0,103,101,116,70,108,101,120,66,97,115,105,115,0,103,101,116,70,108,101,120,71,114,111,119,0,103,101,116,70,108,101,120,83,104,114,105,110,107,0,103,101,116,87,105,100,116,104,0,103,101,116,72,101,105,103,104,116,0,103,101,116,77,105,110,87,105,100,116,104,0,103,101,116,77,105,110,72,101,105,103,104,116,0,103,101,116,77,97,120,87,105,100,116,104,0,103,101,116,77,97,120,72,101,105,103,104,116,0,103,101,116,65,115,112,101,99,116,82,97,116,105,111,0,103,101,116,66,111,114,100,101,114,0,103,101,116,79,118,101,114,102,108,111,119,0,103,101,116,68,105,115,112,108,97,121,0,103,101,116,80,97,100,100,105,110,103,0,105,110,115,101,114,116,67,104,105,108,100,0,114,101,109,111,118,101,67,104,105,108,100,0,103,101,116,67,104,105,108,100,67,111,117,110,116,0,103,101,116,80,97,114,101,110,116,0,103,101,116,67,104,105,108,100,0,115,101,116,77,101,97,115,117,114,101,70,117,110,99,0,117,110,115,101,116,77,101,97,115,117,114,101,70,117,110,99,0,115,101,116,72,97,115,78,101,119,76,97,121,111,117,116,0,103,101,116,72,97,115,78,101,119,76,97,121,111,117,116,0,109,97,114,107,68,105,114,116,121,0,105,115,68,105,114,116,121,0,99,97,108,99,117,108,97,116,101,76,97,121,111,117,116,0,103,101,116,67,111,109,112,117,116,101,100,76,101,102,116,0,103,101,116,67,111,109,112,117,116,101,100,82,105,103,104,116,0,103,101,116,67,111,109,112,117,116,101,100,84,111,112,0,103,101,116,67,111,109,112,117,116,101,100,66,111,116,116,111,109,0,103,101,116,67,111,109,112,117,116,101,100,87,105,100,116,104,0,103,101,116,67,111,109,112,117,116,101,100,72,101,105,103,104,116,0,103,101,116,67,111,109,112,117,116,101,100,76,97,121,111,117,116,0,103,101,116,67,111,109,112,117,116,101,100,77,97,114,103,105,110,0,103,101,116,67,111,109,112,117,116,101,100,66,111,114,100,101,114,0,103,101,116,67,111,109,112,117,116,101,100,80,97,100,100,105,110,103,0,86,97,108,117,101,0,76,97,121,111,117,116,0,83,105,122,101,0,103,101,116,73,110,115,116,97,110,99,101,67,111,117,110,116,0,105,115,69,120,112,101,114,105,109,101,110,116,97,108,70,101,97,116,117,114,101,69,110,97,98,108,101,100,0,115,101,116,69,120,112,101,114,105,109,101,110,116,97,108,70,101,97,116,117,114,101,69,110,97,98,108,101,100,0,73,110,116,54,52,0,1,1,1,2,2,4,4,4,4,8,8,4,8,118,111,105,100,0,98,111,111,108,0,115,116,100,58,58,115,116,114,105,110,103,0,99,98,70,117,110,99,116,105,111,110,32,38,0,99,111,110,115,116,32,99,98,70,117,110,99,116,105,111,110,32,38,0,69,120,116,101,114,110,97,108,0,66,117,102,102,101,114,0,78,66,105,110,100,73,68,0,78,66,105,110,100,0,98,105,110,100,95,118,97,108,117,101,0,114,101,102,108,101,99,116,0,113,117,101,114,121,84,121,112,101,0,108,97,108,108,111,99,0,108,114,101,115,101,116,0,123,114,101,116,117,114,110,40,95,110,98,105,110,100,46,99,97,108,108,98,97,99,107,83,105,103,110,97,116,117,114,101,76,105,115,116,91,36,48,93,46,97,112,112,108,121,40,116,104,105,115,44,97,114,103,117,109,101,110,116,115,41,41,59,125,0,95,110,98,105,110,100,95,110,101,119,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,46,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111,99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110,0,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);var tempDoublePtr=STATICTOP;STATICTOP+=16;function _atexit(func,arg){__ATEXIT__.unshift({func:func,arg:arg})}function ___cxa_atexit(){return _atexit.apply(null,arguments)}Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;Module["_roundf"]=_roundf;Module["_memset"]=_memset;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function __decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r}function _defineHidden(value){return(function(target,key){Object.defineProperty(target,key,{configurable:false,enumerable:false,value:value,writable:true})})}var _nbind={};function __nbind_free_external(num){_nbind.externalList[num].dereference(num)}function __nbind_reference_external(num){_nbind.externalList[num].reference()}function _llvm_stackrestore(p){var self=_llvm_stacksave;var ret=self.LLVM_SAVEDSTACKS[p];self.LLVM_SAVEDSTACKS.splice(p,1);Runtime.stackRestore(ret)}function __nbind_register_pool(pageSize,usedPtr,rootPtr,pagePtr){_nbind.Pool.pageSize=pageSize;_nbind.Pool.usedPtr=usedPtr/4;_nbind.Pool.rootPtr=rootPtr;_nbind.Pool.pagePtr=pagePtr/4;HEAP32[usedPtr/4]=16909060;if(HEAP8[usedPtr]==1)_nbind.bigEndian=true;HEAP32[usedPtr/4]=0;_nbind.makeTypeKindTbl=(_a={},_a[1024]=_nbind.PrimitiveType,_a[64]=_nbind.Int64Type,_a[2048]=_nbind.BindClass,_a[3072]=_nbind.BindClassPtr,_a[4096]=_nbind.SharedClassPtr,_a[5120]=_nbind.ArrayType,_a[6144]=_nbind.ArrayType,_a[7168]=_nbind.CStringType,_a[9216]=_nbind.CallbackType,_a[10240]=_nbind.BindType,_a);_nbind.makeTypeNameTbl={"Buffer":_nbind.BufferType,"External":_nbind.ExternalType,"Int64":_nbind.Int64Type,"_nbind_new":_nbind.CreateValueType,"bool":_nbind.BooleanType,"cbFunction &":_nbind.CallbackType,"const cbFunction &":_nbind.CallbackType,"const std::string &":_nbind.StringType,"std::string":_nbind.StringType};Module["toggleLightGC"]=_nbind.toggleLightGC;_nbind.callUpcast=Module["dynCall_ii"];var globalScope=_nbind.makeType(_nbind.constructType,{flags:2048,id:0,name:""});globalScope.proto=Module;_nbind.BindClass.list.push(globalScope);var _a}function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setTimeout(){var timeUntilNextTick=Math.max(0,Browser.mainLoop.tickStartTime+value-_emscripten_get_now())|0;setTimeout(Browser.mainLoop.runner,timeUntilNextTick)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_rAF(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}else if(mode==2){if(!window["setImmediate"]){var setImmediates=[];var emscriptenMainLoopMessageId="setimmediate";function Browser_setImmediate_messageHandler(event){if(event.source===window&&event.data===emscriptenMainLoopMessageId){event.stopPropagation();setImmediates.shift()()}}window.addEventListener("message",Browser_setImmediate_messageHandler,true);window["setImmediate"]=function Browser_emulated_setImmediate(func){setImmediates.push(func);if(ENVIRONMENT_IS_WORKER){if(Module["setImmediates"]===undefined)Module["setImmediates"]=[];Module["setImmediates"].push(func);window.postMessage({target:emscriptenMainLoopMessageId})}else window.postMessage(emscriptenMainLoopMessageId,"*")}}Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setImmediate(){window["setImmediate"](Browser.mainLoop.runner)};Browser.mainLoop.method="immediate"}return 0}function _emscripten_get_now(){abort()}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop,arg,noSetTiming){Module["noExitRuntime"]=true;assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=func;Browser.mainLoop.arg=arg;var browserIterationFunc;if(typeof arg!=="undefined"){browserIterationFunc=(function(){Module["dynCall_vi"](func,arg)})}else{browserIterationFunc=(function(){Module["dynCall_v"](func)})}var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}console.log('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;setTimeout(Browser.mainLoop.runner,0);return}if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}else if(Browser.mainLoop.timingMode==0){Browser.mainLoop.tickStartTime=_emscripten_get_now()}if(Browser.mainLoop.method==="timeout"&&Module.ctx){Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");Browser.mainLoop.method=""}Browser.mainLoop.runIter(browserIterationFunc);if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;if(typeof SDL==="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(!noSetTiming){if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler()}if(simulateInfiniteLoop){throw"SimulateInfiniteLoop"}}var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:(function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++}),resume:(function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;_emscripten_set_main_loop(func,0,false,Browser.mainLoop.arg,true);_emscripten_set_main_loop_timing(timingMode,timingValue);Browser.mainLoop.scheduler()}),updateStatus:(function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}}),runIter:(function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}try{func()}catch(e){if(e instanceof ExitStatus){return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}if(Module["postMainLoop"])Module["postMainLoop"]()})},isFullscreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:(function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==="undefined"){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([(new Uint8Array(byteArray)).buffer],{type:Browser.getMimetype(name)})}}catch(e){Runtime.warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append((new Uint8Array(byteArray)).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=function img_onload(){assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)};img.onerror=function img_onerror(event){console.log("Image "+url+" could not be decoded");if(onerror)onerror()};img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",(function(){finish(audio)}),false);audio.onerror=function audio_onerror(event){if(done)return;console.log("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;Browser.safeSetTimeout((function(){finish(audio)}),1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===Module["canvas"]||document["mozPointerLockElement"]===Module["canvas"]||document["webkitPointerLockElement"]===Module["canvas"]||document["msPointerLockElement"]===Module["canvas"]}var canvas=Module["canvas"];if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||(function(){});canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||(function(){});canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",(function(ev){if(!Browser.pointerLock&&Module["canvas"].requestPointerLock){Module["canvas"].requestPointerLock();ev.preventDefault()}}),false)}}}),createContext:(function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx==="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach((function(callback){callback()}));Browser.init()}return ctx}),destroyContext:(function(canvas,useWebGL,setInModule){}),fullscreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullscreen:(function(lockPointer,resizeCanvas,vrDevice){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;Browser.vrDevice=vrDevice;if(typeof Browser.lockPointer==="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas==="undefined")Browser.resizeCanvas=false;if(typeof Browser.vrDevice==="undefined")Browser.vrDevice=null;var canvas=Module["canvas"];function fullscreenChange(){Browser.isFullscreen=false;var canvasContainer=canvas.parentNode;if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.exitFullscreen=document["exitFullscreen"]||document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["msExitFullscreen"]||document["webkitCancelFullScreen"]||(function(){});canvas.exitFullscreen=canvas.exitFullscreen.bind(document);if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullscreen=true;if(Browser.resizeCanvas)Browser.setFullscreenCanvasSize()}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas)Browser.setWindowedCanvasSize()}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullscreen);if(Module["onFullscreen"])Module["onFullscreen"](Browser.isFullscreen);Browser.updateCanvasDimensions(canvas)}if(!Browser.fullscreenHandlersInstalled){Browser.fullscreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullscreenChange,false);document.addEventListener("mozfullscreenchange",fullscreenChange,false);document.addEventListener("webkitfullscreenchange",fullscreenChange,false);document.addEventListener("MSFullscreenChange",fullscreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullscreen=canvasContainer["requestFullscreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullscreen"]?(function(){canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null)||(canvasContainer["webkitRequestFullScreen"]?(function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null);if(vrDevice){canvasContainer.requestFullscreen({vrDisplay:vrDevice})}else{canvasContainer.requestFullscreen()}}),requestFullScreen:(function(lockPointer,resizeCanvas,vrDevice){Module.printErr("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");Browser.requestFullScreen=(function(lockPointer,resizeCanvas,vrDevice){return Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)});return Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)}),nextRAF:0,fakeRequestAnimationFrame:(function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)}),requestAnimationFrame:function requestAnimationFrame(func){if(typeof window==="undefined"){Browser.fakeRequestAnimationFrame(func)}else{if(!window.requestAnimationFrame){window.requestAnimationFrame=window["requestAnimationFrame"]||window["mozRequestAnimationFrame"]||window["webkitRequestAnimationFrame"]||window["msRequestAnimationFrame"]||window["oRequestAnimationFrame"]||Browser.fakeRequestAnimationFrame}window.requestAnimationFrame(func)}},safeCallback:(function(func){return(function(){if(!ABORT)return func.apply(null,arguments)})}),allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=false}),resumeAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=true;if(Browser.queuedAsyncCallbacks.length>0){var callbacks=Browser.queuedAsyncCallbacks;Browser.queuedAsyncCallbacks=[];callbacks.forEach((function(func){func()}))}}),safeRequestAnimationFrame:(function(func){return Browser.requestAnimationFrame((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}))}),safeSetTimeout:(function(func,timeout){Module["noExitRuntime"]=true;return setTimeout((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}),timeout)}),safeSetInterval:(function(func,timeout){Module["noExitRuntime"]=true;return setInterval((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}}),timeout)}),getMimetype:(function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]}),getUserMedia:(function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)}),getMovementX:(function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0}),getMovementY:(function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0}),getMouseWheelDelta:(function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail;break;case"mousewheel":delta=event.wheelDelta;break;case"wheel":delta=event["deltaY"];break;default:throw"unrecognized mouse wheel event: "+event.type}return delta}),mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:(function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!=="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!=="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){var last=Browser.touches[touch.identifier];if(!last)last=coords;Browser.lastTouches[touch.identifier]=last;Browser.touches[touch.identifier]=coords}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}}),asyncLoad:(function(url,onload,onerror,noRunDep){var dep=!noRunDep?getUniqueRunDependency("al "+url):"";Module["readAsync"](url,(function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency(dep)}),(function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}}));if(dep)addRunDependency(dep)}),resizeListeners:[],updateResizeListeners:(function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach((function(listener){listener(canvas.width,canvas.height)}))}),setCanvasSize:(function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()}),windowedWidth:0,windowedHeight:0,setFullscreenCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags|8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),setWindowedCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags&~8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),updateCanvasDimensions:(function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}}),wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:(function(){var handle=Browser.nextWgetRequestHandle;Browser.nextWgetRequestHandle++;return handle})};var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}Module["_bitshift64Lshr"]=_bitshift64Lshr;function _typeModule(self){var structureList=[[0,1,"X"],[1,1,"const X"],[128,1,"X *"],[256,1,"X &"],[384,1,"X &&"],[512,1,"std::shared_ptr<X>"],[640,1,"std::unique_ptr<X>"],[5120,1,"std::vector<X>"],[6144,2,"std::array<X, Y>"],[9216,-1,"std::function<X (Y)>"]];function applyStructure(outerName,outerFlags,innerName,innerFlags,param,flip){if(outerFlags==1){var ref=innerFlags&896;if(ref==128||ref==256||ref==384)outerName="X const"}var name;if(flip){name=innerName.replace("X",outerName).replace("Y",param)}else{name=outerName.replace("X",innerName).replace("Y",param)}return name.replace(/([*&]) (?=[*&])/g,"$1")}function reportProblem(problem,id,kind,structureType,place){throw new Error(problem+" type "+kind.replace("X",id+"?")+(structureType?" with flag "+structureType:"")+" in "+place)}function getComplexType(id,constructType,getType,queryType,place,kind,prevStructure,depth){if(kind===void 0){kind="X"}if(depth===void 0){depth=1}var result=getType(id);if(result)return result;var query=queryType(id);var structureType=query.placeholderFlag;var structure=structureList[structureType];if(prevStructure&&structure){kind=applyStructure(prevStructure[2],prevStructure[0],kind,structure[0],"?",true)}var problem;if(structureType==0)problem="Unbound";if(structureType>=10)problem="Corrupt";if(depth>20)problem="Deeply nested";if(problem)reportProblem(problem,id,kind,structureType,place||"?");var subId=query.paramList[0];var subType=getComplexType(subId,constructType,getType,queryType,place,kind,structure,depth+1);var srcSpec;var spec={flags:structure[0],id:id,name:"",paramList:[subType]};var argList=[];var structureParam="?";switch(query.placeholderFlag){case 1:srcSpec=subType.spec;break;case 2:if((subType.flags&15360)==1024&&subType.spec.ptrSize==1){spec.flags=7168;break};case 3:case 6:case 5:srcSpec=subType.spec;if((subType.flags&15360)!=2048){}break;case 8:structureParam=""+query.paramList[1];spec.paramList.push(query.paramList[1]);break;case 9:for(var _i=0,_a=query.paramList[1];_i<_a.length;_i++){var paramId=_a[_i];var paramType=getComplexType(paramId,constructType,getType,queryType,place,kind,structure,depth+1);argList.push(paramType.name);spec.paramList.push(paramType)}structureParam=argList.join(", ");break;default:break}spec.name=applyStructure(structure[2],structure[0],subType.name,subType.flags,structureParam);if(srcSpec){for(var _b=0,_c=Object.keys(srcSpec);_b<_c.length;_b++){var key=_c[_b];spec[key]=spec[key]||srcSpec[key]}spec.flags|=srcSpec.flags}return makeType(constructType,spec)}function makeType(constructType,spec){var flags=spec.flags;var refKind=flags&896;var kind=flags&15360;if(!spec.name&&kind==1024){if(spec.ptrSize==1){spec.name=(flags&16?"":(flags&8?"un":"")+"signed ")+"char"}else{spec.name=(flags&8?"u":"")+(flags&32?"float":"int")+(spec.ptrSize*8+"_t")}}if(spec.ptrSize==8&&!(flags&32))kind=64;if(kind==2048){if(refKind==512||refKind==640){kind=4096}else if(refKind)kind=3072}return constructType(kind,spec)}var Type=(function(){function Type(spec){this.id=spec.id;this.name=spec.name;this.flags=spec.flags;this.spec=spec}Type.prototype.toString=(function(){return this.name});return Type})();var output={Type:Type,getComplexType:getComplexType,makeType:makeType,structureList:structureList};self.output=output;return self.output||output}function __nbind_register_type(id,namePtr){var name=_nbind.readAsciiString(namePtr);var spec={flags:10240,id:id,name:name};_nbind.makeType(_nbind.constructType,spec)}function __nbind_register_callback_signature(typeListPtr,typeCount){var typeList=_nbind.readTypeIdList(typeListPtr,typeCount);var num=_nbind.callbackSignatureList.length;_nbind.callbackSignatureList[num]=_nbind.makeJSCaller(typeList);return num}function __extends(Class,Parent){for(var key in Parent)if(Parent.hasOwnProperty(key))Class[key]=Parent[key];function Base(){this.constructor=Class}Base.prototype=Parent.prototype;Class.prototype=new Base}function __nbind_register_class(idListPtr,policyListPtr,superListPtr,upcastListPtr,superCount,destructorPtr,namePtr){var name=_nbind.readAsciiString(namePtr);var policyTbl=_nbind.readPolicyList(policyListPtr);var idList=HEAPU32.subarray(idListPtr/4,idListPtr/4+2);var spec={flags:2048|(policyTbl["Value"]?2:0),id:idList[0],name:name};var bindClass=_nbind.makeType(_nbind.constructType,spec);bindClass.ptrType=_nbind.getComplexType(idList[1],_nbind.constructType,_nbind.getType,_nbind.queryType);bindClass.destroy=_nbind.makeMethodCaller(bindClass.ptrType,{boundID:spec.id,flags:0,name:"destroy",num:0,ptr:destructorPtr,title:bindClass.name+".free",typeList:["void","uint32_t","uint32_t"]});if(superCount){bindClass.superIdList=Array.prototype.slice.call(HEAPU32.subarray(superListPtr/4,superListPtr/4+superCount));bindClass.upcastList=Array.prototype.slice.call(HEAPU32.subarray(upcastListPtr/4,upcastListPtr/4+superCount))}Module[bindClass.name]=bindClass.makeBound(policyTbl);_nbind.BindClass.list.push(bindClass)}function _removeAccessorPrefix(name){var prefixMatcher=/^[Gg]et_?([A-Z]?([A-Z]?))/;return name.replace(prefixMatcher,(function(match,initial,second){return second?initial:initial.toLowerCase()}))}function __nbind_register_function(boundID,policyListPtr,typeListPtr,typeCount,ptr,direct,signatureType,namePtr,num,flags){var bindClass=_nbind.getType(boundID);var policyTbl=_nbind.readPolicyList(policyListPtr);var typeList=_nbind.readTypeIdList(typeListPtr,typeCount);var specList;if(signatureType==5){specList=[{direct:ptr,name:"__nbindConstructor",ptr:0,title:bindClass.name+" constructor",typeList:["uint32_t"].concat(typeList.slice(1))},{direct:direct,name:"__nbindValueConstructor",ptr:0,title:bindClass.name+" value constructor",typeList:["void","uint32_t"].concat(typeList.slice(1))}]}else{var name=_nbind.readAsciiString(namePtr);var title=(bindClass.name&&bindClass.name+".")+name;if(signatureType==3||signatureType==4){name=_removeAccessorPrefix(name)}specList=[{boundID:boundID,direct:direct,name:name,ptr:ptr,title:title,typeList:typeList}]}for(var _i=0,specList_1=specList;_i<specList_1.length;_i++){var spec=specList_1[_i];spec.signatureType=signatureType;spec.policyTbl=policyTbl;spec.num=num;spec.flags=flags;bindClass.addMethod(spec)}}function _nbind_value(name,proto){if(!_nbind.typeNameTbl[name])_nbind.throwError("Unknown value type "+name);Module["NBind"].bind_value(name,proto);_defineHidden(_nbind.typeNameTbl[name].proto.prototype.__nbindValueConstructor)(proto.prototype,"__nbindValueConstructor")}Module["_nbind_value"]=_nbind_value;function __nbind_get_value_object(num,ptr){var obj=_nbind.popValue(num);if(!obj.fromJS){throw new Error("Object "+obj+" has no fromJS function")}obj.fromJS((function(){obj.__nbindValueConstructor.apply(this,Array.prototype.concat.apply([ptr],arguments))}))}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;function __nbind_register_primitive(id,size,flags){var spec={flags:1024|flags,id:id,ptrSize:size};_nbind.makeType(_nbind.constructType,spec)}var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);Module["_llvm_cttz_i32"]=_llvm_cttz_i32;Module["___udivmoddi4"]=___udivmoddi4;Module["___udivdi3"]=___udivdi3;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}Module["_sbrk"]=_sbrk;function _llvm_stacksave(){var self=_llvm_stacksave;if(!self.LLVM_SAVEDSTACKS){self.LLVM_SAVEDSTACKS=[]}self.LLVM_SAVEDSTACKS.push(Runtime.stackSave());return self.LLVM_SAVEDSTACKS.length-1}Module["___uremdi3"]=___uremdi3;Module["_llvm_bswap_i32"]=_llvm_bswap_i32;function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];___syscall146.printChar=(function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}})}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function __nbind_finish(){for(var _i=0,_a=_nbind.BindClass.list;_i<_a.length;_i++){var bindClass=_a[_i];bindClass.finish()}}var ___dso_handle=STATICTOP;STATICTOP+=16;((function(_nbind){var typeIdTbl={};_nbind.typeNameTbl={};var Pool=(function(){function Pool(){}Pool.lalloc=(function(size){size=size+7&~7;var used=HEAPU32[Pool.usedPtr];if(size>Pool.pageSize/2||size>Pool.pageSize-used){var NBind=_nbind.typeNameTbl["NBind"].proto;return NBind.lalloc(size)}else{HEAPU32[Pool.usedPtr]=used+size;return Pool.rootPtr+used}});Pool.lreset=(function(used,page){var topPage=HEAPU32[Pool.pagePtr];if(topPage){var NBind=_nbind.typeNameTbl["NBind"].proto;NBind.lreset(used,page)}else{HEAPU32[Pool.usedPtr]=used}});return Pool})();_nbind.Pool=Pool;function constructType(kind,spec){var construct=kind==10240?_nbind.makeTypeNameTbl[spec.name]||_nbind.BindType:_nbind.makeTypeKindTbl[kind];var bindType=new construct(spec);typeIdTbl[spec.id]=bindType;_nbind.typeNameTbl[spec.name]=bindType;return bindType}_nbind.constructType=constructType;function getType(id){return typeIdTbl[id]}_nbind.getType=getType;function queryType(id){var placeholderFlag=HEAPU8[id];var paramCount=_nbind.structureList[placeholderFlag][1];id/=4;if(paramCount<0){++id;paramCount=HEAPU32[id]+1}var paramList=Array.prototype.slice.call(HEAPU32.subarray(id+1,id+1+paramCount));if(placeholderFlag==9){paramList=[paramList[0],paramList.slice(1)]}return{paramList:paramList,placeholderFlag:placeholderFlag}}_nbind.queryType=queryType;function getTypes(idList,place){return idList.map((function(id){return typeof id=="number"?_nbind.getComplexType(id,constructType,getType,queryType,place):_nbind.typeNameTbl[id]}))}_nbind.getTypes=getTypes;function readTypeIdList(typeListPtr,typeCount){return Array.prototype.slice.call(HEAPU32,typeListPtr/4,typeListPtr/4+typeCount)}_nbind.readTypeIdList=readTypeIdList;function readAsciiString(ptr){var endPtr=ptr;while(HEAPU8[endPtr++]);return String.fromCharCode.apply("",HEAPU8.subarray(ptr,endPtr-1))}_nbind.readAsciiString=readAsciiString;function readPolicyList(policyListPtr){var policyTbl={};if(policyListPtr){while(1){var namePtr=HEAPU32[policyListPtr/4];if(!namePtr)break;policyTbl[readAsciiString(namePtr)]=true;policyListPtr+=4}}return policyTbl}_nbind.readPolicyList=readPolicyList;function getDynCall(typeList,name){var mangleMap={float32_t:"d",float64_t:"d",int64_t:"d",uint64_t:"d","void":"v"};var signature=typeList.map((function(type){return mangleMap[type.name]||"i"})).join("");var dynCall=Module["dynCall_"+signature];if(!dynCall){throw new Error("dynCall_"+signature+" not found for "+name+"("+typeList.map((function(type){return type.name})).join(", ")+")")}return dynCall}_nbind.getDynCall=getDynCall;function addMethod(obj,name,func,arity){var overload=obj[name];if(obj.hasOwnProperty(name)&&overload){if(overload.arity||overload.arity===0){overload=_nbind.makeOverloader(overload,overload.arity);obj[name]=overload}overload.addMethod(func,arity)}else{func.arity=arity;obj[name]=func}}_nbind.addMethod=addMethod;function throwError(message){throw new Error(message)}_nbind.throwError=throwError;_nbind.bigEndian=false;_a=_typeModule(_typeModule),_nbind.Type=_a.Type,_nbind.makeType=_a.makeType,_nbind.getComplexType=_a.getComplexType,_nbind.structureList=_a.structureList;var BindType=(function(_super){__extends(BindType,_super);function BindType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.heap=HEAPU32;_this.ptrSize=4;return _this}BindType.prototype.needsWireRead=(function(policyTbl){return!!this.wireRead||!!this.makeWireRead});BindType.prototype.needsWireWrite=(function(policyTbl){return!!this.wireWrite||!!this.makeWireWrite});return BindType})(_nbind.Type);_nbind.BindType=BindType;var PrimitiveType=(function(_super){__extends(PrimitiveType,_super);function PrimitiveType(spec){var _this=_super.call(this,spec)||this;var heapTbl=spec.flags&32?{32:HEAPF32,64:HEAPF64}:spec.flags&8?{8:HEAPU8,16:HEAPU16,32:HEAPU32}:{8:HEAP8,16:HEAP16,32:HEAP32};_this.heap=heapTbl[spec.ptrSize*8];_this.ptrSize=spec.ptrSize;return _this}PrimitiveType.prototype.needsWireWrite=(function(policyTbl){return!!policyTbl&&!!policyTbl["Strict"]});PrimitiveType.prototype.makeWireWrite=(function(expr,policyTbl){return policyTbl&&policyTbl["Strict"]&&(function(arg){if(typeof arg=="number")return arg;throw new Error("Type mismatch")})});return PrimitiveType})(BindType);_nbind.PrimitiveType=PrimitiveType;function pushCString(str,policyTbl){if(str===null||str===undefined){if(policyTbl&&policyTbl["Nullable"]){return 0}else throw new Error("Type mismatch")}if(policyTbl&&policyTbl["Strict"]){if(typeof str!="string")throw new Error("Type mismatch")}else str=str.toString();var length=Module.lengthBytesUTF8(str)+1;var result=_nbind.Pool.lalloc(length);Module.stringToUTF8Array(str,HEAPU8,result,length);return result}_nbind.pushCString=pushCString;function popCString(ptr){if(ptr===0)return null;return Module.Pointer_stringify(ptr)}_nbind.popCString=popCString;var CStringType=(function(_super){__extends(CStringType,_super);function CStringType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popCString;_this.wireWrite=pushCString;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}CStringType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushCString(arg,policyTbl)})});return CStringType})(BindType);_nbind.CStringType=CStringType;var BooleanType=(function(_super){__extends(BooleanType,_super);function BooleanType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=(function(arg){return!!arg});return _this}BooleanType.prototype.needsWireWrite=(function(policyTbl){return!!policyTbl&&!!policyTbl["Strict"]});BooleanType.prototype.makeWireRead=(function(expr){return"!!("+expr+")"});BooleanType.prototype.makeWireWrite=(function(expr,policyTbl){return policyTbl&&policyTbl["Strict"]&&(function(arg){if(typeof arg=="boolean")return arg;throw new Error("Type mismatch")})||expr});return BooleanType})(BindType);_nbind.BooleanType=BooleanType;var Wrapper=(function(){function Wrapper(){}Wrapper.prototype.persist=(function(){this.__nbindState|=1});return Wrapper})();_nbind.Wrapper=Wrapper;function makeBound(policyTbl,bindClass){var Bound=(function(_super){__extends(Bound,_super);function Bound(marker,flags,ptr,shared){var _this=_super.call(this)||this;if(!(_this instanceof Bound)){return new(Function.prototype.bind.apply(Bound,Array.prototype.concat.apply([null],arguments)))}var nbindFlags=flags;var nbindPtr=ptr;var nbindShared=shared;if(marker!==_nbind.ptrMarker){var wirePtr=_this.__nbindConstructor.apply(_this,arguments);nbindFlags=4096|512;nbindShared=HEAPU32[wirePtr/4];nbindPtr=HEAPU32[wirePtr/4+1]}var spec={configurable:true,enumerable:false,value:null,writable:false};var propTbl={"__nbindFlags":nbindFlags,"__nbindPtr":nbindPtr};if(nbindShared){propTbl["__nbindShared"]=nbindShared;_nbind.mark(_this)}for(var _i=0,_a=Object.keys(propTbl);_i<_a.length;_i++){var key=_a[_i];spec.value=propTbl[key];Object.defineProperty(_this,key,spec)}_defineHidden(0)(_this,"__nbindState");return _this}Bound.prototype.free=(function(){bindClass.destroy.call(this,this.__nbindShared,this.__nbindFlags);this.__nbindState|=2;disableMember(this,"__nbindShared");disableMember(this,"__nbindPtr")});return Bound})(Wrapper);__decorate([_defineHidden()],Bound.prototype,"__nbindConstructor",void 0);__decorate([_defineHidden()],Bound.prototype,"__nbindValueConstructor",void 0);__decorate([_defineHidden(policyTbl)],Bound.prototype,"__nbindPolicies",void 0);return Bound}_nbind.makeBound=makeBound;function disableMember(obj,name){function die(){throw new Error("Accessing deleted object")}Object.defineProperty(obj,name,{configurable:false,enumerable:false,get:die,set:die})}_nbind.ptrMarker={};var BindClass=(function(_super){__extends(BindClass,_super);function BindClass(spec){var _this=_super.call(this,spec)||this;_this.wireRead=(function(arg){return _nbind.popValue(arg,_this.ptrType)});_this.wireWrite=(function(arg){return pushPointer(arg,_this.ptrType,true)});_this.pendingSuperCount=0;_this.ready=false;_this.methodTbl={};if(spec.paramList){_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto}else _this.classType=_this;return _this}BindClass.prototype.makeBound=(function(policyTbl){var Bound=_nbind.makeBound(policyTbl,this);this.proto=Bound;this.ptrType.proto=Bound;return Bound});BindClass.prototype.addMethod=(function(spec){var overloadList=this.methodTbl[spec.name]||[];overloadList.push(spec);this.methodTbl[spec.name]=overloadList});BindClass.prototype.registerMethods=(function(src,staticOnly){var setter;for(var _i=0,_a=Object.keys(src.methodTbl);_i<_a.length;_i++){var name=_a[_i];var overloadList=src.methodTbl[name];for(var _b=0,overloadList_1=overloadList;_b<overloadList_1.length;_b++){var spec=overloadList_1[_b];var target=void 0;var caller=void 0;target=this.proto.prototype;if(staticOnly&&spec.signatureType!=1)continue;switch(spec.signatureType){case 1:target=this.proto;case 5:caller=_nbind.makeCaller(spec);_nbind.addMethod(target,spec.name,caller,spec.typeList.length-1);break;case 4:setter=_nbind.makeMethodCaller(src.ptrType,spec);break;case 3:Object.defineProperty(target,spec.name,{configurable:true,enumerable:false,get:_nbind.makeMethodCaller(src.ptrType,spec),set:setter});break;case 2:caller=_nbind.makeMethodCaller(src.ptrType,spec);_nbind.addMethod(target,spec.name,caller,spec.typeList.length-1);break;default:break}}}});BindClass.prototype.registerSuperMethods=(function(src,firstSuper,visitTbl){if(visitTbl[src.name])return;visitTbl[src.name]=true;var superNum=0;var nextFirst;for(var _i=0,_a=src.superIdList||[];_i<_a.length;_i++){var superId=_a[_i];var superClass=_nbind.getType(superId);if(superNum++<firstSuper||firstSuper<0){nextFirst=-1}else{nextFirst=0}this.registerSuperMethods(superClass,nextFirst,visitTbl)}this.registerMethods(src,firstSuper<0)});BindClass.prototype.finish=(function(){if(this.ready)return this;this.ready=true;this.superList=(this.superIdList||[]).map((function(superId){return _nbind.getType(superId).finish()}));var Bound=this.proto;if(this.superList.length){var Proto=(function(){this.constructor=Bound});Proto.prototype=this.superList[0].proto.prototype;Bound.prototype=new Proto}if(Bound!=Module)Bound.prototype.__nbindType=this;this.registerSuperMethods(this,1,{});return this});BindClass.prototype.upcastStep=(function(dst,ptr){if(dst==this)return ptr;for(var i=0;i<this.superList.length;++i){var superPtr=this.superList[i].upcastStep(dst,_nbind.callUpcast(this.upcastList[i],ptr));if(superPtr)return superPtr}return 0});return BindClass})(_nbind.BindType);BindClass.list=[];_nbind.BindClass=BindClass;function popPointer(ptr,type){return ptr?new type.proto(_nbind.ptrMarker,type.flags,ptr):null}_nbind.popPointer=popPointer;function pushPointer(obj,type,tryValue){if(!(obj instanceof _nbind.Wrapper)){if(tryValue){return _nbind.pushValue(obj)}else throw new Error("Type mismatch")}var ptr=obj.__nbindPtr;var objType=obj.__nbindType.classType;var classType=type.classType;if(obj instanceof type.proto){while(objType!=classType){ptr=_nbind.callUpcast(objType.upcastList[0],ptr);objType=objType.superList[0]}}else{ptr=objType.upcastStep(classType,ptr);if(!ptr)throw new Error("Type mismatch")}return ptr}_nbind.pushPointer=pushPointer;function pushMutablePointer(obj,type){var ptr=pushPointer(obj,type);if(obj.__nbindFlags&1){throw new Error("Passing a const value as a non-const argument")}return ptr}var BindClassPtr=(function(_super){__extends(BindClassPtr,_super);function BindClassPtr(spec){var _this=_super.call(this,spec)||this;_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto;var isConst=spec.flags&1;var isValue=(_this.flags&896)==256&&spec.flags&2;var push=isConst?pushPointer:pushMutablePointer;var pop=isValue?_nbind.popValue:popPointer;_this.makeWireWrite=(function(expr,policyTbl){return policyTbl["Nullable"]?(function(arg){return arg?push(arg,_this):0}):(function(arg){return push(arg,_this)})});_this.wireRead=(function(arg){return pop(arg,_this)});_this.wireWrite=(function(arg){return push(arg,_this)});return _this}return BindClassPtr})(_nbind.BindType);_nbind.BindClassPtr=BindClassPtr;function popShared(ptr,type){var shared=HEAPU32[ptr/4];var unsafe=HEAPU32[ptr/4+1];return unsafe?new type.proto(_nbind.ptrMarker,type.flags,unsafe,shared):null}_nbind.popShared=popShared;function pushShared(obj,type){if(!(obj instanceof type.proto))throw new Error("Type mismatch");return obj.__nbindShared}function pushMutableShared(obj,type){if(!(obj instanceof type.proto))throw new Error("Type mismatch");if(obj.__nbindFlags&1){throw new Error("Passing a const value as a non-const argument")}return obj.__nbindShared}var SharedClassPtr=(function(_super){__extends(SharedClassPtr,_super);function SharedClassPtr(spec){var _this=_super.call(this,spec)||this;_this.readResources=[_nbind.resources.pool];_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto;var isConst=spec.flags&1;var push=isConst?pushShared:pushMutableShared;_this.wireRead=(function(arg){return popShared(arg,_this)});_this.wireWrite=(function(arg){return push(arg,_this)});return _this}return SharedClassPtr})(_nbind.BindType);_nbind.SharedClassPtr=SharedClassPtr;_nbind.externalList=[0];var firstFreeExternal=0;var External=(function(){function External(data){this.refCount=1;this.data=data}External.prototype.register=(function(){var num=firstFreeExternal;if(num){firstFreeExternal=_nbind.externalList[num]}else num=_nbind.externalList.length;_nbind.externalList[num]=this;return num});External.prototype.reference=(function(){++this.refCount});External.prototype.dereference=(function(num){if(--this.refCount==0){if(this.free)this.free();_nbind.externalList[num]=firstFreeExternal;firstFreeExternal=num}});return External})();_nbind.External=External;function popExternal(num){var obj=_nbind.externalList[num];obj.dereference(num);return obj.data}function pushExternal(obj){var external=new External(obj);external.reference();return external.register()}var ExternalType=(function(_super){__extends(ExternalType,_super);function ExternalType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popExternal;_this.wireWrite=pushExternal;return _this}return ExternalType})(_nbind.BindType);_nbind.ExternalType=ExternalType;_nbind.callbackSignatureList=[];var CallbackType=(function(_super){__extends(CallbackType,_super);function CallbackType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=(function(func){if(typeof func!="function")_nbind.throwError("Type mismatch");return(new _nbind.External(func)).register()});return _this}return CallbackType})(_nbind.BindType);_nbind.CallbackType=CallbackType;_nbind.valueList=[0];var firstFreeValue=0;function pushValue(value){var num=firstFreeValue;if(num){firstFreeValue=_nbind.valueList[num]}else num=_nbind.valueList.length;_nbind.valueList[num]=value;return num*2+1}_nbind.pushValue=pushValue;function popValue(num,type){if(!num)_nbind.throwError("Value type JavaScript class is missing or not registered");if(num&1){num>>=1;var obj=_nbind.valueList[num];_nbind.valueList[num]=firstFreeValue;firstFreeValue=num;return obj}else if(type){return _nbind.popShared(num,type)}else throw new Error("Invalid value slot "+num)}_nbind.popValue=popValue;var valueBase=0x10000000000000000;function push64(num){if(typeof num=="number")return num;return pushValue(num)*4096+valueBase}function pop64(num){if(num<valueBase)return num;return popValue((num-valueBase)/4096)}var CreateValueType=(function(_super){__extends(CreateValueType,_super);function CreateValueType(){return _super!==null&&_super.apply(this,arguments)||this}CreateValueType.prototype.makeWireWrite=(function(expr){return"(_nbind.pushValue(new "+expr+"))"});return CreateValueType})(_nbind.BindType);_nbind.CreateValueType=CreateValueType;var Int64Type=(function(_super){__extends(Int64Type,_super);function Int64Type(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=push64;_this.wireRead=pop64;return _this}return Int64Type})(_nbind.BindType);_nbind.Int64Type=Int64Type;function pushArray(arr,type){if(!arr)return 0;var length=arr.length;if((type.size||type.size===0)&&length<type.size){throw new Error("Type mismatch")}var ptrSize=type.memberType.ptrSize;var result=_nbind.Pool.lalloc(4+length*ptrSize);HEAPU32[result/4]=length;var heap=type.memberType.heap;var ptr=(result+4)/ptrSize;var wireWrite=type.memberType.wireWrite;var num=0;if(wireWrite){while(num<length){heap[ptr++]=wireWrite(arr[num++])}}else{while(num<length){heap[ptr++]=arr[num++]}}return result}_nbind.pushArray=pushArray;function popArray(ptr,type){if(ptr===0)return null;var length=HEAPU32[ptr/4];var arr=new Array(length);var heap=type.memberType.heap;ptr=(ptr+4)/type.memberType.ptrSize;var wireRead=type.memberType.wireRead;var num=0;if(wireRead){while(num<length){arr[num++]=wireRead(heap[ptr++])}}else{while(num<length){arr[num++]=heap[ptr++]}}return arr}_nbind.popArray=popArray;var ArrayType=(function(_super){__extends(ArrayType,_super);function ArrayType(spec){var _this=_super.call(this,spec)||this;_this.wireRead=(function(arg){return popArray(arg,_this)});_this.wireWrite=(function(arg){return pushArray(arg,_this)});_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];_this.memberType=spec.paramList[0];if(spec.paramList[1])_this.size=spec.paramList[1];return _this}return ArrayType})(_nbind.BindType);_nbind.ArrayType=ArrayType;function pushString(str,policyTbl){if(str===null||str===undefined){if(policyTbl&&policyTbl["Nullable"]){str=""}else throw new Error("Type mismatch")}if(policyTbl&&policyTbl["Strict"]){if(typeof str!="string")throw new Error("Type mismatch")}else str=str.toString();var length=Module.lengthBytesUTF8(str);var result=_nbind.Pool.lalloc(4+length+1);HEAPU32[result/4]=length;Module.stringToUTF8Array(str,HEAPU8,result+4,length+1);return result}_nbind.pushString=pushString;function popString(ptr){if(ptr===0)return null;var length=HEAPU32[ptr/4];return Module.Pointer_stringify(ptr+4,length)}_nbind.popString=popString;var StringType=(function(_super){__extends(StringType,_super);function StringType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popString;_this.wireWrite=pushString;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}StringType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushString(arg,policyTbl)})});return StringType})(_nbind.BindType);_nbind.StringType=StringType;function makeArgList(argCount){return Array.apply(null,Array(argCount)).map((function(dummy,num){return"a"+(num+1)}))}function anyNeedsWireWrite(typeList,policyTbl){return typeList.reduce((function(result,type){return result||type.needsWireWrite(policyTbl)}),false)}function anyNeedsWireRead(typeList,policyTbl){return typeList.reduce((function(result,type){return result||!!type.needsWireRead(policyTbl)}),false)}function makeWireRead(convertParamList,policyTbl,type,expr){var paramNum=convertParamList.length;if(type.makeWireRead){return type.makeWireRead(expr,convertParamList,paramNum)}else if(type.wireRead){convertParamList[paramNum]=type.wireRead;return"(convertParamList["+paramNum+"]("+expr+"))"}else return expr}function makeWireWrite(convertParamList,policyTbl,type,expr){var wireWrite;var paramNum=convertParamList.length;if(type.makeWireWrite){wireWrite=type.makeWireWrite(expr,policyTbl,convertParamList,paramNum)}else wireWrite=type.wireWrite;if(wireWrite){if(typeof wireWrite=="string"){return wireWrite}else{convertParamList[paramNum]=wireWrite;return"(convertParamList["+paramNum+"]("+expr+"))"}}else return expr}function buildCallerFunction(dynCall,ptrType,ptr,num,policyTbl,needsWireWrite,prefix,returnType,argTypeList,mask,err){var argList=makeArgList(argTypeList.length);var convertParamList=[];var callExpression=makeWireRead(convertParamList,policyTbl,returnType,"dynCall("+[prefix].concat(argList.map((function(name,index){return makeWireWrite(convertParamList,policyTbl,argTypeList[index],name)}))).join(",")+")");var resourceSet=_nbind.listResources([returnType],argTypeList);var sourceCode="function("+argList.join(",")+"){"+(mask?"this.__nbindFlags&mask&&err();":"")+resourceSet.makeOpen()+"var r="+callExpression+";"+resourceSet.makeClose()+"return r;"+"}";return eval("("+sourceCode+")")}function buildJSCallerFunction(returnType,argTypeList){var argList=makeArgList(argTypeList.length);var convertParamList=[];var callExpression=makeWireWrite(convertParamList,null,returnType,"_nbind.externalList[num].data("+argList.map((function(name,index){return makeWireRead(convertParamList,null,argTypeList[index],name)})).join(",")+")");var resourceSet=_nbind.listResources(argTypeList,[returnType]);resourceSet.remove(_nbind.resources.pool);var sourceCode="function("+["dummy","num"].concat(argList).join(",")+"){"+resourceSet.makeOpen()+"var r="+callExpression+";"+resourceSet.makeClose()+"return r;"+"}";return eval("("+sourceCode+")")}_nbind.buildJSCallerFunction=buildJSCallerFunction;function makeJSCaller(idList){var argCount=idList.length-1;var typeList=_nbind.getTypes(idList,"callback");var returnType=typeList[0];var argTypeList=typeList.slice(1);var needsWireRead=anyNeedsWireRead(argTypeList,null);var needsWireWrite=returnType.needsWireWrite(null);if(!needsWireWrite&&!needsWireRead){switch(argCount){case 0:return(function(dummy,num){return _nbind.externalList[num].data()});case 1:return(function(dummy,num,a1){return _nbind.externalList[num].data(a1)});case 2:return(function(dummy,num,a1,a2){return _nbind.externalList[num].data(a1,a2)});case 3:return(function(dummy,num,a1,a2,a3){return _nbind.externalList[num].data(a1,a2,a3)});default:break}}return buildJSCallerFunction(returnType,argTypeList)}_nbind.makeJSCaller=makeJSCaller;function makeMethodCaller(ptrType,spec){var argCount=spec.typeList.length-1;var typeIdList=spec.typeList.slice(0);typeIdList.splice(1,0,"uint32_t",spec.boundID);var typeList=_nbind.getTypes(typeIdList,spec.title);var returnType=typeList[0];var argTypeList=typeList.slice(3);var needsWireRead=returnType.needsWireRead(spec.policyTbl);var needsWireWrite=anyNeedsWireWrite(argTypeList,spec.policyTbl);var ptr=spec.ptr;var num=spec.num;var dynCall=_nbind.getDynCall(typeList,spec.title);var mask=~spec.flags&1;function err(){throw new Error("Calling a non-const method on a const object")}if(!needsWireRead&&!needsWireWrite){switch(argCount){case 0:return(function(){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType))});case 1:return(function(a1){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1)});case 2:return(function(a1,a2){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1,a2)});case 3:return(function(a1,a2,a3){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1,a2,a3)});default:break}}return buildCallerFunction(dynCall,ptrType,ptr,num,spec.policyTbl,needsWireWrite,"ptr,num,pushPointer(this,ptrType)",returnType,argTypeList,mask,err)}_nbind.makeMethodCaller=makeMethodCaller;function makeCaller(spec){var argCount=spec.typeList.length-1;var typeList=_nbind.getTypes(spec.typeList,spec.title);var returnType=typeList[0];var argTypeList=typeList.slice(1);var needsWireRead=returnType.needsWireRead(spec.policyTbl);var needsWireWrite=anyNeedsWireWrite(argTypeList,spec.policyTbl);var direct=spec.direct;var dynCall;var ptr=spec.ptr;if(spec.direct&&!needsWireRead&&!needsWireWrite){dynCall=_nbind.getDynCall(typeList,spec.title);switch(argCount){case 0:return(function(){return dynCall(direct)});case 1:return(function(a1){return dynCall(direct,a1)});case 2:return(function(a1,a2){return dynCall(direct,a1,a2)});case 3:return(function(a1,a2,a3){return dynCall(direct,a1,a2,a3)});default:break}ptr=0}var prefix;if(ptr){var typeIdList=spec.typeList.slice(0);typeIdList.splice(1,0,"uint32_t");typeList=_nbind.getTypes(typeIdList,spec.title);prefix="ptr,num"}else{ptr=direct;prefix="ptr"}dynCall=_nbind.getDynCall(typeList,spec.title);return buildCallerFunction(dynCall,null,ptr,spec.num,spec.policyTbl,needsWireWrite,prefix,returnType,argTypeList)}_nbind.makeCaller=makeCaller;function makeOverloader(func,arity){var callerList=[];function call(){return callerList[arguments.length].apply(this,arguments)}call.addMethod=(function(_func,_arity){callerList[_arity]=_func});call.addMethod(func,arity);return call}_nbind.makeOverloader=makeOverloader;var Resource=(function(){function Resource(open,close){var _this=this;this.makeOpen=(function(){return Object.keys(_this.openTbl).join("")});this.makeClose=(function(){return Object.keys(_this.closeTbl).join("")});this.openTbl={};this.closeTbl={};if(open)this.openTbl[open]=true;if(close)this.closeTbl[close]=true}Resource.prototype.add=(function(other){for(var _i=0,_a=Object.keys(other.openTbl);_i<_a.length;_i++){var key=_a[_i];this.openTbl[key]=true}for(var _b=0,_c=Object.keys(other.closeTbl);_b<_c.length;_b++){var key=_c[_b];this.closeTbl[key]=true}});Resource.prototype.remove=(function(other){for(var _i=0,_a=Object.keys(other.openTbl);_i<_a.length;_i++){var key=_a[_i];delete this.openTbl[key]}for(var _b=0,_c=Object.keys(other.closeTbl);_b<_c.length;_b++){var key=_c[_b];delete this.closeTbl[key]}});return Resource})();_nbind.Resource=Resource;function listResources(readList,writeList){var result=new Resource;for(var _i=0,readList_1=readList;_i<readList_1.length;_i++){var bindType=readList_1[_i];for(var _a=0,_b=bindType.readResources||[];_a<_b.length;_a++){var resource=_b[_a];result.add(resource)}}for(var _c=0,writeList_1=writeList;_c<writeList_1.length;_c++){var bindType=writeList_1[_c];for(var _d=0,_e=bindType.writeResources||[];_d<_e.length;_d++){var resource=_e[_d];result.add(resource)}}return result}_nbind.listResources=listResources;_nbind.resources={pool:new Resource("var used=HEAPU32[_nbind.Pool.usedPtr],page=HEAPU32[_nbind.Pool.pagePtr];","_nbind.Pool.lreset(used,page);")};var ExternalBuffer=(function(_super){__extends(ExternalBuffer,_super);function ExternalBuffer(buf,ptr){var _this=_super.call(this,buf)||this;_this.ptr=ptr;return _this}ExternalBuffer.prototype.free=(function(){_free(this.ptr)});return ExternalBuffer})(_nbind.External);function getBuffer(buf){if(buf instanceof ArrayBuffer){return new Uint8Array(buf)}else if(buf instanceof DataView){return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}else return buf}function pushBuffer(buf,policyTbl){if(buf===null||buf===undefined){if(policyTbl&&policyTbl["Nullable"])buf=[]}if(typeof buf!="object")throw new Error("Type mismatch");var b=buf;var length=b.byteLength||b.length;if(!length&&length!==0&&b.byteLength!==0)throw new Error("Type mismatch");var result=_nbind.Pool.lalloc(8);var data=_malloc(length);var ptr=result/4;HEAPU32[ptr++]=length;HEAPU32[ptr++]=data;HEAPU32[ptr++]=(new ExternalBuffer(buf,data)).register();HEAPU8.set(getBuffer(buf),data);return result}var BufferType=(function(_super){__extends(BufferType,_super);function BufferType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=pushBuffer;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}BufferType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushBuffer(arg,policyTbl)})});return BufferType})(_nbind.BindType);_nbind.BufferType=BufferType;function commitBuffer(num,data,length){var buf=_nbind.externalList[num].data;var NodeBuffer=Buffer;if(typeof Buffer!="function")NodeBuffer=(function(){});if(buf instanceof Array){}else{var src=HEAPU8.subarray(data,data+length);if(buf instanceof NodeBuffer){var srcBuf=void 0;if(typeof Buffer.from=="function"&&Buffer.from.length>=3){srcBuf=Buffer.from(src)}else srcBuf=new Buffer(src);srcBuf.copy(buf)}else getBuffer(buf).set(src)}}_nbind.commitBuffer=commitBuffer;var dirtyList=[];var gcTimer=0;function sweep(){for(var _i=0,dirtyList_1=dirtyList;_i<dirtyList_1.length;_i++){var obj=dirtyList_1[_i];if(!(obj.__nbindState&(1|2))){obj.free()}}dirtyList=[];gcTimer=0}_nbind.mark=(function(obj){});function toggleLightGC(enable){if(enable){_nbind.mark=(function(obj){dirtyList.push(obj);if(!gcTimer)gcTimer=setTimeout(sweep,0)})}else{_nbind.mark=(function(obj){})}}_nbind.toggleLightGC=toggleLightGC}))(_nbind);Module["requestFullScreen"]=function Module_requestFullScreen(lockPointer,resizeCanvas,vrDevice){Module.printErr("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");Module["requestFullScreen"]=Module["requestFullscreen"];Browser.requestFullScreen(lockPointer,resizeCanvas,vrDevice)};Module["requestFullscreen"]=function Module_requestFullscreen(lockPointer,resizeCanvas,vrDevice){Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};Module["createContext"]=function Module_createContext(canvas,useWebGL,setInModule,webGLContextAttributes){return Browser.createContext(canvas,useWebGL,setInModule,webGLContextAttributes)};if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}else if(typeof self==="object"&&self["performance"]&&typeof self["performance"]["now"]==="function"){_emscripten_get_now=(function(){return self["performance"]["now"]()})}else if(typeof performance==="object"&&typeof performance["now"]==="function"){_emscripten_get_now=(function(){return performance["now"]()})}else{_emscripten_get_now=Date.now}__ATEXIT__.push((function(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10)}));DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vid(index,a1,a2){try{Module["dynCall_vid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_fiff(index,a1,a2,a3){try{return Module["dynCall_fiff"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viddi(index,a1,a2,a3,a4){try{Module["dynCall_viddi"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vidd(index,a1,a2,a3){try{Module["dynCall_vidd"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_diii(index,a1,a2,a3){try{return Module["dynCall_diii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_di(index,a1){try{return Module["dynCall_di"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iid(index,a1,a2){try{return Module["dynCall_iid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiddi(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiddi"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_dii(index,a1,a2){try{return Module["dynCall_dii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_i(index){try{return Module["dynCall_i"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiid(index,a1,a2,a3,a4){try{Module["dynCall_viiid"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viififi(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viififi"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_v(index){try{Module["dynCall_v"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viid(index,a1,a2,a3){try{Module["dynCall_viid"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_idd(index,a1,a2){try{return Module["dynCall_idd"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_viiiii":invoke_viiiii,"invoke_vid":invoke_vid,"invoke_fiff":invoke_fiff,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_ii":invoke_ii,"invoke_viddi":invoke_viddi,"invoke_vidd":invoke_vidd,"invoke_iiii":invoke_iiii,"invoke_diii":invoke_diii,"invoke_di":invoke_di,"invoke_iid":invoke_iid,"invoke_iii":invoke_iii,"invoke_viiddi":invoke_viiddi,"invoke_viiiiii":invoke_viiiiii,"invoke_dii":invoke_dii,"invoke_i":invoke_i,"invoke_viiid":invoke_viiid,"invoke_viififi":invoke_viififi,"invoke_viii":invoke_viii,"invoke_v":invoke_v,"invoke_viid":invoke_viid,"invoke_idd":invoke_idd,"invoke_viiii":invoke_viiii,"_emscripten_asm_const_iiiii":_emscripten_asm_const_iiiii,"_emscripten_asm_const_iiidddddd":_emscripten_asm_const_iiidddddd,"_emscripten_asm_const_iiiid":_emscripten_asm_const_iiiid,"__nbind_reference_external":__nbind_reference_external,"_emscripten_asm_const_iiiiiiii":_emscripten_asm_const_iiiiiiii,"_removeAccessorPrefix":_removeAccessorPrefix,"_typeModule":_typeModule,"__nbind_register_pool":__nbind_register_pool,"__decorate":__decorate,"_llvm_stackrestore":_llvm_stackrestore,"___cxa_atexit":___cxa_atexit,"__extends":__extends,"__nbind_get_value_object":__nbind_get_value_object,"_emscripten_set_main_loop_timing":_emscripten_set_main_loop_timing,"__nbind_register_primitive":__nbind_register_primitive,"__nbind_register_type":__nbind_register_type,"_emscripten_memcpy_big":_emscripten_memcpy_big,"__nbind_register_function":__nbind_register_function,"___setErrNo":___setErrNo,"__nbind_register_class":__nbind_register_class,"__nbind_finish":__nbind_finish,"_abort":_abort,"_nbind_value":_nbind_value,"_llvm_stacksave":_llvm_stacksave,"___syscall54":___syscall54,"_defineHidden":_defineHidden,"_emscripten_set_main_loop":_emscripten_set_main_loop,"_emscripten_get_now":_emscripten_get_now,"__nbind_register_callback_signature":__nbind_register_callback_signature,"_emscripten_asm_const_iiiiii":_emscripten_asm_const_iiiiii,"__nbind_free_external":__nbind_free_external,"_emscripten_asm_const_iiii":_emscripten_asm_const_iiii,"_emscripten_asm_const_iiididi":_emscripten_asm_const_iiididi,"___syscall6":___syscall6,"_atexit":_atexit,"___syscall140":___syscall140,"___syscall146":___syscall146,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"cttz_i8":cttz_i8,"___dso_handle":___dso_handle};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.DYNAMICTOP_PTR|0;var j=env.tempDoublePtr|0;var k=env.ABORT|0;var l=env.STACKTOP|0;var m=env.STACK_MAX|0;var n=env.cttz_i8|0;var o=env.___dso_handle|0;var p=0;var q=0;var r=0;var s=0;var t=global.NaN,u=global.Infinity;var v=0,w=0,x=0,y=0,z=0.0;var A=0;var B=global.Math.floor;var C=global.Math.abs;var D=global.Math.sqrt;var E=global.Math.pow;var F=global.Math.cos;var G=global.Math.sin;var H=global.Math.tan;var I=global.Math.acos;var J=global.Math.asin;var K=global.Math.atan;var L=global.Math.atan2;var M=global.Math.exp;var N=global.Math.log;var O=global.Math.ceil;var P=global.Math.imul;var Q=global.Math.min;var R=global.Math.max;var S=global.Math.clz32;var T=global.Math.fround;var U=env.abort;var V=env.assert;var W=env.enlargeMemory;var X=env.getTotalMemory;var Y=env.abortOnCannotGrowMemory;var Z=env.invoke_viiiii;var _=env.invoke_vid;var $=env.invoke_fiff;var aa=env.invoke_vi;var ba=env.invoke_vii;var ca=env.invoke_ii;var da=env.invoke_viddi;var ea=env.invoke_vidd;var fa=env.invoke_iiii;var ga=env.invoke_diii;var ha=env.invoke_di;var ia=env.invoke_iid;var ja=env.invoke_iii;var ka=env.invoke_viiddi;var la=env.invoke_viiiiii;var ma=env.invoke_dii;var na=env.invoke_i;var oa=env.invoke_viiid;var pa=env.invoke_viififi;var qa=env.invoke_viii;var ra=env.invoke_v;var sa=env.invoke_viid;var ta=env.invoke_idd;var ua=env.invoke_viiii;var va=env._emscripten_asm_const_iiiii;var wa=env._emscripten_asm_const_iiidddddd;var xa=env._emscripten_asm_const_iiiid;var ya=env.__nbind_reference_external;var za=env._emscripten_asm_const_iiiiiiii;var Aa=env._removeAccessorPrefix;var Ba=env._typeModule;var Ca=env.__nbind_register_pool;var Da=env.__decorate;var Ea=env._llvm_stackrestore;var Fa=env.___cxa_atexit;var Ga=env.__extends;var Ha=env.__nbind_get_value_object;var Ia=env._emscripten_set_main_loop_timing;var Ja=env.__nbind_register_primitive;var Ka=env.__nbind_register_type;var La=env._emscripten_memcpy_big;var Ma=env.__nbind_register_function;var Na=env.___setErrNo;var Oa=env.__nbind_register_class;var Pa=env.__nbind_finish;var Qa=env._abort;var Ra=env._nbind_value;var Sa=env._llvm_stacksave;var Ta=env.___syscall54;var Ua=env._defineHidden;var Va=env._emscripten_set_main_loop;var Wa=env._emscripten_get_now;var Xa=env.__nbind_register_callback_signature;var Ya=env._emscripten_asm_const_iiiiii;var Za=env.__nbind_free_external;var _a=env._emscripten_asm_const_iiii;var $a=env._emscripten_asm_const_iiididi;var ab=env.___syscall6;var bb=env._atexit;var cb=env.___syscall140;var db=env.___syscall146;var eb=T(0);const fb=T(0);
// EMSCRIPTEN_START_FUNCS
function Eb(a){a=a|0;var b=0;b=l;l=l+a|0;l=l+15&-16;return b|0}function Fb(){return l|0}function Gb(a){a=a|0;l=a}function Hb(a,b){a=a|0;b=b|0;l=a;m=b}function Ib(a,b){a=a|0;b=b|0;if(!p){p=a;q=b}}function Jb(a){a=a|0;A=a}function Kb(){return A|0}function Lb(a){a=a|0;var b=0,d=0,e=0,f=0;f=l;l=l+16|0;e=f+8|0;d=f;b=lb[c[2]&31](12)|0;if(!b){c[d>>2]=2464;Tb(0,2573,d);Qa()}c[b>>2]=a;c[b+4>>2]=0;d=lb[c[2]&31](a<<2)|0;c[b+8>>2]=d;if(!d){c[e>>2]=2499;Tb(0,2573,e);Qa()}else{l=f;return b|0}return 0}function Mb(a){a=a|0;if(!a)return;jb[c[4]&127](c[a+8>>2]|0);jb[c[4]&127](a);return}function Nb(a){a=a|0;if(!a)a=0;else a=c[a+4>>2]|0;return a|0}function Ob(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=l;l=l+16|0;i=k;g=c[a>>2]|0;if(!g){g=Lb(4)|0;c[a>>2]=g}h=g+4|0;a=c[h>>2]|0;do if((a|0)==(c[g>>2]|0)){c[g>>2]=a<<1;g=g+8|0;a=sb[c[3]&15](c[g>>2]|0,a<<3)|0;c[g>>2]=a;if(!a){c[i>>2]=2535;Tb(0,2573,i);Qa()}else{j=g;f=c[h>>2]|0;e=a;break}}else{e=g+8|0;j=e;f=a;e=c[e>>2]|0}while(0);if(f>>>0<=d>>>0){j=e;i=f;i=i+1|0;c[h>>2]=i;d=j+(d<<2)|0;c[d>>2]=b;l=k;return}do{i=f;f=f+-1|0;c[e+(i<<2)>>2]=c[e+(f<<2)>>2];e=c[j>>2]|0}while(f>>>0>d>>>0);j=e;i=c[h>>2]|0;i=i+1|0;c[h>>2]=i;d=j+(d<<2)|0;c[d>>2]=b;l=k;return}function Pb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=a+8|0;e=(c[d>>2]|0)+(b<<2)|0;f=c[e>>2]|0;c[e>>2]=0;e=a+4|0;a=(c[e>>2]|0)+-1|0;if(a>>>0<=b>>>0){d=a;c[e>>2]=d;return f|0}do{g=c[d>>2]|0;a=b;b=b+1|0;c[g+(a<<2)>>2]=c[g+(b<<2)>>2];c[(c[d>>2]|0)+(b<<2)>>2]=0;a=(c[e>>2]|0)+-1|0}while(b>>>0<a>>>0);c[e>>2]=a;return f|0}function Qb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;e=c[a+4>>2]|0;if(!e){g=0;return g|0}f=c[a+8>>2]|0;d=0;while(1){if((c[f+(d<<2)>>2]|0)==(b|0))break;d=d+1|0;if(d>>>0>=e>>>0){d=0;g=6;break}}if((g|0)==6)return d|0;g=Pb(a,d)|0;return g|0}function Rb(a,b){a=a|0;b=b|0;if(!(Nb(a)|0)){b=0;return b|0}b=c[(c[a+8>>2]|0)+(b<<2)>>2]|0;return b|0}function Sb(){var a=0,b=0,d=0;d=l;l=l+16|0;b=d;a=lb[c[2]&31](980)|0;if(!a){c[b>>2]=2576;Tb(0,2573,b);Qa()}else{c[2326]=(c[2326]|0)+1;KA(a|0,20,980)|0;l=d;return a|0}return 0}function Tb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;c[f>>2]=d;ob[c[252]&7](a,b,f)|0;l=e;return}function Ub(a,b,d){a=a|0;b=b|0;d=d|0;if(!a){d=Hz(c[491]|0,b,d)|0;return d|0}else{d=rA(b,d)|0;return d|0}return 0}function Vb(a){a=a|0;var b=0,d=0;b=a+940|0;d=c[b>>2]|0;if(d|0){Qb(c[d+944>>2]|0,a)|0;c[b>>2]=0}d=Wb(a)|0;if(d|0){b=0;do{c[(Xb(a,b)|0)+940>>2]=0;b=b+1|0}while((b|0)!=(d|0))}Mb(c[a+944>>2]|0);jb[c[4]&127](a);c[2326]=(c[2326]|0)+-1;return}function Wb(a){a=a|0;return Nb(c[a+944>>2]|0)|0}function Xb(a,b){a=a|0;b=b|0;return Rb(c[a+944>>2]|0,b)|0}function Yb(a,b){a=a|0;b=b|0;if(!(Qb(c[a+944>>2]|0,b)|0))return;c[b+940>>2]=0;Zb(a);return}function Zb(b){b=b|0;var d=0;while(1){d=b+968|0;if(a[d>>0]|0){b=4;break}a[d>>0]=1;g[b+504>>2]=T(t);b=c[b+940>>2]|0;if(!b){b=4;break}}if((b|0)==4)return}function _b(a){a=a|0;var b=0,d=0,e=0;e=l;l=l+16|0;d=e+8|0;b=e;if(Wb(a)|0){c[b>>2]=2611;Tb(0,2573,b);Qa()}if(!(c[a+940>>2]|0)){Mb(c[a+944>>2]|0);KA(a|0,20,980)|0;l=e;return}else{c[d>>2]=2665;Tb(0,2573,d);Qa()}}function $b(){return c[2326]|0}function ac(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;e=f;if(b)if(!(Wb(a)|0))d=b;else{c[e>>2]=2712;Tb(0,2573,e);Qa()}else d=0;c[a+952>>2]=d;l=f;return}function bc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+16|0;g=h+8|0;f=h;e=b+940|0;if(c[e>>2]|0){c[f>>2]=2792;Tb(0,2573,f);Qa()}if(!(c[a+952>>2]|0)){Ob(a+944|0,b,d);c[e>>2]=a;Zb(a);l=h;return}else{c[g>>2]=2846;Tb(0,2573,g);Qa()}}function cc(a){a=a|0;return c[a+940>>2]|0}function dc(a){a=a|0;var b=0,d=0;d=l;l=l+16|0;b=d;if(!(c[a+952>>2]|0)){c[b>>2]=2915;Tb(0,2573,b);Qa()}else{Zb(a);l=d;return}}function ec(b){b=b|0;return (a[b+968>>0]|0)!=0|0}function fc(a,b){a=a|0;b=b|0;if(!(Gz(a,b,400)|0))return;KA(a|0,b|0,400)|0;Zb(a);return}function gc(a){a=a|0;var b=fb;b=T(g[a+44>>2]);if(hc(b)|0){b=T(g[a+40>>2]);a=b>T(0.0)&((hc(b)|0)^1);return T(a?b:T(0.0))}else return T(b);return fb}function hc(a){a=T(a);return ((ic(a)|0)&2147483647)>>>0>2139095040|0}function ic(a){a=T(a);return (g[j>>2]=a,c[j>>2]|0)|0}function jc(a){a=a|0;var b=fb;b=T(g[a+48>>2]);if(hc(b)|0){b=T(g[a+40>>2]);a=b<T(0.0)&((hc(b)|0)^1);b=T(-b);return T(a?b:T(0.0))}else return T(b);return fb}function kc(a,b){a=a|0;b=b|0;var d=0,e=0;e=lc(b)|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function lc(a){a=a|0;var b=fb;switch(c[a+56>>2]|0){case 0:case 3:{b=T(g[a+40>>2]);a=b>T(0.0)&((hc(b)|0)^1);return (a?1012:1020)|0}default:return a+52|0}return 0}function mc(a,b){a=a|0;b=T(b);var c=0;c=a+40|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function nc(a,b){a=a|0;b=b|0;c[a+964>>2]=b;return}function oc(a){a=a|0;return c[a+964>>2]|0}function pc(b,c){b=b|0;c=c|0;a[b+969>>0]=c&1;return}function qc(b){b=b|0;return (a[b+969>>0]|0)!=0|0}function rc(a,b){a=a|0;b=b|0;var d=0;d=a+4|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function sc(a){a=a|0;return c[a+4>>2]|0}function tc(a,b){a=a|0;b=b|0;var d=0;d=a+8|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function uc(a){a=a|0;return c[a+8>>2]|0}function vc(a,b){a=a|0;b=b|0;var d=0;d=a+12|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function wc(a){a=a|0;return c[a+12>>2]|0}function xc(a,b){a=a|0;b=b|0;var d=0;d=a+16|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function yc(a){a=a|0;return c[a+16>>2]|0}function zc(a,b){a=a|0;b=b|0;var d=0;d=a+20|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Ac(a){a=a|0;return c[a+20>>2]|0}function Bc(a,b){a=a|0;b=b|0;var d=0;d=a+24|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Cc(a){a=a|0;return c[a+24>>2]|0}function Dc(a,b){a=a|0;b=b|0;var d=0;d=a+28|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Ec(a){a=a|0;return c[a+28>>2]|0}function Fc(a,b){a=a|0;b=b|0;var d=0;d=a+32|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Gc(a){a=a|0;return c[a+32>>2]|0}function Hc(a,b){a=a|0;b=b|0;var d=0;d=a+36|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Ic(a){a=a|0;return c[a+36>>2]|0}function Jc(a,b){a=a|0;b=T(b);var c=0;c=a+44|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function Kc(a,b){a=a|0;b=T(b);var c=0;c=a+48|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function Lc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+52|0;d=a+56|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function Mc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+52|0;d=a+56|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function Nc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+132+(b<<3)|0;b=a+132+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Oc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+132+(b<<3)|0;b=a+132+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==2:0)return;g[e>>2]=d;e=hc(d)|0;c[b>>2]=e?0:2;Zb(a);return}function Pc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+132+(d<<3)|0;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;return}function Qc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+60+(b<<3)|0;b=a+60+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Rc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+60+(b<<3)|0;b=a+60+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==2:0)return;g[e>>2]=d;e=hc(d)|0;c[b>>2]=e?0:2;Zb(a);return}function Sc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+60+(d<<3)|0;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;return}function Tc(a,b){a=a|0;b=b|0;var d=0;d=a+60+(b<<3)+4|0;if((c[d>>2]|0)==3)return;g[a+60+(b<<3)>>2]=T(t);c[d>>2]=3;Zb(a);return}function Uc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+204+(b<<3)|0;b=a+204+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Vc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+204+(b<<3)|0;b=a+204+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==2:0)return;g[e>>2]=d;e=hc(d)|0;c[b>>2]=e?0:2;Zb(a);return}function Wc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+204+(d<<3)|0;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;return}function Xc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+276+(b<<3)|0;b=a+276+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Yc(a,b){a=a|0;b=b|0;return T(g[a+276+(b<<3)>>2])}function Zc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+348|0;d=a+352|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function _c(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+348|0;d=a+352|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function $c(a){a=a|0;var b=0;b=a+352|0;if((c[b>>2]|0)==3)return;g[a+348>>2]=T(t);c[b>>2]=3;Zb(a);return}function ad(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+348|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function bd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+356|0;d=a+360|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function cd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+356|0;d=a+360|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function dd(a){a=a|0;var b=0;b=a+360|0;if((c[b>>2]|0)==3)return;g[a+356>>2]=T(t);c[b>>2]=3;Zb(a);return}function ed(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+356|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function fd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+364|0;d=a+368|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function gd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+364|0;d=a+368|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function hd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+364|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function id(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+372|0;d=a+376|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function jd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+372|0;d=a+376|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function kd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+372|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function ld(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+380|0;d=a+384|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function md(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+380|0;d=a+384|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function nd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+380|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function od(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+388|0;d=a+392|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function pd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+388|0;d=a+392|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function qd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+388|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function rd(a,b){a=a|0;b=T(b);var c=0;c=a+396|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function sd(a){a=a|0;return T(g[a+396>>2])}function td(a){a=a|0;return T(g[a+400>>2])}function ud(a){a=a|0;return T(g[a+404>>2])}function vd(a){a=a|0;return T(g[a+408>>2])}function wd(a){a=a|0;return T(g[a+412>>2])}function xd(a){a=a|0;return T(g[a+416>>2])}function yd(a){a=a|0;return T(g[a+420>>2])}function zd(a,b){a=a|0;b=b|0;var d=0,e=0,f=fb;e=l;l=l+16|0;d=e;if(b>>>0>=6){c[d>>2]=3001;Tb(0,2573,d);Qa()}switch(b|0){case 0:{b=(c[a+496>>2]|0)==2?5:4;break}case 2:{b=(c[a+496>>2]|0)==2?4:5;break}default:{}}f=T(g[a+424+(b<<2)>>2]);l=e;return T(f)}function Ad(a,b){a=a|0;b=b|0;var d=0,e=0,f=fb;e=l;l=l+16|0;d=e;if(b>>>0>=6){c[d>>2]=3001;Tb(0,2573,d);Qa()}switch(b|0){case 0:{b=(c[a+496>>2]|0)==2?5:4;break}case 2:{b=(c[a+496>>2]|0)==2?4:5;break}default:{}}f=T(g[a+448+(b<<2)>>2]);l=e;return T(f)}function Bd(a,b){a=a|0;b=b|0;var d=0,e=0,f=fb;e=l;l=l+16|0;d=e;if(b>>>0>=6){c[d>>2]=3001;Tb(0,2573,d);Qa()}switch(b|0){case 0:{b=(c[a+496>>2]|0)==2?5:4;break}case 2:{b=(c[a+496>>2]|0)==2?4:5;break}default:{}}f=T(g[a+472+(b<<2)>>2]);l=e;return T(f)}function Cd(a,b){a=a|0;b=b|0;Dd(a,b,0);return}function Dd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0.0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0.0;K=l;l=l+400|0;I=K+392|0;J=K+384|0;H=K+376|0;G=K+368|0;F=K+360|0;D=K+352|0;C=K+344|0;B=K+336|0;A=K+328|0;z=K+320|0;y=K+312|0;x=K+304|0;w=K+296|0;v=K+288|0;u=K+280|0;t=K+272|0;s=K+264|0;r=K+256|0;q=K+248|0;p=K+240|0;n=K+232|0;m=K+144|0;j=K+96|0;i=K+48|0;f=K+40|0;E=K+32|0;o=K+24|0;k=K+16|0;Ed(d);Tb(3,3055,K);e=c[a+960>>2]|0;if(e|0)jb[e&127](a);if(b&1|0){Tb(3,3057,K+8|0);h[k>>3]=+T(g[a+416>>2]);Tb(3,3067,k);h[o>>3]=+T(g[a+420>>2]);Tb(3,3079,o);h[E>>3]=+T(g[a+404>>2]);Tb(3,3092,E);h[f>>3]=+T(g[a+400>>2]);Tb(3,3102,f);Q=+T(g[a+424>>2]);P=+T(g[a+428>>2]);O=+T(g[a+432>>2]);N=+T(g[a+436>>2]);M=+T(g[a+440>>2]);L=+T(g[a+444>>2]);h[i>>3]=Q;h[i+8>>3]=P;h[i+16>>3]=O;h[i+24>>3]=N;h[i+32>>3]=M;h[i+40>>3]=L;Tb(3,3111,i);L=+T(g[a+448>>2]);M=+T(g[a+452>>2]);N=+T(g[a+456>>2]);O=+T(g[a+460>>2]);P=+T(g[a+464>>2]);Q=+T(g[a+468>>2]);h[j>>3]=L;h[j+8>>3]=M;h[j+16>>3]=N;h[j+24>>3]=O;h[j+32>>3]=P;h[j+40>>3]=Q;Tb(3,3157,j);Q=+T(g[a+472>>2]);P=+T(g[a+476>>2]);O=+T(g[a+480>>2]);N=+T(g[a+484>>2]);M=+T(g[a+488>>2]);L=+T(g[a+492>>2]);h[m>>3]=Q;h[m+8>>3]=P;h[m+16>>3]=O;h[m+24>>3]=N;h[m+32>>3]=M;h[m+40>>3]=L;Tb(3,3203,m);Tb(3,3250,K+192|0)}if(b&2|0){switch(c[a+4>>2]|0){case 0:{Tb(3,3254,K+200|0);break}case 1:{Tb(3,3280,K+208|0);break}case 2:{Tb(3,3314,K+216|0);break}case 3:{Tb(3,3337,K+224|0);break}default:{}}switch(c[a+8>>2]|0){case 1:{Tb(3,3368,n);break}case 2:{Tb(3,3395,p);break}case 4:{Tb(3,3424,q);break}case 3:{Tb(3,3457,r);break}default:{}}switch(c[a+16>>2]|0){case 2:{Tb(3,3491,s);break}case 3:{Tb(3,3514,t);break}case 4:{Tb(3,3539,u);break}default:{}}switch(c[a+12>>2]|0){case 2:{Tb(3,3563,v);break}case 3:{Tb(3,3588,w);break}case 4:{Tb(3,3615,x);break}default:{}}switch(c[a+20>>2]|0){case 1:{Tb(3,3641,y);break}case 2:{Tb(3,3667,z);break}case 3:{Tb(3,3689,A);break}case 4:{Tb(3,3713,B);break}default:{}}Fd(3736,T(gc(a)));Fd(3745,T(jc(a)));Gd(3756,lc(a)|0);switch(c[a+32>>2]|0){case 1:{Tb(3,3766,C);break}case 0:{Tb(3,3787,D);break}case 2:{Tb(3,3809,F);break}default:{}}e=a+60|0;F=Hd(e)|0;f=Id(e,0,1012)|0;if(F)Jd(3830,f);else{Jd(3837,f);Jd(3848,Id(e,2,1012)|0);Jd(3860,Id(e,1,1012)|0);Jd(3870,Id(e,3,1012)|0);Jd(3883,Id(e,4,1012)|0);Jd(3895,Id(e,5,1012)|0)}f=a+204|0;F=Hd(f)|0;e=Id(f,0,1012)|0;if(F)Jd(3905,e);else{Jd(3913,e);Jd(3925,Id(f,2,1012)|0);Jd(3938,Id(f,1,1012)|0);Jd(3949,Id(f,3,1012)|0);Jd(3963,Id(f,4,1012)|0);Jd(3976,Id(f,5,1012)|0)}e=a+276|0;F=Hd(e)|0;f=Id(e,0,1012)|0;if(F)Jd(3987,f);else{Jd(3999,f);Jd(4015,Id(e,2,1012)|0);Jd(4032,Id(e,1,1012)|0);Jd(4047,Id(e,3,1012)|0);Jd(4065,Id(e,4,1012)|0);Jd(4082,Id(e,5,1012)|0)}Gd(4097,a+348|0);Gd(4103,a+356|0);Gd(4110,a+380|0);Gd(4119,a+388|0);Gd(4129,a+364|0);Gd(4138,a+372|0);if((c[a+24>>2]|0)==1)Tb(3,4148,G);G=a+132|0;Gd(4171,Id(G,0,1e3)|0);Gd(4176,Id(G,2,1e3)|0);Gd(4182,Id(G,1,1e3)|0);Gd(4186,Id(G,3,1e3)|0)}i=Nb(c[a+944>>2]|0)|0;if(!((b&4|0)!=0&(i|0)!=0)){Tb(3,4211,I);l=K;return}Tb(3,4193,H);f=d+1|0;e=0;do{Dd(Xb(a,e)|0,b,f);e=e+1|0}while((e|0)!=(i|0));Ed(d);Tb(3,4206,J);l=K;return}function Ed(a){a=a|0;var b=0,c=0,d=0;d=l;l=l+16|0;c=d;if(!a){l=d;return}else b=0;do{Tb(3,4291,c);b=b+1|0}while((b|0)!=(a|0));l=d;return}function Fd(a,b){a=a|0;b=T(b);var d=0,e=0;e=l;l=l+16|0;d=e;if(hc(b)|0){l=e;return}c[d>>2]=a;h[d+8>>3]=+b;Tb(3,4282,d);l=e;return}function Gd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,i=0.0;f=l;l=l+32|0;e=f;d=c[b+4>>2]|0;if(!d){l=f;return}i=+T(g[b>>2]);c[e>>2]=a;h[e+8>>3]=i;c[e+16>>2]=(d|0)==1?4215:4218;Tb(3,4220,e);l=f;return}function Hd(a){a=a|0;var b=0,d=0,e=0,f=0;e=l;l=l+16|0;d=e+8|0;b=e;f=a+8|0;c[b>>2]=c[a>>2];c[b+4>>2]=c[a+4>>2];c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];if(!(Ld(b,d)|0)){f=0;l=e;return f|0}f=a+16|0;c[b>>2]=c[a>>2];c[b+4>>2]=c[a+4>>2];c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];if(!(Ld(b,d)|0)){f=0;l=e;return f|0}f=a+24|0;c[b>>2]=c[a>>2];c[b+4>>2]=c[a+4>>2];c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];f=Ld(b,d)|0;l=e;return f|0}function Id(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=l;l=l+16|0;e=f;if(b>>>0>=6){c[e>>2]=4231;Tb(0,2573,e);Qa()}if(c[a+(b<<3)+4>>2]|0){e=a+(b<<3)|0;l=f;return e|0}if((b|2|0)==3?c[a+60>>2]|0:0){e=a+56|0;l=f;return e|0}switch(b|0){case 0:case 2:case 4:case 5:{if(c[a+52>>2]|0){e=a+48|0;l=f;return e|0}break}default:{}}if(!(c[a+68>>2]|0)){e=(b|1|0)==5?1e3:d;l=f;return e|0}else{e=a+64|0;l=f;return e|0}return 0}function Jd(a,b){a=a|0;b=b|0;var d=fb,e=0,f=0;f=l;l=l+32|0;e=f;d=T(g[b>>2]);if(Kd(d,T(0.0))|0){l=f;return}b=(c[b+4>>2]|0)==1?4215:4218;c[e>>2]=a;h[e+8>>3]=+d;c[e+16>>2]=b;Tb(3,4220,e);l=f;return}function Kd(a,b){a=T(a);b=T(b);var c=0;if(hc(a)|0){c=hc(b)|0;return c|0}else{c=T(C(T(a-b)))<T(.0000999999974);return c|0}return 0}function Ld(a,b){a=a|0;b=b|0;var d=0,e=fb;d=c[a+4>>2]|0;if((d|0)!=(c[b+4>>2]|0)){d=0;return d|0}if(!d){d=1;return d|0}e=T(g[a>>2]);d=T(C(T(e-T(g[b>>2]))))<T(.0000999999974);return d|0}function Md(a,b,c,d,e,f,g,h,i,j,k,l){a=a|0;b=T(b);c=c|0;d=T(d);e=e|0;f=T(f);g=g|0;h=T(h);i=T(i);j=T(j);k=T(k);l=T(l);var m=0,n=fb,o=fb,p=0;if(i<T(0.0)|j<T(0.0)){g=0;return g|0}if((e|0)==(a|0))m=Kd(f,b)|0;else m=0;if((g|0)==(c|0))p=Kd(h,d)|0;else p=0;if((!m?(n=T(b-k),!(Nd(a,n,i)|0)):0)?!(Od(a,n,e,i)|0):0)m=Pd(a,n,e,f,i)|0;else m=1;if((!p?(o=T(d-l),!(Nd(c,o,j)|0)):0)?!(Od(c,o,g,j)|0):0)a=Pd(c,o,g,h,j)|0;else a=1;g=m&a;return g|0}function Nd(a,b,c){a=a|0;b=T(b);c=T(c);if((a|0)==1)a=Kd(b,c)|0;else a=0;return a|0}function Od(a,b,c,d){a=a|0;b=T(b);c=c|0;d=T(d);if((a|0)==2&(c|0)==0)if(!(b>=d))a=Kd(b,d)|0;else a=1;else a=0;return a|0}function Pd(a,b,c,d,e){a=a|0;b=T(b);c=c|0;d=T(d);e=T(e);if(!((a|0)==2&(c|0)==2&d>b)){c=0;return c|0}if(e<=b){c=1;return c|0}c=Kd(b,e)|0;return c|0}function Qd(b,d,e,f,i,j,k,m,n,o){b=b|0;d=T(d);e=T(e);f=f|0;i=i|0;j=j|0;k=T(k);m=T(m);n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=fb,u=fb,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=fb,F=fb,G=fb,H=0.0,I=0.0;D=l;l=l+160|0;A=D+120|0;z=D+104|0;x=D+72|0;s=D+56|0;y=D+8|0;w=D;c[2328]=(c[2328]|0)+1;B=b+968|0;if((a[B>>0]|0)!=0?(c[b+508>>2]|0)!=(c[2327]|0):0)v=4;else if((c[b+512>>2]|0)==(f|0))C=0;else v=4;if((v|0)==4){c[b+516>>2]=0;c[b+920>>2]=-1;c[b+924>>2]=-1;g[b+928>>2]=T(-1.0);g[b+932>>2]=T(-1.0);C=1}a:do if(!(c[b+952>>2]|0)){if(n){p=b+912|0;if(!(Kd(T(g[p>>2]),d)|0)){v=21;break}if(!(Kd(T(g[b+916>>2]),e)|0)){v=21;break}if((c[b+920>>2]|0)!=(i|0)){v=21;break}p=(c[b+924>>2]|0)==(j|0)?p:0;v=22;break}r=c[b+516>>2]|0;if(!r)v=21;else{q=0;while(1){p=b+520+(q*24|0)|0;if(((Kd(T(g[p>>2]),d)|0?Kd(T(g[b+520+(q*24|0)+4>>2]),e)|0:0)?(c[b+520+(q*24|0)+8>>2]|0)==(i|0):0)?(c[b+520+(q*24|0)+12>>2]|0)==(j|0):0){v=22;break a}q=q+1|0;if(q>>>0>=r>>>0){v=21;break}}}}else{t=T(Rd(b,2,k));u=T(Rd(b,0,k));p=b+912|0;G=T(g[p>>2]);F=T(g[b+916>>2]);E=T(g[b+928>>2]);if(!(Md(i,d,j,e,c[b+920>>2]|0,G,c[b+924>>2]|0,F,E,T(g[b+932>>2]),t,u)|0)){r=c[b+516>>2]|0;if(!r)v=21;else{q=0;while(1){p=b+520+(q*24|0)|0;E=T(g[p>>2]);F=T(g[b+520+(q*24|0)+4>>2]);G=T(g[b+520+(q*24|0)+16>>2]);if(Md(i,d,j,e,c[b+520+(q*24|0)+8>>2]|0,E,c[b+520+(q*24|0)+12>>2]|0,F,G,T(g[b+520+(q*24|0)+20>>2]),t,u)|0){v=22;break a}q=q+1|0;if(q>>>0>=r>>>0){v=21;break}}}}else v=22}while(0);do if((v|0)==21)if(!(a[11737]|0)){p=0;v=31}else{p=0;v=28}else if((v|0)==22){q=(a[11737]|0)!=0;if(!((p|0)!=0&(C^1)))if(q){v=28;break}else{v=31;break}s=p+16|0;c[b+904>>2]=c[s>>2];r=p+20|0;c[b+908>>2]=c[r>>2];if(!((a[11738]|0)==0|q^1)){q=c[2328]|0;c[w>>2]=Sd(q)|0;c[w+4>>2]=q;pA(4294,w)|0;q=c[b+960>>2]|0;if(q|0)jb[q&127](b);i=Td(i,n)|0;j=Td(j,n)|0;I=+T(g[s>>2]);H=+T(g[r>>2]);c[y>>2]=i;c[y+4>>2]=j;h[y+8>>3]=+d;h[y+16>>3]=+e;h[y+24>>3]=I;h[y+32>>3]=H;c[y+40>>2]=o;pA(4311,y)|0}}while(0);if((v|0)==28){q=c[2328]|0;y=Sd(q)|0;c[s>>2]=y;c[s+4>>2]=q;c[s+8>>2]=C?4360:11739;pA(4362,s)|0;q=c[b+960>>2]|0;if(q|0)jb[q&127](b);y=Td(i,n)|0;v=Td(j,n)|0;c[x>>2]=y;c[x+4>>2]=v;h[x+8>>3]=+d;h[x+16>>3]=+e;c[x+24>>2]=o;pA(4371,x)|0;v=31}if((v|0)==31){Ud(b,d,e,f,i,j,k,m,n);if(a[11737]|0){q=c[2328]|0;y=Sd(q)|0;c[z>>2]=y;c[z+4>>2]=q;c[z+8>>2]=C?4360:11739;pA(4405,z)|0;q=c[b+960>>2]|0;if(q|0)jb[q&127](b);y=Td(i,n)|0;z=Td(j,n)|0;H=+T(g[b+904>>2]);I=+T(g[b+908>>2]);c[A>>2]=y;c[A+4>>2]=z;h[A+8>>3]=H;h[A+16>>3]=I;c[A+24>>2]=o;pA(4414,A)|0}c[b+512>>2]=f;if(!p){q=b+516|0;p=c[q>>2]|0;if((p|0)==16){if(a[11737]|0)qA(4446)|0;c[q>>2]=0;p=0}if(n)p=b+912|0;else{c[q>>2]=p+1;p=b+520+(p*24|0)|0}g[p>>2]=d;g[p+4>>2]=e;c[p+8>>2]=i;c[p+12>>2]=j;c[p+16>>2]=c[b+904>>2];c[p+20>>2]=c[b+908>>2];p=0}}if(!n){B=c[2328]|0;B=B+-1|0;c[2328]=B;B=c[2327]|0;n=b+508|0;c[n>>2]=B;n=(p|0)==0;C=C|n;l=D;return C|0}c[b+416>>2]=c[b+904>>2];c[b+420>>2]=c[b+908>>2];a[b+969>>0]=1;a[B>>0]=0;B=c[2328]|0;B=B+-1|0;c[2328]=B;B=c[2327]|0;n=b+508|0;c[n>>2]=B;n=(p|0)==0;C=C|n;l=D;return C|0}function Rd(a,b,c){a=a|0;b=b|0;c=T(c);var d=fb;d=T(Xd(a,b,c));return T(d+T(Yd(a,b,c)))}function Sd(a){a=a|0;return (a>>>0>60?4834:4834+(60-a)|0)|0}function Td(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;d=f+12|0;e=f;c[d>>2]=c[269];c[d+4>>2]=c[270];c[d+8>>2]=c[271];c[e>>2]=c[272];c[e+4>>2]=c[273];c[e+8>>2]=c[274];if(a>>>0>2){e=11739;l=f;return e|0}e=c[(b?e:d)+(a<<2)>>2]|0;l=f;return e|0}function Ud(b,d,e,f,h,i,k,m,n){b=b|0;d=T(d);e=T(e);f=f|0;h=h|0;i=i|0;k=T(k);m=T(m);n=n|0;var o=0,p=0,q=0,r=0,s=fb,t=fb,u=fb,v=fb,w=fb,x=fb,y=fb,z=0,A=0,B=fb,C=0,D=fb,E=fb,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,U=0,V=0,W=fb,X=0,Y=0,Z=fb,_=fb,$=fb,aa=fb,ba=fb,ca=fb,da=0,ea=0,fa=0,ga=0,ha=fb,ia=fb,ja=fb,ka=0,la=0,ma=fb,na=fb,oa=fb,pa=fb,qa=fb,ra=fb,sa=fb,ta=fb,ua=0,va=0,wa=0,xa=0,ya=fb,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0;Ia=l;l=l+32|0;p=Ia+8|0;o=Ia;ka=Ia+24|0;da=Ia+20|0;ea=Ia+16|0;fa=Ia+12|0;if(!((h|0)==0|(hc(d)|0)^1)){c[o>>2]=4468;Tb(0,2573,o);Qa()}if(!((i|0)==0|(hc(e)|0)^1)){c[p>>2]=4548;Tb(0,2573,p);Qa()}Da=Vd(b,f)|0;c[b+496>>2]=Da;Ga=Wd(2,Da)|0;Ha=Wd(0,Da)|0;g[b+440>>2]=T(Xd(b,Ga,k));g[b+444>>2]=T(Yd(b,Ga,k));g[b+428>>2]=T(Xd(b,Ha,k));g[b+436>>2]=T(Yd(b,Ha,k));g[b+464>>2]=T(Zd(b,Ga));g[b+468>>2]=T(_d(b,Ga));g[b+452>>2]=T(Zd(b,Ha));g[b+460>>2]=T(_d(b,Ha));g[b+488>>2]=T($d(b,Ga,k));g[b+492>>2]=T(ae(b,Ga,k));g[b+476>>2]=T($d(b,Ha,k));g[b+484>>2]=T(ae(b,Ha,k));if(c[b+952>>2]|0){be(b,d,e,h,i,k,m);l=Ia;return}Ea=b+944|0;Fa=Nb(c[Ea>>2]|0)|0;if(!Fa){ce(b,d,e,h,i,k,m);l=Ia;return}if(!n?de(b,d,e,h,i,k,m)|0:0){l=Ia;return}Ga=Wd(c[b+4>>2]|0,Da)|0;Ha=ee(Ga,Da)|0;Ca=fe(Ga)|0;X=c[b+8>>2]|0;va=b+28|0;Y=(c[va>>2]|0)!=0;qa=Ca?k:m;sa=Ca?m:k;Z=T(ge(b,Ga,k));_=T(he(b,Ga,k));s=T(ge(b,Ha,k));ra=T(ie(b,Ga,k));ta=T(ie(b,Ha,k));C=Ca?h:i;ua=Ca?i:h;ya=Ca?ra:ta;w=Ca?ta:ra;pa=T(Rd(b,2,k));v=T(Rd(b,0,k));t=T(T(T(je(b+364|0,k))-pa)-ya);u=T(T(T(je(b+380|0,k))-pa)-ya);x=T(T(T(je(b+372|0,m))-v)-w);y=T(T(T(je(b+388|0,m))-v)-w);$=Ca?t:x;aa=Ca?u:y;pa=T(d-pa);d=T(pa-ya);if(hc(d)|0)ya=d;else ya=T(iA(T(kA(d,u)),t));na=T(e-v);d=T(na-w);if(hc(d)|0)oa=d;else oa=T(iA(T(kA(d,y)),x));t=Ca?ya:oa;ma=Ca?oa:ya;a:do if((C|0)==1){f=0;p=0;while(1){o=Xb(b,p)|0;if(!f)if(T(gc(o))>T(0.0)?T(jc(o))>T(0.0):0)f=o;else f=0;else if(ke(o)|0){r=0;break a}p=p+1|0;if(p>>>0>=Fa>>>0){r=f;break}}}else r=0;while(0);z=r+500|0;A=r+504|0;f=0;o=0;d=T(0.0);q=0;do{p=Rb(c[Ea>>2]|0,q)|0;if((c[p+36>>2]|0)==1){le(p);a[p+969>>0]=1;a[p+968>>0]=0}else{me(p);if(n)ne(p,Vd(p,Da)|0,t,ma,ya);do if((c[p+24>>2]|0)!=1)if((p|0)==(r|0)){c[z>>2]=c[2327];g[A>>2]=T(0.0);break}else{oe(b,p,ya,h,oa,ya,oa,i,Da);break}else{if(o|0)c[o+948>>2]=p;c[p+948>>2]=0;o=p;f=(f|0)==0?p:f}while(0);d=T(d+T(g[p+504>>2]))}q=q+1|0}while((q|0)!=(Fa|0));G=d>t;la=Y&((C|0)==2&G)?1:C;F=(ua|0)==1;I=F&(n^1);J=(la|0)==2;K=1028+(Ga<<2)|0;L=(ua|2|0)==2;M=(ua|0)==2;V=F&(Y^1);N=1044+(Ha<<2)|0;O=1044+(Ha<<2)|0;P=1060+(Ha<<2)|0;Q=1028+(Ha<<2)|0;R=1044+(Ga<<2)|0;S=1044+(Ga<<2)|0;U=1060+(Ga<<2)|0;G=Y&((C|0)!=0&G);F=F^1;w=t;r=0;H=0;ca=T(0.0);ba=T(0.0);while(1){b:do if(r>>>0<Fa>>>0){q=0;v=T(0.0);t=T(0.0);d=T(0.0);A=0;p=0;i=r;while(1){z=Rb(c[Ea>>2]|0,i)|0;if((c[z+36>>2]|0)!=1?(c[z+936>>2]=H,(c[z+24>>2]|0)!=1):0){u=T(je(z+364+(c[K>>2]<<3)|0,qa));o=z+504|0;u=T(iA(u,T(g[o>>2])));u=T(v+T(u+T(Rd(z,Ga,ya))));if(Y&(q|0)!=0&u>w){C=q;u=v;D=t;o=A;break b}if(ke(z)|0){t=T(t+T(gc(z)));W=T(jc(z));d=T(d-T(W*T(g[o>>2])))}if(p|0)c[p+948>>2]=z;c[z+948>>2]=0;q=q+1|0;p=z;o=(A|0)==0?z:A}else{u=v;o=A}z=i+1|0;if(z>>>0<Fa>>>0){v=u;A=o;i=z}else{C=q;D=t;i=z;break}}}else{C=0;u=T(0.0);D=T(0.0);d=T(0.0);o=0;i=r}while(0);if(hc(w)|0)if(u<$&((hc($)|0)^1))W=$;else{A=u>aa&((hc(aa)|0)^1);W=A?aa:w}else W=w;if(hc(W)|0)if(u<T(0.0))E=T(-u);else E=T(0.0);else E=T(W-u);if(!I?(ga=(o|0)==0,!ga):0){q=E<T(0.0);e=T(E/d);z=E>T(0.0);B=T(E/D);x=T(0.0);y=T(0.0);t=T(0.0);p=o;while(1){v=T(g[p+504>>2]);do if(q){w=T(v*T(jc(p)));if(w!=T(-0.0)?(u=T(v-T(e*w)),ha=T(pe(p,Ga,u,W,ya)),u!=ha):0){u=T(x-T(ha-v));t=T(t+w)}else u=x}else if(z?(ia=T(gc(p)),ia!=T(0.0)):0){w=T(v+T(B*ia));u=T(pe(p,Ga,w,W,ya));if(!(w!=u)){u=x;break}u=T(x-T(u-v));y=T(y-ia)}else u=x;while(0);p=c[p+948>>2]|0;if(!p)break;else x=u}d=T(d+t);t=T(E+u);if(!ga){z=t<T(0.0);A=d==T(0.0);e=T(t/d);q=t>T(0.0);x=T(t/T(D+y));d=T(0.0);p=o;do{u=T(g[p+504>>2]);do if(z){D=T(u*T(jc(p)));t=T(-D);if(D!=T(-0.0)){D=T(e*t);t=T(pe(p,Ga,T(u+(A?t:D)),W,ya))}else t=u}else if(q){t=T(gc(p));if(!(t!=T(0.0))){t=u;break}t=T(pe(p,Ga,T(u+T(x*t)),W,ya))}else t=u;while(0);d=T(d-T(t-u));v=T(Rd(p,Ga,ya));w=T(Rd(p,Ha,ya));u=T(t+v);g[da>>2]=u;c[fa>>2]=1;o=hc(ma)|0;do if(o)Ba=78;else{if(G|(qe(p,Ha,ma)|0|F)){Ba=78;break}if((re(b,p)|0)!=4){Ba=78;break}g[ka>>2]=ma;c[ea>>2]=1}while(0);do if((Ba|0)==78){Ba=0;if(qe(p,Ha,ma)|0){D=T(w+T(je(c[p+972+(c[Q>>2]<<2)>>2]|0,ma)));g[ka>>2]=D;c[ea>>2]=((hc(D)|0)^1)&1;break}else{g[ka>>2]=ma;c[ea>>2]=o?0:2;break}}while(0);o=p+396|0;t=T(g[o>>2]);if(!(hc(t)|0)){B=T(u-v);D=T(B/t);t=T(t*B);t=T(iA(Ca?D:t,T(ie(p,Ha,ya))));g[ka>>2]=t;c[ea>>2]=1;if(ke(p)|0){t=T(kA(T(t-w),ma));g[ka>>2]=t;u=T(g[o>>2]);if(Ca)u=T(t*u);else u=T(t/u);g[da>>2]=T(v+u)}g[ka>>2]=T(w+t)}se(T(je(p+380+(c[K>>2]<<3)|0,ya)),fa,da);se(T(je(p+380+(c[Q>>2]<<3)|0,oa)),ea,ka);if(qe(p,Ha,ma)|0)o=0;else o=(re(b,p)|0)==4;D=T(g[da>>2]);B=T(g[ka>>2]);Ja=c[fa>>2]|0;Ka=c[ea>>2]|0;Qd(p,Ca?D:B,Ca?B:D,Da,Ca?Ja:Ka,Ca?Ka:Ja,ya,oa,n&(o^1),4630)|0;p=c[p+948>>2]|0}while((p|0)!=0)}else d=T(0.0)}else d=T(0.0);d=T(E+d);if(J&d>T(0.0)){o=c[K>>2]|0;if((c[b+364+(o<<3)+4>>2]|0)!=0?(ja=T(je(b+364+(o<<3)|0,qa)),ja>=T(0.0)):0)t=T(iA(T(0.0),T(ja-T(W-d))));else t=T(0.0)}else t=d;A=r>>>0<i>>>0;if(A){q=r;o=0;do{p=Rb(c[Ea>>2]|0,q)|0;if(!(c[p+24>>2]|0))o=((c[p+60+(c[S>>2]<<3)+4>>2]|0)==3&1)+o+((c[p+60+(c[U>>2]<<3)+4>>2]|0)==3&1)|0;q=q+1|0}while((q|0)!=(i|0));if(o){v=T(0.0);w=T(0.0)}else Ba=100}else Ba=100;c:do if((Ba|0)==100){Ba=0;switch(X|0){case 1:{o=0;v=T(t*T(.5));w=T(0.0);break c}case 2:{o=0;v=t;w=T(0.0);break c}case 3:{if(C>>>0<=1){o=0;v=T(0.0);w=T(0.0);break c}w=T((C+-1|0)>>>0);o=0;v=T(0.0);w=T(T(iA(t,T(0.0)))/w);break c}case 4:{w=T(t/T(C>>>0));o=0;v=T(w*T(.5));break c}default:{o=0;v=T(0.0);w=T(0.0);break c}}}while(0);d=T(Z+v);if(A){u=T(t/T(o|0));z=r;t=T(0.0);do{q=Rb(c[Ea>>2]|0,z)|0;d:do if((c[q+36>>2]|0)!=1){p=q+24|0;o=c[p>>2]|0;do if((o|0)==1){if(!(te(q,Ga)|0)){o=c[p>>2]|0;break}if(!n)break d;E=T(ue(q,Ga,W));E=T(E+T(Zd(b,Ga)));E=T(E+T(Xd(q,Ga,ya)));g[q+400+(c[R>>2]<<2)>>2]=E;break d}while(0);if(o|0){if(!n)break;E=T(v+T(Zd(b,Ga)));Ka=q+400+(c[R>>2]<<2)|0;g[Ka>>2]=T(E+T(g[Ka>>2]));break}E=T(u+d);d=(c[q+60+(c[S>>2]<<3)+4>>2]|0)==3?E:d;if(n){Ka=q+400+(c[R>>2]<<2)|0;g[Ka>>2]=T(d+T(g[Ka>>2]))}E=T(u+d);d=(c[q+60+(c[U>>2]<<3)+4>>2]|0)==3?E:d;if(I){E=T(w+T(Rd(q,Ga,ya)));t=ma;d=T(d+T(E+T(g[q+504>>2])));break}else{d=T(d+T(w+T(ve(q,Ga,ya))));t=T(iA(t,T(ve(q,Ha,ya))));break}}while(0);z=z+1|0}while((z|0)!=(i|0))}else t=T(0.0);w=T(_+d);if(L){d=T(T(pe(b,Ha,T(ta+t),sa,k))-ta);if(M)d=T(kA(d,ma))}else d=ma;v=T(T(pe(b,Ha,T(ta+(V?ma:t)),sa,k))-ta);if(A&n)do{z=Rb(c[Ea>>2]|0,r)|0;do if((c[z+36>>2]|0)!=1){if((c[z+24>>2]|0)==1){if(te(z,Ha)|0){t=T(ue(z,Ha,ma));t=T(t+T(Zd(b,Ha)))}else t=T(Zd(b,Ha));E=T(t+T(Xd(z,Ha,ya)));g[z+400+(c[N>>2]<<2)>>2]=E;break}q=re(b,z)|0;o=c[O>>2]|0;do if((q|0)==4){if((c[z+60+(o<<3)+4>>2]|0)==3){Ba=140;break}if((c[z+60+(c[P>>2]<<3)+4>>2]|0)==3){Ba=140;break}if(qe(z,Ha,ma)|0){t=s;break}p=c[K>>2]|0;Ja=c[z+904+(p<<2)>>2]|0;c[ka>>2]=Ja;o=z+396|0;Ka=hc(T(g[o>>2]))|0;u=(c[j>>2]=Ja,T(g[j>>2]));if(Ka)t=v;else{D=T(Rd(z,Ha,ya));t=T(g[o>>2]);E=T(u/t);t=T(u*t);t=T(D+(Ca?E:t))}g[da>>2]=t;g[ka>>2]=T(T(Rd(z,Ga,ya))+u);c[ea>>2]=1;c[fa>>2]=1;se(T(je(z+380+(p<<3)|0,W)),ea,ka);se(T(je(z+380+(c[Q>>2]<<3)|0,ma)),fa,da);t=T(g[ka>>2]);D=T(g[da>>2]);E=Ca?t:D;t=Ca?D:t;Ka=((hc(E)|0)^1)&1;Qd(z,E,t,Da,Ka,((hc(t)|0)^1)&1,ya,oa,1,4635)|0;t=s}else Ba=140;while(0);e:do if((Ba|0)==140){Ba=0;t=T(d-T(ve(z,Ha,ya)));o=(c[z+60+(o<<3)+4>>2]|0)==3;p=(c[z+60+(c[P>>2]<<3)+4>>2]|0)==3;if(o&p){t=T(s+T(t*T(.5)));break}if(p){t=s;break}if(o){t=T(s+t);break}switch(q|0){case 1:{t=s;break e}case 2:{t=T(s+T(t*T(.5)));break e}default:{t=T(s+t);break e}}}while(0);E=T(ca+t);Ka=z+400+(c[N>>2]<<2)|0;g[Ka>>2]=T(E+T(g[Ka>>2]))}while(0);r=r+1|0}while((r|0)!=(i|0));ca=T(ca+v);ba=T(iA(ba,w));C=H+1|0;if(i>>>0>=Fa>>>0)break;else{w=W;r=i;H=C}}do if(n){o=C>>>0>1;if((!o?(c[b+12>>2]|0)!=4:0)?!(we(b)|0):0)break;if(!(hc(ma)|0)){d=T(ma-ca);f:do switch(c[b+12>>2]|0){case 3:{s=T(s+d);x=T(0.0);break}case 2:{s=T(s+T(d*T(.5)));x=T(0.0);break}case 4:{if(ma>ca)x=T(d/T(C>>>0));else x=T(0.0);break}case 7:if(ma>ca){s=T(s+T(d/T(C<<1>>>0)));x=T(d/T(C>>>0));x=o?x:T(0.0);break f}else{s=T(s+T(d*T(.5)));x=T(0.0);break f}case 6:{x=T(d/T(H>>>0));x=ma>ca&o?x:T(0.0);break}default:x=T(0.0)}while(0);if(C|0){A=1044+(Ha<<2)|0;i=1028+(Ha<<2)|0;z=0;p=0;while(1){g:do if(p>>>0<Fa>>>0){t=T(0.0);u=T(0.0);d=T(0.0);r=p;while(1){o=Rb(c[Ea>>2]|0,r)|0;do if((c[o+36>>2]|0)!=1?(c[o+24>>2]|0)==0:0){if((c[o+936>>2]|0)!=(z|0))break g;if(xe(o,Ha)|0){ja=T(g[o+904+(c[i>>2]<<2)>>2]);d=T(iA(d,T(ja+T(Rd(o,Ha,ya)))))}if((re(b,o)|0)!=5)break;ia=T(ye(o));ia=T(ia+T(Xd(o,0,ya)));ja=T(g[o+908>>2]);ja=T(T(ja+T(Rd(o,0,ya)))-ia);ia=T(iA(u,ia));ja=T(iA(t,ja));t=ja;u=ia;d=T(iA(d,T(ia+ja)))}while(0);o=r+1|0;if(o>>>0<Fa>>>0)r=o;else{r=o;break}}}else{u=T(0.0);d=T(0.0);r=p}while(0);w=T(x+d);v=s;s=T(s+w);if(p>>>0<r>>>0){u=T(v+u);o=p;do{q=Rb(c[Ea>>2]|0,o)|0;h:do if((c[q+36>>2]|0)!=1){if(c[q+24>>2]|0)break;switch(re(b,q)|0){case 1:{ja=T(v+T(Xd(q,Ha,ya)));g[q+400+(c[A>>2]<<2)>>2]=ja;break h}case 3:{ja=T(T(s-T(Yd(q,Ha,ya)))-T(g[q+904+(c[i>>2]<<2)>>2]));g[q+400+(c[A>>2]<<2)>>2]=ja;break h}case 2:{ja=T(v+T(T(w-T(g[q+904+(c[i>>2]<<2)>>2]))*T(.5)));g[q+400+(c[A>>2]<<2)>>2]=ja;break h}case 4:{ja=T(v+T(Xd(q,Ha,ya)));g[q+400+(c[A>>2]<<2)>>2]=ja;if(qe(q,Ha,ma)|0)break h;if(Ca){p=q+904|0;d=T(g[p>>2]);d=T(d+T(Rd(q,Ha,ya)));t=w}else{t=T(g[q+908>>2]);p=q+904|0;d=w;t=T(t+T(Rd(q,Ha,ya)))}if(Kd(d,T(g[p>>2]))|0?Kd(t,T(g[q+908>>2]))|0:0)break h;Qd(q,d,t,Da,1,1,ya,oa,1,4635)|0;break h}case 5:{g[q+404>>2]=T(T(u-T(ye(q)))+T(ue(q,0,ma)));break h}default:break h}}while(0);o=o+1|0}while((o|0)!=(r|0))}z=z+1|0;if((z|0)==(C|0))break;else p=r}}}}while(0);g[b+904>>2]=T(pe(b,2,pa,k,k));g[b+908>>2]=T(pe(b,0,na,m,k));if((la|0)!=0?(wa=c[b+32>>2]|0,xa=(la|0)==2,!(xa&(wa|0)!=2)):0){if(xa&(wa|0)==2){d=T(ra+W);d=T(iA(T(kA(d,T(ze(b,Ga,ba,qa)))),ra));Ba=199}}else{d=T(pe(b,Ga,ba,qa,k));Ba=199}if((Ba|0)==199)g[b+904+(c[1028+(Ga<<2)>>2]<<2)>>2]=d;if((ua|0)!=0?(za=c[b+32>>2]|0,Aa=(ua|0)==2,!(Aa&(za|0)!=2)):0){if(Aa&(za|0)==2){d=T(ta+ma);d=T(iA(T(kA(d,T(ze(b,Ha,T(ta+ca),sa)))),ta));Ba=205}}else{d=T(pe(b,Ha,T(ta+ca),sa,k));Ba=205}if((Ba|0)==205)g[b+904+(c[1028+(Ha<<2)>>2]<<2)>>2]=d;if(!n){l=Ia;return}if((c[va>>2]|0)==2){p=1028+(Ha<<2)|0;q=1044+(Ha<<2)|0;o=0;do{r=Xb(b,o)|0;if(!(c[r+24>>2]|0)){Ja=c[p>>2]|0;k=T(g[b+904+(Ja<<2)>>2]);Ka=r+400+(c[q>>2]<<2)|0;k=T(k-T(g[Ka>>2]));g[Ka>>2]=T(k-T(g[r+904+(Ja<<2)>>2]))}o=o+1|0}while((o|0)!=(Fa|0))}if(f|0){o=Ca?la:h;do{Ae(b,f,ya,o,oa,Da);f=c[f+948>>2]|0}while((f|0)!=0)}o=(Ga|2|0)==3;p=(Ha|2|0)==3;if(o|p)f=0;else{l=Ia;return}do{q=Rb(c[Ea>>2]|0,f)|0;if((c[q+36>>2]|0)!=1){if(o)Be(b,q,Ga);if(p)Be(b,q,Ha)}f=f+1|0}while((f|0)!=(Fa|0));l=Ia;return}function Vd(a,b){a=a|0;b=b|0;a=c[a>>2]|0;return ((a|0)==0?(b|0?b:1):a)|0}function Wd(a,b){a=a|0;b=b|0;var c=0;a:do if((b|0)==2){switch(a|0){case 2:{a=3;break a}case 3:break;default:{c=4;break a}}a=2}else c=4;while(0);return a|0}function Xd(a,b,d){a=a|0;b=b|0;d=T(d);if(fe(b)|0?(c[a+96>>2]|0)!=0:0)a=a+92|0;else a=Id(a+60|0,c[1044+(b<<2)>>2]|0,1012)|0;return T(He(a,d))}function Yd(a,b,d){a=a|0;b=b|0;d=T(d);if(fe(b)|0?(c[a+104>>2]|0)!=0:0)a=a+100|0;else a=Id(a+60|0,c[1060+(b<<2)>>2]|0,1012)|0;return T(He(a,d))}function Zd(a,b){a=a|0;b=b|0;var d=fb;if((fe(b)|0?c[a+312>>2]|0:0)?(d=T(g[a+308>>2]),d>=T(0.0)):0)return T(d);d=T(iA(T(g[(Id(a+276|0,c[1044+(b<<2)>>2]|0,1012)|0)>>2]),T(0.0)));return T(d)}function _d(a,b){a=a|0;b=b|0;var d=fb;if((fe(b)|0?c[a+320>>2]|0:0)?(d=T(g[a+316>>2]),d>=T(0.0)):0)return T(d);d=T(iA(T(g[(Id(a+276|0,c[1060+(b<<2)>>2]|0,1012)|0)>>2]),T(0.0)));return T(d)}function $d(a,b,d){a=a|0;b=b|0;d=T(d);var e=fb;if((fe(b)|0?c[a+240>>2]|0:0)?(e=T(je(a+236|0,d)),e>=T(0.0)):0)return T(e);e=T(iA(T(je(Id(a+204|0,c[1044+(b<<2)>>2]|0,1012)|0,d)),T(0.0)));return T(e)}function ae(a,b,d){a=a|0;b=b|0;d=T(d);var e=fb;if((fe(b)|0?c[a+248>>2]|0:0)?(e=T(je(a+244|0,d)),e>=T(0.0)):0)return T(e);e=T(iA(T(je(Id(a+204|0,c[1060+(b<<2)>>2]|0,1012)|0,d)),T(0.0)));return T(e)}function be(a,b,d,e,f,h,i){a=a|0;b=T(b);d=T(d);e=e|0;f=f|0;h=T(h);i=T(i);var j=0,k=fb,m=fb,n=fb,o=fb,p=fb,q=fb,r=0,s=0,t=0;t=l;l=l+16|0;j=t;r=t+8|0;s=a+952|0;if(!(c[s>>2]|0)){c[j>>2]=4724;Tb(0,2573,j);Qa()}k=T(ie(a,2,b));m=T(ie(a,0,b));n=T(Rd(a,2,b));n=T(b-n);o=T(n-k);p=T(d-T(Rd(a,0,b)));q=T(p-m);if((e|0)==1&(f|0)==1){g[a+904>>2]=T(pe(a,2,n,h,h));g[a+908>>2]=T(pe(a,0,p,i,h));l=t;return}if(o<=T(0.0)|q<=T(0.0)){g[a+904>>2]=T(pe(a,2,T(0.0),b,b));g[a+908>>2]=T(pe(a,0,T(0.0),d,b));l=t;return}else{yb[c[s>>2]&1](r,a,o,e,q,f);i=T(k+T(g[r>>2]));g[a+904>>2]=T(pe(a,2,(e|2|0)==2?i:n,b,b));i=T(m+T(g[r+4>>2]));g[a+908>>2]=T(pe(a,0,(f|2|0)==2?i:p,d,b));l=t;return}}function ce(a,b,c,d,e,f,h){a=a|0;b=T(b);c=T(c);d=d|0;e=e|0;f=T(f);h=T(h);var i=fb,j=fb,k=fb,l=fb;k=T(ie(a,2,f));i=T(ie(a,0,f));l=T(Rd(a,2,f));j=T(Rd(a,0,f));b=T(b-l);g[a+904>>2]=T(pe(a,2,(d|2|0)==2?k:b,f,f));c=T(c-j);g[a+908>>2]=T(pe(a,0,(e|2|0)==2?i:c,h,f));return}function de(a,b,c,d,e,f,h){a=a|0;b=T(b);c=T(c);d=d|0;e=e|0;f=T(f);h=T(h);var i=0,j=fb,k=fb;i=(d|0)==2;if((!(b<=T(0.0)&i)?!(c<=T(0.0)&(e|0)==2):0)?!((d|0)==1&(e|0)==1):0){i=0;return i|0}j=T(Rd(a,0,f));k=T(Rd(a,2,f));i=b<T(0.0)&i|(hc(b)|0);b=T(b-k);g[a+904>>2]=T(pe(a,2,i?T(0.0):b,f,f));b=T(c-j);i=c<T(0.0)&(e|0)==2|(hc(c)|0);g[a+908>>2]=T(pe(a,0,i?T(0.0):b,h,f));i=1;return i|0}function ee(a,b){a=a|0;b=b|0;if(!(Ee(a)|0)){b=0;return b|0}b=Wd(2,b)|0;return b|0}function fe(a){a=a|0;return (a|1|0)==3|0}function ge(a,b,c){a=a|0;b=b|0;c=T(c);c=T($d(a,b,c));return T(c+T(Zd(a,b)))}function he(a,b,c){a=a|0;b=b|0;c=T(c);c=T(ae(a,b,c));return T(c+T(_d(a,b)))}function ie(a,b,c){a=a|0;b=b|0;c=T(c);var d=fb;d=T(ge(a,b,c));return T(d+T(he(a,b,c)))}function je(a,b){a=a|0;b=T(b);switch(c[a+4>>2]|0){case 2:{b=T(T(T(g[a>>2])*b)/T(100.0));break}case 1:{b=T(g[a>>2]);break}default:b=T(t)}return T(b)}function ke(a){a=a|0;if(c[a+24>>2]|0){a=0;return a|0}if(T(gc(a))!=T(0.0)){a=1;return a|0}a=T(jc(a))!=T(0.0);return a|0}function le(b){b=b|0;var d=0,e=0;HA(b+400|0,0,536)|0;a[b+969>>0]=1;e=Wb(b)|0;if(!e)return;d=b+944|0;b=0;do{le(Rb(c[d>>2]|0,b)|0);b=b+1|0}while((b|0)!=(e|0));return}function me(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;f=l;l=l+16|0;e=f+8|0;d=f;b=a+380|0;if(!((c[a+384>>2]|0)!=0?(g=a+364|0,c[d>>2]=c[b>>2],c[d+4>>2]=c[b+4>>2],c[e>>2]=c[g>>2],c[e+4>>2]=c[g+4>>2],Ld(d,e)|0):0))b=a+348|0;c[a+972>>2]=b;b=a+388|0;if(c[a+392>>2]|0?(g=a+372|0,c[d>>2]=c[b>>2],c[d+4>>2]=c[b+4>>2],c[e>>2]=c[g>>2],c[e+4>>2]=c[g+4>>2],Ld(d,e)|0):0){e=b;g=a+976|0;c[g>>2]=e;l=f;return}e=a+356|0;g=a+976|0;c[g>>2]=e;l=f;return}function ne(a,b,d,e,f){a=a|0;b=b|0;d=T(d);e=T(e);f=T(f);var h=0,i=fb;h=Wd(c[a+4>>2]|0,b)|0;b=ee(h,b)|0;d=T(Ge(a,h,d));e=T(Ge(a,b,e));i=T(d+T(Xd(a,h,f)));g[a+400+(c[1044+(h<<2)>>2]<<2)>>2]=i;d=T(d+T(Yd(a,h,f)));g[a+400+(c[1060+(h<<2)>>2]<<2)>>2]=d;d=T(e+T(Xd(a,b,f)));g[a+400+(c[1044+(b<<2)>>2]<<2)>>2]=d;f=T(e+T(Yd(a,b,f)));g[a+400+(c[1060+(b<<2)>>2]<<2)>>2]=f;return}function oe(a,b,d,e,f,h,i,j,k){a=a|0;b=b|0;d=T(d);e=e|0;f=T(f);h=T(h);i=T(i);j=j|0;k=k|0;var m=fb,n=0,o=fb,p=0,q=fb,r=0,s=0,u=0,v=0,w=fb,x=fb,y=0,z=0,A=0,B=0,C=0,D=0,E=0;E=l;l=l+16|0;C=E+12|0;y=E+8|0;z=E+4|0;A=E;D=Wd(c[a+4>>2]|0,k)|0;B=fe(D)|0;m=T(je(lc(b)|0,B?h:i));n=qe(b,2,h)|0;r=qe(b,0,i)|0;do if(!(hc(m)|0)?!(hc(B?d:f)|0):0){n=b+504|0;if(!(hc(T(g[n>>2]))|0)){if(!(Fe(1)|0))break;if((c[b+500>>2]|0)==(c[2327]|0))break}g[n>>2]=T(iA(m,T(ie(b,D,h))))}else p=7;while(0);do if((p|0)==7){v=B^1;s=n^1;if(!(v|s)){i=T(je(c[b+972>>2]|0,h));g[b+504>>2]=T(iA(i,T(ie(b,2,h))));break}u=r^1;if(!(B|u)){i=T(je(c[b+976>>2]|0,i));g[b+504>>2]=T(iA(i,T(ie(b,0,h))));break}g[C>>2]=T(t);g[y>>2]=T(t);c[z>>2]=0;c[A>>2]=0;w=T(Rd(b,2,h));x=T(Rd(b,0,h));if(n){q=T(w+T(je(c[b+972>>2]|0,h)));g[C>>2]=q;c[z>>2]=1;p=1}else{p=0;q=T(t)}if(r){o=T(x+T(je(c[b+976>>2]|0,i)));g[y>>2]=o;c[A>>2]=1;n=1}else{n=0;o=T(t)}r=c[a+32>>2]|0;if(!(B&(r|0)==2)){if(hc(q)|0?!(hc(d)|0):0){g[C>>2]=d;c[z>>2]=2;q=d;p=2}}else r=2;if((!((r|0)==2&v)?hc(o)|0:0)?!(hc(f)|0):0){g[y>>2]=f;c[A>>2]=2;o=f;n=2}if(B){if((j|0)==1&u&((hc(f)|0)^1)?(re(a,b)|0)==4:0){g[y>>2]=f;c[A>>2]=1;n=1;o=f}}else if((e|0)==1&s&((hc(d)|0)^1)?(re(a,b)|0)==4:0){g[C>>2]=d;c[z>>2]=1;p=1;q=d}m=T(g[b+396>>2]);do if(!(hc(m)|0)){if((p|0)==1&v){n=0;m=T(T(q-w)/m)}else{if(!(B&(n|0)==1))break;n=2;m=T(m*T(o-x))}g[b+504>>2]=T(iA(m,T(ie(b,n,h))));l=E;return}while(0);se(T(je(b+380|0,h)),z,C);se(T(je(b+388|0,i)),A,y);w=T(g[C>>2]);x=T(g[y>>2]);Qd(b,w,x,k,c[z>>2]|0,c[A>>2]|0,h,i,0,4716)|0;i=T(g[b+904+(c[1028+(D<<2)>>2]<<2)>>2]);g[b+504>>2]=T(iA(i,T(ie(b,D,h))))}while(0);c[b+500>>2]=c[2327];l=E;return}function pe(a,b,c,d,e){a=a|0;b=b|0;c=T(c);d=T(d);e=T(e);d=T(ze(a,b,c,d));return T(iA(d,T(ie(a,b,e))))}function qe(a,b,d){a=a|0;b=b|0;d=T(d);a=c[a+972+(c[1028+(b<<2)>>2]<<2)>>2]|0;switch(c[a+4>>2]|0){case 1:{if(T(g[a>>2])<T(0.0)){b=0;return b|0}break}case 2:{if(T(g[a>>2])<T(0.0)){b=0;return b|0}b=(hc(d)|0)^1;return b|0}case 0:case 3:{b=0;return b|0}default:{}}b=1;return b|0}function re(a,b){a=a|0;b=b|0;b=b+20|0;b=c[((c[b>>2]|0)==0?a+16|0:b)>>2]|0;if((b|0)==5?Ee(c[a+4>>2]|0)|0:0){a=1;return a|0}a=b;return a|0}function se(a,b,d){a=T(a);b=b|0;d=d|0;var e=fb;switch(c[b>>2]|0){case 2:case 1:{b=hc(a)|0;e=T(g[d>>2]);g[d>>2]=b|e<a?e:a;return}case 0:{if(hc(a)|0)return;c[b>>2]=2;g[d>>2]=a;return}default:return}}function te(a,b){a=a|0;b=b|0;a=a+132|0;if(fe(b)|0?c[(Id(a,4,1e3)|0)+4>>2]|0:0){b=1;return b|0}b=(c[(Id(a,c[1044+(b<<2)>>2]|0,1e3)|0)+4>>2]|0)!=0;return b|0}function ue(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;a=a+132|0;if(!(fe(b)|0?(e=Id(a,4,1e3)|0,(c[e+4>>2]|0)!=0):0)){e=Id(a,c[1044+(b<<2)>>2]|0,1e3)|0;if(!(c[e+4>>2]|0)){d=T(0.0);return T(d)}}d=T(je(e,d));return T(d)}function ve(a,b,d){a=a|0;b=b|0;d=T(d);var e=fb;e=T(g[a+904+(c[1028+(b<<2)>>2]<<2)>>2]);e=T(e+T(Xd(a,b,d)));return T(e+T(Yd(a,b,d)))}function we(a){a=a|0;var b=0,d=0,e=0;if(Ee(c[a+4>>2]|0)|0){d=0;return d|0}if((c[a+16>>2]|0)==5){d=1;return d|0}d=Wb(a)|0;if(!d){d=0;return d|0}else b=0;while(1){e=Xb(a,b)|0;if((c[e+24>>2]|0)==0?(c[e+20>>2]|0)==5:0){b=1;a=7;break}b=b+1|0;if(b>>>0>=d>>>0){b=0;a=7;break}}if((a|0)==7)return b|0;return 0}function xe(a,b){a=a|0;b=b|0;var d=fb;d=T(g[a+904+(c[1028+(b<<2)>>2]<<2)>>2]);return d>=T(0.0)&((hc(d)|0)^1)|0}function ye(a){a=a|0;var b=0,d=fb,e=0,f=0,h=0,i=0,j=0,k=fb,m=0;j=l;l=l+16|0;e=j;b=c[a+956>>2]|0;if(b|0){k=T(g[a+904>>2]);d=T(g[a+908>>2]);d=T(ib[b&0](a,k,d));if(hc(d)|0){c[e>>2]=4666;Tb(0,2573,e);Qa()}else{k=d;l=j;return T(k)}}h=Wb(a)|0;if(h|0){e=0;f=0;while(1){b=Xb(a,f)|0;if(c[b+936>>2]|0){b=e;break}if((c[b+24>>2]|0)!=1){m=(re(a,b)|0)==5;if(m){i=11;break}else b=(e|0)==0?b:e}else b=e;f=f+1|0;if(f>>>0>=h>>>0)break;else e=b}if((i|0)==11){d=T(ye(b));m=b+404|0;k=T(g[m>>2]);k=T(d+k);l=j;return T(k)}if(b|0){m=b;d=T(ye(m));m=m+404|0;k=T(g[m>>2]);k=T(d+k);l=j;return T(k)}}k=T(g[a+908>>2]);l=j;return T(k)}function ze(a,b,c,d){a=a|0;b=b|0;c=T(c);d=T(d);var e=fb,f=0;if(!(Ee(b)|0))if(fe(b)|0){b=0;f=3}else{d=T(t);e=T(t)}else{b=1;f=3}if((f|0)==3){e=T(je(a+364+(b<<3)|0,d));d=T(je(a+380+(b<<3)|0,d))}f=d<c&(d>=T(0.0)&((hc(d)|0)^1));c=f?d:c;f=e>=T(0.0)&((hc(e)|0)^1)&c<e;return T(f?e:c)}function Ae(a,b,d,e,f,h){a=a|0;b=b|0;d=T(d);e=e|0;f=T(f);h=h|0;var i=fb,j=0,k=0,l=fb,m=fb,n=fb,o=0,p=0,q=0,r=0,s=fb,u=fb,v=0;p=Wd(c[a+4>>2]|0,h)|0;q=ee(p,h)|0;o=fe(p)|0;l=T(Rd(b,2,d));n=T(Rd(b,0,d));if(!(qe(b,2,d)|0))if(te(b,2)|0?Ce(b,2)|0:0){i=T(g[a+904>>2]);s=T(Zd(a,2));s=T(i-T(s+T(_d(a,2))));i=T(ue(b,2,d));i=T(pe(b,2,T(s-T(i+T(De(b,2,d)))),d,d))}else i=T(t);else i=T(l+T(je(c[b+972>>2]|0,d)));if(!(qe(b,0,f)|0))if(te(b,0)|0?Ce(b,0)|0:0){s=T(g[a+908>>2]);u=T(Zd(a,0));u=T(s-T(u+T(_d(a,0))));s=T(ue(b,0,f));f=T(pe(b,0,T(u-T(s+T(De(b,0,f)))),f,d))}else f=T(t);else f=T(n+T(je(c[b+976>>2]|0,f)));j=hc(i)|0;k=hc(f)|0;do if(j^k?(m=T(g[b+396>>2]),!(hc(m)|0)):0){if(j){i=T(T(f-n)*m);i=T(l+T(iA(i,T(ie(b,0,d)))));break}if(k){f=T(T(i-l)/m);f=T(n+T(iA(f,T(ie(b,2,d)))))}}while(0);k=hc(i)|0;j=hc(f)|0;if(k|j){v=(k^1)&1;e=d>T(0.0)&((e|0)!=0&k);i=o?i:e?d:i;Qd(b,i,f,h,o?v:e?2:v,k&(j^1)&1,i,f,0,4643)|0;i=T(g[b+904>>2]);i=T(i+T(Rd(b,2,d)));f=T(g[b+908>>2]);f=T(f+T(Rd(b,0,d)))}Qd(b,i,f,h,1,1,i,f,1,4655)|0;if(Ce(b,p)|0?!(te(b,p)|0):0){v=c[1028+(p<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));u=T(u-T(_d(a,p)));u=T(u-T(De(b,p,d)));g[b+400+(c[1044+(p<<2)>>2]<<2)>>2]=u}else r=22;do if((r|0)==22){if(!(te(b,p)|0)?(c[a+8>>2]|0)==1:0){v=c[1028+(p<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(T(u-T(g[b+904+(v<<2)>>2]))*T(.5));g[b+400+(c[1044+(p<<2)>>2]<<2)>>2]=u;break}if(!(te(b,p)|0)?(c[a+8>>2]|0)==2:0){v=c[1028+(p<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));g[b+400+(c[1044+(p<<2)>>2]<<2)>>2]=u}}while(0);if(Ce(b,q)|0?!(te(b,q)|0):0){v=c[1028+(q<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));u=T(u-T(_d(a,q)));u=T(u-T(De(b,q,d)));g[b+400+(c[1044+(q<<2)>>2]<<2)>>2]=u;return}if(!(te(b,q)|0)?(re(a,b)|0)==2:0){v=c[1028+(q<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(T(u-T(g[b+904+(v<<2)>>2]))*T(.5));g[b+400+(c[1044+(q<<2)>>2]<<2)>>2]=u;return}if(te(b,q)|0)return;if((re(a,b)|0)!=3)return;v=c[1028+(q<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));g[b+400+(c[1044+(q<<2)>>2]<<2)>>2]=u;return}function Be(a,b,d){a=a|0;b=b|0;d=d|0;var e=fb,f=0;f=c[1028+(d<<2)>>2]|0;e=T(g[b+904+(f<<2)>>2]);e=T(T(g[a+904+(f<<2)>>2])-e);e=T(e-T(g[b+400+(c[1044+(d<<2)>>2]<<2)>>2]));g[b+400+(c[1060+(d<<2)>>2]<<2)>>2]=e;return}function Ce(a,b){a=a|0;b=b|0;a=a+132|0;if(fe(b)|0?c[(Id(a,5,1e3)|0)+4>>2]|0:0){b=1;return b|0}b=(c[(Id(a,c[1060+(b<<2)>>2]|0,1e3)|0)+4>>2]|0)!=0;return b|0}function De(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;a=a+132|0;if(!(fe(b)|0?(e=Id(a,5,1e3)|0,(c[e+4>>2]|0)!=0):0)){e=Id(a,c[1060+(b<<2)>>2]|0,1e3)|0;if(!(c[e+4>>2]|0)){d=T(0.0);return T(d)}}d=T(je(e,d));return T(d)}function Ee(a){a=a|0;return (a|1|0)==1|0}function Fe(b){b=b|0;return (a[11740+b>>0]|0)!=0|0}function Ge(a,b,c){a=a|0;b=b|0;c=T(c);if(te(a,b)|0){c=T(ue(a,b,c));return T(c)}else{c=T(-T(De(a,b,c)));return T(c)}return fb}function He(a,b){a=a|0;b=T(b);if((c[a+4>>2]|0)==3){b=T(0.0);return T(b)}b=T(je(a,b));return T(b)}function Ie(b,d,e,f){b=b|0;d=T(d);e=T(e);f=f|0;var g=fb,h=fb,i=0,j=0;c[2327]=(c[2327]|0)+1;me(b);do if(hc(d)|0){if(qe(b,2,d)|0){g=T(je(c[b+972>>2]|0,d));j=1;g=T(g+T(Rd(b,2,d)));break}g=T(je(b+380|0,d));if(!(g>=T(0.0))){j=0;g=d}else j=2}else{j=1;g=d}while(0);do if(hc(e)|0){if(qe(b,0,e)|0){h=T(je(c[b+976>>2]|0,e));i=1;h=T(h+T(Rd(b,0,d)));break}h=T(je(b+388|0,e));if(!(h>=T(0.0))){i=0;h=e}else i=2}else{i=1;h=e}while(0);if(!(Qd(b,g,h,f,j,i,d,e,1,4895)|0))return;ne(b,c[b+496>>2]|0,d,e,d);if(Fe(0)|0)Je(b);if(!(a[11736]|0))return;Cd(b,7);return}function Je(a){a=a|0;var b=0,d=0,e=fb,f=fb,h=0,i=fb,j=fb,k=fb;b=a+400|0;f=T(g[b>>2]);j=T(f-T(B(T(f))));d=a+404|0;e=T(g[d>>2]);i=T(e-T(B(T(e))));h=a+416|0;k=T(+GA(+T(j+T(g[h>>2]))));g[h>>2]=T(k-T(+GA(+j)));h=a+420|0;j=T(+GA(+T(i+T(g[h>>2]))));g[h>>2]=T(j-T(+GA(+i)));g[b>>2]=T(+GA(+f));g[d>>2]=T(+GA(+e));d=Nb(c[a+944>>2]|0)|0;if(!d)return;else b=0;do{Je(Xb(a,b)|0);b=b+1|0}while((b|0)!=(d|0));return}function Ke(b,c){b=b|0;c=c|0;a[11740+b>>0]=c&1;return}function Le(){var a=0;a=zA(8)|0;Me(a);return a|0}function Me(a){a=a|0;var b=0;b=Sb()|0;c[a>>2]=b;c[a+4>>2]=0;nc(b,a);return}function Ne(a){a=a|0;if(a|0){Oe(a);BA(a)}return}function Oe(a){a=a|0;var b=0;Vb(c[a>>2]|0);b=a+4|0;a=c[b>>2]|0;c[b>>2]=0;if(a|0){Pe(a);BA(a)}return}function Pe(a){a=a|0;Qe(a);return}function Qe(a){a=a|0;a=c[a>>2]|0;if(a|0)Za(a|0);return}function Re(a){a=a|0;return oc(a)|0}function Se(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){Pe(b);BA(b)}_b(c[a>>2]|0);return}function Te(a,b){a=a|0;b=b|0;fc(c[a>>2]|0,c[b>>2]|0);return}function Ue(a,b){a=a|0;b=b|0;Bc(c[a>>2]|0,b);return}function Ve(a,b,d){a=a|0;b=b|0;d=+d;Nc(c[a>>2]|0,b,T(d));return}function We(a,b,d){a=a|0;b=b|0;d=+d;Oc(c[a>>2]|0,b,T(d));return}function Xe(a,b){a=a|0;b=b|0;vc(c[a>>2]|0,b);return}function Ye(a,b){a=a|0;b=b|0;xc(c[a>>2]|0,b);return}function Ze(a,b){a=a|0;b=b|0;zc(c[a>>2]|0,b);return}function _e(a,b){a=a|0;b=b|0;rc(c[a>>2]|0,b);return}function $e(a,b){a=a|0;b=b|0;Dc(c[a>>2]|0,b);return}function af(a,b){a=a|0;b=b|0;tc(c[a>>2]|0,b);return}function bf(a,b,d){a=a|0;b=b|0;d=+d;Qc(c[a>>2]|0,b,T(d));return}function cf(a,b,d){a=a|0;b=b|0;d=+d;Rc(c[a>>2]|0,b,T(d));return}function df(a,b){a=a|0;b=b|0;Tc(c[a>>2]|0,b);return}function ef(a,b){a=a|0;b=b|0;Fc(c[a>>2]|0,b);return}function ff(a,b){a=a|0;b=b|0;Hc(c[a>>2]|0,b);return}function gf(a,b){a=a|0;b=+b;mc(c[a>>2]|0,T(b));return}function hf(a,b){a=a|0;b=+b;Lc(c[a>>2]|0,T(b));return}function jf(a,b){a=a|0;b=+b;Mc(c[a>>2]|0,T(b));return}function kf(a,b){a=a|0;b=+b;Jc(c[a>>2]|0,T(b));return}function lf(a,b){a=a|0;b=+b;Kc(c[a>>2]|0,T(b));return}function mf(a,b){a=a|0;b=+b;Zc(c[a>>2]|0,T(b));return}function nf(a,b){a=a|0;b=+b;_c(c[a>>2]|0,T(b));return}function of(a){a=a|0;$c(c[a>>2]|0);return}function pf(a,b){a=a|0;b=+b;bd(c[a>>2]|0,T(b));return}function qf(a,b){a=a|0;b=+b;cd(c[a>>2]|0,T(b));return}function rf(a){a=a|0;dd(c[a>>2]|0);return}function sf(a,b){a=a|0;b=+b;fd(c[a>>2]|0,T(b));return}function tf(a,b){a=a|0;b=+b;gd(c[a>>2]|0,T(b));return}function uf(a,b){a=a|0;b=+b;id(c[a>>2]|0,T(b));return}function vf(a,b){a=a|0;b=+b;jd(c[a>>2]|0,T(b));return}function wf(a,b){a=a|0;b=+b;ld(c[a>>2]|0,T(b));return}function xf(a,b){a=a|0;b=+b;md(c[a>>2]|0,T(b));return}function yf(a,b){a=a|0;b=+b;od(c[a>>2]|0,T(b));return}function zf(a,b){a=a|0;b=+b;pd(c[a>>2]|0,T(b));return}function Af(a,b){a=a|0;b=+b;rd(c[a>>2]|0,T(b));return}function Bf(a,b,d){a=a|0;b=b|0;d=+d;Xc(c[a>>2]|0,b,T(d));return}function Cf(a,b,d){a=a|0;b=b|0;d=+d;Uc(c[a>>2]|0,b,T(d));return}function Df(a,b,d){a=a|0;b=b|0;d=+d;Vc(c[a>>2]|0,b,T(d));return}function Ef(a){a=a|0;return Cc(c[a>>2]|0)|0}function Ff(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Pc(f,c[b>>2]|0,d);Gf(a,f);l=e;return}function Gf(a,b){a=a|0;b=b|0;Hf(a,c[b+4>>2]|0,+T(g[b>>2]));return}function Hf(a,b,d){a=a|0;b=b|0;d=+d;c[a>>2]=b;h[a+8>>3]=d;return}function If(a){a=a|0;return wc(c[a>>2]|0)|0}function Jf(a){a=a|0;return yc(c[a>>2]|0)|0}function Kf(a){a=a|0;return Ac(c[a>>2]|0)|0}function Lf(a){a=a|0;return sc(c[a>>2]|0)|0}function Mf(a){a=a|0;return Ec(c[a>>2]|0)|0}function Nf(a){a=a|0;return uc(c[a>>2]|0)|0}function Of(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Sc(f,c[b>>2]|0,d);Gf(a,f);l=e;return}function Pf(a){a=a|0;return Gc(c[a>>2]|0)|0}function Qf(a){a=a|0;return Ic(c[a>>2]|0)|0}function Rf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;kc(e,c[b>>2]|0);Gf(a,e);l=d;return}function Sf(a){a=a|0;return +(+T(gc(c[a>>2]|0)))}function Tf(a){a=a|0;return +(+T(jc(c[a>>2]|0)))}function Uf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;ad(e,c[b>>2]|0);Gf(a,e);l=d;return}function Vf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;ed(e,c[b>>2]|0);Gf(a,e);l=d;return}function Wf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;hd(e,c[b>>2]|0);Gf(a,e);l=d;return}function Xf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;kd(e,c[b>>2]|0);Gf(a,e);l=d;return}function Yf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;nd(e,c[b>>2]|0);Gf(a,e);l=d;return}function Zf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;qd(e,c[b>>2]|0);Gf(a,e);l=d;return}function _f(a){a=a|0;return +(+T(sd(c[a>>2]|0)))}function $f(a,b){a=a|0;b=b|0;return +(+T(Yc(c[a>>2]|0,b)))}function ag(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Wc(f,c[b>>2]|0,d);Gf(a,f);l=e;return}function bg(a,b,d){a=a|0;b=b|0;d=d|0;bc(c[a>>2]|0,c[b>>2]|0,d);return}function cg(a,b){a=a|0;b=b|0;Yb(c[a>>2]|0,c[b>>2]|0);return}function dg(a){a=a|0;return Wb(c[a>>2]|0)|0}function eg(a){a=a|0;a=cc(c[a>>2]|0)|0;if(!a)a=0;else a=Re(a)|0;return a|0}function fg(a,b){a=a|0;b=b|0;a=Xb(c[a>>2]|0,b)|0;if(!a)a=0;else a=Re(a)|0;return a|0}function gg(a,b){a=a|0;b=b|0;var d=0,e=0;e=zA(4)|0;hg(e,b);d=a+4|0;b=c[d>>2]|0;c[d>>2]=e;if(b|0){Pe(b);BA(b)}ac(c[a>>2]|0,1);return}function hg(a,b){a=a|0;b=b|0;Bg(a,b);return}function ig(a,b,c,d,e,f){a=a|0;b=b|0;c=T(c);d=d|0;e=T(e);f=f|0;var i=0,j=0;i=l;l=l+16|0;j=i;jg(j,oc(b)|0,+c,d,+e,f);g[a>>2]=T(+h[j>>3]);g[a+4>>2]=T(+h[j+8>>3]);l=i;return}function jg(a,b,d,e,f,g){a=a|0;b=b|0;d=+d;e=e|0;f=+f;g=g|0;var i=0,j=0,k=0,m=0,n=0;i=l;l=l+32|0;n=i+8|0;m=i+20|0;k=i;j=i+16|0;h[n>>3]=d;c[m>>2]=e;h[k>>3]=f;c[j>>2]=g;kg(a,c[b+4>>2]|0,n,m,k,j);l=i;return}function kg(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var i=0,j=0;i=l;l=l+16|0;j=i;Wy(j);b=lg(b)|0;mg(a,b,+h[d>>3],c[e>>2]|0,+h[f>>3],c[g>>2]|0);Yy(j);l=i;return}function lg(a){a=a|0;return c[a>>2]|0}function mg(a,b,c,d,e,f){a=a|0;b=b|0;c=+c;d=d|0;e=+e;f=f|0;var g=0;g=og(ng()|0)|0;c=+pg(c);d=qg(d)|0;e=+pg(e);rg(a,$a(0,g|0,b|0,+c,d|0,+e,qg(f)|0)|0);return}function ng(){var b=0;if(!(a[8840]|0)){yg(9316);b=8840;c[b>>2]=1;c[b+4>>2]=0}return 9316}function og(a){a=a|0;return c[a+8>>2]|0}function pg(a){a=+a;return +(+xg(a))}function qg(a){a=a|0;return wg(a)|0}function rg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;d=f;e=b;if(!(e&1)){c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[a+12>>2]=c[b+12>>2]}else{sg(d,0);Ha(e|0,d|0)|0;tg(a,d);ug(d)}l=f;return}function sg(b,d){b=b|0;d=d|0;vg(b,d);c[b+8>>2]=0;a[b+24>>0]=0;return}function tg(a,b){a=a|0;b=b|0;b=b+8|0;c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[a+12>>2]=c[b+12>>2];return}function ug(b){b=b|0;a[b+24>>0]=0;return}function vg(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function wg(a){a=a|0;return a|0}function xg(a){a=+a;return +a}function yg(a){a=a|0;Ag(a,zg()|0,4);return}function zg(){return 1100}function Ag(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=Xa(b|0,d+1|0)|0;return}function Bg(a,b){a=a|0;b=b|0;b=c[b>>2]|0;c[a>>2]=b;ya(b|0);return}function Cg(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){Pe(b);BA(b)}ac(c[a>>2]|0,0);return}function Dg(a){a=a|0;dc(c[a>>2]|0);return}function Eg(a){a=a|0;return ec(c[a>>2]|0)|0}function Fg(a,b){a=a|0;b=b|0;pc(c[a>>2]|0,b);return}function Gg(a){a=a|0;return qc(c[a>>2]|0)|0}function Hg(a,b,d,e){a=a|0;b=+b;d=+d;e=e|0;Ie(c[a>>2]|0,T(b),T(d),e);return}function Ig(a){a=a|0;return +(+T(td(c[a>>2]|0)))}function Jg(a){a=a|0;return +(+T(vd(c[a>>2]|0)))}function Kg(a){a=a|0;return +(+T(ud(c[a>>2]|0)))}function Lg(a){a=a|0;return +(+T(wd(c[a>>2]|0)))}function Mg(a){a=a|0;return +(+T(xd(c[a>>2]|0)))}function Ng(a){a=a|0;return +(+T(yd(c[a>>2]|0)))}function Og(a,b){a=a|0;b=b|0;h[a>>3]=+T(td(c[b>>2]|0));h[a+8>>3]=+T(vd(c[b>>2]|0));h[a+16>>3]=+T(ud(c[b>>2]|0));h[a+24>>3]=+T(wd(c[b>>2]|0));h[a+32>>3]=+T(xd(c[b>>2]|0));h[a+40>>3]=+T(yd(c[b>>2]|0));return}function Pg(a,b){a=a|0;b=b|0;return +(+T(zd(c[a>>2]|0,b)))}function Qg(a,b){a=a|0;b=b|0;return +(+T(Ad(c[a>>2]|0,b)))}function Rg(a,b){a=a|0;b=b|0;return +(+T(Bd(c[a>>2]|0,b)))}function Sg(a,b){a=a|0;b=b|0;Ke(a,b);return}function Tg(a){a=a|0;return Fe(a)|0}function Ug(){return $b()|0}function Vg(){Wg();Xg();Yg();Zg();_g();$g();ah();return}function Wg(){lt(11756,6156,1);return}function Xg(){Vs(11755,6127,3);return}function Yg(){Es(11754,6110,1);return}function Zg(){Sr(10416);return}function _g(){yr(10376);return}function $g(){Pq(10292);return}function ah(){bh(9328);return}function bh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0;b=l;l=l+688|0;d=b+672|0;Ia=b+664|0;Ha=b+656|0;Ga=b+648|0;Fa=b+640|0;Ea=b+632|0;Da=b+624|0;Ca=b+616|0;Ba=b+608|0;Aa=b+600|0;za=b+592|0;ya=b+584|0;xa=b+576|0;wa=b+568|0;va=b+560|0;ua=b+552|0;ta=b+544|0;sa=b+536|0;ra=b+528|0;qa=b+520|0;pa=b+512|0;oa=b+504|0;na=b+496|0;ma=b+488|0;la=b+480|0;ka=b+472|0;ja=b+464|0;ia=b+456|0;ha=b+448|0;ga=b+440|0;fa=b+432|0;ea=b+424|0;da=b+416|0;ca=b+408|0;ba=b+400|0;aa=b+392|0;$=b+384|0;_=b+376|0;Z=b+368|0;Y=b+360|0;X=b+352|0;W=b+344|0;V=b+336|0;U=b+328|0;T=b+320|0;S=b+312|0;R=b+304|0;Q=b+296|0;P=b+288|0;O=b+280|0;N=b+272|0;M=b+264|0;L=b+256|0;K=b+248|0;J=b+240|0;I=b+232|0;H=b+224|0;G=b+216|0;F=b+208|0;E=b+200|0;D=b+192|0;C=b+184|0;B=b+176|0;A=b+168|0;z=b+160|0;y=b+152|0;x=b+144|0;w=b+136|0;v=b+128|0;u=b+120|0;t=b+112|0;s=b+104|0;r=b+96|0;q=b+88|0;p=b+80|0;o=b+72|0;n=b+64|0;m=b+56|0;k=b+48|0;j=b+40|0;i=b+32|0;h=b+24|0;g=b+16|0;f=b+8|0;e=b;ch(a,4903);dh(a,4908,2)|0;eh(a,4915,18)|0;c[Ia>>2]=19;c[Ia+4>>2]=0;c[d>>2]=c[Ia>>2];c[d+4>>2]=c[Ia+4>>2];fh(a,4923,d)|0;c[Ha>>2]=2;c[Ha+4>>2]=0;c[d>>2]=c[Ha>>2];c[d+4>>2]=c[Ha+4>>2];gh(a,4929,d)|0;c[Ga>>2]=3;c[Ga+4>>2]=0;c[d>>2]=c[Ga>>2];c[d+4>>2]=c[Ga+4>>2];hh(a,4939,d)|0;c[Fa>>2]=1;c[Fa+4>>2]=0;c[d>>2]=c[Fa>>2];c[d+4>>2]=c[Fa+4>>2];ih(a,4955,d)|0;c[Ea>>2]=2;c[Ea+4>>2]=0;c[d>>2]=c[Ea>>2];c[d+4>>2]=c[Ea+4>>2];ih(a,4967,d)|0;c[Da>>2]=4;c[Da+4>>2]=0;c[d>>2]=c[Da>>2];c[d+4>>2]=c[Da+4>>2];hh(a,4986,d)|0;c[Ca>>2]=5;c[Ca+4>>2]=0;c[d>>2]=c[Ca>>2];c[d+4>>2]=c[Ca+4>>2];hh(a,5002,d)|0;c[Ba>>2]=6;c[Ba+4>>2]=0;c[d>>2]=c[Ba>>2];c[d+4>>2]=c[Ba+4>>2];hh(a,5016,d)|0;c[Aa>>2]=7;c[Aa+4>>2]=0;c[d>>2]=c[Aa>>2];c[d+4>>2]=c[Aa+4>>2];hh(a,5029,d)|0;c[za>>2]=8;c[za+4>>2]=0;c[d>>2]=c[za>>2];c[d+4>>2]=c[za+4>>2];hh(a,5046,d)|0;c[ya>>2]=9;c[ya+4>>2]=0;c[d>>2]=c[ya>>2];c[d+4>>2]=c[ya+4>>2];hh(a,5058,d)|0;c[xa>>2]=3;c[xa+4>>2]=0;c[d>>2]=c[xa>>2];c[d+4>>2]=c[xa+4>>2];ih(a,5076,d)|0;c[wa>>2]=4;c[wa+4>>2]=0;c[d>>2]=c[wa>>2];c[d+4>>2]=c[wa+4>>2];ih(a,5086,d)|0;c[va>>2]=10;c[va+4>>2]=0;c[d>>2]=c[va>>2];c[d+4>>2]=c[va+4>>2];hh(a,5103,d)|0;c[ua>>2]=11;c[ua+4>>2]=0;c[d>>2]=c[ua>>2];c[d+4>>2]=c[ua+4>>2];hh(a,5117,d)|0;c[ta>>2]=12;c[ta+4>>2]=0;c[d>>2]=c[ta>>2];c[d+4>>2]=c[ta+4>>2];hh(a,5129,d)|0;c[sa>>2]=1;c[sa+4>>2]=0;c[d>>2]=c[sa>>2];c[d+4>>2]=c[sa+4>>2];jh(a,5140,d)|0;c[ra>>2]=2;c[ra+4>>2]=0;c[d>>2]=c[ra>>2];c[d+4>>2]=c[ra+4>>2];jh(a,5148,d)|0;c[qa>>2]=3;c[qa+4>>2]=0;c[d>>2]=c[qa>>2];c[d+4>>2]=c[qa+4>>2];jh(a,5161,d)|0;c[pa>>2]=4;c[pa+4>>2]=0;c[d>>2]=c[pa>>2];c[d+4>>2]=c[pa+4>>2];jh(a,5181,d)|0;c[oa>>2]=5;c[oa+4>>2]=0;c[d>>2]=c[oa>>2];c[d+4>>2]=c[oa+4>>2];jh(a,5193,d)|0;c[na>>2]=6;c[na+4>>2]=0;c[d>>2]=c[na>>2];c[d+4>>2]=c[na+4>>2];jh(a,5207,d)|0;c[ma>>2]=7;c[ma+4>>2]=0;c[d>>2]=c[ma>>2];c[d+4>>2]=c[ma+4>>2];jh(a,5216,d)|0;c[la>>2]=20;c[la+4>>2]=0;c[d>>2]=c[la>>2];c[d+4>>2]=c[la+4>>2];fh(a,5232,d)|0;c[ka>>2]=8;c[ka+4>>2]=0;c[d>>2]=c[ka>>2];c[d+4>>2]=c[ka+4>>2];jh(a,5245,d)|0;c[ja>>2]=9;c[ja+4>>2]=0;c[d>>2]=c[ja>>2];c[d+4>>2]=c[ja+4>>2];jh(a,5255,d)|0;c[ia>>2]=21;c[ia+4>>2]=0;c[d>>2]=c[ia>>2];c[d+4>>2]=c[ia+4>>2];fh(a,5272,d)|0;c[ha>>2]=10;c[ha+4>>2]=0;c[d>>2]=c[ha>>2];c[d+4>>2]=c[ha+4>>2];jh(a,5286,d)|0;c[ga>>2]=11;c[ga+4>>2]=0;c[d>>2]=c[ga>>2];c[d+4>>2]=c[ga+4>>2];jh(a,5298,d)|0;c[fa>>2]=12;c[fa+4>>2]=0;c[d>>2]=c[fa>>2];c[d+4>>2]=c[fa+4>>2];jh(a,5317,d)|0;c[ea>>2]=13;c[ea+4>>2]=0;c[d>>2]=c[ea>>2];c[d+4>>2]=c[ea+4>>2];jh(a,5330,d)|0;c[da>>2]=14;c[da+4>>2]=0;c[d>>2]=c[da>>2];c[d+4>>2]=c[da+4>>2];jh(a,5350,d)|0;c[ca>>2]=15;c[ca+4>>2]=0;c[d>>2]=c[ca>>2];c[d+4>>2]=c[ca+4>>2];jh(a,5362,d)|0;c[ba>>2]=16;c[ba+4>>2]=0;c[d>>2]=c[ba>>2];c[d+4>>2]=c[ba+4>>2];jh(a,5381,d)|0;c[aa>>2]=17;c[aa+4>>2]=0;c[d>>2]=c[aa>>2];c[d+4>>2]=c[aa+4>>2];jh(a,5394,d)|0;c[$>>2]=18;c[$+4>>2]=0;c[d>>2]=c[$>>2];c[d+4>>2]=c[$+4>>2];jh(a,5414,d)|0;c[_>>2]=5;c[_+4>>2]=0;c[d>>2]=c[_>>2];c[d+4>>2]=c[_+4>>2];ih(a,5429,d)|0;c[Z>>2]=6;c[Z+4>>2]=0;c[d>>2]=c[Z>>2];c[d+4>>2]=c[Z+4>>2];ih(a,5439,d)|0;c[Y>>2]=7;c[Y+4>>2]=0;c[d>>2]=c[Y>>2];c[d+4>>2]=c[Y+4>>2];ih(a,5450,d)|0;c[X>>2]=4;c[X+4>>2]=0;c[d>>2]=c[X>>2];c[d+4>>2]=c[X+4>>2];kh(a,5468,d)|0;c[W>>2]=1;c[W+4>>2]=0;c[d>>2]=c[W>>2];c[d+4>>2]=c[W+4>>2];lh(a,5484,d)|0;c[V>>2]=5;c[V+4>>2]=0;c[d>>2]=c[V>>2];c[d+4>>2]=c[V+4>>2];kh(a,5496,d)|0;c[U>>2]=6;c[U+4>>2]=0;c[d>>2]=c[U>>2];c[d+4>>2]=c[U+4>>2];kh(a,5512,d)|0;c[T>>2]=7;c[T+4>>2]=0;c[d>>2]=c[T>>2];c[d+4>>2]=c[T+4>>2];kh(a,5526,d)|0;c[S>>2]=8;c[S+4>>2]=0;c[d>>2]=c[S>>2];c[d+4>>2]=c[S+4>>2];kh(a,5539,d)|0;c[R>>2]=9;c[R+4>>2]=0;c[d>>2]=c[R>>2];c[d+4>>2]=c[R+4>>2];kh(a,5556,d)|0;c[Q>>2]=10;c[Q+4>>2]=0;c[d>>2]=c[Q>>2];c[d+4>>2]=c[Q+4>>2];kh(a,5568,d)|0;c[P>>2]=2;c[P+4>>2]=0;c[d>>2]=c[P>>2];c[d+4>>2]=c[P+4>>2];lh(a,5586,d)|0;c[O>>2]=13;c[O+4>>2]=0;c[d>>2]=c[O>>2];c[d+4>>2]=c[O+4>>2];mh(a,5596,d)|0;c[N>>2]=1;c[N+4>>2]=0;c[d>>2]=c[N>>2];c[d+4>>2]=c[N+4>>2];nh(a,5609,d)|0;c[M>>2]=2;c[M+4>>2]=0;c[d>>2]=c[M>>2];c[d+4>>2]=c[M+4>>2];nh(a,5621,d)|0;c[L>>2]=14;c[L+4>>2]=0;c[d>>2]=c[L>>2];c[d+4>>2]=c[L+4>>2];mh(a,5635,d)|0;c[K>>2]=15;c[K+4>>2]=0;c[d>>2]=c[K>>2];c[d+4>>2]=c[K+4>>2];mh(a,5644,d)|0;c[J>>2]=16;c[J+4>>2]=0;c[d>>2]=c[J>>2];c[d+4>>2]=c[J+4>>2];mh(a,5654,d)|0;c[I>>2]=17;c[I+4>>2]=0;c[d>>2]=c[I>>2];c[d+4>>2]=c[I+4>>2];mh(a,5666,d)|0;c[H>>2]=18;c[H+4>>2]=0;c[d>>2]=c[H>>2];c[d+4>>2]=c[H+4>>2];mh(a,5679,d)|0;c[G>>2]=19;c[G+4>>2]=0;c[d>>2]=c[G>>2];c[d+4>>2]=c[G+4>>2];mh(a,5691,d)|0;c[F>>2]=3;c[F+4>>2]=0;c[d>>2]=c[F>>2];c[d+4>>2]=c[F+4>>2];nh(a,5704,d)|0;c[E>>2]=1;c[E+4>>2]=0;c[d>>2]=c[E>>2];c[d+4>>2]=c[E+4>>2];oh(a,5719,d)|0;c[D>>2]=11;c[D+4>>2]=0;c[d>>2]=c[D>>2];c[d+4>>2]=c[D+4>>2];kh(a,5729,d)|0;c[C>>2]=12;c[C+4>>2]=0;c[d>>2]=c[C>>2];c[d+4>>2]=c[C+4>>2];kh(a,5741,d)|0;c[B>>2]=3;c[B+4>>2]=0;c[d>>2]=c[B>>2];c[d+4>>2]=c[B+4>>2];lh(a,5752,d)|0;c[A>>2]=4;c[A+4>>2]=0;c[d>>2]=c[A>>2];c[d+4>>2]=c[A+4>>2];ph(a,5763,d)|0;c[z>>2]=20;c[z+4>>2]=0;c[d>>2]=c[z>>2];c[d+4>>2]=c[z+4>>2];qh(a,5775,d)|0;c[y>>2]=13;c[y+4>>2]=0;c[d>>2]=c[y>>2];c[d+4>>2]=c[y+4>>2];rh(a,5787,d)|0;c[x>>2]=14;c[x+4>>2]=0;c[d>>2]=c[x>>2];c[d+4>>2]=c[x+4>>2];sh(a,5801,d)|0;c[w>>2]=3;c[w+4>>2]=0;c[d>>2]=c[w>>2];c[d+4>>2]=c[w+4>>2];th(a,5811,d)|0;c[v>>2]=21;c[v+4>>2]=0;c[d>>2]=c[v>>2];c[d+4>>2]=c[v+4>>2];uh(a,5820,d)|0;c[u>>2]=22;c[u+4>>2]=0;c[d>>2]=c[u>>2];c[d+4>>2]=c[u+4>>2];fh(a,5835,d)|0;c[t>>2]=22;c[t+4>>2]=0;c[d>>2]=c[t>>2];c[d+4>>2]=c[t+4>>2];vh(a,5852,d)|0;c[s>>2]=15;c[s+4>>2]=0;c[d>>2]=c[s>>2];c[d+4>>2]=c[s+4>>2];wh(a,5868,d)|0;c[r>>2]=23;c[r+4>>2]=0;c[d>>2]=c[r>>2];c[d+4>>2]=c[r+4>>2];fh(a,5884,d)|0;c[q>>2]=16;c[q+4>>2]=0;c[d>>2]=c[q>>2];c[d+4>>2]=c[q+4>>2];wh(a,5894,d)|0;c[p>>2]=1;c[p+4>>2]=0;c[d>>2]=c[p>>2];c[d+4>>2]=c[p+4>>2];xh(a,5902,d)|0;c[o>>2]=4;c[o+4>>2]=0;c[d>>2]=c[o>>2];c[d+4>>2]=c[o+4>>2];nh(a,5918,d)|0;c[n>>2]=5;c[n+4>>2]=0;c[d>>2]=c[n>>2];c[d+4>>2]=c[n+4>>2];nh(a,5934,d)|0;c[m>>2]=6;c[m+4>>2]=0;c[d>>2]=c[m>>2];c[d+4>>2]=c[m+4>>2];nh(a,5951,d)|0;c[k>>2]=7;c[k+4>>2]=0;c[d>>2]=c[k>>2];c[d+4>>2]=c[k+4>>2];nh(a,5966,d)|0;c[j>>2]=8;c[j+4>>2]=0;c[d>>2]=c[j>>2];c[d+4>>2]=c[j+4>>2];nh(a,5984,d)|0;c[i>>2]=9;c[i+4>>2]=0;c[d>>2]=c[i>>2];c[d+4>>2]=c[i+4>>2];nh(a,6001,d)|0;c[h>>2]=23;c[h+4>>2]=0;c[d>>2]=c[h>>2];c[d+4>>2]=c[h+4>>2];yh(a,6019,d)|0;c[g>>2]=2;c[g+4>>2]=0;c[d>>2]=c[g>>2];c[d+4>>2]=c[g+4>>2];oh(a,6037,d)|0;c[f>>2]=3;c[f+4>>2]=0;c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];oh(a,6055,d)|0;c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];oh(a,6073,d)|0;l=b;return}function ch(a,b){a=a|0;b=b|0;var d=0;d=Eq()|0;c[a>>2]=d;Fq(d,b);Jt(c[a>>2]|0);return}function dh(a,b,c){a=a|0;b=b|0;c=c|0;nq(a,Ah(b)|0,c,0);return a|0}function eh(a,b,c){a=a|0;b=b|0;c=c|0;Yp(a,Ah(b)|0,c,0);return a|0}function fh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Fp(a,b,f);l=e;return a|0}function gh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];jp(a,b,f);l=e;return a|0}function hh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];So(a,b,f);l=e;return a|0}function ih(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];zo(a,b,f);l=e;return a|0}function jh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];go(a,b,f);l=e;return a|0}function kh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];On(a,b,f);l=e;return a|0}function lh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];vn(a,b,f);l=e;return a|0}function mh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Om(a,b,f);l=e;return a|0}function nh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];vm(a,b,f);l=e;return a|0}function oh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];cm(a,b,f);l=e;return a|0}function ph(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ll(a,b,f);l=e;return a|0}function qh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];pl(a,b,f);l=e;return a|0}function rh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Xk(a,b,f);l=e;return a|0}function sh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ek(a,b,f);l=e;return a|0}function th(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];hk(a,b,f);l=e;return a|0}function uh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Lj(a,b,f);l=e;return a|0}function vh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];pj(a,b,f);l=e;return a|0}function wh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Xi(a,b,f);l=e;return a|0}function xh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];yi(a,b,f);l=e;return a|0}function yh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];zh(a,b,f);l=e;return a|0}function zh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Bh(a,d,f,1);l=e;return}function Ah(a){a=a|0;return a|0}function Bh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Ch()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Dh(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Eh(g,e)|0,e);l=f;return}function Ch(){var b=0,d=0;if(!(a[8848]|0)){Qh(9332);Fa(24,9332,o|0)|0;d=8848;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9332)|0)){b=9332;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Qh(9332)}return 9332}function Dh(a){a=a|0;return 0}function Eh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Ch()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Kh(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Lh(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Fh(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;h=l;l=l+32|0;o=h+24|0;n=h+20|0;j=h+16|0;m=h+12|0;k=h+8|0;i=h+4|0;p=h;c[n>>2]=b;c[j>>2]=d;c[m>>2]=e;c[k>>2]=f;c[i>>2]=g;g=a+28|0;c[p>>2]=c[g>>2];c[o>>2]=c[p>>2];Gh(a+24|0,o,n,m,k,j,i)|0;c[g>>2]=c[c[g>>2]>>2];l=h;return}function Gh(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;a=Hh(b)|0;b=zA(24)|0;Ih(b+4|0,c[d>>2]|0,c[e>>2]|0,c[f>>2]|0,c[g>>2]|0,c[h>>2]|0);c[b>>2]=c[a>>2];c[a>>2]=b;return b|0}function Hh(a){a=a|0;return c[a>>2]|0}function Ih(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=f;c[a+16>>2]=g;return}function Jh(a,b){a=a|0;b=b|0;return b|a|0}function Kh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Lh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Mh(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Nh(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Kh(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Oh(a,i);Ph(i);l=k;return}}function Mh(a){a=a|0;return 357913941}function Nh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Oh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ph(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Qh(a){a=a|0;Uh(a);return}function Rh(a){a=a|0;Th(a+24|0);return}function Sh(a){a=a|0;return c[a>>2]|0}function Th(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Uh(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,4,b,Wh()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Vh(){return 9424}function Wh(){return 1176}function Xh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=Zh(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=_h(b,e)|0;l=d;return b|0}function Yh(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=f;c[a+16>>2]=g;return}function Zh(a){a=a|0;return (c[(Ch()|0)+24>>2]|0)+(a*12|0)|0}function _h(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+48|0;e=f;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;kb[d&31](e,a);e=$h(e)|0;l=f;return e|0}function $h(a){a=a|0;var b=0,c=0,d=0,e=0;e=l;l=l+32|0;b=e+12|0;c=e;d=bi(ai()|0)|0;if(!d)a=gi(a)|0;else{ci(b,d);di(c,b);ei(a,c);a=fi(b)|0}l=e;return a|0}function ai(){var b=0;if(!(a[8864]|0)){ri(9380);Fa(25,9380,o|0)|0;b=8864;c[b>>2]=1;c[b+4>>2]=0}return 9380}function bi(a){a=a|0;return c[a+36>>2]|0}function ci(a,b){a=a|0;b=b|0;c[a>>2]=b;c[a+4>>2]=a;c[a+8>>2]=0;return}function di(a,b){a=a|0;b=b|0;c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=0;return}function ei(a,b){a=a|0;b=b|0;li(b,a,a+8|0,a+16|0,a+24|0,a+32|0,a+40|0)|0;return}function fi(a){a=a|0;return c[(c[a+4>>2]|0)+8>>2]|0}function gi(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=l;l=l+16|0;d=j+4|0;e=j;f=lw(8)|0;g=f;h=zA(48)|0;i=h;b=i+48|0;do{c[i>>2]=c[a>>2];i=i+4|0;a=a+4|0}while((i|0)<(b|0));b=g+4|0;c[b>>2]=h;i=zA(8)|0;h=c[b>>2]|0;c[e>>2]=0;c[d>>2]=c[e>>2];hi(i,h,d);c[f>>2]=i;l=j;return g|0}function hi(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=zA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1128;c[d+12>>2]=b;c[a+4>>2]=d;return}function ii(a){a=a|0;tA(a);BA(a);return}function ji(a){a=a|0;a=c[a+12>>2]|0;if(a|0)BA(a);return}function ki(a){a=a|0;BA(a);return}function li(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;g=mi(c[a>>2]|0,b,d,e,f,g,h)|0;h=a+4|0;c[(c[h>>2]|0)+8>>2]=g;return c[(c[h>>2]|0)+8>>2]|0}function mi(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var i=0,j=0;i=l;l=l+16|0;j=i;Wy(j);a=lg(a)|0;g=ni(a,+h[b>>3],+h[c>>3],+h[d>>3],+h[e>>3],+h[f>>3],+h[g>>3])|0;Yy(j);l=i;return g|0}function ni(a,b,c,d,e,f,g){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;var h=0;h=og(oi()|0)|0;b=+pg(b);c=+pg(c);d=+pg(d);e=+pg(e);f=+pg(f);return wa(0,h|0,a|0,+b,+c,+d,+e,+f,+(+pg(g)))|0}function oi(){var b=0;if(!(a[8856]|0)){pi(9368);b=8856;c[b>>2]=1;c[b+4>>2]=0}return 9368}function pi(a){a=a|0;Ag(a,qi()|0,6);return}function qi(){return 1148}function ri(a){a=a|0;xi(a);return}function si(a){a=a|0;ti(a+24|0);ui(a+16|0);return}function ti(a){a=a|0;wi(a);return}function ui(a){a=a|0;vi(a);return}function vi(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b|0)do{d=b;b=c[b>>2]|0;BA(d)}while((b|0)!=0);c[a>>2]=0;return}function wi(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b|0)do{d=b;b=c[b>>2]|0;BA(d)}while((b|0)!=0);c[a>>2]=0;return}function xi(b){b=b|0;var d=0;c[b+16>>2]=0;c[b+20>>2]=0;d=b+24|0;c[d>>2]=0;c[b+28>>2]=d;c[b+36>>2]=0;a[b+40>>0]=0;a[b+41>>0]=0;return}function yi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];zi(a,d,f,0);l=e;return}function zi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Ai()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Bi(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Ci(g,e)|0,e);l=f;return}function Ai(){var b=0,d=0;if(!(a[8872]|0)){Ji(9428);Fa(26,9428,o|0)|0;d=8872;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9428)|0)){b=9428;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Ji(9428)}return 9428}function Bi(a){a=a|0;return 0}function Ci(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Ai()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Di(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Ei(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Di(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Ei(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Fi(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Gi(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Di(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Hi(a,i);Ii(i);l=k;return}}function Fi(a){a=a|0;return 357913941}function Gi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Hi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ii(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Ji(a){a=a|0;Mi(a);return}function Ki(a){a=a|0;Li(a+24|0);return}function Li(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Mi(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,1,b,Ni()|0,3);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Ni(){return 1180}function Oi(a,b,d,e,f){a=a|0;b=b|0;d=+d;e=+e;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+16|0;h=g+8|0;i=g;j=Pi(a)|0;a=c[j+4>>2]|0;c[i>>2]=c[j>>2];c[i+4>>2]=a;c[h>>2]=c[i>>2];c[h+4>>2]=c[i+4>>2];Qi(b,h,d,e,f);l=g;return}function Pi(a){a=a|0;return (c[(Ai()|0)+24>>2]|0)+(a*12|0)|0}function Qi(a,b,d,e,f){a=a|0;b=b|0;d=+d;e=+e;f=f|0;var g=0,h=0,i=0,j=0,k=0;k=l;l=l+16|0;h=k+2|0;i=k+1|0;j=k;g=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)g=c[(c[a>>2]|0)+g>>2]|0;Ri(h,d);d=+Si(h,d);Ri(i,e);e=+Si(i,e);Ti(j,f);j=Ui(j,f)|0;mb[g&1](a,d,e,j);l=k;return}function Ri(a,b){a=a|0;b=+b;return}function Si(a,b){a=a|0;b=+b;return +(+Wi(b))}function Ti(a,b){a=a|0;b=b|0;return}function Ui(a,b){a=a|0;b=b|0;return Vi(b)|0}function Vi(a){a=a|0;return a|0}function Wi(a){a=+a;return +a}function Xi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Yi(a,d,f,1);l=e;return}function Yi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Zi()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=_i(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,$i(g,e)|0,e);l=f;return}function Zi(){var b=0,d=0;if(!(a[8880]|0)){gj(9464);Fa(27,9464,o|0)|0;d=8880;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9464)|0)){b=9464;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));gj(9464)}return 9464}function _i(a){a=a|0;return 0}function $i(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Zi()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];aj(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{bj(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function aj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function bj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=cj(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;dj(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];aj(g,e,d);c[j>>2]=(c[j>>2]|0)+12;ej(a,i);fj(i);l=k;return}}function cj(a){a=a|0;return 357913941}function dj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function ej(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function fj(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function gj(a){a=a|0;jj(a);return}function hj(a){a=a|0;ij(a+24|0);return}function ij(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function jj(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,5,b,kj()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function kj(){return 1196}function lj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=mj(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=nj(b,e)|0;l=d;return b|0}function mj(a){a=a|0;return (c[(Zi()|0)+24>>2]|0)+(a*12|0)|0}function nj(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return oj(lb[d&31](a)|0)|0}function oj(a){a=a|0;return a&1|0}function pj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];qj(a,d,f,0);l=e;return}function qj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=rj()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=sj(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,tj(g,e)|0,e);l=f;return}function rj(){var b=0,d=0;if(!(a[8888]|0)){Aj(9500);Fa(28,9500,o|0)|0;d=8888;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9500)|0)){b=9500;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Aj(9500)}return 9500}function sj(a){a=a|0;return 0}function tj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=rj()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];uj(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{vj(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function uj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function vj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=wj(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;xj(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];uj(g,e,d);c[j>>2]=(c[j>>2]|0)+12;yj(a,i);zj(i);l=k;return}}function wj(a){a=a|0;return 357913941}function xj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function yj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function zj(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Aj(a){a=a|0;Dj(a);return}function Bj(a){a=a|0;Cj(a+24|0);return}function Cj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Dj(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,5,b,Ej()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Ej(){return 1200}function Fj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Gj(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Hj(b,f,d);l=e;return}function Gj(a){a=a|0;return (c[(rj()|0)+24>>2]|0)+(a*12|0)|0}function Hj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Ij(f,d);f=Jj(f,d)|0;kb[e&31](a,f);l=g;return}function Ij(a,b){a=a|0;b=b|0;return}function Jj(a,b){a=a|0;b=b|0;return Kj(b)|0}function Kj(a){a=a|0;return (a|0)!=0|0}function Lj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Mj(a,d,f,0);l=e;return}function Mj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Nj()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Oj(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Pj(g,e)|0,e);l=f;return}function Nj(){var b=0,d=0;if(!(a[8896]|0)){Wj(9536);Fa(29,9536,o|0)|0;d=8896;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9536)|0)){b=9536;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Wj(9536)}return 9536}function Oj(a){a=a|0;return 0}function Pj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Nj()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Qj(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Rj(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Qj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Rj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Sj(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Tj(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Qj(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Uj(a,i);Vj(i);l=k;return}}function Sj(a){a=a|0;return 357913941}function Tj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Uj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Vj(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Wj(a){a=a|0;Zj(a);return}function Xj(a){a=a|0;Yj(a+24|0);return}function Yj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Zj(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,6,b,_j()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function _j(){return 1208}function $j(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=ak(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];bk(b,f,d);l=e;return}function ak(a){a=a|0;return (c[(Nj()|0)+24>>2]|0)+(a*12|0)|0}function bk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;ck(f,d);d=dk(f,d)|0;kb[e&31](a,d);ek(f);l=g;return}function ck(a,b){a=a|0;b=b|0;fk(a,b);return}function dk(a,b){a=a|0;b=b|0;return a|0}function ek(a){a=a|0;Pe(a);return}function fk(a,b){a=a|0;b=b|0;gk(a,b);return}function gk(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function hk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ik(a,d,f,0);l=e;return}function ik(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=jk()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=kk(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,lk(g,e)|0,e);l=f;return}function jk(){var b=0,d=0;if(!(a[8904]|0)){sk(9572);Fa(30,9572,o|0)|0;d=8904;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9572)|0)){b=9572;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));sk(9572)}return 9572}function kk(a){a=a|0;return 0}function lk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=jk()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];mk(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{nk(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function mk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function nk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=ok(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;pk(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];mk(g,e,d);c[j>>2]=(c[j>>2]|0)+12;qk(a,i);rk(i);l=k;return}}function ok(a){a=a|0;return 357913941}function pk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function qk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function rk(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function sk(a){a=a|0;vk(a);return}function tk(a){a=a|0;uk(a+24|0);return}function uk(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function vk(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,5,b,wk()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function wk(){return 1224}function xk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=yk(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];d=zk(b,f,d)|0;l=e;return d|0}function yk(a){a=a|0;return (c[(jk()|0)+24>>2]|0)+(a*12|0)|0}function zk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Ak(f,d);f=Bk(f,d)|0;f=Ck(sb[e&15](a,f)|0)|0;l=g;return f|0}function Ak(a,b){a=a|0;b=b|0;return}function Bk(a,b){a=a|0;b=b|0;return Dk(b)|0}function Ck(a){a=a|0;return a|0}function Dk(a){a=a|0;return a|0}function Ek(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Fk(a,d,f,0);l=e;return}function Fk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Gk()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Hk(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Ik(g,e)|0,e);l=f;return}function Gk(){var b=0,d=0;if(!(a[8912]|0)){Pk(9608);Fa(31,9608,o|0)|0;d=8912;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9608)|0)){b=9608;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Pk(9608)}return 9608}function Hk(a){a=a|0;return 0}function Ik(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Gk()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Jk(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Kk(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Jk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Kk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Lk(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Mk(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Jk(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Nk(a,i);Ok(i);l=k;return}}function Lk(a){a=a|0;return 357913941}function Mk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Nk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ok(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Pk(a){a=a|0;Sk(a);return}function Qk(a){a=a|0;Rk(a+24|0);return}function Rk(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Sk(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,6,b,Tk()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Tk(){return 1240}function Uk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=Vk(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=Wk(b,e)|0;l=d;return b|0}function Vk(a){a=a|0;return (c[(Gk()|0)+24>>2]|0)+(a*12|0)|0}function Wk(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return Ck(lb[d&31](a)|0)|0}function Xk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Yk(a,d,f,1);l=e;return}function Yk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Zk()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=_k(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,$k(g,e)|0,e);l=f;return}function Zk(){var b=0,d=0;if(!(a[8920]|0)){gl(9644);Fa(32,9644,o|0)|0;d=8920;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9644)|0)){b=9644;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));gl(9644)}return 9644}function _k(a){a=a|0;return 0}function $k(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Zk()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];al(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{bl(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function al(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function bl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=cl(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;dl(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];al(g,e,d);c[j>>2]=(c[j>>2]|0)+12;el(a,i);fl(i);l=k;return}}function cl(a){a=a|0;return 357913941}function dl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function el(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function fl(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function gl(a){a=a|0;jl(a);return}function hl(a){a=a|0;il(a+24|0);return}function il(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function jl(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,7,b,kl()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function kl(){return 1244}function ll(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=ml(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=nl(b,e)|0;l=d;return b|0}function ml(a){a=a|0;return (c[(Zk()|0)+24>>2]|0)+(a*12|0)|0}function nl(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return ol(lb[d&31](a)|0)|0}function ol(a){a=a|0;return a|0}function pl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ql(a,d,f,0);l=e;return}function ql(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=rl()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=sl(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,tl(g,e)|0,e);l=f;return}function rl(){var b=0,d=0;if(!(a[8928]|0)){Al(9680);Fa(33,9680,o|0)|0;d=8928;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9680)|0)){b=9680;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Al(9680)}return 9680}function sl(a){a=a|0;return 0}function tl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=rl()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];ul(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{vl(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function ul(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function vl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=wl(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;xl(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];ul(g,e,d);c[j>>2]=(c[j>>2]|0)+12;yl(a,i);zl(i);l=k;return}}function wl(a){a=a|0;return 357913941}function xl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function yl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function zl(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Al(a){a=a|0;Dl(a);return}function Bl(a){a=a|0;Cl(a+24|0);return}function Cl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Dl(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,7,b,El()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function El(){return 1248}function Fl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Gl(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Hl(b,f,d);l=e;return}function Gl(a){a=a|0;return (c[(rl()|0)+24>>2]|0)+(a*12|0)|0}function Hl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Il(f,d);f=Jl(f,d)|0;kb[e&31](a,f);l=g;return}function Il(a,b){a=a|0;b=b|0;return}function Jl(a,b){a=a|0;b=b|0;return Kl(b)|0}function Kl(a){a=a|0;return a|0}function Ll(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ml(a,d,f,0);l=e;return}function Ml(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Nl()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Ol(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Pl(g,e)|0,e);l=f;return}function Nl(){var b=0,d=0;if(!(a[8936]|0)){Wl(9716);Fa(34,9716,o|0)|0;d=8936;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9716)|0)){b=9716;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Wl(9716)}return 9716}function Ol(a){a=a|0;return 0}function Pl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Nl()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Ql(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Rl(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Ql(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Rl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Sl(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Tl(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Ql(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Ul(a,i);Vl(i);l=k;return}}function Sl(a){a=a|0;return 357913941}function Tl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Ul(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Vl(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Wl(a){a=a|0;Zl(a);return}function Xl(a){a=a|0;Yl(a+24|0);return}function Yl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Zl(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,1,b,_l()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function _l(){return 1256}function $l(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+8|0;h=f;i=am(a)|0;a=c[i+4>>2]|0;c[h>>2]=c[i>>2];c[h+4>>2]=a;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];bm(b,g,d,e);l=f;return}function am(a){a=a|0;return (c[(Nl()|0)+24>>2]|0)+(a*12|0)|0}function bm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;i=l;l=l+16|0;g=i+1|0;h=i;f=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)f=c[(c[a>>2]|0)+f>>2]|0;Il(g,d);g=Jl(g,d)|0;Ak(h,e);h=Bk(h,e)|0;zb[f&15](a,g,h);l=i;return}function cm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];dm(a,d,f,1);l=e;return}function dm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=em()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=fm(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,gm(g,e)|0,e);l=f;return}function em(){var b=0,d=0;if(!(a[8944]|0)){nm(9752);Fa(35,9752,o|0)|0;d=8944;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9752)|0)){b=9752;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));nm(9752)}return 9752}function fm(a){a=a|0;return 0}function gm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=em()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];hm(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{im(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function hm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function im(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=jm(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;km(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];hm(g,e,d);c[j>>2]=(c[j>>2]|0)+12;lm(a,i);mm(i);l=k;return}}function jm(a){a=a|0;return 357913941}function km(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function lm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function mm(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function nm(a){a=a|0;qm(a);return}function om(a){a=a|0;pm(a+24|0);return}function pm(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function qm(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,1,b,rm()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function rm(){return 1268}function sm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0.0,f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+8|0;h=f;i=tm(a)|0;a=c[i+4>>2]|0;c[h>>2]=c[i>>2];c[h+4>>2]=a;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];e=+um(b,g,d);l=f;return +e}function tm(a){a=a|0;return (c[(em()|0)+24>>2]|0)+(a*12|0)|0}function um(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0.0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Ti(f,d);f=Ui(f,d)|0;h=+xg(+vb[e&7](a,f));l=g;return +h}function vm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];wm(a,d,f,1);l=e;return}function wm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=xm()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=ym(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,zm(g,e)|0,e);l=f;return}function xm(){var b=0,d=0;if(!(a[8952]|0)){Gm(9788);Fa(36,9788,o|0)|0;d=8952;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9788)|0)){b=9788;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Gm(9788)}return 9788}function ym(a){a=a|0;return 0}function zm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=xm()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Am(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Bm(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Am(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Bm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Cm(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Dm(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Am(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Em(a,i);Fm(i);l=k;return}}function Cm(a){a=a|0;return 357913941}function Dm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Em(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Fm(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Gm(a){a=a|0;Jm(a);return}function Hm(a){a=a|0;Im(a+24|0);return}function Im(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Jm(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,5,b,Km()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Km(){return 1276}function Lm(a,b){a=a|0;b=b|0;var d=0.0,e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Mm(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];d=+Nm(b,f);l=e;return +d}function Mm(a){a=a|0;return (c[(xm()|0)+24>>2]|0)+(a*12|0)|0}function Nm(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return +(+xg(+qb[d&15](a)))}function Om(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Pm(a,d,f,1);l=e;return}function Pm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Qm()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Rm(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Sm(g,e)|0,e);l=f;return}function Qm(){var b=0,d=0;if(!(a[8960]|0)){Zm(9824);Fa(37,9824,o|0)|0;d=8960;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9824)|0)){b=9824;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Zm(9824)}return 9824}function Rm(a){a=a|0;return 0}function Sm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Qm()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Tm(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Um(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Tm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Um(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Vm(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Wm(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Tm(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Xm(a,i);Ym(i);l=k;return}}function Vm(a){a=a|0;return 357913941}function Wm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Xm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ym(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Zm(a){a=a|0;an(a);return}function _m(a){a=a|0;$m(a+24|0);return}function $m(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function an(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,8,b,bn()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function bn(){return 1320}function cn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=dn(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=en(b,e)|0;l=d;return b|0}function dn(a){a=a|0;return (c[(Qm()|0)+24>>2]|0)+(a*12|0)|0}function en(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;e=f;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;kb[d&31](e,a);e=fn(e)|0;l=f;return e|0}function fn(a){a=a|0;var b=0,c=0,d=0,e=0;e=l;l=l+32|0;b=e+12|0;c=e;d=bi(gn()|0)|0;if(!d)a=jn(a)|0;else{ci(b,d);di(c,b);hn(a,c);a=fi(b)|0}l=e;return a|0}function gn(){var b=0;if(!(a[8976]|0)){un(9872);Fa(25,9872,o|0)|0;b=8976;c[b>>2]=1;c[b+4>>2]=0}return 9872}function hn(a,b){a=a|0;b=b|0;on(b,a,a+8|0)|0;return}function jn(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;d=l;l=l+16|0;f=d+4|0;h=d;e=lw(8)|0;b=e;i=zA(16)|0;c[i>>2]=c[a>>2];c[i+4>>2]=c[a+4>>2];c[i+8>>2]=c[a+8>>2];c[i+12>>2]=c[a+12>>2];g=b+4|0;c[g>>2]=i;a=zA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];kn(a,g,f);c[e>>2]=a;l=d;return b|0}function kn(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=zA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1288;c[d+12>>2]=b;c[a+4>>2]=d;return}function ln(a){a=a|0;tA(a);BA(a);return}function mn(a){a=a|0;a=c[a+12>>2]|0;if(a|0)BA(a);return}function nn(a){a=a|0;BA(a);return}function on(a,b,d){a=a|0;b=b|0;d=d|0;b=pn(c[a>>2]|0,b,d)|0;d=a+4|0;c[(c[d>>2]|0)+8>>2]=b;return c[(c[d>>2]|0)+8>>2]|0}function pn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Wy(f);a=lg(a)|0;d=qn(a,c[b>>2]|0,+h[d>>3])|0;Yy(f);l=e;return d|0}function qn(a,b,c){a=a|0;b=b|0;c=+c;var d=0;d=og(rn()|0)|0;b=qg(b)|0;return xa(0,d|0,a|0,b|0,+(+pg(c)))|0}function rn(){var b=0;if(!(a[8968]|0)){sn(9860);b=8968;c[b>>2]=1;c[b+4>>2]=0}return 9860}function sn(a){a=a|0;Ag(a,tn()|0,2);return}function tn(){return 1308}function un(a){a=a|0;xi(a);return}function vn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];wn(a,d,f,1);l=e;return}function wn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=xn()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=yn(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,zn(g,e)|0,e);l=f;return}function xn(){var b=0,d=0;if(!(a[8984]|0)){Gn(9916);Fa(38,9916,o|0)|0;d=8984;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9916)|0)){b=9916;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Gn(9916)}return 9916}function yn(a){a=a|0;return 0}function zn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=xn()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];An(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Bn(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function An(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Bn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Cn(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Dn(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];An(g,e,d);c[j>>2]=(c[j>>2]|0)+12;En(a,i);Fn(i);l=k;return}}function Cn(a){a=a|0;return 357913941}
function Dn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function En(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Fn(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Gn(a){a=a|0;Jn(a);return}function Hn(a){a=a|0;In(a+24|0);return}function In(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Jn(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,6,b,Kn()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Kn(){return 1324}function Ln(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Mn(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];d=Nn(b,f,d)|0;l=e;return d|0}function Mn(a){a=a|0;return (c[(xn()|0)+24>>2]|0)+(a*12|0)|0}function Nn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+32|0;f=h;g=h+16|0;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Ti(g,d);g=Ui(g,d)|0;zb[e&15](f,a,g);g=fn(f)|0;l=h;return g|0}function On(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Pn(a,d,f,1);l=e;return}function Pn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Qn()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Rn(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Sn(g,e)|0,e);l=f;return}function Qn(){var b=0,d=0;if(!(a[8992]|0)){Zn(9952);Fa(39,9952,o|0)|0;d=8992;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9952)|0)){b=9952;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Zn(9952)}return 9952}function Rn(a){a=a|0;return 0}function Sn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Qn()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Tn(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Un(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Tn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Un(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Vn(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Wn(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Tn(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Xn(a,i);Yn(i);l=k;return}}function Vn(a){a=a|0;return 357913941}function Wn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Xn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Yn(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Zn(a){a=a|0;ao(a);return}function _n(a){a=a|0;$n(a+24|0);return}function $n(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function ao(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,9,b,bo()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function bo(){return 1332}function co(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=eo(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=fo(b,e)|0;l=d;return b|0}function eo(a){a=a|0;return (c[(Qn()|0)+24>>2]|0)+(a*12|0)|0}function fo(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return wg(lb[d&31](a)|0)|0}function go(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ho(a,d,f,0);l=e;return}function ho(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=io()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=jo(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,ko(g,e)|0,e);l=f;return}function io(){var b=0,d=0;if(!(a[9e3]|0)){ro(9988);Fa(40,9988,o|0)|0;d=9e3;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(9988)|0)){b=9988;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));ro(9988)}return 9988}function jo(a){a=a|0;return 0}function ko(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=io()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];lo(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{mo(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function lo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function mo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=no(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;oo(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];lo(g,e,d);c[j>>2]=(c[j>>2]|0)+12;po(a,i);qo(i);l=k;return}}function no(a){a=a|0;return 357913941}function oo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function po(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function qo(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function ro(a){a=a|0;uo(a);return}function so(a){a=a|0;to(a+24|0);return}function to(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function uo(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,8,b,vo()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function vo(){return 1336}function wo(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=xo(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];yo(b,f,d);l=e;return}function xo(a){a=a|0;return (c[(io()|0)+24>>2]|0)+(a*12|0)|0}function yo(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Ri(f,d);d=+Si(f,d);hb[e&31](a,d);l=g;return}function zo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ao(a,d,f,0);l=e;return}function Ao(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Bo()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Co(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Do(g,e)|0,e);l=f;return}function Bo(){var b=0,d=0;if(!(a[9008]|0)){Ko(10024);Fa(41,10024,o|0)|0;d=9008;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10024)|0)){b=10024;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Ko(10024)}return 10024}function Co(a){a=a|0;return 0}function Do(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Bo()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Eo(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Fo(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Eo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Fo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Go(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Ho(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Eo(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Io(a,i);Jo(i);l=k;return}}function Go(a){a=a|0;return 357913941}function Ho(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Io(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Jo(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Ko(a){a=a|0;No(a);return}function Lo(a){a=a|0;Mo(a+24|0);return}function Mo(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function No(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,1,b,Oo()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Oo(){return 1344}function Po(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+8|0;h=f;i=Qo(a)|0;a=c[i+4>>2]|0;c[h>>2]=c[i>>2];c[h+4>>2]=a;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];Ro(b,g,d,e);l=f;return}function Qo(a){a=a|0;return (c[(Bo()|0)+24>>2]|0)+(a*12|0)|0}function Ro(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0;i=l;l=l+16|0;g=i+1|0;h=i;f=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)f=c[(c[a>>2]|0)+f>>2]|0;Ti(g,d);g=Ui(g,d)|0;Ri(h,e);e=+Si(h,e);Bb[f&15](a,g,e);l=i;return}function So(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];To(a,d,f,0);l=e;return}function To(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Uo()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Vo(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Wo(g,e)|0,e);l=f;return}function Uo(){var b=0,d=0;if(!(a[9016]|0)){bp(10060);Fa(42,10060,o|0)|0;d=9016;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10060)|0)){b=10060;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));bp(10060)}return 10060}function Vo(a){a=a|0;return 0}function Wo(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Uo()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Xo(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Yo(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Xo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Yo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Zo(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;_o(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Xo(g,e,d);c[j>>2]=(c[j>>2]|0)+12;$o(a,i);ap(i);l=k;return}}function Zo(a){a=a|0;return 357913941}function _o(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function $o(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function ap(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function bp(a){a=a|0;ep(a);return}function cp(a){a=a|0;dp(a+24|0);return}function dp(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function ep(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,8,b,fp()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function fp(){return 1356}function gp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=hp(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ip(b,f,d);l=e;return}function hp(a){a=a|0;return (c[(Uo()|0)+24>>2]|0)+(a*12|0)|0}function ip(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Ti(f,d);f=Ui(f,d)|0;kb[e&31](a,f);l=g;return}function jp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];kp(a,d,f,0);l=e;return}function kp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=lp()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=mp(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,np(g,e)|0,e);l=f;return}function lp(){var b=0,d=0;if(!(a[9024]|0)){up(10096);Fa(43,10096,o|0)|0;d=9024;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10096)|0)){b=10096;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));up(10096)}return 10096}function mp(a){a=a|0;return 0}function np(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=lp()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];op(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{pp(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function op(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function pp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=qp(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;rp(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];op(g,e,d);c[j>>2]=(c[j>>2]|0)+12;sp(a,i);tp(i);l=k;return}}function qp(a){a=a|0;return 357913941}function rp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function sp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function tp(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function up(a){a=a|0;xp(a);return}function vp(a){a=a|0;wp(a+24|0);return}function wp(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function xp(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,9,b,yp()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function yp(){return 1364}function zp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Ap(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Bp(b,f,d);l=e;return}function Ap(a){a=a|0;return (c[(lp()|0)+24>>2]|0)+(a*12|0)|0}function Bp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Cp(f,d);f=Dp(f,d)|0;kb[e&31](a,f);l=g;return}function Cp(a,b){a=a|0;b=b|0;return}function Dp(a,b){a=a|0;b=b|0;return Ep(b)|0}function Ep(a){a=a|0;return a|0}function Fp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=Ah(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Gp(a,d,f,0);l=e;return}function Gp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Hp()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Ip(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Fh(h,b,a,d,Jp(g,e)|0,e);l=f;return}function Hp(){var b=0,d=0;if(!(a[9032]|0)){Qp(10132);Fa(44,10132,o|0)|0;d=9032;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10132)|0)){b=10132;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Qp(10132)}return 10132}function Ip(a){a=a|0;return 0}function Jp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Hp()|0;k=n+24|0;a=Jh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Kp(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Lp(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Kp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Lp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Mp(a)|0;if(g>>>0<f>>>0)sA(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Np(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Kp(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Op(a,i);Pp(i);l=k;return}}function Mp(a){a=a|0;return 357913941}function Np(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=zA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Op(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Pp(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)BA(a);return}function Qp(a){a=a|0;Tp(a);return}function Rp(a){a=a|0;Sp(a+24|0);return}function Sp(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);BA(d)}return}function Tp(a){a=a|0;var b=0;b=Vh()|0;Yh(a,2,24,b,Up()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Up(){return 1388}function Vp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=Wp(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];Xp(b,e);l=d;return}function Wp(a){a=a|0;return (c[(Hp()|0)+24>>2]|0)+(a*12|0)|0}function Xp(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;jb[d&127](a);return}function Yp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Zp()|0;a=_p(d)|0;Fh(g,b,f,a,$p(d,e)|0,e);return}function Zp(){var b=0,d=0;if(!(a[9040]|0)){gq(10168);Fa(45,10168,o|0)|0;d=9040;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10168)|0)){b=10168;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));gq(10168)}return 10168}function _p(a){a=a|0;return a|0}function $p(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Zp()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){aq(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{bq(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function aq(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function bq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=cq(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;dq(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;aq(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;eq(a,f);fq(f);l=i;return}}function cq(a){a=a|0;return 536870911}function dq(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function eq(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function fq(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function gq(a){a=a|0;jq(a);return}function hq(a){a=a|0;iq(a+24|0);return}function iq(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function jq(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,25,b,El()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function kq(a,b){a=a|0;b=b|0;mq(c[(lq(a)|0)>>2]|0,b);return}function lq(a){a=a|0;return (c[(Zp()|0)+24>>2]|0)+(a<<3)|0}function mq(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+16|0;d=c;Il(d,b);b=Jl(d,b)|0;jb[a&127](b);l=c;return}function nq(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=oq()|0;a=pq(d)|0;Fh(g,b,f,a,qq(d,e)|0,e);return}function oq(){var b=0,d=0;if(!(a[9048]|0)){xq(10204);Fa(46,10204,o|0)|0;d=9048;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10204)|0)){b=10204;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));xq(10204)}return 10204}function pq(a){a=a|0;return a|0}function qq(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=oq()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){rq(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{sq(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function rq(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function sq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=tq(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;uq(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;rq(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;vq(a,f);wq(f);l=i;return}}function tq(a){a=a|0;return 536870911}function uq(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function vq(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function wq(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function xq(a){a=a|0;Aq(a);return}function yq(a){a=a|0;zq(a+24|0);return}function zq(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function Aq(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,17,b,Tk()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Bq(a){a=a|0;return Dq(c[(Cq(a)|0)>>2]|0)|0}function Cq(a){a=a|0;return (c[(oq()|0)+24>>2]|0)+(a<<3)|0}function Dq(a){a=a|0;return Ck(wb[a&7]()|0)|0}function Eq(){var b=0;if(!(a[9064]|0)){Oq(10248);Fa(25,10248,o|0)|0;b=9064;c[b>>2]=1;c[b+4>>2]=0}return 10248}function Fq(a,b){a=a|0;b=b|0;c[a>>2]=Gq()|0;c[a+4>>2]=Hq()|0;c[a+12>>2]=b;c[a+8>>2]=Iq()|0;c[a+32>>2]=2;return}function Gq(){return 11752}function Hq(){return 1232}function Iq(){return Mq()|0}function Jq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){Lq(c);BA(c)}}else if(b|0){Oe(b);BA(b)}return}function Kq(a,b){a=a|0;b=b|0;return b&a|0}function Lq(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function Mq(){var b=0;if(!(a[9056]|0)){c[2560]=Nq()|0;c[2561]=0;b=9056;c[b>>2]=1;c[b+4>>2]=0}return 10240}function Nq(){return 0}function Oq(a){a=a|0;xi(a);return}function Pq(a){a=a|0;Qq(a,6092);Rq(a)|0;Sq(a)|0;return}function Qq(a,b){a=a|0;b=b|0;var d=0;d=gn()|0;c[a>>2]=d;qr(d,b);Jt(c[a>>2]|0);return}function Rq(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,er()|0);return a|0}function Sq(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,Tq()|0);return a|0}function Tq(){var b=0;if(!(a[9072]|0)){Vq(10296);Fa(47,10296,o|0)|0;b=9072;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(10296)|0))Vq(10296);return 10296}function Uq(a,b){a=a|0;b=b|0;Fh(a,0,b,0,0,0);return}function Vq(a){a=a|0;Yq(a);_q(a,9);return}function Wq(a){a=a|0;Xq(a+24|0);return}function Xq(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function Yq(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,1,b,br()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Zq(a,b,c){a=a|0;b=b|0;c=+c;$q(a,b,c);return}function _q(a,b){a=a|0;b=b|0;c[a+20>>2]=b;return}function $q(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,g=0,i=0,j=0;e=l;l=l+16|0;g=e+8|0;j=e+13|0;f=e;i=e+12|0;Ti(j,b);c[g>>2]=Ui(j,b)|0;Ri(i,d);h[f>>3]=+Si(i,d);ar(a,g,f);l=e;return}function ar(b,d,e){b=b|0;d=d|0;e=e|0;Hf(b+8|0,c[d>>2]|0,+h[e>>3]);a[b+24>>0]=1;return}function br(){return 1392}function cr(a,b){a=a|0;b=+b;return dr(a,b)|0}function dr(a,b){a=a|0;b=+b;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;e=l;l=l+16|0;g=e+4|0;h=e+8|0;i=e;f=lw(8)|0;d=f;j=zA(16)|0;Ti(g,a);a=Ui(g,a)|0;Ri(h,b);Hf(j,a,+Si(h,b));h=d+4|0;c[h>>2]=j;a=zA(8)|0;h=c[h>>2]|0;c[i>>2]=0;c[g>>2]=c[i>>2];kn(a,h,g);c[f>>2]=a;l=e;return d|0}function er(){var b=0;if(!(a[9080]|0)){fr(10332);Fa(48,10332,o|0)|0;b=9080;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(10332)|0))fr(10332);return 10332}function fr(a){a=a|0;ir(a);_q(a,49);return}function gr(a){a=a|0;hr(a+24|0);return}function hr(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function ir(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,3,b,nr()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function jr(a){a=a|0;kr(a);return}function kr(a){a=a|0;lr(a);return}function lr(b){b=b|0;mr(b+8|0);a[b+24>>0]=1;return}function mr(a){a=a|0;c[a>>2]=0;h[a+8>>3]=0.0;return}function nr(){return 1412}function or(){return pr()|0}function pr(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;b=l;l=l+16|0;f=b+4|0;h=b;d=lw(8)|0;a=d;e=zA(16)|0;mr(e);g=a+4|0;c[g>>2]=e;e=zA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];kn(e,g,f);c[d>>2]=e;l=b;return a|0}function qr(a,b){a=a|0;b=b|0;c[a>>2]=rr()|0;c[a+4>>2]=sr()|0;c[a+12>>2]=b;c[a+8>>2]=tr()|0;c[a+32>>2]=3;return}function rr(){return 11753}function sr(){return 1404}function tr(){return wr()|0}function ur(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){vr(c);BA(c)}}else if(b|0)BA(b);return}function vr(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function wr(){var b=0;if(!(a[9088]|0)){c[2592]=xr()|0;c[2593]=0;b=9088;c[b>>2]=1;c[b+4>>2]=0}return 10368}function xr(){return c[354]|0}function yr(a){a=a|0;zr(a,6098);Ar(a)|0;return}function zr(a,b){a=a|0;b=b|0;var d=0;d=ai()|0;c[a>>2]=d;Mr(d,b);Jt(c[a>>2]|0);return}function Ar(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,Br()|0);return a|0}function Br(){var b=0;if(!(a[9096]|0)){Cr(10380);Fa(50,10380,o|0)|0;b=9096;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(10380)|0))Cr(10380);return 10380}function Cr(a){a=a|0;Fr(a);_q(a,51);return}function Dr(a){a=a|0;Er(a+24|0);return}function Er(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function Fr(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,4,b,Jr()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Gr(a){a=a|0;Hr(a);return}function Hr(a){a=a|0;Ir(a);return}function Ir(b){b=b|0;var d=0,e=0;d=b+8|0;e=d+48|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));a[b+56>>0]=1;return}function Jr(){return 1420}function Kr(){return Lr()|0}function Lr(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0,i=0;h=l;l=l+16|0;a=h+4|0;b=h;d=lw(8)|0;e=d;f=zA(48)|0;g=f;i=g+48|0;do{c[g>>2]=0;g=g+4|0}while((g|0)<(i|0));g=e+4|0;c[g>>2]=f;i=zA(8)|0;g=c[g>>2]|0;c[b>>2]=0;c[a>>2]=c[b>>2];hi(i,g,a);c[d>>2]=i;l=h;return e|0}function Mr(a,b){a=a|0;b=b|0;c[a>>2]=Nr()|0;c[a+4>>2]=Or()|0;c[a+12>>2]=b;c[a+8>>2]=Pr()|0;c[a+32>>2]=4;return}function Nr(){return 11747}function Or(){return 1424}function Pr(){return wr()|0}function Qr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){Rr(c);BA(c)}}else if(b|0)BA(b);return}function Rr(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function Sr(a){a=a|0;Tr(a,6105);Ur(a)|0;Vr(a)|0;return}function Tr(a,b){a=a|0;b=b|0;var d=0;d=ws()|0;c[a>>2]=d;xs(d,b);Jt(c[a>>2]|0);return}function Ur(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,ks()|0);return a|0}function Vr(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,Wr()|0);return a|0}function Wr(){var b=0;if(!(a[9104]|0)){Xr(10420);Fa(52,10420,o|0)|0;b=9104;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(10420)|0))Xr(10420);return 10420}function Xr(a){a=a|0;_r(a);_q(a,1);return}function Yr(a){a=a|0;Zr(a+24|0);return}function Zr(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function _r(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,1,b,ds()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function $r(a,b,c){a=a|0;b=+b;c=+c;as(a,b,c);return}function as(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0,f=0,g=0,i=0;d=l;l=l+32|0;f=d+8|0;i=d+17|0;e=d;g=d+16|0;Ri(i,b);h[f>>3]=+Si(i,b);Ri(g,c);h[e>>3]=+Si(g,c);bs(a,f,e);l=d;return}function bs(b,c,d){b=b|0;c=c|0;d=d|0;cs(b+8|0,+h[c>>3],+h[d>>3]);a[b+24>>0]=1;return}function cs(a,b,c){a=a|0;b=+b;c=+c;h[a>>3]=b;h[a+8>>3]=c;return}function ds(){return 1460}function es(a,b){a=+a;b=+b;return fs(a,b)|0}function fs(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;e=l;l=l+16|0;h=e+4|0;i=e+8|0;j=e;f=lw(8)|0;d=f;g=zA(16)|0;Ri(h,a);a=+Si(h,a);Ri(i,b);cs(g,a,+Si(i,b));i=d+4|0;c[i>>2]=g;g=zA(8)|0;i=c[i>>2]|0;c[j>>2]=0;c[h>>2]=c[j>>2];gs(g,i,h);c[f>>2]=g;l=e;return d|0}function gs(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=zA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1440;c[d+12>>2]=b;c[a+4>>2]=d;return}function hs(a){a=a|0;tA(a);BA(a);return}function is(a){a=a|0;a=c[a+12>>2]|0;if(a|0)BA(a);return}function js(a){a=a|0;BA(a);return}function ks(){var b=0;if(!(a[9112]|0)){ls(10456);Fa(53,10456,o|0)|0;b=9112;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(10456)|0))ls(10456);return 10456}function ls(a){a=a|0;os(a);_q(a,54);return}function ms(a){a=a|0;ns(a+24|0);return}function ns(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function os(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,5,b,ts()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function ps(a){a=a|0;qs(a);return}function qs(a){a=a|0;rs(a);return}function rs(b){b=b|0;ss(b+8|0);a[b+24>>0]=1;return}function ss(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;return}function ts(){return 1480}function us(){return vs()|0}function vs(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;b=l;l=l+16|0;f=b+4|0;h=b;d=lw(8)|0;a=d;e=zA(16)|0;ss(e);g=a+4|0;c[g>>2]=e;e=zA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];gs(e,g,f);c[d>>2]=e;l=b;return a|0}function ws(){var b=0;if(!(a[9120]|0)){Ds(10492);Fa(25,10492,o|0)|0;b=9120;c[b>>2]=1;c[b+4>>2]=0}return 10492}function xs(a,b){a=a|0;b=b|0;c[a>>2]=ys()|0;c[a+4>>2]=zs()|0;c[a+12>>2]=b;c[a+8>>2]=As()|0;c[a+32>>2]=5;return}function ys(){return 11743}function zs(){return 1472}function As(){return wr()|0}function Bs(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){Cs(c);BA(c)}}else if(b|0)BA(b);return}function Cs(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function Ds(a){a=a|0;xi(a);return}function Es(a,b,c){a=a|0;b=b|0;c=c|0;a=Ah(b)|0;b=Fs(c)|0;c=Gs(c,0)|0;$t(a,b,c,Hs()|0,0);return}function Fs(a){a=a|0;return a|0}function Gs(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Hs()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Ps(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Qs(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Hs(){var b=0,d=0;if(!(a[9128]|0)){Is(10536);Fa(55,10536,o|0)|0;d=9128;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10536)|0)){b=10536;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Is(10536)}return 10536}function Is(a){a=a|0;Ls(a);return}function Js(a){a=a|0;Ks(a+24|0);return}function Ks(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function Ls(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,18,b,kl()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Ms(a){a=a|0;return Os(c[(Ns(a)|0)>>2]|0)|0}function Ns(a){a=a|0;return (c[(Hs()|0)+24>>2]|0)+(a<<3)|0}function Os(a){a=a|0;return ol(wb[a&7]()|0)|0}function Ps(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Qs(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Rs(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Ss(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Ps(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Ts(a,f);Us(f);l=i;return}}function Rs(a){a=a|0;return 536870911}function Ss(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Ts(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Us(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function Vs(a,b,c){a=a|0;b=b|0;c=c|0;a=Ah(b)|0;b=Ws(c)|0;c=Xs(c,0)|0;$t(a,b,c,Ys()|0,0);return}function Ws(a){a=a|0;return a|0}function Xs(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Ys()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){ft(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{gt(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Ys(){var b=0,d=0;if(!(a[9136]|0)){Zs(10572);Fa(56,10572,o|0)|0;d=9136;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10572)|0)){b=10572;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Zs(10572)}return 10572}function Zs(a){a=a|0;at(a);return}function _s(a){a=a|0;$s(a+24|0);return}function $s(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function at(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,10,b,bt()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function bt(){return 1484}function ct(a,b){a=a|0;b=b|0;return et(c[(dt(a)|0)>>2]|0,b)|0}function dt(a){a=a|0;return (c[(Ys()|0)+24>>2]|0)+(a<<3)|0}function et(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+16|0;d=c;Ti(d,b);b=Ui(d,b)|0;b=oj(lb[a&31](b)|0)|0;l=c;return b|0}function ft(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function gt(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=ht(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;it(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;ft(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;jt(a,f);kt(f);l=i;return}}function ht(a){a=a|0;return 536870911}function it(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function jt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function kt(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function lt(a,b,c){a=a|0;b=b|0;c=c|0;a=Ah(b)|0;b=mt(c)|0;c=nt(c,0)|0;$t(a,b,c,ot()|0,0);return}function mt(a){a=a|0;return a|0}function nt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=ot()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){xt(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{yt(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function ot(){var b=0,d=0;if(!(a[9144]|0)){pt(10608);Fa(57,10608,o|0)|0;d=9144;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10608)|0)){b=10608;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));pt(10608)}return 10608}function pt(a){a=a|0;st(a);return}function qt(a){a=a|0;rt(a+24|0);return}function rt(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function st(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,10,b,tt()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function tt(){return 1492}function ut(a,b,d){a=a|0;b=b|0;d=d|0;wt(c[(vt(a)|0)>>2]|0,b,d);return}function vt(a){a=a|0;return (c[(ot()|0)+24>>2]|0)+(a<<3)|0}function wt(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;l=l+16|0;f=d+1|0;e=d;Ti(f,b);b=Ui(f,b)|0;Ij(e,c);c=Jj(e,c)|0;kb[a&31](b,c);l=d;return}function xt(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function yt(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=zt(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;At(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;xt(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Bt(a,f);Ct(f);l=i;return}}function zt(a){a=a|0;return 536870911}function At(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Bt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ct(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function Dt(){Et();return}function Et(){Ft(10644);return}function Ft(a){a=a|0;Gt(a,6186);return}function Gt(a,b){a=a|0;b=b|0;var d=0;d=Ht()|0;c[a>>2]=d;It(d,b);Jt(c[a>>2]|0);return}function Ht(){var b=0;if(!(a[9152]|0)){Tt(10652);Fa(25,10652,o|0)|0;b=9152;c[b>>2]=1;c[b+4>>2]=0}return 10652}function It(a,b){a=a|0;b=b|0;c[a>>2]=Ot()|0;c[a+4>>2]=Pt()|0;c[a+12>>2]=b;c[a+8>>2]=Qt()|0;c[a+32>>2]=6;return}function Jt(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;Kt()|0;c[d>>2]=a;Lt(10648,d);l=b;return}function Kt(){if(!(a[11757]|0)){c[2662]=0;Fa(58,10648,o|0)|0;a[11757]=1}return 10648}function Lt(a,b){a=a|0;b=b|0;var d=0;d=zA(8)|0;c[d+4>>2]=c[b>>2];c[d>>2]=c[a>>2];c[a>>2]=d;return}function Mt(a){a=a|0;Nt(a);return}function Nt(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b|0)do{d=b;b=c[b>>2]|0;BA(d)}while((b|0)!=0);c[a>>2]=0;return}function Ot(){return 11758}function Pt(){return 1504}function Qt(){return Mq()|0}function Rt(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){St(c);BA(c)}}else if(b|0)BA(b);return}function St(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function Tt(a){a=a|0;xi(a);return}function Ut(a,b){a=a|0;b=b|0;var d=0,e=0;Kt()|0;d=c[2662]|0;a:do if(d|0){while(1){e=c[d+4>>2]|0;if(e|0?(Fz(Vt(e)|0,a)|0)==0:0)break;d=c[d>>2]|0;if(!d)break a}Wt(e,b)}while(0);return}function Vt(a){a=a|0;return c[a+12>>2]|0}function Wt(a,b){a=a|0;b=b|0;var d=0;a=a+36|0;d=c[a>>2]|0;if(d|0){Pe(d);BA(d)}d=zA(4)|0;hg(d,b);c[a>>2]=d;return}function Xt(){if(!(a[11759]|0)){c[2674]=0;Fa(59,10696,o|0)|0;a[11759]=1}return 10696}function Yt(){var b=0;if(!(a[11760]|0)){Zt();c[2675]=1512;a[11760]=1;b=1512}else b=c[2675]|0;return b|0}function Zt(){if(!(a[11784]|0)){a[11761]=Jh(Jh(8,0)|0,0)|0;a[11762]=Jh(Jh(0,0)|0,0)|0;a[11763]=Jh(Jh(0,16)|0,0)|0;a[11764]=Jh(Jh(8,0)|0,0)|0;a[11765]=Jh(Jh(0,0)|0,0)|0;a[11766]=Jh(Jh(8,0)|0,0)|0;a[11767]=Jh(Jh(0,0)|0,0)|0;a[11768]=Jh(Jh(8,0)|0,0)|0;a[11769]=Jh(Jh(0,0)|0,0)|0;a[11770]=Jh(Jh(8,0)|0,0)|0;a[11771]=Jh(Jh(0,0)|0,0)|0;a[11772]=Jh(Jh(0,0)|0,32)|0;a[11773]=Jh(Jh(0,0)|0,32)|0;a[11784]=1}return}function _t(){return 1580}function $t(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0;g=l;l=l+32|0;m=g+16|0;k=g+12|0;j=g+8|0;i=g+4|0;h=g;c[m>>2]=a;c[k>>2]=b;c[j>>2]=d;c[i>>2]=e;c[h>>2]=f;Xt()|0;au(10696,m,k,j,i,h);l=g;return}function au(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=zA(24)|0;Ih(h+4|0,c[b>>2]|0,c[d>>2]|0,c[e>>2]|0,c[f>>2]|0,c[g>>2]|0);c[h>>2]=c[a>>2];c[a>>2]=h;return}function bu(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;u=l;l=l+32|0;q=u+20|0;r=u+8|0;s=u+4|0;t=u;b=c[b>>2]|0;if(b|0){p=q+4|0;j=q+8|0;k=r+4|0;m=r+8|0;n=r+8|0;o=q+8|0;do{h=b+4|0;i=cu(h)|0;if(i|0){f=du(i)|0;c[q>>2]=0;c[p>>2]=0;c[j>>2]=0;e=(eu(i)|0)+1|0;fu(q,e);if(e|0)while(1){e=e+-1|0;Qy(r,c[f>>2]|0);g=c[p>>2]|0;if(g>>>0<(c[o>>2]|0)>>>0){c[g>>2]=c[r>>2];c[p>>2]=(c[p>>2]|0)+4}else gu(q,r);if(!e)break;else f=f+4|0}e=hu(i)|0;c[r>>2]=0;c[k>>2]=0;c[m>>2]=0;a:do if(c[e>>2]|0){f=0;g=0;while(1){if((f|0)==(g|0))iu(r,e);else{c[f>>2]=c[e>>2];c[k>>2]=(c[k>>2]|0)+4}e=e+4|0;if(!(c[e>>2]|0))break a;f=c[k>>2]|0;g=c[n>>2]|0}}while(0);c[s>>2]=ju(h)|0;c[t>>2]=Sh(i)|0;ku(d,a,s,t,q,r);lu(r);mu(q)}b=c[b>>2]|0}while((b|0)!=0)}l=u;return}function cu(a){a=a|0;return c[a+12>>2]|0}function du(a){a=a|0;return c[a+12>>2]|0}function eu(a){a=a|0;return c[a+16>>2]|0}function fu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;d=f;e=c[a>>2]|0;if((c[a+8>>2]|0)-e>>2>>>0<b>>>0){Tu(d,b,(c[a+4>>2]|0)-e>>2,a+8|0);Uu(a,d);Vu(d)}l=f;return}function gu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;h=l;l=l+32|0;d=h;e=a+4|0;f=((c[e>>2]|0)-(c[a>>2]|0)>>2)+1|0;g=Pu(a)|0;if(g>>>0<f>>>0)sA(a);else{i=c[a>>2]|0;k=(c[a+8>>2]|0)-i|0;j=k>>1;Tu(d,k>>2>>>0<g>>>1>>>0?(j>>>0<f>>>0?f:j):g,(c[e>>2]|0)-i>>2,a+8|0);g=d+8|0;c[c[g>>2]>>2]=c[b>>2];c[g>>2]=(c[g>>2]|0)+4;Uu(a,d);Vu(d);l=h;return}}function hu(a){a=a|0;return c[a+8>>2]|0}function iu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;h=l;l=l+32|0;d=h;e=a+4|0;f=((c[e>>2]|0)-(c[a>>2]|0)>>2)+1|0;g=Mu(a)|0;if(g>>>0<f>>>0)sA(a);else{i=c[a>>2]|0;k=(c[a+8>>2]|0)-i|0;j=k>>1;Qu(d,k>>2>>>0<g>>>1>>>0?(j>>>0<f>>>0?f:j):g,(c[e>>2]|0)-i>>2,a+8|0);g=d+8|0;c[c[g>>2]>>2]=c[b>>2];c[g>>2]=(c[g>>2]|0)+4;Ru(a,d);Su(d);l=h;return}}function ju(a){a=a|0;return c[a>>2]|0}function ku(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;nu(a,b,c,d,e,f);return}function lu(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-4-e|0)>>>2)<<2);BA(d)}return}function mu(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-4-e|0)>>>2)<<2);BA(d)}return}function nu(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0;h=l;l=l+48|0;m=h+40|0;i=h+32|0;n=h+24|0;j=h+12|0;k=h;Wy(i);a=lg(a)|0;c[n>>2]=c[b>>2];d=c[d>>2]|0;e=c[e>>2]|0;ou(j,f);pu(k,g);c[m>>2]=c[n>>2];qu(a,m,d,e,j,k);lu(k);mu(j);Yy(i);l=h;return}function ou(a,b){a=a|0;b=b|0;var d=0,e=0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;d=b+4|0;e=(c[d>>2]|0)-(c[b>>2]|0)>>2;if(e|0){Nu(a,e);Ou(a,c[b>>2]|0,c[d>>2]|0,e)}return}function pu(a,b){a=a|0;b=b|0;var d=0,e=0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;d=b+4|0;e=(c[d>>2]|0)-(c[b>>2]|0)>>2;if(e|0){Ku(a,e);Lu(a,c[b>>2]|0,c[d>>2]|0,e)}return}function qu(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0;h=l;l=l+32|0;m=h+28|0;n=h+24|0;i=h+12|0;j=h;k=og(ru()|0)|0;c[n>>2]=c[b>>2];c[m>>2]=c[n>>2];b=su(m)|0;d=tu(d)|0;e=uu(e)|0;c[i>>2]=c[f>>2];m=f+4|0;c[i+4>>2]=c[m>>2];n=f+8|0;c[i+8>>2]=c[n>>2];c[n>>2]=0;c[m>>2]=0;c[f>>2]=0;f=vu(i)|0;c[j>>2]=c[g>>2];m=g+4|0;c[j+4>>2]=c[m>>2];n=g+8|0;c[j+8>>2]=c[n>>2];c[n>>2]=0;c[m>>2]=0;c[g>>2]=0;za(0,k|0,a|0,b|0,d|0,e|0,f|0,wu(j)|0)|0;lu(j);mu(i);l=h;return}function ru(){var b=0;if(!(a[9168]|0)){Iu(10748);b=9168;c[b>>2]=1;c[b+4>>2]=0}return 10748}function su(a){a=a|0;return Au(a)|0}function tu(a){a=a|0;return yu(a)|0}function uu(a){a=a|0;return ol(a)|0}function vu(a){a=a|0;return zu(a)|0}function wu(a){a=a|0;return xu(a)|0}function xu(a){a=a|0;var b=0,d=0,e=0;e=(c[a+4>>2]|0)-(c[a>>2]|0)|0;d=e>>2;e=lw(e+4|0)|0;c[e>>2]=d;if(d|0){b=0;do{c[e+4+(b<<2)>>2]=yu(c[(c[a>>2]|0)+(b<<2)>>2]|0)|0;b=b+1|0}while((b|0)!=(d|0))}return e|0}function yu(a){a=a|0;return a|0}function zu(a){a=a|0;var b=0,d=0,e=0;e=(c[a+4>>2]|0)-(c[a>>2]|0)|0;d=e>>2;e=lw(e+4|0)|0;c[e>>2]=d;if(d|0){b=0;do{c[e+4+(b<<2)>>2]=Au((c[a>>2]|0)+(b<<2)|0)|0;b=b+1|0}while((b|0)!=(d|0))}return e|0}function Au(a){a=a|0;var b=0,c=0,d=0,e=0;e=l;l=l+32|0;b=e+12|0;c=e;d=bi(Bu()|0)|0;if(!d)a=Cu(a)|0;else{ci(b,d);di(c,b);Ty(a,c);a=fi(b)|0}l=e;return a|0}function Bu(){var b=0;if(!(a[9160]|0)){Hu(10704);Fa(25,10704,o|0)|0;b=9160;c[b>>2]=1;c[b+4>>2]=0}return 10704}function Cu(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;d=l;l=l+16|0;f=d+4|0;h=d;e=lw(8)|0;b=e;i=zA(4)|0;c[i>>2]=c[a>>2];g=b+4|0;c[g>>2]=i;a=zA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];Du(a,g,f);c[e>>2]=a;l=d;return b|0}function Du(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=zA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1664;c[d+12>>2]=b;c[a+4>>2]=d;return}function Eu(a){a=a|0;tA(a);BA(a);return}function Fu(a){a=a|0;a=c[a+12>>2]|0;if(a|0)BA(a);return}function Gu(a){a=a|0;BA(a);return}function Hu(a){a=a|0;xi(a);return}function Iu(a){a=a|0;Ag(a,Ju()|0,5);return}function Ju(){return 1684}function Ku(a,b){a=a|0;b=b|0;var d=0;if((Mu(a)|0)>>>0<b>>>0)sA(a);if(b>>>0>1073741823)Qa();else{d=zA(b<<2)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+(b<<2);return}}function Lu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a+4|0;a=d-b|0;if((a|0)>0){KA(c[e>>2]|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+(a>>>2<<2)}return}function Mu(a){a=a|0;return 1073741823}function Nu(a,b){a=a|0;b=b|0;var d=0;if((Pu(a)|0)>>>0<b>>>0)sA(a);if(b>>>0>1073741823)Qa();else{d=zA(b<<2)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+(b<<2);return}}function Ou(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a+4|0;a=d-b|0;if((a|0)>0){KA(c[e>>2]|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+(a>>>2<<2)}return}function Pu(a){a=a|0;return 1073741823}function Qu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>1073741823)Qa();else{f=zA(b<<2)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<2)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<2);return}function Ru(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>2)<<2)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Su(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-4-b|0)>>>2)<<2);a=c[a>>2]|0;if(a|0)BA(a);return}function Tu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>1073741823)Qa();else{f=zA(b<<2)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<2)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<2);return}function Uu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>2)<<2)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Vu(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-4-b|0)>>>2)<<2);a=c[a>>2]|0;if(a|0)BA(a);return}function Wu(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+32|0;m=r+20|0;n=r+12|0;k=r+16|0;o=r+4|0;p=r;q=r+8|0;i=Yt()|0;g=c[i>>2]|0;h=c[g>>2]|0;if(h|0){j=c[i+8>>2]|0;i=c[i+4>>2]|0;while(1){Qy(m,h);Xu(a,m,i,j);g=g+4|0;h=c[g>>2]|0;if(!h)break;else{j=j+1|0;i=i+1|0}}}g=_t()|0;h=c[g>>2]|0;if(h|0)do{Qy(m,h);c[n>>2]=c[g+4>>2];Yu(b,m,n);g=g+8|0;h=c[g>>2]|0}while((h|0)!=0);g=c[(Kt()|0)>>2]|0;if(g|0)do{b=c[g+4>>2]|0;Qy(m,c[(Zu(b)|0)>>2]|0);c[n>>2]=Vt(b)|0;_u(d,m,n);g=c[g>>2]|0}while((g|0)!=0);Qy(k,0);g=Xt()|0;c[m>>2]=c[k>>2];bu(m,g,f);g=c[(Kt()|0)>>2]|0;if(g|0){a=m+4|0;b=m+8|0;d=m+8|0;do{j=c[g+4>>2]|0;Qy(n,c[(Zu(j)|0)>>2]|0);av(o,$u(j)|0);h=c[o>>2]|0;if(h|0){c[m>>2]=0;c[a>>2]=0;c[b>>2]=0;do{Qy(p,c[(Zu(c[h+4>>2]|0)|0)>>2]|0);i=c[a>>2]|0;if(i>>>0<(c[d>>2]|0)>>>0){c[i>>2]=c[p>>2];c[a>>2]=(c[a>>2]|0)+4}else gu(m,p);h=c[h>>2]|0}while((h|0)!=0);bv(e,n,m);mu(m)}c[q>>2]=c[n>>2];k=cv(j)|0;c[m>>2]=c[q>>2];bu(m,k,f);ui(o);g=c[g>>2]|0}while((g|0)!=0)}l=r;return}function Xu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;qv(a,b,c,d);return}function Yu(a,b,c){a=a|0;b=b|0;c=c|0;pv(a,b,c);return}function Zu(a){a=a|0;return a|0}function _u(a,b,c){a=a|0;b=b|0;c=c|0;kv(a,b,c);return}function $u(a){a=a|0;return a+16|0}function av(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;g=l;l=l+16|0;f=g+8|0;d=g;c[a>>2]=0;e=c[b>>2]|0;c[f>>2]=e;c[d>>2]=a;d=iv(d)|0;if(e|0){e=zA(12)|0;h=(jv(f)|0)+4|0;a=c[h+4>>2]|0;b=e+4|0;c[b>>2]=c[h>>2];c[b+4>>2]=a;b=c[c[f>>2]>>2]|0;c[f>>2]=b;if(!b)a=e;else{b=e;while(1){a=zA(12)|0;j=(jv(f)|0)+4|0;i=c[j+4>>2]|0;h=a+4|0;c[h>>2]=c[j>>2];c[h+4>>2]=i;c[b>>2]=a;h=c[c[f>>2]>>2]|0;c[f>>2]=h;if(!h)break;else b=a}}c[a>>2]=c[d>>2];c[d>>2]=e}l=g;return}function bv(a,b,c){a=a|0;b=b|0;c=c|0;dv(a,b,c);return}function cv(a){a=a|0;return a+24|0}function dv(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+32|0;h=e+24|0;f=e+16|0;i=e+12|0;g=e;Wy(f);a=lg(a)|0;c[i>>2]=c[b>>2];ou(g,d);c[h>>2]=c[i>>2];ev(a,h,g);mu(g);Yy(f);l=e;return}function ev(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+32|0;h=e+16|0;i=e+12|0;f=e;g=og(fv()|0)|0;c[i>>2]=c[b>>2];c[h>>2]=c[i>>2];b=su(h)|0;c[f>>2]=c[d>>2];h=d+4|0;c[f+4>>2]=c[h>>2];i=d+8|0;c[f+8>>2]=c[i>>2];c[i>>2]=0;c[h>>2]=0;c[d>>2]=0;va(0,g|0,a|0,b|0,vu(f)|0)|0;mu(f);l=e;return}function fv(){var b=0;if(!(a[9176]|0)){gv(10760);b=9176;c[b>>2]=1;c[b+4>>2]=0}return 10760}function gv(a){a=a|0;Ag(a,hv()|0,2);return}function hv(){return 1740}function iv(a){a=a|0;return c[a>>2]|0}function jv(a){a=a|0;return c[a>>2]|0}function kv(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+32|0;g=e+16|0;f=e+8|0;h=e;Wy(f);a=lg(a)|0;c[h>>2]=c[b>>2];d=c[d>>2]|0;c[g>>2]=c[h>>2];lv(a,g,d);Yy(f);l=e;return}function lv(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;g=e+4|0;h=e;f=og(mv()|0)|0;c[h>>2]=c[b>>2];c[g>>2]=c[h>>2];b=su(g)|0;va(0,f|0,a|0,b|0,tu(d)|0)|0;l=e;return}function mv(){var b=0;if(!(a[9184]|0)){nv(10772);b=9184;c[b>>2]=1;c[b+4>>2]=0}return 10772}function nv(a){a=a|0;Ag(a,ov()|0,2);return}function ov(){return 1752}function pv(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+32|0;g=e+16|0;f=e+8|0;h=e;Wy(f);a=lg(a)|0;c[h>>2]=c[b>>2];d=c[d>>2]|0;c[g>>2]=c[h>>2];lv(a,g,d);Yy(f);l=e;return}function qv(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+32|0;i=g+16|0;h=g+8|0;j=g;Wy(h);b=lg(b)|0;c[j>>2]=c[d>>2];e=a[e>>0]|0;f=a[f>>0]|0;c[i>>2]=c[j>>2];rv(b,i,e,f);Yy(h);l=g;return}function rv(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;h=f+4|0;i=f;g=og(sv()|0)|0;c[i>>2]=c[b>>2];c[h>>2]=c[i>>2];b=su(h)|0;d=tv(d)|0;Ya(0,g|0,a|0,b|0,d|0,tv(e)|0)|0;l=f;return}function sv(){var b=0;if(!(a[9192]|0)){vv(10784);b=9192;c[b>>2]=1;c[b+4>>2]=0}return 10784}function tv(a){a=a|0;return uv(a)|0}function uv(a){a=a|0;return a&255|0}function vv(a){a=a|0;Ag(a,wv()|0,3);return}function wv(){return 1764}function xv(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;p=l;l=l+32|0;j=p+8|0;k=p+4|0;m=p+20|0;n=p;gk(b,0);f=Sy(d)|0;c[j>>2]=0;o=j+4|0;c[o>>2]=0;c[j+8>>2]=0;switch(f<<24>>24){case 0:{a[m>>0]=0;yv(k,e,m);zv(b,k)|0;Qe(k);break}case 8:{o=Ry(d)|0;a[m>>0]=8;Qy(n,c[o+4>>2]|0);Av(k,e,m,n,o+8|0);zv(b,k)|0;Qe(k);break}case 9:{h=Ry(d)|0;d=c[h+4>>2]|0;if(d|0){i=j+8|0;g=h+12|0;while(1){d=d+-1|0;Qy(k,c[g>>2]|0);f=c[o>>2]|0;if(f>>>0<(c[i>>2]|0)>>>0){c[f>>2]=c[k>>2];c[o>>2]=(c[o>>2]|0)+4}else gu(j,k);if(!d)break;else g=g+4|0}}a[m>>0]=9;Qy(n,c[h+8>>2]|0);Bv(k,e,m,n,j);zv(b,k)|0;Qe(k);break}default:{o=Ry(d)|0;a[m>>0]=f;Qy(n,c[o+4>>2]|0);Cv(k,e,m,n);zv(b,k)|0;Qe(k)}}mu(j);l=p;return}function yv(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Wy(f);c=lg(c)|0;Qv(b,c,a[d>>0]|0);Yy(f);l=e;return}function zv(a,b){a=a|0;b=b|0;var d=0;d=c[a>>2]|0;if(d|0)Za(d|0);c[a>>2]=c[b>>2];c[b>>2]=0;return a|0}function Av(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;h=l;l=l+32|0;j=h+16|0;i=h+8|0;k=h;Wy(i);d=lg(d)|0;e=a[e>>0]|0;c[k>>2]=c[f>>2];g=c[g>>2]|0;c[j>>2]=c[k>>2];Mv(b,d,e,j,g);Yy(i);l=h;return}function Bv(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0;h=l;l=l+32|0;k=h+24|0;i=h+16|0;m=h+12|0;j=h;Wy(i);d=lg(d)|0;e=a[e>>0]|0;c[m>>2]=c[f>>2];ou(j,g);c[k>>2]=c[m>>2];Iv(b,d,e,k,j);mu(j);Yy(i);l=h;return}function Cv(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+32|0;i=g+16|0;h=g+8|0;j=g;Wy(h);d=lg(d)|0;e=a[e>>0]|0;c[j>>2]=c[f>>2];c[i>>2]=c[j>>2];Dv(b,d,e,i);Yy(h);l=g;return}function Dv(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+4|0;i=f;h=og(Ev()|0)|0;d=tv(d)|0;c[i>>2]=c[e>>2];c[g>>2]=c[i>>2];Fv(a,va(0,h|0,b|0,d|0,su(g)|0)|0);l=f;return}function Ev(){var b=0;if(!(a[9200]|0)){Gv(10796);b=9200;c[b>>2]=1;c[b+4>>2]=0}return 10796}function Fv(a,b){a=a|0;b=b|0;gk(a,b);return}function Gv(a){a=a|0;Ag(a,Hv()|0,2);return}function Hv(){return 1780}function Iv(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;g=l;l=l+32|0;j=g+16|0;k=g+12|0;h=g;i=og(Jv()|0)|0;d=tv(d)|0;c[k>>2]=c[e>>2];c[j>>2]=c[k>>2];e=su(j)|0;c[h>>2]=c[f>>2];j=f+4|0;c[h+4>>2]=c[j>>2];k=f+8|0;c[h+8>>2]=c[k>>2];c[k>>2]=0;c[j>>2]=0;c[f>>2]=0;Fv(a,Ya(0,i|0,b|0,d|0,e|0,vu(h)|0)|0);mu(h);l=g;return}function Jv(){var b=0;if(!(a[9208]|0)){Kv(10808);b=9208;c[b>>2]=1;c[b+4>>2]=0}return 10808}function Kv(a){a=a|0;Ag(a,Lv()|0,3);return}function Lv(){return 1792}function Mv(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+16|0;i=g+4|0;j=g;h=og(Nv()|0)|0;d=tv(d)|0;c[j>>2]=c[e>>2];c[i>>2]=c[j>>2];e=su(i)|0;Fv(a,Ya(0,h|0,b|0,d|0,e|0,uu(f)|0)|0);l=g;return}function Nv(){var b=0;if(!(a[9216]|0)){Ov(10820);b=9216;c[b>>2]=1;c[b+4>>2]=0}return 10820}function Ov(a){a=a|0;Ag(a,Pv()|0,3);return}function Pv(){return 1808}function Qv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=og(Rv()|0)|0;Fv(a,_a(0,d|0,b|0,tv(c)|0)|0);return}function Rv(){var b=0;if(!(a[9224]|0)){Sv(10832);b=9224;c[b>>2]=1;c[b+4>>2]=0}return 10832}function Sv(a){a=a|0;Ag(a,Tv()|0,1);return}function Tv(){return 1824}function Uv(){Vv();Wv();Xv();return}function Vv(){c[2712]=AA(65536)|0;return}function Wv(){sw(10896);return}function Xv(){Yv(10856);return}function Yv(a){a=a|0;Zv(a,6275);_v(a)|0;return}function Zv(a,b){a=a|0;b=b|0;var d=0;d=Bu()|0;c[a>>2]=d;mw(d,b);Jt(c[a>>2]|0);return}function _v(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,$v()|0);return a|0}function $v(){var b=0;if(!(a[9232]|0)){aw(10860);Fa(60,10860,o|0)|0;b=9232;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(10860)|0))aw(10860);return 10860}function aw(a){a=a|0;dw(a);_q(a,26);return}function bw(a){a=a|0;cw(a+24|0);return}function cw(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function dw(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,19,b,iw()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function ew(a,b){a=a|0;b=b|0;fw(a,b);return}function fw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=l;l=l+16|0;e=d;f=d+4|0;Ak(f,b);c[e>>2]=Bk(f,b)|0;gw(a,e);l=d;return}function gw(b,d){b=b|0;d=d|0;hw(b+4|0,c[d>>2]|0);a[b+8>>0]=1;return}function hw(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function iw(){return 1832}function jw(a){a=a|0;return kw(a)|0}function kw(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;d=l;l=l+16|0;f=d+4|0;h=d;e=lw(8)|0;b=e;i=zA(4)|0;Ak(f,a);hw(i,Bk(f,a)|0);g=b+4|0;c[g>>2]=i;a=zA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];Du(a,g,f);c[e>>2]=a;l=d;return b|0}function lw(a){a=a|0;var b=0,d=0;a=a+7&-8;if(a>>>0<=32768?(b=c[2711]|0,a>>>0<=(65536-b|0)>>>0):0){d=(c[2712]|0)+b|0;c[2711]=b+a;a=d}else{a=AA(a+8|0)|0;c[a>>2]=c[2713];c[2713]=a;a=a+8|0}return a|0}function mw(a,b){a=a|0;b=b|0;c[a>>2]=nw()|0;c[a+4>>2]=ow()|0;c[a+12>>2]=b;c[a+8>>2]=pw()|0;c[a+32>>2]=7;return}function nw(){return 11788}function ow(){return 1840}function pw(){return wr()|0}function qw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){rw(c);BA(c)}}else if(b|0)BA(b);return}function rw(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function sw(a){a=a|0;tw(a,6283);uw(a)|0;vw(a,6289,27)|0;ww(a,6300,1)|0;xw(a,6308,11)|0;yw(a,6318,20)|0;Aw(a,6325,28)|0;return}function tw(a,b){a=a|0;b=b|0;var d=0;d=Iy()|0;c[a>>2]=d;Jy(d,b);Jt(c[a>>2]|0);return}function uw(a){a=a|0;var b=0;b=c[a>>2]|0;Uq(b,ty()|0);return a|0}function vw(a,b,c){a=a|0;b=b|0;c=c|0;_x(a,Ah(b)|0,c,0);return a|0}function ww(a,b,c){a=a|0;b=b|0;c=c|0;Ix(a,Ah(b)|0,c,0);return a|0}function xw(a,b,c){a=a|0;b=b|0;c=c|0;jx(a,Ah(b)|0,c,0);return a|0}function yw(a,b,c){a=a|0;b=b|0;c=c|0;Tw(a,Ah(b)|0,c,0);return a|0}function zw(a,b){a=a|0;b=b|0;var d=0,e=0;a:while(1){d=c[2713]|0;while(1){if((d|0)==(b|0))break a;e=c[d>>2]|0;c[2713]=e;if(!d)d=e;else break}BA(d)}c[2711]=a;return}function Aw(a,b,c){a=a|0;b=b|0;c=c|0;Bw(a,Ah(b)|0,c,0);return a|0}function Bw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Cw()|0;a=Dw(d)|0;Fh(g,b,f,a,Ew(d,e)|0,e);return}function Cw(){var b=0,d=0;if(!(a[9240]|0)){Lw(10900);Fa(61,10900,o|0)|0;d=9240;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10900)|0)){b=10900;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Lw(10900)}return 10900}function Dw(a){a=a|0;return a|0}function Ew(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Cw()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Fw(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Gw(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Fw(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Gw(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Hw(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Iw(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Fw(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Jw(a,f);Kw(f);l=i;return}}function Hw(a){a=a|0;return 536870911}function Iw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Jw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Kw(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function Lw(a){a=a|0;Ow(a);return}function Mw(a){a=a|0;Nw(a+24|0);return}function Nw(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function Ow(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,12,b,Pw()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Pw(){return 1848}function Qw(a,b,d){a=a|0;b=b|0;d=d|0;Sw(c[(Rw(a)|0)>>2]|0,b,d);return}function Rw(a){a=a|0;return (c[(Cw()|0)+24>>2]|0)+(a<<3)|0}function Sw(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;l=l+16|0;f=d+1|0;e=d;Ak(f,b);b=Bk(f,b)|0;Ak(e,c);c=Bk(e,c)|0;kb[a&31](b,c);l=d;return}function Tw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Uw()|0;a=Vw(d)|0;Fh(g,b,f,a,Ww(d,e)|0,e);return}function Uw(){var b=0,d=0;if(!(a[9248]|0)){bx(10936);Fa(62,10936,o|0)|0;d=9248;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10936)|0)){b=10936;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));bx(10936)}return 10936}function Vw(a){a=a|0;return a|0}function Ww(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Uw()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Xw(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Yw(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Xw(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Yw(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Zw(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;_w(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Xw(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;$w(a,f);ax(f);l=i;return}}function Zw(a){a=a|0;return 536870911}function _w(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function $w(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function ax(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function bx(a){a=a|0;ex(a);return}function cx(a){a=a|0;dx(a+24|0);return}function dx(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function ex(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,11,b,fx()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function fx(){return 1860}function gx(a,b){a=a|0;b=b|0;return ix(c[(hx(a)|0)>>2]|0,b)|0}function hx(a){a=a|0;return (c[(Uw()|0)+24>>2]|0)+(a<<3)|0}function ix(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+16|0;d=c;Ak(d,b);b=Bk(d,b)|0;b=ol(lb[a&31](b)|0)|0;l=c;return b|0}function jx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=kx()|0;a=lx(d)|0;Fh(g,b,f,a,mx(d,e)|0,e);return}function kx(){var b=0,d=0;if(!(a[9256]|0)){tx(10972);Fa(63,10972,o|0)|0;d=9256;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(10972)|0)){b=10972;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));tx(10972)}return 10972}function lx(a){a=a|0;return a|0}function mx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=kx()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){nx(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{ox(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function nx(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function ox(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=px(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;qx(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;nx(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;rx(a,f);sx(f);l=i;return}}function px(a){a=a|0;return 536870911}function qx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function rx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function sx(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function tx(a){a=a|0;wx(a);return}function ux(a){a=a|0;vx(a+24|0);return}function vx(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function wx(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,7,b,xx()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function xx(){return 1868}function yx(a,b,d){a=a|0;b=b|0;d=d|0;return Ax(c[(zx(a)|0)>>2]|0,b,d)|0}function zx(a){a=a|0;return (c[(kx()|0)+24>>2]|0)+(a<<3)|0}function Ax(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;e=l;l=l+32|0;h=e+12|0;g=e+8|0;i=e;j=e+16|0;f=e+4|0;Bx(j,b);Cx(i,j,b);ck(f,d);d=dk(f,d)|0;c[h>>2]=c[i>>2];zb[a&15](g,h,d);d=Dx(g)|0;Qe(g);ek(f);l=e;return d|0}function Bx(a,b){a=a|0;b=b|0;return}function Cx(a,b,c){a=a|0;b=b|0;c=c|0;Ex(a,c);return}function Dx(a){a=a|0;return lg(a)|0}function Ex(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;d=f;e=b;if(!(e&1))c[a>>2]=c[b>>2];else{Fx(d,0);Ha(e|0,d|0)|0;Gx(a,d);Hx(d)}l=f;return}function Fx(b,d){b=b|0;d=d|0;vg(b,d);c[b+4>>2]=0;a[b+8>>0]=0;return}function Gx(a,b){a=a|0;b=b|0;c[a>>2]=c[b+4>>2];return}function Hx(b){b=b|0;a[b+8>>0]=0;return}function Ix(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Jx()|0;a=Kx(d)|0;Fh(g,b,f,a,Lx(d,e)|0,e);return}function Jx(){var b=0,d=0;if(!(a[9264]|0)){Sx(11008);Fa(64,11008,o|0)|0;d=9264;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(11008)|0)){b=11008;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Sx(11008)}return 11008}function Kx(a){a=a|0;return a|0}function Lx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Jx()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Mx(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Nx(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Mx(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Nx(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Ox(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Px(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Mx(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Qx(a,f);Rx(f);l=i;return}}function Ox(a){a=a|0;return 536870911}function Px(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Qx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Rx(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function Sx(a){a=a|0;Vx(a);return}function Tx(a){a=a|0;Ux(a+24|0);return}function Ux(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function Vx(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,1,b,Wx()|0,5);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Wx(){return 1880}function Xx(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;Zx(c[(Yx(a)|0)>>2]|0,b,d,e,f,g);return}function Yx(a){a=a|0;return (c[(Jx()|0)+24>>2]|0)+(a<<3)|0}function Zx(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0;g=l;l=l+32|0;h=g+16|0;i=g+12|0;j=g+8|0;k=g+4|0;m=g;ck(h,b);b=dk(h,b)|0;ck(i,c);c=dk(i,c)|0;ck(j,d);d=dk(j,d)|0;ck(k,e);e=dk(k,e)|0;ck(m,f);f=dk(m,f)|0;gb[a&1](b,c,d,e,f);ek(m);ek(k);ek(j);ek(i);ek(h);l=g;return}function _x(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=$x()|0;a=ay(d)|0;Fh(g,b,f,a,by(d,e)|0,e);return}function $x(){var b=0,d=0;if(!(a[9272]|0)){iy(11044);Fa(65,11044,o|0)|0;d=9272;c[d>>2]=1;c[d+4>>2]=0}if(!(Sh(11044)|0)){b=11044;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));iy(11044)}return 11044}function ay(a){a=a|0;return a|0}function by(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=$x()|0;h=j+24|0;b=Jh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){cy(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{dy(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function cy(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function dy(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=ey(a)|0;if(e>>>0<h>>>0)sA(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;fy(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;cy(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;gy(a,f);hy(f);l=i;return}}function ey(a){a=a|0;return 536870911}function fy(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=zA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function gy(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){KA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function hy(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)BA(a);return}function iy(a){a=a|0;ly(a);return}function jy(a){a=a|0;ky(a+24|0);return}function ky(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function ly(a){a=a|0;var b=0;b=Vh()|0;Yh(a,1,13,b,my()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function my(){return 1904}function ny(a,b,d){a=a|0;b=b|0;d=d|0;py(c[(oy(a)|0)>>2]|0,b,d);return}function oy(a){a=a|0;return (c[($x()|0)+24>>2]|0)+(a<<3)|0}function py(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;l=l+16|0;f=d+4|0;e=d;qy(f,b);b=ry(f,b)|0;ck(e,c);c=dk(e,c)|0;kb[a&31](b,c);ek(e);l=d;return}function qy(a,b){a=a|0;b=b|0;return}function ry(a,b){a=a|0;b=b|0;return sy(b)|0}function sy(a){a=a|0;return a|0}function ty(){var b=0;if(!(a[9280]|0)){uy(11080);Fa(66,11080,o|0)|0;b=9280;c[b>>2]=1;c[b+4>>2]=0}if(!(Sh(11080)|0))uy(11080);return 11080}function uy(a){a=a|0;xy(a);_q(a,67);return}function vy(a){a=a|0;wy(a+24|0);return}function wy(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);BA(d)}return}function xy(a){a=a|0;var b=0;b=Vh()|0;Yh(a,5,6,b,By()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function yy(a){a=a|0;zy(a);return}function zy(a){a=a|0;Ay(a);return}function Ay(b){b=b|0;a[b+8>>0]=1;return}function By(){return 1944}function Cy(){return Dy()|0}function Dy(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;b=l;l=l+16|0;f=b+4|0;h=b;d=lw(8)|0;a=d;g=a+4|0;c[g>>2]=zA(1)|0;e=zA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];Ey(e,g,f);c[d>>2]=e;l=b;return a|0}function Ey(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=zA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1924;c[d+12>>2]=b;c[a+4>>2]=d;return}function Fy(a){a=a|0;tA(a);BA(a);return}function Gy(a){a=a|0;a=c[a+12>>2]|0;if(a|0)BA(a);return}function Hy(a){a=a|0;BA(a);return}function Iy(){var b=0;if(!(a[9288]|0)){Py(11116);Fa(25,11116,o|0)|0;b=9288;c[b>>2]=1;c[b+4>>2]=0}return 11116}function Jy(a,b){a=a|0;b=b|0;c[a>>2]=Ky()|0;c[a+4>>2]=Ly()|0;c[a+12>>2]=b;c[a+8>>2]=My()|0;c[a+32>>2]=8;return}function Ky(){return 11789}function Ly(){return 1948}function My(){return Mq()|0}function Ny(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((Kq(d,896)|0)==512){if(c|0){Oy(c);BA(c)}}else if(b|0)BA(b);return}function Oy(a){a=a|0;a=c[a+4>>2]|0;if(a|0)xA(a);return}function Py(a){a=a|0;xi(a);return}function Qy(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function Ry(a){a=a|0;return c[a>>2]|0}function Sy(b){b=b|0;return a[c[b>>2]>>0]|0}function Ty(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;c[e>>2]=c[a>>2];Uy(b,e)|0;l=d;return}function Uy(a,b){a=a|0;b=b|0;var d=0;d=Vy(c[a>>2]|0,b)|0;b=a+4|0;c[(c[b>>2]|0)+8>>2]=d;return c[(c[b>>2]|0)+8>>2]|0}function Vy(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;Wy(e);a=lg(a)|0;b=Xy(a,c[b>>2]|0)|0;Yy(e);l=d;return b|0}function Wy(a){a=a|0;c[a>>2]=c[2711];c[a+4>>2]=c[2713];return}function Xy(a,b){a=a|0;b=b|0;var c=0;c=og(Zy()|0)|0;return _a(0,c|0,a|0,uu(b)|0)|0}function Yy(a){a=a|0;zw(c[a>>2]|0,c[a+4>>2]|0);return}function Zy(){var b=0;if(!(a[9296]|0)){_y(11160);b=9296;c[b>>2]=1;c[b+4>>2]=0}return 11160}function _y(a){a=a|0;Ag(a,$y()|0,1);return}function $y(){return 1956}function az(){bz();return}function bz(){var b=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;s=l;l=l+16|0;o=s+4|0;p=s;Ca(65536,10844,c[2712]|0,10852);f=Yt()|0;e=c[f>>2]|0;b=c[e>>2]|0;if(b|0){g=c[f+8>>2]|0;f=c[f+4>>2]|0;while(1){Ja(b|0,d[f>>0]|0|0,a[g>>0]|0);e=e+4|0;b=c[e>>2]|0;if(!b)break;else{g=g+1|0;f=f+1|0}}}b=_t()|0;e=c[b>>2]|0;if(e|0)do{Ka(e|0,c[b+4>>2]|0);b=b+8|0;e=c[b>>2]|0}while((e|0)!=0);Ka(cz()|0,6398);n=Kt()|0;b=c[n>>2]|0;a:do if(b|0){do{dz(c[b+4>>2]|0);b=c[b>>2]|0}while((b|0)!=0);b=c[n>>2]|0;if(b|0){m=n;do{while(1){h=b;b=c[b>>2]|0;h=c[h+4>>2]|0;if(!(ez(h)|0))break;c[p>>2]=m;c[o>>2]=c[p>>2];fz(n,o)|0;if(!b)break a}gz(h);m=c[m>>2]|0;e=hz(h)|0;i=Sa()|0;j=l;l=l+((1*(e<<2)|0)+15&-16)|0;k=l;l=l+((1*(e<<2)|0)+15&-16)|0;e=c[($u(h)|0)>>2]|0;if(e|0){f=j;g=k;while(1){c[f>>2]=c[(Zu(c[e+4>>2]|0)|0)>>2];c[g>>2]=c[e+8>>2];e=c[e>>2]|0;if(!e)break;else{f=f+4|0;g=g+4|0}}}t=Zu(h)|0;e=iz(h)|0;f=hz(h)|0;g=jz(h)|0;Oa(t|0,e|0,j|0,k|0,f|0,g|0,Vt(h)|0);Ea(i|0)}while((b|0)!=0)}}while(0);b=c[(Xt()|0)>>2]|0;if(b|0)do{t=b+4|0;n=cu(t)|0;h=hu(n)|0;i=du(n)|0;j=(eu(n)|0)+1|0;k=kz(n)|0;m=lz(t)|0;n=Sh(n)|0;o=ju(t)|0;p=mz(t)|0;Ma(0,h|0,i|0,j|0,k|0,m|0,n|0,o|0,p|0,nz(t)|0);b=c[b>>2]|0}while((b|0)!=0);b=c[(Kt()|0)>>2]|0;b:do if(b|0){c:while(1){e=c[b+4>>2]|0;if(e|0?(q=c[(Zu(e)|0)>>2]|0,r=c[(cv(e)|0)>>2]|0,r|0):0){f=r;do{e=f+4|0;g=cu(e)|0;d:do if(g|0)switch(Sh(g)|0){case 0:break c;case 4:case 3:case 2:{k=hu(g)|0;m=du(g)|0;n=(eu(g)|0)+1|0;o=kz(g)|0;p=Sh(g)|0;t=ju(e)|0;Ma(q|0,k|0,m|0,n|0,o|0,0,p|0,t|0,mz(e)|0,nz(e)|0);break d}case 1:{j=hu(g)|0;k=du(g)|0;m=(eu(g)|0)+1|0;n=kz(g)|0;o=lz(e)|0;p=Sh(g)|0;t=ju(e)|0;Ma(q|0,j|0,k|0,m|0,n|0,o|0,p|0,t|0,mz(e)|0,nz(e)|0);break d}case 5:{n=hu(g)|0;o=du(g)|0;p=(eu(g)|0)+1|0;t=kz(g)|0;Ma(q|0,n|0,o|0,p|0,t|0,oz(g)|0,Sh(g)|0,0,0,0);break d}default:break d}while(0);f=c[f>>2]|0}while((f|0)!=0)}b=c[b>>2]|0;if(!b)break b}Qa()}while(0);Pa();l=s;return}function cz(){return 11746}function dz(b){b=b|0;a[b+40>>0]=0;return}function ez(b){b=b|0;return (a[b+40>>0]|0)!=0|0}function fz(a,b){a=a|0;b=b|0;b=pz(b)|0;a=c[b>>2]|0;c[b>>2]=c[a>>2];BA(a);return c[b>>2]|0}function gz(b){b=b|0;a[b+40>>0]=1;return}function hz(a){a=a|0;return c[a+20>>2]|0}function iz(a){a=a|0;return c[a+8>>2]|0}function jz(a){a=a|0;return c[a+32>>2]|0}function kz(a){a=a|0;return c[a+4>>2]|0}function lz(a){a=a|0;return c[a+4>>2]|0}function mz(a){a=a|0;return c[a+8>>2]|0}function nz(a){a=a|0;return c[a+16>>2]|0}function oz(a){a=a|0;return c[a+20>>2]|0}function pz(a){a=a|0;return c[a>>2]|0}function qz(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=l;l=l+16|0;o=x;do if(a>>>0<245){k=a>>>0<11?16:a+11&-8;a=k>>>3;n=c[2793]|0;d=n>>>a;if(d&3|0){b=(d&1^1)+a|0;a=11212+(b<<1<<2)|0;d=a+8|0;e=c[d>>2]|0;f=e+8|0;g=c[f>>2]|0;if((a|0)==(g|0))c[2793]=n&~(1<<b);else{c[g+12>>2]=a;c[d>>2]=g}w=b<<3;c[e+4>>2]=w|3;w=e+w+4|0;c[w>>2]=c[w>>2]|1;w=f;l=x;return w|0}m=c[2795]|0;if(k>>>0>m>>>0){if(d|0){b=2<<a;b=d<<a&(b|0-b);b=(b&0-b)+-1|0;h=b>>>12&16;b=b>>>h;d=b>>>5&8;b=b>>>d;f=b>>>2&4;b=b>>>f;a=b>>>1&2;b=b>>>a;e=b>>>1&1;e=(d|h|f|a|e)+(b>>>e)|0;b=11212+(e<<1<<2)|0;a=b+8|0;f=c[a>>2]|0;h=f+8|0;d=c[h>>2]|0;if((b|0)==(d|0)){a=n&~(1<<e);c[2793]=a}else{c[d+12>>2]=b;c[a>>2]=d;a=n}g=(e<<3)-k|0;c[f+4>>2]=k|3;e=f+k|0;c[e+4>>2]=g|1;c[e+g>>2]=g;if(m|0){f=c[2798]|0;b=m>>>3;d=11212+(b<<1<<2)|0;b=1<<b;if(!(a&b)){c[2793]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=f;c[b+12>>2]=f;c[f+8>>2]=b;c[f+12>>2]=d}c[2795]=g;c[2798]=e;w=h;l=x;return w|0}i=c[2794]|0;if(i){d=(i&0-i)+-1|0;h=d>>>12&16;d=d>>>h;g=d>>>5&8;d=d>>>g;j=d>>>2&4;d=d>>>j;e=d>>>1&2;d=d>>>e;a=d>>>1&1;a=c[11476+((g|h|j|e|a)+(d>>>a)<<2)>>2]|0;d=(c[a+4>>2]&-8)-k|0;e=c[a+16+(((c[a+16>>2]|0)==0&1)<<2)>>2]|0;if(!e){j=a;g=d}else{do{h=(c[e+4>>2]&-8)-k|0;j=h>>>0<d>>>0;d=j?h:d;a=j?e:a;e=c[e+16+(((c[e+16>>2]|0)==0&1)<<2)>>2]|0}while((e|0)!=0);j=a;g=d}h=j+k|0;if(j>>>0<h>>>0){f=c[j+24>>2]|0;b=c[j+12>>2]|0;do if((b|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){d=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}c[a>>2]=0;d=b}else{d=c[j+8>>2]|0;c[d+12>>2]=b;c[b+8>>2]=d;d=b}while(0);do if(f|0){b=c[j+28>>2]|0;a=11476+(b<<2)|0;if((j|0)==(c[a>>2]|0)){c[a>>2]=d;if(!d){c[2794]=i&~(1<<b);break}}else{c[f+16+(((c[f+16>>2]|0)!=(j|0)&1)<<2)>>2]=d;if(!d)break}c[d+24>>2]=f;b=c[j+16>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d}b=c[j+20>>2]|0;if(b|0){c[d+20>>2]=b;c[b+24>>2]=d}}while(0);if(g>>>0<16){w=g+k|0;c[j+4>>2]=w|3;w=j+w+4|0;c[w>>2]=c[w>>2]|1}else{c[j+4>>2]=k|3;c[h+4>>2]=g|1;c[h+g>>2]=g;if(m|0){e=c[2798]|0;b=m>>>3;d=11212+(b<<1<<2)|0;b=1<<b;if(!(n&b)){c[2793]=n|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=e;c[b+12>>2]=e;c[e+8>>2]=b;c[e+12>>2]=d}c[2795]=g;c[2798]=h}w=j+8|0;l=x;return w|0}else n=k}else n=k}else n=k}else if(a>>>0<=4294967231){a=a+11|0;k=a&-8;j=c[2794]|0;if(j){e=0-k|0;a=a>>>8;if(a)if(k>>>0>16777215)i=31;else{n=(a+1048320|0)>>>16&8;v=a<<n;m=(v+520192|0)>>>16&4;v=v<<m;i=(v+245760|0)>>>16&2;i=14-(m|n|i)+(v<<i>>>15)|0;i=k>>>(i+7|0)&1|i<<1}else i=0;d=c[11476+(i<<2)>>2]|0;a:do if(!d){d=0;a=0;v=57}else{a=0;h=k<<((i|0)==31?0:25-(i>>>1)|0);g=0;while(1){f=(c[d+4>>2]&-8)-k|0;if(f>>>0<e>>>0)if(!f){a=d;e=0;f=d;v=61;break a}else{a=d;e=f}f=c[d+20>>2]|0;d=c[d+16+(h>>>31<<2)>>2]|0;g=(f|0)==0|(f|0)==(d|0)?g:f;f=(d|0)==0;if(f){d=g;v=57;break}else h=h<<((f^1)&1)}}while(0);if((v|0)==57){if((d|0)==0&(a|0)==0){a=2<<i;a=j&(a|0-a);if(!a){n=k;break}n=(a&0-a)+-1|0;h=n>>>12&16;n=n>>>h;g=n>>>5&8;n=n>>>g;i=n>>>2&4;n=n>>>i;m=n>>>1&2;n=n>>>m;d=n>>>1&1;a=0;d=c[11476+((g|h|i|m|d)+(n>>>d)<<2)>>2]|0}if(!d){i=a;h=e}else{f=d;v=61}}if((v|0)==61)while(1){v=0;d=(c[f+4>>2]&-8)-k|0;n=d>>>0<e>>>0;d=n?d:e;a=n?f:a;f=c[f+16+(((c[f+16>>2]|0)==0&1)<<2)>>2]|0;if(!f){i=a;h=d;break}else{e=d;v=61}}if((i|0)!=0?h>>>0<((c[2795]|0)-k|0)>>>0:0){g=i+k|0;if(i>>>0>=g>>>0){w=0;l=x;return w|0}f=c[i+24>>2]|0;b=c[i+12>>2]|0;do if((b|0)==(i|0)){a=i+20|0;b=c[a>>2]|0;if(!b){a=i+16|0;b=c[a>>2]|0;if(!b){b=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}c[a>>2]=0}else{w=c[i+8>>2]|0;c[w+12>>2]=b;c[b+8>>2]=w}while(0);do if(f){a=c[i+28>>2]|0;d=11476+(a<<2)|0;if((i|0)==(c[d>>2]|0)){c[d>>2]=b;if(!b){e=j&~(1<<a);c[2794]=e;break}}else{c[f+16+(((c[f+16>>2]|0)!=(i|0)&1)<<2)>>2]=b;if(!b){e=j;break}}c[b+24>>2]=f;a=c[i+16>>2]|0;if(a|0){c[b+16>>2]=a;c[a+24>>2]=b}a=c[i+20>>2]|0;if(a){c[b+20>>2]=a;c[a+24>>2]=b;e=j}else e=j}else e=j;while(0);do if(h>>>0>=16){c[i+4>>2]=k|3;c[g+4>>2]=h|1;c[g+h>>2]=h;b=h>>>3;if(h>>>0<256){d=11212+(b<<1<<2)|0;a=c[2793]|0;b=1<<b;if(!(a&b)){c[2793]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=g;c[b+12>>2]=g;c[g+8>>2]=b;c[g+12>>2]=d;break}b=h>>>8;if(b)if(h>>>0>16777215)b=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;b=(w+245760|0)>>>16&2;b=14-(u|v|b)+(w<<b>>>15)|0;b=h>>>(b+7|0)&1|b<<1}else b=0;d=11476+(b<<2)|0;c[g+28>>2]=b;a=g+16|0;c[a+4>>2]=0;c[a>>2]=0;a=1<<b;if(!(e&a)){c[2794]=e|a;c[d>>2]=g;c[g+24>>2]=d;c[g+12>>2]=g;c[g+8>>2]=g;break}a=h<<((b|0)==31?0:25-(b>>>1)|0);d=c[d>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(h|0)){v=97;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=96;break}else{a=a<<1;d=b}}if((v|0)==96){c[e>>2]=g;c[g+24>>2]=d;c[g+12>>2]=g;c[g+8>>2]=g;break}else if((v|0)==97){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=g;c[v>>2]=g;c[g+8>>2]=w;c[g+12>>2]=d;c[g+24>>2]=0;break}}else{w=h+k|0;c[i+4>>2]=w|3;w=i+w+4|0;c[w>>2]=c[w>>2]|1}while(0);w=i+8|0;l=x;return w|0}else n=k}else n=k}else n=-1;while(0);d=c[2795]|0;if(d>>>0>=n>>>0){b=d-n|0;a=c[2798]|0;if(b>>>0>15){w=a+n|0;c[2798]=w;c[2795]=b;c[w+4>>2]=b|1;c[w+b>>2]=b;c[a+4>>2]=n|3}else{c[2795]=0;c[2798]=0;c[a+4>>2]=d|3;w=a+d+4|0;c[w>>2]=c[w>>2]|1}w=a+8|0;l=x;return w|0}h=c[2796]|0;if(h>>>0>n>>>0){u=h-n|0;c[2796]=u;w=c[2799]|0;v=w+n|0;c[2799]=v;c[v+4>>2]=u|1;c[w+4>>2]=n|3;w=w+8|0;l=x;return w|0}if(!(c[2911]|0)){c[2913]=4096;c[2912]=4096;c[2914]=-1;c[2915]=-1;c[2916]=0;c[2904]=0;a=o&-16^1431655768;c[o>>2]=a;c[2911]=a;a=4096}else a=c[2913]|0;i=n+48|0;j=n+47|0;g=a+j|0;f=0-a|0;k=g&f;if(k>>>0<=n>>>0){w=0;l=x;return w|0}a=c[2903]|0;if(a|0?(m=c[2901]|0,o=m+k|0,o>>>0<=m>>>0|o>>>0>a>>>0):0){w=0;l=x;return w|0}b:do if(!(c[2904]&4)){d=c[2799]|0;c:do if(d){e=11620;while(1){a=c[e>>2]|0;if(a>>>0<=d>>>0?(r=e+4|0,(a+(c[r>>2]|0)|0)>>>0>d>>>0):0)break;a=c[e+8>>2]|0;if(!a){v=118;break c}else e=a}b=g-h&f;if(b>>>0<2147483647){a=OA(b|0)|0;if((a|0)==((c[e>>2]|0)+(c[r>>2]|0)|0)){if((a|0)!=(-1|0)){h=b;g=a;v=135;break b}}else{e=a;v=126}}else b=0}else v=118;while(0);do if((v|0)==118){d=OA(0)|0;if((d|0)!=(-1|0)?(b=d,p=c[2912]|0,q=p+-1|0,b=((q&b|0)==0?0:(q+b&0-p)-b|0)+k|0,p=c[2901]|0,q=b+p|0,b>>>0>n>>>0&b>>>0<2147483647):0){r=c[2903]|0;if(r|0?q>>>0<=p>>>0|q>>>0>r>>>0:0){b=0;break}a=OA(b|0)|0;if((a|0)==(d|0)){h=b;g=d;v=135;break b}else{e=a;v=126}}else b=0}while(0);do if((v|0)==126){d=0-b|0;if(!(i>>>0>b>>>0&(b>>>0<2147483647&(e|0)!=(-1|0))))if((e|0)==(-1|0)){b=0;break}else{h=b;g=e;v=135;break b}a=c[2913]|0;a=j-b+a&0-a;if(a>>>0>=2147483647){h=b;g=e;v=135;break b}if((OA(a|0)|0)==(-1|0)){OA(d|0)|0;b=0;break}else{h=a+b|0;g=e;v=135;break b}}while(0);c[2904]=c[2904]|4;v=133}else{b=0;v=133}while(0);if(((v|0)==133?k>>>0<2147483647:0)?(u=OA(k|0)|0,r=OA(0)|0,s=r-u|0,t=s>>>0>(n+40|0)>>>0,!((u|0)==(-1|0)|t^1|u>>>0<r>>>0&((u|0)!=(-1|0)&(r|0)!=(-1|0))^1)):0){h=t?s:b;g=u;v=135}if((v|0)==135){b=(c[2901]|0)+h|0;c[2901]=b;if(b>>>0>(c[2902]|0)>>>0)c[2902]=b;j=c[2799]|0;do if(j){b=11620;while(1){a=c[b>>2]|0;d=b+4|0;e=c[d>>2]|0;if((g|0)==(a+e|0)){v=145;break}f=c[b+8>>2]|0;if(!f)break;else b=f}if(((v|0)==145?(c[b+12>>2]&8|0)==0:0)?j>>>0<g>>>0&j>>>0>=a>>>0:0){c[d>>2]=e+h;w=j+8|0;w=(w&7|0)==0?0:0-w&7;v=j+w|0;w=(c[2796]|0)+(h-w)|0;c[2799]=v;c[2796]=w;c[v+4>>2]=w|1;c[v+w+4>>2]=40;c[2800]=c[2915];break}if(g>>>0<(c[2797]|0)>>>0)c[2797]=g;d=g+h|0;b=11620;while(1){if((c[b>>2]|0)==(d|0)){v=153;break}a=c[b+8>>2]|0;if(!a)break;else b=a}if((v|0)==153?(c[b+12>>2]&8|0)==0:0){c[b>>2]=g;m=b+4|0;c[m>>2]=(c[m>>2]|0)+h;m=g+8|0;m=g+((m&7|0)==0?0:0-m&7)|0;b=d+8|0;b=d+((b&7|0)==0?0:0-b&7)|0;k=m+n|0;i=b-m-n|0;c[m+4>>2]=n|3;do if((b|0)!=(j|0)){if((b|0)==(c[2798]|0)){w=(c[2795]|0)+i|0;c[2795]=w;c[2798]=k;c[k+4>>2]=w|1;c[k+w>>2]=w;break}a=c[b+4>>2]|0;if((a&3|0)==1){h=a&-8;e=a>>>3;d:do if(a>>>0<256){a=c[b+8>>2]|0;d=c[b+12>>2]|0;if((d|0)==(a|0)){c[2793]=c[2793]&~(1<<e);break}else{c[a+12>>2]=d;c[d+8>>2]=a;break}}else{g=c[b+24>>2]|0;a=c[b+12>>2]|0;do if((a|0)==(b|0)){e=b+16|0;d=e+4|0;a=c[d>>2]|0;if(!a){a=c[e>>2]|0;if(!a){a=0;break}else d=e}while(1){e=a+20|0;f=c[e>>2]|0;if(f|0){a=f;d=e;continue}e=a+16|0;f=c[e>>2]|0;if(!f)break;else{a=f;d=e}}c[d>>2]=0}else{w=c[b+8>>2]|0;c[w+12>>2]=a;c[a+8>>2]=w}while(0);if(!g)break;d=c[b+28>>2]|0;e=11476+(d<<2)|0;do if((b|0)!=(c[e>>2]|0)){c[g+16+(((c[g+16>>2]|0)!=(b|0)&1)<<2)>>2]=a;if(!a)break d}else{c[e>>2]=a;if(a|0)break;c[2794]=c[2794]&~(1<<d);break d}while(0);c[a+24>>2]=g;d=b+16|0;e=c[d>>2]|0;if(e|0){c[a+16>>2]=e;c[e+24>>2]=a}d=c[d+4>>2]|0;if(!d)break;c[a+20>>2]=d;c[d+24>>2]=a}while(0);b=b+h|0;f=h+i|0}else f=i;b=b+4|0;c[b>>2]=c[b>>2]&-2;c[k+4>>2]=f|1;c[k+f>>2]=f;b=f>>>3;if(f>>>0<256){d=11212+(b<<1<<2)|0;a=c[2793]|0;b=1<<b;if(!(a&b)){c[2793]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=k;c[b+12>>2]=k;c[k+8>>2]=b;c[k+12>>2]=d;break}b=f>>>8;do if(!b)b=0;else{if(f>>>0>16777215){b=31;break}v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;b=(w+245760|0)>>>16&2;b=14-(u|v|b)+(w<<b>>>15)|0;b=f>>>(b+7|0)&1|b<<1}while(0);e=11476+(b<<2)|0;c[k+28>>2]=b;a=k+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[2794]|0;d=1<<b;if(!(a&d)){c[2794]=a|d;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}a=f<<((b|0)==31?0:25-(b>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(f|0)){v=194;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=193;break}else{a=a<<1;d=b}}if((v|0)==193){c[e>>2]=k;c[k+24>>2]=d;c[k+12>>2]=k;c[k+8>>2]=k;break}else if((v|0)==194){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=k;c[v>>2]=k;c[k+8>>2]=w;c[k+12>>2]=d;c[k+24>>2]=0;break}}else{w=(c[2796]|0)+i|0;c[2796]=w;c[2799]=k;c[k+4>>2]=w|1}while(0);w=m+8|0;l=x;return w|0}b=11620;while(1){a=c[b>>2]|0;if(a>>>0<=j>>>0?(w=a+(c[b+4>>2]|0)|0,w>>>0>j>>>0):0)break;b=c[b+8>>2]|0}f=w+-47|0;a=f+8|0;a=f+((a&7|0)==0?0:0-a&7)|0;f=j+16|0;a=a>>>0<f>>>0?j:a;b=a+8|0;d=g+8|0;d=(d&7|0)==0?0:0-d&7;v=g+d|0;d=h+-40-d|0;c[2799]=v;c[2796]=d;c[v+4>>2]=d|1;c[v+d+4>>2]=40;c[2800]=c[2915];d=a+4|0;c[d>>2]=27;c[b>>2]=c[2905];c[b+4>>2]=c[2906];c[b+8>>2]=c[2907];c[b+12>>2]=c[2908];c[2905]=g;c[2906]=h;c[2908]=0;c[2907]=b;b=a+24|0;do{v=b;b=b+4|0;c[b>>2]=7}while((v+8|0)>>>0<w>>>0);if((a|0)!=(j|0)){g=a-j|0;c[d>>2]=c[d>>2]&-2;c[j+4>>2]=g|1;c[a>>2]=g;b=g>>>3;if(g>>>0<256){d=11212+(b<<1<<2)|0;a=c[2793]|0;b=1<<b;if(!(a&b)){c[2793]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=j;c[b+12>>2]=j;c[j+8>>2]=b;c[j+12>>2]=d;break}b=g>>>8;if(b)if(g>>>0>16777215)d=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;d=(w+245760|0)>>>16&2;d=14-(u|v|d)+(w<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1}else d=0;e=11476+(d<<2)|0;c[j+28>>2]=d;c[j+20>>2]=0;c[f>>2]=0;b=c[2794]|0;a=1<<d;if(!(b&a)){c[2794]=b|a;c[e>>2]=j;c[j+24>>2]=e;c[j+12>>2]=j;c[j+8>>2]=j;break}a=g<<((d|0)==31?0:25-(d>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(g|0)){v=216;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=215;break}else{a=a<<1;d=b}}if((v|0)==215){c[e>>2]=j;c[j+24>>2]=d;c[j+12>>2]=j;c[j+8>>2]=j;break}else if((v|0)==216){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=j;c[v>>2]=j;c[j+8>>2]=w;c[j+12>>2]=d;c[j+24>>2]=0;break}}}else{w=c[2797]|0;if((w|0)==0|g>>>0<w>>>0)c[2797]=g;c[2905]=g;c[2906]=h;c[2908]=0;c[2802]=c[2911];c[2801]=-1;b=0;do{w=11212+(b<<1<<2)|0;c[w+12>>2]=w;c[w+8>>2]=w;b=b+1|0}while((b|0)!=32);w=g+8|0;w=(w&7|0)==0?0:0-w&7;v=g+w|0;w=h+-40-w|0;c[2799]=v;c[2796]=w;c[v+4>>2]=w|1;c[v+w+4>>2]=40;c[2800]=c[2915]}while(0);b=c[2796]|0;if(b>>>0>n>>>0){u=b-n|0;c[2796]=u;w=c[2799]|0;v=w+n|0;c[2799]=v;c[v+4>>2]=u|1;c[w+4>>2]=n|3;w=w+8|0;l=x;return w|0}}c[(Az()|0)>>2]=12;w=0;l=x;return w|0}function rz(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if(!a)return;d=a+-8|0;f=c[2797]|0;a=c[a+-4>>2]|0;b=a&-8;j=d+b|0;do if(!(a&1)){e=c[d>>2]|0;if(!(a&3))return;h=d+(0-e)|0;g=e+b|0;if(h>>>0<f>>>0)return;if((h|0)==(c[2798]|0)){a=j+4|0;b=c[a>>2]|0;if((b&3|0)!=3){i=h;b=g;break}c[2795]=g;c[a>>2]=b&-2;c[h+4>>2]=g|1;c[h+g>>2]=g;return}d=e>>>3;if(e>>>0<256){a=c[h+8>>2]|0;b=c[h+12>>2]|0;if((b|0)==(a|0)){c[2793]=c[2793]&~(1<<d);i=h;b=g;break}else{c[a+12>>2]=b;c[b+8>>2]=a;i=h;b=g;break}}f=c[h+24>>2]|0;a=c[h+12>>2]|0;do if((a|0)==(h|0)){d=h+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){a=0;break}else b=d}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}c[b>>2]=0}else{i=c[h+8>>2]|0;c[i+12>>2]=a;c[a+8>>2]=i}while(0);if(f){b=c[h+28>>2]|0;d=11476+(b<<2)|0;if((h|0)==(c[d>>2]|0)){c[d>>2]=a;if(!a){c[2794]=c[2794]&~(1<<b);i=h;b=g;break}}else{c[f+16+(((c[f+16>>2]|0)!=(h|0)&1)<<2)>>2]=a;if(!a){i=h;b=g;break}}c[a+24>>2]=f;b=h+16|0;d=c[b>>2]|0;if(d|0){c[a+16>>2]=d;c[d+24>>2]=a}b=c[b+4>>2]|0;if(b){c[a+20>>2]=b;c[b+24>>2]=a;i=h;b=g}else{i=h;b=g}}else{i=h;b=g}}else{i=d;h=d}while(0);if(h>>>0>=j>>>0)return;a=j+4|0;e=c[a>>2]|0;if(!(e&1))return;if(!(e&2)){a=c[2798]|0;if((j|0)==(c[2799]|0)){j=(c[2796]|0)+b|0;c[2796]=j;c[2799]=i;c[i+4>>2]=j|1;if((i|0)!=(a|0))return;c[2798]=0;c[2795]=0;return}if((j|0)==(a|0)){j=(c[2795]|0)+b|0;c[2795]=j;c[2798]=h;c[i+4>>2]=j|1;c[h+j>>2]=j;return}f=(e&-8)+b|0;d=e>>>3;do if(e>>>0<256){b=c[j+8>>2]|0;a=c[j+12>>2]|0;if((a|0)==(b|0)){c[2793]=c[2793]&~(1<<d);break}else{c[b+12>>2]=a;c[a+8>>2]=b;break}}else{g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){d=j+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){d=0;break}else b=d}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}c[b>>2]=0;d=a}else{d=c[j+8>>2]|0;c[d+12>>2]=a;c[a+8>>2]=d;d=a}while(0);if(g|0){a=c[j+28>>2]|0;b=11476+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=d;if(!d){c[2794]=c[2794]&~(1<<a);break}}else{c[g+16+(((c[g+16>>2]|0)!=(j|0)&1)<<2)>>2]=d;if(!d)break}c[d+24>>2]=g;a=j+16|0;b=c[a>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d}a=c[a+4>>2]|0;if(a|0){c[d+20>>2]=a;c[a+24>>2]=d}}}while(0);c[i+4>>2]=f|1;c[h+f>>2]=f;if((i|0)==(c[2798]|0)){c[2795]=f;return}}else{c[a>>2]=e&-2;c[i+4>>2]=b|1;c[h+b>>2]=b;f=b}a=f>>>3;if(f>>>0<256){d=11212+(a<<1<<2)|0;b=c[2793]|0;a=1<<a;if(!(b&a)){c[2793]=b|a;a=d;b=d+8|0}else{b=d+8|0;a=c[b>>2]|0}c[b>>2]=i;c[a+12>>2]=i;c[i+8>>2]=a;c[i+12>>2]=d;return}a=f>>>8;if(a)if(f>>>0>16777215)a=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;a=(j+245760|0)>>>16&2;a=14-(g|h|a)+(j<<a>>>15)|0;a=f>>>(a+7|0)&1|a<<1}else a=0;e=11476+(a<<2)|0;c[i+28>>2]=a;c[i+20>>2]=0;c[i+16>>2]=0;b=c[2794]|0;d=1<<a;do if(b&d){b=f<<((a|0)==31?0:25-(a>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(f|0)){a=73;break}e=d+16+(b>>>31<<2)|0;a=c[e>>2]|0;if(!a){a=72;break}else{b=b<<1;d=a}}if((a|0)==72){c[e>>2]=i;c[i+24>>2]=d;c[i+12>>2]=i;c[i+8>>2]=i;break}else if((a|0)==73){h=d+8|0;j=c[h>>2]|0;c[j+12>>2]=i;c[h>>2]=i;c[i+8>>2]=j;c[i+12>>2]=d;c[i+24>>2]=0;break}}else{c[2794]=b|d;c[e>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i}while(0);j=(c[2801]|0)+-1|0;c[2801]=j;if(!j)a=11628;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[2801]=-1;return}function sz(a,b){a=a|0;b=b|0;var d=0,e=0;if(!a){b=qz(b)|0;return b|0}if(b>>>0>4294967231){c[(Az()|0)>>2]=12;b=0;return b|0}d=tz(a+-8|0,b>>>0<11?16:b+11&-8)|0;if(d|0){b=d+8|0;return b|0}d=qz(b)|0;if(!d){b=0;return b|0}e=c[a+-4>>2]|0;e=(e&-8)-((e&3|0)==0?8:4)|0;KA(d|0,a|0,(e>>>0<b>>>0?e:b)|0)|0;rz(a);b=d;return b|0}function tz(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=a+4|0;l=c[m>>2]|0;d=l&-8;i=a+d|0;if(!(l&3)){if(b>>>0<256){a=0;return a|0}if(d>>>0>=(b+4|0)>>>0?(d-b|0)>>>0<=c[2913]<<1>>>0:0)return a|0;a=0;return a|0}if(d>>>0>=b>>>0){d=d-b|0;if(d>>>0<=15)return a|0;k=a+b|0;c[m>>2]=l&1|b|2;c[k+4>>2]=d|3;m=k+d+4|0;c[m>>2]=c[m>>2]|1;uz(k,d);return a|0}if((i|0)==(c[2799]|0)){k=(c[2796]|0)+d|0;d=k-b|0;e=a+b|0;if(k>>>0<=b>>>0){a=0;return a|0}c[m>>2]=l&1|b|2;c[e+4>>2]=d|1;c[2799]=e;c[2796]=d;return a|0}if((i|0)==(c[2798]|0)){f=(c[2795]|0)+d|0;if(f>>>0<b>>>0){a=0;return a|0}d=f-b|0;e=l&1;if(d>>>0>15){l=a+b|0;k=l+d|0;c[m>>2]=e|b|2;c[l+4>>2]=d|1;c[k>>2]=d;e=k+4|0;c[e>>2]=c[e>>2]&-2;e=l}else{c[m>>2]=e|f|2;e=a+f+4|0;c[e>>2]=c[e>>2]|1;e=0;d=0}c[2795]=d;c[2798]=e;return a|0}e=c[i+4>>2]|0;if(e&2|0){a=0;return a|0}j=(e&-8)+d|0;if(j>>>0<b>>>0){a=0;return a|0}k=j-b|0;f=e>>>3;do if(e>>>0<256){e=c[i+8>>2]|0;d=c[i+12>>2]|0;if((d|0)==(e|0)){c[2793]=c[2793]&~(1<<f);break}else{c[e+12>>2]=d;c[d+8>>2]=e;break}}else{h=c[i+24>>2]|0;d=c[i+12>>2]|0;do if((d|0)==(i|0)){f=i+16|0;e=f+4|0;d=c[e>>2]|0;if(!d){d=c[f>>2]|0;if(!d){f=0;break}else g=f}else g=e;while(1){f=d+20|0;e=c[f>>2]|0;if(e|0){d=e;g=f;continue}e=d+16|0;f=c[e>>2]|0;if(!f)break;else{d=f;g=e}}c[g>>2]=0;f=d}else{f=c[i+8>>2]|0;c[f+12>>2]=d;c[d+8>>2]=f;f=d}while(0);if(h|0){d=c[i+28>>2]|0;e=11476+(d<<2)|0;if((i|0)==(c[e>>2]|0)){c[e>>2]=f;if(!f){c[2794]=c[2794]&~(1<<d);break}}else{c[h+16+(((c[h+16>>2]|0)!=(i|0)&1)<<2)>>2]=f;if(!f)break}c[f+24>>2]=h;d=i+16|0;e=c[d>>2]|0;if(e|0){c[f+16>>2]=e;c[e+24>>2]=f}d=c[d+4>>2]|0;if(d|0){c[f+20>>2]=d;c[d+24>>2]=f}}}while(0);d=l&1;if(k>>>0<16){c[m>>2]=j|d|2;m=a+j+4|0;c[m>>2]=c[m>>2]|1;return a|0}else{l=a+b|0;c[m>>2]=d|b|2;c[l+4>>2]=k|3;m=l+k+4|0;c[m>>2]=c[m>>2]|1;uz(l,k);return a|0}return 0}function uz(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=a+b|0;d=c[a+4>>2]|0;do if(!(d&1)){e=c[a>>2]|0;if(!(d&3))return;g=a+(0-e)|0;h=e+b|0;if((g|0)==(c[2798]|0)){a=j+4|0;d=c[a>>2]|0;if((d&3|0)!=3){i=g;d=h;break}c[2795]=h;c[a>>2]=d&-2;c[g+4>>2]=h|1;c[g+h>>2]=h;return}b=e>>>3;if(e>>>0<256){a=c[g+8>>2]|0;d=c[g+12>>2]|0;if((d|0)==(a|0)){c[2793]=c[2793]&~(1<<b);i=g;d=h;break}else{c[a+12>>2]=d;c[d+8>>2]=a;i=g;d=h;break}}f=c[g+24>>2]|0;a=c[g+12>>2]|0;do if((a|0)==(g|0)){b=g+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){a=0;break}else d=b}while(1){b=a+20|0;e=c[b>>2]|0;if(e|0){a=e;d=b;continue}b=a+16|0;e=c[b>>2]|0;if(!e)break;else{a=e;d=b}}c[d>>2]=0}else{i=c[g+8>>2]|0;c[i+12>>2]=a;c[a+8>>2]=i}while(0);if(f){d=c[g+28>>2]|0;b=11476+(d<<2)|0;if((g|0)==(c[b>>2]|0)){c[b>>2]=a;if(!a){c[2794]=c[2794]&~(1<<d);i=g;d=h;break}}else{c[f+16+(((c[f+16>>2]|0)!=(g|0)&1)<<2)>>2]=a;if(!a){i=g;d=h;break}}c[a+24>>2]=f;d=g+16|0;b=c[d>>2]|0;if(b|0){c[a+16>>2]=b;c[b+24>>2]=a}d=c[d+4>>2]|0;if(d){c[a+20>>2]=d;c[d+24>>2]=a;i=g;d=h}else{i=g;d=h}}else{i=g;d=h}}else{i=a;d=b}while(0);a=j+4|0;e=c[a>>2]|0;if(!(e&2)){a=c[2798]|0;if((j|0)==(c[2799]|0)){j=(c[2796]|0)+d|0;c[2796]=j;c[2799]=i;c[i+4>>2]=j|1;if((i|0)!=(a|0))return;c[2798]=0;c[2795]=0;return}if((j|0)==(a|0)){j=(c[2795]|0)+d|0;c[2795]=j;c[2798]=i;c[i+4>>2]=j|1;c[i+j>>2]=j;return}g=(e&-8)+d|0;b=e>>>3;do if(e>>>0<256){d=c[j+8>>2]|0;a=c[j+12>>2]|0;if((a|0)==(d|0)){c[2793]=c[2793]&~(1<<b);break}else{c[d+12>>2]=a;c[a+8>>2]=d;break}}else{f=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){b=0;break}else d=b}while(1){b=a+20|0;e=c[b>>2]|0;if(e|0){a=e;d=b;continue}b=a+16|0;e=c[b>>2]|0;if(!e)break;else{a=e;d=b}}c[d>>2]=0;b=a}else{b=c[j+8>>2]|0;c[b+12>>2]=a;c[a+8>>2]=b;b=a}while(0);if(f|0){a=c[j+28>>2]|0;d=11476+(a<<2)|0;if((j|0)==(c[d>>2]|0)){c[d>>2]=b;if(!b){c[2794]=c[2794]&~(1<<a);break}}else{c[f+16+(((c[f+16>>2]|0)!=(j|0)&1)<<2)>>2]=b;if(!b)break}c[b+24>>2]=f;a=j+16|0;d=c[a>>2]|0;if(d|0){c[b+16>>2]=d;c[d+24>>2]=b}a=c[a+4>>2]|0;if(a|0){c[b+20>>2]=a;c[a+24>>2]=b}}}while(0);c[i+4>>2]=g|1;c[i+g>>2]=g;if((i|0)==(c[2798]|0)){c[2795]=g;return}else d=g}else{c[a>>2]=e&-2;c[i+4>>2]=d|1;c[i+d>>2]=d}a=d>>>3;if(d>>>0<256){b=11212+(a<<1<<2)|0;d=c[2793]|0;a=1<<a;if(!(d&a)){c[2793]=d|a;a=b;d=b+8|0}else{d=b+8|0;a=c[d>>2]|0}c[d>>2]=i;c[a+12>>2]=i;c[i+8>>2]=a;c[i+12>>2]=b;return}a=d>>>8;if(a)if(d>>>0>16777215)a=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;a=(j+245760|0)>>>16&2;a=14-(g|h|a)+(j<<a>>>15)|0;a=d>>>(a+7|0)&1|a<<1}else a=0;f=11476+(a<<2)|0;c[i+28>>2]=a;c[i+20>>2]=0;c[i+16>>2]=0;b=c[2794]|0;e=1<<a;if(!(b&e)){c[2794]=b|e;c[f>>2]=i;c[i+24>>2]=f;c[i+12>>2]=i;c[i+8>>2]=i;return}b=d<<((a|0)==31?0:25-(a>>>1)|0);e=c[f>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(d|0)){a=69;break}f=e+16+(b>>>31<<2)|0;a=c[f>>2]|0;if(!a){a=68;break}else{b=b<<1;e=a}}if((a|0)==68){c[f>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i;return}else if((a|0)==69){h=e+8|0;j=c[h>>2]|0;c[j+12>>2]=i;c[h>>2]=i;c[i+8>>2]=j;c[i+12>>2]=e;c[i+24>>2]=0;return}}function vz(){return 11668}function wz(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;c[d>>2]=Dz(c[a+60>>2]|0)|0;a=zz(ab(6,d|0)|0)|0;l=b;return a|0}function xz(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;n=l;l=l+48|0;k=n+16|0;g=n;f=n+32|0;i=a+28|0;e=c[i>>2]|0;c[f>>2]=e;j=a+20|0;e=(c[j>>2]|0)-e|0;c[f+4>>2]=e;c[f+8>>2]=b;c[f+12>>2]=d;e=e+d|0;h=a+60|0;c[g>>2]=c[h>>2];c[g+4>>2]=f;c[g+8>>2]=2;g=zz(db(146,g|0)|0)|0;a:do if((e|0)!=(g|0)){b=2;while(1){if((g|0)<0)break;e=e-g|0;p=c[f+4>>2]|0;o=g>>>0>p>>>0;f=o?f+8|0:f;b=(o<<31>>31)+b|0;p=g-(o?p:0)|0;c[f>>2]=(c[f>>2]|0)+p;o=f+4|0;c[o>>2]=(c[o>>2]|0)-p;c[k>>2]=c[h>>2];c[k+4>>2]=f;c[k+8>>2]=b;g=zz(db(146,k|0)|0)|0;if((e|0)==(g|0)){m=3;break a}}c[a+16>>2]=0;c[i>>2]=0;c[j>>2]=0;c[a>>2]=c[a>>2]|32;if((b|0)==2)d=0;else d=d-(c[f+4>>2]|0)|0}else m=3;while(0);if((m|0)==3){p=c[a+44>>2]|0;c[a+16>>2]=p+(c[a+48>>2]|0);c[i>>2]=p;c[j>>2]=p}l=n;return d|0}function yz(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=l;l=l+32|0;g=f;e=f+20|0;c[g>>2]=c[a+60>>2];c[g+4>>2]=0;c[g+8>>2]=b;c[g+12>>2]=e;c[g+16>>2]=d;if((zz(cb(140,g|0)|0)|0)<0){c[e>>2]=-1;a=-1}else a=c[e>>2]|0;l=f;return a|0}function zz(a){a=a|0;if(a>>>0>4294963200){c[(Az()|0)>>2]=0-a;a=-1}return a|0}function Az(){return (Bz()|0)+64|0}function Bz(){return Cz()|0}function Cz(){return 2092}function Dz(a){a=a|0;return a|0}function Ez(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+32|0;f=g;c[b+36>>2]=2;if((c[b>>2]&64|0)==0?(c[f>>2]=c[b+60>>2],c[f+4>>2]=21523,c[f+8>>2]=g+16,Ta(54,f|0)|0):0)a[b+75>>0]=-1;f=xz(b,d,e)|0;l=g;return f|0}function Fz(b,c){b=b|0;c=c|0;var d=0,e=0;d=a[b>>0]|0;e=a[c>>0]|0;if(d<<24>>24==0?1:d<<24>>24!=e<<24>>24)b=e;else{do{b=b+1|0;c=c+1|0;d=a[b>>0]|0;e=a[c>>0]|0}while(!(d<<24>>24==0?1:d<<24>>24!=e<<24>>24));b=e}return (d&255)-(b&255)|0}function Gz(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if(!d)b=0;else{while(1){e=a[b>>0]|0;f=a[c>>0]|0;if(e<<24>>24!=f<<24>>24)break;d=d+-1|0;if(!d){b=0;break a}else{b=b+1|0;c=c+1|0}}b=(e&255)-(f&255)|0}while(0);return b|0}function Hz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=l;l=l+224|0;n=s+120|0;o=s+80|0;q=s;r=s+136|0;f=o;g=f+40|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));c[n>>2]=c[e>>2];if((Iz(0,d,n,q,o)|0)<0)e=-1;else{if((c[b+76>>2]|0)>-1)p=Jz(b)|0;else p=0;e=c[b>>2]|0;m=e&32;if((a[b+74>>0]|0)<1)c[b>>2]=e&-33;f=b+48|0;if(!(c[f>>2]|0)){g=b+44|0;h=c[g>>2]|0;c[g>>2]=r;i=b+28|0;c[i>>2]=r;j=b+20|0;c[j>>2]=r;c[f>>2]=80;k=b+16|0;c[k>>2]=r+80;e=Iz(b,d,n,q,o)|0;if(h){ob[c[b+36>>2]&7](b,0,0)|0;e=(c[j>>2]|0)==0?-1:e;c[g>>2]=h;c[f>>2]=0;c[k>>2]=0;c[i>>2]=0;c[j>>2]=0}}else e=Iz(b,d,n,q,o)|0;f=c[b>>2]|0;c[b>>2]=f|m;if(p|0)Kz(b);e=(f&32|0)==0?e:-1}l=s;return e|0}
function Iz(d,e,f,g,i){d=d|0;e=e|0;f=f|0;g=g|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;H=l;l=l+64|0;D=H+16|0;E=H;B=H+24|0;F=H+8|0;G=H+20|0;c[D>>2]=e;x=(d|0)!=0;y=B+40|0;z=y;B=B+39|0;C=F+4|0;k=0;j=0;p=0;a:while(1){do if((j|0)>-1)if((k|0)>(2147483647-j|0)){c[(Az()|0)>>2]=75;j=-1;break}else{j=k+j|0;break}while(0);k=a[e>>0]|0;if(!(k<<24>>24)){w=87;break}else m=e;b:while(1){switch(k<<24>>24){case 37:{k=m;w=9;break b}case 0:{k=m;break b}default:{}}v=m+1|0;c[D>>2]=v;k=a[v>>0]|0;m=v}c:do if((w|0)==9)while(1){w=0;if((a[m+1>>0]|0)!=37)break c;k=k+1|0;m=m+2|0;c[D>>2]=m;if((a[m>>0]|0)==37)w=9;else break}while(0);k=k-e|0;if(x)Lz(d,e,k);if(k|0){e=m;continue}n=m+1|0;k=(a[n>>0]|0)+-48|0;if(k>>>0<10){v=(a[m+2>>0]|0)==36;u=v?k:-1;p=v?1:p;n=v?m+3|0:n}else u=-1;c[D>>2]=n;k=a[n>>0]|0;m=(k<<24>>24)+-32|0;d:do if(m>>>0<32){o=0;q=k;while(1){k=1<<m;if(!(k&75913)){k=q;break d}o=k|o;n=n+1|0;c[D>>2]=n;k=a[n>>0]|0;m=(k<<24>>24)+-32|0;if(m>>>0>=32)break;else q=k}}else o=0;while(0);if(k<<24>>24==42){m=n+1|0;k=(a[m>>0]|0)+-48|0;if(k>>>0<10?(a[n+2>>0]|0)==36:0){c[i+(k<<2)>>2]=10;k=c[g+((a[m>>0]|0)+-48<<3)>>2]|0;p=1;n=n+3|0}else{if(p|0){j=-1;break}if(x){p=(c[f>>2]|0)+(4-1)&~(4-1);k=c[p>>2]|0;c[f>>2]=p+4;p=0;n=m}else{k=0;p=0;n=m}}c[D>>2]=n;v=(k|0)<0;k=v?0-k|0:k;o=v?o|8192:o}else{k=Mz(D)|0;if((k|0)<0){j=-1;break}n=c[D>>2]|0}do if((a[n>>0]|0)==46){if((a[n+1>>0]|0)!=42){c[D>>2]=n+1;m=Mz(D)|0;n=c[D>>2]|0;break}q=n+2|0;m=(a[q>>0]|0)+-48|0;if(m>>>0<10?(a[n+3>>0]|0)==36:0){c[i+(m<<2)>>2]=10;m=c[g+((a[q>>0]|0)+-48<<3)>>2]|0;n=n+4|0;c[D>>2]=n;break}if(p|0){j=-1;break a}if(x){v=(c[f>>2]|0)+(4-1)&~(4-1);m=c[v>>2]|0;c[f>>2]=v+4}else m=0;c[D>>2]=q;n=q}else m=-1;while(0);t=0;while(1){if(((a[n>>0]|0)+-65|0)>>>0>57){j=-1;break a}v=n+1|0;c[D>>2]=v;q=a[(a[n>>0]|0)+-65+(6409+(t*58|0))>>0]|0;r=q&255;if((r+-1|0)>>>0<8){t=r;n=v}else break}if(!(q<<24>>24)){j=-1;break}s=(u|0)>-1;do if(q<<24>>24==19)if(s){j=-1;break a}else w=49;else{if(s){c[i+(u<<2)>>2]=r;s=g+(u<<3)|0;u=c[s+4>>2]|0;w=E;c[w>>2]=c[s>>2];c[w+4>>2]=u;w=49;break}if(!x){j=0;break a}Nz(E,r,f)}while(0);if((w|0)==49?(w=0,!x):0){k=0;e=v;continue}n=a[n>>0]|0;n=(t|0)!=0&(n&15|0)==3?n&-33:n;s=o&-65537;u=(o&8192|0)==0?o:s;e:do switch(n|0){case 110:switch((t&255)<<24>>24){case 0:{c[c[E>>2]>>2]=j;k=0;e=v;continue a}case 1:{c[c[E>>2]>>2]=j;k=0;e=v;continue a}case 2:{k=c[E>>2]|0;c[k>>2]=j;c[k+4>>2]=((j|0)<0)<<31>>31;k=0;e=v;continue a}case 3:{b[c[E>>2]>>1]=j;k=0;e=v;continue a}case 4:{a[c[E>>2]>>0]=j;k=0;e=v;continue a}case 6:{c[c[E>>2]>>2]=j;k=0;e=v;continue a}case 7:{k=c[E>>2]|0;c[k>>2]=j;c[k+4>>2]=((j|0)<0)<<31>>31;k=0;e=v;continue a}default:{k=0;e=v;continue a}}case 112:{n=120;m=m>>>0>8?m:8;e=u|8;w=61;break}case 88:case 120:{e=u;w=61;break}case 111:{n=E;e=c[n>>2]|0;n=c[n+4>>2]|0;r=Pz(e,n,y)|0;s=z-r|0;o=0;q=6873;m=(u&8|0)==0|(m|0)>(s|0)?m:s+1|0;s=u;w=67;break}case 105:case 100:{n=E;e=c[n>>2]|0;n=c[n+4>>2]|0;if((n|0)<0){e=EA(0,0,e|0,n|0)|0;n=A;o=E;c[o>>2]=e;c[o+4>>2]=n;o=1;q=6873;w=66;break e}else{o=(u&2049|0)!=0&1;q=(u&2048|0)==0?((u&1|0)==0?6873:6875):6874;w=66;break e}}case 117:{n=E;o=0;q=6873;e=c[n>>2]|0;n=c[n+4>>2]|0;w=66;break}case 99:{a[B>>0]=c[E>>2];e=B;o=0;q=6873;r=y;n=1;m=s;break}case 109:{n=Rz(c[(Az()|0)>>2]|0)|0;w=71;break}case 115:{n=c[E>>2]|0;n=n|0?n:6883;w=71;break}case 67:{c[F>>2]=c[E>>2];c[C>>2]=0;c[E>>2]=F;r=-1;n=F;w=75;break}case 83:{e=c[E>>2]|0;if(!m){Tz(d,32,k,0,u);e=0;w=84}else{r=m;n=e;w=75}break}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{k=Vz(d,+h[E>>3],k,m,u,n)|0;e=v;continue a}default:{o=0;q=6873;r=y;n=m;m=u}}while(0);f:do if((w|0)==61){u=E;t=c[u>>2]|0;u=c[u+4>>2]|0;r=Oz(t,u,y,n&32)|0;q=(e&8|0)==0|(t|0)==0&(u|0)==0;o=q?0:2;q=q?6873:6873+(n>>4)|0;s=e;e=t;n=u;w=67}else if((w|0)==66){r=Qz(e,n,y)|0;s=u;w=67}else if((w|0)==71){w=0;u=Sz(n,0,m)|0;t=(u|0)==0;e=n;o=0;q=6873;r=t?n+m|0:u;n=t?m:u-n|0;m=s}else if((w|0)==75){w=0;q=n;e=0;m=0;while(1){o=c[q>>2]|0;if(!o)break;m=Uz(G,o)|0;if((m|0)<0|m>>>0>(r-e|0)>>>0)break;e=m+e|0;if(r>>>0>e>>>0)q=q+4|0;else break}if((m|0)<0){j=-1;break a}Tz(d,32,k,e,u);if(!e){e=0;w=84}else{o=0;while(1){m=c[n>>2]|0;if(!m){w=84;break f}m=Uz(G,m)|0;o=m+o|0;if((o|0)>(e|0)){w=84;break f}Lz(d,G,m);if(o>>>0>=e>>>0){w=84;break}else n=n+4|0}}}while(0);if((w|0)==67){w=0;n=(e|0)!=0|(n|0)!=0;u=(m|0)!=0|n;n=((n^1)&1)+(z-r)|0;e=u?r:y;r=y;n=u?((m|0)>(n|0)?m:n):m;m=(m|0)>-1?s&-65537:s}else if((w|0)==84){w=0;Tz(d,32,k,e,u^8192);k=(k|0)>(e|0)?k:e;e=v;continue}t=r-e|0;s=(n|0)<(t|0)?t:n;u=s+o|0;k=(k|0)<(u|0)?u:k;Tz(d,32,k,u,m);Lz(d,q,o);Tz(d,48,k,u,m^65536);Tz(d,48,s,t,0);Lz(d,e,t);Tz(d,32,k,u,m^8192);e=v}g:do if((w|0)==87)if(!d)if(!p)j=0;else{j=1;while(1){e=c[i+(j<<2)>>2]|0;if(!e)break;Nz(g+(j<<3)|0,e,f);j=j+1|0;if((j|0)>=10){j=1;break g}}while(1){if(c[i+(j<<2)>>2]|0){j=-1;break g}j=j+1|0;if((j|0)>=10){j=1;break}}}while(0);l=H;return j|0}function Jz(a){a=a|0;return 0}function Kz(a){a=a|0;return}function Lz(a,b,d){a=a|0;b=b|0;d=d|0;if(!(c[a>>2]&32))fA(b,d,a)|0;return}function Mz(b){b=b|0;var d=0,e=0,f=0;e=c[b>>2]|0;f=(a[e>>0]|0)+-48|0;if(f>>>0<10){d=0;do{d=f+(d*10|0)|0;e=e+1|0;c[b>>2]=e;f=(a[e>>0]|0)+-48|0}while(f>>>0<10)}else d=0;return d|0}function Nz(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;c[a>>2]=b;break a}case 10:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=((b|0)<0)<<31>>31;break a}case 11:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=0;break a}case 12:{e=(c[d>>2]|0)+(8-1)&~(8-1);b=e;f=c[b>>2]|0;b=c[b+4>>2]|0;c[d>>2]=e+8;e=a;c[e>>2]=f;c[e+4>>2]=b;break a}case 13:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&65535)<<16>>16;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 14:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&65535;c[f+4>>2]=0;break a}case 15:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&255)<<24>>24;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 16:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&255;c[f+4>>2]=0;break a}case 17:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}case 18:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}default:break a}while(0);while(0);return}function Oz(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;if(!((b|0)==0&(c|0)==0))do{e=e+-1|0;a[e>>0]=d[6925+(b&15)>>0]|0|f;b=JA(b|0,c|0,4)|0;c=A}while(!((b|0)==0&(c|0)==0));return e|0}function Pz(b,c,d){b=b|0;c=c|0;d=d|0;if(!((b|0)==0&(c|0)==0))do{d=d+-1|0;a[d>>0]=b&7|48;b=JA(b|0,c|0,3)|0;c=A}while(!((b|0)==0&(c|0)==0));return d|0}function Qz(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if(c>>>0>0|(c|0)==0&b>>>0>4294967295){while(1){e=PA(b|0,c|0,10,0)|0;d=d+-1|0;a[d>>0]=e&255|48;e=b;b=NA(b|0,c|0,10,0)|0;if(!(c>>>0>9|(c|0)==9&e>>>0>4294967295))break;else c=A}c=b}else c=b;if(c)while(1){d=d+-1|0;a[d>>0]=(c>>>0)%10|0|48;if(c>>>0<10)break;else c=(c>>>0)/10|0}return d|0}function Rz(a){a=a|0;return aA(a,c[($z()|0)+188>>2]|0)|0}function Sz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=d&255;f=(e|0)!=0;a:do if(f&(b&3|0)!=0){g=d&255;while(1){if((a[b>>0]|0)==g<<24>>24){i=6;break a}b=b+1|0;e=e+-1|0;f=(e|0)!=0;if(!(f&(b&3|0)!=0)){i=5;break}}}else i=5;while(0);if((i|0)==5)if(f)i=6;else e=0;b:do if((i|0)==6){g=d&255;if((a[b>>0]|0)!=g<<24>>24){f=P(h,16843009)|0;c:do if(e>>>0>3)while(1){h=c[b>>2]^f;if((h&-2139062144^-2139062144)&h+-16843009|0)break;b=b+4|0;e=e+-4|0;if(e>>>0<=3){i=11;break c}}else i=11;while(0);if((i|0)==11)if(!e){e=0;break}while(1){if((a[b>>0]|0)==g<<24>>24)break b;b=b+1|0;e=e+-1|0;if(!e){e=0;break}}}}while(0);return (e|0?b:0)|0}function Tz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+256|0;f=g;if((c|0)>(d|0)&(e&73728|0)==0){e=c-d|0;HA(f|0,b|0,(e>>>0<256?e:256)|0)|0;if(e>>>0>255){b=c-d|0;do{Lz(a,f,256);e=e+-256|0}while(e>>>0>255);e=b&255}Lz(a,f,e)}l=g;return}function Uz(a,b){a=a|0;b=b|0;if(!a)a=0;else a=Zz(a,b,0)|0;return a|0}function Vz(b,e,f,g,h,i){b=b|0;e=+e;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0.0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;H=l;l=l+560|0;m=H+8|0;u=H;G=H+524|0;F=G;n=H+512|0;c[u>>2]=0;E=n+12|0;Wz(e)|0;if((A|0)<0){e=-e;C=1;B=6890}else{C=(h&2049|0)!=0&1;B=(h&2048|0)==0?((h&1|0)==0?6891:6896):6893}Wz(e)|0;D=A&2146435072;do if(D>>>0<2146435072|(D|0)==2146435072&0<0){r=+Xz(e,u)*2.0;j=r!=0.0;if(j)c[u>>2]=(c[u>>2]|0)+-1;w=i|32;if((w|0)==97){s=i&32;q=(s|0)==0?B:B+9|0;p=C|2;j=12-g|0;do if(!(g>>>0>11|(j|0)==0)){e=8.0;do{j=j+-1|0;e=e*16.0}while((j|0)!=0);if((a[q>>0]|0)==45){e=-(e+(-r-e));break}else{e=r+e-e;break}}else e=r;while(0);k=c[u>>2]|0;j=(k|0)<0?0-k|0:k;j=Qz(j,((j|0)<0)<<31>>31,E)|0;if((j|0)==(E|0)){j=n+11|0;a[j>>0]=48}a[j+-1>>0]=(k>>31&2)+43;o=j+-2|0;a[o>>0]=i+15;n=(g|0)<1;m=(h&8|0)==0;j=G;do{D=~~e;k=j+1|0;a[j>>0]=d[6925+D>>0]|s;e=(e-+(D|0))*16.0;if((k-F|0)==1?!(m&(n&e==0.0)):0){a[k>>0]=46;j=j+2|0}else j=k}while(e!=0.0);D=j-F|0;F=E-o|0;E=(g|0)!=0&(D+-2|0)<(g|0)?g+2|0:D;j=F+p+E|0;Tz(b,32,f,j,h);Lz(b,q,p);Tz(b,48,f,j,h^65536);Lz(b,G,D);Tz(b,48,E-D|0,0,0);Lz(b,o,F);Tz(b,32,f,j,h^8192);break}k=(g|0)<0?6:g;if(j){j=(c[u>>2]|0)+-28|0;c[u>>2]=j;e=r*268435456.0}else{e=r;j=c[u>>2]|0}D=(j|0)<0?m:m+288|0;m=D;do{y=~~e>>>0;c[m>>2]=y;m=m+4|0;e=(e-+(y>>>0))*1.0e9}while(e!=0.0);if((j|0)>0){n=D;p=m;while(1){o=(j|0)<29?j:29;j=p+-4|0;if(j>>>0>=n>>>0){m=0;do{x=IA(c[j>>2]|0,0,o|0)|0;x=FA(x|0,A|0,m|0,0)|0;y=A;v=PA(x|0,y|0,1e9,0)|0;c[j>>2]=v;m=NA(x|0,y|0,1e9,0)|0;j=j+-4|0}while(j>>>0>=n>>>0);if(m){n=n+-4|0;c[n>>2]=m}}m=p;while(1){if(m>>>0<=n>>>0)break;j=m+-4|0;if(!(c[j>>2]|0))m=j;else break}j=(c[u>>2]|0)-o|0;c[u>>2]=j;if((j|0)>0)p=m;else break}}else n=D;if((j|0)<0){g=((k+25|0)/9|0)+1|0;t=(w|0)==102;do{s=0-j|0;s=(s|0)<9?s:9;if(n>>>0<m>>>0){o=(1<<s)+-1|0;p=1e9>>>s;q=0;j=n;do{y=c[j>>2]|0;c[j>>2]=(y>>>s)+q;q=P(y&o,p)|0;j=j+4|0}while(j>>>0<m>>>0);j=(c[n>>2]|0)==0?n+4|0:n;if(!q){n=j;j=m}else{c[m>>2]=q;n=j;j=m+4|0}}else{n=(c[n>>2]|0)==0?n+4|0:n;j=m}m=t?D:n;m=(j-m>>2|0)>(g|0)?m+(g<<2)|0:j;j=(c[u>>2]|0)+s|0;c[u>>2]=j}while((j|0)<0);j=n;g=m}else{j=n;g=m}y=D;if(j>>>0<g>>>0){m=(y-j>>2)*9|0;o=c[j>>2]|0;if(o>>>0>=10){n=10;do{n=n*10|0;m=m+1|0}while(o>>>0>=n>>>0)}}else m=0;t=(w|0)==103;v=(k|0)!=0;n=k-((w|0)!=102?m:0)+((v&t)<<31>>31)|0;if((n|0)<(((g-y>>2)*9|0)+-9|0)){n=n+9216|0;s=D+4+(((n|0)/9|0)+-1024<<2)|0;n=((n|0)%9|0)+1|0;if((n|0)<9){o=10;do{o=o*10|0;n=n+1|0}while((n|0)!=9)}else o=10;p=c[s>>2]|0;q=(p>>>0)%(o>>>0)|0;n=(s+4|0)==(g|0);if(!(n&(q|0)==0)){r=(((p>>>0)/(o>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;x=(o|0)/2|0;e=q>>>0<x>>>0?.5:n&(q|0)==(x|0)?1.0:1.5;if(C){x=(a[B>>0]|0)==45;e=x?-e:e;r=x?-r:r}n=p-q|0;c[s>>2]=n;if(r+e!=r){x=n+o|0;c[s>>2]=x;if(x>>>0>999999999){m=s;while(1){n=m+-4|0;c[m>>2]=0;if(n>>>0<j>>>0){j=j+-4|0;c[j>>2]=0}x=(c[n>>2]|0)+1|0;c[n>>2]=x;if(x>>>0>999999999)m=n;else break}}else n=s;m=(y-j>>2)*9|0;p=c[j>>2]|0;if(p>>>0>=10){o=10;do{o=o*10|0;m=m+1|0}while(p>>>0>=o>>>0)}}else n=s}else n=s;n=n+4|0;n=g>>>0>n>>>0?n:g;x=j}else{n=g;x=j}w=n;while(1){if(w>>>0<=x>>>0){u=0;break}j=w+-4|0;if(!(c[j>>2]|0))w=j;else{u=1;break}}g=0-m|0;do if(t){j=((v^1)&1)+k|0;if((j|0)>(m|0)&(m|0)>-5){o=i+-1|0;k=j+-1-m|0}else{o=i+-2|0;k=j+-1|0}j=h&8;if(!j){if(u?(z=c[w+-4>>2]|0,(z|0)!=0):0)if(!((z>>>0)%10|0)){n=0;j=10;do{j=j*10|0;n=n+1|0}while(!((z>>>0)%(j>>>0)|0|0))}else n=0;else n=9;j=((w-y>>2)*9|0)+-9|0;if((o|32|0)==102){s=j-n|0;s=(s|0)>0?s:0;k=(k|0)<(s|0)?k:s;s=0;break}else{s=j+m-n|0;s=(s|0)>0?s:0;k=(k|0)<(s|0)?k:s;s=0;break}}else s=j}else{o=i;s=h&8}while(0);t=k|s;p=(t|0)!=0&1;q=(o|32|0)==102;if(q){v=0;j=(m|0)>0?m:0}else{j=(m|0)<0?g:m;j=Qz(j,((j|0)<0)<<31>>31,E)|0;n=E;if((n-j|0)<2)do{j=j+-1|0;a[j>>0]=48}while((n-j|0)<2);a[j+-1>>0]=(m>>31&2)+43;j=j+-2|0;a[j>>0]=o;v=j;j=n-j|0}j=C+1+k+p+j|0;Tz(b,32,f,j,h);Lz(b,B,C);Tz(b,48,f,j,h^65536);if(q){o=x>>>0>D>>>0?D:x;s=G+9|0;p=s;q=G+8|0;n=o;do{m=Qz(c[n>>2]|0,0,s)|0;if((n|0)==(o|0)){if((m|0)==(s|0)){a[q>>0]=48;m=q}}else if(m>>>0>G>>>0){HA(G|0,48,m-F|0)|0;do m=m+-1|0;while(m>>>0>G>>>0)}Lz(b,m,p-m|0);n=n+4|0}while(n>>>0<=D>>>0);if(t|0)Lz(b,6941,1);if(n>>>0<w>>>0&(k|0)>0)while(1){m=Qz(c[n>>2]|0,0,s)|0;if(m>>>0>G>>>0){HA(G|0,48,m-F|0)|0;do m=m+-1|0;while(m>>>0>G>>>0)}Lz(b,m,(k|0)<9?k:9);n=n+4|0;m=k+-9|0;if(!(n>>>0<w>>>0&(k|0)>9)){k=m;break}else k=m}Tz(b,48,k+9|0,9,0)}else{t=u?w:x+4|0;if((k|0)>-1){u=G+9|0;s=(s|0)==0;g=u;p=0-F|0;q=G+8|0;o=x;do{m=Qz(c[o>>2]|0,0,u)|0;if((m|0)==(u|0)){a[q>>0]=48;m=q}do if((o|0)==(x|0)){n=m+1|0;Lz(b,m,1);if(s&(k|0)<1){m=n;break}Lz(b,6941,1);m=n}else{if(m>>>0<=G>>>0)break;HA(G|0,48,m+p|0)|0;do m=m+-1|0;while(m>>>0>G>>>0)}while(0);F=g-m|0;Lz(b,m,(k|0)>(F|0)?F:k);k=k-F|0;o=o+4|0}while(o>>>0<t>>>0&(k|0)>-1)}Tz(b,48,k+18|0,18,0);Lz(b,v,E-v|0)}Tz(b,32,f,j,h^8192)}else{G=(i&32|0)!=0;j=C+3|0;Tz(b,32,f,j,h&-65537);Lz(b,B,C);Lz(b,e!=e|0.0!=0.0?(G?6917:6921):G?6909:6913,3);Tz(b,32,f,j,h^8192)}while(0);l=H;return ((j|0)<(f|0)?f:j)|0}function Wz(a){a=+a;var b=0;h[j>>3]=a;b=c[j>>2]|0;A=c[j+4>>2]|0;return b|0}function Xz(a,b){a=+a;b=b|0;return +(+Yz(a,b))}function Yz(a,b){a=+a;b=b|0;var d=0,e=0,f=0;h[j>>3]=a;d=c[j>>2]|0;e=c[j+4>>2]|0;f=JA(d|0,e|0,52)|0;switch(f&2047){case 0:{if(a!=0.0){a=+Yz(a*18446744073709551616.0,b);d=(c[b>>2]|0)+-64|0}else d=0;c[b>>2]=d;break}case 2047:break;default:{c[b>>2]=(f&2047)+-1022;c[j>>2]=d;c[j+4>>2]=e&-2146435073|1071644672;a=+h[j>>3]}}return +a}function Zz(b,d,e){b=b|0;d=d|0;e=e|0;do if(b){if(d>>>0<128){a[b>>0]=d;b=1;break}if(!(c[c[(_z()|0)+188>>2]>>2]|0))if((d&-128|0)==57216){a[b>>0]=d;b=1;break}else{c[(Az()|0)>>2]=84;b=-1;break}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;b=2;break}if(d>>>0<55296|(d&-8192|0)==57344){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;b=3;break}if((d+-65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;b=4;break}else{c[(Az()|0)>>2]=84;b=-1;break}}else b=1;while(0);return b|0}function _z(){return Cz()|0}function $z(){return Cz()|0}function aA(b,e){b=b|0;e=e|0;var f=0,g=0;g=0;while(1){if((d[6943+g>>0]|0)==(b|0)){b=2;break}f=g+1|0;if((f|0)==87){f=7031;g=87;b=5;break}else g=f}if((b|0)==2)if(!g)f=7031;else{f=7031;b=5}if((b|0)==5)while(1){do{b=f;f=f+1|0}while((a[b>>0]|0)!=0);g=g+-1|0;if(!g)break;else b=5}return bA(f,c[e+20>>2]|0)|0}function bA(a,b){a=a|0;b=b|0;return cA(a,b)|0}function cA(a,b){a=a|0;b=b|0;if(!b)b=0;else b=dA(c[b>>2]|0,c[b+4>>2]|0,a)|0;return (b|0?b:a)|0}function dA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=(c[b>>2]|0)+1794895138|0;h=eA(c[b+8>>2]|0,o)|0;f=eA(c[b+12>>2]|0,o)|0;g=eA(c[b+16>>2]|0,o)|0;a:do if((h>>>0<d>>>2>>>0?(n=d-(h<<2)|0,f>>>0<n>>>0&g>>>0<n>>>0):0)?((g|f)&3|0)==0:0){n=f>>>2;m=g>>>2;l=0;while(1){j=h>>>1;k=l+j|0;i=k<<1;g=i+n|0;f=eA(c[b+(g<<2)>>2]|0,o)|0;g=eA(c[b+(g+1<<2)>>2]|0,o)|0;if(!(g>>>0<d>>>0&f>>>0<(d-g|0)>>>0)){f=0;break a}if(a[b+(g+f)>>0]|0){f=0;break a}f=Fz(e,b+g|0)|0;if(!f)break;f=(f|0)<0;if((h|0)==1){f=0;break a}else{l=f?l:k;h=f?j:h-j|0}}f=i+m|0;g=eA(c[b+(f<<2)>>2]|0,o)|0;f=eA(c[b+(f+1<<2)>>2]|0,o)|0;if(f>>>0<d>>>0&g>>>0<(d-f|0)>>>0)f=(a[b+(f+g)>>0]|0)==0?b+f|0:0;else f=0}else f=0;while(0);return f|0}function eA(a,b){a=a|0;b=b|0;var c=0;c=QA(a|0)|0;return ((b|0)==0?a:c)|0}function fA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=e+16|0;g=c[f>>2]|0;if(!g)if(!(gA(e)|0)){g=c[f>>2]|0;h=5}else f=0;else h=5;a:do if((h|0)==5){j=e+20|0;i=c[j>>2]|0;f=i;if((g-i|0)>>>0<d>>>0){f=ob[c[e+36>>2]&7](e,b,d)|0;break}b:do if((a[e+75>>0]|0)>-1){i=d;while(1){if(!i){h=0;g=b;break b}g=i+-1|0;if((a[b+g>>0]|0)==10)break;else i=g}f=ob[c[e+36>>2]&7](e,b,i)|0;if(f>>>0<i>>>0)break a;h=i;g=b+i|0;d=d-i|0;f=c[j>>2]|0}else{h=0;g=b}while(0);KA(f|0,g|0,d|0)|0;c[j>>2]=(c[j>>2]|0)+d;f=h+d|0}while(0);return f|0}function gA(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;e=c[b+44>>2]|0;c[b+28>>2]=e;c[b+20>>2]=e;c[b+16>>2]=e+(c[b+48>>2]|0);b=0}else{c[b>>2]=d|32;b=-1}return b|0}function hA(b){b=b|0;var d=0,e=0,f=0;f=b;a:do if(!(f&3))e=4;else{d=f;while(1){if(!(a[b>>0]|0)){b=d;break a}b=b+1|0;d=b;if(!(d&3)){e=4;break}}}while(0);if((e|0)==4){while(1){d=c[b>>2]|0;if(!((d&-2139062144^-2139062144)&d+-16843009))b=b+4|0;else break}if((d&255)<<24>>24)do b=b+1|0;while((a[b>>0]|0)!=0)}return b-f|0}function iA(a,b){a=T(a);b=T(b);var c=0,d=0;c=jA(a)|0;do if((c&2147483647)>>>0<=2139095040){d=jA(b)|0;if((d&2147483647)>>>0<=2139095040)if((d^c|0)<0){a=(c|0)<0?b:a;break}else{a=a<b?b:a;break}}else a=b;while(0);return T(a)}function jA(a){a=T(a);return (g[j>>2]=a,c[j>>2]|0)|0}function kA(a,b){a=T(a);b=T(b);var c=0,d=0;c=lA(a)|0;do if((c&2147483647)>>>0<=2139095040){d=lA(b)|0;if((d&2147483647)>>>0<=2139095040)if((d^c|0)<0){a=(c|0)<0?a:b;break}else{a=a<b?a:b;break}}else a=b;while(0);return T(a)}function lA(a){a=T(a);return (g[j>>2]=a,c[j>>2]|0)|0}function mA(a,b){a=a|0;b=b|0;var c=0;c=hA(a)|0;return ((nA(a,1,c,b)|0)!=(c|0))<<31>>31|0}function nA(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=P(d,b)|0;d=(b|0)==0?0:d;if((c[e+76>>2]|0)>-1){g=(Jz(e)|0)==0;a=fA(a,f,e)|0;if(!g)Kz(e)}else a=fA(a,f,e)|0;if((a|0)!=(f|0))d=(a>>>0)/(b>>>0)|0;return d|0}function oA(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;m=l;l=l+16|0;j=m;k=e&255;a[j>>0]=k;g=b+16|0;h=c[g>>2]|0;if(!h)if(!(gA(b)|0)){h=c[g>>2]|0;i=4}else f=-1;else i=4;do if((i|0)==4){i=b+20|0;g=c[i>>2]|0;if(g>>>0<h>>>0?(f=e&255,(f|0)!=(a[b+75>>0]|0)):0){c[i>>2]=g+1;a[g>>0]=k;break}if((ob[c[b+36>>2]&7](b,j,1)|0)==1)f=d[j>>0]|0;else f=-1}while(0);l=m;return f|0}function pA(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;c[e>>2]=b;b=Hz(c[584]|0,a,e)|0;l=d;return b|0}function qA(b){b=b|0;var d=0,e=0,f=0,g=0;f=c[584]|0;if((c[f+76>>2]|0)>-1)g=Jz(f)|0;else g=0;do if((mA(b,f)|0)<0)b=1;else{if((a[f+75>>0]|0)!=10?(d=f+20|0,e=c[d>>2]|0,e>>>0<(c[f+16>>2]|0)>>>0):0){c[d>>2]=e+1;a[e>>0]=10;b=0;break}b=(oA(f,10)|0)<0}while(0);if(g|0)Kz(f);return b<<31>>31|0}function rA(a,b){a=a|0;b=b|0;return Hz(c[584]|0,a,b)|0}function sA(a){a=a|0;Qa()}function tA(a){a=a|0;return}function uA(a,b){a=a|0;b=b|0;return 0}function vA(a){a=a|0;if((wA(a+4|0)|0)==-1){jb[c[(c[a>>2]|0)+8>>2]&127](a);a=1}else a=0;return a|0}function wA(a){a=a|0;var b=0;b=c[a>>2]|0;c[a>>2]=b+-1;return b+-1|0}function xA(a){a=a|0;if(vA(a)|0)yA(a);return}function yA(a){a=a|0;var b=0;b=a+8|0;if(!((c[b>>2]|0)!=0?(wA(b)|0)!=-1:0))jb[c[(c[a>>2]|0)+16>>2]&127](a);return}function zA(a){a=a|0;var b=0;b=(a|0)==0?1:a;while(1){a=qz(b)|0;if(a|0)break;a=CA()|0;if(!a){a=0;break}Ab[a&0]()}return a|0}function AA(a){a=a|0;return zA(a)|0}function BA(a){a=a|0;rz(a);return}function CA(){var a=0;a=c[2933]|0;c[2933]=a+0;return a|0}function DA(){}function EA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (A=d,a-c>>>0|0)|0}function FA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (A=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0}function GA(a){a=+a;return a>=0.0?+B(a+.5):+O(a-.5)}function HA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=b+e|0;d=d&255;if((e|0)>=67){while(b&3){a[b>>0]=d;b=b+1|0}f=h&-4|0;g=f-64|0;i=d|d<<8|d<<16|d<<24;while((b|0)<=(g|0)){c[b>>2]=i;c[b+4>>2]=i;c[b+8>>2]=i;c[b+12>>2]=i;c[b+16>>2]=i;c[b+20>>2]=i;c[b+24>>2]=i;c[b+28>>2]=i;c[b+32>>2]=i;c[b+36>>2]=i;c[b+40>>2]=i;c[b+44>>2]=i;c[b+48>>2]=i;c[b+52>>2]=i;c[b+56>>2]=i;c[b+60>>2]=i;b=b+64|0}while((b|0)<(f|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0}return h-e|0}function IA(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){A=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}A=a<<c-32;return 0}function JA(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){A=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}A=0;return b>>>c-32|0}function KA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192)return La(b|0,d|0,e|0)|0;h=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return h|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}e=g&-4|0;f=e-64|0;while((b|0)<=(f|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0}while((b|0)<(e|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}}else{e=g-4|0;while((b|0)<(e|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}return h|0}function LA(b){b=b|0;var c=0;c=a[n+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[n+(b>>>24)>>0]|0)+24|0}function MA(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=a;j=b;k=j;h=d;n=e;i=n;if(!k){g=(f|0)!=0;if(!i){if(g){c[f>>2]=(l>>>0)%(h>>>0);c[f+4>>2]=0}n=0;f=(l>>>0)/(h>>>0)>>>0;return (A=n,f)|0}else{if(!g){n=0;f=0;return (A=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;f=0;return (A=n,f)|0}}g=(i|0)==0;do if(h){if(!g){g=(S(i|0)|0)-(S(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;b=g-31>>31;h=m;a=l>>>(m>>>0)&b|k<<i;b=k>>>(m>>>0)&b;g=0;i=l<<i;break}if(!f){n=0;f=0;return (A=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;n=0;f=0;return (A=n,f)|0}g=h-1|0;if(g&h|0){i=(S(h|0)|0)+33-(S(k|0)|0)|0;p=64-i|0;m=32-i|0;j=m>>31;o=i-32|0;b=o>>31;h=i;a=m-1>>31&k>>>(o>>>0)|(k<<m|l>>>(i>>>0))&b;b=b&k>>>(i>>>0);g=l<<p&j;i=(k<<p|l>>>(o>>>0))&j|l<<m&i-33>>31;break}if(f|0){c[f>>2]=g&l;c[f+4>>2]=0}if((h|0)==1){o=j|b&0;p=a|0|0;return (A=o,p)|0}else{p=LA(h|0)|0;o=k>>>(p>>>0)|0;p=k<<32-p|l>>>(p>>>0)|0;return (A=o,p)|0}}else{if(g){if(f|0){c[f>>2]=(k>>>0)%(h>>>0);c[f+4>>2]=0}o=0;p=(k>>>0)/(h>>>0)>>>0;return (A=o,p)|0}if(!l){if(f|0){c[f>>2]=0;c[f+4>>2]=(k>>>0)%(i>>>0)}o=0;p=(k>>>0)/(i>>>0)>>>0;return (A=o,p)|0}g=i-1|0;if(!(g&i)){if(f|0){c[f>>2]=a|0;c[f+4>>2]=g&k|b&0}o=0;p=k>>>((LA(i|0)|0)>>>0);return (A=o,p)|0}g=(S(i|0)|0)-(S(k|0)|0)|0;if(g>>>0<=30){b=g+1|0;i=31-g|0;h=b;a=k<<i|l>>>(b>>>0);b=k>>>(b>>>0);g=0;i=l<<i;break}if(!f){o=0;p=0;return (A=o,p)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;o=0;p=0;return (A=o,p)|0}while(0);if(!h){k=i;j=0;i=0}else{m=d|0|0;l=n|e&0;k=FA(m|0,l|0,-1,-1)|0;d=A;j=i;i=0;do{e=j;j=g>>>31|j<<1;g=i|g<<1;e=a<<1|e>>>31|0;n=a>>>31|b<<1|0;EA(k|0,d|0,e|0,n|0)|0;p=A;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;a=EA(e|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=A;h=h-1|0}while((h|0)!=0);k=j;j=0}h=0;if(f|0){c[f>>2]=a;c[f+4>>2]=b}o=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;p=(g<<1|0>>>31)&-2|i;return (A=o,p)|0}function NA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return MA(a,b,c,d,0)|0}function OA(a){a=a|0;var b=0,d=0;d=a+15&-16|0;b=c[i>>2]|0;a=b+d|0;if((d|0)>0&(a|0)<(b|0)|(a|0)<0){Y()|0;Na(12);return -1}c[i>>2]=a;if((a|0)>(X()|0)?(W()|0)==0:0){c[i>>2]=b;Na(12);return -1}return b|0}function PA(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+16|0;f=g|0;MA(a,b,d,e,f)|0;l=g;return (A=c[f+4>>2]|0,c[f>>2]|0)|0}function QA(a){a=a|0;return (a&255)<<24|(a>>8&255)<<16|(a>>16&255)<<8|a>>>24|0}function RA(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;gb[a&1](b|0,c|0,d|0,e|0,f|0)}function SA(a,b,c){a=a|0;b=b|0;c=+c;hb[a&31](b|0,+c)}function TA(a,b,c,d){a=a|0;b=b|0;c=T(c);d=T(d);return T(ib[a&0](b|0,T(c),T(d)))}function UA(a,b){a=a|0;b=b|0;jb[a&127](b|0)}function VA(a,b,c){a=a|0;b=b|0;c=c|0;kb[a&31](b|0,c|0)}function WA(a,b){a=a|0;b=b|0;return lb[a&31](b|0)|0}function XA(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=e|0;mb[a&1](b|0,+c,+d,e|0)}function YA(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;nb[a&1](b|0,+c,+d)}function ZA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ob[a&7](b|0,c|0,d|0)|0}function _A(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return +pb[a&1](b|0,c|0,d|0)}function $A(a,b){a=a|0;b=b|0;return +qb[a&15](b|0)}function aB(a,b,c){a=a|0;b=b|0;c=+c;return rb[a&1](b|0,+c)|0}function bB(a,b,c){a=a|0;b=b|0;c=c|0;return sb[a&15](b|0,c|0)|0}function cB(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=f|0;tb[a&1](b|0,c|0,+d,+e,f|0)}function dB(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ub[a&1](b|0,c|0,d|0,e|0,f|0,g|0)}function eB(a,b,c){a=a|0;b=b|0;c=c|0;return +vb[a&7](b|0,c|0)}function fB(a){a=a|0;return wb[a&7]()|0}function gB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;xb[a&1](b|0,c|0,d|0,+e)}function hB(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=T(d);e=e|0;f=T(f);g=g|0;yb[a&1](b|0,c|0,T(d),e|0,T(f),g|0)}function iB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;zb[a&15](b|0,c|0,d|0)}function jB(a){a=a|0;Ab[a&0]()}function kB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;Bb[a&15](b|0,c|0,+d)}function lB(a,b,c){a=a|0;b=+b;c=+c;return Cb[a&1](+b,+c)|0}function mB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Db[a&15](b|0,c|0,d|0,e|0)}function nB(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;U(0)}function oB(a,b){a=a|0;b=+b;U(1)}function pB(a,b,c){a=a|0;b=T(b);c=T(c);U(2);return fb}function qB(a){a=a|0;U(3)}function rB(a,b){a=a|0;b=b|0;U(4)}function sB(a){a=a|0;U(5);return 0}function tB(a,b,c,d){a=a|0;b=+b;c=+c;d=d|0;U(6)}function uB(a,b,c){a=a|0;b=+b;c=+c;U(7)}function vB(a,b,c){a=a|0;b=b|0;c=c|0;U(8);return 0}function wB(a,b,c){a=a|0;b=b|0;c=c|0;U(9);return 0.0}function xB(a){a=a|0;U(10);return 0.0}function yB(a,b){a=a|0;b=+b;U(11);return 0}function zB(a,b){a=a|0;b=b|0;U(12);return 0}function AB(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=e|0;U(13)}function BB(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;U(14)}function CB(a,b){a=a|0;b=b|0;U(15);return 0.0}function DB(){U(16);return 0}function EB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;U(17)}function FB(a,b,c,d,e,f){a=a|0;b=b|0;c=T(c);d=d|0;e=T(e);f=f|0;U(18)}function GB(a,b,c){a=a|0;b=b|0;c=c|0;U(19)}function HB(){U(20)}function IB(a,b,c){a=a|0;b=b|0;c=+c;U(21)}function JB(a,b){a=+a;b=+b;U(22);return 0}function KB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;U(23)}

// EMSCRIPTEN_END_FUNCS
var gb=[nB,Wu];var hb=[oB,gf,hf,jf,kf,lf,mf,nf,pf,qf,sf,tf,uf,vf,wf,xf,yf,zf,Af,oB,oB,oB,oB,oB,oB,oB,oB,oB,oB,oB,oB,oB];var ib=[pB];var jb=[qB,rz,tA,ii,ji,ki,ln,mn,nn,hs,is,js,Eu,Fu,Gu,Fy,Gy,Hy,Ne,Se,of,rf,Cg,Dg,Rh,si,Ki,hj,Bj,Xj,tk,Qk,hl,Bl,Xl,om,Hm,_m,Hn,_n,so,Lo,cp,vp,Rp,hq,yq,Wq,gr,jr,Dr,Gr,Yr,ms,ps,Js,_s,qt,Mt,ti,bw,Mw,cx,ux,Tx,jy,vy,yy,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB,qB];var kb=[rB,Sg,Te,Ue,Xe,Ye,Ze,_e,$e,af,df,ef,ff,Rf,Uf,Vf,Wf,Xf,Yf,Zf,cg,gg,Fg,Og,Vp,kq,ew,Ut,zw,rB,rB,rB];var lb=[sB,qz,wz,Tg,Ef,If,Jf,Kf,Lf,Mf,Nf,Pf,Qf,dg,eg,Gg,Eg,Bq,Ms,jw,lw,sB,sB,sB,sB,sB,sB,sB,sB,sB,sB,sB];var mb=[tB,Hg];var nb=[uB,$r];var ob=[vB,Ub,xz,yz,Ez,xk,Ln,yx];var pb=[wB,sm];var qb=[xB,Sf,Tf,_f,Ig,Jg,Kg,Lg,Mg,Ng,xB,xB,xB,xB,xB,xB];var rb=[yB,cr];var sb=[zB,sz,uA,fg,Xh,lj,Uk,ll,cn,co,ct,gx,zB,zB,zB,zB];var tb=[AB,Oi];var ub=[BB,Xx];var vb=[CB,$f,Pg,Qg,Rg,Lm,CB,CB];var wb=[DB,Ug,Le,or,Kr,us,Cy,DB];var xb=[EB,Po];var yb=[FB,ig];var zb=[GB,Ff,Of,ag,bg,Fj,$j,Fl,gp,zp,ut,xv,Qw,ny,GB,GB];var Ab=[HB];var Bb=[IB,Ve,We,bf,cf,Bf,Cf,Df,wo,Zq,IB,IB,IB,IB,IB,IB];var Cb=[JB,es];var Db=[KB,$l,Jq,ur,Qr,Bs,Rt,qw,Ny,KB,KB,KB,KB,KB,KB,KB];return{_roundf:GA,stackSave:Fb,getTempRet0:Kb,_memset:HA,setThrew:Ib,_bitshift64Lshr:JA,_bitshift64Shl:IA,_llvm_cttz_i32:LA,_sbrk:OA,_memcpy:KA,stackAlloc:Eb,___uremdi3:PA,_nbind_init:az,_i64Subtract:EA,___udivmoddi4:MA,setTempRet0:Jb,_i64Add:FA,_emscripten_get_global_libc:vz,__GLOBAL__sub_I_Binding_cc:Uv,___udivdi3:NA,_llvm_bswap_i32:QA,__GLOBAL__sub_I_nbind_cc:Vg,_free:rz,runPostSets:DA,establishStackSpace:Hb,stackRestore:Gb,_malloc:qz,__GLOBAL__sub_I_common_cc:Dt,stackAlloc:Eb,stackSave:Fb,stackRestore:Gb,establishStackSpace:Hb,setThrew:Ib,setTempRet0:Jb,getTempRet0:Kb,dynCall_viiiii:RA,dynCall_vid:SA,dynCall_fiff:TA,dynCall_vi:UA,dynCall_vii:VA,dynCall_ii:WA,dynCall_viddi:XA,dynCall_vidd:YA,dynCall_iiii:ZA,dynCall_diii:_A,dynCall_di:$A,dynCall_iid:aB,dynCall_iii:bB,dynCall_viiddi:cB,dynCall_viiiiii:dB,dynCall_dii:eB,dynCall_i:fB,dynCall_viiid:gB,dynCall_viififi:hB,dynCall_viii:iB,dynCall_v:jB,dynCall_viid:kB,dynCall_idd:lB,dynCall_viiii:mB}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _roundf=Module["_roundf"]=asm["_roundf"];var stackSave=Module["stackSave"]=asm["stackSave"];var getTempRet0=Module["getTempRet0"]=asm["getTempRet0"];var _memset=Module["_memset"]=asm["_memset"];var setThrew=Module["setThrew"]=asm["setThrew"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _llvm_cttz_i32=Module["_llvm_cttz_i32"]=asm["_llvm_cttz_i32"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var _nbind_init=Module["_nbind_init"]=asm["_nbind_init"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var ___udivmoddi4=Module["___udivmoddi4"]=asm["___udivmoddi4"];var setTempRet0=Module["setTempRet0"]=asm["setTempRet0"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=asm["_emscripten_get_global_libc"];var __GLOBAL__sub_I_Binding_cc=Module["__GLOBAL__sub_I_Binding_cc"]=asm["__GLOBAL__sub_I_Binding_cc"];var ___udivdi3=Module["___udivdi3"]=asm["___udivdi3"];var _llvm_bswap_i32=Module["_llvm_bswap_i32"]=asm["_llvm_bswap_i32"];var __GLOBAL__sub_I_nbind_cc=Module["__GLOBAL__sub_I_nbind_cc"]=asm["__GLOBAL__sub_I_nbind_cc"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var _malloc=Module["_malloc"]=asm["_malloc"];var __GLOBAL__sub_I_common_cc=Module["__GLOBAL__sub_I_common_cc"]=asm["__GLOBAL__sub_I_common_cc"];var dynCall_viiiii=Module["dynCall_viiiii"]=asm["dynCall_viiiii"];var dynCall_vid=Module["dynCall_vid"]=asm["dynCall_vid"];var dynCall_fiff=Module["dynCall_fiff"]=asm["dynCall_fiff"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];var dynCall_vii=Module["dynCall_vii"]=asm["dynCall_vii"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_viddi=Module["dynCall_viddi"]=asm["dynCall_viddi"];var dynCall_vidd=Module["dynCall_vidd"]=asm["dynCall_vidd"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_diii=Module["dynCall_diii"]=asm["dynCall_diii"];var dynCall_di=Module["dynCall_di"]=asm["dynCall_di"];var dynCall_iid=Module["dynCall_iid"]=asm["dynCall_iid"];var dynCall_iii=Module["dynCall_iii"]=asm["dynCall_iii"];var dynCall_viiddi=Module["dynCall_viiddi"]=asm["dynCall_viiddi"];var dynCall_viiiiii=Module["dynCall_viiiiii"]=asm["dynCall_viiiiii"];var dynCall_dii=Module["dynCall_dii"]=asm["dynCall_dii"];var dynCall_i=Module["dynCall_i"]=asm["dynCall_i"];var dynCall_viiid=Module["dynCall_viiid"]=asm["dynCall_viiid"];var dynCall_viififi=Module["dynCall_viififi"]=asm["dynCall_viififi"];var dynCall_viii=Module["dynCall_viii"]=asm["dynCall_viii"];var dynCall_v=Module["dynCall_v"]=asm["dynCall_v"];var dynCall_viid=Module["dynCall_viid"]=asm["dynCall_viid"];var dynCall_idd=Module["dynCall_idd"]=asm["dynCall_idd"];var dynCall_viiii=Module["dynCall_viiii"]=asm["dynCall_viiii"];Runtime.stackAlloc=Module["stackAlloc"];Runtime.stackSave=Module["stackSave"];Runtime.stackRestore=Module["stackRestore"];Runtime.establishStackSpace=Module["establishStackSpace"];Runtime.setTempRet0=Module["setTempRet0"];Runtime.getTempRet0=Module["getTempRet0"];Module["asm"]=asm;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}Module.printErr("exception thrown: "+toLog);Module["quit"](1,e)}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}Module["quit"](status,new ExitStatus(status))}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()}))





/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(4).Buffer))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function patch(prototype, name, fn) {

    let original = prototype[name];

    prototype[name] = function (... args) {
        return fn.call(this, original, ... args);
    };

}

module.exports = function (bind, lib) {

    let constants = Object.assign({

        UNDEFINED: NaN

    }, __webpack_require__(10));

    class Layout {

        constructor(left, right, top, bottom, width, height) {

            this.left = left;
            this.right = right;

            this.top = top;
            this.bottom = bottom;

            this.width = width;
            this.height = height;

        }

        fromJS(expose) {

            expose(this.left, this.right, this.top, this.bottom, this.width, this.height);

        }

        toString() {

            return `<Layout#${this.left}:${this.right};${this.top}:${this.bottom};${this.width}:${this.height}>`;

        }

    }

    class Size {

        static fromJS({ width, height }) {

            return new Size(width, height);

        }

        constructor(width, height) {

            this.width = width;
            this.height = height;

        }

        fromJS(expose) {

            expose(this.width, this.height);

        }

        toString() {

            return `<Size#${this.width}x${this.height}>`;

        }

    }

    class Value {

        constructor(unit, value) {

            this.unit = unit;
            this.value = value;

        }

        fromJS(expose) {

            expose(this.unit, this.value);

        }

        toString() {

            switch (this.unit) {

                case constants.UNIT_POINT:
                    return `${this.value}`;

                case constants.UNIT_PERCENT:
                    return `${this.value}%`;

                case constants.UNIT_AUTO:
                    return `auto`;

                default: {
                    return `${this.value}?`;
                }

            }

        }

        valueOf() {

            return this.value;

        }

    }

    for (let fnName of [ `setPosition`, `setMargin`, `setFlexBasis`, `setWidth`, `setHeight`, `setMinWidth`, `setMinHeight`, `setMaxWidth`, `setMaxHeight`, `setPadding` ]) {

        let methods = { [constants.UNIT_POINT]: lib.Node.prototype[fnName], [constants.UNIT_PERCENT]: lib.Node.prototype[`${fnName}Percent`], [constants.UNIT_AUTO]: lib.Node.prototype[`${fnName}Auto`] };

        patch(lib.Node.prototype, fnName, function (original, ... args) {

            // We patch all these functions to add support for the following calls:
            // .setWidth(100) / .setWidth("100%") / .setWidth(.getWidth()) / .setWidth("auto")

            let value = args.pop();
            let unit, asNumber;

            if (value === `auto`) {

                unit = constants.UNIT_AUTO;
                asNumber = undefined;

            } else if (value instanceof Value) {

                unit = value.unit;
                asNumber = value.valueOf();

            } else {

                unit = typeof value === `string` && value.endsWith(`%`) ? constants.UNIT_PERCENT : constants.UNIT_POINT;
                asNumber = parseFloat(value);

            }

            if (!Object.prototype.hasOwnProperty.call(methods, unit))
                throw new Error(`Failed to execute "${fnName}": Unsupported unit.`);

            if (asNumber !== undefined) {
                return methods[unit].call(this, ... args, asNumber);
            } else {
                return methods[unit].call(this, ... args);
            }

        });

    }

    patch(lib.Node.prototype, `free`, function () {

        // Since we handle the memory allocation ourselves (via lib.Node.create), we also need to handle the deallocation

        lib.Node.destroy(this);

    });

    patch(lib.Node.prototype, `freeRecursive`, function () {

        for (let t = 0, T = this.getChildCount(); t < T; ++t)
            this.getChild(0).freeRecursive();

        this.free();

    });

    patch(lib.Node.prototype, `setMeasureFunc`, function (original, measureFunc) {

        // This patch is just a convenience patch, since it helps write more idiomatic source code (such as .setMeasureFunc(null))
        // We also automatically convert the return value of the measureFunc to a Size object, so that we can return anything that has .width and .height properties

        if (measureFunc) {
            return original.call(this, (... args) => Size.fromJS(measureFunc(... args)));
        } else {
            return this.unsetMeasureFunc();
        }

    });

    patch(lib.Node.prototype, `calculateLayout`, function (original, width = constants.UNDEFINED, height = constants.UNDEFINED, direction = constants.DIRECTION_LTR) {

        // Just a small patch to add support for the function default parameters

        return original.call(this, width, height, direction);

    });

    function setExperimentalFeatureEnabled(... args) {

        return lib.setExperimentalFeatureEnabled(... args);

    }

    function isExperimentalFeatureEnabled(... args) {

        return lib.isExperimentalFeatureEnabled(... args);

    }

    function getInstanceCount(... args) {

        return lib.getInstanceCount(... args);

    }

    bind(`Layout`, Layout);
    bind(`Size`, Size);
    bind(`Value`, Value);

    return Object.assign({

        Node: lib.Node,

        Layout,
        Size,
        Value,

        setExperimentalFeatureEnabled,
        isExperimentalFeatureEnabled,

        getInstanceCount

    }, constants);

};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(3)
var ieee754 = __webpack_require__(5)
var isArray = __webpack_require__(6)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {

  ALIGN_COUNT: 8,
  ALIGN_AUTO: 0,
  ALIGN_FLEX_START: 1,
  ALIGN_CENTER: 2,
  ALIGN_FLEX_END: 3,
  ALIGN_STRETCH: 4,
  ALIGN_BASELINE: 5,
  ALIGN_SPACE_BETWEEN: 6,
  ALIGN_SPACE_AROUND: 7,

  DIMENSION_COUNT: 2,
  DIMENSION_WIDTH: 0,
  DIMENSION_HEIGHT: 1,

  DIRECTION_COUNT: 3,
  DIRECTION_INHERIT: 0,
  DIRECTION_LTR: 1,
  DIRECTION_RTL: 2,

  DISPLAY_COUNT: 2,
  DISPLAY_FLEX: 0,
  DISPLAY_NONE: 1,

  EDGE_COUNT: 9,
  EDGE_LEFT: 0,
  EDGE_TOP: 1,
  EDGE_RIGHT: 2,
  EDGE_BOTTOM: 3,
  EDGE_START: 4,
  EDGE_END: 5,
  EDGE_HORIZONTAL: 6,
  EDGE_VERTICAL: 7,
  EDGE_ALL: 8,

  EXPERIMENTAL_FEATURE_COUNT: 2,
  EXPERIMENTAL_FEATURE_ROUNDING: 0,
  EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS: 1,

  FLEX_DIRECTION_COUNT: 4,
  FLEX_DIRECTION_COLUMN: 0,
  FLEX_DIRECTION_COLUMN_REVERSE: 1,
  FLEX_DIRECTION_ROW: 2,
  FLEX_DIRECTION_ROW_REVERSE: 3,

  JUSTIFY_COUNT: 5,
  JUSTIFY_FLEX_START: 0,
  JUSTIFY_CENTER: 1,
  JUSTIFY_FLEX_END: 2,
  JUSTIFY_SPACE_BETWEEN: 3,
  JUSTIFY_SPACE_AROUND: 4,

  LOG_LEVEL_COUNT: 5,
  LOG_LEVEL_ERROR: 0,
  LOG_LEVEL_WARN: 1,
  LOG_LEVEL_INFO: 2,
  LOG_LEVEL_DEBUG: 3,
  LOG_LEVEL_VERBOSE: 4,

  MEASURE_MODE_COUNT: 3,
  MEASURE_MODE_UNDEFINED: 0,
  MEASURE_MODE_EXACTLY: 1,
  MEASURE_MODE_AT_MOST: 2,

  OVERFLOW_COUNT: 3,
  OVERFLOW_VISIBLE: 0,
  OVERFLOW_HIDDEN: 1,
  OVERFLOW_SCROLL: 2,

  POSITION_TYPE_COUNT: 2,
  POSITION_TYPE_RELATIVE: 0,
  POSITION_TYPE_ABSOLUTE: 1,

  PRINT_OPTIONS_COUNT: 3,
  PRINT_OPTIONS_LAYOUT: 1,
  PRINT_OPTIONS_STYLE: 2,
  PRINT_OPTIONS_CHILDREN: 4,

  UNIT_COUNT: 4,
  UNIT_UNDEFINED: 0,
  UNIT_POINT: 1,
  UNIT_PERCENT: 2,
  UNIT_AUTO: 3,

  WRAP_COUNT: 3,
  WRAP_NO_WRAP: 0,
  WRAP_WRAP: 1,
  WRAP_WRAP_REVERSE: 2,

};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var nbind = __webpack_require__(1);

var ran = false;
var ret = null;

nbind({}, function (err, result) {

    if (ran)
        return;

    ran = true;

    if (err)
        throw err;

    ret = result;

});

if (!ran)
    throw new Error('Failed to load the yoga module - it needed to be loaded synchronously, but didn\'t');

module.exports = __webpack_require__(2)(ret.bind, ret.lib);


/***/ })
/******/ ]);
});
