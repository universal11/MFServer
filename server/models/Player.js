var UUID = require("node-uuid");

function Player(){
}


Player.create = function(data, dbConnection){
	dbConnection.query("INSERT IGNORE INTO mightyfrighties.players(name, email_address) VALUES('" + data.name + "', '" + data.email_address + "')", function(error, rows){
		if(error){
			console.log(error);
			throw error;
		}
	});
}


Player.getById = function(id, dbConnection){
	dbConnection.query("SELECT * FROM database.players WHERE id = " + id + " LIMIT 1", function(errors, rows){
		if(error){
			console.log(error);
			throw error;
		}

	});
}

Player.attack = function(socket, recipientSocket, data, dbConnection){
	recipientSocket.write("Attack ID: " + 12345 +  "You have been attacked! ");
	socket.write("Attack successful!");
}

Player.authenticate = function(socket, data, dbConnection){
	var response = {
		success:false,
		player_id: -1,
		auth_key:socket.mfClient.client_id,
		message:"Authentication Failed."
	};

	dbConnection.query("SELECT * FROM mightyfrighties.players WHERE email_address = '" + data.email_address + "' AND password = '" + data.password + "' LIMIT 1", function(error, rows){
		if(error){
			console.log(error);
			throw error;
		}
		if(rows.length > 0){
			response.success = true;
			response.player_id = rows[0].player_id;
			response.message = "Successfully authenticated!";

			dbConnection.query("UPDATE mightyfrighties.players SET auth_key = '" + response.auth_key + "', last_authentication_date = NOW() WHERE player_id = " + response.player_id, function(error, rows){
				if(error){
					console.log(error);
					throw error;
				}
			});
		}

		socket.mfClient.auth_key = response.auth_key;
		socket.mfClient.player_id = response.player_id;
		socket.mfClient.is_authenticated = response.success;

		socket.write(JSON.stringify(response) + "\r\n");
	});
}

module.exports = Player;