const BLACK = '000000';
const WHITE = 'FFFFFF';
const LIGHTBLUE = '9ED0E6';
const BLUE = '0582CA';
const LIGHTGRAY = 'F3F7F0';
const GRAY = '575C55';
const DARKGRAY = '2A2B2A';
const GREEN = '6C7D47';
const DARKGREEN = '044F28';
const GOLD = 'FDCA40';
const YELLOW = 'FCDA5D';
const TAN = 'F6E4CF';
const RED = 'BF1D00';

var styles = {
	color: {
		black: BLACK,
		white: WHITE,
		lightblue: LIGHTBLUE,
		blue: BLUE,
		lightgray: LIGHTGRAY,
		gray: GRAY,
		darkgray: DARKGRAY,
		green: GREEN,
		darkgreen: DARKGREEN,
		gold: GOLD,
		yellow: YELLOW,
		tan: TAN,
		red: RED
	},
	input: {
		text: {
			type: 'text',
			fontSize: '20px',
			color: BLACK,
			border: 2,
			backgroundColor: '#'+LIGHTGRAY,
			borderColor: '#'+LIGHTBLUE,
		},
		password: {
			type: 'password',
			fontSize: '20px',
			color: BLACK,
			border: 2,
			backgroundColor: '#'+LIGHTGRAY,
			borderColor: '#'+LIGHTBLUE,
		}
	},
	text: {
		label: {
			fill: '#'+WHITE,
			fontFamily: 'IM Fell English',
			fontSize: '20px'
		},
		chat: {
			fill: '#'+WHITE,
			fontFamily: 'IM Fell English',
			fontSize: 15,
			padding: {
				top: 25,
				left: 5,
				right: 5,
				bottom: 5
			},
			wordWrap: {
				width: 140,
				useAdvancedWrap: true
			},
			align: 'left'
		},
		chatTab: {
			fill: '#'+WHITE,
			fontFamily: 'IM Fell English',
			fontSize: 25,
		},
		chatDate: {
			fontSize: 10,
			fontFamily: 'IM Fell English',
		},
		chatLabel: {
			fontFamily: 'IM Fell English',
		}
	},
	modals: {
		toast: {
			normal: {
				background: 0x4e342e,
				text: {
					fontSize: '20px',
					fontFamily: 'Almendra SC'
				},
				spacing: {
					left: 20,
					right: 20,
					top: 20,
					bottom: 20,
				}
			},
			error: {
				background: 0x4e342e,
				text: {
					fontSize: '20px',
					fontFamily: 'Almendra SC'
				},
				spacing: {
					left: 20,
					right: 20,
					top: 20,
					bottom: 20,
				}
			}
		},
		modal: {
			background: 0x1565c0,
			title: {
				background: 0x1565c0,
				text: {
					fontSize: 20
				},
				space: {
					left: 15,
					right: 15,
					top: 10,
					bottom: 10
				}
			},
			content: {
				background: 0x5e92f3,
				style: {
					fontSize: '20px',
					fontFamily: 'Almendra SC'
				},
				space: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 10
				}
			},
			buttons: {
				normal: '0xffffff',
				hover: '0xffffff',
				click: '0x1565c0',
			},
			space: {
				left: 20,
				right: 20,
				top: -20,
				bottom: -20,
				title: 25,
				titleLeft: 30,
				content: 40,
				description: 40,
			 	descriptionLeft: 20,
				descriptionRight: 20,
				choices: 25,
				toolbarItem: 5,
				choice: 15,
				action: 15
			},
			align: {
				title: 'center',
				actions: 'right'
			}
		}
	}
};

export default styles;