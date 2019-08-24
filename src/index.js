import Game from "./objects/Game";
import './helpers/FullScreenController';

window.init = () => {
    const game = new Game();
    if (game.init()) {
        game.start();
    }
}
