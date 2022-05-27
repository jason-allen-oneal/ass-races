class TitleScene extends Phaser.Scene {
	constructor(){
		super({
			key: 'titleScene',
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
	
	preload(): void {
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);
		
		let gameWidth = this.cameras.main.width;
		let gameHeight = this.cameras.main.height;
		
		let loadingText = this.make.text({
			x: gameWidth / 2,
			y: gameHeight / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				color: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		let percentText = this.make.text({
			x: gameWidth / 2,
			y: gameHeight / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				color: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		this.load.on('progress', function(value){
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);
			percentText.setText(value * 100 + '%');
		});
		
		this.load.on('complete', function(){
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
		
		for(let img of globalThis.images){
			this.load.image(img.name, img.path);
		}
	}
	
	create(): void {
		this.registry.set('cash', 1000);
		globalThis.socket.emit('game-start');
		globalThis.socket.on('game-start-response', (result) => {
			this.scene.start('menuScene', result);
		});
	}
}

export default TitleScene;