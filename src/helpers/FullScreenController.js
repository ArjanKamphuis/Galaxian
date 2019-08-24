class FullScreenController {
    constructor() {
        this.fsBtn = document.getElementById('fullscreen');
        this.canvasses = document.getElementsByTagName('canvas');
        this.overlay = document.getElementById('overlay');
        this.gameovertext = document.getElementById('game-over');
        this.fullScreen = false;

        this.fsBtn.addEventListener('click', () => {
            this.toggleFullScreen('100%', '100%', 0, 'none', '45%');
        });
    
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && this.fullScreen) {
                this.toggleFullScreen('600px', '360px', '100px auto 0 auto', 'block', '100px');
            }
        });
    }
    
    toggleFullScreen(width, height, margin, btn, gameovertext) {
        for (let canvas of this.canvasses) {
            canvas.style.width = width;
            canvas.style.height = height;
            canvas.style.margin = margin;
        }

        this.overlay.style.width = width;
        this.overlay.style.height = height;
        this.overlay.style.margin = margin;

        this.gameovertext.style.marginTop = gameovertext;
        
        this.fsBtn.style.display = btn;
        this.fullScreen = !this.fullScreen;
    }
}

export default new FullScreenController();
