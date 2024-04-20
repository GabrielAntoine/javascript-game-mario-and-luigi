import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { SinusSignal } from "../../Motions/SinusSignal.js";
import { SmoothSinusoidalMotion } from "../../Motions/SmoothSinusoidalMotion.js";
import { settings } from "../../settings.js";
import { EnergyBallsPattern } from "./EnergyBallsPattern.js";

export class StrongEnergyBallPattern extends EnergyBallsPattern {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            1, 
            new CompoundMotion([
                new LinearMotion(settings.canvas.height / 16 - settings.energyBall.initialY, settings.energyBall.globalVelocity * 2, -Math.PI / 2),
                new SmoothSinusoidalMotion(7 * settings.canvas.height / 16, settings.energyBall.globalVelocity / 5, new SinusSignal(settings.canvas.width * 0.85 / 2, 1 / (7 * settings.canvas.height / 16 / 3), 0), -Math.PI / 2),
                new SmoothSinusoidalMotion(settings.canvas.height / 2 - settings.energyBall.initialY, 60, new SinusSignal(settings.canvas.width * 0.85 / 2, 1 / (7 * settings.canvas.height / 16 / 3), Math.PI), -Math.PI / 2)
            ])
        );
    }

    getType() {
        return settings.energyBall.all.type;
    }

    getInitialX() {
        return settings.canvas.width / 2;
    }

    getInitialDelay() {
        return 0;
    }
}