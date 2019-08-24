import Drawable from "./Drawable";
import ImageRepository from "../helpers/ImageRepository";

export default class Enemy extends Drawable {
    constructor(canvasName, x, y, width, height, game) {
        super(canvasName, x, y, width, height);
        this.percentFire = 0.01;
        this.chance = 0;
        this.alive = false;
        this.game = game;

        this.speedX; this.speedY; this.leftEdge; this.rightEdge; this.bottomEdge;
    }

    spawn(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.speedX = 0;
        this.speedY = speed;
        this.alive = true;
        this.leftEdge = this.x - 90;
        this.rightEdge = this.x + 90;
        this.bottomEdge = this.y + 140;
    }

    draw() {
        this.context.clearRect(this.x - 1, this.y, this.width + 1, this.height);
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x <= this.leftEdge) {
            this.speedX = this.speed;
        } else if (this.x >= this.rightEdge + this.width) {
            this.speedX = -this.speed;
        } else if (this.y >= this.bottomEdge) {
            this.speed = 1.5;
            this.speedY = 0;
            this.y -= 5;
            this.speedX = -this.speed;
        }

        this.context.drawImage(ImageRepository.enemy, this.x, this.y);

        this.chance = Math.floor(Math.random() * 101);
        if (this.chance / 100 < this.percentFire) {
            this.fire();
        }
    }

    fire() {
        this.game.enemyBulletPool.get(this.x + this.width / 2, this.y + this.height, -2.5);
    }

    clear() {
        this.x = this.y = this.speed = this.speedX = this.speedY = 0;
        this.alive = false;
    }
}
