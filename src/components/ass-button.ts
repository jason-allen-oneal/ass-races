class AssButton extends Phaser.GameObjects.Container {
	cell: {width:number, height: number};
	ass: AR.Types.Ass;
	
	constructor(scene, ass, callback){
		super(scene, 0, 0);
		
		let style = {
			x: 0,
			y: 0,
			value: ass.name,
			text: {
				color: '0x000000',
				fontFamily: 'Ranchers',
				fontSize: 40,
			},
			button: {
				radius: 10,
				paddingX: 20,
				paddingY: 20,
				background: {
					color: '0x9AC4F8',
					active: '0xDE9E36',
					hover: '0x99EDCC',
				},
				border: {
					width: 2,
					active: '0x99EDCC',
					color: '0xDE9E36',
					hover: '0x9AC4F8'
				}
			}
		};
		
		this.cell = {
			width: (scene.cameras.main.width/5),
			height: (scene.cameras.main.height/5)
		};
		
		this.ass = ass;
		
		let btn = scene.add.rexRoundRectangle(style.x, style.y, this.cell.width, this.cell.height, style.button.radius, style.button.background.color, 1).setOrigin(0, 0);
		btn.setStrokeStyle(style.button.border.width, style.button.border.color, 1);
		
		let assImage = scene.make.image({
			x: 0,
			y: 0,
			key: this.ass.slug+'_1'
		});
		assImage.setOrigin(0, 0)
			.setScale(0.75, 0.75);
		
		let text = scene.make.text({
			x: 10,
			y: 60,
			text: this.ass.name,
			style: {
				fontFamily: 'Luckiest Guy',
				color: '0x000000',
				fontSize: '16px'
			}
		});
		text.setOrigin(0, 0);
		
		let textBounds = text.getBounds();
		let boxGeom = {
			width: textBounds.width+style.button.paddingX,
			height: textBounds.height+style.button.paddingY
		};
		
		btn.width = this.cell.width;
		btn.height = this.cell.height;
		
		btn.button = scene.plugins.get('rexbuttonplugin').add(btn, {
		  enable: true,
		  mode: 1
		});
		btn.button.on('click', function (button, gameObject) {
		  btn.setFillStyle(style.button.background.active, 1);
			btn.setStrokeStyle(style.button.border.width, style.button.border.active, 1);
			callback();
		});
		btn.button.on('over', function (button, gameObject, event) {
			btn.setFillStyle(style.button.background.hover, 1);
			btn.setStrokeStyle(style.button.border.width, style.button.border.hover, 1);
		});
		btn.button.on('out', function (button, gameObject, event) {
			btn.setFillStyle(style.button.background.color, 1);
			btn.setStrokeStyle(style.button.border.width, style.button.border.color, 1);
		});
		this.add([btn, assImage, text])
			.setPosition(btn.x, btn.y)
			.setSize(this.cell.width, this.cell.height);
			
		scene.add.existing(this);
	}
}

export default AssButton;
