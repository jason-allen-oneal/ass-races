class ScoreModal {
	constructor(scene, callback){
		this.scene = scene;
		this.callback = callback;
		
		this.style = {
			text: {
				fontFamily: 'Luckiest Guy',
				fontSize: 15,
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
		
		this.inputText = scene.add.rexInputText(0, 0, 60, 30, {
			type: 'text',
			fontSize: '18px',
			color: '#000000',
			border: 2,
			backgroundColor: '#cccccc',
			borderColor: '#99EDCC',
		});
		
		this.dialog = scene.rexUI.add.dialog({
    x: 400,
    y: 300,
    width: 500,
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
    title: this.createLabel('Submit Score'),
    toolbar: [this.createLabel("X")],
    content: this.createLabel('ENTER YOUR NAME'),
    description: this.inputText, 
    actions: [
    	this.createLabel("Submit"),
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
   				this.close();
   			break;
   			
   			case 'Submit':
   				this.handleSubmit();
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
	
	handleSubmit(){
		var name = this.inputText.text;
		if(name != ''){
			this.callback(name);
		}else{
			var toast = scene.rexUI.add.toast({
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
   	}).showMessage('Please enter your name.');
   }
	}
	
	close(){
		this.dialog.emit('modal.requestClose', { index: index, text: button.text });
	}
}

export default ScoreModal;
