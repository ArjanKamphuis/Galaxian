import Drawable from "./Drawable";
import ImageRepository from "../helpers/ImageRepository";

export default class Background extends Drawable {
    constructor(canvasName, x, y) {
        super(canvasName, x, y, 0, 0);
        this.speed = 1;
    }

    draw() {
        this.y += this.speed;
        this.context.drawImage(ImageRepository.background, this.x, this.y);
        this.context.drawImage(ImageRepository.background, this.x, this.y - this.canvasHeight);

        if (this.y >= this.canvasHeight) {
            this.y = 0;
        }
    }
}