/* * * * * * * * * * * * * * * * * * * */
/* © 2009, L van Snippenburg           */
/* * * * * * * * * * * * * * * * * * * */
//= require <browsertest.js>
//= require <prototype.js>
//= require <jsonp.js>
//= require <raphael-min.js>
//= require <twitterfeed.js>
//= require <TweepsKey.js>

if(window['console'] === undefined) { window.console = { log: Prototype.emptyFunction }; } // to prevent log message from screwing up IE etc.
var activeTweep = false; // the current tweep to unlock
var UseWorker = true; // wether or not we will use workers on supported platforms
var incremental = false; // shows tweeps on graph as they come in from Twitter
var higlightedTweep = false;
var worker = false;

/* code to run to initialize everything */
Event.observe(window, 'load', function() {
	
	// load some tweets from tweepskey
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
													// console.log(event.keyCode);
													
													if (event.keyCode == 13) {
														SearchFromDialog();
														Event.stop(event);
													}
													
													return true;
												});
	/* when the mouse is clicked on the graph, then any dialogs should be moved out of the way */									
	Event.observe($('tagcloud'),'click',function() { if ($F('twittername') != "") { hideDialogs(); }});
	// retry
	Event.observe($('retry'),'click',function(event) {
		$('twitterError').hide();
		if (typeof(activeTweep.userdata) != 'undefined') {
			activeTweep.findTweeps();
		} else {
			NewSearch();
		}
	});
	// show
	Event.observe($('show'),'click',function(event) {
		$('twitterError').hide();
		activeTweep.startGraph();
	});
	// Uunlock - actie				
	// Event.observe($('Uunlock'),'click',function(event) { });
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
	// set the link for the smic advertentie
	if (navigator.userLanguage) {
		var language = navigator.userLanguage.toLowerCase() ; // IE
	} else if (navigator.language) {
		var language = navigator.language.toLowerCase() ; // Gecko
	}
	if (language.substr(0,2) == 'nl') {
		$('smicadv').href = "http://www.2smic.nl";
	}

	// set the opening screen
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
		// set the opening screen
		NewSearch();
	}
});
/*
window.onresize = resized; //
function resized() { console.log("resize"); return false; };
*/
function SearchFromDialog() {
	if ($F('twittername') != "") {
		// var tweep = $F('twittername').replace(/^[0-9]/i,"_"); // variable names cannot start with a Number.
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
			// find out where to place the dialog
			// $(DtoShow).clonePosition(menuitem,{setWidth: false, setHeight: false}); // based on the active button
			$(DtoShow).clonePosition($('newTweepButton'),{setWidth: false, setHeight: false}); // based on the top button
			// var newY = (window.innerHeight/2)-($(DtoShow).getHeight()/2); // centered on screen
			// $(DtoShow).setStyle({top: newY+"px"});
			$(DtoShow).show();
		}
	}
	return true;
}

function hideDialogs() {
	// hides all dialogs and makes all buttons inactive
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
	// $('status').setStyle({top:topPos});
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
		// the distance between the 2 centre points
		var ls = Math.sqrt(Math.pow((x-item[0]),2) + Math.pow((y-item[1]),2));
		if (ls < (item[2] + r)) {
			// there is an intersection
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
