import { KeyboardState } from "../Helpers/KeyboardState.js";
import { Coordinates } from "./Coordinates.js";
import { MovingElement } from "./MovingElement.js";
import { Projectile } from "./Projectile.js";

KeyboardState.start();

export class PlayableCharacter extends MovingElement {
    constructor(canvas, color, position, limit, width, height, velocity, leftKeys, rightKeys, projectileConfig) {
        super(canvas, position, velocity);

        this.width = width;
        this.height = height;
        this.limit = limit;
        this.limit.right -= width;
        this.color = color;
        this.leftKeys = leftKeys;
        this.rightKeys = rightKeys;
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
        const isLeftKeyPressed = KeyboardState.getKeysStateOR(this.leftKeys);
        const isRightKeyPressed = KeyboardState.getKeysStateOR(this.rightKeys);
        const isShootingKeyPressed = KeyboardState.getKeysStateOR(this.projectileConfig.shootingKeys);

        if (isShootingKeyPressed) {
            this.tryCreateProjectile();
        }

        if (isLeftKeyPressed && isRightKeyPressed) {
            return;
        }

        if (isLeftKeyPressed) {
            this.goLeft();
        } else if (isRightKeyPressed) {
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