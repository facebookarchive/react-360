/*!  */
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
/******/  // The module cache
/******/  var installedModules = {};
/******/
/******/  // The require function
/******/  function __webpack_require__(moduleId) {
/******/
/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;
/******/
/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      i: moduleId,
/******/      l: false,
/******/      exports: {}
/******/    };
/******/
/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/    // Flag the module as loaded
/******/    module.l = true;
/******/
/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }
/******/
/******/
/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;
/******/
/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;
/******/
/******/  // identity function for calling harmony imports with the correct context
/******/  __webpack_require__.i = function(value) { return value; };
/******/
/******/  // define getter function for harmony exports
/******/  __webpack_require__.d = function(exports, name, getter) {
/******/    if(!__webpack_require__.o(exports, name)) {
/******/      Object.defineProperty(exports, name, {
/******/        configurable: false,
/******/        enumerable: true,
/******/        get: getter
/******/      });
/******/    }
/******/  };
/******/
/******/  // getDefaultExport function for compatibility with non-harmony modules
/******/  __webpack_require__.n = function(module) {
/******/    var getter = module && module.__esModule ?
/******/      function getDefault() { return module['default']; } :
/******/      function getModuleExports() { return module; };
/******/    __webpack_require__.d(getter, 'a', getter);
/******/    return getter;
/******/  };
/******/
/******/  // Object.prototype.hasOwnProperty.call
/******/  __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";
/******/
/******/  // Load entry module and return exports
/******/  return __webpack_require__(__webpack_require__.s = 11);
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

/* WEBPACK VAR INJECTION */(function(process, __dirname, Buffer) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;((function(root,wrapper){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return wrapper}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(typeof module=="object"&&module.exports)module.exports=wrapper;else(root.nbind=root.nbind||{}).init=wrapper}))(this,(function(Module,cb){if(typeof Module=="function"){cb=Module;Module={}}Module.onRuntimeInitialized=(function(init,cb){return(function(){if(init)init.apply(this,arguments);try{Module.ccall("nbind_init")}catch(err){cb(err);return}cb(null,{bind:Module._nbind_value,reflect:Module.NBind.reflect,queryType:Module.NBind.queryType,toggleLightGC:Module.toggleLightGC,lib:Module})})})(Module.onRuntimeInitialized,cb);var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=typeof window==="object";var ENVIRONMENT_IS_WORKER=typeof importScripts==="function";var ENVIRONMENT_IS_NODE=typeof process==="object"&&"function"==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;var ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=function print(x){process["stdout"].write(x+"\n")};if(!Module["printErr"])Module["printErr"]=function printErr(x){process["stderr"].write(x+"\n")};var nodeFS=__webpack_require__(7);var nodePath=__webpack_require__(8);Module["read"]=function read(filename,binary){filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);if(!ret&&filename!=nodePath["resolve"](filename)){filename=path.join(__dirname,"..","src",filename);ret=nodeFS["readFileSync"](filename)}if(ret&&!binary)ret=ret.toString();return ret};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(true){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function read(){throw"no read() available (jsc?)"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.log(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}var Runtime={setTempRet0:(function(value){tempRet0=value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){if(!args.splice)args=Array.prototype.slice.call(args);args.splice(0,0,ptr);return Module["dynCall_"+sig].apply(null,args)}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,arguments)}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=DYNAMICTOP;DYNAMICTOP=DYNAMICTOP+size|0;DYNAMICTOP=DYNAMICTOP+15&-16;if(DYNAMICTOP>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){DYNAMICTOP=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var __THREW__=0;var ABORT=false;var EXITSTATUS=0;var undef=0;var tempValue,tempInt,tempBigInt,tempInt2,tempBigInt2,tempPair,tempBigIntI,tempBigIntR,tempBigIntS,tempBigIntP,tempBigIntD,tempDouble,tempFloat;var tempI64,tempI64b;var tempRet0,tempRet1,tempRet2,tempRet3,tempRet4,tempRet5,tempRet6,tempRet7,tempRet8,tempRet9;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var globalScope=this;function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=Runtime.stackAlloc((str.length<<2)+1);writeStringToMemory(str,ret)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};var sourceRegex=/^function\s*[A-Za-z0-9]*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"="+convertCode.returnValue+";"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[_malloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(typeof _sbrk!=="undefined"&&!_sbrk.called||!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;function UTF8ArrayToString(u8Array,idx){var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;function UTF16ToString(ptr){var i=0;var str="";while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)return str;++i;str+=String.fromCharCode(codeUnit)}}Module["UTF16ToString"]=UTF16ToString;function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}Module["stringToUTF16"]=stringToUTF16;function lengthBytesUTF16(str){return str.length*2}Module["lengthBytesUTF16"]=lengthBytesUTF16;function UTF32ToString(ptr){var i=0;var str="";while(1){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)return str;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}}Module["UTF32ToString"]=UTF32ToString;function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}Module["stringToUTF32"]=stringToUTF32;function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}Module["lengthBytesUTF32"]=lengthBytesUTF32;function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var buf=_malloc(func.length);writeStringToMemory(func.substr(1),buf);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}}var i=3;var basicTypes={"v":"void","b":"bool","c":"char","s":"short","i":"int","l":"long","f":"float","d":"double","w":"wchar_t","a":"signed char","h":"unsigned char","t":"unsigned short","j":"unsigned int","m":"unsigned long","x":"long long","y":"unsigned long long","z":"..."};var subs=[];var first=true;function dump(x){if(x)Module.print(x);Module.print(func);var pre="";for(var a=0;a<i;a++)pre+=" ";Module.print(pre+"^")}function parseNested(){i++;if(func[i]==="K")i++;var parts=[];while(func[i]!=="E"){if(func[i]==="S"){i++;var next=func.indexOf("_",i);var num=func.substring(i,next)||0;parts.push(subs[num]||"?");i=next+1;continue}if(func[i]==="C"){parts.push(parts[parts.length-1]);i+=2;continue}var size=parseInt(func.substr(i));var pre=size.toString().length;if(!size||!pre){i--;break}var curr=func.substr(i+pre,size);parts.push(curr);subs.push(curr);i+=pre+size}i++;return parts}function parse(rawList,limit,allowVoid){limit=limit||Infinity;var ret="",list=[];function flushList(){return"("+list.join(", ")+")"}var name;if(func[i]==="N"){name=parseNested().join("::");limit--;if(limit===0)return rawList?[name]:name}else{if(func[i]==="K"||first&&func[i]==="L")i++;var size=parseInt(func.substr(i));if(size){var pre=size.toString().length;name=func.substr(i+pre,size);i+=pre+size}}first=false;if(func[i]==="I"){i++;var iList=parse(true);var iRet=parse(true,1,true);ret+=iRet[0]+" "+name+"<"+iList.join(", ")+">"}else{ret=name}paramLoop:while(i<func.length&&limit-->0){var c=func[i++];if(c in basicTypes){list.push(basicTypes[c])}else{switch(c){case"P":list.push(parse(true,1,true)[0]+"*");break;case"R":list.push(parse(true,1,true)[0]+"&");break;case"L":{i++;var end=func.indexOf("E",i);var size=end-i;list.push(func.substr(i,size));i+=size+2;break};case"A":{var size=parseInt(func.substr(i));i+=size.toString().length;if(func[i]!=="_")throw"?";i++;list.push(parse(true,1,true)[0]+" ["+size+"]");break};case"E":break paramLoop;default:ret+="?"+c;break paramLoop}}}if(!allowVoid&&list.length===1&&list[0]==="void")list=[];if(rawList){if(ret){list.push(ret+"?")}return list}else{return ret+flushList()}}var parsed=func;try{if(func=="Object._main"||func=="_main"){return"main()"}if(typeof func==="number")func=Pointer_stringify(func);if(func[0]!=="_")return func;if(func[1]!=="_")return func;if(func[2]!=="Z")return func;switch(func[3]){case"n":return"operator new()";case"d":return"operator delete()"}parsed=parse()}catch(e){parsed+="?"}if(parsed.indexOf("?")>=0&&!hasLibcxxabi){Runtime.warnOnce("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling")}return parsed}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){return demangleAll(jsStackTrace())}Module["stackTrace"]=stackTrace;var PAGE_SIZE=4096;function alignMemoryPage(x){if(x%4096>0){x+=4096-x%4096}return x}var HEAP;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;var STATIC_BASE=0,STATICTOP=0,staticSealed=false;var STACK_BASE=0,STACKTOP=0,STACK_MAX=0;var DYNAMIC_BASE=0,DYNAMICTOP=0;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||134217728;var totalMemory=64*1024;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2}else{totalMemory+=16*1024*1024}}if(totalMemory!==TOTAL_MEMORY){TOTAL_MEMORY=totalMemory}assert(typeof Int32Array!=="undefined"&&typeof Float64Array!=="undefined"&&!!(new Int32Array(1))["subarray"]&&!!(new Int32Array(1))["set"],"JS engine does not provide full typed array support");var buffer;buffer=new ArrayBuffer(TOTAL_MEMORY);HEAP8=new Int8Array(buffer);HEAP16=new Int16Array(buffer);HEAP32=new Int32Array(buffer);HEAPU8=new Uint8Array(buffer);HEAPU16=new Uint16Array(buffer);HEAPU32=new Uint32Array(buffer);HEAPF32=new Float32Array(buffer);HEAPF64=new Float64Array(buffer);HEAP32[0]=255;assert(HEAPU8[0]===255&&HEAPU8[3]===0,"Typed arrays 2 must be run on a little-endian system");Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func)}else{Runtime.dynCall("vi",func,[callback.arg])}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){var array=intArrayFromString(string,dontAddNull);var i=0;while(i<array.length){var chr=array[i];HEAP8[buffer+i>>0]=chr;i=i+1}}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){for(var i=0;i<array.length;i++){HEAP8[buffer++>>0]=array[i]}}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;function unSign(value,bits,ignore){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function reSign(value,bits,ignore){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["fround"]){var froundBuffer=new Float32Array(1);Math["fround"]=(function(x){froundBuffer[0]=x;return froundBuffer[0]})}Math.fround=Math["fround"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_min=Math.min;var Math_clz32=Math.clz32;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var memoryInitializer=null;var ASM_CONSTS=[(function($0,$1,$2,$3,$4,$5,$6,$7){{return _nbind.callbackSignatureList[$0].apply(this,arguments)}})];function _emscripten_asm_const_3(code,a0,a1,a2){return ASM_CONSTS[code](a0,a1,a2)}function _emscripten_asm_const_4(code,a0,a1,a2,a3){return ASM_CONSTS[code](a0,a1,a2,a3)}function _emscripten_asm_const_5(code,a0,a1,a2,a3,a4){return ASM_CONSTS[code](a0,a1,a2,a3,a4)}function _emscripten_asm_const_6(code,a0,a1,a2,a3,a4,a5){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5)}function _emscripten_asm_const_7(code,a0,a1,a2,a3,a4,a5,a6){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5,a6)}function _emscripten_asm_const_8(code,a0,a1,a2,a3,a4,a5,a6,a7){return ASM_CONSTS[code](a0,a1,a2,a3,a4,a5,a6,a7)}STATIC_BASE=8;STATICTOP=STATIC_BASE+12736;__ATINIT__.push({func:(function(){__GLOBAL__sub_I_nbind_cc()})},{func:(function(){__GLOBAL__sub_I_common_cc()})},{func:(function(){__GLOBAL__sub_I_Binding_cc()})});allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,17,0,0,23,35,0,0,224,1,0,0,0,0,0,0,4,17,0,0,36,35,0,0,4,17,0,0,49,35,0,0,44,17,0,0,62,35,0,0,232,1,0,0,0,0,0,0,44,17,0,0,95,35,0,0,240,1,0,0,0,0,0,0,44,17,0,0,129,35,0,0,0,2,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,192,127,0,0,192,127,3,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,3,0,0,0,0,0,192,127,3,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,192,127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,127,0,0,192,127,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,0,0,128,191,0,0,128,191,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,88,6,0,0,88,6,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,192,127,3,0,0,0,234,24,0,0,248,24,0,0,4,25,0,0,208,24,0,0,218,24,0,0,226,24,0,0,1,0,0,0,3,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,192,127,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,41,29,0,0,42,29,0,0,43,29,0,0,42,29,0,0,43,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,2,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,33,0,0,42,29,0,0,42,29,0,0,42,29,0,0,42,29,0,0,42,29,0,0,42,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,42,29,0,0,42,29,0,0,43,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,48,8,0,0,3,0,0,0,1,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,8,0,0,2,34,0,0,2,0,0,0,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,100,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,100,8,0,0,2,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,29,0,0,43,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6,0,0,0,7,0,0,0,2,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,33,0,0,43,29,0,0,42,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,34,0,0,43,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,42,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,43,29,0,0,42,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,43,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,252,10,0,0,3,0,0,0,4,11,0,0,1,0,0,0,3,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,12,0,0,43,29,0,0,42,29,0,0,2,0,0,0,4,34,0,0,4,12,0,0,5,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,12,0,0,2,0,0,0,253,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,12,0,0,42,29,0,0,42,29,0,0,2,0,0,0,41,29,0,0,0,0,0,0,0,0,0,0,2,0,0,0,9,0,0,0,10,0,0,0,2,0,0,0,11,0,0,0,160,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,0,0,43,29,0,0,255,33,0,0,43,29,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,13,0,0,113,34,0,0,27,34,0,0,255,33,0,0,40,34,0,0,0,34,0,0,45,34,0,0,50,34,0,0,51,34,0,0,48,8,0,0,63,34,0,0,92,13,0,0,76,34,0,0,95,34,0,0,96,34,0,0,105,34,0,0,106,34,0,0,0,0,0,0,3,0,0,0,100,13,0,0,1,0,0,0,1,34,0,0,126,34,0,0,127,34,0,0,128,34,0,0,129,34,0,0,130,34,0,0,2,34,0,0,43,29,0,0,131,34,0,0,132,34,0,0,133,34,0,0,134,34,0,0,135,34,0,0,42,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,142,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,12,0,0,0,13,0,0,0,2,0,0,0,14,0,0,0,95,34,0,0,126,34,0,0,143,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,95,34,0,0,126,34,0,0,143,34,0,0,88,14,0,0,7,0,0,0,143,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,95,34,0,0,126,34,0,0,143,34,0,0,2,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,95,34,0,0,126,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,143,34,0,0,88,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,143,34,0,0,192,14,0,0,2,0,0,0,200,14,0,0,1,0,0,0,128,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,143,34,0,0,126,34,0,0,126,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,143,34,0,0,192,14,0,0,2,34,0,0,88,14,0,0,16,15,0,0,7,0,0,0,192,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,33,0,0,2,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,108,15,0,0,2,34,0,0,2,0,0,0,143,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,2,34,0,0,2,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,34,0,0,2,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,95,34,0,0,143,34,0,0,48,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,48,8,0,0,48,8,0,0,48,8,0,0,48,8,0,0,48,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,33,0,0,192,14,0,0,48,8,0,0,148,16,0,0,2,0,0,0,22,35,0,0,0,0,0,0,0,0,0,0,2,0,0,0,15,0,0,0,16,0,0,0,2,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,1,0,0,18,0,0,0,19,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,20,0,0,0,21,0,0,0,22,0,0,0,23,0,0,0,2,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,16,2,0,0,20,0,0,0,24,0,0,0,22,0,0,0,23,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,132,17,0,0,244,17,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,4,0,0,0,171,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,4,0,0,0,163,43,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,108,105,115,116,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,105,116,101,109,115,0,67,111,117,108,100,32,110,111,116,32,101,120,116,101,110,100,32,97,108,108,111,99,97,116,105,111,110,32,102,111,114,32,105,116,101,109,115,0,0,0,0,37,115,0,67,111,117,108,100,32,110,111,116,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,32,102,111,114,32,110,111,100,101,0,67,97,110,110,111,116,32,114,101,115,101,116,32,97,32,110,111,100,101,32,119,104,105,99,104,32,115,116,105,108,108,32,104,97,115,32,99,104,105,108,100,114,101,110,32,97,116,116,97,99,104,101,100,0,67,97,110,110,111,116,32,114,101,115,101,116,32,97,32,110,111,100,101,32,115,116,105,108,108,32,97,116,116,97,99,104,101,100,32,116,111,32,97,32,112,97,114,101,110,116,0,67,97,110,110,111,116,32,115,101,116,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,58,32,78,111,100,101,115,32,119,105,116,104,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,99,104,105,108,100,114,101,110,46,0,67,104,105,108,100,32,97,108,114,101,97,100,121,32,104,97,115,32,97,32,112,97,114,101,110,116,44,32,105,116,32,109,117,115,116,32,98,101,32,114,101,109,111,118,101,100,32,102,105,114,115,116,46,0,67,97,110,110,111,116,32,97,100,100,32,99,104,105,108,100,58,32,78,111,100,101,115,32,119,105,116,104,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,99,104,105,108,100,114,101,110,46,0,79,110,108,121,32,108,101,97,102,32,110,111,100,101,115,32,119,105,116,104,32,99,117,115,116,111,109,32,109,101,97,115,117,114,101,32,102,117,110,99,116,105,111,110,115,115,104,111,117,108,100,32,109,97,110,117,97,108,108,121,32,109,97,114,107,32,116,104,101,109,115,101,108,118,101,115,32,97,115,32,100,105,114,116,121,0,67,97,110,110,111,116,32,103,101,116,32,108,97,121,111,117,116,32,112,114,111,112,101,114,116,105,101,115,32,111,102,32,109,117,108,116,105,45,101,100,103,101,32,115,104,111,114,116,104,97,110,100,115,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,37,115,37,100,46,123,91,115,107,105,112,112,101,100,93,32,0,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,97,119,58,32,37,102,32,97,104,58,32,37,102,32,61,62,32,100,58,32,40,37,102,44,32,37,102,41,32,37,115,10,0,42,0,37,115,37,100,46,123,37,115,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,97,119,58,32,37,102,32,97,104,58,32,37,102,32,37,115,10,0,37,115,37,100,46,125,37,115,0,119,109,58,32,37,115,44,32,104,109,58,32,37,115,44,32,100,58,32,40,37,102,44,32,37,102,41,32,37,115,10,0,79,117,116,32,111,102,32,99,97,99,104,101,32,101,110,116,114,105,101,115,33,0,105,110,105,116,105,97,108,0,0,0,0,97,118,97,105,108,97,98,108,101,87,105,100,116,104,32,105,115,32,105,110,100,101,102,105,110,105,116,101,32,115,111,32,119,105,100,116,104,77,101,97,115,117,114,101,77,111,100,101,32,109,117,115,116,32,98,101,32,89,71,77,101,97,115,117,114,101,77,111,100,101,85,110,100,101,102,105,110,101,100,0,97,118,97,105,108,97,98,108,101,72,101,105,103,104,116,32,105,115,32,105,110,100,101,102,105,110,105,116,101,32,115,111,32,104,101,105,103,104,116,77,101,97,115,117,114,101,77,111,100,101,32,109,117,115,116,32,98,101,32,89,71,77,101,97,115,117,114,101,77,111,100,101,85,110,100,101,102,105,110,101,100,0,109,101,97,115,117,114,101,0,102,108,101,120,0,115,116,114,101,116,99,104,0,97,98,115,45,109,101,97,115,117,114,101,0,97,98,115,45,108,97,121,111,117,116,0,69,120,112,101,99,116,32,99,117,115,116,111,109,32,98,97,115,101,108,105,110,101,32,102,117,110,99,116,105,111,110,32,116,111,32,110,111,116,32,114,101,116,117,114,110,32,78,97,78,0,67,97,110,110,111,116,32,103,101,116,32,99,111,109,112,117,116,101,100,32,118,97,108,117,101,32,111,102,32,109,117,108,116,105,45,101,100,103,101,32,115,104,111,114,116,104,97,110,100,115,0,85,78,68,69,70,73,78,69,68,0,69,88,65,67,84,76,89,0,65,84,95,77,79,83,84,0,76,65,89,95,85,78,68,69,70,73,78,69,68,0,76,65,89,95,69,88,65,67,84,76,89,0,76,65,89,95,65,84,95,77,79,83,84,0,32,32,0,123,0,108,97,121,111,117,116,58,32,123,0,119,105,100,116,104,58,32,37,103,44,32,0,104,101,105,103,104,116,58,32,37,103,44,32,0,116,111,112,58,32,37,103,44,32,0,108,101,102,116,58,32,37,103,0,125,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,99,111,108,117,109,110,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,99,111,108,117,109,110,45,114,101,118,101,114,115,101,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,114,111,119,39,44,32,0,102,108,101,120,68,105,114,101,99,116,105,111,110,58,32,39,114,111,119,45,114,101,118,101,114,115,101,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,99,101,110,116,101,114,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,115,112,97,99,101,45,97,114,111,117,110,100,39,44,32,0,106,117,115,116,105,102,121,67,111,110,116,101,110,116,58,32,39,115,112,97,99,101,45,98,101,116,119,101,101,110,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,73,116,101,109,115,58,32,39,115,116,114,101,116,99,104,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,67,111,110,116,101,110,116,58,32,39,115,116,114,101,116,99,104,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,102,108,101,120,45,115,116,97,114,116,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,99,101,110,116,101,114,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,102,108,101,120,45,101,110,100,39,44,32,0,97,108,105,103,110,83,101,108,102,58,32,39,115,116,114,101,116,99,104,39,44,32,0,37,115,58,32,37,103,44,32,0,102,108,101,120,71,114,111,119,0,102,108,101,120,83,104,114,105,110,107,0,102,108,101,120,66,97,115,105,115,0,111,118,101,114,102,108,111,119,58,32,39,104,105,100,100,101,110,39,44,32,0,111,118,101,114,102,108,111,119,58,32,39,118,105,115,105,98,108,101,39,44,32,0,111,118,101,114,102,108,111,119,58,32,39,115,99,114,111,108,108,39,44,32,0,109,97,114,103,105,110,0,109,97,114,103,105,110,76,101,102,116,0,109,97,114,103,105,110,82,105,103,104,116,0,109,97,114,103,105,110,84,111,112,0,109,97,114,103,105,110,66,111,116,116,111,109,0,109,97,114,103,105,110,83,116,97,114,116,0,109,97,114,103,105,110,69,110,100,0,112,97,100,100,105,110,103,0,112,97,100,100,105,110,103,76,101,102,116,0,112,97,100,100,105,110,103,82,105,103,104,116,0,112,97,100,100,105,110,103,84,111,112,0,112,97,100,100,105,110,103,66,111,116,116,111,109,0,112,97,100,100,105,110,103,83,116,97,114,116,0,112,97,100,100,105,110,103,69,110,100,0,98,111,114,100,101,114,87,105,100,116,104,0,98,111,114,100,101,114,76,101,102,116,87,105,100,116,104,0,98,111,114,100,101,114,82,105,103,104,116,87,105,100,116,104,0,98,111,114,100,101,114,84,111,112,87,105,100,116,104,0,98,111,114,100,101,114,66,111,116,116,111,109,87,105,100,116,104,0,98,111,114,100,101,114,83,116,97,114,116,87,105,100,116,104,0,98,111,114,100,101,114,69,110,100,87,105,100,116,104,0,119,105,100,116,104,0,104,101,105,103,104,116,0,109,97,120,87,105,100,116,104,0,109,97,120,72,101,105,103,104,116,0,109,105,110,87,105,100,116,104,0,109,105,110,72,101,105,103,104,116,0,112,111,115,105,116,105,111,110,58,32,39,97,98,115,111,108,117,116,101,39,44,32,0,108,101,102,116,0,114,105,103,104,116,0,116,111,112,0,98,111,116,116,111,109,0,99,104,105,108,100,114,101,110,58,32,91,10,0,93,125,44,10,0,125,44,10,0,112,116,0,37,0,37,115,58,32,37,103,37,115,44,32,0,0,0,0,115,101,116,69,120,112,101,114,105,109,101,110,116,97,108,70,101,97,116,117,114,101,69,110,97,98,108,101,100,0,105,115,69,120,112,101,114,105,109,101,110,116,97,108,70,101,97,116,117,114,101,69,110,97,98,108,101,100,0,103,101,116,73,110,115,116,97,110,99,101,67,111,117,110,116,0,78,111,100,101,0,99,114,101,97,116,101,0,100,101,115,116,114,111,121,0,114,101,115,101,116,0,99,111,112,121,83,116,121,108,101,0,115,101,116,80,111,115,105,116,105,111,110,84,121,112,101,0,115,101,116,80,111,115,105,116,105,111,110,0,115,101,116,80,111,115,105,116,105,111,110,80,101,114,99,101,110,116,0,115,101,116,65,108,105,103,110,67,111,110,116,101,110,116,0,115,101,116,65,108,105,103,110,73,116,101,109,115,0,115,101,116,65,108,105,103,110,83,101,108,102,0,115,101,116,70,108,101,120,68,105,114,101,99,116,105,111,110,0,115,101,116,70,108,101,120,87,114,97,112,0,115,101,116,74,117,115,116,105,102,121,67,111,110,116,101,110,116,0,115,101,116,77,97,114,103,105,110,0,115,101,116,77,97,114,103,105,110,80,101,114,99,101,110,116,0,115,101,116,77,97,114,103,105,110,65,117,116,111,0,115,101,116,79,118,101,114,102,108,111,119,0,115,101,116,68,105,115,112,108,97,121,0,115,101,116,70,108,101,120,0,115,101,116,70,108,101,120,66,97,115,105,115,0,115,101,116,70,108,101,120,66,97,115,105,115,80,101,114,99,101,110,116,0,115,101,116,70,108,101,120,71,114,111,119,0,115,101,116,70,108,101,120,83,104,114,105,110,107,0,115,101,116,87,105,100,116,104,0,115,101,116,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,87,105,100,116,104,65,117,116,111,0,115,101,116,72,101,105,103,104,116,0,115,101,116,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,72,101,105,103,104,116,65,117,116,111,0,115,101,116,77,105,110,87,105,100,116,104,0,115,101,116,77,105,110,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,77,105,110,72,101,105,103,104,116,0,115,101,116,77,105,110,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,77,97,120,87,105,100,116,104,0,115,101,116,77,97,120,87,105,100,116,104,80,101,114,99,101,110,116,0,115,101,116,77,97,120,72,101,105,103,104,116,0,115,101,116,77,97,120,72,101,105,103,104,116,80,101,114,99,101,110,116,0,115,101,116,65,115,112,101,99,116,82,97,116,105,111,0,115,101,116,66,111,114,100,101,114,0,115,101,116,80,97,100,100,105,110,103,0,115,101,116,80,97,100,100,105,110,103,80,101,114,99,101,110,116,0,103,101,116,80,111,115,105,116,105,111,110,84,121,112,101,0,103,101,116,80,111,115,105,116,105,111,110,0,103,101,116,65,108,105,103,110,67,111,110,116,101,110,116,0,103,101,116,65,108,105,103,110,73,116,101,109,115,0,103,101,116,65,108,105,103,110,83,101,108,102,0,103,101,116,70,108,101,120,68,105,114,101,99,116,105,111,110,0,103,101,116,70,108,101,120,87,114,97,112,0,103,101,116,74,117,115,116,105,102,121,67,111,110,116,101,110,116,0,103,101,116,77,97,114,103,105,110,0,103,101,116,70,108,101,120,66,97,115,105,115,0,103,101,116,70,108,101,120,71,114,111,119,0,103,101,116,70,108,101,120,83,104,114,105,110,107,0,103,101,116,87,105,100,116,104,0,103,101,116,72,101,105,103,104,116,0,103,101,116,77,105,110,87,105,100,116,104,0,103,101,116,77,105,110,72,101,105,103,104,116,0,103,101,116,77,97,120,87,105,100,116,104,0,103,101,116,77,97,120,72,101,105,103,104,116,0,103,101,116,65,115,112,101,99,116,82,97,116,105,111,0,103,101,116,66,111,114,100,101,114,0,103,101,116,79,118,101,114,102,108,111,119,0,103,101,116,68,105,115,112,108,97,121,0,103,101,116,80,97,100,100,105,110,103,0,105,110,115,101,114,116,67,104,105,108,100,0,114,101,109,111,118,101,67,104,105,108,100,0,103,101,116,67,104,105,108,100,67,111,117,110,116,0,103,101,116,80,97,114,101,110,116,0,103,101,116,67,104,105,108,100,0,115,101,116,77,101,97,115,117,114,101,70,117,110,99,0,117,110,115,101,116,77,101,97,115,117,114,101,70,117,110,99,0,109,97,114,107,68,105,114,116,121,0,105,115,68,105,114,116,121,0,99,97,108,99,117,108,97,116,101,76,97,121,111,117,116,0,103,101,116,67,111,109,112,117,116,101,100,76,101,102,116,0,103,101,116,67,111,109,112,117,116,101,100,82,105,103,104,116,0,103,101,116,67,111,109,112,117,116,101,100,84,111,112,0,103,101,116,67,111,109,112,117,116,101,100,66,111,116,116,111,109,0,103,101,116,67,111,109,112,117,116,101,100,87,105,100,116,104,0,103,101,116,67,111,109,112,117,116,101,100,72,101,105,103,104,116,0,103,101,116,67,111,109,112,117,116,101,100,76,97,121,111,117,116,0,103,101,116,67,111,109,112,117,116,101,100,77,97,114,103,105,110,0,103,101,116,67,111,109,112,117,116,101,100,66,111,114,100,101,114,0,103,101,116,67,111,109,112,117,116,101,100,80,97,100,100,105,110,103,0,0,0,0,0,0,0,0,0,86,97,108,117,101,0,76,97,121,111,117,116,0,83,105,122,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,118,111,105,100,0,98,111,111,108,0,0,115,116,100,58,58,115,116,114,105,110,103,0,99,98,70,117,110,99,116,105,111,110,32,38,0,99,111,110,115,116,32,99,98,70,117,110,99,116,105,111,110,32,38,0,0,69,120,116,101,114,110,97,108,0,0,66,117,102,102,101,114,0,1,1,1,2,2,4,4,4,4,8,8,4,8,0,0,0,0,0,0,0,0,0,0,73,110,116,54,52,0,0,0,95,110,98,105,110,100,95,110,101,119,0,123,114,101,116,117,114,110,40,95,110,98,105,110,100,46,99,97,108,108,98,97,99,107,83,105,103,110,97,116,117,114,101,76,105,115,116,91,36,48,93,46,97,112,112,108,121,40,116,104,105,115,44,97,114,103,117,109,101,110,116,115,41,41,59,125,0,78,66,105,110,100,73,68,0,78,66,105,110,100,0,98,105,110,100,95,118,97,108,117,101,0,114,101,102,108,101,99,116,0,113,117,101,114,121,84,121,112,101,0,108,97,108,108,111,99,0,108,114,101,115,101,116,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,83,116,57,101,120,99,101,112,116,105,111,110,0,83,116,57,116,121,112,101,95,105,110,102,111,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,33,34,118,101,99,116,111,114,32,108,101,110,103,116,104,95,101,114,114,111,114,34,0,47,85,115,101,114,115,47,101,109,105,108,115,106,47,68,111,99,117,109,101,110,116,115,47,101,109,115,100,107,95,112,111,114,116,97,98,108,101,47,101,109,115,99,114,105,112,116,101,110,47,49,46,51,53,46,48,47,115,121,115,116,101,109,47,105,110,99,108,117,100,101,47,108,105,98,99,120,120,47,118,101,99,116,111,114,0,95,95,116,104,114,111,119,95,108,101,110,103,116,104,95,101,114,114,111,114,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,46,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+12195);var tempDoublePtr=Runtime.alignMemory(allocate(12,"i8",ALLOC_STATIC),8);assert(tempDoublePtr%8==0);function copyTempFloat(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3]}function copyTempDouble(ptr){HEAP8[tempDoublePtr]=HEAP8[ptr];HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];HEAP8[tempDoublePtr+7]=HEAP8[ptr+7]}function _atexit(func,arg){__ATEXIT__.unshift({func:func,arg:arg})}function ___cxa_atexit(){return _atexit.apply(null,arguments)}Module["_i64Subtract"]=_i64Subtract;var _fabsf=Math_abs;var _floorf=Math_floor;function _pthread_cleanup_pop(){assert(_pthread_cleanup_push.level==__ATEXIT__.length,"cannot pop if something else added meanwhile!");__ATEXIT__.pop();_pthread_cleanup_push.level=__ATEXIT__.length}function _llvm_stackrestore(p){var self=_llvm_stacksave;var ret=self.LLVM_SAVEDSTACKS[p];self.LLVM_SAVEDSTACKS.splice(p,1);Runtime.stackRestore(ret)}function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv.uncaught_exception}var EXCEPTIONS={last:0,caught:[],infos:{},deAdjust:(function(adjusted){if(!adjusted||EXCEPTIONS.infos[adjusted])return adjusted;for(var ptr in EXCEPTIONS.infos){var info=EXCEPTIONS.infos[ptr];if(info.adjusted===adjusted){return ptr}}return adjusted}),addRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount++}),decRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];assert(info.refcount>0);info.refcount--;if(info.refcount===0){if(info.destructor){Runtime.dynCall("vi",info.destructor,[ptr])}delete EXCEPTIONS.infos[ptr];___cxa_free_exception(ptr)}}),clearRef:(function(ptr){if(!ptr)return;var info=EXCEPTIONS.infos[ptr];info.refcount=0})};function ___resumeException(ptr){if(!EXCEPTIONS.last){EXCEPTIONS.last=ptr}EXCEPTIONS.clearRef(EXCEPTIONS.deAdjust(ptr));throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}function ___cxa_find_matching_catch(){var thrown=EXCEPTIONS.last;if(!thrown){return(asm["setTempRet0"](0),0)|0}var info=EXCEPTIONS.infos[thrown];var throwntype=info.type;if(!throwntype){return(asm["setTempRet0"](0),thrown)|0}var typeArray=Array.prototype.slice.call(arguments);var pointer=Module["___cxa_is_pointer_type"](throwntype);if(!___cxa_find_matching_catch.buffer)___cxa_find_matching_catch.buffer=_malloc(4);HEAP32[___cxa_find_matching_catch.buffer>>2]=thrown;thrown=___cxa_find_matching_catch.buffer;for(var i=0;i<typeArray.length;i++){if(typeArray[i]&&Module["___cxa_can_catch"](typeArray[i],throwntype,thrown)){thrown=HEAP32[thrown>>2];info.adjusted=thrown;return(asm["setTempRet0"](typeArray[i]),thrown)|0}}thrown=HEAP32[thrown>>2];return(asm["setTempRet0"](throwntype),thrown)|0}function ___cxa_throw(ptr,type,destructor){EXCEPTIONS.infos[ptr]={ptr:ptr,adjusted:ptr,type:type,destructor:destructor,refcount:0};EXCEPTIONS.last=ptr;if(!("uncaught_exception"in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exception=1}else{__ZSt18uncaught_exceptionv.uncaught_exception++}throw ptr+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch."}Module["_memset"]=_memset;var _BDtoILow=true;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace()}function __decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r}function __extends(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p];function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)}function _defineHidden(value){return(function(target,key){Object.defineProperty(target,key,{configurable:false,enumerable:false,value:value,writable:true})})}var _nbind={};function __nbind_free_external(num){_nbind.externalList[num].dereference(num)}Module["_i64Add"]=_i64Add;function __nbind_reference_external(num){_nbind.externalList[num].reference()}function __nbind_register_primitive(id,size,flags){var spec={flags:1024|flags,id:id,ptrSize:size};_nbind.makeType(_nbind.constructType,spec)}var _emscripten_asm_const_int=true;function __nbind_register_pool(pageSize,usedPtr,rootPtr,pagePtr){_nbind.Pool.pageSize=pageSize;_nbind.Pool.usedPtr=usedPtr/4;_nbind.Pool.rootPtr=rootPtr;_nbind.Pool.pagePtr=pagePtr/4;HEAP32[usedPtr/4]=16909060;if(HEAP8[usedPtr]==1)_nbind.bigEndian=true;HEAP32[usedPtr/4]=0;_nbind.makeTypeKindTbl=(_a={},_a[1024]=_nbind.PrimitiveType,_a[64]=_nbind.Int64Type,_a[2048]=_nbind.BindClass,_a[3072]=_nbind.BindClassPtr,_a[4096]=_nbind.SharedClassPtr,_a[5120]=_nbind.ArrayType,_a[6144]=_nbind.ArrayType,_a[7168]=_nbind.CStringType,_a[9216]=_nbind.CallbackType,_a[10240]=_nbind.BindType,_a);_nbind.makeTypeNameTbl={"Buffer":_nbind.BufferType,"External":_nbind.ExternalType,"Int64":_nbind.Int64Type,"_nbind_new":_nbind.CreateValueType,"bool":_nbind.BooleanType,"cbFunction &":_nbind.CallbackType,"const cbFunction &":_nbind.CallbackType,"std::string":_nbind.StringType};Module["toggleLightGC"]=_nbind.toggleLightGC;_nbind.callUpcast=Module["dynCall_ii"];var globalScope=_nbind.makeType(_nbind.constructType,{flags:2048,id:0,name:""});globalScope.proto=Module;_nbind.BindClass.list.push(globalScope);var _a}var PATH=undefined;function _emscripten_set_main_loop_timing(mode,value){Browser.mainLoop.timingMode=mode;Browser.mainLoop.timingValue=value;if(!Browser.mainLoop.func){return 1}if(mode==0){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setTimeout(){setTimeout(Browser.mainLoop.runner,value)};Browser.mainLoop.method="timeout"}else if(mode==1){Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_rAF(){Browser.requestAnimationFrame(Browser.mainLoop.runner)};Browser.mainLoop.method="rAF"}else if(mode==2){if(!window["setImmediate"]){var setImmediates=[];var emscriptenMainLoopMessageId="__emcc";function Browser_setImmediate_messageHandler(event){if(event.source===window&&event.data===emscriptenMainLoopMessageId){event.stopPropagation();setImmediates.shift()()}}window.addEventListener("message",Browser_setImmediate_messageHandler,true);window["setImmediate"]=function Browser_emulated_setImmediate(func){setImmediates.push(func);window.postMessage(emscriptenMainLoopMessageId,"*")}}Browser.mainLoop.scheduler=function Browser_mainLoop_scheduler_setImmediate(){window["setImmediate"](Browser.mainLoop.runner)};Browser.mainLoop.method="immediate"}return 0}function _emscripten_set_main_loop(func,fps,simulateInfiniteLoop,arg,noSetTiming){Module["noExitRuntime"]=true;assert(!Browser.mainLoop.func,"emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");Browser.mainLoop.func=func;Browser.mainLoop.arg=arg;var thisMainLoopId=Browser.mainLoop.currentlyRunningMainloop;Browser.mainLoop.runner=function Browser_mainLoop_runner(){if(ABORT)return;if(Browser.mainLoop.queue.length>0){var start=Date.now();var blocker=Browser.mainLoop.queue.shift();blocker.func(blocker.arg);if(Browser.mainLoop.remainingBlockers){var remaining=Browser.mainLoop.remainingBlockers;var next=remaining%1==0?remaining-1:Math.floor(remaining);if(blocker.counted){Browser.mainLoop.remainingBlockers=next}else{next=next+.5;Browser.mainLoop.remainingBlockers=(8*remaining+next)/9}}console.log('main loop blocker "'+blocker.name+'" took '+(Date.now()-start)+" ms");Browser.mainLoop.updateStatus();setTimeout(Browser.mainLoop.runner,0);return}if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;Browser.mainLoop.currentFrameNumber=Browser.mainLoop.currentFrameNumber+1|0;if(Browser.mainLoop.timingMode==1&&Browser.mainLoop.timingValue>1&&Browser.mainLoop.currentFrameNumber%Browser.mainLoop.timingValue!=0){Browser.mainLoop.scheduler();return}if(Browser.mainLoop.method==="timeout"&&Module.ctx){Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");Browser.mainLoop.method=""}Browser.mainLoop.runIter((function(){if(typeof arg!=="undefined"){Runtime.dynCall("vi",func,[arg])}else{Runtime.dynCall("v",func)}}));if(thisMainLoopId<Browser.mainLoop.currentlyRunningMainloop)return;if(typeof SDL==="object"&&SDL.audio&&SDL.audio.queueNewAudioData)SDL.audio.queueNewAudioData();Browser.mainLoop.scheduler()};if(!noSetTiming){if(fps&&fps>0)_emscripten_set_main_loop_timing(0,1e3/fps);else _emscripten_set_main_loop_timing(1,1);Browser.mainLoop.scheduler()}if(simulateInfiniteLoop){throw"SimulateInfiniteLoop"}}var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:(function(){Browser.mainLoop.scheduler=null;Browser.mainLoop.currentlyRunningMainloop++}),resume:(function(){Browser.mainLoop.currentlyRunningMainloop++;var timingMode=Browser.mainLoop.timingMode;var timingValue=Browser.mainLoop.timingValue;var func=Browser.mainLoop.func;Browser.mainLoop.func=null;_emscripten_set_main_loop(func,0,false,Browser.mainLoop.arg,true);_emscripten_set_main_loop_timing(timingMode,timingValue);Browser.mainLoop.scheduler()}),updateStatus:(function(){if(Module["setStatus"]){var message=Module["statusMessage"]||"Please wait...";var remaining=Browser.mainLoop.remainingBlockers;var expected=Browser.mainLoop.expectedBlockers;if(remaining){if(remaining<expected){Module["setStatus"](message+" ("+(expected-remaining)+"/"+expected+")")}else{Module["setStatus"](message)}}else{Module["setStatus"]("")}}}),runIter:(function(func){if(ABORT)return;if(Module["preMainLoop"]){var preRet=Module["preMainLoop"]();if(preRet===false){return}}try{func()}catch(e){if(e instanceof ExitStatus){return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}if(Module["postMainLoop"])Module["postMainLoop"]()})},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:(function(){if(!Module["preloadPlugins"])Module["preloadPlugins"]=[];if(Browser.initted)return;Browser.initted=true;try{new Blob;Browser.hasBlobConstructor=true}catch(e){Browser.hasBlobConstructor=false;console.log("warning: no blob constructor, cannot create blobs with mimetypes")}Browser.BlobBuilder=typeof MozBlobBuilder!="undefined"?MozBlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:!Browser.hasBlobConstructor?console.log("warning: no BlobBuilder"):null;Browser.URLObject=typeof window!="undefined"?window.URL?window.URL:window.webkitURL:undefined;if(!Module.noImageDecoding&&typeof Browser.URLObject==="undefined"){console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");Module.noImageDecoding=true}var imagePlugin={};imagePlugin["canHandle"]=function imagePlugin_canHandle(name){return!Module.noImageDecoding&&/\.(jpg|jpeg|png|bmp)$/i.test(name)};imagePlugin["handle"]=function imagePlugin_handle(byteArray,name,onload,onerror){var b=null;if(Browser.hasBlobConstructor){try{b=new Blob([byteArray],{type:Browser.getMimetype(name)});if(b.size!==byteArray.length){b=new Blob([(new Uint8Array(byteArray)).buffer],{type:Browser.getMimetype(name)})}}catch(e){Runtime.warnOnce("Blob constructor present but fails: "+e+"; falling back to blob builder")}}if(!b){var bb=new Browser.BlobBuilder;bb.append((new Uint8Array(byteArray)).buffer);b=bb.getBlob()}var url=Browser.URLObject.createObjectURL(b);var img=new Image;img.onload=function img_onload(){assert(img.complete,"Image "+name+" could not be decoded");var canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);Module["preloadedImages"][name]=canvas;Browser.URLObject.revokeObjectURL(url);if(onload)onload(byteArray)};img.onerror=function img_onerror(event){console.log("Image "+url+" could not be decoded");if(onerror)onerror()};img.src=url};Module["preloadPlugins"].push(imagePlugin);var audioPlugin={};audioPlugin["canHandle"]=function audioPlugin_canHandle(name){return!Module.noAudioDecoding&&name.substr(-4)in{".ogg":1,".wav":1,".mp3":1}};audioPlugin["handle"]=function audioPlugin_handle(byteArray,name,onload,onerror){var done=false;function finish(audio){if(done)return;done=true;Module["preloadedAudios"][name]=audio;if(onload)onload(byteArray)}function fail(){if(done)return;done=true;Module["preloadedAudios"][name]=new Audio;if(onerror)onerror()}if(Browser.hasBlobConstructor){try{var b=new Blob([byteArray],{type:Browser.getMimetype(name)})}catch(e){return fail()}var url=Browser.URLObject.createObjectURL(b);var audio=new Audio;audio.addEventListener("canplaythrough",(function(){finish(audio)}),false);audio.onerror=function audio_onerror(event){if(done)return;console.log("warning: browser could not fully decode audio "+name+", trying slower base64 approach");function encode64(data){var BASE="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var PAD="=";var ret="";var leftchar=0;var leftbits=0;for(var i=0;i<data.length;i++){leftchar=leftchar<<8|data[i];leftbits+=8;while(leftbits>=6){var curr=leftchar>>leftbits-6&63;leftbits-=6;ret+=BASE[curr]}}if(leftbits==2){ret+=BASE[(leftchar&3)<<4];ret+=PAD+PAD}else if(leftbits==4){ret+=BASE[(leftchar&15)<<2];ret+=PAD}return ret}audio.src="data:audio/x-"+name.substr(-3)+";base64,"+encode64(byteArray);finish(audio)};audio.src=url;Browser.safeSetTimeout((function(){finish(audio)}),1e4)}else{return fail()}};Module["preloadPlugins"].push(audioPlugin);var canvas=Module["canvas"];function pointerLockChange(){Browser.pointerLock=document["pointerLockElement"]===canvas||document["mozPointerLockElement"]===canvas||document["webkitPointerLockElement"]===canvas||document["msPointerLockElement"]===canvas}if(canvas){canvas.requestPointerLock=canvas["requestPointerLock"]||canvas["mozRequestPointerLock"]||canvas["webkitRequestPointerLock"]||canvas["msRequestPointerLock"]||(function(){});canvas.exitPointerLock=document["exitPointerLock"]||document["mozExitPointerLock"]||document["webkitExitPointerLock"]||document["msExitPointerLock"]||(function(){});canvas.exitPointerLock=canvas.exitPointerLock.bind(document);document.addEventListener("pointerlockchange",pointerLockChange,false);document.addEventListener("mozpointerlockchange",pointerLockChange,false);document.addEventListener("webkitpointerlockchange",pointerLockChange,false);document.addEventListener("mspointerlockchange",pointerLockChange,false);if(Module["elementPointerLock"]){canvas.addEventListener("click",(function(ev){if(!Browser.pointerLock&&canvas.requestPointerLock){canvas.requestPointerLock();ev.preventDefault()}}),false)}}}),createContext:(function(canvas,useWebGL,setInModule,webGLContextAttributes){if(useWebGL&&Module.ctx&&canvas==Module.canvas)return Module.ctx;var ctx;var contextHandle;if(useWebGL){var contextAttributes={antialias:false,alpha:false};if(webGLContextAttributes){for(var attribute in webGLContextAttributes){contextAttributes[attribute]=webGLContextAttributes[attribute]}}contextHandle=GL.createContext(canvas,contextAttributes);if(contextHandle){ctx=GL.getContext(contextHandle).GLctx}canvas.style.backgroundColor="black"}else{ctx=canvas.getContext("2d")}if(!ctx)return null;if(setInModule){if(!useWebGL)assert(typeof GLctx==="undefined","cannot set in module if GLctx is used, but we are a non-GL context that would replace it");Module.ctx=ctx;if(useWebGL)GL.makeContextCurrent(contextHandle);Module.useWebGL=useWebGL;Browser.moduleContextCreatedCallbacks.forEach((function(callback){callback()}));Browser.init()}return ctx}),destroyContext:(function(canvas,useWebGL,setInModule){}),fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:(function(lockPointer,resizeCanvas,vrDevice){Browser.lockPointer=lockPointer;Browser.resizeCanvas=resizeCanvas;Browser.vrDevice=vrDevice;if(typeof Browser.lockPointer==="undefined")Browser.lockPointer=true;if(typeof Browser.resizeCanvas==="undefined")Browser.resizeCanvas=false;if(typeof Browser.vrDevice==="undefined")Browser.vrDevice=null;var canvas=Module["canvas"];function fullScreenChange(){Browser.isFullScreen=false;var canvasContainer=canvas.parentNode;if((document["webkitFullScreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"]||document["mozFullscreenElement"]||document["fullScreenElement"]||document["fullscreenElement"]||document["msFullScreenElement"]||document["msFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvasContainer){canvas.cancelFullScreen=document["cancelFullScreen"]||document["mozCancelFullScreen"]||document["webkitCancelFullScreen"]||document["msExitFullscreen"]||document["exitFullscreen"]||(function(){});canvas.cancelFullScreen=canvas.cancelFullScreen.bind(document);if(Browser.lockPointer)canvas.requestPointerLock();Browser.isFullScreen=true;if(Browser.resizeCanvas)Browser.setFullScreenCanvasSize()}else{canvasContainer.parentNode.insertBefore(canvas,canvasContainer);canvasContainer.parentNode.removeChild(canvasContainer);if(Browser.resizeCanvas)Browser.setWindowedCanvasSize()}if(Module["onFullScreen"])Module["onFullScreen"](Browser.isFullScreen);Browser.updateCanvasDimensions(canvas)}if(!Browser.fullScreenHandlersInstalled){Browser.fullScreenHandlersInstalled=true;document.addEventListener("fullscreenchange",fullScreenChange,false);document.addEventListener("mozfullscreenchange",fullScreenChange,false);document.addEventListener("webkitfullscreenchange",fullScreenChange,false);document.addEventListener("MSFullscreenChange",fullScreenChange,false)}var canvasContainer=document.createElement("div");canvas.parentNode.insertBefore(canvasContainer,canvas);canvasContainer.appendChild(canvas);canvasContainer.requestFullScreen=canvasContainer["requestFullScreen"]||canvasContainer["mozRequestFullScreen"]||canvasContainer["msRequestFullscreen"]||(canvasContainer["webkitRequestFullScreen"]?(function(){canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])}):null);if(vrDevice){canvasContainer.requestFullScreen({vrDisplay:vrDevice})}else{canvasContainer.requestFullScreen()}}),nextRAF:0,fakeRequestAnimationFrame:(function(func){var now=Date.now();if(Browser.nextRAF===0){Browser.nextRAF=now+1e3/60}else{while(now+2>=Browser.nextRAF){Browser.nextRAF+=1e3/60}}var delay=Math.max(Browser.nextRAF-now,0);setTimeout(func,delay)}),requestAnimationFrame:function requestAnimationFrame(func){if(typeof window==="undefined"){Browser.fakeRequestAnimationFrame(func)}else{if(!window.requestAnimationFrame){window.requestAnimationFrame=window["requestAnimationFrame"]||window["mozRequestAnimationFrame"]||window["webkitRequestAnimationFrame"]||window["msRequestAnimationFrame"]||window["oRequestAnimationFrame"]||Browser.fakeRequestAnimationFrame}window.requestAnimationFrame(func)}},safeCallback:(function(func){return(function(){if(!ABORT)return func.apply(null,arguments)})}),allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=false}),resumeAsyncCallbacks:(function(){Browser.allowAsyncCallbacks=true;if(Browser.queuedAsyncCallbacks.length>0){var callbacks=Browser.queuedAsyncCallbacks;Browser.queuedAsyncCallbacks=[];callbacks.forEach((function(func){func()}))}}),safeRequestAnimationFrame:(function(func){return Browser.requestAnimationFrame((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}))}),safeSetTimeout:(function(func,timeout){Module["noExitRuntime"]=true;return setTimeout((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}else{Browser.queuedAsyncCallbacks.push(func)}}),timeout)}),safeSetInterval:(function(func,timeout){Module["noExitRuntime"]=true;return setInterval((function(){if(ABORT)return;if(Browser.allowAsyncCallbacks){func()}}),timeout)}),getMimetype:(function(name){return{"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","bmp":"image/bmp","ogg":"audio/ogg","wav":"audio/wav","mp3":"audio/mpeg"}[name.substr(name.lastIndexOf(".")+1)]}),getUserMedia:(function(func){if(!window.getUserMedia){window.getUserMedia=navigator["getUserMedia"]||navigator["mozGetUserMedia"]}window.getUserMedia(func)}),getMovementX:(function(event){return event["movementX"]||event["mozMovementX"]||event["webkitMovementX"]||0}),getMovementY:(function(event){return event["movementY"]||event["mozMovementY"]||event["webkitMovementY"]||0}),getMouseWheelDelta:(function(event){var delta=0;switch(event.type){case"DOMMouseScroll":delta=event.detail;break;case"mousewheel":delta=event.wheelDelta;break;case"wheel":delta=event["deltaY"];break;default:throw"unrecognized mouse wheel event: "+event.type}return delta}),mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:(function(event){if(Browser.pointerLock){if(event.type!="mousemove"&&"mozMovementX"in event){Browser.mouseMovementX=Browser.mouseMovementY=0}else{Browser.mouseMovementX=Browser.getMovementX(event);Browser.mouseMovementY=Browser.getMovementY(event)}if(typeof SDL!="undefined"){Browser.mouseX=SDL.mouseX+Browser.mouseMovementX;Browser.mouseY=SDL.mouseY+Browser.mouseMovementY}else{Browser.mouseX+=Browser.mouseMovementX;Browser.mouseY+=Browser.mouseMovementY}}else{var rect=Module["canvas"].getBoundingClientRect();var cw=Module["canvas"].width;var ch=Module["canvas"].height;var scrollX=typeof window.scrollX!=="undefined"?window.scrollX:window.pageXOffset;var scrollY=typeof window.scrollY!=="undefined"?window.scrollY:window.pageYOffset;if(event.type==="touchstart"||event.type==="touchend"||event.type==="touchmove"){var touch=event.touch;if(touch===undefined){return}var adjustedX=touch.pageX-(scrollX+rect.left);var adjustedY=touch.pageY-(scrollY+rect.top);adjustedX=adjustedX*(cw/rect.width);adjustedY=adjustedY*(ch/rect.height);var coords={x:adjustedX,y:adjustedY};if(event.type==="touchstart"){Browser.lastTouches[touch.identifier]=coords;Browser.touches[touch.identifier]=coords}else if(event.type==="touchend"||event.type==="touchmove"){var last=Browser.touches[touch.identifier];if(!last)last=coords;Browser.lastTouches[touch.identifier]=last;Browser.touches[touch.identifier]=coords}return}var x=event.pageX-(scrollX+rect.left);var y=event.pageY-(scrollY+rect.top);x=x*(cw/rect.width);y=y*(ch/rect.height);Browser.mouseMovementX=x-Browser.mouseX;Browser.mouseMovementY=y-Browser.mouseY;Browser.mouseX=x;Browser.mouseY=y}}),xhrLoad:(function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)}),asyncLoad:(function(url,onload,onerror,noRunDep){Browser.xhrLoad(url,(function(arrayBuffer){assert(arrayBuffer,'Loading data file "'+url+'" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(!noRunDep)removeRunDependency("al "+url)}),(function(event){if(onerror){onerror()}else{throw'Loading data file "'+url+'" failed.'}}));if(!noRunDep)addRunDependency("al "+url)}),resizeListeners:[],updateResizeListeners:(function(){var canvas=Module["canvas"];Browser.resizeListeners.forEach((function(listener){listener(canvas.width,canvas.height)}))}),setCanvasSize:(function(width,height,noUpdates){var canvas=Module["canvas"];Browser.updateCanvasDimensions(canvas,width,height);if(!noUpdates)Browser.updateResizeListeners()}),windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags|8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),setWindowedCanvasSize:(function(){if(typeof SDL!="undefined"){var flags=HEAPU32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2];flags=flags&~8388608;HEAP32[SDL.screen+Runtime.QUANTUM_SIZE*0>>2]=flags}Browser.updateResizeListeners()}),updateCanvasDimensions:(function(canvas,wNative,hNative){if(wNative&&hNative){canvas.widthNative=wNative;canvas.heightNative=hNative}else{wNative=canvas.widthNative;hNative=canvas.heightNative}var w=wNative;var h=hNative;if(Module["forcedAspectRatio"]&&Module["forcedAspectRatio"]>0){if(w/h<Module["forcedAspectRatio"]){w=Math.round(h*Module["forcedAspectRatio"])}else{h=Math.round(w/Module["forcedAspectRatio"])}}if((document["webkitFullScreenElement"]||document["webkitFullscreenElement"]||document["mozFullScreenElement"]||document["mozFullscreenElement"]||document["fullScreenElement"]||document["fullscreenElement"]||document["msFullScreenElement"]||document["msFullscreenElement"]||document["webkitCurrentFullScreenElement"])===canvas.parentNode&&typeof screen!="undefined"){var factor=Math.min(screen.width/w,screen.height/h);w=Math.round(w*factor);h=Math.round(h*factor)}if(Browser.resizeCanvas){if(canvas.width!=w)canvas.width=w;if(canvas.height!=h)canvas.height=h;if(typeof canvas.style!="undefined"){canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}else{if(canvas.width!=wNative)canvas.width=wNative;if(canvas.height!=hNative)canvas.height=hNative;if(typeof canvas.style!="undefined"){if(w!=wNative||h!=hNative){canvas.style.setProperty("width",w+"px","important");canvas.style.setProperty("height",h+"px","important")}else{canvas.style.removeProperty("width");canvas.style.removeProperty("height")}}}}),wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:(function(){var handle=Browser.nextWgetRequestHandle;Browser.nextWgetRequestHandle++;return handle})};function _malloc(bytes){var ptr=Runtime.dynamicAlloc(bytes+8);return ptr+8&4294967288}Module["_malloc"]=_malloc;function ___cxa_allocate_exception(size){return _malloc(size)}var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall54(which,varargs){SYSCALLS.varargs=varargs;try{return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:return totalMemory/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}Module["_bitshift64Lshr"]=_bitshift64Lshr;function _typeModule(self){var structureList=[[0,1,"X"],[1,1,"const X"],[128,1,"X *"],[256,1,"X &"],[384,1,"X &&"],[512,1,"std::shared_ptr<X>"],[640,1,"std::unique_ptr<X>"],[5120,1,"std::vector<X>"],[6144,2,"std::array<X, Y>"],[9216,-1,"std::function<X (Y)>"]];function applyStructure(outerName,outerFlags,innerName,innerFlags,param,flip){if(outerFlags==1){var ref=innerFlags&896;if(ref==128||ref==256||ref==384)outerName="X const"}var name;if(flip){name=innerName.replace("X",outerName).replace("Y",param)}else{name=outerName.replace("X",innerName).replace("Y",param)}return name.replace(/([*&]) (?=[*&])/g,"$1")}function reportProblem(problem,id,kind,structureType,place){throw new Error(problem+" type "+kind.replace("X",id+"?")+(structureType?" with flag "+structureType:"")+" in "+place)}function getComplexType(id,constructType,getType,queryType,place,kind,prevStructure,depth){if(kind===void 0){kind="X"}if(depth===void 0){depth=1}var result=getType(id);if(result)return result;var query=queryType(id);var structureType=query.placeholderFlag;var structure=structureList[structureType];if(prevStructure&&structure){kind=applyStructure(prevStructure[2],prevStructure[0],kind,structure[0],"?",true)}var problem;if(structureType==0)problem="Unbound";if(structureType>=10)problem="Corrupt";if(depth>20)problem="Deeply nested";if(problem)reportProblem(problem,id,kind,structureType,place||"?");var subId=query.paramList[0];var subType=getComplexType(subId,constructType,getType,queryType,place,kind,structure,depth+1);var srcSpec;var spec={flags:structure[0],id:id,name:"",paramList:[subType]};var argList=[];var structureParam="?";switch(query.placeholderFlag){case 1:srcSpec=subType.spec;break;case 2:if((subType.flags&15360)==1024&&subType.spec.ptrSize==1){spec.flags=7168;break};case 3:case 6:case 5:srcSpec=subType.spec;if((subType.flags&15360)!=2048){}break;case 8:structureParam=""+query.paramList[1];spec.paramList.push(query.paramList[1]);break;case 9:for(var _i=0,_a=query.paramList[1];_i<_a.length;_i++){var paramId=_a[_i];var paramType=getComplexType(paramId,constructType,getType,queryType,place,kind,structure,depth+1);argList.push(paramType.name);spec.paramList.push(paramType)}structureParam=argList.join(", ");break;default:break}spec.name=applyStructure(structure[2],structure[0],subType.name,subType.flags,structureParam);if(srcSpec){for(var _b=0,_c=Object.keys(srcSpec);_b<_c.length;_b++){var key=_c[_b];spec[key]=spec[key]||srcSpec[key]}spec.flags|=srcSpec.flags}return makeType(constructType,spec)}function makeType(constructType,spec){var flags=spec.flags;var refKind=flags&896;var kind=flags&15360;if(!spec.name&&kind==1024){if(spec.ptrSize==1){spec.name=(flags&16?"":(flags&8?"un":"")+"signed ")+"char"}else{spec.name=(flags&8?"u":"")+(flags&32?"float":"int")+(spec.ptrSize*8+"_t")}}if(spec.ptrSize==8&&!(flags&32))kind=64;if(kind==2048){if(refKind==512||refKind==640){kind=4096}else if(refKind)kind=3072}return constructType(kind,spec)}var Type=(function(){function Type(spec){this.id=spec.id;this.name=spec.name;this.flags=spec.flags;this.spec=spec}Type.prototype.toString=(function(){return this.name});return Type})();var output={Type:Type,getComplexType:getComplexType,makeType:makeType,structureList:structureList};self.output=output;return self.output||output}function __nbind_register_type(id,namePtr){var name=_nbind.readAsciiString(namePtr);var spec={flags:10240,id:id,name:name};_nbind.makeType(_nbind.constructType,spec)}var _BDtoIHigh=true;function _pthread_cleanup_push(routine,arg){__ATEXIT__.push((function(){Runtime.dynCall("vi",routine,[arg])}));_pthread_cleanup_push.level=__ATEXIT__.length}function __nbind_register_callback_signature(typeListPtr,typeCount){var typeList=_nbind.readTypeIdList(typeListPtr,typeCount);var num=_nbind.callbackSignatureList.length;_nbind.callbackSignatureList[num]=_nbind.makeJSCaller(typeList);return num}function __nbind_register_class(idListPtr,policyListPtr,superListPtr,upcastListPtr,superCount,destructorPtr,namePtr){var name=_nbind.readAsciiString(namePtr);var policyTbl=_nbind.readPolicyList(policyListPtr);var idList=HEAPU32.subarray(idListPtr/4,idListPtr/4+2);var spec={flags:2048|(policyTbl["Value"]?2:0),id:idList[0],name:name};var bindClass=_nbind.makeType(_nbind.constructType,spec);bindClass.ptrType=_nbind.getComplexType(idList[1],_nbind.constructType,_nbind.getType,_nbind.queryType);bindClass.destroy=_nbind.makeMethodCaller(bindClass.ptrType,{boundID:spec.id,flags:0,name:"destroy",num:0,ptr:destructorPtr,title:bindClass.name+".free",typeList:["void","uint32_t","uint32_t"]});if(superCount){bindClass.superIdList=Array.prototype.slice.call(HEAPU32.subarray(superListPtr/4,superListPtr/4+superCount));bindClass.upcastList=Array.prototype.slice.call(HEAPU32.subarray(upcastListPtr/4,upcastListPtr/4+superCount))}Module[bindClass.name]=bindClass.makeBound(policyTbl);_nbind.BindClass.list.push(bindClass)}function _removeAccessorPrefix(name){var prefixMatcher=/^[Gg]et_?([A-Z]?([A-Z]?))/;return name.replace(prefixMatcher,(function(match,initial,second){return second?initial:initial.toLowerCase()}))}function __nbind_register_function(boundID,policyListPtr,typeListPtr,typeCount,ptr,direct,signatureType,namePtr,num,flags){var bindClass=_nbind.getType(boundID);var policyTbl=_nbind.readPolicyList(policyListPtr);var typeList=_nbind.readTypeIdList(typeListPtr,typeCount);var specList;if(signatureType==4){specList=[{direct:ptr,name:"__nbindConstructor",ptr:0,title:bindClass.name+" constructor",typeList:["uint32_t"].concat(typeList.slice(1))},{direct:direct,name:"__nbindValueConstructor",ptr:0,title:bindClass.name+" value constructor",typeList:["void","uint32_t"].concat(typeList.slice(1))}]}else{var name_1=_nbind.readAsciiString(namePtr);var title=(bindClass.name&&bindClass.name+".")+name_1;if(signatureType==2||signatureType==3){name_1=_removeAccessorPrefix(name_1)}specList=[{boundID:boundID,direct:direct,name:name_1,ptr:ptr,title:title,typeList:typeList}]}for(var _i=0,specList_1=specList;_i<specList_1.length;_i++){var spec=specList_1[_i];spec.signatureType=signatureType;spec.policyTbl=policyTbl;spec.num=num;spec.flags=flags;bindClass.addMethod(spec)}}function _nbind_value(name,proto){if(!_nbind.typeNameTbl[name])_nbind.throwError("Unknown value type "+name);Module["NBind"].bind_value(name,proto);_defineHidden(_nbind.typeNameTbl[name].proto.prototype.__nbindValueConstructor)(proto.prototype,"__nbindValueConstructor")}Module["_nbind_value"]=_nbind_value;function __nbind_get_value_object(num,ptr){var obj=_nbind.popValue(num);if(!obj.fromJS){throw new Error("Object "+obj+" has no fromJS function")}obj.fromJS((function(){obj.__nbindValueConstructor.apply(this,Array.prototype.concat.apply([ptr],arguments))}))}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function _sbrk(bytes){var self=_sbrk;if(!self.called){DYNAMICTOP=alignMemoryPage(DYNAMICTOP);self.called=true;assert(Runtime.dynamicAlloc);self.alloc=Runtime.dynamicAlloc;Runtime.dynamicAlloc=(function(){abort("cannot dynamically allocate, sbrk now has control")})}var ret=DYNAMICTOP;if(bytes!=0){var success=self.alloc(bytes);if(!success)return-1>>>0}return ret}function _llvm_stacksave(){var self=_llvm_stacksave;if(!self.LLVM_SAVEDSTACKS){self.LLVM_SAVEDSTACKS=[]}self.LLVM_SAVEDSTACKS.push(Runtime.stackSave());return self.LLVM_SAVEDSTACKS.length-1}var _BItoD=true;function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}function _pthread_self(){return 0}function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;assert(offset_high===0);FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer)___syscall146.buffer=[];var buffer=___syscall146.buffer;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){var curr=HEAPU8[ptr+j];if(curr===0||curr===10){Module["print"](UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function __nbind_finish(){for(var _i=0,_a=_nbind.BindClass.list;_i<_a.length;_i++){var bindClass=_a[_i];bindClass.finish()}}var ___dso_handle=allocate(1,"i32*",ALLOC_STATIC);((function(_nbind){var typeIdTbl={};_nbind.typeNameTbl={};var Pool=(function(){function Pool(){}Pool.lalloc=(function(size){size=size+7&~7;var used=HEAPU32[Pool.usedPtr];if(size>Pool.pageSize/2||size>Pool.pageSize-used){var NBind=_nbind.typeNameTbl["NBind"].proto;return NBind.lalloc(size)}else{HEAPU32[Pool.usedPtr]=used+size;return Pool.rootPtr+used}});Pool.lreset=(function(used,page){var topPage=HEAPU32[Pool.pagePtr];if(topPage){var NBind=_nbind.typeNameTbl["NBind"].proto;NBind.lreset(used,page)}else{HEAPU32[Pool.usedPtr]=used}});return Pool})();_nbind.Pool=Pool;function constructType(kind,spec){var construct=kind==10240?_nbind.makeTypeNameTbl[spec.name]||_nbind.BindType:_nbind.makeTypeKindTbl[kind];var bindType=new construct(spec);typeIdTbl[spec.id]=bindType;_nbind.typeNameTbl[spec.name]=bindType;return bindType}_nbind.constructType=constructType;function getType(id){return typeIdTbl[id]}_nbind.getType=getType;function queryType(id){var placeholderFlag=HEAPU8[id];var paramCount=_nbind.structureList[placeholderFlag][1];id/=4;if(paramCount<0){++id;paramCount=HEAPU32[id]+1}var paramList=Array.prototype.slice.call(HEAPU32.subarray(id+1,id+1+paramCount));if(placeholderFlag==9){paramList=[paramList[0],paramList.slice(1)]}return{paramList:paramList,placeholderFlag:placeholderFlag}}_nbind.queryType=queryType;function getTypes(idList,place){return idList.map((function(id){return typeof id=="number"?_nbind.getComplexType(id,constructType,getType,queryType,place):_nbind.typeNameTbl[id]}))}_nbind.getTypes=getTypes;function readTypeIdList(typeListPtr,typeCount){return Array.prototype.slice.call(HEAPU32,typeListPtr/4,typeListPtr/4+typeCount)}_nbind.readTypeIdList=readTypeIdList;function readAsciiString(ptr){var endPtr=ptr;while(HEAPU8[endPtr++]);return String.fromCharCode.apply("",HEAPU8.subarray(ptr,endPtr-1))}_nbind.readAsciiString=readAsciiString;function readPolicyList(policyListPtr){var policyTbl={};if(policyListPtr){while(1){var namePtr=HEAPU32[policyListPtr/4];if(!namePtr)break;policyTbl[readAsciiString(namePtr)]=true;policyListPtr+=4}}return policyTbl}_nbind.readPolicyList=readPolicyList;function getDynCall(typeList,name){var mangleMap={float32_t:"d",float64_t:"d",int64_t:"d",uint64_t:"d","void":"v"};var signature=typeList.map((function(type){return mangleMap[type.name]||"i"})).join("");var dynCall=Module["dynCall_"+signature];if(!dynCall){throw new Error("dynCall_"+signature+" not found for "+name+"("+typeList.map((function(type){return type.name})).join(", ")+")")}return dynCall}_nbind.getDynCall=getDynCall;function addMethod(obj,name,func,arity){var overload=obj[name];if(obj.hasOwnProperty(name)&&overload){if(overload.arity||overload.arity===0){overload=_nbind.makeOverloader(overload,overload.arity);obj[name]=overload}overload.addMethod(func,arity)}else{func.arity=arity;obj[name]=func}}_nbind.addMethod=addMethod;function throwError(message){throw new Error(message)}_nbind.throwError=throwError;_nbind.bigEndian=false;_a=_typeModule(_typeModule),_nbind.Type=_a.Type,_nbind.makeType=_a.makeType,_nbind.getComplexType=_a.getComplexType,_nbind.structureList=_a.structureList;var BindType=(function(_super){__extends(BindType,_super);function BindType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.heap=HEAPU32;_this.ptrSize=4;return _this}BindType.prototype.needsWireRead=(function(policyTbl){return!!this.wireRead||!!this.makeWireRead});BindType.prototype.needsWireWrite=(function(policyTbl){return!!this.wireWrite||!!this.makeWireWrite});return BindType})(_nbind.Type);_nbind.BindType=BindType;var PrimitiveType=(function(_super){__extends(PrimitiveType,_super);function PrimitiveType(spec){var _this=_super.call(this,spec)||this;var heapTbl=spec.flags&32?{32:HEAPF32,64:HEAPF64}:spec.flags&8?{8:HEAPU8,16:HEAPU16,32:HEAPU32}:{8:HEAP8,16:HEAP16,32:HEAP32};_this.heap=heapTbl[spec.ptrSize*8];_this.ptrSize=spec.ptrSize;return _this}PrimitiveType.prototype.needsWireWrite=(function(policyTbl){return!!policyTbl&&!!policyTbl["Strict"]});PrimitiveType.prototype.makeWireWrite=(function(expr,policyTbl){return policyTbl&&policyTbl["Strict"]&&(function(arg){if(typeof arg=="number")return arg;throw new Error("Type mismatch")})});return PrimitiveType})(BindType);_nbind.PrimitiveType=PrimitiveType;function pushCString(str,policyTbl){if(str===null||str===undefined){if(policyTbl&&policyTbl["Nullable"]){return 0}else throw new Error("Type mismatch")}if(policyTbl&&policyTbl["Strict"]){if(typeof str!="string")throw new Error("Type mismatch")}else str=str.toString();var length=Module.lengthBytesUTF8(str)+1;var result=_nbind.Pool.lalloc(length);Module.stringToUTF8Array(str,HEAPU8,result,length);return result}_nbind.pushCString=pushCString;function popCString(ptr){if(ptr===0)return null;return Module.Pointer_stringify(ptr)}_nbind.popCString=popCString;var CStringType=(function(_super){__extends(CStringType,_super);function CStringType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popCString;_this.wireWrite=pushCString;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}CStringType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushCString(arg,policyTbl)})});return CStringType})(BindType);_nbind.CStringType=CStringType;var BooleanType=(function(_super){__extends(BooleanType,_super);function BooleanType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=(function(arg){return!!arg});return _this}BooleanType.prototype.needsWireWrite=(function(policyTbl){return!!policyTbl&&!!policyTbl["Strict"]});BooleanType.prototype.makeWireRead=(function(expr){return"!!("+expr+")"});BooleanType.prototype.makeWireWrite=(function(expr,policyTbl){return policyTbl&&policyTbl["Strict"]&&(function(arg){if(typeof arg=="boolean")return arg;throw new Error("Type mismatch")})||expr});return BooleanType})(BindType);_nbind.BooleanType=BooleanType;var Wrapper=(function(){function Wrapper(){}Wrapper.prototype.persist=(function(){this.__nbindState|=1});return Wrapper})();_nbind.Wrapper=Wrapper;function makeBound(policyTbl,bindClass){var Bound=(function(_super){__extends(Bound,_super);function Bound(marker,flags,ptr,shared){var _this=_super.call(this)||this;if(!(_this instanceof Bound)){return new(Function.prototype.bind.apply(Bound,Array.prototype.concat.apply([null],arguments)))}var nbindFlags=flags;var nbindPtr=ptr;var nbindShared=shared;if(marker!==_nbind.ptrMarker){var wirePtr=_this.__nbindConstructor.apply(_this,arguments);nbindFlags=4096|512;nbindShared=HEAPU32[wirePtr/4];nbindPtr=HEAPU32[wirePtr/4+1]}var spec={configurable:true,enumerable:false,value:null,writable:false};var propTbl={"__nbindFlags":nbindFlags,"__nbindPtr":nbindPtr};if(nbindShared){propTbl["__nbindShared"]=nbindShared;_nbind.mark(_this)}for(var _i=0,_a=Object.keys(propTbl);_i<_a.length;_i++){var key=_a[_i];spec.value=propTbl[key];Object.defineProperty(_this,key,spec)}_defineHidden(0)(_this,"__nbindState");return _this}Bound.prototype.free=(function(){bindClass.destroy.call(this,this.__nbindShared,this.__nbindFlags);this.__nbindState|=2;disableMember(this,"__nbindShared");disableMember(this,"__nbindPtr")});return Bound})(Wrapper);__decorate([_defineHidden()],Bound.prototype,"__nbindConstructor",void 0);__decorate([_defineHidden()],Bound.prototype,"__nbindValueConstructor",void 0);__decorate([_defineHidden(policyTbl)],Bound.prototype,"__nbindPolicies",void 0);return Bound}_nbind.makeBound=makeBound;function disableMember(obj,name){function die(){throw new Error("Accessing deleted object")}Object.defineProperty(obj,name,{configurable:false,enumerable:false,get:die,set:die})}_nbind.ptrMarker={};var BindClass=(function(_super){__extends(BindClass,_super);function BindClass(spec){var _this=_super.call(this,spec)||this;_this.wireRead=(function(arg){return _nbind.popValue(arg,_this.ptrType)});_this.wireWrite=(function(arg){return pushPointer(arg,_this.ptrType,true)});_this.pendingSuperCount=0;_this.ready=false;_this.methodTbl={};if(spec.paramList){_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto}else _this.classType=_this;return _this}BindClass.prototype.makeBound=(function(policyTbl){var Bound=_nbind.makeBound(policyTbl,this);this.proto=Bound;this.ptrType.proto=Bound;return Bound});BindClass.prototype.addMethod=(function(spec){var overloadList=this.methodTbl[spec.name]||[];overloadList.push(spec);this.methodTbl[spec.name]=overloadList});BindClass.prototype.registerMethods=(function(src,staticOnly){var setter;for(var _i=0,_a=Object.keys(src.methodTbl);_i<_a.length;_i++){var name_1=_a[_i];var overloadList=src.methodTbl[name_1];for(var _b=0,overloadList_1=overloadList;_b<overloadList_1.length;_b++){var spec=overloadList_1[_b];var target=void 0;var caller=void 0;target=this.proto.prototype;if(staticOnly&&spec.signatureType!=0)continue;switch(spec.signatureType){case 0:target=this.proto;case 4:caller=_nbind.makeCaller(spec);_nbind.addMethod(target,spec.name,caller,spec.typeList.length-1);break;case 3:setter=_nbind.makeMethodCaller(src.ptrType,spec);break;case 2:Object.defineProperty(target,spec.name,{configurable:true,enumerable:false,get:_nbind.makeMethodCaller(src.ptrType,spec),set:setter});break;case 1:caller=_nbind.makeMethodCaller(src.ptrType,spec);_nbind.addMethod(target,spec.name,caller,spec.typeList.length-1);break;default:break}}}});BindClass.prototype.registerSuperMethods=(function(src,firstSuper,visitTbl){if(visitTbl[src.name])return;visitTbl[src.name]=true;var superNum=0;var nextFirst;for(var _i=0,_a=src.superIdList||[];_i<_a.length;_i++){var superId=_a[_i];var superClass=_nbind.getType(superId);if(superNum++<firstSuper||firstSuper<0){nextFirst=-1}else{nextFirst=0}this.registerSuperMethods(superClass,nextFirst,visitTbl)}this.registerMethods(src,firstSuper<0)});BindClass.prototype.finish=(function(){if(this.ready)return this;this.ready=true;this.superList=(this.superIdList||[]).map((function(superId){return _nbind.getType(superId).finish()}));var Bound=this.proto;if(this.superList.length){var Proto=(function(){this.constructor=Bound});Proto.prototype=this.superList[0].proto.prototype;Bound.prototype=new Proto}if(Bound!=Module)Bound.prototype.__nbindType=this;this.registerSuperMethods(this,1,{});return this});BindClass.prototype.upcastStep=(function(dst,ptr){if(dst==this)return ptr;for(var i=0;i<this.superList.length;++i){var superPtr=this.superList[i].upcastStep(dst,_nbind.callUpcast(this.upcastList[i],ptr));if(superPtr)return superPtr}return 0});return BindClass})(_nbind.BindType);BindClass.list=[];_nbind.BindClass=BindClass;function popPointer(ptr,type){return ptr?new type.proto(_nbind.ptrMarker,type.flags,ptr):null}_nbind.popPointer=popPointer;function pushPointer(obj,type,tryValue){if(!(obj instanceof _nbind.Wrapper)){if(tryValue){return _nbind.pushValue(obj)}else throw new Error("Type mismatch")}var ptr=obj.__nbindPtr;var objType=obj.__nbindType.classType;var classType=type.classType;if(obj instanceof type.proto){while(objType!=classType){ptr=_nbind.callUpcast(objType.upcastList[0],ptr);objType=objType.superList[0]}}else{ptr=objType.upcastStep(classType,ptr);if(!ptr)throw new Error("Type mismatch")}return ptr}_nbind.pushPointer=pushPointer;function pushMutablePointer(obj,type){var ptr=pushPointer(obj,type);if(obj.__nbindFlags&1){throw new Error("Passing a const value as a non-const argument")}return ptr}var BindClassPtr=(function(_super){__extends(BindClassPtr,_super);function BindClassPtr(spec){var _this=_super.call(this,spec)||this;_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto;var isConst=spec.flags&1;var isValue=(_this.flags&896)==256&&spec.flags&2;var push=isConst?pushPointer:pushMutablePointer;var pop=isValue?_nbind.popValue:popPointer;_this.makeWireWrite=(function(expr,policyTbl){return policyTbl["Nullable"]?(function(arg){return arg?push(arg,_this):0}):(function(arg){return push(arg,_this)})});_this.wireRead=(function(arg){return pop(arg,_this)});_this.wireWrite=(function(arg){return push(arg,_this)});return _this}return BindClassPtr})(_nbind.BindType);_nbind.BindClassPtr=BindClassPtr;function popShared(ptr,type){var shared=HEAPU32[ptr/4];var unsafe=HEAPU32[ptr/4+1];return unsafe?new type.proto(_nbind.ptrMarker,type.flags,unsafe,shared):null}_nbind.popShared=popShared;function pushShared(obj,type){if(!(obj instanceof type.proto))throw new Error("Type mismatch");return obj.__nbindShared}function pushMutableShared(obj,type){if(!(obj instanceof type.proto))throw new Error("Type mismatch");if(obj.__nbindFlags&1){throw new Error("Passing a const value as a non-const argument")}return obj.__nbindShared}var SharedClassPtr=(function(_super){__extends(SharedClassPtr,_super);function SharedClassPtr(spec){var _this=_super.call(this,spec)||this;_this.readResources=[_nbind.resources.pool];_this.classType=spec.paramList[0].classType;_this.proto=_this.classType.proto;var isConst=spec.flags&1;var push=isConst?pushShared:pushMutableShared;_this.wireRead=(function(arg){return popShared(arg,_this)});_this.wireWrite=(function(arg){return push(arg,_this)});return _this}return SharedClassPtr})(_nbind.BindType);_nbind.SharedClassPtr=SharedClassPtr;_nbind.externalList=[0];var firstFreeExternal=0;var External=(function(){function External(data){this.refCount=1;this.data=data}External.prototype.register=(function(){var num=firstFreeExternal;if(num){firstFreeExternal=_nbind.externalList[num]}else num=_nbind.externalList.length;_nbind.externalList[num]=this;return num});External.prototype.reference=(function(){++this.refCount});External.prototype.dereference=(function(num){if(--this.refCount==0){if(this.free)this.free();_nbind.externalList[num]=firstFreeExternal;firstFreeExternal=num}});return External})();_nbind.External=External;function popExternal(num){var obj=_nbind.externalList[num];obj.dereference(num);return obj.data}function pushExternal(obj){var external=new External(obj);external.reference();return external.register()}var ExternalType=(function(_super){__extends(ExternalType,_super);function ExternalType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popExternal;_this.wireWrite=pushExternal;return _this}return ExternalType})(_nbind.BindType);_nbind.ExternalType=ExternalType;_nbind.callbackSignatureList=[];var CallbackType=(function(_super){__extends(CallbackType,_super);function CallbackType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=(function(func){if(typeof func!="function")_nbind.throwError("Type mismatch");return(new _nbind.External(func)).register()});return _this}return CallbackType})(_nbind.BindType);_nbind.CallbackType=CallbackType;_nbind.valueList=[0];var firstFreeValue=0;function pushValue(value){var num=firstFreeValue;if(num){firstFreeValue=_nbind.valueList[num]}else num=_nbind.valueList.length;_nbind.valueList[num]=value;return num*2+1}_nbind.pushValue=pushValue;function popValue(num,type){if(!num)_nbind.throwError("Value type JavaScript class is missing or not registered");if(num&1){num>>=1;var obj=_nbind.valueList[num];_nbind.valueList[num]=firstFreeValue;firstFreeValue=num;return obj}else if(type){return _nbind.popShared(num,type)}else throw new Error("Invalid value slot "+num)}_nbind.popValue=popValue;var valueBase=0x10000000000000000;function push64(num){if(typeof num=="number")return num;return pushValue(num)*4096+valueBase}function pop64(num){if(num<valueBase)return num;return popValue((num-valueBase)/4096)}var CreateValueType=(function(_super){__extends(CreateValueType,_super);function CreateValueType(){return _super!==null&&_super.apply(this,arguments)||this}CreateValueType.prototype.makeWireWrite=(function(expr){return"(_nbind.pushValue(new "+expr+"))"});return CreateValueType})(_nbind.BindType);_nbind.CreateValueType=CreateValueType;var Int64Type=(function(_super){__extends(Int64Type,_super);function Int64Type(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=push64;_this.wireRead=pop64;return _this}return Int64Type})(_nbind.BindType);_nbind.Int64Type=Int64Type;function pushArray(arr,type){if(!arr)return 0;var length=arr.length;if((type.size||type.size===0)&&length<type.size){throw new Error("Type mismatch")}var ptrSize=type.memberType.ptrSize;var result=_nbind.Pool.lalloc(4+length*ptrSize);HEAPU32[result/4]=length;var heap=type.memberType.heap;var ptr=(result+4)/ptrSize;var wireWrite=type.memberType.wireWrite;var num=0;if(wireWrite){while(num<length){heap[ptr++]=wireWrite(arr[num++])}}else{while(num<length){heap[ptr++]=arr[num++]}}return result}_nbind.pushArray=pushArray;function popArray(ptr,type){if(ptr===0)return null;var length=HEAPU32[ptr/4];var arr=new Array(length);var heap=type.memberType.heap;ptr=(ptr+4)/type.memberType.ptrSize;var wireRead=type.memberType.wireRead;var num=0;if(wireRead){while(num<length){arr[num++]=wireRead(heap[ptr++])}}else{while(num<length){arr[num++]=heap[ptr++]}}return arr}_nbind.popArray=popArray;var ArrayType=(function(_super){__extends(ArrayType,_super);function ArrayType(spec){var _this=_super.call(this,spec)||this;_this.wireRead=(function(arg){return popArray(arg,_this)});_this.wireWrite=(function(arg){return pushArray(arg,_this)});_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];_this.memberType=spec.paramList[0];if(spec.paramList[1])_this.size=spec.paramList[1];return _this}return ArrayType})(_nbind.BindType);_nbind.ArrayType=ArrayType;function pushString(str,policyTbl){if(str===null||str===undefined){if(policyTbl&&policyTbl["Nullable"]){str=""}else throw new Error("Type mismatch")}if(policyTbl&&policyTbl["Strict"]){if(typeof str!="string")throw new Error("Type mismatch")}else str=str.toString();var length=Module.lengthBytesUTF8(str);var result=_nbind.Pool.lalloc(4+length+1);HEAPU32[result/4]=length;Module.stringToUTF8Array(str,HEAPU8,result+4,length+1);return result}_nbind.pushString=pushString;function popString(ptr){if(ptr===0)return null;var length=HEAPU32[ptr/4];return Module.Pointer_stringify(ptr+4,length)}_nbind.popString=popString;var StringType=(function(_super){__extends(StringType,_super);function StringType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireRead=popString;_this.wireWrite=pushString;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}StringType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushString(arg,policyTbl)})});return StringType})(_nbind.BindType);_nbind.StringType=StringType;function makeArgList(argCount){return Array.apply(null,Array(argCount)).map((function(dummy,num){return"a"+(num+1)}))}function anyNeedsWireWrite(typeList,policyTbl){return typeList.reduce((function(result,type){return result||type.needsWireWrite(policyTbl)}),false)}function anyNeedsWireRead(typeList,policyTbl){return typeList.reduce((function(result,type){return result||!!type.needsWireRead(policyTbl)}),false)}function makeWireRead(convertParamList,policyTbl,type,expr){var paramNum=convertParamList.length;if(type.makeWireRead){return type.makeWireRead(expr,convertParamList,paramNum)}else if(type.wireRead){convertParamList[paramNum]=type.wireRead;return"(convertParamList["+paramNum+"]("+expr+"))"}else return expr}function makeWireWrite(convertParamList,policyTbl,type,expr){var wireWrite;var paramNum=convertParamList.length;if(type.makeWireWrite){wireWrite=type.makeWireWrite(expr,policyTbl,convertParamList,paramNum)}else wireWrite=type.wireWrite;if(wireWrite){if(typeof wireWrite=="string"){return wireWrite}else{convertParamList[paramNum]=wireWrite;return"(convertParamList["+paramNum+"]("+expr+"))"}}else return expr}function buildCallerFunction(dynCall,ptrType,ptr,num,policyTbl,needsWireWrite,prefix,returnType,argTypeList,mask,err){var argList=makeArgList(argTypeList.length);var convertParamList=[];var callExpression=makeWireRead(convertParamList,policyTbl,returnType,"dynCall("+[prefix].concat(argList.map((function(name,index){return makeWireWrite(convertParamList,policyTbl,argTypeList[index],name)}))).join(",")+")");var resourceSet=_nbind.listResources([returnType],argTypeList);var sourceCode="function("+argList.join(",")+"){"+(mask?"this.__nbindFlags&mask&&err();":"")+resourceSet.makeOpen()+"var r="+callExpression+";"+resourceSet.makeClose()+"return r;"+"}";return eval("("+sourceCode+")")}function buildJSCallerFunction(returnType,argTypeList){var argList=makeArgList(argTypeList.length);var convertParamList=[];var callExpression=makeWireWrite(convertParamList,null,returnType,"_nbind.externalList[num].data("+argList.map((function(name,index){return makeWireRead(convertParamList,null,argTypeList[index],name)})).join(",")+")");var resourceSet=_nbind.listResources(argTypeList,[returnType]);resourceSet.remove(_nbind.resources.pool);var sourceCode="function("+["dummy","num"].concat(argList).join(",")+"){"+resourceSet.makeOpen()+"var r="+callExpression+";"+resourceSet.makeClose()+"return r;"+"}";return eval("("+sourceCode+")")}_nbind.buildJSCallerFunction=buildJSCallerFunction;function makeJSCaller(idList){var argCount=idList.length-1;var typeList=_nbind.getTypes(idList,"callback");var returnType=typeList[0];var argTypeList=typeList.slice(1);var needsWireRead=anyNeedsWireRead(argTypeList,null);var needsWireWrite=returnType.needsWireWrite(null);if(!needsWireWrite&&!needsWireRead){switch(argCount){case 0:return(function(dummy,num){return _nbind.externalList[num].data()});case 1:return(function(dummy,num,a1){return _nbind.externalList[num].data(a1)});case 2:return(function(dummy,num,a1,a2){return _nbind.externalList[num].data(a1,a2)});case 3:return(function(dummy,num,a1,a2,a3){return _nbind.externalList[num].data(a1,a2,a3)});default:break}}return buildJSCallerFunction(returnType,argTypeList)}_nbind.makeJSCaller=makeJSCaller;function makeMethodCaller(ptrType,spec){var argCount=spec.typeList.length-1;var typeIdList=spec.typeList.slice(0);typeIdList.splice(1,0,"uint32_t",spec.boundID);var typeList=_nbind.getTypes(typeIdList,spec.title);var returnType=typeList[0];var argTypeList=typeList.slice(3);var needsWireRead=returnType.needsWireRead(spec.policyTbl);var needsWireWrite=anyNeedsWireWrite(argTypeList,spec.policyTbl);var ptr=spec.ptr;var num=spec.num;var dynCall=_nbind.getDynCall(typeList,spec.title);var mask=~spec.flags&1;function err(){throw new Error("Calling a non-const method on a const object")}if(!needsWireRead&&!needsWireWrite){switch(argCount){case 0:return(function(){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType))});case 1:return(function(a1){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1)});case 2:return(function(a1,a2){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1,a2)});case 3:return(function(a1,a2,a3){return this.__nbindFlags&mask?err():dynCall(ptr,num,_nbind.pushPointer(this,ptrType),a1,a2,a3)});default:break}}return buildCallerFunction(dynCall,ptrType,ptr,num,spec.policyTbl,needsWireWrite,"ptr,num,pushPointer(this,ptrType)",returnType,argTypeList,mask,err)}_nbind.makeMethodCaller=makeMethodCaller;function makeCaller(spec){var argCount=spec.typeList.length-1;var typeList=_nbind.getTypes(spec.typeList,spec.title);var returnType=typeList[0];var argTypeList=typeList.slice(1);var needsWireRead=returnType.needsWireRead(spec.policyTbl);var needsWireWrite=anyNeedsWireWrite(argTypeList,spec.policyTbl);var direct=spec.direct;var ptr=spec.ptr;if(spec.direct&&!needsWireRead&&!needsWireWrite){var dynCall_1=_nbind.getDynCall(typeList,spec.title);switch(argCount){case 0:return(function(){return dynCall_1(direct)});case 1:return(function(a1){return dynCall_1(direct,a1)});case 2:return(function(a1,a2){return dynCall_1(direct,a1,a2)});case 3:return(function(a1,a2,a3){return dynCall_1(direct,a1,a2,a3)});default:break}ptr=0}var prefix;if(ptr){var typeIdList=spec.typeList.slice(0);typeIdList.splice(1,0,"uint32_t");typeList=_nbind.getTypes(typeIdList,spec.title);prefix="ptr,num"}else{ptr=direct;prefix="ptr"}var dynCall=_nbind.getDynCall(typeList,spec.title);return buildCallerFunction(dynCall,null,ptr,spec.num,spec.policyTbl,needsWireWrite,prefix,returnType,argTypeList)}_nbind.makeCaller=makeCaller;function makeOverloader(func,arity){var callerList=[];function call(){return callerList[arguments.length].apply(this,arguments)}call.addMethod=(function(_func,_arity){callerList[_arity]=_func});call.addMethod(func,arity);return call}_nbind.makeOverloader=makeOverloader;var Resource=(function(){function Resource(open,close){var _this=this;this.makeOpen=(function(){return Object.keys(_this.openTbl).join("")});this.makeClose=(function(){return Object.keys(_this.closeTbl).join("")});this.openTbl={};this.closeTbl={};if(open)this.openTbl[open]=true;if(close)this.closeTbl[close]=true}Resource.prototype.add=(function(other){for(var _i=0,_a=Object.keys(other.openTbl);_i<_a.length;_i++){var key=_a[_i];this.openTbl[key]=true}for(var _b=0,_c=Object.keys(other.closeTbl);_b<_c.length;_b++){var key=_c[_b];this.closeTbl[key]=true}});Resource.prototype.remove=(function(other){for(var _i=0,_a=Object.keys(other.openTbl);_i<_a.length;_i++){var key=_a[_i];delete this.openTbl[key]}for(var _b=0,_c=Object.keys(other.closeTbl);_b<_c.length;_b++){var key=_c[_b];delete this.closeTbl[key]}});return Resource})();_nbind.Resource=Resource;function listResources(readList,writeList){var result=new Resource;for(var _i=0,readList_1=readList;_i<readList_1.length;_i++){var bindType=readList_1[_i];for(var _a=0,_b=bindType.readResources||[];_a<_b.length;_a++){var resource=_b[_a];result.add(resource)}}for(var _c=0,writeList_1=writeList;_c<writeList_1.length;_c++){var bindType=writeList_1[_c];for(var _d=0,_e=bindType.writeResources||[];_d<_e.length;_d++){var resource=_e[_d];result.add(resource)}}return result}_nbind.listResources=listResources;_nbind.resources={pool:new Resource("var used=HEAPU32[_nbind.Pool.usedPtr],page=HEAPU32[_nbind.Pool.pagePtr];","_nbind.Pool.lreset(used,page);")};var ExternalBuffer=(function(_super){__extends(ExternalBuffer,_super);function ExternalBuffer(buf,ptr){var _this=_super.call(this,buf)||this;_this.ptr=ptr;return _this}ExternalBuffer.prototype.free=(function(){_free(this.ptr)});return ExternalBuffer})(_nbind.External);function getBuffer(buf){if(buf instanceof ArrayBuffer){return new Uint8Array(buf)}else if(buf instanceof DataView){return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}else return buf}function pushBuffer(buf,policyTbl){if(buf===null||buf===undefined){if(policyTbl&&policyTbl["Nullable"])buf=[]}if(typeof buf!="object")throw new Error("Type mismatch");var b=buf;var length=b.byteLength||b.length;if(!length&&length!==0&&b.byteLength!==0)throw new Error("Type mismatch");var result=_nbind.Pool.lalloc(8);var data=_malloc(length);var ptr=result/4;HEAPU32[ptr++]=length;HEAPU32[ptr++]=data;HEAPU32[ptr++]=(new ExternalBuffer(buf,data)).register();HEAPU8.set(getBuffer(buf),data);return result}var BufferType=(function(_super){__extends(BufferType,_super);function BufferType(){var _this=_super!==null&&_super.apply(this,arguments)||this;_this.wireWrite=pushBuffer;_this.readResources=[_nbind.resources.pool];_this.writeResources=[_nbind.resources.pool];return _this}BufferType.prototype.makeWireWrite=(function(expr,policyTbl){return(function(arg){return pushBuffer(arg,policyTbl)})});return BufferType})(_nbind.BindType);_nbind.BufferType=BufferType;function commitBuffer(num,data,length){var buf=_nbind.externalList[num].data;var NodeBuffer=Buffer;if(typeof Buffer!="function")NodeBuffer=(function(){});if(buf instanceof Array){}else{var src=HEAPU8.subarray(data,data+length);if(buf instanceof NodeBuffer){var srcBuf=void 0;if(typeof Buffer.from=="function"&&Buffer.from.length>=3){srcBuf=Buffer.from(src)}else srcBuf=new Buffer(src);srcBuf.copy(buf)}else getBuffer(buf).set(src)}}_nbind.commitBuffer=commitBuffer;var dirtyList=[];var gcTimer=0;function sweep(){for(var _i=0,dirtyList_1=dirtyList;_i<dirtyList_1.length;_i++){var obj=dirtyList_1[_i];if(!(obj.__nbindState&(1|2))){obj.free()}}dirtyList=[];gcTimer=0}_nbind.mark=(function(obj){});function toggleLightGC(enable){if(enable){_nbind.mark=(function(obj){dirtyList.push(obj);if(!gcTimer)gcTimer=setTimeout(sweep,0)})}else{_nbind.mark=(function(obj){})}}_nbind.toggleLightGC=toggleLightGC}))(_nbind);Module["requestFullScreen"]=function Module_requestFullScreen(lockPointer,resizeCanvas,vrDevice){Browser.requestFullScreen(lockPointer,resizeCanvas,vrDevice)};Module["requestAnimationFrame"]=function Module_requestAnimationFrame(func){Browser.requestAnimationFrame(func)};Module["setCanvasSize"]=function Module_setCanvasSize(width,height,noUpdates){Browser.setCanvasSize(width,height,noUpdates)};Module["pauseMainLoop"]=function Module_pauseMainLoop(){Browser.mainLoop.pause()};Module["resumeMainLoop"]=function Module_resumeMainLoop(){Browser.mainLoop.resume()};Module["getUserMedia"]=function Module_getUserMedia(){Browser.getUserMedia()};Module["createContext"]=function Module_createContext(canvas,useWebGL,setInModule,webGLContextAttributes){return Browser.createContext(canvas,useWebGL,setInModule,webGLContextAttributes)};STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);staticSealed=true;STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=DYNAMICTOP=Runtime.alignMemory(STACK_MAX);assert(DYNAMIC_BASE<TOTAL_MEMORY,"TOTAL_MEMORY not big enough for stack");var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_DYNAMIC);function invoke_viiiii(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vid(index,a1,a2){try{Module["dynCall_vid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_fiff(index,a1,a2,a3){try{return Module["dynCall_fiff"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vi(index,a1){try{Module["dynCall_vi"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vii(index,a1,a2){try{Module["dynCall_vii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viddi(index,a1,a2,a3,a4){try{Module["dynCall_viddi"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_vidd(index,a1,a2,a3){try{Module["dynCall_vidd"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_diii(index,a1,a2,a3){try{return Module["dynCall_diii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_di(index,a1){try{return Module["dynCall_di"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iid(index,a1,a2){try{return Module["dynCall_iid"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_iii(index,a1,a2){try{return Module["dynCall_iii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiddi(index,a1,a2,a3,a4,a5){try{Module["dynCall_viiddi"](index,a1,a2,a3,a4,a5)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_dii(index,a1,a2){try{return Module["dynCall_dii"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_i(index){try{return Module["dynCall_i"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiid(index,a1,a2,a3,a4){try{Module["dynCall_viiid"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viififi(index,a1,a2,a3,a4,a5,a6){try{Module["dynCall_viififi"](index,a1,a2,a3,a4,a5,a6)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viii(index,a1,a2,a3){try{Module["dynCall_viii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_v(index){try{Module["dynCall_v"](index)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viid(index,a1,a2,a3){try{Module["dynCall_viid"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_idd(index,a1,a2){try{return Module["dynCall_idd"](index,a1,a2)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}function invoke_viiii(index,a1,a2,a3,a4){try{Module["dynCall_viiii"](index,a1,a2,a3,a4)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;asm["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"invoke_viiiii":invoke_viiiii,"invoke_vid":invoke_vid,"invoke_fiff":invoke_fiff,"invoke_vi":invoke_vi,"invoke_vii":invoke_vii,"invoke_ii":invoke_ii,"invoke_viddi":invoke_viddi,"invoke_vidd":invoke_vidd,"invoke_iiii":invoke_iiii,"invoke_diii":invoke_diii,"invoke_di":invoke_di,"invoke_iid":invoke_iid,"invoke_iii":invoke_iii,"invoke_viiddi":invoke_viiddi,"invoke_viiiiii":invoke_viiiiii,"invoke_dii":invoke_dii,"invoke_i":invoke_i,"invoke_viiid":invoke_viiid,"invoke_viififi":invoke_viififi,"invoke_viii":invoke_viii,"invoke_v":invoke_v,"invoke_viid":invoke_viid,"invoke_idd":invoke_idd,"invoke_viiii":invoke_viiii,"_pthread_cleanup_pop":_pthread_cleanup_pop,"__nbind_finish":__nbind_finish,"__nbind_reference_external":__nbind_reference_external,"_removeAccessorPrefix":_removeAccessorPrefix,"_typeModule":_typeModule,"__nbind_register_pool":__nbind_register_pool,"_atexit":_atexit,"__decorate":__decorate,"_llvm_stackrestore":_llvm_stackrestore,"___assert_fail":___assert_fail,"___cxa_allocate_exception":___cxa_allocate_exception,"__ZSt18uncaught_exceptionv":__ZSt18uncaught_exceptionv,"__extends":__extends,"_time":_time,"__nbind_get_value_object":__nbind_get_value_object,"_emscripten_set_main_loop_timing":_emscripten_set_main_loop_timing,"_fabsf":_fabsf,"_sbrk":_sbrk,"__nbind_register_type":__nbind_register_type,"_emscripten_memcpy_big":_emscripten_memcpy_big,"___resumeException":___resumeException,"___cxa_find_matching_catch":___cxa_find_matching_catch,"_sysconf":_sysconf,"___setErrNo":___setErrNo,"__nbind_register_class":__nbind_register_class,"_abort":_abort,"_nbind_value":_nbind_value,"_pthread_self":_pthread_self,"_llvm_stacksave":_llvm_stacksave,"___syscall140":___syscall140,"_floorf":_floorf,"___syscall54":___syscall54,"_defineHidden":_defineHidden,"_emscripten_set_main_loop":_emscripten_set_main_loop,"__nbind_register_callback_signature":__nbind_register_callback_signature,"__nbind_register_function":__nbind_register_function,"__nbind_free_external":__nbind_free_external,"___cxa_atexit":___cxa_atexit,"___cxa_throw":___cxa_throw,"___syscall6":___syscall6,"_pthread_cleanup_push":_pthread_cleanup_push,"__nbind_register_primitive":__nbind_register_primitive,"_emscripten_asm_const_8":_emscripten_asm_const_8,"_emscripten_asm_const_7":_emscripten_asm_const_7,"_emscripten_asm_const_6":_emscripten_asm_const_6,"_emscripten_asm_const_5":_emscripten_asm_const_5,"_emscripten_asm_const_4":_emscripten_asm_const_4,"_emscripten_asm_const_3":_emscripten_asm_const_3,"___syscall146":___syscall146,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"cttz_i8":cttz_i8,"___dso_handle":___dso_handle};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.___dso_handle|0;var o=0;var p=0;var q=0;var r=0;var s=global.NaN,t=global.Infinity;var u=0,v=0,w=0,x=0,y=0.0,z=0,A=0,B=0,C=0.0;var D=0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=global.Math.floor;var O=global.Math.abs;var P=global.Math.sqrt;var Q=global.Math.pow;var R=global.Math.cos;var S=global.Math.sin;var T=global.Math.tan;var U=global.Math.acos;var V=global.Math.asin;var W=global.Math.atan;var X=global.Math.atan2;var Y=global.Math.exp;var Z=global.Math.log;var _=global.Math.ceil;var $=global.Math.imul;var aa=global.Math.min;var ba=global.Math.clz32;var ca=global.Math.fround;var da=env.abort;var ea=env.assert;var fa=env.invoke_viiiii;var ga=env.invoke_vid;var ha=env.invoke_fiff;var ia=env.invoke_vi;var ja=env.invoke_vii;var ka=env.invoke_ii;var la=env.invoke_viddi;var ma=env.invoke_vidd;var na=env.invoke_iiii;var oa=env.invoke_diii;var pa=env.invoke_di;var qa=env.invoke_iid;var ra=env.invoke_iii;var sa=env.invoke_viiddi;var ta=env.invoke_viiiiii;var ua=env.invoke_dii;var va=env.invoke_i;var wa=env.invoke_viiid;var xa=env.invoke_viififi;var ya=env.invoke_viii;var za=env.invoke_v;var Aa=env.invoke_viid;var Ba=env.invoke_idd;var Ca=env.invoke_viiii;var Da=env._pthread_cleanup_pop;var Ea=env.__nbind_finish;var Fa=env.__nbind_reference_external;var Ga=env._removeAccessorPrefix;var Ha=env._typeModule;var Ia=env.__nbind_register_pool;var Ja=env._atexit;var Ka=env.__decorate;var La=env._llvm_stackrestore;var Ma=env.___assert_fail;var Na=env.___cxa_allocate_exception;var Oa=env.__ZSt18uncaught_exceptionv;var Pa=env.__extends;var Qa=env._time;var Ra=env.__nbind_get_value_object;var Sa=env._emscripten_set_main_loop_timing;var Ta=env._fabsf;var Ua=env._sbrk;var Va=env.__nbind_register_type;var Wa=env._emscripten_memcpy_big;var Xa=env.___resumeException;var Ya=env.___cxa_find_matching_catch;var Za=env._sysconf;var _a=env.___setErrNo;var $a=env.__nbind_register_class;var ab=env._abort;var bb=env._nbind_value;var cb=env._pthread_self;var db=env._llvm_stacksave;var eb=env.___syscall140;var fb=env._floorf;var gb=env.___syscall54;var hb=env._defineHidden;var ib=env._emscripten_set_main_loop;var jb=env.__nbind_register_callback_signature;var kb=env.__nbind_register_function;var lb=env.__nbind_free_external;var mb=env.___cxa_atexit;var nb=env.___cxa_throw;var ob=env.___syscall6;var pb=env._pthread_cleanup_push;var qb=env.__nbind_register_primitive;var rb=env._emscripten_asm_const_8;var sb=env._emscripten_asm_const_7;var tb=env._emscripten_asm_const_6;var ub=env._emscripten_asm_const_5;var vb=env._emscripten_asm_const_4;var wb=env._emscripten_asm_const_3;var xb=env.___syscall146;var yb=ca(0);const zb=ca(0);
// EMSCRIPTEN_START_FUNCS
function fe(a,b,d){a=a|0;b=b|0;d=ca(d);var e=zb,f=0,h=zb,i=0;a:do if((b&-2|0)==2){f=a+244|0;i=c[a+248>>2]|0;switch(i|0){case 1:{h=ca(g[f>>2]);e=h;break}case 2:{h=ca(g[f>>2]);e=ca(ca(h*d)/ca(100.0));break}default:break a}if(e>=ca(0.0))switch(i|0){case 2:{d=ca(ca(h*d)/ca(100.0));return ca(d)}case 1:{d=h;return ca(d)}default:{d=ca(s);return ca(d)}}}while(0);f=c[1608+(b<<2)>>2]|0;b:do if(!(c[a+204+(f<<3)+4>>2]|0)){if(b>>>0<2?(c[a+264>>2]|0)!=0:0){f=a+260|0;break}switch(f|0){case 0:case 2:case 4:case 5:{if(c[a+256>>2]|0){f=a+252|0;break b}break}default:{}}f=(c[a+272>>2]|0)==0?1552:a+268|0}else f=a+204+(f<<3)|0;while(0);switch(c[f+4>>2]|0){case 2:{e=ca(ca(ca(g[f>>2])*d)/ca(100.0));break}case 1:{e=ca(g[f>>2]);break}default:e=ca(s)}d=ca($m(e,ca(0.0)));return ca(d)}function ge(a,b,d,e){a=a|0;b=b|0;d=ca(d);e=ca(e);var f=zb;a:do if(b>>>0>=2)if((b&-2|0)==2){b=a+364|0;switch(c[a+368>>2]|0){case 2:{f=ca(ca(ca(g[b>>2])*e)/ca(100.0));break}case 1:{f=ca(g[b>>2]);break}default:f=ca(s)}b=a+380|0;switch(c[a+384>>2]|0){case 2:{e=ca(ca(ca(g[b>>2])*e)/ca(100.0));break a}case 1:{e=ca(g[b>>2]);break a}default:{e=ca(s);break a}}}else{e=ca(s);f=ca(s)}else{b=a+372|0;switch(c[a+376>>2]|0){case 2:{f=ca(ca(ca(g[b>>2])*e)/ca(100.0));break}case 1:{f=ca(g[b>>2]);break}default:f=ca(s)}b=a+388|0;switch(c[a+392>>2]|0){case 2:{e=ca(ca(ca(g[b>>2])*e)/ca(100.0));break a}case 1:{e=ca(g[b>>2]);break a}default:{e=ca(s);break a}}}while(0);a=e<d&(e>=ca(0.0)&((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0<2139095041);d=a?e:d;a=f>=ca(0.0)&((g[k>>2]=f,c[k>>2]|0)&2147483647)>>>0<2139095041&d<f;return ca(a?f:d)}function he(a){a=a|0;var b=0,d=0;b=a+400|0;a=a+944|0;c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;c[b+20>>2]=0;b=hc(c[a>>2]|0)|0;if(!b)return;else d=0;do{he(lc(c[a>>2]|0,d)|0);d=d+1|0}while((d|0)!=(b|0));return}function ie(a){a=a|0;var b=0,d=zb,e=0,f=0,h=0,j=0,l=0,m=0,n=0,o=0,p=0,q=zb;p=i;i=i+16|0;e=p;b=c[a+956>>2]|0;if(b){q=ca(g[a+904>>2]);d=ca(g[a+908>>2]);d=ca(Cb[b&0](a,q,d));if(((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040){c[e>>2]=6251;nc(0,5316,e);ab()}else{q=d;i=p;return ca(q)}}h=a+944|0;j=hc(c[h>>2]|0)|0;if(j){l=a+16|0;m=a+4|0;f=0;n=0;while(1){b=lc(c[h>>2]|0,n)|0;if(c[b+936>>2]|0){b=f;break}if((c[b+24>>2]|0)==1)b=f;else{e=c[b+20>>2]|0;if(!e)e=c[l>>2]|0;if((e|0)==5?(c[m>>2]|0)>>>0>=2:0){o=16;break}b=(f|0)==0?b:f}n=n+1|0;if(n>>>0>=j>>>0)break;else f=b}if((o|0)==16){d=ca(ie(b));o=b+404|0;q=ca(g[o>>2]);q=ca(d+q);i=p;return ca(q)}if(b){o=b;d=ca(ie(o));o=o+404|0;q=ca(g[o>>2]);q=ca(d+q);i=p;return ca(q)}}q=ca(g[a+908>>2]);i=p;return ca(q)}function je(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=i;i=i+16|0;e=f;if(b>>>0>=6){c[e>>2]=6301;nc(0,5316,e);ab()}if(c[a+(b<<3)+4>>2]|0){e=a+(b<<3)|0;i=f;return e|0}if((b&-3|0)==1?(c[a+60>>2]|0)!=0:0){e=a+56|0;i=f;return e|0}switch(b|0){case 0:case 2:case 4:case 5:{if(c[a+52>>2]|0){e=a+48|0;i=f;return e|0}break}default:{}}if(!(c[a+68>>2]|0)){e=(b&-2|0)==4?1624:d;i=f;return e|0}else{e=a+64|0;i=f;return e|0}return 0}function ke(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,j=0.0;f=i;i=i+32|0;e=f;d=c[b+4>>2]|0;if(!d){i=f;return}j=+ca(g[b>>2]);c[e>>2]=a;h[e+8>>3]=j;c[e+16>>2]=(d|0)==1?7449:7452;nc(3,7454,e);i=f;return}function le(b){b=b|0;var c=0,e=zb,f=zb,h=0,i=0;c=b+8|0;a[k>>0]=a[c>>0];a[k+1>>0]=a[c+1>>0];a[k+2>>0]=a[c+2>>0];a[k+3>>0]=a[c+3>>0];e=ca(g[k>>2]);c=b+12|0;c=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0];f=ca(g[k>>2]);h=b+4|0;if((d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24|0)!=(c|0)){b=0;return b|0}h=(c|0)==0;if(!h?!(ca(O(ca(f-e)))<ca(.0000999999974)):0){b=0;return b|0}i=b+16|0;a[k>>0]=a[i>>0];a[k+1>>0]=a[i+1>>0];a[k+2>>0]=a[i+2>>0];a[k+3>>0]=a[i+3>>0];e=ca(g[k>>2]);i=b+20|0;if((c|0)!=(d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24|0)){i=0;return i|0}if(!h?!(ca(O(ca(f-e)))<ca(.0000999999974)):0){i=0;return i|0}i=b+28|0;c=(c|0)!=(d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24|0);if(c|h){i=c^1;return i|0}i=b+24|0;a[k>>0]=a[i>>0];a[k+1>>0]=a[i+1>>0];a[k+2>>0]=a[i+2>>0];a[k+3>>0]=a[i+3>>0];i=ca(O(ca(f-ca(g[k>>2]))))<ca(.0000999999974);return i|0}function me(a,b){a=a|0;b=b|0;var d=zb,e=0,f=0;f=i;i=i+32|0;e=f;d=ca(g[b>>2]);if(((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0<=2139095040?ca(O(ca(d)))<ca(.0000999999974):0){i=f;return}b=(c[b+4>>2]|0)==1?7449:7452;c[e>>2]=a;h[e+8>>3]=+d;c[e+16>>2]=b;nc(3,7454,e);i=f;return}function ne(a,b,d){a=a|0;b=b|0;d=d|0;if(!a){a=un(c[1118]|0,b,d)|0;return a|0}else{a=vn(b,d)|0;return a|0}return 0}function oe(){var a=0,b=0;a=Am(8)|0;b=mc()|0;c[a>>2]=b;c[a+4>>2]=0;Ec(b,a);return a|0}function pe(a){a=a|0;if(a){qe(a);Cm(a)}return}function qe(a){a=a|0;var b=0;oc(c[a>>2]|0);b=a+4|0;a=c[b>>2]|0;c[b>>2]=0;if(a){b=c[a>>2]|0;if(b)lb(b|0);Cm(a)}return}function re(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=0;if(b){d=c[b>>2]|0;if(d)lb(d|0);Cm(b)}sc(c[a>>2]|0);return}function se(a,b){a=a|0;b=b|0;zc(c[a>>2]|0,c[b>>2]|0);return}function te(a,b){a=a|0;b=b|0;Qc(c[a>>2]|0,b);return}function ue(a,b,d){a=a|0;b=b|0;d=+d;ad(c[a>>2]|0,b,ca(d));return}function ve(a,b,d){a=a|0;b=b|0;d=+d;bd(c[a>>2]|0,b,ca(d));return}function we(a,b){a=a|0;b=b|0;Kc(c[a>>2]|0,b);return}function xe(a,b){a=a|0;b=b|0;Mc(c[a>>2]|0,b);return}function ye(a,b){a=a|0;b=b|0;Oc(c[a>>2]|0,b);return}function ze(a,b){a=a|0;b=b|0;Gc(c[a>>2]|0,b);return}function Ae(a,b){a=a|0;b=b|0;Sc(c[a>>2]|0,b);return}function Be(a,b){a=a|0;b=b|0;Ic(c[a>>2]|0,b);return}function Ce(a,b,d){a=a|0;b=b|0;d=+d;dd(c[a>>2]|0,b,ca(d));return}function De(a,b,d){a=a|0;b=b|0;d=+d;ed(c[a>>2]|0,b,ca(d));return}function Ee(a,b){a=a|0;b=b|0;gd(c[a>>2]|0,b);return}function Fe(a,b){a=a|0;b=b|0;Uc(c[a>>2]|0,b);return}function Ge(a,b){a=a|0;b=b|0;Wc(c[a>>2]|0,b);return}function He(a,b){a=a|0;b=+b;Dc(c[a>>2]|0,ca(b));return}function Ie(a,b){a=a|0;b=+b;_c(c[a>>2]|0,ca(b));return}function Je(a,b){a=a|0;b=+b;$c(c[a>>2]|0,ca(b));return}function Ke(a,b){a=a|0;b=+b;Yc(c[a>>2]|0,ca(b));return}function Le(a,b){a=a|0;b=+b;Zc(c[a>>2]|0,ca(b));return}function Me(a,b){a=a|0;b=+b;md(c[a>>2]|0,ca(b));return}function Ne(a,b){a=a|0;b=+b;nd(c[a>>2]|0,ca(b));return}function Oe(a){a=a|0;od(c[a>>2]|0);return}function Pe(a,b){a=a|0;b=+b;qd(c[a>>2]|0,ca(b));return}function Qe(a,b){a=a|0;b=+b;rd(c[a>>2]|0,ca(b));return}function Re(a){a=a|0;sd(c[a>>2]|0);return}function Se(a,b){a=a|0;b=+b;ud(c[a>>2]|0,ca(b));return}function Te(a,b){a=a|0;b=+b;vd(c[a>>2]|0,ca(b));return}function Ue(a,b){a=a|0;b=+b;xd(c[a>>2]|0,ca(b));return}function Ve(a,b){a=a|0;b=+b;yd(c[a>>2]|0,ca(b));return}function We(a,b){a=a|0;b=+b;Ad(c[a>>2]|0,ca(b));return}function Xe(a,b){a=a|0;b=+b;Bd(c[a>>2]|0,ca(b));return}function Ye(a,b){a=a|0;b=+b;Dd(c[a>>2]|0,ca(b));return}function Ze(a,b){a=a|0;b=+b;Ed(c[a>>2]|0,ca(b));return}function _e(a,b){a=a|0;b=+b;Gd(c[a>>2]|0,ca(b));return}function $e(a,b,d){a=a|0;b=b|0;d=+d;kd(c[a>>2]|0,b,ca(d));return}function af(a,b,d){a=a|0;b=b|0;d=+d;hd(c[a>>2]|0,b,ca(d));return}function bf(a,b,d){a=a|0;b=b|0;d=+d;id(c[a>>2]|0,b,ca(d));return}function cf(a){a=a|0;return Rc(c[a>>2]|0)|0}function df(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,j=0;e=i;i=i+16|0;j=e;cd(j,c[b>>2]|0,d);f=+ca(g[j>>2]);c[a>>2]=c[j+4>>2];h[a+8>>3]=f;i=e;return}function ef(a){a=a|0;return Lc(c[a>>2]|0)|0}function ff(a){a=a|0;return Nc(c[a>>2]|0)|0}function gf(a){a=a|0;return Pc(c[a>>2]|0)|0}function hf(a){a=a|0;return Hc(c[a>>2]|0)|0}function jf(a){a=a|0;return Tc(c[a>>2]|0)|0}function kf(a){a=a|0;return Jc(c[a>>2]|0)|0}function lf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,j=0;e=i;i=i+16|0;j=e;fd(j,c[b>>2]|0,d);f=+ca(g[j>>2]);c[a>>2]=c[j+4>>2];h[a+8>>3]=f;i=e;return}function mf(a){a=a|0;return Vc(c[a>>2]|0)|0}function nf(a){a=a|0;return Xc(c[a>>2]|0)|0}function of(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;Cc(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function pf(a){a=a|0;return +(+ca(Ac(c[a>>2]|0)))}function qf(a){a=a|0;return +(+ca(Bc(c[a>>2]|0)))}function rf(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;pd(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function sf(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;td(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function tf(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;wd(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function uf(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;zd(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function vf(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;Cd(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function wf(a,b){a=a|0;b=b|0;var d=0,e=0.0,f=0;d=i;i=i+16|0;f=d;Fd(f,c[b>>2]|0);e=+ca(g[f>>2]);c[a>>2]=c[f+4>>2];h[a+8>>3]=e;i=d;return}function xf(a){a=a|0;return +(+ca(Hd(c[a>>2]|0)))}function yf(a,b){a=a|0;b=b|0;return +(+ca(ld(c[a>>2]|0,b)))}function zf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0.0,j=0;e=i;i=i+16|0;j=e;jd(j,c[b>>2]|0,d);f=+ca(g[j>>2]);c[a>>2]=c[j+4>>2];h[a+8>>3]=f;i=e;return}function Af(a,b,d){a=a|0;b=b|0;d=d|0;vc(c[a>>2]|0,c[b>>2]|0,d);return}function Bf(a,b){a=a|0;b=b|0;rc(c[a>>2]|0,c[b>>2]|0);return}function Cf(a){a=a|0;return pc(c[a>>2]|0)|0}function Df(a){a=a|0;a=wc(c[a>>2]|0)|0;if(!a)a=0;else a=Fc(a)|0;return a|0}function Ef(a,b){a=a|0;b=b|0;b=qc(c[a>>2]|0,b)|0;if(!b)b=0;else b=Fc(b)|0;return b|0}function Ff(a,b){a=a|0;b=b|0;var d=0,e=0;e=Am(4)|0;d=c[b>>2]|0;c[e>>2]=d;Fa(d|0);d=a+4|0;b=c[d>>2]|0;c[d>>2]=e;if(b){d=c[b>>2]|0;if(d)lb(d|0);Cm(b)}uc(c[a>>2]|0,1);return}function Gf(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=0;if(b){d=c[b>>2]|0;if(d)lb(d|0);Cm(b)}uc(c[a>>2]|0,0);return}function Hf(a,b,d,e,f,g){a=a|0;b=b|0;d=+d;e=e|0;f=+f;g=g|0;var h=0,j=0;h=i;i=i+16|0;j=h;b=c[b+4>>2]|0;pl(j);Wf(a,c[b>>2]|0,d,e,f,g);ql(j);i=h;return}function If(a){a=a|0;xc(c[a>>2]|0);return}function Jf(a){a=a|0;return yc(c[a>>2]|0)|0}function Kf(a,b,d,e){a=a|0;b=+b;d=+d;e=e|0;Td(c[a>>2]|0,ca(b),ca(d),e);return}function Lf(a){a=a|0;return +(+ca(Id(c[a>>2]|0)))}function Mf(a){a=a|0;return +(+ca(Kd(c[a>>2]|0)))}function Nf(a){a=a|0;return +(+ca(Jd(c[a>>2]|0)))}function Of(a){a=a|0;return +(+ca(Ld(c[a>>2]|0)))}function Pf(a){a=a|0;return +(+ca(Md(c[a>>2]|0)))}function Qf(a){a=a|0;return +(+ca(Nd(c[a>>2]|0)))}function Rf(a,b){a=a|0;b=b|0;h[a>>3]=+ca(Id(c[b>>2]|0));h[a+8>>3]=+ca(Kd(c[b>>2]|0));h[a+16>>3]=+ca(Jd(c[b>>2]|0));h[a+24>>3]=+ca(Ld(c[b>>2]|0));h[a+32>>3]=+ca(Md(c[b>>2]|0));h[a+40>>3]=+ca(Nd(c[b>>2]|0));return}function Sf(a,b){a=a|0;b=b|0;return +(+ca(Od(c[a>>2]|0,b)))}function Tf(a,b){a=a|0;b=b|0;return +(+ca(Pd(c[a>>2]|0,b)))}function Uf(a,b){a=a|0;b=b|0;return +(+ca(Qd(c[a>>2]|0,b)))}function Vf(a,b,c,d,e,f){a=a|0;b=b|0;c=ca(c);d=d|0;e=ca(e);f=f|0;var j=0,k=0;j=i;i=i+16|0;k=j;Hf(k,Fc(b)|0,+c,d,+e,f);g[a>>2]=ca(+h[k>>3]);g[a+4>>2]=ca(+h[k+8>>3]);i=j;return}function Wf(b,d,e,f,g,h){b=b|0;d=d|0;e=+e;f=f|0;g=+g;h=h|0;var j=0,k=0;k=i;i=i+32|0;j=k;Xf()|0;f=tb(0,c[414]|0,d|0,+e,f|0,+g,h|0)|0;if(!(f&1)){j=f;c[b>>2]=c[j>>2];c[b+4>>2]=c[j+4>>2];c[b+8>>2]=c[j+8>>2];c[b+12>>2]=c[j+12>>2]}else{c[j>>2]=0;c[j+8>>2]=0;d=j+24|0;a[d>>0]=0;Ra(f|0,j|0)|0;j=j+8|0;c[b>>2]=c[j>>2];c[b+4>>2]=c[j+4>>2];c[b+8>>2]=c[j+8>>2];c[b+12>>2]=c[j+12>>2];a[d>>0]=0}i=k;return}function Xf(){var b=0;if(!(a[8]|0)){c[412]=1660;c[413]=4;c[414]=jb(1660,5)|0;b=8;c[b>>2]=1;c[b+4>>2]=0}return 1648}function Yf(a,b){a=a|0;b=b|0;Vd(a,b);return}function Zf(a){a=a|0;return Ud(a)|0}function _f(){return tc()|0}function $f(){var a=0;a=ag(1,0)|0;bg()|0;pk(7468,1,a,1680,0);a=cg(4,0)|0;dg()|0;pk(7498,4,a,1716,0);a=eg(1,0)|0;fg()|0;pk(7527,1,a,1752,0);gg(1788);hg(1792);ig(1796);jg(1800);return}function ag(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;bg()|0;b=b|4;c[f>>2]=b;d=c[427]|0;if(d>>>0<(c[428]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[427]=b}else{ik(1704,e,f);b=c[427]|0}i=g;return (b-(c[426]|0)>>3)+-1|0}function bg(){var b=0;if(!(a[304]|0)){c[420]=0;c[421]=1;c[422]=1840;c[423]=3324;c[424]=2;c[426]=0;c[427]=0;c[428]=0;mb(25,1680,n|0)|0;b=304;c[b>>2]=1;c[b+4>>2]=0}return 1680}function cg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;dg()|0;b=b|4;c[f>>2]=b;d=c[436]|0;if(d>>>0<(c[437]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[436]=b}else{ek(1740,e,f);b=c[436]|0}i=g;return (b-(c[435]|0)>>3)+-1|0}function dg(){var b=0;if(!(a[296]|0)){c[429]=0;c[430]=3;c[431]=1840;c[432]=3316;c[433]=1;c[435]=0;c[436]=0;c[437]=0;mb(26,1716,n|0)|0;b=296;c[b>>2]=1;c[b+4>>2]=0}return 1716}function eg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;fg()|0;b=b|4;c[f>>2]=b;d=c[445]|0;if(d>>>0<(c[446]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[445]=b}else{ak(1776,e,f);b=c[445]|0}i=g;return (b-(c[444]|0)>>3)+-1|0}function fg(){var b=0;if(!(a[288]|0)){c[438]=0;c[439]=5;c[440]=1840;c[441]=2232;c[442]=0;c[444]=0;c[445]=0;c[446]=0;mb(27,1752,n|0)|0;b=288;c[b>>2]=1;c[b+4>>2]=0}return 1752}function gg(a){a=a|0;var b=0,d=0,e=0,f=0;Jj(a,8722);d=c[a>>2]|0;Kj()|0;d=d+28|0;b=c[d>>2]|0;f=Am(24)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=3148;c[f+20>>2]=0;e=b;c[f>>2]=c[e>>2];c[b>>2]=f;c[d>>2]=c[e>>2];a=c[a>>2]|0;Lj()|0;a=a+28|0;d=c[a>>2]|0;e=Am(24)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=3184;c[e+20>>2]=0;b=d;c[e>>2]=c[b>>2];c[d>>2]=e;c[a>>2]=c[b>>2];return}function hg(a){a=a|0;var b=0,d=0,e=0;Cj(a,8715);a=c[a>>2]|0;Dj()|0;a=a+28|0;d=c[a>>2]|0;e=Am(24)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=3100;c[e+20>>2]=0;b=d;c[e>>2]=c[b>>2];c[d>>2]=e;c[a>>2]=c[b>>2];return}function ig(a){a=a|0;var b=0,d=0,e=0,f=0;qj(a,8709);d=c[a>>2]|0;rj()|0;d=d+28|0;b=c[d>>2]|0;f=Am(24)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=2992;c[f+20>>2]=0;e=b;c[f>>2]=c[e>>2];c[b>>2]=f;c[d>>2]=c[e>>2];a=c[a>>2]|0;sj()|0;a=a+28|0;d=c[a>>2]|0;e=Am(24)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=3028;c[e+20>>2]=0;b=d;c[e>>2]=c[b>>2];c[d>>2]=e;c[a>>2]=c[b>>2];return}function jg(a){a=a|0;var b=0,d=0,e=0;b=i;i=i+16|0;d=b+8|0;e=b;kg(a,7544);lg(a,7549,2,0);mg(a,7556,28,0);c[e>>2]=29;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ng(a,7564,d,0);c[e>>2]=2;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];og(a,7570,d,0);c[e>>2]=3;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7580,d,0);c[e>>2]=1;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,7596,d,0);c[e>>2]=2;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,7608,d,0);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7627,d,0);c[e>>2]=5;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7643,d,0);c[e>>2]=6;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7657,d,0);c[e>>2]=7;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7670,d,0);c[e>>2]=8;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7687,d,0);c[e>>2]=9;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7699,d,0);c[e>>2]=3;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,7717,d,0);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,7727,d,0);c[e>>2]=10;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7744,d,0);c[e>>2]=11;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7758,d,0);c[e>>2]=12;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];pg(a,7770,d,0);c[e>>2]=1;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7781,d,0);c[e>>2]=2;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7789,d,0);c[e>>2]=3;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7802,d,0);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7822,d,0);c[e>>2]=5;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7834,d,0);c[e>>2]=6;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7848,d,0);c[e>>2]=7;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7857,d,0);c[e>>2]=30;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ng(a,7873,d,0);c[e>>2]=8;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7886,d,0);c[e>>2]=9;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7896,d,0);c[e>>2]=31;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ng(a,7913,d,0);c[e>>2]=10;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7927,d,0);c[e>>2]=11;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7939,d,0);c[e>>2]=12;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7958,d,0);c[e>>2]=13;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7971,d,0);c[e>>2]=14;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,7991,d,0);c[e>>2]=15;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,8003,d,0);c[e>>2]=16;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,8022,d,0);c[e>>2]=17;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,8035,d,0);c[e>>2]=18;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];rg(a,8055,d,0);c[e>>2]=5;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,8070,d,0);c[e>>2]=6;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,8080,d,0);c[e>>2]=7;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];qg(a,8091,d,0);c[e>>2]=6;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8109,d,1);c[e>>2]=2;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];tg(a,8125,d,1);c[e>>2]=7;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8137,d,1);c[e>>2]=8;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8153,d,1);c[e>>2]=9;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8167,d,1);c[e>>2]=10;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8180,d,1);c[e>>2]=11;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8197,d,1);c[e>>2]=12;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8209,d,1);c[e>>2]=3;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];tg(a,8227,d,1);c[e>>2]=13;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8237,d,1);c[e>>2]=1;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8250,d,1);c[e>>2]=2;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8262,d,1);c[e>>2]=14;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8276,d,1);c[e>>2]=15;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8285,d,1);c[e>>2]=16;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8295,d,1);c[e>>2]=17;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8307,d,1);c[e>>2]=18;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8320,d,1);c[e>>2]=19;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ug(a,8332,d,1);c[e>>2]=3;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8345,d,1);c[e>>2]=1;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];wg(a,8360,d,1);c[e>>2]=13;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8370,d,1);c[e>>2]=14;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];sg(a,8382,d,1);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];tg(a,8393,d,1);c[e>>2]=5;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];xg(a,8404,d,0);c[e>>2]=20;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];yg(a,8416,d,0);c[e>>2]=15;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];zg(a,8428,d,1);c[e>>2]=16;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];Ag(a,8442,d,0);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];Bg(a,8452,d,0);c[e>>2]=21;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];Cg(a,8461,d,0);c[e>>2]=32;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ng(a,8476,d,0);c[e>>2]=33;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];ng(a,8493,d,0);c[e>>2]=17;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];Dg(a,8503,d,1);c[e>>2]=1;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];Eg(a,8511,d,0);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8527,d,1);c[e>>2]=5;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8543,d,1);c[e>>2]=6;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8560,d,1);c[e>>2]=7;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8575,d,1);c[e>>2]=8;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8593,d,1);c[e>>2]=9;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];vg(a,8610,d,1);c[e>>2]=22;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];Fg(a,8628,d,1);c[e>>2]=2;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];wg(a,8646,d,1);c[e>>2]=3;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];wg(a,8664,d,1);c[e>>2]=4;c[e+4>>2]=0;c[d>>2]=c[e>>2];c[d+4>>2]=c[e+4>>2];wg(a,8682,d,1);i=b;return}function kg(b,d){b=b|0;d=d|0;oj()|0;c[b>>2]=2940;c[735]=8707;c[736]=2148;c[738]=d;if(!(a[216]|0)){c[746]=0;c[747]=0;d=216;c[d>>2]=1;c[d+4>>2]=0}c[737]=2984;c[743]=3;ok(c[b>>2]|0);return}function lg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;ij()|0;h=jj(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=2904;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function mg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;cj()|0;h=dj(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=2868;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function ng(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Yi()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Zi(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2828;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function og(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Si()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Ti(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2768;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function pg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Mi()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Ni(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2724;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function qg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Gi()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Hi(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2676;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function rg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Ai()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Bi(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2632;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function sg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;ui()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=vi(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2592;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function tg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;ni()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=oi(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2548;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function ug(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;ai()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=bi(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2412;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function vg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Wh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Xh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2372;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function wg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Qh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Rh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2328;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function xg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Kh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Lh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2280;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function yg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Eh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Fh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2236;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function zg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;yh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=zh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2196;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Ag(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;sh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=th(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2156;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Bg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;mh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=nh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2104;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Cg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;fh()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=gh(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2052;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Dg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;$g()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=ah(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=2012;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Eg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Vg()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Wg(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=1960;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Fg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+16|0;h=f+8|0;g=f;j=c[d>>2]|0;d=c[d+4>>2]|0;a=c[a>>2]|0;Gg()|0;c[g>>2]=j;c[g+4>>2]=d;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];h=Hg(h,e)|0;a=a+28|0;d=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=0;c[g+12>>2]=h;c[g+16>>2]=1804;c[g+20>>2]=e;b=d;c[g>>2]=c[b>>2];c[d>>2]=g;c[a>>2]=c[b>>2];i=f;return}function Gg(){var b=0;if(!(a[16]|0)){c[451]=1;c[452]=5;c[453]=1840;c[454]=1844;c[455]=0;c[457]=0;c[458]=0;c[459]=0;mb(34,1804,n|0)|0;b=16;c[b>>2]=1;c[b+4>>2]=0}return 1804}function Hg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Gg()|0;a=b|4;c[f>>2]=a;b=c[458]|0;if(b>>>0<(c[459]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[458]=a}else{Ig(1828,e,f);a=c[458]|0}i=h;return ((a-(c[457]|0)|0)/12|0)+-1|0}function Ig(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Jg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+16|0;e=d+8|0;f=d;Gg()|0;g=(c[457]|0)+(a*12|0)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=Mg(b,e)|0;i=d;return b|0}function Kg(a){a=a|0;Lg(a+24|0);return}function Lg(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Mg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;f=i;i=i+48|0;e=f;d=c[b>>2]|0;g=c[b+4>>2]|0;b=a+(g>>1)|0;if(g&1)d=c[(c[b>>2]|0)+d>>2]|0;Eb[d&31](e,b);g=Ng(e)|0;i=f;return g|0}function Ng(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;d=h;Og()|0;b=c[471]|0;if(!b){e=jl(8)|0;b=e;f=Am(48)|0;g=f;d=a;a=g+48|0;do{c[g>>2]=c[d>>2];g=g+4|0;d=d+4|0}while((g|0)<(a|0));a=b+4|0;c[a>>2]=f;g=Am(8)|0;a=c[a>>2]|0;c[g>>2]=a;f=Am(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=1900;c[f+12>>2]=a;c[g+4>>2]=f;c[e>>2]=g}else{c[d>>2]=b;g=d+4|0;c[g>>2]=d;c[d+8>>2]=0;c[d+8>>2]=Pg(b,a,a+8|0,a+16|0,a+24|0,a+32|0,a+40|0)|0;b=c[(c[g>>2]|0)+8>>2]|0}i=h;return b|0}function Og(){var b=0;if(!(a[32]|0)){c[466]=0;c[467]=0;c[468]=0;c[469]=1872;c[471]=0;a[1888]=0;a[1889]=0;mb(35,1848,n|0)|0;b=32;c[b>>2]=1;c[b+4>>2]=0}return 1848}function Pg(a,b,d,e,f,g,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;var k=0,l=0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0;k=i;i=i+16|0;l=k;pl(l);a=c[a>>2]|0;r=+h[b>>3];q=+h[d>>3];p=+h[e>>3];o=+h[f>>3];n=+h[g>>3];m=+h[j>>3];Tg()|0;a=rb(0,c[482]|0,a|0,+r,+q,+p,+o,+n,+m)|0;ql(l);i=k;return a|0}function Qg(a){a=a|0;Kn(a);Cm(a);return}function Rg(a){a=a|0;a=c[a+12>>2]|0;if(a)Cm(a);return}function Sg(a){a=a|0;Cm(a);return}function Tg(){var b=0;if(!(a[24]|0)){c[480]=1932;c[481]=6;c[482]=jb(1932,7)|0;b=24;c[b>>2]=1;c[b+4>>2]=0}return 1920}function Ug(a){a=a|0;var b=0,d=0,e=0;d=a+24|0;b=c[d>>2]|0;if(b)do{e=b;b=c[b>>2]|0;Cm(e)}while((b|0)!=0);c[d>>2]=0;d=a+16|0;b=c[d>>2]|0;if(b)do{e=b;b=c[b>>2]|0;Cm(e)}while((b|0)!=0);c[d>>2]=0;return}function Vg(){var b=0;if(!(a[40]|0)){c[490]=1;c[491]=1;c[492]=1840;c[493]=1996;c[494]=3;c[496]=0;c[497]=0;c[498]=0;mb(36,1960,n|0)|0;b=40;c[b>>2]=1;c[b+4>>2]=0}return 1960}function Wg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Vg()|0;a=b|4;c[f>>2]=a;b=c[497]|0;if(b>>>0<(c[498]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[497]=a}else{Xg(1984,e,f);a=c[497]|0}i=h;return ((a-(c[496]|0)|0)/12|0)+-1|0}function Xg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Yg(a,b,d,e,f){a=a|0;b=b|0;d=+d;e=+e;f=f|0;var g=0;Vg()|0;g=(c[496]|0)+(a*12|0)|0;a=c[g>>2]|0;g=c[g+4>>2]|0;b=b+(g>>1)|0;if(g&1)a=c[(c[b>>2]|0)+a>>2]|0;Gb[a&1](b,d,e,f);return}function Zg(a){a=a|0;_g(a+24|0);return}function _g(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function $g(){var b=0;if(!(a[48]|0)){c[503]=1;c[504]=6;c[505]=1840;c[506]=2048;c[507]=0;c[509]=0;c[510]=0;c[511]=0;mb(37,2012,n|0)|0;b=48;c[b>>2]=1;c[b+4>>2]=0}return 2012}function ah(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;$g()|0;a=b|4;c[f>>2]=a;b=c[510]|0;if(b>>>0<(c[511]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[510]=a}else{bh(2036,e,f);a=c[510]|0}i=h;return ((a-(c[509]|0)|0)/12|0)+-1|0}function bh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function ch(a,b){a=a|0;b=b|0;var d=0;$g()|0;d=(c[509]|0)+(a*12|0)|0;a=c[d>>2]|0;d=c[d+4>>2]|0;b=b+(d>>1)|0;if(d&1)a=c[(c[b>>2]|0)+a>>2]|0;return (Fb[a&31](b)|0)&1|0}function dh(a){a=a|0;eh(a+24|0);return}function eh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function fh(){var b=0;if(!(a[56]|0)){c[513]=1;c[514]=6;c[515]=1840;c[516]=2088;c[517]=1;c[519]=0;c[520]=0;c[521]=0;mb(38,2052,n|0)|0;b=56;c[b>>2]=1;c[b+4>>2]=0}return 2052}function gh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;fh()|0;a=b|4;c[f>>2]=a;b=c[520]|0;if(b>>>0<(c[521]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[520]=a}else{hh(2076,e,f);a=c[520]|0}i=h;return ((a-(c[519]|0)|0)/12|0)+-1|0}function hh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function ih(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+16|0;f=e+8|0;g=e;fh()|0;h=(c[519]|0)+(a*12|0)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];lh(b,f,d);i=e;return}function jh(a){a=a|0;kh(a+24|0);return}function kh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function lh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;g=i;i=i+16|0;f=g;e=c[b>>2]|0;h=c[b+4>>2]|0;b=a+(h>>1)|0;if(h&1)e=c[(c[b>>2]|0)+e>>2]|0;c[f>>2]=d;Eb[e&31](b,f);e=c[f>>2]|0;if(e)lb(e|0);i=g;return}function mh(){var b=0;if(!(a[64]|0)){c[526]=1;c[527]=6;c[528]=1840;c[529]=2140;c[530]=1;c[532]=0;c[533]=0;c[534]=0;mb(39,2104,n|0)|0;b=64;c[b>>2]=1;c[b+4>>2]=0}return 2104}function nh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;mh()|0;a=b|4;c[f>>2]=a;b=c[533]|0;if(b>>>0<(c[534]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[533]=a}else{oh(2128,e,f);a=c[533]|0}i=h;return ((a-(c[532]|0)|0)/12|0)+-1|0}function oh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function ph(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;mh()|0;e=(c[532]|0)+(a*12|0)|0;a=c[e>>2]|0;e=c[e+4>>2]|0;b=b+(e>>1)|0;if(e&1)a=c[(c[b>>2]|0)+a>>2]|0;return Mb[a&15](b,d)|0}function qh(a){a=a|0;rh(a+24|0);return}function rh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function sh(){var b=0;if(!(a[72]|0)){c[539]=1;c[540]=7;c[541]=1840;c[542]=2192;c[543]=0;c[545]=0;c[546]=0;c[547]=0;mb(40,2156,n|0)|0;b=72;c[b>>2]=1;c[b+4>>2]=0}return 2156}function th(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;sh()|0;a=b|4;c[f>>2]=a;b=c[546]|0;if(b>>>0<(c[547]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[546]=a}else{uh(2180,e,f);a=c[546]|0}i=h;return ((a-(c[545]|0)|0)/12|0)+-1|0}function uh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function vh(a,b){a=a|0;b=b|0;var d=0;sh()|0;d=(c[545]|0)+(a*12|0)|0;a=c[d>>2]|0;d=c[d+4>>2]|0;b=b+(d>>1)|0;if(d&1)a=c[(c[b>>2]|0)+a>>2]|0;return Fb[a&31](b)|0}function wh(a){a=a|0;xh(a+24|0);return}function xh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function yh(){var b=0;if(!(a[80]|0)){c[549]=1;c[550]=8;c[551]=1840;c[552]=2232;c[553]=0;c[555]=0;c[556]=0;c[557]=0;mb(41,2196,n|0)|0;b=80;c[b>>2]=1;c[b+4>>2]=0}return 2196}function zh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;yh()|0;a=b|4;c[f>>2]=a;b=c[556]|0;if(b>>>0<(c[557]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[556]=a}else{Ah(2220,e,f);a=c[556]|0}i=h;return ((a-(c[555]|0)|0)/12|0)+-1|0}function Ah(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Bh(a,b){a=a|0;b=b|0;var d=0;yh()|0;d=(c[555]|0)+(a*12|0)|0;a=c[d>>2]|0;d=c[d+4>>2]|0;b=b+(d>>1)|0;if(d&1)a=c[(c[b>>2]|0)+a>>2]|0;return Fb[a&31](b)|0}function Ch(a){a=a|0;Dh(a+24|0);return}function Dh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Eh(){var b=0;if(!(a[88]|0)){c[559]=1;c[560]=7;c[561]=1840;c[562]=2272;c[563]=1;c[565]=0;c[566]=0;c[567]=0;mb(42,2236,n|0)|0;b=88;c[b>>2]=1;c[b+4>>2]=0}return 2236}function Fh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Eh()|0;a=b|4;c[f>>2]=a;b=c[566]|0;if(b>>>0<(c[567]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[566]=a}else{Gh(2260,e,f);a=c[566]|0}i=h;return ((a-(c[565]|0)|0)/12|0)+-1|0}function Gh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Hh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;Eh()|0;e=(c[565]|0)+(a*12|0)|0;a=c[e>>2]|0;e=c[e+4>>2]|0;b=b+(e>>1)|0;if(e&1)a=c[(c[b>>2]|0)+a>>2]|0;Eb[a&31](b,d);return}function Ih(a){a=a|0;Jh(a+24|0);return}function Jh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Kh(){var b=0;if(!(a[96]|0)){c[570]=1;c[571]=4;c[572]=1840;c[573]=2316;c[574]=2;c[576]=0;c[577]=0;c[578]=0;mb(43,2280,n|0)|0;b=96;c[b>>2]=1;c[b+4>>2]=0}return 2280}function Lh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Kh()|0;a=b|4;c[f>>2]=a;b=c[577]|0;if(b>>>0<(c[578]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[577]=a}else{Mh(2304,e,f);a=c[577]|0}i=h;return ((a-(c[576]|0)|0)/12|0)+-1|0}function Mh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Nh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;Kh()|0;f=(c[576]|0)+(a*12|0)|0;a=c[f>>2]|0;f=c[f+4>>2]|0;b=b+(f>>1)|0;if(f&1)a=c[(c[b>>2]|0)+a>>2]|0;Tb[a&15](b,d,e);return}function Oh(a){a=a|0;Ph(a+24|0);return}function Ph(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Qh(){var b=0;if(!(a[104]|0)){c[582]=1;c[583]=1;c[584]=1840;c[585]=2364;c[586]=1;c[588]=0;c[589]=0;c[590]=0;mb(44,2328,n|0)|0;b=104;c[b>>2]=1;c[b+4>>2]=0}return 2328}function Rh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Qh()|0;a=b|4;c[f>>2]=a;b=c[589]|0;if(b>>>0<(c[590]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[589]=a}else{Sh(2352,e,f);a=c[589]|0}i=h;return ((a-(c[588]|0)|0)/12|0)+-1|0}function Sh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Th(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;Qh()|0;e=(c[588]|0)+(a*12|0)|0;a=c[e>>2]|0;e=c[e+4>>2]|0;b=b+(e>>1)|0;if(e&1)a=c[(c[b>>2]|0)+a>>2]|0;return +(+Pb[a&7](b,d))}function Uh(a){a=a|0;Vh(a+24|0);return}function Vh(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Wh(){var b=0;if(!(a[112]|0)){c[593]=1;c[594]=5;c[595]=1840;c[596]=2408;c[597]=0;c[599]=0;c[600]=0;c[601]=0;mb(45,2372,n|0)|0;b=112;c[b>>2]=1;c[b+4>>2]=0}return 2372}function Xh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Wh()|0;a=b|4;c[f>>2]=a;b=c[600]|0;if(b>>>0<(c[601]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[600]=a}else{Yh(2396,e,f);a=c[600]|0}i=h;return ((a-(c[599]|0)|0)/12|0)+-1|0}function Yh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Zh(a,b){a=a|0;b=b|0;var d=0;Wh()|0;d=(c[599]|0)+(a*12|0)|0;a=c[d>>2]|0;d=c[d+4>>2]|0;b=b+(d>>1)|0;if(d&1)a=c[(c[b>>2]|0)+a>>2]|0;return +(+Kb[a&15](b))}function _h(a){a=a|0;$h(a+24|0);return}function $h(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function ai(){var b=0;if(!(a[120]|0)){c[603]=1;c[604]=9;c[605]=1840;c[606]=2448;c[607]=0;c[609]=0;c[610]=0;c[611]=0;mb(46,2412,n|0)|0;b=120;c[b>>2]=1;c[b+4>>2]=0}return 2412}function bi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;ai()|0;a=b|4;c[f>>2]=a;b=c[610]|0;if(b>>>0<(c[611]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[610]=a}else{ci(2436,e,f);a=c[610]|0}i=h;return ((a-(c[609]|0)|0)/12|0)+-1|0}function ci(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function di(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;i=i+16|0;e=d+8|0;f=d;ai()|0;g=(c[609]|0)+(a*12|0)|0;a=c[g+4>>2]|0;c[f>>2]=c[g>>2];c[f+4>>2]=a;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];b=gi(b,e)|0;i=d;return b|0}function ei(a){a=a|0;fi(a+24|0);return}function fi(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function gi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;g=i;i=i+32|0;f=g+16|0;e=g;d=c[b>>2]|0;h=c[b+4>>2]|0;b=a+(h>>1)|0;if(h&1)d=c[(c[b>>2]|0)+d>>2]|0;Eb[d&31](e,b);hi()|0;d=c[622]|0;if(!d){h=jl(8)|0;d=h;f=Am(16)|0;c[f>>2]=c[e>>2];c[f+4>>2]=c[e+4>>2];c[f+8>>2]=c[e+8>>2];c[f+12>>2]=c[e+12>>2];a=d+4|0;c[a>>2]=f;f=Am(8)|0;a=c[a>>2]|0;c[f>>2]=a;e=Am(16)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=2504;c[e+12>>2]=a;c[f+4>>2]=e;c[h>>2]=f}else{c[f>>2]=d;h=f+4|0;c[h>>2]=f;f=f+8|0;c[f>>2]=0;c[f>>2]=ii(d,e,e+8|0)|0;d=c[(c[h>>2]|0)+8>>2]|0}i=g;return d|0}function hi(){var b=0;if(!(a[136]|0)){c[617]=0;c[618]=0;c[619]=0;c[620]=2476;c[622]=0;a[2492]=0;a[2493]=0;mb(35,2452,n|0)|0;b=136;c[b>>2]=1;c[b+4>>2]=0}return 2452}function ii(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0,j=0;e=i;i=i+16|0;f=e;pl(f);j=c[a>>2]|0;a=c[b>>2]|0;g=+h[d>>3];mi()|0;a=vb(0,c[633]|0,j|0,a|0,+g)|0;ql(f);i=e;return a|0}function ji(a){a=a|0;Kn(a);Cm(a);return}function ki(a){a=a|0;a=c[a+12>>2]|0;if(a)Cm(a);return}function li(a){a=a|0;Cm(a);return}function mi(){var b=0;if(!(a[128]|0)){c[631]=2536;c[632]=2;c[633]=jb(2536,3)|0;b=128;c[b>>2]=1;c[b+4>>2]=0}return 2524}function ni(){var b=0;if(!(a[144]|0)){c[637]=1;c[638]=7;c[639]=1840;c[640]=2584;c[641]=1;c[643]=0;c[644]=0;c[645]=0;mb(47,2548,n|0)|0;b=144;c[b>>2]=1;c[b+4>>2]=0}return 2548}function oi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;ni()|0;a=b|4;c[f>>2]=a;b=c[644]|0;if(b>>>0<(c[645]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[644]=a}else{pi(2572,e,f);a=c[644]|0}i=h;return ((a-(c[643]|0)|0)/12|0)+-1|0}function pi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function qi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=i;i=i+16|0;f=e+8|0;g=e;ni()|0;h=(c[643]|0)+(a*12|0)|0;a=c[h+4>>2]|0;c[g>>2]=c[h>>2];c[g+4>>2]=a;c[f>>2]=c[g>>2];c[f+4>>2]=c[g+4>>2];b=ti(b,f,d)|0;i=e;return b|0}function ri(a){a=a|0;si(a+24|0);return}function si(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function ti(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;h=i;i=i+32|0;g=h+16|0;f=h;e=c[b>>2]|0;j=c[b+4>>2]|0;b=a+(j>>1)|0;if(j&1)e=c[(c[b>>2]|0)+e>>2]|0;Tb[e&15](f,b,d);hi()|0;e=c[622]|0;if(!e){j=jl(8)|0;e=j;g=Am(16)|0;c[g>>2]=c[f>>2];c[g+4>>2]=c[f+4>>2];c[g+8>>2]=c[f+8>>2];c[g+12>>2]=c[f+12>>2];d=e+4|0;c[d>>2]=g;g=Am(8)|0;d=c[d>>2]|0;c[g>>2]=d;f=Am(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=2504;c[f+12>>2]=d;c[g+4>>2]=f;c[j>>2]=g}else{c[g>>2]=e;j=g+4|0;c[j>>2]=g;g=g+8|0;c[g>>2]=0;c[g>>2]=ii(e,f,f+8|0)|0;e=c[(c[j>>2]|0)+8>>2]|0}i=h;return e|0}function ui(){var b=0;if(!(a[152]|0)){c[648]=1;c[649]=10;c[650]=1840;c[651]=2628;c[652]=0;c[654]=0;c[655]=0;c[656]=0;mb(48,2592,n|0)|0;b=152;c[b>>2]=1;c[b+4>>2]=0}return 2592}function vi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;ui()|0;a=b|4;c[f>>2]=a;b=c[655]|0;if(b>>>0<(c[656]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[655]=a}else{wi(2616,e,f);a=c[655]|0}i=h;return ((a-(c[654]|0)|0)/12|0)+-1|0}function wi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function xi(a,b){a=a|0;b=b|0;var d=0;ui()|0;d=(c[654]|0)+(a*12|0)|0;a=c[d>>2]|0;d=c[d+4>>2]|0;b=b+(d>>1)|0;if(d&1)a=c[(c[b>>2]|0)+a>>2]|0;return Fb[a&31](b)|0}function yi(a){a=a|0;zi(a+24|0);return}function zi(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Ai(){var b=0;if(!(a[160]|0)){c[658]=1;c[659]=8;c[660]=1840;c[661]=2668;c[662]=1;c[664]=0;c[665]=0;c[666]=0;mb(49,2632,n|0)|0;b=160;c[b>>2]=1;c[b+4>>2]=0}return 2632}function Bi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Ai()|0;a=b|4;c[f>>2]=a;b=c[665]|0;if(b>>>0<(c[666]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[665]=a}else{Ci(2656,e,f);a=c[665]|0}i=h;return ((a-(c[664]|0)|0)/12|0)+-1|0}function Ci(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Di(a,b,d){a=a|0;b=b|0;d=+d;var e=0;Ai()|0;e=(c[664]|0)+(a*12|0)|0;a=c[e>>2]|0;e=c[e+4>>2]|0;b=b+(e>>1)|0;if(e&1)a=c[(c[b>>2]|0)+a>>2]|0;Bb[a&31](b,d);return}function Ei(a){a=a|0;Fi(a+24|0);return}function Fi(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Gi(){var b=0;if(!(a[168]|0)){c[669]=1;c[670]=1;c[671]=1840;c[672]=2712;c[673]=2;c[675]=0;c[676]=0;c[677]=0;mb(50,2676,n|0)|0;b=168;c[b>>2]=1;c[b+4>>2]=0}return 2676}function Hi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Gi()|0;a=b|4;c[f>>2]=a;b=c[676]|0;if(b>>>0<(c[677]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[676]=a}else{Ii(2700,e,f);a=c[676]|0}i=h;return ((a-(c[675]|0)|0)/12|0)+-1|0}function Ii(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Ji(a,b,d,e){a=a|0;b=b|0;d=d|0;e=+e;var f=0;Gi()|0;f=(c[675]|0)+(a*12|0)|0;a=c[f>>2]|0;f=c[f+4>>2]|0;b=b+(f>>1)|0;if(f&1)a=c[(c[b>>2]|0)+a>>2]|0;Vb[a&15](b,d,e);return}function Ki(a){a=a|0;Li(a+24|0);return}function Li(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Mi(){var b=0;if(!(a[176]|0)){c[681]=1;c[682]=8;c[683]=1840;c[684]=2760;c[685]=1;c[687]=0;c[688]=0;c[689]=0;mb(51,2724,n|0)|0;b=176;c[b>>2]=1;c[b+4>>2]=0}return 2724}function Ni(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Mi()|0;a=b|4;c[f>>2]=a;b=c[688]|0;if(b>>>0<(c[689]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[688]=a}else{Oi(2748,e,f);a=c[688]|0}i=h;return ((a-(c[687]|0)|0)/12|0)+-1|0}function Oi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Pi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;Mi()|0;e=(c[687]|0)+(a*12|0)|0;a=c[e>>2]|0;e=c[e+4>>2]|0;b=b+(e>>1)|0;if(e&1)a=c[(c[b>>2]|0)+a>>2]|0;Eb[a&31](b,d);return}function Qi(a){a=a|0;Ri(a+24|0);return}function Ri(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Si(){var b=0;if(!(a[184]|0)){c[692]=1;c[693]=9;c[694]=1840;c[695]=2804;c[696]=1;c[698]=0;c[699]=0;c[700]=0;mb(52,2768,n|0)|0;b=184;c[b>>2]=1;c[b+4>>2]=0}return 2768}function Ti(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Si()|0;a=b|4;c[f>>2]=a;b=c[699]|0;if(b>>>0<(c[700]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[699]=a}else{Ui(2792,e,f);a=c[699]|0}i=h;return ((a-(c[698]|0)|0)/12|0)+-1|0}function Ui(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function Vi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;Si()|0;e=(c[698]|0)+(a*12|0)|0;a=c[e>>2]|0;e=c[e+4>>2]|0;b=b+(e>>1)|0;if(e&1)a=c[(c[b>>2]|0)+a>>2]|0;Eb[a&31](b,d);return}function Wi(a){a=a|0;Xi(a+24|0);return}function Xi(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function Yi(){var b=0;if(!(a[192]|0)){c[707]=1;c[708]=23;c[709]=1840;c[710]=2864;c[711]=0;c[713]=0;c[714]=0;c[715]=0;mb(53,2828,n|0)|0;b=192;c[b>>2]=1;c[b+4>>2]=0}return 2828}function Zi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;h=i;i=i+16|0;e=h+8|0;f=h;g=c[a>>2]|0;d=c[a+4>>2]|0;c[e>>2]=g;c[e+4>>2]=d;Yi()|0;a=b|4;c[f>>2]=a;b=c[714]|0;if(b>>>0<(c[715]|0)>>>0){c[b>>2]=g;c[b+4>>2]=d;c[b+8>>2]=a;a=b+12|0;c[714]=a}else{_i(2852,e,f);a=c[714]|0}i=h;return ((a-(c[713]|0)|0)/12|0)+-1|0}function _i(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=a+4|0;i=c[a>>2]|0;j=i;f=(((c[g>>2]|0)-j|0)/12|0)+1|0;if(f>>>0>357913941)zm(a);k=a+8|0;h=i;e=((c[k>>2]|0)-h|0)/12|0;if(e>>>0<178956970){e=e<<1;e=e>>>0<f>>>0?f:e}else e=357913941;l=(c[g>>2]|0)-h|0;f=(l|0)/12|0;h=Am(e*12|0)|0;n=c[b+4>>2]|0;d=c[d>>2]|0;m=h+(f*12|0)|0;c[m>>2]=c[b>>2];c[m+4>>2]=n;c[h+(f*12|0)+8>>2]=d;d=h+((((l|0)/-12|0)+f|0)*12|0)|0;Vn(d|0,i|0,l|0)|0;c[a>>2]=d;c[g>>2]=h+((f+1|0)*12|0);c[k>>2]=h+(e*12|0);if(j)Cm(j);return}function $i(a,b){a=a|0;b=b|0;var d=0;Yi()|0;d=(c[713]|0)+(a*12|0)|0;a=c[d>>2]|0;d=c[d+4>>2]|0;b=b+(d>>1)|0;if(d&1)a=c[(c[b>>2]|0)+a>>2]|0;Db[a&127](b);return}function aj(a){a=a|0;bj(a+24|0);return}function bj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~(((b+-12-e|0)>>>0)/12|0)*12|0);Cm(d)}return}function cj(){var b=0;if(!(a[200]|0)){c[717]=0;c[718]=24;c[719]=1840;c[720]=2272;c[721]=1;c[723]=0;c[724]=0;c[725]=0;mb(54,2868,n|0)|0;b=200;c[b>>2]=1;c[b+4>>2]=0}return 2868}function dj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;cj()|0;b=b|4;c[f>>2]=b;d=c[724]|0;if(d>>>0<(c[725]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[724]=b}else{ej(2892,e,f);b=c[724]|0}i=g;return (b-(c[723]|0)>>3)+-1|0}function ej(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function fj(a,b){a=a|0;b=b|0;cj()|0;Db[c[(c[2892>>2]|0)+(a<<3)>>2]&127](b);return}function gj(a){a=a|0;hj(a+24|0);return}function hj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function ij(){var b=0;if(!(a[208]|0)){c[726]=0;c[727]=18;c[728]=1840;c[729]=2192;c[730]=0;c[732]=0;c[733]=0;c[734]=0;mb(55,2904,n|0)|0;b=208;c[b>>2]=1;c[b+4>>2]=0}return 2904}function jj(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;ij()|0;b=b|4;c[f>>2]=b;d=c[733]|0;if(d>>>0<(c[734]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[733]=b}else{kj(2928,e,f);b=c[733]|0}i=g;return (b-(c[732]|0)>>3)+-1|0}function kj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function lj(a){a=a|0;ij()|0;return Qb[c[(c[2928>>2]|0)+(a<<3)>>2]&7]()|0}function mj(a){a=a|0;nj(a+24|0);return}function nj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function oj(){var b=0;if(!(a[224]|0)){c[739]=0;c[740]=0;c[741]=0;c[742]=2964;c[744]=0;a[2980]=0;a[2981]=0;mb(35,2940,n|0)|0;b=224;c[b>>2]=1;c[b+4>>2]=0}return 2940}function pj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b){qe(b);Cm(b)}return}function qj(b,d){b=b|0;d=d|0;hi()|0;c[b>>2]=2452;c[613]=8708;c[614]=3076;c[616]=d;if(!(a[248]|0)){c[773]=c[772];c[774]=0;d=248;c[d>>2]=1;c[d+4>>2]=0}c[615]=3092;c[621]=5;ok(c[b>>2]|0);return}function rj(){var b=0;if(!(a[240]|0)){c[748]=4;c[749]=3;c[750]=1840;c[751]=3084;c[752]=0;c[754]=0;c[755]=0;c[756]=0;c[753]=56;mb(57,2992,n|0)|0;b=240;c[b>>2]=1;c[b+4>>2]=0}return 2992}function sj(){var b=0;if(!(a[232]|0)){c[757]=4;c[758]=1;c[759]=1840;c[760]=3064;c[761]=2;c[763]=0;c[764]=0;c[765]=0;c[762]=9;mb(58,3028,n|0)|0;b=232;c[b>>2]=1;c[b+4>>2]=0}return 3028}function tj(a,b){a=a|0;b=+b;var d=0,e=0,f=0,g=0;e=jl(8)|0;d=e;f=Am(16)|0;c[f>>2]=a;h[f+8>>3]=b;g=d+4|0;c[g>>2]=f;a=Am(8)|0;g=c[g>>2]|0;c[a>>2]=g;f=Am(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=2504;c[f+12>>2]=g;c[a+4>>2]=f;c[e>>2]=a;return d|0}function uj(b,d,e){b=b|0;d=d|0;e=+e;c[b+8>>2]=d;h[b+16>>3]=e;a[b+24>>0]=1;return}function vj(a){a=a|0;wj(a+24|0);return}function wj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function xj(){var a=0,b=0,d=0,e=0,f=0;b=jl(8)|0;a=b;d=Am(16)|0;c[d>>2]=0;h[d+8>>3]=0.0;f=a+4|0;c[f>>2]=d;d=Am(8)|0;f=c[f>>2]|0;c[d>>2]=f;e=Am(16)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=2504;c[e+12>>2]=f;c[d+4>>2]=e;c[b>>2]=d;return a|0}function yj(b){b=b|0;c[b+8>>2]=0;h[b+16>>3]=0.0;a[b+24>>0]=1;return}function zj(a){a=a|0;Aj(a+24|0);return}function Aj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function Bj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b)Cm(b);return}function Cj(b,d){b=b|0;d=d|0;Og()|0;c[b>>2]=1848;c[462]=8701;c[463]=3140;c[465]=d;if(!(a[248]|0)){c[773]=c[772];c[774]=0;d=248;c[d>>2]=1;c[d+4>>2]=0}c[464]=3092;c[470]=6;ok(c[b>>2]|0);return}function Dj(){var b=0;if(!(a[256]|0)){c[775]=4;c[776]=4;c[777]=1840;c[778]=3136;c[779]=0;c[781]=0;c[782]=0;c[783]=0;c[780]=59;mb(60,3100,n|0)|0;b=256;c[b>>2]=1;c[b+4>>2]=0}return 3100}function Ej(){var a=0,b=0,d=0,e=0,f=0;a=jl(8)|0;b=a;d=Am(48)|0;e=d;f=e+48|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));e=b+4|0;c[e>>2]=d;f=Am(8)|0;d=c[e>>2]|0;c[f>>2]=d;e=Am(16)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=1900;c[e+12>>2]=d;c[f+4>>2]=e;c[a>>2]=f;return b|0}function Fj(b){b=b|0;var d=0,e=0;d=b+8|0;e=d+48|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));a[b+56>>0]=1;return}function Gj(a){a=a|0;Hj(a+24|0);return}function Hj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function Ij(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b)Cm(b);return}function Jj(b,d){b=b|0;d=d|0;Xj()|0;c[b>>2]=3272;c[818]=7465;c[819]=3232;c[821]=d;if(!(a[248]|0)){c[773]=c[772];c[774]=0;d=248;c[d>>2]=1;c[d+4>>2]=0}c[820]=3092;c[826]=7;ok(c[b>>2]|0);return}function Kj(){var b=0;if(!(a[272]|0)){c[787]=4;c[788]=5;c[789]=1840;c[790]=3268;c[791]=0;c[793]=0;c[794]=0;c[795]=0;c[792]=61;mb(62,3148,n|0)|0;b=272;c[b>>2]=1;c[b+4>>2]=0}return 3148}function Lj(){var b=0;if(!(a[264]|0)){c[796]=4;c[797]=1;c[798]=1840;c[799]=3220;c[800]=2;c[802]=0;c[803]=0;c[804]=0;c[801]=1;mb(63,3184,n|0)|0;b=264;c[b>>2]=1;c[b+4>>2]=0}return 3184}function Mj(a,b){a=+a;b=+b;var d=0,e=0,f=0,g=0,i=0;e=jl(8)|0;d=e;f=Am(16)|0;h[f>>3]=a;h[f+8>>3]=b;i=d+4|0;c[i>>2]=f;f=Am(8)|0;i=c[i>>2]|0;c[f>>2]=i;g=Am(16)|0;c[g+4>>2]=0;c[g+8>>2]=0;c[g>>2]=3248;c[g+12>>2]=i;c[f+4>>2]=g;c[e>>2]=f;return d|0}function Nj(b,c,d){b=b|0;c=+c;d=+d;h[b+8>>3]=c;h[b+16>>3]=d;a[b+24>>0]=1;return}function Oj(a){a=a|0;Pj(a+24|0);return}function Pj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function Qj(a){a=a|0;Kn(a);Cm(a);return}function Rj(a){a=a|0;a=c[a+12>>2]|0;if(a)Cm(a);return}function Sj(a){a=a|0;Cm(a);return}function Tj(){var a=0,b=0,d=0,e=0,f=0;b=jl(8)|0;a=b;d=Am(16)|0;c[d>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;c[d+12>>2]=0;f=a+4|0;c[f>>2]=d;d=Am(8)|0;f=c[f>>2]|0;c[d>>2]=f;e=Am(16)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=3248;c[e+12>>2]=f;c[d+4>>2]=e;c[b>>2]=d;return a|0}function Uj(b){b=b|0;var d=0;d=b+8|0;c[d>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;c[d+12>>2]=0;a[b+24>>0]=1;return}function Vj(a){a=a|0;Wj(a+24|0);return}function Wj(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function Xj(){var b=0;if(!(a[280]|0)){c[822]=0;c[823]=0;c[824]=0;c[825]=3296;c[827]=0;a[3312]=0;a[3313]=0;mb(35,3272,n|0)|0;b=280;c[b>>2]=1;c[b+4>>2]=0}return 3272}function Yj(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b)Cm(b);return}function Zj(a){a=a|0;fg()|0;return Qb[c[(c[1776>>2]|0)+(a<<3)>>2]&7]()|0}function _j(a){a=a|0;$j(a+24|0);return}function $j(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function ak(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function bk(a,b){a=a|0;b=b|0;dg()|0;return (Fb[c[(c[1740>>2]|0)+(a<<3)>>2]&31](b)|0)&1|0}function ck(a){a=a|0;dk(a+24|0);return}function dk(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function ek(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function fk(a,b,d){a=a|0;b=b|0;d=d|0;bg()|0;Eb[c[(c[1704>>2]|0)+(a<<3)>>2]&31](b,(d|0)!=0);return}function gk(a){a=a|0;hk(a+24|0);return}function hk(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function ik(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function jk(b,d){b=b|0;d=d|0;var e=0,f=0;if(!(a[8727]|0)){c[834]=0;mb(64,3336,n|0)|0;a[8727]=1}e=c[834]|0;a:do if(e){f=e;while(1){e=c[f+4>>2]|0;if((e|0)!=0?(yn(c[e+12>>2]|0,b)|0)==0:0)break;f=c[f>>2]|0;if(!f)break a}sk(e,d)}while(0);return}function kk(){if(!(a[8727]|0)){c[834]=0;mb(64,3336,n|0)|0;a[8727]=1}return 3336}function lk(){if(!(a[8728]|0)){c[835]=0;mb(65,3340,n|0)|0;a[8728]=1}return 3340}function mk(){var b=0;if(!(a[8729]|0)){if(!(a[8730]|0)){a[8731]=8;a[8732]=0;a[8733]=16;a[8734]=8;a[8735]=0;a[8736]=8;a[8737]=0;a[8738]=8;a[8739]=0;a[8740]=8;a[8741]=0;a[8742]=32;a[8743]=32;a[8730]=1}c[836]=3348;a[8729]=1;b=3348}else b=c[836]|0;return b|0}function nk(){return 3360}function ok(b){b=b|0;var d=0;if(!(a[8727]|0)){c[834]=0;mb(64,3336,n|0)|0;a[8727]=1}d=Am(8)|0;c[d+4>>2]=b;c[d>>2]=c[834];c[834]=d;return}function pk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;if(!(a[8728]|0)){c[835]=0;mb(65,3340,n|0)|0;a[8728]=1}h=Am(24)|0;c[h+4>>2]=b;c[h+8>>2]=d;c[h+12>>2]=e;c[h+16>>2]=f;c[h+20>>2]=g;c[h>>2]=c[835];c[835]=h;return}function qk(){uk(3492,8840);return}function rk(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b)do{d=b;b=c[b>>2]|0;Cm(d)}while((b|0)!=0);c[a>>2]=0;return}function sk(a,b){a=a|0;b=b|0;var d=0,e=0;a=a+36|0;d=c[a>>2]|0;if(d){e=c[d>>2]|0;if(e)lb(e|0);Cm(d)}e=Am(4)|0;b=c[b>>2]|0;c[e>>2]=b;Fa(b|0);c[a>>2]=e;return}function tk(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;if(b)do{d=b;b=c[b>>2]|0;Cm(d)}while((b|0)!=0);c[a>>2]=0;return}function uk(b,d){b=b|0;d=d|0;vk()|0;c[b>>2]=3496;c[874]=8846;c[875]=3540;c[877]=d;if(!(a[216]|0)){c[746]=0;c[747]=0;d=216;c[d>>2]=1;c[d+4>>2]=0}c[876]=2984;c[882]=8;ok(c[b>>2]|0);return}function vk(){var b=0;if(!(a[312]|0)){c[878]=0;c[879]=0;c[880]=0;c[881]=3520;c[883]=0;a[3536]=0;a[3537]=0;mb(35,3496,n|0)|0;b=312;c[b>>2]=1;c[b+4>>2]=0}return 3496}function wk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b)Cm(b);return}function xk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;v=i;i=i+48|0;u=v+24|0;q=v+20|0;t=v+8|0;r=v+4|0;s=v;b=c[b>>2]|0;if(b){m=u+4|0;n=u+8|0;o=t+4|0;p=t+8|0;k=t+8|0;l=u+8|0;do{h=b;j=c[h+16>>2]|0;if(j){f=c[j+12>>2]|0;c[u>>2]=0;c[m>>2]=0;c[n>>2]=0;e=(c[j+16>>2]|0)+1|0;Ak(u,e);if(e)while(1){e=e+-1|0;ll(q,c[f>>2]|0);g=c[m>>2]|0;if(g>>>0<(c[l>>2]|0)>>>0){c[g>>2]=c[q>>2];c[m>>2]=(c[m>>2]|0)+4}else Bk(u,q);if(!e)break;else f=f+4|0}e=c[j+8>>2]|0;c[t>>2]=0;c[o>>2]=0;c[p>>2]=0;a:do if(c[e>>2]|0){f=0;g=0;while(1){if((f|0)==(g|0))Ck(t,e);else{c[f>>2]=c[e>>2];c[o>>2]=(c[o>>2]|0)+4}e=e+4|0;if(!(c[e>>2]|0))break a;f=c[o>>2]|0;g=c[k>>2]|0}}while(0);c[r>>2]=c[h+4>>2];c[s>>2]=c[j>>2];Dk(d,a,r,s,u,t);e=c[t>>2]|0;f=e;if(e){g=c[o>>2]|0;if((g|0)!=(e|0))c[o>>2]=g+(~((g+-4-f|0)>>>2)<<2);Cm(e)}e=c[u>>2]|0;f=e;if(e){g=c[m>>2]|0;if((g|0)!=(e|0))c[m>>2]=g+(~((g+-4-f|0)>>>2)<<2);Cm(e)}}b=c[b>>2]|0}while((b|0)!=0)}i=v;return}function yk(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=i;i=i+64|0;r=x+52|0;l=x+48|0;m=x+44|0;n=x+40|0;q=x+36|0;o=x+32|0;p=x+28|0;u=x+24|0;v=x+20|0;w=x+8|0;s=x+4|0;t=x;j=mk()|0;h=c[j>>2]|0;g=c[h>>2]|0;if(g){k=c[j+8>>2]|0;j=c[j+4>>2]|0;while(1){ll(l,g);Ek(a,l,j,k);h=h+4|0;g=c[h>>2]|0;if(!g)break;else{k=k+1|0;j=j+1|0}}}h=nk()|0;g=c[h>>2]|0;if(g)do{ll(m,g);c[n>>2]=c[h+4>>2];Fk(b,m,n);h=h+8|0;g=c[h>>2]|0}while((g|0)!=0);g=c[(kk()|0)>>2]|0;if(g)do{b=c[g+4>>2]|0;ll(q,c[b>>2]|0);c[o>>2]=c[b+12>>2];Gk(d,q,o);g=c[g>>2]|0}while((g|0)!=0);ll(p,0);g=lk()|0;c[r>>2]=c[p>>2];xk(r,g,f);g=c[(kk()|0)>>2]|0;if(g){a=w+4|0;m=w+8|0;n=w+8|0;do{l=c[g+4>>2]|0;ll(u,c[l>>2]|0);Hk(v,l+16|0);h=c[v>>2]|0;if(h){c[w>>2]=0;c[a>>2]=0;c[m>>2]=0;do{ll(s,c[c[h+4>>2]>>2]|0);j=c[a>>2]|0;if(j>>>0<(c[n>>2]|0)>>>0){c[j>>2]=c[s>>2];c[a>>2]=(c[a>>2]|0)+4}else Bk(w,s);h=c[h>>2]|0}while((h|0)!=0);Ik(e,u,w);h=c[w>>2]|0;j=h;if(h){k=c[a>>2]|0;if((k|0)!=(h|0))c[a>>2]=k+(~((k+-4-j|0)>>>2)<<2);Cm(h)}}c[t>>2]=c[u>>2];c[r>>2]=c[t>>2];xk(r,l+24|0,f);h=c[v>>2]|0;if(h)do{d=h;h=c[h>>2]|0;Cm(d)}while((h|0)!=0);c[v>>2]=0;g=c[g>>2]|0}while((g|0)!=0)}i=x;return}function zk(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=i;i=i+32|0;o=q+16|0;e=q+31|0;f=q+30|0;g=q+12|0;l=q+8|0;m=q+29|0;n=q+4|0;h=q+28|0;j=q;k=nl(b)|0;c[o>>2]=0;p=o+4|0;c[p>>2]=0;c[o+8>>2]=0;switch(k<<24>>24){case 0:{a[e>>0]=0;h=Jk(d,e)|0;break}case 8:{h=ml(b)|0;a[f>>0]=8;ll(g,c[h+4>>2]|0);h=Kk(d,f,g,h+8|0)|0;break}case 9:{h=ml(b)|0;e=c[h+4>>2]|0;if(e){j=o+8|0;g=h+12|0;while(1){e=e+-1|0;ll(l,c[g>>2]|0);f=c[p>>2]|0;if(f>>>0<(c[j>>2]|0)>>>0){c[f>>2]=c[l>>2];c[p>>2]=(c[p>>2]|0)+4}else Bk(o,l);if(!e)break;else g=g+4|0}}a[m>>0]=9;ll(n,c[h+8>>2]|0);h=Lk(d,m,n,o)|0;break}default:{n=ml(b)|0;a[h>>0]=k;ll(j,c[n+4>>2]|0);h=Mk(d,h,j)|0}}e=c[o>>2]|0;f=e;if(e){g=c[p>>2]|0;if((g|0)!=(e|0))c[p>>2]=g+(~((g+-4-f|0)>>>2)<<2);Cm(e)}i=q;return h|0}function Ak(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;f=a+8|0;g=c[a>>2]|0;d=g;if((c[f>>2]|0)-d>>2>>>0<b>>>0){h=a+4|0;d=(c[h>>2]|0)-d|0;if(!b)e=0;else e=Am(b<<2)|0;Vn(e|0,g|0,d|0)|0;c[a>>2]=e;c[h>>2]=e+(d>>2<<2);c[f>>2]=e+(b<<2);if(g)Cm(g)}return}function Bk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;i=a+4|0;j=c[a>>2]|0;k=j;e=((c[i>>2]|0)-k>>2)+1|0;if(e>>>0>1073741823)zm(a);l=a+8|0;f=j;d=(c[l>>2]|0)-f|0;if(d>>2>>>0<536870911){d=d>>1;d=d>>>0<e>>>0?e:d;f=(c[i>>2]|0)-f|0;e=f>>2;if(!d){h=0;g=0;d=f}else m=6}else{f=(c[i>>2]|0)-f|0;d=1073741823;e=f>>2;m=6}if((m|0)==6){h=d;g=Am(d<<2)|0;d=f}c[g+(e<<2)>>2]=c[b>>2];Vn(g|0,j|0,d|0)|0;c[a>>2]=g;c[i>>2]=g+(e+1<<2);c[l>>2]=g+(h<<2);if(k)Cm(k);return}function Ck(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;i=a+4|0;j=c[a>>2]|0;k=j;e=((c[i>>2]|0)-k>>2)+1|0;if(e>>>0>1073741823)zm(a);l=a+8|0;f=j;d=(c[l>>2]|0)-f|0;if(d>>2>>>0<536870911){d=d>>1;d=d>>>0<e>>>0?e:d;f=(c[i>>2]|0)-f|0;e=f>>2;if(!d){h=0;g=0;d=f}else m=6}else{f=(c[i>>2]|0)-f|0;d=1073741823;e=f>>2;m=6}if((m|0)==6){h=d;g=Am(d<<2)|0;d=f}c[g+(e<<2)>>2]=c[b>>2];Vn(g|0,j|0,d|0)|0;c[a>>2]=g;c[i>>2]=g+(e+1<<2);c[l>>2]=g+(h<<2);if(k)Cm(k);return}function Dk(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;l=i;i=i+48|0;m=l+40|0;k=l+32|0;o=l+24|0;j=l+12|0;h=l;pl(k);n=c[a>>2]|0;c[o>>2]=c[b>>2];a=c[d>>2]|0;e=c[e>>2]|0;Uk(j,f);fl(h,g);c[m>>2]=c[o>>2];gl(n,m,a,e,j,h);e=c[h>>2]|0;f=e;if(e){b=h+4|0;d=c[b>>2]|0;if((d|0)!=(e|0))c[b>>2]=d+(~((d+-4-f|0)>>>2)<<2);Cm(e)}e=c[j>>2]|0;f=e;if(e){b=j+4|0;d=c[b>>2]|0;if((d|0)!=(e|0))c[b>>2]=d+(~((d+-4-f|0)>>>2)<<2);Cm(e)}ql(k);i=l;return}function Ek(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+32|0;j=g+16|0;h=g+8|0;l=g;pl(h);k=c[b>>2]|0;c[l>>2]=c[d>>2];e=a[e>>0]|0;b=a[f>>0]|0;c[j>>2]=c[l>>2];dl(k,j,e,b);ql(h);i=g;return}function Fk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+32|0;g=e+16|0;f=e+8|0;j=e;pl(f);h=c[a>>2]|0;c[j>>2]=c[b>>2];a=c[d>>2]|0;c[g>>2]=c[j>>2];bl(h,g,a);ql(f);i=e;return}function Gk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+32|0;g=e+16|0;f=e+8|0;j=e;pl(f);h=c[a>>2]|0;c[j>>2]=c[b>>2];a=c[d>>2]|0;c[g>>2]=c[j>>2];bl(h,g,a);ql(f);i=e;return}function Hk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;c[a>>2]=0;b=c[b>>2]|0;if(b){f=Am(12)|0;g=b+4|0;d=c[g+4>>2]|0;e=f+4|0;c[e>>2]=c[g>>2];c[e+4>>2]=d;b=c[b>>2]|0;if(!b)b=f;else{e=f;while(1){d=Am(12)|0;i=b+4|0;h=c[i+4>>2]|0;g=d+4|0;c[g>>2]=c[i>>2];c[g+4>>2]=h;c[e>>2]=d;b=c[b>>2]|0;if(!b){b=d;break}else e=d}}c[b>>2]=0;c[a>>2]=f}return}function Ik(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;h=i;i=i+32|0;e=h+24|0;g=h+16|0;j=h+12|0;f=h;pl(g);a=c[a>>2]|0;c[j>>2]=c[b>>2];Uk(f,d);c[e>>2]=c[j>>2];$k(a,e,f);a=c[f>>2]|0;e=a;if(a){b=f+4|0;d=c[b>>2]|0;if((d|0)!=(a|0))c[b>>2]=d+(~((d+-4-e|0)>>>2)<<2);Cm(a)}ql(g);i=h;return}function Jk(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+16|0;f=e;pl(f);g=c[b>>2]|0;b=a[d>>0]|0;_k()|0;b=wb(0,c[929]|0,g|0,b&255|0)|0;ql(f);i=e;return b|0}function Kk(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+32|0;j=g+16|0;h=g+8|0;l=g;pl(h);k=c[b>>2]|0;d=a[d>>0]|0;c[l>>2]=c[e>>2];b=c[f>>2]|0;c[j>>2]=c[l>>2];b=Yk(k,d,j,b)|0;ql(h);i=g;return b|0}function Lk(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;k=i;i=i+32|0;g=k+24|0;j=k+16|0;m=k+12|0;h=k;pl(j);l=c[b>>2]|0;b=a[d>>0]|0;c[m>>2]=c[e>>2];Uk(h,f);c[g>>2]=c[m>>2];f=Vk(l,b,g,h)|0;b=c[h>>2]|0;g=b;if(b){e=h+4|0;d=c[e>>2]|0;if((d|0)!=(b|0))c[e>>2]=d+(~((d+-4-g|0)>>>2)<<2);Cm(b)}ql(j);i=k;return f|0}function Mk(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+32|0;h=f+16|0;g=f+8|0;k=f;pl(g);j=c[b>>2]|0;b=a[d>>0]|0;c[k>>2]=c[e>>2];c[h>>2]=c[k>>2];b=Nk(j,b,h)|0;ql(g);i=f;return b|0}function Nk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+16|0;f=e;Ok()|0;g=c[889]|0;c[f>>2]=c[d>>2];a=vb(0,g|0,a|0,b&255|0,Pk(f)|0)|0;i=e;return a|0}function Ok(){var b=0;if(!(a[328]|0)){c[887]=3632;c[888]=2;c[889]=jb(3632,3)|0;b=328;c[b>>2]=1;c[b+4>>2]=0}return 3548}function Pk(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;f=i;i=i+32|0;e=f+12|0;b=f;Qk()|0;d=c[899]|0;if(!d){e=jl(8)|0;b=e;d=Am(4)|0;c[d>>2]=c[a>>2];g=b+4|0;c[g>>2]=d;a=Am(8)|0;g=c[g>>2]|0;c[a>>2]=g;d=Am(16)|0;c[d+4>>2]=0;c[d+8>>2]=0;c[d>>2]=3612;c[d+12>>2]=g;c[a+4>>2]=d;c[e>>2]=a}else{c[e>>2]=d;g=e+4|0;c[g>>2]=e;c[e+8>>2]=0;c[b>>2]=d;c[b+4>>2]=e;c[b+8>>2]=0;ol(a,b);b=c[(c[g>>2]|0)+8>>2]|0}i=f;return b|0}function Qk(){var b=0;if(!(a[320]|0)){c[894]=0;c[895]=0;c[896]=0;c[897]=3584;c[899]=0;a[3600]=0;a[3601]=0;mb(35,3560,n|0)|0;b=320;c[b>>2]=1;c[b+4>>2]=0}return 3560}function Rk(a){a=a|0;Kn(a);Cm(a);return}function Sk(a){a=a|0;a=c[a+12>>2]|0;if(a)Cm(a);return}function Tk(a){a=a|0;Cm(a);return}function Uk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;c[a>>2]=0;g=a+4|0;c[g>>2]=0;c[a+8>>2]=0;e=b+4|0;f=(c[e>>2]|0)-(c[b>>2]|0)>>2;if((f|0)!=0?(Xk(a,f),d=c[b>>2]|0,h=c[e>>2]|0,(d|0)!=(h|0)):0){e=c[g>>2]|0;do{c[e>>2]=c[d>>2];e=(c[g>>2]|0)+4|0;c[g>>2]=e;d=d+4|0}while((d|0)!=(h|0))}return}function Vk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;l=i;i=i+16|0;g=l;Wk()|0;k=c[913]|0;h=b&255;c[g>>2]=c[d>>2];g=Pk(g)|0;j=c[e>>2]|0;b=e+4|0;d=c[b>>2]|0;c[e+8>>2]=0;c[b>>2]=0;c[e>>2]=0;e=j;d=d-j|0;b=d>>2;d=jl(d+4|0)|0;c[d>>2]=b;if(b){f=0;do{c[d+4+(f<<2)>>2]=Pk(e+(f<<2)|0)|0;f=f+1|0}while((f|0)!=(b|0))}b=ub(0,k|0,a|0,h|0,g|0,d|0)|0;if(j)Cm(j);i=l;return b|0}function Wk(){var b=0;if(!(a[336]|0)){c[911]=3656;c[912]=3;c[913]=jb(3656,4)|0;b=336;c[b>>2]=1;c[b+4>>2]=0}return 3644}function Xk(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>1073741823)zm(a);else{d=Am(b<<2)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+(b<<2);return}}function Yk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f;Zk()|0;h=c[922]|0;c[g>>2]=c[d>>2];a=ub(0,h|0,a|0,b&255|0,Pk(g)|0,e|0)|0;i=f;return a|0}function Zk(){var b=0;if(!(a[344]|0)){c[920]=3692;c[921]=3;c[922]=jb(3692,4)|0;b=344;c[b>>2]=1;c[b+4>>2]=0}return 3680}function _k(){var b=0;if(!(a[352]|0)){c[927]=3720;c[928]=1;c[929]=jb(3720,2)|0;b=352;c[b>>2]=1;c[b+4>>2]=0}return 3708}function $k(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;k=i;i=i+16|0;g=k;al()|0;j=c[934]|0;c[g>>2]=c[b>>2];g=Pk(g)|0;h=c[d>>2]|0;e=d+4|0;b=c[e>>2]|0;c[d+8>>2]=0;c[e>>2]=0;c[d>>2]=0;e=h;d=b-h|0;b=d>>2;d=jl(d+4|0)|0;c[d>>2]=b;if(b){f=0;do{c[d+4+(f<<2)>>2]=Pk(e+(f<<2)|0)|0;f=f+1|0}while((f|0)!=(b|0))}vb(0,j|0,a|0,g|0,d|0)|0;if(h)Cm(h);i=k;return}function al(){var b=0;if(!(a[360]|0)){c[932]=3740;c[933]=2;c[934]=jb(3740,3)|0;b=360;c[b>>2]=1;c[b+4>>2]=0}return 3728}function bl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+16|0;f=e;cl()|0;g=c[940]|0;c[f>>2]=c[b>>2];vb(0,g|0,a|0,Pk(f)|0,d|0)|0;i=e;return}function cl(){var b=0;if(!(a[368]|0)){c[938]=3764;c[939]=2;c[940]=jb(3764,3)|0;b=368;c[b>>2]=1;c[b+4>>2]=0}return 3752}function dl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f;el()|0;h=c[950]|0;c[g>>2]=c[b>>2];ub(0,h|0,a|0,Pk(g)|0,d&255|0,e&255|0)|0;i=f;return}function el(){var b=0;if(!(a[376]|0)){c[948]=3804;c[949]=3;c[950]=jb(3804,4)|0;b=376;c[b>>2]=1;c[b+4>>2]=0}return 3792}function fl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;c[a>>2]=0;g=a+4|0;c[g>>2]=0;c[a+8>>2]=0;e=b+4|0;f=(c[e>>2]|0)-(c[b>>2]|0)>>2;if((f|0)!=0?(il(a,f),d=c[b>>2]|0,h=c[e>>2]|0,(d|0)!=(h|0)):0){e=c[g>>2]|0;do{c[e>>2]=c[d>>2];e=(c[g>>2]|0)+4|0;c[g>>2]=e;d=d+4|0}while((d|0)!=(h|0))}return}function gl(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=i;i=i+16|0;l=p;hl()|0;o=c[957]|0;c[l>>2]=c[b>>2];l=Pk(l)|0;m=c[f>>2]|0;b=f+4|0;k=c[b>>2]|0;c[f+8>>2]=0;c[b>>2]=0;c[f>>2]=0;f=m;k=k-m|0;b=k>>2;k=jl(k+4|0)|0;c[k>>2]=b;if(b){h=0;do{c[k+4+(h<<2)>>2]=Pk(f+(h<<2)|0)|0;h=h+1|0}while((h|0)!=(b|0))}j=c[g>>2]|0;f=g+4|0;h=c[f>>2]|0;c[g+8>>2]=0;c[f>>2]=0;c[g>>2]=0;f=j;g=h-j|0;h=g>>2;g=jl(g+4|0)|0;c[g>>2]=h;if(!h){sb(0,o|0,a|0,l|0,d|0,e|0,k|0,g|0)|0;if(j)n=7}else{b=0;do{c[g+4+(b<<2)>>2]=c[f+(b<<2)>>2];b=b+1|0}while((b|0)!=(h|0));sb(0,o|0,a|0,l|0,d|0,e|0,k|0,g|0)|0;n=7}if((n|0)==7)Cm(j);if(m)Cm(m);i=p;return}function hl(){var b=0;if(!(a[384]|0)){c[955]=3832;c[956]=5;c[957]=jb(3832,6)|0;b=384;c[b>>2]=1;c[b+4>>2]=0}return 3820}function il(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>1073741823)zm(a);else{d=Am(b<<2)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+(b<<2);return}}function jl(a){a=a|0;var b=0,d=0;a=a+7&-8;if(a>>>0<=32768?(b=c[966]|0,a>>>0<=(65536-b|0)>>>0):0){d=(c[967]|0)+b|0;c[966]=b+a;a=d}else{a=Bm(a+8|0)|0;c[a>>2]=c[968];c[968]=a;a=a+8|0}return a|0}function kl(a,b){a=a|0;b=b|0;var d=0,e=0;a:while(1){d=c[968]|0;while(1){if((d|0)==(b|0))break a;e=c[d>>2]|0;c[968]=e;if(!d)d=e;else break}Cm(d)}c[966]=a;return}function ll(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function ml(a){a=a|0;return c[a>>2]|0}function nl(b){b=b|0;return a[c[b>>2]>>0]|0}function ol(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;i=i+16|0;e=d;c[e>>2]=c[a>>2];a=tl(c[b>>2]|0,e)|0;c[(c[b+4>>2]|0)+8>>2]=a;i=d;return}function pl(a){a=a|0;c[a>>2]=c[966];c[a+4>>2]=c[968];return}function ql(a){a=a|0;var b=0,d=0,e=0;e=c[a>>2]|0;d=c[a+4>>2]|0;a:while(1){a=c[968]|0;while(1){if((a|0)==(d|0))break a;b=c[a>>2]|0;c[968]=b;if(!a)a=b;else break}Cm(a)}c[966]=e;return}function rl(){ul();return}function sl(){c[967]=Bm(65536)|0;wl(3896);xl(3900);return}function tl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=c[966]|0;e=c[968]|0;a=c[a>>2]|0;d=c[b>>2]|0;vl()|0;d=wb(0,c[971]|0,a|0,d|0)|0;a:while(1){b=c[968]|0;while(1){if((b|0)==(e|0))break a;a=c[b>>2]|0;c[968]=a;if(!b)b=a;else break}Cm(b)}c[966]=f;return d|0}function ul(){var b=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;q=i;Ia(65536,3864,c[967]|0,3872);f=mk()|0;e=c[f>>2]|0;b=c[e>>2]|0;if(b){g=c[f+8>>2]|0;f=c[f+4>>2]|0;while(1){qb(b|0,d[f>>0]|0,a[g>>0]|0);e=e+4|0;b=c[e>>2]|0;if(!b)break;else{g=g+1|0;f=f+1|0}}}e=nk()|0;b=c[e>>2]|0;if(b)do{Va(b|0,c[e+4>>2]|0);e=e+8|0;b=c[e>>2]|0}while((b|0)!=0);Va(8702,8848);e=kk()|0;b=c[e>>2]|0;f=(b|0)==0;a:do if(!f){g=b;do{a[(c[g+4>>2]|0)+40>>0]=0;g=c[g>>2]|0}while((g|0)!=0);if(!f)while(1){g=e;h=e;e=b;while(1){f=e;e=c[e>>2]|0;f=c[f+4>>2]|0;b=f+40|0;if(!(a[b>>0]|0)){n=e;break}n=c[g>>2]|0;c[h>>2]=c[n>>2];Cm(n);if(!e)break a}a[b>>0]=1;e=c[h>>2]|0;j=f+20|0;b=c[j>>2]|0;k=db()|0;l=i;i=i+((1*(b<<2)|0)+15&-16)|0;m=i;i=i+((1*(b<<2)|0)+15&-16)|0;b=c[f+16>>2]|0;if(b){g=l;h=m;while(1){r=b;c[g>>2]=c[c[r+4>>2]>>2];c[h>>2]=c[r+8>>2];b=c[b>>2]|0;if(!b)break;else{g=g+4|0;h=h+4|0}}}$a(f|0,c[f+8>>2]|0,l|0,m|0,c[j>>2]|0,c[f+32>>2]|0,c[f+12>>2]|0);La(k|0);if(!n)break;else b=n}}while(0);b=c[(lk()|0)>>2]|0;if(b)do{r=b;n=c[r+16>>2]|0;kb(0,c[n+8>>2]|0,c[n+12>>2]|0,(c[n+16>>2]|0)+1|0,c[n+4>>2]|0,c[r+8>>2]|0,c[n>>2]|0,c[r+4>>2]|0,c[r+12>>2]|0,c[r+20>>2]|0);b=c[b>>2]|0}while((b|0)!=0);b=c[(kk()|0)>>2]|0;if(b)do{e=c[b+4>>2]|0;if((e|0)!=0?(o=c[e>>2]|0,p=c[e+24>>2]|0,(p|0)!=0):0){f=p;do{e=f;g=e+4|0;h=c[e+16>>2]|0;b:do if(h){j=c[h>>2]|0;switch(j|0){case 3:case 2:case 1:{kb(o|0,c[h+8>>2]|0,c[h+12>>2]|0,(c[h+16>>2]|0)+1|0,c[h+4>>2]|0,0,j|0,c[g>>2]|0,c[e+12>>2]|0,c[e+20>>2]|0);break b}case 0:{kb(o|0,c[h+8>>2]|0,c[h+12>>2]|0,(c[h+16>>2]|0)+1|0,c[h+4>>2]|0,c[e+8>>2]|0,0,c[g>>2]|0,c[e+12>>2]|0,c[e+20>>2]|0);break b}case 4:{kb(o|0,c[h+8>>2]|0,c[h+12>>2]|0,(c[h+16>>2]|0)+1|0,c[h+4>>2]|0,c[h+20>>2]|0,4,0,0,0);break b}default:break b}}while(0);f=c[f>>2]|0}while((f|0)!=0)}b=c[b>>2]|0}while((b|0)!=0);Ea();i=q;return}function vl(){var b=0;if(!(a[392]|0)){c[969]=3888;c[970]=1;c[971]=jb(3888,2)|0;b=392;c[b>>2]=1;c[b+4>>2]=0}return 3876}function wl(a){a=a|0;var b=0,d=0,e=0,f=0;Fl(a,8933);b=c[a>>2]|0;Gl()|0;b=b+28|0;e=c[b>>2]|0;f=Am(24)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;c[f+16>>2]=3956;c[f+20>>2]=0;d=e;c[f>>2]=c[d>>2];c[e>>2]=f;c[b>>2]=c[d>>2];Hl(a,8939,25,0);Il(a,8950,3,0);Jl(a,8958,11,0);Kl(a,8968,19,0);Ll(a,8975,26,0);return}function xl(a){a=a|0;var b=0,d=0,e=0;yl(a,8925);a=c[a>>2]|0;zl()|0;a=a+28|0;d=c[a>>2]|0;e=Am(24)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=3904;c[e+20>>2]=0;b=d;c[e>>2]=c[b>>2];c[d>>2]=e;c[a>>2]=c[b>>2];return}function yl(b,d){b=b|0;d=d|0;Qk()|0;c[b>>2]=3560;c[890]=8847;c[891]=3948;c[893]=d;if(!(a[248]|0)){c[773]=c[772];c[774]=0;d=248;c[d>>2]=1;c[d+4>>2]=0}c[892]=3092;c[898]=9;ok(c[b>>2]|0);return}function zl(){var b=0;if(!(a[400]|0)){c[976]=4;c[977]=20;c[978]=1840;c[979]=3940;c[980]=1;c[982]=0;c[983]=0;c[984]=0;c[981]=27;mb(66,3904,n|0)|0;b=400;c[b>>2]=1;c[b+4>>2]=0}return 3904}function Al(a){a=a|0;var b=0,d=0,e=0,f=0;d=jl(8)|0;b=d;e=Am(4)|0;c[e>>2]=a;f=b+4|0;c[f>>2]=e;a=Am(8)|0;f=c[f>>2]|0;c[a>>2]=f;e=Am(16)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=3612;c[e+12>>2]=f;c[a+4>>2]=e;c[d>>2]=a;return b|0}function Bl(b,d){b=b|0;d=d|0;c[b+4>>2]=d;a[b+8>>0]=1;return}function Cl(a){a=a|0;Dl(a+24|0);return}function Dl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function El(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b)Cm(b);return}function Fl(b,d){b=b|0;d=d|0;xm()|0;c[b>>2]=4280;c[1070]=8982;c[1071]=4244;c[1073]=d;if(!(a[216]|0)){c[746]=0;c[747]=0;d=216;c[d>>2]=1;c[d+4>>2]=0}c[1072]=2984;c[1078]=10;ok(c[b>>2]|0);return}function Gl(){var b=0;if(!(a[448]|0)){c[989]=4;c[990]=6;c[991]=1840;c[992]=4240;c[993]=0;c[995]=0;c[996]=0;c[997]=0;c[994]=67;mb(68,3956,n|0)|0;b=448;c[b>>2]=1;c[b+4>>2]=0}return 3956}function Hl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;km()|0;h=lm(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=4192;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function Il(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;dm()|0;h=em(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=4132;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function Jl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;Yl()|0;h=Zl(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=4084;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function Kl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;Sl()|0;h=Tl(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=4040;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function Ll(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a=c[a>>2]|0;Ml()|0;h=Nl(d,e)|0;a=a+28|0;f=c[a>>2]|0;g=Am(24)|0;c[g+4>>2]=b;c[g+8>>2]=d;c[g+12>>2]=h;c[g+16>>2]=3992;c[g+20>>2]=e;b=f;c[g>>2]=c[b>>2];c[f>>2]=g;c[a>>2]=c[b>>2];return}function Ml(){var b=0;if(!(a[408]|0)){c[998]=0;c[999]=10;c[1e3]=1840;c[1001]=4028;c[1002]=2;c[1004]=0;c[1005]=0;c[1006]=0;mb(69,3992,n|0)|0;b=408;c[b>>2]=1;c[b+4>>2]=0}return 3992}function Nl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;Ml()|0;b=b|4;c[f>>2]=b;d=c[1005]|0;if(d>>>0<(c[1006]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[1005]=b}else{Ol(4016,e,f);b=c[1005]|0}i=g;return (b-(c[1004]|0)>>3)+-1|0}function Ol(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function Pl(a,b,d){a=a|0;b=b|0;d=d|0;Ml()|0;Eb[c[(c[4016>>2]|0)+(a<<3)>>2]&31](b,d);return}function Ql(a){a=a|0;Rl(a+24|0);return}function Rl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function Sl(){var b=0;if(!(a[416]|0)){c[1010]=0;c[1011]=12;c[1012]=1840;c[1013]=4076;c[1014]=1;c[1016]=0;c[1017]=0;c[1018]=0;mb(70,4040,n|0)|0;b=416;c[b>>2]=1;c[b+4>>2]=0}return 4040}function Tl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;Sl()|0;b=b|4;c[f>>2]=b;d=c[1017]|0;if(d>>>0<(c[1018]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[1017]=b}else{Ul(4064,e,f);b=c[1017]|0}i=g;return (b-(c[1016]|0)>>3)+-1|0}function Ul(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function Vl(a,b){a=a|0;b=b|0;Sl()|0;return Fb[c[(c[4064>>2]|0)+(a<<3)>>2]&31](b)|0}function Wl(a){a=a|0;Xl(a+24|0);return}function Xl(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function Yl(){var b=0;if(!(a[424]|0)){c[1021]=0;c[1022]=8;c[1023]=1840;c[1024]=4120;c[1025]=2;c[1027]=0;c[1028]=0;c[1029]=0;mb(71,4084,n|0)|0;b=424;c[b>>2]=1;c[b+4>>2]=0}return 4084}function Zl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;Yl()|0;b=b|4;c[f>>2]=b;d=c[1028]|0;if(d>>>0<(c[1029]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[1028]=b}else{_l(4108,e,f);b=c[1028]|0}i=g;return (b-(c[1027]|0)>>3)+-1|0}function _l(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function $l(a,b,d){a=a|0;b=b|0;d=d|0;Yl()|0;return cm(c[(c[1027]|0)+(a<<3)>>2]|0,b,d)|0}function am(a){a=a|0;bm(a+24|0);return}function bm(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function cm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;k=i;i=i+32|0;f=k+8|0;g=k+4|0;j=k;h=d;if(!(h&1))c[g>>2]=c[d>>2];else{c[f>>2]=0;l=f+4|0;c[l>>2]=0;d=f+8|0;a[d>>0]=0;Ra(h|0,f|0)|0;c[g>>2]=c[l>>2];a[d>>0]=0}c[j>>2]=e;c[f>>2]=c[g>>2];g=Mb[b&15](f,j)|0;if(g)lb(g|0);f=c[j>>2]|0;if(f)lb(f|0);i=k;return g|0}function dm(){var b=0;if(!(a[432]|0)){c[1033]=0;c[1034]=3;c[1035]=1840;c[1036]=4168;c[1037]=5;c[1039]=0;c[1040]=0;c[1041]=0;mb(72,4132,n|0)|0;b=432;c[b>>2]=1;c[b+4>>2]=0}return 4132}function em(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;dm()|0;b=b|4;c[f>>2]=b;d=c[1040]|0;if(d>>>0<(c[1041]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[1040]=b}else{fm(4156,e,f);b=c[1040]|0}i=g;return (b-(c[1039]|0)>>3)+-1|0}function fm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function gm(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;dm()|0;jm(c[(c[1039]|0)+(a<<3)>>2]|0,b,d,e,f,g);return}function hm(a){a=a|0;im(a+24|0);return}function im(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function jm(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;m=i;i=i+32|0;l=m+16|0;k=m+12|0;j=m+8|0;h=m+4|0;n=m;c[l>>2]=b;c[k>>2]=d;c[j>>2]=e;c[h>>2]=f;c[n>>2]=g;Ab[a&3](l,k,j,h,n);b=c[n>>2]|0;if(b)lb(b|0);b=c[h>>2]|0;if(b)lb(b|0);b=c[j>>2]|0;if(b)lb(b|0);b=c[k>>2]|0;if(b)lb(b|0);b=c[l>>2]|0;if(b)lb(b|0);i=m;return}function km(){var b=0;if(!(a[440]|0)){c[1048]=0;c[1049]=11;c[1050]=1840;c[1051]=4228;c[1052]=2;c[1054]=0;c[1055]=0;c[1056]=0;mb(73,4192,n|0)|0;b=440;c[b>>2]=1;c[b+4>>2]=0}return 4192}function lm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;i=i+16|0;e=g+4|0;f=g;c[e>>2]=a;km()|0;b=b|4;c[f>>2]=b;d=c[1055]|0;if(d>>>0<(c[1056]|0)>>>0){c[d>>2]=a;c[d+4>>2]=b;b=d+8|0;c[1055]=b}else{mm(4216,e,f);b=c[1055]|0}i=g;return (b-(c[1054]|0)>>3)+-1|0}function mm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;j=a+4|0;k=c[a>>2]|0;l=k;f=((c[j>>2]|0)-l>>3)+1|0;if(f>>>0>536870911)zm(a);m=a+8|0;g=k;e=(c[m>>2]|0)-g|0;if(e>>3>>>0<268435455){e=e>>2;e=e>>>0<f>>>0?f:e;g=(c[j>>2]|0)-g|0;f=g>>3;if(!e){i=0;h=0;e=g}else n=6}else{g=(c[j>>2]|0)-g|0;e=536870911;f=g>>3;n=6}if((n|0)==6){i=e;h=Am(e<<3)|0;e=g}n=c[d>>2]|0;c[h+(f<<3)>>2]=c[b>>2];c[h+(f<<3)+4>>2]=n;Vn(h|0,k|0,e|0)|0;c[a>>2]=h;c[j>>2]=h+(f+1<<3);c[m>>2]=h+(i<<3);if(l)Cm(l);return}function nm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;km()|0;a=c[(c[1054]|0)+(a<<3)>>2]|0;c[f>>2]=d;Eb[a&31](b,f);b=c[f>>2]|0;if(b)lb(b|0);i=e;return}function om(a){a=a|0;pm(a+24|0);return}function pm(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function qm(){var a=0,b=0,d=0,e=0,f=0;b=jl(8)|0;a=b;f=a+4|0;c[f>>2]=Am(1)|0;d=Am(8)|0;f=c[f>>2]|0;c[d>>2]=f;e=Am(16)|0;c[e+4>>2]=0;c[e+8>>2]=0;c[e>>2]=4260;c[e+12>>2]=f;c[d+4>>2]=e;c[b>>2]=d;return a|0}function rm(b){b=b|0;a[b+8>>0]=1;return}function sm(a){a=a|0;tm(a+24|0);return}function tm(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;e=d;if(d){a=a+4|0;b=c[a>>2]|0;if((b|0)!=(d|0))c[a>>2]=b+(~((b+-8-e|0)>>>3)<<3);Cm(d)}return}function um(a){a=a|0;Kn(a);Cm(a);return}function vm(a){a=a|0;a=c[a+12>>2]|0;if(a)Cm(a);return}function wm(a){a=a|0;Cm(a);return}function xm(){var b=0;if(!(a[456]|0)){c[1074]=0;c[1075]=0;c[1076]=0;c[1077]=4304;c[1079]=0;a[4320]=0;a[4321]=0;mb(35,4280,n|0)|0;b=456;c[b>>2]=1;c[b+4>>2]=0}return 4280}function ym(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((e&896|0)==512){if(d){a=c[d+4>>2]|0;if(a)Mn(a);Cm(d)}}else if(b)Cm(b);return}function zm(a){a=a|0;Ma(9126,9149,303,9235)}function Am(a){a=a|0;var b=0;b=(a|0)==0?1:a;a=Fn(b)|0;a:do if(!a){while(1){a=Gm()|0;if(!a)break;Ub[a&0]();a=Fn(b)|0;if(a)break a}b=Na(4)|0;c[b>>2]=4332;nb(b|0,464,18)}while(0);return a|0}function Bm(a){a=a|0;return Am(a)|0}function Cm(a){a=a|0;Gn(a);return}function Dm(a){a=a|0;return}function Em(a){a=a|0;Cm(a);return}function Fm(a){a=a|0;return 9256}function Gm(){var a=0;a=c[1086]|0;c[1086]=a+0;return a|0}function Hm(a){a=a|0;return}function Im(a){a=a|0;return}function Jm(a){a=a|0;return}function Km(a){a=a|0;return}function Lm(a){a=a|0;return}function Mm(a){a=a|0;Cm(a);return}function Nm(a){a=a|0;Cm(a);return}function Om(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=i;i=i+64|0;g=h;if((a|0)!=(b|0))if((b|0)!=0?(f=Sm(b,496,512,0)|0,(f|0)!=0):0){b=g;e=b+56|0;do{c[b>>2]=0;b=b+4|0}while((b|0)<(e|0));c[g>>2]=f;c[g+8>>2]=a;c[g+12>>2]=-1;c[g+48>>2]=1;Xb[c[(c[f>>2]|0)+28>>2]&15](f,g,c[d>>2]|0,1);if((c[g+24>>2]|0)==1){c[d>>2]=c[g+16>>2];b=1}else b=0}else b=0;else b=1;i=h;return b|0}function Pm(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;b=d+16|0;g=c[b>>2]|0;do if(g){if((g|0)!=(e|0)){f=d+36|0;c[f>>2]=(c[f>>2]|0)+1;c[d+24>>2]=2;a[d+54>>0]=1;break}b=d+24|0;if((c[b>>2]|0)==2)c[b>>2]=f}else{c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1}while(0);return}function Qm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((a|0)==(c[b+8>>2]|0))Pm(0,b,d,e);return}function Rm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if((a|0)==(c[b+8>>2]|0))Pm(0,b,d,e);else{a=c[a+8>>2]|0;Xb[c[(c[a>>2]|0)+28>>2]&15](a,b,d,e)}return}function Sm(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;r=i;i=i+64|0;q=r;p=c[d>>2]|0;o=d+(c[p+-8>>2]|0)|0;p=c[p+-4>>2]|0;c[q>>2]=f;c[q+4>>2]=d;c[q+8>>2]=e;c[q+12>>2]=g;g=q+16|0;d=q+20|0;e=q+24|0;h=q+28|0;j=q+32|0;k=q+40|0;l=(p|0)==(f|0);m=g;n=m+36|0;do{c[m>>2]=0;m=m+4|0}while((m|0)<(n|0));b[g+36>>1]=0;a[g+38>>0]=0;a:do if(l){c[q+48>>2]=1;Ob[c[(c[f>>2]|0)+20>>2]&3](f,q,o,o,1,0);g=(c[e>>2]|0)==1?o:0}else{Ab[c[(c[p>>2]|0)+24>>2]&3](p,q,o,1,0);switch(c[q+36>>2]|0){case 0:{g=(c[k>>2]|0)==1&(c[h>>2]|0)==1&(c[j>>2]|0)==1?c[d>>2]|0:0;break a}case 1:break;default:{g=0;break a}}if((c[e>>2]|0)!=1?!((c[k>>2]|0)==0&(c[h>>2]|0)==1&(c[j>>2]|0)==1):0){g=0;break}g=c[g>>2]|0}while(0);i=r;return g|0}function Tm(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;a[d+53>>0]=1;do if((c[d+4>>2]|0)==(f|0)){a[d+52>>0]=1;f=d+16|0;b=c[f>>2]|0;if(!b){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((g|0)==1?(c[d+48>>2]|0)==1:0))break;a[d+54>>0]=1;break}if((b|0)!=(e|0)){g=d+36|0;c[g>>2]=(c[g>>2]|0)+1;a[d+54>>0]=1;break}b=d+24|0;f=c[b>>2]|0;if((f|0)==2){c[b>>2]=g;f=g}if((f|0)==1?(c[d+48>>2]|0)==1:0)a[d+54>>0]=1}while(0);return}function Um(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;a:do if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)==(e|0)?(h=d+28|0,(c[h>>2]|0)!=1):0)c[h>>2]=f}else{if((b|0)!=(c[d>>2]|0)){j=c[b+8>>2]|0;Ab[c[(c[j>>2]|0)+24>>2]&3](j,d,e,f,g);break}if((c[d+16>>2]|0)!=(e|0)?(i=d+20|0,(c[i>>2]|0)!=(e|0)):0){c[d+32>>2]=f;f=d+44|0;if((c[f>>2]|0)==4)break;h=d+52|0;a[h>>0]=0;k=d+53|0;a[k>>0]=0;b=c[b+8>>2]|0;Ob[c[(c[b>>2]|0)+20>>2]&3](b,d,e,e,1,g);if(a[k>>0]|0){if(!(a[h>>0]|0)){h=1;j=13}}else{h=0;j=13}do if((j|0)==13){c[i>>2]=e;k=d+40|0;c[k>>2]=(c[k>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0){a[d+54>>0]=1;if(h)break}else j=16;if((j|0)==16?h:0)break;c[f>>2]=4;break a}while(0);c[f>>2]=3;break}if((f|0)==1)c[d+32>>2]=1}while(0);return}function Vm(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;do if((b|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)==(e|0)?(i=d+28|0,(c[i>>2]|0)!=1):0)c[i>>2]=f}else if((b|0)==(c[d>>2]|0)){if((c[d+16>>2]|0)!=(e|0)?(h=d+20|0,(c[h>>2]|0)!=(e|0)):0){c[d+32>>2]=f;c[h>>2]=e;g=d+40|0;c[g>>2]=(c[g>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0)a[d+54>>0]=1;c[d+44>>2]=4;break}if((f|0)==1)c[d+32>>2]=1}while(0);return}function Wm(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((a|0)==(c[b+8>>2]|0))Tm(0,b,d,e,f);else{a=c[a+8>>2]|0;Ob[c[(c[a>>2]|0)+20>>2]&3](a,b,d,e,f,g)}return}function Xm(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((a|0)==(c[b+8>>2]|0))Tm(0,b,d,e,f);return}function Ym(){var a=0;if(!(c[1107]|0))a=4480;else a=c[(cb()|0)+60>>2]|0;return a|0}function Zm(b){b=b|0;var c=0,e=0;c=0;while(1){if((d[9271+c>>0]|0)==(b|0)){e=2;break}c=c+1|0;if((c|0)==87){c=87;b=9359;e=5;break}}if((e|0)==2)if(!c)b=9359;else{b=9359;e=5}if((e|0)==5)while(1){e=b;while(1){b=e+1|0;if(!(a[e>>0]|0))break;else e=b}c=c+-1|0;if(!c)break;else e=5}return b|0}function _m(a){a=a|0;if(a>>>0>4294963200){c[(Ym()|0)>>2]=0-a;a=-1}return a|0}function $m(a,b){a=ca(a);b=ca(b);var d=0,e=0;d=(g[k>>2]=a,c[k>>2]|0);do if((d&2147483647)>>>0<=2139095040){e=(g[k>>2]=b,c[k>>2]|0);if((e&2147483647)>>>0<=2139095040)if((e^d|0)<0){a=(d|0)<0?b:a;break}else{a=a<b?b:a;break}}else a=b;while(0);return ca(a)}function an(a,b){a=ca(a);b=ca(b);var d=0,e=0;d=(g[k>>2]=a,c[k>>2]|0);do if((d&2147483647)>>>0<=2139095040){e=(g[k>>2]=b,c[k>>2]|0);if((e&2147483647)>>>0<=2139095040)if((e^d|0)<0){a=(d|0)<0?a:b;break}else{a=a<b?a:b;break}}else a=b;while(0);return ca(a)}function bn(a,b){a=+a;b=b|0;var d=0,e=0,f=0;h[k>>3]=a;d=c[k>>2]|0;e=c[k+4>>2]|0;f=Un(d|0,e|0,52)|0;f=f&2047;switch(f|0){case 0:{if(a!=0.0){a=+bn(a*18446744073709551616.0,b);d=(c[b>>2]|0)+-64|0}else d=0;c[b>>2]=d;break}case 2047:break;default:{c[b>>2]=f+-1022;c[k>>2]=d;c[k+4>>2]=e&-2146435073|1071644672;a=+h[k>>3]}}return +a}function cn(a,b){a=+a;b=b|0;return +(+bn(a,b))}function dn(a){a=ca(a);var b=0,d=zb,e=zb,f=0;b=(g[k>>2]=a,c[k>>2]|0);f=b>>>23&255;do if(f>>>0<=149){b=(b|0)<0;e=ca(-a);e=b?e:a;if(f>>>0<126){a=ca(a*ca(0.0));break}d=ca(ca(ca(e+ca(8388608.0))+ca(-8388608.0))-e);if(!(d>ca(.5))){a=ca(e+d);if(d<=ca(-.5))a=ca(a+ca(1.0))}else a=ca(ca(e+d)+ca(-1.0));e=ca(-a);a=b?e:a}while(0);return ca(a)}function en(b,d,e){b=b|0;d=d|0;e=e|0;do if(b){if(d>>>0<128){a[b>>0]=d;b=1;break}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;b=2;break}if(d>>>0<55296|(d&-8192|0)==57344){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;b=3;break}if((d+-65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;b=4;break}else{c[(Ym()|0)>>2]=84;b=-1;break}}else b=1;while(0);return b|0}function fn(a,b){a=a|0;b=b|0;if(!a)a=0;else a=en(a,b,0)|0;return a|0}function gn(a){a=a|0;return 0}function hn(a){a=a|0;return}function jn(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;m=i;i=i+16|0;l=m;k=e&255;a[l>>0]=k;g=b+16|0;h=c[g>>2]|0;if(!h)if(!(on(b)|0)){h=c[g>>2]|0;j=4}else f=-1;else j=4;do if((j|0)==4){g=b+20|0;j=c[g>>2]|0;if(j>>>0<h>>>0?(f=e&255,(f|0)!=(a[b+75>>0]|0)):0){c[g>>2]=j+1;a[j>>0]=k;break}if((Ib[c[b+36>>2]&15](b,l,1)|0)==1)f=d[l>>0]|0;else f=-1}while(0);i=m;return f|0}function kn(a){a=a|0;var b=0,d=0;b=i;i=i+16|0;d=b;c[d>>2]=c[a+60>>2];a=_m(ob(6,d|0)|0)|0;i=b;return a|0}function ln(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=i;i=i+32|0;g=f;e=f+20|0;c[g>>2]=c[a+60>>2];c[g+4>>2]=0;c[g+8>>2]=b;c[g+12>>2]=e;c[g+16>>2]=d;if((_m(eb(140,g|0)|0)|0)<0){c[e>>2]=-1;a=-1}else a=c[e>>2]|0;i=f;return a|0}function mn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=i;i=i+48|0;n=q+16|0;m=q;e=q+32|0;o=a+28|0;f=c[o>>2]|0;c[e>>2]=f;p=a+20|0;f=(c[p>>2]|0)-f|0;c[e+4>>2]=f;c[e+8>>2]=b;c[e+12>>2]=d;k=a+60|0;l=a+44|0;b=2;f=f+d|0;while(1){if(!(c[1107]|0)){c[n>>2]=c[k>>2];c[n+4>>2]=e;c[n+8>>2]=b;h=_m(xb(146,n|0)|0)|0}else{pb(74,a|0);c[m>>2]=c[k>>2];c[m+4>>2]=e;c[m+8>>2]=b;h=_m(xb(146,m|0)|0)|0;Da(0)}if((f|0)==(h|0)){f=6;break}if((h|0)<0){f=8;break}f=f-h|0;g=c[e+4>>2]|0;if(h>>>0<=g>>>0)if((b|0)==2){c[o>>2]=(c[o>>2]|0)+h;j=g;b=2}else j=g;else{j=c[l>>2]|0;c[o>>2]=j;c[p>>2]=j;j=c[e+12>>2]|0;h=h-g|0;e=e+8|0;b=b+-1|0}c[e>>2]=(c[e>>2]|0)+h;c[e+4>>2]=j-h}if((f|0)==6){n=c[l>>2]|0;c[a+16>>2]=n+(c[a+48>>2]|0);a=n;c[o>>2]=a;c[p>>2]=a}else if((f|0)==8){c[a+16>>2]=0;c[o>>2]=0;c[p>>2]=0;c[a>>2]=c[a>>2]|32;if((b|0)==2)d=0;else d=d-(c[e+4>>2]|0)|0}i=q;return d|0}function nn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=i;i=i+80|0;f=g;c[b+36>>2]=3;if((c[b>>2]&64|0)==0?(c[f>>2]=c[b+60>>2],c[f+4>>2]=21505,c[f+8>>2]=g+12,(gb(54,f|0)|0)!=0):0)a[b+75>>0]=-1;f=mn(b,d,e)|0;i=g;return f|0}function on(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;d=c[b+44>>2]|0;c[b+28>>2]=d;c[b+20>>2]=d;c[b+16>>2]=d+(c[b+48>>2]|0);d=0}else{c[b>>2]=d|32;d=-1}return d|0}function pn(a,b){a=a|0;b=b|0;return (rn(a,zn(a)|0,1,b)|0)+-1|0}function qn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=e+16|0;g=c[f>>2]|0;if(!g)if(!(on(e)|0)){g=c[f>>2]|0;h=4}else f=0;else h=4;a:do if((h|0)==4){i=e+20|0;h=c[i>>2]|0;if((g-h|0)>>>0<d>>>0){f=Ib[c[e+36>>2]&15](e,b,d)|0;break}b:do if((a[e+75>>0]|0)>-1){f=d;while(1){if(!f){g=h;f=0;break b}g=f+-1|0;if((a[b+g>>0]|0)==10)break;else f=g}if((Ib[c[e+36>>2]&15](e,b,f)|0)>>>0<f>>>0)break a;d=d-f|0;b=b+f|0;g=c[i>>2]|0}else{g=h;f=0}while(0);Vn(g|0,b|0,d|0)|0;c[i>>2]=(c[i>>2]|0)+d;f=f+d|0}while(0);return f|0}function rn(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=$(d,b)|0;if((c[e+76>>2]|0)>-1){g=(gn(e)|0)==0;a=qn(a,f,e)|0;if(!g)hn(e)}else a=qn(a,f,e)|0;if((a|0)!=(f|0))d=(a>>>0)/(b>>>0)|0;return d|0}function sn(a,b){a=a|0;b=b|0;var d=0,e=0;d=i;i=i+16|0;e=d;c[e>>2]=b;b=un(c[1119]|0,a,e)|0;i=d;return b|0}function tn(b){b=b|0;var d=0,e=0,f=0,g=0;f=c[1119]|0;if((c[f+76>>2]|0)>-1)g=gn(f)|0;else g=0;do if((pn(b,f)|0)<0)d=1;else{if((a[f+75>>0]|0)!=10?(d=f+20|0,e=c[d>>2]|0,e>>>0<(c[f+16>>2]|0)>>>0):0){c[d>>2]=e+1;a[e>>0]=10;d=0;break}d=(jn(f,10)|0)<0}while(0);if(g)hn(f);return d<<31>>31|0}function un(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=i;i=i+224|0;o=s+80|0;r=s+96|0;q=s;p=s+136|0;f=r;g=f+40|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(g|0));c[o>>2]=c[e>>2];if((Bn(0,d,o,q,r)|0)<0)e=-1;else{if((c[b+76>>2]|0)>-1)m=gn(b)|0;else m=0;e=c[b>>2]|0;n=e&32;if((a[b+74>>0]|0)<1)c[b>>2]=e&-33;e=b+48|0;if(!(c[e>>2]|0)){g=b+44|0;h=c[g>>2]|0;c[g>>2]=p;j=b+28|0;c[j>>2]=p;k=b+20|0;c[k>>2]=p;c[e>>2]=80;l=b+16|0;c[l>>2]=p+80;f=Bn(b,d,o,q,r)|0;if(h){Ib[c[b+36>>2]&15](b,0,0)|0;f=(c[k>>2]|0)==0?-1:f;c[g>>2]=h;c[e>>2]=0;c[l>>2]=0;c[j>>2]=0;c[k>>2]=0}}else f=Bn(b,d,o,q,r)|0;e=c[b>>2]|0;c[b>>2]=e|n;if(m)hn(b);e=(e&32|0)==0?f:-1}i=s;return e|0}function vn(a,b){a=a|0;b=b|0;return un(c[1119]|0,a,b)|0}function wn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=d&255;f=(e|0)!=0;a:do if(f&(b&3|0)!=0){g=d&255;while(1){if((a[b>>0]|0)==g<<24>>24){i=6;break a}b=b+1|0;e=e+-1|0;f=(e|0)!=0;if(!(f&(b&3|0)!=0)){i=5;break}}}else i=5;while(0);if((i|0)==5)if(f)i=6;else e=0;b:do if((i|0)==6){g=d&255;if((a[b>>0]|0)!=g<<24>>24){f=$(h,16843009)|0;c:do if(e>>>0>3)while(1){h=c[b>>2]^f;if((h&-2139062144^-2139062144)&h+-16843009)break;b=b+4|0;e=e+-4|0;if(e>>>0<=3){i=11;break c}}else i=11;while(0);if((i|0)==11)if(!e){e=0;break}while(1){if((a[b>>0]|0)==g<<24>>24)break b;b=b+1|0;e=e+-1|0;if(!e){e=0;break}}}}while(0);return ((e|0)!=0?b:0)|0}function xn(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if(!d)d=0;else{f=d;e=b;while(1){b=a[e>>0]|0;d=a[c>>0]|0;if(b<<24>>24!=d<<24>>24)break;f=f+-1|0;if(!f){d=0;break a}else{e=e+1|0;c=c+1|0}}d=(b&255)-(d&255)|0}while(0);return d|0}function yn(b,c){b=b|0;c=c|0;var d=0,e=0;e=a[b>>0]|0;d=a[c>>0]|0;if(e<<24>>24==0?1:e<<24>>24!=d<<24>>24)c=e;else{do{b=b+1|0;c=c+1|0;e=a[b>>0]|0;d=a[c>>0]|0}while(!(e<<24>>24==0?1:e<<24>>24!=d<<24>>24));c=e}return (c&255)-(d&255)|0}function zn(b){b=b|0;var d=0,e=0,f=0;f=b;a:do if(!(f&3))e=4;else{d=b;b=f;while(1){if(!(a[d>>0]|0))break a;d=d+1|0;b=d;if(!(b&3)){b=d;e=4;break}}}while(0);if((e|0)==4){while(1){d=c[b>>2]|0;if(!((d&-2139062144^-2139062144)&d+-16843009))b=b+4|0;else break}if((d&255)<<24>>24)do b=b+1|0;while((a[b>>0]|0)!=0)}return b-f|0}function An(a){a=a|0;if(!(c[a+68>>2]|0))hn(a);return}
function Yb(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function Zb(){return i|0}function _b(a){a=a|0;i=a}function $b(a,b){a=a|0;b=b|0;i=a;j=b}function ac(a,b){a=a|0;b=b|0;if(!o){o=a;p=b}}function bc(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0]}function cc(b){b=b|0;a[k>>0]=a[b>>0];a[k+1>>0]=a[b+1>>0];a[k+2>>0]=a[b+2>>0];a[k+3>>0]=a[b+3>>0];a[k+4>>0]=a[b+4>>0];a[k+5>>0]=a[b+5>>0];a[k+6>>0]=a[b+6>>0];a[k+7>>0]=a[b+7>>0]}function dc(a){a=a|0;D=a}function ec(){return D|0}function fc(a){a=a|0;var b=0,d=0,e=0,f=0;f=i;i=i+16|0;e=f+8|0;d=f;b=Fb[c[544>>2]&31](12)|0;if(!b){c[d>>2]=5204;nc(0,5316,d);ab()}c[b>>2]=a;c[b+4>>2]=0;d=Fb[c[544>>2]&31](a<<2)|0;c[b+8>>2]=d;if(!d){c[e>>2]=5239;nc(0,5316,e);ab()}else{i=f;return b|0}return 0}function gc(a){a=a|0;if(!a)return;Db[c[552>>2]&127](c[a+8>>2]|0);Db[c[552>>2]&127](a);return}function hc(a){a=a|0;if(!a){a=0;return a|0}a=c[a+4>>2]|0;return a|0}function ic(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;j=i;i=i+16|0;h=j;f=c[a>>2]|0;if(!f){f=fc(4)|0;c[a>>2]=f}g=f+4|0;a=c[g>>2]|0;do if((a|0)==(c[f>>2]|0)){c[f>>2]=a<<1;k=f+8|0;a=Mb[c[548>>2]&15](c[k>>2]|0,a<<3)|0;c[k>>2]=a;if(!a){c[h>>2]=5275;nc(0,5316,h);ab()}else{e=c[g>>2]|0;break}}else e=a;while(0);f=f+8|0;if(e>>>0<=d>>>0){k=e;k=k+1|0;c[g>>2]=k;k=c[f>>2]|0;k=k+(d<<2)|0;c[k>>2]=b;i=j;return}do{k=e;e=e+-1|0;h=c[f>>2]|0;c[h+(k<<2)>>2]=c[h+(e<<2)>>2]}while(e>>>0>d>>>0);k=c[g>>2]|0;k=k+1|0;c[g>>2]=k;k=c[f>>2]|0;k=k+(d<<2)|0;c[k>>2]=b;i=j;return}function jc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=a+8|0;e=(c[d>>2]|0)+(b<<2)|0;f=c[e>>2]|0;c[e>>2]=0;e=a+4|0;a=(c[e>>2]|0)+-1|0;if(a>>>0<=b>>>0){d=a;c[e>>2]=d;return f|0}do{a=b;b=b+1|0;g=c[d>>2]|0;c[g+(a<<2)>>2]=c[g+(b<<2)>>2];c[(c[d>>2]|0)+(b<<2)>>2]=0;a=(c[e>>2]|0)+-1|0}while(b>>>0<a>>>0);c[e>>2]=a;return f|0}function kc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;e=c[a+4>>2]|0;if(!e){g=0;return g|0}f=c[a+8>>2]|0;d=0;while(1){if((c[f+(d<<2)>>2]|0)==(b|0))break;d=d+1|0;if(d>>>0>=e>>>0){d=0;g=6;break}}if((g|0)==6)return d|0;g=jc(a,d)|0;return g|0}function lc(a,b){a=a|0;b=b|0;if(!a){a=0;return a|0}if(!(c[a+4>>2]|0)){a=0;return a|0}a=c[(c[a+8>>2]|0)+(b<<2)>>2]|0;return a|0}function mc(){var a=0,b=0,d=0;d=i;i=i+16|0;b=d;a=Fb[c[544>>2]&31](980)|0;if(!a){c[b>>2]=5319;nc(0,5316,b);ab()}else{c[139]=(c[139]|0)+1;Vn(a|0,568,980)|0;i=d;return a|0}return 0}function nc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;i=i+16|0;f=e;c[f>>2]=d;Ib[c[1548>>2]&15](a,b,f)|0;i=e;return}function oc(a){a=a|0;var b=0,d=0,e=0,f=0;b=a+940|0;d=c[b>>2]|0;if(d){kc(c[d+944>>2]|0,a)|0;c[b>>2]=0}e=a+944|0;f=hc(c[e>>2]|0)|0;b=c[e>>2]|0;if(f){d=0;do{c[(lc(b,d)|0)+940>>2]=0;d=d+1|0;b=c[e>>2]|0}while((d|0)!=(f|0))}gc(b);Db[c[552>>2]&127](a);c[139]=(c[139]|0)+-1;return}function pc(a){a=a|0;return hc(c[a+944>>2]|0)|0}function qc(a,b){a=a|0;b=b|0;return lc(c[a+944>>2]|0,b)|0}function rc(b,d){b=b|0;d=d|0;if(!(kc(c[b+944>>2]|0,d)|0))return;c[d+940>>2]=0;while(1){d=b+968|0;if(a[d>>0]|0){d=5;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=5;break}}if((d|0)==5)return}function sc(a){a=a|0;var b=0,d=0,e=0,f=0;f=i;i=i+16|0;e=f+8|0;d=f;b=a+944|0;if(hc(c[b>>2]|0)|0){c[d>>2]=5354;nc(0,5316,d);ab()}if(!(c[a+940>>2]|0)){gc(c[b>>2]|0);Vn(a|0,568,980)|0;i=f;return}else{c[e>>2]=5408;nc(0,5316,e);ab()}}function tc(){return c[139]|0}function uc(a,b){a=a|0;b=b|0;var d=0,e=0;e=i;i=i+16|0;d=e;if(!b){c[a+952>>2]=0;i=e;return}if(hc(c[a+944>>2]|0)|0){c[d>>2]=5455;nc(0,5316,d);ab()}c[a+952>>2]=b;i=e;return}function vc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,h=0,j=0,k=0;k=i;i=i+16|0;j=k+8|0;h=k;f=d+940|0;if(c[f>>2]|0){c[h>>2]=5535;nc(0,5316,h);ab()}if(c[b+952>>2]|0){c[j>>2]=5589;nc(0,5316,j);ab()}ic(b+944|0,d,e);c[f>>2]=b;while(1){f=b+968|0;if(a[f>>0]|0){f=8;break}a[f>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){f=8;break}}if((f|0)==8){i=k;return}}function wc(a){a=a|0;return c[a+940>>2]|0}function xc(b){b=b|0;var d=0,e=0,f=0;f=i;i=i+16|0;d=f;if(!(c[b+952>>2]|0)){c[d>>2]=5658;nc(0,5316,d);ab()}else e=b;while(1){b=e+968|0;if(a[b>>0]|0){b=5;break}a[b>>0]=1;g[e+504>>2]=ca(s);e=c[e+940>>2]|0;if(!e){b=5;break}}if((b|0)==5){i=f;return}}function yc(b){b=b|0;return (a[b+968>>0]|0)!=0|0}function zc(b,d){b=b|0;d=d|0;if(!(xn(b,d,400)|0))return;Vn(b|0,d|0,400)|0;d=b;while(1){b=d+968|0;if(a[b>>0]|0){b=5;break}a[b>>0]=1;g[d+504>>2]=ca(s);d=c[d+940>>2]|0;if(!d){b=5;break}}if((b|0)==5)return}function Ac(a){a=a|0;var b=zb;b=ca(g[a+44>>2]);if(((g[k>>2]=b,c[k>>2]|0)&2147483647)>>>0>2139095040){b=ca(g[a+40>>2]);a=b>ca(0.0)&((g[k>>2]=b,c[k>>2]|0)&2147483647)>>>0<2139095041;return ca(a?b:ca(0.0))}else return ca(b);return ca(0)}function Bc(a){a=a|0;var b=zb;b=ca(g[a+48>>2]);if(((g[k>>2]=b,c[k>>2]|0)&2147483647)>>>0>2139095040){b=ca(g[a+40>>2]);a=b<ca(0.0)&((g[k>>2]=b,c[k>>2]|0)&2147483647)>>>0<2139095041;b=ca(-b);return ca(a?b:ca(0.0))}else return ca(b);return ca(0)}function Cc(a,b){a=a|0;b=b|0;var d=zb,e=0;switch(c[b+56>>2]|0){case 0:case 3:{d=ca(g[b+40>>2]);b=d>ca(0.0)&((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0<2139095041;b=b?1552:1560;break}default:b=b+52|0}e=b;b=c[e+4>>2]|0;c[a>>2]=c[e>>2];c[a+4>>2]=b;return}function Dc(b,d){b=b|0;d=ca(d);var e=0;e=b+40|0;if(!(ca(g[e>>2])!=d))return;g[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Ec(a,b){a=a|0;b=b|0;c[a+964>>2]=b;return}function Fc(a){a=a|0;return c[a+964>>2]|0}function Gc(b,d){b=b|0;d=d|0;var e=0;e=b+4|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Hc(a){a=a|0;return c[a+4>>2]|0}function Ic(b,d){b=b|0;d=d|0;var e=0;e=b+8|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Jc(a){a=a|0;return c[a+8>>2]|0}function Kc(b,d){b=b|0;d=d|0;var e=0;e=b+12|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Lc(a){a=a|0;return c[a+12>>2]|0}function Mc(b,d){b=b|0;d=d|0;var e=0;e=b+16|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Nc(a){a=a|0;return c[a+16>>2]|0}function Oc(b,d){b=b|0;d=d|0;var e=0;e=b+20|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Pc(a){a=a|0;return c[a+20>>2]|0}function Qc(b,d){b=b|0;d=d|0;var e=0;e=b+24|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Rc(a){a=a|0;return c[a+24>>2]|0}function Sc(b,d){b=b|0;d=d|0;var e=0;e=b+28|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Tc(a){a=a|0;return c[a+28>>2]|0}function Uc(b,d){b=b|0;d=d|0;var e=0;e=b+32|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Vc(a){a=a|0;return c[a+32>>2]|0}function Wc(b,d){b=b|0;d=d|0;var e=0;e=b+36|0;if((c[e>>2]|0)==(d|0))return;c[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Xc(a){a=a|0;return c[a+36>>2]|0}function Yc(b,d){b=b|0;d=ca(d);var e=0;e=b+44|0;if(!(ca(g[e>>2])!=d))return;g[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Zc(b,d){b=b|0;d=ca(d);var e=0;e=b+48|0;if(!(ca(g[e>>2])!=d))return;g[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function _c(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+52|0;e=b+56|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function $c(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+52|0;e=b+56|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function ad(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+132+(d<<3)|0;d=b+132+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==1:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0<2139095041&1;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function bd(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+132+(d<<3)|0;d=b+132+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==2:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040?0:2;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function cd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+132+(d<<3)|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function dd(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+60+(d<<3)|0;d=b+60+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==1:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0<2139095041&1;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function ed(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+60+(d<<3)|0;d=b+60+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==2:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040?0:2;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function fd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+60+(d<<3)|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function gd(b,d){b=b|0;d=d|0;var e=0;e=b+60+(d<<3)+4|0;if((c[e>>2]|0)==3)return;g[b+60+(d<<3)>>2]=ca(s);c[e>>2]=3;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function hd(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+204+(d<<3)|0;d=b+204+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==1:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0<2139095041&1;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function id(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+204+(d<<3)|0;d=b+204+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==2:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040?0:2;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function jd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=b+204+(d<<3)|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function kd(b,d,e){b=b|0;d=d|0;e=ca(e);var f=0;f=b+276+(d<<3)|0;d=b+276+(d<<3)+4|0;if(!(ca(g[f>>2])!=e)?(c[d>>2]|0)==1:0)return;g[f>>2]=e;c[d>>2]=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0<2139095041&1;while(1){d=b+968|0;if(a[d>>0]|0){d=6;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=6;break}}if((d|0)==6)return}function ld(a,b){a=a|0;b=b|0;return ca(g[a+276+(b<<3)>>2])}function md(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+348|0;e=b+352|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function nd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+348|0;e=b+352|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function od(b){b=b|0;var d=0;d=b+352|0;if((c[d>>2]|0)==3)return;g[b+348>>2]=ca(s);c[d>>2]=3;while(1){d=b+968|0;if(a[d>>0]|0){d=5;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=5;break}}if((d|0)==5)return}function pd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+348|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function qd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+356|0;e=b+360|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function rd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+356|0;e=b+360|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function sd(b){b=b|0;var d=0;d=b+360|0;if((c[d>>2]|0)==3)return;g[b+356>>2]=ca(s);c[d>>2]=3;while(1){d=b+968|0;if(a[d>>0]|0){d=5;break}a[d>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){d=5;break}}if((d|0)==5)return}function td(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+356|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function ud(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+364|0;e=b+368|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function vd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+364|0;e=b+368|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function wd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+364|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function xd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+372|0;e=b+376|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function yd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+372|0;e=b+376|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function zd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+372|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function Ad(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+380|0;e=b+384|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function Bd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+380|0;e=b+384|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function Cd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+380|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function Dd(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+388|0;e=b+392|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==1:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:1;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function Ed(b,d){b=b|0;d=ca(d);var e=0,f=0;f=b+388|0;e=b+392|0;if(!(ca(g[f>>2])!=d)?(c[e>>2]|0)==2:0)return;g[f>>2]=d;c[e>>2]=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040?3:2;while(1){e=b+968|0;if(a[e>>0]|0){e=6;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=6;break}}if((e|0)==6)return}function Fd(a,b){a=a|0;b=b|0;var d=0,e=0;e=b+388|0;d=c[e+4>>2]|0;b=a;c[b>>2]=c[e>>2];c[b+4>>2]=d;return}function Gd(b,d){b=b|0;d=ca(d);var e=0;e=b+396|0;if(!(ca(g[e>>2])!=d))return;g[e>>2]=d;while(1){e=b+968|0;if(a[e>>0]|0){e=5;break}a[e>>0]=1;g[b+504>>2]=ca(s);b=c[b+940>>2]|0;if(!b){e=5;break}}if((e|0)==5)return}function Hd(a){a=a|0;return ca(g[a+396>>2])}function Id(a){a=a|0;return ca(g[a+400>>2])}function Jd(a){a=a|0;return ca(g[a+404>>2])}function Kd(a){a=a|0;return ca(g[a+408>>2])}function Ld(a){a=a|0;return ca(g[a+412>>2])}function Md(a){a=a|0;return ca(g[a+416>>2])}function Nd(a){a=a|0;return ca(g[a+420>>2])}function Od(a,b){a=a|0;b=b|0;var d=0,e=0,f=zb;e=i;i=i+16|0;d=e;if(b>>>0>=6){c[d>>2]=5744;nc(0,5316,d);ab()}a:do switch(b|0){case 0:if((c[a+496>>2]|0)==2){b=a+444|0;break a}else{b=a+440|0;break a}case 2:if((c[a+496>>2]|0)==2){b=a+440|0;break a}else{b=a+444|0;break a}default:b=a+424+(b<<2)|0}while(0);f=ca(g[b>>2]);i=e;return ca(f)}function Pd(a,b){a=a|0;b=b|0;var d=0,e=0,f=zb;e=i;i=i+16|0;d=e;if(b>>>0>=6){c[d>>2]=5744;nc(0,5316,d);ab()}a:do switch(b|0){case 0:if((c[a+496>>2]|0)==2){b=a+468|0;break a}else{b=a+464|0;break a}case 2:if((c[a+496>>2]|0)==2){b=a+464|0;break a}else{b=a+468|0;break a}default:b=a+448+(b<<2)|0}while(0);f=ca(g[b>>2]);i=e;return ca(f)}function Qd(a,b){a=a|0;b=b|0;var d=0,e=0,f=zb;e=i;i=i+16|0;d=e;if(b>>>0>=6){c[d>>2]=5744;nc(0,5316,d);ab()}a:do switch(b|0){case 0:if((c[a+496>>2]|0)==2){b=a+492|0;break a}else{b=a+488|0;break a}case 2:if((c[a+496>>2]|0)==2){b=a+488|0;break a}else{b=a+492|0;break a}default:b=a+472+(b<<2)|0}while(0);f=ca(g[b>>2]);i=e;return ca(f)}function Rd(a,b,d,e,f,h,i,j,l,m,n,o){a=a|0;b=ca(b);d=d|0;e=ca(e);f=f|0;h=ca(h);i=i|0;j=ca(j);l=ca(l);m=ca(m);n=ca(n);o=ca(o);var p=0,q=0;if(l<ca(0.0)|m<ca(0.0)){i=0;return i|0}do if((f|0)==(a|0))if(((g[k>>2]=h,c[k>>2]|0)&2147483647)>>>0>2139095040){p=((g[k>>2]=b,c[k>>2]|0)&2147483647)>>>0>2139095040;break}else{p=ca(O(ca(h-b)))<ca(.0000999999974);break}else p=0;while(0);do if((i|0)==(d|0))if(((g[k>>2]=j,c[k>>2]|0)&2147483647)>>>0>2139095040){q=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040;break}else{q=ca(O(ca(j-e)))<ca(.0000999999974);break}else q=0;while(0);a:do if(!p){n=ca(b-n);if((a|0)==1){if(((g[k>>2]=n,c[k>>2]|0)&2147483647)>>>0>2139095040){if(((g[k>>2]=l,c[k>>2]|0)&2147483647)>>>0>2139095040){a=1;break}}else if(ca(O(ca(n-l)))<ca(.0000999999974)){a=1;break}a=0;break}p=(a|0)==2;do if(p&(f|0)==0){if(n>=l){a=1;break a}if(((g[k>>2]=n,c[k>>2]|0)&2147483647)>>>0>2139095040)if(((g[k>>2]=l,c[k>>2]|0)&2147483647)>>>0>2139095040){a=1;break a}else{p=1;break}else if(ca(O(ca(n-l)))<ca(.0000999999974)){a=1;break a}else{p=1;break}}while(0);if(n<h&((f|0)==2&p))if(!(n>=l))if(((g[k>>2]=n,c[k>>2]|0)&2147483647)>>>0>2139095040){a=((g[k>>2]=l,c[k>>2]|0)&2147483647)>>>0>2139095040;break}else{a=ca(O(ca(n-l)))<ca(.0000999999974);break}else a=1;else a=0}else a=1;while(0);b:do if(!q){n=ca(e-o);if((d|0)==1){if(((g[k>>2]=n,c[k>>2]|0)&2147483647)>>>0>2139095040){if(((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0>2139095040){p=1;break}}else if(ca(O(ca(n-m)))<ca(.0000999999974)){p=1;break}p=0;break}p=(d|0)==2;do if(p&(i|0)==0){if(n>=m){p=1;break b}if(((g[k>>2]=n,c[k>>2]|0)&2147483647)>>>0>2139095040)if(((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0>2139095040){p=1;break b}else{p=1;break}else if(ca(O(ca(n-m)))<ca(.0000999999974)){p=1;break b}else{p=1;break}}while(0);if(n<j&((i|0)==2&p))if(!(n>=m))if(((g[k>>2]=n,c[k>>2]|0)&2147483647)>>>0>2139095040){p=((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0>2139095040;break}else{p=ca(O(ca(n-m)))<ca(.0000999999974);break}else p=1;else p=0}else p=1;while(0);i=a&p;return i|0}function Sd(b,d,e,f,j,l,m,n,o,p){b=b|0;d=ca(d);e=ca(e);f=f|0;j=j|0;l=l|0;m=ca(m);n=ca(n);o=o|0;p=p|0;var q=0,r=0,t=0,u=0,v=0,w=zb,x=zb,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=zb,J=zb,K=zb,L=0.0,M=0.0;H=i;i=i+160|0;E=H+120|0;C=H+104|0;B=H+72|0;z=H+56|0;D=H+8|0;A=H;c[141]=(c[141]|0)+1;G=b+968|0;if((a[G>>0]|0)!=0?(c[b+508>>2]|0)!=(c[140]|0):0)y=4;else if((c[b+512>>2]|0)==(f|0))F=0;else y=4;if((y|0)==4){c[b+516>>2]=0;c[b+920>>2]=-1;c[b+924>>2]=-1;g[b+928>>2]=ca(-1.0);g[b+932>>2]=ca(-1.0);F=1}a:do if(!(c[b+952>>2]|0)){if(o){q=b+912|0;w=ca(g[q>>2]);if(((g[k>>2]=w,c[k>>2]|0)&2147483647)>>>0>2139095040){if(((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0<=2139095040){q=0;y=62;break}}else if(!(ca(O(ca(w-d)))<ca(.0000999999974))){q=0;y=62;break}w=ca(g[b+916>>2]);if(((g[k>>2]=w,c[k>>2]|0)&2147483647)>>>0>2139095040){if(((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0<=2139095040){q=0;y=62;break}}else if(!(ca(O(ca(w-e)))<ca(.0000999999974))){q=0;y=62;break}if((c[b+920>>2]|0)!=(j|0)){q=0;y=62;break}q=(c[b+924>>2]|0)==(l|0)?q:0;y=53;break}r=c[b+516>>2]|0;if(!r){q=0;y=62}else{t=((g[k>>2]=d,c[k>>2]|0)&2147483647)>>>0>2139095040;u=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040;v=0;while(1){q=b+520+(v*24|0)|0;w=ca(g[q>>2]);if(((g[k>>2]=w,c[k>>2]|0)&2147483647)>>>0>2139095040){if(t)y=47}else if(ca(O(ca(w-d)))<ca(.0000999999974))y=47;do if((y|0)==47){y=0;w=ca(g[b+520+(v*24|0)+4>>2]);if(((g[k>>2]=w,c[k>>2]|0)&2147483647)>>>0>2139095040){if(!u)break}else if(!(ca(O(ca(w-e)))<ca(.0000999999974)))break;if((c[b+520+(v*24|0)+8>>2]|0)==(j|0)?(c[b+520+(v*24|0)+12>>2]|0)==(l|0):0){y=53;break a}}while(0);v=v+1|0;if(v>>>0>=r>>>0){q=0;y=62;break}}}}else{q=c[b+96>>2]|0;b:do if(!q){do if(!(c[b+64>>2]|0))if(!(c[b+112>>2]|0)){q=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{q=b+108|0;break}else q=b+60|0;while(0);r=c[q+4>>2]|0;if((r|0)==3)w=ca(0.0);else switch(r|0){case 2:{w=ca(ca(ca(g[q>>2])*m)/ca(100.0));break b}case 1:{w=ca(g[q>>2]);break b}default:{w=ca(s);break b}}}else{r=b+92|0;if((q|0)==3)w=ca(0.0);else switch(q|0){case 2:{w=ca(ca(ca(g[r>>2])*m)/ca(100.0));break b}case 1:{w=ca(g[r>>2]);break b}default:{w=ca(s);break b}}}while(0);x=ca(w+ca(Xd(b,2,m)));do if(!(c[b+72>>2]|0))if(!(c[b+120>>2]|0)){q=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{q=b+116|0;break}else q=b+68|0;while(0);r=c[q+4>>2]|0;c:do if((r|0)==3)w=ca(0.0);else switch(r|0){case 2:{w=ca(ca(ca(g[q>>2])*m)/ca(100.0));break c}case 1:{w=ca(g[q>>2]);break c}default:{w=ca(s);break c}}while(0);w=ca(w+ca(Xd(b,0,m)));q=b+912|0;K=ca(g[q>>2]);J=ca(g[b+916>>2]);I=ca(g[b+928>>2]);if(!(Rd(j,d,l,e,c[b+920>>2]|0,K,c[b+924>>2]|0,J,I,ca(g[b+932>>2]),x,w)|0)){r=c[b+516>>2]|0;if(!r){q=0;y=62}else{t=0;while(1){q=b+520+(t*24|0)|0;I=ca(g[q>>2]);J=ca(g[b+520+(t*24|0)+4>>2]);K=ca(g[b+520+(t*24|0)+16>>2]);if(Rd(j,d,l,e,c[b+520+(t*24|0)+8>>2]|0,I,c[b+520+(t*24|0)+12>>2]|0,J,K,ca(g[b+520+(t*24|0)+20>>2]),x,w)|0){y=53;break a}t=t+1|0;if(t>>>0>=r>>>0){q=0;y=62;break}}}}else y=53}while(0);if((y|0)==53)if((q|0)!=0&(F^1)){u=q+16|0;c[b+904>>2]=c[u>>2];v=q+20|0;c[b+908>>2]=c[v>>2];if(!((a[5314]|0)==0|(a[5315]|0)==0)){r=c[141]|0;c[A>>2]=r>>>0>60?5798:5798+(60-r)|0;c[A+4>>2]=r;sn(5859,A)|0;r=c[b+960>>2]|0;if(r)Db[r&127](b);if(j>>>0>2)t=5876;else t=c[(o?1568:1580)+(j<<2)>>2]|0;if(l>>>0>2)r=5876;else r=c[(o?1568:1580)+(l<<2)>>2]|0;M=+ca(g[u>>2]);L=+ca(g[v>>2]);c[D>>2]=t;c[D+4>>2]=r;h[D+8>>3]=+d;h[D+16>>3]=+e;h[D+24>>3]=M;h[D+32>>3]=L;c[D+40>>2]=p;sn(5877,D)|0}}else y=62;if((y|0)==62){if(a[5314]|0){r=c[141]|0;c[z>>2]=r>>>0>60?5798:5798+(60-r)|0;c[z+4>>2]=r;c[z+8>>2]=F?5926:5876;sn(5928,z)|0;r=c[b+960>>2]|0;if(r)Db[r&127](b);if(j>>>0>2)t=5876;else t=c[(o?1568:1580)+(j<<2)>>2]|0;if(l>>>0>2)r=5876;else r=c[(o?1568:1580)+(l<<2)>>2]|0;c[B>>2]=t;c[B+4>>2]=r;h[B+8>>3]=+d;h[B+16>>3]=+e;c[B+24>>2]=p;sn(5937,B)|0}Yd(b,d,e,f,j,l,m,n,o);if(a[5314]|0){r=c[141]|0;c[C>>2]=r>>>0>60?5798:5798+(60-r)|0;c[C+4>>2]=r;c[C+8>>2]=F?5926:5876;sn(5971,C)|0;r=c[b+960>>2]|0;if(r)Db[r&127](b);if(j>>>0>2)t=5876;else t=c[(o?1568:1580)+(j<<2)>>2]|0;if(l>>>0>2)r=5876;else r=c[(o?1568:1580)+(l<<2)>>2]|0;L=+ca(g[b+904>>2]);M=+ca(g[b+908>>2]);c[E>>2]=t;c[E+4>>2]=r;h[E+8>>3]=L;h[E+16>>3]=M;c[E+24>>2]=p;sn(5980,E)|0}c[b+512>>2]=f;if(!q){r=b+516|0;q=c[r>>2]|0;if((q|0)==16){if(a[5314]|0)tn(6012)|0;c[r>>2]=0;q=0}if(o)q=b+912|0;else{c[r>>2]=q+1;q=b+520+(q*24|0)|0}g[q>>2]=d;g[q+4>>2]=e;c[q+8>>2]=j;c[q+12>>2]=l;c[q+16>>2]=c[b+904>>2];c[q+20>>2]=c[b+908>>2];q=0}}if(!o){G=c[141]|0;G=G+-1|0;c[141]=G;G=c[140]|0;o=b+508|0;c[o>>2]=G;o=(q|0)==0;o=F|o;i=H;return o|0}c[b+416>>2]=c[b+904>>2];c[b+420>>2]=c[b+908>>2];a[b+969>>0]=1;a[G>>0]=0;G=c[141]|0;G=G+-1|0;c[141]=G;G=c[140]|0;o=b+508|0;c[o>>2]=G;o=(q|0)==0;o=F|o;i=H;return o|0}function Td(b,e,f,h){b=b|0;e=ca(e);f=ca(f);h=h|0;var i=zb,j=0,l=zb,m=0,n=0,o=0,p=zb,q=0,r=0,t=0,u=0;c[140]=(c[140]|0)+1;m=b+380|0;o=c[b+384>>2]|0;if(((o|0)!=0?(r=b+368|0,(o|0)==(d[r>>0]|d[r+1>>0]<<8|d[r+2>>0]<<16|d[r+3>>0]<<24|0)):0)?(a[k>>0]=a[m>>0],a[k+1>>0]=a[m+1>>0],a[k+2>>0]=a[m+2>>0],a[k+3>>0]=a[m+3>>0],p=ca(g[k>>2]),r=b+364|0,a[k>>0]=a[r>>0],a[k+1>>0]=a[r+1>>0],a[k+2>>0]=a[r+2>>0],a[k+3>>0]=a[r+3>>0],ca(O(ca(p-ca(g[k>>2]))))<ca(.0000999999974)):0){c[b+972>>2]=m;n=m}else{n=b+348|0;c[b+972>>2]=n}r=b+388|0;q=b+392|0;j=c[q>>2]|0;if(((j|0)!=0?(u=b+376|0,(j|0)==(d[u>>0]|d[u+1>>0]<<8|d[u+2>>0]<<16|d[u+3>>0]<<24|0)):0)?(a[k>>0]=a[r>>0],a[k+1>>0]=a[r+1>>0],a[k+2>>0]=a[r+2>>0],a[k+3>>0]=a[r+3>>0],p=ca(g[k>>2]),u=b+372|0,a[k>>0]=a[u>>0],a[k+1>>0]=a[u+1>>0],a[k+2>>0]=a[u+2>>0],a[k+3>>0]=a[u+3>>0],ca(O(ca(p-ca(g[k>>2]))))<ca(.0000999999974)):0)c[b+976>>2]=r;else c[b+976>>2]=b+356;a:do if(((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040){switch(c[n+4>>2]|0){case 2:case 0:case 3:{t=30;break}case 1:{if(ca(g[n>>2])<ca(0.0))t=30;else l=ca(g[n>>2]);break}default:l=ca(s)}if((t|0)==30){switch(o|0){case 2:{l=ca(g[m>>2]);i=ca(ca(l*e)/ca(100.0));break}case 1:{l=ca(g[m>>2]);i=l;break}default:{p=e;n=0;break a}}if(!(i>=ca(0.0))){p=e;n=0;break}switch(o|0){case 2:{p=ca(ca(l*e)/ca(100.0));n=2;break a}case 1:{p=l;n=2;break a}default:{p=ca(s);n=2;break a}}}j=c[b+96>>2]|0;b:do if(!j){do if(!(c[b+64>>2]|0))if(!(c[b+112>>2]|0)){j=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{j=b+108|0;break}else j=b+60|0;while(0);m=c[j+4>>2]|0;if((m|0)==3)i=ca(0.0);else switch(m|0){case 2:{i=ca(ca(ca(g[j>>2])*e)/ca(100.0));break b}case 1:{i=ca(g[j>>2]);break b}default:{i=ca(s);break b}}}else{m=b+92|0;if((j|0)==3)i=ca(0.0);else switch(j|0){case 2:{i=ca(ca(ca(g[m>>2])*e)/ca(100.0));break b}case 1:{i=ca(g[m>>2]);break b}default:{i=ca(s);break b}}}while(0);p=ca(l+ca(i+ca(Xd(b,2,e))));n=1}else{p=e;n=1}while(0);c:do if(((g[k>>2]=f,c[k>>2]|0)&2147483647)>>>0>2139095040){j=c[b+976>>2]|0;switch(c[j+4>>2]|0){case 2:case 0:case 3:{t=51;break}case 1:{if(ca(g[j>>2])<ca(0.0))t=51;else l=ca(g[j>>2]);break}default:l=ca(s)}if((t|0)==51){j=c[q>>2]|0;switch(j|0){case 2:{i=ca(g[r>>2]);l=ca(ca(i*f)/ca(100.0));break}case 1:{i=ca(g[r>>2]);l=i;break}default:{i=f;j=0;break c}}if(!(l>=ca(0.0))){i=f;j=0;break}switch(j|0){case 2:{i=ca(ca(i*f)/ca(100.0));j=2;break c}case 1:{j=2;break c}default:{i=ca(s);j=2;break c}}}do if(!(c[b+72>>2]|0))if(!(c[b+120>>2]|0)){j=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{j=b+116|0;break}else j=b+68|0;while(0);m=c[j+4>>2]|0;d:do if((m|0)==3)i=ca(0.0);else switch(m|0){case 2:{i=ca(ca(ca(g[j>>2])*e)/ca(100.0));break d}case 1:{i=ca(g[j>>2]);break d}default:{i=ca(s);break d}}while(0);i=ca(l+ca(i+ca(Xd(b,0,e))));j=1}else{i=f;j=1}while(0);if(!(Sd(b,p,i,h,n,j,e,f,1,6034)|0))return;Zd(b,c[b+496>>2]|0,e,f,e);if(a[6042]|0)_d(b);if(!(a[5313]|0))return;Wd(b,7,0);return}function Ud(b){b=b|0;return (a[6042+b>>0]|0)!=0|0}function Vd(b,c){b=b|0;c=c|0;a[6042+b>>0]=c&1;return}function Wd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,j=0,l=0,m=zb,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;V=i;i=i+304|0;R=V+296|0;U=V+288|0;T=V+280|0;Q=V+272|0;P=V+264|0;O=V+256|0;N=V+248|0;M=V+240|0;L=V+224|0;K=V+208|0;I=V+200|0;H=V+192|0;F=V+184|0;E=V+176|0;D=V+168|0;C=V+160|0;B=V+152|0;A=V+144|0;z=V+136|0;y=V+128|0;x=V+120|0;w=V+112|0;u=V+104|0;t=V+96|0;s=V+88|0;r=V+80|0;q=V+72|0;p=V+64|0;o=V+56|0;n=V+48|0;l=V+40|0;J=V+32|0;G=V+24|0;v=V+16|0;j=V+8|0;f=V;S=(d|0)==0;if(!S){e=0;do{nc(3,6416,f);e=e+1|0}while((e|0)!=(d|0))}nc(3,6419,j);e=c[a+960>>2]|0;if(e)Db[e&127](a);if(b&1){nc(3,6421,v);h[G>>3]=+ca(g[a+416>>2]);nc(3,6431,G);h[J>>3]=+ca(g[a+420>>2]);nc(3,6443,J);h[l>>3]=+ca(g[a+404>>2]);nc(3,6456,l);h[n>>3]=+ca(g[a+400>>2]);nc(3,6466,n);nc(3,6475,o)}if(b&2){switch(c[a+4>>2]|0){case 0:{nc(3,6479,p);break}case 1:{nc(3,6505,q);break}case 2:{nc(3,6539,r);break}case 3:{nc(3,6562,s);break}default:{}}switch(c[a+8>>2]|0){case 1:{nc(3,6593,t);break}case 2:{nc(3,6620,u);break}case 4:{nc(3,6649,w);break}case 3:{nc(3,6682,x);break}default:{}}switch(c[a+16>>2]|0){case 2:{nc(3,6716,y);break}case 3:{nc(3,6739,z);break}case 4:{nc(3,6764,A);break}default:{}}switch(c[a+12>>2]|0){case 2:{nc(3,6788,B);break}case 3:{nc(3,6813,C);break}case 4:{nc(3,6840,D);break}default:{}}switch(c[a+20>>2]|0){case 1:{nc(3,6866,E);break}case 2:{nc(3,6892,F);break}case 3:{nc(3,6914,H);break}case 4:{nc(3,6938,I);break}default:{}}m=ca(g[a+44>>2]);if(((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0>2139095040){m=ca(g[a+40>>2]);J=m>ca(0.0)&((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0<2139095041;m=J?m:ca(0.0)}if(((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0<=2139095040){c[K>>2]=6970;h[K+8>>3]=+m;nc(3,6961,K)}m=ca(g[a+48>>2]);if(((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0>2139095040){m=ca(g[a+40>>2]);K=m<ca(0.0)&((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0<2139095041;m=ca(-m);m=K?m:ca(0.0)}if(((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0<=2139095040){c[L>>2]=6979;h[L+8>>3]=+m;nc(3,6961,L)}switch(c[a+56>>2]|0){case 0:case 3:{m=ca(g[a+40>>2]);e=m>ca(0.0)&((g[k>>2]=m,c[k>>2]|0)&2147483647)>>>0<2139095041;e=e?1552:1560;break}default:e=a+52|0}ke(6990,e);switch(c[a+32>>2]|0){case 1:{nc(3,7e3,M);break}case 0:{nc(3,7021,N);break}case 2:{nc(3,7043,O);break}default:{}}e=a+60|0;f=le(e)|0;do if(!(c[a+64>>2]|0))if(!(c[a+112>>2]|0)){e=(c[a+128>>2]|0)==0?1552:a+124|0;break}else{e=a+108|0;break}while(0);if(f)me(7064,e);else{me(7071,e);do if(!(c[a+80>>2]|0))if(!(c[a+112>>2]|0)){e=(c[a+128>>2]|0)==0?1552:a+124|0;break}else{e=a+108|0;break}else e=a+76|0;while(0);me(7082,e);do if(!(c[a+72>>2]|0))if(!(c[a+120>>2]|0)){e=(c[a+128>>2]|0)==0?1552:a+124|0;break}else{e=a+116|0;break}else e=a+68|0;while(0);me(7094,e);do if(!(c[a+88>>2]|0))if(!(c[a+120>>2]|0)){e=(c[a+128>>2]|0)==0?1552:a+124|0;break}else{e=a+116|0;break}else e=a+84|0;while(0);me(7104,e);do if(!(c[a+96>>2]|0))if(!(c[a+112>>2]|0)){e=(c[a+128>>2]|0)==0?1624:a+124|0;break}else{e=a+108|0;break}else e=a+92|0;while(0);me(7117,e);do if(!(c[a+104>>2]|0))if(!(c[a+112>>2]|0)){e=(c[a+128>>2]|0)==0?1624:a+124|0;break}else{e=a+108|0;break}else e=a+100|0;while(0);me(7129,e)}e=a+204|0;f=le(e)|0;do if(!(c[a+208>>2]|0))if(!(c[a+256>>2]|0)){e=(c[a+272>>2]|0)==0?1552:a+268|0;break}else{e=a+252|0;break}while(0);if(f)me(7139,e);else{me(7147,e);do if(!(c[a+224>>2]|0))if(!(c[a+256>>2]|0)){e=(c[a+272>>2]|0)==0?1552:a+268|0;break}else{e=a+252|0;break}else e=a+220|0;while(0);me(7159,e);do if(!(c[a+216>>2]|0))if(!(c[a+264>>2]|0)){e=(c[a+272>>2]|0)==0?1552:a+268|0;break}else{e=a+260|0;break}else e=a+212|0;while(0);me(7172,e);do if(!(c[a+232>>2]|0))if(!(c[a+264>>2]|0)){e=(c[a+272>>2]|0)==0?1552:a+268|0;break}else{e=a+260|0;break}else e=a+228|0;while(0);me(7183,e);do if(!(c[a+240>>2]|0))if(!(c[a+256>>2]|0)){e=(c[a+272>>2]|0)==0?1624:a+268|0;break}else{e=a+252|0;break}else e=a+236|0;while(0);me(7197,e);do if(!(c[a+248>>2]|0))if(!(c[a+256>>2]|0)){e=(c[a+272>>2]|0)==0?1624:a+268|0;break}else{e=a+252|0;break}else e=a+244|0;while(0);me(7210,e)}e=a+276|0;f=le(e)|0;do if(!(c[a+280>>2]|0))if(!(c[a+328>>2]|0)){e=(c[a+344>>2]|0)==0?1552:a+340|0;break}else{e=a+324|0;break}while(0);if(f)me(7221,e);else{me(7233,e);do if(!(c[a+296>>2]|0))if(!(c[a+328>>2]|0)){e=(c[a+344>>2]|0)==0?1552:a+340|0;break}else{e=a+324|0;break}else e=a+292|0;while(0);me(7249,e);do if(!(c[a+288>>2]|0))if(!(c[a+336>>2]|0)){e=(c[a+344>>2]|0)==0?1552:a+340|0;break}else{e=a+332|0;break}else e=a+284|0;while(0);me(7266,e);do if(!(c[a+304>>2]|0))if(!(c[a+336>>2]|0)){e=(c[a+344>>2]|0)==0?1552:a+340|0;break}else{e=a+332|0;break}else e=a+300|0;while(0);me(7281,e);do if(!(c[a+312>>2]|0))if(!(c[a+328>>2]|0)){e=(c[a+344>>2]|0)==0?1624:a+340|0;break}else{e=a+324|0;break}else e=a+308|0;while(0);me(7299,e);do if(!(c[a+320>>2]|0))if(!(c[a+328>>2]|0)){e=(c[a+344>>2]|0)==0?1624:a+340|0;break}else{e=a+324|0;break}else e=a+316|0;while(0);me(7316,e)}ke(7331,a+348|0);ke(7337,a+356|0);ke(7344,a+380|0);ke(7353,a+388|0);ke(7363,a+364|0);ke(7372,a+372|0);if((c[a+24>>2]|0)==1)nc(3,7382,P);e=a+132|0;do if(!(c[a+136>>2]|0))if(!(c[a+184>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+180|0;break}while(0);ke(7405,e);do if(!(c[a+152>>2]|0))if(!(c[a+184>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+180|0;break}else e=a+148|0;while(0);ke(7410,e);do if(!(c[a+144>>2]|0))if(!(c[a+192>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+188|0;break}else e=a+140|0;while(0);ke(7416,e);do if(!(c[a+160>>2]|0))if(!(c[a+192>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+188|0;break}else e=a+156|0;while(0);ke(7420,e)}j=a+944|0;l=hc(c[j>>2]|0)|0;if(!((b&4|0)!=0&(l|0)!=0)){nc(3,7445,R);i=V;return}nc(3,7427,Q);e=d+1|0;f=0;do{Wd(lc(c[j>>2]|0,f)|0,b,e);f=f+1|0}while((f|0)!=(l|0));if(!S){e=0;do{nc(3,6416,T);e=e+1|0}while((e|0)!=(d|0))}nc(3,7440,U);i=V;return}function Xd(a,b,d){a=a|0;b=b|0;d=ca(d);var e=0,f=0;if((b&-2|0)==2?(f=c[a+104>>2]|0,(f|0)!=0):0){e=a+100|0;if((f|0)==3){d=ca(0.0);return ca(d)}switch(f|0){case 2:{d=ca(ca(ca(g[e>>2])*d)/ca(100.0));return ca(d)}case 1:{d=ca(g[e>>2]);return ca(d)}default:{d=ca(s);return ca(d)}}}e=c[1608+(b<<2)>>2]|0;a:do if(!(c[a+60+(e<<3)+4>>2]|0)){if(b>>>0<2?(c[a+120>>2]|0)!=0:0){e=a+116|0;break}switch(e|0){case 0:case 2:case 4:case 5:{if(c[a+112>>2]|0){e=a+108|0;break a}break}default:{}}e=(c[a+128>>2]|0)==0?1552:a+124|0}else e=a+60+(e<<3)|0;while(0);f=c[e+4>>2]|0;if((f|0)==3){d=ca(0.0);return ca(d)}switch(f|0){case 2:{d=ca(ca(ca(g[e>>2])*d)/ca(100.0));return ca(d)}case 1:{d=ca(g[e>>2]);return ca(d)}default:{d=ca(s);return ca(d)}}return ca(0)}function Yd(b,e,f,h,j,l,m,n,o){b=b|0;e=ca(e);f=ca(f);h=h|0;j=j|0;l=l|0;m=ca(m);n=ca(n);o=o|0;var p=0,q=zb,r=zb,t=zb,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=zb,C=zb,D=zb,E=zb,F=zb,G=zb,H=0,I=0,J=zb,K=0,L=0,M=0,N=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,da=0,ea=0,fa=0,ga=0,ha=zb,ia=zb,ja=0,ka=0,la=0,ma=0,na=0,oa=zb,pa=zb,qa=0,ra=0,sa=0,ta=zb,ua=zb,va=zb,wa=zb,xa=zb,ya=zb,za=zb,Aa=zb,Ba=0,Ca=0,Da=zb,Ea=zb,Fa=0,Ga=0,Ha=zb,Ia=zb,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=zb,Va=zb,Wa=zb;Ta=i;i=i+32|0;u=Ta+8|0;p=Ta;x=Ta+16|0;w=((g[k>>2]=e,c[k>>2]|0)&2147483647)>>>0>2139095040;if(!((j|0)==0|w^1)){c[p>>2]=6045;nc(0,5316,p);ab()}v=((g[k>>2]=f,c[k>>2]|0)&2147483647)>>>0>2139095040;if(!((l|0)==0|v^1)){c[u>>2]=6125;nc(0,5316,u);ab()}Oa=c[b>>2]|0;Oa=(Oa|0)==0?((h|0)!=0?h:1):Oa;c[b+496>>2]=Oa;Qa=(Oa|0)==2;Pa=Qa?3:2;y=b+96|0;p=c[y>>2]|0;a:do if(!p){p=c[1592+(Pa<<2)>>2]|0;b:do if(!(c[b+60+(p<<3)+4>>2]|0)){switch(p|0){case 0:case 2:case 4:case 5:{if(c[b+112>>2]|0){p=b+108|0;break b}break}default:{}}p=(c[b+128>>2]|0)==0?1552:b+124|0}else p=b+60+(p<<3)|0;while(0);h=c[p+4>>2]|0;if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*m)/ca(100.0));break a}case 1:{q=ca(g[p>>2]);break a}default:{q=ca(s);break a}}}else{h=b+92|0;if((p|0)==3)q=ca(0.0);else switch(p|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break a}case 1:{q=ca(g[h>>2]);break a}default:{q=ca(s);break a}}}while(0);g[b+440>>2]=q;g[b+444>>2]=ca(Xd(b,Pa,m));z=b+72|0;do if(!(c[z>>2]|0))if(!(c[b+120>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+116|0;break}else p=b+68|0;while(0);h=c[p+4>>2]|0;c:do if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*m)/ca(100.0));break c}case 1:{q=ca(g[p>>2]);break c}default:{q=ca(s);break c}}while(0);g[b+428>>2]=q;g[b+436>>2]=ca(Xd(b,0,m));g[b+464>>2]=ca(ce(b,Pa));g[b+468>>2]=ca(de(b,Pa));Ra=b+288|0;do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);g[b+452>>2]=ca($m(ca(g[p>>2]),ca(0.0)));Sa=b+304|0;do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);g[b+460>>2]=ca($m(ca(g[p>>2]),ca(0.0)));g[b+488>>2]=ca(ee(b,Pa,m));g[b+492>>2]=ca(fe(b,Pa,m));g[b+476>>2]=ca(ee(b,0,m));g[b+484>>2]=ca(fe(b,0,m));u=b+952|0;if(c[u>>2]|0){q=ca(ee(b,2,e));q=ca(q+ca(ce(b,2)));D=ca(fe(b,2,e));D=ca(q+ca(D+ca(de(b,2))));q=ca(ee(b,0,e));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);q=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));r=ca(fe(b,0,e));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);C=ca(q+ca(r+ca($m(ca(g[p>>2]),ca(0.0)))));p=c[y>>2]|0;d:do if(!p){do if(!(c[b+64>>2]|0))if(!(c[b+112>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+108|0;break}else p=b+60|0;while(0);h=c[p+4>>2]|0;if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*e)/ca(100.0));break d}case 1:{q=ca(g[p>>2]);break d}default:{q=ca(s);break d}}}else{h=b+92|0;if((p|0)==3)q=ca(0.0);else switch(p|0){case 2:{q=ca(ca(ca(g[h>>2])*e)/ca(100.0));break d}case 1:{q=ca(g[h>>2]);break d}default:{q=ca(s);break d}}}while(0);r=ca(q+ca(Xd(b,2,e)));do if(!(c[z>>2]|0))if(!(c[b+120>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+116|0;break}else p=b+68|0;while(0);h=c[p+4>>2]|0;e:do if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*e)/ca(100.0));break e}case 1:{q=ca(g[p>>2]);break e}default:{q=ca(s);break e}}while(0);t=ca(e-r);B=ca(t-D);q=ca(f-ca(q+ca(Xd(b,0,e))));r=ca(q-C);do if(!((j|0)==1&(l|0)==1))if(B<=ca(0.0)|r<=ca(0.0)){Ia=ca(ge(b,2,ca(0.0),e));q=ca(ee(b,2,e));q=ca(q+ca(ce(b,2)));t=ca(fe(b,2,e));g[b+904>>2]=ca($m(Ia,ca(q+ca(t+ca(de(b,2))))));t=ca(ge(b,0,ca(0.0),f));q=ca(ee(b,0,e));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);r=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));q=ca(fe(b,0,e));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);g[b+908>>2]=ca($m(t,ca(r+ca(q+ca($m(ca(g[p>>2]),ca(0.0)))))));break}else{Sb[c[u>>2]&1](x,b,B,j,r,l);Ha=ca(D+ca(g[x>>2]));Ha=ca(ge(b,2,(j&-3|0)==0?Ha:t,e));Ia=ca(ee(b,2,e));Ia=ca(Ia+ca(ce(b,2)));t=ca(fe(b,2,e));g[b+904>>2]=ca($m(Ha,ca(Ia+ca(t+ca(de(b,2))))));t=ca(C+ca(g[x+4>>2]));t=ca(ge(b,0,(l&-3|0)==0?t:q,f));q=ca(ee(b,0,e));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);r=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));q=ca(fe(b,0,e));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);g[b+908>>2]=ca($m(t,ca(r+ca(q+ca($m(ca(g[p>>2]),ca(0.0)))))));break}else{Ha=ca(ge(b,2,t,m));Ia=ca(ee(b,2,m));Ia=ca(Ia+ca(ce(b,2)));t=ca(fe(b,2,m));g[b+904>>2]=ca($m(Ha,ca(Ia+ca(t+ca(de(b,2))))));t=ca(ge(b,0,q,n));q=ca(ee(b,0,m));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);r=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));q=ca(fe(b,0,m));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);g[b+908>>2]=ca($m(t,ca(r+ca(q+ca($m(ca(g[p>>2]),ca(0.0)))))))}while(0);i=Ta;return}Ma=b+944|0;Na=hc(c[Ma>>2]|0)|0;if(!Na){q=ca(ee(b,2,m));q=ca(q+ca(ce(b,2)));B=ca(fe(b,2,m));B=ca(q+ca(B+ca(de(b,2))));q=ca(ee(b,0,m));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);q=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));r=ca(fe(b,0,m));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);t=ca(q+ca(r+ca($m(ca(g[p>>2]),ca(0.0)))));p=c[y>>2]|0;f:do if(!p){do if(!(c[b+64>>2]|0))if(!(c[b+112>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+108|0;break}else p=b+60|0;while(0);h=c[p+4>>2]|0;if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*m)/ca(100.0));break f}case 1:{q=ca(g[p>>2]);break f}default:{q=ca(s);break f}}}else{h=b+92|0;if((p|0)==3)q=ca(0.0);else switch(p|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break f}case 1:{q=ca(g[h>>2]);break f}default:{q=ca(s);break f}}}while(0);r=ca(q+ca(Xd(b,2,m)));do if(!(c[z>>2]|0))if(!(c[b+120>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+116|0;break}else p=b+68|0;while(0);h=c[p+4>>2]|0;g:do if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*m)/ca(100.0));break g}case 1:{q=ca(g[p>>2]);break g}default:{q=ca(s);break g}}while(0);q=ca(q+ca(Xd(b,0,m)));Ea=ca(e-r);Ea=ca(ge(b,2,(j&-3|0)==0?B:Ea,m));Ha=ca(ee(b,2,m));Ha=ca(Ha+ca(ce(b,2)));Ia=ca(fe(b,2,m));g[b+904>>2]=ca($m(Ea,ca(Ha+ca(Ia+ca(de(b,2))))));q=ca(f-q);t=ca(ge(b,0,(l&-3|0)==0?t:q,n));q=ca(ee(b,0,m));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);r=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));q=ca(fe(b,0,m));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);g[b+908>>2]=ca($m(t,ca(r+ca(q+ca($m(ca(g[p>>2]),ca(0.0)))))));i=Ta;return}do if(!o){u=(j|0)==2;if((!(e<=ca(0.0)&u)?!(f<=ca(0.0)&(l|0)==2):0)?!((j|0)==1&(l|0)==1):0)break;do if(!(c[z>>2]|0))if(!(c[b+120>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+116|0;break}else p=b+68|0;while(0);h=c[p+4>>2]|0;h:do if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*m)/ca(100.0));break h}case 1:{q=ca(g[p>>2]);break h}default:{q=ca(s);break h}}while(0);r=ca(q+ca(Xd(b,0,m)));p=c[y>>2]|0;i:do if(!p){do if(!(c[b+64>>2]|0))if(!(c[b+112>>2]|0)){p=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{p=b+108|0;break}else p=b+60|0;while(0);h=c[p+4>>2]|0;if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[p>>2])*m)/ca(100.0));break i}case 1:{q=ca(g[p>>2]);break i}default:{q=ca(s);break i}}}else{h=b+92|0;if((p|0)==3)q=ca(0.0);else switch(p|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break i}case 1:{q=ca(g[h>>2]);break i}default:{q=ca(s);break i}}}while(0);Qa=w|e<ca(0.0)&u;Ea=ca(e-ca(q+ca(Xd(b,2,m))));Ea=ca(ge(b,2,Qa?ca(0.0):Ea,m));Ha=ca(ee(b,2,m));Ha=ca(Ha+ca(ce(b,2)));Ia=ca(fe(b,2,m));g[b+904>>2]=ca($m(Ea,ca(Ha+ca(Ia+ca(de(b,2))))));if(v)q=ca(0.0);else{Qa=f<ca(0.0)&(l|0)==2;q=ca(f-r);q=Qa?ca(0.0):q}t=ca(ge(b,0,q,n));q=ca(ee(b,0,m));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+284|0;while(0);r=ca(q+ca($m(ca(g[p>>2]),ca(0.0))));q=ca(fe(b,0,m));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){p=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{p=b+332|0;break}else p=b+300|0;while(0);g[b+908>>2]=ca($m(t,ca(r+ca(q+ca($m(ca(g[p>>2]),ca(0.0)))))));i=Ta;return}while(0);Ka=b+4|0;p=c[Ka>>2]|0;j:do if(Qa){switch(p|0){case 2:{p=3;qa=0;La=0;break j}case 3:break;default:{Ga=197;break j}}p=2;qa=0;La=0}else Ga=197;while(0);if((Ga|0)==197){La=p>>>0<2;qa=La;La=La?Pa:0}Fa=(p&-2|0)==2;Ja=b+8|0;ra=c[Ja>>2]|0;Ca=b+28|0;sa=(c[Ca>>2]|0)!=0;za=Fa?m:n;Da=Fa?n:m;ta=ca(ee(b,p,m));ta=ca(ta+ca(ce(b,p)));ua=ca(fe(b,p,m));ua=ca(ua+ca(de(b,p)));va=ca(ee(b,La,m));va=ca(va+ca(ce(b,La)));F=ca(ee(b,p,m));F=ca(F+ca(ce(b,p)));Aa=ca(fe(b,p,m));Aa=ca(F+ca(Aa+ca(de(b,p))));F=ca(ee(b,La,m));F=ca(F+ca(ce(b,La)));Ea=ca(fe(b,La,m));Ea=ca(F+ca(Ea+ca(de(b,La))));ga=Fa?j:l;Ba=Fa?l:j;F=Fa?Aa:Ea;G=Fa?Ea:Aa;h=c[y>>2]|0;k:do if(!h){do if(!(c[b+64>>2]|0))if(!(c[b+112>>2]|0)){h=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{h=b+108|0;break}else h=b+60|0;while(0);u=c[h+4>>2]|0;if((u|0)==3)q=ca(0.0);else switch(u|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break k}case 1:{q=ca(g[h>>2]);break k}default:{q=ca(s);break k}}}else{u=b+92|0;if((h|0)==3)q=ca(0.0);else switch(h|0){case 2:{q=ca(ca(ca(g[u>>2])*m)/ca(100.0));break k}case 1:{q=ca(g[u>>2]);break k}default:{q=ca(s);break k}}}while(0);E=ca(q+ca(Xd(b,2,m)));do if(!(c[z>>2]|0))if(!(c[b+120>>2]|0)){h=(c[b+128>>2]|0)==0?1552:b+124|0;break}else{h=b+116|0;break}else h=b+68|0;while(0);u=c[h+4>>2]|0;l:do if((u|0)==3)q=ca(0.0);else switch(u|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break l}case 1:{q=ca(g[h>>2]);break l}default:{q=ca(s);break l}}while(0);D=ca(q+ca(Xd(b,0,m)));h=b+364|0;switch(c[b+368>>2]|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break}case 1:{q=ca(g[h>>2]);break}default:q=ca(s)}C=ca(ca(q-E)-F);h=b+380|0;switch(c[b+384>>2]|0){case 2:{q=ca(ca(ca(g[h>>2])*m)/ca(100.0));break}case 1:{q=ca(g[h>>2]);break}default:q=ca(s)}t=ca(ca(q-E)-F);h=b+372|0;switch(c[b+376>>2]|0){case 2:{q=ca(ca(ca(g[h>>2])*n)/ca(100.0));break}case 1:{q=ca(g[h>>2]);break}default:q=ca(s)}B=ca(ca(q-D)-G);h=b+388|0;switch(c[b+392>>2]|0){case 2:{q=ca(ca(ca(g[h>>2])*n)/ca(100.0));break}case 1:{q=ca(g[h>>2]);break}default:q=ca(s)}r=ca(ca(q-D)-G);oa=Fa?C:B;pa=Fa?t:r;xa=ca(e-E);q=ca(xa-F);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040)Ia=q;else Ia=ca($m(ca(an(q,t)),C));wa=ca(f-D);q=ca(wa-G);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040)Ha=q;else Ha=ca($m(ca(an(q,r)),B));F=Fa?Ia:Ha;ya=Fa?Ha:Ia;m:do if((ga|0)==1){v=0;u=0;while(1){h=lc(c[Ma>>2]|0,v)|0;do if(u){if(c[h+24>>2]|0){h=u;break}q=ca(g[h+44>>2]);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040){q=ca(g[h+40>>2]);if(q>ca(0.0)&((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0<2139095041){J=q;Ga=242}}else{J=q;Ga=242}if((Ga|0)==242?(Ga=0,J!=ca(0.0)):0){h=0;break m}q=ca(g[h+48>>2]);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040){ia=ca(g[h+40>>2]);q=ca(-ia);if(!(ia<ca(0.0)&((g[k>>2]=ia,c[k>>2]|0)&2147483647)>>>0<2139095041)){h=u;break}}if(q!=ca(0.0)){h=0;break m}else h=u}else{q=ca(g[h+44>>2]);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040){q=ca(g[h+40>>2]);if(!(q>ca(0.0)&((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0<2139095041)){h=0;break}}if(!(q>ca(0.0))){h=0;break}q=ca(g[h+48>>2]);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040){ia=ca(g[h+40>>2]);q=ca(-ia);if(!(ia<ca(0.0)&((g[k>>2]=ia,c[k>>2]|0)&2147483647)>>>0<2139095041)){h=0;break}}if(!(q>ca(0.0))){h=0;break}}while(0);v=v+1|0;if(v>>>0>=Na>>>0)break;else u=h}}else h=0;while(0);aa=(Oa|0)!=0?Oa:1;Y=(g[k>>2]=Ia,c[k>>2]|0)&2147483647;ea=Y>>>0<2139095041;da=(g[k>>2]=Ha,c[k>>2]|0)&2147483647;fa=da>>>0<2139095041;ba=b+32|0;da=da>>>0>2139095040;V=(l|0)==1;W=b+16|0;X=(j|0)==1;Y=Y>>>0>2139095040;Z=h+500|0;_=h+504|0;u=0;v=0;$=0;q=ca(0.0);while(1){U=lc(c[Ma>>2]|0,$)|0;if((c[U+36>>2]|0)==1){he(U);a[U+969>>0]=1;a[U+968>>0]=0}else{P=U+380|0;Q=U+384|0;w=c[Q>>2]|0;do if(!w)Ga=261;else{na=U+368|0;if((w|0)!=(d[na>>0]|d[na+1>>0]<<8|d[na+2>>0]<<16|d[na+3>>0]<<24|0)){Ga=261;break}a[k>>0]=a[P>>0];a[k+1>>0]=a[P+1>>0];a[k+2>>0]=a[P+2>>0];a[k+3>>0]=a[P+3>>0];ia=ca(g[k>>2]);na=U+364|0;a[k>>0]=a[na>>0];a[k+1>>0]=a[na+1>>0];a[k+2>>0]=a[na+2>>0];a[k+3>>0]=a[na+3>>0];if(!(ca(O(ca(ia-ca(g[k>>2]))))<ca(.0000999999974))){Ga=261;break}c[U+972>>2]=P}while(0);if((Ga|0)==261){Ga=0;c[U+972>>2]=U+348}R=U+388|0;S=U+392|0;w=c[S>>2]|0;do if(!w)Ga=266;else{na=U+376|0;if((w|0)!=(d[na>>0]|d[na+1>>0]<<8|d[na+2>>0]<<16|d[na+3>>0]<<24|0)){Ga=266;break}a[k>>0]=a[R>>0];a[k+1>>0]=a[R+1>>0];a[k+2>>0]=a[R+2>>0];a[k+3>>0]=a[R+3>>0];ia=ca(g[k>>2]);na=U+372|0;a[k>>0]=a[na>>0];a[k+1>>0]=a[na+1>>0];a[k+2>>0]=a[na+2>>0];a[k+3>>0]=a[na+3>>0];if(!(ca(O(ca(ia-ca(g[k>>2]))))<ca(.0000999999974))){Ga=266;break}c[U+976>>2]=R}while(0);if((Ga|0)==266){Ga=0;c[U+976>>2]=U+356}if(o){na=c[U>>2]|0;Zd(U,(na|0)==0?aa:na,F,ya,Ia)}n:do if((c[U+24>>2]|0)==1){if(u)c[u+948>>2]=U;c[U+948>>2]=0;u=U;v=(v|0)==0?U:v}else{if((U|0)==(h|0)){c[Z>>2]=c[140];g[_>>2]=ca(0.0);break}w=c[Ka>>2]|0;o:do if(Qa){switch(w|0){case 2:{T=3;break o}case 3:break;default:{Ga=278;break o}}T=2}else Ga=278;while(0);if((Ga|0)==278){Ga=0;T=w}N=(T&-2|0)==2;t=N?Ia:Ha;switch(c[U+56>>2]|0){case 0:case 3:{ia=ca(g[U+40>>2]);w=ia>ca(0.0)&((g[k>>2]=ia,c[k>>2]|0)&2147483647)>>>0<2139095041;w=w?1552:1560;break}default:w=U+52|0}switch(c[w+4>>2]|0){case 2:{r=ca(ca(t*ca(g[w>>2]))/ca(100.0));break}case 1:{r=ca(g[w>>2]);break}default:r=ca(s)}l=U+972|0;w=c[l>>2]|0;x=c[w+4>>2]|0;p:do switch(x|0){case 0:case 3:{A=0;break}case 1:{if(ca(g[w>>2])<ca(0.0)){A=0;break p}A=1;break}default:{if((x|0)!=2){A=1;break p}if(ca(g[w>>2])<ca(0.0)){A=0;break p}A=ea}}while(0);H=U+976|0;y=c[H>>2]|0;z=c[y+4>>2]|0;q:do switch(z|0){case 0:case 3:{I=0;break}case 1:{if(ca(g[y>>2])<ca(0.0)){I=0;break q}I=1;break}default:{if((z|0)!=2){I=1;break q}if(ca(g[y>>2])<ca(0.0)){I=0;break q}I=fa}}while(0);do if(((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0>2139095040)Ga=303;else{if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040){Ga=303;break}w=U+504|0;if((c[w>>2]&2147483647)>>>0<=2139095040){if(!(a[6043]|0))break;if((c[U+500>>2]|0)==(c[140]|0))break}ha=ca(ee(U,T,Ia));ha=ca(ha+ca(ce(U,T)));ia=ca(fe(U,T,Ia));g[w>>2]=ca($m(r,ca(ha+ca(ia+ca(de(U,T))))))}while(0);do if((Ga|0)==303){Ga=0;M=N^1;L=A^1;if(!(M|L)){switch(x|0){case 2:{r=ca(ca(Ia*ca(g[w>>2]))/ca(100.0));break}case 1:{r=ca(g[w>>2]);break}default:r=ca(s)}ha=ca(ee(U,2,Ia));ha=ca(ha+ca(ce(U,2)));ia=ca(fe(U,2,Ia));g[U+504>>2]=ca($m(r,ca(ha+ca(ia+ca(de(U,2))))));break}K=I^1;if(!(N|K)){switch(z|0){case 2:{B=ca(ca(Ha*ca(g[y>>2]))/ca(100.0));break}case 1:{B=ca(g[y>>2]);break}default:B=ca(s)}r=ca(ee(U,0,Ia));do if(!(c[U+288>>2]|0))if(!(c[U+336>>2]|0)){w=(c[U+344>>2]|0)==0?1552:U+340|0;break}else{w=U+332|0;break}else w=U+284|0;while(0);r=ca(r+ca($m(ca(g[w>>2]),ca(0.0))));t=ca(fe(U,0,Ia));do if(!(c[U+304>>2]|0))if(!(c[U+336>>2]|0)){w=(c[U+344>>2]|0)==0?1552:U+340|0;break}else{w=U+332|0;break}else w=U+300|0;while(0);g[U+504>>2]=ca($m(B,ca(r+ca(t+ca($m(ca(g[w>>2]),ca(0.0)))))));break}w=c[U+96>>2]|0;r:do if(!w){do if(!(c[U+64>>2]|0))if(!(c[U+112>>2]|0)){w=(c[U+128>>2]|0)==0?1552:U+124|0;break}else{w=U+108|0;break}else w=U+60|0;while(0);x=c[w+4>>2]|0;if((x|0)==3){r=ca(0.0);break}switch(x|0){case 2:{r=ca(ca(Ia*ca(g[w>>2]))/ca(100.0));break r}case 1:{r=ca(g[w>>2]);break r}default:{r=ca(s);break r}}}else{x=U+92|0;if((w|0)==3){r=ca(0.0);break}switch(w|0){case 2:{r=ca(ca(Ia*ca(g[x>>2]))/ca(100.0));break r}case 1:{r=ca(g[x>>2]);break r}default:{r=ca(s);break r}}}while(0);D=ca(r+ca(Xd(U,2,Ia)));do if(!(c[U+72>>2]|0))if(!(c[U+120>>2]|0)){w=(c[U+128>>2]|0)==0?1552:U+124|0;break}else{w=U+116|0;break}else w=U+68|0;while(0);x=c[w+4>>2]|0;s:do if((x|0)==3)r=ca(0.0);else switch(x|0){case 2:{r=ca(ca(Ia*ca(g[w>>2]))/ca(100.0));break s}case 1:{r=ca(g[w>>2]);break s}default:{r=ca(s);break s}}while(0);C=ca(r+ca(Xd(U,0,Ia)));if(A){w=c[l>>2]|0;switch(c[w+4>>2]|0){case 2:{r=ca(ca(Ia*ca(g[w>>2]))/ca(100.0));break}case 1:{r=ca(g[w>>2]);break}default:r=ca(s)}t=ca(D+r);x=1}else{t=ca(s);x=0}if(I){w=c[H>>2]|0;switch(c[w+4>>2]|0){case 2:{r=ca(ca(Ha*ca(g[w>>2]))/ca(100.0));break}case 1:{r=ca(g[w>>2]);break}default:r=ca(s)}B=ca(C+r);w=1}else{B=ca(s);w=0}y=c[ba>>2]|0;if(!(N&(y|0)==2)){Ga=((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040;t=Ga?(Y?t:Ia):t;x=Ga?(Y?x:2):x;if((y|0)==2&(N^1))Ga=359;else Ga=358}else Ga=358;do if((Ga|0)==358){Ga=0;na=((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0>2139095040;B=na?(da?B:Ha):B;w=na?(da?w:2):w;if(!N){Ga=359;break}if(!(fa&(V&K)))break;y=c[U+20>>2]|0;if(!y)y=c[W>>2]|0;na=(y|0)==4;w=na?1:w;B=na?Ha:B}while(0);do if((Ga|0)==359){Ga=0;if(!(ea&(X&L)))break;y=c[U+20>>2]|0;if(!y)y=c[W>>2]|0;na=(y|0)==4;x=na?1:x;t=na?Ia:t}while(0);r=ca(g[U+396>>2]);do if(((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0<=2139095040){if(!((x|0)==1&M)){if(!(N&(w|0)==1))break;e=ca(ca(B-C)*r);ha=ca(ee(U,2,Ia));ha=ca(ha+ca(ce(U,2)));ia=ca(fe(U,2,Ia));g[U+504>>2]=ca($m(e,ca(ha+ca(ia+ca(de(U,2))))));break n}B=ca(ca(t-D)/r);r=ca(ee(U,0,Ia));do if(!(c[U+288>>2]|0))if(!(c[U+336>>2]|0)){w=(c[U+344>>2]|0)==0?1552:U+340|0;break}else{w=U+332|0;break}else w=U+284|0;while(0);r=ca(r+ca($m(ca(g[w>>2]),ca(0.0))));t=ca(fe(U,0,Ia));do if(!(c[U+304>>2]|0))if(!(c[U+336>>2]|0)){w=(c[U+344>>2]|0)==0?1552:U+340|0;break}else{w=U+332|0;break}else w=U+300|0;while(0);g[U+504>>2]=ca($m(B,ca(r+ca(t+ca($m(ca(g[w>>2]),ca(0.0)))))));break n}while(0);switch(c[Q>>2]|0){case 2:{r=ca(ca(Ia*ca(g[P>>2]))/ca(100.0));break}case 1:{r=ca(g[P>>2]);break}default:r=ca(s)}switch(x|0){case 2:case 1:{t=t<r|((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0>2139095040?t:r;break}case 0:{x=((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0>2139095040;t=x?t:r;x=x?0:2;break}default:{}}switch(c[S>>2]|0){case 2:{r=ca(ca(Ha*ca(g[R>>2]))/ca(100.0));break}case 1:{r=ca(g[R>>2]);break}default:r=ca(s)}switch(w|0){case 2:case 1:{r=B<r|((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0>2139095040?B:r;break}case 0:{w=((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0>2139095040;r=w?B:r;w=w?0:2;break}default:r=B}Sd(U,t,r,Oa,x,w,Ia,Ha,0,6207)|0;e=ca(g[U+904+(c[1632+(T<<2)>>2]<<2)>>2]);ha=ca(ee(U,T,Ia));ha=ca(ha+ca(ce(U,T)));ia=ca(fe(U,T,Ia));g[U+504>>2]=ca($m(e,ca(ha+ca(ia+ca(de(U,T))))))}while(0);c[U+500>>2]=c[140]}while(0);q=ca(q+ca(g[U+504>>2]))}$=$+1|0;if(($|0)==(Na|0)){na=v;break}}h=(ga|0)==0?0:q>F&1;if(sa)ga=(ga|0)==2&(h|0)!=0?1:ga;Q=(Ba|0)==1;R=Q&(o^1);N=((g[k>>2]=oa,c[k>>2]|0)&2147483647)>>>0<2139095041;P=((g[k>>2]=pa,c[k>>2]|0)&2147483647)>>>0<2139095041;S=(ga|0)==2;T=1632+(p<<2)|0;U=(Ba&-3|0)==0;V=(Ba|0)==2;ka=Q&(sa^1);W=(La&-2|0)==2;X=1592+(La<<2)|0;Y=La>>>0<2;Z=1592+(La<<2)|0;_=b+16|0;$=1632+(La<<2)|0;aa=1608+(La<<2)|0;ba=1592+(p<<2)|0;fa=(g[k>>2]=ya,c[k>>2]|0)&2147483647;la=fa>>>0<2139095041;da=1592+(p<<2)|0;ea=1608+(p<<2)|0;fa=fa>>>0>2139095040;ja=fa?0:2;ma=la^1;Q=Q^1;M=sa&(h|0)!=0;I=0;v=0;ia=ca(0.0);r=ca(0.0);while(1){t:do if(I>>>0<Na>>>0){A=0;h=I;H=0;x=0;D=ca(0.0);E=ca(0.0);B=ca(0.0);while(1){l=lc(c[Ma>>2]|0,h)|0;do if((c[l+36>>2]|0)==1){u=A;w=H;q=D;t=E}else{c[l+936>>2]=v;y=l+24|0;if((c[y>>2]|0)==1){u=A;w=H;q=D;t=E;break}L=c[T>>2]|0;u=l+364+(L<<3)|0;switch(c[l+364+(L<<3)+4>>2]|0){case 2:{q=ca(ca(za*ca(g[u>>2]))/ca(100.0));break}case 1:{q=ca(g[u>>2]);break}default:q=ca(s)}z=l+504|0;t=ca($m(q,ca(g[z>>2])));u:do if(Fa){u=c[l+96>>2]|0;if(!u){Ga=413;break}w=l+92|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[w>>2]))/ca(100.0));break u}case 1:{q=ca(g[w>>2]);break u}default:{q=ca(s);break u}}}else Ga=413;while(0);v:do if((Ga|0)==413){Ga=0;u=c[ba>>2]|0;w:do if(!(c[l+60+(u<<3)+4>>2]|0)){do if(qa){if(!(c[l+120>>2]|0))break;u=l+116|0;break w}while(0);x:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[l+112>>2]|0))break x;u=l+108|0;break w}default:{}}while(0);u=(c[l+128>>2]|0)==0?1552:l+124|0}else u=l+60+(u<<3)|0;while(0);w=c[u+4>>2]|0;if((w|0)==3){q=ca(0.0);break}switch(w|0){case 2:{q=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break v}case 1:{q=ca(g[u>>2]);break v}default:{q=ca(s);break v}}}while(0);C=ca(D+ca(t+ca(q+ca(Xd(l,p,Ia)))));if(sa&(x|0)!=0&C>F){L=h;w=H;q=D;t=E;f=B;break t}x=x+1|0;do if(!(c[y>>2]|0)){q=ca(g[l+44>>2]);u=((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040;if(u){t=ca(g[l+40>>2]);if(t>ca(0.0)&((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0<2139095041)Ga=430;else Ga=431}else{t=q;Ga=430}if((Ga|0)==430?(Ga=0,!(t!=ca(0.0))):0)Ga=431;if((Ga|0)==431){Ga=0;t=ca(g[l+48>>2]);if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040){ha=ca(g[l+40>>2]);t=ca(-ha);if(!(ha<ca(0.0)&((g[k>>2]=ha,c[k>>2]|0)&2147483647)>>>0<2139095041)){t=E;break}}if(!(t!=ca(0.0))){t=E;break}}if(u){q=ca(g[l+40>>2]);L=q>ca(0.0)&((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0<2139095041;q=L?q:ca(0.0)}t=ca(E+q);q=ca(g[l+48>>2]);if(((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040){q=ca(g[l+40>>2]);L=q<ca(0.0)&((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0<2139095041;q=ca(-q);q=L?q:ca(0.0)}B=ca(B-ca(q*ca(g[z>>2])))}else t=E;while(0);if(A)c[A+948>>2]=l;c[l+948>>2]=0;u=l;w=(H|0)==0?l:H;q=C}while(0);h=h+1|0;if(h>>>0<Na>>>0){A=u;H=w;D=q;E=t}else{L=h;f=B;break}}}else{L=I;w=0;x=0;q=ca(0.0);t=ca(0.0);f=ca(0.0)}while(0);do if(((g[k>>2]=F,c[k>>2]|0)&2147483647)>>>0>2139095040){if(N&q<oa){ha=oa;break}ha=P&q>pa?pa:F}else ha=F;while(0);do if(((g[k>>2]=ha,c[k>>2]|0)&2147483647)>>>0>2139095040){if(!(q<ca(0.0))){e=ca(0.0);break}e=ca(-q)}else e=ca(ha-q);while(0);y:do if(R)q=ca(0.0);else{z=(w|0)==0;if(z){q=ca(0.0);break}h=e<ca(0.0);G=ca(e/f);u=e>ca(0.0);J=ca(e/t);y=w;C=ca(0.0);q=ca(0.0);B=ca(0.0);do{F=ca(g[y+504>>2]);do if(h){D=ca(g[y+48>>2]);if(((g[k>>2]=D,c[k>>2]|0)&2147483647)>>>0>2139095040){D=ca(g[y+40>>2]);K=D<ca(0.0)&((g[k>>2]=D,c[k>>2]|0)&2147483647)>>>0<2139095041;D=ca(-D);D=K?D:ca(0.0)}D=ca(F*D);if(!(D!=ca(-0.0)))break;Ua=ca(F-ca(D*G));Wa=ca(ge(y,p,Ua,ha));Va=ca(ee(y,p,Ia));Va=ca(Va+ca(ce(y,p)));E=ca(fe(y,p,Ia));E=ca($m(Wa,ca(Va+ca(E+ca(de(y,p))))));if(!(Ua!=E))break;q=ca(q+D);B=ca(B-ca(E-F))}else{if(!u)break;D=ca(g[y+44>>2]);if(((g[k>>2]=D,c[k>>2]|0)&2147483647)>>>0>2139095040){D=ca(g[y+40>>2]);if(!(D>ca(0.0)&((g[k>>2]=D,c[k>>2]|0)&2147483647)>>>0<2139095041))break}if(!(D!=ca(0.0)))break;Wa=ca(F+ca(D*J));Ua=ca(ge(y,p,Wa,ha));Va=ca(ee(y,p,Ia));Va=ca(Va+ca(ce(y,p)));E=ca(fe(y,p,Ia));E=ca($m(Ua,ca(Va+ca(E+ca(de(y,p))))));if(!(Wa!=E))break;C=ca(C-D);B=ca(B-ca(E-F))}while(0);y=c[y+948>>2]|0}while((y|0)!=0);q=ca(f+q);B=ca(e+B);if(z){q=ca(0.0);break}F=ca(t+C);H=B<ca(0.0);K=q==ca(0.0);G=ca(B/q);z=c[T>>2]|0;l=c[$>>2]|0;A=B>ca(0.0);F=ca(B/F);q=ca(0.0);while(1){B=ca(g[w+504>>2]);do if(H){t=ca(g[w+48>>2]);if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040){t=ca(g[w+40>>2]);y=t<ca(0.0)&((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0<2139095041;t=ca(-t);t=y?t:ca(0.0)}Wa=ca(B*t);t=ca(-Wa);if(!(Wa!=ca(-0.0))){C=B;break}Va=ca(G*t);Va=ca(ge(w,p,ca(B+(K?t:Va)),ha));Wa=ca(ee(w,p,Ia));Wa=ca(Wa+ca(ce(w,p)));C=ca(fe(w,p,Ia));C=ca($m(Va,ca(Wa+ca(C+ca(de(w,p))))))}else{if(!A){C=B;break}t=ca(g[w+44>>2]);if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040){t=ca(g[w+40>>2]);if(!(t>ca(0.0)&((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0<2139095041)){C=B;break}}if(!(t!=ca(0.0))){C=B;break}Va=ca(ge(w,p,ca(B+ca(t*F)),ha));Wa=ca(ee(w,p,Ia));Wa=ca(Wa+ca(ce(w,p)));C=ca(fe(w,p,Ia));C=ca($m(Va,ca(Wa+ca(C+ca(de(w,p))))))}while(0);q=ca(q-ca(C-B));z:do if(Fa){h=c[w+96>>2]|0;if(!h){Ga=484;break}u=w+92|0;if((h|0)==3){t=ca(0.0);break}switch(h|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break z}case 1:{t=ca(g[u>>2]);break z}default:{t=ca(s);break z}}}else Ga=484;while(0);A:do if((Ga|0)==484){Ga=0;h=c[ba>>2]|0;B:do if(!(c[w+60+(h<<3)+4>>2]|0)){do if(qa){if(!(c[w+120>>2]|0))break;h=w+116|0;break B}while(0);C:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[w+112>>2]|0))break C;h=w+108|0;break B}default:{}}while(0);h=(c[w+128>>2]|0)==0?1552:w+124|0}else h=w+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break A}case 1:{t=ca(g[h>>2]);break A}default:{t=ca(s);break A}}}while(0);E=ca(t+ca(Xd(w,p,Ia)));D:do if(W){h=c[w+96>>2]|0;if(!h){Ga=503;break}u=w+92|0;if((h|0)==3){t=ca(0.0);break}switch(h|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break D}case 1:{t=ca(g[u>>2]);break D}default:{t=ca(s);break D}}}else Ga=503;while(0);E:do if((Ga|0)==503){Ga=0;h=c[X>>2]|0;F:do if(!(c[w+60+(h<<3)+4>>2]|0)){do if(Y){if(!(c[w+120>>2]|0))break;h=w+116|0;break F}while(0);G:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[w+112>>2]|0))break G;h=w+108|0;break F}default:{}}while(0);h=(c[w+128>>2]|0)==0?1552:w+124|0}else h=w+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break E}case 1:{t=ca(g[h>>2]);break E}default:{t=ca(s);break E}}}while(0);D=ca(t+ca(Xd(w,La,Ia)));t=ca(C+E);u=c[w+972+(l<<2)>>2]|0;y=c[u+4>>2]|0;H:do if(!fa){I:do switch(y|0){case 0:case 3:{h=0;break}case 1:{if(ca(g[u>>2])<ca(0.0))h=0;else{Ga=526;break H}break}case 2:{if(ca(g[u>>2])<ca(0.0)){h=0;break I}h=la;break}default:{B=ca(s);Ga=530;break H}}while(0);if(h|Q|M){Ga=525;break}h=c[w+20>>2]|0;if(!h)h=c[_>>2]|0;if((h|0)==4){C=ya;h=1}else Ga=525}else Ga=525;while(0);J:do if((Ga|0)==525){Ga=0;switch(y|0){case 0:case 3:{C=ya;h=ja;break J}case 1:{Ga=526;break J}case 2:break;default:{B=ca(s);Ga=530;break J}}if(!(la&!(ca(g[u>>2])<ca(0.0)))){C=ya;h=ja;break}B=ca(ca(ya*ca(g[u>>2]))/ca(100.0));Ga=530}while(0);do if((Ga|0)==526){Ga=0;if(ca(g[u>>2])<ca(0.0)){C=ya;h=ja;break}B=ca(g[u>>2]);Ga=530}while(0);if((Ga|0)==530){Ga=0;Wa=ca(D+B);C=Wa;h=((g[k>>2]=Wa,c[k>>2]|0)&2147483647)>>>0<2139095041&1}u=w+396|0;B=ca(g[u>>2]);if(((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0>2139095040)u=h;else{Va=ca(t-E);Ua=ca(Va/B);Va=ca(Va*B);Wa=ca(ee(w,La,Ia));Wa=ca(Wa+ca(ce(w,La)));C=ca(fe(w,La,Ia));C=ca($m(Fa?Ua:Va,ca(Wa+ca(C+ca(de(w,La))))));do if(!(c[w+24>>2]|0)){B=ca(g[w+44>>2]);if(((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0>2139095040){B=ca(g[w+40>>2]);if(B>ca(0.0)&((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0<2139095041)Ga=535;else Ga=536}else Ga=535;if((Ga|0)==535?(Ga=0,!(B!=ca(0.0))):0)Ga=536;if((Ga|0)==536){Ga=0;B=ca(g[w+48>>2]);if(((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0>2139095040){Wa=ca(g[w+40>>2]);B=ca(-Wa);if(!(Wa<ca(0.0)&((g[k>>2]=Wa,c[k>>2]|0)&2147483647)>>>0<2139095041)){B=C;break}}if(!(B!=ca(0.0))){B=C;break}}B=ca(an(ca(C-D),ya));t=ca(g[u>>2]);Wa=ca(B*t);t=ca(B/t);t=ca(E+(Fa?Wa:t))}else B=C;while(0);u=1;C=ca(D+B)}h=w+380+(z<<3)|0;switch(c[w+380+(z<<3)+4>>2]|0){case 2:{B=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break}case 1:{B=ca(g[h>>2]);break}default:B=ca(s)}B=t<B|((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0>2139095040?t:B;h=w+380+(l<<3)|0;switch(c[w+380+(l<<3)+4>>2]|0){case 2:{t=ca(ca(Ha*ca(g[h>>2]))/ca(100.0));break}case 1:{t=ca(g[h>>2]);break}default:t=ca(s)}switch(u|0){case 2:case 1:{C=C<t|((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040?C:t;break}case 0:{u=((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040;C=u?C:t;u=u?0:2;break}default:{}}h=c[w+972+(l<<2)>>2]|0;switch(c[h+4>>2]|0){case 0:case 3:{Ga=553;break}case 1:{if(ca(g[h>>2])<ca(0.0))Ga=553;else h=0;break}case 2:{if(la&!(ca(g[h>>2])<ca(0.0)))h=0;else Ga=553;break}default:h=0}if((Ga|0)==553){Ga=0;h=c[w+20>>2]|0;if(!h)h=c[_>>2]|0;if((h|0)==5?(c[Ka>>2]|0)>>>0<2:0)h=1;h=(h|0)==4}if(o)h=h^1;else h=0;Sd(w,Fa?B:C,Fa?C:B,Oa,Fa?1:u,Fa?u:1,Ia,Ha,h,6215)|0;w=c[w+948>>2]|0;if(!w)break y}}while(0);B=ca(e+q);K:do if(S&B>ca(0.0)){h=c[T>>2]|0;u=c[b+364+(h<<3)+4>>2]|0;if(!u){B=ca(0.0);break}h=b+364+(h<<3)|0;switch(u|0){case 2:{q=ca(g[h>>2]);t=ca(ca(za*q)/ca(100.0));break}case 1:{q=ca(g[h>>2]);t=q;break}default:{B=ca(0.0);break K}}if(!(t>=ca(0.0))){B=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(za*q)/ca(100.0));break}case 1:break;default:q=ca(s)}B=ca($m(ca(0.0),ca(q-ca(ha-B))))}while(0);z=I>>>0<L>>>0;if(z){w=I;h=0;do{u=lc(c[Ma>>2]|0,w)|0;if(!(c[u+24>>2]|0))h=((c[u+60+(c[ba>>2]<<3)+4>>2]|0)==3&1)+h+((c[u+60+(c[ea>>2]<<3)+4>>2]|0)==3&1)|0;w=w+1|0}while((w|0)!=(L|0));if(h){E=ca(0.0);F=ca(0.0)}else Ga=577}else Ga=577;L:do if((Ga|0)==577){Ga=0;switch(ra|0){case 1:{E=ca(0.0);F=ca(B*ca(.5));h=0;break L}case 2:{E=ca(0.0);F=B;h=0;break L}case 3:{if(x>>>0<=1){E=ca(0.0);F=ca(0.0);h=0;break L}E=ca(ca($m(B,ca(0.0)))/ca((x+-1|0)>>>0));F=ca(0.0);h=0;break L}case 4:{F=ca(B/ca(x>>>0));E=F;F=ca(F*ca(.5));h=0;break L}default:{E=ca(0.0);F=ca(0.0);h=0;break L}}}while(0);q=ca(ta+F);if(z){D=ca(B/ca(h|0));t=ca(0.0);y=I;do{x=lc(c[Ma>>2]|0,y)|0;M:do if((c[x+36>>2]|0)!=1){N:do switch(c[x+24>>2]|0){case 1:{if(Fa){do if(!(c[x+168>>2]|0))if(!(c[x+184>>2]|0)){h=(c[x+200>>2]|0)==0?1624:x+196|0;break}else{h=x+180|0;break}else h=x+164|0;while(0);if(!(c[h+4>>2]|0))Ga=594}else Ga=594;if((Ga|0)==594){Ga=0;h=c[ba>>2]|0;O:do if(!(c[x+132+(h<<3)+4>>2]|0)){do if(qa){if(!(c[x+192>>2]|0))break;h=x+188|0;break O}while(0);P:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[x+184>>2]|0))break P;h=x+180|0;break O}default:{}}while(0);h=(c[x+200>>2]|0)==0?1624:x+196|0}else h=x+132+(h<<3)|0;while(0);if(!(c[h+4>>2]|0))break N}if(!o)break M;C=ca(ca(ae(x,p,ha))+ca(ce(b,p)));Q:do if(Fa){h=c[x+96>>2]|0;if(!h){Ga=611;break}u=x+92|0;if((h|0)==3){B=ca(0.0);break}switch(h|0){case 2:{B=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Q}case 1:{B=ca(g[u>>2]);break Q}default:{B=ca(s);break Q}}}else Ga=611;while(0);R:do if((Ga|0)==611){Ga=0;h=c[ba>>2]|0;S:do if(!(c[x+60+(h<<3)+4>>2]|0)){do if(qa){if(!(c[x+120>>2]|0))break;h=x+116|0;break S}while(0);T:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break T;h=x+108|0;break S}default:{}}while(0);h=(c[x+128>>2]|0)==0?1552:x+124|0}else h=x+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){B=ca(0.0);break}switch(u|0){case 2:{B=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break R}case 1:{B=ca(g[h>>2]);break R}default:{B=ca(s);break R}}}while(0);Wa=ca(C+B);g[x+400+(c[da>>2]<<2)>>2]=Wa;break M}case 0:{h=c[ba>>2]|0;w=x+60+(h<<3)+4|0;Wa=ca(q+D);q=(c[w>>2]|0)==3?Wa:q;if(o){K=x+400+(c[da>>2]<<2)|0;g[K>>2]=ca(q+ca(g[K>>2]))}C=ca(q+D);C=(c[x+60+(c[ea>>2]<<3)+4>>2]|0)==3?C:q;if(R){U:do if(Fa){u=c[x+96>>2]|0;if(!u){Ga=634;break}h=x+92|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break U}case 1:{q=ca(g[h>>2]);break U}default:{q=ca(s);break U}}}else Ga=634;while(0);V:do if((Ga|0)==634){Ga=0;W:do if(!(c[w>>2]|0)){do if(qa){if(!(c[x+120>>2]|0))break;h=x+116|0;break W}while(0);X:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break X;h=x+108|0;break W}default:{}}while(0);h=(c[x+128>>2]|0)==0?1552:x+124|0}else h=x+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break V}case 1:{q=ca(g[h>>2]);break V}default:{q=ca(s);break V}}}while(0);q=ca(E+ca(q+ca(Xd(x,p,Ia))));t=ya;q=ca(C+ca(ca(g[x+504>>2])+q));break M}B=ca(g[x+904+(c[T>>2]<<2)>>2]);Y:do if(Fa){u=c[x+96>>2]|0;if(!u){Ga=654;break}h=x+92|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break Y}case 1:{q=ca(g[h>>2]);break Y}default:{q=ca(s);break Y}}}else Ga=654;while(0);Z:do if((Ga|0)==654){Ga=0;_:do if(!(c[w>>2]|0)){do if(qa){if(!(c[x+120>>2]|0))break;h=x+116|0;break _}while(0);$:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break $;h=x+108|0;break _}default:{}}while(0);h=(c[x+128>>2]|0)==0?1552:x+124|0}else h=x+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break Z}case 1:{q=ca(g[h>>2]);break Z}default:{q=ca(s);break Z}}}while(0);q=ca(C+ca(E+ca(ca(B+q)+ca(Xd(x,p,Ia)))));C=ca(g[x+904+(c[$>>2]<<2)>>2]);aa:do if(W){h=c[x+96>>2]|0;if(!h){Ga=673;break}u=x+92|0;if((h|0)==3){B=ca(0.0);break}switch(h|0){case 2:{B=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break aa}case 1:{B=ca(g[u>>2]);break aa}default:{B=ca(s);break aa}}}else Ga=673;while(0);ba:do if((Ga|0)==673){Ga=0;h=c[X>>2]|0;ca:do if(!(c[x+60+(h<<3)+4>>2]|0)){do if(Y){if(!(c[x+120>>2]|0))break;h=x+116|0;break ca}while(0);da:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break da;h=x+108|0;break ca}default:{}}while(0);h=(c[x+128>>2]|0)==0?1552:x+124|0}else h=x+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){B=ca(0.0);break}switch(u|0){case 2:{B=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break ba}case 1:{B=ca(g[h>>2]);break ba}default:{B=ca(s);break ba}}}while(0);t=ca($m(t,ca(ca(C+B)+ca(Xd(x,La,Ia)))));break M}default:{}}while(0);if(!o)break;Wa=ca(F+ca(ce(b,p)));K=x+400+(c[da>>2]<<2)|0;g[K>>2]=ca(Wa+ca(g[K>>2]))}while(0);y=y+1|0}while((y|0)!=(L|0))}else t=ca(0.0);E=ca(ua+q);do if(U){Va=ca(ge(b,La,ca(Ea+t),Da));Wa=ca(ee(b,La,m));Wa=ca(Wa+ca(ce(b,La)));q=ca(fe(b,La,m));q=ca(ca($m(Va,ca(Wa+ca(q+ca(de(b,La))))))-Ea);if(!V)break;q=ca(an(q,ya))}else q=ya;while(0);Va=ca(ge(b,La,ca(Ea+(ka?ya:t)),Da));Wa=ca(ee(b,La,m));Wa=ca(Wa+ca(ce(b,La)));D=ca(fe(b,La,m));D=ca(ca($m(Va,ca(Wa+ca(D+ca(de(b,La))))))-Ea);if(z&o)do{H=lc(c[Ma>>2]|0,I)|0;ea:do if((c[H+36>>2]|0)!=1){if((c[H+24>>2]|0)==1){if(W){do if(!(c[H+168>>2]|0))if(!(c[H+184>>2]|0)){h=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{h=H+180|0;break}else h=H+164|0;while(0);if(!(c[h+4>>2]|0))Ga=703}else Ga=703;do if((Ga|0)==703){Ga=0;u=c[X>>2]|0;fa:do if(!(c[H+132+(u<<3)+4>>2]|0)){do if(Y){if(!(c[H+192>>2]|0))break;h=H+188|0;break fa}while(0);ga:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break ga;h=H+180|0;break fa}default:{}}while(0);h=(c[H+200>>2]|0)==0?1624:H+196|0}else h=H+132+(u<<3)|0;while(0);if(c[h+4>>2]|0)break;B=ca(ce(b,La));ha:do if(W){w=c[H+96>>2]|0;if(!w){Ga=739;break}h=H+92|0;if((w|0)==3){t=ca(0.0);break}switch(w|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break ha}case 1:{t=ca(g[h>>2]);break ha}default:{t=ca(s);break ha}}}else Ga=739;while(0);ia:do if((Ga|0)==739){Ga=0;ja:do if(!(c[H+60+(u<<3)+4>>2]|0)){do if(Y){if(!(c[H+120>>2]|0))break;h=H+116|0;break ja}while(0);ka:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+112>>2]|0))break ka;h=H+108|0;break ja}default:{}}while(0);h=(c[H+128>>2]|0)==0?1552:H+124|0}else h=H+60+(u<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break ia}case 1:{t=ca(g[h>>2]);break ia}default:{t=ca(s);break ia}}}while(0);Wa=ca(B+t);g[H+400+(c[Z>>2]<<2)>>2]=Wa;break ea}while(0);B=ca(ae(H,La,ya));B=ca(B+ca(ce(b,La)));la:do if(W){h=c[H+96>>2]|0;if(!h){Ga=719;break}u=H+92|0;if((h|0)==3){t=ca(0.0);break}switch(h|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break la}case 1:{t=ca(g[u>>2]);break la}default:{t=ca(s);break la}}}else Ga=719;while(0);ma:do if((Ga|0)==719){Ga=0;h=c[X>>2]|0;na:do if(!(c[H+60+(h<<3)+4>>2]|0)){do if(Y){if(!(c[H+120>>2]|0))break;h=H+116|0;break na}while(0);oa:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[H+112>>2]|0))break oa;h=H+108|0;break na}default:{}}while(0);h=(c[H+128>>2]|0)==0?1552:H+124|0}else h=H+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break ma}case 1:{t=ca(g[h>>2]);break ma}default:{t=ca(s);break ma}}}while(0);Wa=ca(B+t);g[H+400+(c[Z>>2]<<2)>>2]=Wa;break}h=c[H+20>>2]|0;if(!h)h=c[_>>2]|0;pa:do switch(h|0){case 5:{h=(c[Ka>>2]|0)>>>0<2?1:5;Ga=809;break}case 4:{u=c[X>>2]|0;w=c[H+60+(u<<3)+4>>2]|0;if((w|0)==3){h=4;Ga=809;break pa}if((c[H+60+(c[aa>>2]<<3)+4>>2]|0)==3){h=4;Ga=809;break pa}A=c[$>>2]|0;h=c[H+972+(A<<2)>>2]|0;switch(c[h+4>>2]|0){case 0:case 3:break;case 1:{if(!(ca(g[h>>2])<ca(0.0))){t=va;break pa}break}case 2:{if(!(ca(g[h>>2])<ca(0.0)|ma)){t=va;break pa}break}default:{t=va;break pa}}l=c[T>>2]|0;z=c[H+904+(l<<2)>>2]|0;y=H+396|0;if((c[y>>2]&2147483647)>>>0>2139095040)C=D;else{qa:do if(W){x=c[H+96>>2]|0;if(!x){Ga=769;break}h=H+92|0;if((x|0)==3){t=ca(0.0);break}switch(x|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break qa}case 1:{t=ca(g[h>>2]);break qa}default:{t=ca(s);break qa}}}else Ga=769;while(0);ra:do if((Ga|0)==769){Ga=0;sa:do if(!w){do if(Y){if(!(c[H+120>>2]|0))break;h=H+116|0;break sa}while(0);ta:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+112>>2]|0))break ta;h=H+108|0;break sa}default:{}}while(0);h=(c[H+128>>2]|0)==0?1552:H+124|0}else h=H+60+(u<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break ra}case 1:{t=ca(g[h>>2]);break ra}default:{t=ca(s);break ra}}}while(0);Va=ca(t+ca(Xd(H,La,Ia)));Ua=(c[k>>2]=z,ca(g[k>>2]));C=ca(g[y>>2]);Wa=ca(Ua/C);C=ca(Ua*C);C=ca(Va+(Fa?Wa:C))}ua:do if(Fa){h=c[H+96>>2]|0;if(!h){Ga=789;break}u=H+92|0;if((h|0)==3){t=ca(0.0);break}switch(h|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break ua}case 1:{t=ca(g[u>>2]);break ua}default:{t=ca(s);break ua}}}else Ga=789;while(0);va:do if((Ga|0)==789){Ga=0;h=c[ba>>2]|0;wa:do if(!(c[H+60+(h<<3)+4>>2]|0)){do if(qa){if(!(c[H+120>>2]|0))break;h=H+116|0;break wa}while(0);xa:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[H+112>>2]|0))break xa;h=H+108|0;break wa}default:{}}while(0);h=(c[H+128>>2]|0)==0?1552:H+124|0}else h=H+60+(h<<3)|0;while(0);u=c[h+4>>2]|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[h>>2]))/ca(100.0));break va}case 1:{t=ca(g[h>>2]);break va}default:{t=ca(s);break va}}}while(0);B=ca(ca(t+ca(Xd(H,p,Ia)))+(c[k>>2]=z,ca(g[k>>2])));h=H+380+(l<<3)|0;switch(c[H+380+(l<<3)+4>>2]|0){case 2:{t=ca(ca(ha*ca(g[h>>2]))/ca(100.0));break}case 1:{t=ca(g[h>>2]);break}default:t=ca(s)}B=B<t|((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040?B:t;h=H+380+(A<<3)|0;switch(c[H+380+(A<<3)+4>>2]|0){case 2:{t=ca(ca(ya*ca(g[h>>2]))/ca(100.0));break}case 1:{t=ca(g[h>>2]);break}default:t=ca(s)}t=C<t|((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040?C:t;Wa=Fa?B:t;t=Fa?t:B;Sd(H,Wa,t,Oa,((g[k>>2]=Wa,c[k>>2]|0)&2147483647)>>>0<2139095041&1,((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0<2139095041&1,Ia,Ha,1,6220)|0;t=va;break}default:Ga=809}while(0);ya:do if((Ga|0)==809){Ga=0;B=ca(g[H+904+(c[$>>2]<<2)>>2]);za:do if(W){u=c[H+96>>2]|0;if(!u){Ga=815;break}w=H+92|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[w>>2]))/ca(100.0));break za}case 1:{t=ca(g[w>>2]);break za}default:{t=ca(s);break za}}}else Ga=815;while(0);Aa:do if((Ga|0)==815){Ga=0;u=c[X>>2]|0;Ba:do if(!(c[H+60+(u<<3)+4>>2]|0)){do if(Y){if(!(c[H+120>>2]|0))break;u=H+116|0;break Ba}while(0);Ca:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+112>>2]|0))break Ca;u=H+108|0;break Ba}default:{}}while(0);u=(c[H+128>>2]|0)==0?1552:H+124|0}else u=H+60+(u<<3)|0;while(0);w=c[u+4>>2]|0;if((w|0)==3){t=ca(0.0);break}switch(w|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Aa}case 1:{t=ca(g[u>>2]);break Aa}default:{t=ca(s);break Aa}}}while(0);t=ca(B+t);t=ca(q-ca(t+ca(Xd(H,La,Ia))));u=(c[H+60+(c[aa>>2]<<3)+4>>2]|0)==3;if((c[H+60+(c[X>>2]<<3)+4>>2]|0)==3)if(u){t=ca(va+ca(t*ca(.5)));break}else{t=ca(va+t);break}if(u){t=va;break}switch(h|0){case 1:{t=va;break ya}case 2:{t=ca(va+ca(t*ca(.5)));break ya}default:{t=ca(va+t);break ya}}}while(0);Wa=ca(r+t);K=H+400+(c[Z>>2]<<2)|0;g[K>>2]=ca(Wa+ca(g[K>>2]))}while(0);I=I+1|0}while((I|0)!=(L|0));r=ca(r+D);q=ca($m(ia,E));h=v+1|0;if(L>>>0<Na>>>0){F=ha;I=L;v=h;ia=q}else{f=r;J=q;N=h;G=ha;break}}Da:do if(o){w=N>>>0>1;Ea:do if(!w){if((c[Ka>>2]|0)>>>0<2)break Da;if((c[b+16>>2]|0)==5)break;h=hc(c[Ma>>2]|0)|0;if(!h)break Da;else u=0;while(1){sa=lc(c[Ma>>2]|0,u)|0;if((c[sa+24>>2]|0)==0?(c[sa+20>>2]|0)==5:0)break Ea;u=u+1|0;if(u>>>0>=h>>>0)break Da}}while(0);h=(g[k>>2]=ya,c[k>>2]|0)&2147483647;if(h>>>0>2139095040)break;t=ca(ya-f);Fa:do switch(c[b+12>>2]|0){case 3:{r=ca(0.0);q=ca(va+t);Ga=859;break}case 2:{r=ca(0.0);q=ca(va+ca(t*ca(.5)));Ga=859;break}case 4:{if(!(ya>f)){r=ca(0.0);q=va;Ga=859;break Fa}r=ca(t/ca(N>>>0));q=va;Ga=859;break}case 7:{if(!(ya>f)){r=ca(0.0);q=ca(va+ca(t*ca(.5)));Ga=859;break Fa}q=ca(va+ca(t/ca(N<<1>>>0)));if(!w){r=ca(0.0);Ga=859;break Fa}r=ca(t/ca(N>>>0));break}case 6:{if(!(ya>f&w)){r=ca(0.0);q=va;Ga=859;break Fa}r=ca(t/ca(v>>>0));q=va;Ga=859;break}default:{r=ca(0.0);q=va;Ga=859}}while(0);if((Ga|0)==859)if(!N)break;A=b+16|0;H=(La&-2|0)==2;I=1592+(La<<2)|0;K=La>>>0<2;L=1592+(La<<2)|0;M=1632+(La<<2)|0;l=h>>>0<2139095041;y=0;z=0;while(1){Ga:do if(y>>>0<Na>>>0){h=y;B=ca(0.0);t=ca(0.0);F=ca(0.0);while(1){x=lc(c[Ma>>2]|0,h)|0;do if((c[x+36>>2]|0)==1)C=F;else{if(c[x+24>>2]|0){C=F;break}if((c[x+936>>2]|0)!=(z|0))break Ga;D=ca(g[x+904+(c[M>>2]<<2)>>2]);if(D>=ca(0.0)&((g[k>>2]=D,c[k>>2]|0)&2147483647)>>>0<2139095041){Ha:do if(H){u=c[x+96>>2]|0;if(!u){Ga=872;break}v=x+92|0;if((u|0)==3){C=ca(0.0);break}switch(u|0){case 2:{C=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break Ha}case 1:{C=ca(g[v>>2]);break Ha}default:{C=ca(s);break Ha}}}else Ga=872;while(0);Ia:do if((Ga|0)==872){Ga=0;u=c[I>>2]|0;Ja:do if(!(c[x+60+(u<<3)+4>>2]|0)){do if(K){if(!(c[x+120>>2]|0))break;u=x+116|0;break Ja}while(0);Ka:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break Ka;u=x+108|0;break Ja}default:{}}while(0);u=(c[x+128>>2]|0)==0?1552:x+124|0}else u=x+60+(u<<3)|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){C=ca(0.0);break}switch(v|0){case 2:{C=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Ia}case 1:{C=ca(g[u>>2]);break Ia}default:{C=ca(s);break Ia}}}while(0);B=ca($m(B,ca(D+ca(C+ca(Xd(x,La,Ia))))))}u=c[x+20>>2]|0;if(!u)u=c[A>>2]|0;if((u|0)!=5){C=F;break}if((c[Ka>>2]|0)>>>0<2){C=F;break}D=ca(ie(x));w=(c[x+72>>2]|0)==0;do if(w)if(!(c[x+120>>2]|0)){u=(c[x+128>>2]|0)==0?1552:x+124|0;break}else{u=x+116|0;break}else u=x+68|0;while(0);v=c[u+4>>2]|0;La:do if((v|0)==3)C=ca(0.0);else switch(v|0){case 2:{C=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break La}case 1:{C=ca(g[u>>2]);break La}default:{C=ca(s);break La}}while(0);D=ca(D+C);E=ca(g[x+908>>2]);do if(w)if(!(c[x+120>>2]|0)){u=(c[x+128>>2]|0)==0?1552:x+124|0;break}else{u=x+116|0;break}else u=x+68|0;while(0);v=c[u+4>>2]|0;Ma:do if((v|0)==3)C=ca(0.0);else switch(v|0){case 2:{C=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Ma}case 1:{C=ca(g[u>>2]);break Ma}default:{C=ca(s);break Ma}}while(0);C=ca(ca(E+ca(C+ca(Xd(x,0,Ia))))-D);t=ca($m(t,D));C=ca($m(F,C));B=ca($m(B,ca(t+C)))}while(0);h=h+1|0;if(h>>>0<Na>>>0)F=C;else break}}else{h=y;B=ca(0.0);t=ca(0.0)}while(0);F=ca(r+B);if(y>>>0<h>>>0){D=ca(q+t);E=ca(q+F);do{x=lc(c[Ma>>2]|0,y)|0;Na:do if((c[x+36>>2]|0)!=1){if(c[x+24>>2]|0)break;u=c[x+20>>2]|0;if(!u)u=c[A>>2]|0;Oa:do switch(u|0){case 5:{if((c[Ka>>2]|0)>>>0<2)break Oa;g[x+404>>2]=ca(ca(D-ca(ie(x)))+ca(ae(x,0,ya)));break Na}case 1:break;case 3:{Wa=ca(ca(E-ca(Xd(x,La,Ia)))-ca(g[x+904+(c[M>>2]<<2)>>2]));g[x+400+(c[L>>2]<<2)>>2]=Wa;break Na}case 2:{Wa=ca(q+ca(ca(F-ca(g[x+904+(c[M>>2]<<2)>>2]))*ca(.5)));g[x+400+(c[L>>2]<<2)>>2]=Wa;break Na}case 4:{Pa:do if(H){u=c[x+96>>2]|0;if(!u){Ga=946;break}v=x+92|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break Pa}case 1:{t=ca(g[v>>2]);break Pa}default:{t=ca(s);break Pa}}}else Ga=946;while(0);Qa:do if((Ga|0)==946){Ga=0;u=c[I>>2]|0;Ra:do if(!(c[x+60+(u<<3)+4>>2]|0)){do if(K){if(!(c[x+120>>2]|0))break;u=x+116|0;break Ra}while(0);Sa:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break Sa;u=x+108|0;break Ra}default:{}}while(0);u=(c[x+128>>2]|0)==0?1552:x+124|0}else u=x+60+(u<<3)|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){t=ca(0.0);break}switch(v|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Qa}case 1:{t=ca(g[u>>2]);break Qa}default:{t=ca(s);break Qa}}}while(0);Wa=ca(q+t);g[x+400+(c[L>>2]<<2)>>2]=Wa;u=c[x+972+(c[M>>2]<<2)>>2]|0;switch(c[u+4>>2]|0){case 0:case 3:break;case 1:{if(!(ca(g[u>>2])<ca(0.0)))break Na;break}case 2:{if(l&!(ca(g[u>>2])<ca(0.0)))break Na;break}default:break Na}if(Fa){w=x+904|0;B=ca(g[w>>2]);Ta:do if(H){u=c[x+96>>2]|0;if(!u){Ga=969;break}v=x+92|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break Ta}case 1:{t=ca(g[v>>2]);break Ta}default:{t=ca(s);break Ta}}}else Ga=969;while(0);Ua:do if((Ga|0)==969){Ga=0;u=c[I>>2]|0;Va:do if(!(c[x+60+(u<<3)+4>>2]|0)){do if(K){if(!(c[x+120>>2]|0))break;u=x+116|0;break Va}while(0);Wa:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break Wa;u=x+108|0;break Va}default:{}}while(0);u=(c[x+128>>2]|0)==0?1552:x+124|0}else u=x+60+(u<<3)|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){t=ca(0.0);break}switch(v|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Ua}case 1:{t=ca(g[u>>2]);break Ua}default:{t=ca(s);break Ua}}}while(0);u=w;C=ca(B+ca(t+ca(Xd(x,La,Ia))));B=F}else{B=ca(g[x+908>>2]);Xa:do if(H){u=c[x+96>>2]|0;if(!u){Ga=989;break}v=x+92|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break Xa}case 1:{t=ca(g[v>>2]);break Xa}default:{t=ca(s);break Xa}}}else Ga=989;while(0);Ya:do if((Ga|0)==989){Ga=0;u=c[I>>2]|0;Za:do if(!(c[x+60+(u<<3)+4>>2]|0)){do if(K){if(!(c[x+120>>2]|0))break;u=x+116|0;break Za}while(0);_a:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break _a;u=x+108|0;break Za}default:{}}while(0);u=(c[x+128>>2]|0)==0?1552:x+124|0}else u=x+60+(u<<3)|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){t=ca(0.0);break}switch(v|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break Ya}case 1:{t=ca(g[u>>2]);break Ya}default:{t=ca(s);break Ya}}}while(0);u=x+904|0;C=F;B=ca(B+ca(t+ca(Xd(x,La,Ia))))}t=ca(g[u>>2]);if(((g[k>>2]=C,c[k>>2]|0)&2147483647)>>>0>2139095040){if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040)Ga=1006}else if(ca(O(ca(C-t)))<ca(.0000999999974))Ga=1006;do if((Ga|0)==1006){Ga=0;t=ca(g[x+908>>2]);if(((g[k>>2]=B,c[k>>2]|0)&2147483647)>>>0>2139095040)if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040)break Na;else break;else if(ca(O(ca(B-t)))<ca(.0000999999974))break Na;else break}while(0);Sd(x,C,B,Oa,1,1,Ia,Ha,1,6220)|0;break Na}default:break Na}while(0);$a:do if(H){u=c[x+96>>2]|0;if(!u){Ga=924;break}v=x+92|0;if((u|0)==3){t=ca(0.0);break}switch(u|0){case 2:{t=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break $a}case 1:{t=ca(g[v>>2]);break $a}default:{t=ca(s);break $a}}}else Ga=924;while(0);ab:do if((Ga|0)==924){Ga=0;u=c[I>>2]|0;bb:do if(!(c[x+60+(u<<3)+4>>2]|0)){do if(K){if(!(c[x+120>>2]|0))break;u=x+116|0;break bb}while(0);cb:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[x+112>>2]|0))break cb;u=x+108|0;break bb}default:{}}while(0);u=(c[x+128>>2]|0)==0?1552:x+124|0}else u=x+60+(u<<3)|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){t=ca(0.0);break}switch(v|0){case 2:{t=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break ab}case 1:{t=ca(g[u>>2]);break ab}default:{t=ca(s);break ab}}}while(0);Wa=ca(q+t);g[x+400+(c[L>>2]<<2)>>2]=Wa}while(0);y=y+1|0}while((y|0)!=(h|0))}q=ca(q+F);z=z+1|0;if((z|0)==(N|0))break;else y=h}}while(0);Wa=ca(ge(b,2,xa,m));q=ca(ee(b,2,m));q=ca(q+ca(ce(b,2)));t=ca(fe(b,2,m));W=b+904|0;g[W>>2]=ca($m(Wa,ca(q+ca(t+ca(de(b,2))))));t=ca(ge(b,0,wa,n));q=ca(ee(b,0,m));do if(!(c[Ra>>2]|0))if(!(c[b+336>>2]|0)){h=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{h=b+332|0;break}else h=b+284|0;while(0);q=ca(q+ca($m(ca(g[h>>2]),ca(0.0))));r=ca(fe(b,0,m));do if(!(c[Sa>>2]|0))if(!(c[b+336>>2]|0)){h=(c[b+344>>2]|0)==0?1552:b+340|0;break}else{h=b+332|0;break}else h=b+300|0;while(0);V=b+908|0;g[V>>2]=ca($m(t,ca(q+ca(r+ca($m(ca(g[h>>2]),ca(0.0)))))));do if(!ga)Ga=1025;else{h=c[b+32>>2]|0;u=(ga|0)==2;if(u&(h|0)!=2){Ga=1025;break}if(!(u&(h|0)==2))break;Wa=ca(Aa+G);Wa=ca($m(ca(an(Wa,ca(ge(b,p,J,za)))),Aa));g[b+904+(c[1632+(p<<2)>>2]<<2)>>2]=Wa}while(0);if((Ga|0)==1025){Ua=ca(ge(b,p,J,za));Va=ca(ee(b,p,m));Va=ca(Va+ca(ce(b,p)));Wa=ca(fe(b,p,m));Wa=ca($m(Ua,ca(Va+ca(Wa+ca(de(b,p))))));g[b+904+(c[1632+(p<<2)>>2]<<2)>>2]=Wa}do if(!Ba)Ga=1030;else{u=c[b+32>>2]|0;h=(Ba|0)==2;if(h&(u|0)!=2){Ga=1030;break}if(!(h&(u|0)==2))break;Wa=ca(Ea+ya);Wa=ca($m(ca(an(Wa,ca(ge(b,La,ca(Ea+f),Da)))),Ea));g[b+904+(c[1632+(La<<2)>>2]<<2)>>2]=Wa}while(0);if((Ga|0)==1030){Ua=ca(ge(b,La,ca(Ea+f),Da));Va=ca(ee(b,La,m));Va=ca(Va+ca(ce(b,La)));Wa=ca(fe(b,La,m));Wa=ca($m(Ua,ca(Va+ca(Wa+ca(de(b,La))))));g[b+904+(c[1632+(La<<2)>>2]<<2)>>2]=Wa}if(!o){i=Ta;return}if((c[Ca>>2]|0)==2){h=1632+(La<<2)|0;u=1592+(La<<2)|0;w=0;do{v=lc(c[Ma>>2]|0,w)|0;if(!(c[v+24>>2]|0)){Ca=c[h>>2]|0;Wa=ca(g[b+904+(Ca<<2)>>2]);o=v+400+(c[u>>2]<<2)|0;Wa=ca(Wa-ca(g[o>>2]));g[o>>2]=ca(Wa-ca(g[v+904+(Ca<<2)>>2]))}w=w+1|0}while((w|0)!=(Na|0))}db:do if(na){I=((Fa?ga:j)|0)!=0;K=Ia>ca(0.0);L=b+16|0;M=b+336|0;N=b+344|0;P=b+340|0;Q=b+332|0;R=b+300|0;S=b+284|0;U=(g[k>>2]=Ha,c[k>>2]|0)&2147483647;U=U>>>0>2139095040;T=((g[k>>2]=Ia,c[k>>2]|0)&2147483647)>>>0>2139095040;H=na;while(1){h=c[Ka>>2]|0;eb:do if(Qa){switch(h|0){case 2:{h=3;A=0;l=0;break eb}case 3:break;default:{Ga=1044;break eb}}h=2;A=0;l=0}else Ga=1044;while(0);if((Ga|0)==1044){l=h>>>0<2;A=l?Pa:0}z=(h&-2|0)==2;x=H+96|0;u=c[x>>2]|0;fb:do if(!u){do if(!(c[H+64>>2]|0))if(!(c[H+112>>2]|0)){u=(c[H+128>>2]|0)==0?1552:H+124|0;break}else{u=H+108|0;break}else u=H+60|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){q=ca(0.0);break}switch(v|0){case 2:{q=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break fb}case 1:{q=ca(g[u>>2]);break fb}default:{q=ca(s);break fb}}}else{v=H+92|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break fb}case 1:{q=ca(g[v>>2]);break fb}default:{q=ca(s);break fb}}}while(0);D=ca(q+ca(Xd(H,2,Ia)));y=H+72|0;do if(!(c[y>>2]|0))if(!(c[H+120>>2]|0)){u=(c[H+128>>2]|0)==0?1552:H+124|0;break}else{u=H+116|0;break}else u=H+68|0;while(0);v=c[u+4>>2]|0;gb:do if((v|0)==3)q=ca(0.0);else switch(v|0){case 2:{q=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break gb}case 1:{q=ca(g[u>>2]);break gb}default:{q=ca(s);break gb}}while(0);C=ca(q+ca(Xd(H,0,Ia)));u=c[H+972>>2]|0;hb:do switch(c[u+4>>2]|0){case 0:case 3:{Ga=1074;break}case 1:{if(ca(g[u>>2])<ca(0.0)){Ga=1074;break hb}q=ca(g[u>>2]);Ga=1073;break}case 2:{if(ca(g[u>>2])<ca(0.0)|T){Ga=1074;break hb}q=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));Ga=1073;break}default:{q=ca(s);Ga=1073}}while(0);do if((Ga|0)==1073)q=ca(D+q);else if((Ga|0)==1074){do if(!(c[H+168>>2]|0))if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+164|0;while(0);if(!(c[u+4>>2]|0)){do if(!(c[H+136>>2]|0))if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+132|0;while(0);if(!(c[u+4>>2]|0)){q=ca(s);break}}do if(!(c[H+176>>2]|0))if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+172|0;while(0);if(!(c[u+4>>2]|0)){do if(!(c[H+152>>2]|0))if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+148|0;while(0);if(!(c[u+4>>2]|0)){q=ca(s);break}}Va=ca(g[W>>2]);Wa=ca(ce(b,2));Wa=ca(Va-ca(Wa+ca(de(b,2))));Va=ca(ae(H,2,Ia));Va=ca(ge(H,2,ca(Wa-ca(Va+ca(be(H,2,Ia)))),Ia));Wa=ca(ee(H,2,Ia));Wa=ca(Wa+ca(ce(H,2)));q=ca(fe(H,2,Ia));q=ca($m(Va,ca(Wa+ca(q+ca(de(H,2))))))}while(0);u=c[H+976>>2]|0;ib:do switch(c[u+4>>2]|0){case 0:case 3:{Ga=1105;break}case 1:{if(ca(g[u>>2])<ca(0.0)){Ga=1105;break ib}r=ca(g[u>>2]);Ga=1104;break}case 2:{if(ca(g[u>>2])<ca(0.0)|U){Ga=1105;break ib}r=ca(ca(Ha*ca(g[u>>2]))/ca(100.0));Ga=1104;break}default:{r=ca(s);Ga=1104}}while(0);do if((Ga|0)==1104)r=ca(C+r);else if((Ga|0)==1105){do if(!(c[H+144>>2]|0))if(!(c[H+192>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+188|0;break}else u=H+140|0;while(0);if(!(c[u+4>>2]|0)){r=ca(s);break}do if(!(c[H+160>>2]|0))if(!(c[H+192>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+188|0;break}else u=H+156|0;while(0);if(!(c[u+4>>2]|0)){r=ca(s);break}t=ca(g[V>>2]);do if(!(c[Ra>>2]|0)){if(c[M>>2]|0){u=Q;break}u=(c[N>>2]|0)==0?1552:P}else u=S;while(0);r=ca($m(ca(g[u>>2]),ca(0.0)));do if(!(c[Sa>>2]|0)){if(c[M>>2]|0){u=Q;break}u=(c[N>>2]|0)==0?1552:P}else u=R;while(0);r=ca(t-ca(r+ca($m(ca(g[u>>2]),ca(0.0)))));B=ca(ae(H,0,Ha));B=ca(ge(H,0,ca(r-ca(B+ca(be(H,0,Ha)))),Ha));r=ca(ee(H,0,Ia));do if(!(c[H+288>>2]|0))if(!(c[H+336>>2]|0)){u=(c[H+344>>2]|0)==0?1552:H+340|0;break}else{u=H+332|0;break}else u=H+284|0;while(0);r=ca(r+ca($m(ca(g[u>>2]),ca(0.0))));t=ca(fe(H,0,Ia));do if(!(c[H+304>>2]|0))if(!(c[H+336>>2]|0)){u=(c[H+344>>2]|0)==0?1552:H+340|0;break}else{u=H+332|0;break}else u=H+300|0;while(0);r=ca($m(B,ca(r+ca(t+ca($m(ca(g[u>>2]),ca(0.0)))))))}while(0);u=((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040;v=((g[k>>2]=r,c[k>>2]|0)&2147483647)>>>0>2139095040;do if(u^v){t=ca(g[H+396>>2]);if(((g[k>>2]=t,c[k>>2]|0)&2147483647)>>>0>2139095040)break;if(!u){if(!v)break;Va=ca(ca(q-D)/t);Wa=ca(ee(H,2,Ia));Wa=ca(Wa+ca(ce(H,2)));r=ca(fe(H,2,Ia));r=ca(C+ca($m(Va,ca(Wa+ca(r+ca(de(H,2)))))));break}B=ca(ca(r-C)*t);q=ca(ee(H,0,Ia));do if(!(c[H+288>>2]|0))if(!(c[H+336>>2]|0)){u=(c[H+344>>2]|0)==0?1552:H+340|0;break}else{u=H+332|0;break}else u=H+284|0;while(0);q=ca(q+ca($m(ca(g[u>>2]),ca(0.0))));t=ca(fe(H,0,Ia));do if(!(c[H+304>>2]|0))if(!(c[H+336>>2]|0)){u=(c[H+344>>2]|0)==0?1552:H+340|0;break}else{u=H+332|0;break}else u=H+300|0;while(0);q=ca(D+ca($m(B,ca(q+ca(t+ca($m(ca(g[u>>2]),ca(0.0))))))))}while(0);v=((g[k>>2]=q,c[k>>2]|0)&2147483647)>>>0>2139095040;w=(g[k>>2]=r,c[k>>2]|0)&2147483647;if(v|w>>>0>2139095040){u=v&1^1;if(!z){j=K&(I&v);q=j?Ia:q;u=j?2:u}Sd(H,q,r,Oa,u,w>>>0<2139095041&1,q,r,0,6228)|0;r=ca(g[H+904>>2]);u=c[x>>2]|0;jb:do if(!u){do if(!(c[H+64>>2]|0))if(!(c[H+112>>2]|0)){u=(c[H+128>>2]|0)==0?1552:H+124|0;break}else{u=H+108|0;break}else u=H+60|0;while(0);v=c[u+4>>2]|0;if((v|0)==3){q=ca(0.0);break}switch(v|0){case 2:{q=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break jb}case 1:{q=ca(g[u>>2]);break jb}default:{q=ca(s);break jb}}}else{v=H+92|0;if((u|0)==3){q=ca(0.0);break}switch(u|0){case 2:{q=ca(ca(Ia*ca(g[v>>2]))/ca(100.0));break jb}case 1:{q=ca(g[v>>2]);break jb}default:{q=ca(s);break jb}}}while(0);q=ca(r+ca(q+ca(Xd(H,2,Ia))));t=ca(g[H+908>>2]);do if(!(c[y>>2]|0))if(!(c[H+120>>2]|0)){u=(c[H+128>>2]|0)==0?1552:H+124|0;break}else{u=H+116|0;break}else u=H+68|0;while(0);v=c[u+4>>2]|0;kb:do if((v|0)==3)r=ca(0.0);else switch(v|0){case 2:{r=ca(ca(Ia*ca(g[u>>2]))/ca(100.0));break kb}case 1:{r=ca(g[u>>2]);break kb}default:{r=ca(s);break kb}}while(0);r=ca(t+ca(r+ca(Xd(H,0,Ia))))}Sd(H,q,r,Oa,1,1,q,r,1,6240)|0;if(z){do if(!(c[H+176>>2]|0))if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+172|0;while(0);if(c[u+4>>2]|0)Ga=1195;else Ga=1184}else Ga=1184;do if((Ga|0)==1184){u=c[1608+(h<<2)>>2]|0;lb:do if(!(c[H+132+(u<<3)+4>>2]|0)){do if(l){if(!(c[H+192>>2]|0))break;u=H+188|0;break lb}while(0);mb:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break mb;u=H+180|0;break lb}default:{}}while(0);u=(c[H+200>>2]|0)==0?1624:H+196|0}else u=H+132+(u<<3)|0;while(0);if(!(c[u+4>>2]|0)){Ga=1212;break}if(z)Ga=1195;else Ga=1201}while(0);if((Ga|0)==1195){u=c[H+168>>2]|0;do if(!u)if(!(c[H+184>>2]|0)){v=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{v=H+180|0;break}else v=H+164|0;while(0);if(!(c[v+4>>2]|0))Ga=1201;else Ga=1214}do if((Ga|0)==1201){Ga=0;v=c[1592+(h<<2)>>2]|0;nb:do if(!(c[H+132+(v<<3)+4>>2]|0)){do if(l){if(!(c[H+192>>2]|0))break;u=H+188|0;break nb}while(0);ob:do switch(v|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break ob;u=H+180|0;break nb}default:{}}while(0);u=(c[H+200>>2]|0)==0?1624:H+196|0}else u=H+132+(v<<3)|0;while(0);if(c[u+4>>2]|0){Ga=1212;break}j=c[1632+(h<<2)>>2]|0;Wa=ca(g[b+904+(j<<2)>>2]);Wa=ca(Wa-ca(g[H+904+(j<<2)>>2]));Wa=ca(Wa-ca(de(b,h)));g[H+400+(v<<2)>>2]=ca(Wa-ca(be(H,h,Ia)))}while(0);do if((Ga|0)==1212){if(!z){Ga=1220;break}u=c[H+168>>2]|0;Ga=1214}while(0);if((Ga|0)==1214){do if(!u)if(!(c[H+184>>2]|0)){v=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{v=H+180|0;break}else v=H+164|0;while(0);if(!(c[v+4>>2]|0))Ga=1220;else Ga=1234}pb:do if((Ga|0)==1220){Ga=0;v=c[1592+(h<<2)>>2]|0;u=c[H+132+(v<<3)+4>>2]|0;qb:do if(!u){do if(l){if(!(c[H+192>>2]|0))break;w=H+188|0;break qb}while(0);rb:do switch(v|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break rb;w=H+180|0;break qb}default:{}}while(0);w=(c[H+200>>2]|0)==0?1624:H+196|0}else w=H+132+(v<<3)|0;while(0);do if(!(c[w+4>>2]|0)){if((c[Ja>>2]|0)!=1)break;j=c[1632+(h<<2)>>2]|0;Wa=ca(g[b+904+(j<<2)>>2]);g[H+400+(v<<2)>>2]=ca(ca(Wa-ca(g[H+904+(j<<2)>>2]))*ca(.5));break pb}while(0);if(!z){Ga=1241;break}u=c[H+168>>2]|0;Ga=1234}while(0);do if((Ga|0)==1234){Ga=0;do if(!u)if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+164|0;while(0);if(c[u+4>>2]|0)break;v=c[1592+(h<<2)>>2]|0;u=c[H+132+(v<<3)+4>>2]|0;Ga=1241}while(0);do if((Ga|0)==1241){sb:do if(!u){do if(l){if(!(c[H+192>>2]|0))break;u=H+188|0;break sb}while(0);tb:do switch(v|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break tb;u=H+180|0;break sb}default:{}}while(0);u=(c[H+200>>2]|0)==0?1624:H+196|0}else u=H+132+(v<<3)|0;while(0);if(c[u+4>>2]|0)break;if((c[Ja>>2]|0)!=2)break;j=c[1632+(h<<2)>>2]|0;Wa=ca(g[b+904+(j<<2)>>2]);g[H+400+(v<<2)>>2]=ca(Wa-ca(g[H+904+(j<<2)>>2]))}while(0);w=(A&-2|0)==2;if(w){do if(!(c[H+176>>2]|0))if(!(c[H+184>>2]|0)){h=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{h=H+180|0;break}else h=H+172|0;while(0);if(c[h+4>>2]|0)Ga=1271;else Ga=1260}else Ga=1260;do if((Ga|0)==1260){h=c[1608+(A<<2)>>2]|0;ub:do if(!(c[H+132+(h<<3)+4>>2]|0)){do if(A>>>0<2){if(!(c[H+192>>2]|0))break;h=H+188|0;break ub}while(0);vb:do switch(h|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break vb;h=H+180|0;break ub}default:{}}while(0);h=(c[H+200>>2]|0)==0?1624:H+196|0}else h=H+132+(h<<3)|0;while(0);if(!(c[h+4>>2]|0)){Ga=1288;break}if(w)Ga=1271;else Ga=1277}while(0);if((Ga|0)==1271){h=c[H+168>>2]|0;do if(!h)if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+164|0;while(0);if(!(c[u+4>>2]|0))Ga=1277;else Ga=1290}do if((Ga|0)==1277){Ga=0;u=c[1592+(A<<2)>>2]|0;wb:do if(!(c[H+132+(u<<3)+4>>2]|0)){do if(A>>>0<2){if(!(c[H+192>>2]|0))break;h=H+188|0;break wb}while(0);xb:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break xb;h=H+180|0;break wb}default:{}}while(0);h=(c[H+200>>2]|0)==0?1624:H+196|0}else h=H+132+(u<<3)|0;while(0);if(c[h+4>>2]|0){Ga=1288;break}j=c[1632+(A<<2)>>2]|0;Wa=ca(g[b+904+(j<<2)>>2]);Wa=ca(Wa-ca(g[H+904+(j<<2)>>2]));Wa=ca(Wa-ca(de(b,A)));g[H+400+(u<<2)>>2]=ca(Wa-ca(be(H,A,Ia)))}while(0);do if((Ga|0)==1288){if(!w){Ga=1296;break}h=c[H+168>>2]|0;Ga=1290}while(0);if((Ga|0)==1290){do if(!h)if(!(c[H+184>>2]|0)){u=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{u=H+180|0;break}else u=H+164|0;while(0);if(!(c[u+4>>2]|0))Ga=1296;else Ga=1312}yb:do if((Ga|0)==1296){Ga=0;v=c[1592+(A<<2)>>2]|0;h=c[H+132+(v<<3)+4>>2]|0;zb:do if(!h){do if(A>>>0<2){if(!(c[H+192>>2]|0))break;u=H+188|0;break zb}while(0);Ab:do switch(v|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break Ab;u=H+180|0;break zb}default:{}}while(0);u=(c[H+200>>2]|0)==0?1624:H+196|0}else u=H+132+(v<<3)|0;while(0);do if(!(c[u+4>>2]|0)){u=c[H+20>>2]|0;if(!u)u=c[L>>2]|0;if((u|0)!=2)break;j=c[1632+(A<<2)>>2]|0;Wa=ca(g[b+904+(j<<2)>>2]);g[H+400+(v<<2)>>2]=ca(ca(Wa-ca(g[H+904+(j<<2)>>2]))*ca(.5));break yb}while(0);if(!w){u=v;Ga=1319;break}h=c[H+168>>2]|0;Ga=1312}while(0);do if((Ga|0)==1312){Ga=0;do if(!h)if(!(c[H+184>>2]|0)){h=(c[H+200>>2]|0)==0?1624:H+196|0;break}else{h=H+180|0;break}else h=H+164|0;while(0);if(c[h+4>>2]|0)break;u=c[1592+(A<<2)>>2]|0;h=c[H+132+(u<<3)+4>>2]|0;Ga=1319}while(0);do if((Ga|0)==1319){Ga=0;Bb:do if(!h){do if(A>>>0<2){if(!(c[H+192>>2]|0))break;h=H+188|0;break Bb}while(0);Cb:do switch(u|0){case 0:case 2:case 4:case 5:{if(!(c[H+184>>2]|0))break Cb;h=H+180|0;break Bb}default:{}}while(0);h=(c[H+200>>2]|0)==0?1624:H+196|0}else h=H+132+(u<<3)|0;while(0);if(c[h+4>>2]|0)break;h=c[H+20>>2]|0;if(!h)h=c[L>>2]|0;if((h|0)!=3)break;j=c[1632+(A<<2)>>2]|0;Wa=ca(g[b+904+(j<<2)>>2]);g[H+400+(u<<2)>>2]=ca(Wa-ca(g[H+904+(j<<2)>>2]))}while(0);H=c[H+948>>2]|0;if(!H)break db}}while(0);y=(p&-3|0)==1;z=(La&-3|0)==1;if(!(y|z)){i=Ta;return}l=1632+(p<<2)|0;A=1592+(p<<2)|0;v=1608+(p<<2)|0;w=1632+(La<<2)|0;x=1592+(La<<2)|0;p=1608+(La<<2)|0;u=0;do{h=lc(c[Ma>>2]|0,u)|0;do if((c[h+36>>2]|0)!=1){if(y){Sa=c[l>>2]|0;Wa=ca(g[h+904+(Sa<<2)>>2]);Wa=ca(ca(g[b+904+(Sa<<2)>>2])-Wa);Wa=ca(Wa-ca(g[h+400+(c[A>>2]<<2)>>2]));g[h+400+(c[v>>2]<<2)>>2]=Wa}if(!z)break;Sa=c[w>>2]|0;Wa=ca(g[h+904+(Sa<<2)>>2]);Wa=ca(ca(g[b+904+(Sa<<2)>>2])-Wa);Wa=ca(Wa-ca(g[h+400+(c[x>>2]<<2)>>2]));g[h+400+(c[p>>2]<<2)>>2]=Wa}while(0);u=u+1|0}while((u|0)!=(Na|0));i=Ta;return}function Zd(a,b,d,e,f){a=a|0;b=b|0;d=ca(d);e=ca(e);f=ca(f);var h=0,i=0,j=0,k=zb,l=0,m=0,n=0;h=c[a+4>>2]|0;b=(b|0)==2;a:do if(b){switch(h|0){case 2:{h=3;m=0;i=0;break a}case 3:break;default:{n=4;break a}}h=2;m=0;i=0}else n=4;while(0);if((n|0)==4){i=h>>>0<2;m=i?(b?3:2):0}k=ca($d(a,h,d));e=ca($d(a,m,e));b:do if((h&-2|0)==2?(j=c[a+96>>2]|0,(j|0)!=0):0){b=a+92|0;if((j|0)==3)d=ca(0.0);else switch(j|0){case 2:{d=ca(ca(ca(g[b>>2])*f)/ca(100.0));break b}case 1:{d=ca(g[b>>2]);break b}default:{d=ca(s);break b}}}else n=11;while(0);c:do if((n|0)==11){b=c[1592+(h<<2)>>2]|0;d:do if(!(c[a+60+(b<<3)+4>>2]|0)){if(i?(c[a+120>>2]|0)!=0:0){b=a+116|0;break}switch(b|0){case 0:case 2:case 4:case 5:{if(c[a+112>>2]|0){b=a+108|0;break d}break}default:{}}b=(c[a+128>>2]|0)==0?1552:a+124|0}else b=a+60+(b<<3)|0;while(0);i=c[b+4>>2]|0;if((i|0)==3)d=ca(0.0);else switch(i|0){case 2:{d=ca(ca(ca(g[b>>2])*f)/ca(100.0));break c}case 1:{d=ca(g[b>>2]);break c}default:{d=ca(s);break c}}}while(0);d=ca(k+d);g[a+400+(c[1592+(h<<2)>>2]<<2)>>2]=d;k=ca(k+ca(Xd(a,h,f)));g[a+400+(c[1608+(h<<2)>>2]<<2)>>2]=k;e:do if((m&-2|0)==2?(l=c[a+96>>2]|0,(l|0)!=0):0){b=a+92|0;if((l|0)==3)d=ca(0.0);else switch(l|0){case 2:{d=ca(ca(ca(g[b>>2])*f)/ca(100.0));break e}case 1:{d=ca(g[b>>2]);break e}default:{d=ca(s);break e}}}else n=30;while(0);f:do if((n|0)==30){b=c[1592+(m<<2)>>2]|0;g:do if(!(c[a+60+(b<<3)+4>>2]|0)){if(m>>>0<2?(c[a+120>>2]|0)!=0:0){b=a+116|0;break}switch(b|0){case 0:case 2:case 4:case 5:{if(c[a+112>>2]|0){b=a+108|0;break g}break}default:{}}b=(c[a+128>>2]|0)==0?1552:a+124|0}else b=a+60+(b<<3)|0;while(0);h=c[b+4>>2]|0;if((h|0)==3)d=ca(0.0);else switch(h|0){case 2:{d=ca(ca(ca(g[b>>2])*f)/ca(100.0));break f}case 1:{d=ca(g[b>>2]);break f}default:{d=ca(s);break f}}}while(0);k=ca(e+d);g[a+400+(c[1592+(m<<2)>>2]<<2)>>2]=k;f=ca(e+ca(Xd(a,m,f)));g[a+400+(c[1608+(m<<2)>>2]<<2)>>2]=f;return}function _d(a){a=a|0;var b=0,d=0,e=zb,f=zb,h=0,i=zb,j=zb,k=zb;d=a+400|0;f=ca(g[d>>2]);j=ca(f-ca(N(ca(f))));b=a+404|0;e=ca(g[b>>2]);i=ca(e-ca(N(ca(e))));h=a+416|0;k=ca(dn(ca(j+ca(g[h>>2]))));g[h>>2]=ca(k-ca(dn(j)));h=a+420|0;j=ca(dn(ca(i+ca(g[h>>2]))));g[h>>2]=ca(j-ca(dn(i)));g[d>>2]=ca(dn(f));g[b>>2]=ca(dn(e));a=a+944|0;b=hc(c[a>>2]|0)|0;if(!b)return;else d=0;do{_d(lc(c[a>>2]|0,d)|0);d=d+1|0}while((d|0)!=(b|0));return}function $d(a,b,d){a=a|0;b=b|0;d=ca(d);var e=0,f=0;if((b&-2|0)==2){do if(!(c[a+168>>2]|0))if(!(c[a+184>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+180|0;break}else e=a+164|0;while(0);if(!(c[e+4>>2]|0))f=8}else f=8;if((f|0)==8){e=c[1592+(b<<2)>>2]|0;a:do if(!(c[a+132+(e<<3)+4>>2]|0)){if(b>>>0<2?(c[a+192>>2]|0)!=0:0){e=a+188|0;break}switch(e|0){case 0:case 2:case 4:case 5:{if(c[a+184>>2]|0){e=a+180|0;break a}break}default:{}}e=(c[a+200>>2]|0)==0?1624:a+196|0}else e=a+132+(e<<3)|0;while(0);if(!(c[e+4>>2]|0)){d=ca(-ca(be(a,b,d)));return ca(d)}}d=ca(ae(a,b,d));return ca(d)}function ae(a,b,d){a=a|0;b=b|0;d=ca(d);var e=0;a:do if((b&-2|0)==2){do if(!(c[a+168>>2]|0))if(!(c[a+184>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+180|0;break}else e=a+164|0;while(0);switch(c[e+4>>2]|0){case 0:break a;case 2:{d=ca(ca(ca(g[e>>2])*d)/ca(100.0));return ca(d)}case 1:{d=ca(g[e>>2]);return ca(d)}default:{d=ca(s);return ca(d)}}}while(0);e=c[1592+(b<<2)>>2]|0;b:do if(!(c[a+132+(e<<3)+4>>2]|0)){if(b>>>0<2?(c[a+192>>2]|0)!=0:0){e=a+188|0;break}switch(e|0){case 0:case 2:case 4:case 5:{if(c[a+184>>2]|0){e=a+180|0;break b}break}default:{}}e=(c[a+200>>2]|0)==0?1624:a+196|0}else e=a+132+(e<<3)|0;while(0);b=c[e+4>>2]|0;if(!b){d=ca(0.0);return ca(d)}switch(b|0){case 2:{d=ca(ca(ca(g[e>>2])*d)/ca(100.0));return ca(d)}case 1:{d=ca(g[e>>2]);return ca(d)}default:{d=ca(s);return ca(d)}}return ca(0)}function be(a,b,d){a=a|0;b=b|0;d=ca(d);var e=0;a:do if((b&-2|0)==2){do if(!(c[a+176>>2]|0))if(!(c[a+184>>2]|0)){e=(c[a+200>>2]|0)==0?1624:a+196|0;break}else{e=a+180|0;break}else e=a+172|0;while(0);switch(c[e+4>>2]|0){case 0:break a;case 2:{d=ca(ca(ca(g[e>>2])*d)/ca(100.0));return ca(d)}case 1:{d=ca(g[e>>2]);return ca(d)}default:{d=ca(s);return ca(d)}}}while(0);e=c[1608+(b<<2)>>2]|0;b:do if(!(c[a+132+(e<<3)+4>>2]|0)){if(b>>>0<2?(c[a+192>>2]|0)!=0:0){e=a+188|0;break}switch(e|0){case 0:case 2:case 4:case 5:{if(c[a+184>>2]|0){e=a+180|0;break b}break}default:{}}e=(c[a+200>>2]|0)==0?1624:a+196|0}else e=a+132+(e<<3)|0;while(0);b=c[e+4>>2]|0;if(!b){d=ca(0.0);return ca(d)}switch(b|0){case 2:{d=ca(ca(ca(g[e>>2])*d)/ca(100.0));return ca(d)}case 1:{d=ca(g[e>>2]);return ca(d)}default:{d=ca(s);return ca(d)}}return ca(0)}function ce(a,b){a=a|0;b=b|0;var d=zb;if(((b&-2|0)==2?(c[a+312>>2]|0)!=0:0)?(d=ca(g[a+308>>2]),d>=ca(0.0)):0)return ca(d);d=ca($m(ca(g[(je(a+276|0,c[1592+(b<<2)>>2]|0,1552)|0)>>2]),ca(0.0)));return ca(d)}function de(a,b){a=a|0;b=b|0;var d=zb;if(((b&-2|0)==2?(c[a+320>>2]|0)!=0:0)?(d=ca(g[a+316>>2]),d>=ca(0.0)):0)return ca(d);d=ca($m(ca(g[(je(a+276|0,c[1608+(b<<2)>>2]|0,1552)|0)>>2]),ca(0.0)));return ca(d)}function ee(a,b,d){a=a|0;b=b|0;d=ca(d);var e=zb,f=0,h=zb,i=0;a:do if((b&-2|0)==2){f=a+236|0;i=c[a+240>>2]|0;switch(i|0){case 1:{h=ca(g[f>>2]);e=h;break}case 2:{h=ca(g[f>>2]);e=ca(ca(h*d)/ca(100.0));break}default:break a}if(e>=ca(0.0))switch(i|0){case 2:{d=ca(ca(h*d)/ca(100.0));return ca(d)}case 1:{d=h;return ca(d)}default:{d=ca(s);return ca(d)}}}while(0);f=c[1592+(b<<2)>>2]|0;b:do if(!(c[a+204+(f<<3)+4>>2]|0)){if(b>>>0<2?(c[a+264>>2]|0)!=0:0){f=a+260|0;break}switch(f|0){case 0:case 2:case 4:case 5:{if(c[a+256>>2]|0){f=a+252|0;break b}break}default:{}}f=(c[a+272>>2]|0)==0?1552:a+268|0}else f=a+204+(f<<3)|0;while(0);switch(c[f+4>>2]|0){case 2:{e=ca(ca(ca(g[f>>2])*d)/ca(100.0));break}case 1:{e=ca(g[f>>2]);break}default:e=ca(s)}d=ca($m(e,ca(0.0)));return ca(d)}
function Bn(e,f,g,j,l){e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;var m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,u=0,v=0.0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0;ha=i;i=i+624|0;ca=ha+24|0;ea=ha+16|0;da=ha+588|0;Y=ha+576|0;ba=ha;V=ha+536|0;ga=ha+8|0;fa=ha+528|0;M=(e|0)!=0;N=V+40|0;U=N;V=V+39|0;W=ga+4|0;X=Y+12|0;Y=Y+11|0;Z=da;_=X;aa=_-Z|0;O=-2-Z|0;P=_+2|0;Q=ca+288|0;R=da+9|0;S=R;T=da+8|0;m=0;w=f;n=0;f=0;a:while(1){do if((m|0)>-1)if((n|0)>(2147483647-m|0)){c[(Ym()|0)>>2]=75;m=-1;break}else{m=n+m|0;break}while(0);n=a[w>>0]|0;if(!(n<<24>>24)){L=245;break}else o=w;b:while(1){switch(n<<24>>24){case 37:{n=o;L=9;break b}case 0:{n=o;break b}default:{}}K=o+1|0;n=a[K>>0]|0;o=K}c:do if((L|0)==9)while(1){L=0;if((a[n+1>>0]|0)!=37)break c;o=o+1|0;n=n+2|0;if((a[n>>0]|0)==37)L=9;else break}while(0);y=o-w|0;if(M?(c[e>>2]&32|0)==0:0)qn(w,y,e)|0;if((o|0)!=(w|0)){w=n;n=y;continue}r=n+1|0;o=a[r>>0]|0;p=(o<<24>>24)+-48|0;if(p>>>0<10){K=(a[n+2>>0]|0)==36;r=K?n+3|0:r;o=a[r>>0]|0;u=K?p:-1;f=K?1:f}else u=-1;n=o<<24>>24;d:do if((n&-32|0)==32){p=0;while(1){if(!(1<<n+-32&75913)){s=p;n=r;break d}p=1<<(o<<24>>24)+-32|p;r=r+1|0;o=a[r>>0]|0;n=o<<24>>24;if((n&-32|0)!=32){s=p;n=r;break}}}else{s=0;n=r}while(0);do if(o<<24>>24==42){p=n+1|0;o=(a[p>>0]|0)+-48|0;if(o>>>0<10?(a[n+2>>0]|0)==36:0){c[l+(o<<2)>>2]=10;f=1;n=n+3|0;o=c[j+((a[p>>0]|0)+-48<<3)>>2]|0}else{if(f){m=-1;break a}if(!M){x=s;n=p;f=0;K=0;break}f=(c[g>>2]|0)+(4-1)&~(4-1);o=c[f>>2]|0;c[g>>2]=f+4;f=0;n=p}if((o|0)<0){x=s|8192;K=0-o|0}else{x=s;K=o}}else{p=(o<<24>>24)+-48|0;if(p>>>0<10){o=0;do{o=(o*10|0)+p|0;n=n+1|0;p=(a[n>>0]|0)+-48|0}while(p>>>0<10);if((o|0)<0){m=-1;break a}else{x=s;K=o}}else{x=s;K=0}}while(0);e:do if((a[n>>0]|0)==46){p=n+1|0;o=a[p>>0]|0;if(o<<24>>24!=42){r=(o<<24>>24)+-48|0;if(r>>>0<10){n=p;o=0}else{n=p;r=0;break}while(1){o=(o*10|0)+r|0;n=n+1|0;r=(a[n>>0]|0)+-48|0;if(r>>>0>=10){r=o;break e}}}p=n+2|0;o=(a[p>>0]|0)+-48|0;if(o>>>0<10?(a[n+3>>0]|0)==36:0){c[l+(o<<2)>>2]=10;n=n+4|0;r=c[j+((a[p>>0]|0)+-48<<3)>>2]|0;break}if(f){m=-1;break a}if(M){n=(c[g>>2]|0)+(4-1)&~(4-1);r=c[n>>2]|0;c[g>>2]=n+4;n=p}else{n=p;r=0}}else r=-1;while(0);t=0;while(1){o=(a[n>>0]|0)+-65|0;if(o>>>0>57){m=-1;break a}p=n+1|0;o=a[12203+(t*58|0)+o>>0]|0;s=o&255;if((s+-1|0)>>>0<8){n=p;t=s}else{J=p;break}}if(!(o<<24>>24)){m=-1;break}p=(u|0)>-1;do if(o<<24>>24==19)if(p){m=-1;break a}else L=52;else{if(p){c[l+(u<<2)>>2]=s;H=j+(u<<3)|0;I=c[H+4>>2]|0;L=ba;c[L>>2]=c[H>>2];c[L+4>>2]=I;L=52;break}if(!M){m=0;break a}Cn(ba,s,g)}while(0);if((L|0)==52?(L=0,!M):0){w=J;n=y;continue}u=a[n>>0]|0;u=(t|0)!=0&(u&15|0)==3?u&-33:u;p=x&-65537;I=(x&8192|0)==0?x:p;f:do switch(u|0){case 110:switch(t|0){case 0:{c[c[ba>>2]>>2]=m;w=J;n=y;continue a}case 1:{c[c[ba>>2]>>2]=m;w=J;n=y;continue a}case 2:{w=c[ba>>2]|0;c[w>>2]=m;c[w+4>>2]=((m|0)<0)<<31>>31;w=J;n=y;continue a}case 3:{b[c[ba>>2]>>1]=m;w=J;n=y;continue a}case 4:{a[c[ba>>2]>>0]=m;w=J;n=y;continue a}case 6:{c[c[ba>>2]>>2]=m;w=J;n=y;continue a}case 7:{w=c[ba>>2]|0;c[w>>2]=m;c[w+4>>2]=((m|0)<0)<<31>>31;w=J;n=y;continue a}default:{w=J;n=y;continue a}}case 112:{t=I|8;r=r>>>0>8?r:8;u=120;L=64;break}case 88:case 120:{t=I;L=64;break}case 111:{p=ba;o=c[p>>2]|0;p=c[p+4>>2]|0;if((o|0)==0&(p|0)==0)n=N;else{n=N;do{n=n+-1|0;a[n>>0]=o&7|48;o=Un(o|0,p|0,3)|0;p=D}while(!((o|0)==0&(p|0)==0))}if(!(I&8)){o=I;t=0;s=12683;L=77}else{t=U-n+1|0;o=I;r=(r|0)<(t|0)?t:r;t=0;s=12683;L=77}break}case 105:case 100:{o=ba;n=c[o>>2]|0;o=c[o+4>>2]|0;if((o|0)<0){n=Qn(0,0,n|0,o|0)|0;o=D;p=ba;c[p>>2]=n;c[p+4>>2]=o;p=1;s=12683;L=76;break f}if(!(I&2048)){s=I&1;p=s;s=(s|0)==0?12683:12685;L=76}else{p=1;s=12684;L=76}break}case 117:{o=ba;n=c[o>>2]|0;o=c[o+4>>2]|0;p=0;s=12683;L=76;break}case 99:{a[V>>0]=c[ba>>2];w=V;o=1;t=0;u=12683;n=N;break}case 109:{n=Zm(c[(Ym()|0)>>2]|0)|0;L=82;break}case 115:{n=c[ba>>2]|0;n=(n|0)!=0?n:12693;L=82;break}case 67:{c[ga>>2]=c[ba>>2];c[W>>2]=0;c[ba>>2]=ga;r=-1;L=86;break}case 83:{if(!r){En(e,32,K,0,I);n=0;L=98}else L=86;break}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{q=+h[ba>>3];c[ea>>2]=0;h[k>>3]=q;if((c[k+4>>2]|0)>=0)if(!(I&2048)){H=I&1;G=H;H=(H|0)==0?12701:12706}else{G=1;H=12703}else{q=-q;G=1;H=12700}h[k>>3]=q;F=c[k+4>>2]&2146435072;do if(F>>>0<2146435072|(F|0)==2146435072&0<0){v=+cn(q,ea)*2.0;o=v!=0.0;if(o)c[ea>>2]=(c[ea>>2]|0)+-1;C=u|32;if((C|0)==97){w=u&32;y=(w|0)==0?H:H+9|0;x=G|2;n=12-r|0;do if(!(r>>>0>11|(n|0)==0)){q=8.0;do{n=n+-1|0;q=q*16.0}while((n|0)!=0);if((a[y>>0]|0)==45){q=-(q+(-v-q));break}else{q=v+q-q;break}}else q=v;while(0);o=c[ea>>2]|0;n=(o|0)<0?0-o|0:o;n=Dn(n,((n|0)<0)<<31>>31,X)|0;if((n|0)==(X|0)){a[Y>>0]=48;n=Y}a[n+-1>>0]=(o>>31&2)+43;t=n+-2|0;a[t>>0]=u+15;s=(r|0)<1;p=(I&8|0)==0;o=da;while(1){H=~~q;n=o+1|0;a[o>>0]=d[12667+H>>0]|w;q=(q-+(H|0))*16.0;do if((n-Z|0)==1){if(p&(s&q==0.0))break;a[n>>0]=46;n=o+2|0}while(0);if(!(q!=0.0))break;else o=n}r=(r|0)!=0&(O+n|0)<(r|0)?P+r-t|0:aa-t+n|0;p=r+x|0;En(e,32,K,p,I);if(!(c[e>>2]&32))qn(y,x,e)|0;En(e,48,K,p,I^65536);n=n-Z|0;if(!(c[e>>2]&32))qn(da,n,e)|0;o=_-t|0;En(e,48,r-(n+o)|0,0,0);if(!(c[e>>2]&32))qn(t,o,e)|0;En(e,32,K,p,I^8192);n=(p|0)<(K|0)?K:p;break}n=(r|0)<0?6:r;if(o){o=(c[ea>>2]|0)+-28|0;c[ea>>2]=o;q=v*268435456.0}else{q=v;o=c[ea>>2]|0}F=(o|0)<0?ca:Q;E=F;o=F;do{B=~~q>>>0;c[o>>2]=B;o=o+4|0;q=(q-+(B>>>0))*1.0e9}while(q!=0.0);p=o;o=c[ea>>2]|0;if((o|0)>0){s=F;while(1){t=(o|0)>29?29:o;r=p+-4|0;do if(r>>>0<s>>>0)r=s;else{o=0;do{B=Sn(c[r>>2]|0,0,t|0)|0;B=Tn(B|0,D|0,o|0,0)|0;o=D;A=bo(B|0,o|0,1e9,0)|0;c[r>>2]=A;o=ao(B|0,o|0,1e9,0)|0;r=r+-4|0}while(r>>>0>=s>>>0);if(!o){r=s;break}r=s+-4|0;c[r>>2]=o}while(0);while(1){if(p>>>0<=r>>>0)break;o=p+-4|0;if(!(c[o>>2]|0))p=o;else break}o=(c[ea>>2]|0)-t|0;c[ea>>2]=o;if((o|0)>0)s=r;else break}}else r=F;if((o|0)<0){y=((n+25|0)/9|0)+1|0;z=(C|0)==102;w=r;while(1){x=0-o|0;x=(x|0)>9?9:x;do if(w>>>0<p>>>0){o=(1<<x)+-1|0;s=1e9>>>x;r=0;t=w;do{B=c[t>>2]|0;c[t>>2]=(B>>>x)+r;r=$(B&o,s)|0;t=t+4|0}while(t>>>0<p>>>0);o=(c[w>>2]|0)==0?w+4|0:w;if(!r){r=o;break}c[p>>2]=r;r=o;p=p+4|0}else r=(c[w>>2]|0)==0?w+4|0:w;while(0);o=z?F:r;p=(p-o>>2|0)>(y|0)?o+(y<<2)|0:p;o=(c[ea>>2]|0)+x|0;c[ea>>2]=o;if((o|0)>=0){w=r;break}else w=r}}else w=r;do if(w>>>0<p>>>0){o=(E-w>>2)*9|0;s=c[w>>2]|0;if(s>>>0<10)break;else r=10;do{r=r*10|0;o=o+1|0}while(s>>>0>=r>>>0)}else o=0;while(0);A=(C|0)==103;B=(n|0)!=0;r=n-((C|0)!=102?o:0)+((B&A)<<31>>31)|0;if((r|0)<(((p-E>>2)*9|0)+-9|0)){t=r+9216|0;z=(t|0)/9|0;r=F+(z+-1023<<2)|0;t=((t|0)%9|0)+1|0;if((t|0)<9){s=10;do{s=s*10|0;t=t+1|0}while((t|0)!=9)}else s=10;x=c[r>>2]|0;y=(x>>>0)%(s>>>0)|0;if((y|0)==0?(F+(z+-1022<<2)|0)==(p|0):0)s=w;else L=163;do if((L|0)==163){L=0;v=(((x>>>0)/(s>>>0)|0)&1|0)==0?9007199254740992.0:9007199254740994.0;t=(s|0)/2|0;do if(y>>>0<t>>>0)q=.5;else{if((y|0)==(t|0)?(F+(z+-1022<<2)|0)==(p|0):0){q=1.0;break}q=1.5}while(0);do if(G){if((a[H>>0]|0)!=45)break;v=-v;q=-q}while(0);t=x-y|0;c[r>>2]=t;if(!(v+q!=v)){s=w;break}C=t+s|0;c[r>>2]=C;if(C>>>0>999999999){o=w;while(1){s=r+-4|0;c[r>>2]=0;if(s>>>0<o>>>0){o=o+-4|0;c[o>>2]=0}C=(c[s>>2]|0)+1|0;c[s>>2]=C;if(C>>>0>999999999)r=s;else{w=o;r=s;break}}}o=(E-w>>2)*9|0;t=c[w>>2]|0;if(t>>>0<10){s=w;break}else s=10;do{s=s*10|0;o=o+1|0}while(t>>>0>=s>>>0);s=w}while(0);C=r+4|0;w=s;p=p>>>0>C>>>0?C:p}y=0-o|0;while(1){if(p>>>0<=w>>>0){z=0;C=p;break}r=p+-4|0;if(!(c[r>>2]|0))p=r;else{z=1;C=p;break}}do if(A){n=(B&1^1)+n|0;if((n|0)>(o|0)&(o|0)>-5){u=u+-1|0;n=n+-1-o|0}else{u=u+-2|0;n=n+-1|0}p=I&8;if(p)break;do if(z){p=c[C+-4>>2]|0;if(!p){r=9;break}if(!((p>>>0)%10|0)){s=10;r=0}else{r=0;break}do{s=s*10|0;r=r+1|0}while(((p>>>0)%(s>>>0)|0|0)==0)}else r=9;while(0);p=((C-E>>2)*9|0)+-9|0;if((u|32|0)==102){p=p-r|0;p=(p|0)<0?0:p;n=(n|0)<(p|0)?n:p;p=0;break}else{p=p+o-r|0;p=(p|0)<0?0:p;n=(n|0)<(p|0)?n:p;p=0;break}}else p=I&8;while(0);x=n|p;s=(x|0)!=0&1;t=(u|32|0)==102;if(t){o=(o|0)>0?o:0;u=0}else{r=(o|0)<0?y:o;r=Dn(r,((r|0)<0)<<31>>31,X)|0;if((_-r|0)<2)do{r=r+-1|0;a[r>>0]=48}while((_-r|0)<2);a[r+-1>>0]=(o>>31&2)+43;E=r+-2|0;a[E>>0]=u;o=_-E|0;u=E}y=G+1+n+s+o|0;En(e,32,K,y,I);if(!(c[e>>2]&32))qn(H,G,e)|0;En(e,48,K,y,I^65536);do if(t){r=w>>>0>F>>>0?F:w;o=r;do{p=Dn(c[o>>2]|0,0,R)|0;do if((o|0)==(r|0)){if((p|0)!=(R|0))break;a[T>>0]=48;p=T}else{if(p>>>0<=da>>>0)break;do{p=p+-1|0;a[p>>0]=48}while(p>>>0>da>>>0)}while(0);if(!(c[e>>2]&32))qn(p,S-p|0,e)|0;o=o+4|0}while(o>>>0<=F>>>0);do if(x){if(c[e>>2]&32)break;qn(12735,1,e)|0}while(0);if((n|0)>0&o>>>0<C>>>0){p=o;while(1){o=Dn(c[p>>2]|0,0,R)|0;if(o>>>0>da>>>0)do{o=o+-1|0;a[o>>0]=48}while(o>>>0>da>>>0);if(!(c[e>>2]&32))qn(o,(n|0)>9?9:n,e)|0;p=p+4|0;o=n+-9|0;if(!((n|0)>9&p>>>0<C>>>0)){n=o;break}else n=o}}En(e,48,n+9|0,9,0)}else{t=z?C:w+4|0;if((n|0)>-1){s=(p|0)==0;r=w;do{o=Dn(c[r>>2]|0,0,R)|0;if((o|0)==(R|0)){a[T>>0]=48;o=T}do if((r|0)==(w|0)){p=o+1|0;if(!(c[e>>2]&32))qn(o,1,e)|0;if(s&(n|0)<1){o=p;break}if(c[e>>2]&32){o=p;break}qn(12735,1,e)|0;o=p}else{if(o>>>0<=da>>>0)break;do{o=o+-1|0;a[o>>0]=48}while(o>>>0>da>>>0)}while(0);p=S-o|0;if(!(c[e>>2]&32))qn(o,(n|0)>(p|0)?p:n,e)|0;n=n-p|0;r=r+4|0}while(r>>>0<t>>>0&(n|0)>-1)}En(e,48,n+18|0,18,0);if(c[e>>2]&32)break;qn(u,_-u|0,e)|0}while(0);En(e,32,K,y,I^8192);n=(y|0)<(K|0)?K:y}else{t=(u&32|0)!=0;s=q!=q|0.0!=0.0;o=s?0:G;r=o+3|0;En(e,32,K,r,p);n=c[e>>2]|0;if(!(n&32)){qn(H,o,e)|0;n=c[e>>2]|0}if(!(n&32))qn(s?(t?12727:12731):t?12719:12723,3,e)|0;En(e,32,K,r,I^8192);n=(r|0)<(K|0)?K:r}while(0);w=J;continue a}default:{p=I;o=r;t=0;u=12683;n=N}}while(0);g:do if((L|0)==64){p=ba;o=c[p>>2]|0;p=c[p+4>>2]|0;s=u&32;if(!((o|0)==0&(p|0)==0)){n=N;do{n=n+-1|0;a[n>>0]=d[12667+(o&15)>>0]|s;o=Un(o|0,p|0,4)|0;p=D}while(!((o|0)==0&(p|0)==0));L=ba;if((t&8|0)==0|(c[L>>2]|0)==0&(c[L+4>>2]|0)==0){o=t;t=0;s=12683;L=77}else{o=t;t=2;s=12683+(u>>4)|0;L=77}}else{n=N;o=t;t=0;s=12683;L=77}}else if((L|0)==76){n=Dn(n,o,N)|0;o=I;t=p;L=77}else if((L|0)==82){L=0;I=wn(n,0,r)|0;H=(I|0)==0;w=n;o=H?r:I-n|0;t=0;u=12683;n=H?n+r|0:I}else if((L|0)==86){L=0;o=0;n=0;s=c[ba>>2]|0;while(1){p=c[s>>2]|0;if(!p)break;n=fn(fa,p)|0;if((n|0)<0|n>>>0>(r-o|0)>>>0)break;o=n+o|0;if(r>>>0>o>>>0)s=s+4|0;else break}if((n|0)<0){m=-1;break a}En(e,32,K,o,I);if(!o){n=0;L=98}else{p=0;r=c[ba>>2]|0;while(1){n=c[r>>2]|0;if(!n){n=o;L=98;break g}n=fn(fa,n)|0;p=n+p|0;if((p|0)>(o|0)){n=o;L=98;break g}if(!(c[e>>2]&32))qn(fa,n,e)|0;if(p>>>0>=o>>>0){n=o;L=98;break}else r=r+4|0}}}while(0);if((L|0)==98){L=0;En(e,32,K,n,I^8192);w=J;n=(K|0)>(n|0)?K:n;continue}if((L|0)==77){L=0;p=(r|0)>-1?o&-65537:o;o=ba;o=(c[o>>2]|0)!=0|(c[o+4>>2]|0)!=0;if((r|0)!=0|o){o=(o&1^1)+(U-n)|0;w=n;o=(r|0)>(o|0)?r:o;u=s;n=N}else{w=N;o=0;u=s;n=N}}s=n-w|0;o=(o|0)<(s|0)?s:o;r=t+o|0;n=(K|0)<(r|0)?r:K;En(e,32,n,r,p);if(!(c[e>>2]&32))qn(u,t,e)|0;En(e,48,n,r,p^65536);En(e,48,o,s,0);if(!(c[e>>2]&32))qn(w,s,e)|0;En(e,32,n,r,p^8192);w=J}h:do if((L|0)==245)if(!e)if(f){m=1;while(1){f=c[l+(m<<2)>>2]|0;if(!f)break;Cn(j+(m<<3)|0,f,g);m=m+1|0;if((m|0)>=10){m=1;break h}}if((m|0)<10)while(1){if(c[l+(m<<2)>>2]|0){m=-1;break h}m=m+1|0;if((m|0)>=10){m=1;break}}else m=1}else m=0;while(0);i=ha;return m|0}function Cn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;c[a>>2]=b;break a}case 10:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=((b|0)<0)<<31>>31;break a}case 11:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=0;break a}case 12:{e=(c[d>>2]|0)+(8-1)&~(8-1);b=e;f=c[b>>2]|0;b=c[b+4>>2]|0;c[d>>2]=e+8;e=a;c[e>>2]=f;c[e+4>>2]=b;break a}case 13:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&65535)<<16>>16;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 14:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&65535;c[f+4>>2]=0;break a}case 15:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&255)<<24>>24;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a}case 16:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&255;c[f+4>>2]=0;break a}case 17:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}case 18:{f=(c[d>>2]|0)+(8-1)&~(8-1);g=+h[f>>3];c[d>>2]=f+8;h[a>>3]=g;break a}default:break a}while(0);while(0);return}function Dn(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if(c>>>0>0|(c|0)==0&b>>>0>4294967295)while(1){e=bo(b|0,c|0,10,0)|0;d=d+-1|0;a[d>>0]=e|48;e=ao(b|0,c|0,10,0)|0;if(c>>>0>9|(c|0)==9&b>>>0>4294967295){b=e;c=D}else{b=e;break}}if(b)while(1){d=d+-1|0;a[d>>0]=(b>>>0)%10|0|48;if(b>>>0<10)break;else b=(b>>>0)/10|0}return d|0}function En(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;j=i;i=i+256|0;h=j;do if((d|0)>(e|0)&(f&73728|0)==0){f=d-e|0;Rn(h|0,b|0,(f>>>0>256?256:f)|0)|0;b=c[a>>2]|0;g=(b&32|0)==0;if(f>>>0>255){e=d-e|0;do{if(g){qn(h,256,a)|0;b=c[a>>2]|0}f=f+-256|0;g=(b&32|0)==0}while(f>>>0>255);if(g)f=e&255;else break}else if(!g)break;qn(h,f,a)|0}while(0);i=j;return}function Fn(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;do if(a>>>0<245){o=a>>>0<11?16:a+11&-8;a=o>>>3;i=c[1177]|0;d=i>>>a;if(d&3){a=(d&1^1)+a|0;e=a<<1;d=4748+(e<<2)|0;e=4748+(e+2<<2)|0;f=c[e>>2]|0;g=f+8|0;h=c[g>>2]|0;do if((d|0)!=(h|0)){if(h>>>0<(c[1181]|0)>>>0)ab();b=h+12|0;if((c[b>>2]|0)==(f|0)){c[b>>2]=d;c[e>>2]=h;break}else ab()}else c[1177]=i&~(1<<a);while(0);M=a<<3;c[f+4>>2]=M|3;M=f+(M|4)|0;c[M>>2]=c[M>>2]|1;M=g;return M|0}h=c[1179]|0;if(o>>>0>h>>>0){if(d){e=2<<a;e=d<<a&(e|0-e);e=(e&0-e)+-1|0;j=e>>>12&16;e=e>>>j;f=e>>>5&8;e=e>>>f;g=e>>>2&4;e=e>>>g;d=e>>>1&2;e=e>>>d;a=e>>>1&1;a=(f|j|g|d|a)+(e>>>a)|0;e=a<<1;d=4748+(e<<2)|0;e=4748+(e+2<<2)|0;g=c[e>>2]|0;j=g+8|0;f=c[j>>2]|0;do if((d|0)!=(f|0)){if(f>>>0<(c[1181]|0)>>>0)ab();b=f+12|0;if((c[b>>2]|0)==(g|0)){c[b>>2]=d;c[e>>2]=f;k=c[1179]|0;break}else ab()}else{c[1177]=i&~(1<<a);k=h}while(0);M=a<<3;h=M-o|0;c[g+4>>2]=o|3;i=g+o|0;c[g+(o|4)>>2]=h|1;c[g+M>>2]=h;if(k){f=c[1182]|0;d=k>>>3;b=d<<1;e=4748+(b<<2)|0;a=c[1177]|0;d=1<<d;if(a&d){a=4748+(b+2<<2)|0;b=c[a>>2]|0;if(b>>>0<(c[1181]|0)>>>0)ab();else{l=a;m=b}}else{c[1177]=a|d;l=4748+(b+2<<2)|0;m=e}c[l>>2]=f;c[m+12>>2]=f;c[f+8>>2]=m;c[f+12>>2]=e}c[1179]=h;c[1182]=i;M=j;return M|0}a=c[1178]|0;if(a){d=(a&0-a)+-1|0;L=d>>>12&16;d=d>>>L;K=d>>>5&8;d=d>>>K;M=d>>>2&4;d=d>>>M;a=d>>>1&2;d=d>>>a;e=d>>>1&1;e=c[5012+((K|L|M|a|e)+(d>>>e)<<2)>>2]|0;d=(c[e+4>>2]&-8)-o|0;a=e;while(1){b=c[a+16>>2]|0;if(!b){b=c[a+20>>2]|0;if(!b){j=d;break}}a=(c[b+4>>2]&-8)-o|0;M=a>>>0<d>>>0;d=M?a:d;a=b;e=M?b:e}g=c[1181]|0;if(e>>>0<g>>>0)ab();i=e+o|0;if(e>>>0>=i>>>0)ab();h=c[e+24>>2]|0;d=c[e+12>>2]|0;do if((d|0)==(e|0)){a=e+20|0;b=c[a>>2]|0;if(!b){a=e+16|0;b=c[a>>2]|0;if(!b){n=0;break}}while(1){d=b+20|0;f=c[d>>2]|0;if(f){b=f;a=d;continue}d=b+16|0;f=c[d>>2]|0;if(!f)break;else{b=f;a=d}}if(a>>>0<g>>>0)ab();else{c[a>>2]=0;n=b;break}}else{f=c[e+8>>2]|0;if(f>>>0<g>>>0)ab();b=f+12|0;if((c[b>>2]|0)!=(e|0))ab();a=d+8|0;if((c[a>>2]|0)==(e|0)){c[b>>2]=d;c[a>>2]=f;n=d;break}else ab()}while(0);do if(h){b=c[e+28>>2]|0;a=5012+(b<<2)|0;if((e|0)==(c[a>>2]|0)){c[a>>2]=n;if(!n){c[1178]=c[1178]&~(1<<b);break}}else{if(h>>>0<(c[1181]|0)>>>0)ab();b=h+16|0;if((c[b>>2]|0)==(e|0))c[b>>2]=n;else c[h+20>>2]=n;if(!n)break}a=c[1181]|0;if(n>>>0<a>>>0)ab();c[n+24>>2]=h;b=c[e+16>>2]|0;do if(b)if(b>>>0<a>>>0)ab();else{c[n+16>>2]=b;c[b+24>>2]=n;break}while(0);b=c[e+20>>2]|0;if(b)if(b>>>0<(c[1181]|0)>>>0)ab();else{c[n+20>>2]=b;c[b+24>>2]=n;break}}while(0);if(j>>>0<16){M=j+o|0;c[e+4>>2]=M|3;M=e+(M+4)|0;c[M>>2]=c[M>>2]|1}else{c[e+4>>2]=o|3;c[e+(o|4)>>2]=j|1;c[e+(j+o)>>2]=j;b=c[1179]|0;if(b){g=c[1182]|0;d=b>>>3;b=d<<1;f=4748+(b<<2)|0;a=c[1177]|0;d=1<<d;if(a&d){b=4748+(b+2<<2)|0;a=c[b>>2]|0;if(a>>>0<(c[1181]|0)>>>0)ab();else{p=b;q=a}}else{c[1177]=a|d;p=4748+(b+2<<2)|0;q=f}c[p>>2]=g;c[q+12>>2]=g;c[g+8>>2]=q;c[g+12>>2]=f}c[1179]=j;c[1182]=i}M=e+8|0;return M|0}else q=o}else q=o}else if(a>>>0<=4294967231){a=a+11|0;m=a&-8;l=c[1178]|0;if(l){d=0-m|0;a=a>>>8;if(a)if(m>>>0>16777215)k=31;else{q=(a+1048320|0)>>>16&8;v=a<<q;p=(v+520192|0)>>>16&4;v=v<<p;k=(v+245760|0)>>>16&2;k=14-(p|q|k)+(v<<k>>>15)|0;k=m>>>(k+7|0)&1|k<<1}else k=0;a=c[5012+(k<<2)>>2]|0;a:do if(!a){f=0;a=0;v=86}else{h=d;f=0;i=m<<((k|0)==31?0:25-(k>>>1)|0);j=a;a=0;while(1){g=c[j+4>>2]&-8;d=g-m|0;if(d>>>0<h>>>0)if((g|0)==(m|0)){g=j;a=j;v=90;break a}else a=j;else d=h;v=c[j+20>>2]|0;j=c[j+16+(i>>>31<<2)>>2]|0;f=(v|0)==0|(v|0)==(j|0)?f:v;if(!j){v=86;break}else{h=d;i=i<<1}}}while(0);if((v|0)==86){if((f|0)==0&(a|0)==0){a=2<<k;a=l&(a|0-a);if(!a){q=m;break}a=(a&0-a)+-1|0;n=a>>>12&16;a=a>>>n;l=a>>>5&8;a=a>>>l;p=a>>>2&4;a=a>>>p;q=a>>>1&2;a=a>>>q;f=a>>>1&1;f=c[5012+((l|n|p|q|f)+(a>>>f)<<2)>>2]|0;a=0}if(!f){i=d;j=a}else{g=f;v=90}}if((v|0)==90)while(1){v=0;q=(c[g+4>>2]&-8)-m|0;f=q>>>0<d>>>0;d=f?q:d;a=f?g:a;f=c[g+16>>2]|0;if(f){g=f;v=90;continue}g=c[g+20>>2]|0;if(!g){i=d;j=a;break}else v=90}if((j|0)!=0?i>>>0<((c[1179]|0)-m|0)>>>0:0){f=c[1181]|0;if(j>>>0<f>>>0)ab();h=j+m|0;if(j>>>0>=h>>>0)ab();g=c[j+24>>2]|0;d=c[j+12>>2]|0;do if((d|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){o=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}if(a>>>0<f>>>0)ab();else{c[a>>2]=0;o=b;break}}else{e=c[j+8>>2]|0;if(e>>>0<f>>>0)ab();b=e+12|0;if((c[b>>2]|0)!=(j|0))ab();a=d+8|0;if((c[a>>2]|0)==(j|0)){c[b>>2]=d;c[a>>2]=e;o=d;break}else ab()}while(0);do if(g){b=c[j+28>>2]|0;a=5012+(b<<2)|0;if((j|0)==(c[a>>2]|0)){c[a>>2]=o;if(!o){c[1178]=c[1178]&~(1<<b);break}}else{if(g>>>0<(c[1181]|0)>>>0)ab();b=g+16|0;if((c[b>>2]|0)==(j|0))c[b>>2]=o;else c[g+20>>2]=o;if(!o)break}a=c[1181]|0;if(o>>>0<a>>>0)ab();c[o+24>>2]=g;b=c[j+16>>2]|0;do if(b)if(b>>>0<a>>>0)ab();else{c[o+16>>2]=b;c[b+24>>2]=o;break}while(0);b=c[j+20>>2]|0;if(b)if(b>>>0<(c[1181]|0)>>>0)ab();else{c[o+20>>2]=b;c[b+24>>2]=o;break}}while(0);b:do if(i>>>0>=16){c[j+4>>2]=m|3;c[j+(m|4)>>2]=i|1;c[j+(i+m)>>2]=i;b=i>>>3;if(i>>>0<256){a=b<<1;e=4748+(a<<2)|0;d=c[1177]|0;b=1<<b;if(d&b){b=4748+(a+2<<2)|0;a=c[b>>2]|0;if(a>>>0<(c[1181]|0)>>>0)ab();else{s=b;t=a}}else{c[1177]=d|b;s=4748+(a+2<<2)|0;t=e}c[s>>2]=h;c[t+12>>2]=h;c[j+(m+8)>>2]=t;c[j+(m+12)>>2]=e;break}b=i>>>8;if(b)if(i>>>0>16777215)e=31;else{L=(b+1048320|0)>>>16&8;M=b<<L;K=(M+520192|0)>>>16&4;M=M<<K;e=(M+245760|0)>>>16&2;e=14-(K|L|e)+(M<<e>>>15)|0;e=i>>>(e+7|0)&1|e<<1}else e=0;b=5012+(e<<2)|0;c[j+(m+28)>>2]=e;c[j+(m+20)>>2]=0;c[j+(m+16)>>2]=0;a=c[1178]|0;d=1<<e;if(!(a&d)){c[1178]=a|d;c[b>>2]=h;c[j+(m+24)>>2]=b;c[j+(m+12)>>2]=h;c[j+(m+8)>>2]=h;break}b=c[b>>2]|0;c:do if((c[b+4>>2]&-8|0)!=(i|0)){e=i<<((e|0)==31?0:25-(e>>>1)|0);while(1){a=b+16+(e>>>31<<2)|0;d=c[a>>2]|0;if(!d)break;if((c[d+4>>2]&-8|0)==(i|0)){y=d;break c}else{e=e<<1;b=d}}if(a>>>0<(c[1181]|0)>>>0)ab();else{c[a>>2]=h;c[j+(m+24)>>2]=b;c[j+(m+12)>>2]=h;c[j+(m+8)>>2]=h;break b}}else y=b;while(0);b=y+8|0;a=c[b>>2]|0;M=c[1181]|0;if(a>>>0>=M>>>0&y>>>0>=M>>>0){c[a+12>>2]=h;c[b>>2]=h;c[j+(m+8)>>2]=a;c[j+(m+12)>>2]=y;c[j+(m+24)>>2]=0;break}else ab()}else{M=i+m|0;c[j+4>>2]=M|3;M=j+(M+4)|0;c[M>>2]=c[M>>2]|1}while(0);M=j+8|0;return M|0}else q=m}else q=m}else q=-1;while(0);d=c[1179]|0;if(d>>>0>=q>>>0){b=d-q|0;a=c[1182]|0;if(b>>>0>15){c[1182]=a+q;c[1179]=b;c[a+(q+4)>>2]=b|1;c[a+d>>2]=b;c[a+4>>2]=q|3}else{c[1179]=0;c[1182]=0;c[a+4>>2]=d|3;M=a+(d+4)|0;c[M>>2]=c[M>>2]|1}M=a+8|0;return M|0}a=c[1180]|0;if(a>>>0>q>>>0){L=a-q|0;c[1180]=L;M=c[1183]|0;c[1183]=M+q;c[M+(q+4)>>2]=L|1;c[M+4>>2]=q|3;M=M+8|0;return M|0}do if(!(c[1295]|0)){a=Za(30)|0;if(!(a+-1&a)){c[1297]=a;c[1296]=a;c[1298]=-1;c[1299]=-1;c[1300]=0;c[1288]=0;c[1295]=(Qa(0)|0)&-16^1431655768;break}else ab()}while(0);j=q+48|0;i=c[1297]|0;k=q+47|0;h=i+k|0;i=0-i|0;l=h&i;if(l>>>0<=q>>>0){M=0;return M|0}a=c[1287]|0;if((a|0)!=0?(t=c[1285]|0,y=t+l|0,y>>>0<=t>>>0|y>>>0>a>>>0):0){M=0;return M|0}d:do if(!(c[1288]&4)){a=c[1183]|0;e:do if(a){f=5156;while(1){d=c[f>>2]|0;if(d>>>0<=a>>>0?(r=f+4|0,(d+(c[r>>2]|0)|0)>>>0>a>>>0):0){g=f;a=r;break}f=c[f+8>>2]|0;if(!f){v=174;break e}}d=h-(c[1180]|0)&i;if(d>>>0<2147483647){f=Ua(d|0)|0;y=(f|0)==((c[g>>2]|0)+(c[a>>2]|0)|0);a=y?d:0;if(y){if((f|0)!=(-1|0)){w=f;p=a;v=194;break d}}else v=184}else a=0}else v=174;while(0);do if((v|0)==174){g=Ua(0)|0;if((g|0)!=(-1|0)){a=g;d=c[1296]|0;f=d+-1|0;if(!(f&a))d=l;else d=l-a+(f+a&0-d)|0;a=c[1285]|0;f=a+d|0;if(d>>>0>q>>>0&d>>>0<2147483647){y=c[1287]|0;if((y|0)!=0?f>>>0<=a>>>0|f>>>0>y>>>0:0){a=0;break}f=Ua(d|0)|0;y=(f|0)==(g|0);a=y?d:0;if(y){w=g;p=a;v=194;break d}else v=184}else a=0}else a=0}while(0);f:do if((v|0)==184){g=0-d|0;do if(j>>>0>d>>>0&(d>>>0<2147483647&(f|0)!=(-1|0))?(u=c[1297]|0,u=k-d+u&0-u,u>>>0<2147483647):0)if((Ua(u|0)|0)==(-1|0)){Ua(g|0)|0;break f}else{d=u+d|0;break}while(0);if((f|0)!=(-1|0)){w=f;p=d;v=194;break d}}while(0);c[1288]=c[1288]|4;v=191}else{a=0;v=191}while(0);if((((v|0)==191?l>>>0<2147483647:0)?(w=Ua(l|0)|0,x=Ua(0)|0,w>>>0<x>>>0&((w|0)!=(-1|0)&(x|0)!=(-1|0))):0)?(z=x-w|0,A=z>>>0>(q+40|0)>>>0,A):0){p=A?z:a;v=194}if((v|0)==194){a=(c[1285]|0)+p|0;c[1285]=a;if(a>>>0>(c[1286]|0)>>>0)c[1286]=a;h=c[1183]|0;g:do if(h){g=5156;do{a=c[g>>2]|0;d=g+4|0;f=c[d>>2]|0;if((w|0)==(a+f|0)){B=a;C=d;D=f;E=g;v=204;break}g=c[g+8>>2]|0}while((g|0)!=0);if(((v|0)==204?(c[E+12>>2]&8|0)==0:0)?h>>>0<w>>>0&h>>>0>=B>>>0:0){c[C>>2]=D+p;M=(c[1180]|0)+p|0;L=h+8|0;L=(L&7|0)==0?0:0-L&7;K=M-L|0;c[1183]=h+L;c[1180]=K;c[h+(L+4)>>2]=K|1;c[h+(M+4)>>2]=40;c[1184]=c[1299];break}a=c[1181]|0;if(w>>>0<a>>>0){c[1181]=w;a=w}d=w+p|0;g=5156;while(1){if((c[g>>2]|0)==(d|0)){f=g;d=g;v=212;break}g=c[g+8>>2]|0;if(!g){d=5156;break}}if((v|0)==212)if(!(c[d+12>>2]&8)){c[f>>2]=w;n=d+4|0;c[n>>2]=(c[n>>2]|0)+p;n=w+8|0;n=(n&7|0)==0?0:0-n&7;k=w+(p+8)|0;k=(k&7|0)==0?0:0-k&7;b=w+(k+p)|0;m=n+q|0;o=w+m|0;l=b-(w+n)-q|0;c[w+(n+4)>>2]=q|3;h:do if((b|0)!=(h|0)){if((b|0)==(c[1182]|0)){M=(c[1179]|0)+l|0;c[1179]=M;c[1182]=o;c[w+(m+4)>>2]=M|1;c[w+(M+m)>>2]=M;break}i=p+4|0;d=c[w+(i+k)>>2]|0;if((d&3|0)==1){j=d&-8;g=d>>>3;i:do if(d>>>0>=256){h=c[w+((k|24)+p)>>2]|0;e=c[w+(p+12+k)>>2]|0;do if((e|0)==(b|0)){f=k|16;e=w+(i+f)|0;d=c[e>>2]|0;if(!d){e=w+(f+p)|0;d=c[e>>2]|0;if(!d){J=0;break}}while(1){f=d+20|0;g=c[f>>2]|0;if(g){d=g;e=f;continue}f=d+16|0;g=c[f>>2]|0;if(!g)break;else{d=g;e=f}}if(e>>>0<a>>>0)ab();else{c[e>>2]=0;J=d;break}}else{f=c[w+((k|8)+p)>>2]|0;if(f>>>0<a>>>0)ab();a=f+12|0;if((c[a>>2]|0)!=(b|0))ab();d=e+8|0;if((c[d>>2]|0)==(b|0)){c[a>>2]=e;c[d>>2]=f;J=e;break}else ab()}while(0);if(!h)break;a=c[w+(p+28+k)>>2]|0;d=5012+(a<<2)|0;do if((b|0)!=(c[d>>2]|0)){if(h>>>0<(c[1181]|0)>>>0)ab();a=h+16|0;if((c[a>>2]|0)==(b|0))c[a>>2]=J;else c[h+20>>2]=J;if(!J)break i}else{c[d>>2]=J;if(J)break;c[1178]=c[1178]&~(1<<a);break i}while(0);d=c[1181]|0;if(J>>>0<d>>>0)ab();c[J+24>>2]=h;b=k|16;a=c[w+(b+p)>>2]|0;do if(a)if(a>>>0<d>>>0)ab();else{c[J+16>>2]=a;c[a+24>>2]=J;break}while(0);b=c[w+(i+b)>>2]|0;if(!b)break;if(b>>>0<(c[1181]|0)>>>0)ab();else{c[J+20>>2]=b;c[b+24>>2]=J;break}}else{e=c[w+((k|8)+p)>>2]|0;f=c[w+(p+12+k)>>2]|0;d=4748+(g<<1<<2)|0;do if((e|0)!=(d|0)){if(e>>>0<a>>>0)ab();if((c[e+12>>2]|0)==(b|0))break;ab()}while(0);if((f|0)==(e|0)){c[1177]=c[1177]&~(1<<g);break}do if((f|0)==(d|0))F=f+8|0;else{if(f>>>0<a>>>0)ab();a=f+8|0;if((c[a>>2]|0)==(b|0)){F=a;break}ab()}while(0);c[e+12>>2]=f;c[F>>2]=e}while(0);b=w+((j|k)+p)|0;f=j+l|0}else f=l;b=b+4|0;c[b>>2]=c[b>>2]&-2;c[w+(m+4)>>2]=f|1;c[w+(f+m)>>2]=f;b=f>>>3;if(f>>>0<256){a=b<<1;e=4748+(a<<2)|0;d=c[1177]|0;b=1<<b;do if(!(d&b)){c[1177]=d|b;K=4748+(a+2<<2)|0;L=e}else{b=4748+(a+2<<2)|0;a=c[b>>2]|0;if(a>>>0>=(c[1181]|0)>>>0){K=b;L=a;break}ab()}while(0);c[K>>2]=o;c[L+12>>2]=o;c[w+(m+8)>>2]=L;c[w+(m+12)>>2]=e;break}b=f>>>8;do if(!b)e=0;else{if(f>>>0>16777215){e=31;break}K=(b+1048320|0)>>>16&8;L=b<<K;J=(L+520192|0)>>>16&4;L=L<<J;e=(L+245760|0)>>>16&2;e=14-(J|K|e)+(L<<e>>>15)|0;e=f>>>(e+7|0)&1|e<<1}while(0);b=5012+(e<<2)|0;c[w+(m+28)>>2]=e;c[w+(m+20)>>2]=0;c[w+(m+16)>>2]=0;a=c[1178]|0;d=1<<e;if(!(a&d)){c[1178]=a|d;c[b>>2]=o;c[w+(m+24)>>2]=b;c[w+(m+12)>>2]=o;c[w+(m+8)>>2]=o;break}b=c[b>>2]|0;j:do if((c[b+4>>2]&-8|0)!=(f|0)){e=f<<((e|0)==31?0:25-(e>>>1)|0);while(1){a=b+16+(e>>>31<<2)|0;d=c[a>>2]|0;if(!d)break;if((c[d+4>>2]&-8|0)==(f|0)){M=d;break j}else{e=e<<1;b=d}}if(a>>>0<(c[1181]|0)>>>0)ab();else{c[a>>2]=o;c[w+(m+24)>>2]=b;c[w+(m+12)>>2]=o;c[w+(m+8)>>2]=o;break h}}else M=b;while(0);b=M+8|0;a=c[b>>2]|0;L=c[1181]|0;if(a>>>0>=L>>>0&M>>>0>=L>>>0){c[a+12>>2]=o;c[b>>2]=o;c[w+(m+8)>>2]=a;c[w+(m+12)>>2]=M;c[w+(m+24)>>2]=0;break}else ab()}else{M=(c[1180]|0)+l|0;c[1180]=M;c[1183]=o;c[w+(m+4)>>2]=M|1}while(0);M=w+(n|8)|0;return M|0}else d=5156;while(1){a=c[d>>2]|0;if(a>>>0<=h>>>0?(b=c[d+4>>2]|0,e=a+b|0,e>>>0>h>>>0):0)break;d=c[d+8>>2]|0}f=a+(b+-39)|0;a=a+(b+-47+((f&7|0)==0?0:0-f&7))|0;f=h+16|0;a=a>>>0<f>>>0?h:a;b=a+8|0;d=w+8|0;d=(d&7|0)==0?0:0-d&7;M=p+-40-d|0;c[1183]=w+d;c[1180]=M;c[w+(d+4)>>2]=M|1;c[w+(p+-36)>>2]=40;c[1184]=c[1299];d=a+4|0;c[d>>2]=27;c[b>>2]=c[1289];c[b+4>>2]=c[1290];c[b+8>>2]=c[1291];c[b+12>>2]=c[1292];c[1289]=w;c[1290]=p;c[1292]=0;c[1291]=b;b=a+28|0;c[b>>2]=7;if((a+32|0)>>>0<e>>>0)do{M=b;b=b+4|0;c[b>>2]=7}while((M+8|0)>>>0<e>>>0);if((a|0)!=(h|0)){g=a-h|0;c[d>>2]=c[d>>2]&-2;c[h+4>>2]=g|1;c[a>>2]=g;b=g>>>3;if(g>>>0<256){a=b<<1;e=4748+(a<<2)|0;d=c[1177]|0;b=1<<b;if(d&b){b=4748+(a+2<<2)|0;a=c[b>>2]|0;if(a>>>0<(c[1181]|0)>>>0)ab();else{G=b;H=a}}else{c[1177]=d|b;G=4748+(a+2<<2)|0;H=e}c[G>>2]=h;c[H+12>>2]=h;c[h+8>>2]=H;c[h+12>>2]=e;break}b=g>>>8;if(b)if(g>>>0>16777215)e=31;else{L=(b+1048320|0)>>>16&8;M=b<<L;K=(M+520192|0)>>>16&4;M=M<<K;e=(M+245760|0)>>>16&2;e=14-(K|L|e)+(M<<e>>>15)|0;e=g>>>(e+7|0)&1|e<<1}else e=0;d=5012+(e<<2)|0;c[h+28>>2]=e;c[h+20>>2]=0;c[f>>2]=0;b=c[1178]|0;a=1<<e;if(!(b&a)){c[1178]=b|a;c[d>>2]=h;c[h+24>>2]=d;c[h+12>>2]=h;c[h+8>>2]=h;break}b=c[d>>2]|0;k:do if((c[b+4>>2]&-8|0)!=(g|0)){e=g<<((e|0)==31?0:25-(e>>>1)|0);while(1){a=b+16+(e>>>31<<2)|0;d=c[a>>2]|0;if(!d)break;if((c[d+4>>2]&-8|0)==(g|0)){I=d;break k}else{e=e<<1;b=d}}if(a>>>0<(c[1181]|0)>>>0)ab();else{c[a>>2]=h;c[h+24>>2]=b;c[h+12>>2]=h;c[h+8>>2]=h;break g}}else I=b;while(0);b=I+8|0;a=c[b>>2]|0;M=c[1181]|0;if(a>>>0>=M>>>0&I>>>0>=M>>>0){c[a+12>>2]=h;c[b>>2]=h;c[h+8>>2]=a;c[h+12>>2]=I;c[h+24>>2]=0;break}else ab()}}else{M=c[1181]|0;if((M|0)==0|w>>>0<M>>>0)c[1181]=w;c[1289]=w;c[1290]=p;c[1292]=0;c[1186]=c[1295];c[1185]=-1;b=0;do{M=b<<1;L=4748+(M<<2)|0;c[4748+(M+3<<2)>>2]=L;c[4748+(M+2<<2)>>2]=L;b=b+1|0}while((b|0)!=32);M=w+8|0;M=(M&7|0)==0?0:0-M&7;L=p+-40-M|0;c[1183]=w+M;c[1180]=L;c[w+(M+4)>>2]=L|1;c[w+(p+-36)>>2]=40;c[1184]=c[1299]}while(0);b=c[1180]|0;if(b>>>0>q>>>0){L=b-q|0;c[1180]=L;M=c[1183]|0;c[1183]=M+q;c[M+(q+4)>>2]=L|1;c[M+4>>2]=q|3;M=M+8|0;return M|0}}c[(Ym()|0)>>2]=12;M=0;return M|0}function Gn(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if(!a)return;b=a+-8|0;i=c[1181]|0;if(b>>>0<i>>>0)ab();d=c[a+-4>>2]|0;e=d&3;if((e|0)==1)ab();o=d&-8;q=a+(o+-8)|0;do if(!(d&1)){b=c[b>>2]|0;if(!e)return;j=-8-b|0;l=a+j|0;m=b+o|0;if(l>>>0<i>>>0)ab();if((l|0)==(c[1182]|0)){b=a+(o+-4)|0;d=c[b>>2]|0;if((d&3|0)!=3){u=l;g=m;break}c[1179]=m;c[b>>2]=d&-2;c[a+(j+4)>>2]=m|1;c[q>>2]=m;return}f=b>>>3;if(b>>>0<256){e=c[a+(j+8)>>2]|0;d=c[a+(j+12)>>2]|0;b=4748+(f<<1<<2)|0;if((e|0)!=(b|0)){if(e>>>0<i>>>0)ab();if((c[e+12>>2]|0)!=(l|0))ab()}if((d|0)==(e|0)){c[1177]=c[1177]&~(1<<f);u=l;g=m;break}if((d|0)!=(b|0)){if(d>>>0<i>>>0)ab();b=d+8|0;if((c[b>>2]|0)==(l|0))h=b;else ab()}else h=d+8|0;c[e+12>>2]=d;c[h>>2]=e;u=l;g=m;break}h=c[a+(j+24)>>2]|0;e=c[a+(j+12)>>2]|0;do if((e|0)==(l|0)){d=a+(j+20)|0;b=c[d>>2]|0;if(!b){d=a+(j+16)|0;b=c[d>>2]|0;if(!b){k=0;break}}while(1){e=b+20|0;f=c[e>>2]|0;if(f){b=f;d=e;continue}e=b+16|0;f=c[e>>2]|0;if(!f)break;else{b=f;d=e}}if(d>>>0<i>>>0)ab();else{c[d>>2]=0;k=b;break}}else{f=c[a+(j+8)>>2]|0;if(f>>>0<i>>>0)ab();b=f+12|0;if((c[b>>2]|0)!=(l|0))ab();d=e+8|0;if((c[d>>2]|0)==(l|0)){c[b>>2]=e;c[d>>2]=f;k=e;break}else ab()}while(0);if(h){b=c[a+(j+28)>>2]|0;d=5012+(b<<2)|0;if((l|0)==(c[d>>2]|0)){c[d>>2]=k;if(!k){c[1178]=c[1178]&~(1<<b);u=l;g=m;break}}else{if(h>>>0<(c[1181]|0)>>>0)ab();b=h+16|0;if((c[b>>2]|0)==(l|0))c[b>>2]=k;else c[h+20>>2]=k;if(!k){u=l;g=m;break}}d=c[1181]|0;if(k>>>0<d>>>0)ab();c[k+24>>2]=h;b=c[a+(j+16)>>2]|0;do if(b)if(b>>>0<d>>>0)ab();else{c[k+16>>2]=b;c[b+24>>2]=k;break}while(0);b=c[a+(j+20)>>2]|0;if(b)if(b>>>0<(c[1181]|0)>>>0)ab();else{c[k+20>>2]=b;c[b+24>>2]=k;u=l;g=m;break}else{u=l;g=m}}else{u=l;g=m}}else{u=b;g=o}while(0);if(u>>>0>=q>>>0)ab();b=a+(o+-4)|0;d=c[b>>2]|0;if(!(d&1))ab();if(!(d&2)){if((q|0)==(c[1183]|0)){t=(c[1180]|0)+g|0;c[1180]=t;c[1183]=u;c[u+4>>2]=t|1;if((u|0)!=(c[1182]|0))return;c[1182]=0;c[1179]=0;return}if((q|0)==(c[1182]|0)){t=(c[1179]|0)+g|0;c[1179]=t;c[1182]=u;c[u+4>>2]=t|1;c[u+t>>2]=t;return}g=(d&-8)+g|0;f=d>>>3;do if(d>>>0>=256){h=c[a+(o+16)>>2]|0;b=c[a+(o|4)>>2]|0;do if((b|0)==(q|0)){d=a+(o+12)|0;b=c[d>>2]|0;if(!b){d=a+(o+8)|0;b=c[d>>2]|0;if(!b){p=0;break}}while(1){e=b+20|0;f=c[e>>2]|0;if(f){b=f;d=e;continue}e=b+16|0;f=c[e>>2]|0;if(!f)break;else{b=f;d=e}}if(d>>>0<(c[1181]|0)>>>0)ab();else{c[d>>2]=0;p=b;break}}else{d=c[a+o>>2]|0;if(d>>>0<(c[1181]|0)>>>0)ab();e=d+12|0;if((c[e>>2]|0)!=(q|0))ab();f=b+8|0;if((c[f>>2]|0)==(q|0)){c[e>>2]=b;c[f>>2]=d;p=b;break}else ab()}while(0);if(h){b=c[a+(o+20)>>2]|0;d=5012+(b<<2)|0;if((q|0)==(c[d>>2]|0)){c[d>>2]=p;if(!p){c[1178]=c[1178]&~(1<<b);break}}else{if(h>>>0<(c[1181]|0)>>>0)ab();b=h+16|0;if((c[b>>2]|0)==(q|0))c[b>>2]=p;else c[h+20>>2]=p;if(!p)break}d=c[1181]|0;if(p>>>0<d>>>0)ab();c[p+24>>2]=h;b=c[a+(o+8)>>2]|0;do if(b)if(b>>>0<d>>>0)ab();else{c[p+16>>2]=b;c[b+24>>2]=p;break}while(0);b=c[a+(o+12)>>2]|0;if(b)if(b>>>0<(c[1181]|0)>>>0)ab();else{c[p+20>>2]=b;c[b+24>>2]=p;break}}}else{e=c[a+o>>2]|0;d=c[a+(o|4)>>2]|0;b=4748+(f<<1<<2)|0;if((e|0)!=(b|0)){if(e>>>0<(c[1181]|0)>>>0)ab();if((c[e+12>>2]|0)!=(q|0))ab()}if((d|0)==(e|0)){c[1177]=c[1177]&~(1<<f);break}if((d|0)!=(b|0)){if(d>>>0<(c[1181]|0)>>>0)ab();b=d+8|0;if((c[b>>2]|0)==(q|0))n=b;else ab()}else n=d+8|0;c[e+12>>2]=d;c[n>>2]=e}while(0);c[u+4>>2]=g|1;c[u+g>>2]=g;if((u|0)==(c[1182]|0)){c[1179]=g;return}}else{c[b>>2]=d&-2;c[u+4>>2]=g|1;c[u+g>>2]=g}b=g>>>3;if(g>>>0<256){d=b<<1;f=4748+(d<<2)|0;e=c[1177]|0;b=1<<b;if(e&b){b=4748+(d+2<<2)|0;d=c[b>>2]|0;if(d>>>0<(c[1181]|0)>>>0)ab();else{r=b;s=d}}else{c[1177]=e|b;r=4748+(d+2<<2)|0;s=f}c[r>>2]=u;c[s+12>>2]=u;c[u+8>>2]=s;c[u+12>>2]=f;return}b=g>>>8;if(b)if(g>>>0>16777215)f=31;else{r=(b+1048320|0)>>>16&8;s=b<<r;q=(s+520192|0)>>>16&4;s=s<<q;f=(s+245760|0)>>>16&2;f=14-(q|r|f)+(s<<f>>>15)|0;f=g>>>(f+7|0)&1|f<<1}else f=0;b=5012+(f<<2)|0;c[u+28>>2]=f;c[u+20>>2]=0;c[u+16>>2]=0;d=c[1178]|0;e=1<<f;a:do if(d&e){b=c[b>>2]|0;b:do if((c[b+4>>2]&-8|0)!=(g|0)){f=g<<((f|0)==31?0:25-(f>>>1)|0);while(1){d=b+16+(f>>>31<<2)|0;e=c[d>>2]|0;if(!e)break;if((c[e+4>>2]&-8|0)==(g|0)){t=e;break b}else{f=f<<1;b=e}}if(d>>>0<(c[1181]|0)>>>0)ab();else{c[d>>2]=u;c[u+24>>2]=b;c[u+12>>2]=u;c[u+8>>2]=u;break a}}else t=b;while(0);b=t+8|0;d=c[b>>2]|0;s=c[1181]|0;if(d>>>0>=s>>>0&t>>>0>=s>>>0){c[d+12>>2]=u;c[b>>2]=u;c[u+8>>2]=d;c[u+12>>2]=t;c[u+24>>2]=0;break}else ab()}else{c[1178]=d|e;c[b>>2]=u;c[u+24>>2]=b;c[u+12>>2]=u;c[u+8>>2]=u}while(0);u=(c[1185]|0)+-1|0;c[1185]=u;if(!u)b=5164;else return;while(1){b=c[b>>2]|0;if(!b)break;else b=b+8|0}c[1185]=-1;return}function Hn(a,b){a=a|0;b=b|0;var d=0,e=0;if(!a){a=Fn(b)|0;return a|0}if(b>>>0>4294967231){c[(Ym()|0)>>2]=12;a=0;return a|0}d=In(a+-8|0,b>>>0<11?16:b+11&-8)|0;if(d){a=d+8|0;return a|0}d=Fn(b)|0;if(!d){a=0;return a|0}e=c[a+-4>>2]|0;e=(e&-8)-((e&3|0)==0?8:4)|0;Vn(d|0,a|0,(e>>>0<b>>>0?e:b)|0)|0;Gn(a);a=d;return a|0}function In(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;o=a+4|0;p=c[o>>2]|0;j=p&-8;l=a+j|0;i=c[1181]|0;d=p&3;if(!((d|0)!=1&a>>>0>=i>>>0&a>>>0<l>>>0))ab();e=a+(j|4)|0;f=c[e>>2]|0;if(!(f&1))ab();if(!d){if(b>>>0<256){a=0;return a|0}if(j>>>0>=(b+4|0)>>>0?(j-b|0)>>>0<=c[1297]<<1>>>0:0)return a|0;a=0;return a|0}if(j>>>0>=b>>>0){d=j-b|0;if(d>>>0<=15)return a|0;c[o>>2]=p&1|b|2;c[a+(b+4)>>2]=d|3;c[e>>2]=c[e>>2]|1;Jn(a+b|0,d);return a|0}if((l|0)==(c[1183]|0)){d=(c[1180]|0)+j|0;if(d>>>0<=b>>>0){a=0;return a|0}n=d-b|0;c[o>>2]=p&1|b|2;c[a+(b+4)>>2]=n|1;c[1183]=a+b;c[1180]=n;return a|0}if((l|0)==(c[1182]|0)){e=(c[1179]|0)+j|0;if(e>>>0<b>>>0){a=0;return a|0}d=e-b|0;if(d>>>0>15){c[o>>2]=p&1|b|2;c[a+(b+4)>>2]=d|1;c[a+e>>2]=d;e=a+(e+4)|0;c[e>>2]=c[e>>2]&-2;e=a+b|0}else{c[o>>2]=p&1|e|2;e=a+(e+4)|0;c[e>>2]=c[e>>2]|1;e=0;d=0}c[1179]=d;c[1182]=e;return a|0}if(f&2){a=0;return a|0}m=(f&-8)+j|0;if(m>>>0<b>>>0){a=0;return a|0}n=m-b|0;g=f>>>3;do if(f>>>0>=256){h=c[a+(j+24)>>2]|0;g=c[a+(j+12)>>2]|0;do if((g|0)==(l|0)){e=a+(j+20)|0;d=c[e>>2]|0;if(!d){e=a+(j+16)|0;d=c[e>>2]|0;if(!d){k=0;break}}while(1){f=d+20|0;g=c[f>>2]|0;if(g){d=g;e=f;continue}f=d+16|0;g=c[f>>2]|0;if(!g)break;else{d=g;e=f}}if(e>>>0<i>>>0)ab();else{c[e>>2]=0;k=d;break}}else{f=c[a+(j+8)>>2]|0;if(f>>>0<i>>>0)ab();d=f+12|0;if((c[d>>2]|0)!=(l|0))ab();e=g+8|0;if((c[e>>2]|0)==(l|0)){c[d>>2]=g;c[e>>2]=f;k=g;break}else ab()}while(0);if(h){d=c[a+(j+28)>>2]|0;e=5012+(d<<2)|0;if((l|0)==(c[e>>2]|0)){c[e>>2]=k;if(!k){c[1178]=c[1178]&~(1<<d);break}}else{if(h>>>0<(c[1181]|0)>>>0)ab();d=h+16|0;if((c[d>>2]|0)==(l|0))c[d>>2]=k;else c[h+20>>2]=k;if(!k)break}e=c[1181]|0;if(k>>>0<e>>>0)ab();c[k+24>>2]=h;d=c[a+(j+16)>>2]|0;do if(d)if(d>>>0<e>>>0)ab();else{c[k+16>>2]=d;c[d+24>>2]=k;break}while(0);d=c[a+(j+20)>>2]|0;if(d)if(d>>>0<(c[1181]|0)>>>0)ab();else{c[k+20>>2]=d;c[d+24>>2]=k;break}}}else{f=c[a+(j+8)>>2]|0;e=c[a+(j+12)>>2]|0;d=4748+(g<<1<<2)|0;if((f|0)!=(d|0)){if(f>>>0<i>>>0)ab();if((c[f+12>>2]|0)!=(l|0))ab()}if((e|0)==(f|0)){c[1177]=c[1177]&~(1<<g);break}if((e|0)!=(d|0)){if(e>>>0<i>>>0)ab();d=e+8|0;if((c[d>>2]|0)==(l|0))h=d;else ab()}else h=e+8|0;c[f+12>>2]=e;c[h>>2]=f}while(0);if(n>>>0<16){c[o>>2]=m|p&1|2;b=a+(m|4)|0;c[b>>2]=c[b>>2]|1;return a|0}else{c[o>>2]=p&1|b|2;c[a+(b+4)>>2]=n|3;p=a+(m|4)|0;c[p>>2]=c[p>>2]|1;Jn(a+b|0,n);return a|0}return 0}function Jn(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;q=a+b|0;d=c[a+4>>2]|0;do if(!(d&1)){k=c[a>>2]|0;if(!(d&3))return;n=a+(0-k)|0;m=k+b|0;j=c[1181]|0;if(n>>>0<j>>>0)ab();if((n|0)==(c[1182]|0)){e=a+(b+4)|0;d=c[e>>2]|0;if((d&3|0)!=3){t=n;h=m;break}c[1179]=m;c[e>>2]=d&-2;c[a+(4-k)>>2]=m|1;c[q>>2]=m;return}g=k>>>3;if(k>>>0<256){f=c[a+(8-k)>>2]|0;e=c[a+(12-k)>>2]|0;d=4748+(g<<1<<2)|0;if((f|0)!=(d|0)){if(f>>>0<j>>>0)ab();if((c[f+12>>2]|0)!=(n|0))ab()}if((e|0)==(f|0)){c[1177]=c[1177]&~(1<<g);t=n;h=m;break}if((e|0)!=(d|0)){if(e>>>0<j>>>0)ab();d=e+8|0;if((c[d>>2]|0)==(n|0))i=d;else ab()}else i=e+8|0;c[f+12>>2]=e;c[i>>2]=f;t=n;h=m;break}i=c[a+(24-k)>>2]|0;f=c[a+(12-k)>>2]|0;do if((f|0)==(n|0)){f=16-k|0;e=a+(f+4)|0;d=c[e>>2]|0;if(!d){e=a+f|0;d=c[e>>2]|0;if(!d){l=0;break}}while(1){f=d+20|0;g=c[f>>2]|0;if(g){d=g;e=f;continue}f=d+16|0;g=c[f>>2]|0;if(!g)break;else{d=g;e=f}}if(e>>>0<j>>>0)ab();else{c[e>>2]=0;l=d;break}}else{g=c[a+(8-k)>>2]|0;if(g>>>0<j>>>0)ab();d=g+12|0;if((c[d>>2]|0)!=(n|0))ab();e=f+8|0;if((c[e>>2]|0)==(n|0)){c[d>>2]=f;c[e>>2]=g;l=f;break}else ab()}while(0);if(i){d=c[a+(28-k)>>2]|0;e=5012+(d<<2)|0;if((n|0)==(c[e>>2]|0)){c[e>>2]=l;if(!l){c[1178]=c[1178]&~(1<<d);t=n;h=m;break}}else{if(i>>>0<(c[1181]|0)>>>0)ab();d=i+16|0;if((c[d>>2]|0)==(n|0))c[d>>2]=l;else c[i+20>>2]=l;if(!l){t=n;h=m;break}}f=c[1181]|0;if(l>>>0<f>>>0)ab();c[l+24>>2]=i;d=16-k|0;e=c[a+d>>2]|0;do if(e)if(e>>>0<f>>>0)ab();else{c[l+16>>2]=e;c[e+24>>2]=l;break}while(0);d=c[a+(d+4)>>2]|0;if(d)if(d>>>0<(c[1181]|0)>>>0)ab();else{c[l+20>>2]=d;c[d+24>>2]=l;t=n;h=m;break}else{t=n;h=m}}else{t=n;h=m}}else{t=a;h=b}while(0);j=c[1181]|0;if(q>>>0<j>>>0)ab();d=a+(b+4)|0;e=c[d>>2]|0;if(!(e&2)){if((q|0)==(c[1183]|0)){s=(c[1180]|0)+h|0;c[1180]=s;c[1183]=t;c[t+4>>2]=s|1;if((t|0)!=(c[1182]|0))return;c[1182]=0;c[1179]=0;return}if((q|0)==(c[1182]|0)){s=(c[1179]|0)+h|0;c[1179]=s;c[1182]=t;c[t+4>>2]=s|1;c[t+s>>2]=s;return}h=(e&-8)+h|0;g=e>>>3;do if(e>>>0>=256){i=c[a+(b+24)>>2]|0;f=c[a+(b+12)>>2]|0;do if((f|0)==(q|0)){e=a+(b+20)|0;d=c[e>>2]|0;if(!d){e=a+(b+16)|0;d=c[e>>2]|0;if(!d){p=0;break}}while(1){f=d+20|0;g=c[f>>2]|0;if(g){d=g;e=f;continue}f=d+16|0;g=c[f>>2]|0;if(!g)break;else{d=g;e=f}}if(e>>>0<j>>>0)ab();else{c[e>>2]=0;p=d;break}}else{g=c[a+(b+8)>>2]|0;if(g>>>0<j>>>0)ab();d=g+12|0;if((c[d>>2]|0)!=(q|0))ab();e=f+8|0;if((c[e>>2]|0)==(q|0)){c[d>>2]=f;c[e>>2]=g;p=f;break}else ab()}while(0);if(i){d=c[a+(b+28)>>2]|0;e=5012+(d<<2)|0;if((q|0)==(c[e>>2]|0)){c[e>>2]=p;if(!p){c[1178]=c[1178]&~(1<<d);break}}else{if(i>>>0<(c[1181]|0)>>>0)ab();d=i+16|0;if((c[d>>2]|0)==(q|0))c[d>>2]=p;else c[i+20>>2]=p;if(!p)break}e=c[1181]|0;if(p>>>0<e>>>0)ab();c[p+24>>2]=i;d=c[a+(b+16)>>2]|0;do if(d)if(d>>>0<e>>>0)ab();else{c[p+16>>2]=d;c[d+24>>2]=p;break}while(0);d=c[a+(b+20)>>2]|0;if(d)if(d>>>0<(c[1181]|0)>>>0)ab();else{c[p+20>>2]=d;c[d+24>>2]=p;break}}}else{f=c[a+(b+8)>>2]|0;e=c[a+(b+12)>>2]|0;d=4748+(g<<1<<2)|0;if((f|0)!=(d|0)){if(f>>>0<j>>>0)ab();if((c[f+12>>2]|0)!=(q|0))ab()}if((e|0)==(f|0)){c[1177]=c[1177]&~(1<<g);break}if((e|0)!=(d|0)){if(e>>>0<j>>>0)ab();d=e+8|0;if((c[d>>2]|0)==(q|0))o=d;else ab()}else o=e+8|0;c[f+12>>2]=e;c[o>>2]=f}while(0);c[t+4>>2]=h|1;c[t+h>>2]=h;if((t|0)==(c[1182]|0)){c[1179]=h;return}}else{c[d>>2]=e&-2;c[t+4>>2]=h|1;c[t+h>>2]=h}d=h>>>3;if(h>>>0<256){e=d<<1;g=4748+(e<<2)|0;f=c[1177]|0;d=1<<d;if(f&d){d=4748+(e+2<<2)|0;e=c[d>>2]|0;if(e>>>0<(c[1181]|0)>>>0)ab();else{r=d;s=e}}else{c[1177]=f|d;r=4748+(e+2<<2)|0;s=g}c[r>>2]=t;c[s+12>>2]=t;c[t+8>>2]=s;c[t+12>>2]=g;return}d=h>>>8;if(d)if(h>>>0>16777215)g=31;else{r=(d+1048320|0)>>>16&8;s=d<<r;q=(s+520192|0)>>>16&4;s=s<<q;g=(s+245760|0)>>>16&2;g=14-(q|r|g)+(s<<g>>>15)|0;g=h>>>(g+7|0)&1|g<<1}else g=0;d=5012+(g<<2)|0;c[t+28>>2]=g;c[t+20>>2]=0;c[t+16>>2]=0;e=c[1178]|0;f=1<<g;if(!(e&f)){c[1178]=e|f;c[d>>2]=t;c[t+24>>2]=d;c[t+12>>2]=t;c[t+8>>2]=t;return}d=c[d>>2]|0;a:do if((c[d+4>>2]&-8|0)!=(h|0)){g=h<<((g|0)==31?0:25-(g>>>1)|0);while(1){e=d+16+(g>>>31<<2)|0;f=c[e>>2]|0;if(!f)break;if((c[f+4>>2]&-8|0)==(h|0)){d=f;break a}else{g=g<<1;d=f}}if(e>>>0<(c[1181]|0)>>>0)ab();c[e>>2]=t;c[t+24>>2]=d;c[t+12>>2]=t;c[t+8>>2]=t;return}while(0);e=d+8|0;f=c[e>>2]|0;s=c[1181]|0;if(!(f>>>0>=s>>>0&d>>>0>=s>>>0))ab();c[f+12>>2]=t;c[e>>2]=t;c[t+8>>2]=f;c[t+12>>2]=d;c[t+24>>2]=0;return}function Kn(a){a=a|0;return}function Ln(a){a=a|0;var b=0,d=0;d=a+4|0;b=c[d>>2]|0;c[d>>2]=b+-1;if(!b){Db[c[(c[a>>2]|0)+8>>2]&127](a);a=1}else a=0;return a|0}function Mn(a){a=a|0;if(Ln(a)|0)Nn(a);return}function Nn(a){a=a|0;var b=0,d=0;d=a+8|0;b=c[d>>2]|0;c[d>>2]=b+-1;if(!b)Db[c[(c[a>>2]|0)+16>>2]&127](a);return}function On(a,b){a=a|0;b=b|0;return 0}function Pn(){}function Qn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (D=d,a-c>>>0|0)|0}function Rn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;h=b&3;i=d|d<<8|d<<16|d<<24;g=f&~3;if(h){h=b+4-h|0;while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(g|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function Sn(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}D=a<<c-32;return 0}function Tn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (D=b+d+(c>>>0<a>>>0|0)>>>0,c|0)|0}function Un(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=0;return b>>>c-32|0}function Vn(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return Wa(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function Wn(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=(b|0)<0?-1:0;return b>>c-32|0}function Xn(b){b=b|0;var c=0;c=a[m+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[m+(b>>>24)>>0]|0)+24|0}function Yn(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=a&65535;e=b&65535;c=$(e,f)|0;d=a>>>16;a=(c>>>16)+($(e,d)|0)|0;e=b>>>16;b=$(e,f)|0;return (D=(a>>>16)+($(e,d)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|c&65535|0)|0}function Zn(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;j=b>>31|((b|0)<0?-1:0)<<1;i=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;f=d>>31|((d|0)<0?-1:0)<<1;e=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;h=Qn(j^a,i^b,j,i)|0;g=D;a=f^j;b=e^i;return Qn((co(h,g,Qn(f^c,e^d,f,e)|0,D,0)|0)^a,D^b,a,b)|0}function _n(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+16|0;j=f|0;h=b>>31|((b|0)<0?-1:0)<<1;g=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;l=e>>31|((e|0)<0?-1:0)<<1;k=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;a=Qn(h^a,g^b,h,g)|0;b=D;co(a,b,Qn(l^d,k^e,l,k)|0,D,j)|0;e=Qn(c[j>>2]^h,c[j+4>>2]^g,h,g)|0;d=D;i=f;return (D=d,e)|0}function $n(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;f=c;c=Yn(e,f)|0;a=D;return (D=($(b,f)|0)+($(d,e)|0)+a|a&0,c|0|0)|0}function ao(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return co(a,b,c,d,0)|0}function bo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=i;i=i+16|0;f=g|0;co(a,b,d,e,f)|0;i=g;return (D=c[f+4>>2]|0,c[f>>2]|0)|0}function co(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=a;j=b;k=j;h=d;n=e;i=n;if(!k){g=(f|0)!=0;if(!i){if(g){c[f>>2]=(l>>>0)%(h>>>0);c[f+4>>2]=0}n=0;f=(l>>>0)/(h>>>0)>>>0;return (D=n,f)|0}else{if(!g){n=0;f=0;return (D=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;f=0;return (D=n,f)|0}}g=(i|0)==0;do if(h){if(!g){g=(ba(i|0)|0)-(ba(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;b=g-31>>31;h=m;a=l>>>(m>>>0)&b|k<<i;b=k>>>(m>>>0)&b;g=0;i=l<<i;break}if(!f){n=0;f=0;return (D=n,f)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;n=0;f=0;return (D=n,f)|0}g=h-1|0;if(g&h){i=(ba(h|0)|0)+33-(ba(k|0)|0)|0;p=64-i|0;m=32-i|0;j=m>>31;o=i-32|0;b=o>>31;h=i;a=m-1>>31&k>>>(o>>>0)|(k<<m|l>>>(i>>>0))&b;b=b&k>>>(i>>>0);g=l<<p&j;i=(k<<p|l>>>(o>>>0))&j|l<<m&i-33>>31;break}if(f){c[f>>2]=g&l;c[f+4>>2]=0}if((h|0)==1){o=j|b&0;p=a|0|0;return (D=o,p)|0}else{p=Xn(h|0)|0;o=k>>>(p>>>0)|0;p=k<<32-p|l>>>(p>>>0)|0;return (D=o,p)|0}}else{if(g){if(f){c[f>>2]=(k>>>0)%(h>>>0);c[f+4>>2]=0}o=0;p=(k>>>0)/(h>>>0)>>>0;return (D=o,p)|0}if(!l){if(f){c[f>>2]=0;c[f+4>>2]=(k>>>0)%(i>>>0)}o=0;p=(k>>>0)/(i>>>0)>>>0;return (D=o,p)|0}g=i-1|0;if(!(g&i)){if(f){c[f>>2]=a|0;c[f+4>>2]=g&k|b&0}o=0;p=k>>>((Xn(i|0)|0)>>>0);return (D=o,p)|0}g=(ba(i|0)|0)-(ba(k|0)|0)|0;if(g>>>0<=30){b=g+1|0;i=31-g|0;h=b;a=k<<i|l>>>(b>>>0);b=k>>>(b>>>0);g=0;i=l<<i;break}if(!f){o=0;p=0;return (D=o,p)|0}c[f>>2]=a|0;c[f+4>>2]=j|b&0;o=0;p=0;return (D=o,p)|0}while(0);if(!h){k=i;j=0;i=0}else{m=d|0|0;l=n|e&0;k=Tn(m|0,l|0,-1,-1)|0;d=D;j=i;i=0;do{e=j;j=g>>>31|j<<1;g=i|g<<1;e=a<<1|e>>>31|0;n=a>>>31|b<<1|0;Qn(k,d,e,n)|0;p=D;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;a=Qn(e,n,o&m,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l)|0;b=D;h=h-1|0}while((h|0)!=0);k=j;j=0}h=0;if(f){c[f>>2]=a;c[f+4>>2]=b}o=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;p=(g<<1|0>>>31)&-2|i;return (D=o,p)|0}function eo(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Ab[a&3](b|0,c|0,d|0,e|0,f|0)}function fo(a,b,c){a=a|0;b=b|0;c=+c;Bb[a&31](b|0,+c)}function go(a,b,c,d){a=a|0;b=b|0;c=ca(c);d=ca(d);return ca(Cb[a&0](b|0,ca(c),ca(d)))}function ho(a,b){a=a|0;b=b|0;Db[a&127](b|0)}function io(a,b,c){a=a|0;b=b|0;c=c|0;Eb[a&31](b|0,c|0)}function jo(a,b){a=a|0;b=b|0;return Fb[a&31](b|0)|0}function ko(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=e|0;Gb[a&1](b|0,+c,+d,e|0)}function lo(a,b,c,d){a=a|0;b=b|0;c=+c;d=+d;Hb[a&1](b|0,+c,+d)}function mo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Ib[a&15](b|0,c|0,d|0)|0}function no(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return +Jb[a&1](b|0,c|0,d|0)}function oo(a,b){a=a|0;b=b|0;return +Kb[a&15](b|0)}function po(a,b,c){a=a|0;b=b|0;c=+c;return Lb[a&1](b|0,+c)|0}function qo(a,b,c){a=a|0;b=b|0;c=c|0;return Mb[a&15](b|0,c|0)|0}function ro(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=+d;e=+e;f=f|0;Nb[a&1](b|0,c|0,+d,+e,f|0)}function so(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Ob[a&3](b|0,c|0,d|0,e|0,f|0,g|0)}function to(a,b,c){a=a|0;b=b|0;c=c|0;return +Pb[a&7](b|0,c|0)}function uo(a){a=a|0;return Qb[a&7]()|0}function vo(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=+e;Rb[a&1](b|0,c|0,d|0,+e)}function wo(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=ca(d);e=e|0;f=ca(f);g=g|0;Sb[a&1](b|0,c|0,ca(d),e|0,ca(f),g|0)}function xo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Tb[a&15](b|0,c|0,d|0)}function yo(a){a=a|0;Ub[a&0]()}function zo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;Vb[a&15](b|0,c|0,+d)}function Ao(a,b,c){a=a|0;b=+b;c=+c;return Wb[a&1](+b,+c)|0}function Bo(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Xb[a&15](b|0,c|0,d|0,e|0)}function Co(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;da(0)}function Do(a,b){a=a|0;b=+b;da(1)}function Eo(a,b,c){a=a|0;b=ca(b);c=ca(c);da(2);return ca(0)}function Fo(a){a=a|0;da(3)}function Go(a,b){a=a|0;b=b|0;da(4)}function Ho(a){a=a|0;da(5);return 0}function Io(a,b,c,d){a=a|0;b=+b;c=+c;d=d|0;da(6)}function Jo(a,b,c){a=a|0;b=+b;c=+c;da(7)}function Ko(a,b,c){a=a|0;b=b|0;c=c|0;da(8);return 0}function Lo(a,b,c){a=a|0;b=b|0;c=c|0;da(9);return 0.0}function Mo(a){a=a|0;da(10);return 0.0}function No(a,b){a=a|0;b=+b;da(11);return 0}function Oo(a,b){a=a|0;b=b|0;da(12);return 0}function Po(a,b,c,d,e){a=a|0;b=b|0;c=+c;d=+d;e=e|0;da(13)}function Qo(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;da(14)}function Ro(a,b){a=a|0;b=b|0;da(15);return 0.0}function So(){da(16);return 0}function To(a,b,c,d){a=a|0;b=b|0;c=c|0;d=+d;da(17)}function Uo(a,b,c,d,e,f){a=a|0;b=b|0;c=ca(c);d=d|0;e=ca(e);f=f|0;da(18)}function Vo(a,b,c){a=a|0;b=b|0;c=c|0;da(19)}function Wo(){da(20)}function Xo(a,b,c){a=a|0;b=b|0;c=+c;da(21)}function Yo(a,b){a=+a;b=+b;da(22);return 0}function Zo(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;da(23)}

// EMSCRIPTEN_END_FUNCS
var Ab=[Co,Vm,Um,yk];var Bb=[Do,He,Ie,Je,Ke,Le,Me,Ne,Pe,Qe,Se,Te,Ue,Ve,We,Xe,Ye,Ze,_e,Do,Do,Do,Do,Do,Do,Do,Do,Do,Do,Do,Do,Do];var Cb=[Eo];var Db=[Fo,Gn,Kn,Qg,Rg,Sg,ji,ki,li,Qj,Rj,Sj,Rk,Sk,Tk,um,vm,wm,Dm,Em,Jm,Mm,Km,Lm,Nm,gk,ck,_j,pe,re,Oe,Re,Gf,If,Kg,Ug,Zg,dh,jh,qh,wh,Ch,Ih,Oh,Uh,_h,ei,ri,yi,Ei,Ki,Qi,Wi,aj,gj,mj,yj,zj,vj,Fj,Gj,Uj,Vj,Oj,rk,tk,Cl,rm,sm,Ql,Wl,am,hm,om,An,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo,Fo];var Eb=[Go,Yf,se,te,we,xe,ye,ze,Ae,Be,Ee,Fe,Ge,of,rf,sf,tf,uf,vf,wf,Bf,Ff,Rf,$i,fj,jk,kl,Bl,Go,Go,Go,Go];var Fb=[Ho,Fn,Fm,kn,Zf,Zj,cf,ef,ff,gf,hf,jf,kf,mf,nf,Cf,Df,Jf,lj,jl,Al,Ho,Ho,Ho,Ho,Ho,Ho,Ho,Ho,Ho,Ho,Ho];var Gb=[Io,Kf];var Hb=[Jo,Nj];var Ib=[Ko,ne,Om,mn,ln,nn,ph,qi,$l,Ko,Ko,Ko,Ko,Ko,Ko,Ko];var Jb=[Lo,Th];var Kb=[Mo,pf,qf,xf,Lf,Mf,Nf,Of,Pf,Qf,Mo,Mo,Mo,Mo,Mo,Mo];var Lb=[No,tj];var Mb=[Oo,Hn,On,bk,Ef,Jg,ch,vh,Bh,di,xi,zk,Vl,Oo,Oo,Oo];var Nb=[Po,Yg];var Ob=[Qo,Xm,Wm,gm];var Pb=[Ro,yf,Sf,Tf,Uf,Zh,Ro,Ro];var Qb=[So,_f,oe,xj,Ej,Tj,qm,So];var Rb=[To,Ji];var Sb=[Uo,Vf];var Tb=[Vo,fk,df,lf,zf,Af,ih,Hh,Pi,Vi,Pl,nm,Vo,Vo,Vo,Vo];var Ub=[Wo];var Vb=[Xo,ue,ve,Ce,De,$e,af,bf,Di,uj,Xo,Xo,Xo,Xo,Xo,Xo];var Wb=[Yo,Mj];var Xb=[Zo,Qm,Rm,pj,Nh,Bj,Ij,Yj,wk,El,ym,Zo,Zo,Zo,Zo,Zo];return{_nbind_init:rl,_i64Subtract:Qn,_free:Gn,_i64Add:Tn,_memset:Rn,_malloc:Fn,_memcpy:Vn,_bitshift64Lshr:Un,_bitshift64Shl:Sn,__GLOBAL__sub_I_nbind_cc:$f,__GLOBAL__sub_I_common_cc:qk,__GLOBAL__sub_I_Binding_cc:sl,runPostSets:Pn,stackAlloc:Yb,stackSave:Zb,stackRestore:_b,establishStackSpace:$b,setThrew:ac,setTempRet0:dc,getTempRet0:ec,dynCall_viiiii:eo,dynCall_vid:fo,dynCall_fiff:go,dynCall_vi:ho,dynCall_vii:io,dynCall_ii:jo,dynCall_viddi:ko,dynCall_vidd:lo,dynCall_iiii:mo,dynCall_diii:no,dynCall_di:oo,dynCall_iid:po,dynCall_iii:qo,dynCall_viiddi:ro,dynCall_viiiiii:so,dynCall_dii:to,dynCall_i:uo,dynCall_viiid:vo,dynCall_viififi:wo,dynCall_viii:xo,dynCall_v:yo,dynCall_viid:zo,dynCall_idd:Ao,dynCall_viiii:Bo}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _nbind_init=Module["_nbind_init"]=asm["_nbind_init"];var __GLOBAL__sub_I_nbind_cc=Module["__GLOBAL__sub_I_nbind_cc"]=asm["__GLOBAL__sub_I_nbind_cc"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _memset=Module["_memset"]=asm["_memset"];var _malloc=Module["_malloc"]=asm["_malloc"];var __GLOBAL__sub_I_common_cc=Module["__GLOBAL__sub_I_common_cc"]=asm["__GLOBAL__sub_I_common_cc"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var __GLOBAL__sub_I_Binding_cc=Module["__GLOBAL__sub_I_Binding_cc"]=asm["__GLOBAL__sub_I_Binding_cc"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var dynCall_viiiii=Module["dynCall_viiiii"]=asm["dynCall_viiiii"];var dynCall_vid=Module["dynCall_vid"]=asm["dynCall_vid"];var dynCall_fiff=Module["dynCall_fiff"]=asm["dynCall_fiff"];var dynCall_vi=Module["dynCall_vi"]=asm["dynCall_vi"];var dynCall_vii=Module["dynCall_vii"]=asm["dynCall_vii"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_viddi=Module["dynCall_viddi"]=asm["dynCall_viddi"];var dynCall_vidd=Module["dynCall_vidd"]=asm["dynCall_vidd"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];var dynCall_diii=Module["dynCall_diii"]=asm["dynCall_diii"];var dynCall_di=Module["dynCall_di"]=asm["dynCall_di"];var dynCall_iid=Module["dynCall_iid"]=asm["dynCall_iid"];var dynCall_iii=Module["dynCall_iii"]=asm["dynCall_iii"];var dynCall_viiddi=Module["dynCall_viiddi"]=asm["dynCall_viiddi"];var dynCall_viiiiii=Module["dynCall_viiiiii"]=asm["dynCall_viiiiii"];var dynCall_dii=Module["dynCall_dii"]=asm["dynCall_dii"];var dynCall_i=Module["dynCall_i"]=asm["dynCall_i"];var dynCall_viiid=Module["dynCall_viiid"]=asm["dynCall_viiid"];var dynCall_viififi=Module["dynCall_viififi"]=asm["dynCall_viififi"];var dynCall_viii=Module["dynCall_viii"]=asm["dynCall_viii"];var dynCall_v=Module["dynCall_v"]=asm["dynCall_v"];var dynCall_viid=Module["dynCall_viid"]=asm["dynCall_viid"];var dynCall_idd=Module["dynCall_idd"]=asm["dynCall_idd"];var dynCall_viiii=Module["dynCall_viiii"]=asm["dynCall_viiii"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.establishStackSpace=asm["establishStackSpace"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){assert(runDependencies==0,"cannot call main when async dependencies remain! (listen on __ATMAIN__)");assert(__ATPRERUN__.length==0,"cannot call main when preRun functions remain to be called");args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["stdout"]["once"]("drain",(function(){process["exit"](status)}));console.log(" ");setTimeout((function(){process["exit"](status)}),500)}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status)}throw new ExitStatus(status)}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()}))





/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), "/", __webpack_require__(4).Buffer))

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
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
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