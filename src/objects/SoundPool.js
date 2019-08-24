export default class {
    constructor(maxSize, object) {
        this.size = maxSize;
        this.pool = [];
        this.currSound = 0;

        if (object === 'laser') {
            for (let i = 0; i < this.size; i++) {
                const laser = new Audio('/sounds/laser.wav');
                laser.volume = .12;
                laser.load();
                this.pool[i] = laser;
            }
        } else if (object === 'explosion') {
            for (let i = 0; i < this.size; i++) {
                const explosion = new Audio('/sounds/explosion.wav');
                explosion.volume = .1;
                explosion.load();
                this.pool[i] = explosion;
            }
        }
    }

    get() {
        if (this.pool[this.currSound].currentTime === 0 || this.pool[this.currSound].ended) {
            this.pool[this.currSound].play();
        }
        this.currSound = (this.currSound + 1) % this.size;
    }
}
