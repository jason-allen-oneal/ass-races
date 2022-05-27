import 'phaser';

import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import TitleScene from './scenes/title';
import MenuScene from './scenes/menu';
import ScoresScene from './scenes/scores';
import WagerScene from './scenes/wager';
import RaceScene from './scenes/race';
import GameOverScene from './scenes/gameOver';

class Game {
	base: string;
	url: string;
	images: {name: string, path: string}[];
	fonts: string[];
	parent: string;
	title: string;
	banner: false;
	width: number;
	height: number;
	
	constructor(w: number, h: number){
		this.url = globalThis.base;
		this.images = globalThis.images
		this.fonts = ['Luckiest Guy', 'Frijole', 'Barrio', 'Ranchers'];
		this.parent = 'gameContainer';
		this.title = 'Ass Races!';
		this.banner = false;
		this.width = w;
		this.height = h;
	}
	
	static extend(...args: object[]): object | [] {
		for(var o = {}, i = 0; i < args.length; i++){
			for(var k in args[i]){
				if(args[i].hasOwnProperty(k)){
					o[k] = args[i][k].constructor === Object ? this.extend(o[k] || {}, args[i][k]) : args[i][k];
				}
			}
		}
		
		return o;
	}
	
	initialize(): void{
		var config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			parent: this.parent,
			title: this.title,
			banner: this.banner,
			width: this.width,
			height: this.height,
			backgroundColor: '#000000',
			scene: [ TitleScene, MenuScene, WagerScene, RaceScene, ScoresScene, GameOverScene ],
			url: this.url,
			dom: {
				createContainer: true,
			},
			plugins: {
  			scene: [
  				{
  					key: 'rexUI',
  					plugin: UIPlugin,
  					mapping: 'rexUI'
  				},
  			]
  		}
		};
		
		window.game = new Phaser.Game(config);
	}
}

export default Game;