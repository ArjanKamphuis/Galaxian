class FullScreenController {
    constructor() {
        this.fsBtn = document.getElementById('fullscreen');
        this.canvasses = document.getElementsByTagName('canvas');
        this.fullScreen = false;

        this.fsBtn.addEventListener('click', () => {
            this.toggleFullScreen('100%', '100%', 0, 'none');
        });
    
        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && this.fullScreen) {
                this.toggleFullScreen('600px', '360px', '100px auto 0 auto', 'block');
            }
        });
    }
    
    toggleFullScreen(width, height, margin, btn) {
        for (let canvas of this.canvasses) {
            canvas.style.width = width;
            canvas.style.height = height;
            canvas.style.margin = margin;
        }
        
        this.fsBtn.style.display = btn;
        this.fullScreen = !this.fullScreen;
    }
}

export default new FullScreenController();
