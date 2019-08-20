import Game from './scenes/game/game'
import PauseMenu from './scenes/pauseMenu/pauseMenu'
import { phaser as config } from "./config";
config.scene = [Game, PauseMenu];

const game = new Phaser.Game(config);

function preload() {}

function create () {}

function update () {}
