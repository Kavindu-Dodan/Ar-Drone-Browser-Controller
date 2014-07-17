/*
	Contain all server requests and feeds 
	Dodanduwa K.C - 19/01/2014
	Functions are executed on serverside
*/

// Express 
var express=require("express");
var app=express();
var server=require("http").createServer(app);

app.use(express.static(__dirname));
app.listen(3000);

// Camera feed 
require("dronestream").listen(3001);
console.log("Express created and drone-stream ok");


// Socket IO
var io=require('socket.io').listen(3002);
io.set('log level',1); // Loging level, nothing fancy

io.sockets.on('connection',function(socket){
	var arDrone = require('ar-drone');
	var client  = arDrone.createClient(); // Complete package with all the functions
	
	client.config('general:navdata_demo','FALSE');
	console.log("Server connected..");
	
	//Updates battery level 
	var delay=1000; // TIMEOUT VALUE
	var speed=0.2; // Speed value 
	
	setInterval(function(){
		var bat_lev=client.battery();
		socket.emit('event',{name:'battery',value:bat_lev});
	},delay);
	
	//Drone Controlling
	socket.on('event',function(data){
		//Row 1
		if(data.name=="up"){
			client.up(speed);
			console.log("Going up at "+speed+" speed ; Press STOP to stop movement");
		}
		if(data.name=="front"){
			client.front(speed);
			console.log("Going front at "+speed+" speed ; Press STOP to stop movement");
		}
		if(data.name=="down"){
			client.down(speed);
			console.log("Going down at "+speed+" speed ; Press STOP to stop movement");
		}
		//Row 2
		if(data.name=="left"){
			client.left(speed);
			console.log("Going left at "+speed+" speed ; Press STOP to stop movement");
		}
		if(data.name=="stop"){
			client.stop();
			console.log("Going stop any movement");
		}
		if(data.name=="right"){
			client.right(speed);
			console.log("Going right at "+speed+" speed ; Press STOP to stop movement");
		}
		//Row 3
		if(data.name=="counterclockwise"){
			client.counterClockwise(speed);
			console.log("Going counterClockwise at "+speed+" speed ; Press STOP to stop movement");
		}
		if(data.name=="back"){
			client.back(speed);
			console.log("Going back at "+speed+" speed ; Press STOP to stop movement");
		}
		if(data.name=="clockwise"){
			client.clockwise(speed);
			console.log("Going clockwiset at "+speed+" speed ; Press STOP to stop movement");
		}		
		// Other parameters
		if(data.name=="takeoff"){
			client.takeoff();
			console.log("Drone takeoff");
		}
		if(data.name=="land"){
			client.land();
			console.log("Drone landing");
		}
		if(data.name=="emergency"){
			client.stop()
			client.land();
			console.log("Drone emergency landing");
		}	
	}); 

});