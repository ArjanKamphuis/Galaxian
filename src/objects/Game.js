import Background from "./Background";
import Ship from "./Ship";
import ImageRepository from "../helpers/ImageRepository";
import CanvasController from "../helpers/CanvasController";
import Pool from "./Pool";
import QuadTree from "../helpers/Quadtree";

export default class {
    constructor() {
        this.background = null;
        this.ship = null;
        this.enemyPool = null;
        this.enemyBulletPool = null;

        this.quadTree = new QuadTree({ x: 0, y: 0, width: CanvasController.getWidth('main'), height: CanvasController.getHeight('main') });
    }
    
    init() {
        if (!CanvasController.getContext) {
            console.error('Error getting context...');
            return false;
        }

        let shipStartX = CanvasController.getWidth('ship') / 2 - ImageRepository.spaceship.width;
        let shipStartY = CanvasController.getHeight('ship') / 4 * 3 + ImageRepository.spaceship.height * 2;

        this.background = new Background('background', 0, 0);
        this.ship = new Ship('ship', shipStartX, shipStartY, ImageRepository.spaceship.width, ImageRepository.spaceship.height);

        this.enemyPool = new Pool(30, 'enemy', this);

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

        this.enemyBulletPool = new Pool(50, 'enemyBullet');

        return true;
    }

    start() {
        this.ship.draw();
        this.animate();
    }

    animate() {
        this.quadTree.clear();
        this.quadTree.insert(this.ship);
        this.quadTree.insert(this.ship.bulletPool.getPool());
        this.quadTree.insert(this.enemyPool.getPool());
        this.quadTree.insert(this.enemyBulletPool.getPool());
        this.detectCollision();
        
        requestAnimationFrame(() => this.animate());
        this.background.draw();
        this.ship.move();
        this.ship.bulletPool.animate();
        this.enemyPool.animate();
        this.enemyBulletPool.animate();
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
}