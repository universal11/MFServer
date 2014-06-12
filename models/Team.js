function Team(){

}

Team.create = function(data, db_connection){
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
				TeamPlayer.create(result, db_connection);
				
			});
			
		});
	});

	

	
}


module.exports = Team;