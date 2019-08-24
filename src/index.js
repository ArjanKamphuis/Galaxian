import Game from "./objects/Game";
import './helpers/FullScreenController';

window.init = () => {
    const game = new Game();
    game.init();
}
