import { GameStatus } from "../../Game/GameStatus.js";
import { settings } from "../../settings.js";
import { EnergyBall } from "./EnergyBall.js";
import { GamesBall } from "./GamesBall.js";

export class Projectile extends GamesBall {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity, type);
    }

    update() {
        if (this.isOutOfCanvas()) {
            this.destroy();
        } else {
            this.checkAllCollisions();
            if (!this.shouldBeDestroyed) {
                this.position.y -= this.dynamicVelocity;
            }
        }
    }

    isCollidingEnergyBall(energyBall) {
        return !this.shouldBeDestroyed && !energyBall.shouldBeDestroyed && !energyBall.isOutOfCanvas() && this.isOverlapping(energyBall);
    }

    hitEnergyBall(energyBall) {
        if (this.type === energyBall.type || energyBall.type === settings.energyBall.all.type) {
            energyBall.decreaseHealth();
            if (energyBall.shouldBeDestroyed) {
                GameStatus.increaseScore(energyBall.scoreEarned);
            }
        } else {
            energyBall.becomeAggressive();
        }

        this.createImpact();
        this.destroy();
    }

    checkAllCollisions() {
        EnergyBall.instances.forEach(energyBall => {
            if (this.isCollidingEnergyBall(energyBall)) {
                this.hitEnergyBall(energyBall);
            }
        });
    }

    createImpact() { 
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.position.onFrameX, this.position.onFrameY, this.radius * 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
}