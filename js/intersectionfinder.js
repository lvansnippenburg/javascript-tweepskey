var tweeps = [];
var tweepsprocessed = [];

self.addEventListener('message', function(event) {
	if (typeof(event.data) == 'string') {
		tweeps = JSON.parse(event.data)
	} else {
		tweeps = event.data;
	}
	self.postMessage({'msgtype': 'start', 'msg': 'ok'});
	for (var i=0; i < tweeps.length; i++) {
		// for each of the tweeps we are going to find out if it intersects with an earlier dot
		var thistweep = tweeps[i];
		var x = thistweep.xScore;
		var y = thistweep.yScore;
		var r = thistweep.rScore;
		var result = findspot(tweepsprocessed, x, y, r);
		tweeps[i].xScore = result[0];
		tweeps[i].yScore = result[1];
		tweepsprocessed.push([tweeps[i].xScore,tweeps[i].yScore,r]);
		self.postMessage({'msgtype': 'start', 'msg': i});
	}
	self.postMessage({'msgtype': 'result', 'msg': tweeps}); //JSON.stringify(tweeps));
},false);

function test(tweeps) {
	if (typeof(tweeps) == 'string') {
		
		tweeps = JSON.parse(tweeps)
	} else {
		tweeps = tweeps;
	}
	for (var i=0; i < tweeps.length; i++) {
		// for each of the tweeps we are going to find out if it intersects with an earlier dot
		var thistweep = tweeps[i];
		var x = thistweep.xScore;
		var y = thistweep.yScore;
		var r = thistweep.rScore;
		// console.log(thistweep.name+" "+x+" "+y+" "+r);
		var result = findspot(tweepsprocessed, x, y, r);
		tweeps[i].xScore = result[0];
		tweeps[i].yScore = result[1];
		// console.log(thistweep.name+" "+tweeps[i].xScore+" "+tweeps[i].yScore+" "+r);
		tweepsprocessed.push([tweeps[i].xScore,tweeps[i].yScore,r]);
		// console.log(tweepsprocessed.length);
	}
	return JSON.stringify(tweeps);
}

function findintersection(data, x, y, r) {
	var intersect = false;
	//data.each(function(item) {
	for (var i=0; i < data.length; i++) {
		var itemX = data[i][0];
		var itemY = data[i][1];
		var itemR = data[i][2];
		// the distance between the 2 centre points
		var ls = Math.sqrt(Math.pow((x-itemX),2) + Math.pow((y-itemY),2));
		if (ls < (itemR + r)) {
			// there is an intersection
			// console.log(itemX+":"+itemY+":"+(itemR + r));
			intersect = [itemX,itemY,(itemR + r)];
			break;
		}
	};
	return intersect;
}

function findspot(data, x, y, r) {
	var intersect = findintersection(data, x, y, r);
	while (intersect !== false) {
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
		intersect = findintersection(data, x, y, r);
	}
	return [x,y,r];
}