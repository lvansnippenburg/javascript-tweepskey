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
		// var ts = this.TwitterStatus();
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
		// https://twitter.com/friends/ids.json?user_id=15457991
		this.findTweeps();
		return this;
	},
	displayuserinfo: function() {
		$('Tscreenname').innerHTML = "@"+this.userdata.screenname;
		// $('Timage').src= this.userdata.img;
		// $('Trealname').innerHTML = this.userdata.name;
		// $('Tlocation').innerHTML = this.userdata.location;
		// $('Tbio').innerHTML = this.userdata.bio;
		$('Tfollowers').innerHTML = this.userdata.followers;
		$('Tfollowing').innerHTML = this.userdata.friends;
		$('Ttweets').innerHTML = this.userdata.tweets;
		$('Ttwitter').href = "https://twitter.com/"+this.userdata.screenname;
		// $('twitter_update_list').hide();
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
			// extra medling geven dat we slechts to de this.maxtweeps gaan ....
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
			
			//incremental view of Tweeps, start drawing while we receive more results
			data.users.each(function(tweep) {
				var ttw = this.tweepinfo(tweep)[0];
				// console.log(tweep.screenname;)
				this.processTweep(ttw);
				this.tweeps.push(ttw);
			},this);
			
			if ((data.next_cursor != 0) && this.tweeps.size() <= this.maxtweeps) { //  && (this.userdata.followers < this.tweeps.size())
				// we need to retrieve more data
				var retrTweepsC = Math.round(this.tweeps.size()/100)*100;
				$('statusmsg').update("finding tweeps ("+retrTweepsC+" of "+this.userdata.followers+" tweeps retrieved)");
				this.cursor = data.next_cursor;
				this.findTweeps();
			}
			
		} else {
			// merge the received data with the "tweeps" propertie
			if (this.tweeps == null) {
				this.tweeps = new Array();
			}
	
			data.users.each(function(tweep) {
				this.tweeps.push(this.tweepinfo(tweep)[0]);
			},this);
			
			if ((data.next_cursor != 0) && this.tweeps.size() <= this.maxtweeps) { //  && (this.userdata.followers < this.tweeps.size())
				// we need to retrieve more data
				var retrTweepsC = Math.round(this.tweeps.size()/100)*100;
				$('statusmsg').update("finding tweeps ("+retrTweepsC+" of "+this.userdata.followers+" tweeps retrieved)");
				this.cursor = data.next_cursor;
				this.findTweeps();
			} else {
				// we have all the data
				this.startGraph();
			}
		}
		return this;
	},
	processTweep: function(tweep) {
		// in case incremental = true we will process each tweep indiviually
		// x-axis
		if (tweep.tweets > 0) {
			tweep.xScore = Math.floor(Math.log(tweep.tweets));
		} else {
			tweep.xScore = 0;
		}
		if (tweep.xScore > this.maxxScore) {
			this.maxxScore = tweep.xScore;
		}
		// y-axis
		if (tweep.friends > 0) {
			 tweep.yScore = Math.floor(Math.log(tweep.friends));
		} else {
			tweep.yScore = 0;
		}
		if (tweep.yScore > this.maxyScore) {
			this.maxyScore = tweep.yScore;
		}
		// r of cirkel
		if (tweep.followers > 0) {
			tweep.rScore = 1 + Math.floor(Math.log(tweep.followers));
		} else {
			tweep.rScore = 1;
		}
		if (tweep.rScore > this.maxrScore) {
			this.maxrScore = tweep.rScore;
		}
		// color
		if (tweep.fersfingratio < 1) {
			var color = 255;
		} else {
			var color = 255 - (15*Math.ceil(Math.log(tweep.fersfingratio)));
		}
		var colorstring = color.toString(16);
		//console.log(tweep.fersfingratio+" "+color+" "+colorstring+" "+colorstring.length);
		if (colorstring.length == 1) { colorstring = "0"+colorstring; }
		tweep.cScore = "A2DE"+colorstring;
		
		// console.log(tweep.screenname+" - "+tweep.xScore+" - "+tweep.yScore+" - "+tweep.rScore+" - "+tweep.cScore);
		if (typeof(this.graph) == 'undefined') {
			this.graph = new scalingScatterplot('tagcloud');
		}
		this.graph.dot(tweep);
		
		$('statusmsg').update("");
		clearspinner();
		return tweep;	
	},
	startGraph: function() {
		// finding some data
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
			// get ready for the Follower
			TotalOfFollowers += tweep.followers;
			if (tweep.followers > this.MaxFollowers) {
				this.MaxFollowers = tweep.followers;
			}
			if (tweep.followers < this.MinFollowers) {
				this.MinFollowers = tweep.followers;
			}
			// get ready for "following"
			TotalOfFriends += tweep.friends;
			if (tweep.friends > this.MaxFriends) {
				this.MaxFriends = tweep.friends;
			}
			if (tweep.friends < this.MinFriends) {
				this.MinFriends = tweep.friends;
			}
			// get ready for tweets
			TotalOfTweets += tweep.tweets;
			if (tweep.tweets > this.MaxTweets) {
				this.MaxTweets = tweep.tweets;
			}
			if (tweep.tweets < this.MinTweets) {
				this.MinTweets = tweep.tweets;
			}
			// fersfingratio
			if (tweep.fersfingratio > this.Maxfersfingratio) {
				this.Maxfersfingratio = tweep.fersfingratio;
			}
			if (tweep.fersfingratio < this.Minfersfingratio) {
				this.Minfersfingratio = tweep.fersfingratio;
			}	
		},this);
		
		
		/*
		// Avg uitrekenen
		this.AvgFollowers = Math.round(TotalOfFollowers/this.userdata.followers);
		this.AvgFriends = Math.round(TotalOfFriends/this.userdata.followers);
		this.AvgTweets = Math.round(TotalOfTweets/this.userdata.followers);
		// stdDev, MnDev uitrekenen voor Followers
		var distanceFollowers = 0;
		this.tweeps.each(function(tweep){
			distanceFollowers += Math.pow((tweep.followers-this.AvgFollowers),2);
		}, this);
		this.StDevFollowers = Math.sqrt(distanceFollowers/this.userdata.followers);
		this.MnDevFollowers = distanceFollowers/this.userdata.followers;
		
		// gegevens van de mediaan en de quartielen (ca.)
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
			// voor verschuiving over x-as kijken we naar aantal tweets t.o.v. Gem.
			if (tweep.tweets > 0) {
				this.tweeps[index].xScore = Math.floor(Math.log(tweep.tweets));
			} else {
				this.tweeps[index].xScore = 0;
			}
			if (this.tweeps[index].xScore > this.maxX) {
				this.maxX = this.tweeps[index].xScore;
			}
			// voor veschuiving over y-as kijken we naar "following"
			if (tweep.friends > 0) {
				this.tweeps[index].yScore = Math.floor(Math.log(tweep.friends));
			} else {
				this.tweeps[index].yScore = 0;
			}
			if (this.tweeps[index].yScore > this.maxY) {
				this.maxY = this.tweeps[index].yScore;
			}
			
			// radius van circel wordt bepaald door aantal followers
			if (tweep.followers > 0) {
				this.tweeps[index].rScore = 1 + Math.floor(Math.log(tweep.followers));
			} else {
				this.tweeps[index].rScore = 1;
			}
			if (this.tweeps[index].rScore > this.maxR) {
				this.maxR = this.tweeps[index].rScore;
			}
			
			// de kleur van de cirkel
			var color = 255 - Math.round(this.Cstepsize * (tweep.fersfingratio-this.Minfersfingratio));
			var colorstring = color.toString(16);
			if (colorstring.length == 1) { colorstring = "0"+colorstring; }
			this.tweeps[index].Cscore = "A2DE"+colorstring;
			this.tweeps[index].Dfol = this.MaxFollowers - tweep.followers; // used for the sorting later on ....
			// console.log(tweep.name+": "+tweep.fersfingratio+" - "+this.tweeps[index].Cscore);
			// console.log(tweep.screenname+" - "+tweep.xScore+" - "+tweep.yScore);
		},this);
		
		// sort the suckers, Desc based on followers
		this.tweeps = this.tweeps.sortBy(function(s) { return s.Dfol; });
		
		// setup the graph
		this.graph = new rScatterplot('tagcloud',this.maxX,this.maxY,this.maxR);
		// set the data for the searched tweep
		this.userdata.xScore = Math.floor(Math.log(this.userdata.tweets));
		this.userdata.yScore = Math.floor(Math.log(this.userdata.friends));
		this.userdata.rScore = Math.floor(Math.log(this.userdata.followers));
		this.userdata.Cscore = "e20a0c";
		
		if (window.Worker && UseWorker) {
			this.tweeps.push(this.userdata);
			// preprocess to get real values
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
																	 		// console.log(event.data);
																	 		if (BrowserDetect.browser=="Chrome") {
 																	 			$('statusmsg').update("Performing some math: "+event.data.msg);
 																	 		}
																	 		break;
																	 	default:
																	 		// console.log(event.data.msg);
																			me.tweeps = event.data.msg;//.evalJSON();
																			me.draw();
																			// worker.terminate();
																		}
																}, false);
			
			worker.addEventListener('error', function(event) {
																	console.log(event.message + " (" + event.filename + ":" + event.lineno + ")");
																	// worker.terminate();
																}, false);
			
			// var data = {"dots":this.dots,"x":x,"y":y,"r":r};
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
				// console.log(tweep.screenname+" - "+tweep.followers+" - "+tweep.fersfingratio+" - "+tweep.tweetsperday);
				this.graph.dot(tweep);
			},this);
		}
		return this;
	},
	draw: function() {
		// console.log("======");
		$('statusmsg').update("");
		clearspinner();
		this.tweeps.each(function(tweep) {
			// console.log(tweep.screenname+" - "+tweep.xScore+" - "+tweep.yScore);
			this.graph.dot(tweep);
		},this);
		return this;
	}
});

var scalingScatterplot = Class.create({
	// raphael.js based scatter plot as I want it
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
		
		// see if this Tweep fits in our current setup ...
		if (tweep.xScore > this.maxX) {
			// change the scale
			ratio = this.maxX/tweep.xScore;
			console.log("X "+tweep.screenname+": "+tweep.xScore+" > "+this.maxX+" ("+ratio+")");
			this.maxX = tweep.xScore;
			if (ratio < 1) {
				this.scale = ratio*this.scale;
				this.scaleNow();
			}
			
		}
		
		if (tweep.yScore > this.maxY) {
			// change the scale
			ratio = this.maxY/tweep.yScore;
			console.log("Y "+tweep.screenname+": "+tweep.yScore+" > "+this.maxY+" ("+ratio+")");
			this.maxY = tweep.yScore;
			if (ratio < 1) {
				this.scale = ratio*this.scale;
				this.scaleNow();
			}
		}
		
		
		// now put the dot in
		var x = (this.scale * tweep.xScore);
		var y = (this.scale * tweep.yScore);
		var r = Math.round((this.scale/100) * (tweep.rScore));
		
		x += r;
		y += r;
		
		/* non worker way */
		var realspot = [x,y,r];
		var realspot = findspot(this.dots,x,y,r);
		this.dots.push([realspot[0],realspot[1],realspot[2]]);
			
		// console.log(tweep.screenname+" "+realspot[0]+":"+realspot[1]+":"+realspot[2]);
		
		this.draw(realspot, tweep);

		return this;
	},
	scaleNow: function() {
		console.log("Scale: "+this.scale);
		// now scale all the dots ...
		this.tweeplist.each(function(item,index) {
			var newX = ((this.scale/100) * item.x);
			var newY = ((this.scale/100) * item.y);
			// console.log(this.tweeplist[index].y+ " >> "+newY);
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
		
		// console.log(tweep.screenname+" "+x+":"+y+":"+r);
		
		if (Math.ceil(r) >= 24) {
			var dodo = this.paper.circle(x, (this.Theight - y), r);
			dodo.attr({'stroke-width': '0', 'fill': color});
			// we will insert the image in a separate circle
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
			// as long as the mouse moves over the userinfo we should not hide it ...
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
					// the x is within the box, now check the y
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
	// raphael.js based scatter plot as I want it
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
			// we will insert the image in a separate circle
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
			// as long as the mouse moves over the userinfo we should not hide it ...
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
					// the x is within the box, now check the y
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
