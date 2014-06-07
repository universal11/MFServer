function Ability(){
	this.name = "";
}

Ability.prototype.init = function(name){
	this.name = name;
}

module.exports = Ability;