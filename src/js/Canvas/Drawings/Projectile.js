import { GameStatus } from "../../Game/GameStatus.js";
import { settings } from "../../settings.js";
import { SpriteProjectileLuigi } from "../Sprites/SpriteProjectileLuigi.js";
import { SpriteProjectileMario } from "../Sprites/SpriteProjectileMario.js";
import { EnergyBall } from "./EnergyBall.js";
import { GamesBall } from "./GamesBall.js";
import { Impact } from "./Impact.js";

export class Projectile extends GamesBall {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity, type);

        switch (type) {
            case settings.projectile.mario.type:
                this.sprite = new SpriteProjectileMario(canvas, {height: this.diameter}, this.position, {type: 'circle-centered'});
                break;
            case settings.projectile.luigi.type:
                this.sprite = new SpriteProjectileLuigi(canvas, {height: this.diameter}, this.position, {type: 'circle-centered'});
        }
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

    draw() {
        if (this.sprite === undefined) {
            super.draw();
        } else {
            this.sprite.draw();
        }

        if (settings.hitBox.show) {
            this.ctx.strokeStyle = settings.hitBox.color;
            this.ctx.beginPath();
            this.ctx.arc(this.position.onFrameX, this.position.onFrameY, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
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
        new Impact(this.canvas, this.position);
    }
}