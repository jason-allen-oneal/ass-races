class AlignGrid {
	h: number;
	w: number;
	rows: number;
	cols: number;
	scene: Phaser.Scene;
	cw: number;
	ch: number;
	graphics: Phaser.GameObjects.Graphics;
	
	constructor(config){
		if(!config.scene){
			console.log("missing scene!");
			return;
		}
		
		if(!config.rows){
			config.rows = 3;
		}
		
		if(!config.cols){
			config.cols = 3;
		}
		
		if(!config.width){
			config.width = 800;
		}
		
		if(!config.height){
			config.height = 600;
		}
		
		this.h = config.height;
		this.w = config.width;
		this.rows = config.rows;
		this.cols = config.cols;
		this.scene = config.scene;
		
		this.cw = this.w / this.cols;
		this.ch = this.h / this.rows;
	}
	
	show(a = 1) {
		this.graphics = this.scene.add.graphics();
		this.graphics.lineStyle(4, 0xff0000, a);
		
		for(let i = 0; i < this.w; i += this.cw) {
			this.graphics.moveTo(i, 0);
			this.graphics.lineTo(i, this.h);
		}
		
		for(let i = 0; i < this.h; i += this.ch) {
			this.graphics.moveTo(0, i);
			this.graphics.lineTo(this.w, i);
		}
		
		this.graphics.strokePath();
	}
	
	showNumbers(a = 1) {
		this.show(a);
		let n = 0;
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let numText = this.scene.add.text(0, 0, ''+n, {
					color: 'red'
				});
				numText.setOrigin(0, 0);
				this.placeAt(j, i, numText);
				n++;
			}
		}
	}
	
	placeAtIndex(index, obj) {
		let yy = Math.floor(index / this.cols);
		let xx = index - (yy * this.cols);
		this.placeAt(xx, yy, obj);
	}
	
	placeAt(xx, yy, obj) {
		let x2 = this.cw * xx + this.cw / 2;
		let y2 = this.ch * yy + this.ch / 2;
		let offsetX = obj.displayWidth/2;
		let offsetY = obj.displayHeight/2;
		obj.x = x2-offsetX;
		obj.y = y2-offsetY;
	}
}

export default AlignGrid;
