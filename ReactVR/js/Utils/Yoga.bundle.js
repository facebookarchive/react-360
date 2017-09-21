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
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(typeof module=="object"&&module.exports)module.exports=wrapper;else(root.nbind=root.nbind||{}).init=wrapper}))(this,(function(Module,cb){if(typeof Module=="function"){cb=Module;Module={}}Module.onRuntimeInitialized=(function(init,cb){return(function(){if(init)init.apply(this,arguments);try{Module.ccall("nbind_init")}catch(err){cb(err);return}cb(null,{bind:Module._nbind_value,reflect:Module.NBind.reflect,queryType:Module.NBind.queryType,toggleLightGC:Module.toggleLightGC,lib:Module})})})(Module.onRuntimeInitialized,cb);var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){if(!nodeFS)nodeFS=__webpack_require__(7);if(!nodePath)nodePath=__webpack_require__(8);filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function shell_read(){throw"no read() available"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function shell_print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function shell_printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}if(!Module["quit"]){Module["quit"]=(function(status,toThrow){throw toThrow})}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value;return value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource=null;function ensureJSsource(){if(!JSsource){JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){ensureJSsource();funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"=("+convertCode.returnValue+");"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){ensureJSsource();funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){var __cxa_demangle_func=Module["___cxa_demangle"]||Module["__cxa_demangle"];if(__cxa_demangle_func){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=__cxa_demangle_func(buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||134217728;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["fround"]){var froundBuffer=new Float32Array(1);Math["fround"]=(function(x){froundBuffer[0]=x;return froundBuffer[0]})}Math.fround=Math["fround"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[(function($0,$1,$2,$3,$4,$5,$6,$7){{return _nbind.callbackSignatureList[$0].apply(this,arguments)}})];function _emscripten_asm_const_iiiiiiii(code,a0,a1,a2,a3,a4,a5,a6){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5,a6)}function _emscripten_asm_const_iiiii(code,a0,a1,a2,a3){return ASM_CONSTS[code](a0,a1,a2,a3)}function _emscripten_asm_const_iiidddddd(code,a0,a1,a2,a3,a4,a5,a6,a7){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5,a6,a7)}function _emscripten_asm_const_iiididi(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5)}function _emscripten_asm_const_iiii(code,a0,a1,a2){return ASM_CONSTS[code](a0,a1,a2)}function _emscripten_asm_const_iiiid(code,a0,a1,a2,a3){return ASM_CONSTS[code](a0,a1,a2,a3)}function _emscripten_asm_const_iiiiii(code,a0,a1,a2,a3,a4){return ASM_CONSTS[code](a0,a1,a2,a3,a4)}STATIC_BASE=Runtime.GLOBAL_BASE;STATICTOP=STATIC_BASE+12752;__ATINIT__.push({func:(function(){__GLOBAL__sub_I_nbind_cc()})},{func:(function(){__GLOBAL__sub_I_common_cc()})},{func:(function(){__GLOBAL__sub_I_Binding_cc()})});allocate([1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,192,127,0,0,192,127,3,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,3,0,0,0,0,0,192,127,3,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,0,0,128,191,0,0,128,191,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,232,3,0,0,232,3,0,0,0,0,192,127,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,192,127,3,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,192,18,0,0,202,18,0,0,210,18,0,0,154,18,0,0,168,18,0,0,180,18,0,0,139,45,0,0,140,45,0,0,141,45,0,0,140,45,0,0,141,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,2,0,0,0,5,0,0,0,142,45,0,0,140,45,0,0,140,45,0,0,140,45,0,0,140,45,0,0,140,45,0,0,140,45,0,0,143,45,0,0,144,45,0,0,140,45,0,0,140,45,0,0,141,45,0,0,145,45,0,0,144,45,0,0,184,4,0,0,3,0,0,0,146,45,0,0,200,4,0,0,147,45,0,0,2,0,0,0,148,45,0,0,200,4,0,0,147,45,0,0,144,45,0,0,200,4,0,0,144,45,0,0,200,4,0,0,147,45,0,0,140,45,0,0,141,45,0,0,140,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6,0,0,0,7,0,0,0,2,0,0,0,8,0,0,0,142,45,0,0,141,45,0,0,140,45,0,0,149,45,0,0,149,45,0,0,141,45,0,0,141,45,0,0,144,45,0,0,140,45,0,0,144,45,0,0,141,45,0,0,140,45,0,0,144,45,0,0,141,45,0,0,144,45,0,0,84,5,0,0,3,0,0,0,92,5,0,0,1,0,0,0,148,45,0,0,144,45,0,0,116,5,0,0,141,45,0,0,140,45,0,0,2,0,0,0,149,45,0,0,116,5,0,0,164,23,0,0,136,5,0,0,2,0,0,0,143,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,11,0,0,0,184,5,0,0,140,45,0,0,140,45,0,0,2,0,0,0,139,45,0,0,184,5,0,0,145,45,0,0,141,45,0,0,144,45,0,0,141,45,0,0,145,45,0,0,2,0,0,0,154,45,0,0,236,5,0,0,8,24,0,0,157,45,0,0,170,45,0,0,171,45,0,0,172,45,0,0,173,45,0,0,174,45,0,0,147,45,0,0,141,45,0,0,175,45,0,0,176,45,0,0,177,45,0,0,178,45,0,0,179,45,0,0,140,45,0,0,0,0,0,0,144,45,0,0,21,24,0,0,145,45,0,0,26,24,0,0,181,45,0,0,31,24,0,0,184,4,0,0,43,24,0,0,96,6,0,0,56,24,0,0,182,45,0,0,75,24,0,0,183,45,0,0,84,24,0,0,0,0,0,0,3,0,0,0,104,6,0,0,1,0,0,0,146,45,0,0,0,0,0,0,0,0,0,0,2,0,0,0,12,0,0,0,13,0,0,0,2,0,0,0,14,0,0,0,144,45,0,0,184,45,0,0,164,6,0,0,147,45,0,0,172,6,0,0,180,6,0,0,2,0,0,0,188,6,0,0,7,0,0,0,184,45,0,0,7,0,0,0,164,6,0,0,1,0,0,0,172,45,0,0,144,45,0,0,184,45,0,0,172,6,0,0,144,45,0,0,184,45,0,0,164,6,0,0,144,45,0,0,184,45,0,0,170,45,0,0,170,45,0,0,182,45,0,0,170,45,0,0,184,45,0,0,182,45,0,0,170,45,0,0,184,45,0,0,172,6,0,0,182,45,0,0,170,45,0,0,184,45,0,0,147,45,0,0,182,45,0,0,170,45,0,0,40,7,0,0,147,45,0,0,2,0,0,0,184,45,0,0,144,45,0,0,147,45,0,0,147,45,0,0,147,45,0,0,147,45,0,0,182,45,0,0,184,45,0,0,184,4,0,0,144,45,0,0,184,4,0,0,184,4,0,0,184,4,0,0,184,4,0,0,184,4,0,0,144,45,0,0,164,6,0,0,184,4,0,0,0,0,0,0,0,0,0,0,2,0,0,0,15,0,0,0,16,0,0,0,2,0,0,0,17,0,0,0,148,7,0,0,2,0,0,0,185,45,0,0,142,45,0,0,147,45,0,0,168,7,0,0,5,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,194,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,28,9,0,0,5,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,3,0,0,0,202,45,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,108,105,115,116,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,105,116,101,109,115,0,67,111,117,108,100,32,110,111,116,32,101,120,116,101,110,100,32,97,108,108,111,99,97,116,105,111,110,32,102,111,114,32,105,116,101,109,115,0,37,115,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,110,111,100,101,0,67,97,110,110,111,116,32,114,101,115,101,116,32,97,32,110,111,100,101,32,119,104,105,99,104,32,115,116,105,108,108,32,104,97,115,32,99,104,105,108,100,114,101,110,32,97,116,116,97,99,104,101,100,0,67,97,110,110,111,116,32,114,101,115,101,116,32,97,32,110,111,100,101,32,115,116,105,108,108,32,97,116,116,97,99,104,101,100,32,116,111,32,97,32,112,97,114,101,110,116,0,67,97,110,110,111,116,32,115,101,116,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,58,32,78,111,100,101,115,32,119,105,116,104,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,99,104,105,108,100,114,101,110,46,0,67,104,105,108,100,32,97,108,114,101,97,100,121,32,104,97,115,32,97,32,112,97,114,101,110,116,44,32,105,116,32,109,117,115,116,32,98,101,32,114,101,109,111,118,101,100,32,102,105,114,115,116,46,0,67,97,110,110,111,116,32,97,100,100,32,99,104,105,108,100,58,32,78,111,100,101,115,32,119,105,116,104,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,99,104,105,108,100,114,101,110,46,0,79,110,108,121,32,108,101,97,102,32,110,111,100,101,115,32,119,105,116,104,32,99,117,115,116,111,109,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,115,104,111,117,108,100,32,109,97,110,117,97,108,108,121,32,109,97,114,107,32,116,104,101,109,115,101,108,118,101,115,32,97,115,32,100,105,114,116,121,0,67,97,110,110,111,116,32,103,101,116,32,108,97,121,111,117,116,32,112,114,111,112,101,114,116,105,101,115,32,111,102,32,109,117,108,116,105,45,101,100,103,101,32,115,104,111,114,116,104,97,110,100,115,0,123,0,108,97,121,111,117,116,58,32,123,0,119,105,100,116,104,58,32,37,103,44,32,0,104,101,105,103,104,116,58,32,37,103,44,32,0,116,111,112,58,32,37,103,44,32,0,108,101,102,116,58,32,37,103,0,109,97,114,103,105,110,58,32,91,108,58,37,103,44,116,58,37,103,44,114,58,37,103,44,98,58,37,103,44,115,116,97,114,116,58,37,103,44,101,110,100,58,37,103,93,0,98,111,114,100,101,114,58,32,91,108,58,37,103,44,116,58,37,103,44,114,58,37,103,44,98,58,37,103,44,115,116,97,114,116,58,37,103,44,101,110,100,58,37,103,93,0,112,97,100,100,105,110,103,58,32,91,108,58,37,103,44,116,58,37,103,44,114,58,37,103,44,98,58,37,103,44,115,116,97,114,116,58,37,103,44,101,110,100,58,37,103,93,0,125,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,99,111,108,117,109,110,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,99,111,108,117,109,110,45,114,101,118,101,114,115,101,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,114,111,119,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,114,111,119,45,114,101,118,101,114,115,101,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,99,101,110,116,101,114,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,115,112,97,99,101,45,97,114,111,117,110,100,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,115,112,97,99,101,45,98,101,116,119,101,101,110,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,115,116,114,101,116,99,104,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,115,116,114,101,116,99,104,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,102,108,101,120,45,115,116,97,114,116,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,115,116,114,101,116,99,104,39,44,32,0,102,108,101,120,71,114,111,119,0,102,108,101,120,83,104,114,105,110,107,0,102,108,101,120,66,97,115,105,115,0,111,118,101,114,102,108,111,119,58,32,39,104,105,100,100,101,110,39,44,32,0,111,118,101,114,102,108,111,119,58,32,39,118,105,115,105,98,108,101,39,44,32,0,111,118,101,114,102,108,111,119,58,32,39,115,99,114,111,108,108,39,44,32,0,109,97,114,103,105,110,0,109,97,114,103,105,110,76,101,102,116,0,109,97,114,103,105,110,82,105,103,104,116,0,109,97,114,103,105,110,84,111,112,0,109,97,114,103,105,110,66,111,116,116,111,109,0,109,97,114,103,105,110,83,116,97,114,116,0,109,97,114,103,105,110,69,110,100,0,112,97,100,100,105,110,103,0,112,97,100,100,105,110,103,76,101,102,116,0,112,97,100,100,105,110,103,82,105,103,104,116,0,112,97,100,100,105,110,103,84,111,112,0,112,97,100,100,105,110,103,66,111,116,116,111,109,0,112,97,100,100,105,110,103,83,116,97,114,116,0,112,97,100,100,105,110,103,69,110,100,0,98,111,114,100,101,114,87,105,100,116,104,0,98,111,114,100,101,114,76,101,102,116,87,105,100,116,104,0,98,111,114,100,101,114,82,105,103,104,116,87,105,100,116,104,0,98,111,114,100,101,114,84,111,112,87,105,100,116,104,0,98,111,114,100,101,114,66,111,116,116,111,109,87,105,100,116,104,0,98,111,114,100,101,114,83,116,97,114,116,87,105,100,116,104,0,98,111,114,100,101,114,69,110,100,87,105,100,116,104,0,119,105,100,116,104,0,104,101,105,103,104,116,0,109,97,120,87,105,100,116,104,0,109,97,120,72,101,105,103,104,116,0,109,105,110,87,105,100,116,104,0,109,105,110,72,101,105,103,104,116,0,112,111,115,105,116,105,111,110,58,32,39,97,98,115,111,108,117,116,101,39,44,32,0,108,101,102,116,0,114,105,103,104,116,0,116,111,112,0,98,111,116,116,111,109,0,99,104,105,108,100,114,101,110,58,32,91,10,0,93,125,44,10,0,125,44,10,0,112,116,0,37,0,37,115,58,32,37,103,37,115,44,32,0,67,97,110,110,111,116,32,103,101,116,32,99,111,109,112,117,116,101,100,32,118,97,108,117,101,32,111,102,32,109,117,108,116,105,45,101,100,103,101,32,115,104,111,114,116,104,97,110,100,115,0,37,115,58,32,37,103,44,32,0,32,32,0,37,115,37,100,46,123,91,115,107,105,112,112,101,100,93,32,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,97,119,58,32,37,102,32,97,104,58,32,37,102,32,61,62,32,100,58,32,40,37,102,44,32,37,102,41,32,37,115,10,0,42,0,37,115,37,100,46,123,37,115,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,97,119,58,32,37,102,32,97,104,58,32,37,102,32,37,115,10,0,37,115,37,100,46,125,37,115,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,100,58,32,40,37,102,44,32,37,102,41,32,37,115,10,0,79,117,116,32,111,102,32,99,97,99,104,101,32,101,110,116,114,105,101,115,33,0,97,118,97,105,108,97,98,108,101,87,105,100,116,104,32,105,115,32,105,110,100,101,102,105,110,105,116,101,32,115,111,32,119,105,100,116,104,77,101,97,115,117,114,101,77,111,100,101,32,109,117,115,116,32,98,101,32,89,71,77,101,97,115,117,114,101,77,111,100,101,85,110,100,101,102,105,110,101,100,0,97,118,97,105,108,97,98,108,101,72,101,105,103,104,116,32,105,115,32,105,110,100,101,102,105,110,105,116,101,32,115,111,32,104,101,105,103,104,116,77,101,97,115,117,114,101,77,111,100,101,32,109,117,115,116,32,98,101,32,89,71,77,101,97,115,117,114,101,77,111,100,101,85,110,100,101,102,105,110,101,100,0,102,108,101,120,0,115,116,114,101,116,99,104,0,97,98,115,45,109,101,97,115,117,114,101,0,97,98,115,45,108,97,121,111,117,116,0,69,120,112,101,99,116,32,99,117,115,116,111,109,32,98,97,115,101,108,105,110,101,32,102,117,110,99,116,105,111,110,32,116,111,32,110,111,116,32,114,101,116,117,114,110,32,78,97,78,0,109,101,97,115,117,114,101,0,69,120,112,101,99,116,101,100,32,110,111,100,101,32,116,111,32,104,97,118,101,32,99,117,115,116,111,109,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,0,76,65,89,95,85,78,68,69,70,73,78,69,68,0,76,65,89,95,69,88,65,67,84,76,89,0,76,65,89,95,65,84,95,77,79,83,84,0,85,78,68,69,70,73,78,69,68,0,69,88,65,67,84,76,89,0,65,84,95,77,79,83,84,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,105,110,105,116,105,97,108,0,78,111,100,101,0,99,114,101,97,116,101,0,100,101,115,116,114,111,121,0,114,101,115,101,116,0,99,111,112,121,83,116,121,108,101,0,115,101,116,80,111,115,105,116,105,111,110,84,121,112,101,0,115,101,116,80,111,115,105,116,105,111,110,0,115,101,116,80,111,115,105,116,105,111,110,80,101,114,99,101,110,116,0,115,101,116,65,108,105,103,110,67,111,110,116,101,110,116,0,115,101,116,65,108,105,103,110,73,116,101,109,115,0,115,101,116,65,108,105,103,110,83,101,108,102,0,115,101,116,70,108,101,120,68,105,114,101,99,116,105,111,110,0,115,101,116,70,108,101,120,87,114,97,112,0,115,101,116,74,117,115,116,105,102,121,67,111,110,116,101,110,116,0,115,101,116,77,97,114,103,105,110,0,115,101,116,77,97,114,103,105,110,80,101,114,99,101,110,116,0,115,101,116,77,97,114,103,105,110,65,117,116,111,0,115,101,116,79,118,101,114,102,108,111,119,0,115,101,116,68,105,115,112,108,97,121,0,115,101,116,70,108,101,120,0,115,101,116,70,108,101,120,66,97,115,105,115,0,115,101,116,70,108,101,120,66,97,115,105,115,80,101,114,99,101,110,116,0,115,101,116,70,108,101,120,71,114,111,119,0,115,101,116,70,108,101,120,83,104,114,105,110,107,0,115,101,116,87,105,100,116,104,0,115,101,116,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,87,105,100,116,104,65,117,116,111,0,115,101,116,72,101,105,103,104,116,0,115,101,116,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,72,101,105,103,104,116,65,117,116,111,0,115,101,116,77,105,110,87,105,100,116,104,0,115,101,116,77,105,110,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,77,105,110,72,101,105,103,104,116,0,115,101,116,77,105,110,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,77,97,120,87,105,100,116,104,0,115,101,116,77,97,120,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,77,97,120,72,101,105,103,104,116,0,115,101,116,77,97,120,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,65,115,112,101,99,116,82,97,116,105,111,0,115,101,116,66,111,114,100,101,114,0,115,101,116,80,97,100,100,105,110,103,0,115,101,116,80,97,100,100,105,110,103,80,101,114,99,101,110,116,0,103,101,116,80,111,115,105,116,105,111,110,84,121,112,101,0,103,101,116,80,111,115,105,116,105,111,110,0,103,101,116,65,108,105,103,110,67,111,110,116,101,110,116,0,103,101,116,65,108,105,103,110,73,116,101,109,115,0,103,101,116,65,108,105,103,110,83,101,108,102,0,103,101,116,70,108,101,120,68,105,114,101,99,116,105,111,110,0,103,101,116,70,108,101,120,87,114,97,112,0,103,101,116,74,117,115,116,105,102,121,67,111,110,116,101,110,116,0,103,101,116,77,97,114,103,105,110,0,103,101,116,70,108,101,120,66,97,115,105,115,0,103,101,116,70,108,101,120,71,114,111,119,0,103,101,116,70,108,101,120,83,104,114,105,110,107,0,103,101,116,87,105,100,116,104,0,103,101,116,72,101,105,103,104,116,0,103,101,116,77,105,110,87,105,100,116,104,0,103,101,116,77,105,110,72,101,105,103,104,116,0,103,101,116,77,97,120,87,105,100,116,104,0,103,101,116,77,97,120,72,101,105,103,104,116,0,103,101,116,65,115,112,101,99,116,82,97,116,105,111,0,103,101,116,66,111,114,100,101,114,0,103,101,116,79,118,101,114,102,108,111,119,0,103,101,116,68,105,115,112,108,97,121,0,103,101,116,80,97,100,100,105,110,103,0,105,110,115,101,114,116,67,104,105,108,100,0,114,101,109,111,118,101,67,104,105,108,100,0,103,101,116,67,104,105,108,100,67,111,117,110,116,0,103,101,116,80,97,114,101,110,116,0,103,101,116,67,104,105,108,100,0,115,101,116,77,101,97,115,117,114,101,70,117,110,99,0,117,110,115,101,116,77,101,97,115,117,114,101,70,117,110,99,0,109,97,114,107,68,105,114,116,121,0,105,115,68,105,114,116,121,0,99,97,108,99,117,108,97,116,101,76,97,121,111,117,116,0,103,101,116,67,111,109,112,117,116,101,100,76,101,102,116,0,103,101,116,67,111,109,112,117,116,101,100,82,105,103,104,116,0,103,101,116,67,111,109,112,117,116,101,100,84,111,112,0,103,101,116,67,111,109,112,117,116,101,100,66,111,116,116,111,109,0,103,101,116,67,111,109,112,117,116,101,100,87,105,100,116,104,0,103,101,116,67,111,109,112,117,116,101,100,72,101,105,103,104,116,0,103,101,116,67,111,109,112,117,116,101,100,76,97,121,111,117,116,0,103,101,116,67,111,109,112,117,116,101,100,77,97,114,103,105,110,0,103,101,116,67,111,109,112,117,116,101,100,66,111,114,100,101,114,0,103,101,116,67,111,109,112,117,116,101,100,80,97,100,100,105,110,103,0,86,97,108,117,101,0,76,97,121,111,117,116,0,83,105,122,101,0,103,101,116,73,110,115,116,97,110,99,101,67,111,117,110,116,0,105,115,69,120,112,101,114,105,109,101,110,116,97,108,70,101,97,116,117,114,101,69,110,97,98,108,101,100,0,115,101,116,69,120,112,101,114,105,109,101,110,116,97,108,70,101,97,116,117,114,101,69,110,97,98,108,101,100,0,73,110,116,54,52,0,1,1,1,2,2,4,4,4,4,8,8,4,8,118,111,105,100,0,98,111,111,108,0,115,116,100,58,58,115,116,114,105,110,103,0,99,98,70,117,110,99,116,105,111,110,32,38,0,99,111,110,115,116,32,99,98,70,117,110,99,116,105,111,110,32,38,0,69,120,116,101,114,110,97,108,0,66,117,102,102,101,114,0,78,66,105,110,100,73,68,0,78,66,105,110,100,0,98,105,110,100,95,118,97,108,117,101,0,114,101,102,108,101,99,116,0,113,117,101,114,121,84,121,112,101,0,108,97,108,108,111,99,0,108,114,101,115,101,116,0,123,114,101,116,117,114,110,40,95,110,98,105,110,100,46,99,97,108,108,98,97,99,107,83,105,103,110,97,116,117,114,101,76,105,115,116,91,36,48,93,46,97,112,112,108,121,40,116,104,105,115,44,97,114,103,117,109,101,110,116,115,41,41,59,125,0,95,110,98,105,110,100,95,110,101,119,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,46,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111,99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110,0,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);var tempDoublePtr=STATICTOP;STATICTOP+=16;function _atexit(func,arg){__ATEXIT__.unshift({func:func,arg:arg})}function ___cxa_atexit(){return _atexit.apply(null,arguments)}Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;Module["_roundf"]=_roundf;Module["_memset"]=_memset;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function __decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r}function _defineHidden(value){return(function(target,key){Object.defineProperty(target,key,{configurable:false,enumerable:false,value:value,writable:true})})}var _nbind={};function __nbind_free_external(num){_nbind.externalList[num].dereference(num)}function __nbind_reference_external(num){_nbind.externalList[num].reference()}function _llvm_stackrestore(p){var self=_llvm_stacksave;var ret=self.LLVM_SAVEDSTACKS[p];self.LLVM_SAVEDSTACKS.splice(p,1);Runtime.stackRestore(ret)}function __nbind_register_pool(pageSize,usedPtr,rootPtr,pagePtr){_nbind.Pool.pageSize=pageSize;_nbind.Pool.usedPtr=usedPtr/4;_nbind.Pool.rootPtr=rootPtr;_nbind.Pool.pagePtr=pagePtr/4;HEAP32[usedPtr/4]=16909060;if(HEAP8[usedPtr]==1)_nbind.bigEndian=true;HEAP32[usedPtr/4]=0;_nbind.makeTypeKindTbl=(_a={},_a[1024]=_nbind.PrimitiveType,_a[64]=_nbind.Int64Type,_a[2048]=_nbind.BindClass,_a[3072]=_nbind.BindClassPtr,_a[4096]=_nbind.SharedClassPtr,_a[5120]=_nbind.ArrayType,_a[6144]=_nbind.ArrayType,_a[7168]=_nbind.CStringType,_a[9216]=_nbind.CallbackType,_a[10240]=_nbind.BindType,_a);_nbind.makeTypeNameTbl={"Buffer":_nbind.BufferType,"External":_nbind.ExternalType,"Int64":_nbind.Int64Type,"_nbind_new":_nbind.CreateValueType,"bool":_nbind.BooleanType,"cbFunction &":_nbind.CallbackType,"const cbFunction &":_nbind.CallbackType,"const std::string &":_nbind.StringType,"std::string":_nbind.StringType};Module["toggleLightGC"]=_nbind.toggleLightGC;_nbind.callUpcast=Module["dynCall_ii"];var globalScope=_nbind.makeType(_nbind.constructType,{flags:2048,id:0,name:""});globalScope.proto=Module;_nbind.BindClass.list.push(globalScope);var _a}function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setTimeout(){var timeUntilNextTick=Math.max(0,Browser.mainLoop.tickStartTime+value-_emscripten_get_now())|0;setTimeout(Browser.mainLoop.runner,timeUntilNextTick)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_rAF(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}else if(mode==2){if(!window["setImmediate"]){var setImmediates=[];var emscriptenMainLoopMessageId="setimmediate";function Browser_setImmediate_messageHandler(event){if(event.source===window&&event.data===emscriptenMainLoopMessageId){event.stopPropagation();setImmediates.shift()()}}window.addEventListener("message",Browser_setImmediate_messageHandler,true);window["setImmediate"]=function Browser_emulated_setImmediate(func){setImmediates.push(func);if(ENVIRONMENT_IS_WORKER){if(Module["setImmediates"]===undefined)Module["setImmediates"]=[];Module["setImmediates"].push(func);window.postMessage({target:emscriptenMainLoopMessageId})}else window.postMessage(emscriptenMainLoopMessageId,"*")}}Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setImmediate(){window["setImmediate"](Browser.mainLoop.runner)};Browser.mainLoop.method="immediate"}return 0}function _emscripten_get_now(){abort()}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop,arg,noSetTiming){Module["noExitRuntime"]=true;assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=func;Browser.mainLoop.arg=arg;var browserIterationFunc;if(typeof arg!=="undefined"){browserIterationFunc=(function(){Module["dynCall_vi"](func,arg)})}else{browserIterationFunc=(function(){Module["dynCall_v"](func)})}var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}console.log('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;setTimeout(Browser.mainLoop.runner,0);return}if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}else if(Browser.mainLoop.timingMode==0){Browser.mainLoop.tickStartTime=_emscripten_get_now()}if(Browser.mainLoop.method==="timeout"&&Module.ctx){Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");Browser.mainLoop.method=""}Browser.mainLoop.runIter(browserIterationFunc);if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;if(typeof SDL==="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(!noSetTiming){if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler()}if(simulateInfiniteLoop){throw"SimulateInfiniteLoop"}}var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:(function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++}),resume:(function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;_emscripten_set_main_loop(func,0,false,Browser.mainLoop.arg,true);_emscripten_set_main_loop_timing(timingMode,timingValue);Browser.mainLoop.scheduler()}),updateStatus:(function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}}),runIter:(function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}try{func()}catch(e){if(e instanceof ExitStatus){return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}if(Module["postMainLoop"])Module["postMainLoop"]()})},isFullscreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:(function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==="undefined"){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([(new Uint8Array(byteArray)).buffer],{type:Browser.getMimetype(name)})}}catch(e){Runtime.warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append((new Uint8Array(byteArray)).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=function img_onload(){assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)};img.onerror=function img_onerror(event){console.log("Image "+url+" could not be decoded");if(onerror)onerror()};img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",(function(){finish(audio)}),false);audio.onerror=function audio_onerror(event){if(done)return;console.log("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;Browser.safeSetTimeout((function(){finish(audio)}),1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===Module["canvas"]||document["mozPointerLockElement"]===Module["canvas"]||document["webkitPointerLockElement"]===Module["canvas"]||document["msPointerLockElement"]===Module["canvas"]}var canvas=Module["canvas"];if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||(function(){});canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||(function(){});canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",(function(ev){if(!Browser.pointerLock&&Module["canvas"].requestPointerLock){Module["canvas"].requestPointerLock();ev.preventDefault()}}),false)}}}),createContext:(function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx==="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach((function(callback){callback()}));Browser.init()}return ctx}),destroyContext:(function(canvas,useWebGL,setInModule){}),fullscreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullscreen:(function(lockPointer,resizeCanvas,vrDevice){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;Browser.vrDevice=vrDevice;if(typeof Browser.lockPointer==="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas==="undefined")Browser.resizeCanvas=false;if(typeof Browser.vrDevice==="undefined")Browser.vrDevice=null;var canvas=Module["canvas"];function fullscreenChange(){Browser.isFullscreen=false;var canvasContainer=canvas.parentNode;if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.exitFullscreen=document["exitFullscreen"]||document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["msExitFullscreen"]||document["webkitCancelFullScreen"]||(function(){});canvas.exitFullscreen=canvas.exitFullscreen.bind(document);if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullscreen=true;if(Browser.resizeCanvas)Browser.setFullscreenCanvasSize()}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas)Browser.setWindowedCanvasSize()}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullscreen);if(Module["onFullscreen"])Module["onFullscreen"](Browser.isFullscreen);Browser.updateCanvasDimensions(canvas)}if(!Browser.fullscreenHandlersInstalled){Browser.fullscreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullscreenChange,false);document.addEventListener("mozfullscreenchange",fullscreenChange,false);document.addEventListener("webkitfullscreenchange",fullscreenChange,false);document.addEventListener("MSFullscreenChange",fullscreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullscreen=canvasContainer["requestFullscreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullscreen"]?(function(){canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null)||(canvasContainer["webkitRequestFullScreen"]?(function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null);if(vrDevice){canvasContainer.requestFullscreen({vrDisplay:vrDevice})}else{canvasContainer.requestFullscreen()}}),requestFullScreen:(function(lockPointer,resizeCanvas,vrDevice){Module.printErr("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");Browser.requestFullScreen=(function(lockPointer,resizeCanvas,vrDevice){return Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)});return Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)}),nextRAF:0,fakeRequestAnimationFrame:(function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)}),requestAnimationFrame:function requestAnimationFrame(func){if(typeof window==="undefined"){Browser.fakeRequestAnimationFrame(func)}else{if(!window.requestAnimationFrame){window.requestAnimationFrame=window["requestAnimationFrame"]||window["mozRequestAnimationFrame"]||window["webkitRequestAnimationFrame"]||window["msRequestAnimationFrame"]||window["oRequestAnimationFrame"]||Browser.fakeRequestAnimationFrame}window.requestAnimationFrame(func)}},safeCallback:(function(func){return(function(){if(!ABORT)return func.apply(null,arguments)})}),allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=false}),resumeAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=true;if(Browser.queuedAsyncCallbacks.length>0){var callbacks=Browser.queuedAsyncCallbacks;Browser.queuedAsyncCallbacks=[];callbacks.forEach((function(func){func()}))}}),safeRequestAnimationFrame:(function(func){return Browser.requestAnimationFrame((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}))}),safeSetTimeout:(function(func,timeout){Module["noExitRuntime"]=true;return setTimeout((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}),timeout)}),safeSetInterval:(function(func,timeout){Module["noExitRuntime"]=true;return setInterval((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}}),timeout)}),getMimetype:(function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]}),getUserMedia:(function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)}),getMovementX:(function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0}),getMovementY:(function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0}),getMouseWheelDelta:(function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail;break;case"mousewheel":delta=event.wheelDelta;break;case"wheel":delta=event["deltaY"];break;default:throw"unrecognized mouse wheel event: "+event.type}return delta}),mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:(function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!=="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!=="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){var last=Browser.touches[touch.identifier];if(!last)last=coords;Browser.lastTouches[touch.identifier]=last;Browser.touches[touch.identifier]=coords}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}}),asyncLoad:(function(url,onload,onerror,noRunDep){var dep=!noRunDep?getUniqueRunDependency("al "+url):"";Module["readAsync"](url,(function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency(dep)}),(function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}}));if(dep)addRunDependency(dep)}),resizeListeners:[],updateResizeListeners:(function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach((function(listener){listener(canvas.width,canvas.height)}))}),setCanvasSize:(function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()}),windowedWidth:0,windowedHeight:0,setFullscreenCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags|8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),setWindowedCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags&~8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),updateCanvasDimensions:(function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["fullscreenElement"]||document["mozFullScreenElement"]||document["msFullscreenElement"]||document["webkitFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}}),wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:(function(){var handle=Browser.nextWgetRequestHandle;Browser.nextWgetRequestHandle++;return handle})};var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}Module["_bitshift64Lshr"]=_bitshift64Lshr;function _typeModule(self){var structureList=[[0,1,"X"],[1,1,"const X"],[128,1,"X *"],[256,1,"X &"],[384,1,"X &&"],[512,1,"std::shared_ptr<X>"],[640,1,"std::unique_ptr<X>"],[5120,1,"std::vector<X>"],[6144,2,"std::array<X, Y>"],[9216,-1,"std::function<X (Y)>"]];function applyStructure(outerName,outerFlags,innerName,innerFlags,param,flip){if(outerFlags==1){var ref=innerFlags&896;if(ref==128||ref==256||ref==384)outerName="X const"}var name;if(flip){name=innerName.replace("X",outerName).replace("Y",param)}else{name=outerName.replace("X",innerName).replace("Y",param)}return name.replace(/([*&]) (?=[*&])/g,"$1")}function reportProblem(problem,id,kind,structureType,place){throw new Error(problem+" type "+kind.replace("X",id+"?")+(structureType?" with flag "+structureType:"")+" in "+place)}function getComplexType(id,constructType,getType,queryType,place,kind,prevStructure,depth){if(kind===void 0){kind="X"}if(depth===void 0){depth=1}var result=getType(id);if(result)return result;var query=queryType(id);var structureType=query.placeholderFlag;var structure=structureList[structureType];if(prevStructure&&structure){kind=applyStructure(prevStructure[2],prevStructure[0],kind,structure[0],"?",true)}var problem;if(structureType==0)problem="Unbound";if(structureType>=10)problem="Corrupt";if(depth>20)problem="Deeply nested";if(problem)reportProblem(problem,id,kind,structureType,place||"?");var subId=query.paramList[0];var subType=getComplexType(subId,constructType,getType,queryType,place,kind,structure,depth+1);var srcSpec;var spec={flags:structure[0],id:id,name:"",paramList:[subType]};var argList=[];var structureParam="?";switch(query.placeholderFlag){case 1:srcSpec=subType.spec;break;case 2:if((subType.flags&15360)==1024&&subType.spec.ptrSize==1){spec.flags=7168;break};case 3:case 6:case 5:srcSpec=subType.spec;if((subType.flags&15360)!=2048){}break;case 8:structureParam=""+query.paramList[1];spec.paramList.push(query.paramList[1]);break;case 9:for(var _i=0,_a=query.paramList[1];_i<_a.length;_i++){var paramId=_a[_i];var paramType=getComplexType(paramId,constructType,getType,queryType,place,kind,structure,depth+1);argList.push(paramType.name);spec.paramList.push(paramType)}structureParam=argList.join(", ");break;default:break}spec.name=applyStructure(structure[2],structure[0],subType.name,subType.flags,structureParam);if(srcSpec){for(var _b=0,_c=Object.keys(srcSpec);_b<_c.length;_b++){var key=_c[_b];spec[key]=spec[key]||srcSpec[key]}spec.flags|=srcSpec.flags}return makeType(constructType,spec)}function makeType(constructType,spec){var flags=spec.flags;var refKind=flags&896;var kind=flags&15360;if(!spec.name&&kind==1024){if(spec.ptrSize==1){spec.name=(flags&16?"":(flags&8?"un":"")+"signed ")+"char"}else{spec.name=(flags&8?"u":"")+(flags&32?"float":"int")+(spec.ptrSize*8+"_t")}}if(spec.ptrSize==8&&!(flags&32))kind=64;if(kind==2048){if(refKind==512||refKind==640){kind=4096}else if(refKind)kind=3072}return constructType(kind,spec)}var Type=(function(){function Type(spec){this.id=spec.id;this.name=spec.name;this.flags=spec.flags;this.spec=spec}Type.prototype.toString=(function(){return this.name});return Type})();var output={Type:Type,getComplexType:getComplexType,makeType:makeType,structureList:structureList};self.output=output;return self.output||output}function __nbind_register_type(id,namePtr){var name=_nbind.readAsciiString(namePtr);var spec={flags:10240,id:id,name:name};_nbind.makeType(_nbind.constructType,spec)}function __nbind_register_callback_signature(typeListPtr,typeCount){var typeList=_nbind.readTypeIdList(typeListPtr,typeCount);var num=_nbind.callbackSignatureList.length;_nbind.callbackSignatureList[num]=_nbind.makeJSCaller(typeList);return num}function __extends(Class,Parent){for(var key in Parent)if(Parent.hasOwnProperty(key))Class[key]=Parent[key];function Base(){this.constructor=Class}Base.prototype=Parent.prototype;Class.prototype=new Base}function __nbind_register_class(idListPtr,policyListPtr,superListPtr,upcastListPtr,superCount,destructorPtr,namePtr){var name=_nbind.readAsciiString(namePtr);var policyTbl=_nbind.readPolicyList(policyListPtr);var idList=HEAPU32.subarray(idListPtr/4,idListPtr/4+2);var spec={flags:2048|(policyTbl["Value"]?2:0),id:idList[0],name:name};var bindClass=_nbind.makeType(_nbind.constructType,spec);bindClass.ptrType=_nbind.getComplexType(idList[1],_nbind.constructType,_nbind.getType,_nbind.queryType);bindClass.destroy=_nbind.makeMethodCaller(bindClass.ptrType,{boundID:spec.id,flags:0,name:"destroy",num:0,ptr:destructorPtr,title:bindClass.name+".free",typeList:["void","uint32_t","uint32_t"]});if(superCount){bindClass.superIdList=Array.prototype.slice.call(HEAPU32.subarray(superListPtr/4,superListPtr/4+superCount));bindClass.upcastList=Array.prototype.slice.call(HEAPU32.subarray(upcastListPtr/4,upcastListPtr/4+superCount))}Module[bindClass.name]=bindClass.makeBound(policyTbl);_nbind.BindClass.list.push(bindClass)}function _removeAccessorPrefix(name){var prefixMatcher=/^[Gg]et_?([A-Z]?([A-Z]?))/;return name.replace(prefixMatcher,(function(match,initial,second){return second?initial:initial.toLowerCase()}))}function __nbind_register_function(boundID,policyListPtr,typeListPtr,typeCount,ptr,direct,signatureType,namePtr,num,flags){var bindClass=_nbind.getType(boundID);var policyTbl=_nbind.readPolicyList(policyListPtr);var typeList=_nbind.readTypeIdList(typeListPtr,typeCount);var specList;if(signatureType==5){specList=[{direct:ptr,name:"__nbindConstructor",ptr:0,title:bindClass.name+" constructor",typeList:["uint32_t"].concat(typeList.slice(1))},{direct:direct,name:"__nbindValueConstructor",ptr:0,title:bindClass.name+" value constructor",typeList:["void","uint32_t"].concat(typeList.slice(1))}]}else{var name=_nbind.readAsciiString(namePtr);var title=(bindClass.name&&bindClass.name+".")+name;if(signatureType==3||signatureType==4){name=_removeAccessorPrefix(name)}specList=[{boundID:boundID,direct:direct,name:name,ptr:ptr,title:title,typeList:typeList}]}for(var _i=0,specList_1=specList;_i<specList_1.length;_i++){var spec=specList_1[_i];spec.signatureType=signatureType;spec.policyTbl=policyTbl;spec.num=num;spec.flags=flags;bindClass.addMethod(spec)}}function _nbind_value(name,proto){if(!_nbind.typeNameTbl[name])_nbind.throwError("Unknown value type "+name);Module["NBind"].bind_value(name,proto);_defineHidden(_nbind.typeNameTbl[name].proto.prototype.__nbindValueConstructor)(proto.prototype,"__nbindValueConstructor")}Module["_nbind_value"]=_nbind_value;function __nbind_get_value_object(num,ptr){var obj=_nbind.popValue(num);if(!obj.fromJS){throw new Error("Object "+obj+" has no fromJS function")}obj.fromJS((function(){obj.__nbindValueConstructor.apply(this,Array.prototype.concat.apply([ptr],arguments))}))}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;function __nbind_register_primitive(id,size,flags){var spec={flags:1024|flags,id:id,ptrSize:size};_nbind.makeType(_nbind.constructType,spec)}var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);Module["_llvm_cttz_i32"]=_llvm_cttz_i32;Module["___udivmoddi4"]=___udivmoddi4;Module["___udivdi3"]=___udivdi3;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}Module["_sbrk"]=_sbrk;function _llvm_stacksave(){var self=_llvm_stacksave;if(!self.LLVM_SAVEDSTACKS){self.LLVM_SAVEDSTACKS=[]}self.LLVM_SAVEDSTACKS.push(Runtime.stackSave());return self.LLVM_SAVEDSTACKS.length-1}Module["___uremdi3"]=___uremdi3;Module["_llvm_bswap_i32"]=_llvm_bswap_i32;function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];___syscall146.printChar=(function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}})}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function __nbind_finish(){for(var _i=0,_a=_nbind.BindClass.list;_i<_a.length;_i++){var bindClass=_a[_i];bindClass.finish()}}var ___dso_handle=STATICTOP;STATICTOP+=16;((function(_nbind){var typeIdTbl={};_nbind.typeNameTbl={};var Pool=(function(){function Pool(){}Pool.lalloc=(function(size){size=size+7&~7;var used=HEAPU32[Pool.usedPtr];if(size>Pool.pageSize/2||size>Pool.pageSize-used){var NBind=_nbind.typeNameTbl["NBind"].proto;return NBind.lalloc(size)}else{HEAPU32[Pool.usedPtr]=used+size;return Pool.rootPtr+used}});Pool.lreset=(function(used,page){var topPage=HEAPU32[Pool.pagePtr];if(topPage){var NBind=_nbind.typeNameTbl["NBind"].proto;NBind.lreset(used,page)}else{HEAPU32[Pool.usedPtr]=used}});return Pool})();_nbind.Pool=Pool;function constructType(kind,spec){var construct=kind==10240?_nbind.makeTypeNameTbl[spec.name]||_nbind.BindType:_nbind.makeTypeKindTbl[kind];var bindType=new construct(spec);typeIdTbl[spec.id]=bindType;_nbind.typeNameTbl[spec.name]=bindType;return bindType}_nbind.constructType=constructType;function getType(id){return typeIdTbl[id]}_nbind.getType=getType;function queryType(id){var placeholderFlag=HEAPU8[id];var paramCount=_nbind.structureList[placeholderFlag][1];id/=4;if(paramCount<0){++id;paramCount=HEAPU32[id]+1}var paramList=Array.prototype.slice.call(HEAPU32.subarray(id+1,id+1+paramCount));if(placeholderFlag==9){paramList=[paramList[0],paramList.slice(1)]}return{paramList:paramList,placeholderFlag:placeholderFlag}}_nbind.queryType=queryType;function getTypes(idList,place){return idList.map((function(id){return typeof id=="number"?_nbind.getComplexType(id,constructType,getType,queryType,place):_nbind.typeNameTbl[id]}))}_nbind.getTypes=getTypes;function readTypeIdList(typeListPtr,typeCount){return Array.prototype.slice.call(HEAPU32,typeListPtr/4,typeListPtr/4+typeCount)}_nbind.readTypeIdList=readTypeIdList;function readAsciiString(ptr){var endPtr=ptr;while(HEAPU8[endPtr++]);return String.fromCharCode.apply("",HEAPU8.subarray(ptr,endPtr-1))}_nbind.readAsciiString=readAsciiString;function readPolicyList(policyListPtr){var policyTbl={};if(policyListPtr){while(1){var namePtr=HEAPU32[policyListPtr/4];if(!namePtr)break;policyTbl[readAsciiString(namePtr)]=true;policyListPtr+=4}}return policyTbl}_nbind.readPolicyList=readPolicyList;function getDynCall(typeList,name){var mangleMap={float32_t:"d",float64_t:"d",int64_t:"d",uint64_t:"d","void":"v"};var signature=typeList.map((function(type){return mangleMap[type.name]||"i"})).join("");var dynCall=Module["dynCall_"+signature];if(!dynCall){throw new Error("dynCall_"+signature+" not found for "+name+"("+typeList.map((function(type){return type.name})).join(", ")+")")}return dynCall}_nbind.getDynCall=getDynCall;function addMethod(obj,name,func,arity){var overload=obj[name];if(obj.hasOwnProperty(name)&&overload){if(overload.arity||overload.arity===0){overload=_nbind.makeOverloader(overload,overload.arity);obj[name]=overload}overload.addMethod(func,arity)}else{func.arity=arity;obj[name]=func}}_nbind.addMethod=addMethod;function throwError(message){throw new Error(message)}_nbind.throwError=throwError;_nbind.bigEndian=false;_a=_typeModule(_typeModule),_nbind.Type=_a.Type,_nbind.makeType=_a.makeType,_nbind.getComplexType=_a.getComplexType,_nbind.structureList=_a.structureList;var BindType=(function(_super){__extends(BindType,_super);function BindType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.heap=HEAPU32;_this.ptrSize=4;return _this}BindType.prototype.needsWireRead=(function(policyTbl){return!!this.wireRead||!!this.makeWireRead});BindType.prototype.needsWireWrite=(function(policyTbl){return!!this.wireWrite||!!this.makeWireWrite});return BindType})(_nbind.Type);_nbind.BindType=BindType;var PrimitiveType=(function(_super){__extends(PrimitiveType,_super);function PrimitiveType(spec){var _this=_super.call(this,spec)||this;var heapTbl=spec.flags&32?{32:HEAPF32,64:HEAPF64}:spec.flags&8?{8:HEAPU8,16:HEAPU16,32:HEAPU32}:{8:HEAP8,16:HEAP16,32:HEAP32};_this.heap=heapTbl[spec.ptrSize*8];_this.ptrSize=spec.ptrSize;return _this}PrimitiveType.prototype.needsWireWrite=(function(policyTbl){return!!policyTbl&&!!policyTbl["Strict"]});PrimitiveType.prototype.makeWireWrite=(function(expr,policyTbl){return policyTbl&&policyTbl["Strict"]&&(function(arg){if(typeof arg=="number")return arg;throw new Error("Type mismatch")})});return PrimitiveType})(BindType);_nbind.PrimitiveType=PrimitiveType;function pushCString(str,policyTbl){if(str===null||str===undefined){if(policyTbl&&policyTbl["Nullable"]){return 0}else throw new Error("Type mismatch")}if(policyTbl&&policyTbl["Strict"]){if(typeof str!="string")throw new Error("Type mismatch")}else str=str.toString();var length=Module.lengthBytesUTF8(str)+1;var result=_nbind.Pool.lalloc(length);Module.stringToUTF8Array(str,HEAPU8,result,length);return result}_nbind.pushCString=pushCString;function popCString(ptr){if(ptr===0)return null;return Module.Pointer_stringify(ptr)}_nbind.popCString=popCString;var CStringType=(function(_super){__extends(CStringType,_super);function CStringType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popCString;_this.wireWrite=pushCString;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}CStringType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushCString(arg,policyTbl)})});return CStringType})(BindType);_nbind.CStringType=CStringType;var BooleanType=(function(_super){__extends(BooleanType,_super);function BooleanType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=(function(arg){return!!arg});return _this}BooleanType.prototype.needsWireWrite=(function(policyTbl){return!!policyTbl&&!!policyTbl["Strict"]});BooleanType.prototype.makeWireRead=(function(expr){return"!!("+expr+")"});BooleanType.prototype.makeWireWrite=(function(expr,policyTbl){return policyTbl&&policyTbl["Strict"]&&(function(arg){if(typeof arg=="boolean")return arg;throw new Error("Type mismatch")})||expr});return BooleanType})(BindType);_nbind.BooleanType=BooleanType;var Wrapper=(function(){function Wrapper(){}Wrapper.prototype.persist=(function(){this.__nbindState|=1});return Wrapper})();_nbind.Wrapper=Wrapper;function makeBound(policyTbl,bindClass){var Bound=(function(_super){__extends(Bound,_super);function Bound(marker,flags,ptr,shared){var _this=_super.call(this)||this;if(!(_this instanceof Bound)){return new(Function.prototype.bind.apply(Bound,Array.prototype.concat.apply([null],arguments)))}var nbindFlags=flags;var nbindPtr=ptr;var nbindShared=shared;if(marker!==_nbind.ptrMarker){var wirePtr=_this.__nbindConstructor.apply(_this,arguments);nbindFlags=4096|512;nbindShared=HEAPU32[wirePtr/4];nbindPtr=HEAPU32[wirePtr/4+1]}var spec={configurable:true,enumerable:false,value:null,writable:false};var propTbl={"__nbindFlags":nbindFlags,"__nbindPtr":nbindPtr};if(nbindShared){propTbl["__nbindShared"]=nbindShared;_nbind.mark(_this)}for(var _i=0,_a=Object.keys(propTbl);_i<_a.length;_i++){var key=_a[_i];spec.value=propTbl[key];Object.defineProperty(_this,key,spec)}_defineHidden(0)(_this,"__nbindState");return _this}Bound.prototype.free=(function(){bindClass.destroy.call(this,this.__nbindShared,this.__nbindFlags);this.__nbindState|=2;disableMember(this,"__nbindShared");disableMember(this,"__nbindPtr")});return Bound})(Wrapper);__decorate([_defineHidden()],Bound.prototype,"__nbindConstructor",void 0);__decorate([_defineHidden()],Bound.prototype,"__nbindValueConstructor",void 0);__decorate([_defineHidden(policyTbl)],Bound.prototype,"__nbindPolicies",void 0);return Bound}_nbind.makeBound=makeBound;function disableMember(obj,name){function die(){throw new Error("Accessing deleted object")}Object.defineProperty(obj,name,{configurable:false,enumerable:false,get:die,set:die})}_nbind.ptrMarker={};var BindClass=(function(_super){__extends(BindClass,_super);function BindClass(spec){var _this=_super.call(this,spec)||this;_this.wireRead=(function(arg){return _nbind.popValue(arg,_this.ptrType)});_this.wireWrite=(function(arg){return pushPointer(arg,_this.ptrType,true)});_this.pendingSuperCount=0;_this.ready=false;_this.methodTbl={};if(spec.paramList){_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto}else _this.classType=_this;return _this}BindClass.prototype.makeBound=(function(policyTbl){var Bound=_nbind.makeBound(policyTbl,this);this.proto=Bound;this.ptrType.proto=Bound;return Bound});BindClass.prototype.addMethod=(function(spec){var overloadList=this.methodTbl[spec.name]||[];overloadList.push(spec);this.methodTbl[spec.name]=overloadList});BindClass.prototype.registerMethods=(function(src,staticOnly){var setter;for(var _i=0,_a=Object.keys(src.methodTbl);_i<_a.length;_i++){var name=_a[_i];var overloadList=src.methodTbl[name];for(var _b=0,overloadList_1=overloadList;_b<overloadList_1.length;_b++){var spec=overloadList_1[_b];var target=void 0;var caller=void 0;target=this.proto.prototype;if(staticOnly&&spec.signatureType!=1)continue;switch(spec.signatureType){case 1:target=this.proto;case 5:caller=_nbind.makeCaller(spec);_nbind.addMethod(target,spec.name,caller,spec.typeList.length-1);break;case 4:setter=_nbind.makeMethodCaller(src.ptrType,spec);break;case 3:Object.defineProperty(target,spec.name,{configurable:true,enumerable:false,get:_nbind.makeMethodCaller(src.ptrType,spec),set:setter});break;case 2:caller=_nbind.makeMethodCaller(src.ptrType,spec);_nbind.addMethod(target,spec.name,caller,spec.typeList.length-1);break;default:break}}}});BindClass.prototype.registerSuperMethods=(function(src,firstSuper,visitTbl){if(visitTbl[src.name])return;visitTbl[src.name]=true;var superNum=0;var nextFirst;for(var _i=0,_a=src.superIdList||[];_i<_a.length;_i++){var superId=_a[_i];var superClass=_nbind.getType(superId);if(superNum++<firstSuper||firstSuper<0){nextFirst=-1}else{nextFirst=0}this.registerSuperMethods(superClass,nextFirst,visitTbl)}this.registerMethods(src,firstSuper<0)});BindClass.prototype.finish=(function(){if(this.ready)return this;this.ready=true;this.superList=(this.superIdList||[]).map((function(superId){return _nbind.getType(superId).finish()}));var Bound=this.proto;if(this.superList.length){var Proto=(function(){this.constructor=Bound});Proto.prototype=this.superList[0].proto.prototype;Bound.prototype=new Proto}if(Bound!=Module)Bound.prototype.__nbindType=this;this.registerSuperMethods(this,1,{});return this});BindClass.prototype.upcastStep=(function(dst,ptr){if(dst==this)return ptr;for(var i=0;i<this.superList.length;++i){var superPtr=this.superList[i].upcastStep(dst,_nbind.callUpcast(this.upcastList[i],ptr));if(superPtr)return superPtr}return 0});return BindClass})(_nbind.BindType);BindClass.list=[];_nbind.BindClass=BindClass;function popPointer(ptr,type){return ptr?new type.proto(_nbind.ptrMarker,type.flags,ptr):null}_nbind.popPointer=popPointer;function pushPointer(obj,type,tryValue){if(!(obj instanceof _nbind.Wrapper)){if(tryValue){return _nbind.pushValue(obj)}else throw new Error("Type mismatch")}var ptr=obj.__nbindPtr;var objType=obj.__nbindType.classType;var classType=type.classType;if(obj instanceof type.proto){while(objType!=classType){ptr=_nbind.callUpcast(objType.upcastList[0],ptr);objType=objType.superList[0]}}else{ptr=objType.upcastStep(classType,ptr);if(!ptr)throw new Error("Type mismatch")}return ptr}_nbind.pushPointer=pushPointer;function pushMutablePointer(obj,type){var ptr=pushPointer(obj,type);if(obj.__nbindFlags&1){throw new Error("Passing a const value as a non-const argument")}return ptr}var BindClassPtr=(function(_super){__extends(BindClassPtr,_super);function BindClassPtr(spec){var _this=_super.call(this,spec)||this;_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto;var isConst=spec.flags&1;var isValue=(_this.flags&896)==256&&spec.flags&2;var push=isConst?pushPointer:pushMutablePointer;var pop=isValue?_nbind.popValue:popPointer;_this.makeWireWrite=(function(expr,policyTbl){return policyTbl["Nullable"]?(function(arg){return arg?push(arg,_this):0}):(function(arg){return push(arg,_this)})});_this.wireRead=(function(arg){return pop(arg,_this)});_this.wireWrite=(function(arg){return push(arg,_this)});return _this}return BindClassPtr})(_nbind.BindType);_nbind.BindClassPtr=BindClassPtr;function popShared(ptr,type){var shared=HEAPU32[ptr/4];var unsafe=HEAPU32[ptr/4+1];return unsafe?new type.proto(_nbind.ptrMarker,type.flags,unsafe,shared):null}_nbind.popShared=popShared;function pushShared(obj,type){if(!(obj instanceof type.proto))throw new Error("Type mismatch");return obj.__nbindShared}function pushMutableShared(obj,type){if(!(obj instanceof type.proto))throw new Error("Type mismatch");if(obj.__nbindFlags&1){throw new Error("Passing a const value as a non-const argument")}return obj.__nbindShared}var SharedClassPtr=(function(_super){__extends(SharedClassPtr,_super);function SharedClassPtr(spec){var _this=_super.call(this,spec)||this;_this.readResources=[_nbind.resources.pool];_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto;var isConst=spec.flags&1;var push=isConst?pushShared:pushMutableShared;_this.wireRead=(function(arg){return popShared(arg,_this)});_this.wireWrite=(function(arg){return push(arg,_this)});return _this}return SharedClassPtr})(_nbind.BindType);_nbind.SharedClassPtr=SharedClassPtr;_nbind.externalList=[0];var firstFreeExternal=0;var External=(function(){function External(data){this.refCount=1;this.data=data}External.prototype.register=(function(){var num=firstFreeExternal;if(num){firstFreeExternal=_nbind.externalList[num]}else num=_nbind.externalList.length;_nbind.externalList[num]=this;return num});External.prototype.reference=(function(){++this.refCount});External.prototype.dereference=(function(num){if(--this.refCount==0){if(this.free)this.free();_nbind.externalList[num]=firstFreeExternal;firstFreeExternal=num}});return External})();_nbind.External=External;function popExternal(num){var obj=_nbind.externalList[num];obj.dereference(num);return obj.data}function pushExternal(obj){var external=new External(obj);external.reference();return external.register()}var ExternalType=(function(_super){__extends(ExternalType,_super);function ExternalType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popExternal;_this.wireWrite=pushExternal;return _this}return ExternalType})(_nbind.BindType);_nbind.ExternalType=ExternalType;_nbind.callbackSignatureList=[];var CallbackType=(function(_super){__extends(CallbackType,_super);function CallbackType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=(function(func){if(typeof func!="function")_nbind.throwError("Type mismatch");return(new _nbind.External(func)).register()});return _this}return CallbackType})(_nbind.BindType);_nbind.CallbackType=CallbackType;_nbind.valueList=[0];var firstFreeValue=0;function pushValue(value){var num=firstFreeValue;if(num){firstFreeValue=_nbind.valueList[num]}else num=_nbind.valueList.length;_nbind.valueList[num]=value;return num*2+1}_nbind.pushValue=pushValue;function popValue(num,type){if(!num)_nbind.throwError("Value type JavaScript class is missing or not registered");if(num&1){num>>=1;var obj=_nbind.valueList[num];_nbind.valueList[num]=firstFreeValue;firstFreeValue=num;return obj}else if(type){return _nbind.popShared(num,type)}else throw new Error("Invalid value slot "+num)}_nbind.popValue=popValue;var valueBase=0x10000000000000000;function push64(num){if(typeof num=="number")return num;return pushValue(num)*4096+valueBase}function pop64(num){if(num<valueBase)return num;return popValue((num-valueBase)/4096)}var CreateValueType=(function(_super){__extends(CreateValueType,_super);function CreateValueType(){return _super!==null&&_super.apply(this,arguments)||this}CreateValueType.prototype.makeWireWrite=(function(expr){return"(_nbind.pushValue(new "+expr+"))"});return CreateValueType})(_nbind.BindType);_nbind.CreateValueType=CreateValueType;var Int64Type=(function(_super){__extends(Int64Type,_super);function Int64Type(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=push64;_this.wireRead=pop64;return _this}return Int64Type})(_nbind.BindType);_nbind.Int64Type=Int64Type;function pushArray(arr,type){if(!arr)return 0;var length=arr.length;if((type.size||type.size===0)&&length<type.size){throw new Error("Type mismatch")}var ptrSize=type.memberType.ptrSize;var result=_nbind.Pool.lalloc(4+length*ptrSize);HEAPU32[result/4]=length;var heap=type.memberType.heap;var ptr=(result+4)/ptrSize;var wireWrite=type.memberType.wireWrite;var num=0;if(wireWrite){while(num<length){heap[ptr++]=wireWrite(arr[num++])}}else{while(num<length){heap[ptr++]=arr[num++]}}return result}_nbind.pushArray=pushArray;function popArray(ptr,type){if(ptr===0)return null;var length=HEAPU32[ptr/4];var arr=new Array(length);var heap=type.memberType.heap;ptr=(ptr+4)/type.memberType.ptrSize;var wireRead=type.memberType.wireRead;var num=0;if(wireRead){while(num<length){arr[num++]=wireRead(heap[ptr++])}}else{while(num<length){arr[num++]=heap[ptr++]}}return arr}_nbind.popArray=popArray;var ArrayType=(function(_super){__extends(ArrayType,_super);function ArrayType(spec){var _this=_super.call(this,spec)||this;_this.wireRead=(function(arg){return popArray(arg,_this)});_this.wireWrite=(function(arg){return pushArray(arg,_this)});_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];_this.memberType=spec.paramList[0];if(spec.paramList[1])_this.size=spec.paramList[1];return _this}return ArrayType})(_nbind.BindType);_nbind.ArrayType=ArrayType;function pushString(str,policyTbl){if(str===null||str===undefined){if(policyTbl&&policyTbl["Nullable"]){str=""}else throw new Error("Type mismatch")}if(policyTbl&&policyTbl["Strict"]){if(typeof str!="string")throw new Error("Type mismatch")}else str=str.toString();var length=Module.lengthBytesUTF8(str);var result=_nbind.Pool.lalloc(4+length+1);HEAPU32[result/4]=length;Module.stringToUTF8Array(str,HEAPU8,result+4,length+1);return result}_nbind.pushString=pushString;function popString(ptr){if(ptr===0)return null;var length=HEAPU32[ptr/4];return Module.Pointer_stringify(ptr+4,length)}_nbind.popString=popString;var StringType=(function(_super){__extends(StringType,_super);function StringType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popString;_this.wireWrite=pushString;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}StringType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushString(arg,policyTbl)})});return StringType})(_nbind.BindType);_nbind.StringType=StringType;function makeArgList(argCount){return Array.apply(null,Array(argCount)).map((function(dummy,num){return"a"+(num+1)}))}function anyNeedsWireWrite(typeList,policyTbl){return typeList.reduce((function(result,type){return result||type.needsWireWrite(policyTbl)}),false)}function anyNeedsWireRead(typeList,policyTbl){return typeList.reduce((function(result,type){return result||!!type.needsWireRead(policyTbl)}),false)}function makeWireRead(convertParamList,policyTbl,type,expr){var paramNum=convertParamList.length;if(type.makeWireRead){return type.makeWireRead(expr,convertParamList,paramNum)}else if(type.wireRead){convertParamList[paramNum]=type.wireRead;return"(convertParamList["+paramNum+"]("+expr+"))"}else return expr}function makeWireWrite(convertParamList,policyTbl,type,expr){var wireWrite;var paramNum=convertParamList.length;if(type.makeWireWrite){wireWrite=type.makeWireWrite(expr,policyTbl,convertParamList,paramNum)}else wireWrite=type.wireWrite;if(wireWrite){if(typeof wireWrite=="string"){return wireWrite}else{convertParamList[paramNum]=wireWrite;return"(convertParamList["+paramNum+"]("+expr+"))"}}else return expr}function buildCallerFunction(dynCall,ptrType,ptr,num,policyTbl,needsWireWrite,prefix,returnType,argTypeList,mask,err){var argList=makeArgList(argTypeList.length);var convertParamList=[];var callExpression=makeWireRead(convertParamList,policyTbl,returnType,"dynCall("+[prefix].concat(argList.map((function(name,index){return makeWireWrite(convertParamList,policyTbl,argTypeList[index],name)}))).join(",")+")");var resourceSet=_nbind.listResources([returnType],argTypeList);var sourceCode="function("+argList.join(",")+"){"+(mask?"this.__nbindFlags&mask&&err();":"")+resourceSet.makeOpen()+"var r="+callExpression+";"+resourceSet.makeClose()+"return r;"+"}";return eval("("+sourceCode+")")}function buildJSCallerFunction(returnType,argTypeList){var argList=makeArgList(argTypeList.length);var convertParamList=[];var callExpression=makeWireWrite(convertParamList,null,returnType,"_nbind.externalList[num].data("+argList.map((function(name,index){return makeWireRead(convertParamList,null,argTypeList[index],name)})).join(",")+")");var resourceSet=_nbind.listResources(argTypeList,[returnType]);resourceSet.remove(_nbind.resources.pool);var sourceCode="function("+["dummy","num"].concat(argList).join(",")+"){"+resourceSet.makeOpen()+"var r="+callExpression+";"+resourceSet.makeClose()+"return r;"+"}";return eval("("+sourceCode+")")}_nbind.buildJSCallerFunction=buildJSCallerFunction;function makeJSCaller(idList){var argCount=idList.length-1;var typeList=_nbind.getTypes(idList,"callback");var returnType=typeList[0];var argTypeList=typeList.slice(1);var needsWireRead=anyNeedsWireRead(argTypeList,null);var needsWireWrite=returnType.needsWireWrite(null);if(!needsWireWrite&&!needsWireRead){switch(argCount){case 0:return(function(dummy,num){return _nbind.externalList[num].data()});case 1:return(function(dummy,num,a1){return _nbind.externalList[num].data(a1)});case 2:return(function(dummy,num,a1,a2){return _nbind.externalList[num].data(a1,a2)});case 3:return(function(dummy,num,a1,a2,a3){return _nbind.externalList[num].data(a1,a2,a3)});default:break}}return buildJSCallerFunction(returnType,argTypeList)}_nbind.makeJSCaller=makeJSCaller;function makeMethodCaller(ptrType,spec){var argCount=spec.typeList.length-1;var typeIdList=spec.typeList.slice(0);typeIdList.splice(1,0,"uint32_t",spec.boundID);var typeList=_nbind.getTypes(typeIdList,spec.title);var returnType=typeList[0];var argTypeList=typeList.slice(3);var needsWireRead=returnType.needsWireRead(spec.policyTbl);var needsWireWrite=anyNeedsWireWrite(argTypeList,spec.policyTbl);var ptr=spec.ptr;var num=spec.num;var dynCall=_nbind.getDynCall(typeList,spec.title);var mask=~spec.flags&1;function err(){throw new Error("Calling a non-const method on a const object")}if(!needsWireRead&&!needsWireWrite){switch(argCount){case 0:return(function(){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType))});case 1:return(function(a1){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1)});case 2:return(function(a1,a2){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1,a2)});case 3:return(function(a1,a2,a3){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1,a2,a3)});default:break}}return buildCallerFunction(dynCall,ptrType,ptr,num,spec.policyTbl,needsWireWrite,"ptr,num,pushPointer(this,ptrType)",returnType,argTypeList,mask,err)}_nbind.makeMethodCaller=makeMethodCaller;function makeCaller(spec){var argCount=spec.typeList.length-1;var typeList=_nbind.getTypes(spec.typeList,spec.title);var returnType=typeList[0];var argTypeList=typeList.slice(1);var needsWireRead=returnType.needsWireRead(spec.policyTbl);var needsWireWrite=anyNeedsWireWrite(argTypeList,spec.policyTbl);var direct=spec.direct;var dynCall;var ptr=spec.ptr;if(spec.direct&&!needsWireRead&&!needsWireWrite){dynCall=_nbind.getDynCall(typeList,spec.title);switch(argCount){case 0:return(function(){return dynCall(direct)});case 1:return(function(a1){return dynCall(direct,a1)});case 2:return(function(a1,a2){return dynCall(direct,a1,a2)});case 3:return(function(a1,a2,a3){return dynCall(direct,a1,a2,a3)});default:break}ptr=0}var prefix;if(ptr){var typeIdList=spec.typeList.slice(0);typeIdList.splice(1,0,"uint32_t");typeList=_nbind.getTypes(typeIdList,spec.title);prefix="ptr,num"}else{ptr=direct;prefix="ptr"}dynCall=_nbind.getDynCall(typeList,spec.title);return buildCallerFunction(dynCall,null,ptr,spec.num,spec.policyTbl,needsWireWrite,prefix,returnType,argTypeList)}_nbind.makeCaller=makeCaller;function makeOverloader(func,arity){var callerList=[];function call(){return callerList[arguments.length].apply(this,arguments)}call.addMethod=(function(_func,_arity){callerList[_arity]=_func});call.addMethod(func,arity);return call}_nbind.makeOverloader=makeOverloader;var Resource=(function(){function Resource(open,close){var _this=this;this.makeOpen=(function(){return Object.keys(_this.openTbl).join("")});this.makeClose=(function(){return Object.keys(_this.closeTbl).join("")});this.openTbl={};this.closeTbl={};if(open)this.openTbl[open]=true;if(close)this.closeTbl[close]=true}Resource.prototype.add=(function(other){for(var _i=0,_a=Object.keys(other.openTbl);_i<_a.length;_i++){var key=_a[_i];this.openTbl[key]=true}for(var _b=0,_c=Object.keys(other.closeTbl);_b<_c.length;_b++){var key=_c[_b];this.closeTbl[key]=true}});Resource.prototype.remove=(function(other){for(var _i=0,_a=Object.keys(other.openTbl);_i<_a.length;_i++){var key=_a[_i];delete this.openTbl[key]}for(var _b=0,_c=Object.keys(other.closeTbl);_b<_c.length;_b++){var key=_c[_b];delete this.closeTbl[key]}});return Resource})();_nbind.Resource=Resource;function listResources(readList,writeList){var result=new Resource;for(var _i=0,readList_1=readList;_i<readList_1.length;_i++){var bindType=readList_1[_i];for(var _a=0,_b=bindType.readResources||[];_a<_b.length;_a++){var resource=_b[_a];result.add(resource)}}for(var _c=0,writeList_1=writeList;_c<writeList_1.length;_c++){var bindType=writeList_1[_c];for(var _d=0,_e=bindType.writeResources||[];_d<_e.length;_d++){var resource=_e[_d];result.add(resource)}}return result}_nbind.listResources=listResources;_nbind.resources={pool:new Resource("var used=HEAPU32[_nbind.Pool.usedPtr],page=HEAPU32[_nbind.Pool.pagePtr];","_nbind.Pool.lreset(used,page);")};var ExternalBuffer=(function(_super){__extends(ExternalBuffer,_super);function ExternalBuffer(buf,ptr){var _this=_super.call(this,buf)||this;_this.ptr=ptr;return _this}ExternalBuffer.prototype.free=(function(){_free(this.ptr)});return ExternalBuffer})(_nbind.External);function getBuffer(buf){if(buf instanceof ArrayBuffer){return new Uint8Array(buf)}else if(buf instanceof DataView){return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}else return buf}function pushBuffer(buf,policyTbl){if(buf===null||buf===undefined){if(policyTbl&&policyTbl["Nullable"])buf=[]}if(typeof buf!="object")throw new Error("Type mismatch");var b=buf;var length=b.byteLength||b.length;if(!length&&length!==0&&b.byteLength!==0)throw new Error("Type mismatch");var result=_nbind.Pool.lalloc(8);var data=_malloc(length);var ptr=result/4;HEAPU32[ptr++]=length;HEAPU32[ptr++]=data;HEAPU32[ptr++]=(new ExternalBuffer(buf,data)).register();HEAPU8.set(getBuffer(buf),data);return result}var BufferType=(function(_super){__extends(BufferType,_super);function BufferType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=pushBuffer;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}BufferType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushBuffer(arg,policyTbl)})});return BufferType})(_nbind.BindType);_nbind.BufferType=BufferType;function commitBuffer(num,data,length){var buf=_nbind.externalList[num].data;var NodeBuffer=Buffer;if(typeof Buffer!="function")NodeBuffer=(function(){});if(buf instanceof Array){}else{var src=HEAPU8.subarray(data,data+length);if(buf instanceof NodeBuffer){var srcBuf=void 0;if(typeof Buffer.from=="function"&&Buffer.from.length>=3){srcBuf=Buffer.from(src)}else srcBuf=new Buffer(src);srcBuf.copy(buf)}else getBuffer(buf).set(src)}}_nbind.commitBuffer=commitBuffer;var dirtyList=[];var gcTimer=0;function sweep(){for(var _i=0,dirtyList_1=dirtyList;_i<dirtyList_1.length;_i++){var obj=dirtyList_1[_i];if(!(obj.__nbindState&(1|2))){obj.free()}}dirtyList=[];gcTimer=0}_nbind.mark=(function(obj){});function toggleLightGC(enable){if(enable){_nbind.mark=(function(obj){dirtyList.push(obj);if(!gcTimer)gcTimer=setTimeout(sweep,0)})}else{_nbind.mark=(function(obj){})}}_nbind.toggleLightGC=toggleLightGC}))(_nbind);Module["requestFullScreen"]=function Module_requestFullScreen(lockPointer,resizeCanvas,vrDevice){Module.printErr("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");Module["requestFullScreen"]=Module["requestFullscreen"];Browser.requestFullScreen(lockPointer,resizeCanvas,vrDevice)};Module["requestFullscreen"]=function Module_requestFullscreen(lockPointer,resizeCanvas,vrDevice){Browser.requestFullscreen(lockPointer,resizeCanvas,vrDevice)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};Module["createContext"]=function Module_createContext(canvas,useWebGL,setInModule,webGLContextAttributes){return Browser.createContext(canvas,useWebGL,setInModule,webGLContextAttributes)};if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(typeof dateNow!=="undefined"){_emscripten_get_now=dateNow}else if(typeof self==="object"&&self["performance"]&&typeof self["performance"]["now"]==="function"){_emscripten_get_now=(function(){return self["performance"]["now"]()})}else if(typeof performance==="object"&&typeof performance["now"]==="function"){_emscripten_get_now=(function(){return performance["now"]()})}else{_emscripten_get_now=Date.now}__ATEXIT__.push((function(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10)}));DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vid(index,a1,a2){try{Module["dynCall_vid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_fiff(index,a1,a2,a3){try{return Module["dynCall_fiff"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viddi(index,a1,a2,a3,a4){try{Module["dynCall_viddi"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_vidd(index,a1,a2,a3){try{Module["dynCall_vidd"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_diii(index,a1,a2,a3){try{return Module["dynCall_diii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_di(index,a1){try{return Module["dynCall_di"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iid(index,a1,a2){try{return Module["dynCall_iid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiddi(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiddi"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_dii(index,a1,a2){try{return Module["dynCall_dii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_i(index){try{return Module["dynCall_i"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiid(index,a1,a2,a3,a4){try{Module["dynCall_viiid"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viififi(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viififi"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_v(index){try{Module["dynCall_v"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viid(index,a1,a2,a3){try{Module["dynCall_viid"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_idd(index,a1,a2){try{return Module["dynCall_idd"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_viiiii":invoke_viiiii,"invoke_vid":invoke_vid,"invoke_fiff":invoke_fiff,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_ii":invoke_ii,"invoke_viddi":invoke_viddi,"invoke_vidd":invoke_vidd,"invoke_iiii":invoke_iiii,"invoke_diii":invoke_diii,"invoke_di":invoke_di,"invoke_iid":invoke_iid,"invoke_iii":invoke_iii,"invoke_viiddi":invoke_viiddi,"invoke_viiiiii":invoke_viiiiii,"invoke_dii":invoke_dii,"invoke_i":invoke_i,"invoke_viiid":invoke_viiid,"invoke_viififi":invoke_viififi,"invoke_viii":invoke_viii,"invoke_v":invoke_v,"invoke_viid":invoke_viid,"invoke_idd":invoke_idd,"invoke_viiii":invoke_viiii,"_emscripten_asm_const_iiiii":_emscripten_asm_const_iiiii,"_emscripten_asm_const_iiidddddd":_emscripten_asm_const_iiidddddd,"_emscripten_asm_const_iiiid":_emscripten_asm_const_iiiid,"__nbind_reference_external":__nbind_reference_external,"_emscripten_asm_const_iiiiiiii":_emscripten_asm_const_iiiiiiii,"_removeAccessorPrefix":_removeAccessorPrefix,"_typeModule":_typeModule,"__nbind_register_pool":__nbind_register_pool,"__decorate":__decorate,"_llvm_stackrestore":_llvm_stackrestore,"___cxa_atexit":___cxa_atexit,"__extends":__extends,"__nbind_get_value_object":__nbind_get_value_object,"_emscripten_set_main_loop_timing":_emscripten_set_main_loop_timing,"__nbind_register_primitive":__nbind_register_primitive,"__nbind_register_type":__nbind_register_type,"_emscripten_memcpy_big":_emscripten_memcpy_big,"__nbind_register_function":__nbind_register_function,"___setErrNo":___setErrNo,"__nbind_register_class":__nbind_register_class,"__nbind_finish":__nbind_finish,"_abort":_abort,"_nbind_value":_nbind_value,"_llvm_stacksave":_llvm_stacksave,"___syscall54":___syscall54,"_defineHidden":_defineHidden,"_emscripten_set_main_loop":_emscripten_set_main_loop,"_emscripten_get_now":_emscripten_get_now,"__nbind_register_callback_signature":__nbind_register_callback_signature,"_emscripten_asm_const_iiiiii":_emscripten_asm_const_iiiiii,"__nbind_free_external":__nbind_free_external,"_emscripten_asm_const_iiii":_emscripten_asm_const_iiii,"_emscripten_asm_const_iiididi":_emscripten_asm_const_iiididi,"___syscall6":___syscall6,"_atexit":_atexit,"___syscall140":___syscall140,"___syscall146":___syscall146,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"cttz_i8":cttz_i8,"___dso_handle":___dso_handle};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.DYNAMICTOP_PTR|0;var j=env.tempDoublePtr|0;var k=env.ABORT|0;var l=env.STACKTOP|0;var m=env.STACK_MAX|0;var n=env.cttz_i8|0;var o=env.___dso_handle|0;var p=0;var q=0;var r=0;var s=0;var t=global.NaN,u=global.Infinity;var v=0,w=0,x=0,y=0,z=0.0;var A=0;var B=global.Math.floor;var C=global.Math.abs;var D=global.Math.sqrt;var E=global.Math.pow;var F=global.Math.cos;var G=global.Math.sin;var H=global.Math.tan;var I=global.Math.acos;var J=global.Math.asin;var K=global.Math.atan;var L=global.Math.atan2;var M=global.Math.exp;var N=global.Math.log;var O=global.Math.ceil;var P=global.Math.imul;var Q=global.Math.min;var R=global.Math.max;var S=global.Math.clz32;var T=global.Math.fround;var U=env.abort;var V=env.assert;var W=env.enlargeMemory;var X=env.getTotalMemory;var Y=env.abortOnCannotGrowMemory;var Z=env.invoke_viiiii;var _=env.invoke_vid;var $=env.invoke_fiff;var aa=env.invoke_vi;var ba=env.invoke_vii;var ca=env.invoke_ii;var da=env.invoke_viddi;var ea=env.invoke_vidd;var fa=env.invoke_iiii;var ga=env.invoke_diii;var ha=env.invoke_di;var ia=env.invoke_iid;var ja=env.invoke_iii;var ka=env.invoke_viiddi;var la=env.invoke_viiiiii;var ma=env.invoke_dii;var na=env.invoke_i;var oa=env.invoke_viiid;var pa=env.invoke_viififi;var qa=env.invoke_viii;var ra=env.invoke_v;var sa=env.invoke_viid;var ta=env.invoke_idd;var ua=env.invoke_viiii;var va=env._emscripten_asm_const_iiiii;var wa=env._emscripten_asm_const_iiidddddd;var xa=env._emscripten_asm_const_iiiid;var ya=env.__nbind_reference_external;var za=env._emscripten_asm_const_iiiiiiii;var Aa=env._removeAccessorPrefix;var Ba=env._typeModule;var Ca=env.__nbind_register_pool;var Da=env.__decorate;var Ea=env._llvm_stackrestore;var Fa=env.___cxa_atexit;var Ga=env.__extends;var Ha=env.__nbind_get_value_object;var Ia=env._emscripten_set_main_loop_timing;var Ja=env.__nbind_register_primitive;var Ka=env.__nbind_register_type;var La=env._emscripten_memcpy_big;var Ma=env.__nbind_register_function;var Na=env.___setErrNo;var Oa=env.__nbind_register_class;var Pa=env.__nbind_finish;var Qa=env._abort;var Ra=env._nbind_value;var Sa=env._llvm_stacksave;var Ta=env.___syscall54;var Ua=env._defineHidden;var Va=env._emscripten_set_main_loop;var Wa=env._emscripten_get_now;var Xa=env.__nbind_register_callback_signature;var Ya=env._emscripten_asm_const_iiiiii;var Za=env.__nbind_free_external;var _a=env._emscripten_asm_const_iiii;var $a=env._emscripten_asm_const_iiididi;var ab=env.___syscall6;var bb=env._atexit;var cb=env.___syscall140;var db=env.___syscall146;var eb=T(0);const fb=T(0);
// EMSCRIPTEN_START_FUNCS
function Eb(a){a=a|0;var b=0;b=l;l=l+a|0;l=l+15&-16;return b|0}function Fb(){return l|0}function Gb(a){a=a|0;l=a}function Hb(a,b){a=a|0;b=b|0;l=a;m=b}function Ib(a,b){a=a|0;b=b|0;if(!p){p=a;q=b}}function Jb(a){a=a|0;A=a}function Kb(){return A|0}function Lb(a){a=a|0;var b=0,d=0,e=0,f=0;f=l;l=l+16|0;e=f+8|0;d=f;b=lb[c[2]&31](12)|0;if(!b){c[d>>2]=2456;Tb(0,2565,d);Qa()}c[b>>2]=a;c[b+4>>2]=0;d=lb[c[2]&31](a<<2)|0;c[b+8>>2]=d;if(!d){c[e>>2]=2491;Tb(0,2565,e);Qa()}else{l=f;return b|0}return 0}function Mb(a){a=a|0;if(!a)return;jb[c[4]&127](c[a+8>>2]|0);jb[c[4]&127](a);return}function Nb(a){a=a|0;if(!a)a=0;else a=c[a+4>>2]|0;return a|0}function Ob(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=l;l=l+16|0;i=k;g=c[a>>2]|0;if(!g){g=Lb(4)|0;c[a>>2]=g}h=g+4|0;a=c[h>>2]|0;do if((a|0)==(c[g>>2]|0)){c[g>>2]=a<<1;g=g+8|0;a=sb[c[3]&15](c[g>>2]|0,a<<3)|0;c[g>>2]=a;if(!a){c[i>>2]=2527;Tb(0,2565,i);Qa()}else{j=g;f=c[h>>2]|0;e=a;break}}else{e=g+8|0;j=e;f=a;e=c[e>>2]|0}while(0);if(f>>>0<=d>>>0){j=e;i=f;i=i+1|0;c[h>>2]=i;d=j+(d<<2)|0;c[d>>2]=b;l=k;return}do{i=f;f=f+-1|0;c[e+(i<<2)>>2]=c[e+(f<<2)>>2];e=c[j>>2]|0}while(f>>>0>d>>>0);j=e;i=c[h>>2]|0;i=i+1|0;c[h>>2]=i;d=j+(d<<2)|0;c[d>>2]=b;l=k;return}function Pb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=a+8|0;e=(c[d>>2]|0)+(b<<2)|0;f=c[e>>2]|0;c[e>>2]=0;e=a+4|0;a=(c[e>>2]|0)+-1|0;if(a>>>0<=b>>>0){d=a;c[e>>2]=d;return f|0}do{g=c[d>>2]|0;a=b;b=b+1|0;c[g+(a<<2)>>2]=c[g+(b<<2)>>2];c[(c[d>>2]|0)+(b<<2)>>2]=0;a=(c[e>>2]|0)+-1|0}while(b>>>0<a>>>0);c[e>>2]=a;return f|0}function Qb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;e=c[a+4>>2]|0;if(!e){g=0;return g|0}f=c[a+8>>2]|0;d=0;while(1){if((c[f+(d<<2)>>2]|0)==(b|0))break;d=d+1|0;if(d>>>0>=e>>>0){d=0;g=6;break}}if((g|0)==6)return d|0;g=Pb(a,d)|0;return g|0}function Rb(a,b){a=a|0;b=b|0;if(!(Nb(a)|0)){b=0;return b|0}b=c[(c[a+8>>2]|0)+(b<<2)>>2]|0;return b|0}function Sb(){var a=0,b=0,d=0;d=l;l=l+16|0;b=d;a=lb[c[2]&31](980)|0;if(!a){c[b>>2]=2568;Tb(0,2565,b);Qa()}else{c[2314]=(c[2314]|0)+1;mA(a|0,20,980)|0;l=d;return a|0}return 0}function Tb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;c[f>>2]=d;ob[c[252]&7](a,b,f)|0;l=e;return}function Ub(a,b,d){a=a|0;b=b|0;d=d|0;if(!a){d=jz(c[489]|0,b,d)|0;return d|0}else{d=Vz(b,d)|0;return d|0}return 0}function Vb(a){a=a|0;var b=0,d=0;b=a+940|0;d=c[b>>2]|0;if(d|0){Qb(c[d+944>>2]|0,a)|0;c[b>>2]=0}d=Wb(a)|0;if(d|0){b=0;do{c[(Xb(a,b)|0)+940>>2]=0;b=b+1|0}while((b|0)!=(d|0))}Mb(c[a+944>>2]|0);jb[c[4]&127](a);c[2314]=(c[2314]|0)+-1;return}function Wb(a){a=a|0;return Nb(c[a+944>>2]|0)|0}function Xb(a,b){a=a|0;b=b|0;return Rb(c[a+944>>2]|0,b)|0}function Yb(a,b){a=a|0;b=b|0;if(!(Qb(c[a+944>>2]|0,b)|0))return;c[b+940>>2]=0;Zb(a);return}function Zb(b){b=b|0;var d=0;while(1){d=b+968|0;if(a[d>>0]|0){b=4;break}a[d>>0]=1;g[b+504>>2]=T(t);b=c[b+940>>2]|0;if(!b){b=4;break}}if((b|0)==4)return}function _b(a){a=a|0;var b=0,d=0,e=0;e=l;l=l+16|0;d=e+8|0;b=e;if(Wb(a)|0){c[b>>2]=2603;Tb(0,2565,b);Qa()}if(!(c[a+940>>2]|0)){Mb(c[a+944>>2]|0);mA(a|0,20,980)|0;l=e;return}else{c[d>>2]=2657;Tb(0,2565,d);Qa()}}function $b(){return c[2314]|0}function ac(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;e=f;if(b)if(!(Wb(a)|0))d=b;else{c[e>>2]=2704;Tb(0,2565,e);Qa()}else d=0;c[a+952>>2]=d;l=f;return}function bc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+16|0;g=h+8|0;f=h;e=b+940|0;if(c[e>>2]|0){c[f>>2]=2784;Tb(0,2565,f);Qa()}if(!(c[a+952>>2]|0)){Ob(a+944|0,b,d);c[e>>2]=a;Zb(a);l=h;return}else{c[g>>2]=2838;Tb(0,2565,g);Qa()}}function cc(a){a=a|0;return c[a+940>>2]|0}function dc(a){a=a|0;var b=0,d=0;d=l;l=l+16|0;b=d;if(!(c[a+952>>2]|0)){c[b>>2]=2907;Tb(0,2565,b);Qa()}else{Zb(a);l=d;return}}function ec(b){b=b|0;return (a[b+968>>0]|0)!=0|0}function fc(a,b){a=a|0;b=b|0;if(!(iz(a,b,400)|0))return;mA(a|0,b|0,400)|0;Zb(a);return}function gc(a){a=a|0;var b=fb;b=T(g[a+44>>2]);if(hc(b)|0){b=T(g[a+40>>2]);a=b>T(0.0)&((hc(b)|0)^1);return T(a?b:T(0.0))}else return T(b);return fb}function hc(a){a=T(a);return ((ic(a)|0)&2147483647)>>>0>2139095040|0}function ic(a){a=T(a);return (g[j>>2]=a,c[j>>2]|0)|0}function jc(a){a=a|0;var b=fb;b=T(g[a+48>>2]);if(hc(b)|0){b=T(g[a+40>>2]);a=b<T(0.0)&((hc(b)|0)^1);b=T(-b);return T(a?b:T(0.0))}else return T(b);return fb}function kc(a,b){a=a|0;b=b|0;var d=0,e=0;e=lc(b)|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function lc(a){a=a|0;var b=fb;switch(c[a+56>>2]|0){case 0:case 3:{b=T(g[a+40>>2]);a=b>T(0.0)&((hc(b)|0)^1);return (a?1012:1020)|0}default:return a+52|0}return 0}function mc(a,b){a=a|0;b=T(b);var c=0;c=a+40|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function nc(a,b){a=a|0;b=b|0;c[a+964>>2]=b;return}function oc(a){a=a|0;return c[a+964>>2]|0}function pc(a,b){a=a|0;b=b|0;var d=0;d=a+4|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function qc(a){a=a|0;return c[a+4>>2]|0}function rc(a,b){a=a|0;b=b|0;var d=0;d=a+8|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function sc(a){a=a|0;return c[a+8>>2]|0}function tc(a,b){a=a|0;b=b|0;var d=0;d=a+12|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function uc(a){a=a|0;return c[a+12>>2]|0}function vc(a,b){a=a|0;b=b|0;var d=0;d=a+16|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function wc(a){a=a|0;return c[a+16>>2]|0}function xc(a,b){a=a|0;b=b|0;var d=0;d=a+20|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function yc(a){a=a|0;return c[a+20>>2]|0}function zc(a,b){a=a|0;b=b|0;var d=0;d=a+24|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Ac(a){a=a|0;return c[a+24>>2]|0}function Bc(a,b){a=a|0;b=b|0;var d=0;d=a+28|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Cc(a){a=a|0;return c[a+28>>2]|0}function Dc(a,b){a=a|0;b=b|0;var d=0;d=a+32|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Ec(a){a=a|0;return c[a+32>>2]|0}function Fc(a,b){a=a|0;b=b|0;var d=0;d=a+36|0;if((c[d>>2]|0)==(b|0))return;c[d>>2]=b;Zb(a);return}function Gc(a){a=a|0;return c[a+36>>2]|0}function Hc(a,b){a=a|0;b=T(b);var c=0;c=a+44|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function Ic(a,b){a=a|0;b=T(b);var c=0;c=a+48|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function Jc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+52|0;d=a+56|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function Kc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+52|0;d=a+56|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function Lc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+132+(b<<3)|0;b=a+132+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Mc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+132+(b<<3)|0;b=a+132+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==2:0)return;g[e>>2]=d;e=hc(d)|0;c[b>>2]=e?0:2;Zb(a);return}function Nc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+132+(d<<3)|0;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;return}function Oc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+60+(b<<3)|0;b=a+60+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Pc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+60+(b<<3)|0;b=a+60+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==2:0)return;g[e>>2]=d;e=hc(d)|0;c[b>>2]=e?0:2;Zb(a);return}function Qc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+60+(d<<3)|0;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;return}function Rc(a,b){a=a|0;b=b|0;var d=0;d=a+60+(b<<3)+4|0;if((c[d>>2]|0)==3)return;g[a+60+(b<<3)>>2]=T(t);c[d>>2]=3;Zb(a);return}function Sc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+204+(b<<3)|0;b=a+204+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Tc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+204+(b<<3)|0;b=a+204+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==2:0)return;g[e>>2]=d;e=hc(d)|0;c[b>>2]=e?0:2;Zb(a);return}function Uc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+204+(d<<3)|0;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;return}function Vc(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;e=a+276+(b<<3)|0;b=a+276+(b<<3)+4|0;if(!(T(g[e>>2])!=d)?(c[b>>2]|0)==1:0)return;g[e>>2]=d;c[b>>2]=((hc(d)|0)^1)&1;Zb(a);return}function Wc(a,b){a=a|0;b=b|0;return T(g[a+276+(b<<3)>>2])}function Xc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+348|0;d=a+352|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function Yc(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+348|0;d=a+352|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function Zc(a){a=a|0;var b=0;b=a+352|0;if((c[b>>2]|0)==3)return;g[a+348>>2]=T(t);c[b>>2]=3;Zb(a);return}function _c(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+348|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function $c(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+356|0;d=a+360|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function ad(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+356|0;d=a+360|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function bd(a){a=a|0;var b=0;b=a+360|0;if((c[b>>2]|0)==3)return;g[a+356>>2]=T(t);c[b>>2]=3;Zb(a);return}function cd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+356|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function dd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+364|0;d=a+368|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function ed(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+364|0;d=a+368|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function fd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+364|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function gd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+372|0;d=a+376|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function hd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+372|0;d=a+376|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function id(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+372|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function jd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+380|0;d=a+384|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function kd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+380|0;d=a+384|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function ld(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+380|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function md(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+388|0;d=a+392|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==1:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:1;Zb(a);return}function nd(a,b){a=a|0;b=T(b);var d=0,e=0;e=a+388|0;d=a+392|0;if(!(T(g[e>>2])!=b)?(c[d>>2]|0)==2:0)return;g[e>>2]=b;e=hc(b)|0;c[d>>2]=e?3:2;Zb(a);return}function od(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+388|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function pd(a,b){a=a|0;b=T(b);var c=0;c=a+396|0;if(!(T(g[c>>2])!=b))return;g[c>>2]=b;Zb(a);return}function qd(a){a=a|0;return T(g[a+396>>2])}function rd(a){a=a|0;return T(g[a+400>>2])}function sd(a){a=a|0;return T(g[a+404>>2])}function td(a){a=a|0;return T(g[a+408>>2])}function ud(a){a=a|0;return T(g[a+412>>2])}function vd(a){a=a|0;return T(g[a+416>>2])}function wd(a){a=a|0;return T(g[a+420>>2])}function xd(a,b){a=a|0;b=b|0;var d=0,e=0,f=fb;e=l;l=l+16|0;d=e;if(b>>>0>=6){c[d>>2]=2993;Tb(0,2565,d);Qa()}switch(b|0){case 0:{b=(c[a+496>>2]|0)==2?5:4;break}case 2:{b=(c[a+496>>2]|0)==2?4:5;break}default:{}}f=T(g[a+424+(b<<2)>>2]);l=e;return T(f)}function yd(a,b){a=a|0;b=b|0;var d=0,e=0,f=fb;e=l;l=l+16|0;d=e;if(b>>>0>=6){c[d>>2]=2993;Tb(0,2565,d);Qa()}switch(b|0){case 0:{b=(c[a+496>>2]|0)==2?5:4;break}case 2:{b=(c[a+496>>2]|0)==2?4:5;break}default:{}}f=T(g[a+448+(b<<2)>>2]);l=e;return T(f)}function zd(a,b){a=a|0;b=b|0;var d=0,e=0,f=fb;e=l;l=l+16|0;d=e;if(b>>>0>=6){c[d>>2]=2993;Tb(0,2565,d);Qa()}switch(b|0){case 0:{b=(c[a+496>>2]|0)==2?5:4;break}case 2:{b=(c[a+496>>2]|0)==2?4:5;break}default:{}}f=T(g[a+472+(b<<2)>>2]);l=e;return T(f)}function Ad(a,b){a=a|0;b=b|0;Bd(a,b,0);return}function Bd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0.0,M=0.0,N=0.0,O=0.0,P=0.0,Q=0.0;K=l;l=l+400|0;I=K+392|0;J=K+384|0;H=K+376|0;G=K+368|0;F=K+360|0;D=K+352|0;C=K+344|0;B=K+336|0;A=K+328|0;z=K+320|0;y=K+312|0;x=K+304|0;w=K+296|0;v=K+288|0;u=K+280|0;t=K+272|0;s=K+264|0;r=K+256|0;q=K+248|0;p=K+240|0;n=K+232|0;m=K+144|0;j=K+96|0;i=K+48|0;f=K+40|0;E=K+32|0;o=K+24|0;k=K+16|0;Cd(d);Tb(3,3047,K);e=c[a+960>>2]|0;if(e|0)jb[e&127](a);if(b&1|0){Tb(3,3049,K+8|0);h[k>>3]=+T(g[a+416>>2]);Tb(3,3059,k);h[o>>3]=+T(g[a+420>>2]);Tb(3,3071,o);h[E>>3]=+T(g[a+404>>2]);Tb(3,3084,E);h[f>>3]=+T(g[a+400>>2]);Tb(3,3094,f);Q=+T(g[a+424>>2]);P=+T(g[a+428>>2]);O=+T(g[a+432>>2]);N=+T(g[a+436>>2]);M=+T(g[a+440>>2]);L=+T(g[a+444>>2]);h[i>>3]=Q;h[i+8>>3]=P;h[i+16>>3]=O;h[i+24>>3]=N;h[i+32>>3]=M;h[i+40>>3]=L;Tb(3,3103,i);L=+T(g[a+448>>2]);M=+T(g[a+452>>2]);N=+T(g[a+456>>2]);O=+T(g[a+460>>2]);P=+T(g[a+464>>2]);Q=+T(g[a+468>>2]);h[j>>3]=L;h[j+8>>3]=M;h[j+16>>3]=N;h[j+24>>3]=O;h[j+32>>3]=P;h[j+40>>3]=Q;Tb(3,3149,j);Q=+T(g[a+472>>2]);P=+T(g[a+476>>2]);O=+T(g[a+480>>2]);N=+T(g[a+484>>2]);M=+T(g[a+488>>2]);L=+T(g[a+492>>2]);h[m>>3]=Q;h[m+8>>3]=P;h[m+16>>3]=O;h[m+24>>3]=N;h[m+32>>3]=M;h[m+40>>3]=L;Tb(3,3195,m);Tb(3,3242,K+192|0)}if(b&2|0){switch(c[a+4>>2]|0){case 0:{Tb(3,3246,K+200|0);break}case 1:{Tb(3,3272,K+208|0);break}case 2:{Tb(3,3306,K+216|0);break}case 3:{Tb(3,3329,K+224|0);break}default:{}}switch(c[a+8>>2]|0){case 1:{Tb(3,3360,n);break}case 2:{Tb(3,3387,p);break}case 4:{Tb(3,3416,q);break}case 3:{Tb(3,3449,r);break}default:{}}switch(c[a+16>>2]|0){case 2:{Tb(3,3483,s);break}case 3:{Tb(3,3506,t);break}case 4:{Tb(3,3531,u);break}default:{}}switch(c[a+12>>2]|0){case 2:{Tb(3,3555,v);break}case 3:{Tb(3,3580,w);break}case 4:{Tb(3,3607,x);break}default:{}}switch(c[a+20>>2]|0){case 1:{Tb(3,3633,y);break}case 2:{Tb(3,3659,z);break}case 3:{Tb(3,3681,A);break}case 4:{Tb(3,3705,B);break}default:{}}Dd(3728,T(gc(a)));Dd(3737,T(jc(a)));Ed(3748,lc(a)|0);switch(c[a+32>>2]|0){case 1:{Tb(3,3758,C);break}case 0:{Tb(3,3779,D);break}case 2:{Tb(3,3801,F);break}default:{}}e=a+60|0;F=Fd(e)|0;f=Gd(e,0,1012)|0;if(F)Hd(3822,f);else{Hd(3829,f);Hd(3840,Gd(e,2,1012)|0);Hd(3852,Gd(e,1,1012)|0);Hd(3862,Gd(e,3,1012)|0);Hd(3875,Gd(e,4,1012)|0);Hd(3887,Gd(e,5,1012)|0)}f=a+204|0;F=Fd(f)|0;e=Gd(f,0,1012)|0;if(F)Hd(3897,e);else{Hd(3905,e);Hd(3917,Gd(f,2,1012)|0);Hd(3930,Gd(f,1,1012)|0);Hd(3941,Gd(f,3,1012)|0);Hd(3955,Gd(f,4,1012)|0);Hd(3968,Gd(f,5,1012)|0)}e=a+276|0;F=Fd(e)|0;f=Gd(e,0,1012)|0;if(F)Hd(3979,f);else{Hd(3991,f);Hd(4007,Gd(e,2,1012)|0);Hd(4024,Gd(e,1,1012)|0);Hd(4039,Gd(e,3,1012)|0);Hd(4057,Gd(e,4,1012)|0);Hd(4074,Gd(e,5,1012)|0)}Ed(4089,a+348|0);Ed(4095,a+356|0);Ed(4102,a+380|0);Ed(4111,a+388|0);Ed(4121,a+364|0);Ed(4130,a+372|0);if((c[a+24>>2]|0)==1)Tb(3,4140,G);G=a+132|0;Ed(4163,Gd(G,0,1e3)|0);Ed(4168,Gd(G,2,1e3)|0);Ed(4174,Gd(G,1,1e3)|0);Ed(4178,Gd(G,3,1e3)|0)}i=Nb(c[a+944>>2]|0)|0;if(!((b&4|0)!=0&(i|0)!=0)){Tb(3,4203,I);l=K;return}Tb(3,4185,H);f=d+1|0;e=0;do{Bd(Xb(a,e)|0,b,f);e=e+1|0}while((e|0)!=(i|0));Cd(d);Tb(3,4198,J);l=K;return}function Cd(a){a=a|0;var b=0,c=0,d=0;d=l;l=l+16|0;c=d;if(!a){l=d;return}else b=0;do{Tb(3,4283,c);b=b+1|0}while((b|0)!=(a|0));l=d;return}function Dd(a,b){a=a|0;b=T(b);var d=0,e=0;e=l;l=l+16|0;d=e;if(hc(b)|0){l=e;return}c[d>>2]=a;h[d+8>>3]=+b;Tb(3,4274,d);l=e;return}function Ed(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,i=0.0;f=l;l=l+32|0;e=f;d=c[b+4>>2]|0;if(!d){l=f;return}i=+T(g[b>>2]);c[e>>2]=a;h[e+8>>3]=i;c[e+16>>2]=(d|0)==1?4207:4210;Tb(3,4212,e);l=f;return}function Fd(a){a=a|0;var b=0,d=0,e=0,f=0;e=l;l=l+16|0;d=e+8|0;b=e;f=a+8|0;c[b>>2]=c[a>>2];c[b+4>>2]=c[a+4>>2];c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];if(!(Jd(b,d)|0)){f=0;l=e;return f|0}f=a+16|0;c[b>>2]=c[a>>2];c[b+4>>2]=c[a+4>>2];c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];if(!(Jd(b,d)|0)){f=0;l=e;return f|0}f=a+24|0;c[b>>2]=c[a>>2];c[b+4>>2]=c[a+4>>2];c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];f=Jd(b,d)|0;l=e;return f|0}function Gd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=l;l=l+16|0;e=f;if(b>>>0>=6){c[e>>2]=4223;Tb(0,2565,e);Qa()}if(c[a+(b<<3)+4>>2]|0){e=a+(b<<3)|0;l=f;return e|0}if((b|2|0)==3?c[a+60>>2]|0:0){e=a+56|0;l=f;return e|0}switch(b|0){case 0:case 2:case 4:case 5:{if(c[a+52>>2]|0){e=a+48|0;l=f;return e|0}break}default:{}}if(!(c[a+68>>2]|0)){e=(b|1|0)==5?1e3:d;l=f;return e|0}else{e=a+64|0;l=f;return e|0}return 0}function Hd(a,b){a=a|0;b=b|0;var d=fb,e=0,f=0;f=l;l=l+32|0;e=f;d=T(g[b>>2]);if(Id(d,T(0.0))|0){l=f;return}b=(c[b+4>>2]|0)==1?4207:4210;c[e>>2]=a;h[e+8>>3]=+d;c[e+16>>2]=b;Tb(3,4212,e);l=f;return}function Id(a,b){a=T(a);b=T(b);var c=0;if(hc(a)|0){c=hc(b)|0;return c|0}else{c=T(C(T(a-b)))<T(.0000999999974);return c|0}return 0}function Jd(a,b){a=a|0;b=b|0;var d=0,e=fb;d=c[a+4>>2]|0;if((d|0)!=(c[b+4>>2]|0)){d=0;return d|0}if(!d){d=1;return d|0}e=T(g[a>>2]);d=T(C(T(e-T(g[b>>2]))))<T(.0000999999974);return d|0}function Kd(a,b,c,d,e,f,g,h,i,j,k,l){a=a|0;b=T(b);c=c|0;d=T(d);e=e|0;f=T(f);g=g|0;h=T(h);i=T(i);j=T(j);k=T(k);l=T(l);var m=0,n=fb,o=fb,p=0;if(i<T(0.0)|j<T(0.0)){g=0;return g|0}if((e|0)==(a|0))m=Id(f,b)|0;else m=0;if((g|0)==(c|0))p=Id(h,d)|0;else p=0;if((!m?(n=T(b-k),!(Ld(a,n,i)|0)):0)?!(Md(a,n,e,i)|0):0)m=Nd(a,n,e,f,i)|0;else m=1;if((!p?(o=T(d-l),!(Ld(c,o,j)|0)):0)?!(Md(c,o,g,j)|0):0)a=Nd(c,o,g,h,j)|0;else a=1;g=m&a;return g|0}function Ld(a,b,c){a=a|0;b=T(b);c=T(c);if((a|0)==1)a=Id(b,c)|0;else a=0;return a|0}function Md(a,b,c,d){a=a|0;b=T(b);c=c|0;d=T(d);if((a|0)==2&(c|0)==0)if(!(b>=d))a=Id(b,d)|0;else a=1;else a=0;return a|0}function Nd(a,b,c,d,e){a=a|0;b=T(b);c=c|0;d=T(d);e=T(e);if(!((a|0)==2&(c|0)==2&d>b)){c=0;return c|0}if(e<=b){c=1;return c|0}c=Id(b,e)|0;return c|0}function Od(b,d,e,f,i,j,k,m,n,o){b=b|0;d=T(d);e=T(e);f=f|0;i=i|0;j=j|0;k=T(k);m=T(m);n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=fb,u=fb,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=fb,F=fb,G=fb,H=0.0,I=0.0;D=l;l=l+160|0;A=D+120|0;z=D+104|0;x=D+72|0;s=D+56|0;y=D+8|0;w=D;c[2316]=(c[2316]|0)+1;B=b+968|0;if((a[B>>0]|0)!=0?(c[b+508>>2]|0)!=(c[2315]|0):0)v=4;else if((c[b+512>>2]|0)==(f|0))C=0;else v=4;if((v|0)==4){c[b+516>>2]=0;c[b+920>>2]=-1;c[b+924>>2]=-1;g[b+928>>2]=T(-1.0);g[b+932>>2]=T(-1.0);C=1}a:do if(!(c[b+952>>2]|0)){if(n){p=b+912|0;if(!(Id(T(g[p>>2]),d)|0)){v=21;break}if(!(Id(T(g[b+916>>2]),e)|0)){v=21;break}if((c[b+920>>2]|0)!=(i|0)){v=21;break}p=(c[b+924>>2]|0)==(j|0)?p:0;v=22;break}r=c[b+516>>2]|0;if(!r)v=21;else{q=0;while(1){p=b+520+(q*24|0)|0;if(((Id(T(g[p>>2]),d)|0?Id(T(g[b+520+(q*24|0)+4>>2]),e)|0:0)?(c[b+520+(q*24|0)+8>>2]|0)==(i|0):0)?(c[b+520+(q*24|0)+12>>2]|0)==(j|0):0){v=22;break a}q=q+1|0;if(q>>>0>=r>>>0){v=21;break}}}}else{t=T(Pd(b,2,k));u=T(Pd(b,0,k));p=b+912|0;G=T(g[p>>2]);F=T(g[b+916>>2]);E=T(g[b+928>>2]);if(!(Kd(i,d,j,e,c[b+920>>2]|0,G,c[b+924>>2]|0,F,E,T(g[b+932>>2]),t,u)|0)){r=c[b+516>>2]|0;if(!r)v=21;else{q=0;while(1){p=b+520+(q*24|0)|0;E=T(g[p>>2]);F=T(g[b+520+(q*24|0)+4>>2]);G=T(g[b+520+(q*24|0)+16>>2]);if(Kd(i,d,j,e,c[b+520+(q*24|0)+8>>2]|0,E,c[b+520+(q*24|0)+12>>2]|0,F,G,T(g[b+520+(q*24|0)+20>>2]),t,u)|0){v=22;break a}q=q+1|0;if(q>>>0>=r>>>0){v=21;break}}}}else v=22}while(0);do if((v|0)==21)if(!(a[11653]|0)){p=0;v=31}else{p=0;v=28}else if((v|0)==22){q=(a[11653]|0)!=0;if(!((p|0)!=0&(C^1)))if(q){v=28;break}else{v=31;break}s=p+16|0;c[b+904>>2]=c[s>>2];r=p+20|0;c[b+908>>2]=c[r>>2];if(!((a[11654]|0)==0|q^1)){q=c[2316]|0;c[w>>2]=Qd(q)|0;c[w+4>>2]=q;Tz(4286,w)|0;q=c[b+960>>2]|0;if(q|0)jb[q&127](b);i=Rd(i,n)|0;j=Rd(j,n)|0;I=+T(g[s>>2]);H=+T(g[r>>2]);c[y>>2]=i;c[y+4>>2]=j;h[y+8>>3]=+d;h[y+16>>3]=+e;h[y+24>>3]=I;h[y+32>>3]=H;c[y+40>>2]=o;Tz(4303,y)|0}}while(0);if((v|0)==28){q=c[2316]|0;y=Qd(q)|0;c[s>>2]=y;c[s+4>>2]=q;c[s+8>>2]=C?4352:11655;Tz(4354,s)|0;q=c[b+960>>2]|0;if(q|0)jb[q&127](b);y=Rd(i,n)|0;v=Rd(j,n)|0;c[x>>2]=y;c[x+4>>2]=v;h[x+8>>3]=+d;h[x+16>>3]=+e;c[x+24>>2]=o;Tz(4363,x)|0;v=31}if((v|0)==31){Sd(b,d,e,f,i,j,k,m,n);if(a[11653]|0){q=c[2316]|0;y=Qd(q)|0;c[z>>2]=y;c[z+4>>2]=q;c[z+8>>2]=C?4352:11655;Tz(4397,z)|0;q=c[b+960>>2]|0;if(q|0)jb[q&127](b);y=Rd(i,n)|0;z=Rd(j,n)|0;H=+T(g[b+904>>2]);I=+T(g[b+908>>2]);c[A>>2]=y;c[A+4>>2]=z;h[A+8>>3]=H;h[A+16>>3]=I;c[A+24>>2]=o;Tz(4406,A)|0}c[b+512>>2]=f;if(!p){q=b+516|0;p=c[q>>2]|0;if((p|0)==16){if(a[11653]|0)Uz(4438)|0;c[q>>2]=0;p=0}if(n)p=b+912|0;else{c[q>>2]=p+1;p=b+520+(p*24|0)|0}g[p>>2]=d;g[p+4>>2]=e;c[p+8>>2]=i;c[p+12>>2]=j;c[p+16>>2]=c[b+904>>2];c[p+20>>2]=c[b+908>>2];p=0}}if(!n){B=c[2316]|0;B=B+-1|0;c[2316]=B;B=c[2315]|0;n=b+508|0;c[n>>2]=B;n=(p|0)==0;C=C|n;l=D;return C|0}c[b+416>>2]=c[b+904>>2];c[b+420>>2]=c[b+908>>2];a[b+969>>0]=1;a[B>>0]=0;B=c[2316]|0;B=B+-1|0;c[2316]=B;B=c[2315]|0;n=b+508|0;c[n>>2]=B;n=(p|0)==0;C=C|n;l=D;return C|0}function Pd(a,b,c){a=a|0;b=b|0;c=T(c);var d=fb;d=T(Vd(a,b,c));return T(d+T(Wd(a,b,c)))}function Qd(a){a=a|0;return (a>>>0>60?4826:4826+(60-a)|0)|0}function Rd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;d=f+12|0;e=f;c[d>>2]=c[269];c[d+4>>2]=c[270];c[d+8>>2]=c[271];c[e>>2]=c[272];c[e+4>>2]=c[273];c[e+8>>2]=c[274];if(a>>>0>2){e=11655;l=f;return e|0}e=c[(b?e:d)+(a<<2)>>2]|0;l=f;return e|0}function Sd(b,d,e,f,h,i,k,m,n){b=b|0;d=T(d);e=T(e);f=f|0;h=h|0;i=i|0;k=T(k);m=T(m);n=n|0;var o=0,p=0,q=0,r=0,s=fb,t=fb,u=fb,v=fb,w=fb,x=fb,y=fb,z=0,A=0,B=fb,C=0,D=fb,E=fb,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,U=0,V=0,W=fb,X=0,Y=0,Z=fb,_=fb,$=fb,aa=fb,ba=fb,ca=fb,da=0,ea=0,fa=0,ga=0,ha=fb,ia=fb,ja=fb,ka=0,la=0,ma=fb,na=fb,oa=fb,pa=fb,qa=fb,ra=fb,sa=fb,ta=fb,ua=0,va=0,wa=0,xa=0,ya=fb,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0;Ia=l;l=l+32|0;p=Ia+8|0;o=Ia;ka=Ia+24|0;da=Ia+20|0;ea=Ia+16|0;fa=Ia+12|0;if(!((h|0)==0|(hc(d)|0)^1)){c[o>>2]=4460;Tb(0,2565,o);Qa()}if(!((i|0)==0|(hc(e)|0)^1)){c[p>>2]=4540;Tb(0,2565,p);Qa()}Da=Td(b,f)|0;c[b+496>>2]=Da;Ga=Ud(2,Da)|0;Ha=Ud(0,Da)|0;g[b+440>>2]=T(Vd(b,Ga,k));g[b+444>>2]=T(Wd(b,Ga,k));g[b+428>>2]=T(Vd(b,Ha,k));g[b+436>>2]=T(Wd(b,Ha,k));g[b+464>>2]=T(Xd(b,Ga));g[b+468>>2]=T(Yd(b,Ga));g[b+452>>2]=T(Xd(b,Ha));g[b+460>>2]=T(Yd(b,Ha));g[b+488>>2]=T(Zd(b,Ga,k));g[b+492>>2]=T(_d(b,Ga,k));g[b+476>>2]=T(Zd(b,Ha,k));g[b+484>>2]=T(_d(b,Ha,k));if(c[b+952>>2]|0){$d(b,d,e,h,i,k,m);l=Ia;return}Ea=b+944|0;Fa=Nb(c[Ea>>2]|0)|0;if(!Fa){ae(b,d,e,h,i,k,m);l=Ia;return}if(!n?be(b,d,e,h,i,k,m)|0:0){l=Ia;return}Ga=Ud(c[b+4>>2]|0,Da)|0;Ha=ce(Ga,Da)|0;Ca=de(Ga)|0;X=c[b+8>>2]|0;va=b+28|0;Y=(c[va>>2]|0)!=0;qa=Ca?k:m;sa=Ca?m:k;Z=T(ee(b,Ga,k));_=T(fe(b,Ga,k));s=T(ee(b,Ha,k));ra=T(ge(b,Ga,k));ta=T(ge(b,Ha,k));C=Ca?h:i;ua=Ca?i:h;ya=Ca?ra:ta;w=Ca?ta:ra;pa=T(Pd(b,2,k));v=T(Pd(b,0,k));t=T(T(T(he(b+364|0,k))-pa)-ya);u=T(T(T(he(b+380|0,k))-pa)-ya);x=T(T(T(he(b+372|0,m))-v)-w);y=T(T(T(he(b+388|0,m))-v)-w);$=Ca?t:x;aa=Ca?u:y;pa=T(d-pa);d=T(pa-ya);if(hc(d)|0)ya=d;else ya=T(Mz(T(Oz(d,u)),t));na=T(e-v);d=T(na-w);if(hc(d)|0)oa=d;else oa=T(Mz(T(Oz(d,y)),x));t=Ca?ya:oa;ma=Ca?oa:ya;a:do if((C|0)==1){f=0;p=0;while(1){o=Xb(b,p)|0;if(!f)if(T(gc(o))>T(0.0)?T(jc(o))>T(0.0):0)f=o;else f=0;else if(ie(o)|0){r=0;break a}p=p+1|0;if(p>>>0>=Fa>>>0){r=f;break}}}else r=0;while(0);z=r+500|0;A=r+504|0;f=0;o=0;d=T(0.0);q=0;do{p=Rb(c[Ea>>2]|0,q)|0;if((c[p+36>>2]|0)==1){je(p);a[p+969>>0]=1;a[p+968>>0]=0}else{ke(p);if(n)le(p,Td(p,Da)|0,t,ma,ya);do if((c[p+24>>2]|0)!=1)if((p|0)==(r|0)){c[z>>2]=c[2315];g[A>>2]=T(0.0);break}else{me(b,p,ya,h,oa,ya,oa,i,Da);break}else{if(o|0)c[o+948>>2]=p;c[p+948>>2]=0;o=p;f=(f|0)==0?p:f}while(0);d=T(d+T(g[p+504>>2]))}q=q+1|0}while((q|0)!=(Fa|0));G=d>t;la=Y&((C|0)==2&G)?1:C;F=(ua|0)==1;I=F&(n^1);J=(la|0)==2;K=1028+(Ga<<2)|0;L=(ua|2|0)==2;M=(ua|0)==2;V=F&(Y^1);N=1044+(Ha<<2)|0;O=1044+(Ha<<2)|0;P=1060+(Ha<<2)|0;Q=1028+(Ha<<2)|0;R=1044+(Ga<<2)|0;S=1044+(Ga<<2)|0;U=1060+(Ga<<2)|0;G=Y&((C|0)!=0&G);F=F^1;w=t;r=0;H=0;ca=T(0.0);ba=T(0.0);while(1){b:do if(r>>>0<Fa>>>0){q=0;v=T(0.0);t=T(0.0);d=T(0.0);A=0;p=0;i=r;while(1){z=Rb(c[Ea>>2]|0,i)|0;if((c[z+36>>2]|0)!=1?(c[z+936>>2]=H,(c[z+24>>2]|0)!=1):0){u=T(he(z+364+(c[K>>2]<<3)|0,qa));o=z+504|0;u=T(Mz(u,T(g[o>>2])));u=T(v+T(u+T(Pd(z,Ga,ya))));if(Y&(q|0)!=0&u>w){C=q;u=v;D=t;o=A;break b}if(ie(z)|0){t=T(t+T(gc(z)));W=T(jc(z));d=T(d-T(W*T(g[o>>2])))}if(p|0)c[p+948>>2]=z;c[z+948>>2]=0;q=q+1|0;p=z;o=(A|0)==0?z:A}else{u=v;o=A}z=i+1|0;if(z>>>0<Fa>>>0){v=u;A=o;i=z}else{C=q;D=t;i=z;break}}}else{C=0;u=T(0.0);D=T(0.0);d=T(0.0);o=0;i=r}while(0);if(hc(w)|0)if(u<$&((hc($)|0)^1))W=$;else{A=u>aa&((hc(aa)|0)^1);W=A?aa:w}else W=w;if(hc(W)|0)if(u<T(0.0))E=T(-u);else E=T(0.0);else E=T(W-u);if(!I?(ga=(o|0)==0,!ga):0){q=E<T(0.0);e=T(E/d);z=E>T(0.0);B=T(E/D);x=T(0.0);y=T(0.0);t=T(0.0);p=o;while(1){v=T(g[p+504>>2]);do if(q){w=T(v*T(jc(p)));if(w!=T(-0.0)?(u=T(v-T(e*w)),ha=T(ne(p,Ga,u,W,ya)),u!=ha):0){u=T(x-T(ha-v));t=T(t+w)}else u=x}else if(z?(ia=T(gc(p)),ia!=T(0.0)):0){w=T(v+T(B*ia));u=T(ne(p,Ga,w,W,ya));if(!(w!=u)){u=x;break}u=T(x-T(u-v));y=T(y-ia)}else u=x;while(0);p=c[p+948>>2]|0;if(!p)break;else x=u}d=T(d+t);t=T(E+u);if(!ga){z=t<T(0.0);A=d==T(0.0);e=T(t/d);q=t>T(0.0);x=T(t/T(D+y));d=T(0.0);p=o;do{u=T(g[p+504>>2]);do if(z){D=T(u*T(jc(p)));t=T(-D);if(D!=T(-0.0)){D=T(e*t);t=T(ne(p,Ga,T(u+(A?t:D)),W,ya))}else t=u}else if(q){t=T(gc(p));if(!(t!=T(0.0))){t=u;break}t=T(ne(p,Ga,T(u+T(x*t)),W,ya))}else t=u;while(0);d=T(d-T(t-u));v=T(Pd(p,Ga,ya));w=T(Pd(p,Ha,ya));u=T(t+v);g[da>>2]=u;c[fa>>2]=1;o=hc(ma)|0;do if(o)Ba=78;else{if(G|(oe(p,Ha,ma)|0|F)){Ba=78;break}if((pe(b,p)|0)!=4){Ba=78;break}g[ka>>2]=ma;c[ea>>2]=1}while(0);do if((Ba|0)==78){Ba=0;if(oe(p,Ha,ma)|0){D=T(w+T(he(c[p+972+(c[Q>>2]<<2)>>2]|0,ma)));g[ka>>2]=D;c[ea>>2]=((hc(D)|0)^1)&1;break}else{g[ka>>2]=ma;c[ea>>2]=o?0:2;break}}while(0);o=p+396|0;t=T(g[o>>2]);if(!(hc(t)|0)){B=T(u-v);D=T(B/t);t=T(t*B);t=T(Mz(Ca?D:t,T(ge(p,Ha,ya))));g[ka>>2]=t;c[ea>>2]=1;if(ie(p)|0){t=T(Oz(T(t-w),ma));g[ka>>2]=t;u=T(g[o>>2]);if(Ca)u=T(t*u);else u=T(t/u);g[da>>2]=T(v+u)}g[ka>>2]=T(w+t)}qe(T(he(p+380+(c[K>>2]<<3)|0,ya)),fa,da);qe(T(he(p+380+(c[Q>>2]<<3)|0,oa)),ea,ka);if(oe(p,Ha,ma)|0)o=0;else o=(pe(b,p)|0)==4;D=T(g[da>>2]);B=T(g[ka>>2]);Ja=c[fa>>2]|0;Ka=c[ea>>2]|0;Od(p,Ca?D:B,Ca?B:D,Da,Ca?Ja:Ka,Ca?Ka:Ja,ya,oa,n&(o^1),4622)|0;p=c[p+948>>2]|0}while((p|0)!=0)}else d=T(0.0)}else d=T(0.0);d=T(E+d);if(J&d>T(0.0)){o=c[K>>2]|0;if((c[b+364+(o<<3)+4>>2]|0)!=0?(ja=T(he(b+364+(o<<3)|0,qa)),ja>=T(0.0)):0)t=T(Mz(T(0.0),T(ja-T(W-d))));else t=T(0.0)}else t=d;A=r>>>0<i>>>0;if(A){q=r;o=0;do{p=Rb(c[Ea>>2]|0,q)|0;if(!(c[p+24>>2]|0))o=((c[p+60+(c[S>>2]<<3)+4>>2]|0)==3&1)+o+((c[p+60+(c[U>>2]<<3)+4>>2]|0)==3&1)|0;q=q+1|0}while((q|0)!=(i|0));if(o){v=T(0.0);w=T(0.0)}else Ba=100}else Ba=100;c:do if((Ba|0)==100){Ba=0;switch(X|0){case 1:{o=0;v=T(t*T(.5));w=T(0.0);break c}case 2:{o=0;v=t;w=T(0.0);break c}case 3:{if(C>>>0<=1){o=0;v=T(0.0);w=T(0.0);break c}w=T((C+-1|0)>>>0);o=0;v=T(0.0);w=T(T(Mz(t,T(0.0)))/w);break c}case 4:{w=T(t/T(C>>>0));o=0;v=T(w*T(.5));break c}default:{o=0;v=T(0.0);w=T(0.0);break c}}}while(0);d=T(Z+v);if(A){u=T(t/T(o|0));z=r;t=T(0.0);do{q=Rb(c[Ea>>2]|0,z)|0;d:do if((c[q+36>>2]|0)!=1){p=q+24|0;o=c[p>>2]|0;do if((o|0)==1){if(!(re(q,Ga)|0)){o=c[p>>2]|0;break}if(!n)break d;E=T(se(q,Ga,W));E=T(E+T(Xd(b,Ga)));E=T(E+T(Vd(q,Ga,ya)));g[q+400+(c[R>>2]<<2)>>2]=E;break d}while(0);if(o|0){if(!n)break;E=T(v+T(Xd(b,Ga)));Ka=q+400+(c[R>>2]<<2)|0;g[Ka>>2]=T(E+T(g[Ka>>2]));break}E=T(u+d);d=(c[q+60+(c[S>>2]<<3)+4>>2]|0)==3?E:d;if(n){Ka=q+400+(c[R>>2]<<2)|0;g[Ka>>2]=T(d+T(g[Ka>>2]))}E=T(u+d);d=(c[q+60+(c[U>>2]<<3)+4>>2]|0)==3?E:d;if(I){E=T(w+T(Pd(q,Ga,ya)));t=ma;d=T(d+T(E+T(g[q+504>>2])));break}else{d=T(d+T(w+T(te(q,Ga,ya))));t=T(Mz(t,T(te(q,Ha,ya))));break}}while(0);z=z+1|0}while((z|0)!=(i|0))}else t=T(0.0);w=T(_+d);if(L){d=T(T(ne(b,Ha,T(ta+t),sa,k))-ta);if(M)d=T(Oz(d,ma))}else d=ma;v=T(T(ne(b,Ha,T(ta+(V?ma:t)),sa,k))-ta);if(A&n)do{z=Rb(c[Ea>>2]|0,r)|0;do if((c[z+36>>2]|0)!=1){if((c[z+24>>2]|0)==1){if(re(z,Ha)|0){t=T(se(z,Ha,ma));t=T(t+T(Xd(b,Ha)))}else t=T(Xd(b,Ha));E=T(t+T(Vd(z,Ha,ya)));g[z+400+(c[N>>2]<<2)>>2]=E;break}q=pe(b,z)|0;o=c[O>>2]|0;do if((q|0)==4){if((c[z+60+(o<<3)+4>>2]|0)==3){Ba=140;break}if((c[z+60+(c[P>>2]<<3)+4>>2]|0)==3){Ba=140;break}if(oe(z,Ha,ma)|0){t=s;break}p=c[K>>2]|0;Ja=c[z+904+(p<<2)>>2]|0;c[ka>>2]=Ja;o=z+396|0;Ka=hc(T(g[o>>2]))|0;u=(c[j>>2]=Ja,T(g[j>>2]));if(Ka)t=v;else{D=T(Pd(z,Ha,ya));t=T(g[o>>2]);E=T(u/t);t=T(u*t);t=T(D+(Ca?E:t))}g[da>>2]=t;g[ka>>2]=T(T(Pd(z,Ga,ya))+u);c[ea>>2]=1;c[fa>>2]=1;qe(T(he(z+380+(p<<3)|0,W)),ea,ka);qe(T(he(z+380+(c[Q>>2]<<3)|0,ma)),fa,da);t=T(g[ka>>2]);D=T(g[da>>2]);E=Ca?t:D;t=Ca?D:t;Ka=((hc(E)|0)^1)&1;Od(z,E,t,Da,Ka,((hc(t)|0)^1)&1,ya,oa,1,4627)|0;t=s}else Ba=140;while(0);e:do if((Ba|0)==140){Ba=0;t=T(d-T(te(z,Ha,ya)));o=(c[z+60+(o<<3)+4>>2]|0)==3;p=(c[z+60+(c[P>>2]<<3)+4>>2]|0)==3;if(o&p){t=T(s+T(t*T(.5)));break}if(p){t=s;break}if(o){t=T(s+t);break}switch(q|0){case 1:{t=s;break e}case 2:{t=T(s+T(t*T(.5)));break e}default:{t=T(s+t);break e}}}while(0);E=T(ca+t);Ka=z+400+(c[N>>2]<<2)|0;g[Ka>>2]=T(E+T(g[Ka>>2]))}while(0);r=r+1|0}while((r|0)!=(i|0));ca=T(ca+v);ba=T(Mz(ba,w));C=H+1|0;if(i>>>0>=Fa>>>0)break;else{w=W;r=i;H=C}}do if(n){o=C>>>0>1;if((!o?(c[b+12>>2]|0)!=4:0)?!(ue(b)|0):0)break;if(!(hc(ma)|0)){d=T(ma-ca);f:do switch(c[b+12>>2]|0){case 3:{s=T(s+d);x=T(0.0);break}case 2:{s=T(s+T(d*T(.5)));x=T(0.0);break}case 4:{if(ma>ca)x=T(d/T(C>>>0));else x=T(0.0);break}case 7:if(ma>ca){s=T(s+T(d/T(C<<1>>>0)));x=T(d/T(C>>>0));x=o?x:T(0.0);break f}else{s=T(s+T(d*T(.5)));x=T(0.0);break f}case 6:{x=T(d/T(H>>>0));x=ma>ca&o?x:T(0.0);break}default:x=T(0.0)}while(0);if(C|0){A=1044+(Ha<<2)|0;i=1028+(Ha<<2)|0;z=0;p=0;while(1){g:do if(p>>>0<Fa>>>0){t=T(0.0);u=T(0.0);d=T(0.0);r=p;while(1){o=Rb(c[Ea>>2]|0,r)|0;do if((c[o+36>>2]|0)!=1?(c[o+24>>2]|0)==0:0){if((c[o+936>>2]|0)!=(z|0))break g;if(ve(o,Ha)|0){ja=T(g[o+904+(c[i>>2]<<2)>>2]);d=T(Mz(d,T(ja+T(Pd(o,Ha,ya)))))}if((pe(b,o)|0)!=5)break;ia=T(we(o));ia=T(ia+T(Vd(o,0,ya)));ja=T(g[o+908>>2]);ja=T(T(ja+T(Pd(o,0,ya)))-ia);ia=T(Mz(u,ia));ja=T(Mz(t,ja));t=ja;u=ia;d=T(Mz(d,T(ia+ja)))}while(0);o=r+1|0;if(o>>>0<Fa>>>0)r=o;else{r=o;break}}}else{u=T(0.0);d=T(0.0);r=p}while(0);w=T(x+d);v=s;s=T(s+w);if(p>>>0<r>>>0){u=T(v+u);o=p;do{q=Rb(c[Ea>>2]|0,o)|0;h:do if((c[q+36>>2]|0)!=1){if(c[q+24>>2]|0)break;switch(pe(b,q)|0){case 1:{ja=T(v+T(Vd(q,Ha,ya)));g[q+400+(c[A>>2]<<2)>>2]=ja;break h}case 3:{ja=T(T(s-T(Wd(q,Ha,ya)))-T(g[q+904+(c[i>>2]<<2)>>2]));g[q+400+(c[A>>2]<<2)>>2]=ja;break h}case 2:{ja=T(v+T(T(w-T(g[q+904+(c[i>>2]<<2)>>2]))*T(.5)));g[q+400+(c[A>>2]<<2)>>2]=ja;break h}case 4:{ja=T(v+T(Vd(q,Ha,ya)));g[q+400+(c[A>>2]<<2)>>2]=ja;if(oe(q,Ha,ma)|0)break h;if(Ca){p=q+904|0;d=T(g[p>>2]);d=T(d+T(Pd(q,Ha,ya)));t=w}else{t=T(g[q+908>>2]);p=q+904|0;d=w;t=T(t+T(Pd(q,Ha,ya)))}if(Id(d,T(g[p>>2]))|0?Id(t,T(g[q+908>>2]))|0:0)break h;Od(q,d,t,Da,1,1,ya,oa,1,4627)|0;break h}case 5:{g[q+404>>2]=T(T(u-T(we(q)))+T(se(q,0,ma)));break h}default:break h}}while(0);o=o+1|0}while((o|0)!=(r|0))}z=z+1|0;if((z|0)==(C|0))break;else p=r}}}}while(0);g[b+904>>2]=T(ne(b,2,pa,k,k));g[b+908>>2]=T(ne(b,0,na,m,k));if((la|0)!=0?(wa=c[b+32>>2]|0,xa=(la|0)==2,!(xa&(wa|0)!=2)):0){if(xa&(wa|0)==2){d=T(ra+W);d=T(Mz(T(Oz(d,T(xe(b,Ga,ba,qa)))),ra));Ba=199}}else{d=T(ne(b,Ga,ba,qa,k));Ba=199}if((Ba|0)==199)g[b+904+(c[1028+(Ga<<2)>>2]<<2)>>2]=d;if((ua|0)!=0?(za=c[b+32>>2]|0,Aa=(ua|0)==2,!(Aa&(za|0)!=2)):0){if(Aa&(za|0)==2){d=T(ta+ma);d=T(Mz(T(Oz(d,T(xe(b,Ha,T(ta+ca),sa)))),ta));Ba=205}}else{d=T(ne(b,Ha,T(ta+ca),sa,k));Ba=205}if((Ba|0)==205)g[b+904+(c[1028+(Ha<<2)>>2]<<2)>>2]=d;if(!n){l=Ia;return}if((c[va>>2]|0)==2){p=1028+(Ha<<2)|0;q=1044+(Ha<<2)|0;o=0;do{r=Xb(b,o)|0;if(!(c[r+24>>2]|0)){Ja=c[p>>2]|0;k=T(g[b+904+(Ja<<2)>>2]);Ka=r+400+(c[q>>2]<<2)|0;k=T(k-T(g[Ka>>2]));g[Ka>>2]=T(k-T(g[r+904+(Ja<<2)>>2]))}o=o+1|0}while((o|0)!=(Fa|0))}if(f|0){o=Ca?la:h;do{ye(b,f,ya,o,oa,Da);f=c[f+948>>2]|0}while((f|0)!=0)}o=(Ga|2|0)==3;p=(Ha|2|0)==3;if(o|p)f=0;else{l=Ia;return}do{q=Rb(c[Ea>>2]|0,f)|0;if((c[q+36>>2]|0)!=1){if(o)ze(b,q,Ga);if(p)ze(b,q,Ha)}f=f+1|0}while((f|0)!=(Fa|0));l=Ia;return}function Td(a,b){a=a|0;b=b|0;a=c[a>>2]|0;return ((a|0)==0?(b|0?b:1):a)|0}function Ud(a,b){a=a|0;b=b|0;var c=0;a:do if((b|0)==2){switch(a|0){case 2:{a=3;break a}case 3:break;default:{c=4;break a}}a=2}else c=4;while(0);return a|0}function Vd(a,b,d){a=a|0;b=b|0;d=T(d);if(de(b)|0?(c[a+96>>2]|0)!=0:0)a=a+92|0;else a=Gd(a+60|0,c[1044+(b<<2)>>2]|0,1012)|0;return T(Fe(a,d))}function Wd(a,b,d){a=a|0;b=b|0;d=T(d);if(de(b)|0?(c[a+104>>2]|0)!=0:0)a=a+100|0;else a=Gd(a+60|0,c[1060+(b<<2)>>2]|0,1012)|0;return T(Fe(a,d))}function Xd(a,b){a=a|0;b=b|0;var d=fb;if((de(b)|0?c[a+312>>2]|0:0)?(d=T(g[a+308>>2]),d>=T(0.0)):0)return T(d);d=T(Mz(T(g[(Gd(a+276|0,c[1044+(b<<2)>>2]|0,1012)|0)>>2]),T(0.0)));return T(d)}function Yd(a,b){a=a|0;b=b|0;var d=fb;if((de(b)|0?c[a+320>>2]|0:0)?(d=T(g[a+316>>2]),d>=T(0.0)):0)return T(d);d=T(Mz(T(g[(Gd(a+276|0,c[1060+(b<<2)>>2]|0,1012)|0)>>2]),T(0.0)));return T(d)}function Zd(a,b,d){a=a|0;b=b|0;d=T(d);var e=fb;if((de(b)|0?c[a+240>>2]|0:0)?(e=T(he(a+236|0,d)),e>=T(0.0)):0)return T(e);e=T(Mz(T(he(Gd(a+204|0,c[1044+(b<<2)>>2]|0,1012)|0,d)),T(0.0)));return T(e)}function _d(a,b,d){a=a|0;b=b|0;d=T(d);var e=fb;if((de(b)|0?c[a+248>>2]|0:0)?(e=T(he(a+244|0,d)),e>=T(0.0)):0)return T(e);e=T(Mz(T(he(Gd(a+204|0,c[1060+(b<<2)>>2]|0,1012)|0,d)),T(0.0)));return T(e)}function $d(a,b,d,e,f,h,i){a=a|0;b=T(b);d=T(d);e=e|0;f=f|0;h=T(h);i=T(i);var j=0,k=fb,m=fb,n=fb,o=fb,p=fb,q=fb,r=0,s=0,t=0;t=l;l=l+16|0;j=t;r=t+8|0;s=a+952|0;if(!(c[s>>2]|0)){c[j>>2]=4716;Tb(0,2565,j);Qa()}k=T(ge(a,2,b));m=T(ge(a,0,b));n=T(Pd(a,2,b));n=T(b-n);o=T(n-k);p=T(d-T(Pd(a,0,b)));q=T(p-m);if((e|0)==1&(f|0)==1){g[a+904>>2]=T(ne(a,2,n,h,h));g[a+908>>2]=T(ne(a,0,p,i,h));l=t;return}if(o<=T(0.0)|q<=T(0.0)){g[a+904>>2]=T(ne(a,2,T(0.0),b,b));g[a+908>>2]=T(ne(a,0,T(0.0),d,b));l=t;return}else{yb[c[s>>2]&1](r,a,o,e,q,f);i=T(k+T(g[r>>2]));g[a+904>>2]=T(ne(a,2,(e|2|0)==2?i:n,b,b));i=T(m+T(g[r+4>>2]));g[a+908>>2]=T(ne(a,0,(f|2|0)==2?i:p,d,b));l=t;return}}function ae(a,b,c,d,e,f,h){a=a|0;b=T(b);c=T(c);d=d|0;e=e|0;f=T(f);h=T(h);var i=fb,j=fb,k=fb,l=fb;k=T(ge(a,2,f));i=T(ge(a,0,f));l=T(Pd(a,2,f));j=T(Pd(a,0,f));b=T(b-l);g[a+904>>2]=T(ne(a,2,(d|2|0)==2?k:b,f,f));c=T(c-j);g[a+908>>2]=T(ne(a,0,(e|2|0)==2?i:c,h,f));return}function be(a,b,c,d,e,f,h){a=a|0;b=T(b);c=T(c);d=d|0;e=e|0;f=T(f);h=T(h);var i=0,j=fb,k=fb;i=(d|0)==2;if((!(b<=T(0.0)&i)?!(c<=T(0.0)&(e|0)==2):0)?!((d|0)==1&(e|0)==1):0){i=0;return i|0}j=T(Pd(a,0,f));k=T(Pd(a,2,f));i=b<T(0.0)&i|(hc(b)|0);b=T(b-k);g[a+904>>2]=T(ne(a,2,i?T(0.0):b,f,f));b=T(c-j);i=c<T(0.0)&(e|0)==2|(hc(c)|0);g[a+908>>2]=T(ne(a,0,i?T(0.0):b,h,f));i=1;return i|0}function ce(a,b){a=a|0;b=b|0;if(!(Ce(a)|0)){b=0;return b|0}b=Ud(2,b)|0;return b|0}function de(a){a=a|0;return (a|1|0)==3|0}function ee(a,b,c){a=a|0;b=b|0;c=T(c);c=T(Zd(a,b,c));return T(c+T(Xd(a,b)))}function fe(a,b,c){a=a|0;b=b|0;c=T(c);c=T(_d(a,b,c));return T(c+T(Yd(a,b)))}function ge(a,b,c){a=a|0;b=b|0;c=T(c);var d=fb;d=T(ee(a,b,c));return T(d+T(fe(a,b,c)))}function he(a,b){a=a|0;b=T(b);switch(c[a+4>>2]|0){case 2:{b=T(T(T(g[a>>2])*b)/T(100.0));break}case 1:{b=T(g[a>>2]);break}default:b=T(t)}return T(b)}function ie(a){a=a|0;if(c[a+24>>2]|0){a=0;return a|0}if(T(gc(a))!=T(0.0)){a=1;return a|0}a=T(jc(a))!=T(0.0);return a|0}function je(b){b=b|0;var d=0,e=0;jA(b+400|0,0,536)|0;a[b+969>>0]=1;e=Wb(b)|0;if(!e)return;d=b+944|0;b=0;do{je(Rb(c[d>>2]|0,b)|0);b=b+1|0}while((b|0)!=(e|0));return}function ke(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;f=l;l=l+16|0;e=f+8|0;d=f;b=a+380|0;if(!((c[a+384>>2]|0)!=0?(g=a+364|0,c[d>>2]=c[b>>2],c[d+4>>2]=c[b+4>>2],c[e>>2]=c[g>>2],c[e+4>>2]=c[g+4>>2],Jd(d,e)|0):0))b=a+348|0;c[a+972>>2]=b;b=a+388|0;if(c[a+392>>2]|0?(g=a+372|0,c[d>>2]=c[b>>2],c[d+4>>2]=c[b+4>>2],c[e>>2]=c[g>>2],c[e+4>>2]=c[g+4>>2],Jd(d,e)|0):0){e=b;g=a+976|0;c[g>>2]=e;l=f;return}e=a+356|0;g=a+976|0;c[g>>2]=e;l=f;return}function le(a,b,d,e,f){a=a|0;b=b|0;d=T(d);e=T(e);f=T(f);var h=0,i=fb;h=Ud(c[a+4>>2]|0,b)|0;b=ce(h,b)|0;d=T(Ee(a,h,d));e=T(Ee(a,b,e));i=T(d+T(Vd(a,h,f)));g[a+400+(c[1044+(h<<2)>>2]<<2)>>2]=i;d=T(d+T(Wd(a,h,f)));g[a+400+(c[1060+(h<<2)>>2]<<2)>>2]=d;d=T(e+T(Vd(a,b,f)));g[a+400+(c[1044+(b<<2)>>2]<<2)>>2]=d;f=T(e+T(Wd(a,b,f)));g[a+400+(c[1060+(b<<2)>>2]<<2)>>2]=f;return}function me(a,b,d,e,f,h,i,j,k){a=a|0;b=b|0;d=T(d);e=e|0;f=T(f);h=T(h);i=T(i);j=j|0;k=k|0;var m=fb,n=0,o=fb,p=0,q=fb,r=0,s=0,u=0,v=0,w=fb,x=fb,y=0,z=0,A=0,B=0,C=0,D=0,E=0;E=l;l=l+16|0;C=E+12|0;y=E+8|0;z=E+4|0;A=E;D=Ud(c[a+4>>2]|0,k)|0;B=de(D)|0;m=T(he(lc(b)|0,B?h:i));n=oe(b,2,h)|0;r=oe(b,0,i)|0;do if(!(hc(m)|0)?!(hc(B?d:f)|0):0){n=b+504|0;if(!(hc(T(g[n>>2]))|0)){if(!(De(1)|0))break;if((c[b+500>>2]|0)==(c[2315]|0))break}g[n>>2]=T(Mz(m,T(ge(b,D,h))))}else p=7;while(0);do if((p|0)==7){v=B^1;s=n^1;if(!(v|s)){i=T(he(c[b+972>>2]|0,h));g[b+504>>2]=T(Mz(i,T(ge(b,2,h))));break}u=r^1;if(!(B|u)){i=T(he(c[b+976>>2]|0,i));g[b+504>>2]=T(Mz(i,T(ge(b,0,h))));break}g[C>>2]=T(t);g[y>>2]=T(t);c[z>>2]=0;c[A>>2]=0;w=T(Pd(b,2,h));x=T(Pd(b,0,h));if(n){q=T(w+T(he(c[b+972>>2]|0,h)));g[C>>2]=q;c[z>>2]=1;p=1}else{p=0;q=T(t)}if(r){o=T(x+T(he(c[b+976>>2]|0,i)));g[y>>2]=o;c[A>>2]=1;n=1}else{n=0;o=T(t)}r=c[a+32>>2]|0;if(!(B&(r|0)==2)){if(hc(q)|0?!(hc(d)|0):0){g[C>>2]=d;c[z>>2]=2;q=d;p=2}}else r=2;if((!((r|0)==2&v)?hc(o)|0:0)?!(hc(f)|0):0){g[y>>2]=f;c[A>>2]=2;o=f;n=2}if(B){if((j|0)==1&u&((hc(f)|0)^1)?(pe(a,b)|0)==4:0){g[y>>2]=f;c[A>>2]=1;n=1;o=f}}else if((e|0)==1&s&((hc(d)|0)^1)?(pe(a,b)|0)==4:0){g[C>>2]=d;c[z>>2]=1;p=1;q=d}m=T(g[b+396>>2]);do if(!(hc(m)|0)){if((p|0)==1&v){n=0;m=T(T(q-w)/m)}else{if(!(B&(n|0)==1))break;n=2;m=T(m*T(o-x))}g[b+504>>2]=T(Mz(m,T(ge(b,n,h))));l=E;return}while(0);qe(T(he(b+380|0,h)),z,C);qe(T(he(b+388|0,i)),A,y);w=T(g[C>>2]);x=T(g[y>>2]);Od(b,w,x,k,c[z>>2]|0,c[A>>2]|0,h,i,0,4708)|0;i=T(g[b+904+(c[1028+(D<<2)>>2]<<2)>>2]);g[b+504>>2]=T(Mz(i,T(ge(b,D,h))))}while(0);c[b+500>>2]=c[2315];l=E;return}function ne(a,b,c,d,e){a=a|0;b=b|0;c=T(c);d=T(d);e=T(e);d=T(xe(a,b,c,d));return T(Mz(d,T(ge(a,b,e))))}function oe(a,b,d){a=a|0;b=b|0;d=T(d);a=c[a+972+(c[1028+(b<<2)>>2]<<2)>>2]|0;switch(c[a+4>>2]|0){case 1:{if(T(g[a>>2])<T(0.0)){b=0;return b|0}break}case 2:{if(T(g[a>>2])<T(0.0)){b=0;return b|0}b=(hc(d)|0)^1;return b|0}case 0:case 3:{b=0;return b|0}default:{}}b=1;return b|0}function pe(a,b){a=a|0;b=b|0;b=b+20|0;b=c[((c[b>>2]|0)==0?a+16|0:b)>>2]|0;if((b|0)==5?Ce(c[a+4>>2]|0)|0:0){a=1;return a|0}a=b;return a|0}function qe(a,b,d){a=T(a);b=b|0;d=d|0;var e=fb;switch(c[b>>2]|0){case 2:case 1:{b=hc(a)|0;e=T(g[d>>2]);g[d>>2]=b|e<a?e:a;return}case 0:{if(hc(a)|0)return;c[b>>2]=2;g[d>>2]=a;return}default:return}}function re(a,b){a=a|0;b=b|0;a=a+132|0;if(de(b)|0?c[(Gd(a,4,1e3)|0)+4>>2]|0:0){b=1;return b|0}b=(c[(Gd(a,c[1044+(b<<2)>>2]|0,1e3)|0)+4>>2]|0)!=0;return b|0}function se(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;a=a+132|0;if(!(de(b)|0?(e=Gd(a,4,1e3)|0,(c[e+4>>2]|0)!=0):0)){e=Gd(a,c[1044+(b<<2)>>2]|0,1e3)|0;if(!(c[e+4>>2]|0)){d=T(0.0);return T(d)}}d=T(he(e,d));return T(d)}function te(a,b,d){a=a|0;b=b|0;d=T(d);var e=fb;e=T(g[a+904+(c[1028+(b<<2)>>2]<<2)>>2]);e=T(e+T(Vd(a,b,d)));return T(e+T(Wd(a,b,d)))}function ue(a){a=a|0;var b=0,d=0,e=0;if(Ce(c[a+4>>2]|0)|0){d=0;return d|0}if((c[a+16>>2]|0)==5){d=1;return d|0}d=Wb(a)|0;if(!d){d=0;return d|0}else b=0;while(1){e=Xb(a,b)|0;if((c[e+24>>2]|0)==0?(c[e+20>>2]|0)==5:0){b=1;a=7;break}b=b+1|0;if(b>>>0>=d>>>0){b=0;a=7;break}}if((a|0)==7)return b|0;return 0}function ve(a,b){a=a|0;b=b|0;var d=fb;d=T(g[a+904+(c[1028+(b<<2)>>2]<<2)>>2]);return d>=T(0.0)&((hc(d)|0)^1)|0}function we(a){a=a|0;var b=0,d=fb,e=0,f=0,h=0,i=0,j=0,k=fb,m=0;j=l;l=l+16|0;e=j;b=c[a+956>>2]|0;if(b|0){k=T(g[a+904>>2]);d=T(g[a+908>>2]);d=T(ib[b&0](a,k,d));if(hc(d)|0){c[e>>2]=4658;Tb(0,2565,e);Qa()}else{k=d;l=j;return T(k)}}h=Wb(a)|0;if(h|0){e=0;f=0;while(1){b=Xb(a,f)|0;if(c[b+936>>2]|0){b=e;break}if((c[b+24>>2]|0)!=1){m=(pe(a,b)|0)==5;if(m){i=11;break}else b=(e|0)==0?b:e}else b=e;f=f+1|0;if(f>>>0>=h>>>0)break;else e=b}if((i|0)==11){d=T(we(b));m=b+404|0;k=T(g[m>>2]);k=T(d+k);l=j;return T(k)}if(b|0){m=b;d=T(we(m));m=m+404|0;k=T(g[m>>2]);k=T(d+k);l=j;return T(k)}}k=T(g[a+908>>2]);l=j;return T(k)}function xe(a,b,c,d){a=a|0;b=b|0;c=T(c);d=T(d);var e=fb,f=0;if(!(Ce(b)|0))if(de(b)|0){b=0;f=3}else{d=T(t);e=T(t)}else{b=1;f=3}if((f|0)==3){e=T(he(a+364+(b<<3)|0,d));d=T(he(a+380+(b<<3)|0,d))}f=d<c&(d>=T(0.0)&((hc(d)|0)^1));c=f?d:c;f=e>=T(0.0)&((hc(e)|0)^1)&c<e;return T(f?e:c)}function ye(a,b,d,e,f,h){a=a|0;b=b|0;d=T(d);e=e|0;f=T(f);h=h|0;var i=fb,j=0,k=0,l=fb,m=fb,n=fb,o=0,p=0,q=0,r=0,s=fb,u=fb,v=0;p=Ud(c[a+4>>2]|0,h)|0;q=ce(p,h)|0;o=de(p)|0;l=T(Pd(b,2,d));n=T(Pd(b,0,d));if(!(oe(b,2,d)|0))if(re(b,2)|0?Ae(b,2)|0:0){i=T(g[a+904>>2]);s=T(Xd(a,2));s=T(i-T(s+T(Yd(a,2))));i=T(se(b,2,d));i=T(ne(b,2,T(s-T(i+T(Be(b,2,d)))),d,d))}else i=T(t);else i=T(l+T(he(c[b+972>>2]|0,d)));if(!(oe(b,0,f)|0))if(re(b,0)|0?Ae(b,0)|0:0){s=T(g[a+908>>2]);u=T(Xd(a,0));u=T(s-T(u+T(Yd(a,0))));s=T(se(b,0,f));f=T(ne(b,0,T(u-T(s+T(Be(b,0,f)))),f,d))}else f=T(t);else f=T(n+T(he(c[b+976>>2]|0,f)));j=hc(i)|0;k=hc(f)|0;do if(j^k?(m=T(g[b+396>>2]),!(hc(m)|0)):0){if(j){i=T(T(f-n)*m);i=T(l+T(Mz(i,T(ge(b,0,d)))));break}if(k){f=T(T(i-l)/m);f=T(n+T(Mz(f,T(ge(b,2,d)))))}}while(0);k=hc(i)|0;j=hc(f)|0;if(k|j){v=(k^1)&1;e=d>T(0.0)&((e|0)!=0&k);i=o?i:e?d:i;Od(b,i,f,h,o?v:e?2:v,k&(j^1)&1,i,f,0,4635)|0;i=T(g[b+904>>2]);i=T(i+T(Pd(b,2,d)));f=T(g[b+908>>2]);f=T(f+T(Pd(b,0,d)))}Od(b,i,f,h,1,1,i,f,1,4647)|0;if(Ae(b,p)|0?!(re(b,p)|0):0){v=c[1028+(p<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));u=T(u-T(Yd(a,p)));u=T(u-T(Be(b,p,d)));g[b+400+(c[1044+(p<<2)>>2]<<2)>>2]=u}else r=22;do if((r|0)==22){if(!(re(b,p)|0)?(c[a+8>>2]|0)==1:0){v=c[1028+(p<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(T(u-T(g[b+904+(v<<2)>>2]))*T(.5));g[b+400+(c[1044+(p<<2)>>2]<<2)>>2]=u;break}if(!(re(b,p)|0)?(c[a+8>>2]|0)==2:0){v=c[1028+(p<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));g[b+400+(c[1044+(p<<2)>>2]<<2)>>2]=u}}while(0);if(Ae(b,q)|0?!(re(b,q)|0):0){v=c[1028+(q<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));u=T(u-T(Yd(a,q)));u=T(u-T(Be(b,q,d)));g[b+400+(c[1044+(q<<2)>>2]<<2)>>2]=u;return}if(!(re(b,q)|0)?(pe(a,b)|0)==2:0){v=c[1028+(q<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(T(u-T(g[b+904+(v<<2)>>2]))*T(.5));g[b+400+(c[1044+(q<<2)>>2]<<2)>>2]=u;return}if(re(b,q)|0)return;if((pe(a,b)|0)!=3)return;v=c[1028+(q<<2)>>2]|0;u=T(g[a+904+(v<<2)>>2]);u=T(u-T(g[b+904+(v<<2)>>2]));g[b+400+(c[1044+(q<<2)>>2]<<2)>>2]=u;return}function ze(a,b,d){a=a|0;b=b|0;d=d|0;var e=fb,f=0;f=c[1028+(d<<2)>>2]|0;e=T(g[b+904+(f<<2)>>2]);e=T(T(g[a+904+(f<<2)>>2])-e);e=T(e-T(g[b+400+(c[1044+(d<<2)>>2]<<2)>>2]));g[b+400+(c[1060+(d<<2)>>2]<<2)>>2]=e;return}function Ae(a,b){a=a|0;b=b|0;a=a+132|0;if(de(b)|0?c[(Gd(a,5,1e3)|0)+4>>2]|0:0){b=1;return b|0}b=(c[(Gd(a,c[1060+(b<<2)>>2]|0,1e3)|0)+4>>2]|0)!=0;return b|0}function Be(a,b,d){a=a|0;b=b|0;d=T(d);var e=0;a=a+132|0;if(!(de(b)|0?(e=Gd(a,5,1e3)|0,(c[e+4>>2]|0)!=0):0)){e=Gd(a,c[1060+(b<<2)>>2]|0,1e3)|0;if(!(c[e+4>>2]|0)){d=T(0.0);return T(d)}}d=T(he(e,d));return T(d)}function Ce(a){a=a|0;return (a|1|0)==1|0}function De(b){b=b|0;return (a[11656+b>>0]|0)!=0|0}function Ee(a,b,c){a=a|0;b=b|0;c=T(c);if(re(a,b)|0){c=T(se(a,b,c));return T(c)}else{c=T(-T(Be(a,b,c)));return T(c)}return fb}function Fe(a,b){a=a|0;b=T(b);if((c[a+4>>2]|0)==3){b=T(0.0);return T(b)}b=T(he(a,b));return T(b)}function Ge(b,d,e,f){b=b|0;d=T(d);e=T(e);f=f|0;var g=fb,h=fb,i=0,j=0;c[2315]=(c[2315]|0)+1;ke(b);do if(hc(d)|0){if(oe(b,2,d)|0){g=T(he(c[b+972>>2]|0,d));j=1;g=T(g+T(Pd(b,2,d)));break}g=T(he(b+380|0,d));if(!(g>=T(0.0))){j=0;g=d}else j=2}else{j=1;g=d}while(0);do if(hc(e)|0){if(oe(b,0,e)|0){h=T(he(c[b+976>>2]|0,e));i=1;h=T(h+T(Pd(b,0,d)));break}h=T(he(b+388|0,e));if(!(h>=T(0.0))){i=0;h=e}else i=2}else{i=1;h=e}while(0);if(!(Od(b,g,h,f,j,i,d,e,1,4887)|0))return;le(b,c[b+496>>2]|0,d,e,d);if(De(0)|0)He(b);if(!(a[11652]|0))return;Ad(b,7);return}function He(a){a=a|0;var b=0,d=0,e=fb,f=fb,h=0,i=fb,j=fb,k=fb;b=a+400|0;f=T(g[b>>2]);j=T(f-T(B(T(f))));d=a+404|0;e=T(g[d>>2]);i=T(e-T(B(T(e))));h=a+416|0;k=T(+iA(+T(j+T(g[h>>2]))));g[h>>2]=T(k-T(+iA(+j)));h=a+420|0;j=T(+iA(+T(i+T(g[h>>2]))));g[h>>2]=T(j-T(+iA(+i)));g[b>>2]=T(+iA(+f));g[d>>2]=T(+iA(+e));d=Nb(c[a+944>>2]|0)|0;if(!d)return;else b=0;do{He(Xb(a,b)|0);b=b+1|0}while((b|0)!=(d|0));return}function Ie(b,c){b=b|0;c=c|0;a[11656+b>>0]=c&1;return}function Je(){var a=0;a=bA(8)|0;Ke(a);return a|0}function Ke(a){a=a|0;var b=0;b=Sb()|0;c[a>>2]=b;c[a+4>>2]=0;nc(b,a);return}function Le(a){a=a|0;if(a|0){Me(a);dA(a)}return}function Me(a){a=a|0;var b=0;Vb(c[a>>2]|0);b=a+4|0;a=c[b>>2]|0;c[b>>2]=0;if(a|0){Ne(a);dA(a)}return}function Ne(a){a=a|0;Oe(a);return}function Oe(a){a=a|0;a=c[a>>2]|0;if(a|0)Za(a|0);return}function Pe(a){a=a|0;return oc(a)|0}function Qe(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){Ne(b);dA(b)}_b(c[a>>2]|0);return}function Re(a,b){a=a|0;b=b|0;fc(c[a>>2]|0,c[b>>2]|0);return}function Se(a,b){a=a|0;b=b|0;zc(c[a>>2]|0,b);return}function Te(a,b,d){a=a|0;b=b|0;d=+d;Lc(c[a>>2]|0,b,T(d));return}function Ue(a,b,d){a=a|0;b=b|0;d=+d;Mc(c[a>>2]|0,b,T(d));return}function Ve(a,b){a=a|0;b=b|0;tc(c[a>>2]|0,b);return}function We(a,b){a=a|0;b=b|0;vc(c[a>>2]|0,b);return}function Xe(a,b){a=a|0;b=b|0;xc(c[a>>2]|0,b);return}function Ye(a,b){a=a|0;b=b|0;pc(c[a>>2]|0,b);return}function Ze(a,b){a=a|0;b=b|0;Bc(c[a>>2]|0,b);return}function _e(a,b){a=a|0;b=b|0;rc(c[a>>2]|0,b);return}function $e(a,b,d){a=a|0;b=b|0;d=+d;Oc(c[a>>2]|0,b,T(d));return}function af(a,b,d){a=a|0;b=b|0;d=+d;Pc(c[a>>2]|0,b,T(d));return}function bf(a,b){a=a|0;b=b|0;Rc(c[a>>2]|0,b);return}function cf(a,b){a=a|0;b=b|0;Dc(c[a>>2]|0,b);return}function df(a,b){a=a|0;b=b|0;Fc(c[a>>2]|0,b);return}function ef(a,b){a=a|0;b=+b;mc(c[a>>2]|0,T(b));return}function ff(a,b){a=a|0;b=+b;Jc(c[a>>2]|0,T(b));return}function gf(a,b){a=a|0;b=+b;Kc(c[a>>2]|0,T(b));return}function hf(a,b){a=a|0;b=+b;Hc(c[a>>2]|0,T(b));return}function jf(a,b){a=a|0;b=+b;Ic(c[a>>2]|0,T(b));return}function kf(a,b){a=a|0;b=+b;Xc(c[a>>2]|0,T(b));return}function lf(a,b){a=a|0;b=+b;Yc(c[a>>2]|0,T(b));return}function mf(a){a=a|0;Zc(c[a>>2]|0);return}function nf(a,b){a=a|0;b=+b;$c(c[a>>2]|0,T(b));return}function of(a,b){a=a|0;b=+b;ad(c[a>>2]|0,T(b));return}function pf(a){a=a|0;bd(c[a>>2]|0);return}function qf(a,b){a=a|0;b=+b;dd(c[a>>2]|0,T(b));return}function rf(a,b){a=a|0;b=+b;ed(c[a>>2]|0,T(b));return}function sf(a,b){a=a|0;b=+b;gd(c[a>>2]|0,T(b));return}function tf(a,b){a=a|0;b=+b;hd(c[a>>2]|0,T(b));return}function uf(a,b){a=a|0;b=+b;jd(c[a>>2]|0,T(b));return}function vf(a,b){a=a|0;b=+b;kd(c[a>>2]|0,T(b));return}function wf(a,b){a=a|0;b=+b;md(c[a>>2]|0,T(b));return}function xf(a,b){a=a|0;b=+b;nd(c[a>>2]|0,T(b));return}function yf(a,b){a=a|0;b=+b;pd(c[a>>2]|0,T(b));return}function zf(a,b,d){a=a|0;b=b|0;d=+d;Vc(c[a>>2]|0,b,T(d));return}function Af(a,b,d){a=a|0;b=b|0;d=+d;Sc(c[a>>2]|0,b,T(d));return}function Bf(a,b,d){a=a|0;b=b|0;d=+d;Tc(c[a>>2]|0,b,T(d));return}function Cf(a){a=a|0;return Ac(c[a>>2]|0)|0}function Df(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Nc(f,c[b>>2]|0,d);Ef(a,f);l=e;return}function Ef(a,b){a=a|0;b=b|0;Ff(a,c[b+4>>2]|0,+T(g[b>>2]));return}function Ff(a,b,d){a=a|0;b=b|0;d=+d;c[a>>2]=b;h[a+8>>3]=d;return}function Gf(a){a=a|0;return uc(c[a>>2]|0)|0}function Hf(a){a=a|0;return wc(c[a>>2]|0)|0}function If(a){a=a|0;return yc(c[a>>2]|0)|0}function Jf(a){a=a|0;return qc(c[a>>2]|0)|0}function Kf(a){a=a|0;return Cc(c[a>>2]|0)|0}function Lf(a){a=a|0;return sc(c[a>>2]|0)|0}function Mf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Qc(f,c[b>>2]|0,d);Ef(a,f);l=e;return}function Nf(a){a=a|0;return Ec(c[a>>2]|0)|0}function Of(a){a=a|0;return Gc(c[a>>2]|0)|0}function Pf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;kc(e,c[b>>2]|0);Ef(a,e);l=d;return}function Qf(a){a=a|0;return +(+T(gc(c[a>>2]|0)))}function Rf(a){a=a|0;return +(+T(jc(c[a>>2]|0)))}function Sf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;_c(e,c[b>>2]|0);Ef(a,e);l=d;return}function Tf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;cd(e,c[b>>2]|0);Ef(a,e);l=d;return}function Uf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;fd(e,c[b>>2]|0);Ef(a,e);l=d;return}function Vf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;id(e,c[b>>2]|0);Ef(a,e);l=d;return}function Wf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;ld(e,c[b>>2]|0);Ef(a,e);l=d;return}function Xf(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;od(e,c[b>>2]|0);Ef(a,e);l=d;return}function Yf(a){a=a|0;return +(+T(qd(c[a>>2]|0)))}function Zf(a,b){a=a|0;b=b|0;return +(+T(Wc(c[a>>2]|0,b)))}function _f(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;Uc(f,c[b>>2]|0,d);Ef(a,f);l=e;return}function $f(a,b,d){a=a|0;b=b|0;d=d|0;bc(c[a>>2]|0,c[b>>2]|0,d);return}function ag(a,b){a=a|0;b=b|0;Yb(c[a>>2]|0,c[b>>2]|0);return}function bg(a){a=a|0;return Wb(c[a>>2]|0)|0}function cg(a){a=a|0;a=cc(c[a>>2]|0)|0;if(!a)a=0;else a=Pe(a)|0;return a|0}function dg(a,b){a=a|0;b=b|0;a=Xb(c[a>>2]|0,b)|0;if(!a)a=0;else a=Pe(a)|0;return a|0}function eg(a,b){a=a|0;b=b|0;var d=0,e=0;e=bA(4)|0;fg(e,b);d=a+4|0;b=c[d>>2]|0;c[d>>2]=e;if(b|0){Ne(b);dA(b)}ac(c[a>>2]|0,1);return}function fg(a,b){a=a|0;b=b|0;zg(a,b);return}function gg(a,b,c,d,e,f){a=a|0;b=b|0;c=T(c);d=d|0;e=T(e);f=f|0;var i=0,j=0;i=l;l=l+16|0;j=i;hg(j,oc(b)|0,+c,d,+e,f);g[a>>2]=T(+h[j>>3]);g[a+4>>2]=T(+h[j+8>>3]);l=i;return}function hg(a,b,d,e,f,g){a=a|0;b=b|0;d=+d;e=e|0;f=+f;g=g|0;var i=0,j=0,k=0,m=0,n=0;i=l;l=l+32|0;n=i+8|0;m=i+20|0;k=i;j=i+16|0;h[n>>3]=d;c[m>>2]=e;h[k>>3]=f;c[j>>2]=g;ig(a,c[b+4>>2]|0,n,m,k,j);l=i;return}function ig(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var i=0,j=0;i=l;l=l+16|0;j=i;yy(j);b=jg(b)|0;kg(a,b,+h[d>>3],c[e>>2]|0,+h[f>>3],c[g>>2]|0);Ay(j);l=i;return}function jg(a){a=a|0;return c[a>>2]|0}function kg(a,b,c,d,e,f){a=a|0;b=b|0;c=+c;d=d|0;e=+e;f=f|0;var g=0;g=mg(lg()|0)|0;c=+ng(c);d=og(d)|0;e=+ng(e);pg(a,$a(0,g|0,b|0,+c,d|0,+e,og(f)|0)|0);return}function lg(){var b=0;if(!(a[8800]|0)){wg(9268);b=8800;c[b>>2]=1;c[b+4>>2]=0}return 9268}function mg(a){a=a|0;return c[a+8>>2]|0}function ng(a){a=+a;return +(+vg(a))}function og(a){a=a|0;return ug(a)|0}function pg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;d=f;e=b;if(!(e&1)){c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[a+12>>2]=c[b+12>>2]}else{qg(d,0);Ha(e|0,d|0)|0;rg(a,d);sg(d)}l=f;return}function qg(b,d){b=b|0;d=d|0;tg(b,d);c[b+8>>2]=0;a[b+24>>0]=0;return}function rg(a,b){a=a|0;b=b|0;b=b+8|0;c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[a+12>>2]=c[b+12>>2];return}function sg(b){b=b|0;a[b+24>>0]=0;return}function tg(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function ug(a){a=a|0;return a|0}function vg(a){a=+a;return +a}function wg(a){a=a|0;yg(a,xg()|0,4);return}function xg(){return 1100}function yg(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=Xa(b|0,d+1|0)|0;return}function zg(a,b){a=a|0;b=b|0;b=c[b>>2]|0;c[a>>2]=b;ya(b|0);return}function Ag(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){Ne(b);dA(b)}ac(c[a>>2]|0,0);return}function Bg(a){a=a|0;dc(c[a>>2]|0);return}function Cg(a){a=a|0;return ec(c[a>>2]|0)|0}function Dg(a,b,d,e){a=a|0;b=+b;d=+d;e=e|0;Ge(c[a>>2]|0,T(b),T(d),e);return}function Eg(a){a=a|0;return +(+T(rd(c[a>>2]|0)))}function Fg(a){a=a|0;return +(+T(td(c[a>>2]|0)))}function Gg(a){a=a|0;return +(+T(sd(c[a>>2]|0)))}function Hg(a){a=a|0;return +(+T(ud(c[a>>2]|0)))}function Ig(a){a=a|0;return +(+T(vd(c[a>>2]|0)))}function Jg(a){a=a|0;return +(+T(wd(c[a>>2]|0)))}function Kg(a,b){a=a|0;b=b|0;h[a>>3]=+T(rd(c[b>>2]|0));h[a+8>>3]=+T(td(c[b>>2]|0));h[a+16>>3]=+T(sd(c[b>>2]|0));h[a+24>>3]=+T(ud(c[b>>2]|0));h[a+32>>3]=+T(vd(c[b>>2]|0));h[a+40>>3]=+T(wd(c[b>>2]|0));return}function Lg(a,b){a=a|0;b=b|0;return +(+T(xd(c[a>>2]|0,b)))}function Mg(a,b){a=a|0;b=b|0;return +(+T(yd(c[a>>2]|0,b)))}function Ng(a,b){a=a|0;b=b|0;return +(+T(zd(c[a>>2]|0,b)))}function Og(a,b){a=a|0;b=b|0;Ie(a,b);return}function Pg(a){a=a|0;return De(a)|0}function Qg(){return $b()|0}function Rg(){Sg();Tg();Ug();Vg();Wg();Xg();Yg();return}function Sg(){Ms(11672,6116,1);return}function Tg(){us(11671,6087,3);return}function Ug(){ds(11670,6070,1);return}function Vg(){rr(10332);return}function Wg(){Zq(10292);return}function Xg(){oq(10208);return}function Yg(){Zg(9280);return}function Zg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0;b=l;l=l+672|0;d=b+656|0;Ga=b+648|0;Fa=b+640|0;Ea=b+632|0;Da=b+624|0;Ca=b+616|0;Ba=b+608|0;Aa=b+600|0;za=b+592|0;ya=b+584|0;xa=b+576|0;wa=b+568|0;va=b+560|0;ua=b+552|0;ta=b+544|0;sa=b+536|0;ra=b+528|0;qa=b+520|0;pa=b+512|0;oa=b+504|0;na=b+496|0;ma=b+488|0;la=b+480|0;ka=b+472|0;ja=b+464|0;ia=b+456|0;ha=b+448|0;ga=b+440|0;fa=b+432|0;ea=b+424|0;da=b+416|0;ca=b+408|0;ba=b+400|0;aa=b+392|0;$=b+384|0;_=b+376|0;Z=b+368|0;Y=b+360|0;X=b+352|0;W=b+344|0;V=b+336|0;U=b+328|0;T=b+320|0;S=b+312|0;R=b+304|0;Q=b+296|0;P=b+288|0;O=b+280|0;N=b+272|0;M=b+264|0;L=b+256|0;K=b+248|0;J=b+240|0;I=b+232|0;H=b+224|0;G=b+216|0;F=b+208|0;E=b+200|0;D=b+192|0;C=b+184|0;B=b+176|0;A=b+168|0;z=b+160|0;y=b+152|0;x=b+144|0;w=b+136|0;v=b+128|0;u=b+120|0;t=b+112|0;s=b+104|0;r=b+96|0;q=b+88|0;p=b+80|0;o=b+72|0;n=b+64|0;m=b+56|0;k=b+48|0;j=b+40|0;i=b+32|0;h=b+24|0;g=b+16|0;f=b+8|0;e=b;_g(a,4895);$g(a,4900,2)|0;ah(a,4907,18)|0;c[Ga>>2]=19;c[Ga+4>>2]=0;c[d>>2]=c[Ga>>2];c[d+4>>2]=c[Ga+4>>2];bh(a,4915,d)|0;c[Fa>>2]=2;c[Fa+4>>2]=0;c[d>>2]=c[Fa>>2];c[d+4>>2]=c[Fa+4>>2];ch(a,4921,d)|0;c[Ea>>2]=3;c[Ea+4>>2]=0;c[d>>2]=c[Ea>>2];c[d+4>>2]=c[Ea+4>>2];dh(a,4931,d)|0;c[Da>>2]=1;c[Da+4>>2]=0;c[d>>2]=c[Da>>2];c[d+4>>2]=c[Da+4>>2];eh(a,4947,d)|0;c[Ca>>2]=2;c[Ca+4>>2]=0;c[d>>2]=c[Ca>>2];c[d+4>>2]=c[Ca+4>>2];eh(a,4959,d)|0;c[Ba>>2]=4;c[Ba+4>>2]=0;c[d>>2]=c[Ba>>2];c[d+4>>2]=c[Ba+4>>2];dh(a,4978,d)|0;c[Aa>>2]=5;c[Aa+4>>2]=0;c[d>>2]=c[Aa>>2];c[d+4>>2]=c[Aa+4>>2];dh(a,4994,d)|0;c[za>>2]=6;c[za+4>>2]=0;c[d>>2]=c[za>>2];c[d+4>>2]=c[za+4>>2];dh(a,5008,d)|0;c[ya>>2]=7;c[ya+4>>2]=0;c[d>>2]=c[ya>>2];c[d+4>>2]=c[ya+4>>2];dh(a,5021,d)|0;c[xa>>2]=8;c[xa+4>>2]=0;c[d>>2]=c[xa>>2];c[d+4>>2]=c[xa+4>>2];dh(a,5038,d)|0;c[wa>>2]=9;c[wa+4>>2]=0;c[d>>2]=c[wa>>2];c[d+4>>2]=c[wa+4>>2];dh(a,5050,d)|0;c[va>>2]=3;c[va+4>>2]=0;c[d>>2]=c[va>>2];c[d+4>>2]=c[va+4>>2];eh(a,5068,d)|0;c[ua>>2]=4;c[ua+4>>2]=0;c[d>>2]=c[ua>>2];c[d+4>>2]=c[ua+4>>2];eh(a,5078,d)|0;c[ta>>2]=10;c[ta+4>>2]=0;c[d>>2]=c[ta>>2];c[d+4>>2]=c[ta+4>>2];dh(a,5095,d)|0;c[sa>>2]=11;c[sa+4>>2]=0;c[d>>2]=c[sa>>2];c[d+4>>2]=c[sa+4>>2];dh(a,5109,d)|0;c[ra>>2]=12;c[ra+4>>2]=0;c[d>>2]=c[ra>>2];c[d+4>>2]=c[ra+4>>2];dh(a,5121,d)|0;c[qa>>2]=1;c[qa+4>>2]=0;c[d>>2]=c[qa>>2];c[d+4>>2]=c[qa+4>>2];fh(a,5132,d)|0;c[pa>>2]=2;c[pa+4>>2]=0;c[d>>2]=c[pa>>2];c[d+4>>2]=c[pa+4>>2];fh(a,5140,d)|0;c[oa>>2]=3;c[oa+4>>2]=0;c[d>>2]=c[oa>>2];c[d+4>>2]=c[oa+4>>2];fh(a,5153,d)|0;c[na>>2]=4;c[na+4>>2]=0;c[d>>2]=c[na>>2];c[d+4>>2]=c[na+4>>2];fh(a,5173,d)|0;c[ma>>2]=5;c[ma+4>>2]=0;c[d>>2]=c[ma>>2];c[d+4>>2]=c[ma+4>>2];fh(a,5185,d)|0;c[la>>2]=6;c[la+4>>2]=0;c[d>>2]=c[la>>2];c[d+4>>2]=c[la+4>>2];fh(a,5199,d)|0;c[ka>>2]=7;c[ka+4>>2]=0;c[d>>2]=c[ka>>2];c[d+4>>2]=c[ka+4>>2];fh(a,5208,d)|0;c[ja>>2]=20;c[ja+4>>2]=0;c[d>>2]=c[ja>>2];c[d+4>>2]=c[ja+4>>2];bh(a,5224,d)|0;c[ia>>2]=8;c[ia+4>>2]=0;c[d>>2]=c[ia>>2];c[d+4>>2]=c[ia+4>>2];fh(a,5237,d)|0;c[ha>>2]=9;c[ha+4>>2]=0;c[d>>2]=c[ha>>2];c[d+4>>2]=c[ha+4>>2];fh(a,5247,d)|0;c[ga>>2]=21;c[ga+4>>2]=0;c[d>>2]=c[ga>>2];c[d+4>>2]=c[ga+4>>2];bh(a,5264,d)|0;c[fa>>2]=10;c[fa+4>>2]=0;c[d>>2]=c[fa>>2];c[d+4>>2]=c[fa+4>>2];fh(a,5278,d)|0;c[ea>>2]=11;c[ea+4>>2]=0;c[d>>2]=c[ea>>2];c[d+4>>2]=c[ea+4>>2];fh(a,5290,d)|0;c[da>>2]=12;c[da+4>>2]=0;c[d>>2]=c[da>>2];c[d+4>>2]=c[da+4>>2];fh(a,5309,d)|0;c[ca>>2]=13;c[ca+4>>2]=0;c[d>>2]=c[ca>>2];c[d+4>>2]=c[ca+4>>2];fh(a,5322,d)|0;c[ba>>2]=14;c[ba+4>>2]=0;c[d>>2]=c[ba>>2];c[d+4>>2]=c[ba+4>>2];fh(a,5342,d)|0;c[aa>>2]=15;c[aa+4>>2]=0;c[d>>2]=c[aa>>2];c[d+4>>2]=c[aa+4>>2];fh(a,5354,d)|0;c[$>>2]=16;c[$+4>>2]=0;c[d>>2]=c[$>>2];c[d+4>>2]=c[$+4>>2];fh(a,5373,d)|0;c[_>>2]=17;c[_+4>>2]=0;c[d>>2]=c[_>>2];c[d+4>>2]=c[_+4>>2];fh(a,5386,d)|0;c[Z>>2]=18;c[Z+4>>2]=0;c[d>>2]=c[Z>>2];c[d+4>>2]=c[Z+4>>2];fh(a,5406,d)|0;c[Y>>2]=5;c[Y+4>>2]=0;c[d>>2]=c[Y>>2];c[d+4>>2]=c[Y+4>>2];eh(a,5421,d)|0;c[X>>2]=6;c[X+4>>2]=0;c[d>>2]=c[X>>2];c[d+4>>2]=c[X+4>>2];eh(a,5431,d)|0;c[W>>2]=7;c[W+4>>2]=0;c[d>>2]=c[W>>2];c[d+4>>2]=c[W+4>>2];eh(a,5442,d)|0;c[V>>2]=4;c[V+4>>2]=0;c[d>>2]=c[V>>2];c[d+4>>2]=c[V+4>>2];gh(a,5460,d)|0;c[U>>2]=1;c[U+4>>2]=0;c[d>>2]=c[U>>2];c[d+4>>2]=c[U+4>>2];hh(a,5476,d)|0;c[T>>2]=5;c[T+4>>2]=0;c[d>>2]=c[T>>2];c[d+4>>2]=c[T+4>>2];gh(a,5488,d)|0;c[S>>2]=6;c[S+4>>2]=0;c[d>>2]=c[S>>2];c[d+4>>2]=c[S+4>>2];gh(a,5504,d)|0;c[R>>2]=7;c[R+4>>2]=0;c[d>>2]=c[R>>2];c[d+4>>2]=c[R+4>>2];gh(a,5518,d)|0;c[Q>>2]=8;c[Q+4>>2]=0;c[d>>2]=c[Q>>2];c[d+4>>2]=c[Q+4>>2];gh(a,5531,d)|0;c[P>>2]=9;c[P+4>>2]=0;c[d>>2]=c[P>>2];c[d+4>>2]=c[P+4>>2];gh(a,5548,d)|0;c[O>>2]=10;c[O+4>>2]=0;c[d>>2]=c[O>>2];c[d+4>>2]=c[O+4>>2];gh(a,5560,d)|0;c[N>>2]=2;c[N+4>>2]=0;c[d>>2]=c[N>>2];c[d+4>>2]=c[N+4>>2];hh(a,5578,d)|0;c[M>>2]=13;c[M+4>>2]=0;c[d>>2]=c[M>>2];c[d+4>>2]=c[M+4>>2];ih(a,5588,d)|0;c[L>>2]=1;c[L+4>>2]=0;c[d>>2]=c[L>>2];c[d+4>>2]=c[L+4>>2];jh(a,5601,d)|0;c[K>>2]=2;c[K+4>>2]=0;c[d>>2]=c[K>>2];c[d+4>>2]=c[K+4>>2];jh(a,5613,d)|0;c[J>>2]=14;c[J+4>>2]=0;c[d>>2]=c[J>>2];c[d+4>>2]=c[J+4>>2];ih(a,5627,d)|0;c[I>>2]=15;c[I+4>>2]=0;c[d>>2]=c[I>>2];c[d+4>>2]=c[I+4>>2];ih(a,5636,d)|0;c[H>>2]=16;c[H+4>>2]=0;c[d>>2]=c[H>>2];c[d+4>>2]=c[H+4>>2];ih(a,5646,d)|0;c[G>>2]=17;c[G+4>>2]=0;c[d>>2]=c[G>>2];c[d+4>>2]=c[G+4>>2];ih(a,5658,d)|0;c[F>>2]=18;c[F+4>>2]=0;c[d>>2]=c[F>>2];c[d+4>>2]=c[F+4>>2];ih(a,5671,d)|0;c[E>>2]=19;c[E+4>>2]=0;c[d>>2]=c[E>>2];c[d+4>>2]=c[E+4>>2];ih(a,5683,d)|0;c[D>>2]=3;c[D+4>>2]=0;c[d>>2]=c[D>>2];c[d+4>>2]=c[D+4>>2];jh(a,5696,d)|0;c[C>>2]=1;c[C+4>>2]=0;c[d>>2]=c[C>>2];c[d+4>>2]=c[C+4>>2];kh(a,5711,d)|0;c[B>>2]=11;c[B+4>>2]=0;c[d>>2]=c[B>>2];c[d+4>>2]=c[B+4>>2];gh(a,5721,d)|0;c[A>>2]=12;c[A+4>>2]=0;c[d>>2]=c[A>>2];c[d+4>>2]=c[A+4>>2];gh(a,5733,d)|0;c[z>>2]=3;c[z+4>>2]=0;c[d>>2]=c[z>>2];c[d+4>>2]=c[z+4>>2];hh(a,5744,d)|0;c[y>>2]=4;c[y+4>>2]=0;c[d>>2]=c[y>>2];c[d+4>>2]=c[y+4>>2];lh(a,5755,d)|0;c[x>>2]=20;c[x+4>>2]=0;c[d>>2]=c[x>>2];c[d+4>>2]=c[x+4>>2];mh(a,5767,d)|0;c[w>>2]=13;c[w+4>>2]=0;c[d>>2]=c[w>>2];c[d+4>>2]=c[w+4>>2];nh(a,5779,d)|0;c[v>>2]=14;c[v+4>>2]=0;c[d>>2]=c[v>>2];c[d+4>>2]=c[v+4>>2];oh(a,5793,d)|0;c[u>>2]=3;c[u+4>>2]=0;c[d>>2]=c[u>>2];c[d+4>>2]=c[u+4>>2];ph(a,5803,d)|0;c[t>>2]=21;c[t+4>>2]=0;c[d>>2]=c[t>>2];c[d+4>>2]=c[t+4>>2];qh(a,5812,d)|0;c[s>>2]=22;c[s+4>>2]=0;c[d>>2]=c[s>>2];c[d+4>>2]=c[s+4>>2];bh(a,5827,d)|0;c[r>>2]=23;c[r+4>>2]=0;c[d>>2]=c[r>>2];c[d+4>>2]=c[r+4>>2];bh(a,5844,d)|0;c[q>>2]=15;c[q+4>>2]=0;c[d>>2]=c[q>>2];c[d+4>>2]=c[q+4>>2];rh(a,5854,d)|0;c[p>>2]=1;c[p+4>>2]=0;c[d>>2]=c[p>>2];c[d+4>>2]=c[p+4>>2];sh(a,5862,d)|0;c[o>>2]=4;c[o+4>>2]=0;c[d>>2]=c[o>>2];c[d+4>>2]=c[o+4>>2];jh(a,5878,d)|0;c[n>>2]=5;c[n+4>>2]=0;c[d>>2]=c[n>>2];c[d+4>>2]=c[n+4>>2];jh(a,5894,d)|0;c[m>>2]=6;c[m+4>>2]=0;c[d>>2]=c[m>>2];c[d+4>>2]=c[m+4>>2];jh(a,5911,d)|0;c[k>>2]=7;c[k+4>>2]=0;c[d>>2]=c[k>>2];c[d+4>>2]=c[k+4>>2];jh(a,5926,d)|0;c[j>>2]=8;c[j+4>>2]=0;c[d>>2]=c[j>>2];c[d+4>>2]=c[j+4>>2];jh(a,5944,d)|0;c[i>>2]=9;c[i+4>>2]=0;c[d>>2]=c[i>>2];c[d+4>>2]=c[i+4>>2];jh(a,5961,d)|0;c[h>>2]=22;c[h+4>>2]=0;c[d>>2]=c[h>>2];c[d+4>>2]=c[h+4>>2];th(a,5979,d)|0;c[g>>2]=2;c[g+4>>2]=0;c[d>>2]=c[g>>2];c[d+4>>2]=c[g+4>>2];kh(a,5997,d)|0;c[f>>2]=3;c[f+4>>2]=0;c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];kh(a,6015,d)|0;c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];kh(a,6033,d)|0;l=b;return}function _g(a,b){a=a|0;b=b|0;var d=0;d=dq()|0;c[a>>2]=d;eq(d,b);lt(c[a>>2]|0);return}function $g(a,b,c){a=a|0;b=b|0;c=c|0;Op(a,vh(b)|0,c,0);return a|0}function ah(a,b,c){a=a|0;b=b|0;c=c|0;xp(a,vh(b)|0,c,0);return a|0}function bh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ep(a,b,f);l=e;return a|0}function ch(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ko(a,b,f);l=e;return a|0}function dh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ro(a,b,f);l=e;return a|0}function eh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Zn(a,b,f);l=e;return a|0}function fh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Gn(a,b,f);l=e;return a|0}function gh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];nn(a,b,f);l=e;return a|0}function hh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Vm(a,b,f);l=e;return a|0}function ih(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];nm(a,b,f);l=e;return a|0}function jh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Wl(a,b,f);l=e;return a|0}function kh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Dl(a,b,f);l=e;return a|0}function lh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];kl(a,b,f);l=e;return a|0}function mh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Qk(a,b,f);l=e;return a|0}function nh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];wk(a,b,f);l=e;return a|0}function oh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];dk(a,b,f);l=e;return a|0}function ph(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ij(a,b,f);l=e;return a|0}function qh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];kj(a,b,f);l=e;return a|0}function rh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Si(a,b,f);l=e;return a|0}function sh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ti(a,b,f);l=e;return a|0}function th(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=c[d+4>>2]|0;c[g>>2]=c[d>>2];c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];uh(a,b,f);l=e;return a|0}function uh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];wh(a,d,f,1);l=e;return}function vh(a){a=a|0;return a|0}function wh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=xh()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=yh(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,zh(g,e)|0,e);l=f;return}function xh(){var b=0,d=0;if(!(a[8808]|0)){Lh(9284);Fa(24,9284,o|0)|0;d=8808;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9284)|0)){b=9284;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Lh(9284)}return 9284}function yh(a){a=a|0;return 0}function zh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=xh()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Fh(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Gh(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Ah(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;h=l;l=l+32|0;o=h+24|0;n=h+20|0;j=h+16|0;m=h+12|0;k=h+8|0;i=h+4|0;p=h;c[n>>2]=b;c[j>>2]=d;c[m>>2]=e;c[k>>2]=f;c[i>>2]=g;g=a+28|0;c[p>>2]=c[g>>2];c[o>>2]=c[p>>2];Bh(a+24|0,o,n,m,k,j,i)|0;c[g>>2]=c[c[g>>2]>>2];l=h;return}function Bh(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;a=Ch(b)|0;b=bA(24)|0;Dh(b+4|0,c[d>>2]|0,c[e>>2]|0,c[f>>2]|0,c[g>>2]|0,c[h>>2]|0);c[b>>2]=c[a>>2];c[a>>2]=b;return b|0}function Ch(a){a=a|0;return c[a>>2]|0}function Dh(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=f;c[a+16>>2]=g;return}function Eh(a,b){a=a|0;b=b|0;return b|a|0}function Fh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Gh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Hh(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Ih(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Fh(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Jh(a,i);Kh(i);l=k;return}}function Hh(a){a=a|0;return 357913941}function Ih(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Jh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Kh(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Lh(a){a=a|0;Ph(a);return}function Mh(a){a=a|0;Oh(a+24|0);return}function Nh(a){a=a|0;return c[a>>2]|0}function Oh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Ph(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,4,b,Rh()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Qh(){return 9376}function Rh(){return 1176}function Sh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=Uh(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=Vh(b,e)|0;l=d;return b|0}function Th(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=e;c[a+12>>2]=f;c[a+16>>2]=g;return}function Uh(a){a=a|0;return (c[(xh()|0)+24>>2]|0)+(a*12|0)|0}function Vh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+48|0;e=f;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;kb[d&31](e,a);e=Wh(e)|0;l=f;return e|0}function Wh(a){a=a|0;var b=0,c=0,d=0,e=0;e=l;l=l+32|0;b=e+12|0;c=e;d=Yh(Xh()|0)|0;if(!d)a=bi(a)|0;else{Zh(b,d);_h(c,b);$h(a,c);a=ai(b)|0}l=e;return a|0}function Xh(){var b=0;if(!(a[8824]|0)){mi(9332);Fa(25,9332,o|0)|0;b=8824;c[b>>2]=1;c[b+4>>2]=0}return 9332}function Yh(a){a=a|0;return c[a+36>>2]|0}function Zh(a,b){a=a|0;b=b|0;c[a>>2]=b;c[a+4>>2]=a;c[a+8>>2]=0;return}function _h(a,b){a=a|0;b=b|0;c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=0;return}function $h(a,b){a=a|0;b=b|0;gi(b,a,a+8|0,a+16|0,a+24|0,a+32|0,a+40|0)|0;return}function ai(a){a=a|0;return c[(c[a+4>>2]|0)+8>>2]|0}function bi(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=l;l=l+16|0;d=j+4|0;e=j;f=Pv(8)|0;g=f;h=bA(48)|0;i=h;b=i+48|0;do{c[i>>2]=c[a>>2];i=i+4|0;a=a+4|0}while((i|0)<(b|0));b=g+4|0;c[b>>2]=h;i=bA(8)|0;h=c[b>>2]|0;c[e>>2]=0;c[d>>2]=c[e>>2];ci(i,h,d);c[f>>2]=i;l=j;return g|0}function ci(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=bA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1128;c[d+12>>2]=b;c[a+4>>2]=d;return}function di(a){a=a|0;Xz(a);dA(a);return}function ei(a){a=a|0;a=c[a+12>>2]|0;if(a|0)dA(a);return}function fi(a){a=a|0;dA(a);return}function gi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;g=hi(c[a>>2]|0,b,d,e,f,g,h)|0;h=a+4|0;c[(c[h>>2]|0)+8>>2]=g;return c[(c[h>>2]|0)+8>>2]|0}function hi(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var i=0,j=0;i=l;l=l+16|0;j=i;yy(j);a=jg(a)|0;g=ii(a,+h[b>>3],+h[c>>3],+h[d>>3],+h[e>>3],+h[f>>3],+h[g>>3])|0;Ay(j);l=i;return g|0}function ii(a,b,c,d,e,f,g){a=a|0;b=+b;c=+c;d=+d;e=+e;f=+f;g=+g;var h=0;h=mg(ji()|0)|0;b=+ng(b);c=+ng(c);d=+ng(d);e=+ng(e);f=+ng(f);return wa(0,h|0,a|0,+b,+c,+d,+e,+f,+(+ng(g)))|0}function ji(){var b=0;if(!(a[8816]|0)){ki(9320);b=8816;c[b>>2]=1;c[b+4>>2]=0}return 9320}function ki(a){a=a|0;yg(a,li()|0,6);return}function li(){return 1148}function mi(a){a=a|0;si(a);return}function ni(a){a=a|0;oi(a+24|0);pi(a+16|0);return}function oi(a){a=a|0;ri(a);return}function pi(a){a=a|0;qi(a);return}function qi(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b|0)do{d=b;b=c[b>>2]|0;dA(d)}while((b|0)!=0);c[a>>2]=0;return}function ri(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b|0)do{d=b;b=c[b>>2]|0;dA(d)}while((b|0)!=0);c[a>>2]=0;return}function si(b){b=b|0;var d=0;c[b+16>>2]=0;c[b+20>>2]=0;d=b+24|0;c[d>>2]=0;c[b+28>>2]=d;c[b+36>>2]=0;a[b+40>>0]=0;a[b+41>>0]=0;return}function ti(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ui(a,d,f,0);l=e;return}function ui(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=vi()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=wi(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,xi(g,e)|0,e);l=f;return}function vi(){var b=0,d=0;if(!(a[8832]|0)){Ei(9380);Fa(26,9380,o|0)|0;d=8832;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9380)|0)){b=9380;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Ei(9380)}return 9380}function wi(a){a=a|0;return 0}function xi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=vi()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];yi(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{zi(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function yi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function zi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Ai(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Bi(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];yi(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Ci(a,i);Di(i);l=k;return}}function Ai(a){a=a|0;return 357913941}function Bi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Ci(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Di(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Ei(a){a=a|0;Hi(a);return}function Fi(a){a=a|0;Gi(a+24|0);return}function Gi(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Hi(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,1,b,Ii()|0,3);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Ii(){return 1180}function Ji(a,b,d,e,f){a=a|0;b=b|0;d=+d;e=+e;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+16|0;h=g+8|0;i=g;j=Ki(a)|0;a=c[j+4>>2]|0;c[i>>2]=c[j>>2];c[i+4>>2]=a;c[h>>2]=c[i>>2];c[h+4>>2]=c[i+4>>2];Li(b,h,d,e,f);l=g;return}function Ki(a){a=a|0;return (c[(vi()|0)+24>>2]|0)+(a*12|0)|0}function Li(a,b,d,e,f){a=a|0;b=b|0;d=+d;e=+e;f=f|0;var g=0,h=0,i=0,j=0,k=0;k=l;l=l+16|0;h=k+2|0;i=k+1|0;j=k;g=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)g=c[(c[a>>2]|0)+g>>2]|0;Mi(h,d);d=+Ni(h,d);Mi(i,e);e=+Ni(i,e);Oi(j,f);j=Pi(j,f)|0;mb[g&1](a,d,e,j);l=k;return}function Mi(a,b){a=a|0;b=+b;return}function Ni(a,b){a=a|0;b=+b;return +(+Ri(b))}function Oi(a,b){a=a|0;b=b|0;return}function Pi(a,b){a=a|0;b=b|0;return Qi(b)|0}function Qi(a){a=a|0;return a|0}function Ri(a){a=+a;return +a}function Si(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Ti(a,d,f,1);l=e;return}function Ti(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Ui()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Vi(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Wi(g,e)|0,e);l=f;return}function Ui(){var b=0,d=0;if(!(a[8840]|0)){bj(9416);Fa(27,9416,o|0)|0;d=8840;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9416)|0)){b=9416;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));bj(9416)}return 9416}function Vi(a){a=a|0;return 0}function Wi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Ui()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Xi(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Yi(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Xi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Yi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Zi(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;_i(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Xi(g,e,d);c[j>>2]=(c[j>>2]|0)+12;$i(a,i);aj(i);l=k;return}}function Zi(a){a=a|0;return 357913941}function _i(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function $i(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function aj(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function bj(a){a=a|0;ej(a);return}function cj(a){a=a|0;dj(a+24|0);return}function dj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function ej(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,5,b,fj()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function fj(){return 1196}function gj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=hj(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=ij(b,e)|0;l=d;return b|0}function hj(a){a=a|0;return (c[(Ui()|0)+24>>2]|0)+(a*12|0)|0}function ij(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return jj(lb[d&31](a)|0)|0}function jj(a){a=a|0;return a&1|0}function kj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];lj(a,d,f,0);l=e;return}function lj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=mj()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=nj(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,oj(g,e)|0,e);l=f;return}function mj(){var b=0,d=0;if(!(a[8848]|0)){vj(9452);Fa(28,9452,o|0)|0;d=8848;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9452)|0)){b=9452;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));vj(9452)}return 9452}function nj(a){a=a|0;return 0}function oj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=mj()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];pj(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{qj(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function pj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function qj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=rj(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;sj(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];pj(g,e,d);c[j>>2]=(c[j>>2]|0)+12;tj(a,i);uj(i);l=k;return}}function rj(a){a=a|0;return 357913941}function sj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function tj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function uj(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function vj(a){a=a|0;yj(a);return}function wj(a){a=a|0;xj(a+24|0);return}function xj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function yj(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,5,b,zj()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function zj(){return 1200}function Aj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Bj(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Cj(b,f,d);l=e;return}function Bj(a){a=a|0;return (c[(mj()|0)+24>>2]|0)+(a*12|0)|0}function Cj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Dj(f,d);d=Ej(f,d)|0;kb[e&31](a,d);Fj(f);l=g;return}function Dj(a,b){a=a|0;b=b|0;Gj(a,b);return}function Ej(a,b){a=a|0;b=b|0;return a|0}function Fj(a){a=a|0;Ne(a);return}function Gj(a,b){a=a|0;b=b|0;Hj(a,b);return}function Hj(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function Ij(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Jj(a,d,f,0);l=e;return}function Jj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Kj()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Lj(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Mj(g,e)|0,e);l=f;return}function Kj(){var b=0,d=0;if(!(a[8856]|0)){Tj(9488);Fa(29,9488,o|0)|0;d=8856;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9488)|0)){b=9488;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Tj(9488)}return 9488}function Lj(a){a=a|0;return 0}function Mj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Kj()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Nj(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Oj(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Nj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Oj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Pj(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Qj(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Nj(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Rj(a,i);Sj(i);l=k;return}}function Pj(a){a=a|0;return 357913941}function Qj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Rj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Sj(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Tj(a){a=a|0;Wj(a);return}function Uj(a){a=a|0;Vj(a+24|0);return}function Vj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Wj(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,5,b,Xj()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Xj(){return 1216}function Yj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Zj(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];d=_j(b,f,d)|0;l=e;return d|0}function Zj(a){a=a|0;return (c[(Kj()|0)+24>>2]|0)+(a*12|0)|0}function _j(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;$j(f,d);f=ak(f,d)|0;f=bk(sb[e&15](a,f)|0)|0;l=g;return f|0}function $j(a,b){a=a|0;b=b|0;return}function ak(a,b){a=a|0;b=b|0;return ck(b)|0}function bk(a){a=a|0;return a|0}function ck(a){a=a|0;return a|0}function dk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ek(a,d,f,0);l=e;return}function ek(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=fk()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=gk(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,hk(g,e)|0,e);l=f;return}function fk(){var b=0,d=0;if(!(a[8864]|0)){ok(9524);Fa(30,9524,o|0)|0;d=8864;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9524)|0)){b=9524;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));ok(9524)}return 9524}function gk(a){a=a|0;return 0}function hk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=fk()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];ik(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{jk(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function ik(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function jk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=kk(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;lk(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];ik(g,e,d);c[j>>2]=(c[j>>2]|0)+12;mk(a,i);nk(i);l=k;return}}function kk(a){a=a|0;return 357913941}function lk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function mk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function nk(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function ok(a){a=a|0;rk(a);return}function pk(a){a=a|0;qk(a+24|0);return}function qk(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function rk(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,6,b,sk()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function sk(){return 1232}function tk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=uk(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=vk(b,e)|0;l=d;return b|0}function uk(a){a=a|0;return (c[(fk()|0)+24>>2]|0)+(a*12|0)|0}function vk(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return bk(lb[d&31](a)|0)|0}function wk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];xk(a,d,f,1);l=e;return}function xk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=yk()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=zk(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Ak(g,e)|0,e);l=f;return}function yk(){var b=0,d=0;if(!(a[8872]|0)){Hk(9560);Fa(31,9560,o|0)|0;d=8872;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9560)|0)){b=9560;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Hk(9560)}return 9560}function zk(a){a=a|0;return 0}function Ak(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=yk()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Bk(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Ck(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Bk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Ck(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Dk(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Ek(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Bk(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Fk(a,i);Gk(i);l=k;return}}function Dk(a){a=a|0;return 357913941}function Ek(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Fk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Gk(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Hk(a){a=a|0;Kk(a);return}function Ik(a){a=a|0;Jk(a+24|0);return}function Jk(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Kk(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,7,b,Lk()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Lk(){return 1236}function Mk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=Nk(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=Ok(b,e)|0;l=d;return b|0}function Nk(a){a=a|0;return (c[(yk()|0)+24>>2]|0)+(a*12|0)|0}function Ok(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return Pk(lb[d&31](a)|0)|0}function Pk(a){a=a|0;return a|0}function Qk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Rk(a,d,f,0);l=e;return}function Rk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Sk()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Tk(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Uk(g,e)|0,e);l=f;return}function Sk(){var b=0,d=0;if(!(a[8880]|0)){$k(9596);Fa(32,9596,o|0)|0;d=8880;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9596)|0)){b=9596;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));$k(9596)}return 9596}function Tk(a){a=a|0;return 0}function Uk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Sk()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Vk(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Wk(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Vk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Wk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Xk(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Yk(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Vk(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Zk(a,i);_k(i);l=k;return}}function Xk(a){a=a|0;return 357913941}function Yk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Zk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function _k(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function $k(a){a=a|0;cl(a);return}function al(a){a=a|0;bl(a+24|0);return}function bl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function cl(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,6,b,dl()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function dl(){return 1240}function el(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=fl(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];gl(b,f,d);l=e;return}function fl(a){a=a|0;return (c[(Sk()|0)+24>>2]|0)+(a*12|0)|0}function gl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;hl(f,d);f=il(f,d)|0;kb[e&31](a,f);l=g;return}function hl(a,b){a=a|0;b=b|0;return}function il(a,b){a=a|0;b=b|0;return jl(b)|0}function jl(a){a=a|0;return a|0}function kl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ll(a,d,f,0);l=e;return}function ll(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=ml()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=nl(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,ol(g,e)|0,e);l=f;return}function ml(){var b=0,d=0;if(!(a[8888]|0)){vl(9632);Fa(33,9632,o|0)|0;d=8888;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9632)|0)){b=9632;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));vl(9632)}return 9632}function nl(a){a=a|0;return 0}function ol(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=ml()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];pl(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{ql(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function pl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function ql(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=rl(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;sl(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];pl(g,e,d);c[j>>2]=(c[j>>2]|0)+12;tl(a,i);ul(i);l=k;return}}function rl(a){a=a|0;return 357913941}function sl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function tl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function ul(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function vl(a){a=a|0;yl(a);return}function wl(a){a=a|0;xl(a+24|0);return}function xl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function yl(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,1,b,zl()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function zl(){return 1248}function Al(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+8|0;h=f;i=Bl(a)|0;a=c[i+4>>2]|0;c[h>>2]=c[i>>2];c[h+4>>2]=a;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];Cl(b,g,d,e);l=f;return}function Bl(a){a=a|0;return (c[(ml()|0)+24>>2]|0)+(a*12|0)|0}function Cl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;i=l;l=l+16|0;g=i+1|0;h=i;f=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)f=c[(c[a>>2]|0)+f>>2]|0;hl(g,d);g=il(g,d)|0;$j(h,e);h=ak(h,e)|0;zb[f&15](a,g,h);l=i;return}function Dl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];El(a,d,f,1);l=e;return}function El(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Fl()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Gl(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Hl(g,e)|0,e);l=f;return}function Fl(){var b=0,d=0;if(!(a[8896]|0)){Ol(9668);Fa(34,9668,o|0)|0;d=8896;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9668)|0)){b=9668;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Ol(9668)}return 9668}function Gl(a){a=a|0;return 0}function Hl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Fl()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Il(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Jl(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Il(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Jl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Kl(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;Ll(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Il(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Ml(a,i);Nl(i);l=k;return}}function Kl(a){a=a|0;return 357913941}function Ll(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Ml(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Nl(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Ol(a){a=a|0;Rl(a);return}function Pl(a){a=a|0;Ql(a+24|0);return}function Ql(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Rl(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,1,b,Sl()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Sl(){return 1260}function Tl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0.0,f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+8|0;h=f;i=Ul(a)|0;a=c[i+4>>2]|0;c[h>>2]=c[i>>2];c[h+4>>2]=a;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];e=+Vl(b,g,d);l=f;return +e}function Ul(a){a=a|0;return (c[(Fl()|0)+24>>2]|0)+(a*12|0)|0}function Vl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0.0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Oi(f,d);f=Pi(f,d)|0;h=+vg(+vb[e&7](a,f));l=g;return +h}function Wl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Xl(a,d,f,1);l=e;return}function Xl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Yl()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Zl(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,_l(g,e)|0,e);l=f;return}function Yl(){var b=0,d=0;if(!(a[8904]|0)){fm(9704);Fa(35,9704,o|0)|0;d=8904;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9704)|0)){b=9704;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));fm(9704)}return 9704}function Zl(a){a=a|0;return 0}function _l(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Yl()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];$l(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{am(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function $l(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function am(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=bm(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;cm(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];$l(g,e,d);c[j>>2]=(c[j>>2]|0)+12;dm(a,i);em(i);l=k;return}}function bm(a){a=a|0;return 357913941}function cm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function dm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function em(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function fm(a){a=a|0;im(a);return}function gm(a){a=a|0;hm(a+24|0);return}function hm(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function im(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,5,b,jm()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function jm(){return 1268}function km(a,b){a=a|0;b=b|0;var d=0.0,e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=lm(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];d=+mm(b,f);l=e;return +d}function lm(a){a=a|0;return (c[(Yl()|0)+24>>2]|0)+(a*12|0)|0}function mm(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return +(+vg(+qb[d&15](a)))}function nm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];om(a,d,f,1);l=e;return}function om(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=pm()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=qm(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,rm(g,e)|0,e);l=f;return}function pm(){var b=0,d=0;if(!(a[8912]|0)){ym(9740);Fa(36,9740,o|0)|0;d=8912;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9740)|0)){b=9740;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));ym(9740)}return 9740}function qm(a){a=a|0;return 0}function rm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=pm()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];sm(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{tm(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function sm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function tm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=um(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;vm(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];sm(g,e,d);c[j>>2]=(c[j>>2]|0)+12;wm(a,i);xm(i);l=k;return}}function um(a){a=a|0;return 357913941}function vm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function wm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function xm(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function ym(a){a=a|0;Bm(a);return}function zm(a){a=a|0;Am(a+24|0);return}function Am(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Bm(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,8,b,Cm()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Cm(){return 1312}function Dm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=Em(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=Fm(b,e)|0;l=d;return b|0}function Em(a){a=a|0;return (c[(pm()|0)+24>>2]|0)+(a*12|0)|0}function Fm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;e=f;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;kb[d&31](e,a);e=Gm(e)|0;l=f;return e|0}function Gm(a){a=a|0;var b=0,c=0,d=0,e=0;e=l;l=l+32|0;b=e+12|0;c=e;d=Yh(Hm()|0)|0;if(!d)a=Jm(a)|0;else{Zh(b,d);_h(c,b);Im(a,c);a=ai(b)|0}l=e;return a|0}function Hm(){var b=0;if(!(a[8928]|0)){Um(9788);Fa(25,9788,o|0)|0;b=8928;c[b>>2]=1;c[b+4>>2]=0}return 9788}function Im(a,b){a=a|0;b=b|0;Om(b,a,a+8|0)|0;return}function Jm(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;d=l;l=l+16|0;f=d+4|0;h=d;e=Pv(8)|0;b=e;i=bA(16)|0;c[i>>2]=c[a>>2];c[i+4>>2]=c[a+4>>2];c[i+8>>2]=c[a+8>>2];c[i+12>>2]=c[a+12>>2];g=b+4|0;c[g>>2]=i;a=bA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];Km(a,g,f);c[e>>2]=a;l=d;return b|0}function Km(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=bA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1280;c[d+12>>2]=b;c[a+4>>2]=d;return}function Lm(a){a=a|0;Xz(a);dA(a);return}function Mm(a){a=a|0;a=c[a+12>>2]|0;if(a|0)dA(a);return}function Nm(a){a=a|0;dA(a);return}function Om(a,b,d){a=a|0;b=b|0;d=d|0;b=Pm(c[a>>2]|0,b,d)|0;d=a+4|0;c[(c[d>>2]|0)+8>>2]=b;return c[(c[d>>2]|0)+8>>2]|0}function Pm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;yy(f);a=jg(a)|0;d=Qm(a,c[b>>2]|0,+h[d>>3])|0;Ay(f);l=e;return d|0}function Qm(a,b,c){a=a|0;b=b|0;c=+c;var d=0;d=mg(Rm()|0)|0;b=og(b)|0;return xa(0,d|0,a|0,b|0,+(+ng(c)))|0}function Rm(){var b=0;if(!(a[8920]|0)){Sm(9776);b=8920;c[b>>2]=1;c[b+4>>2]=0}return 9776}function Sm(a){a=a|0;yg(a,Tm()|0,2);return}function Tm(){return 1300}function Um(a){a=a|0;si(a);return}function Vm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Wm(a,d,f,1);l=e;return}function Wm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Xm()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Ym(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Zm(g,e)|0,e);l=f;return}function Xm(){var b=0,d=0;if(!(a[8936]|0)){en(9832);Fa(37,9832,o|0)|0;d=8936;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9832)|0)){b=9832;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));en(9832)}return 9832}function Ym(a){a=a|0;return 0}function Zm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Xm()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];_m(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{$m(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function _m(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function $m(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=an(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;bn(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];_m(g,e,d);c[j>>2]=(c[j>>2]|0)+12;cn(a,i);dn(i);l=k;return}}function an(a){a=a|0;return 357913941}function bn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function cn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function dn(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function en(a){a=a|0;hn(a);return}function fn(a){a=a|0;gn(a+24|0);return}function gn(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function hn(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,6,b,jn()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function jn(){return 1316}function kn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=ln(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];d=mn(b,f,d)|0;l=e;return d|0}function ln(a){a=a|0;return (c[(Xm()|0)+24>>2]|0)+(a*12|0)|0}function mn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=l;l=l+32|0;f=h;g=h+16|0;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Oi(g,d);g=Pi(g,d)|0;zb[e&15](f,a,g);g=Gm(f)|0;l=h;return g|0}function nn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];on(a,d,f,1);l=e;return}function on(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=pn()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=qn(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,rn(g,e)|0,e);l=f;return}function pn(){var b=0,d=0;if(!(a[8944]|0)){yn(9868);Fa(38,9868,o|0)|0;d=8944;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9868)|0)){b=9868;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));yn(9868)}return 9868}function qn(a){a=a|0;return 0}function rn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=pn()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];sn(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{tn(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function sn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function tn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=un(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;vn(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];sn(g,e,d);c[j>>2]=(c[j>>2]|0)+12;wn(a,i);xn(i);l=k;return}}function un(a){a=a|0;return 357913941}function vn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function wn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}
function xn(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function yn(a){a=a|0;Bn(a);return}function zn(a){a=a|0;An(a+24|0);return}function An(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Bn(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,9,b,Cn()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Cn(){return 1324}function Dn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=En(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=Fn(b,e)|0;l=d;return b|0}function En(a){a=a|0;return (c[(pn()|0)+24>>2]|0)+(a*12|0)|0}function Fn(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;return ug(lb[d&31](a)|0)|0}function Gn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Hn(a,d,f,0);l=e;return}function Hn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=In()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=Jn(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Kn(g,e)|0,e);l=f;return}function In(){var b=0,d=0;if(!(a[8952]|0)){Rn(9904);Fa(39,9904,o|0)|0;d=8952;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9904)|0)){b=9904;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Rn(9904)}return 9904}function Jn(a){a=a|0;return 0}function Kn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=In()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Ln(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Mn(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Ln(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Mn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Nn(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;On(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Ln(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Pn(a,i);Qn(i);l=k;return}}function Nn(a){a=a|0;return 357913941}function On(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Pn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Qn(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Rn(a){a=a|0;Un(a);return}function Sn(a){a=a|0;Tn(a+24|0);return}function Tn(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Un(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,8,b,Vn()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Vn(){return 1328}function Wn(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Xn(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Yn(b,f,d);l=e;return}function Xn(a){a=a|0;return (c[(In()|0)+24>>2]|0)+(a*12|0)|0}function Yn(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Mi(f,d);d=+Ni(f,d);hb[e&31](a,d);l=g;return}function Zn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];_n(a,d,f,0);l=e;return}function _n(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=$n()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=ao(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,bo(g,e)|0,e);l=f;return}function $n(){var b=0,d=0;if(!(a[8960]|0)){jo(9940);Fa(40,9940,o|0)|0;d=8960;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9940)|0)){b=9940;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));jo(9940)}return 9940}function ao(a){a=a|0;return 0}function bo(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=$n()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];co(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{eo(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function co(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function eo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=fo(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;go(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];co(g,e,d);c[j>>2]=(c[j>>2]|0)+12;ho(a,i);io(i);l=k;return}}function fo(a){a=a|0;return 357913941}function go(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function ho(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function io(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function jo(a){a=a|0;mo(a);return}function ko(a){a=a|0;lo(a+24|0);return}function lo(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function mo(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,1,b,no()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function no(){return 1336}function oo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+8|0;h=f;i=po(a)|0;a=c[i+4>>2]|0;c[h>>2]=c[i>>2];c[h+4>>2]=a;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];qo(b,g,d,e);l=f;return}function po(a){a=a|0;return (c[($n()|0)+24>>2]|0)+(a*12|0)|0}function qo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0,g=0,h=0,i=0;i=l;l=l+16|0;g=i+1|0;h=i;f=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)f=c[(c[a>>2]|0)+f>>2]|0;Oi(g,d);g=Pi(g,d)|0;Mi(h,e);e=+Ni(h,e);Bb[f&15](a,g,e);l=i;return}function ro(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];so(a,d,f,0);l=e;return}function so(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=to()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=uo(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,vo(g,e)|0,e);l=f;return}function to(){var b=0,d=0;if(!(a[8968]|0)){Co(9976);Fa(41,9976,o|0)|0;d=8968;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(9976)|0)){b=9976;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Co(9976)}return 9976}function uo(a){a=a|0;return 0}function vo(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=to()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];wo(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{xo(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function wo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function xo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=yo(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;zo(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];wo(g,e,d);c[j>>2]=(c[j>>2]|0)+12;Ao(a,i);Bo(i);l=k;return}}function yo(a){a=a|0;return 357913941}function zo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function Ao(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Bo(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Co(a){a=a|0;Fo(a);return}function Do(a){a=a|0;Eo(a+24|0);return}function Eo(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Fo(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,7,b,Go()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Go(){return 1348}function Ho(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=Io(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Jo(b,f,d);l=e;return}function Io(a){a=a|0;return (c[(to()|0)+24>>2]|0)+(a*12|0)|0}function Jo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;Oi(f,d);f=Pi(f,d)|0;kb[e&31](a,f);l=g;return}function Ko(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];Lo(a,d,f,0);l=e;return}function Lo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=Mo()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=No(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,Oo(g,e)|0,e);l=f;return}function Mo(){var b=0,d=0;if(!(a[8976]|0)){Vo(10012);Fa(42,10012,o|0)|0;d=8976;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10012)|0)){b=10012;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Vo(10012)}return 10012}function No(a){a=a|0;return 0}function Oo(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=Mo()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];Po(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{Qo(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function Po(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function Qo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=Ro(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;So(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];Po(g,e,d);c[j>>2]=(c[j>>2]|0)+12;To(a,i);Uo(i);l=k;return}}function Ro(a){a=a|0;return 357913941}function So(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function To(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Uo(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function Vo(a){a=a|0;Yo(a);return}function Wo(a){a=a|0;Xo(a+24|0);return}function Xo(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function Yo(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,8,b,Zo()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Zo(){return 1356}function _o(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;f=e+8|0;g=e;h=$o(a)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];ap(b,f,d);l=e;return}function $o(a){a=a|0;return (c[(Mo()|0)+24>>2]|0)+(a*12|0)|0}function ap(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;g=l;l=l+16|0;f=g;e=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)e=c[(c[a>>2]|0)+e>>2]|0;bp(f,d);f=cp(f,d)|0;kb[e&31](a,f);l=g;return}function bp(a,b){a=a|0;b=b|0;return}function cp(a,b){a=a|0;b=b|0;return dp(b)|0}function dp(a){a=a|0;return a|0}function ep(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+16|0;f=e+8|0;g=e;i=c[d>>2]|0;h=c[d+4>>2]|0;d=vh(b)|0;c[g>>2]=i;c[g+4>>2]=h;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];fp(a,d,f,0);l=e;return}function fp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;f=l;l=l+32|0;g=f+16|0;m=f+8|0;i=f;k=c[d>>2]|0;j=c[d+4>>2]|0;h=c[a>>2]|0;a=gp()|0;c[m>>2]=k;c[m+4>>2]=j;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];d=hp(g)|0;c[i>>2]=k;c[i+4>>2]=j;c[g>>2]=c[i>>2];c[g+4>>2]=c[i+4>>2];Ah(h,b,a,d,ip(g,e)|0,e);l=f;return}function gp(){var b=0,d=0;if(!(a[8984]|0)){pp(10048);Fa(43,10048,o|0)|0;d=8984;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10048)|0)){b=10048;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));pp(10048)}return 10048}function hp(a){a=a|0;return 0}function ip(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0;m=l;l=l+32|0;f=m+24|0;h=m+16|0;i=m;j=m+8|0;g=c[a>>2]|0;e=c[a+4>>2]|0;c[i>>2]=g;c[i+4>>2]=e;n=gp()|0;k=n+24|0;a=Eh(b,4)|0;c[j>>2]=a;b=n+28|0;d=c[b>>2]|0;if(d>>>0<(c[n+32>>2]|0)>>>0){c[h>>2]=g;c[h+4>>2]=e;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];jp(d,f,a);a=(c[b>>2]|0)+12|0;c[b>>2]=a}else{kp(k,i,j);a=c[b>>2]|0}l=m;return ((a-(c[k>>2]|0)|0)/12|0)+-1|0}function jp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[b+4>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=e;c[a+8>>2]=d;return}function kp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0;k=l;l=l+48|0;e=k+32|0;h=k+24|0;i=k;j=a+4|0;f=(((c[j>>2]|0)-(c[a>>2]|0)|0)/12|0)+1|0;g=lp(a)|0;if(g>>>0<f>>>0)Wz(a);else{m=c[a>>2]|0;o=((c[a+8>>2]|0)-m|0)/12|0;n=o<<1;mp(i,o>>>0<g>>>1>>>0?(n>>>0<f>>>0?f:n):g,((c[j>>2]|0)-m|0)/12|0,a+8|0);j=i+8|0;g=c[j>>2]|0;f=c[b+4>>2]|0;d=c[d>>2]|0;c[h>>2]=c[b>>2];c[h+4>>2]=f;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];jp(g,e,d);c[j>>2]=(c[j>>2]|0)+12;np(a,i);op(i);l=k;return}}function lp(a){a=a|0;return 357913941}function mp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>357913941)Qa();else{f=bA(b*12|0)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d*12|0)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b*12|0);return}function np(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function op(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);a=c[a>>2]|0;if(a|0)dA(a);return}function pp(a){a=a|0;sp(a);return}function qp(a){a=a|0;rp(a+24|0);return}function rp(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);dA(d)}return}function sp(a){a=a|0;var b=0;b=Qh()|0;Th(a,2,23,b,tp()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function tp(){return 1380}function up(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=l;l=l+16|0;e=d+8|0;f=d;g=vp(a)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];wp(b,e);l=d;return}function vp(a){a=a|0;return (c[(gp()|0)+24>>2]|0)+(a*12|0)|0}function wp(a,b){a=a|0;b=b|0;var d=0;d=c[b>>2]|0;b=c[b+4>>2]|0;a=a+(b>>1)|0;if(b&1)d=c[(c[a>>2]|0)+d>>2]|0;jb[d&127](a);return}function xp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=yp()|0;a=zp(d)|0;Ah(g,b,f,a,Ap(d,e)|0,e);return}function yp(){var b=0,d=0;if(!(a[8992]|0)){Hp(10084);Fa(44,10084,o|0)|0;d=8992;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10084)|0)){b=10084;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Hp(10084)}return 10084}function zp(a){a=a|0;return a|0}function Ap(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=yp()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Bp(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Cp(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Bp(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Cp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Dp(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Ep(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Bp(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Fp(a,f);Gp(f);l=i;return}}function Dp(a){a=a|0;return 536870911}function Ep(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Fp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Gp(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function Hp(a){a=a|0;Kp(a);return}function Ip(a){a=a|0;Jp(a+24|0);return}function Jp(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Kp(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,24,b,dl()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Lp(a,b){a=a|0;b=b|0;Np(c[(Mp(a)|0)>>2]|0,b);return}function Mp(a){a=a|0;return (c[(yp()|0)+24>>2]|0)+(a<<3)|0}function Np(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+16|0;d=c;hl(d,b);b=il(d,b)|0;jb[a&127](b);l=c;return}function Op(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Pp()|0;a=Qp(d)|0;Ah(g,b,f,a,Rp(d,e)|0,e);return}function Pp(){var b=0,d=0;if(!(a[9e3]|0)){Yp(10120);Fa(45,10120,o|0)|0;d=9e3;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10120)|0)){b=10120;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Yp(10120)}return 10120}function Qp(a){a=a|0;return a|0}function Rp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Pp()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Sp(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Tp(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Sp(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Tp(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Up(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Vp(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Sp(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Wp(a,f);Xp(f);l=i;return}}function Up(a){a=a|0;return 536870911}function Vp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Wp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Xp(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function Yp(a){a=a|0;$p(a);return}function Zp(a){a=a|0;_p(a+24|0);return}function _p(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function $p(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,16,b,sk()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function aq(a){a=a|0;return cq(c[(bq(a)|0)>>2]|0)|0}function bq(a){a=a|0;return (c[(Pp()|0)+24>>2]|0)+(a<<3)|0}function cq(a){a=a|0;return bk(wb[a&7]()|0)|0}function dq(){var b=0;if(!(a[9016]|0)){nq(10164);Fa(25,10164,o|0)|0;b=9016;c[b>>2]=1;c[b+4>>2]=0}return 10164}function eq(a,b){a=a|0;b=b|0;c[a>>2]=fq()|0;c[a+4>>2]=gq()|0;c[a+12>>2]=b;c[a+8>>2]=hq()|0;c[a+32>>2]=2;return}function fq(){return 11668}function gq(){return 1224}function hq(){return lq()|0}function iq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){kq(c);dA(c)}}else if(b|0){Me(b);dA(b)}return}function jq(a,b){a=a|0;b=b|0;return b&a|0}function kq(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function lq(){var b=0;if(!(a[9008]|0)){c[2539]=mq()|0;c[2540]=0;b=9008;c[b>>2]=1;c[b+4>>2]=0}return 10156}function mq(){return 0}function nq(a){a=a|0;si(a);return}function oq(a){a=a|0;pq(a,6052);qq(a)|0;rq(a)|0;return}function pq(a,b){a=a|0;b=b|0;var d=0;d=Hm()|0;c[a>>2]=d;Rq(d,b);lt(c[a>>2]|0);return}function qq(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,Fq()|0);return a|0}function rq(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,sq()|0);return a|0}function sq(){var b=0;if(!(a[9024]|0)){uq(10212);Fa(46,10212,o|0)|0;b=9024;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10212)|0))uq(10212);return 10212}function tq(a,b){a=a|0;b=b|0;Ah(a,0,b,0,0,0);return}function uq(a){a=a|0;xq(a);zq(a,9);return}function vq(a){a=a|0;wq(a+24|0);return}function wq(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function xq(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,1,b,Cq()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function yq(a,b,c){a=a|0;b=b|0;c=+c;Aq(a,b,c);return}function zq(a,b){a=a|0;b=b|0;c[a+20>>2]=b;return}function Aq(a,b,d){a=a|0;b=b|0;d=+d;var e=0,f=0,g=0,i=0,j=0;e=l;l=l+16|0;g=e+8|0;j=e+13|0;f=e;i=e+12|0;Oi(j,b);c[g>>2]=Pi(j,b)|0;Mi(i,d);h[f>>3]=+Ni(i,d);Bq(a,g,f);l=e;return}function Bq(b,d,e){b=b|0;d=d|0;e=e|0;Ff(b+8|0,c[d>>2]|0,+h[e>>3]);a[b+24>>0]=1;return}function Cq(){return 1384}function Dq(a,b){a=a|0;b=+b;return Eq(a,b)|0}function Eq(a,b){a=a|0;b=+b;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;e=l;l=l+16|0;g=e+4|0;h=e+8|0;i=e;f=Pv(8)|0;d=f;j=bA(16)|0;Oi(g,a);a=Pi(g,a)|0;Mi(h,b);Ff(j,a,+Ni(h,b));h=d+4|0;c[h>>2]=j;a=bA(8)|0;h=c[h>>2]|0;c[i>>2]=0;c[g>>2]=c[i>>2];Km(a,h,g);c[f>>2]=a;l=e;return d|0}function Fq(){var b=0;if(!(a[9032]|0)){Gq(10248);Fa(47,10248,o|0)|0;b=9032;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10248)|0))Gq(10248);return 10248}function Gq(a){a=a|0;Jq(a);zq(a,48);return}function Hq(a){a=a|0;Iq(a+24|0);return}function Iq(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Jq(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,3,b,Oq()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Kq(a){a=a|0;Lq(a);return}function Lq(a){a=a|0;Mq(a);return}function Mq(b){b=b|0;Nq(b+8|0);a[b+24>>0]=1;return}function Nq(a){a=a|0;c[a>>2]=0;h[a+8>>3]=0.0;return}function Oq(){return 1404}function Pq(){return Qq()|0}function Qq(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;b=l;l=l+16|0;f=b+4|0;h=b;d=Pv(8)|0;a=d;e=bA(16)|0;Nq(e);g=a+4|0;c[g>>2]=e;e=bA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];Km(e,g,f);c[d>>2]=e;l=b;return a|0}function Rq(a,b){a=a|0;b=b|0;c[a>>2]=Sq()|0;c[a+4>>2]=Tq()|0;c[a+12>>2]=b;c[a+8>>2]=Uq()|0;c[a+32>>2]=3;return}function Sq(){return 11669}function Tq(){return 1396}function Uq(){return Xq()|0}function Vq(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){Wq(c);dA(c)}}else if(b|0)dA(b);return}function Wq(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function Xq(){var b=0;if(!(a[9040]|0)){c[2571]=Yq()|0;c[2572]=0;b=9040;c[b>>2]=1;c[b+4>>2]=0}return 10284}function Yq(){return c[352]|0}function Zq(a){a=a|0;_q(a,6058);$q(a)|0;return}function _q(a,b){a=a|0;b=b|0;var d=0;d=Xh()|0;c[a>>2]=d;lr(d,b);lt(c[a>>2]|0);return}function $q(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,ar()|0);return a|0}function ar(){var b=0;if(!(a[9048]|0)){br(10296);Fa(49,10296,o|0)|0;b=9048;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10296)|0))br(10296);return 10296}function br(a){a=a|0;er(a);zq(a,50);return}function cr(a){a=a|0;dr(a+24|0);return}function dr(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function er(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,4,b,ir()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function fr(a){a=a|0;gr(a);return}function gr(a){a=a|0;hr(a);return}function hr(b){b=b|0;var d=0,e=0;d=b+8|0;e=d+48|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));a[b+56>>0]=1;return}function ir(){return 1412}function jr(){return kr()|0}function kr(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0,i=0;h=l;l=l+16|0;a=h+4|0;b=h;d=Pv(8)|0;e=d;f=bA(48)|0;g=f;i=g+48|0;do{c[g>>2]=0;g=g+4|0}while((g|0)<(i|0));g=e+4|0;c[g>>2]=f;i=bA(8)|0;g=c[g>>2]|0;c[b>>2]=0;c[a>>2]=c[b>>2];ci(i,g,a);c[d>>2]=i;l=h;return e|0}function lr(a,b){a=a|0;b=b|0;c[a>>2]=mr()|0;c[a+4>>2]=nr()|0;c[a+12>>2]=b;c[a+8>>2]=or()|0;c[a+32>>2]=4;return}function mr(){return 11663}function nr(){return 1416}function or(){return Xq()|0}function pr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){qr(c);dA(c)}}else if(b|0)dA(b);return}function qr(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function rr(a){a=a|0;sr(a,6065);tr(a)|0;ur(a)|0;return}function sr(a,b){a=a|0;b=b|0;var d=0;d=Xr()|0;c[a>>2]=d;Yr(d,b);lt(c[a>>2]|0);return}function tr(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,Lr()|0);return a|0}function ur(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,vr()|0);return a|0}function vr(){var b=0;if(!(a[9056]|0)){wr(10336);Fa(51,10336,o|0)|0;b=9056;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10336)|0))wr(10336);return 10336}function wr(a){a=a|0;zr(a);zq(a,1);return}function xr(a){a=a|0;yr(a+24|0);return}function yr(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function zr(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,1,b,Er()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Ar(a,b,c){a=a|0;b=+b;c=+c;Br(a,b,c);return}function Br(a,b,c){a=a|0;b=+b;c=+c;var d=0,e=0,f=0,g=0,i=0;d=l;l=l+32|0;f=d+8|0;i=d+17|0;e=d;g=d+16|0;Mi(i,b);h[f>>3]=+Ni(i,b);Mi(g,c);h[e>>3]=+Ni(g,c);Cr(a,f,e);l=d;return}function Cr(b,c,d){b=b|0;c=c|0;d=d|0;Dr(b+8|0,+h[c>>3],+h[d>>3]);a[b+24>>0]=1;return}function Dr(a,b,c){a=a|0;b=+b;c=+c;h[a>>3]=b;h[a+8>>3]=c;return}function Er(){return 1452}function Fr(a,b){a=+a;b=+b;return Gr(a,b)|0}function Gr(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;e=l;l=l+16|0;h=e+4|0;i=e+8|0;j=e;f=Pv(8)|0;d=f;g=bA(16)|0;Mi(h,a);a=+Ni(h,a);Mi(i,b);Dr(g,a,+Ni(i,b));i=d+4|0;c[i>>2]=g;g=bA(8)|0;i=c[i>>2]|0;c[j>>2]=0;c[h>>2]=c[j>>2];Hr(g,i,h);c[f>>2]=g;l=e;return d|0}function Hr(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=bA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1432;c[d+12>>2]=b;c[a+4>>2]=d;return}function Ir(a){a=a|0;Xz(a);dA(a);return}function Jr(a){a=a|0;a=c[a+12>>2]|0;if(a|0)dA(a);return}function Kr(a){a=a|0;dA(a);return}function Lr(){var b=0;if(!(a[9064]|0)){Mr(10372);Fa(52,10372,o|0)|0;b=9064;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10372)|0))Mr(10372);return 10372}function Mr(a){a=a|0;Pr(a);zq(a,53);return}function Nr(a){a=a|0;Or(a+24|0);return}function Or(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Pr(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,5,b,Ur()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Qr(a){a=a|0;Rr(a);return}function Rr(a){a=a|0;Sr(a);return}function Sr(b){b=b|0;Tr(b+8|0);a[b+24>>0]=1;return}function Tr(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;return}function Ur(){return 1472}function Vr(){return Wr()|0}function Wr(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;b=l;l=l+16|0;f=b+4|0;h=b;d=Pv(8)|0;a=d;e=bA(16)|0;Tr(e);g=a+4|0;c[g>>2]=e;e=bA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];Hr(e,g,f);c[d>>2]=e;l=b;return a|0}function Xr(){var b=0;if(!(a[9072]|0)){cs(10408);Fa(25,10408,o|0)|0;b=9072;c[b>>2]=1;c[b+4>>2]=0}return 10408}function Yr(a,b){a=a|0;b=b|0;c[a>>2]=Zr()|0;c[a+4>>2]=_r()|0;c[a+12>>2]=b;c[a+8>>2]=$r()|0;c[a+32>>2]=5;return}function Zr(){return 11659}function _r(){return 1464}function $r(){return Xq()|0}function as(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){bs(c);dA(c)}}else if(b|0)dA(b);return}function bs(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function cs(a){a=a|0;si(a);return}function ds(a,b,c){a=a|0;b=b|0;c=c|0;a=vh(b)|0;b=es(c)|0;c=fs(c,0)|0;Dt(a,b,c,gs()|0,0);return}function es(a){a=a|0;return a|0}function fs(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=gs()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){os(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{ps(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function gs(){var b=0,d=0;if(!(a[9080]|0)){hs(10452);Fa(54,10452,o|0)|0;d=9080;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10452)|0)){b=10452;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));hs(10452)}return 10452}function hs(a){a=a|0;ks(a);return}function is(a){a=a|0;js(a+24|0);return}function js(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function ks(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,17,b,Lk()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function ls(a){a=a|0;return ns(c[(ms(a)|0)>>2]|0)|0}function ms(a){a=a|0;return (c[(gs()|0)+24>>2]|0)+(a<<3)|0}function ns(a){a=a|0;return Pk(wb[a&7]()|0)|0}function os(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function ps(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=qs(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;rs(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;os(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;ss(a,f);ts(f);l=i;return}}function qs(a){a=a|0;return 536870911}function rs(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function ss(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function ts(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function us(a,b,c){a=a|0;b=b|0;c=c|0;a=vh(b)|0;b=vs(c)|0;c=ws(c,0)|0;Dt(a,b,c,xs()|0,0);return}function vs(a){a=a|0;return a|0}function ws(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=xs()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Gs(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Hs(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function xs(){var b=0,d=0;if(!(a[9088]|0)){ys(10488);Fa(55,10488,o|0)|0;d=9088;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10488)|0)){b=10488;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));ys(10488)}return 10488}function ys(a){a=a|0;Bs(a);return}function zs(a){a=a|0;As(a+24|0);return}function As(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Bs(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,10,b,Cs()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Cs(){return 1476}function Ds(a,b){a=a|0;b=b|0;return Fs(c[(Es(a)|0)>>2]|0,b)|0}function Es(a){a=a|0;return (c[(xs()|0)+24>>2]|0)+(a<<3)|0}function Fs(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+16|0;d=c;Oi(d,b);b=Pi(d,b)|0;b=jj(lb[a&31](b)|0)|0;l=c;return b|0}function Gs(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Hs(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Is(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Js(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Gs(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Ks(a,f);Ls(f);l=i;return}}function Is(a){a=a|0;return 536870911}function Js(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Ks(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ls(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function Ms(a,b,c){a=a|0;b=b|0;c=c|0;a=vh(b)|0;b=Ns(c)|0;c=Os(c,0)|0;Dt(a,b,c,Ps()|0,0);return}function Ns(a){a=a|0;return a|0}function Os(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Ps()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){$s(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{at(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Ps(){var b=0,d=0;if(!(a[9096]|0)){Qs(10524);Fa(56,10524,o|0)|0;d=9096;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10524)|0)){b=10524;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Qs(10524)}return 10524}function Qs(a){a=a|0;Ts(a);return}function Rs(a){a=a|0;Ss(a+24|0);return}function Ss(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Ts(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,9,b,Us()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Us(){return 1484}function Vs(a,b,d){a=a|0;b=b|0;d=d|0;Xs(c[(Ws(a)|0)>>2]|0,b,d);return}function Ws(a){a=a|0;return (c[(Ps()|0)+24>>2]|0)+(a<<3)|0}function Xs(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;l=l+16|0;f=d+1|0;e=d;Oi(f,b);b=Pi(f,b)|0;Ys(e,c);c=Zs(e,c)|0;kb[a&31](b,c);l=d;return}function Ys(a,b){a=a|0;b=b|0;return}function Zs(a,b){a=a|0;b=b|0;return _s(b)|0}function _s(a){a=a|0;return (a|0)!=0|0}function $s(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function at(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=bt(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;ct(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;$s(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;dt(a,f);et(f);l=i;return}}function bt(a){a=a|0;return 536870911}function ct(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function dt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function et(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function ft(){gt();return}function gt(){ht(10560);return}function ht(a){a=a|0;it(a,6146);return}function it(a,b){a=a|0;b=b|0;var d=0;d=jt()|0;c[a>>2]=d;kt(d,b);lt(c[a>>2]|0);return}function jt(){var b=0;if(!(a[9104]|0)){vt(10568);Fa(25,10568,o|0)|0;b=9104;c[b>>2]=1;c[b+4>>2]=0}return 10568}function kt(a,b){a=a|0;b=b|0;c[a>>2]=qt()|0;c[a+4>>2]=rt()|0;c[a+12>>2]=b;c[a+8>>2]=st()|0;c[a+32>>2]=6;return}function lt(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;mt()|0;c[d>>2]=a;nt(10564,d);l=b;return}function mt(){if(!(a[11673]|0)){c[2641]=0;Fa(57,10564,o|0)|0;a[11673]=1}return 10564}function nt(a,b){a=a|0;b=b|0;var d=0;d=bA(8)|0;c[d+4>>2]=c[b>>2];c[d>>2]=c[a>>2];c[a>>2]=d;return}function ot(a){a=a|0;pt(a);return}function pt(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b|0)do{d=b;b=c[b>>2]|0;dA(d)}while((b|0)!=0);c[a>>2]=0;return}function qt(){return 11674}function rt(){return 1496}function st(){return lq()|0}function tt(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){ut(c);dA(c)}}else if(b|0)dA(b);return}function ut(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function vt(a){a=a|0;si(a);return}function wt(a,b){a=a|0;b=b|0;var d=0,e=0;mt()|0;d=c[2641]|0;a:do if(d|0){while(1){e=c[d+4>>2]|0;if(e|0?(hz(xt(e)|0,a)|0)==0:0)break;d=c[d>>2]|0;if(!d)break a}yt(e,b)}while(0);return}function xt(a){a=a|0;return c[a+12>>2]|0}function yt(a,b){a=a|0;b=b|0;var d=0;a=a+36|0;d=c[a>>2]|0;if(d|0){Ne(d);dA(d)}d=bA(4)|0;fg(d,b);c[a>>2]=d;return}function zt(){if(!(a[11675]|0)){c[2653]=0;Fa(58,10612,o|0)|0;a[11675]=1}return 10612}function At(){var b=0;if(!(a[11676]|0)){Bt();c[2654]=1504;a[11676]=1;b=1504}else b=c[2654]|0;return b|0}function Bt(){if(!(a[11700]|0)){a[11677]=Eh(Eh(8,0)|0,0)|0;a[11678]=Eh(Eh(0,0)|0,0)|0;a[11679]=Eh(Eh(0,16)|0,0)|0;a[11680]=Eh(Eh(8,0)|0,0)|0;a[11681]=Eh(Eh(0,0)|0,0)|0;a[11682]=Eh(Eh(8,0)|0,0)|0;a[11683]=Eh(Eh(0,0)|0,0)|0;a[11684]=Eh(Eh(8,0)|0,0)|0;a[11685]=Eh(Eh(0,0)|0,0)|0;a[11686]=Eh(Eh(8,0)|0,0)|0;a[11687]=Eh(Eh(0,0)|0,0)|0;a[11688]=Eh(Eh(0,0)|0,32)|0;a[11689]=Eh(Eh(0,0)|0,32)|0;a[11700]=1}return}function Ct(){return 1572}function Dt(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0;g=l;l=l+32|0;m=g+16|0;k=g+12|0;j=g+8|0;i=g+4|0;h=g;c[m>>2]=a;c[k>>2]=b;c[j>>2]=d;c[i>>2]=e;c[h>>2]=f;zt()|0;Et(10612,m,k,j,i,h);l=g;return}function Et(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;h=bA(24)|0;Dh(h+4|0,c[b>>2]|0,c[d>>2]|0,c[e>>2]|0,c[f>>2]|0,c[g>>2]|0);c[h>>2]=c[a>>2];c[a>>2]=h;return}function Ft(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;u=l;l=l+32|0;q=u+20|0;r=u+8|0;s=u+4|0;t=u;b=c[b>>2]|0;if(b|0){p=q+4|0;j=q+8|0;k=r+4|0;m=r+8|0;n=r+8|0;o=q+8|0;do{h=b+4|0;i=Gt(h)|0;if(i|0){f=Ht(i)|0;c[q>>2]=0;c[p>>2]=0;c[j>>2]=0;e=(It(i)|0)+1|0;Jt(q,e);if(e|0)while(1){e=e+-1|0;sy(r,c[f>>2]|0);g=c[p>>2]|0;if(g>>>0<(c[o>>2]|0)>>>0){c[g>>2]=c[r>>2];c[p>>2]=(c[p>>2]|0)+4}else Kt(q,r);if(!e)break;else f=f+4|0}e=Lt(i)|0;c[r>>2]=0;c[k>>2]=0;c[m>>2]=0;a:do if(c[e>>2]|0){f=0;g=0;while(1){if((f|0)==(g|0))Mt(r,e);else{c[f>>2]=c[e>>2];c[k>>2]=(c[k>>2]|0)+4}e=e+4|0;if(!(c[e>>2]|0))break a;f=c[k>>2]|0;g=c[n>>2]|0}}while(0);c[s>>2]=Nt(h)|0;c[t>>2]=Nh(i)|0;Ot(d,a,s,t,q,r);Pt(r);Qt(q)}b=c[b>>2]|0}while((b|0)!=0)}l=u;return}function Gt(a){a=a|0;return c[a+12>>2]|0}function Ht(a){a=a|0;return c[a+12>>2]|0}function It(a){a=a|0;return c[a+16>>2]|0}function Jt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+32|0;d=f;e=c[a>>2]|0;if((c[a+8>>2]|0)-e>>2>>>0<b>>>0){vu(d,b,(c[a+4>>2]|0)-e>>2,a+8|0);wu(a,d);xu(d)}l=f;return}function Kt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;h=l;l=l+32|0;d=h;e=a+4|0;f=((c[e>>2]|0)-(c[a>>2]|0)>>2)+1|0;g=ru(a)|0;if(g>>>0<f>>>0)Wz(a);else{i=c[a>>2]|0;k=(c[a+8>>2]|0)-i|0;j=k>>1;vu(d,k>>2>>>0<g>>>1>>>0?(j>>>0<f>>>0?f:j):g,(c[e>>2]|0)-i>>2,a+8|0);g=d+8|0;c[c[g>>2]>>2]=c[b>>2];c[g>>2]=(c[g>>2]|0)+4;wu(a,d);xu(d);l=h;return}}function Lt(a){a=a|0;return c[a+8>>2]|0}function Mt(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;h=l;l=l+32|0;d=h;e=a+4|0;f=((c[e>>2]|0)-(c[a>>2]|0)>>2)+1|0;g=ou(a)|0;if(g>>>0<f>>>0)Wz(a);else{i=c[a>>2]|0;k=(c[a+8>>2]|0)-i|0;j=k>>1;su(d,k>>2>>>0<g>>>1>>>0?(j>>>0<f>>>0?f:j):g,(c[e>>2]|0)-i>>2,a+8|0);g=d+8|0;c[c[g>>2]>>2]=c[b>>2];c[g>>2]=(c[g>>2]|0)+4;tu(a,d);uu(d);l=h;return}}function Nt(a){a=a|0;return c[a>>2]|0}function Ot(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Rt(a,b,c,d,e,f);return}function Pt(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-4-e|0)>>>2)<<2);dA(d)}return}function Qt(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-4-e|0)>>>2)<<2);dA(d)}return}function Rt(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0;h=l;l=l+48|0;m=h+40|0;i=h+32|0;n=h+24|0;j=h+12|0;k=h;yy(i);a=jg(a)|0;c[n>>2]=c[b>>2];d=c[d>>2]|0;e=c[e>>2]|0;St(j,f);Tt(k,g);c[m>>2]=c[n>>2];Ut(a,m,d,e,j,k);Pt(k);Qt(j);Ay(i);l=h;return}function St(a,b){a=a|0;b=b|0;var d=0,e=0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;d=b+4|0;e=(c[d>>2]|0)-(c[b>>2]|0)>>2;if(e|0){pu(a,e);qu(a,c[b>>2]|0,c[d>>2]|0,e)}return}function Tt(a,b){a=a|0;b=b|0;var d=0,e=0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;d=b+4|0;e=(c[d>>2]|0)-(c[b>>2]|0)>>2;if(e|0){mu(a,e);nu(a,c[b>>2]|0,c[d>>2]|0,e)}return}function Ut(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0,n=0;h=l;l=l+32|0;m=h+28|0;n=h+24|0;i=h+12|0;j=h;k=mg(Vt()|0)|0;c[n>>2]=c[b>>2];c[m>>2]=c[n>>2];b=Wt(m)|0;d=Xt(d)|0;e=Yt(e)|0;c[i>>2]=c[f>>2];m=f+4|0;c[i+4>>2]=c[m>>2];n=f+8|0;c[i+8>>2]=c[n>>2];c[n>>2]=0;c[m>>2]=0;c[f>>2]=0;f=Zt(i)|0;c[j>>2]=c[g>>2];m=g+4|0;c[j+4>>2]=c[m>>2];n=g+8|0;c[j+8>>2]=c[n>>2];c[n>>2]=0;c[m>>2]=0;c[g>>2]=0;za(0,k|0,a|0,b|0,d|0,e|0,f|0,_t(j)|0)|0;Pt(j);Qt(i);l=h;return}function Vt(){var b=0;if(!(a[9120]|0)){ku(10664);b=9120;c[b>>2]=1;c[b+4>>2]=0}return 10664}function Wt(a){a=a|0;return cu(a)|0}function Xt(a){a=a|0;return au(a)|0}function Yt(a){a=a|0;return Pk(a)|0}function Zt(a){a=a|0;return bu(a)|0}function _t(a){a=a|0;return $t(a)|0}function $t(a){a=a|0;var b=0,d=0,e=0;e=(c[a+4>>2]|0)-(c[a>>2]|0)|0;d=e>>2;e=Pv(e+4|0)|0;c[e>>2]=d;if(d|0){b=0;do{c[e+4+(b<<2)>>2]=au(c[(c[a>>2]|0)+(b<<2)>>2]|0)|0;b=b+1|0}while((b|0)!=(d|0))}return e|0}function au(a){a=a|0;return a|0}function bu(a){a=a|0;var b=0,d=0,e=0;e=(c[a+4>>2]|0)-(c[a>>2]|0)|0;d=e>>2;e=Pv(e+4|0)|0;c[e>>2]=d;if(d|0){b=0;do{c[e+4+(b<<2)>>2]=cu((c[a>>2]|0)+(b<<2)|0)|0;b=b+1|0}while((b|0)!=(d|0))}return e|0}function cu(a){a=a|0;var b=0,c=0,d=0,e=0;e=l;l=l+32|0;b=e+12|0;c=e;d=Yh(du()|0)|0;if(!d)a=eu(a)|0;else{Zh(b,d);_h(c,b);vy(a,c);a=ai(b)|0}l=e;return a|0}function du(){var b=0;if(!(a[9112]|0)){ju(10620);Fa(25,10620,o|0)|0;b=9112;c[b>>2]=1;c[b+4>>2]=0}return 10620}function eu(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;d=l;l=l+16|0;f=d+4|0;h=d;e=Pv(8)|0;b=e;i=bA(4)|0;c[i>>2]=c[a>>2];g=b+4|0;c[g>>2]=i;a=bA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];fu(a,g,f);c[e>>2]=a;l=d;return b|0}function fu(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=bA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1656;c[d+12>>2]=b;c[a+4>>2]=d;return}function gu(a){a=a|0;Xz(a);dA(a);return}function hu(a){a=a|0;a=c[a+12>>2]|0;if(a|0)dA(a);return}function iu(a){a=a|0;dA(a);return}function ju(a){a=a|0;si(a);return}function ku(a){a=a|0;yg(a,lu()|0,5);return}function lu(){return 1676}function mu(a,b){a=a|0;b=b|0;var d=0;if((ou(a)|0)>>>0<b>>>0)Wz(a);if(b>>>0>1073741823)Qa();else{d=bA(b<<2)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+(b<<2);return}}function nu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a+4|0;a=d-b|0;if((a|0)>0){mA(c[e>>2]|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+(a>>>2<<2)}return}function ou(a){a=a|0;return 1073741823}function pu(a,b){a=a|0;b=b|0;var d=0;if((ru(a)|0)>>>0<b>>>0)Wz(a);if(b>>>0>1073741823)Qa();else{d=bA(b<<2)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+(b<<2);return}}function qu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=a+4|0;a=d-b|0;if((a|0)>0){mA(c[e>>2]|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+(a>>>2<<2)}return}function ru(a){a=a|0;return 1073741823}function su(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>1073741823)Qa();else{f=bA(b<<2)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<2)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<2);return}function tu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>2)<<2)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function uu(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-4-b|0)>>>2)<<2);a=c[a>>2]|0;if(a|0)dA(a);return}function vu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>1073741823)Qa();else{f=bA(b<<2)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<2)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<2);return}function wu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>2)<<2)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function xu(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-4-b|0)>>>2)<<2);a=c[a>>2]|0;if(a|0)dA(a);return}function yu(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0;r=l;l=l+32|0;m=r+20|0;n=r+12|0;k=r+16|0;o=r+4|0;p=r;q=r+8|0;i=At()|0;g=c[i>>2]|0;h=c[g>>2]|0;if(h|0){j=c[i+8>>2]|0;i=c[i+4>>2]|0;while(1){sy(m,h);zu(a,m,i,j);g=g+4|0;h=c[g>>2]|0;if(!h)break;else{j=j+1|0;i=i+1|0}}}g=Ct()|0;h=c[g>>2]|0;if(h|0)do{sy(m,h);c[n>>2]=c[g+4>>2];Au(b,m,n);g=g+8|0;h=c[g>>2]|0}while((h|0)!=0);g=c[(mt()|0)>>2]|0;if(g|0)do{b=c[g+4>>2]|0;sy(m,c[(Bu(b)|0)>>2]|0);c[n>>2]=xt(b)|0;Cu(d,m,n);g=c[g>>2]|0}while((g|0)!=0);sy(k,0);g=zt()|0;c[m>>2]=c[k>>2];Ft(m,g,f);g=c[(mt()|0)>>2]|0;if(g|0){a=m+4|0;b=m+8|0;d=m+8|0;do{j=c[g+4>>2]|0;sy(n,c[(Bu(j)|0)>>2]|0);Eu(o,Du(j)|0);h=c[o>>2]|0;if(h|0){c[m>>2]=0;c[a>>2]=0;c[b>>2]=0;do{sy(p,c[(Bu(c[h+4>>2]|0)|0)>>2]|0);i=c[a>>2]|0;if(i>>>0<(c[d>>2]|0)>>>0){c[i>>2]=c[p>>2];c[a>>2]=(c[a>>2]|0)+4}else Kt(m,p);h=c[h>>2]|0}while((h|0)!=0);Fu(e,n,m);Qt(m)}c[q>>2]=c[n>>2];k=Gu(j)|0;c[m>>2]=c[q>>2];Ft(m,k,f);pi(o);g=c[g>>2]|0}while((g|0)!=0)}l=r;return}function zu(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Uu(a,b,c,d);return}function Au(a,b,c){a=a|0;b=b|0;c=c|0;Tu(a,b,c);return}function Bu(a){a=a|0;return a|0}function Cu(a,b,c){a=a|0;b=b|0;c=c|0;Ou(a,b,c);return}function Du(a){a=a|0;return a+16|0}function Eu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;g=l;l=l+16|0;f=g+8|0;d=g;c[a>>2]=0;e=c[b>>2]|0;c[f>>2]=e;c[d>>2]=a;d=Mu(d)|0;if(e|0){e=bA(12)|0;h=(Nu(f)|0)+4|0;a=c[h+4>>2]|0;b=e+4|0;c[b>>2]=c[h>>2];c[b+4>>2]=a;b=c[c[f>>2]>>2]|0;c[f>>2]=b;if(!b)a=e;else{b=e;while(1){a=bA(12)|0;j=(Nu(f)|0)+4|0;i=c[j+4>>2]|0;h=a+4|0;c[h>>2]=c[j>>2];c[h+4>>2]=i;c[b>>2]=a;h=c[c[f>>2]>>2]|0;c[f>>2]=h;if(!h)break;else b=a}}c[a>>2]=c[d>>2];c[d>>2]=e}l=g;return}function Fu(a,b,c){a=a|0;b=b|0;c=c|0;Hu(a,b,c);return}function Gu(a){a=a|0;return a+24|0}function Hu(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+32|0;h=e+24|0;f=e+16|0;i=e+12|0;g=e;yy(f);a=jg(a)|0;c[i>>2]=c[b>>2];St(g,d);c[h>>2]=c[i>>2];Iu(a,h,g);Qt(g);Ay(f);l=e;return}function Iu(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=l;l=l+32|0;h=e+16|0;i=e+12|0;f=e;g=mg(Ju()|0)|0;c[i>>2]=c[b>>2];c[h>>2]=c[i>>2];b=Wt(h)|0;c[f>>2]=c[d>>2];h=d+4|0;c[f+4>>2]=c[h>>2];i=d+8|0;c[f+8>>2]=c[i>>2];c[i>>2]=0;c[h>>2]=0;c[d>>2]=0;va(0,g|0,a|0,b|0,Zt(f)|0)|0;Qt(f);l=e;return}function Ju(){var b=0;if(!(a[9128]|0)){Ku(10676);b=9128;c[b>>2]=1;c[b+4>>2]=0}return 10676}function Ku(a){a=a|0;yg(a,Lu()|0,2);return}function Lu(){return 1732}function Mu(a){a=a|0;return c[a>>2]|0}function Nu(a){a=a|0;return c[a>>2]|0}function Ou(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+32|0;g=e+16|0;f=e+8|0;h=e;yy(f);a=jg(a)|0;c[h>>2]=c[b>>2];d=c[d>>2]|0;c[g>>2]=c[h>>2];Pu(a,g,d);Ay(f);l=e;return}function Pu(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+16|0;g=e+4|0;h=e;f=mg(Qu()|0)|0;c[h>>2]=c[b>>2];c[g>>2]=c[h>>2];b=Wt(g)|0;va(0,f|0,a|0,b|0,Xt(d)|0)|0;l=e;return}function Qu(){var b=0;if(!(a[9136]|0)){Ru(10688);b=9136;c[b>>2]=1;c[b+4>>2]=0}return 10688}function Ru(a){a=a|0;yg(a,Su()|0,2);return}function Su(){return 1744}function Tu(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=l;l=l+32|0;g=e+16|0;f=e+8|0;h=e;yy(f);a=jg(a)|0;c[h>>2]=c[b>>2];d=c[d>>2]|0;c[g>>2]=c[h>>2];Pu(a,g,d);Ay(f);l=e;return}function Uu(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+32|0;i=g+16|0;h=g+8|0;j=g;yy(h);b=jg(b)|0;c[j>>2]=c[d>>2];e=a[e>>0]|0;f=a[f>>0]|0;c[i>>2]=c[j>>2];Vu(b,i,e,f);Ay(h);l=g;return}function Vu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;h=f+4|0;i=f;g=mg(Wu()|0)|0;c[i>>2]=c[b>>2];c[h>>2]=c[i>>2];b=Wt(h)|0;d=Xu(d)|0;Ya(0,g|0,a|0,b|0,d|0,Xu(e)|0)|0;l=f;return}function Wu(){var b=0;if(!(a[9144]|0)){Zu(10700);b=9144;c[b>>2]=1;c[b+4>>2]=0}return 10700}function Xu(a){a=a|0;return Yu(a)|0}function Yu(a){a=a|0;return a&255|0}function Zu(a){a=a|0;yg(a,_u()|0,3);return}function _u(){return 1756}function $u(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;p=l;l=l+32|0;j=p+8|0;k=p+4|0;m=p+20|0;n=p;Hj(b,0);f=uy(d)|0;c[j>>2]=0;o=j+4|0;c[o>>2]=0;c[j+8>>2]=0;switch(f<<24>>24){case 0:{a[m>>0]=0;av(k,e,m);bv(b,k)|0;Oe(k);break}case 8:{o=ty(d)|0;a[m>>0]=8;sy(n,c[o+4>>2]|0);cv(k,e,m,n,o+8|0);bv(b,k)|0;Oe(k);break}case 9:{h=ty(d)|0;d=c[h+4>>2]|0;if(d|0){i=j+8|0;g=h+12|0;while(1){d=d+-1|0;sy(k,c[g>>2]|0);f=c[o>>2]|0;if(f>>>0<(c[i>>2]|0)>>>0){c[f>>2]=c[k>>2];c[o>>2]=(c[o>>2]|0)+4}else Kt(j,k);if(!d)break;else g=g+4|0}}a[m>>0]=9;sy(n,c[h+8>>2]|0);dv(k,e,m,n,j);bv(b,k)|0;Oe(k);break}default:{o=ty(d)|0;a[m>>0]=f;sy(n,c[o+4>>2]|0);ev(k,e,m,n);bv(b,k)|0;Oe(k)}}Qt(j);l=p;return}function av(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;e=l;l=l+16|0;f=e;yy(f);c=jg(c)|0;sv(b,c,a[d>>0]|0);Ay(f);l=e;return}function bv(a,b){a=a|0;b=b|0;var d=0;d=c[a>>2]|0;if(d|0)Za(d|0);c[a>>2]=c[b>>2];c[b>>2]=0;return a|0}function cv(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;h=l;l=l+32|0;j=h+16|0;i=h+8|0;k=h;yy(i);d=jg(d)|0;e=a[e>>0]|0;c[k>>2]=c[f>>2];g=c[g>>2]|0;c[j>>2]=c[k>>2];ov(b,d,e,j,g);Ay(i);l=h;return}function dv(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,m=0;h=l;l=l+32|0;k=h+24|0;i=h+16|0;m=h+12|0;j=h;yy(i);d=jg(d)|0;e=a[e>>0]|0;c[m>>2]=c[f>>2];St(j,g);c[k>>2]=c[m>>2];kv(b,d,e,k,j);Qt(j);Ay(i);l=h;return}function ev(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+32|0;i=g+16|0;h=g+8|0;j=g;yy(h);d=jg(d)|0;e=a[e>>0]|0;c[j>>2]=c[f>>2];c[i>>2]=c[j>>2];fv(b,d,e,i);Ay(h);l=g;return}function fv(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=l;l=l+16|0;g=f+4|0;i=f;h=mg(gv()|0)|0;d=Xu(d)|0;c[i>>2]=c[e>>2];c[g>>2]=c[i>>2];hv(a,va(0,h|0,b|0,d|0,Wt(g)|0)|0);l=f;return}function gv(){var b=0;if(!(a[9152]|0)){iv(10712);b=9152;c[b>>2]=1;c[b+4>>2]=0}return 10712}function hv(a,b){a=a|0;b=b|0;Hj(a,b);return}function iv(a){a=a|0;yg(a,jv()|0,2);return}function jv(){return 1772}function kv(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;g=l;l=l+32|0;j=g+16|0;k=g+12|0;h=g;i=mg(lv()|0)|0;d=Xu(d)|0;c[k>>2]=c[e>>2];c[j>>2]=c[k>>2];e=Wt(j)|0;c[h>>2]=c[f>>2];j=f+4|0;c[h+4>>2]=c[j>>2];k=f+8|0;c[h+8>>2]=c[k>>2];c[k>>2]=0;c[j>>2]=0;c[f>>2]=0;hv(a,Ya(0,i|0,b|0,d|0,e|0,Zt(h)|0)|0);Qt(h);l=g;return}function lv(){var b=0;if(!(a[9160]|0)){mv(10724);b=9160;c[b>>2]=1;c[b+4>>2]=0}return 10724}function mv(a){a=a|0;yg(a,nv()|0,3);return}function nv(){return 1784}function ov(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;g=l;l=l+16|0;i=g+4|0;j=g;h=mg(pv()|0)|0;d=Xu(d)|0;c[j>>2]=c[e>>2];c[i>>2]=c[j>>2];e=Wt(i)|0;hv(a,Ya(0,h|0,b|0,d|0,e|0,Yt(f)|0)|0);l=g;return}function pv(){var b=0;if(!(a[9168]|0)){qv(10736);b=9168;c[b>>2]=1;c[b+4>>2]=0}return 10736}function qv(a){a=a|0;yg(a,rv()|0,3);return}function rv(){return 1800}function sv(a,b,c){a=a|0;b=b|0;c=c|0;var d=0;d=mg(tv()|0)|0;hv(a,_a(0,d|0,b|0,Xu(c)|0)|0);return}function tv(){var b=0;if(!(a[9176]|0)){uv(10748);b=9176;c[b>>2]=1;c[b+4>>2]=0}return 10748}function uv(a){a=a|0;yg(a,vv()|0,1);return}function vv(){return 1816}function wv(){xv();yv();zv();return}function xv(){c[2691]=cA(65536)|0;return}function yv(){Wv(10812);return}function zv(){Av(10772);return}function Av(a){a=a|0;Bv(a,6235);Cv(a)|0;return}function Bv(a,b){a=a|0;b=b|0;var d=0;d=du()|0;c[a>>2]=d;Qv(d,b);lt(c[a>>2]|0);return}function Cv(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,Dv()|0);return a|0}function Dv(){var b=0;if(!(a[9184]|0)){Ev(10776);Fa(59,10776,o|0)|0;b=9184;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10776)|0))Ev(10776);return 10776}function Ev(a){a=a|0;Hv(a);zq(a,25);return}function Fv(a){a=a|0;Gv(a+24|0);return}function Gv(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Hv(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,18,b,Mv()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Iv(a,b){a=a|0;b=b|0;Jv(a,b);return}function Jv(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=l;l=l+16|0;e=d;f=d+4|0;$j(f,b);c[e>>2]=ak(f,b)|0;Kv(a,e);l=d;return}function Kv(b,d){b=b|0;d=d|0;Lv(b+4|0,c[d>>2]|0);a[b+8>>0]=1;return}function Lv(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function Mv(){return 1824}function Nv(a){a=a|0;return Ov(a)|0}function Ov(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;d=l;l=l+16|0;f=d+4|0;h=d;e=Pv(8)|0;b=e;i=bA(4)|0;$j(f,a);Lv(i,ak(f,a)|0);g=b+4|0;c[g>>2]=i;a=bA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];fu(a,g,f);c[e>>2]=a;l=d;return b|0}function Pv(a){a=a|0;var b=0,d=0;a=a+7&-8;if(a>>>0<=32768?(b=c[2690]|0,a>>>0<=(65536-b|0)>>>0):0){d=(c[2691]|0)+b|0;c[2690]=b+a;a=d}else{a=cA(a+8|0)|0;c[a>>2]=c[2692];c[2692]=a;a=a+8|0}return a|0}function Qv(a,b){a=a|0;b=b|0;c[a>>2]=Rv()|0;c[a+4>>2]=Sv()|0;c[a+12>>2]=b;c[a+8>>2]=Tv()|0;c[a+32>>2]=7;return}function Rv(){return 11704}function Sv(){return 1832}function Tv(){return Xq()|0}function Uv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){Vv(c);dA(c)}}else if(b|0)dA(b);return}function Vv(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function Wv(a){a=a|0;Xv(a,6243);Yv(a)|0;Zv(a,6249,26)|0;_v(a,6260,1)|0;$v(a,6268,10)|0;aw(a,6278,19)|0;cw(a,6285,27)|0;return}function Xv(a,b){a=a|0;b=b|0;var d=0;d=ky()|0;c[a>>2]=d;ly(d,b);lt(c[a>>2]|0);return}function Yv(a){a=a|0;var b=0;b=c[a>>2]|0;tq(b,Xx()|0);return a|0}function Zv(a,b,c){a=a|0;b=b|0;c=c|0;Cx(a,vh(b)|0,c,0);return a|0}function _v(a,b,c){a=a|0;b=b|0;c=c|0;kx(a,vh(b)|0,c,0);return a|0}function $v(a,b,c){a=a|0;b=b|0;c=c|0;Nw(a,vh(b)|0,c,0);return a|0}function aw(a,b,c){a=a|0;b=b|0;c=c|0;vw(a,vh(b)|0,c,0);return a|0}function bw(a,b){a=a|0;b=b|0;var d=0,e=0;a:while(1){d=c[2692]|0;while(1){if((d|0)==(b|0))break a;e=c[d>>2]|0;c[2692]=e;if(!d)d=e;else break}dA(d)}c[2690]=a;return}function cw(a,b,c){a=a|0;b=b|0;c=c|0;dw(a,vh(b)|0,c,0);return a|0}function dw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=ew()|0;a=fw(d)|0;Ah(g,b,f,a,gw(d,e)|0,e);return}function ew(){var b=0,d=0;if(!(a[9192]|0)){nw(10816);Fa(60,10816,o|0)|0;d=9192;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10816)|0)){b=10816;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));nw(10816)}return 10816}function fw(a){a=a|0;return a|0}function gw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=ew()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){hw(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{iw(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function hw(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function iw(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=jw(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;kw(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;hw(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;lw(a,f);mw(f);l=i;return}}function jw(a){a=a|0;return 536870911}function kw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function lw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function mw(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function nw(a){a=a|0;qw(a);return}function ow(a){a=a|0;pw(a+24|0);return}function pw(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function qw(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,11,b,rw()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function rw(){return 1840}function sw(a,b,d){a=a|0;b=b|0;d=d|0;uw(c[(tw(a)|0)>>2]|0,b,d);return}function tw(a){a=a|0;return (c[(ew()|0)+24>>2]|0)+(a<<3)|0}function uw(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;l=l+16|0;f=d+1|0;e=d;$j(f,b);b=ak(f,b)|0;$j(e,c);c=ak(e,c)|0;kb[a&31](b,c);l=d;return}function vw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=ww()|0;a=xw(d)|0;Ah(g,b,f,a,yw(d,e)|0,e);return}function ww(){var b=0,d=0;if(!(a[9200]|0)){Fw(10852);Fa(61,10852,o|0)|0;d=9200;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10852)|0)){b=10852;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Fw(10852)}return 10852}function xw(a){a=a|0;return a|0}function yw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=ww()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){zw(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Aw(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function zw(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Aw(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Bw(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Cw(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;zw(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Dw(a,f);Ew(f);l=i;return}}function Bw(a){a=a|0;return 536870911}function Cw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Dw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ew(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function Fw(a){a=a|0;Iw(a);return}function Gw(a){a=a|0;Hw(a+24|0);return}function Hw(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Iw(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,11,b,Jw()|0,1);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Jw(){return 1852}function Kw(a,b){a=a|0;b=b|0;return Mw(c[(Lw(a)|0)>>2]|0,b)|0}function Lw(a){a=a|0;return (c[(ww()|0)+24>>2]|0)+(a<<3)|0}function Mw(a,b){a=a|0;b=b|0;var c=0,d=0;c=l;l=l+16|0;d=c;$j(d,b);b=ak(d,b)|0;b=Pk(lb[a&31](b)|0)|0;l=c;return b|0}function Nw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Ow()|0;a=Pw(d)|0;Ah(g,b,f,a,Qw(d,e)|0,e);return}function Ow(){var b=0,d=0;if(!(a[9208]|0)){Xw(10888);Fa(62,10888,o|0)|0;d=9208;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10888)|0)){b=10888;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Xw(10888)}return 10888}function Pw(a){a=a|0;return a|0}function Qw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Ow()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Rw(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Sw(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Rw(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Sw(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Tw(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Uw(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Rw(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Vw(a,f);Ww(f);l=i;return}}function Tw(a){a=a|0;return 536870911}function Uw(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Vw(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Ww(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function Xw(a){a=a|0;_w(a);return}function Yw(a){a=a|0;Zw(a+24|0);return}function Zw(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function _w(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,7,b,$w()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function $w(){return 1860}function ax(a,b,d){a=a|0;b=b|0;d=d|0;return cx(c[(bx(a)|0)>>2]|0,b,d)|0}function bx(a){a=a|0;return (c[(Ow()|0)+24>>2]|0)+(a<<3)|0}function cx(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;e=l;l=l+32|0;h=e+12|0;g=e+8|0;i=e;j=e+16|0;f=e+4|0;dx(j,b);ex(i,j,b);Dj(f,d);d=Ej(f,d)|0;c[h>>2]=c[i>>2];zb[a&15](g,h,d);d=fx(g)|0;Oe(g);Fj(f);l=e;return d|0}function dx(a,b){a=a|0;b=b|0;return}function ex(a,b,c){a=a|0;b=b|0;c=c|0;gx(a,c);return}function fx(a){a=a|0;return jg(a)|0}function gx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=l;l=l+16|0;d=f;e=b;if(!(e&1))c[a>>2]=c[b>>2];else{hx(d,0);Ha(e|0,d|0)|0;ix(a,d);jx(d)}l=f;return}function hx(b,d){b=b|0;d=d|0;tg(b,d);c[b+4>>2]=0;a[b+8>>0]=0;return}function ix(a,b){a=a|0;b=b|0;c[a>>2]=c[b+4>>2];return}function jx(b){b=b|0;a[b+8>>0]=0;return}function kx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=lx()|0;a=mx(d)|0;Ah(g,b,f,a,nx(d,e)|0,e);return}function lx(){var b=0,d=0;if(!(a[9216]|0)){ux(10924);Fa(63,10924,o|0)|0;d=9216;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10924)|0)){b=10924;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));ux(10924)}return 10924}function mx(a){a=a|0;return a|0}function nx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=lx()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){ox(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{px(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function ox(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function px(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=qx(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;rx(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;ox(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;sx(a,f);tx(f);l=i;return}}function qx(a){a=a|0;return 536870911}function rx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function sx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function tx(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function ux(a){a=a|0;xx(a);return}function vx(a){a=a|0;wx(a+24|0);return}function wx(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function xx(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,1,b,yx()|0,5);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function yx(){return 1872}function zx(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;Bx(c[(Ax(a)|0)>>2]|0,b,d,e,f,g);return}function Ax(a){a=a|0;return (c[(lx()|0)+24>>2]|0)+(a<<3)|0}function Bx(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,m=0;g=l;l=l+32|0;h=g+16|0;i=g+12|0;j=g+8|0;k=g+4|0;m=g;Dj(h,b);b=Ej(h,b)|0;Dj(i,c);c=Ej(i,c)|0;Dj(j,d);d=Ej(j,d)|0;Dj(k,e);e=Ej(k,e)|0;Dj(m,f);f=Ej(m,f)|0;gb[a&1](b,c,d,e,f);Fj(m);Fj(k);Fj(j);Fj(i);Fj(h);l=g;return}function Cx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a>>2]|0;f=Dx()|0;a=Ex(d)|0;Ah(g,b,f,a,Fx(d,e)|0,e);return}function Dx(){var b=0,d=0;if(!(a[9224]|0)){Mx(10960);Fa(64,10960,o|0)|0;d=9224;c[d>>2]=1;c[d+4>>2]=0}if(!(Nh(10960)|0)){b=10960;d=b+36|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(d|0));Mx(10960)}return 10960}function Ex(a){a=a|0;return a|0}function Fx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=l;l=l+16|0;f=i;g=i+4|0;c[f>>2]=a;j=Dx()|0;h=j+24|0;b=Eh(b,4)|0;c[g>>2]=b;d=j+28|0;e=c[d>>2]|0;if(e>>>0<(c[j+32>>2]|0)>>>0){Gx(e,a,b);b=(c[d>>2]|0)+8|0;c[d>>2]=b}else{Hx(h,f,g);b=c[d>>2]|0}l=i;return (b-(c[h>>2]|0)>>3)+-1|0}function Gx(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return}function Hx(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0;i=l;l=l+32|0;f=i;g=a+4|0;h=((c[g>>2]|0)-(c[a>>2]|0)>>3)+1|0;e=Ix(a)|0;if(e>>>0<h>>>0)Wz(a);else{j=c[a>>2]|0;m=(c[a+8>>2]|0)-j|0;k=m>>2;Jx(f,m>>3>>>0<e>>>1>>>0?(k>>>0<h>>>0?h:k):e,(c[g>>2]|0)-j>>3,a+8|0);h=f+8|0;Gx(c[h>>2]|0,c[b>>2]|0,c[d>>2]|0);c[h>>2]=(c[h>>2]|0)+8;Kx(a,f);Lx(f);l=i;return}}function Ix(a){a=a|0;return 536870911}function Jx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;c[a+12>>2]=0;c[a+16>>2]=e;do if(b)if(b>>>0>536870911)Qa();else{f=bA(b<<3)|0;break}else f=0;while(0);c[a>>2]=f;e=f+(d<<3)|0;c[a+8>>2]=e;c[a+4>>2]=e;c[a+12>>2]=f+(b<<3);return}function Kx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){mA(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return}function Lx(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);a=c[a>>2]|0;if(a|0)dA(a);return}function Mx(a){a=a|0;Px(a);return}function Nx(a){a=a|0;Ox(a+24|0);return}function Ox(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function Px(a){a=a|0;var b=0;b=Qh()|0;Th(a,1,12,b,Qx()|0,2);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function Qx(){return 1896}function Rx(a,b,d){a=a|0;b=b|0;d=d|0;Tx(c[(Sx(a)|0)>>2]|0,b,d);return}function Sx(a){a=a|0;return (c[(Dx()|0)+24>>2]|0)+(a<<3)|0}function Tx(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=l;l=l+16|0;f=d+4|0;e=d;Ux(f,b);b=Vx(f,b)|0;Dj(e,c);c=Ej(e,c)|0;kb[a&31](b,c);Fj(e);l=d;return}function Ux(a,b){a=a|0;b=b|0;return}function Vx(a,b){a=a|0;b=b|0;return Wx(b)|0}function Wx(a){a=a|0;return a|0}function Xx(){var b=0;if(!(a[9232]|0)){Yx(10996);Fa(65,10996,o|0)|0;b=9232;c[b>>2]=1;c[b+4>>2]=0}if(!(Nh(10996)|0))Yx(10996);return 10996}function Yx(a){a=a|0;$x(a);zq(a,66);return}function Zx(a){a=a|0;_x(a+24|0);return}function _x(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d|0){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);dA(d)}return}function $x(a){a=a|0;var b=0;b=Qh()|0;Th(a,5,6,b,dy()|0,0);c[a+24>>2]=0;c[a+28>>2]=0;c[a+32>>2]=0;return}function ay(a){a=a|0;by(a);return}function by(a){a=a|0;cy(a);return}function cy(b){b=b|0;a[b+8>>0]=1;return}function dy(){return 1936}function ey(){return fy()|0}function fy(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;b=l;l=l+16|0;f=b+4|0;h=b;d=Pv(8)|0;a=d;g=a+4|0;c[g>>2]=bA(1)|0;e=bA(8)|0;g=c[g>>2]|0;c[h>>2]=0;c[f>>2]=c[h>>2];gy(e,g,f);c[d>>2]=e;l=b;return a|0}function gy(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;d=bA(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=1916;c[d+12>>2]=b;c[a+4>>2]=d;return}function hy(a){a=a|0;Xz(a);dA(a);return}function iy(a){a=a|0;a=c[a+12>>2]|0;if(a|0)dA(a);return}function jy(a){a=a|0;dA(a);return}function ky(){var b=0;if(!(a[9240]|0)){ry(11032);Fa(25,11032,o|0)|0;b=9240;c[b>>2]=1;c[b+4>>2]=0}return 11032}function ly(a,b){a=a|0;b=b|0;c[a>>2]=my()|0;c[a+4>>2]=ny()|0;c[a+12>>2]=b;c[a+8>>2]=oy()|0;c[a+32>>2]=8;return}function my(){return 11705}function ny(){return 1940}function oy(){return lq()|0}function py(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;if((jq(d,896)|0)==512){if(c|0){qy(c);dA(c)}}else if(b|0)dA(b);return}function qy(a){a=a|0;a=c[a+4>>2]|0;if(a|0)$z(a);return}function ry(a){a=a|0;si(a);return}function sy(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function ty(a){a=a|0;return c[a>>2]|0}function uy(b){b=b|0;return a[c[b>>2]>>0]|0}function vy(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;c[e>>2]=c[a>>2];wy(b,e)|0;l=d;return}function wy(a,b){a=a|0;b=b|0;var d=0;d=xy(c[a>>2]|0,b)|0;b=a+4|0;c[(c[b>>2]|0)+8>>2]=d;return c[(c[b>>2]|0)+8>>2]|0}function xy(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;yy(e);a=jg(a)|0;b=zy(a,c[b>>2]|0)|0;Ay(e);l=d;return b|0}function yy(a){a=a|0;c[a>>2]=c[2690];c[a+4>>2]=c[2692];return}function zy(a,b){a=a|0;b=b|0;var c=0;c=mg(By()|0)|0;return _a(0,c|0,a|0,Yt(b)|0)|0}function Ay(a){a=a|0;bw(c[a>>2]|0,c[a+4>>2]|0);return}function By(){var b=0;if(!(a[9248]|0)){Cy(11076);b=9248;c[b>>2]=1;c[b+4>>2]=0}return 11076}function Cy(a){a=a|0;yg(a,Dy()|0,1);return}function Dy(){return 1948}function Ey(){Fy();return}function Fy(){var b=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;s=l;l=l+16|0;o=s+4|0;p=s;Ca(65536,10760,c[2691]|0,10768);f=At()|0;e=c[f>>2]|0;b=c[e>>2]|0;if(b|0){g=c[f+8>>2]|0;f=c[f+4>>2]|0;while(1){Ja(b|0,d[f>>0]|0|0,a[g>>0]|0);e=e+4|0;b=c[e>>2]|0;if(!b)break;else{g=g+1|0;f=f+1|0}}}b=Ct()|0;e=c[b>>2]|0;if(e|0)do{Ka(e|0,c[b+4>>2]|0);b=b+8|0;e=c[b>>2]|0}while((e|0)!=0);Ka(Gy()|0,6358);n=mt()|0;b=c[n>>2]|0;a:do if(b|0){do{Hy(c[b+4>>2]|0);b=c[b>>2]|0}while((b|0)!=0);b=c[n>>2]|0;if(b|0){m=n;do{while(1){h=b;b=c[b>>2]|0;h=c[h+4>>2]|0;if(!(Iy(h)|0))break;c[p>>2]=m;c[o>>2]=c[p>>2];Jy(n,o)|0;if(!b)break a}Ky(h);m=c[m>>2]|0;e=Ly(h)|0;i=Sa()|0;j=l;l=l+((1*(e<<2)|0)+15&-16)|0;k=l;l=l+((1*(e<<2)|0)+15&-16)|0;e=c[(Du(h)|0)>>2]|0;if(e|0){f=j;g=k;while(1){c[f>>2]=c[(Bu(c[e+4>>2]|0)|0)>>2];c[g>>2]=c[e+8>>2];e=c[e>>2]|0;if(!e)break;else{f=f+4|0;g=g+4|0}}}t=Bu(h)|0;e=My(h)|0;f=Ly(h)|0;g=Ny(h)|0;Oa(t|0,e|0,j|0,k|0,f|0,g|0,xt(h)|0);Ea(i|0)}while((b|0)!=0)}}while(0);b=c[(zt()|0)>>2]|0;if(b|0)do{t=b+4|0;n=Gt(t)|0;h=Lt(n)|0;i=Ht(n)|0;j=(It(n)|0)+1|0;k=Oy(n)|0;m=Py(t)|0;n=Nh(n)|0;o=Nt(t)|0;p=Qy(t)|0;Ma(0,h|0,i|0,j|0,k|0,m|0,n|0,o|0,p|0,Ry(t)|0);b=c[b>>2]|0}while((b|0)!=0);b=c[(mt()|0)>>2]|0;b:do if(b|0){c:while(1){e=c[b+4>>2]|0;if(e|0?(q=c[(Bu(e)|0)>>2]|0,r=c[(Gu(e)|0)>>2]|0,r|0):0){f=r;do{e=f+4|0;g=Gt(e)|0;d:do if(g|0)switch(Nh(g)|0){case 0:break c;case 4:case 3:case 2:{k=Lt(g)|0;m=Ht(g)|0;n=(It(g)|0)+1|0;o=Oy(g)|0;p=Nh(g)|0;t=Nt(e)|0;Ma(q|0,k|0,m|0,n|0,o|0,0,p|0,t|0,Qy(e)|0,Ry(e)|0);break d}case 1:{j=Lt(g)|0;k=Ht(g)|0;m=(It(g)|0)+1|0;n=Oy(g)|0;o=Py(e)|0;p=Nh(g)|0;t=Nt(e)|0;Ma(q|0,j|0,k|0,m|0,n|0,o|0,p|0,t|0,Qy(e)|0,Ry(e)|0);break d}case 5:{n=Lt(g)|0;o=Ht(g)|0;p=(It(g)|0)+1|0;t=Oy(g)|0;Ma(q|0,n|0,o|0,p|0,t|0,Sy(g)|0,Nh(g)|0,0,0,0);break d}default:break d}while(0);f=c[f>>2]|0}while((f|0)!=0)}b=c[b>>2]|0;if(!b)break b}Qa()}while(0);Pa();l=s;return}function Gy(){return 11662}function Hy(b){b=b|0;a[b+40>>0]=0;return}function Iy(b){b=b|0;return (a[b+40>>0]|0)!=0|0}function Jy(a,b){a=a|0;b=b|0;b=Ty(b)|0;a=c[b>>2]|0;c[b>>2]=c[a>>2];dA(a);return c[b>>2]|0}function Ky(b){b=b|0;a[b+40>>0]=1;return}function Ly(a){a=a|0;return c[a+20>>2]|0}function My(a){a=a|0;return c[a+8>>2]|0}function Ny(a){a=a|0;return c[a+32>>2]|0}function Oy(a){a=a|0;return c[a+4>>2]|0}function Py(a){a=a|0;return c[a+4>>2]|0}function Qy(a){a=a|0;return c[a+8>>2]|0}function Ry(a){a=a|0;return c[a+16>>2]|0}function Sy(a){a=a|0;return c[a+20>>2]|0}function Ty(a){a=a|0;return c[a>>2]|0}function Uy(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=l;l=l+16|0;o=x;do if(a>>>0<245){k=a>>>0<11?16:a+11&-8;a=k>>>3;n=c[2772]|0;d=n>>>a;if(d&3|0){b=(d&1^1)+a|0;a=11128+(b<<1<<2)|0;d=a+8|0;e=c[d>>2]|0;f=e+8|0;g=c[f>>2]|0;if((a|0)==(g|0))c[2772]=n&~(1<<b);else{c[g+12>>2]=a;c[d>>2]=g}w=b<<3;c[e+4>>2]=w|3;w=e+w+4|0;c[w>>2]=c[w>>2]|1;w=f;l=x;return w|0}m=c[2774]|0;if(k>>>0>m>>>0){if(d|0){b=2<<a;b=d<<a&(b|0-b);b=(b&0-b)+-1|0;h=b>>>12&16;b=b>>>h;d=b>>>5&8;b=b>>>d;f=b>>>2&4;b=b>>>f;a=b>>>1&2;b=b>>>a;e=b>>>1&1;e=(d|h|f|a|e)+(b>>>e)|0;b=11128+(e<<1<<2)|0;a=b+8|0;f=c[a>>2]|0;h=f+8|0;d=c[h>>2]|0;if((b|0)==(d|0)){a=n&~(1<<e);c[2772]=a}else{c[d+12>>2]=b;c[a>>2]=d;a=n}g=(e<<3)-k|0;c[f+4>>2]=k|3;e=f+k|0;c[e+4>>2]=g|1;c[e+g>>2]=g;if(m|0){f=c[2777]|0;b=m>>>3;d=11128+(b<<1<<2)|0;b=1<<b;if(!(a&b)){c[2772]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=f;c[b+12>>2]=f;c[f+8>>2]=b;c[f+12>>2]=d}c[2774]=g;c[2777]=e;w=h;l=x;return w|0}i=c[2773]|0;if(i){d=(i&0-i)+-1|0;h=d>>>12&16;d=d>>>h;g=d>>>5&8;d=d>>>g;j=d>>>2&4;d=d>>>j;e=d>>>1&2;d=d>>>e;a=d>>>1&1;a=c[11392+((g|h|j|e|a)+(d>>>a)<<2)>>2]|0;d=(c[a+4>>2]&-8)-k|0;e=c[a+16+(((c[a+16>>2]|0)==0&1)<<2)>>2]|0;if(!e){j=a;g=d}else{do{h=(c[e+4>>2]&-8)-k|0;j=h>>>0<d>>>0;d=j?h:d;a=j?e:a;e=c[e+16+(((c[e+16>>2]|0)==0&1)<<2)>>2]|0}while((e|0)!=0);j=a;g=d}h=j+k|0;if(j>>>0<h>>>0){f=c[j+24>>2]|0;b=c[j+12>>2]|0;do if((b|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){d=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}c[a>>2]=0;d=b}else{d=c[j+8>>2]|0;c[d+12>>2]=b;c[b+8>>2]=d;d=b}while(0);do if(f|0){b=c[j+28>>2]|0;a=11392+(b<<2)|0;if((j|0)==(c[a>>2]|0)){c[a>>2]=d;if(!d){c[2773]=i&~(1<<b);break}}else{c[f+16+(((c[f+16>>2]|0)!=(j|0)&1)<<2)>>2]=d;if(!d)break}c[d+24>>2]=f;b=c[j+16>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d}b=c[j+20>>2]|0;if(b|0){c[d+20>>2]=b;c[b+24>>2]=d}}while(0);if(g>>>0<16){w=g+k|0;c[j+4>>2]=w|3;w=j+w+4|0;c[w>>2]=c[w>>2]|1}else{c[j+4>>2]=k|3;c[h+4>>2]=g|1;c[h+g>>2]=g;if(m|0){e=c[2777]|0;b=m>>>3;d=11128+(b<<1<<2)|0;b=1<<b;if(!(n&b)){c[2772]=n|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=e;c[b+12>>2]=e;c[e+8>>2]=b;c[e+12>>2]=d}c[2774]=g;c[2777]=h}w=j+8|0;l=x;return w|0}else n=k}else n=k}else n=k}else if(a>>>0<=4294967231){a=a+11|0;k=a&-8;j=c[2773]|0;if(j){e=0-k|0;a=a>>>8;if(a)if(k>>>0>16777215)i=31;else{n=(a+1048320|0)>>>16&8;v=a<<n;m=(v+520192|0)>>>16&4;v=v<<m;i=(v+245760|0)>>>16&2;i=14-(m|n|i)+(v<<i>>>15)|0;i=k>>>(i+7|0)&1|i<<1}else i=0;d=c[11392+(i<<2)>>2]|0;a:do if(!d){d=0;a=0;v=57}else{a=0;h=k<<((i|0)==31?0:25-(i>>>1)|0);g=0;while(1){f=(c[d+4>>2]&-8)-k|0;if(f>>>0<e>>>0)if(!f){a=d;e=0;f=d;v=61;break a}else{a=d;e=f}f=c[d+20>>2]|0;d=c[d+16+(h>>>31<<2)>>2]|0;g=(f|0)==0|(f|0)==(d|0)?g:f;f=(d|0)==0;if(f){d=g;v=57;break}else h=h<<((f^1)&1)}}while(0);if((v|0)==57){if((d|0)==0&(a|0)==0){a=2<<i;a=j&(a|0-a);if(!a){n=k;break}n=(a&0-a)+-1|0;h=n>>>12&16;n=n>>>h;g=n>>>5&8;n=n>>>g;i=n>>>2&4;n=n>>>i;m=n>>>1&2;n=n>>>m;d=n>>>1&1;a=0;d=c[11392+((g|h|i|m|d)+(n>>>d)<<2)>>2]|0}if(!d){i=a;h=e}else{f=d;v=61}}if((v|0)==61)while(1){v=0;d=(c[f+4>>2]&-8)-k|0;n=d>>>0<e>>>0;d=n?d:e;a=n?f:a;f=c[f+16+(((c[f+16>>2]|0)==0&1)<<2)>>2]|0;if(!f){i=a;h=d;break}else{e=d;v=61}}if((i|0)!=0?h>>>0<((c[2774]|0)-k|0)>>>0:0){g=i+k|0;if(i>>>0>=g>>>0){w=0;l=x;return w|0}f=c[i+24>>2]|0;b=c[i+12>>2]|0;do if((b|0)==(i|0)){a=i+20|0;b=c[a>>2]|0;if(!b){a=i+16|0;b=c[a>>2]|0;if(!b){b=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}c[a>>2]=0}else{w=c[i+8>>2]|0;c[w+12>>2]=b;c[b+8>>2]=w}while(0);do if(f){a=c[i+28>>2]|0;d=11392+(a<<2)|0;if((i|0)==(c[d>>2]|0)){c[d>>2]=b;if(!b){e=j&~(1<<a);c[2773]=e;break}}else{c[f+16+(((c[f+16>>2]|0)!=(i|0)&1)<<2)>>2]=b;if(!b){e=j;break}}c[b+24>>2]=f;a=c[i+16>>2]|0;if(a|0){c[b+16>>2]=a;c[a+24>>2]=b}a=c[i+20>>2]|0;if(a){c[b+20>>2]=a;c[a+24>>2]=b;e=j}else e=j}else e=j;while(0);do if(h>>>0>=16){c[i+4>>2]=k|3;c[g+4>>2]=h|1;c[g+h>>2]=h;b=h>>>3;if(h>>>0<256){d=11128+(b<<1<<2)|0;a=c[2772]|0;b=1<<b;if(!(a&b)){c[2772]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=g;c[b+12>>2]=g;c[g+8>>2]=b;c[g+12>>2]=d;break}b=h>>>8;if(b)if(h>>>0>16777215)b=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;b=(w+245760|0)>>>16&2;b=14-(u|v|b)+(w<<b>>>15)|0;b=h>>>(b+7|0)&1|b<<1}else b=0;d=11392+(b<<2)|0;c[g+28>>2]=b;a=g+16|0;c[a+4>>2]=0;c[a>>2]=0;a=1<<b;if(!(e&a)){c[2773]=e|a;c[d>>2]=g;c[g+24>>2]=d;c[g+12>>2]=g;c[g+8>>2]=g;break}a=h<<((b|0)==31?0:25-(b>>>1)|0);d=c[d>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(h|0)){v=97;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=96;break}else{a=a<<1;d=b}}if((v|0)==96){c[e>>2]=g;c[g+24>>2]=d;c[g+12>>2]=g;c[g+8>>2]=g;break}else if((v|0)==97){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=g;c[v>>2]=g;c[g+8>>2]=w;c[g+12>>2]=d;c[g+24>>2]=0;break}}else{w=h+k|0;c[i+4>>2]=w|3;w=i+w+4|0;c[w>>2]=c[w>>2]|1}while(0);w=i+8|0;l=x;return w|0}else n=k}else n=k}else n=-1;while(0);d=c[2774]|0;if(d>>>0>=n>>>0){b=d-n|0;a=c[2777]|0;if(b>>>0>15){w=a+n|0;c[2777]=w;c[2774]=b;c[w+4>>2]=b|1;c[w+b>>2]=b;c[a+4>>2]=n|3}else{c[2774]=0;c[2777]=0;c[a+4>>2]=d|3;w=a+d+4|0;c[w>>2]=c[w>>2]|1}w=a+8|0;l=x;return w|0}h=c[2775]|0;if(h>>>0>n>>>0){u=h-n|0;c[2775]=u;w=c[2778]|0;v=w+n|0;c[2778]=v;c[v+4>>2]=u|1;c[w+4>>2]=n|3;w=w+8|0;l=x;return w|0}if(!(c[2890]|0)){c[2892]=4096;c[2891]=4096;c[2893]=-1;c[2894]=-1;c[2895]=0;c[2883]=0;a=o&-16^1431655768;c[o>>2]=a;c[2890]=a;a=4096}else a=c[2892]|0;i=n+48|0;j=n+47|0;g=a+j|0;f=0-a|0;k=g&f;if(k>>>0<=n>>>0){w=0;l=x;return w|0}a=c[2882]|0;if(a|0?(m=c[2880]|0,o=m+k|0,o>>>0<=m>>>0|o>>>0>a>>>0):0){w=0;l=x;return w|0}b:do if(!(c[2883]&4)){d=c[2778]|0;c:do if(d){e=11536;while(1){a=c[e>>2]|0;if(a>>>0<=d>>>0?(r=e+4|0,(a+(c[r>>2]|0)|0)>>>0>d>>>0):0)break;a=c[e+8>>2]|0;if(!a){v=118;break c}else e=a}b=g-h&f;if(b>>>0<2147483647){a=qA(b|0)|0;if((a|0)==((c[e>>2]|0)+(c[r>>2]|0)|0)){if((a|0)!=(-1|0)){h=b;g=a;v=135;break b}}else{e=a;v=126}}else b=0}else v=118;while(0);do if((v|0)==118){d=qA(0)|0;if((d|0)!=(-1|0)?(b=d,p=c[2891]|0,q=p+-1|0,b=((q&b|0)==0?0:(q+b&0-p)-b|0)+k|0,p=c[2880]|0,q=b+p|0,b>>>0>n>>>0&b>>>0<2147483647):0){r=c[2882]|0;if(r|0?q>>>0<=p>>>0|q>>>0>r>>>0:0){b=0;break}a=qA(b|0)|0;if((a|0)==(d|0)){h=b;g=d;v=135;break b}else{e=a;v=126}}else b=0}while(0);do if((v|0)==126){d=0-b|0;if(!(i>>>0>b>>>0&(b>>>0<2147483647&(e|0)!=(-1|0))))if((e|0)==(-1|0)){b=0;break}else{h=b;g=e;v=135;break b}a=c[2892]|0;a=j-b+a&0-a;if(a>>>0>=2147483647){h=b;g=e;v=135;break b}if((qA(a|0)|0)==(-1|0)){qA(d|0)|0;b=0;break}else{h=a+b|0;g=e;v=135;break b}}while(0);c[2883]=c[2883]|4;v=133}else{b=0;v=133}while(0);if(((v|0)==133?k>>>0<2147483647:0)?(u=qA(k|0)|0,r=qA(0)|0,s=r-u|0,t=s>>>0>(n+40|0)>>>0,!((u|0)==(-1|0)|t^1|u>>>0<r>>>0&((u|0)!=(-1|0)&(r|0)!=(-1|0))^1)):0){h=t?s:b;g=u;v=135}if((v|0)==135){b=(c[2880]|0)+h|0;c[2880]=b;if(b>>>0>(c[2881]|0)>>>0)c[2881]=b;j=c[2778]|0;do if(j){b=11536;while(1){a=c[b>>2]|0;d=b+4|0;e=c[d>>2]|0;if((g|0)==(a+e|0)){v=145;break}f=c[b+8>>2]|0;if(!f)break;else b=f}if(((v|0)==145?(c[b+12>>2]&8|0)==0:0)?j>>>0<g>>>0&j>>>0>=a>>>0:0){c[d>>2]=e+h;w=j+8|0;w=(w&7|0)==0?0:0-w&7;v=j+w|0;w=(c[2775]|0)+(h-w)|0;c[2778]=v;c[2775]=w;c[v+4>>2]=w|1;c[v+w+4>>2]=40;c[2779]=c[2894];break}if(g>>>0<(c[2776]|0)>>>0)c[2776]=g;d=g+h|0;b=11536;while(1){if((c[b>>2]|0)==(d|0)){v=153;break}a=c[b+8>>2]|0;if(!a)break;else b=a}if((v|0)==153?(c[b+12>>2]&8|0)==0:0){c[b>>2]=g;m=b+4|0;c[m>>2]=(c[m>>2]|0)+h;m=g+8|0;m=g+((m&7|0)==0?0:0-m&7)|0;b=d+8|0;b=d+((b&7|0)==0?0:0-b&7)|0;k=m+n|0;i=b-m-n|0;c[m+4>>2]=n|3;do if((b|0)!=(j|0)){if((b|0)==(c[2777]|0)){w=(c[2774]|0)+i|0;c[2774]=w;c[2777]=k;c[k+4>>2]=w|1;c[k+w>>2]=w;break}a=c[b+4>>2]|0;if((a&3|0)==1){h=a&-8;e=a>>>3;d:do if(a>>>0<256){a=c[b+8>>2]|0;d=c[b+12>>2]|0;if((d|0)==(a|0)){c[2772]=c[2772]&~(1<<e);break}else{c[a+12>>2]=d;c[d+8>>2]=a;break}}else{g=c[b+24>>2]|0;a=c[b+12>>2]|0;do if((a|0)==(b|0)){e=b+16|0;d=e+4|0;a=c[d>>2]|0;if(!a){a=c[e>>2]|0;if(!a){a=0;break}else d=e}while(1){e=a+20|0;f=c[e>>2]|0;if(f|0){a=f;d=e;continue}e=a+16|0;f=c[e>>2]|0;if(!f)break;else{a=f;d=e}}c[d>>2]=0}else{w=c[b+8>>2]|0;c[w+12>>2]=a;c[a+8>>2]=w}while(0);if(!g)break;d=c[b+28>>2]|0;e=11392+(d<<2)|0;do if((b|0)!=(c[e>>2]|0)){c[g+16+(((c[g+16>>2]|0)!=(b|0)&1)<<2)>>2]=a;if(!a)break d}else{c[e>>2]=a;if(a|0)break;c[2773]=c[2773]&~(1<<d);break d}while(0);c[a+24>>2]=g;d=b+16|0;e=c[d>>2]|0;if(e|0){c[a+16>>2]=e;c[e+24>>2]=a}d=c[d+4>>2]|0;if(!d)break;c[a+20>>2]=d;c[d+24>>2]=a}while(0);b=b+h|0;f=h+i|0}else f=i;b=b+4|0;c[b>>2]=c[b>>2]&-2;c[k+4>>2]=f|1;c[k+f>>2]=f;b=f>>>3;if(f>>>0<256){d=11128+(b<<1<<2)|0;a=c[2772]|0;b=1<<b;if(!(a&b)){c[2772]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=k;c[b+12>>2]=k;c[k+8>>2]=b;c[k+12>>2]=d;break}b=f>>>8;do if(!b)b=0;else{if(f>>>0>16777215){b=31;break}v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;b=(w+245760|0)>>>16&2;b=14-(u|v|b)+(w<<b>>>15)|0;b=f>>>(b+7|0)&1|b<<1}while(0);e=11392+(b<<2)|0;c[k+28>>2]=b;a=k+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[2773]|0;d=1<<b;if(!(a&d)){c[2773]=a|d;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}a=f<<((b|0)==31?0:25-(b>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(f|0)){v=194;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=193;break}else{a=a<<1;d=b}}if((v|0)==193){c[e>>2]=k;c[k+24>>2]=d;c[k+12>>2]=k;c[k+8>>2]=k;break}else if((v|0)==194){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=k;c[v>>2]=k;c[k+8>>2]=w;c[k+12>>2]=d;c[k+24>>2]=0;break}}else{w=(c[2775]|0)+i|0;c[2775]=w;c[2778]=k;c[k+4>>2]=w|1}while(0);w=m+8|0;l=x;return w|0}b=11536;while(1){a=c[b>>2]|0;if(a>>>0<=j>>>0?(w=a+(c[b+4>>2]|0)|0,w>>>0>j>>>0):0)break;b=c[b+8>>2]|0}f=w+-47|0;a=f+8|0;a=f+((a&7|0)==0?0:0-a&7)|0;f=j+16|0;a=a>>>0<f>>>0?j:a;b=a+8|0;d=g+8|0;d=(d&7|0)==0?0:0-d&7;v=g+d|0;d=h+-40-d|0;c[2778]=v;c[2775]=d;c[v+4>>2]=d|1;c[v+d+4>>2]=40;c[2779]=c[2894];d=a+4|0;c[d>>2]=27;c[b>>2]=c[2884];c[b+4>>2]=c[2885];c[b+8>>2]=c[2886];c[b+12>>2]=c[2887];c[2884]=g;c[2885]=h;c[2887]=0;c[2886]=b;b=a+24|0;do{v=b;b=b+4|0;c[b>>2]=7}while((v+8|0)>>>0<w>>>0);if((a|0)!=(j|0)){g=a-j|0;c[d>>2]=c[d>>2]&-2;c[j+4>>2]=g|1;c[a>>2]=g;b=g>>>3;if(g>>>0<256){d=11128+(b<<1<<2)|0;a=c[2772]|0;b=1<<b;if(!(a&b)){c[2772]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=j;c[b+12>>2]=j;c[j+8>>2]=b;c[j+12>>2]=d;break}b=g>>>8;if(b)if(g>>>0>16777215)d=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;d=(w+245760|0)>>>16&2;d=14-(u|v|d)+(w<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1}else d=0;e=11392+(d<<2)|0;c[j+28>>2]=d;c[j+20>>2]=0;c[f>>2]=0;b=c[2773]|0;a=1<<d;if(!(b&a)){c[2773]=b|a;c[e>>2]=j;c[j+24>>2]=e;c[j+12>>2]=j;c[j+8>>2]=j;break}a=g<<((d|0)==31?0:25-(d>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(g|0)){v=216;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=215;break}else{a=a<<1;d=b}}if((v|0)==215){c[e>>2]=j;c[j+24>>2]=d;c[j+12>>2]=j;c[j+8>>2]=j;break}else if((v|0)==216){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=j;c[v>>2]=j;c[j+8>>2]=w;c[j+12>>2]=d;c[j+24>>2]=0;break}}}else{w=c[2776]|0;if((w|0)==0|g>>>0<w>>>0)c[2776]=g;c[2884]=g;c[2885]=h;c[2887]=0;c[2781]=c[2890];c[2780]=-1;b=0;do{w=11128+(b<<1<<2)|0;c[w+12>>2]=w;c[w+8>>2]=w;b=b+1|0}while((b|0)!=32);w=g+8|0;w=(w&7|0)==0?0:0-w&7;v=g+w|0;w=h+-40-w|0;c[2778]=v;c[2775]=w;c[v+4>>2]=w|1;c[v+w+4>>2]=40;c[2779]=c[2894]}while(0);b=c[2775]|0;if(b>>>0>n>>>0){u=b-n|0;c[2775]=u;w=c[2778]|0;v=w+n|0;c[2778]=v;c[v+4>>2]=u|1;c[w+4>>2]=n|3;w=w+8|0;l=x;return w|0}}c[(cz()|0)>>2]=12;w=0;l=x;return w|0}function Vy(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if(!a)return;d=a+-8|0;f=c[2776]|0;a=c[a+-4>>2]|0;b=a&-8;j=d+b|0;do if(!(a&1)){e=c[d>>2]|0;if(!(a&3))return;h=d+(0-e)|0;g=e+b|0;if(h>>>0<f>>>0)return;if((h|0)==(c[2777]|0)){a=j+4|0;b=c[a>>2]|0;if((b&3|0)!=3){i=h;b=g;break}c[2774]=g;c[a>>2]=b&-2;c[h+4>>2]=g|1;c[h+g>>2]=g;return}d=e>>>3;if(e>>>0<256){a=c[h+8>>2]|0;b=c[h+12>>2]|0;if((b|0)==(a|0)){c[2772]=c[2772]&~(1<<d);i=h;b=g;break}else{c[a+12>>2]=b;c[b+8>>2]=a;i=h;b=g;break}}f=c[h+24>>2]|0;a=c[h+12>>2]|0;do if((a|0)==(h|0)){d=h+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){a=0;break}else b=d}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}c[b>>2]=0}else{i=c[h+8>>2]|0;c[i+12>>2]=a;c[a+8>>2]=i}while(0);if(f){b=c[h+28>>2]|0;d=11392+(b<<2)|0;if((h|0)==(c[d>>2]|0)){c[d>>2]=a;if(!a){c[2773]=c[2773]&~(1<<b);i=h;b=g;break}}else{c[f+16+(((c[f+16>>2]|0)!=(h|0)&1)<<2)>>2]=a;if(!a){i=h;b=g;break}}c[a+24>>2]=f;b=h+16|0;d=c[b>>2]|0;if(d|0){c[a+16>>2]=d;c[d+24>>2]=a}b=c[b+4>>2]|0;if(b){c[a+20>>2]=b;c[b+24>>2]=a;i=h;b=g}else{i=h;b=g}}else{i=h;b=g}}else{i=d;h=d}while(0);if(h>>>0>=j>>>0)return;a=j+4|0;e=c[a>>2]|0;if(!(e&1))return;if(!(e&2)){a=c[2777]|0;if((j|0)==(c[2778]|0)){j=(c[2775]|0)+b|0;c[2775]=j;c[2778]=i;c[i+4>>2]=j|1;if((i|0)!=(a|0))return;c[2777]=0;c[2774]=0;return}if((j|0)==(a|0)){j=(c[2774]|0)+b|0;c[2774]=j;c[2777]=h;c[i+4>>2]=j|1;c[h+j>>2]=j;return}f=(e&-8)+b|0;d=e>>>3;do if(e>>>0<256){b=c[j+8>>2]|0;a=c[j+12>>2]|0;if((a|0)==(b|0)){c[2772]=c[2772]&~(1<<d);break}else{c[b+12>>2]=a;c[a+8>>2]=b;break}}else{g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){d=j+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){d=0;break}else b=d}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}c[b>>2]=0;d=a}else{d=c[j+8>>2]|0;c[d+12>>2]=a;c[a+8>>2]=d;d=a}while(0);if(g|0){a=c[j+28>>2]|0;b=11392+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=d;if(!d){c[2773]=c[2773]&~(1<<a);break}}else{c[g+16+(((c[g+16>>2]|0)!=(j|0)&1)<<2)>>2]=d;if(!d)break}c[d+24>>2]=g;a=j+16|0;b=c[a>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d}a=c[a+4>>2]|0;if(a|0){c[d+20>>2]=a;c[a+24>>2]=d}}}while(0);c[i+4>>2]=f|1;c[h+f>>2]=f;if((i|0)==(c[2777]|0)){c[2774]=f;return}}else{c[a>>2]=e&-2;c[i+4>>2]=b|1;c[h+b>>2]=b;f=b}a=f>>>3;if(f>>>0<256){d=11128+(a<<1<<2)|0;b=c[2772]|0;a=1<<a;if(!(b&a)){c[2772]=b|a;a=d;b=d+8|0}else{b=d+8|0;a=c[b>>2]|0}c[b>>2]=i;c[a+12>>2]=i;c[i+8>>2]=a;c[i+12>>2]=d;return}a=f>>>8;if(a)if(f>>>0>16777215)a=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;a=(j+245760|0)>>>16&2;a=14-(g|h|a)+(j<<a>>>15)|0;a=f>>>(a+7|0)&1|a<<1}else a=0;e=11392+(a<<2)|0;c[i+28>>2]=a;c[i+20>>2]=0;c[i+16>>2]=0;b=c[2773]|0;d=1<<a;do if(b&d){b=f<<((a|0)==31?0:25-(a>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(f|0)){a=73;break}e=d+16+(b>>>31<<2)|0;a=c[e>>2]|0;if(!a){a=72;break}else{b=b<<1;d=a}}if((a|0)==72){c[e>>2]=i;c[i+24>>2]=d;c[i+12>>2]=i;c[i+8>>2]=i;break}else if((a|0)==73){h=d+8|0;j=c[h>>2]|0;c[j+12>>2]=i;c[h>>2]=i;c[i+8>>2]=j;c[i+12>>2]=d;c[i+24>>2]=0;break}}else{c[2773]=b|d;c[e>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i}while(0);j=(c[2780]|0)+-1|0;c[2780]=j;if(!j)a=11544;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[2780]=-1;return}function Wy(a,b){a=a|0;b=b|0;var d=0,e=0;if(!a){b=Uy(b)|0;return b|0}if(b>>>0>4294967231){c[(cz()|0)>>2]=12;b=0;return b|0}d=Xy(a+-8|0,b>>>0<11?16:b+11&-8)|0;if(d|0){b=d+8|0;return b|0}d=Uy(b)|0;if(!d){b=0;return b|0}e=c[a+-4>>2]|0;e=(e&-8)-((e&3|0)==0?8:4)|0;mA(d|0,a|0,(e>>>0<b>>>0?e:b)|0)|0;Vy(a);b=d;return b|0}function Xy(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=a+4|0;l=c[m>>2]|0;d=l&-8;i=a+d|0;if(!(l&3)){if(b>>>0<256){a=0;return a|0}if(d>>>0>=(b+4|0)>>>0?(d-b|0)>>>0<=c[2892]<<1>>>0:0)return a|0;a=0;return a|0}if(d>>>0>=b>>>0){d=d-b|0;if(d>>>0<=15)return a|0;k=a+b|0;c[m>>2]=l&1|b|2;c[k+4>>2]=d|3;m=k+d+4|0;c[m>>2]=c[m>>2]|1;Yy(k,d);return a|0}if((i|0)==(c[2778]|0)){k=(c[2775]|0)+d|0;d=k-b|0;e=a+b|0;if(k>>>0<=b>>>0){a=0;return a|0}c[m>>2]=l&1|b|2;c[e+4>>2]=d|1;c[2778]=e;c[2775]=d;return a|0}if((i|0)==(c[2777]|0)){f=(c[2774]|0)+d|0;if(f>>>0<b>>>0){a=0;return a|0}d=f-b|0;e=l&1;if(d>>>0>15){l=a+b|0;k=l+d|0;c[m>>2]=e|b|2;c[l+4>>2]=d|1;c[k>>2]=d;e=k+4|0;c[e>>2]=c[e>>2]&-2;e=l}else{c[m>>2]=e|f|2;e=a+f+4|0;c[e>>2]=c[e>>2]|1;e=0;d=0}c[2774]=d;c[2777]=e;return a|0}e=c[i+4>>2]|0;if(e&2|0){a=0;return a|0}j=(e&-8)+d|0;if(j>>>0<b>>>0){a=0;return a|0}k=j-b|0;f=e>>>3;do if(e>>>0<256){e=c[i+8>>2]|0;d=c[i+12>>2]|0;if((d|0)==(e|0)){c[2772]=c[2772]&~(1<<f);break}else{c[e+12>>2]=d;c[d+8>>2]=e;break}}else{h=c[i+24>>2]|0;d=c[i+12>>2]|0;do if((d|0)==(i|0)){f=i+16|0;e=f+4|0;d=c[e>>2]|0;if(!d){d=c[f>>2]|0;if(!d){f=0;break}else g=f}else g=e;while(1){f=d+20|0;e=c[f>>2]|0;if(e|0){d=e;g=f;continue}e=d+16|0;f=c[e>>2]|0;if(!f)break;else{d=f;g=e}}c[g>>2]=0;f=d}else{f=c[i+8>>2]|0;c[f+12>>2]=d;c[d+8>>2]=f;f=d}while(0);if(h|0){d=c[i+28>>2]|0;e=11392+(d<<2)|0;if((i|0)==(c[e>>2]|0)){c[e>>2]=f;if(!f){c[2773]=c[2773]&~(1<<d);break}}else{c[h+16+(((c[h+16>>2]|0)!=(i|0)&1)<<2)>>2]=f;if(!f)break}c[f+24>>2]=h;d=i+16|0;e=c[d>>2]|0;if(e|0){c[f+16>>2]=e;c[e+24>>2]=f}d=c[d+4>>2]|0;if(d|0){c[f+20>>2]=d;c[d+24>>2]=f}}}while(0);d=l&1;if(k>>>0<16){c[m>>2]=j|d|2;m=a+j+4|0;c[m>>2]=c[m>>2]|1;return a|0}else{l=a+b|0;c[m>>2]=d|b|2;c[l+4>>2]=k|3;m=l+k+4|0;c[m>>2]=c[m>>2]|1;Yy(l,k);return a|0}return 0}function Yy(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;j=a+b|0;d=c[a+4>>2]|0;do if(!(d&1)){e=c[a>>2]|0;if(!(d&3))return;g=a+(0-e)|0;h=e+b|0;if((g|0)==(c[2777]|0)){a=j+4|0;d=c[a>>2]|0;if((d&3|0)!=3){i=g;d=h;break}c[2774]=h;c[a>>2]=d&-2;c[g+4>>2]=h|1;c[g+h>>2]=h;return}b=e>>>3;if(e>>>0<256){a=c[g+8>>2]|0;d=c[g+12>>2]|0;if((d|0)==(a|0)){c[2772]=c[2772]&~(1<<b);i=g;d=h;break}else{c[a+12>>2]=d;c[d+8>>2]=a;i=g;d=h;break}}f=c[g+24>>2]|0;a=c[g+12>>2]|0;do if((a|0)==(g|0)){b=g+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){a=0;break}else d=b}while(1){b=a+20|0;e=c[b>>2]|0;if(e|0){a=e;d=b;continue}b=a+16|0;e=c[b>>2]|0;if(!e)break;else{a=e;d=b}}c[d>>2]=0}else{i=c[g+8>>2]|0;c[i+12>>2]=a;c[a+8>>2]=i}while(0);if(f){d=c[g+28>>2]|0;b=11392+(d<<2)|0;if((g|0)==(c[b>>2]|0)){c[b>>2]=a;if(!a){c[2773]=c[2773]&~(1<<d);i=g;d=h;break}}else{c[f+16+(((c[f+16>>2]|0)!=(g|0)&1)<<2)>>2]=a;if(!a){i=g;d=h;break}}c[a+24>>2]=f;d=g+16|0;b=c[d>>2]|0;if(b|0){c[a+16>>2]=b;c[b+24>>2]=a}d=c[d+4>>2]|0;if(d){c[a+20>>2]=d;c[d+24>>2]=a;i=g;d=h}else{i=g;d=h}}else{i=g;d=h}}else{i=a;d=b}while(0);a=j+4|0;e=c[a>>2]|0;if(!(e&2)){a=c[2777]|0;if((j|0)==(c[2778]|0)){j=(c[2775]|0)+d|0;c[2775]=j;c[2778]=i;c[i+4>>2]=j|1;if((i|0)!=(a|0))return;c[2777]=0;c[2774]=0;return}if((j|0)==(a|0)){j=(c[2774]|0)+d|0;c[2774]=j;c[2777]=i;c[i+4>>2]=j|1;c[i+j>>2]=j;return}g=(e&-8)+d|0;b=e>>>3;do if(e>>>0<256){d=c[j+8>>2]|0;a=c[j+12>>2]|0;if((a|0)==(d|0)){c[2772]=c[2772]&~(1<<b);break}else{c[d+12>>2]=a;c[a+8>>2]=d;break}}else{f=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){b=0;break}else d=b}while(1){b=a+20|0;e=c[b>>2]|0;if(e|0){a=e;d=b;continue}b=a+16|0;e=c[b>>2]|0;if(!e)break;else{a=e;d=b}}c[d>>2]=0;b=a}else{b=c[j+8>>2]|0;c[b+12>>2]=a;c[a+8>>2]=b;b=a}while(0);if(f|0){a=c[j+28>>2]|0;d=11392+(a<<2)|0;if((j|0)==(c[d>>2]|0)){c[d>>2]=b;if(!b){c[2773]=c[2773]&~(1<<a);break}}else{c[f+16+(((c[f+16>>2]|0)!=(j|0)&1)<<2)>>2]=b;if(!b)break}c[b+24>>2]=f;a=j+16|0;d=c[a>>2]|0;if(d|0){c[b+16>>2]=d;c[d+24>>2]=b}a=c[a+4>>2]|0;if(a|0){c[b+20>>2]=a;c[a+24>>2]=b}}}while(0);c[i+4>>2]=g|1;c[i+g>>2]=g;if((i|0)==(c[2777]|0)){c[2774]=g;return}else d=g}else{c[a>>2]=e&-2;c[i+4>>2]=d|1;c[i+d>>2]=d}a=d>>>3;if(d>>>0<256){b=11128+(a<<1<<2)|0;d=c[2772]|0;a=1<<a;if(!(d&a)){c[2772]=d|a;a=b;d=b+8|0}else{d=b+8|0;a=c[d>>2]|0}c[d>>2]=i;c[a+12>>2]=i;c[i+8>>2]=a;c[i+12>>2]=b;return}a=d>>>8;if(a)if(d>>>0>16777215)a=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;a=(j+245760|0)>>>16&2;a=14-(g|h|a)+(j<<a>>>15)|0;a=d>>>(a+7|0)&1|a<<1}else a=0;f=11392+(a<<2)|0;c[i+28>>2]=a;c[i+20>>2]=0;c[i+16>>2]=0;b=c[2773]|0;e=1<<a;if(!(b&e)){c[2773]=b|e;c[f>>2]=i;c[i+24>>2]=f;c[i+12>>2]=i;c[i+8>>2]=i;return}b=d<<((a|0)==31?0:25-(a>>>1)|0);e=c[f>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(d|0)){a=69;break}f=e+16+(b>>>31<<2)|0;a=c[f>>2]|0;if(!a){a=68;break}else{b=b<<1;e=a}}if((a|0)==68){c[f>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i;return}else if((a|0)==69){h=e+8|0;j=c[h>>2]|0;c[j+12>>2]=i;c[h>>2]=i;c[i+8>>2]=j;c[i+12>>2]=e;c[i+24>>2]=0;return}}function Zy(){return 11584}function _y(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;c[d>>2]=fz(c[a+60>>2]|0)|0;a=bz(ab(6,d|0)|0)|0;l=b;return a|0}function $y(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;n=l;l=l+48|0;k=n+16|0;g=n;f=n+32|0;i=a+28|0;e=c[i>>2]|0;c[f>>2]=e;j=a+20|0;e=(c[j>>2]|0)-e|0;c[f+4>>2]=e;c[f+8>>2]=b;c[f+12>>2]=d;e=e+d|0;h=a+60|0;c[g>>2]=c[h>>2];c[g+4>>2]=f;c[g+8>>2]=2;g=bz(db(146,g|0)|0)|0;a:do if((e|0)!=(g|0)){b=2;while(1){if((g|0)<0)break;e=e-g|0;p=c[f+4>>2]|0;o=g>>>0>p>>>0;f=o?f+8|0:f;b=(o<<31>>31)+b|0;p=g-(o?p:0)|0;c[f>>2]=(c[f>>2]|0)+p;o=f+4|0;c[o>>2]=(c[o>>2]|0)-p;c[k>>2]=c[h>>2];c[k+4>>2]=f;c[k+8>>2]=b;g=bz(db(146,k|0)|0)|0;if((e|0)==(g|0)){m=3;break a}}c[a+16>>2]=0;c[i>>2]=0;c[j>>2]=0;c[a>>2]=c[a>>2]|32;if((b|0)==2)d=0;else d=d-(c[f+4>>2]|0)|0}else m=3;while(0);if((m|0)==3){p=c[a+44>>2]|0;c[a+16>>2]=p+(c[a+48>>2]|0);c[i>>2]=p;c[j>>2]=p}l=n;return d|0}function az(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=l;l=l+32|0;g=f;e=f+20|0;c[g>>2]=c[a+60>>2];c[g+4>>2]=0;c[g+8>>2]=b;c[g+12>>2]=e;c[g+16>>2]=d;if((bz(cb(140,g|0)|0)|0)<0){c[e>>2]=-1;a=-1}else a=c[e>>2]|0;l=f;return a|0}function bz(a){a=a|0;if(a>>>0>4294963200){c[(cz()|0)>>2]=0-a;a=-1}return a|0}function cz(){return (dz()|0)+64|0}function dz(){return ez()|0}function ez(){return 2084}function fz(a){a=a|0;return a|0}function gz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+32|0;f=g;c[b+36>>2]=2;if((c[b>>2]&64|0)==0?(c[f>>2]=c[b+60>>2],c[f+4>>2]=21523,c[f+8>>2]=g+16,Ta(54,f|0)|0):0)a[b+75>>0]=-1;f=$y(b,d,e)|0;l=g;return f|0}function hz(b,c){b=b|0;c=c|0;var d=0,e=0;d=a[b>>0]|0;e=a[c>>0]|0;if(d<<24>>24==0?1:d<<24>>24!=e<<24>>24)b=e;else{do{b=b+1|0;c=c+1|0;d=a[b>>0]|0;e=a[c>>0]|0}while(!(d<<24>>24==0?1:d<<24>>24!=e<<24>>24));b=e}return (d&255)-(b&255)|0}function iz(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if(!d)b=0;else{while(1){e=a[b>>0]|0;f=a[c>>0]|0;if(e<<24>>24!=f<<24>>24)break;d=d+-1|0;if(!d){b=0;break a}else{b=b+1|0;c=c+1|0}}b=(e&255)-(f&255)|0}while(0);return b|0}function jz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=l;l=l+224|0;n=s+120|0;o=s+80|0;q=s;r=s+136|0;f=o;g=f+40|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));c[n>>2]=c[e>>2];if((kz(0,d,n,q,o)|0)<0)e=-1;else{if((c[b+76>>2]|0)>-1)p=lz(b)|0;else p=0;e=c[b>>2]|0;m=e&32;if((a[b+74>>0]|0)<1)c[b>>2]=e&-33;f=b+48|0;if(!(c[f>>2]|0)){g=b+44|0;h=c[g>>2]|0;c[g>>2]=r;i=b+28|0;c[i>>2]=r;j=b+20|0;c[j>>2]=r;c[f>>2]=80;k=b+16|0;c[k>>2]=r+80;e=kz(b,d,n,q,o)|0;if(h){ob[c[b+36>>2]&7](b,0,0)|0;e=(c[j>>2]|0)==0?-1:e;c[g>>2]=h;c[f>>2]=0;c[k>>2]=0;c[i>>2]=0;c[j>>2]=0}}else e=kz(b,d,n,q,o)|0;f=c[b>>2]|0;c[b>>2]=f|m;if(p|0)mz(b);e=(f&32|0)==0?e:-1}l=s;return e|0}function kz(d,e,f,g,i){d=d|0;e=e|0;f=f|0;g=g|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;H=l;l=l+64|0;D=H+16|0;E=H;B=H+24|0;F=H+8|0;G=H+20|0;c[D>>2]=e;x=(d|0)!=0;y=B+40|0;z=y;B=B+39|0;C=F+4|0;k=0;j=0;p=0;a:while(1){do if((j|0)>-1)if((k|0)>(2147483647-j|0)){c[(cz()|0)>>2]=75;j=-1;break}else{j=k+j|0;break}while(0);k=a[e>>0]|0;if(!(k<<24>>24)){w=87;break}else m=e;b:while(1){switch(k<<24>>24){case 37:{k=m;w=9;break b}case 0:{k=m;break b}default:{}}v=m+1|0;c[D>>2]=v;k=a[v>>0]|0;m=v}c:do if((w|0)==9)while(1){w=0;if((a[m+1>>0]|0)!=37)break c;k=k+1|0;m=m+2|0;c[D>>2]=m;if((a[m>>0]|0)==37)w=9;else break}while(0);k=k-e|0;if(x)nz(d,e,k);if(k|0){e=m;continue}n=m+1|0;k=(a[n>>0]|0)+-48|0;if(k>>>0<10){v=(a[m+2>>0]|0)==36;u=v?k:-1;p=v?1:p;n=v?m+3|0:n}else u=-1;c[D>>2]=n;k=a[n>>0]|0;m=(k<<24>>24)+-32|0;d:do if(m>>>0<32){o=0;q=k;while(1){k=1<<m;if(!(k&75913)){k=q;break d}o=k|o;n=n+1|0;c[D>>2]=n;k=a[n>>0]|0;m=(k<<24>>24)+-32|0;if(m>>>0>=32)break;else q=k}}else o=0;while(0);if(k<<24>>24==42){m=n+1|0;k=(a[m>>0]|0)+-48|0;if(k>>>0<10?(a[n+2>>0]|0)==36:0){c[i+(k<<2)>>2]=10;k=c[g+((a[m>>0]|0)+-48<<3)>>2]|0;p=1;n=n+3|0}else{if(p|0){j=-1;break}if(x){p=(c[f>>2]|0)+(4-1)&~(4-1);k=c[p>>2]|0;c[f>>2]=p+4;p=0;n=m}else{k=0;p=0;n=m}}c[D>>2]=n;v=(k|0)<0;k=v?0-k|0:k;o=v?o|8192:o}else{k=oz(D)|0;if((k|0)<0){j=-1;break}n=c[D>>2]|0}do if((a[n>>0]|0)==46){if((a[n+1>>0]|0)!=42){c[D>>2]=n+1;m=oz(D)|0;n=c[D>>2]|0;break}q=n+2|0;m=(a[q>>0]|0)+-48|0;if(m>>>0<10?(a[n+3>>0]|0)==36:0){c[i+(m<<2)>>2]=10;m=c[g+((a[q>>0]|0)+-48<<3)>>2]|0;n=n+4|0;c[D>>2]=n;break}if(p|0){j=-1;break a}if(x){v=(c[f>>2]|0)+(4-1)&~(4-1);m=c[v>>2]|0;c[f>>2]=v+4}else m=0;c[D>>2]=q;n=q}else m=-1;while(0);t=0;while(1){if(((a[n>>0]|0)+-65|0)>>>0>57){j=-1;break a}v=n+1|0;c[D>>2]=v;q=a[(a[n>>0]|0)+-65+(6369+(t*58|0))>>0]|0;r=q&255;if((r+-1|0)>>>0<8){t=r;n=v}else break}if(!(q<<24>>24)){j=-1;break}s=(u|0)>-1;do if(q<<24>>24==19)if(s){j=-1;break a}else w=49;else{if(s){c[i+(u<<2)>>2]=r;s=g+(u<<3)|0;u=c[s+4>>2]|0;w=E;c[w>>2]=c[s>>2];c[w+4>>2]=u;w=49;break}if(!x){j=0;break a}pz(E,r,f)}while(0);if((w|0)==49?(w=0,!x):0){k=0;e=v;continue}n=a[n>>0]|0;n=(t|0)!=0&(n&15|0)==3?n&-33:n;s=o&-65537;u=(o&8192|0)==0?o:s;e:do switch(n|0){case 110:switch((t&255)<<24>>24){case 0:{c[c[E>>2]>>2]=j;k=0;e=v;continue a}case 1:{c[c[E>>2]>>2]=j;k=0;e=v;continue a}case 2:{k=c[E>>2]|0;c[k>>2]=j;c[k+4>>2]=((j|0)<0)<<31>>31;k=0;e=v;continue a}case 3:{b[c[E>>2]>>1]=j;k=0;e=v;continue a}case 4:{a[c[E>>2]>>0]=j;k=0;e=v;continue a}case 6:{c[c[E>>2]>>2]=j;k=0;e=v;continue a}case 7:{k=c[E>>2]|0;c[k>>2]=j;c[k+4>>2]=((j|0)<0)<<31>>31;k=0;e=v;continue a}default:{k=0;e=v;continue a}}case 112:{n=120;m=m>>>0>8?m:8;e=u|8;w=61;break}case 88:case 120:{e=u;w=61;break}case 111:{n=E;e=c[n>>2]|0;n=c[n+4>>2]|0;r=rz(e,n,y)|0;s=z-r|0;o=0;q=6833;m=(u&8|0)==0|(m|0)>(s|0)?m:s+1|0;s=u;w=67;break}case 105:case 100:{n=E;e=c[n>>2]|0;n=c[n+4>>2]|0;if((n|0)<0){e=gA(0,0,e|0,n|0)|0;n=A;o=E;c[o>>2]=e;c[o+4>>2]=n;o=1;q=6833;w=66;break e}else{o=(u&2049|0)!=0&1;q=(u&2048|0)==0?((u&1|0)==0?6833:6835):6834;w=66;break e}}case 117:{n=E;o=0;q=6833;e=c[n>>2]|0;n=c[n+4>>2]|0;w=66;break}case 99:{a[B>>0]=c[E>>2];e=B;o=0;q=6833;r=y;n=1;m=s;break}case 109:{n=tz(c[(cz()|0)>>2]|0)|0;w=71;break}case 115:{n=c[E>>2]|0;n=n|0?n:6843;w=71;break}case 67:{c[F>>2]=c[E>>2];c[C>>2]=0;c[E>>2]=F;r=-1;n=F;w=75;break}case 83:{e=c[E>>2]|0;if(!m){vz(d,32,k,0,u);e=0;w=84}else{r=m;n=e;w=75}break}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{k=xz(d,+h[E>>3],k,m,u,n)|0;e=v;continue a}default:{o=0;q=6833;r=y;n=m;m=u}}while(0);f:do if((w|0)==61){u=E;t=c[u>>2]|0;u=c[u+4>>2]|0;r=qz(t,u,y,n&32)|0;q=(e&8|0)==0|(t|0)==0&(u|0)==0;o=q?0:2;q=q?6833:6833+(n>>4)|0;s=e;e=t;n=u;w=67}else if((w|0)==66){r=sz(e,n,y)|0;s=u;w=67}else if((w|0)==71){w=0;u=uz(n,0,m)|0;t=(u|0)==0;e=n;o=0;q=6833;r=t?n+m|0:u;n=t?m:u-n|0;m=s}else if((w|0)==75){w=0;q=n;e=0;m=0;while(1){o=c[q>>2]|0;if(!o)break;m=wz(G,o)|0;if((m|0)<0|m>>>0>(r-e|0)>>>0)break;e=m+e|0;if(r>>>0>e>>>0)q=q+4|0;else break}if((m|0)<0){j=-1;break a}vz(d,32,k,e,u);if(!e){e=0;w=84}else{o=0;while(1){m=c[n>>2]|0;if(!m){w=84;break f}m=wz(G,m)|0;o=m+o|0;if((o|0)>(e|0)){w=84;break f}nz(d,G,m);if(o>>>0>=e>>>0){w=84;break}else n=n+4|0}}}while(0);if((w|0)==67){w=0;n=(e|0)!=0|(n|0)!=0;u=(m|0)!=0|n;n=((n^1)&1)+(z-r)|0;e=u?r:y;r=y;n=u?((m|0)>(n|0)?m:n):m;m=(m|0)>-1?s&-65537:s}else if((w|0)==84){w=0;vz(d,32,k,e,u^8192);k=(k|0)>(e|0)?k:e;e=v;continue}t=r-e|0;s=(n|0)<(t|0)?t:n;u=s+o|0;k=(k|0)<(u|0)?u:k;vz(d,32,k,u,m);nz(d,q,o);vz(d,48,k,u,m^65536);vz(d,48,s,t,0);nz(d,e,t);vz(d,32,k,u,m^8192);e=v}g:do if((w|0)==87)if(!d)if(!p)j=0;else{j=1;while(1){e=c[i+(j<<2)>>2]|0;if(!e)break;pz(g+(j<<3)|0,e,f);j=j+1|0;if((j|0)>=10){j=1;break g}}while(1){if(c[i+(j<<2)>>2]|0){j=-1;break g}j=j+1|0;if((j|0)>=10){j=1;break}}}while(0);l=H;return j|0}function lz(a){a=a|0;return 0}function mz(a){a=a|0;return}function nz(a,b,d){a=a|0;b=b|0;d=d|0;if(!(c[a>>2]&32))Jz(b,d,a)|0;return}function oz(b){b=b|0;var d=0,e=0,f=0;e=c[b>>2]|0;f=(a[e>>0]|0)+-48|0;if(f>>>0<10){d=0;do{d=f+(d*10|0)|0;e=e+1|0;c[b>>2]=e;f=(a[e>>0]|0)+-48|0}while(f>>>0<10)}else d=0;return d|0}
function pz(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;c[a>>2]=b;break a}case 10:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=((b|0)<0)<<31>>31;break a}case 11:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=0;break a}case 12:{e=(c[d>>2]|0)+(8-1)&~(8-1);b=e;f=c[b>>2]|0;b=c[b+4>>2]|0;c[d>>2]=e+8;e=a;c[e>>2]=f;c[e+4>>2]=b;break a}case 13:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&65535)<<16>>16;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 14:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&65535;c[f+4>>2]=0;break a}case 15:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&255)<<24>>24;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 16:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&255;c[f+4>>2]=0;break a}case 17:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}case 18:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}default:break a}while(0);while(0);return}function qz(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;if(!((b|0)==0&(c|0)==0))do{e=e+-1|0;a[e>>0]=d[6885+(b&15)>>0]|0|f;b=lA(b|0,c|0,4)|0;c=A}while(!((b|0)==0&(c|0)==0));return e|0}function rz(b,c,d){b=b|0;c=c|0;d=d|0;if(!((b|0)==0&(c|0)==0))do{d=d+-1|0;a[d>>0]=b&7|48;b=lA(b|0,c|0,3)|0;c=A}while(!((b|0)==0&(c|0)==0));return d|0}function sz(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if(c>>>0>0|(c|0)==0&b>>>0>4294967295){while(1){e=rA(b|0,c|0,10,0)|0;d=d+-1|0;a[d>>0]=e&255|48;e=b;b=pA(b|0,c|0,10,0)|0;if(!(c>>>0>9|(c|0)==9&e>>>0>4294967295))break;else c=A}c=b}else c=b;if(c)while(1){d=d+-1|0;a[d>>0]=(c>>>0)%10|0|48;if(c>>>0<10)break;else c=(c>>>0)/10|0}return d|0}function tz(a){a=a|0;return Ez(a,c[(Dz()|0)+188>>2]|0)|0}function uz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=d&255;f=(e|0)!=0;a:do if(f&(b&3|0)!=0){g=d&255;while(1){if((a[b>>0]|0)==g<<24>>24){i=6;break a}b=b+1|0;e=e+-1|0;f=(e|0)!=0;if(!(f&(b&3|0)!=0)){i=5;break}}}else i=5;while(0);if((i|0)==5)if(f)i=6;else e=0;b:do if((i|0)==6){g=d&255;if((a[b>>0]|0)!=g<<24>>24){f=P(h,16843009)|0;c:do if(e>>>0>3)while(1){h=c[b>>2]^f;if((h&-2139062144^-2139062144)&h+-16843009|0)break;b=b+4|0;e=e+-4|0;if(e>>>0<=3){i=11;break c}}else i=11;while(0);if((i|0)==11)if(!e){e=0;break}while(1){if((a[b>>0]|0)==g<<24>>24)break b;b=b+1|0;e=e+-1|0;if(!e){e=0;break}}}}while(0);return (e|0?b:0)|0}function vz(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+256|0;f=g;if((c|0)>(d|0)&(e&73728|0)==0){e=c-d|0;jA(f|0,b|0,(e>>>0<256?e:256)|0)|0;if(e>>>0>255){b=c-d|0;do{nz(a,f,256);e=e+-256|0}while(e>>>0>255);e=b&255}nz(a,f,e)}l=g;return}function wz(a,b){a=a|0;b=b|0;if(!a)a=0;else a=Bz(a,b,0)|0;return a|0}function xz(b,e,f,g,h,i){b=b|0;e=+e;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0.0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;H=l;l=l+560|0;m=H+8|0;u=H;G=H+524|0;F=G;n=H+512|0;c[u>>2]=0;E=n+12|0;yz(e)|0;if((A|0)<0){e=-e;C=1;B=6850}else{C=(h&2049|0)!=0&1;B=(h&2048|0)==0?((h&1|0)==0?6851:6856):6853}yz(e)|0;D=A&2146435072;do if(D>>>0<2146435072|(D|0)==2146435072&0<0){r=+zz(e,u)*2.0;j=r!=0.0;if(j)c[u>>2]=(c[u>>2]|0)+-1;w=i|32;if((w|0)==97){s=i&32;q=(s|0)==0?B:B+9|0;p=C|2;j=12-g|0;do if(!(g>>>0>11|(j|0)==0)){e=8.0;do{j=j+-1|0;e=e*16.0}while((j|0)!=0);if((a[q>>0]|0)==45){e=-(e+(-r-e));break}else{e=r+e-e;break}}else e=r;while(0);k=c[u>>2]|0;j=(k|0)<0?0-k|0:k;j=sz(j,((j|0)<0)<<31>>31,E)|0;if((j|0)==(E|0)){j=n+11|0;a[j>>0]=48}a[j+-1>>0]=(k>>31&2)+43;o=j+-2|0;a[o>>0]=i+15;n=(g|0)<1;m=(h&8|0)==0;j=G;do{D=~~e;k=j+1|0;a[j>>0]=d[6885+D>>0]|s;e=(e-+(D|0))*16.0;if((k-F|0)==1?!(m&(n&e==0.0)):0){a[k>>0]=46;j=j+2|0}else j=k}while(e!=0.0);D=j-F|0;F=E-o|0;E=(g|0)!=0&(D+-2|0)<(g|0)?g+2|0:D;j=F+p+E|0;vz(b,32,f,j,h);nz(b,q,p);vz(b,48,f,j,h^65536);nz(b,G,D);vz(b,48,E-D|0,0,0);nz(b,o,F);vz(b,32,f,j,h^8192);break}k=(g|0)<0?6:g;if(j){j=(c[u>>2]|0)+-28|0;c[u>>2]=j;e=r*268435456.0}else{e=r;j=c[u>>2]|0}D=(j|0)<0?m:m+288|0;m=D;do{y=~~e>>>0;c[m>>2]=y;m=m+4|0;e=(e-+(y>>>0))*1.0e9}while(e!=0.0);if((j|0)>0){n=D;p=m;while(1){o=(j|0)<29?j:29;j=p+-4|0;if(j>>>0>=n>>>0){m=0;do{x=kA(c[j>>2]|0,0,o|0)|0;x=hA(x|0,A|0,m|0,0)|0;y=A;v=rA(x|0,y|0,1e9,0)|0;c[j>>2]=v;m=pA(x|0,y|0,1e9,0)|0;j=j+-4|0}while(j>>>0>=n>>>0);if(m){n=n+-4|0;c[n>>2]=m}}m=p;while(1){if(m>>>0<=n>>>0)break;j=m+-4|0;if(!(c[j>>2]|0))m=j;else break}j=(c[u>>2]|0)-o|0;c[u>>2]=j;if((j|0)>0)p=m;else break}}else n=D;if((j|0)<0){g=((k+25|0)/9|0)+1|0;t=(w|0)==102;do{s=0-j|0;s=(s|0)<9?s:9;if(n>>>0<m>>>0){o=(1<<s)+-1|0;p=1e9>>>s;q=0;j=n;do{y=c[j>>2]|0;c[j>>2]=(y>>>s)+q;q=P(y&o,p)|0;j=j+4|0}while(j>>>0<m>>>0);j=(c[n>>2]|0)==0?n+4|0:n;if(!q){n=j;j=m}else{c[m>>2]=q;n=j;j=m+4|0}}else{n=(c[n>>2]|0)==0?n+4|0:n;j=m}m=t?D:n;m=(j-m>>2|0)>(g|0)?m+(g<<2)|0:j;j=(c[u>>2]|0)+s|0;c[u>>2]=j}while((j|0)<0);j=n;g=m}else{j=n;g=m}y=D;if(j>>>0<g>>>0){m=(y-j>>2)*9|0;o=c[j>>2]|0;if(o>>>0>=10){n=10;do{n=n*10|0;m=m+1|0}while(o>>>0>=n>>>0)}}else m=0;t=(w|0)==103;v=(k|0)!=0;n=k-((w|0)!=102?m:0)+((v&t)<<31>>31)|0;if((n|0)<(((g-y>>2)*9|0)+-9|0)){n=n+9216|0;s=D+4+(((n|0)/9|0)+-1024<<2)|0;n=((n|0)%9|0)+1|0;if((n|0)<9){o=10;do{o=o*10|0;n=n+1|0}while((n|0)!=9)}else o=10;p=c[s>>2]|0;q=(p>>>0)%(o>>>0)|0;n=(s+4|0)==(g|0);if(!(n&(q|0)==0)){r=(((p>>>0)/(o>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;x=(o|0)/2|0;e=q>>>0<x>>>0?.5:n&(q|0)==(x|0)?1.0:1.5;if(C){x=(a[B>>0]|0)==45;e=x?-e:e;r=x?-r:r}n=p-q|0;c[s>>2]=n;if(r+e!=r){x=n+o|0;c[s>>2]=x;if(x>>>0>999999999){m=s;while(1){n=m+-4|0;c[m>>2]=0;if(n>>>0<j>>>0){j=j+-4|0;c[j>>2]=0}x=(c[n>>2]|0)+1|0;c[n>>2]=x;if(x>>>0>999999999)m=n;else break}}else n=s;m=(y-j>>2)*9|0;p=c[j>>2]|0;if(p>>>0>=10){o=10;do{o=o*10|0;m=m+1|0}while(p>>>0>=o>>>0)}}else n=s}else n=s;n=n+4|0;n=g>>>0>n>>>0?n:g;x=j}else{n=g;x=j}w=n;while(1){if(w>>>0<=x>>>0){u=0;break}j=w+-4|0;if(!(c[j>>2]|0))w=j;else{u=1;break}}g=0-m|0;do if(t){j=((v^1)&1)+k|0;if((j|0)>(m|0)&(m|0)>-5){o=i+-1|0;k=j+-1-m|0}else{o=i+-2|0;k=j+-1|0}j=h&8;if(!j){if(u?(z=c[w+-4>>2]|0,(z|0)!=0):0)if(!((z>>>0)%10|0)){n=0;j=10;do{j=j*10|0;n=n+1|0}while(!((z>>>0)%(j>>>0)|0|0))}else n=0;else n=9;j=((w-y>>2)*9|0)+-9|0;if((o|32|0)==102){s=j-n|0;s=(s|0)>0?s:0;k=(k|0)<(s|0)?k:s;s=0;break}else{s=j+m-n|0;s=(s|0)>0?s:0;k=(k|0)<(s|0)?k:s;s=0;break}}else s=j}else{o=i;s=h&8}while(0);t=k|s;p=(t|0)!=0&1;q=(o|32|0)==102;if(q){v=0;j=(m|0)>0?m:0}else{j=(m|0)<0?g:m;j=sz(j,((j|0)<0)<<31>>31,E)|0;n=E;if((n-j|0)<2)do{j=j+-1|0;a[j>>0]=48}while((n-j|0)<2);a[j+-1>>0]=(m>>31&2)+43;j=j+-2|0;a[j>>0]=o;v=j;j=n-j|0}j=C+1+k+p+j|0;vz(b,32,f,j,h);nz(b,B,C);vz(b,48,f,j,h^65536);if(q){o=x>>>0>D>>>0?D:x;s=G+9|0;p=s;q=G+8|0;n=o;do{m=sz(c[n>>2]|0,0,s)|0;if((n|0)==(o|0)){if((m|0)==(s|0)){a[q>>0]=48;m=q}}else if(m>>>0>G>>>0){jA(G|0,48,m-F|0)|0;do m=m+-1|0;while(m>>>0>G>>>0)}nz(b,m,p-m|0);n=n+4|0}while(n>>>0<=D>>>0);if(t|0)nz(b,6901,1);if(n>>>0<w>>>0&(k|0)>0)while(1){m=sz(c[n>>2]|0,0,s)|0;if(m>>>0>G>>>0){jA(G|0,48,m-F|0)|0;do m=m+-1|0;while(m>>>0>G>>>0)}nz(b,m,(k|0)<9?k:9);n=n+4|0;m=k+-9|0;if(!(n>>>0<w>>>0&(k|0)>9)){k=m;break}else k=m}vz(b,48,k+9|0,9,0)}else{t=u?w:x+4|0;if((k|0)>-1){u=G+9|0;s=(s|0)==0;g=u;p=0-F|0;q=G+8|0;o=x;do{m=sz(c[o>>2]|0,0,u)|0;if((m|0)==(u|0)){a[q>>0]=48;m=q}do if((o|0)==(x|0)){n=m+1|0;nz(b,m,1);if(s&(k|0)<1){m=n;break}nz(b,6901,1);m=n}else{if(m>>>0<=G>>>0)break;jA(G|0,48,m+p|0)|0;do m=m+-1|0;while(m>>>0>G>>>0)}while(0);F=g-m|0;nz(b,m,(k|0)>(F|0)?F:k);k=k-F|0;o=o+4|0}while(o>>>0<t>>>0&(k|0)>-1)}vz(b,48,k+18|0,18,0);nz(b,v,E-v|0)}vz(b,32,f,j,h^8192)}else{G=(i&32|0)!=0;j=C+3|0;vz(b,32,f,j,h&-65537);nz(b,B,C);nz(b,e!=e|0.0!=0.0?(G?6877:6881):G?6869:6873,3);vz(b,32,f,j,h^8192)}while(0);l=H;return ((j|0)<(f|0)?f:j)|0}function yz(a){a=+a;var b=0;h[j>>3]=a;b=c[j>>2]|0;A=c[j+4>>2]|0;return b|0}function zz(a,b){a=+a;b=b|0;return +(+Az(a,b))}function Az(a,b){a=+a;b=b|0;var d=0,e=0,f=0;h[j>>3]=a;d=c[j>>2]|0;e=c[j+4>>2]|0;f=lA(d|0,e|0,52)|0;switch(f&2047){case 0:{if(a!=0.0){a=+Az(a*18446744073709551616.0,b);d=(c[b>>2]|0)+-64|0}else d=0;c[b>>2]=d;break}case 2047:break;default:{c[b>>2]=(f&2047)+-1022;c[j>>2]=d;c[j+4>>2]=e&-2146435073|1071644672;a=+h[j>>3]}}return +a}function Bz(b,d,e){b=b|0;d=d|0;e=e|0;do if(b){if(d>>>0<128){a[b>>0]=d;b=1;break}if(!(c[c[(Cz()|0)+188>>2]>>2]|0))if((d&-128|0)==57216){a[b>>0]=d;b=1;break}else{c[(cz()|0)>>2]=84;b=-1;break}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;b=2;break}if(d>>>0<55296|(d&-8192|0)==57344){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;b=3;break}if((d+-65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;b=4;break}else{c[(cz()|0)>>2]=84;b=-1;break}}else b=1;while(0);return b|0}function Cz(){return ez()|0}function Dz(){return ez()|0}function Ez(b,e){b=b|0;e=e|0;var f=0,g=0;g=0;while(1){if((d[6903+g>>0]|0)==(b|0)){b=2;break}f=g+1|0;if((f|0)==87){f=6991;g=87;b=5;break}else g=f}if((b|0)==2)if(!g)f=6991;else{f=6991;b=5}if((b|0)==5)while(1){do{b=f;f=f+1|0}while((a[b>>0]|0)!=0);g=g+-1|0;if(!g)break;else b=5}return Fz(f,c[e+20>>2]|0)|0}function Fz(a,b){a=a|0;b=b|0;return Gz(a,b)|0}function Gz(a,b){a=a|0;b=b|0;if(!b)b=0;else b=Hz(c[b>>2]|0,c[b+4>>2]|0,a)|0;return (b|0?b:a)|0}function Hz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=(c[b>>2]|0)+1794895138|0;h=Iz(c[b+8>>2]|0,o)|0;f=Iz(c[b+12>>2]|0,o)|0;g=Iz(c[b+16>>2]|0,o)|0;a:do if((h>>>0<d>>>2>>>0?(n=d-(h<<2)|0,f>>>0<n>>>0&g>>>0<n>>>0):0)?((g|f)&3|0)==0:0){n=f>>>2;m=g>>>2;l=0;while(1){j=h>>>1;k=l+j|0;i=k<<1;g=i+n|0;f=Iz(c[b+(g<<2)>>2]|0,o)|0;g=Iz(c[b+(g+1<<2)>>2]|0,o)|0;if(!(g>>>0<d>>>0&f>>>0<(d-g|0)>>>0)){f=0;break a}if(a[b+(g+f)>>0]|0){f=0;break a}f=hz(e,b+g|0)|0;if(!f)break;f=(f|0)<0;if((h|0)==1){f=0;break a}else{l=f?l:k;h=f?j:h-j|0}}f=i+m|0;g=Iz(c[b+(f<<2)>>2]|0,o)|0;f=Iz(c[b+(f+1<<2)>>2]|0,o)|0;if(f>>>0<d>>>0&g>>>0<(d-f|0)>>>0)f=(a[b+(f+g)>>0]|0)==0?b+f|0:0;else f=0}else f=0;while(0);return f|0}function Iz(a,b){a=a|0;b=b|0;var c=0;c=sA(a|0)|0;return ((b|0)==0?a:c)|0}function Jz(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=e+16|0;g=c[f>>2]|0;if(!g)if(!(Kz(e)|0)){g=c[f>>2]|0;h=5}else f=0;else h=5;a:do if((h|0)==5){j=e+20|0;i=c[j>>2]|0;f=i;if((g-i|0)>>>0<d>>>0){f=ob[c[e+36>>2]&7](e,b,d)|0;break}b:do if((a[e+75>>0]|0)>-1){i=d;while(1){if(!i){h=0;g=b;break b}g=i+-1|0;if((a[b+g>>0]|0)==10)break;else i=g}f=ob[c[e+36>>2]&7](e,b,i)|0;if(f>>>0<i>>>0)break a;h=i;g=b+i|0;d=d-i|0;f=c[j>>2]|0}else{h=0;g=b}while(0);mA(f|0,g|0,d|0)|0;c[j>>2]=(c[j>>2]|0)+d;f=h+d|0}while(0);return f|0}function Kz(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;e=c[b+44>>2]|0;c[b+28>>2]=e;c[b+20>>2]=e;c[b+16>>2]=e+(c[b+48>>2]|0);b=0}else{c[b>>2]=d|32;b=-1}return b|0}function Lz(b){b=b|0;var d=0,e=0,f=0;f=b;a:do if(!(f&3))e=4;else{d=f;while(1){if(!(a[b>>0]|0)){b=d;break a}b=b+1|0;d=b;if(!(d&3)){e=4;break}}}while(0);if((e|0)==4){while(1){d=c[b>>2]|0;if(!((d&-2139062144^-2139062144)&d+-16843009))b=b+4|0;else break}if((d&255)<<24>>24)do b=b+1|0;while((a[b>>0]|0)!=0)}return b-f|0}function Mz(a,b){a=T(a);b=T(b);var c=0,d=0;c=Nz(a)|0;do if((c&2147483647)>>>0<=2139095040){d=Nz(b)|0;if((d&2147483647)>>>0<=2139095040)if((d^c|0)<0){a=(c|0)<0?b:a;break}else{a=a<b?b:a;break}}else a=b;while(0);return T(a)}function Nz(a){a=T(a);return (g[j>>2]=a,c[j>>2]|0)|0}function Oz(a,b){a=T(a);b=T(b);var c=0,d=0;c=Pz(a)|0;do if((c&2147483647)>>>0<=2139095040){d=Pz(b)|0;if((d&2147483647)>>>0<=2139095040)if((d^c|0)<0){a=(c|0)<0?a:b;break}else{a=a<b?a:b;break}}else a=b;while(0);return T(a)}function Pz(a){a=T(a);return (g[j>>2]=a,c[j>>2]|0)|0}function Qz(a,b){a=a|0;b=b|0;var c=0;c=Lz(a)|0;return ((Rz(a,1,c,b)|0)!=(c|0))<<31>>31|0}function Rz(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=P(d,b)|0;d=(b|0)==0?0:d;if((c[e+76>>2]|0)>-1){g=(lz(e)|0)==0;a=Jz(a,f,e)|0;if(!g)mz(e)}else a=Jz(a,f,e)|0;if((a|0)!=(f|0))d=(a>>>0)/(b>>>0)|0;return d|0}function Sz(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,m=0;m=l;l=l+16|0;j=m;k=e&255;a[j>>0]=k;g=b+16|0;h=c[g>>2]|0;if(!h)if(!(Kz(b)|0)){h=c[g>>2]|0;i=4}else f=-1;else i=4;do if((i|0)==4){i=b+20|0;g=c[i>>2]|0;if(g>>>0<h>>>0?(f=e&255,(f|0)!=(a[b+75>>0]|0)):0){c[i>>2]=g+1;a[g>>0]=k;break}if((ob[c[b+36>>2]&7](b,j,1)|0)==1)f=d[j>>0]|0;else f=-1}while(0);l=m;return f|0}function Tz(a,b){a=a|0;b=b|0;var d=0,e=0;d=l;l=l+16|0;e=d;c[e>>2]=b;b=jz(c[582]|0,a,e)|0;l=d;return b|0}function Uz(b){b=b|0;var d=0,e=0,f=0,g=0;f=c[582]|0;if((c[f+76>>2]|0)>-1)g=lz(f)|0;else g=0;do if((Qz(b,f)|0)<0)b=1;else{if((a[f+75>>0]|0)!=10?(d=f+20|0,e=c[d>>2]|0,e>>>0<(c[f+16>>2]|0)>>>0):0){c[d>>2]=e+1;a[e>>0]=10;b=0;break}b=(Sz(f,10)|0)<0}while(0);if(g|0)mz(f);return b<<31>>31|0}function Vz(a,b){a=a|0;b=b|0;return jz(c[582]|0,a,b)|0}function Wz(a){a=a|0;Qa()}function Xz(a){a=a|0;return}function Yz(a,b){a=a|0;b=b|0;return 0}function Zz(a){a=a|0;if((_z(a+4|0)|0)==-1){jb[c[(c[a>>2]|0)+8>>2]&127](a);a=1}else a=0;return a|0}function _z(a){a=a|0;var b=0;b=c[a>>2]|0;c[a>>2]=b+-1;return b+-1|0}function $z(a){a=a|0;if(Zz(a)|0)aA(a);return}function aA(a){a=a|0;var b=0;b=a+8|0;if(!((c[b>>2]|0)!=0?(_z(b)|0)!=-1:0))jb[c[(c[a>>2]|0)+16>>2]&127](a);return}function bA(a){a=a|0;var b=0;b=(a|0)==0?1:a;while(1){a=Uy(b)|0;if(a|0)break;a=eA()|0;if(!a){a=0;break}Ab[a&0]()}return a|0}function cA(a){a=a|0;return bA(a)|0}function dA(a){a=a|0;Vy(a);return}function eA(){var a=0;a=c[2912]|0;c[2912]=a+0;return a|0}function fA(){}function gA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (A=d,a-c>>>0|0)|0}function hA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (A=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0}function iA(a){a=+a;return a>=0.0?+B(a+.5):+O(a-.5)}function jA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=b+e|0;d=d&255;if((e|0)>=67){while(b&3){a[b>>0]=d;b=b+1|0}f=h&-4|0;g=f-64|0;i=d|d<<8|d<<16|d<<24;while((b|0)<=(g|0)){c[b>>2]=i;c[b+4>>2]=i;c[b+8>>2]=i;c[b+12>>2]=i;c[b+16>>2]=i;c[b+20>>2]=i;c[b+24>>2]=i;c[b+28>>2]=i;c[b+32>>2]=i;c[b+36>>2]=i;c[b+40>>2]=i;c[b+44>>2]=i;c[b+48>>2]=i;c[b+52>>2]=i;c[b+56>>2]=i;c[b+60>>2]=i;b=b+64|0}while((b|0)<(f|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0}return h-e|0}function kA(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){A=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}A=a<<c-32;return 0}function lA(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){A=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}A=0;return b>>>c-32|0}function mA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192)return La(b|0,d|0,e|0)|0;h=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return h|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}e=g&-4|0;f=e-64|0;while((b|0)<=(f|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0}while((b|0)<(e|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}}else{e=g-4|0;while((b|0)<(e|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}return h|0}function nA(b){b=b|0;var c=0;c=a[n+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[n+(b>>>24)>>0]|0)+24|0}function oA(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=a;j=b;k=j;h=d;n=e;i=n;if(!k){g=(f|0)!=0;if(!i){if(g){c[f>>2]=(l>>>0)%(h>>>0);c[f+4>>2]=0}n=0;f=(l>>>0)/(h>>>0)>>>0;return (A=n,f)|0}else{if(!g){n=0;f=0;return (A=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;f=0;return (A=n,f)|0}}g=(i|0)==0;do if(h){if(!g){g=(S(i|0)|0)-(S(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;b=g-31>>31;h=m;a=l>>>(m>>>0)&b|k<<i;b=k>>>(m>>>0)&b;g=0;i=l<<i;break}if(!f){n=0;f=0;return (A=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;n=0;f=0;return (A=n,f)|0}g=h-1|0;if(g&h|0){i=(S(h|0)|0)+33-(S(k|0)|0)|0;p=64-i|0;m=32-i|0;j=m>>31;o=i-32|0;b=o>>31;h=i;a=m-1>>31&k>>>(o>>>0)|(k<<m|l>>>(i>>>0))&b;b=b&k>>>(i>>>0);g=l<<p&j;i=(k<<p|l>>>(o>>>0))&j|l<<m&i-33>>31;break}if(f|0){c[f>>2]=g&l;c[f+4>>2]=0}if((h|0)==1){o=j|b&0;p=a|0|0;return (A=o,p)|0}else{p=nA(h|0)|0;o=k>>>(p>>>0)|0;p=k<<32-p|l>>>(p>>>0)|0;return (A=o,p)|0}}else{if(g){if(f|0){c[f>>2]=(k>>>0)%(h>>>0);c[f+4>>2]=0}o=0;p=(k>>>0)/(h>>>0)>>>0;return (A=o,p)|0}if(!l){if(f|0){c[f>>2]=0;c[f+4>>2]=(k>>>0)%(i>>>0)}o=0;p=(k>>>0)/(i>>>0)>>>0;return (A=o,p)|0}g=i-1|0;if(!(g&i)){if(f|0){c[f>>2]=a|0;c[f+4>>2]=g&k|b&0}o=0;p=k>>>((nA(i|0)|0)>>>0);return (A=o,p)|0}g=(S(i|0)|0)-(S(k|0)|0)|0;if(g>>>0<=30){b=g+1|0;i=31-g|0;h=b;a=k<<i|l>>>(b>>>0);b=k>>>(b>>>0);g=0;i=l<<i;break}if(!f){o=0;p=0;return (A=o,p)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;o=0;p=0;return (A=o,p)|0}while(0);if(!h){k=i;j=0;i=0}else{m=d|0|0;l=n|e&0;k=hA(m|0,l|0,-1,-1)|0;d=A;j=i;i=0;do{e=j;j=g>>>31|j<<1;g=i|g<<1;e=a<<1|e>>>31|0;n=a>>>31|b<<1|0;gA(k|0,d|0,e|0,n|0)|0;p=A;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;a=gA(e|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=A;h=h-1|0}while((h|0)!=0);k=j;j=0}h=0;if(f|0){c[f>>2]=a;c[f+4>>2]=b}o=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;p=(g<<1|0>>>31)&-2|i;return (A=o,p)|0}function pA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return oA(a,b,c,d,0)|0}function qA(a){a=a|0;var b=0,d=0;d=a+15&-16|0;b=c[i>>2]|0;a=b+d|0;if((d|0)>0&(a|0)<(b|0)|(a|0)<0){Y()|0;Na(12);return -1}c[i>>2]=a;if((a|0)>(X()|0)?(W()|0)==0:0){c[i>>2]=b;Na(12);return -1}return b|0}function rA(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=l;l=l+16|0;f=g|0;oA(a,b,d,e,f)|0;l=g;return (A=c[f+4>>2]|0,c[f>>2]|0)|0}function sA(a){a=a|0;return (a&255)<<24|(a>>8&255)<<16|(a>>16&255)<<8|a>>>24|0}function tA(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;gb[a&1](b|0,c|0,d|0,e|0,f|0)}function uA(a,b,c){a=a|0;b=b|0;c=+c;hb[a&31](b|0,+c)}function vA(a,b,c,d){a=a|0;b=b|0;c=T(c);d=T(d);return T(ib[a&0](b|0,T(c),T(d)))}function wA(a,b){a=a|0;b=b|0;jb[a&127](b|0)}function xA(a,b,c){a=a|0;b=b|0;c=c|0;kb[a&31](b|0,c|0)}function yA(a,b){a=a|0;b=b|0;return lb[a&31](b|0)|0}function zA(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=e|0;mb[a&1](b|0,+c,+d,e|0)}function AA(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;nb[a&1](b|0,+c,+d)}function BA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ob[a&7](b|0,c|0,d|0)|0}function CA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return +pb[a&1](b|0,c|0,d|0)}function DA(a,b){a=a|0;b=b|0;return +qb[a&15](b|0)}function EA(a,b,c){a=a|0;b=b|0;c=+c;return rb[a&1](b|0,+c)|0}function FA(a,b,c){a=a|0;b=b|0;c=c|0;return sb[a&15](b|0,c|0)|0}function GA(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=f|0;tb[a&1](b|0,c|0,+d,+e,f|0)}function HA(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ub[a&1](b|0,c|0,d|0,e|0,f|0,g|0)}function IA(a,b,c){a=a|0;b=b|0;c=c|0;return +vb[a&7](b|0,c|0)}function JA(a){a=a|0;return wb[a&7]()|0}function KA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;xb[a&1](b|0,c|0,d|0,+e)}function LA(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=T(d);e=e|0;f=T(f);g=g|0;yb[a&1](b|0,c|0,T(d),e|0,T(f),g|0)}function MA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;zb[a&15](b|0,c|0,d|0)}function NA(a){a=a|0;Ab[a&0]()}function OA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;Bb[a&15](b|0,c|0,+d)}function PA(a,b,c){a=a|0;b=+b;c=+c;return Cb[a&1](+b,+c)|0}function QA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Db[a&15](b|0,c|0,d|0,e|0)}function RA(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;U(0)}function SA(a,b){a=a|0;b=+b;U(1)}function TA(a,b,c){a=a|0;b=T(b);c=T(c);U(2);return fb}function UA(a){a=a|0;U(3)}function VA(a,b){a=a|0;b=b|0;U(4)}function WA(a){a=a|0;U(5);return 0}function XA(a,b,c,d){a=a|0;b=+b;c=+c;d=d|0;U(6)}function YA(a,b,c){a=a|0;b=+b;c=+c;U(7)}function ZA(a,b,c){a=a|0;b=b|0;c=c|0;U(8);return 0}function _A(a,b,c){a=a|0;b=b|0;c=c|0;U(9);return 0.0}function $A(a){a=a|0;U(10);return 0.0}function aB(a,b){a=a|0;b=+b;U(11);return 0}function bB(a,b){a=a|0;b=b|0;U(12);return 0}function cB(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=e|0;U(13)}function dB(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;U(14)}function eB(a,b){a=a|0;b=b|0;U(15);return 0.0}function fB(){U(16);return 0}function gB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;U(17)}function hB(a,b,c,d,e,f){a=a|0;b=b|0;c=T(c);d=d|0;e=T(e);f=f|0;U(18)}function iB(a,b,c){a=a|0;b=b|0;c=c|0;U(19)}function jB(){U(20)}function kB(a,b,c){a=a|0;b=b|0;c=+c;U(21)}function lB(a,b){a=+a;b=+b;U(22);return 0}function mB(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;U(23)}

// EMSCRIPTEN_END_FUNCS
var gb=[RA,yu];var hb=[SA,ef,ff,gf,hf,jf,kf,lf,nf,of,qf,rf,sf,tf,uf,vf,wf,xf,yf,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA,SA];var ib=[TA];var jb=[UA,Vy,Xz,di,ei,fi,Lm,Mm,Nm,Ir,Jr,Kr,gu,hu,iu,hy,iy,jy,Le,Qe,mf,pf,Ag,Bg,Mh,ni,Fi,cj,wj,Uj,pk,Ik,al,wl,Pl,gm,zm,fn,zn,Sn,ko,Do,Wo,qp,Ip,Zp,vq,Hq,Kq,cr,fr,xr,Nr,Qr,is,zs,Rs,ot,oi,Fv,ow,Gw,Yw,vx,Nx,Zx,ay,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA,UA];var kb=[VA,Og,Re,Se,Ve,We,Xe,Ye,Ze,_e,bf,cf,df,Pf,Sf,Tf,Uf,Vf,Wf,Xf,ag,eg,Kg,up,Lp,Iv,wt,bw,VA,VA,VA,VA];var lb=[WA,Uy,_y,Pg,Cf,Gf,Hf,If,Jf,Kf,Lf,Nf,Of,bg,cg,Cg,aq,ls,Nv,Pv,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA,WA];var mb=[XA,Dg];var nb=[YA,Ar];var ob=[ZA,Ub,$y,az,gz,Yj,kn,ax];var pb=[_A,Tl];var qb=[$A,Qf,Rf,Yf,Eg,Fg,Gg,Hg,Ig,Jg,$A,$A,$A,$A,$A,$A];var rb=[aB,Dq];var sb=[bB,Wy,Yz,dg,Sh,gj,tk,Mk,Dm,Dn,Ds,Kw,bB,bB,bB,bB];var tb=[cB,Ji];var ub=[dB,zx];var vb=[eB,Zf,Lg,Mg,Ng,km,eB,eB];var wb=[fB,Qg,Je,Pq,jr,Vr,ey,fB];var xb=[gB,oo];var yb=[hB,gg];var zb=[iB,Df,Mf,_f,$f,Aj,el,Ho,_o,Vs,$u,sw,Rx,iB,iB,iB];var Ab=[jB];var Bb=[kB,Te,Ue,$e,af,zf,Af,Bf,Wn,yq,kB,kB,kB,kB,kB,kB];var Cb=[lB,Fr];var Db=[mB,Al,iq,Vq,pr,as,tt,Uv,py,mB,mB,mB,mB,mB,mB,mB];return{_roundf:iA,stackSave:Fb,getTempRet0:Kb,_memset:jA,setThrew:Ib,_bitshift64Lshr:lA,_bitshift64Shl:kA,_llvm_cttz_i32:nA,_sbrk:qA,_memcpy:mA,stackAlloc:Eb,___uremdi3:rA,_nbind_init:Ey,_i64Subtract:gA,___udivmoddi4:oA,setTempRet0:Jb,_i64Add:hA,_emscripten_get_global_libc:Zy,__GLOBAL__sub_I_Binding_cc:wv,___udivdi3:pA,_llvm_bswap_i32:sA,__GLOBAL__sub_I_nbind_cc:Rg,_free:Vy,runPostSets:fA,establishStackSpace:Hb,stackRestore:Gb,_malloc:Uy,__GLOBAL__sub_I_common_cc:ft,stackAlloc:Eb,stackSave:Fb,stackRestore:Gb,establishStackSpace:Hb,setThrew:Ib,setTempRet0:Jb,getTempRet0:Kb,dynCall_viiiii:tA,dynCall_vid:uA,dynCall_fiff:vA,dynCall_vi:wA,dynCall_vii:xA,dynCall_ii:yA,dynCall_viddi:zA,dynCall_vidd:AA,dynCall_iiii:BA,dynCall_diii:CA,dynCall_di:DA,dynCall_iid:EA,dynCall_iii:FA,dynCall_viiddi:GA,dynCall_viiiiii:HA,dynCall_dii:IA,dynCall_i:JA,dynCall_viiid:KA,dynCall_viififi:LA,dynCall_viii:MA,dynCall_v:NA,dynCall_viid:OA,dynCall_idd:PA,dynCall_viiii:QA}})


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