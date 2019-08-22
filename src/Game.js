import Background from "./Background";

export default class {
    constructor() {
        this.bgCanvas = null;
        this.bgContext = null;
        this.background = null;
    }
    
    init() {
        this.bgCanvas = document.getElementById('background');
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');

            this.background = new Background(this.bgContext, this.bgCanvas.width, this.bgCanvas.height);
            this.background.init(0, 0);
            return true;
        }
        return false;
    }

    start() {
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.background.draw();
    }
}