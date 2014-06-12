function TeamPlayer(){

}

TeamPlayer.create = function(data, db_connection){

	db_connection.query("INSERT INTO mightyfrighties.team_players(fk_player_id, fk_team_id) VALUES("+ data.player_id +", " + data.team_id + ")", function(error, rows){
		if(error){
			console.log(error);
			throw error;
			return 0;
		}
		console.log(rows);
	});
}

module.exports = TeamPlayer;
