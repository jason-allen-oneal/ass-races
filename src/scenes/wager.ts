import AlignGrid from '../components/grid';
import AssButton from '../components/ass-button';
import AssModal from '../components/ass-modal';

class WagerScene extends AR.Classes.Scene {
	wagerModal: AssModal;
	asses: AR.Types.Ass[];
	wagerSceneGrid: AlignGrid;
	
	constructor(){
		super({
			key: 'wagerScene',
    });
		this.wagerModal = null;
	}
	
	init(data): void {
		this.asses = data.asses;
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
		this.add.image(400, 300, 'flags');
		
		let wagerSceneGridConfig = {
			'scene': this,
			'cols': 5,
			'rows': Math.ceil(this.asses.length/2)
		};
		this.wagerSceneGrid = new AlignGrid(wagerSceneGridConfig);
		
		let infoText = this.add.text(0, 0, 'Select your ass!', {
			fontFamily: 'Luckiest Guy',
			fontSize: '20px',
			color: '#DE9E36',
		});
				
		this.wagerSceneGrid.placeAtIndex(2, infoText);
		let i = 10;
		for(const ass of this.asses){
			let assContainer = new AssButton(this, ass, () => this.selectAss(ass.slug));
			this.wagerSceneGrid.placeAtIndex(i, assContainer);
			
			i++;
		}
	}
	
	selectAss(slug: string): void {
		let ass = this.asses.find(item => item.slug === slug);
		this.wagerModal = new AssModal(this, ass, () => {
			globalThis.socket.emit('race-start', {id: ass.id});
			globalThis.socket.on('race-start-response', (data) => {
				this.scene.start('playScene', {selected: ass, opponents: data.opponents});
			});
		});
		
		let modal = this.wagerModal.getDialog();
		this.rexUI.modalPromise(modal.setPosition(400, 300), {
			manualClose: true,
			duration: {
				in: 500,
				out: 500
			}
		}).then(function (result) {
			// console.log(result.text);
		});
	}
}

export default WagerScene;
