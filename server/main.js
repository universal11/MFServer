var Net = require("net");
var Mysql = require("mysql");
var MFServer = require("./classes/MFServer.js");
var HOST = "localhost";
var PORT = 1337;
var mfServer = new MFServer();



console.log("Connecting to DB...");

var dbConnection = Mysql.createConnection({
	host:"localhost",
	user:"root",
	password:""
});



var Server = Net.createServer(function(socket){
	socket.write("Connected to " + socket.localAddress + ":" + socket.localPort + "\r\n");
	socket.write("From " + socket.remoteAddress + ":" + socket.remotePort + "\r\n");
	socket.on("data", function(data){
		data = data.toString();
		if(data != "\r\n" && data != ""){
			var dataAsJsonString = data;
			try{
				data = JSON.parse(data);
			}
			catch(exception){
				console.log("Request: " + dataAsJsonString);
				console.log("Parse error: " + exception);
				return 0;
			}
			console.log("Request: " + mfServer.getActionNameById(data.action) + dataAsJsonString);
			switch(data.action){
				case MFServer.ACTIONS.CREATE_PLAYER:
					mfServer.createPlayer(data, dbConnection);
					break;
				case MFServer.ACTIONS.BROADCAST:
					mfServer.broadcast(data);
					break;
				case MFServer.ACTIONS.QUIT:
					socket.end(); 
					break;
				case MFServer.ACTIONS.AUTHENTICATE:
					mfServer.authenticate(socket, data, dbConnection); 
					break;
				default:
					break;
			}
		}

	});

	socket.on("end", function(){
		console.log("Client disconnected!");
	});

}).listen(PORT, HOST);



console.log("Server started.");