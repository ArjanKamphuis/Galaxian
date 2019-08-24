import Background from "./Background";
import Ship from "./Ship";
import ImageRepository from "../helpers/ImageRepository";
import CanvasController from "../helpers/CanvasController";
import Pool from "./Pool";
import QuadTree from "../helpers/Quadtree";
import SoundPool from "./SoundPool";

export default class {
    constructor() {
        this.background = null;
        this.ship = null;
        this.enemyPool = null;
        this.enemyBulletPool = null;

        this.laser = null;
        this.explosion = null;
        this.backgroundAudio = null;
        this.gameOverAudio = null;
        this.checkAudio = null;

        this.playerScore = 0;

        this.quadTree = new QuadTree({ x: 0, y: 0, width: CanvasController.getWidth('main'), height: CanvasController.getHeight('main') });

        document.getElementById('restart').addEventListener('click', () => {
            this.restart();
        })
    }

    initObjects() {
        let shipStartX = CanvasController.getWidth('ship') / 2 - ImageRepository.spaceship.width;
        let shipStartY = CanvasController.getHeight('ship') / 4 * 3 + ImageRepository.spaceship.height * 2;

        this.background = new Background('background', 0, 0);
        this.ship = new Ship('ship', shipStartX, shipStartY, ImageRepository.spaceship.width, ImageRepository.spaceship.height, this);

        this.enemyPool = new Pool(30, 'enemy', this);
        this.spawnWave();
        this.enemyBulletPool = new Pool(50, 'enemyBullet');
    }
    
    init() {
        if (!CanvasController.getContext) {
            console.error('Error getting context...');
            return false;
        }

        this.initObjects();

        this.laser = new SoundPool(10, 'laser');
        this.explosion = new SoundPool(20, 'explosion');
        this.backgroundAudio = new Audio('/sounds/kick_shock.wav');
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = .25;
        this.backgroundAudio.load();
        this.gameOverAudio = new Audio('/sounds/game_over.wav');
        this.gameOverAudio.loop = true;
        this.gameOverAudio.volume = .25;
        this.gameOverAudio.load();

        this.checkAudio = window.setInterval(() => { this.checkReadyState() }, 1000);

        const musicBtn = document.getElementById('music');
        musicBtn.addEventListener('click', () => {
            if (this.ship.alive) {
                if (this.backgroundAudio.paused) {
                    document.getElementById('musicState').innerHTML = 'Mute';
                    this.backgroundAudio.play();
                } else {
                    document.getElementById('musicState').innerHTML = 'Unmute';
                    this.backgroundAudio.pause();
                }
            } else {
                if (this.gameOverAudio.paused) {
                    document.getElementById('musicState').innerHTML = 'Mute';
                    this.gameOverAudio.play();
                } else {
                    document.getElementById('musicState').innerHTML = 'Unmute';
                    this.gameOverAudio.pause();
                }
            }
            
        });
    }

    spawnWave() {
        let width = ImageRepository.enemy.width;
        let height = ImageRepository.enemy.height;
        let x = 100;
        let y = -height;
        let spacer = y * 1.5;
        for (let i = 1; i <= 18; i++) {
            this.enemyPool.get(x, y, 2);
            x += width + 25;
            if (i % 6 === 0) {
                x = 100;
                y += spacer;
            }
        }
    }

    checkReadyState() {
        if (this.gameOverAudio.readyState === 4 && this.backgroundAudio.readyState === 4) {
            window.clearInterval(this.checkAudio);
            this.start();
        }
    }

    start() {
        this.ship.draw();
        this.backgroundAudio.play();
        this.animate();
    }

    animate() {
        document.getElementById('score').innerHTML = this.playerScore;
        
        this.quadTree.clear();
        this.quadTree.insert(this.ship);
        this.quadTree.insert(this.ship.bulletPool.getPool());
        this.quadTree.insert(this.enemyPool.getPool());
        this.quadTree.insert(this.enemyBulletPool.getPool());
        this.detectCollision();

        if (this.enemyPool.getPool().length === 0) {
            this.spawnWave();
        }
        
        if (this.ship.alive) {
            requestAnimationFrame(() => this.animate());
            this.background.draw();
            this.ship.move();
            this.ship.bulletPool.animate();
            this.enemyPool.animate();
            this.enemyBulletPool.animate();
        }
    }

    detectCollision() {
        let objects = [];
        this.quadTree.getAllObjects(objects);

        for (let x = 0, len = objects.length; x < len; x++) {
            let obj = [];
            this.quadTree.findObjects(obj, objects[x]);

            for (let y = 0, length = obj.length; y < length; y++) {
                if (objects[x].collidableWith === obj[y].type &&
                    (objects[x].x < obj[y].x + obj[y]. width &&
                        objects[x].x + objects[x].width > obj[y].x &&
                        objects[x].y < obj[y].y + obj[y].height &&
                        objects[x].y + objects[x].height > obj[y].y)) {
                            objects[x].isColliding = true;
                            obj[y].isColliding = true;
                        }
            }
        }
    }

    gameOver() {
        this.backgroundAudio.pause();
        this.gameOverAudio.currentTime = 0;
        this.gameOverAudio.play();
        document.getElementById('game-over').style.display = 'flex';
    }

    restart() {
        this.gameOverAudio.pause();
        document.getElementById('game-over').style.display = 'none';
        CanvasController.reset();
        this.quadTree.clear();

        this.initObjects();

        this.playerScore = 0;
        this.backgroundAudio.currentTime = 0;
        this.backgroundAudio.play();

        this.start();
    }
}