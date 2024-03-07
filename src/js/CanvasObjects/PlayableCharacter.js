import { KeyboardState } from "../Helpers/KeyboardState.js";
import { Coordinates } from "./Coordinates.js";
import { MovingElement } from "./MovingElement.js";
import { Projectile } from "./Projectile.js";

KeyboardState.start();

export class PlayableCharacter extends MovingElement {
    constructor(canvas, color, position, limit, width, height, velocity, projectileConfig) {
        super(canvas, position, velocity);

        this.width = width;
        this.height = height;
        this.limit = limit;
        this.limit.right -= width;
        this.color = color;
        this.projectileConfig = projectileConfig;
        this.lastProjectileTime = null;
    }

    tryCreateProjectile() {
        const currentTime = performance.now();

        if (currentTime - this.lastProjectileTime >= this.projectileConfig.timeBetweenProjectiles) {
            new Projectile(
                this.canvas,
                this.projectileConfig.color,
                new Coordinates(this.position.x + this.width / 2, this.position.y),
                this.projectileConfig.radius,
                this.projectileConfig.velocity,
                this.projectileConfig.type);

            this.lastProjectileTime = currentTime;
        }
    }

    clear() {
        if (this.isCurrentlyDrawn()) {
            this.ctx.clearRect(this.canvasPosition.onFrameX, this.canvasPosition.onFrameY, this.width, this.height);
            this.removeCanvasPosition();
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.onFrameX, this.position.onFrameY, this.width, this.height);

        this.refreshCanvasPosition();
    }

    update() {
        const isArrowLeftPressed = KeyboardState.getKeyState('ArrowLeft');
        const isArrowRightPressed = KeyboardState.getKeyState('ArrowRight');
        const isShootingKeyPressed = KeyboardState.getKeyState(this.projectileConfig.shootingKey);

        if (isShootingKeyPressed) {
            this.tryCreateProjectile();
        }

        if (isArrowLeftPressed && isArrowRightPressed) {
            return;
        }

        if (isArrowLeftPressed) {
            this.goLeft();
        } else if (isArrowRightPressed) {
            this.goRight();
        }
    }

    goLeft() {
        this.position.x -= this.dynamicVelocity;
        this.position.x = Math.max(this.position.x, this.limit.left);
    }

    goRight() {
        this.position.x += this.dynamicVelocity;
        this.position.x = Math.min(this.position.x, this.limit.right);
    }
}