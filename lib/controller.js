class GameController {
	constructor(){}
	
	init(core, socket){
		socket.on('game-start', async () => {
			var asses = await core.service.getAsses();
			var scores = await core.service.getScores();
			socket.emit('game-start-response', {asses: asses, scores: scores});
		});
		
		socket.on('race-start', async (data) => {
			var opponents = await core.service.getOpponents(data.id);
			socket.emit('race-start-response', {opponents: opponents});
		});
		
		socket.on('get-hi-scores', async () => {
			var scores = await core.service.getScores();
			socket.emit('get-hi-scores-response', scores);
		});
		
		socket.on('add-score', async (data) => {
			var scores = await core.service.addScore(data.name, data.cash);
			socket.emit('add-score-response', {scores: scores});
		});
		
		socket.on('update-asses', async (data) => {
			var result = await core.service.updateAsses(data);
			socket.emit('update-asses-response', {asses: result});
		});
	}
}

module.exports = new GameController();
