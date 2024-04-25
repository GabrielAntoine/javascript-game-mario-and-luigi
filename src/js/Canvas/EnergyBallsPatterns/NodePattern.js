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
            settings.nodePattern.numberOfBalls, 
            new CompoundMotion([
                new LinearMotion(
                    settings.nodePattern.motion1Linear.distanceToTravel,
                    settings.energyBall.globalVelocity,
                    settings.nodePattern.motion1Linear.direction
                ),
                new CircularMotion(
                    settings.nodePattern.motion2Circle.distanceToTravel,
                    settings.energyBall.globalVelocity,
                    settings.nodePattern.motion2Circle.radius,
                    settings.nodePattern.motion2Circle.initialAngle,
                    settings.nodePattern.motion2Circle.isClockWise
                ),
                new LinearMotion(
                    settings.nodePattern.motion3Linear.distanceToTravel,
                    settings.energyBall.globalVelocity,
                    settings.nodePattern.motion3Linear.direction
                )
            ])
        );

        this.initialX = Random.randomFloat(settings.nodePattern.minInitialX, settings.nodePattern.maxInitialX);
    }

    getInitialX() {
        return this.initialX;
    }

    getInitialDelay(i) {
        return settings.nodePattern.gap / settings.energyBall.globalVelocity * i;
    }
}