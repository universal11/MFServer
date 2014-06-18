//var Models = require("../models");
//var Player = Models.Player;
//var Battle = Models.Battle;
//var Team = Models.Team;
//var Creature = Models.Creature;
//var Ability = Models.Ability;
//var Attack = Models.Attack;
//var UUID = require("node-uuid");

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
	CREATE_BATTLE: 77777,
	CREATE_TEAM: 11,
	GET_PLAYER_CREATURES:3
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
		case MFServer.ACTIONS.CREATE_TEAM:
			return "Create Team";
		case MFServer.ACTIONS.GET_PLAYER_CREATURES:
			return "Get Player Creatures";
		default:
			return "Unknown";
	}
}

MFServer.prototype.getSockets = function(){
	return this.sockets;
}

MFServer.prototype.addSocket = function(socket){
	this.sockets[socket.mfClient.client_id] = socket;
}

MFServer.prototype.removeSocket = function(socket){

}

MFServer.prototype.createPlayer = function(data, db_connection){
	//Player.create(data, dbConnection);
	db_connection.query("INSERT IGNORE INTO mightyfrighties.players(name, email_address) VALUES('" + data.name + "', '" + data.email_address + "')", function(error, rows){
		if(error){
			console.log(error);
			throw error;
		}
	});
}

MFServer.prototype.getSocketByClientId = function(client_id){
	var socket = this.sockets[client_id];
	if(socket === undefined){ return false; }
	return socket;
}

MFServer.prototype.attack = function(data, db_connection){
		//Player.attack(data, dbConnection);
		//Attack.create(data, db_connection);
		//this.transmit(data, data.recipient_client_id);

		db_connection.query("INSERT INTO mightyfrighties.attacks(fk_battle_id, fk_player_creature_ability_id) VALUES(" + data.battle_id + ", " + data.player_creature_ability_id+ ")", function(error, rows){
		if(error){
			console.log(error);
			throw error;
			return 0;
		}

	});
}

MFServer.prototype.transmit = function(data, recipient_client_id){
	var socket = this.getSocketByClientId(recipient_client_id);
	if(socket){
		socket.write(JSON.stringify(data) + "\r\n");
	}
}

MFServer.prototype.createCreature = function(data, dbConnection){
	//Creature.create(data, dbConnection);
}

MFServer.prototype.getClientPlayerId = function(socket){
	return socket.mfClient.player_id;
}

MFServer.prototype.isClientAuthenticated = function(socket){
	return socket.mfClient.is_authenticated;
}

MFServer.prototype.getClientId = function(socket){
	return socket.write(socket.mfClient.client_id + "\r\n");
}

MFServer.prototype.authenticate = function(socket, data, db_connection){
	if(!socket.mfClient.is_authenticated){
		this.addSocket(socket);
		//Player.authenticate(socket, data, db_connection);
		var response = {
			success:false,
			player_id: -1,
			client_id:socket.mfClient.client_id,
			message:"Authentication Failed."
		};

		db_connection.query("SELECT * FROM mightyfrighties.players WHERE email_address = '" + data.email_address + "' AND password = '" + data.password + "' LIMIT 1", function(error, rows){
			if(error){
				console.log(error);
				throw error;
			}
			if(rows.length > 0){
				response.success = true;
				response.player_id = rows[0].player_id;
				response.message = "Successfully authenticated!";

				db_connection.query("UPDATE mightyfrighties.players SET last_client_id = '" + response.client_id + "', last_authentication_date = NOW() WHERE player_id = " + response.player_id, function(error, rows){
					if(error){
						console.log(error);
						throw error;
					}
				});
			}

			socket.mfClient.client_id = response.client_id;
			socket.mfClient.player_id = response.player_id;
			socket.mfClient.is_authenticated = response.success;

			socket.write(JSON.stringify(response) + "\r\n");
		});
	}
}

MFServer.prototype.getPlayerCreatures = function(data, db_connection, socket){
	//PlayerCreature.getByPlayerId(data, db_connection, socket);

	db_connection.query("SELECT * FROM mightyfrighties.players WHERE last_client_id = '" + socket.mfClient.client_id + "'", function(error, rows){
		if(error){
			console.log(error);
			throw error;
			return 0;
		}

		db_connection.query("SELECT * FROM mightyfrighties.player_creatures WHERE fk_player_id = " + rows[0].player_id, function(error, rows){
			if(error){
				console.log(error);
				throw error;
				return 0;
			}

			socket.write(JSON.stringify(rows));
		});

	});

	
}

MFServer.prototype.createTeam = function(data, db_connection){
	//Team.create(data, db_connection);
	var team_client_id_list = data.team_client_id_list;
	var team_id = 0;

	db_connection.query("INSERT INTO mightyfrighties.teams()VALUES()", function(error, rows){
		//do stuff
		if(error){
			console.log(error);
			throw error;
			return 0;
		}
		team_id = rows.insertId;

		team_client_id_list.forEach(function(team_client_id){

			db_connection.query("SELECT * FROM mightyfrighties.players WHERE last_client_id = '" + team_client_id + "' LIMIT 1", function(error, rows){
				if(error){
					console.log(error);
					throw error;
					return 0;
				}
				var result = rows[0];
				result.team_id = team_id;
				//TeamPlayer.create(result, db_connection);
				db_connection.query("INSERT INTO mightyfrighties.team_players(fk_player_id, fk_team_id) VALUES("+ data.player_id +", " + data.team_id + ")", function(error, rows){
					if(error){
						console.log(error);
						throw error;
						return 0;
					}
					console.log(rows);
				});
				
			});
			
		});
	});
}

MFServer.prototype.createBattle = function(data, db_connection, sockets){
	//Battle.create(data, dbConnection, sockets);
	var battle_id = 0;
	db_connection.query("INSERT INTO mightyfrighties.battles(fk_home_team_id, fk_away_team_id) VALUES(" + data.home_team_id + ", " + data.away_team_id + ")", function(error, rows){
		if(error){
			console.log(error);
			throw error;
			return 0;
		}
		battle_id = rows.insertId;
		db_connection.query("SELECT p.last_client_id FROM mightyfrighties.teams t LEFT JOIN mightyfrighties.team_players AS `tp` ON t.team_id = tp.fk_team_id LEFT JOIN mightyfrighties.players AS `p` ON tp.fk_player_id = p.player_id WHERE t.team_id IN (" + data.home_team_id + ", " + data.away_team_id + ");", function(error, rows){
			if(error){
				console.log(error);
				throw error;
				return 0;
			}
			var player_list = rows;
			player_list.forEach(function(player){
				var socket = sockets[player.last_client_id];
				socket.mfClient.current_battle_id = battle_id;
				socket.write("BattleID: " + battle_id + " Started!\r\n");
			});
		});

	});
}

MFServer.prototype.broadcast = function(data){
	var data = data;
	this.sockets.forEach(function(socket){
		socket.write(JSON.stringify(data) + "\r\n");
	});
}

module.exports = MFServer;