import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

export declare global {
	interface Window {
		images: {name: string, path: string}[];
		socket: SocketIOClient.Socket;
		game: Phaser.Game;
	}
	
	namespace AR {
		namespace Interfaces {
			interface Component {
				scene: Phaser.Scene;
				style: object;
			}
		}
		
		namespace Classes {
			class UIComponent implements AR.Interfaces.Component {
				scene: Phaser.Scene;
				style: object;
				constructor(scene: Phaser.Scene): void;
			}
			
			class Scene extends Phaser.Scene {
				rexUI: RexUIPlugin;
			}
		}
		
		namespace Types {
			type Ass = {
				id: number;
				name: string;
				slug: string;
				wins: number;
				losses: number;
			}
			
			type Score = {
				name: string;
				cash: number;
			}
		}
	}
}