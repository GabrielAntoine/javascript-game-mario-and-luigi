import { Random } from "../../Helpers/Random.js";
import { CircularMotion } from "../../Motions/CircularMotion.js";
import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { settings } from "../../settings.js";
import { EnergyBallsPattern } from "./EnergyBallsPattern.js";

export class NodePattern extends EnergyBallsPattern {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            8, 
            new CompoundMotion([
                new LinearMotion(settings.canvas.HTMLElement.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2),
                new CircularMotion(2 * Math.PI * 133, settings.energyBall.globalVelocity, 133, 0, true),
                new LinearMotion(settings.canvas.HTMLElement.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2)
            ])
        );

        this.initialX = Random.randomFloat(settings.canvas.HTMLElement.width * 0.2, settings.canvas.HTMLElement.width * 0.8);
    }

    getType() {
        return Random.randomBoolean() ? settings.energyBall.mario.type : settings.energyBall.luigi.type;
    }

    getInitialX() {
        return this.initialX;
    }

    getInitialDelay(i) {
        return 100 / settings.energyBall.globalVelocity * i;
    }
}