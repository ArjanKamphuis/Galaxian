import ImageRepository from "../helpers/ImageRepository";
import Bullet from './Bullet';

export default class {
    constructor(maxSize) {
        this.size = maxSize;
        this.pool = [];

        for (let i = 0; i < this.size; i++) {
            this.pool.push(new Bullet('main', 0, 0, ImageRepository.bullet.width, ImageRepository.bullet.height));
        }
    }

    get(x, y, speed) {
        if (!this.pool[this.size - 1].alive) {
            this.pool[this.size - 1].spawn(x, y, speed);
            this.pool.unshift(this.pool.pop());
        }
    }

    getTwo(x1, y1, speed1, x2, y2, speed2) {
        if (!this.pool[this.size - 1].alive && !this.pool[this.size - 2].alive) {
            this.get(x1, y1, speed1);
            this.get(x2, y2, speed2);
        }
    }

    animate() {
        for (let i = 0; i < this.size; i++) {
            if (this.pool[i].alive) {
                if (this.pool[i].draw()) {
                    this.pool[i].clear();
                    this.pool.push((this.pool.splice(i, 1))[0]);
                }
            } else {
                break;
            }
        }
    }
}
