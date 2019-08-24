import Drawable from "./Drawable";
import Pool from "./Pool";
import ImageRepository from "../helpers/ImageRepository";

const KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

const KEY_STATUS = {};
for (let code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}

export default class Ship extends Drawable {
    constructor(canvasName, x, y, width, height, game) {
        super(canvasName, x, y, width, height);
        this.speed = 3;
        this.bulletPool = new Pool(30, 'bullet');
        this.fireRate = 9;
        this.counter = 0;
        this.game = game;
        this.alive = true;

        this.collidableWith = 'enemyBullet';
        this.type = 'ship';

        document.addEventListener('keydown', (e) => {
            let keyCode = e.keyCode ? e.keyCode : e.charCode;
            if (KEY_CODES[keyCode]) {
                e.preventDefault();
                KEY_STATUS[KEY_CODES[keyCode]] = true;
            }
        });
    
        document.addEventListener('keyup', (e) => {
            let keyCode = e.keyCode ? e.keyCode : e.charCode;
            if (KEY_CODES[keyCode]) {
                e.preventDefault();
                KEY_STATUS[KEY_CODES[keyCode]] = false;
            }
        });
    }

    draw() {
        this.context.drawImage(ImageRepository.spaceship, this.x, this.y);
    }

    move() {
        this.counter++;

        if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
            this.context.clearRect(this.x, this.y, this.width, this.height);

            if (KEY_STATUS.left) {
                this.x -= this.speed;
                if (this.x <= 0) {
                    this.x = 0;
                }
            } else if (KEY_STATUS.right) {
                this.x += this.speed;
                if (this.x >= this.canvasWidth - this.width) {
                    this.x = this.canvasWidth - this.width;
                }
            }

            if (KEY_STATUS.up) {
                this.y -= this.speed;
                if (this.y <= this.canvasHeight / 4 * 3) {
                    this.y = this.canvasHeight / 4 * 3;
                }
            } else if (KEY_STATUS.down) {
                this.y += this.speed;
                if (this.y >= this.canvasHeight - this.height) {
                    this.y = this.canvasHeight - this.height;
                }
            }

            if (!this.isColliding) {
                this.draw();
            } else {
                this.alive = false;
                this.game.gameOver();
            }
        }

        if (KEY_STATUS.space && this.counter >= this.fireRate) {
            this.fire();
            this.counter = 0;
        }
    }

    fire() {
        this.bulletPool.getTwo(this.x + 6, this.y, 3, this.x + 33, this.y, 3);
        this.game.laser.get();
    }
}
