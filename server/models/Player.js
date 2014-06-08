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

Player.prototype.initFromResult = function(result){

}

Player.prototype.getName = function(){
	return this.name;
}

Player.prototype.getEmailAddress = function(){
	return this.emailAddress;
}

Player.create = function(data, dbConnection){
	console.log("Creating Player...");
	console.log(data);
	dbConnection.query("INSERT INTO mightyfrighties.players(name, email_address) VALUES('" + data.name + "', '" + data.emailAddress + "')", function(error, rows, fields){
		if(error){
			console.log(error);
			throw error;
		}

	});
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