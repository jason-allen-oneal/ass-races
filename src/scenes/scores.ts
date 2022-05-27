import Button from '../components/button';

class ScoresScene extends Phaser.Scene {
	scores: {name: string, cash: number}[];
	
	constructor(){
		super({key: 'scoresScene'});
	}
	
	init(data){
		this.scores = data.scores;
	}
	
	preload(){
		/*
		this.plugins.get('rexwebfontloaderplugin').addToScene(this);
		
		this.load.rexWebFont({
			google: {
				families: this.game.config.Game.fonts
			}
		});
		*/
	}
	
	create(){
		let gameWidth = this.cameras.main.width;
		let gameHeight = this.cameras.main.height;
		
		this.add.image(400, 300, 'flags');
		
		let titleText = this.add.text(0, 0, 'HI-SCORES', {
			fontFamily: 'Barrio',
			fontSize: '80px',
			color: '#99EDCC'
		});
		let textBounds = titleText.getBounds();
		titleText.setPosition(gameWidth/2-textBounds.width/2, gameHeight/4);
		
		let graphics = this.make.graphics({
			x: 0,
			y: 0,
			lineStyle: {
				width: 1,
				color: 0xffffff,
				alpha: 1
			},
			fillStyle: {
				color: 0xffffff,
				alpha: 1
			},
			add: true
		});
		
		graphics.fillRect(152, 133, 320, 250);
		let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		
		let content = '';
		for(let entry of this.scores){
			content += entry.name+' '+entry.cash+"\n";
		}
		
		let text = this.add.text(160, 280, content, {
			fontFamily: 'Arial',
			color: '#00ff00',
			wordWrap: { width: 310 }
		}).setOrigin(0);
		text.setMask(mask);
		// The rectangle they can 'drag' within
		let zone = this.add.zone(152, 130, 320, 256).setOrigin(0).setInteractive();
		
		zone.on('pointermove', function (pointer) {
			if(pointer.isDown){
				text.y += (pointer.velocity.y / 10);
				text.y = Phaser.Math.Clamp(text.y, -400, 300);
			}
		});
	}
}

export default ScoresScene;