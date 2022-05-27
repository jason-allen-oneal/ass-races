import Button from '../components/button';

class MenuScene extends Phaser.Scene {
	asses: object[];
	scores: object[];
	
	constructor(){
		super({
			key: 'menuScene',
			pack: {
				files: [
					{
						type: 'plugin',
						key: 'rexwebfontloaderplugin',
						url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js'
					}
				]
			}
		});
	}
	
	init(data): void {
		this.asses = data.asses;
		this.scores = data.scores;
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
		
		this.add.image(400, 300, 'flags');
		
		let text = this.add.text(0, 0, 'ASS RACES!', {
			fontFamily: 'Barrio',
			fontSize: '80px',
			color: '#DE9E36',
		});
		let textBounds = text.getBounds();
		text.setPosition(gameWidth/2-textBounds.width/2, gameHeight/4);
		
		let playButton = new Button(this, {x: gameWidth/4, y: gameHeight/1.4, text: 'Play Now!', callback: () => this.scene.start('wagerScene', {asses: this.asses})});
		
		let scoresButton = new Button(this, {x: gameWidth/1.37, y: gameHeight/1.4, text: 'HiScores', callback: () => this.scene.start('scoresScene', {scores: this.scores})});
	}
}

export default MenuScene;
