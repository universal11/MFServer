var Net = require("net");
var Mysql = require("mysql");
var MFServer = require("./classes/MFServer.js");
var HOST = "localhost";
var PORT = 1337;
var mfServer = new MFServer();
var UUID = require("node-uuid");

console.log("Connecting to DB...");

var dbConnection = Mysql.createConnection({
	host:"localhost",
	user:"root",
	password:""
});



var Server = Net.createServer(function(socket){
	socket.mfClient = {
		is_authenticated:false,
		player_id:-1,
		client_id: UUID.v1()
	};

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
					if(!socket.mfClient.is_authenticated){
						socket.end();
						return 0;
					}
					mfServer.createPlayer(data, dbConnection);
					break;
				case MFServer.ACTIONS.BROADCAST:
					if(!socket.mfClient.is_authenticated){
						socket.end();
						return 0;
					}
					mfServer.broadcast(data);
					break;
				case MFServer.ACTIONS.QUIT:
					socket.end(); 
					break;
				case MFServer.ACTIONS.AUTHENTICATE:
					mfServer.authenticate(socket, data, dbConnection); 
					break;
				case MFServer.ACTIONS.GET_CLIENT_ID:
					if(!socket.mfClient.is_authenticated){
						socket.end();
						return 0;
					}
					mfServer.getClientId(socket); 
					break;
				case MFServer.ACTIONS.ATTACK:
					if(!socket.mfClient.is_authenticated){
						socket.end();
						return 0;
					}
					mfServer.attack(data); 
					break;
				case MFServer.ACTIONS.CREATE_BATTLE:
					if(!socket.mfClient.is_authenticated){
						socket.end();
						return 0;
					}
					mfServer.createBattle(data, dbConnection); 
					break;
				case MFServer.ACTIONS.CREATE_TEAM:
					if(!socket.mfClient.is_authenticated){
						socket.end();
						return 0;
					}
					mfServer.createTeam(data, dbConnection); 
					break;
				default:
					break;
			}
		}

	});

	socket.on("end", function(){
		console.log("Client disconnected!");
		mfServer.removeSocket(socket.mfClient.client_id);
	});

}).listen(PORT, HOST);



console.log("Server started.");