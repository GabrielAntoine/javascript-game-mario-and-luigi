import { Coordinates } from "../../Coordinates/Coordinates.js";
import { LinearMotion } from "../../MotionManagement/LinearMotion.js";
import { CircularMotion } from "../../MotionManagement/CircularMotion.js";
import { SinusSignal } from "../../MotionManagement/SinusSignal.js";
import { SmoothSinusoidalMotion } from "../../MotionManagement/SmoothSinusoidalMotion.js";
import { StaticMotion } from "../../MotionManagement/StaticMotion.js";
import { CompoundMotion } from "../../MotionManagement/CompoundMotion.js";
import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { Random } from "../../Helpers/Random.js";
import { config } from "../../config.js";

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
        return Random.randomBoolean() ? config.energyBall.mario.type : config.energyBall.luigi.type;
    }

    static #createEnergyBalls(canvas, numberOfBalls, getType, getInitialX, compoundMotion, getInitialDelay) {
        for (let i = 0; i < numberOfBalls; i++) {
            const type = getType(i);

            new EnergyBall(
                canvas,
                config.energyBall[type].color,
                new Coordinates(getInitialX(i), config.energyBall.initialY),
                config.energyBall.radius,
                config.energyBall[type].type,
                config.energyBall[type].health,
                config.energyBall[type].scoreEarned,
                compoundMotion,
                getInitialDelay(i)
            );
        }
    }

    static nodePattern(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 2 - config.energyBall.initialY, config.energyBall.globalVelocity, - Math.PI / 2),
            new CircularMotion(2 * Math.PI * 133, config.energyBall.globalVelocity, 133, 0, true),
            new LinearMotion(canvas.height / 2 - config.energyBall.initialY, config.energyBall.globalVelocity, - Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 8, this.#randomType, () => canvas.width / 2, compoundMotion, i => 100 / config.energyBall.globalVelocity * i);
    }

    static inlinewaitPattern(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 2 - config.energyBall.initialY, config.energyBall.globalVelocity, - Math.PI / 2),
            new StaticMotion(1 * config.energyBall.globalVelocity, config.energyBall.globalVelocity),
            new LinearMotion(canvas.height / 2 - config.energyBall.initialY, config.energyBall.globalVelocity, - Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 8, this.#randomType, i => canvas.width * 0.075 + (i * 2 + 1) * canvas.width * 0.85 / 16, compoundMotion, () => 0);
    }

    static strongEnergyBallPattern(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 16 - config.energyBall.initialY, config.energyBall.globalVelocity * 2, -Math.PI / 2),
            new SmoothSinusoidalMotion(7 * canvas.height / 16, config.energyBall.globalVelocity / 5, new SinusSignal(canvas.width * 0.85 / 2, 1 / (7 * canvas.height / 16 / 3), 0), -Math.PI / 2),
            new SmoothSinusoidalMotion(canvas.height / 2 - config.energyBall.initialY, 60, new SinusSignal(canvas.width * 0.85 / 2, 1 / (7 * canvas.height / 16 / 3), Math.PI), -Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 1, () => config.energyBall.all.type, () => canvas.width / 2, compoundMotion, () => 0);
    }
}