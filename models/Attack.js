function Attack(){

}

Attack.create = function(data, db_connection){
	db_connection.query("INSERT INTO mightyfrighties.attacks(fk_battle_id, fk_player_creature_ability_id) VALUES(" + data.battle_id + ", " + data.player_creature_ability_id+ ")", function(error, rows){
		if(error){
			console.log(error);
			throw error;
			return 0;
		}


	});
}

module.exports = Attack;