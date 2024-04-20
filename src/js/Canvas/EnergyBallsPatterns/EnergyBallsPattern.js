import { Coordinates } from "../../Coordinates/Coordinates.js";
import { NotImplementedError } from "../../Exceptions/NotImplementedError.js";
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

    getType(i) {
        throw new NotImplementedError('getType', this.constructor.name);
    }

    getInitialX(i) {
        throw new NotImplementedError('getInitialX', this.constructor.name);
    }

    getInitialDelay(i) {
        throw new NotImplementedError('getInitialDelay', this.constructor.name);
    }
}