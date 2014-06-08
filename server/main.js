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
	mfServer.addClient(socket);
	socket.write("Connected to " + HOST + ":" + PORT + "\r\n");
	socket.write("From " + socket.remoteAddress + ":" + socket.remotePort + "\r\n");
	socket.on("data", function(data){
		
		data = data.toString();
		console.log("Processing...");
		console.log(data);

		if(data.indexOf(MFServer.ACTIONS.CREATE_PLAYER) > -1){
			data = data.replace(MFServer.ACTIONS.CREATE_PLAYER, "");
			data = JSON.parse(data);
			MFServer.createPlayer(data, dbConnection);
		}
		else if(data.indexOf(MFServer.ACTIONS.BROADCAST) > -1){
			data = data.replace(MFServer.ACTIONS.BROADCAST, "");
			//data = JSON.parse(data);
			mfServer.broadcast(data);
		}
		if(data == MFServer.ACTIONS.QUIT){ 
			socket.end(); 
			return 0;
		}

		mfServer.process(data.toString(), dbConnection);
	});

	socket.on("end", function(){
		console.log("Client disconnected!");
	});

}).listen(PORT, HOST);



console.log("Server started.");