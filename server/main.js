var io = require("socket.io").listen(1337);
//var mysql = require("mysql");
var Models = require("./models");
var Player = Models.Player;
var Creature = Models.Creature;
var Ability = Models.Ability;

/*
var dbConnection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"password"
});
*/

//var player = Player.getById(1, dbConnection);

console.log("Server started.");

var player = new Player();
player.init(1, "Bob", "test@hotmail.com");
console.log(player);