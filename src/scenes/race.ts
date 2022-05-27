import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';

class RaceScene extends AR.Classes.Scene {
	myAss: AR.Types.Ass;
	opponents: AR.Types.Ass[];
	started: boolean;
	countdown: number;
	speedupCt: number;
	speedupDuration: number;
	speedupCountdown: number;
	speedupActive: boolean;
	speedups: Phaser.GameObjects.Image[];
	myAssVelocity: number;
	finishLine: number;
	winner: number;
	myAssSprite: Phaser.GameObjects.Sprite;
	bg: Phaser.GameObjects.Image;
	countdownText: Phaser.GameObjects.Text;
	countdownTimer: Phaser.Time.TimerEvent;
	speedupTimer: Phaser.Time.TimerEvent;
	
	constructor(){
		super({key: 'playScene'});
	}
	
	init(data): void {
		this.myAss = data.selected;
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
		this.bg = this.add.image(400, 300, 'track');
		
		this.started = false;
		this.countdown = 3;
		this.speedupCt = 3;
		this.speedupDuration = 3;
		this.speedupCountdown = this.speedupDuration;
		this.speedupActive = false;
		this.myAssVelocity = Math.random();
		this.finishLine = 750;
		this.winner = 0;
		
		let speedupPos = 280;
		for(let j = 1; j <= this.speedupCt; j++){
			let speedupImg = this.make.image({
				x: speedupPos+70,
				y: 550,
				key: 'speedup'
			});
			speedupImg.scale = 0.25;
			speedupImg.setInteractive({ useHandCursor: true })
			
			this.speedups.push(speedupImg);
			speedupPos = speedupPos+70;
		}
					
		this.anims.create({
			key: this.myAss.slug+'_bounce',
			frames: [
				{ key: this.myAss.slug+'_1' },
				{ key: this.myAss.slug+'_2' },
				{ key: this.myAss.slug+'_3' },
				{ key: this.myAss.slug+'_4' },
				{ key: this.myAss.slug+'_5' },
				{ key: this.myAss.slug+'_6' },
				{ key: this.myAss.slug+'_7' },
				{ key: this.myAss.slug+'_8' },
				{ key: this.myAss.slug+'_7' },
				{ key: this.myAss.slug+'_6' },
				{ key: this.myAss.slug+'_5' },
				{ key: this.myAss.slug+'_4' },
				{ key: this.myAss.slug+'_3' },
				{ key: this.myAss.slug+'_2' },
				{ key: this.myAss.slug+'_1' },
			],
			frameRate: 20,
			repeat: -1
		});
		this.myAssSprite = this.add.sprite(50, 80, this.myAss.slug+'_1');
			
		let i = 2;
		for(let opponent of this.opponents){
			this.anims.create({
				key: opponent.slug+'_bounce',
				frames: [
					{ key: opponent.slug+'_1' },
					{ key: opponent.slug+'_2' },
					{ key: opponent.slug+'_3' },
					{ key: opponent.slug+'_4' },
					{ key: opponent.slug+'_5' },
					{ key: opponent.slug+'_6' },
					{ key: opponent.slug+'_7' },
					{ key: opponent.slug+'_8' },
					{ key: opponent.slug+'_7' },
					{ key: opponent.slug+'_6' },
					{ key: opponent.slug+'_5' },
					{ key: opponent.slug+'_4' },
					{ key: opponent.slug+'_3' },
					{ key: opponent.slug+'_2' },
					{ key: opponent.slug+'_1' },
				],
				frameRate: 20,
				repeat: -1
			});
			
			this[opponent.slug+'_sprite'] = this.add.sprite(50, i*75, opponent.slug+'_1');
				
			i++;
		}
			
		this.bg.setInteractive({useHandCursor: true})
			.on('pointerup', () => {
				this.onTap();
			});
			
		this.countdownText = this.add.text(400, 300, ''+this.countdown, {fontFamily: 'Luckiest Guy', fontSize: '80px', color: '0x99EDCC'});
				
		this.countdownTimer = this.time.addEvent({ delay: 1000, callback: this.countdownTick, callbackScope: this, loop: true });
	}
	
	update(): void {
		if(this.started && this.winner == 0){
			if(this.myAssSprite.x >= this.finishLine){
				this.winner = this.myAss.id;
				this.raceEnd();
			}else{
				this.myAssSprite.x += this.myAssVelocity;
			}
			
			for(let opponent of this.opponents){
				if(this[opponent.slug+'_sprite'].x >= this.finishLine){
					this.winner = opponent.id;
					this.raceEnd();
				}else{
					let velocity = Math.random()+Math.random();
					this[opponent.slug+'_sprite'].x += velocity;
				}
			}
		}
	}
	
	countdownTick(): void {
		if(this.countdown > 1){
			this.countdown -= 1;
			this.countdownText.setText(''+this.countdown);
		}else if(this.countdown == 1){
			this.countdownText.destroy();
			this.myAssSprite.play(this.myAss.slug+'_bounce');
			
			for(let opponent of this.opponents){
				this[opponent.slug+'_sprite'].play(opponent.slug+'_bounce');
			}
			this.time.removeAllEvents();
			
			for(let speedup of this.speedups){
				speedup.on('pointerup', () => {
					this.enableSpeedup(speedup);
				});
				this.add.existing(speedup);
			}
			
			this.started = true;
		}
	}
	
	enableSpeedup(speedup): void {
		this.speedupActive = true;
		speedup.destroy();
		this.speedupTimer = this.time.addEvent({ delay: 1000, callback: this.speedup, callbackScope: this, loop: true });
	}
	
	speedup(): void {
		if(this.speedupCountdown == 1){
			this.time.removeEvent(this.speedupTimer);
			this.speedupCountdown = this.speedupDuration;
			this.speedupActive = false;
		}
	}
	
	onTap(): void {
		if(this.started){
			if(this.speedupActive){
				this.myAssSprite.x += this.myAssVelocity+15;
			}else{
				this.myAssSprite.x += this.myAssVelocity+7;
			}
		}
	}
	
	raceEnd(): void {
		let gameWidth = this.cameras.main.width;
		let gameHeight = this.cameras.main.height;
		
		let raceOverText = this.make.text({
			x: 0,
			y: 0,
			text: 'RACE OVER!',
			style: {
				fontFamily: 'Luckiest Guy',
				fontSize: '80px'
			}
		});
		raceOverText.setPosition((gameWidth/2)-(raceOverText.width/2),
		(gameHeight/2)-(raceOverText.height/2));
		raceOverText.setOrigin(0,0);
		this.add.existing(raceOverText);
		
		let result = this.opponents.find(x => x.id === this.winner);
		if(result == undefined){
			result = this.myAss;
		}
		
		let fade = FadeOutDestroy(raceOverText, 3000);

		fade.on('complete', (gameObject, fade) => {
			this.scene.start('gameOverScene', {ass: this.myAss, winner: result, opponents: this.opponents});
		}, this);
	}
}

export default RaceScene;
