import { Coordinates } from "../../Coordinates/Coordinates.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { CircularMotion } from "../../Motions/CircularMotion.js";
import { SinusSignal } from "../../Motions/SinusSignal.js";
import { SmoothSinusoidalMotion } from "../../Motions/SmoothSinusoidalMotion.js";
import { StaticMotion } from "../../Motions/StaticMotion.js";
import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";
import { Random } from "../../Helpers/Random.js";
import { settings } from "../../settings.js";

export class EnergyBallsPatterns {
    static #patternsProbabilities = {
        nodePattern: 2,
        inlinewaitPattern: 2,
        strongEnergyBallPattern: 1
    };

    static get patterns() {
        return Object.keys(this.#patternsProbabilities);
    }

    static get patternsProbabilities() {
        return Object.values(this.#patternsProbabilities);
    }

    static #randomType() {
        return Random.randomBoolean() ? settings.energyBall.mario.type : settings.energyBall.luigi.type;
    }

    static #createEnergyBalls(canvas, numberOfBalls, getType, getInitialX, compoundMotion, getInitialDelay) {
        for (let i = 0; i < numberOfBalls; i++) {
            const type = getType(i);

            new EnergyBall(
                canvas,
                settings.energyBall[type].color,
                new Coordinates(getInitialX(i), settings.energyBall.initialY),
                settings.energyBall.radius,
                settings.energyBall[type].type,
                settings.energyBall[type].health,
                settings.energyBall[type].scoreEarned,
                compoundMotion,
                getInitialDelay(i)
            );
        }
    }

    static nodePattern(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2),
            new CircularMotion(2 * Math.PI * 133, settings.energyBall.globalVelocity, 133, 0, true),
            new LinearMotion(canvas.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 8, this.#randomType, () => canvas.width / 2, compoundMotion, i => 100 / settings.energyBall.globalVelocity * i);
    }

    static inlinewaitPattern(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2),
            new StaticMotion(1 * settings.energyBall.globalVelocity, settings.energyBall.globalVelocity),
            new LinearMotion(canvas.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 8, this.#randomType, i => canvas.width * 0.075 + (i * 2 + 1) * canvas.width * 0.85 / 16, compoundMotion, () => 0);
    }

    static strongEnergyBallPattern(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 16 - settings.energyBall.initialY, settings.energyBall.globalVelocity * 2, -Math.PI / 2),
            new SmoothSinusoidalMotion(7 * canvas.height / 16, settings.energyBall.globalVelocity / 5, new SinusSignal(canvas.width * 0.85 / 2, 1 / (7 * canvas.height / 16 / 3), 0), -Math.PI / 2),
            new SmoothSinusoidalMotion(canvas.height / 2 - settings.energyBall.initialY, 60, new SinusSignal(canvas.width * 0.85 / 2, 1 / (7 * canvas.height / 16 / 3), Math.PI), -Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 1, () => settings.energyBall.all.type, () => canvas.width / 2, compoundMotion, () => 0);
    }
}