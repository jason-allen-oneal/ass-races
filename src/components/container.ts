class AssContainer extends Phaser.GameObjects.Container {
	constructor(scene, ass, callback){
		super(scene, 0, 0);
		
		this.cell = {
			width: (scene.cameras.main.width/5)-10,
			height: (scene.cameras.main.height/5)-10
		};
		
		this.ass = ass;
		this.assImage = scene.make.image({
			x: 0,
			y: 0,
			key: this.ass.slug+'_1'
		});
		this.assImage.setOrigin(0, 0)
			.setScale(0.75, 0.75);
		
		this.textElement = scene.make.text({
			x: 0,
			y: 0,
			text: this.ass.name,
			style: {
				fontFamily: 'Luckiest Guy',
				fill: '0x000000',
				fontSize: 20
			}
		});
		this.textElement.setOrigin(0, 0).setScale(0.6, 0.6);
		
		this.box = scene.add.graphics();
		this.makeState('0x9AC4F8');
		
		this.textElement.setPosition(this.assImage.x+10, this.assImage.y+this.assImage.height);
		
		this.add([this.box, this.assImage, this.textElement])
			.setPosition(this.box.x, this.box.y)
			.setSize(this.cell.width, this.cell.height)
			.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.hoverState())
			.on('pointerout', () => this.readyState())
			.on('pointerdown', () => this.activeState())
			.on('pointerup', () => {
				this.hoverState();
				callback();
			});
	}
	
	makeState(color){
		this.box.clear();
		this.box.fillStyle(color, 1);
		this.box.fillRoundedRect(0, 0, this.cell.width, this.cell.height, 10);
		this.box.lineStyle(2, '0xDE9E36', 1);
		this.box.strokeRoundedRect(0, 0, this.cell.width, this.cell.height, 10);
	}
	
	hoverState() {
		this.makeState('0x99EDCC');
	}
	
	readyState() {
		this.makeState('0x99EDCC');
	}
	
	activeState() {
		this.makeState('0xDE9E36');
	}
}

export {AssContainer};
