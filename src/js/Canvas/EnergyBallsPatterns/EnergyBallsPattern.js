import { Coordinates } from "../../Coordinates/Coordinates.js";
import { NotImplementedError } from "../../Exceptions/NotImplementedError.js";
import { Random } from "../../Helpers/Random.js";
import { settings } from "../../settings.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";

export class EnergyBallsPattern {
    constructor(canvas, numberOfBalls, compoundMotion) {
        if (new.target === EnergyBallsPattern)
            throw new InstantiateAbstractClassError(this.constructor.name);

        this.canvas = canvas;
        this.numberOfBalls = numberOfBalls;
        this.compoundMotion = compoundMotion;
    }

    create() {
        for (let i = 0; i < this.numberOfBalls; i++) {
            const type = this.getType(i);
            const initialX = this.getInitialX(i);
            const initialDelay = this.getInitialDelay(i);
            const initialPosition = new Coordinates(initialX, settings.energyBall.initialY);

            new EnergyBall(
                this.canvas,
                settings.energyBall[type].color,
                initialPosition,
                settings.energyBall.radius,
                settings.energyBall[type].type,
                settings.energyBall[type].health,
                settings.energyBall[type].scoreEarned,
                this.compoundMotion,
                initialDelay
            )
        }
    }

    getType(_i) {
        return Random.randomBoolean() ? settings.energyBall.mario.type : settings.energyBall.luigi.type;
    }

    getInitialX(_i) {
        throw new NotImplementedError('getInitialX', this.constructor.name);
    }

    getInitialDelay(_i) {
        return 0;
    }
}