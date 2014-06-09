var Models = require("../models");
var Player = Models.Player;
var Creature = Models.Creature;
var Ability = Models.Ability;

function MFServer(){
	this.clients = new Array();
}

MFServer.ACTIONS = {
	CREATE_PLAYER : 11111,
	BROADCAST : 22222,
	QUIT : 33333,
	AUTHENTICATE : 44444
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
		default:
			return "Unknown";
	}
}

MFServer.prototype.addClient = function(player_id, client){
	this.clients[player_id] = client;
}

MFServer.prototype.getClientByPlayerId = function(player_id){
	return this.clients[player_id];
}

MFServer.prototype.createPlayer = function(data, dbConnection){
	Player.create(data, dbConnection);
}



MFServer.createCreature = function(data, dbConnection){
	Creature.create(data, dbConnection);
}

MFServer.prototype.getPlayer = function(){

}

MFServer.prototype.authenticate = function(client, data, dbConnection){
	Player.authenticate(client, data, dbConnection);
}

MFServer.prototype.createBattle = function(data, dbConnection){
	Battle.create(data, dbConnection);
}

MFServer.prototype.broadcast = function(data){
	this.clients.forEach(function(client){
		client.write("Received Message: " + data.message);
	});
}

module.exports = MFServer;