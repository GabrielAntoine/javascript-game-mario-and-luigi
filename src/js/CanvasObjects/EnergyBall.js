import { GamesBall } from "./GamesBall.js";

export class EnergyBall extends GamesBall {
    #compoundMotion;

    constructor(canvas, color, position, radius, type, compoundMotion, delay) {
        super(canvas, color, position, radius, 0, type); // EnergyBalls don't have velocity because it's included in compoundMotion

        this.#compoundMotion = compoundMotion;
        this.delay = delay;
    }

    update() {
        this.delay = this.#compoundMotion.moveTogether(this.initialPosition, this.position, this.delay);

        if (this.#compoundMotion.hasReachedEnd && this.delay === null) {
            this.destroy();
        }
    }

    set compoundMotion(value) {
        this.initialPosition.copy(this.position);

        this.#compoundMotion = value;
    }
}