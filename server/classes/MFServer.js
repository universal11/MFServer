var Models = require("../models");
var Player = Models.Player;
var Creature = Models.Creature;
var Ability = Models.Ability;

function MFServer(){
	this.clients = new Array();
}

MFServer.ACTIONS = {
	CREATE_PLAYER : "create-player:",
	BROADCAST : "broadcast:",
	QUIT : "quit\r\n",
}

MFServer.prototype.addClient = function(client){
	this.clients.push(client);
}

MFServer.prototype.process = function(data, dbConnection){
	
}

MFServer.createPlayer = function(data, dbConnection){
	Player.create(data, dbConnection);
}



MFServer.createCreature = function(data, dbConnection){
	Creature.create(data, dbConnection);
}

MFServer.prototype.getPlayer = function(){

}

MFServer.prototype.broadcast = function(data){
	this.clients.forEach(function(client){
		client.write("Broadcast Message: " + data);
	});
}

module.exports = MFServer;