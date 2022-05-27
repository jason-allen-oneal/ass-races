import Button from '../components/button.js';
import ScoreModal from '../components/score-modal.js';

class GameOverScene extends AR.Classes.Scene {
	ass: AR.Types.Ass;
	asses: AR.Types.Ass[];
	winner: AR.Types.Ass;
	opponents: AR.Types.Ass[];
	scores: AR.Types.Score[];
	
	constructor(){
		super({key: 'gameOverScene'});
	}
	
	init(data): void {
		this.ass = data.ass;
		this.winner = data.winner;
		this.opponents = data.opponents;
	}
	
	preload(): void {
		/*
		this.plugins.get('rexwebfontloaderplugin').addToScene(this);
		this.load.rexWebFont({
			google: {
				families: this.game.config.Game.fonts
			}
		});
		*/
	}
	
	create(): void {
		let gameWidth = this.cameras.main.width;
		let gameHeight = this.cameras.main.height;
		let sceneText;
		
		if(this.winner.id == this.ass.id){
			this.ass.wins += 1;
			this.winnerAnimation();
			
			sceneText = this.add.text(0, 0, 'WINNER', {
				fontFamily: 'Luckiest Guy',
				fontSize: '80px',
				color: '0x99EDCC'
			});
		}else{
			this.ass.losses += 1;
			sceneText = this.add.text(0, 0, 'YOU LOST!', {
				fontFamily: 'Luckiest Guy',
				fontSize: '80px',
				color: '0xFF0000'
			});
		}
		let textBounds = sceneText.getBounds();
		sceneText.setPosition(gameWidth/2-textBounds.width/2, gameHeight/4);
		this.add.existing(sceneText);
		
		let playButton = new Button(this, {x: gameWidth/4, y: gameHeight/1.4, text: 'Play Again', callback: () => this.playAgain()});
		let quitButton = new Button(this, {x: gameWidth/1.37, y: gameHeight/1.4, text: 'Quit', callback: () => this.quitGame()});
	}
	
	winnerAnimation(): void {
		let p0 = new Phaser.Math.Vector2(200, 500);
		let p1 = new Phaser.Math.Vector2(200, 200);
		let p2 = new Phaser.Math.Vector2(600, 200);
		let p3 = new Phaser.Math.Vector2(600, 500);
		
		let curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);
		
		let max = 28;
		let points = [];
		let tangents = [];
		
		for (let c = 0; c <= max; c++) {
			let t = curve.getUtoTmapping(c / max, max);
			
			points.push(curve.getPoint(t));
			tangents.push(curve.getTangent(t));
		}
		
		let tempVec = new Phaser.Math.Vector2();
		
		let spark0 = this.add.particles('red');
		let spark1 = this.add.particles('blue');
		
		for (let i = 0; i < points.length; i++) {
			let p = points[i];
				tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);
			let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));
			
			let particles = (i % 2 === 0) ? spark0 : spark1;
			
			particles.createEmitter({
				x: tempVec.x,
				y: tempVec.y,
				angle: angle,
				speed: { min: -100, max: 500 },
				gravityY: 200,
				scale: {
					start: 0.4,
					end: 0.1
				},
				lifespan: 900,
				blendMode: 'SCREEN'
			});
		}
	}
	
	playAgain(): void {
		this.doUpdates(() => {
			this.scene.start('wagerScene', {asses: this.asses});
		});
	}
	
	quitGame(): void {
		let quitModal = new ScoreModal(this, (name) => {
			globalThis.socket.emit('add-score', {name: name, cash: this.registry.get('cash')});
			globalThis.socket.on('add-score-response', (result) => {
				this.scores = result.scores;
			
				this.doUpdates(() => {
					this.scene.start('menuScene', {asses: this.asses, scores: this.scores});
				});
			});
		});
		let modal = quitModal.getDialog();
		this.rexUI.modalPromise(modal.setPosition(400, 300), {
			manualClose: true,
			duration: {
				in: 500,
				out: 500
			}
		}).then(function (result) {
			//console.log(result.text);
		});
	}
	
	doUpdates(cb){
		let updates = [];
		for(let opponent of this.opponents){
			if(this.winner.id == opponent.id){
				opponent.wins += 1;
			}else{
				opponent.losses += 1;
			}
			updates.push(opponent);
		}
		updates.push(this.ass);
		
		globalThis.socket.emit('update-asses', updates);
		globalThis.socket.on('update-asses-response', (res) => {
			this.asses = res.asses;
			cb();
		});
	}
}

export default GameOverScene;
