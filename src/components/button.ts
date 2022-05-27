import styles from '../util/style';

export default class Button extends AR.Classes.UIComponent {
	constructor(scene, config){
		super(scene);
		this.scene = scene;
		
		var btn = scene.add.rexRoundRectangle(config.x, config.y, 80, 40, 4, '0x'+styles.color.lightgray, 1).setOrigin(0);
		btn.setStrokeStyle(2, '0x'+styles.color.green, 1);
		
		btn.setInteractive();
		btn.on('pointerover', () =>{
			btn.setFillStyle('0x'+styles.color.lightblue, 1);
			btn.setStrokeStyle(2, '0x'+styles.color.black, 1);
		}).on('pointerdown', () => {
			btn.setFillStyle('0x'+styles.color.darkgray, 1);
			btn.setStrokeStyle(2, '0x'+styles.color.blue, 1);
		}).on('pointerout', () => {
			btn.setFillStyle('0x'+styles.color.lightgray, 1);
			btn.setStrokeStyle(2, '0x'+styles.color.green, 1);
		});
		
		var text = scene.add.text(0, btn.y+5, config.value, {
				color: '0x'+styles.color.green,
				fontFamily: 'Almendra SC',
				fontSize: 20,
				align: 'center'
			}).setOrigin(0);
		
		if(config.fixedWidth){
			text.setX((btn.x+(btn.width/2)-text.width/2));
		}else{
			text.setX(btn.x+5);
		}
		
		var textBounds = text.getBounds();
		var box = {
			width: textBounds.width+(5*2),
			height: textBounds.height+(5*2)
		};
		
		if(!config.fixedWidth){
			btn.width = box.width;
		}
		btn.height = box.height;
		
		btn.button = scene.plugins.get('rexbuttonplugin').add(btn, {
		  enable: true,
		  mode: 1
		});
		
		btn.button.on('click', () => {
			config.callback();
		});
		
		return btn;
	}
}