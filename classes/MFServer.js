var Models = require("../models");
var Player = Models.Player;
var Creature = Models.Creature;
var Ability = Models.Ability;
var UUID = require("node-uuid");

function MFServer(){
	this.sockets = new Array();
}

MFServer.ACTIONS = {
	CREATE_PLAYER : 11111,
	BROADCAST : 22222,
	QUIT : 33333,
	AUTHENTICATE : 44444,
	GET_CLIENT_ID : 55555,
	ATTACK: 66666,
	CREATE_BATTLE: 77777
}

MFServer.prototype.getActionNameById = function(actionId){
	switch(actionId){
		case MFServer.ACTIONS.CREATE_PLAYER:
			return "Create Player";
		case MFServer.ACTIONS.BROADCAST:
			return "Broadcast";
		case MFServer.ACTIONS.QUIT:
			return "Quit";
		case MFServer.ACTIONS.AUTHENTICATE:
			return "Authenticate";
		case MFServer.ACTIONS.GET_CLIENT_ID:
			return "Get Client ID";
		case MFServer.ACTIONS.ATTACK:
			return "Attack";
		case MFServer.ACTIONS.CREATE_BATTLE:
			return "Create Battle";
		default:
			return "Unknown";
	}
}

MFServer.prototype.addSocket = function(socket){
	this.sockets[socket.mfClient.client_id] = socket;
}

MFServer.prototype.removeSocket = function(socket){

}

MFServer.prototype.createPlayer = function(data, dbConnection){
	Player.create(data, dbConnection);
}

MFServer.prototype.getSocketByClientId = function(client_id){
	var socket = this.sockets[client_id];
	if(socket === undefined){ return false; }
	return socket;
}

MFServer.prototype.attack = function(data, dbConnection){
		Player.attack(data, dbConnection);
		this.transmit(data, data.recipient_client_id);
}

MFServer.prototype.transmit = function(data, recipient_client_id){
	var socket = this.getSocketByClientId(recipient_client_id);
	if(socket){
		socket.write(JSON.stringify(data) + "\r\n");
	}
}

MFServer.prototype.createCreature = function(data, dbConnection){
	Creature.create(data, dbConnection);
}

MFServer.prototype.getClientPlayerId = function(socket){
	return socket.mfClient.player_id;
}

MFServer.prototype.isClientAuthenticated = function(socket){
	return socket.mfClient.is_authenticated;
}

MFServer.prototype.getClientId = function(socket){
	return socket.write(socket.mfClient.auth_key + "\r\n");
}

MFServer.prototype.authenticate = function(socket, data, dbConnection){
	if(!socket.mfClient.is_authenticated){
		this.addSocket(socket);
		Player.authenticate(socket, data, dbConnection);
	}
}

MFServer.prototype.createBattle = function(data, dbConnection){
	Battle.create(data, dbConnection);
}

MFServer.prototype.broadcast = function(data){
	var data = data;
	this.sockets.forEach(function(socket){
		socket.write(JSON.stringify(data) + "\r\n");
	});
}

module.exports = MFServer;