import Drawable from "./Drawable";
import ImageRepository from "../helpers/ImageRepository";

export default class Bullet extends Drawable {
    constructor(canvasName, x, y, width, height) {
        super(canvasName, x, y, width, height);
        this.alive = false;
    }

    spawn(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.alive = true;
    }

    draw() {
        this.context.clearRect(this.x, this.y, this.width, this.height);
        this.y -= this.speed;
        if (this.y <= 0 - this.height) {
            return true;
        } else {
            this.context.drawImage(ImageRepository.bullet, this.x, this.y);
        }
    }

    clear() {
        this.x = this.y = this.speed = 0;
        this.alive = false;
    }
}
