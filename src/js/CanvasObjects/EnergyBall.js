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

    get health() {
        return this.#health;
    }

    set health(value) {
        this.#health = value;

        if (this.#health <= 0) {
            this.allowDestruction();
        }
    }

    decreaseHealth() {
        this.#health -= 1;

        if (this.#health <= 0) {
            this.allowDestruction();

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
            new LinearMotion(this.canvas.height - this.position.y + 1, 1600, - Math.PI / 2)
        ]));
    }

    setCompoundMotion(compoundMotion, delay = null) {
        this.initialPosition.copy(this.position);

        this.#compoundMotion = compoundMotion;
        this.delay = delay;
    }
}