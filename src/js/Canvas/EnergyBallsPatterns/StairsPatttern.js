import { Random } from "../../Helpers/Random.js";
import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { settings } from "../../settings.js";
import { EnergyBallsPattern } from "./EnergyBallsPattern.js";

export class StairsPattern extends EnergyBallsPattern {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            settings.stairsPattern.numberOfBalls,
            new CompoundMotion(StairsPattern.linearMotions)
        );

        this.initialX = Random.randomFloat(settings.stairsPattern.minInitialX, settings.stairsPattern.maxInitialX);
    }

    getInitialDelay(i) {
        return settings.stairsPattern.gap / settings.energyBall.globalVelocity * i;
    }

    getInitialX() {
        return this.initialX;
    }

    static get linearMotions() {
        // Chooses left or right direction randomly
        let direction = settings.stairsPattern.direction;
        if (Random.randomBoolean()) {
            direction = Math.PI - direction;
        }

        // SOHCAHTOA manipulations
        const verticalDistance = settings.energyBall.lastY - settings.energyBall.initialY;
        const horizontalDistance = settings.stairsPattern.width;
        // Angle between the line formed by the angle 'direction' and the y-axis within the unit circle
        const angle = -Math.sign(Math.tan(direction)) * direction + Math.sign(Math.cos(direction)) * Math.PI / 2;
        const actualDistance = verticalDistance / Math.cos(angle);
        const distancePerSegment = horizontalDistance / Math.cos(Math.PI / 2 - angle);
        const numberOfMotions = actualDistance / distancePerSegment;

        const linearMotions = [];
        for (let i = 0; i < numberOfMotions; i++) {
            linearMotions.push(new LinearMotion(
                distancePerSegment,
                settings.energyBall.globalVelocity,
                direction
            ));

            // Opposite direction
            direction = Math.PI - direction;
        }

        return linearMotions;
    }
}