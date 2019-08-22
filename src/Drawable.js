export default class {
    constructor(context, width, height) {
        this.x, this.y;
        this.context = context;
        this.speed = 0;
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    init(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {

    }
}