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
	// var t=setTimeout(removeTester,10000);
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