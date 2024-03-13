import { Coordinates } from "../../Coordinates/Coordinates.js";
import { CompoundMotion } from "../../MotionManagement/CompoundMotion.js";
import { LinearMotion } from "../../MotionManagement/LinearMotion.js";
import { config } from "../../config.js";
import { GamesBall } from "./GamesBall.js";

export class EnergyBall extends GamesBall {
    #compoundMotion;
    #health;

    constructor(canvas, color, position, radius, type, health, scoreEarned, compoundMotion, delay) {
        super(canvas, color, position, radius, 0, type); // EnergyBalls don't have velocity because it's included in compoundMotion

        this.#compoundMotion = compoundMotion;
        this.delay = delay;
        this.#health = health;
        this.hasBecomeAggresive = false;
        this.scoreEarned = scoreEarned;
    }

    decreaseHealth() {
        this.#health -= 1;

        if (this.#health <= 0) {
            this.startDestruction();
            return true;
        }

        return false;
    }

    update() {
        this.delay = this.#compoundMotion.moveTogether(this.initialPosition, this.position, this.delay);

        if (this.#compoundMotion.hasReachedEnd && this.delay === null) {
            this.allowDestruction();
        }
    }

    becomeAggressive() {
        if (this.hasBecomeAggresive) {
            return;
        }

        this.hasBecomeAggresive = true;

        this.setCompoundMotion(new CompoundMotion([
            new LinearMotion(this.canvas.height - this.position.y + 1, config.energyBall.aggressiveVelocity, - Math.PI / 2)
        ]));
    }

    startDestruction() {
        if (this.shouldBeDestroyed) {
            return;
        }

        this.shouldBeDestroyed = true;

        const finalPosition = new Coordinates(this.canvas.width / 2, config.energyBall.initialY);

        this.setCompoundMotion(new CompoundMotion([
            new LinearMotion(this.position.distanceTo(finalPosition), config.energyBall.deadVelocity, this.position.directionTo(finalPosition))
        ]));
    }

    setCompoundMotion(compoundMotion, delay = null) {
        this.initialPosition.copy(this.position);

        this.#compoundMotion = compoundMotion;
        this.delay = delay;
    }
}