class ImageRepository {
    constructor() {
        this.background = new Image();
        this.spaceship = new Image();
        this.bullet = new Image();
        this.enemy = new Image();
        this.enemyBullet = new Image();

        this.numImages = 5;
        this.numLoaded = 0;

        this.background.addEventListener('load', () => { this.imageLoaded() });
        this.spaceship.addEventListener('load', () => { this.imageLoaded() });
        this.bullet.addEventListener('load', () => { this.imageLoaded() });
        this.enemy.addEventListener('load', () => { this.imageLoaded() });
        this.enemyBullet.addEventListener('load', () => { this.imageLoaded() });

        this.background.src = '/imgs/bg.png';
        this.spaceship.src = '/imgs/ship.png';
        this.bullet.src = '/imgs/bullet.png';
        this.enemy.src= '/imgs/enemy.png';
        this.enemyBullet.src = '/imgs/bullet_enemy.png';
    }

    imageLoaded() {
        this.numLoaded++;
        if (this.numLoaded === this.numImages) {
            window.init();
        }
    }
}

export default new ImageRepository();
