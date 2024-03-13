import { KeyboardState } from "../../Helpers/KeyboardState.js";
import { Coordinates } from "../../Coordinates/Coordinates.js";
import { MovingElement } from "./MovingElement.js";
import { Projectile } from "./Projectile.js";
import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { MovingRectangle } from "./MovingRectangle.js";

KeyboardState.start();

export class PlayableCharacter extends MovingRectangle {
    constructor(canvas, color, position, limit, width, height, velocity, leftKeys, rightKeys, projectileConfig) {
        super(canvas, color, position, width, height, velocity);

        this.limit = limit;
        this.limit.right -= width;
        this.leftKeys = leftKeys;
        this.rightKeys = rightKeys;
        this.projectileConfig = projectileConfig;
        this.lastProjectileTime = null;
        this.isInvicible = false;

        InstancesManager.push(this);
    }

    static get everyInstance() {
        return InstancesManager.getInstances(this);
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

    goLeft() {
        this.position.x -= this.dynamicVelocity;
        this.position.x = Math.max(this.position.x, this.limit.left);
    }

    goRight() {
        this.position.x += this.dynamicVelocity;
        this.position.x = Math.min(this.position.x, this.limit.right);
    }

    hasGetHit() {
        // set isInvincible to true to every instance of PlayableCharacter during
        // a certain amount of time defined in config.js
    }
}