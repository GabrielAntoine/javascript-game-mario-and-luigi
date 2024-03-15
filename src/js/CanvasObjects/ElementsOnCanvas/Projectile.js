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
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.position.onFrameX, this.position.onFrameY, this.radius * 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

        this.allowDestruction();
    }
}