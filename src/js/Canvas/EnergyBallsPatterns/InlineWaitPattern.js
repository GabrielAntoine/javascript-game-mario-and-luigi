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
            settings.inlineWaitPattern.numberOfBalls, 
            new CompoundMotion([
                new LinearMotion(
                    settings.inlineWaitPattern.motion1Linear.distanceToTravel,
                    settings.energyBall.globalVelocity,
                    settings.inlineWaitPattern.motion1Linear.direction
                ),
                new StaticMotion(
                    settings.inlineWaitPattern.motion2Static.duration * settings.energyBall.globalVelocity,
                    settings.energyBall.globalVelocity),
                new LinearMotion(
                    settings.inlineWaitPattern.motion3Linear.distanceToTravel,
                    settings.energyBall.globalVelocity,
                    settings.inlineWaitPattern.motion3Linear.direction
                )
            ])
        );
    }

    getType() {
        return Random.randomBoolean() ? settings.energyBall.mario.type : settings.energyBall.luigi.type;
    }

    getInitialX(i) {
        const patternWidth = settings.inlineWaitPattern.gap * (settings.inlineWaitPattern.numberOfBalls - 1);
        const firstX = (settings.canvas.width - patternWidth) / 2;
        const iX = firstX + i * settings.inlineWaitPattern.gap;

        return iX;
    }

    getInitialDelay() {
        return 0;
    }
}