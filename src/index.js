import Game from "./objects/Game";

window.init = () => {
    const game = new Game();
    if (game.init()) {
        game.start();
    }
}
