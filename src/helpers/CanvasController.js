class Canvas {
    constructor(name) {
        this.name = name;
        this.canvas = document.getElementById(name);
        this.context = this.canvas.getContext('2d');
    }

    get width() { return this.canvas.width; }
    get height() { return this.canvas.height; }

    reset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class CanvasController {
    constructor() {
        this.canvasses = { 'background': new Canvas('background'), 'ship': new Canvas('ship'), 'main': new Canvas('main') };
    }

    getContext(name) { return this.canvasses[name].context; }
    getWidth(name) { return this.canvasses[name].width; }
    getHeight(name) { return this.canvasses[name].height; }

    reset() {
        for (let key in this.canvasses) {
            this.canvasses[key].reset();
        }
    }
}

export default new CanvasController();
