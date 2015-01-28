/* thanks to the angular team for all this code */
function isString(value){return typeof value === 'string';}
function isUndefined(value){return typeof value === 'undefined';}
function isDefined(value){return typeof value !== 'undefined';}
function isObject(value){return value !== null && typeof value === 'object';}
function isNumber(value){return typeof value === 'number';}
function isDate(value) {return toString.call(value) === '[object Date]';}
var isArray = Array.isArray;
function isFunction(value){return typeof value === 'function';}
function isRegExp(value) {return toString.call(value) === '[object RegExp]';}
function isWindow(obj) {return obj && obj.window === obj;}
function isFile(obj) {return toString.call(obj) === '[object File]';}
function isBlob(obj) {return toString.call(obj) === '[object Blob]';}
function isBoolean(value) {return typeof value === 'boolean';}
var trim = function(value) {return isString(value) ? value.trim() : value;};
function isElement(node) {
    return !!(node &&
        (node.nodeName  // we are a direct element
            || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
}
var lowercase = function(string){return isString(string) ? string.toLowerCase() : string;};
var uppercase = function(string){return isString(string) ? string.toUpperCase() : string;};
function concat(array1, array2, index) {return array1.concat(slice.call(array2, index));}
function sliceArgs(args, startIndex) {return slice.call(args, startIndex || 0);}
function int(str) { return parseInt(str, 10); }

function inherit(parent, extra) {
    return extend(new (extend(function() {}, {prototype:parent}))(), extra);
}
function forEach(obj, iterator, context) {
    var key, length;
    if (obj) {
        if (isFunction(obj)) {
            for (key in obj) {
                // Need to check if hasOwnProperty exists,
                // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (isArray(obj)) {
            var isPrimitive = typeof obj !== 'object';
            for (key = 0, length = obj.length; key < length; key++) {
                if (isPrimitive || key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (obj.forEach && obj.forEach !== forEach) {
            obj.forEach(iterator, context, obj);
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        }
    }
    return obj;
}

function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys.sort();
}

function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for ( var i = 0; i < keys.length; i++) {
        iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
}

function reverseParams(iteratorFn) {
    return function(value, key) { iteratorFn(key, value); };
}
function extend(dst) {
    var h = dst.$$hashKey;

    for (var i = 1, ii = arguments.length; i < ii; i++) {
        var obj = arguments[i];
        if (obj) {
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                dst[key] = obj[key];
            }
        }
    }

    setHashKey(dst, h);
    return dst;
}
function size(obj, ownPropsOnly) {
    var count = 0, key;

    if (isArray(obj) || isString(obj)) {
        return obj.length;
    } else if (isObject(obj)) {
        for (key in obj)
            if (!ownPropsOnly || obj.hasOwnProperty(key))
                count++;
    }
    return count;
}
function includes(array, obj) {return Array.prototype.indexOf.call(array, obj) != -1;}
function arrayRemove(array, value) {
    var index = array.indexOf(value);
    if (index >=0)
        array.splice(index, 1);
    return value;
}
function copy(source, destination, stackSource, stackDest) {
    if (isWindow(source)) {
        throw "Can't copy! Making copies of Window instances is not supported.";
    }

    if (!destination) {
        destination = source;
        if (source) {
            if (isArray(source)) {
                destination = copy(source, [], stackSource, stackDest);
            } else if (isDate(source)) {
                destination = new Date(source.getTime());
            } else if (isRegExp(source)) {
                destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
                destination.lastIndex = source.lastIndex;
            } else if (isObject(source)) {
                var emptyObject = Object.create(Object.getPrototypeOf(source));
                destination = copy(source, emptyObject, stackSource, stackDest);
            }
        }
    } else {
        if (source === destination) throw ngMinErr('cpi',
            "Can't copy! Source and destination are identical.");

        stackSource = stackSource || [];
        stackDest = stackDest || [];

        if (isObject(source)) {
            var index = stackSource.indexOf(source);
            if (index !== -1) return stackDest[index];

            stackSource.push(source);
            stackDest.push(destination);
        }

        var result;
        if (isArray(source)) {
            destination.length = 0;
            for ( var i = 0; i < source.length; i++) {
                result = copy(source[i], null, stackSource, stackDest);
                if (isObject(source[i])) {
                    stackSource.push(source[i]);
                    stackDest.push(result);
                }
                destination.push(result);
            }
        } else {
            if (isArray(destination)) {
                destination.length = 0;
            } else {
                forEach(destination, function(value, key) {
                    delete destination[key];
                });
            }
            for ( var key in source) {
                if(source.hasOwnProperty(key)) {
                    result = copy(source[key], null, stackSource, stackDest);
                    if (isObject(source[key])) {
                        stackSource.push(source[key]);
                        stackDest.push(result);
                    }
                    destination[key] = result;
                }
            }
        }
    }
    return destination;
}
function shallowCopy(src, dst) {
    if (isArray(src)) {
        dst = dst || [];

        for (var i = 0, ii = src.length; i < ii; i++) {
            dst[i] = src[i];
        }
    } else if (isObject(src)) {
        dst = dst || {};

        for (var key in src) {
            if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                dst[key] = src[key];
            }
        }
    }
    return dst || src;
}
function equals(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
        if (t1 == 'object') {
            if (isArray(o1)) {
                if (!isArray(o2)) return false;
                if ((length = o1.length) == o2.length) {
                    for(key=0; key<length; key++) {
                        if (!equals(o1[key], o2[key])) return false;
                    }
                    return true;
                }
            } else if (isDate(o1)) {
                if (!isDate(o2)) return false;
                return equals(o1.getTime(), o2.getTime());
            } else if (isRegExp(o1) && isRegExp(o2)) {
                return o1.toString() == o2.toString();
            } else {
                if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) || isArray(o2)) return false;
                keySet = {};
                for(key in o1) {
                    if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
                    if (!equals(o1[key], o2[key])) return false;
                    keySet[key] = true;
                }
                for(key in o2) {
                    if (!keySet.hasOwnProperty(key) &&
                        key.charAt(0) !== '$' &&
                        o2[key] !== undefined &&
                        !isFunction(o2[key])) return false;
                }
                return true;
            }
        }
    }
    return false;
}

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
Array.prototype.move = function(pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
};

function orderDependencies(plugins){
    for (var i=0;i<plugins.length;i++){
        var oldIndex = i;
        for (var c=0;c<plugins[i].dependencies.length;c++){
            for (var e=0;e<plugins.length;e++){
                if (plugins[e].file==plugins[i].dependencies[c]) {
                    if (i < e) plugins.move(e,i);
                    if (i<plugins.length-1) i++;
                    if (c==0) oldIndex--;
                    break;
                }
            }
            delete plugins[i].dependencies[c];
        }
        plugins[i].dependencies = [];
        i = oldIndex;
    }
    var tmp = [];
    for (var i=0;i<plugins.length;i++){
        tmp.push(plugins[i].file);
    }
    return tmp;
}

function removeElement(arr,dynamic){
    return findElement(arr,dynamic,function(obj,idx){
        arr.splice(idx,1);
    });
}
function findElement (arr,dynamic,executeFound){
    // Dynamic can be either a Object, an id (numeric) or a string
    var id;
    var name;
    var tmpObj;
    if (isNumber(dynamic))
        id = dynamic;
    if (isString(dynamic))
        name = dynamic;
    if (dynamic.id) // IF is a gameObject
        id = dynamic.id;
    if (id){
        return findElementById(arr,id,executeFound);
    }
    if (name){
        return findElementByName(arr,name,executeFound);
    }
}
function findElementById (arr,id,executeFound){
    return this.findElementByProperty(arr,"id",id,executeFound);
}
function findElementByName (arr,name,executeFound){
    return this.findElementByProperty(arr,"name",name,executeFound);
}
function findElementByTag (arr,tag,executeFound){
    return this.findElementByProperty(arr,"tag",tag,executeFound);
}
function findElementByProperty(arr,prop,value,executeFound){
    var tmpObj = {};
    for (var i=0;i<arr.length;i++){
        if (value == arr[i][prop]) {
            // test if the object needs to be copied.
            tmpObj = arr[i];
            // The logic for the execute of the function is (object,index)
            if (executeFound) {
                executeFound(arr[i],i);
            }
            break;
        }
    }
    return tmpObj;
}
function getClosestMultiple(x,y){
    return (y-y%x)/x;
}
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}
