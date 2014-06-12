function Battle(){

}

Battle.STATUS = {
	PENDING: 0,
	IN_PROGRESS: 1,
	COMPLETE: 2
}

Battle.create = function(data, db_connection){
	var client_id_list = data.client_id_list;

	db_connection.query("INSERT INTO mightyfrighties.battles() VALUES()", function(error, rows){
		//do stuff
		if(error){
			console.log(error);
			throw error;
			return 0;
		}

		var battle_id = rows.insertId;

		db_connection.query("INSERT INTO mightyfrighties.teams() VALUES (), ()", function(error, rows){

		});


		console.log("Battle Rows");
		console.log(rows);
	});
}



module.exports = Battle;
