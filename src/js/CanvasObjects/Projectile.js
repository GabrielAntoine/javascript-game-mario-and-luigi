import { GamesBall } from "./GamesBall.js";

export class Projectile extends GamesBall {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity, type);
    }

    update() {
        if (this.isOutOfCanvas()) {
            this.allowDestruction();
        } else {
            this.position.y -= this.dynamicVelocity;
        }
    }

    hasHitTarget() {
        this.allowDestruction();
    }
}