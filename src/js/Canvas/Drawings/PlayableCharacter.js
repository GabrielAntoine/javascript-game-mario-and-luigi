import { KeyboardState } from "../../Helpers/KeyboardState.js";
import { Coordinates } from "../../Coordinates/Coordinates.js";
import { Projectile } from "./Projectile.js";
import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { MovingRectangle } from "./MovingRectangle.js";
import { settings } from "../../settings.js";

KeyboardState.start();

export class PlayableCharacter extends MovingRectangle {
    static lastTimeHit = null;
    static invicibilityTime = settings.character.invincibilityTimeWhenHit;

    constructor(canvas, color, position, limit, width, height, velocity, leftKeys, rightKeys, projectileConfig) {
        super(canvas, color, position, width, height, velocity);

        this.limit = limit;
        this.limit.right -= width;
        this.leftKeys = leftKeys;
        this.rightKeys = rightKeys;
        this.projectileConfig = projectileConfig;
        this.lastProjectileTime = null;
        this.usedColor = color;

        InstancesManager.push(this);
    }

    static get instances() {
        return InstancesManager.getInstances(this);
    }

    static get areInvicible() {
        return this.lastTimeHit !== null && document.timeline.currentTime / 1000 - this.lastTimeHit < this.invicibilityTime;
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

    draw() {
        if (this.constructor.areInvicible) {
            this.color = settings.character.invincibilityColor;
        } else {
            this.color = this.usedColor;
        }

        super.draw();
    }

    goLeft() {
        this.position.x -= this.dynamicVelocity;
        this.position.x = Math.max(this.position.x, this.limit.left);
    }

    goRight() {
        this.position.x += this.dynamicVelocity;
        this.position.x = Math.min(this.position.x, this.limit.right);
    }

    hasGetHit() {
        PlayableCharacter.lastTimeHit = document.timeline.currentTime / 1000;
    }
}