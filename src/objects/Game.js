import Background from "./Background";
import Ship from "./Ship";
import ImageRepository from "../helpers/ImageRepository";
import CanvasController from "../helpers/CanvasController";

export default class {
    constructor() {
        this.background = null;
        this.ship = null;
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

        return true;
    }

    start() {
        this.ship.draw();
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.background.draw();
        this.ship.move();
        this.ship.bulletPool.animate();
    }
}