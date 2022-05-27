import {io} from 'socket.io-client'; 
import Game from './game';

let height: number = 600;
let width: number = 800;

window.socket = io('http://localhost');

const game = new Game(width, height);
game.initialize();