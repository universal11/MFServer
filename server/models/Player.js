function Player(){
	this.id = -1;
	this.name = "";
	this.emailAddress = "";
}

Player.prototype.init = function(id, name, emailAddress){
	this.id = id;
	this.name = name;
	this.emailAddress = emailAddress;
}

Player.prototype.getName = function(){
	return this.name;
}

Player.prototype.getEmailAddress = function(){
	return this.emailAddress;
}

Player.getById = function(id, dbConnection){
	dbConnection.query("SELECT * FROM database.players WHERE id = " + id + " LIMIT 1", function(errors, rows, fields){
		if(error){
			console.log(error);
			throw error;
		}



	});
}

module.exports = Player;