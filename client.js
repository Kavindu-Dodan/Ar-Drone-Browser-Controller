/*
	Contain all client requests and feeds 
	Dodanduwa K.C - 19/01/2014
	Functions are executed on serverside
*/

	function startArDRoneStream(){
		new NodecopterStream(document.getElementById("video"), {port: 3001});
	}
	
	function controller(){	 
		var socket = io.connect('http://localhost:3002');
		socket.on('connect', function () {
		console.log("Connection Successful");
			$("#status").html("Connected");
		});

		 socket.on('event',function(data){
			if(data.name=="battery"){
				$("#batteryPercentage").html(data.value+"%");
			}
		 });
		 
		 //Row 1
		$("#up").click(function(){
			socket.emit('event',{name:"up"});
		});
		$("#front").click(function(){
			socket.emit('event',{name:"front"});
		});
		$("#down").click(function(){
			socket.emit('event',{name:"down"});
		});
		
		//Row 2
		$("#left").click(function(){
			socket.emit('event',{name:"left"});
		});
		$("#stop").click(function(){
			socket.emit('event',{name:"stop"});
		});
		$("#right").click(function(){
			socket.emit('event',{name:"right"});
		});
		
		//Raw 3
		$("#counterclockwise").click(function(){
			socket.emit('event',{name:"counterclockwise"});
		});
		$("#back").click(function(){
			socket.emit('event',{name:"back"});
		});
		$("#clockwise").click(function(){
			socket.emit('event',{name:"clockwise"});
		});
		
		// Others
		$("#takeoff").click(function(){
			socket.emit('event',{name:"takeoff"});
		});
		$("#land").click(function(){
			socket.emit('event',{name:"land"});
		});
		$("#emergency").click(function(){
			socket.emit('event',{name:"emergency"});
		});	
	}
	