import { Coordinates } from "../../Coordinates/Coordinates.js";
import { LinearMotion } from "../../MotionManagement/LinearMotion.js";
import { CircularMotion } from "../../MotionManagement/CircularMotion.js";
import { SinusSignal } from "../../MotionManagement/SinusSignal.js";
import { SmoothSinusoidalMotion } from "../../MotionManagement/SmoothSinusoidalMotion.js";
import { StaticMotion } from "../../MotionManagement/StaticMotion.js";
import { CompoundMotion } from "../../MotionManagement/CompoundMotion.js";
import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { Random } from "../../Helpers/Random.js";

export class EnergyBallsPatterns {
    static #patternsProbabilities = {
        createPattern1: 2,
        createPattern2: 2,
        createPattern3: 1
    };

    static get patterns() {
        return Object.keys(this.#patternsProbabilities);
    }

    static get patternsProbabilities() {
        return Object.values(this.#patternsProbabilities);
    }

    static ENERGYBALL = {
        TYPES : {
            MARIO: 'Mario',
            LUIGI: 'Luigi',
            ALL  : 'All'
        },

        COLORS: {
            MARIO: '#F80008',
            LUIGI: '#52D701',
            ALL  : '#117ADF'
        },

        HEALTH: {
            MARIO: 1,
            LUIGI: 1,
            ALL  : 15
        },

        SCORE_EARNED : {
            MARIO: 1,
            LUIGI: 1,
            ALL  : 5
        },

        RADIUS: 40,
        INITIAL_Y: -50
    };

    static #randomType() {
        return Random.randomBoolean() ? 'MARIO' : 'LUIGI';
    }

    static #createEnergyBalls(canvas, numberOfBalls, getType, getInitialX, compoundMotion, getInitialDelay) {
        for (let i = 0; i < numberOfBalls; i++) {
            const type = getType(i);

            new EnergyBall(
                canvas,
                this.ENERGYBALL.COLORS[type],
                new Coordinates(getInitialX(i), this.ENERGYBALL.INITIAL_Y),
                this.ENERGYBALL.RADIUS,
                this.ENERGYBALL.TYPES[type],
                this.ENERGYBALL.HEALTH[type],
                this.ENERGYBALL.SCORE_EARNED[type],
                compoundMotion,
                getInitialDelay(i)
            );
        }
    }

    static createPattern1(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 2 - this.ENERGYBALL.INITIAL_Y, 300, - Math.PI / 2),
            new CircularMotion(2 * Math.PI * 133, 300, 133, 0, true),
            new LinearMotion(canvas.height / 2 - this.ENERGYBALL.INITIAL_Y, 300, - Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 8, this.#randomType, () => canvas.width / 2, compoundMotion, i => 1 / 3 * i);
    }

    static createPattern2(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 2 - this.ENERGYBALL.INITIAL_Y, 300, - Math.PI / 2),
            new StaticMotion(1 * 300, 300),
            new LinearMotion(canvas.height / 2 - this.ENERGYBALL.INITIAL_Y, 300, - Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 8, this.#randomType, i => canvas.width * 0.075 + (i * 2 + 1) * canvas.width * 0.85 / 16, compoundMotion, () => 0);
    }

    static createPattern3(canvas) {
        const compoundMotion = new CompoundMotion([
            new LinearMotion(canvas.height / 16 - this.ENERGYBALL.INITIAL_Y, 600, -Math.PI / 2),
            new SmoothSinusoidalMotion(7 * canvas.height / 16, 60, new SinusSignal(canvas.width * 0.85 / 2, 1 / (7 * canvas.height / 16 / 3), 0), -Math.PI / 2),
            new SmoothSinusoidalMotion(canvas.height / 2 - this.ENERGYBALL.INITIAL_Y, 60, new SinusSignal(canvas.width * 0.85 / 2, 1 / (7 * canvas.height / 16 / 3), Math.PI), -Math.PI / 2)
        ]);

        this.#createEnergyBalls(canvas, 1, () => 'ALL', () => canvas.width / 2, compoundMotion, () => 0);
    }
}