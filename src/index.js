import Game from "./Game";

let fsBtn = null;
let canvas = null;
let fullScreen = false;

window.addEventListener('load', () => {
    const game = new Game();

    fsBtn = document.getElementById('fullscreen');
    canvas = document.getElementById('background');

    fsBtn.addEventListener('click', function() {
        toggleFullScreen('100%', '100%', 0, 'none', true);
    });

    window.addEventListener('keyup', function(e) {
        if (e.key === 'Escape' && fullScreen) {
            toggleFullScreen('600px', '360px', '100px auto 0 auto', 'block', false);
        }
    });

    if (game.init()) {
        game.start();
    }
});

function toggleFullScreen(width, height, margin, btn, state) {
    canvas.style.width = width;
    canvas.style.height = height;
    canvas.style.margin = margin;
    fsBtn.style.display = btn;
    fullScreen = state;
}
