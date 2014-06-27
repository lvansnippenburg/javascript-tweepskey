/* * * * * * * * * * * * * * * * * * * */
/* © 2009, L van Snippenburg           */
/* * * * * * * * * * * * * * * * * * * */
if(typeof(tester)=='undefined'){
	var tester=[
		["Safari","3.9","You are using an older version of Safari. Please visit <a href=\"http://www.apple.com/safari\" >Apple's website</a> to get the latest version."],
		["Firefox","3.49","You are using an older version of Firefox. Please visit <a href=\"http://www.getfirefox.com\" >the Firefox website</a> to get the latest release."],
		["Explorer","8","You are using an older version of Microsoft's Internet Explorer. Please visit <a href=\"http://www.microsoft.com\" target=\"_new\">the Microsoft website</a> to get the latest release."],
		["Opera","9.63","You are using an older version of Opera. Please visit <a href=\"http://www.opera.com\" >the Opera website</a> to get the latest release."],
		["Chrome","5","You are using an older version of Chrome. Please visit <a href=\"http://www.google.com/chrome\" >the Google website</a> to get the latest release."]
	];
}

function checkBrowser(){
	BrowserDetect.init();
	var found = false;
	for(i=0;i<tester.length;i++){
		if(tester[i][0] == BrowserDetect.browser){
			found = true;
			if(tester[i][1] > BrowserDetect.version){
				var msg=BrowserDetect.browser+" version: "+BrowserDetect.version+"<br />"+tester[i][2]+"<br /><span style=\"center\"><img src=\"images/tweepskey_logo.png\" alt=\"tweepskey logo\" width=\"50%\" /></span>";
				DisplayBrowserVersion(msg);
			}
		}
	}
	if (!found) {
		var msg=BrowserDetect.browser+" version: "+BrowserDetect.version+"<br />";
		msg += "We have not tested this software with your browser version. Please use Safari 4.x or Firefox 3.5 to access this site.<br /><span style=\"center\"><img src=\"images/tweepskey_logo.png\" alt=\"tweepskey logo\" width=\"50%\" /></span>";
		DisplayBrowserVersion(msg);
	}
	return true;
}

function DisplayBrowserVersion(msg){
	document.body.innerHTML = "";
	el=document.getElementById('__swotTester');
	if(el){
		document.body.removeChild(el);
		return;
	}
	if (window.innerHeight) {
		var topPos = ((window.innerHeight-100)/3)+"px";
		var leftPos = (window.innerWidth/2 - 100)+"px";
	} else {
		var topPos = ((screen.availHeight-100)/3)+"px";
		var leftPos = (screen.availWidth/2 - 100)+"px";
	}
	var c=document.createElement('div');
	c.id='__swotTester';
	c.style.opacity='0.8';c.style.filter='alpha(opacity=80)';
	c.style.position='fixed';
	c.style.zIndex='9000';
	c.style.top= topPos;
	c.style.left=leftPos;
	c.style.width='200px'
	c.style.background='#000';
	c.style.styleFloat='right';
	c.style.padding='7px 10px';
	c.style.color='red';
	c.style.border='solid 2px red';
	c.style.textDecoration='none';
	c.style.textAlign='center';
	c.style.font='12px Lucida Grande,Helvetica,Tahoma';
	c.style.MozBorderRadius='5px';
	c.style.WebkitBorderRadius='5px';
	c.style.WebkitBoxShadow='0px 0px 20px #000';
	c.style.MozBoxShadow='0px 0px 20px #000';
	document.body.appendChild(c);
	c.onclick=function() {
		document.body.removeChild(c)
	};
	c.innerHTML=unescape(msg);
}

function removeTester(){
	el=document.getElementById('__swotTester');
	if(el){
		document.body.removeChild(el);return;
	}
}

if(window.addEventListener) {
	window.addEventListener("load",checkBrowser,false);
} else if(window.attachEvent) {
	window.attachEvent("onload",checkBrowser);
}

var BrowserDetect = {
	init:function(){
		this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
		this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
		this.OS=this.searchString(this.dataOS)||"an unknown OS";
	},
	searchString:function(data){
		for(var i=0;i<data.length;i++){
			var dataString=data[i].string;
			var dataProp=data[i].prop;
			this.versionSearchString=data[i].versionSearch||data[i].identity;
			if(dataString){
				if(dataString.indexOf(data[i].subString)!=-1)
					return data[i].identity;}
				else if(dataProp)
					return data[i].identity;
		}
	},
	searchVersion:function(dataString){
		var index=dataString.indexOf(this.versionSearchString);
		if(index==-1)return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser:[
		{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},
		{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},
		{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},
		{prop:window.opera,identity:"Opera"},
		{string:navigator.vendor,subString:"iCab",identity:"iCab"},
		{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},
		{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},
		{string:navigator.vendor,subString:"Camino",identity:"Camino"},
		{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},
		{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},
		{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},
		{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}
	],
	dataOS:[
		{string:navigator.platform,subString:"Win",identity:"Windows"},
		{string:navigator.platform,subString:"Mac",identity:"Mac"},
		{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},
		{string:navigator.platform,subString:"Linux",identity:"Linux"}
	]
};
/*  Prototype JavaScript framework, version 1.6.1
 *  (c) 2005-2009 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.6.1',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile.*Safari/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,
    SelectorsAPI: !!document.querySelector,
    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div');
      var form = document.createElement('form');
      var isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },
  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;


var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {
  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString;

  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(object) {
    var type = typeof object;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown': return;
      case 'boolean': return object.toString();
    }

    if (object === null) return 'null';
    if (object.toJSON) return object.toJSON();
    if (isElement(object)) return;

    var results = [];
    for (var property in object) {
      var value = toJSON(object[property]);
      if (!isUndefined(value))
        results.push(property.toJSON() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    var results = [];
    for (var property in object)
      results.push(property);
    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) == "[object Array]";
  }


  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return typeof object === "function";
  }

  function isString(object) {
    return _toString.call(object) == "[object String]";
  }

  function isNumber(object) {
    return _toString.call(object) == "[object Number]";
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          keys,
    values:        values,
    clone:         clone,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }

  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = slice.call(arguments, 1);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(context, a);
    }
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  return {
    argumentNames:       argumentNames,
    bind:                bind,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  }
})());


Date.prototype.toJSON = function() {
  return '"' + this.getUTCFullYear() + '-' +
    (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
    this.getUTCDate().toPaddedString(2) + 'T' +
    this.getUTCHours().toPaddedString(2) + ':' +
    this.getUTCMinutes().toPaddedString(2) + ':' +
    this.getUTCSeconds().toPaddedString(2) + 'Z"';
};


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || pattern.source)) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift());
        var value = pair.length > 1 ? pair.join('=') : pair[0];
        if (value != undefined) value = decodeURIComponent(value);

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function toJSON() {
    return this.inspect(true);
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = this.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
    return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON();
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern) {
    return this.indexOf(pattern) === 0;
  }

  function endsWith(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim ? String.prototype.trim : strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    toJSON:         toJSON,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       evalJSON,
    include:        include,
    startsWith:     startsWith,
    endsWith:       endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3];
      var pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    var index = 0;
    try {
      this._each(function(value) {
        iterator.call(context, value, index++);
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) throw $break;
    });
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index))
        throw $break;
    });
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf))
      if (this.indexOf(object) != -1) return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value >= result)
        result = value;
    });
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value < result)
        result = value;
    });
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();
function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.detect(function(value) { return item === value });
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function toJSON() {
    var results = [];
    this.each(function(object) {
      var value = Object.toJSON(object);
      if (!Object.isUndefined(value)) results.push(value);
    });
    return '[' + results.join(', ') + ']';
  }

  function indexOf(item, i) {
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++)
      if (this[i] === item) return i;
    return -1;
  }

  function lastIndexOf(item, i) {
    i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
    var n = this.slice(0, i).reverse().indexOf(item);
    return (n < 0) ? n : i - n - 1;
  }

  function concat() {
    var array = slice.call(this, 0), item;
    for (var i = 0, length = arguments.length; i < length; i++) {
      item = arguments[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++)
          array.push(item[j]);
      } else {
        array.push(item);
      }
    }
    return array;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,
    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect,
    toJSON:    toJSON
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2)

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }

  function _each(iterator) {
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }

  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;
    return key + '=' + encodeURIComponent(String.interpret(value));
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values))
          return results.concat(values.map(toQueryPair.curry(key)));
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function toJSON() {
    return Object.toJSON(this.toObject());
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toJSON,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function toJSON() {
    return isFinite(this) ? this.toString() : 'null';
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    toJSON:         toJSON,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isString(this.options.parameters))
      this.options.parameters = this.options.parameters.toQueryParams();
    else if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.clone(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params['_method'] = this.method;
      this.method = 'post';
    }

    this.parameters = params;

    if (params = Object.toQueryString(params)) {
      if (this.method == 'get')
        this.url += (this.url.include('?') ? '&' : '?') + params;
      else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))
        params += '&_=';
    }

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300);
  },

  getStatus: function() {
    try {
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if(readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});



function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

/*--------------------------------------------------------------------------*/

if (!window.Node) var Node = { };

if (!Node.ELEMENT_NODE) {
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  });
}


(function(global) {

  var SETATTRIBUTE_IGNORES_NAME = (function(){
    var elForm = document.createElement("form");
    var elInput = document.createElement("input");
    var root = document.documentElement;
    elInput.setAttribute("name", "test");
    elForm.appendChild(elInput);
    root.appendChild(elForm);
    var isBuggy = elForm.elements
      ? (typeof elForm.elements.test == "undefined")
      : null;
    root.removeChild(elForm);
    elForm = elInput = null;
    return isBuggy;
  })();

  var element = global.Element;
  global.Element = function(tagName, attributes) {
    attributes = attributes || { };
    tagName = tagName.toLowerCase();
    var cache = Element.cache;
    if (SETATTRIBUTE_IGNORES_NAME && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }
    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));
    return Element.writeAttribute(cache[tagName].cloneNode(false), attributes);
  };
  Object.extend(global.Element, element || { });
  if (element) global.Element.prototype = element.prototype;
})(this);

Element.cache = { };
Element.idCounter = 1;

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },


  hide: function(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  },

  show: function(element) {
    element = $(element);
    element.style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: (function(){

    var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
      var el = document.createElement("select"),
          isBuggy = true;
      el.innerHTML = "<option value=\"test\">test</option>";
      if (el.options && el.options[0]) {
        isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
      }
      el = null;
      return isBuggy;
    })();

    var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
      try {
        var el = document.createElement("table");
        if (el && el.tBodies) {
          el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
          var isBuggy = typeof el.tBodies[0] == "undefined";
          el = null;
          return isBuggy;
        }
      } catch (e) {
        return true;
      }
    })();

    var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
      var s = document.createElement("script"),
          isBuggy = false;
      try {
        s.appendChild(document.createTextNode(""));
        isBuggy = !s.firstChild ||
          s.firstChild && s.firstChild.nodeType !== 3;
      } catch (e) {
        isBuggy = true;
      }
      s = null;
      return isBuggy;
    })();

    function update(element, content) {
      element = $(element);

      if (content && content.toElement)
        content = content.toElement();

      if (Object.isElement(content))
        return element.update().insert(content);

      content = Object.toHTML(content);

      var tagName = element.tagName.toUpperCase();

      if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
        element.text = content;
        return element;
      }

      if (SELECT_ELEMENT_INNERHTML_BUGGY || TABLE_ELEMENT_INNERHTML_BUGGY) {
        if (tagName in Element._insertionTranslations.tags) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          Element._getContentFromAnonymousElement(tagName, content.stripScripts())
            .each(function(node) {
              element.appendChild(node)
            });
        }
        else {
          element.innerHTML = content.stripScripts();
        }
      }
      else {
        element.innerHTML = content.stripScripts();
      }

      content.evalScripts.bind(content).defer();
      return element;
    }

    return update;
  })(),

  replace: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  },

  insert: function(element, insertions) {
    element = $(element);

    if (Object.isString(insertions) || Object.isNumber(insertions) ||
        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
          insertions = {bottom:insertions};

    var content, insert, tagName, childNodes;

    for (var position in insertions) {
      content  = insertions[position];
      position = position.toLowerCase();
      insert = Element._insertionTranslations[position];

      if (content && content.toElement) content = content.toElement();
      if (Object.isElement(content)) {
        insert(element, content);
        continue;
      }

      content = Object.toHTML(content);

      tagName = ((position == 'before' || position == 'after')
        ? element.parentNode : element).tagName.toUpperCase();

      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

      if (position == 'top' || position == 'after') childNodes.reverse();
      childNodes.each(insert.curry(element));

      content.evalScripts.bind(content).defer();
    }

    return element;
  },

  wrap: function(element, wrapper, attributes) {
    element = $(element);
    if (Object.isElement(wrapper))
      $(wrapper).writeAttribute(attributes || { });
    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
    else wrapper = new Element('div', wrapper);
    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return Element.recursivelyCollect(element, 'parentNode');
  },

  descendants: function(element) {
    return Element.select(element, "*");
  },

  firstDescendant: function(element) {
    element = $(element).firstChild;
    while (element && element.nodeType != 1) element = element.nextSibling;
    return $(element);
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return Element.recursivelyCollect(element, 'previousSibling');
  },

  nextSiblings: function(element) {
    return Element.recursivelyCollect(element, 'nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return Element.previousSiblings(element).reverse()
      .concat(Element.nextSiblings(element));
  },

  match: function(element, selector) {
    if (Object.isString(selector))
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(element.parentNode);
    var ancestors = Element.ancestors(element);
    return Object.isNumber(expression) ? ancestors[expression] :
      Selector.findElement(ancestors, expression, index);
  },

  down: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return Element.firstDescendant(element);
    return Object.isNumber(expression) ? Element.descendants(element)[expression] :
      Element.select(element, expression)[index || 0];
  },

  previous: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.previousElementSibling(element));
    var previousSiblings = Element.previousSiblings(element);
    return Object.isNumber(expression) ? previousSiblings[expression] :
      Selector.findElement(previousSiblings, expression, index);
  },

  next: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(Selector.handlers.nextElementSibling(element));
    var nextSiblings = Element.nextSiblings(element);
    return Object.isNumber(expression) ? nextSiblings[expression] :
      Selector.findElement(nextSiblings, expression, index);
  },


  select: function(element) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Selector.findChildElements(element, args);
  },

  adjacent: function(element) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Selector.findChildElements(element.parentNode, args).without(element);
  },

  identify: function(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;
    do { id = 'anonymous_element_' + Element.idCounter++ } while ($(id));
    Element.writeAttribute(element, 'id', id);
    return id;
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (Prototype.Browser.IE) {
      var t = Element._attributeTranslations.read;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name]) name = t.names[name];
      if (name.include(':')) {
        return (!element.attributes || !element.attributes[name]) ? null :
         element.attributes[name].value;
      }
    }
    return element.getAttribute(name);
  },

  writeAttribute: function(element, name, value) {
    element = $(element);
    var attributes = { }, t = Element._attributeTranslations.write;

    if (typeof name == 'object') attributes = name;
    else attributes[name] = Object.isUndefined(value) ? true : value;

    for (var attr in attributes) {
      name = t.names[attr] || attr;
      value = attributes[attr];
      if (t.values[attr]) name = t.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }
    return element;
  },

  getHeight: function(element) {
    return Element.getDimensions(element).height;
  },

  getWidth: function(element) {
    return Element.getDimensions(element).width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    if (!Element.hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    element.className = element.className.replace(
      new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element[Element.hasClassName(element, className) ?
      'removeClassName' : 'addClassName'](element, className);
  },

  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.blank();
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);

    if (element.compareDocumentPosition)
      return (element.compareDocumentPosition(ancestor) & 8) === 8;

    if (ancestor.contains)
      return ancestor.contains(element) && ancestor !== element;

    while (element = element.parentNode)
      if (element == ancestor) return true;

    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : style.camelize();
    var value = element.style[style];
    if (!value || value == 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  },

  getOpacity: function(element) {
    return $(element).getStyle('opacity');
  },

  setStyle: function(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;
    if (Object.isString(styles)) {
      element.style.cssText += ';' + styles;
      return styles.include('opacity') ?
        element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
    }
    for (var property in styles)
      if (property == 'opacity') {
       element.setOpacity(styles[property]);
      } else {
        elementStyle[(property == 'float' || property == 'cssFloat') ?
          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
            property] = styles[property];
	  }
    return element;
  },

  setOpacity: function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    if (originalPosition != 'fixed') // Switching fixed to absolute causes issues in Safari
      els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      if (Prototype.Browser.Opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = Element.getStyle(element, 'overflow') || 'auto';
    if (element._overflow !== 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element.tagName.toUpperCase() == 'BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  absolutize: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') == 'absolute') return element;

    var offsets = Element.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
    return element;
  },

  relativize: function(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') == 'relative') return element;

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
    return element;
  },

  cumulativeScrollOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return Element._returnOffset(valueL, valueT);
  },

  getOffsetParent: function(element) {
    if (element.offsetParent) return $(element.offsetParent);
    if (element == document.body) return $(element);

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return $(element);

    return $(document.body);
  },

  viewportOffset: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      if (element.offsetParent == document.body &&
        Element.getStyle(element, 'position') == 'absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!Prototype.Browser.Opera || (element.tagName && (element.tagName.toUpperCase() == 'BODY'))) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return Element._returnOffset(valueL, valueT);
  },

  clonePosition: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || { });

    source = $(source);
    var p = Element.viewportOffset(source);

    element = $(element);
    var delta = [0, 0];
    var parent = null;
    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = Element.getOffsetParent(element);
      delta = Element.viewportOffset(parent);
    }

    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  }
};

Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,

  childElements: Element.Methods.immediateDescendants
});

Element._attributeTranslations = {
  write: {
    names: {
      className: 'class',
      htmlFor:   'for'
    },
    values: { }
  }
};

if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(
    function(proceed, element, style) {
      switch (style) {
        case 'left': case 'top': case 'right': case 'bottom':
          if (proceed(element, 'position') === 'static') return null;
        case 'height': case 'width':
          if (!Element.visible(element)) return null;

          var dim = parseInt(proceed(element, style), 10);

          if (dim !== element['offset' + style.capitalize()])
            return dim + 'px';

          var properties;
          if (style === 'height') {
            properties = ['border-top-width', 'padding-top',
             'padding-bottom', 'border-bottom-width'];
          }
          else {
            properties = ['border-left-width', 'padding-left',
             'padding-right', 'border-right-width'];
          }
          return properties.inject(dim, function(memo, property) {
            var val = proceed(element, property);
            return val === null ? memo : memo - parseInt(val, 10);
          }) + 'px';
        default: return proceed(element, style);
      }
    }
  );

  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
    function(proceed, element, attribute) {
      if (attribute === 'title') return element.title;
      return proceed(element, attribute);
    }
  );
}

else if (Prototype.Browser.IE) {
  Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(
    function(proceed, element) {
      element = $(element);
      try { element.offsetParent }
      catch(e) { return $(document.body) }
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);
      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    }
  );

  $w('positionedOffset viewportOffset').each(function(method) {
    Element.Methods[method] = Element.Methods[method].wrap(
      function(proceed, element) {
        element = $(element);
        try { element.offsetParent }
        catch(e) { return Element._returnOffset(0,0) }
        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);
        var offsetParent = element.getOffsetParent();
        if (offsetParent && offsetParent.getStyle('position') === 'fixed')
          offsetParent.setStyle({ zoom: 1 });
        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );
  });

  Element.Methods.cumulativeOffset = Element.Methods.cumulativeOffset.wrap(
    function(proceed, element) {
      try { element.offsetParent }
      catch(e) { return Element._returnOffset(0,0) }
      return proceed(element);
    }
  );

  Element.Methods.getStyle = function(element, style) {
    element = $(element);
    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
    var value = element.style[style];
    if (!value && element.currentStyle) value = element.currentStyle[style];

    if (style == 'opacity') {
      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if (value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }

    if (value == 'auto') {
      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
        return element['offset' + style.capitalize()] + 'px';
      return null;
    }
    return value;
  };

  Element.Methods.setOpacity = function(element, value) {
    function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }
    element = $(element);
    var currentStyle = element.currentStyle;
    if ((currentStyle && !currentStyle.hasLayout) ||
      (!currentStyle && element.style.zoom == 'normal'))
        element.style.zoom = 1;

    var filter = element.getStyle('filter'), style = element.style;
    if (value == 1 || value === '') {
      (filter = stripAlpha(filter)) ?
        style.filter = filter : style.removeAttribute('filter');
      return element;
    } else if (value < 0.00001) value = 0;
    style.filter = stripAlpha(filter) +
      'alpha(opacity=' + (value * 100) + ')';
    return element;
  };

  Element._attributeTranslations = (function(){

    var classProp = 'className';
    var forProp = 'for';

    var el = document.createElement('div');

    el.setAttribute(classProp, 'x');

    if (el.className !== 'x') {
      el.setAttribute('class', 'x');
      if (el.className === 'x') {
        classProp = 'class';
      }
    }
    el = null;

    el = document.createElement('label');
    el.setAttribute(forProp, 'x');
    if (el.htmlFor !== 'x') {
      el.setAttribute('htmlFor', 'x');
      if (el.htmlFor === 'x') {
        forProp = 'htmlFor';
      }
    }
    el = null;

    return {
      read: {
        names: {
          'class':      classProp,
          'className':  classProp,
          'for':        forProp,
          'htmlFor':    forProp
        },
        values: {
          _getAttr: function(element, attribute) {
            return element.getAttribute(attribute);
          },
          _getAttr2: function(element, attribute) {
            return element.getAttribute(attribute, 2);
          },
          _getAttrNode: function(element, attribute) {
            var node = element.getAttributeNode(attribute);
            return node ? node.value : "";
          },
          _getEv: (function(){

            var el = document.createElement('div');
            el.onclick = Prototype.emptyFunction;
            var value = el.getAttribute('onclick');
            var f;

            if (String(value).indexOf('{') > -1) {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                attribute = attribute.toString();
                attribute = attribute.split('{')[1];
                attribute = attribute.split('}')[0];
                return attribute.strip();
              };
            }
            else if (value === '') {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                return attribute.strip();
              };
            }
            el = null;
            return f;
          })(),
          _flag: function(element, attribute) {
            return $(element).hasAttribute(attribute) ? attribute : null;
          },
          style: function(element) {
            return element.style.cssText.toLowerCase();
          },
          title: function(element) {
            return element.title;
          }
        }
      }
    }
  })();

  Element._attributeTranslations.write = {
    names: Object.extend({
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    }, Element._attributeTranslations.read.names),
    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  Element._attributeTranslations.has = {};

  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
      'encType maxLength readOnly longDesc frameBorder').each(function(attr) {
    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
    Element._attributeTranslations.has[attr.toLowerCase()] = attr;
  });

  (function(v) {
    Object.extend(v, {
      href:        v._getAttr2,
      src:         v._getAttr2,
      type:        v._getAttr,
      action:      v._getAttrNode,
      disabled:    v._flag,
      checked:     v._flag,
      readonly:    v._flag,
      multiple:    v._flag,
      onload:      v._getEv,
      onunload:    v._getEv,
      onclick:     v._getEv,
      ondblclick:  v._getEv,
      onmousedown: v._getEv,
      onmouseup:   v._getEv,
      onmouseover: v._getEv,
      onmousemove: v._getEv,
      onmouseout:  v._getEv,
      onfocus:     v._getEv,
      onblur:      v._getEv,
      onkeypress:  v._getEv,
      onkeydown:   v._getEv,
      onkeyup:     v._getEv,
      onsubmit:    v._getEv,
      onreset:     v._getEv,
      onselect:    v._getEv,
      onchange:    v._getEv
    });
  })(Element._attributeTranslations.read.values);

  if (Prototype.BrowserFeatures.ElementExtensions) {
    (function() {
      function _descendants(element) {
        var nodes = element.getElementsByTagName('*'), results = [];
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName !== "!") // Filter out comment nodes.
            results.push(node);
        return results;
      }

      Element.Methods.down = function(element, expression, index) {
        element = $(element);
        if (arguments.length == 1) return element.firstDescendant();
        return Object.isNumber(expression) ? _descendants(element)[expression] :
          Element.select(element, expression)[index || 0];
      }
    })();
  }

}

else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1) ? 0.999999 :
      (value === '') ? '' : (value < 0.00001) ? 0 : value;
    return element;
  };
}

else if (Prototype.Browser.WebKit) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;

    if (value == 1)
      if(element.tagName.toUpperCase() == 'IMG' && element.width) {
        element.width++; element.width--;
      } else try {
        var n = document.createTextNode(' ');
        element.appendChild(n);
        element.removeChild(n);
      } catch (e) { }

    return element;
  };

  Element.Methods.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return Element._returnOffset(valueL, valueT);
  };
}

if ('outerHTML' in document.documentElement) {
  Element.Methods.replace = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (Element._insertionTranslations.tags[tagName]) {
      var nextSibling = element.next();
      var fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
      parent.removeChild(element);
      if (nextSibling)
        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
      else
        fragments.each(function(node) { parent.appendChild(node) });
    }
    else element.outerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

Element._returnOffset = function(l, t) {
  var result = [l, t];
  result.left = l;
  result.top = t;
  return result;
};

Element._getContentFromAnonymousElement = function(tagName, html) {
  var div = new Element('div'), t = Element._insertionTranslations.tags[tagName];
  if (t) {
    div.innerHTML = t[0] + html + t[1];
    t[2].times(function() { div = div.firstChild });
  } else div.innerHTML = html;
  return $A(div.childNodes);
};

Element._insertionTranslations = {
  before: function(element, node) {
    element.parentNode.insertBefore(node, element);
  },
  top: function(element, node) {
    element.insertBefore(node, element.firstChild);
  },
  bottom: function(element, node) {
    element.appendChild(node);
  },
  after: function(element, node) {
    element.parentNode.insertBefore(node, element.nextSibling);
  },
  tags: {
    TABLE:  ['<table>',                '</table>',                   1],
    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
    SELECT: ['<select>',               '</select>',                  1]
  }
};

(function() {
  var tags = Element._insertionTranslations.tags;
  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });
})();

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    attribute = Element._attributeTranslations.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }
};

Element.Methods.ByTag = { };

Object.extend(Element, Element.Methods);

(function(div) {

  if (!Prototype.BrowserFeatures.ElementExtensions && div['__proto__']) {
    window.HTMLElement = { };
    window.HTMLElement.prototype = div['__proto__'];
    Prototype.BrowserFeatures.ElementExtensions = true;
  }

  div = null;

})(document.createElement('div'))

Element.extend = (function() {

  function checkDeficiency(tagName) {
    if (typeof window.Element != 'undefined') {
      var proto = window.Element.prototype;
      if (proto) {
        var id = '_' + (Math.random()+'').slice(2);
        var el = document.createElement(tagName);
        proto[id] = 'x';
        var isBuggy = (el[id] !== 'x');
        delete proto[id];
        el = null;
        return isBuggy;
      }
    }
    return false;
  }

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY = checkDeficiency('object');

  if (Prototype.BrowserFeatures.SpecificElementExtensions) {
    if (HTMLOBJECTELEMENT_PROTOTYPE_BUGGY) {
      return function(element) {
        if (element && typeof element._extendedByPrototype == 'undefined') {
          var t = element.tagName;
          if (t && (/^(?:object|applet|embed)$/i.test(t))) {
            extendElementWith(element, Element.Methods);
            extendElementWith(element, Element.Methods.Simulated);
            extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
          }
        }
        return element;
      }
    }
    return Prototype.K;
  }

  var Methods = { }, ByTag = Element.Methods.ByTag;

  var extend = Object.extend(function(element) {
    if (!element || typeof element._extendedByPrototype != 'undefined' ||
        element.nodeType != 1 || element == window) return element;

    var methods = Object.clone(Methods),
        tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);

    element._extendedByPrototype = Prototype.emptyFunction;
    return element;

  }, {
    refresh: function() {
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(Methods, Element.Methods);
        Object.extend(Methods, Element.Methods.Simulated);
      }
    }
  });

  extend.refresh();
  return extend;
})();

Element.hasAttribute = function(element, attribute) {
  if (element.hasAttribute) return element.hasAttribute(attribute);
  return Element.Methods.Simulated.hasAttribute(element, attribute);
};

Element.addMethods = function(methods) {
  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

  if (!methods) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods)
    });
  }

  if (arguments.length == 2) {
    var tagName = methods;
    methods = arguments[1];
  }

  if (!tagName) Object.extend(Element.Methods, methods || { });
  else {
    if (Object.isArray(tagName)) tagName.each(extend);
    else extend(tagName);
  }

  function extend(tagName) {
    tagName = tagName.toUpperCase();
    if (!Element.Methods.ByTag[tagName])
      Element.Methods.ByTag[tagName] = { };
    Object.extend(Element.Methods.ByTag[tagName], methods);
  }

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName);
    var proto = element['__proto__'] || element.constructor.prototype;
    element = null;
    return proto;
  }

  var elementPrototype = window.HTMLElement ? HTMLElement.prototype :
   Element.prototype;

  if (F.ElementExtensions) {
    copy(Element.Methods, elementPrototype);
    copy(Element.Methods.Simulated, elementPrototype, true);
  }

  if (F.SpecificElementExtensions) {
    for (var tag in Element.Methods.ByTag) {
      var klass = findDOMClass(tag);
      if (Object.isUndefined(klass)) continue;
      copy(T[tag], klass.prototype);
    }
  }

  Object.extend(Element, Element.Methods);
  delete Element.ByTag;

  if (Element.extend.refresh) Element.extend.refresh();
  Element.cache = { };
};


document.viewport = {

  getDimensions: function() {
    return { width: this.getWidth(), height: this.getHeight() };
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop);
  }
};

(function(viewport) {
  var B = Prototype.Browser, doc = document, element, property = {};

  function getRootElement() {
    if (B.WebKit && !doc.evaluate)
      return document;

    if (B.Opera && window.parseFloat(window.opera.version()) < 9.5)
      return document.body;

    return document.documentElement;
  }

  function define(D) {
    if (!element) element = getRootElement();

    property[D] = 'client' + D;

    viewport['get' + D] = function() { return element[property[D]] };
    return viewport['get' + D]();
  }

  viewport.getWidth  = define.curry('Width');

  viewport.getHeight = define.curry('Height');
})(document.viewport);


Element.Storage = {
  UID: 1
};

Element.addMethods({
  getStorage: function(element) {
    if (!(element = $(element))) return;

    var uid;
    if (element === window) {
      uid = 0;
    } else {
      if (typeof element._prototypeUID === "undefined")
        element._prototypeUID = [Element.Storage.UID++];
      uid = element._prototypeUID[0];
    }

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  },

  store: function(element, key, value) {
    if (!(element = $(element))) return;

    if (arguments.length === 2) {
      Element.getStorage(element).update(key);
    } else {
      Element.getStorage(element).set(key, value);
    }

    return element;
  },

  retrieve: function(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var hash = Element.getStorage(element), value = hash.get(key);

    if (Object.isUndefined(value)) {
      hash.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  },

  clone: function(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    clone._prototypeUID = void 0;
    if (deep) {
      var descendants = Element.select(clone, '*'),
          i = descendants.length;
      while (i--) {
        descendants[i]._prototypeUID = void 0;
      }
    }
    return Element.extend(clone);
  }
});
/* Portions of the Selector class are derived from Jack Slocum's DomQuery,
 * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style
 * license.  Please see http://www.yui-ext.com/ for more information. */

var Selector = Class.create({
  initialize: function(expression) {
    this.expression = expression.strip();

    if (this.shouldUseSelectorsAPI()) {
      this.mode = 'selectorsAPI';
    } else if (this.shouldUseXPath()) {
      this.mode = 'xpath';
      this.compileXPathMatcher();
    } else {
      this.mode = "normal";
      this.compileMatcher();
    }

  },

  shouldUseXPath: (function() {

    var IS_DESCENDANT_SELECTOR_BUGGY = (function(){
      var isBuggy = false;
      if (document.evaluate && window.XPathResult) {
        var el = document.createElement('div');
        el.innerHTML = '<ul><li></li></ul><div><ul><li></li></ul></div>';

        var xpath = ".//*[local-name()='ul' or local-name()='UL']" +
          "//*[local-name()='li' or local-name()='LI']";

        var result = document.evaluate(xpath, el, null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        isBuggy = (result.snapshotLength !== 2);
        el = null;
      }
      return isBuggy;
    })();

    return function() {
      if (!Prototype.BrowserFeatures.XPath) return false;

      var e = this.expression;

      if (Prototype.Browser.WebKit &&
       (e.include("-of-type") || e.include(":empty")))
        return false;

      if ((/(\[[\w-]*?:|:checked)/).test(e))
        return false;

      if (IS_DESCENDANT_SELECTOR_BUGGY) return false;

      return true;
    }

  })(),

  shouldUseSelectorsAPI: function() {
    if (!Prototype.BrowserFeatures.SelectorsAPI) return false;

    if (Selector.CASE_INSENSITIVE_CLASS_NAMES) return false;

    if (!Selector._div) Selector._div = new Element('div');

    try {
      Selector._div.querySelector(this.expression);
    } catch(e) {
      return false;
    }

    return true;
  },

  compileMatcher: function() {
    var e = this.expression, ps = Selector.patterns, h = Selector.handlers,
        c = Selector.criteria, le, p, m, len = ps.length, name;

    if (Selector._cache[e]) {
      this.matcher = Selector._cache[e];
      return;
    }

    this.matcher = ["this.matcher = function(root) {",
                    "var r = root, h = Selector.handlers, c = false, n;"];

    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        p = ps[i].re;
        name = ps[i].name;
        if (m = e.match(p)) {
          this.matcher.push(Object.isFunction(c[name]) ? c[name](m) :
            new Template(c[name]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.matcher.push("return h.unique(n);\n}");
    eval(this.matcher.join('\n'));
    Selector._cache[this.expression] = this.matcher;
  },

  compileXPathMatcher: function() {
    var e = this.expression, ps = Selector.patterns,
        x = Selector.xpath, le, m, len = ps.length, name;

    if (Selector._cache[e]) {
      this.xpath = Selector._cache[e]; return;
    }

    this.matcher = ['.//*'];
    while (e && le != e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        name = ps[i].name;
        if (m = e.match(ps[i].re)) {
          this.matcher.push(Object.isFunction(x[name]) ? x[name](m) :
            new Template(x[name]).evaluate(m));
          e = e.replace(m[0], '');
          break;
        }
      }
    }

    this.xpath = this.matcher.join('');
    Selector._cache[this.expression] = this.xpath;
  },

  findElements: function(root) {
    root = root || document;
    var e = this.expression, results;

    switch (this.mode) {
      case 'selectorsAPI':
        if (root !== document) {
          var oldId = root.id, id = $(root).identify();
          id = id.replace(/([\.:])/g, "\\$1");
          e = "#" + id + " " + e;
        }

        results = $A(root.querySelectorAll(e)).map(Element.extend);
        root.id = oldId;

        return results;
      case 'xpath':
        return document._getElementsByXPath(this.xpath, root);
      default:
       return this.matcher(root);
    }
  },

  match: function(element) {
    this.tokens = [];

    var e = this.expression, ps = Selector.patterns, as = Selector.assertions;
    var le, p, m, len = ps.length, name;

    while (e && le !== e && (/\S/).test(e)) {
      le = e;
      for (var i = 0; i<len; i++) {
        p = ps[i].re;
        name = ps[i].name;
        if (m = e.match(p)) {
          if (as[name]) {
            this.tokens.push([name, Object.clone(m)]);
            e = e.replace(m[0], '');
          } else {
            return this.findElements(document).include(element);
          }
        }
      }
    }

    var match = true, name, matches;
    for (var i = 0, token; token = this.tokens[i]; i++) {
      name = token[0], matches = token[1];
      if (!Selector.assertions[name](element, matches)) {
        match = false; break;
      }
    }

    return match;
  },

  toString: function() {
    return this.expression;
  },

  inspect: function() {
    return "#<Selector:" + this.expression.inspect() + ">";
  }
});

if (Prototype.BrowserFeatures.SelectorsAPI &&
 document.compatMode === 'BackCompat') {
  Selector.CASE_INSENSITIVE_CLASS_NAMES = (function(){
    var div = document.createElement('div'),
     span = document.createElement('span');

    div.id = "prototype_test_id";
    span.className = 'Test';
    div.appendChild(span);
    var isIgnored = (div.querySelector('#prototype_test_id .test') !== null);
    div = span = null;
    return isIgnored;
  })();
}

Object.extend(Selector, {
  _cache: { },

  xpath: {
    descendant:   "//*",
    child:        "/*",
    adjacent:     "/following-sibling::*[1]",
    laterSibling: '/following-sibling::*',
    tagName:      function(m) {
      if (m[1] == '*') return '';
      return "[local-name()='" + m[1].toLowerCase() +
             "' or local-name()='" + m[1].toUpperCase() + "']";
    },
    className:    "[contains(concat(' ', @class, ' '), ' #{1} ')]",
    id:           "[@id='#{1}']",
    attrPresence: function(m) {
      m[1] = m[1].toLowerCase();
      return new Template("[@#{1}]").evaluate(m);
    },
    attr: function(m) {
      m[1] = m[1].toLowerCase();
      m[3] = m[5] || m[6];
      return new Template(Selector.xpath.operators[m[2]]).evaluate(m);
    },
    pseudo: function(m) {
      var h = Selector.xpath.pseudos[m[1]];
      if (!h) return '';
      if (Object.isFunction(h)) return h(m);
      return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);
    },
    operators: {
      '=':  "[@#{1}='#{3}']",
      '!=': "[@#{1}!='#{3}']",
      '^=': "[starts-with(@#{1}, '#{3}')]",
      '$=': "[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']",
      '*=': "[contains(@#{1}, '#{3}')]",
      '~=': "[contains(concat(' ', @#{1}, ' '), ' #{3} ')]",
      '|=': "[contains(concat('-', @#{1}, '-'), '-#{3}-')]"
    },
    pseudos: {
      'first-child': '[not(preceding-sibling::*)]',
      'last-child':  '[not(following-sibling::*)]',
      'only-child':  '[not(preceding-sibling::* or following-sibling::*)]',
      'empty':       "[count(*) = 0 and (count(text()) = 0)]",
      'checked':     "[@checked]",
      'disabled':    "[(@disabled) and (@type!='hidden')]",
      'enabled':     "[not(@disabled) and (@type!='hidden')]",
      'not': function(m) {
        var e = m[6], p = Selector.patterns,
            x = Selector.xpath, le, v, len = p.length, name;

        var exclusion = [];
        while (e && le != e && (/\S/).test(e)) {
          le = e;
          for (var i = 0; i<len; i++) {
            name = p[i].name
            if (m = e.match(p[i].re)) {
              v = Object.isFunction(x[name]) ? x[name](m) : new Template(x[name]).evaluate(m);
              exclusion.push("(" + v.substring(1, v.length - 1) + ")");
              e = e.replace(m[0], '');
              break;
            }
          }
        }
        return "[not(" + exclusion.join(" and ") + ")]";
      },
      'nth-child':      function(m) {
        return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ", m);
      },
      'nth-last-child': function(m) {
        return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ", m);
      },
      'nth-of-type':    function(m) {
        return Selector.xpath.pseudos.nth("position() ", m);
      },
      'nth-last-of-type': function(m) {
        return Selector.xpath.pseudos.nth("(last() + 1 - position()) ", m);
      },
      'first-of-type':  function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-of-type'](m);
      },
      'last-of-type':   function(m) {
        m[6] = "1"; return Selector.xpath.pseudos['nth-last-of-type'](m);
      },
      'only-of-type':   function(m) {
        var p = Selector.xpath.pseudos; return p['first-of-type'](m) + p['last-of-type'](m);
      },
      nth: function(fragment, m) {
        var mm, formula = m[6], predicate;
        if (formula == 'even') formula = '2n+0';
        if (formula == 'odd')  formula = '2n+1';
        if (mm = formula.match(/^(\d+)$/)) // digit only
          return '[' + fragment + "= " + mm[1] + ']';
        if (mm = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
          if (mm[1] == "-") mm[1] = -1;
          var a = mm[1] ? Number(mm[1]) : 1;
          var b = mm[2] ? Number(mm[2]) : 0;
          predicate = "[((#{fragment} - #{b}) mod #{a} = 0) and " +
          "((#{fragment} - #{b}) div #{a} >= 0)]";
          return new Template(predicate).evaluate({
            fragment: fragment, a: a, b: b });
        }
      }
    }
  },

  criteria: {
    tagName:      'n = h.tagName(n, r, "#{1}", c);      c = false;',
    className:    'n = h.className(n, r, "#{1}", c);    c = false;',
    id:           'n = h.id(n, r, "#{1}", c);           c = false;',
    attrPresence: 'n = h.attrPresence(n, r, "#{1}", c); c = false;',
    attr: function(m) {
      m[3] = (m[5] || m[6]);
      return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(m);
    },
    pseudo: function(m) {
      if (m[6]) m[6] = m[6].replace(/"/g, '\\"');
      return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(m);
    },
    descendant:   'c = "descendant";',
    child:        'c = "child";',
    adjacent:     'c = "adjacent";',
    laterSibling: 'c = "laterSibling";'
  },

  patterns: [
    { name: 'laterSibling', re: /^\s*~\s*/ },
    { name: 'child',        re: /^\s*>\s*/ },
    { name: 'adjacent',     re: /^\s*\+\s*/ },
    { name: 'descendant',   re: /^\s/ },

    { name: 'tagName',      re: /^\s*(\*|[\w\-]+)(\b|$)?/ },
    { name: 'id',           re: /^#([\w\-\*]+)(\b|$)/ },
    { name: 'className',    re: /^\.([\w\-\*]+)(\b|$)/ },
    { name: 'pseudo',       re: /^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/ },
    { name: 'attrPresence', re: /^\[((?:[\w-]+:)?[\w-]+)\]/ },
    { name: 'attr',         re: /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/ }
  ],

  assertions: {
    tagName: function(element, matches) {
      return matches[1].toUpperCase() == element.tagName.toUpperCase();
    },

    className: function(element, matches) {
      return Element.hasClassName(element, matches[1]);
    },

    id: function(element, matches) {
      return element.id === matches[1];
    },

    attrPresence: function(element, matches) {
      return Element.hasAttribute(element, matches[1]);
    },

    attr: function(element, matches) {
      var nodeValue = Element.readAttribute(element, matches[1]);
      return nodeValue && Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]);
    }
  },

  handlers: {
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        a.push(node);
      return a;
    },

    mark: function(nodes) {
      var _true = Prototype.emptyFunction;
      for (var i = 0, node; node = nodes[i]; i++)
        node._countedByPrototype = _true;
      return nodes;
    },

    unmark: (function(){

      var PROPERTIES_ATTRIBUTES_MAP = (function(){
        var el = document.createElement('div'),
            isBuggy = false,
            propName = '_countedByPrototype',
            value = 'x'
        el[propName] = value;
        isBuggy = (el.getAttribute(propName) === value);
        el = null;
        return isBuggy;
      })();

      return PROPERTIES_ATTRIBUTES_MAP ?
        function(nodes) {
          for (var i = 0, node; node = nodes[i]; i++)
            node.removeAttribute('_countedByPrototype');
          return nodes;
        } :
        function(nodes) {
          for (var i = 0, node; node = nodes[i]; i++)
            node._countedByPrototype = void 0;
          return nodes;
        }
    })(),

    index: function(parentNode, reverse, ofType) {
      parentNode._countedByPrototype = Prototype.emptyFunction;
      if (reverse) {
        for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {
          var node = nodes[i];
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
        }
      } else {
        for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)
          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;
      }
    },

    unique: function(nodes) {
      if (nodes.length == 0) return nodes;
      var results = [], n;
      for (var i = 0, l = nodes.length; i < l; i++)
        if (typeof (n = nodes[i])._countedByPrototype == 'undefined') {
          n._countedByPrototype = Prototype.emptyFunction;
          results.push(Element.extend(n));
        }
      return Selector.handlers.unmark(results);
    },

    descendant: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, node.getElementsByTagName('*'));
      return results;
    },

    child: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        for (var j = 0, child; child = node.childNodes[j]; j++)
          if (child.nodeType == 1 && child.tagName != '!') results.push(child);
      }
      return results;
    },

    adjacent: function(nodes) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        var next = this.nextElementSibling(node);
        if (next) results.push(next);
      }
      return results;
    },

    laterSibling: function(nodes) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        h.concat(results, Element.nextSiblings(node));
      return results;
    },

    nextElementSibling: function(node) {
      while (node = node.nextSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    previousElementSibling: function(node) {
      while (node = node.previousSibling)
        if (node.nodeType == 1) return node;
      return null;
    },

    tagName: function(nodes, root, tagName, combinator) {
      var uTagName = tagName.toUpperCase();
      var results = [], h = Selector.handlers;
      if (nodes) {
        if (combinator) {
          if (combinator == "descendant") {
            for (var i = 0, node; node = nodes[i]; i++)
              h.concat(results, node.getElementsByTagName(tagName));
            return results;
          } else nodes = this[combinator](nodes);
          if (tagName == "*") return nodes;
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName.toUpperCase() === uTagName) results.push(node);
        return results;
      } else return root.getElementsByTagName(tagName);
    },

    id: function(nodes, root, id, combinator) {
      var targetNode = $(id), h = Selector.handlers;

      if (root == document) {
        if (!targetNode) return [];
        if (!nodes) return [targetNode];
      } else {
        if (!root.sourceIndex || root.sourceIndex < 1) {
          var nodes = root.getElementsByTagName('*');
          for (var j = 0, node; node = nodes[j]; j++) {
            if (node.id === id) return [node];
          }
        }
      }

      if (nodes) {
        if (combinator) {
          if (combinator == 'child') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (targetNode.parentNode == node) return [targetNode];
          } else if (combinator == 'descendant') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Element.descendantOf(targetNode, node)) return [targetNode];
          } else if (combinator == 'adjacent') {
            for (var i = 0, node; node = nodes[i]; i++)
              if (Selector.handlers.previousElementSibling(targetNode) == node)
                return [targetNode];
          } else nodes = h[combinator](nodes);
        }
        for (var i = 0, node; node = nodes[i]; i++)
          if (node == targetNode) return [targetNode];
        return [];
      }
      return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];
    },

    className: function(nodes, root, className, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      return Selector.handlers.byClassName(nodes, root, className);
    },

    byClassName: function(nodes, root, className) {
      if (!nodes) nodes = Selector.handlers.descendant([root]);
      var needle = ' ' + className + ' ';
      for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {
        nodeClassName = node.className;
        if (nodeClassName.length == 0) continue;
        if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle))
          results.push(node);
      }
      return results;
    },

    attrPresence: function(nodes, root, attr, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var results = [];
      for (var i = 0, node; node = nodes[i]; i++)
        if (Element.hasAttribute(node, attr)) results.push(node);
      return results;
    },

    attr: function(nodes, root, attr, value, operator, combinator) {
      if (!nodes) nodes = root.getElementsByTagName("*");
      if (nodes && combinator) nodes = this[combinator](nodes);
      var handler = Selector.operators[operator], results = [];
      for (var i = 0, node; node = nodes[i]; i++) {
        var nodeValue = Element.readAttribute(node, attr);
        if (nodeValue === null) continue;
        if (handler(nodeValue, value)) results.push(node);
      }
      return results;
    },

    pseudo: function(nodes, name, value, root, combinator) {
      if (nodes && combinator) nodes = this[combinator](nodes);
      if (!nodes) nodes = root.getElementsByTagName("*");
      return Selector.pseudos[name](nodes, value, root);
    }
  },

  pseudos: {
    'first-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.previousElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'last-child': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (Selector.handlers.nextElementSibling(node)) continue;
          results.push(node);
      }
      return results;
    },
    'only-child': function(nodes, value, root) {
      var h = Selector.handlers;
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!h.previousElementSibling(node) && !h.nextElementSibling(node))
          results.push(node);
      return results;
    },
    'nth-child':        function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root);
    },
    'nth-last-child':   function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true);
    },
    'nth-of-type':      function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, false, true);
    },
    'nth-last-of-type': function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, formula, root, true, true);
    },
    'first-of-type':    function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, false, true);
    },
    'last-of-type':     function(nodes, formula, root) {
      return Selector.pseudos.nth(nodes, "1", root, true, true);
    },
    'only-of-type':     function(nodes, formula, root) {
      var p = Selector.pseudos;
      return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);
    },

    getIndices: function(a, b, total) {
      if (a == 0) return b > 0 ? [b] : [];
      return $R(1, total).inject([], function(memo, i) {
        if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);
        return memo;
      });
    },

    nth: function(nodes, formula, root, reverse, ofType) {
      if (nodes.length == 0) return [];
      if (formula == 'even') formula = '2n+0';
      if (formula == 'odd')  formula = '2n+1';
      var h = Selector.handlers, results = [], indexed = [], m;
      h.mark(nodes);
      for (var i = 0, node; node = nodes[i]; i++) {
        if (!node.parentNode._countedByPrototype) {
          h.index(node.parentNode, reverse, ofType);
          indexed.push(node.parentNode);
        }
      }
      if (formula.match(/^\d+$/)) { // just a number
        formula = Number(formula);
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.nodeIndex == formula) results.push(node);
      } else if (m = formula.match(/^(-?\d*)?n(([+-])(\d+))?/)) { // an+b
        if (m[1] == "-") m[1] = -1;
        var a = m[1] ? Number(m[1]) : 1;
        var b = m[2] ? Number(m[2]) : 0;
        var indices = Selector.pseudos.getIndices(a, b, nodes.length);
        for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {
          for (var j = 0; j < l; j++)
            if (node.nodeIndex == indices[j]) results.push(node);
        }
      }
      h.unmark(nodes);
      h.unmark(indexed);
      return results;
    },

    'empty': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++) {
        if (node.tagName == '!' || node.firstChild) continue;
        results.push(node);
      }
      return results;
    },

    'not': function(nodes, selector, root) {
      var h = Selector.handlers, selectorType, m;
      var exclusions = new Selector(selector).findElements(root);
      h.mark(exclusions);
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node._countedByPrototype) results.push(node);
      h.unmark(exclusions);
      return results;
    },

    'enabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (!node.disabled && (!node.type || node.type !== 'hidden'))
          results.push(node);
      return results;
    },

    'disabled': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.disabled) results.push(node);
      return results;
    },

    'checked': function(nodes, value, root) {
      for (var i = 0, results = [], node; node = nodes[i]; i++)
        if (node.checked) results.push(node);
      return results;
    }
  },

  operators: {
    '=':  function(nv, v) { return nv == v; },
    '!=': function(nv, v) { return nv != v; },
    '^=': function(nv, v) { return nv == v || nv && nv.startsWith(v); },
    '$=': function(nv, v) { return nv == v || nv && nv.endsWith(v); },
    '*=': function(nv, v) { return nv == v || nv && nv.include(v); },
    '~=': function(nv, v) { return (' ' + nv + ' ').include(' ' + v + ' '); },
    '|=': function(nv, v) { return ('-' + (nv || "").toUpperCase() +
     '-').include('-' + (v || "").toUpperCase() + '-'); }
  },

  split: function(expression) {
    var expressions = [];
    expression.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/, function(m) {
      expressions.push(m[1].strip());
    });
    return expressions;
  },

  matchElements: function(elements, expression) {
    var matches = $$(expression), h = Selector.handlers;
    h.mark(matches);
    for (var i = 0, results = [], element; element = elements[i]; i++)
      if (element._countedByPrototype) results.push(element);
    h.unmark(matches);
    return results;
  },

  findElement: function(elements, expression, index) {
    if (Object.isNumber(expression)) {
      index = expression; expression = false;
    }
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    expressions = Selector.split(expressions.join(','));
    var results = [], h = Selector.handlers;
    for (var i = 0, l = expressions.length, selector; i < l; i++) {
      selector = new Selector(expressions[i].strip());
      h.concat(results, selector.findElements(element));
    }
    return (l > 1) ? h.unique(results) : results;
  }
});

if (Prototype.Browser.IE) {
  Object.extend(Selector.handlers, {
    concat: function(a, b) {
      for (var i = 0, node; node = b[i]; i++)
        if (node.tagName !== "!") a.push(node);
      return a;
    }
  });
}

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit;

    var data = elements.inject({ }, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          if (key in result) {
            if (!Object.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return options.hash ? data : Object.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*'),
        element,
        arr = [ ],
        serializers = Form.Element.Serializers;
    for (var i = 0; element = elements[i]; i++) {
      arr.push(element);
    }
    return arr.inject([], function(elements, child) {
      if (serializers[child.tagName.toLowerCase()])
        elements.push(Element.extend(child));
      return elements;
    })
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element, value);
      default:
        return Form.Element.Serializers.textarea(element, value);
    }
  },

  inputSelector: function(element, value) {
    if (Object.isUndefined(value)) return element.checked ? element.value : null;
    else element.checked = !!value;
  },

  textarea: function(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  },

  select: function(element, value) {
    if (Object.isUndefined(value))
      return this[element.type == 'select-one' ?
        'selectOne' : 'selectMany'](element);
    else {
      var opt, currentValue, single = !Object.isArray(value);
      for (var i = 0, length = element.length; i < length; i++) {
        opt = element.options[i];
        currentValue = this.optionValue(opt);
        if (single) {
          if (currentValue == value) {
            opt.selected = true;
            return;
          }
        }
        else opt.selected = value.include(currentValue);
      }
    }
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
};

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function() {

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45,

    cache: {}
  };

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;

  var _isButton;
  if (Prototype.Browser.IE) {
    var buttonMap = { 0: 1, 1: 4, 2: 2 };
    _isButton = function(event, code) {
      return event.button === buttonMap[code];
    };
  } else if (Prototype.Browser.WebKit) {
    _isButton = function(event, code) {
      switch (code) {
        case 0: return event.which == 1 && !event.metaKey;
        case 1: return event.which == 1 && event.metaKey;
        default: return false;
      }
    };
  } else {
    _isButton = function(event, code) {
      return event.which ? (event.which === code + 1) : (event.button === code);
    };
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    if (node.nodeType == Node.TEXT_NODE)
      node = node.parentNode;

    return Element.extend(node);
  }

  function findElement(event, expression) {
    var element = Event.element(event);
    if (!expression) return element;
    var elements = [element].concat(element.ancestors());
    return Selector.findElement(elements, expression, 0);
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }

  Event.Methods = {
    isLeftClick: isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick: isRightClick,

    element: element,
    findElement: findElement,

    pointer: pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };


  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (Prototype.Browser.IE) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover': element = event.fromElement; break;
        case 'mouseout':  element = event.toElement;   break;
        default: return null;
      }
      return Element.extend(element);
    }

    Object.extend(methods, {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    });

    Event.extend = function(event, element) {
      if (!event) return false;
      if (event._extendedByPrototype) return event;

      event._extendedByPrototype = Prototype.emptyFunction;
      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      return Object.extend(event, methods);
    };
  } else {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
    Event.extend = Prototype.K;
  }

  function _createResponder(element, eventName, handler) {
    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) {
      CACHE.push(element);
      registry = Element.retrieve(element, 'prototype_event_registry', $H());
    }

    var respondersForEvent = registry.get(eventName);
    if (Object.isUndefined(respondersForEvent)) {
      respondersForEvent = [];
      registry.set(eventName, respondersForEvent);
    }

    if (respondersForEvent.pluck('handler').include(handler)) return false;

    var responder;
    if (eventName.include(":")) {
      responder = function(event) {
        if (Object.isUndefined(event.eventName))
          return false;

        if (event.eventName !== eventName)
          return false;

        Event.extend(event, element);
        handler.call(element, event);
      };
    } else {
      if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
       (eventName === "mouseenter" || eventName === "mouseleave")) {
        if (eventName === "mouseenter" || eventName === "mouseleave") {
          responder = function(event) {
            Event.extend(event, element);

            var parent = event.relatedTarget;
            while (parent && parent !== element) {
              try { parent = parent.parentNode; }
              catch(e) { parent = element; }
            }

            if (parent === element) return;

            handler.call(element, event);
          };
        }
      } else {
        responder = function(event) {
          Event.extend(event, element);
          handler.call(element, event);
        };
      }
    }

    responder.handler = handler;
    respondersForEvent.push(responder);
    return responder;
  }

  function _destroyCache() {
    for (var i = 0, length = CACHE.length; i < length; i++) {
      Event.stopObserving(CACHE[i]);
      CACHE[i] = null;
    }
  }

  var CACHE = [];

  if (Prototype.Browser.IE)
    window.attachEvent('onunload', _destroyCache);

  if (Prototype.Browser.WebKit)
    window.addEventListener('unload', Prototype.emptyFunction, false);


  var _getDOMEventName = Prototype.K;

  if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) {
    _getDOMEventName = function(eventName) {
      var translations = { mouseenter: "mouseover", mouseleave: "mouseout" };
      return eventName in translations ? translations[eventName] : eventName;
    };
  }

  function observe(element, eventName, handler) {
    element = $(element);

    var responder = _createResponder(element, eventName, handler);

    if (!responder) return element;

    if (eventName.include(':')) {
      if (element.addEventListener)
        element.addEventListener("dataavailable", responder, false);
      else {
        element.attachEvent("ondataavailable", responder);
        element.attachEvent("onfilterchange", responder);
      }
    } else {
      var actualEventName = _getDOMEventName(eventName);

      if (element.addEventListener)
        element.addEventListener(actualEventName, responder, false);
      else
        element.attachEvent("on" + actualEventName, responder);
    }

    return element;
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);

    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) return element;

    if (eventName && !handler) {
      var responders = registry.get(eventName);

      if (Object.isUndefined(responders)) return element;

      responders.each( function(r) {
        Element.stopObserving(element, eventName, r.handler);
      });
      return element;
    } else if (!eventName) {
      registry.each( function(pair) {
        var eventName = pair.key, responders = pair.value;

        responders.each( function(r) {
          Element.stopObserving(element, eventName, r.handler);
        });
      });
      return element;
    }

    var responders = registry.get(eventName);

    if (!responders) return;

    var responder = responders.find( function(r) { return r.handler === handler; });
    if (!responder) return element;

    var actualEventName = _getDOMEventName(eventName);

    if (eventName.include(':')) {
      if (element.removeEventListener)
        element.removeEventListener("dataavailable", responder, false);
      else {
        element.detachEvent("ondataavailable", responder);
        element.detachEvent("onfilterchange",  responder);
      }
    } else {
      if (element.removeEventListener)
        element.removeEventListener(actualEventName, responder, false);
      else
        element.detachEvent('on' + actualEventName, responder);
    }

    registry.set(eventName, responders.without(responder));

    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = $(element);

    if (Object.isUndefined(bubble))
      bubble = true;

    if (element == document && document.createEvent && !element.dispatchEvent)
      element = document.documentElement;

    var event;
    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('dataavailable', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = bubble ? 'ondataavailable' : 'onfilterchange';
    }

    event.eventName = eventName;
    event.memo = memo || { };

    if (document.createEvent)
      element.dispatchEvent(event);
    else
      element.fireEvent(event.eventType, event);

    return Event.extend(event);
  }


  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    loaded:        false
  });

  if (window.Event) Object.extend(window.Event, Event);
  else window.Event = Event;
})();

(function() {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var timer;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (timer) window.clearTimeout(timer);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.stopObserving('readystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try { document.documentElement.doScroll('left'); }
    catch(e) {
      timer = pollDoScroll.defer();
      return;
    }
    fireContentLoadedEvent();
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.observe('readystatechange', checkReadyState);
    if (window == top)
      timer = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})();

Element.addMethods();

/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/
/* JSON-P implementation for Prototype.js somewhat by Dan Dean (http://www.dandean.com)
 *
 * *HEAVILY* based on Tobie Langel's version: http://gist.github.com/145466.
 * Might as well just call this an iteration.
 *
 * This version introduces:
 * - onCreate and onFailure callback options.
 * - option to not invoke request upon instantiation.
 *
 * Tested in Firefox 3/3.5, Safari 4
 *
 * Note: while I still think JSON-P is an inherantly flawed technique,
 * there are some valid use cases which this can provide for.
 *
 * See examples in README for usage
 */
Ajax.JSONRequest = Class.create(Ajax.Base, (function() {
  var id = 0, head = document.getElementsByTagName('head')[0];
  return {
    initialize: function($super, url, options) {
      $super(options);
      this.options.url = url;
      this.options.method = 'post';
      this.options.callbackParamName = this.options.callbackParamName || 'callback';
      this.options.timeout = this.options.timeout || 30000; // Default timeout: 10 seconds
      this.options.invokeImmediately = (!Object.isUndefined(this.options.invokeImmediately)) ? this.options.invokeImmediately : true ;
      this.responseJSON = {};
      if (this.options.invokeImmediately) {
        this.request();
      }
    },

    _cleanup: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (this.script && Object.isElement(this.script)) {
        this.script.remove();
        this.script = null;
      }
    },

    request: function() {
      var key = this.options.callbackParamName,
        name = '_prototypeJSONPCallback_' + (id++);

      this.options.parameters[key] = name;
      var url = this.options.url + ((this.options.url.include('?') ? '&' : '?') + Object.toQueryString(this.options.parameters));

      window[name] = function(json) {
        this._cleanup(); // Garbage collection
        window[name] = undefined;
        if (Object.isFunction(this.options.onSuccess)) {
          this.responseJSON = json;
          this.options.onSuccess.call(this, this);
        }
      }.bind(this);

      this.script = new Element('script', { type: 'text/javascript', src: url });

      if (Object.isFunction(this.options.onCreate)) {
        this.options.onCreate.call(this, this);
      }

      head.appendChild(this.script);

      this.timeout = setTimeout(function() {
        this._cleanup();
        window[name] = Prototype.emptyFunction;
        if (Object.isFunction(this.options.onFailure)) {
          this.options.onFailure.call(this, this);
        }
      }.bind(this), this.options.timeout);
    }
  };
})());
/*
 * Raphael 1.3.1 - JavaScript Vector Library
 *
 * Copyright (c) 2008 - 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael=(function(){var a=/[, ]+/,aO=/^(circle|rect|path|ellipse|text|image)$/,L=document,au=window,l={was:"Raphael" in au,is:au.Raphael},an=function(){if(an.is(arguments[0],"array")){var d=arguments[0],e=w[aW](an,d.splice(0,3+an.is(d[0],al))),S=e.set();for(var R=0,a0=d[m];R<a0;R++){var E=d[R]||{};aO.test(E.type)&&S[f](e[E.type]().attr(E));}return S;}return w[aW](an,arguments);},aT=function(){},aL="appendChild",aW="apply",aS="concat",at="",am=" ",z="split",F="click dblclick mousedown mousemove mouseout mouseover mouseup"[z](am),Q="hasOwnProperty",az="join",m="length",aY="prototype",aZ=String[aY].toLowerCase,ab=Math,g=ab.max,aI=ab.min,al="number",aA="toString",aw=Object[aY][aA],aQ={},aM=ab.pow,f="push",aU=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+)['"]?\)$/i,x=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,O=ab.round,v="setAttribute",W=parseFloat,G=parseInt,aN=String[aY].toUpperCase,j={"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},Z={along:"along","clip-rect":"csv",cx:al,cy:al,fill:"colour","fill-opacity":al,"font-size":al,height:al,opacity:al,path:"path",r:al,rotation:"csv",rx:al,ry:al,scale:"csv",stroke:"colour","stroke-opacity":al,"stroke-width":al,translation:"csv",width:al,x:al,y:al},aP="replace";an.version="1.3.1";an.type=(au.SVGAngle||L.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");if(an.type=="VML"){var ag=document.createElement("div");ag.innerHTML="<!--[if vml]><br><br><![endif]-->";if(ag.childNodes[m]!=2){return null;}}an.svg=!(an.vml=an.type=="VML");aT[aY]=an[aY];an._id=0;an._oid=0;an.fn={};an.is=function(e,d){d=aZ.call(d);return((d=="object"||d=="undefined")&&typeof e==d)||(e==null&&d=="null")||aZ.call(aw.call(e).slice(8,-1))==d;};an.setWindow=function(d){au=d;L=au.document;};var aD=function(e){if(an.vml){var d=/^\s+|\s+$/g;aD=aj(function(R){var S;R=(R+at)[aP](d,at);try{var a0=new ActiveXObject("htmlfile");a0.write("<body>");a0.close();S=a0.body;}catch(a2){S=createPopup().document.body;}var i=S.createTextRange();try{S.style.color=R;var a1=i.queryCommandValue("ForeColor");a1=((a1&255)<<16)|(a1&65280)|((a1&16711680)>>>16);return"#"+("000000"+a1[aA](16)).slice(-6);}catch(a2){return"none";}});}else{var E=L.createElement("i");E.title="Rapha\xebl Colour Picker";E.style.display="none";L.body[aL](E);aD=aj(function(i){E.style.color=i;return L.defaultView.getComputedStyle(E,at).getPropertyValue("color");});}return aD(e);};an.hsb2rgb=aj(function(a3,a1,a7){if(an.is(a3,"object")&&"h" in a3&&"s" in a3&&"b" in a3){a7=a3.b;a1=a3.s;a3=a3.h;}var R,S,a8;if(a7==0){return{r:0,g:0,b:0,hex:"#000"};}if(a3>1||a1>1||a7>1){a3/=255;a1/=255;a7/=255;}var a0=~~(a3*6),a4=(a3*6)-a0,E=a7*(1-a1),e=a7*(1-(a1*a4)),a9=a7*(1-(a1*(1-a4)));R=[a7,e,E,E,a9,a7,a7][a0];S=[a9,a7,a7,e,E,E,a9][a0];a8=[E,E,a9,a7,a7,e,E][a0];R*=255;S*=255;a8*=255;var a5={r:R,g:S,b:a8},d=(~~R)[aA](16),a2=(~~S)[aA](16),a6=(~~a8)[aA](16);d=d[aP](aU,"0");a2=a2[aP](aU,"0");a6=a6[aP](aU,"0");a5.hex="#"+d+a2+a6;return a5;},an);an.rgb2hsb=aj(function(d,e,a1){if(an.is(d,"object")&&"r" in d&&"g" in d&&"b" in d){a1=d.b;e=d.g;d=d.r;}if(an.is(d,"string")){var a3=an.getRGB(d);d=a3.r;e=a3.g;a1=a3.b;}if(d>1||e>1||a1>1){d/=255;e/=255;a1/=255;}var a0=g(d,e,a1),i=aI(d,e,a1),R,E,S=a0;if(i==a0){return{h:0,s:0,b:a0};}else{var a2=(a0-i);E=a2/a0;if(d==a0){R=(e-a1)/a2;}else{if(e==a0){R=2+((a1-d)/a2);}else{R=4+((d-e)/a2);}}R/=6;R<0&&R++;R>1&&R--;}return{h:R,s:E,b:S};},an);var aE=/,?([achlmqrstvxz]),?/gi;an._path2string=function(){return this.join(",")[aP](aE,"$1");};function aj(E,e,d){function i(){var R=Array[aY].slice.call(arguments,0),a0=R[az]("\u25ba"),S=i.cache=i.cache||{},a1=i.count=i.count||[];if(S[Q](a0)){return d?d(S[a0]):S[a0];}a1[m]>=1000&&delete S[a1.shift()];a1[f](a0);S[a0]=E[aW](e,R);return d?d(S[a0]):S[a0];}return i;}an.getRGB=aj(function(d){if(!d||!!((d=d+at).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1};}if(d=="none"){return{r:-1,g:-1,b:-1,hex:"none"};}!(({hs:1,rg:1})[Q](d.substring(0,2))||d.charAt()=="#")&&(d=aD(d));var S,i,E,a2,a3,a0=d.match(x);if(a0){if(a0[2]){a2=G(a0[2].substring(5),16);E=G(a0[2].substring(3,5),16);i=G(a0[2].substring(1,3),16);}if(a0[3]){a2=G((a3=a0[3].charAt(3))+a3,16);E=G((a3=a0[3].charAt(2))+a3,16);i=G((a3=a0[3].charAt(1))+a3,16);}if(a0[4]){a0=a0[4][z](/\s*,\s*/);i=W(a0[0]);E=W(a0[1]);a2=W(a0[2]);}if(a0[5]){a0=a0[5][z](/\s*,\s*/);i=W(a0[0])*2.55;E=W(a0[1])*2.55;a2=W(a0[2])*2.55;}if(a0[6]){a0=a0[6][z](/\s*,\s*/);i=W(a0[0]);E=W(a0[1]);a2=W(a0[2]);return an.hsb2rgb(i,E,a2);}if(a0[7]){a0=a0[7][z](/\s*,\s*/);i=W(a0[0])*2.55;E=W(a0[1])*2.55;a2=W(a0[2])*2.55;return an.hsb2rgb(i,E,a2);}a0={r:i,g:E,b:a2};var e=(~~i)[aA](16),R=(~~E)[aA](16),a1=(~~a2)[aA](16);e=e[aP](aU,"0");R=R[aP](aU,"0");a1=a1[aP](aU,"0");a0.hex="#"+e+R+a1;return a0;}return{r:-1,g:-1,b:-1,hex:"none",error:1};},an);an.getColor=function(e){var i=this.getColor.start=this.getColor.start||{h:0,s:1,b:e||0.75},d=this.hsb2rgb(i.h,i.s,i.b);i.h+=0.075;if(i.h>1){i.h=0;i.s-=0.2;i.s<=0&&(this.getColor.start={h:0,s:1,b:i.b});}return d.hex;};an.getColor.reset=function(){delete this.start;};an.parsePathString=aj(function(d){if(!d){return null;}var i={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},e=[];if(an.is(d,"array")&&an.is(d[0],"array")){e=av(d);}if(!e[m]){(d+at)[aP](/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,function(R,E,a1){var a0=[],S=aZ.call(E);a1[aP](/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,function(a3,a2){a2&&a0[f](+a2);});while(a0[m]>=i[S]){e[f]([E][aS](a0.splice(0,i[S])));if(!i[S]){break;}}});}e[aA]=an._path2string;return e;});an.findDotsAtSegment=function(e,d,be,bc,a0,R,a2,a1,a8){var a6=1-a8,a5=aM(a6,3)*e+aM(a6,2)*3*a8*be+a6*3*a8*a8*a0+aM(a8,3)*a2,a3=aM(a6,3)*d+aM(a6,2)*3*a8*bc+a6*3*a8*a8*R+aM(a8,3)*a1,ba=e+2*a8*(be-e)+a8*a8*(a0-2*be+e),a9=d+2*a8*(bc-d)+a8*a8*(R-2*bc+d),bd=be+2*a8*(a0-be)+a8*a8*(a2-2*a0+be),bb=bc+2*a8*(R-bc)+a8*a8*(a1-2*R+bc),a7=(1-a8)*e+a8*be,a4=(1-a8)*d+a8*bc,E=(1-a8)*a0+a8*a2,i=(1-a8)*R+a8*a1,S=(90-ab.atan((ba-bd)/(a9-bb))*180/ab.PI);(ba>bd||a9<bb)&&(S+=180);return{x:a5,y:a3,m:{x:ba,y:a9},n:{x:bd,y:bb},start:{x:a7,y:a4},end:{x:E,y:i},alpha:S};};var U=aj(function(a5){if(!a5){return{x:0,y:0,width:0,height:0};}a5=H(a5);var a2=0,a1=0,R=[],e=[],E;for(var S=0,a4=a5[m];S<a4;S++){E=a5[S];if(E[0]=="M"){a2=E[1];a1=E[2];R[f](a2);e[f](a1);}else{var a0=aC(a2,a1,E[1],E[2],E[3],E[4],E[5],E[6]);R=R[aS](a0.min.x,a0.max.x);e=e[aS](a0.min.y,a0.max.y);a2=E[5];a1=E[6];}}var d=aI[aW](0,R),a3=aI[aW](0,e);return{x:d,y:a3,width:g[aW](0,R)-d,height:g[aW](0,e)-a3};}),av=function(a0){var E=[];if(!an.is(a0,"array")||!an.is(a0&&a0[0],"array")){a0=an.parsePathString(a0);}for(var e=0,R=a0[m];e<R;e++){E[e]=[];for(var d=0,S=a0[e][m];d<S;d++){E[e][d]=a0[e][d];}}E[aA]=an._path2string;return E;},ad=aj(function(R){if(!an.is(R,"array")||!an.is(R&&R[0],"array")){R=an.parsePathString(R);}var a4=[],a6=0,a5=0,a9=0,a8=0,E=0;if(R[0][0]=="M"){a6=R[0][1];a5=R[0][2];a9=a6;a8=a5;E++;a4[f](["M",a6,a5]);}for(var a1=E,ba=R[m];a1<ba;a1++){var d=a4[a1]=[],a7=R[a1];if(a7[0]!=aZ.call(a7[0])){d[0]=aZ.call(a7[0]);switch(d[0]){case"a":d[1]=a7[1];d[2]=a7[2];d[3]=a7[3];d[4]=a7[4];d[5]=a7[5];d[6]=+(a7[6]-a6).toFixed(3);d[7]=+(a7[7]-a5).toFixed(3);break;case"v":d[1]=+(a7[1]-a5).toFixed(3);break;case"m":a9=a7[1];a8=a7[2];default:for(var a0=1,a2=a7[m];a0<a2;a0++){d[a0]=+(a7[a0]-((a0%2)?a6:a5)).toFixed(3);}}}else{d=a4[a1]=[];if(a7[0]=="m"){a9=a7[1]+a6;a8=a7[2]+a5;}for(var S=0,e=a7[m];S<e;S++){a4[a1][S]=a7[S];}}var a3=a4[a1][m];switch(a4[a1][0]){case"z":a6=a9;a5=a8;break;case"h":a6+=+a4[a1][a3-1];break;case"v":a5+=+a4[a1][a3-1];break;default:a6+=+a4[a1][a3-2];a5+=+a4[a1][a3-1];}}a4[aA]=an._path2string;return a4;},0,av),r=aj(function(R){if(!an.is(R,"array")||!an.is(R&&R[0],"array")){R=an.parsePathString(R);}var a3=[],a5=0,a4=0,a8=0,a7=0,E=0;if(R[0][0]=="M"){a5=+R[0][1];a4=+R[0][2];a8=a5;a7=a4;E++;a3[0]=["M",a5,a4];}for(var a1=E,a9=R[m];a1<a9;a1++){var d=a3[a1]=[],a6=R[a1];if(a6[0]!=aN.call(a6[0])){d[0]=aN.call(a6[0]);switch(d[0]){case"A":d[1]=a6[1];d[2]=a6[2];d[3]=a6[3];d[4]=a6[4];d[5]=a6[5];d[6]=+(a6[6]+a5);d[7]=+(a6[7]+a4);break;case"V":d[1]=+a6[1]+a4;break;case"H":d[1]=+a6[1]+a5;break;case"M":a8=+a6[1]+a5;a7=+a6[2]+a4;default:for(var a0=1,a2=a6[m];a0<a2;a0++){d[a0]=+a6[a0]+((a0%2)?a5:a4);}}}else{for(var S=0,e=a6[m];S<e;S++){a3[a1][S]=a6[S];}}switch(d[0]){case"Z":a5=a8;a4=a7;break;case"H":a5=d[1];break;case"V":a4=d[1];break;default:a5=a3[a1][a3[a1][m]-2];a4=a3[a1][a3[a1][m]-1];}}a3[aA]=an._path2string;return a3;},null,av),aX=function(e,E,d,i){return[e,E,d,i,d,i];},aK=function(e,E,a0,R,d,i){var S=1/3,a1=2/3;return[S*e+a1*a0,S*E+a1*R,S*d+a1*a0,S*i+a1*R,d,i];},K=function(a9,bE,bi,bg,ba,a4,S,a8,bD,bb){var R=ab.PI,bf=R*120/180,d=R/180*(+ba||0),bm=[],bj,bA=aj(function(bF,bI,i){var bH=bF*ab.cos(i)-bI*ab.sin(i),bG=bF*ab.sin(i)+bI*ab.cos(i);return{x:bH,y:bG};});if(!bb){bj=bA(a9,bE,-d);a9=bj.x;bE=bj.y;bj=bA(a8,bD,-d);a8=bj.x;bD=bj.y;var e=ab.cos(R/180*ba),a6=ab.sin(R/180*ba),bo=(a9-a8)/2,bn=(bE-bD)/2;bi=g(bi,ab.abs(bo));bg=g(bg,ab.abs(bn));var by=(bo*bo)/(bi*bi)+(bn*bn)/(bg*bg);if(by>1){bi=ab.sqrt(by)*bi;bg=ab.sqrt(by)*bg;}var E=bi*bi,br=bg*bg,bt=(a4==S?-1:1)*ab.sqrt(ab.abs((E*br-E*bn*bn-br*bo*bo)/(E*bn*bn+br*bo*bo))),bd=bt*bi*bn/bg+(a9+a8)/2,bc=bt*-bg*bo/bi+(bE+bD)/2,a3=ab.asin(((bE-bc)/bg).toFixed(7)),a2=ab.asin(((bD-bc)/bg).toFixed(7));a3=a9<bd?R-a3:a3;a2=a8<bd?R-a2:a2;a3<0&&(a3=R*2+a3);a2<0&&(a2=R*2+a2);if(S&&a3>a2){a3=a3-R*2;}if(!S&&a2>a3){a2=a2-R*2;}}else{a3=bb[0];a2=bb[1];bd=bb[2];bc=bb[3];}var a7=a2-a3;if(ab.abs(a7)>bf){var be=a2,bh=a8,a5=bD;a2=a3+bf*(S&&a2>a3?1:-1);a8=bd+bi*ab.cos(a2);bD=bc+bg*ab.sin(a2);bm=K(a8,bD,bi,bg,ba,0,S,bh,a5,[a2,be,bd,bc]);}a7=a2-a3;var a1=ab.cos(a3),bC=ab.sin(a3),a0=ab.cos(a2),bB=ab.sin(a2),bp=ab.tan(a7/4),bs=4/3*bi*bp,bq=4/3*bg*bp,bz=[a9,bE],bx=[a9+bs*bC,bE-bq*a1],bw=[a8+bs*bB,bD-bq*a0],bu=[a8,bD];bx[0]=2*bz[0]-bx[0];bx[1]=2*bz[1]-bx[1];if(bb){return[bx,bw,bu][aS](bm);}else{bm=[bx,bw,bu][aS](bm)[az]()[z](",");var bk=[];for(var bv=0,bl=bm[m];bv<bl;bv++){bk[bv]=bv%2?bA(bm[bv-1],bm[bv],d).y:bA(bm[bv],bm[bv+1],d).x;}return bk;}},M=function(e,d,E,i,a2,a1,a0,S,a3){var R=1-a3;return{x:aM(R,3)*e+aM(R,2)*3*a3*E+R*3*a3*a3*a2+aM(a3,3)*a0,y:aM(R,3)*d+aM(R,2)*3*a3*i+R*3*a3*a3*a1+aM(a3,3)*S};},aC=aj(function(i,d,R,E,a9,a8,a5,a2){var a7=(a9-2*R+i)-(a5-2*a9+R),a4=2*(R-i)-2*(a9-R),a1=i-R,a0=(-a4+ab.sqrt(a4*a4-4*a7*a1))/2/a7,S=(-a4-ab.sqrt(a4*a4-4*a7*a1))/2/a7,a3=[d,a2],a6=[i,a5],e;ab.abs(a0)>1000000000000&&(a0=0.5);ab.abs(S)>1000000000000&&(S=0.5);if(a0>0&&a0<1){e=M(i,d,R,E,a9,a8,a5,a2,a0);a6[f](e.x);a3[f](e.y);}if(S>0&&S<1){e=M(i,d,R,E,a9,a8,a5,a2,S);a6[f](e.x);a3[f](e.y);}a7=(a8-2*E+d)-(a2-2*a8+E);a4=2*(E-d)-2*(a8-E);a1=d-E;a0=(-a4+ab.sqrt(a4*a4-4*a7*a1))/2/a7;S=(-a4-ab.sqrt(a4*a4-4*a7*a1))/2/a7;ab.abs(a0)>1000000000000&&(a0=0.5);ab.abs(S)>1000000000000&&(S=0.5);if(a0>0&&a0<1){e=M(i,d,R,E,a9,a8,a5,a2,a0);a6[f](e.x);a3[f](e.y);}if(S>0&&S<1){e=M(i,d,R,E,a9,a8,a5,a2,S);a6[f](e.x);a3[f](e.y);}return{min:{x:aI[aW](0,a6),y:aI[aW](0,a3)},max:{x:g[aW](0,a6),y:g[aW](0,a3)}};}),H=aj(function(a9,a4){var R=r(a9),a5=a4&&r(a4),a6={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},d={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},a0=function(ba,bb){var i,bc;if(!ba){return["C",bb.x,bb.y,bb.x,bb.y,bb.x,bb.y];}!(ba[0] in {T:1,Q:1})&&(bb.qx=bb.qy=null);switch(ba[0]){case"M":bb.X=ba[1];bb.Y=ba[2];break;case"A":ba=["C"][aS](K[aW](0,[bb.x,bb.y][aS](ba.slice(1))));break;case"S":i=bb.x+(bb.x-(bb.bx||bb.x));bc=bb.y+(bb.y-(bb.by||bb.y));ba=["C",i,bc][aS](ba.slice(1));break;case"T":bb.qx=bb.x+(bb.x-(bb.qx||bb.x));bb.qy=bb.y+(bb.y-(bb.qy||bb.y));ba=["C"][aS](aK(bb.x,bb.y,bb.qx,bb.qy,ba[1],ba[2]));break;case"Q":bb.qx=ba[1];bb.qy=ba[2];ba=["C"][aS](aK(bb.x,bb.y,ba[1],ba[2],ba[3],ba[4]));break;case"L":ba=["C"][aS](aX(bb.x,bb.y,ba[1],ba[2]));break;case"H":ba=["C"][aS](aX(bb.x,bb.y,ba[1],bb.y));break;case"V":ba=["C"][aS](aX(bb.x,bb.y,bb.x,ba[1]));break;case"Z":ba=["C"][aS](aX(bb.x,bb.y,bb.X,bb.Y));break;}return ba;},e=function(ba,bb){if(ba[bb][m]>7){ba[bb].shift();var bc=ba[bb];while(bc[m]){ba.splice(bb++,0,["C"][aS](bc.splice(0,6)));}ba.splice(bb,1);a7=g(R[m],a5&&a5[m]||0);}},E=function(be,bd,bb,ba,bc){if(be&&bd&&be[bc][0]=="M"&&bd[bc][0]!="M"){bd.splice(bc,0,["M",ba.x,ba.y]);bb.bx=0;bb.by=0;bb.x=be[bc][1];bb.y=be[bc][2];a7=g(R[m],a5&&a5[m]||0);}};for(var a2=0,a7=g(R[m],a5&&a5[m]||0);a2<a7;a2++){R[a2]=a0(R[a2],a6);e(R,a2);a5&&(a5[a2]=a0(a5[a2],d));a5&&e(a5,a2);E(R,a5,a6,d,a2);E(a5,R,d,a6,a2);var a1=R[a2],a8=a5&&a5[a2],S=a1[m],a3=a5&&a8[m];a6.x=a1[S-2];a6.y=a1[S-1];a6.bx=W(a1[S-4])||a6.x;a6.by=W(a1[S-3])||a6.y;d.bx=a5&&(W(a8[a3-4])||d.x);d.by=a5&&(W(a8[a3-3])||d.y);d.x=a5&&a8[a3-2];d.y=a5&&a8[a3-1];}return a5?[R,a5]:R;},null,av),p=aj(function(a4){var a3=[];for(var a0=0,a5=a4[m];a0<a5;a0++){var e={},a2=a4[a0].match(/^([^:]*):?([\d\.]*)/);e.color=an.getRGB(a2[1]);if(e.color.error){return null;}e.color=e.color.hex;a2[2]&&(e.offset=a2[2]+"%");a3[f](e);}for(var a0=1,a5=a3[m]-1;a0<a5;a0++){if(!a3[a0].offset){var E=W(a3[a0-1].offset||0),R=0;for(var S=a0+1;S<a5;S++){if(a3[S].offset){R=a3[S].offset;break;}}if(!R){R=100;S=a5;}R=W(R);var a1=(R-E)/(S-a0+1);for(;a0<S;a0++){E+=a1;a3[a0].offset=E+"%";}}}return a3;}),ao=function(){var i,e,R,E,d;if(an.is(arguments[0],"string")||an.is(arguments[0],"object")){if(an.is(arguments[0],"string")){i=L.getElementById(arguments[0]);}else{i=arguments[0];}if(i.tagName){if(arguments[1]==null){return{container:i,width:i.style.pixelWidth||i.offsetWidth,height:i.style.pixelHeight||i.offsetHeight};}else{return{container:i,width:arguments[1],height:arguments[2]};}}}else{if(an.is(arguments[0],al)&&arguments[m]>3){return{container:1,x:arguments[0],y:arguments[1],width:arguments[2],height:arguments[3]};}}},aG=function(d,i){var e=this;for(var E in i){if(i[Q](E)&&!(E in d)){switch(typeof i[E]){case"function":(function(R){d[E]=d===e?R:function(){return R[aW](e,arguments);};})(i[E]);break;case"object":d[E]=d[E]||{};aG.call(this,d[E],i[E]);break;default:d[E]=i[E];break;}}}},ak=function(d,e){d==e.top&&(e.top=d.prev);d==e.bottom&&(e.bottom=d.next);d.next&&(d.next.prev=d.prev);d.prev&&(d.prev.next=d.next);},Y=function(d,e){if(e.top===d){return;}ak(d,e);d.next=null;d.prev=e.top;e.top.next=d;e.top=d;},k=function(d,e){if(e.bottom===d){return;}ak(d,e);d.next=e.bottom;d.prev=null;e.bottom.prev=d;e.bottom=d;},A=function(e,d,i){ak(e,i);d==i.top&&(i.top=e);d.next&&(d.next.prev=e);e.next=d.next;e.prev=d;d.next=e;},aq=function(e,d,i){ak(e,i);d==i.bottom&&(i.bottom=e);d.prev&&(d.prev.next=e);e.prev=d.prev;d.prev=e;e.next=d;},s=function(d){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+d+"\u201d of removed object");};},ar=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(an.svg){aT[aY].svgns="http://www.w3.org/2000/svg";aT[aY].xlink="http://www.w3.org/1999/xlink";var O=function(d){return +d+(~~d===d)*0.5;},V=function(S){for(var e=0,E=S[m];e<E;e++){if(aZ.call(S[e][0])!="a"){for(var d=1,R=S[e][m];d<R;d++){S[e][d]=O(S[e][d]);}}else{S[e][6]=O(S[e][6]);S[e][7]=O(S[e][7]);}}return S;},aJ=function(i,d){if(d){for(var e in d){if(d[Q](e)){i[v](e,d[e]);}}}else{return L.createElementNS(aT[aY].svgns,i);}};an[aA]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version;};var q=function(d,E){var e=aJ("path");E.canvas&&E.canvas[aL](e);var i=new ax(e,E);i.type="path";aa(i,{fill:"none",stroke:"#000",path:d});return i;};var b=function(E,a7,d){var a4="linear",a1=0.5,S=0.5,a9=E.style;a7=(a7+at)[aP](ar,function(bb,i,bc){a4="radial";if(i&&bc){a1=W(i);S=W(bc);var ba=((S>0.5)*2-1);aM(a1-0.5,2)+aM(S-0.5,2)>0.25&&(S=ab.sqrt(0.25-aM(a1-0.5,2))*ba+0.5)&&S!=0.5&&(S=S.toFixed(5)-0.00001*ba);}return at;});a7=a7[z](/\s*\-\s*/);if(a4=="linear"){var a0=a7.shift();a0=-W(a0);if(isNaN(a0)){return null;}var R=[0,0,ab.cos(a0*ab.PI/180),ab.sin(a0*ab.PI/180)],a6=1/(g(ab.abs(R[2]),ab.abs(R[3]))||1);R[2]*=a6;R[3]*=a6;if(R[2]<0){R[0]=-R[2];R[2]=0;}if(R[3]<0){R[1]=-R[3];R[3]=0;}}var a3=p(a7);if(!a3){return null;}var e=aJ(a4+"Gradient");e.id="r"+(an._id++)[aA](36);aJ(e,a4=="radial"?{fx:a1,fy:S}:{x1:R[0],y1:R[1],x2:R[2],y2:R[3]});d.defs[aL](e);for(var a2=0,a8=a3[m];a2<a8;a2++){var a5=aJ("stop");aJ(a5,{offset:a3[a2].offset?a3[a2].offset:!a2?"0%":"100%","stop-color":a3[a2].color||"#fff"});e[aL](a5);}aJ(E,{fill:"url(#"+e.id+")",opacity:1,"fill-opacity":1});a9.fill=at;a9.opacity=1;a9.fillOpacity=1;return 1;};var N=function(e){var d=e.getBBox();aJ(e.pattern,{patternTransform:an.format("translate({0},{1})",d.x,d.y)});};var aa=function(a6,bf){var a9={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bb=a6.node,a7=a6.attrs,a3=a6.rotate(),S=function(bm,bl){bl=a9[aZ.call(bl)];if(bl){var bj=bm.attrs["stroke-width"]||"1",bh={round:bj,square:bj,butt:0}[bm.attrs["stroke-linecap"]||bf["stroke-linecap"]]||0,bk=[];var bi=bl[m];while(bi--){bk[bi]=bl[bi]*bj+((bi%2)?1:-1)*bh;}aJ(bb,{"stroke-dasharray":bk[az](",")});}};bf[Q]("rotation")&&(a3=bf.rotation);var a2=(a3+at)[z](a);if(!(a2.length-1)){a2=null;}else{a2[1]=+a2[1];a2[2]=+a2[2];}W(a3)&&a6.rotate(0,true);for(var ba in bf){if(bf[Q](ba)){if(!j[Q](ba)){continue;}var a8=bf[ba];a7[ba]=a8;switch(ba){case"rotation":a6.rotate(a8,true);break;case"href":case"title":case"target":var bd=bb.parentNode;if(aZ.call(bd.tagName)!="a"){var E=aJ("a");bd.insertBefore(E,bb);E[aL](bb);bd=E;}bd.setAttributeNS(a6.paper.xlink,ba,a8);break;case"cursor":bb.style.cursor=a8;break;case"clip-rect":var e=(a8+at)[z](a);if(e[m]==4){a6.clip&&a6.clip.parentNode.parentNode.removeChild(a6.clip.parentNode);var i=aJ("clipPath"),bc=aJ("rect");i.id="r"+(an._id++)[aA](36);aJ(bc,{x:e[0],y:e[1],width:e[2],height:e[3]});i[aL](bc);a6.paper.defs[aL](i);aJ(bb,{"clip-path":"url(#"+i.id+")"});a6.clip=bc;}if(!a8){var be=L.getElementById(bb.getAttribute("clip-path")[aP](/(^url\(#|\)$)/g,at));be&&be.parentNode.removeChild(be);aJ(bb,{"clip-path":at});delete a6.clip;}break;case"path":if(a8&&a6.type=="path"){a7.path=V(r(a8));aJ(bb,{d:a7.path});}break;case"width":bb[v](ba,a8);if(a7.fx){ba="x";a8=a7.x;}else{break;}case"x":if(a7.fx){a8=-a7.x-(a7.width||0);}case"rx":if(ba=="rx"&&a6.type=="rect"){break;}case"cx":a2&&(ba=="x"||ba=="cx")&&(a2[1]+=a8-a7[ba]);bb[v](ba,O(a8));a6.pattern&&N(a6);break;case"height":bb[v](ba,a8);if(a7.fy){ba="y";a8=a7.y;}else{break;}case"y":if(a7.fy){a8=-a7.y-(a7.height||0);}case"ry":if(ba=="ry"&&a6.type=="rect"){break;}case"cy":a2&&(ba=="y"||ba=="cy")&&(a2[2]+=a8-a7[ba]);bb[v](ba,O(a8));a6.pattern&&N(a6);break;case"r":if(a6.type=="rect"){aJ(bb,{rx:a8,ry:a8});}else{bb[v](ba,a8);}break;case"src":if(a6.type=="image"){bb.setAttributeNS(a6.paper.xlink,"href",a8);}break;case"stroke-width":bb.style.strokeWidth=a8;bb[v](ba,a8);if(a7["stroke-dasharray"]){S(a6,a7["stroke-dasharray"]);}break;case"stroke-dasharray":S(a6,a8);break;case"translation":var a0=(a8+at)[z](a);a0[0]=+a0[0]||0;a0[1]=+a0[1]||0;if(a2){a2[1]+=a0[0];a2[2]+=a0[1];}t.call(a6,a0[0],a0[1]);break;case"scale":var a0=(a8+at)[z](a);a6.scale(+a0[0]||1,+a0[1]||+a0[0]||1,+a0[2]||null,+a0[3]||null);break;case"fill":var R=(a8+at).match(c);if(R){var i=aJ("pattern"),a5=aJ("image");i.id="r"+(an._id++)[aA](36);aJ(i,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});aJ(a5,{x:0,y:0});a5.setAttributeNS(a6.paper.xlink,"href",R[1]);i[aL](a5);var bg=L.createElement("img");bg.style.cssText="position:absolute;left:-9999em;top-9999em";bg.onload=function(){aJ(i,{width:this.offsetWidth,height:this.offsetHeight});aJ(a5,{width:this.offsetWidth,height:this.offsetHeight});L.body.removeChild(this);a6.paper.safari();};L.body[aL](bg);bg.src=R[1];a6.paper.defs[aL](i);bb.style.fill="url(#"+i.id+")";aJ(bb,{fill:"url(#"+i.id+")"});a6.pattern=i;a6.pattern&&N(a6);break;}if(!an.getRGB(a8).error){delete bf.gradient;delete a7.gradient;!an.is(a7.opacity,"undefined")&&an.is(bf.opacity,"undefined")&&aJ(bb,{opacity:a7.opacity});!an.is(a7["fill-opacity"],"undefined")&&an.is(bf["fill-opacity"],"undefined")&&aJ(bb,{"fill-opacity":a7["fill-opacity"]});}else{if((({circle:1,ellipse:1})[Q](a6.type)||(a8+at).charAt()!="r")&&b(bb,a8,a6.paper)){a7.gradient=a8;a7.fill="none";break;}}case"stroke":bb[v](ba,an.getRGB(a8).hex);break;case"gradient":(({circle:1,ellipse:1})[Q](a6.type)||(a8+at).charAt()!="r")&&b(bb,a8,a6.paper);break;case"opacity":case"fill-opacity":if(a7.gradient){var d=L.getElementById(bb.getAttribute("fill")[aP](/^url\(#|\)$/g,at));if(d){var a1=d.getElementsByTagName("stop");a1[a1[m]-1][v]("stop-opacity",a8);}break;}default:ba=="font-size"&&(a8=G(a8,10)+"px");var a4=ba[aP](/(\-.)/g,function(bh){return aN.call(bh.substring(1));});bb.style[a4]=a8;bb[v](ba,a8);break;}}}D(a6,bf);if(a2){a6.rotate(a2.join(am));}else{W(a3)&&a6.rotate(a3,true);}};var h=1.2;var D=function(d,R){if(d.type!="text"||!(R[Q]("text")||R[Q]("font")||R[Q]("font-size")||R[Q]("x")||R[Q]("y"))){return;}var a3=d.attrs,e=d.node,a5=e.firstChild?G(L.defaultView.getComputedStyle(e.firstChild,at).getPropertyValue("font-size"),10):10;if(R[Q]("text")){a3.text=R.text;while(e.firstChild){e.removeChild(e.firstChild);}var E=(R.text+at)[z]("\n");for(var S=0,a4=E[m];S<a4;S++){if(E[S]){var a1=aJ("tspan");S&&aJ(a1,{dy:a5*h,x:a3.x});a1[aL](L.createTextNode(E[S]));e[aL](a1);}}}else{var E=e.getElementsByTagName("tspan");for(var S=0,a4=E[m];S<a4;S++){S&&aJ(E[S],{dy:a5*h,x:a3.x});}}aJ(e,{y:a3.y});var a0=d.getBBox(),a2=a3.y-(a0.y+a0.height/2);a2&&isFinite(a2)&&aJ(e,{y:a3.y+a2});};var ax=function(e,d){var E=0,i=0;this[0]=e;this.id=an._oid++;this.node=e;e.raphael=this;this.paper=d;this.attrs=this.attrs||{};this.transformations=[];this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!d.bottom&&(d.bottom=this);this.prev=d.top;d.top&&(d.top.next=this);d.top=this;this.next=null;};ax[aY].rotate=function(e,d,E){if(this.removed){return this;}if(e==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][az](am);}return this._.rt.deg;}var i=this.getBBox();e=(e+at)[z](a);if(e[m]-1){d=W(e[1]);E=W(e[2]);}e=W(e[0]);if(d!=null){this._.rt.deg=e;}else{this._.rt.deg+=e;}(E==null)&&(d=null);this._.rt.cx=d;this._.rt.cy=E;d=d==null?i.x+i.width/2:d;E=E==null?i.y+i.height/2:E;if(this._.rt.deg){this.transformations[0]=an.format("rotate({0} {1} {2})",this._.rt.deg,d,E);this.clip&&aJ(this.clip,{transform:an.format("rotate({0} {1} {2})",-this._.rt.deg,d,E)});}else{this.transformations[0]=at;this.clip&&aJ(this.clip,{transform:at});}aJ(this.node,{transform:this.transformations[az](am)});return this;};ax[aY].hide=function(){!this.removed&&(this.node.style.display="none");return this;};ax[aY].show=function(){!this.removed&&(this.node.style.display="");return this;};ax[aY].remove=function(){if(this.removed){return;}ak(this,this.paper);this.node.parentNode.removeChild(this.node);for(var d in this){delete this[d];}this.removed=true;};ax[aY].getBBox=function(){if(this.removed){return this;}if(this.type=="path"){return U(this.attrs.path);}if(this.node.style.display=="none"){this.show();var E=true;}var a1={};try{a1=this.node.getBBox();}catch(S){}finally{a1=a1||{};}if(this.type=="text"){a1={x:a1.x,y:Infinity,width:0,height:0};for(var d=0,R=this.node.getNumberOfChars();d<R;d++){var a0=this.node.getExtentOfChar(d);(a0.y<a1.y)&&(a1.y=a0.y);(a0.y+a0.height-a1.y>a1.height)&&(a1.height=a0.y+a0.height-a1.y);(a0.x+a0.width-a1.x>a1.width)&&(a1.width=a0.x+a0.width-a1.x);}}E&&this.hide();return a1;};ax[aY].attr=function(){if(this.removed){return this;}if(arguments[m]==0){var R={};for(var E in this.attrs){if(this.attrs[Q](E)){R[E]=this.attrs[E];}}this._.rt.deg&&(R.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(R.scale=this.scale());R.gradient&&R.fill=="none"&&(R.fill=R.gradient)&&delete R.gradient;return R;}if(arguments[m]==1&&an.is(arguments[0],"string")){if(arguments[0]=="translation"){return t.call(this);}if(arguments[0]=="rotation"){return this.rotate();}if(arguments[0]=="scale"){return this.scale();}if(arguments[0]=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient;}return this.attrs[arguments[0]];}if(arguments[m]==1&&an.is(arguments[0],"array")){var d={};for(var e in arguments[0]){if(arguments[0][Q](e)){d[arguments[0][e]]=this.attrs[arguments[0][e]];}}return d;}if(arguments[m]==2){var S={};S[arguments[0]]=arguments[1];aa(this,S);}else{if(arguments[m]==1&&an.is(arguments[0],"object")){aa(this,arguments[0]);}}return this;};ax[aY].toFront=function(){if(this.removed){return this;}this.node.parentNode[aL](this.node);var d=this.paper;d.top!=this&&Y(this,d);return this;};ax[aY].toBack=function(){if(this.removed){return this;}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);k(this,this.paper);var d=this.paper;}return this;};ax[aY].insertAfter=function(d){if(this.removed){return this;}var e=d.node;if(e.nextSibling){e.parentNode.insertBefore(this.node,e.nextSibling);}else{e.parentNode[aL](this.node);}A(this,d,this.paper);return this;};ax[aY].insertBefore=function(d){if(this.removed){return this;}var e=d.node;e.parentNode.insertBefore(this.node,e);aq(this,d,this.paper);return this;};var P=function(e,d,S,R){d=O(d);S=O(S);var E=aJ("circle");e.canvas&&e.canvas[aL](E);var i=new ax(E,e);i.attrs={cx:d,cy:S,r:R,fill:"none",stroke:"#000"};i.type="circle";aJ(E,i.attrs);return i;};var aF=function(i,d,a1,e,S,a0){d=O(d);a1=O(a1);var R=aJ("rect");i.canvas&&i.canvas[aL](R);var E=new ax(R,i);E.attrs={x:d,y:a1,width:e,height:S,r:a0||0,rx:a0||0,ry:a0||0,fill:"none",stroke:"#000"};E.type="rect";aJ(R,E.attrs);return E;};var ai=function(e,d,a0,S,R){d=O(d);a0=O(a0);var E=aJ("ellipse");e.canvas&&e.canvas[aL](E);var i=new ax(E,e);i.attrs={cx:d,cy:a0,rx:S,ry:R,fill:"none",stroke:"#000"};i.type="ellipse";aJ(E,i.attrs);return i;};var o=function(i,a0,d,a1,e,S){var R=aJ("image");aJ(R,{x:d,y:a1,width:e,height:S,preserveAspectRatio:"none"});R.setAttributeNS(i.xlink,"href",a0);i.canvas&&i.canvas[aL](R);var E=new ax(R,i);E.attrs={x:d,y:a1,width:e,height:S,src:a0};E.type="image";return E;};var X=function(e,d,S,R){var E=aJ("text");aJ(E,{x:d,y:S,"text-anchor":"middle"});e.canvas&&e.canvas[aL](E);var i=new ax(E,e);i.attrs={x:d,y:S,"text-anchor":"middle",text:R,font:j.font,stroke:"none",fill:"#000"};i.type="text";aa(i,i.attrs);return i;};var aV=function(e,d){this.width=e||this.width;this.height=d||this.height;this.canvas[v]("width",this.width);this.canvas[v]("height",this.height);return this;};var w=function(){var E=ao[aW](null,arguments),i=E&&E.container,e=E.x,a0=E.y,R=E.width,d=E.height;if(!i){throw new Error("SVG container not found.");}var S=aJ("svg");R=R||512;d=d||342;aJ(S,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:R,height:d});if(i==1){S.style.cssText="position:absolute;left:"+e+"px;top:"+a0+"px";L.body[aL](S);}else{if(i.firstChild){i.insertBefore(S,i.firstChild);}else{i[aL](S);}}i=new aT;i.width=R;i.height=d;i.canvas=S;aG.call(i,i,an.fn);i.clear();return i;};aT[aY].clear=function(){var d=this.canvas;while(d.firstChild){d.removeChild(d.firstChild);}this.bottom=this.top=null;(this.desc=aJ("desc"))[aL](L.createTextNode("Created with Rapha\xebl"));d[aL](this.desc);d[aL](this.defs=aJ("defs"));};aT[aY].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var d in this){this[d]=s(d);}};}if(an.vml){var aH=function(a8){var a5=/[ahqstv]/ig,a0=r;(a8+at).match(a5)&&(a0=H);a5=/[clmz]/g;if(a0==r&&!(a8+at).match(a5)){var e={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},R=/([clmz]),?([^clmz]*)/gi,S=/-?[^,\s-]+/g;var a4=(a8+at)[aP](R,function(a9,bb,i){var ba=[];i[aP](S,function(bc){ba[f](O(bc));});return e[bb]+ba;});return a4;}var a6=a0(a8),E,a4=[],d;for(var a2=0,a7=a6[m];a2<a7;a2++){E=a6[a2];d=aZ.call(a6[a2][0]);d=="z"&&(d="x");for(var a1=1,a3=E[m];a1<a3;a1++){d+=O(E[a1])+(a1!=a3-1?",":at);}a4[f](d);}return a4[az](am);};an[aA]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version;};var q=function(d,S){var E=ah("group");E.style.cssText="position:absolute;left:0;top:0;width:"+S.width+"px;height:"+S.height+"px";E.coordsize=S.coordsize;E.coordorigin=S.coordorigin;var i=ah("shape"),e=i.style;e.width=S.width+"px";e.height=S.height+"px";i.coordsize=this.coordsize;i.coordorigin=this.coordorigin;E[aL](i);var R=new ax(i,E,S);R.isAbsolute=true;R.type="path";R.path=[];R.Path=at;d&&aa(R,{fill:"none",stroke:"#000",path:d});S.canvas[aL](E);return R;};var aa=function(a3,a8){a3.attrs=a3.attrs||{};var a6=a3.node,a9=a3.attrs,a0=a6.style,E,bd=a3;for(var a1 in a8){if(a8[Q](a1)){a9[a1]=a8[a1];}}a8.href&&(a6.href=a8.href);a8.title&&(a6.title=a8.title);a8.target&&(a6.target=a8.target);a8.cursor&&(a0.cursor=a8.cursor);if(a8.path&&a3.type=="path"){a9.path=a8.path;a6.path=aH(a9.path);}if(a8.rotation!=null){a3.rotate(a8.rotation,true);}if(a8.translation){E=(a8.translation+at)[z](a);t.call(a3,E[0],E[1]);if(a3._.rt.cx!=null){a3._.rt.cx+=+E[0];a3._.rt.cy+=+E[1];a3.setBox(a3.attrs,E[0],E[1]);}}if(a8.scale){E=(a8.scale+at)[z](a);a3.scale(+E[0]||1,+E[1]||+E[0]||1,+E[2]||null,+E[3]||null);}if("clip-rect" in a8){var d=(a8["clip-rect"]+at)[z](a);if(d[m]==4){d[2]=+d[2]+(+d[0]);d[3]=+d[3]+(+d[1]);var a2=a6.clipRect||L.createElement("div"),bc=a2.style,S=a6.parentNode;bc.clip=an.format("rect({1}px {2}px {3}px {0}px)",d);if(!a6.clipRect){bc.position="absolute";bc.top=0;bc.left=0;bc.width=a3.paper.width+"px";bc.height=a3.paper.height+"px";S.parentNode.insertBefore(a2,S);a2[aL](S);a6.clipRect=a2;}}if(!a8["clip-rect"]){a6.clipRect&&(a6.clipRect.style.clip=at);}}if(a3.type=="image"&&a8.src){a6.src=a8.src;}if(a3.type=="image"&&a8.opacity){a6.filterOpacity=" progid:DXImageTransform.Microsoft.Alpha(opacity="+(a8.opacity*100)+")";a0.filter=(a6.filterMatrix||at)+(a6.filterOpacity||at);}a8.font&&(a0.font=a8.font);a8["font-family"]&&(a0.fontFamily='"'+a8["font-family"][z](",")[0][aP](/^['"]+|['"]+$/g,at)+'"');a8["font-size"]&&(a0.fontSize=a8["font-size"]);a8["font-weight"]&&(a0.fontWeight=a8["font-weight"]);a8["font-style"]&&(a0.fontStyle=a8["font-style"]);if(a8.opacity!=null||a8["stroke-width"]!=null||a8.fill!=null||a8.stroke!=null||a8["stroke-width"]!=null||a8["stroke-opacity"]!=null||a8["fill-opacity"]!=null||a8["stroke-dasharray"]!=null||a8["stroke-miterlimit"]!=null||a8["stroke-linejoin"]!=null||a8["stroke-linecap"]!=null){a6=a3.shape||a6;var a7=(a6.getElementsByTagName("fill")&&a6.getElementsByTagName("fill")[0]),ba=false;!a7&&(ba=a7=ah("fill"));if("fill-opacity" in a8||"opacity" in a8){var e=((+a9["fill-opacity"]+1||2)-1)*((+a9.opacity+1||2)-1);e<0&&(e=0);e>1&&(e=1);a7.opacity=e;}a8.fill&&(a7.on=true);if(a7.on==null||a8.fill=="none"){a7.on=false;}if(a7.on&&a8.fill){var i=a8.fill.match(c);if(i){a7.src=i[1];a7.type="tile";}else{a7.color=an.getRGB(a8.fill).hex;a7.src=at;a7.type="solid";if(an.getRGB(a8.fill).error&&(bd.type in {circle:1,ellipse:1}||(a8.fill+at).charAt()!="r")&&b(bd,a8.fill)){a9.fill="none";a9.gradient=a8.fill;}}}ba&&a6[aL](a7);var R=(a6.getElementsByTagName("stroke")&&a6.getElementsByTagName("stroke")[0]),bb=false;!R&&(bb=R=ah("stroke"));if((a8.stroke&&a8.stroke!="none")||a8["stroke-width"]||a8["stroke-opacity"]!=null||a8["stroke-dasharray"]||a8["stroke-miterlimit"]||a8["stroke-linejoin"]||a8["stroke-linecap"]){R.on=true;}(a8.stroke=="none"||R.on==null||a8.stroke==0||a8["stroke-width"]==0)&&(R.on=false);R.on&&a8.stroke&&(R.color=an.getRGB(a8.stroke).hex);var e=((+a9["stroke-opacity"]+1||2)-1)*((+a9.opacity+1||2)-1),a4=(W(a8["stroke-width"])||1)*0.75;e<0&&(e=0);e>1&&(e=1);a8["stroke-width"]==null&&(a4=a9["stroke-width"]);a8["stroke-width"]&&(R.weight=a4);a4&&a4<1&&(e*=a4)&&(R.weight=1);R.opacity=e;a8["stroke-linejoin"]&&(R.joinstyle=a8["stroke-linejoin"]||"miter");R.miterlimit=a8["stroke-miterlimit"]||8;a8["stroke-linecap"]&&(R.endcap=a8["stroke-linecap"]=="butt"?"flat":a8["stroke-linecap"]=="square"?"square":"round");if(a8["stroke-dasharray"]){var a5={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};R.dashstyle=a5[Q](a8["stroke-dasharray"])?a5[a8["stroke-dasharray"]]:at;}bb&&a6[aL](R);}if(bd.type=="text"){var a0=bd.paper.span.style;a9.font&&(a0.font=a9.font);a9["font-family"]&&(a0.fontFamily=a9["font-family"]);a9["font-size"]&&(a0.fontSize=a9["font-size"]);a9["font-weight"]&&(a0.fontWeight=a9["font-weight"]);a9["font-style"]&&(a0.fontStyle=a9["font-style"]);bd.node.string&&(bd.paper.span.innerHTML=(bd.node.string+at)[aP](/</g,"&#60;")[aP](/&/g,"&#38;")[aP](/\n/g,"<br>"));bd.W=a9.w=bd.paper.span.offsetWidth;bd.H=a9.h=bd.paper.span.offsetHeight;bd.X=a9.x;bd.Y=a9.y+O(bd.H/2);switch(a9["text-anchor"]){case"start":bd.node.style["v-text-align"]="left";bd.bbx=O(bd.W/2);break;case"end":bd.node.style["v-text-align"]="right";bd.bbx=-O(bd.W/2);break;default:bd.node.style["v-text-align"]="center";break;}}};var b=function(d,a1){d.attrs=d.attrs||{};var a2=d.attrs,a4=d.node.getElementsByTagName("fill"),S="linear",a0=".5 .5";d.attrs.gradient=a1;a1=(a1+at)[aP](ar,function(a6,a7,i){S="radial";if(a7&&i){a7=W(a7);i=W(i);aM(a7-0.5,2)+aM(i-0.5,2)>0.25&&(i=ab.sqrt(0.25-aM(a7-0.5,2))*((i>0.5)*2-1)+0.5);a0=a7+am+i;}return at;});a1=a1[z](/\s*\-\s*/);if(S=="linear"){var e=a1.shift();e=-W(e);if(isNaN(e)){return null;}}var R=p(a1);if(!R){return null;}d=d.shape||d.node;a4=a4[0]||ah("fill");if(R[m]){a4.on=true;a4.method="none";a4.type=(S=="radial")?"gradientradial":"gradient";a4.color=R[0].color;a4.color2=R[R[m]-1].color;var a5=[];for(var E=0,a3=R[m];E<a3;E++){R[E].offset&&a5[f](R[E].offset+am+R[E].color);}a4.colors&&(a4.colors.value=a5[m]?a5[az](","):"0% "+a4.color);if(S=="radial"){a4.focus="100%";a4.focussize=a0;a4.focusposition=a0;}else{a4.angle=(270-e)%360;}}return 1;};var ax=function(R,a0,d){var S=0,i=0,e=0,E=1;this[0]=R;this.id=an._oid++;this.node=R;R.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=a0;this.paper=d;this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!d.bottom&&(d.bottom=this);this.prev=d.top;d.top&&(d.top.next=this);d.top=this;this.next=null;};ax[aY].rotate=function(e,d,i){if(this.removed){return this;}if(e==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][az](am);}return this._.rt.deg;}e=(e+at)[z](a);if(e[m]-1){d=W(e[1]);i=W(e[2]);}e=W(e[0]);if(d!=null){this._.rt.deg=e;}else{this._.rt.deg+=e;}i==null&&(d=null);this._.rt.cx=d;this._.rt.cy=i;this.setBox(this.attrs,d,i);this.Group.style.rotation=this._.rt.deg;return this;};ax[aY].setBox=function(bb,e,d){if(this.removed){return this;}var a5=this.Group.style,R=(this.shape&&this.shape.style)||this.node.style;bb=bb||{};for(var a9 in bb){if(bb[Q](a9)){this.attrs[a9]=bb[a9];}}e=e||this._.rt.cx;d=d||this._.rt.cy;var a7=this.attrs,a1,a0,a2,ba;switch(this.type){case"circle":a1=a7.cx-a7.r;a0=a7.cy-a7.r;a2=ba=a7.r*2;break;case"ellipse":a1=a7.cx-a7.rx;a0=a7.cy-a7.ry;a2=a7.rx*2;ba=a7.ry*2;break;case"rect":case"image":a1=+a7.x;a0=+a7.y;a2=a7.width||0;ba=a7.height||0;break;case"text":this.textpath.v=["m",O(a7.x),", ",O(a7.y-2),"l",O(a7.x)+1,", ",O(a7.y-2)][az](at);a1=a7.x-O(this.W/2);a0=a7.y-this.H/2;a2=this.W;ba=this.H;break;case"path":if(!this.attrs.path){a1=0;a0=0;a2=this.paper.width;ba=this.paper.height;}else{var a8=U(this.attrs.path);a1=a8.x;a0=a8.y;a2=a8.width;ba=a8.height;}break;default:a1=0;a0=0;a2=this.paper.width;ba=this.paper.height;break;}e=(e==null)?a1+a2/2:e;d=(d==null)?a0+ba/2:d;var E=e-this.paper.width/2,a4=d-this.paper.height/2;if(this.type=="path"||this.type=="text"){(a5.left!=E+"px")&&(a5.left=E+"px");(a5.top!=a4+"px")&&(a5.top=a4+"px");this.X=this.type=="text"?a1:-E;this.Y=this.type=="text"?a0:-a4;this.W=a2;this.H=ba;(R.left!=-E+"px")&&(R.left=-E+"px");(R.top!=-a4+"px")&&(R.top=-a4+"px");}else{(a5.left!=E+"px")&&(a5.left=E+"px");(a5.top!=a4+"px")&&(a5.top=a4+"px");this.X=a1;this.Y=a0;this.W=a2;this.H=ba;(a5.width!=this.paper.width+"px")&&(a5.width=this.paper.width+"px");(a5.height!=this.paper.height+"px")&&(a5.height=this.paper.height+"px");(R.left!=a1-E+"px")&&(R.left=a1-E+"px");(R.top!=a0-a4+"px")&&(R.top=a0-a4+"px");(R.width!=a2+"px")&&(R.width=a2+"px");(R.height!=ba+"px")&&(R.height=ba+"px");var S=(+bb.r||0)/aI(a2,ba);if(this.type=="rect"&&this.arcsize.toFixed(4)!=S.toFixed(4)&&(S||this.arcsize)){var a6=ah("roundrect"),bc={},a9=0,a3=this.events&&this.events[m];a6.arcsize=S;a6.raphael=this;this.Group[aL](a6);this.Group.removeChild(this.node);this[0]=this.node=a6;this.arcsize=S;for(var a9 in a7){bc[a9]=a7[a9];}delete bc.scale;this.attr(bc);if(this.events){for(;a9<a3;a9++){this.events[a9].unbind=ae(this.node,this.events[a9].name,this.events[a9].f,this);}}}}};ax[aY].hide=function(){!this.removed&&(this.Group.style.display="none");return this;};ax[aY].show=function(){!this.removed&&(this.Group.style.display="block");return this;};ax[aY].getBBox=function(){if(this.removed){return this;}if(this.type=="path"){return U(this.attrs.path);}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H};};ax[aY].remove=function(){if(this.removed){return;}ak(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);this.shape&&this.shape.parentNode.removeChild(this.shape);for(var d in this){delete this[d];}this.removed=true;};ax[aY].attr=function(){if(this.removed){return this;}if(arguments[m]==0){var E={};for(var e in this.attrs){if(this.attrs[Q](e)){E[e]=this.attrs[e];}}this._.rt.deg&&(E.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(E.scale=this.scale());E.gradient&&E.fill=="none"&&(E.fill=E.gradient)&&delete E.gradient;return E;}if(arguments[m]==1&&an.is(arguments[0],"string")){if(arguments[0]=="translation"){return t.call(this);}if(arguments[0]=="rotation"){return this.rotate();}if(arguments[0]=="scale"){return this.scale();}if(arguments[0]=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient;}return this.attrs[arguments[0]];}if(this.attrs&&arguments[m]==1&&an.is(arguments[0],"array")){var d={};for(var e=0,R=arguments[0][m];e<R;e++){d[arguments[0][e]]=this.attrs[arguments[0][e]];}return d;}var S;if(arguments[m]==2){S={};S[arguments[0]]=arguments[1];}arguments[m]==1&&an.is(arguments[0],"object")&&(S=arguments[0]);if(S){if(S.text&&this.type=="text"){this.node.string=S.text;}aa(this,S);if(S.gradient&&(({circle:1,ellipse:1})[Q](this.type)||(S.gradient+at).charAt()!="r")){b(this,S.gradient);}(this.type!="path"||this._.rt.deg)&&this.setBox(this.attrs);}return this;};ax[aY].toFront=function(){!this.removed&&this.Group.parentNode[aL](this.Group);this.paper.top!=this&&Y(this,this.paper);return this;};ax[aY].toBack=function(){if(this.removed){return this;}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);k(this,this.paper);}return this;};ax[aY].insertAfter=function(d){if(this.removed){return this;}if(d.Group.nextSibling){d.Group.parentNode.insertBefore(this.Group,d.Group.nextSibling);}else{d.Group.parentNode[aL](this.Group);}A(this,d,this.paper);return this;};ax[aY].insertBefore=function(d){if(this.removed){return this;}d.Group.parentNode.insertBefore(this.Group,d.Group);aq(this,d,this.paper);return this;};var P=function(e,d,a1,S){var R=ah("group"),a0=ah("oval"),i=a0.style;R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";R.coordsize=e.coordsize;R.coordorigin=e.coordorigin;R[aL](a0);var E=new ax(a0,R,e);E.type="circle";aa(E,{stroke:"#000",fill:"none"});E.attrs.cx=d;E.attrs.cy=a1;E.attrs.r=S;E.setBox({x:d-S,y:a1-S,width:S*2,height:S*2});e.canvas[aL](R);return E;},aF=function(e,a1,a0,a2,E,d){var R=ah("group"),i=ah("roundrect"),a3=(+d||0)/(aI(a2,E));R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";R.coordsize=e.coordsize;R.coordorigin=e.coordorigin;R[aL](i);i.arcsize=a3;var S=new ax(i,R,e);S.type="rect";aa(S,{stroke:"#000"});S.arcsize=a3;S.setBox({x:a1,y:a0,width:a2,height:E,r:d});e.canvas[aL](R);return S;},ai=function(d,a2,a1,i,e){var R=ah("group"),E=ah("oval"),a0=E.style;R.style.cssText="position:absolute;left:0;top:0;width:"+d.width+"px;height:"+d.height+"px";R.coordsize=d.coordsize;R.coordorigin=d.coordorigin;R[aL](E);var S=new ax(E,R,d);S.type="ellipse";aa(S,{stroke:"#000"});S.attrs.cx=a2;S.attrs.cy=a1;S.attrs.rx=i;S.attrs.ry=e;S.setBox({x:a2-i,y:a1-e,width:i*2,height:e*2});d.canvas[aL](R);return S;},o=function(e,d,a2,a1,a3,E){var R=ah("group"),i=ah("image"),a0=i.style;R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";R.coordsize=e.coordsize;R.coordorigin=e.coordorigin;i.src=d;R[aL](i);var S=new ax(i,R,e);S.type="image";S.attrs.src=d;S.attrs.x=a2;S.attrs.y=a1;S.attrs.w=a3;S.attrs.h=E;S.setBox({x:a2,y:a1,width:a3,height:E});e.canvas[aL](R);return S;},X=function(e,a2,a1,a3){var R=ah("group"),E=ah("shape"),a0=E.style,a4=ah("path"),d=a4.style,i=ah("textpath");R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";R.coordsize=e.coordsize;R.coordorigin=e.coordorigin;a4.v=an.format("m{0},{1}l{2},{1}",O(a2),O(a1),O(a2)+1);a4.textpathok=true;a0.width=e.width;a0.height=e.height;i.string=a3+at;i.on=true;E[aL](i);E[aL](a4);R[aL](E);var S=new ax(i,R,e);S.shape=E;S.textpath=a4;S.type="text";S.attrs.text=a3;S.attrs.x=a2;S.attrs.y=a1;S.attrs.w=1;S.attrs.h=1;aa(S,{font:j.font,stroke:"none",fill:"#000"});S.setBox();e.canvas[aL](R);return S;},aV=function(i,d){var e=this.canvas.style;i==+i&&(i+="px");d==+d&&(d+="px");e.width=i;e.height=d;e.clip="rect(0 "+i+" "+d+" 0)";return this;},ah;L.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!L.namespaces.rvml&&L.namespaces.add("rvml","urn:schemas-microsoft-com:vml");ah=function(d){return L.createElement("<rvml:"+d+' class="rvml">');};}catch(af){ah=function(d){return L.createElement("<"+d+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');};}var w=function(){var i=ao[aW](null,arguments),d=i.container,a2=i.height,a3,e=i.width,a1=i.x,a0=i.y;if(!d){throw new Error("VML container not found.");}var R=new aT,S=R.canvas=L.createElement("div"),E=S.style;e=e||512;a2=a2||342;e==+e&&(e+="px");a2==+a2&&(a2+="px");R.width=1000;R.height=1000;R.coordsize="1000 1000";R.coordorigin="0 0";R.span=L.createElement("span");R.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";S[aL](R.span);E.cssText=an.format("width:{0};height:{1};position:absolute;clip:rect(0 {0} {1} 0);overflow:hidden",e,a2);if(d==1){L.body[aL](S);E.left=a1+"px";E.top=a0+"px";}else{d.style.width=e;d.style.height=a2;if(d.firstChild){d.insertBefore(S,d.firstChild);}else{d[aL](S);}}aG.call(R,R,an.fn);return R;};aT[aY].clear=function(){this.canvas.innerHTML=at;this.span=L.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";this.canvas[aL](this.span);this.bottom=this.top=null;};aT[aY].remove=function(){this.canvas.parentNode.removeChild(this.canvas);for(var d in this){this[d]=s(d);}};}if((/^Apple|^Google/).test(navigator.vendor)&&!(navigator.userAgent.indexOf("Version/4.0")+1)){aT[aY].safari=function(){var d=this.rect(-99,-99,this.width+99,this.height+99);setTimeout(function(){d.remove();});};}else{aT[aY].safari=function(){};}var ae=(function(){if(L.addEventListener){return function(R,i,e,d){var E=function(S){return e.call(d,S);};R.addEventListener(i,E,false);return function(){R.removeEventListener(i,E,false);return true;};};}else{if(L.attachEvent){return function(S,E,i,e){var R=function(a0){return i.call(e,a0||au.event);};S.attachEvent("on"+E,R);var d=function(){S.detachEvent("on"+E,R);return true;};return d;};}}})();for(var ac=F[m];ac--;){(function(d){ax[aY][d]=function(e){if(an.is(e,"function")){this.events=this.events||[];this.events.push({name:d,f:e,unbind:ae(this.shape||this.node,d,e,this)});}return this;};ax[aY]["un"+d]=function(E){var i=this.events,e=i[m];while(e--){if(i[e].name==d&&i[e].f==E){i[e].unbind();i.splice(e,1);!i.length&&delete this.events;return this;}}return this;};})(F[ac]);}ax[aY].hover=function(e,d){return this.mouseover(e).mouseout(d);};ax[aY].unhover=function(e,d){return this.unmouseover(e).unmouseout(d);};aT[aY].circle=function(d,i,e){return P(this,d||0,i||0,e||0);};aT[aY].rect=function(d,R,e,i,E){return aF(this,d||0,R||0,e||0,i||0,E||0);};aT[aY].ellipse=function(d,E,i,e){return ai(this,d||0,E||0,i||0,e||0);};aT[aY].path=function(d){d&&!an.is(d,"string")&&!an.is(d[0],"array")&&(d+=at);return q(an.format[aW](an,arguments),this);};aT[aY].image=function(E,d,R,e,i){return o(this,E||"about:blank",d||0,R||0,e||0,i||0);};aT[aY].text=function(d,i,e){return X(this,d||0,i||0,e||at);};aT[aY].set=function(d){arguments[m]>1&&(d=Array[aY].splice.call(arguments,0,arguments[m]));return new T(d);};aT[aY].setSize=aV;aT[aY].top=aT[aY].bottom=null;aT[aY].raphael=an;function u(){return this.x+am+this.y;}ax[aY].scale=function(a6,a5,E,e){if(a6==null&&a5==null){return{x:this._.sx,y:this._.sy,toString:u};}a5=a5||a6;!+a5&&(a5=a6);var ba,a8,a9,a7,bm=this.attrs;if(a6!=0){var a4=this.getBBox(),a1=a4.x+a4.width/2,R=a4.y+a4.height/2,bl=a6/this._.sx,bk=a5/this._.sy;E=(+E||E==0)?E:a1;e=(+e||e==0)?e:R;var a3=~~(a6/ab.abs(a6)),a0=~~(a5/ab.abs(a5)),be=this.node.style,bo=E+(a1-E)*bl,bn=e+(R-e)*bk;switch(this.type){case"rect":case"image":var a2=bm.width*a3*bl,bd=bm.height*a0*bk;this.attr({height:bd,r:bm.r*aI(a3*bl,a0*bk),width:a2,x:bo-a2/2,y:bn-bd/2});break;case"circle":case"ellipse":this.attr({rx:bm.rx*a3*bl,ry:bm.ry*a0*bk,r:bm.r*aI(a3*bl,a0*bk),cx:bo,cy:bn});break;case"path":var bg=ad(bm.path),bh=true;for(var bj=0,bc=bg[m];bj<bc;bj++){var bf=bg[bj],bi,S=aN.call(bf[0]);if(S=="M"&&bh){continue;}else{bh=false;}if(S=="A"){bf[bg[bj][m]-2]*=bl;bf[bg[bj][m]-1]*=bk;bf[1]*=a3*bl;bf[2]*=a0*bk;bf[5]=+(a3+a0?!!+bf[5]:!+bf[5]);}else{if(S=="H"){for(bi=1,jj=bf[m];bi<jj;bi++){bf[bi]*=bl;}}else{if(S=="V"){for(bi=1,jj=bf[m];bi<jj;bi++){bf[bi]*=bk;}}else{for(bi=1,jj=bf[m];bi<jj;bi++){bf[bi]*=(bi%2)?bl:bk;}}}}}var d=U(bg),ba=bo-d.x-d.width/2,a8=bn-d.y-d.height/2;bg[0][1]+=ba;bg[0][2]+=a8;this.attr({path:bg});break;}if(this.type in {text:1,image:1}&&(a3!=1||a0!=1)){if(this.transformations){this.transformations[2]="scale("[aS](a3,",",a0,")");this.node[v]("transform",this.transformations[az](am));ba=(a3==-1)?-bm.x-(a2||0):bm.x;a8=(a0==-1)?-bm.y-(bd||0):bm.y;this.attr({x:ba,y:a8});bm.fx=a3-1;bm.fy=a0-1;}else{this.node.filterMatrix=" progid:DXImageTransform.Microsoft.Matrix(M11="[aS](a3,", M12=0, M21=0, M22=",a0,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");be.filter=(this.node.filterMatrix||at)+(this.node.filterOpacity||at);}}else{if(this.transformations){this.transformations[2]=at;this.node[v]("transform",this.transformations[az](am));bm.fx=0;bm.fy=0;}else{this.node.filterMatrix=at;be.filter=(this.node.filterMatrix||at)+(this.node.filterOpacity||at);}}bm.scale=[a6,a5,E,e][az](am);this._.sx=a6;this._.sy=a5;}return this;};ax[aY].clone=function(){var d=this.attr();delete d.scale;delete d.translation;return this.paper[this.type]().attr(d);};var aB=function(d,e){return function(a9,S,a0){a9=H(a9);var a5,a4,E,a1,R="",a8={},a6,a3=0;for(var a2=0,a7=a9.length;a2<a7;a2++){E=a9[a2];if(E[0]=="M"){a5=+E[1];a4=+E[2];}else{a1=n(a5,a4,E[1],E[2],E[3],E[4],E[5],E[6]);if(a3+a1>S){if(e&&!a8.start){a6=an.findDotsAtSegment(a5,a4,E[1],E[2],E[3],E[4],E[5],E[6],(S-a3)/a1);R+=["C",a6.start.x,a6.start.y,a6.m.x,a6.m.y,a6.x,a6.y];if(a0){return R;}a8.start=R;R=["M",a6.x,a6.y+"C",a6.n.x,a6.n.y,a6.end.x,a6.end.y,E[5],E[6]][az]();a3+=a1;a5=+E[5];a4=+E[6];continue;}if(!d&&!e){a6=an.findDotsAtSegment(a5,a4,E[1],E[2],E[3],E[4],E[5],E[6],(S-a3)/a1);return{x:a6.x,y:a6.y,alpha:a6.alpha};}}a3+=a1;a5=+E[5];a4=+E[6];}R+=E;}a8.end=R;a6=d?a3:e?a8:an.findDotsAtSegment(a5,a4,E[1],E[2],E[3],E[4],E[5],E[6],1);a6.alpha&&(a6={x:a6.x,y:a6.y,alpha:a6.alpha});return a6;};},n=aj(function(E,d,a0,S,a6,a5,a4,a3){var R={x:0,y:0},a2=0;for(var a1=0;a1<1.01;a1+=0.01){var e=M(E,d,a0,S,a6,a5,a4,a3,a1);a1&&(a2+=ab.sqrt(aM(R.x-e.x,2)+aM(R.y-e.y,2)));R=e;}return a2;});var ap=aB(1),C=aB(),J=aB(0,1);ax[aY].getTotalLength=function(){if(this.type!="path"){return;}return ap(this.attrs.path);};ax[aY].getPointAtLength=function(d){if(this.type!="path"){return;}return C(this.attrs.path,d);};ax[aY].getSubpath=function(i,e){if(this.type!="path"){return;}if(ab.abs(this.getTotalLength()-e)<0.000001){return J(this.attrs.path,i).end;}var d=J(this.attrs.path,e,1);return i?J(d,i).end:d;};an.easing_formulas={linear:function(d){return d;},"<":function(d){return aM(d,3);},">":function(d){return aM(d-1,3)+1;},"<>":function(d){d=d*2;if(d<1){return aM(d,3)/2;}d-=2;return(aM(d,3)+2)/2;},backIn:function(e){var d=1.70158;return e*e*((d+1)*e-d);},backOut:function(e){e=e-1;var d=1.70158;return e*e*((d+1)*e+d)+1;},elastic:function(i){if(i==0||i==1){return i;}var e=0.3,d=e/4;return aM(2,-10*i)*ab.sin((i-d)*(2*ab.PI)/e)+1;},bounce:function(E){var e=7.5625,i=2.75,d;if(E<(1/i)){d=e*E*E;}else{if(E<(2/i)){E-=(1.5/i);d=e*E*E+0.75;}else{if(E<(2.5/i)){E-=(2.25/i);d=e*E*E+0.9375;}else{E-=(2.625/i);d=e*E*E+0.984375;}}}return d;}};var I={length:0},aR=function(){var a2=+new Date;for(var be in I){if(be!="length"&&I[Q](be)){var bj=I[be];if(bj.stop){delete I[be];I[m]--;continue;}var a0=a2-bj.start,bb=bj.ms,ba=bj.easing,bf=bj.from,a7=bj.diff,E=bj.to,a6=bj.t,a9=bj.prev||0,a1=bj.el,R=bj.callback,a8={},d;if(a0<bb){var S=an.easing_formulas[ba]?an.easing_formulas[ba](a0/bb):a0/bb;for(var bc in bf){if(bf[Q](bc)){switch(Z[bc]){case"along":d=S*bb*a7[bc];E.back&&(d=E.len-d);var bd=C(E[bc],d);a1.translate(a7.sx-a7.x||0,a7.sy-a7.y||0);a7.x=bd.x;a7.y=bd.y;a1.translate(bd.x-a7.sx,bd.y-a7.sy);E.rot&&a1.rotate(a7.r+bd.alpha,bd.x,bd.y);break;case"number":d=+bf[bc]+S*bb*a7[bc];break;case"colour":d="rgb("+[B(O(bf[bc].r+S*bb*a7[bc].r)),B(O(bf[bc].g+S*bb*a7[bc].g)),B(O(bf[bc].b+S*bb*a7[bc].b))][az](",")+")";break;case"path":d=[];for(var bh=0,a5=bf[bc][m];bh<a5;bh++){d[bh]=[bf[bc][bh][0]];for(var bg=1,bi=bf[bc][bh][m];bg<bi;bg++){d[bh][bg]=+bf[bc][bh][bg]+S*bb*a7[bc][bh][bg];}d[bh]=d[bh][az](am);}d=d[az](am);break;case"csv":switch(bc){case"translation":var a4=a7[bc][0]*(a0-a9),a3=a7[bc][1]*(a0-a9);a6.x+=a4;a6.y+=a3;d=a4+am+a3;break;case"rotation":d=+bf[bc][0]+S*bb*a7[bc][0];bf[bc][1]&&(d+=","+bf[bc][1]+","+bf[bc][2]);break;case"scale":d=[+bf[bc][0]+S*bb*a7[bc][0],+bf[bc][1]+S*bb*a7[bc][1],(2 in E[bc]?E[bc][2]:at),(3 in E[bc]?E[bc][3]:at)][az](am);break;case"clip-rect":d=[];var bh=4;while(bh--){d[bh]=+bf[bc][bh]+S*bb*a7[bc][bh];}break;}break;}a8[bc]=d;}}a1.attr(a8);a1._run&&a1._run.call(a1);}else{if(E.along){var bd=C(E.along,E.len*!E.back);a1.translate(a7.sx-(a7.x||0)+bd.x-a7.sx,a7.sy-(a7.y||0)+bd.y-a7.sy);E.rot&&a1.rotate(a7.r+bd.alpha,bd.x,bd.y);}(a6.x||a6.y)&&a1.translate(-a6.x,-a6.y);E.scale&&(E.scale=E.scale+at);a1.attr(E);delete I[be];I[m]--;a1.in_animation=null;an.is(R,"function")&&R.call(a1);}bj.prev=a0;}}an.svg&&a1&&a1.paper.safari();I[m]&&setTimeout(aR);},B=function(d){return d>255?255:(d<0?0:d);},t=function(d,i){if(d==null){return{x:this._.tx,y:this._.ty,toString:u};}this._.tx+=+d;this._.ty+=+i;switch(this.type){case"circle":case"ellipse":this.attr({cx:+d+this.attrs.cx,cy:+i+this.attrs.cy});break;case"rect":case"image":case"text":this.attr({x:+d+this.attrs.x,y:+i+this.attrs.y});break;case"path":var e=ad(this.attrs.path);e[0][1]+=+d;e[0][2]+=+i;this.attr({path:e});break;}return this;};ax[aY].animateWith=function(e,i,d,R,E){I[e.id]&&(i.start=I[e.id].start);return this.animate(i,d,R,E);};ax[aY].animateAlong=ay();ax[aY].animateAlongBack=ay(1);function ay(d){return function(E,i,e,S){var R={back:d};an.is(e,"function")?(S=e):(R.rot=e);E&&E.constructor==ax&&(E=E.attrs.path);E&&(R.along=E);return this.animate(R,i,S);};}ax[aY].onAnimation=function(d){this._run=d||0;return this;};ax[aY].animate=function(be,a5,a4,E){if(an.is(a4,"function")||!a4){E=a4||null;}var a9={},e={},a2={};for(var a6 in be){if(be[Q](a6)){if(Z[Q](a6)){a9[a6]=this.attr(a6);(a9[a6]==null)&&(a9[a6]=j[a6]);e[a6]=be[a6];switch(Z[a6]){case"along":var bc=ap(be[a6]),a7=C(be[a6],bc*!!be.back),R=this.getBBox();a2[a6]=bc/a5;a2.tx=R.x;a2.ty=R.y;a2.sx=a7.x;a2.sy=a7.y;e.rot=be.rot;e.back=be.back;e.len=bc;be.rot&&(a2.r=W(this.rotate())||0);break;case"number":a2[a6]=(e[a6]-a9[a6])/a5;break;case"colour":a9[a6]=an.getRGB(a9[a6]);var a8=an.getRGB(e[a6]);a2[a6]={r:(a8.r-a9[a6].r)/a5,g:(a8.g-a9[a6].g)/a5,b:(a8.b-a9[a6].b)/a5};break;case"path":var S=H(a9[a6],e[a6]);a9[a6]=S[0];var a3=S[1];a2[a6]=[];for(var bb=0,a1=a9[a6][m];bb<a1;bb++){a2[a6][bb]=[0];for(var ba=1,bd=a9[a6][bb][m];ba<bd;ba++){a2[a6][bb][ba]=(a3[bb][ba]-a9[a6][bb][ba])/a5;}}break;case"csv":var d=(be[a6]+at)[z](a),a0=(a9[a6]+at)[z](a);switch(a6){case"translation":a9[a6]=[0,0];a2[a6]=[d[0]/a5,d[1]/a5];break;case"rotation":a9[a6]=(a0[1]==d[1]&&a0[2]==d[2])?a0:[0,d[1],d[2]];a2[a6]=[(d[0]-a9[a6][0])/a5,0,0];break;case"scale":be[a6]=d;a9[a6]=(a9[a6]+at)[z](a);a2[a6]=[(d[0]-a9[a6][0])/a5,(d[1]-a9[a6][1])/a5,0,0];break;case"clip-rect":a9[a6]=(a9[a6]+at)[z](a);a2[a6]=[];var bb=4;while(bb--){a2[a6][bb]=(d[bb]-a9[a6][bb])/a5;}break;}e[a6]=d;}}}}this.stop();this.in_animation=1;I[this.id]={start:be.start||+new Date,ms:a5,easing:a4,from:a9,diff:a2,to:e,el:this,callback:E,t:{x:0,y:0}};++I[m]==1&&aR();return this;};ax[aY].stop=function(){I[this.id]&&I[m]--;delete I[this.id];return this;};ax[aY].translate=function(d,e){return this.attr({translation:d+" "+e});};ax[aY][aA]=function(){return"Rapha\xebl\u2019s object";};an.ae=I;var T=function(d){this.items=[];this[m]=0;if(d){for(var e=0,E=d[m];e<E;e++){if(d[e]&&(d[e].constructor==ax||d[e].constructor==T)){this[this.items[m]]=this.items[this.items[m]]=d[e];this[m]++;}}}};T[aY][f]=function(){var R,d;for(var e=0,E=arguments[m];e<E;e++){R=arguments[e];if(R&&(R.constructor==ax||R.constructor==T)){d=this.items[m];this[d]=this.items[d]=R;this[m]++;}}return this;};T[aY].pop=function(){delete this[this[m]--];return this.items.pop();};for(var y in ax[aY]){if(ax[aY][Q](y)){T[aY][y]=(function(d){return function(){for(var e=0,E=this.items[m];e<E;e++){this.items[e][d][aW](this.items[e],arguments);}return this;};})(y);}}T[aY].attr=function(e,a0){if(e&&an.is(e,"array")&&an.is(e[0],"object")){for(var d=0,S=e[m];d<S;d++){this.items[d].attr(e[d]);}}else{for(var E=0,R=this.items[m];E<R;E++){this.items[E].attr[aW](this.items[E],arguments);}}return this;};T[aY].animate=function(S,e,a2,a1){(an.is(a2,"function")||!a2)&&(a1=a2||null);var d=this.items[m],E=d,a0=this,R;a1&&(R=function(){!--d&&a1.call(a0);});this.items[--E].animate(S,e,a2||R,R);while(E--){this.items[E].animateWith(this.items[d-1],S,e,a2||R,R);}return this;};T[aY].insertAfter=function(e){var d=this.items[m];while(d--){this.items[d].insertAfter(e);}return this;};T[aY].getBBox=function(){var d=[],a0=[],e=[],R=[];for(var E=this.items[m];E--;){var S=this.items[E].getBBox();d[f](S.x);a0[f](S.y);e[f](S.x+S.width);R[f](S.y+S.height);}d=aI[aW](0,d);a0=aI[aW](0,a0);return{x:d,y:a0,width:g[aW](0,e)-d,height:g[aW](0,R)-a0};};an.registerFont=function(e){if(!e.face){return e;}this.fonts=this.fonts||{};var E={w:e.w,face:{},glyphs:{}},i=e.face["font-family"];for(var a0 in e.face){if(e.face[Q](a0)){E.face[a0]=e.face[a0];}}if(this.fonts[i]){this.fonts[i][f](E);}else{this.fonts[i]=[E];}if(!e.svg){E.face["units-per-em"]=G(e.face["units-per-em"],10);for(var R in e.glyphs){if(e.glyphs[Q](R)){var S=e.glyphs[R];E.glyphs[R]={w:S.w,k:{},d:S.d&&"M"+S.d[aP](/[mlcxtrv]/g,function(a1){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[a1]||"M";})+"z"};if(S.k){for(var d in S.k){if(S[Q](d)){E.glyphs[R].k[d]=S.k[d];}}}}}}return e;};aT[aY].getFont=function(a2,a3,e,R){R=R||"normal";e=e||"normal";a3=+a3||{normal:400,bold:700,lighter:300,bolder:800}[a3]||400;var S=an.fonts[a2];if(!S){var E=new RegExp("(^|\\s)"+a2[aP](/[^\w\d\s+!~.:_-]/g,at)+"(\\s|$)","i");for(var d in an.fonts){if(an.fonts[Q](d)){if(E.test(d)){S=an.fonts[d];break;}}}}var a0;if(S){for(var a1=0,a4=S[m];a1<a4;a1++){a0=S[a1];if(a0.face["font-weight"]==a3&&(a0.face["font-style"]==e||!a0.face["font-style"])&&a0.face["font-stretch"]==R){break;}}}return a0;};aT[aY].print=function(R,E,d,a1,a2,bb){bb=bb||"middle";var a7=this.set(),ba=(d+at)[z](at),a8=0,a4=at,bc;an.is(a1,"string")&&(a1=this.getFont(a1));if(a1){bc=(a2||16)/a1.face["units-per-em"];var e=a1.face.bbox.split(a),a0=+e[0],a3=+e[1]+(bb=="baseline"?e[3]-e[1]+(+a1.face.descent):(e[3]-e[1])/2);for(var a6=0,S=ba[m];a6<S;a6++){var a5=a6&&a1.glyphs[ba[a6-1]]||{},a9=a1.glyphs[ba[a6]];a8+=a6?(a5.w||a1.w)+(a5.k&&a5.k[ba[a6]]||0):0;a9&&a9.d&&a7[f](this.path(a9.d).attr({fill:"#000",stroke:"none",translation:[a8,0]}));}a7.scale(bc,bc,a0,a3).translate(R-a0,E-a3);}return a7;};an.format=function(i){var e=an.is(arguments[1],"array")?[0][aS](arguments[1]):arguments,d=/\{(\d+)\}/g;i&&an.is(i,"string")&&e[m]-1&&(i=i[aP](d,function(R,E){return e[++E]==null?at:e[E];}));return i||at;};an.ninja=function(){var d=Raphael;if(l.was){Raphael=l.is;}else{delete Raphael;}return d;};an.el=ax[aY];return an;})();
function twitterCallback2(twitters) {
	var statusHTML = [];
	for (var i=0; i<twitters.length; i++){
		var username = twitters[i].user.screen_name;
		var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
			return '<a href="'+url+'">'+url+'</a>';
		}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
			return reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
		});
		statusHTML.push('<li><span>'+status+'</span> <a href="http://twitter.com/'+username+'/statuses/'+twitters[i].id+'">'+relative_time(twitters[i].created_at)+'</a></li>');
	}
	document.getElementById('twitter_update_list').innerHTML = statusHTML.join('');
}

function relative_time(time_value) {
	var values = time_value.split(" ");
	time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	delta = delta + (relative_to.getTimezoneOffset() * 60);

	if (delta < 60) {
		return 'less than a minute ago';
	} else if(delta < 120) {
		return 'about a minute ago';
	} else if(delta < (60*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (120*60)) {
		return 'about an hour ago';
	} else if(delta < (24*60*60)) {
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	}
}
var TweepsKey = Class.create({
	initialize: function(name) {
		this.name = name;
		this.tweepType = "followers"; // followers, friends,
		this.cursor = "-1";
		this.tweeps = null;
		this.maxtweeps = 1000;
		$('userinfo').hide();
		$('tagcloud').innerHTML = "";
		showspinner();
		this.finduser(this.name);
		return this;
	},
	finduser: function(TwitterUser) {
		$('statusmsg').update("retrieving info about "+TwitterUser);
		var searchString = "https://api.twitter.com/1/users/show/"+TwitterUser+".json";
		var me = this.showuserinfo.bind(this);
		var Of = this.FindTweepError.bind(this);

		new Ajax.JSONRequest(searchString, {
			method: 'get',
			callbackParamName: "callback",
			onSuccess: me,
			onFailure: Of,
			onCreate: function() {
				$('apicalls').innerHTML = Number($('apicalls').innerHTML)+1;
			},
			timeout: 5000
		});

		return true;
	},
	FindTweepError: function() {
		$('statusmsg').update("");
		clearspinner();
		$('show').hide();
		$('twitterError').clonePosition($('newTweepButton'),{setWidth: false, setHeight: false}); // based on the top button
		$('errormsg').innerHTML = "Either the Twitter API is busy or the name of the Tweep could not be retrieved.";
		$('twitterError').show();
		return true;
	},
	TwitterStatus: function() {
		var searchString = "http://api.twitter.com/1/account/rate_limit_status.json";
		new Ajax.JSONRequest(searchString, {
			method: 'get',
			callbackParamName: "callback",
			onSuccess: function(data) {
				if (data.remaining_hits < 50) {
					alert("running low on requests");
				}
			},
			timeout: 5000
		});
	},
	showuserinfo: function(data) {
		$('statusmsg').update();
		this.userdata = this.tweepinfo(data.responseJSON)[0];
		this.displayuserinfo();
		$('statusmsg').update("finding tweeps");
		this.TwitterStatus();
		this.findTweeps();
		return this;
	},
	displayuserinfo: function() {
		$('Tscreenname').innerHTML = "@"+this.userdata.screenname;
		$('Tfollowers').innerHTML = this.userdata.followers;
		$('Tfollowing').innerHTML = this.userdata.friends;
		$('Ttweets').innerHTML = this.userdata.tweets;
		$('Ttwitter').href = "https://twitter.com/"+this.userdata.screenname;
		$('unlockinfo').show();
		if (typeof(this.userdata.url) == "string") {
			$('Tweb').href = this.userdata.url;
			$('Tweb').show();
		}
		return true;
	},
	tweepinfo: function(dataset) {
		var tweep = [{
				tweepid: dataset.id,
				isprotected: dataset['protected'],
				screenname: dataset.screen_name,
				name: dataset.name,
				location: dataset.location,
				bio: dataset.description,
				img: dataset.profile_image_url,
				url: dataset.url,
				followers: dataset.followers_count,
				friends: dataset.friends_count,
				tweets: dataset.statuses_count,
				fersfingratio: dataset.followers_count/dataset.friends_count,
				tweetsperday: dataset.statuses_count/(Date.parse(dataset.created_at)/86400000)
			}];
		return tweep;
	},
	findTweeps: function(tweepType) {
		showspinner();
		this.tweepType = tweepType || this.tweepType;
		this.tweepType = this.tweepType.toLowerCase();
		var searchString = "https://twitter.com/statuses/"+this.tweepType+"/"+this.userdata.tweepid+".json";
		var me = this.findTweepsCollector.bind(this);
		var Of = this.FindTweepsError.bind(this);
		if (this.userdata.followers > this.maxtweeps) {
		 	var extratext = "The Tweep to unlock has more than "+this.maxtweeps+" followers.<br />";
			extratext += "Retrieving information about all of these would take a lot of time. Besides, drawing a graph for all these tweeps would likely exceed your computer's capacity (and your patience).<br />";
			extratext += "Therefore only the "+this.maxtweeps+" most recent followers will be retrieved and displayed.";
		} else {
			var extratext = "Finding information about "+this.userdata.followers+" followers.";

		}
		$("extramsg").innerHTML = extratext;
		new Ajax.JSONRequest(searchString, {
			method: 'get',
			callbackParamName: "callback",
			onSuccess: me,
			onFailure: Of,
			parameters: {
					cursor: this.cursor
			},
			onCreate: function() {
				$('apicalls').innerHTML = (Number($('apicalls').innerHTML)+1);
			},
			timeout: 10000
		});
		return this;
	},
	FindTweepsError: function() {
		$('statusmsg').update("");
		clearspinner();
		$('twitterError').clonePosition($('newTweepButton'),{setWidth: false, setHeight: false}); // based on the top button
		$('errormsg').innerHTML = "the Twitter API is busy...";
		$('twitterError').show();
		return true;
	},
	findTweepsCollector: function(data) {
		var data = data.responseJSON

		if (incremental) {
			if (this.tweeps == null) {
				this.tweeps = new Array();
			}

			data.users.each(function(tweep) {
				var ttw = this.tweepinfo(tweep)[0];
				this.processTweep(ttw);
				this.tweeps.push(ttw);
			},this);

			if ((data.next_cursor != 0) && this.tweeps.size() <= this.maxtweeps) { //  && (this.userdata.followers < this.tweeps.size())
				var retrTweepsC = Math.round(this.tweeps.size()/100)*100;
				$('statusmsg').update("finding tweeps ("+retrTweepsC+" of "+this.userdata.followers+" tweeps retrieved)");
				this.cursor = data.next_cursor;
				this.findTweeps();
			}

		} else {
			if (this.tweeps == null) {
				this.tweeps = new Array();
			}

			data.users.each(function(tweep) {
				this.tweeps.push(this.tweepinfo(tweep)[0]);
			},this);

			if ((data.next_cursor != 0) && this.tweeps.size() <= this.maxtweeps) { //  && (this.userdata.followers < this.tweeps.size())
				var retrTweepsC = Math.round(this.tweeps.size()/100)*100;
				$('statusmsg').update("finding tweeps ("+retrTweepsC+" of "+this.userdata.followers+" tweeps retrieved)");
				this.cursor = data.next_cursor;
				this.findTweeps();
			} else {
				this.startGraph();
			}
		}
		return this;
	},
	processTweep: function(tweep) {
		if (tweep.tweets > 0) {
			tweep.xScore = Math.floor(Math.log(tweep.tweets));
		} else {
			tweep.xScore = 0;
		}
		if (tweep.xScore > this.maxxScore) {
			this.maxxScore = tweep.xScore;
		}
		if (tweep.friends > 0) {
			 tweep.yScore = Math.floor(Math.log(tweep.friends));
		} else {
			tweep.yScore = 0;
		}
		if (tweep.yScore > this.maxyScore) {
			this.maxyScore = tweep.yScore;
		}
		if (tweep.followers > 0) {
			tweep.rScore = 1 + Math.floor(Math.log(tweep.followers));
		} else {
			tweep.rScore = 1;
		}
		if (tweep.rScore > this.maxrScore) {
			this.maxrScore = tweep.rScore;
		}
		if (tweep.fersfingratio < 1) {
			var color = 255;
		} else {
			var color = 255 - (15*Math.ceil(Math.log(tweep.fersfingratio)));
		}
		var colorstring = color.toString(16);
		if (colorstring.length == 1) { colorstring = "0"+colorstring; }
		tweep.cScore = "A2DE"+colorstring;

		if (typeof(this.graph) == 'undefined') {
			this.graph = new scalingScatterplot('tagcloud');
		}
		this.graph.dot(tweep);

		$('statusmsg').update("");
		clearspinner();
		return tweep;
	},
	startGraph: function() {
		$('statusmsg').update("Performing some math");

		var TotalOfFollowers = 0;
		var TotalOfFriends = 0;
		var TotalOfTweets = 0;
		this.MaxFollowers = 0;
		this.MaxFriends = 0;
		this.MaxTweets = 0;
		this.Maxfersfingratio = 0;
		this.MinFollowers = 10000;
		this.MinFriends = 10000;
		this.MinTweets = 10000;
		this.Minfersfingratio = 10000;

		this.tweeps.each(function(tweep){
			TotalOfFollowers += tweep.followers;
			if (tweep.followers > this.MaxFollowers) {
				this.MaxFollowers = tweep.followers;
			}
			if (tweep.followers < this.MinFollowers) {
				this.MinFollowers = tweep.followers;
			}
			TotalOfFriends += tweep.friends;
			if (tweep.friends > this.MaxFriends) {
				this.MaxFriends = tweep.friends;
			}
			if (tweep.friends < this.MinFriends) {
				this.MinFriends = tweep.friends;
			}
			TotalOfTweets += tweep.tweets;
			if (tweep.tweets > this.MaxTweets) {
				this.MaxTweets = tweep.tweets;
			}
			if (tweep.tweets < this.MinTweets) {
				this.MinTweets = tweep.tweets;
			}
			if (tweep.fersfingratio > this.Maxfersfingratio) {
				this.Maxfersfingratio = tweep.fersfingratio;
			}
			if (tweep.fersfingratio < this.Minfersfingratio) {
				this.Minfersfingratio = tweep.fersfingratio;
			}
		},this);


		/*
		this.AvgFollowers = Math.round(TotalOfFollowers/this.userdata.followers);
		this.AvgFriends = Math.round(TotalOfFriends/this.userdata.followers);
		this.AvgTweets = Math.round(TotalOfTweets/this.userdata.followers);
		var distanceFollowers = 0;
		this.tweeps.each(function(tweep){
			distanceFollowers += Math.pow((tweep.followers-this.AvgFollowers),2);
		}, this);
		this.StDevFollowers = Math.sqrt(distanceFollowers/this.userdata.followers);
		this.MnDevFollowers = distanceFollowers/this.userdata.followers;

		var Q = Math.floor(this.userdata.followers/4);
		this.MedFollowers = this.tweeps[2*Q].followers;
		this.MedFriends = this.tweeps[2*Q].friends;
		this.MedTweets = this.tweeps[2*Q].tweets;
		this.Q1topFollowers = this.tweeps[Q].followers;
		this.Q1topFriends = this.tweeps[Q].friends;
		this.Q1topTweets = this.tweeps[Q].tweets;
		this.Q4bottomFollowers = this.tweeps[Q*3].followers;
		this.Q4bottomFriends = this.tweeps[Q*3].friends;
		this.Q4bottomTweets = this.tweeps[Q*3].tweets;
		*/

		this.maxX = 0;
		this.maxY = 0;
		this.maxR = 0;

		this.Cstepsize = Math.round((255/(this.Maxfersfingratio-this.Minfersfingratio)),2);

		this.tweeps.each(function(tweep,index) {
			if (tweep.tweets > 0) {
				this.tweeps[index].xScore = Math.floor(Math.log(tweep.tweets));
			} else {
				this.tweeps[index].xScore = 0;
			}
			if (this.tweeps[index].xScore > this.maxX) {
				this.maxX = this.tweeps[index].xScore;
			}
			if (tweep.friends > 0) {
				this.tweeps[index].yScore = Math.floor(Math.log(tweep.friends));
			} else {
				this.tweeps[index].yScore = 0;
			}
			if (this.tweeps[index].yScore > this.maxY) {
				this.maxY = this.tweeps[index].yScore;
			}

			if (tweep.followers > 0) {
				this.tweeps[index].rScore = 1 + Math.floor(Math.log(tweep.followers));
			} else {
				this.tweeps[index].rScore = 1;
			}
			if (this.tweeps[index].rScore > this.maxR) {
				this.maxR = this.tweeps[index].rScore;
			}

			var color = 255 - Math.round(this.Cstepsize * (tweep.fersfingratio-this.Minfersfingratio));
			var colorstring = color.toString(16);
			if (colorstring.length == 1) { colorstring = "0"+colorstring; }
			this.tweeps[index].Cscore = "A2DE"+colorstring;
			this.tweeps[index].Dfol = this.MaxFollowers - tweep.followers; // used for the sorting later on ....
		},this);

		this.tweeps = this.tweeps.sortBy(function(s) { return s.Dfol; });

		this.graph = new rScatterplot('tagcloud',this.maxX,this.maxY,this.maxR);
		this.userdata.xScore = Math.floor(Math.log(this.userdata.tweets));
		this.userdata.yScore = Math.floor(Math.log(this.userdata.friends));
		this.userdata.rScore = Math.floor(Math.log(this.userdata.followers));
		this.userdata.Cscore = "e20a0c";

		if (window.Worker && UseWorker) {
			this.tweeps.push(this.userdata);
			this.tweeps.each(function(tweep,index) {
				this.tweeps[index].xScore = (this.graph.factorX * tweep.xScore) + 24;
				this.tweeps[index].yScore = this.graph.Theight - (this.graph.factorY*tweep.yScore) - 24;
				this.tweeps[index].rScore = (this.graph.factorR * tweep.rScore);
			},this);

			var me = this;
			if (worker != false) {
				worker.terminate();
			}
			worker = new Worker("isf.min.js");
			worker.addEventListener('message', function(event) {
																	switch(event.data.msgtype) {
																	 	case "start":
																	 		if (BrowserDetect.browser=="Chrome") {
 																	 			$('statusmsg').update("Performing some math: "+event.data.msg);
 																	 		}
																	 		break;
																	 	default:
																			me.tweeps = event.data.msg;//.evalJSON();
																			me.draw();
																		}
																}, false);

			worker.addEventListener('error', function(event) {
																	console.log(event.message + " (" + event.filename + ":" + event.lineno + ")");
																}, false);

			data = Object.toJSON(this.tweeps);
			worker.postMessage(data);
			/*
			var inbetween = test(Object.toJSON(this.tweeps));
			console.log(inbetween.evalJSON());
			this.tweeps = inbetween.evalJSON();
			console.log(this.tweeps);
			this.draw();
			*/
		} else {
			$('statusmsg').update("");
			clearspinner();
			this.graph.dot(this.userdata);
			this.tweeps.each(function(tweep) {
				this.graph.dot(tweep);
			},this);
		}
		return this;
	},
	draw: function() {
		$('statusmsg').update("");
		clearspinner();
		this.tweeps.each(function(tweep) {
			this.graph.dot(tweep);
		},this);
		return this;
	}
});

var scalingScatterplot = Class.create({
	initialize: function(where, maxX, maxY, maxR) {
		this.where = where;

		this.Twidth = $(this.where).getWidth();
		this.Theight = $(this.where).getHeight();

		this.maxX = 10; //this.Twidth/10;
		this.maxY = 10; //this.Theight/10;
		this.maxR = 24;

		this.defR = 48;

		this.scale = 100;

		this.dots = new Array();
		this.tweeplist = new Array();

		this.paper = Raphael(this.where,this.Twidth,this.Theight);

		return this;
	},
	dot: function(tweep) {
		var ratio = 1;

		if (tweep.xScore > this.maxX) {
			ratio = this.maxX/tweep.xScore;
			console.log("X "+tweep.screenname+": "+tweep.xScore+" > "+this.maxX+" ("+ratio+")");
			this.maxX = tweep.xScore;
			if (ratio < 1) {
				this.scale = ratio*this.scale;
				this.scaleNow();
			}

		}

		if (tweep.yScore > this.maxY) {
			ratio = this.maxY/tweep.yScore;
			console.log("Y "+tweep.screenname+": "+tweep.yScore+" > "+this.maxY+" ("+ratio+")");
			this.maxY = tweep.yScore;
			if (ratio < 1) {
				this.scale = ratio*this.scale;
				this.scaleNow();
			}
		}


		var x = (this.scale * tweep.xScore);
		var y = (this.scale * tweep.yScore);
		var r = Math.round((this.scale/100) * (tweep.rScore));

		x += r;
		y += r;

		/* non worker way */
		var realspot = [x,y,r];
		var realspot = findspot(this.dots,x,y,r);
		this.dots.push([realspot[0],realspot[1],realspot[2]]);


		this.draw(realspot, tweep);

		return this;
	},
	scaleNow: function() {
		console.log("Scale: "+this.scale);
		this.tweeplist.each(function(item,index) {
			var newX = ((this.scale/100) * item.x);
			var newY = ((this.scale/100) * item.y);
			var newR = Math.round((this.scale/100) * (item.r));
			item.reference.animate({cx: newX, cy: (this.Theight - newY), r: newR}, 1000, "bounce");
		},this);
		return true;
	},
	draw: function(position,tweep) {
		var color = "#"+tweep.cScore; //Raphael.getColor();
		var x = position[0];
		var y = position[1];
		var r = position[2];


		if (Math.ceil(r) >= 24) {
			var dodo = this.paper.circle(x, (this.Theight - y), r);
			dodo.attr({'stroke-width': '0', 'fill': color});
			var dada = this.paper.circle(x, (this.Theight - y), 24);
			dada.attr({'stroke-width': '0', 'fill': "url("+tweep.img+")"});
		} else {
			var dada = this.paper.circle(x, (this.Theight - y), r);
			dada.attr({'stroke-width': '0', 'fill': color});
			var dodo = 0;
		}
		this.tweeplist.push({'tweepname':tweep.screenname,"reference":dada,"x":x,"y":y,"r":r});

		var me = this;
		dada.hover(function (event) {
			me.showUserInfo(this, event, tweep, x, y);
		},function(event) {
			var padding = 5;
			var x = event.clientX;
			var y = event.clientY;
			var uileft = $('userinfo').getStyle('left');
			uileft = uileft.substr(0,(uileft.length-2)) - padding;
			var uitop = $('userinfo').getStyle('top');
			uitop = uitop.substr(0,(uitop.length-2)) - padding;
			var inbox = false;
			if (x > uileft) {
				if (x < (uileft + $('userinfo').getWidth() + padding)) {
					if (y > uitop) {
						if (y < (uitop + $('userinfo').getHeight() + padding)) {
							inbox = true;
						}
					}
				}
			}
			if (!inbox) {
				$('userinfo').hide();
			}
		});

		return true;
	},
	find: function(name) {
		var rtval = false;
		$('userinfo').hide();
		this.tweeplist.each(function(item,index) {
			if (item.tweepname.toLowerCase() == name.toLowerCase()) {
				this.tweeplist[index].reference.attr({'stroke':'yellow','stroke-width': '5'});
				rtval = this.tweeplist[index].reference;
			}
		}, this);
		return rtval;
	},
	showUserInfo: function(element, event, tweep, x, y) {
	    $('userinfo').hide();
	    hideDialogs();
	    $('Uscreenname').innerHTML = "@"+tweep.screenname;
		$('Uimage').src= tweep.img;
		$('Urealname').innerHTML = tweep.name;
		$('Ulocation').innerHTML = tweep.location;
		$('Ubio').innerHTML = tweep.bio;
		$('Ufollowers').innerHTML = tweep.followers;
		$('Ufollowing').innerHTML = tweep.friends;
		$('Utweets').innerHTML = tweep.tweets;
		$('Utwitter').href = "http://twitter.com/"+tweep.screenname;
		if (tweep.isprotected == false) {
			$('Uunlock').href = "JavaScript:StartSearching(\""+tweep.screenname+"\");";
			$('Uunlock').show();
			$('isprot').hide();
		} else {
			$('Uunlock').hide();
			$('isprot').show();
		}
		if (typeof(tweep.url) == "string") {
			$('Uweb').href = tweep.url;
			$('Uweb').show();
		}
		$('userinfo').makePositioned();
		var newX = event.clientX - 5;
		var newY = event.clientY - 5;
		if ((newX+$('userinfo').getWidth()) > window.innerWidth) {
			newX -= $('userinfo').getWidth();
		}
		if ((newY+$('userinfo').getHeight()) > window.innerHeight) {
			newY -= $('userinfo').getHeight();
		}
		$('userinfo').setStyle({left: newX+"px",top: newY+"px"});
		$('userinfo').show();
	}
});


var rScatterplot = Class.create({
	initialize: function(where, maxX, maxY, maxR) {
		this.where = where;
		this.Twidth = $(this.where).getWidth();
		this.Theight = $(this.where).getHeight();
		this.paper = Raphael(this.where,this.Twidth,this.Theight);
		this.centerX = this.Twidth/2;
		this.centerY = this.Theight/2;

		this.factorX = Math.ceil(this.Twidth/(maxX+2));
		this.factorY = Math.ceil(this.Theight/(maxY+2));
		this.factorR = Math.round(26/(maxR+1));

		this.dots = new Array();
		this.tweeplist = new Array();
		return this;
	},
	dot: function(tweep) {

		if (window.Worker && UseWorker) {
			var realspot = [tweep.xScore,tweep.yScore,tweep.rScore];
			this.draw(realspot, tweep);
		} else {
			var x = (this.factorX * tweep.xScore) + 24;
			var y = this.Theight - (this.factorY * tweep.yScore) - 24;
			var r = (this.factorR * tweep.rScore);
			var realspot = [x,y,r];
			var realspot = findspot(this.dots,x,y,r);
			this.dots.push([realspot[0],realspot[1],realspot[2]]);
			this.draw(realspot, tweep);
		}
		return this;
	},
	draw: function(position,tweep) {
		var color = "#"+tweep.Cscore; //Raphael.getColor();
		var x = position[0];
		var y = position[1];
		var r = position[2];

		if (Math.ceil(r) >= 24) {
			var dodo = this.paper.circle(x, y, r);
			dodo.attr({'stroke-width': '0', 'fill': color});
			var dada = this.paper.circle(x, y, 24);
			dada.attr({'stroke-width': '0', 'fill': "url("+tweep.img+")"});
		} else {
			var dada = this.paper.circle(x, y, r);
			dada.attr({'stroke-width': '0', 'fill': color});
			var dodo = 0;
		}
		this.tweeplist.push({'tweepname':tweep.screenname,"reference":dada});

		var me = this;
		dada.hover(function (event) {
			me.showUserInfo(this, event, tweep, x, y);
		},function(event) {
			var padding = 5;
			var x = event.clientX;
			var y = event.clientY;
			var uileft = $('userinfo').getStyle('left');
			uileft = uileft.substr(0,(uileft.length-2)) - padding;
			var uitop = $('userinfo').getStyle('top');
			uitop = uitop.substr(0,(uitop.length-2)) - padding;
			var inbox = false;
			if (x > uileft) {
				if (x < (uileft + $('userinfo').getWidth() + padding)) {
					if (y > uitop) {
						if (y < (uitop + $('userinfo').getHeight() + padding)) {
							inbox = true;
						}
					}
				}
			}
			if (!inbox) {
				$('userinfo').hide();
			}
		});

		return true;
	},
	find: function(name) {
		var rtval = false;
		$('userinfo').hide();
		this.tweeplist.each(function(item,index) {
			if (item.tweepname.toLowerCase() == name.toLowerCase()) {
				this.tweeplist[index].reference.attr({'stroke':'yellow','stroke-width': '5'});
				rtval = this.tweeplist[index].reference;
			}
		}, this);
		return rtval;
	},
	showUserInfo: function(element, event, tweep, x, y) {
	    $('userinfo').hide();
	    hideDialogs();
	    $('Uscreenname').innerHTML = "@"+tweep.screenname;
		$('Uimage').src= tweep.img;
		$('Urealname').innerHTML = tweep.name;
		$('Ulocation').innerHTML = tweep.location;
		$('Ubio').innerHTML = tweep.bio;
		$('Ufollowers').innerHTML = tweep.followers;
		$('Ufollowing').innerHTML = tweep.friends;
		$('Utweets').innerHTML = tweep.tweets;
		$('Utwitter').href = "http://twitter.com/"+tweep.screenname;
		if (tweep.isprotected == false) {
			$('Uunlock').href = "JavaScript:StartSearching(\""+tweep.screenname+"\");";
			$('Uunlock').show();
			$('isprot').hide();
		} else {
			$('Uunlock').hide();
			$('isprot').show();
		}
		if (typeof(tweep.url) == "string") {
			$('Uweb').href = tweep.url;
			$('Uweb').show();
		}
		$('userinfo').makePositioned();
		var newX = event.clientX - 5;
		var newY = event.clientY - 5;
		if ((newX+$('userinfo').getWidth()) > window.innerWidth) {
			newX -= $('userinfo').getWidth();
		}
		if ((newY+$('userinfo').getHeight()) > window.innerHeight) {
			newY -= $('userinfo').getHeight();
		}
		$('userinfo').setStyle({left: newX+"px",top: newY+"px"});
		$('userinfo').show();
	}
});



/* !scrathcpad
http://api.twitter.com/1/users/show/jongehelden.json
{
	"profile_background_image_url":"http://a1.twimg.com/profile_background_images/67990358/tubeA4.jpg",
	"favourites_count":1,
	"description":"software developer, entrepreneur, computer geek, cyclist, Arnhemmer",
	"contributors_enabled":false,
	"profile_link_color":"1F98C7",
	"status": {
		"created_at":"Mon Mar 01 18:59:07 +0000 2010",
		"source":"<a href=\"http://www.hootsuite.com\" rel=\"nofollow\">HootSuite</a>",
		"in_reply_to_user_id":22165576,
		"in_reply_to_status_id":9836727728,
		"in_reply_to_screen_name":"PPLucker",
		"truncated":false,
		"id":9837031169,
		"favorited":false,
		"text":"@PPLucker is allemaal in 't kader van de groene weide"
	},
	"geo_enabled":false,
	"profile_background_tile":false,
	"created_at":"Wed Jul 16 18:46:59 +0000 2008",
	"profile_background_color":"C6E2EE",
	"verified":false,
	"profile_image_url":"http://a3.twimg.com/profile_images/725251825/images_normal.jpeg",
	"profile_sidebar_fill_color":"DAECF4",
	"lang":"en",
	"notifications":null,
	"screen_name":"jongehelden",
	"following":null,
	"time_zone":"Amsterdam",
	"profile_sidebar_border_color":"C6E2EE",
	"followers_count":52,
	"protected":false,
	"location":"Arnhem, NL",
	"name":"jongehelden",
	"friends_count":46,
	"id":15457991,
	"statuses_count":244,
	"utc_offset":3600,
	"profile_text_color":"663B12",
	"url":"http://www.jongehelden.com"
}
een protected status:
{
	"following":null,
	"verified":false,
	"profile_text_color":"000000",
	"description":"denker in mogelijkheden www.okzo.nl / communitymanager @ Arnhem-direct.nl / woord & beeld www.geespot.nl ",
	"screen_name":"Gerjanne",
	"profile_background_image_url":"http://a3.twimg.com/profile_background_images/34477899/nvCirrocumulus.br.jpg",
	"url":"http://www.okzo.nl",
	"profile_link_color":"67c5af",
	"profile_background_tile":false,
	"followers_count":667,
	"location":"Arnhem",
	"notifications":null,
	"profile_background_color":"000000",
	"friends_count":642,
	"statuses_count":15197,
	"profile_sidebar_fill_color":"4E8695",
	"favourites_count":300,
	"protected":true,
	"contributors_enabled":false,
	"lang":"en",
	"time_zone":"Amsterdam",
	"profile_sidebar_border_color":"CBD7D3",
	"name":"Gerjanne",
	"geo_enabled":false,
	"created_at":"Sun Jul 08 10:40:24 +0000 2007",
	"profile_image_url":"http://a3.twimg.com/profile_images/431271339/droombos-01_normal.jpg",
	"id":7326302,
	"utc_offset":3600
}
*/

if(window['console'] === undefined) { window.console = { log: Prototype.emptyFunction }; } // to prevent log message from screwing up IE etc.
var activeTweep = false; // the current tweep to unlock
var UseWorker = true; // wether or not we will use workers on supported platforms
var incremental = false; // shows tweeps on graph as they come in from Twitter
var higlightedTweep = false;
var worker = false;

/* code to run to initialize everything */
Event.observe(window, 'load', function() {

	var url = "http://twitter.com/statuses/user_timeline/tweepskey.json";
	new Ajax.JSONRequest(url, {
			method: 'get',
			callbackParamName: "jsonp",
			parameters: {
					callback: "twitterCallback2",
					count: "3"
				}
		});

	/* enable the menu buttons */
	$$(".semibutton").each(function(item) {
		Event.observe(item,'click',function(event) { showDialog(Event.element(event)); Event.stop(event); });
		Event.observe(item,'mouseover', function(event) { showDialog(Event.element(event)); Event.stop(event); });
		Event.observe(item,'c:1', function(event) { showDialog(Event.element(event)); Event.stop(event); });
	});
	/* attach the search functionality */
	Event.observe($('twittername'),'blur', function(event) {
												SearchFromDialog();
												Event.stop(event);
												return true;
											});
	Event.observe($('twittername'),'keydown', function(event) {

													if (event.keyCode == 13) {
														SearchFromDialog();
														Event.stop(event);
													}

													return true;
												});
	/* when the mouse is clicked on the graph, then any dialogs should be moved out of the way */
	Event.observe($('tagcloud'),'click',function() { if ($F('twittername') != "") { hideDialogs(); }});
	Event.observe($('retry'),'click',function(event) {
		$('twitterError').hide();
		if (typeof(activeTweep.userdata) != 'undefined') {
			activeTweep.findTweeps();
		} else {
			NewSearch();
		}
	});
	Event.observe($('show'),'click',function(event) {
		$('twitterError').hide();
		activeTweep.startGraph();
	});
	Event.observe($('fig'),'blur',function(event) {
		if (higlightedTweep !== false) {
			higlightedTweep.attr({'stroke-width': '0'});
		}
		higlightedTweep = activeTweep.graph.find($F('fig'));
	});
	Event.observe($('fig'),'keydown',function(event) {
		if (event.keyCode == 13) {
			if (higlightedTweep !== false) {
				higlightedTweep.attr({'stroke-width': '0'});
			}
			higlightedTweep = activeTweep.graph.find($F('fig'));
			Event.stop(event);
		}
		return true;
	});
	if (navigator.userLanguage) {
		var language = navigator.userLanguage.toLowerCase() ; // IE
	} else if (navigator.language) {
		var language = navigator.language.toLowerCase() ; // Gecko
	}
	if (language.substr(0,2) == 'nl') {
		$('smicadv').href = "http://www.2smic.nl";
	}

	NewSearch();

	/*
	var ls = location.search.substring(1);
		var namevalue = ls.split("&");
		var getdata = [];
		for (var i=0; i<namevalue.length; i++) {
			var data = namevalue[i].split("=");
			getdata[data[0]] = data[1];
		}

	*/
	if (location.pathname.length > 1 && location.pathname != "/index.html") {
		$('twittername').value = location.pathname.substr(1,(location.pathname.length-1));
		SearchFromDialog();
	} else {
		NewSearch();
	}
});
/*
window.onresize = resized; //
function resized() { console.log("resize"); return false; };
*/
function SearchFromDialog() {
	if ($F('twittername') != "") {
		StartSearching($F('twittername'));
	}
}

function StartSearching(who) {
	hideDialogs();
	$('unlockinfo').hide();
	$('extramsg').innerHTML = ''; // some space in the dialog that might contain some text
	pageTracker._trackPageview("/"+who); // for Gooogle Analytics
	activeTweep = new TweepsKey(who);
}

function NewSearch() {
	$('unlockinfo').hide();
	$('twitterError').hide();
	$('status').hide();
	hideDialogs();
	$('newTweepButton').addClassName('active');
	$('newTweep').clonePosition($('newTweepButton'),{setWidth: false, setHeight: false});
	$('newTweep').show();
}

function showDialog(menuitem) {
	if (!menuitem.hasClassName("disabled")) {
		var DtoShow = menuitem.id.substr(0,(menuitem.id.length-6));
		if ((DtoShow != "") && ($(DtoShow) != "undefined")) {
			$('userinfo').hide(); // hide userinfo if needed
			$$(".dialog").each(function(item) { item.hide()});
			$$(".semibutton").each(function(item) { item.removeClassName("active")});
			menuitem.addClassName("active");
			$(DtoShow).clonePosition($('newTweepButton'),{setWidth: false, setHeight: false}); // based on the top button
			$(DtoShow).show();
		}
	}
	return true;
}

function hideDialogs() {
	$$(".dialog").each(function(item) { item.hide()});
	$$(".semibutton").each(function(item) { item.removeClassName("active")});
}


function showspinner() {
	$('status').show();
	if (window.innerHeight) {
		var topPos = ((window.innerHeight-100)/3)+"px";
	} else {
		var topPos = ((screen.availHeight-100)/3)+"px";
	}
	$('status').style.top = topPos;
	return true;
}

function clearspinner() {
	$('status').hide();
	return true;
}

function findintersection(data, x,y,r) {
	var intersect = false;
	data.each(function(item) {
		var ls = Math.sqrt(Math.pow((x-item[0]),2) + Math.pow((y-item[1]),2));
		if (ls < (item[2] + r)) {
			intersect = [item[0],item[1],(item[2] + r)];
			throw $break;
		}
	});
	return intersect;
}

function findspot(data,x,y,r) {
	var intersect = findintersection(data, x,y,r);
	while (intersect!==false) {
		var newA = Math.round(Math.random()*360);
		var langezijde = intersect[2];
		if (newA <= 45) {
			var Xtrans = langezijde*(Math.sin(newA));
			var Ytrans = langezijde*(Math.cos(newA));
		} else if (newA <= 90) {
			var calcA = 90-newA;
			var Xtrans = langezijde*(Math.cos(calcA));
			var Ytrans = langezijde*(Math.sin(calcA));
		} else if (newA <= 135) {
			var calcA = newA-90;
			var Xtrans = langezijde*(Math.cos(calcA));
			var Ytrans = -1*(langezijde*(Math.sin(calcA)));
		} else if (newA <= 180) {
			var calcA = newA-135;
			var Xtrans = langezijde*(Math.sin(calcA));
			var Ytrans = -1*(langezijde*(Math.cos(calcA)));
		} else if (newA <= 225) {
			var calcA = newA - 180;
			var Xtrans = -1*(langezijde*(Math.sin(calcA)));
			var Ytrans = -1*(langezijde*(Math.cos(calcA)));
		} else if (newA <= 270) {
			var calcA = newA - 225;
			var Xtrans = -1*(langezijde*(Math.cos(calcA)));
			var Ytrans = -1*(langezijde*(Math.sin(calcA)));
		} else if (newA <= 315) {
			var calcA = newA - 315;
			var Xtrans = -1*(langezijde*(Math.cos(calcA)));
			var Ytrans = langezijde*(Math.sin(calcA));
		} else {
			var Xtrans = -1*(langezijde*(Math.sin(newA)));
			var Ytrans = langezijde*(Math.cos(newA));
		}
		x = intersect[0] + Xtrans;
		y = intersect[1] + Ytrans
		intersect = findintersection(data,x,y,r);
	}
	return [x,y,r];
}
