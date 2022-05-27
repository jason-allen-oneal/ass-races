import { Dialog } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

class AssModal {
	scene: AR.Classes.Scene;
	ass: AR.Types.Ass;
	callback: () => void;
	wager: number;
	style: object;
	dialog: Dialog;
	
	constructor(scene, ass, callback){
		this.scene = scene;
		this.callback = callback;
		this.ass = ass;
		
		this.wager = 0;
		
		this.style = {
			text: {
				fontFamily: 'Luckiest Guy',
				fontSize: '15px',
				color: '0xFFFFFF',
				paddingX: 30,
				paddingY: 70
			},
			modal: {
				background: '0x848884',
				border: {
					color: '0x99EDCC',
					width: 2
				}
			}
		};
		
		let totalRaces = this.ass.wins+this.ass.losses;
		let ratio = (1/(this.ass.wins/this.ass.losses))-1;
		let ratioStr = ratio+':1';
		
		let text = 'ODDS: '+ratioStr+"\n";
		text += 'TOTAL RACES: '+totalRaces+"\n\n";
		text += 'Your cash: '+scene.registry.get('cash')
		
		this.dialog = scene.rexUI.add.dialog({
    x: 400,
    y: 300,
    width: 500,
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
    title: this.createLabel(this.ass.name),
    toolbar: [this.createLabel("X")],
    leftToolbar: [ scene.add.image(0, 20, this.ass.slug+'_1') ],
    content: this.createLabel(text),
    description: this.createLabel('Place your wager'), 
    choices: [
     this.createLabel("100"),
     this.createLabel("250"),
     this.createLabel("500"),
     this.createLabel('All In!')
    ],
    choicesType: 'radio',
    choicesSetValueCallback: function (button, value) {
    	if (value) {
    		button.getElement('background').setStrokeStyle(1, 0xffffff);
    	} else {
    		button.getElement('background').setStrokeStyle();
    	}
    },
    actions: [
    	this.createLabel("Race"),
     this.createLabel("Cancel")
    ],
    space: {
     left: 20,
     right: 20,
     top: -20,
     bottom: -20,
     title: 25,
     titleLeft: 30,
     content: 25,
     description: 25,
     descriptionLeft: 20,
     descriptionRight: 20,
     choices: 25,
     toolbarItem: 5,
     choice: 15,
     action: 15
    },
    expand: {
     title: false
    },
    align: {
     title: "center",
     actions: "right" // 'center'|'left'|'right'
    },
    click: {
     mode: "release"
    }
   }).layout();
   
   this.dialog
   	.on('button.click', (button, groupName, index, pointer, event) => {
   		switch(button.name){
   			case 'X':
   			case 'Cancel':
   				this.close(index, button);
   			break;
   			
   			case '100':
   			case '250':
   			case '500':
   				this.wager = parseInt(button.name);
   			break;
   			
   			case 'All In!':
   				this.wager = scene.registry.get('cash');
   			break;
   			
   			case 'Race':
   				if(this.wager){
   					this.race();
   				}else{
   					let toast = scene.rexUI.add.toast({
   						x: 400,
   						y: 300,
   						background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, '0x4e342e'),
   						text: scene.add.text(0, 0, '', {
   							fontSize: '24px'
   						}),
   						space: {
   							left: 20,
   							right: 20,
   							top: 20,
   							bottom: 20,
   						},
   						duration: {
   							in: 250,
   							hold: 1000,
   							out: 250,
   						},
   					})
   						.showMessage('A wager is required.')
   						.showMessage('Please select an amount which to wager.');
   				}
   			break;
   		}
   	})
   	.on('button.over', function(button, groupName, index, pointer, event){
   		button.getElement('background').setStrokeStyle(1, 0xffffff);
   	})
   	.on('button.out', function(button, groupName, index, pointer, event){
   		button.getElement('background').setStrokeStyle();
   	});
	}
	
	getDialog(){
		return this.dialog;
	}
	
	createLabel(text){
		return this.scene.rexUI.add.label({
			background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
			text: this.scene.add.text(0, 0, text, {
				fontSize: '24px'
			}),
			space: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10
			},
			name: text
		});
	}
	
	race(){
		let cash = this.scene.registry.get('cash');
		
		this.scene.registry.set('wager', this.wager);
		this.scene.registry.set('cash', cash-this.wager);
		this.callback();
	}
	
	close(index: number, button){
		this.dialog.emit('modal.requestClose', { index: index, text: button.text });
	}
}

export default AssModal;
