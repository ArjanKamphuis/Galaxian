import CanvasController from "../helpers/CanvasController";

export default class Drawable {
    constructor(canvasName, x, y, width, height) {
        this.context = CanvasController.getContext(canvasName);
        this.canvasWidth = CanvasController.getWidth(canvasName);
        this.canvasHeight = CanvasController.getHeight(canvasName);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;

        this.collidableWith = '';
        this.isColliding = false;
        this.type = '';
    }

    draw() {}
    move() {}

    isCollidableWith(obj) {
        return this.collidableWith === obj.type;
    }
}
