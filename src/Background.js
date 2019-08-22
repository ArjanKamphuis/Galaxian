import Drawable from "./Drawable";
import imageRepository from "./imageRepository";

export default class Background extends Drawable {
    constructor(context, width, height) {
        super(context, width, height);
        this.speed = 1;
    }

    draw() {
        this.y += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

        if (this.y >= this.canvasHeight) {
            this.y = 0;
        }
    }
}