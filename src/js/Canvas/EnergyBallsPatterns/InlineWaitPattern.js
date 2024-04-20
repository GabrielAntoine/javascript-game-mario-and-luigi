import { Random } from "../../Helpers/Random.js";
import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { StaticMotion } from "../../Motions/StaticMotion.js";
import { settings } from "../../settings.js";
import { EnergyBallsPattern } from "./EnergyBallsPattern.js";

export class InlineWaitPattern extends EnergyBallsPattern {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            8, 
            new CompoundMotion([
                new LinearMotion(settings.canvas.HTMLElement.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2),
                new StaticMotion(1 * settings.energyBall.globalVelocity, settings.energyBall.globalVelocity),
                new LinearMotion(settings.canvas.HTMLElement.height / 2 - settings.energyBall.initialY, settings.energyBall.globalVelocity, - Math.PI / 2)
            ])
        );
    }

    getType() {
        return Random.randomBoolean() ? settings.energyBall.mario.type : settings.energyBall.luigi.type;
    }

    getInitialX(i) {
        return settings.canvas.HTMLElement.width * 0.075 + (i * 2 + 1) * settings.canvas.HTMLElement.width * 0.85 / 16;
    }

    getInitialDelay() {
        return 0;
    }
}