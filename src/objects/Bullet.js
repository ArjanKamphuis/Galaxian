import Drawable from "./Drawable";
import ImageRepository from "../helpers/ImageRepository";

export default class Bullet extends Drawable {
    constructor(canvasName, x, y, width, height, type) {
        super(canvasName, x, y, width, height);
        this.alive = false;
        this.type = type;
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
        if (this.type === 'bullet' && this.y <= 0 - this.height) {
            return true;
        } else if (this.type === 'enemyBullet' && this.y >= this.canvasHeight) {
            return true;
        } else {
            if (this.type === 'bullet') {
                this.context.drawImage(ImageRepository.bullet, this.x, this.y);
            } else if (this.type === 'enemyBullet') {
                this.context.drawImage(ImageRepository.enemyBullet, this.x, this.y);
            }
            return false;
        }
    }

    clear() {
        this.x = this.y = this.speed = 0;
        this.alive = false;
    }
}
