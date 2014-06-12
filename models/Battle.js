function Battle(){

}

Battle.STATUS = {
	PENDING: 0,
	IN_PROGRESS: 1,
	COMPLETE: 2
}

Battle.create = function(data, db_connection, sockets){
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



module.exports = Battle;