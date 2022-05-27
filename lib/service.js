class GameService {
	constructor(core){
		this.core = core;
	}
	
	async getAsses(){
		var asses = [];
		var query = 'SELECT * FROM asses';
		var results = await this.core.db.query(query);
		for(var a of results){
			asses.push(a);
		}
		return asses;
	}
	
	async updateAsses(asses){
		for(var ass of asses){
			var query = 'UPDATE asses SET wins = '+ass.wins+', losses = '+ass.losses+' WHERE id = '+ass.id;
			var res = await this.core.db.query(query);
			return await this.getAsses();
		}
	}
	
	async getScores(){
		var query = 'SELECT * FROM hiscores ORDER BY cash DESC LIMIT 10';
		return this.core.db.query(query);
	}
	
	async addScore(name, cash){
		var query = 'INSERT INTO hiscores (name, cash) VALUES ("'+name+'", '+cash+')';
		this.core.db.query(query).then(async (result) => {
			return await this.getScores();
		});
	}
	
	async getOpponents(id){
		var query = 'SELECT * FROM asses WHERE id != '+id+' ORDER BY RAND() LIMIT 4';
		return this.core.db.query(query);
	}
}

module.exports = (core) => {
	return new GameService(core);
};
