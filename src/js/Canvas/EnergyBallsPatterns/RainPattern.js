import { Random } from "../../Helpers/Random.js";
import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { StaticMotion } from "../../Motions/StaticMotion.js";
import { settings } from "../../settings.js";
import { EnergyBallsPattern } from "./EnergyBallsPattern.js";

export class RainPattern extends EnergyBallsPattern {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            settings.rainPattern.numberOfBalls, 
            new CompoundMotion([
                new LinearMotion(
                    (settings.energyBall.lastY - settings.energyBall.initialY) * settings.rainPattern.whenToWait,
                    settings.energyBall.globalVelocity,
                    settings.rainPattern.direction
                ),
                new StaticMotion(
                    settings.rainPattern.waintingDuration * settings.energyBall.globalVelocity,
                    settings.energyBall.globalVelocity),
                new LinearMotion(
                    (settings.energyBall.lastY - settings.energyBall.initialY) * (1 - settings.rainPattern.whenToWait),
                    settings.energyBall.globalVelocity,
                    settings.rainPattern.direction
                )
            ])
        );
    }

    getInitialX() {
        return Random.randomFloat(settings.rainPattern.minInitialX, settings.rainPattern.maxInitialX);
    }

    getInitialDelay(i) {
        return i * settings.rainPattern.timeBetweenEachBall;
    }
}