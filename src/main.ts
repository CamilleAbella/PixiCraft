import * as PIXI from 'pixi.js';
import Game from './Game';
import {resolution} from './ressources/GameData';
import Position from './utils/Position';

function putBlockWhereClicked(): void {
	if (game.loaded) {
		const position: Position = new Position(
			Math.round((app.renderer.plugins.interaction.mouse.global.x - (resolution / 2)) / resolution),
			Math.round((app.renderer.plugins.interaction.mouse.global.y - (resolution / 2)) / resolution)
		);
		game.world.replaceBlock(game.player.blockSelected, position);
	}
}

let clicking = false;
export const app = new PIXI.Application({
	width : window.innerWidth,
	height: window.innerHeight
});

// Game
export const game: Game = new Game(app);

game.preInit();
game.init();

// Events
app.ticker.add(() => {
	if (game.loaded) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				game.world.placeBlock(game.gameData.blocks.get('void'), new Position(i, j));
			}
		}
		
		game.world.placeBlock(game.gameData.blocks.get('dirt'), new Position(15, 2));
	}
});

game.eventHandler.on('launch', () => {
	console.log("Game launched.");
});

// Mouse Events
game.eventHandler.on('mousemove', () => {
	if (clicking) {
		putBlockWhereClicked();
	}
});


game.eventHandler.on('mouseup', () => {
	clicking = false;
});

game.eventHandler.on('mousedown', () => {
	clicking = true;
	putBlockWhereClicked();
});

// Global objects
Object.defineProperties(window, {
	app   : {
		value: app
	},
	blocks: {
		value: game.gameData.blocks
	},
	game  : {
		value: game
	}
});

