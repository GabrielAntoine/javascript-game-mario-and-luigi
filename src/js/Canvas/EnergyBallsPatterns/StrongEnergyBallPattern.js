import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { SinusSignal } from "../../Motions/SinusSignal.js";
import { SinusoidalMotion } from "../../Motions/SinusoidalMotion.js";
import { settings } from "../../settings.js";
import { EnergyBallsPattern } from "./EnergyBallsPattern.js";

export class StrongEnergyBallPattern extends EnergyBallsPattern {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            settings.strongEnergyBallPattern.numberOfBalls, 
            new CompoundMotion([
                new LinearMotion(settings.canvas.height / 16 - settings.energyBall.initialY, settings.energyBall.globalVelocity * 2, -Math.PI / 2),
                new SinusoidalMotion(7 * settings.canvas.height / 16, settings.energyBall.globalVelocity / 5, new SinusSignal(settings.canvas.width * 0.85 / 2, 1 / (7 * settings.canvas.height / 16 / 3), 0), -Math.PI / 2),
                new SinusoidalMotion(settings.canvas.height / 2 - settings.energyBall.initialY, 60, new SinusSignal(settings.canvas.width * 0.85 / 2, 1 / (7 * settings.canvas.height / 16 / 3), Math.PI), -Math.PI / 2)
            ])
        );
    }

    getType() {
        return settings.energyBall.all.type;
    }

    getInitialX() {
        return settings.strongEnergyBallPattern.initialX;
    }

    getInitialDelay() {
        return 0;
    }
}