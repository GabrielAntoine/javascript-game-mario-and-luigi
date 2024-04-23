import { Random } from "../../Helpers/Random.js";
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
                new LinearMotion(
                    settings.strongEnergyBallPattern.arrivalMotion.distanceToTravel,
                    settings.strongEnergyBallPattern.arrivalMotion.velocity,
                    settings.strongEnergyBallPattern.arrivalMotion.direction
                ),
                ...StrongEnergyBallPattern.sinusoidalMotions
            ])
        );
    }

    getType() {
        return settings.energyBall.all.type;
    }

    getInitialX() {
        return settings.strongEnergyBallPattern.initialX;
    }

    static get sinusoidalMotions() {
        const minDirectionsChanges = settings.strongEnergyBallPattern.minDirectionsChanges;
        const maxDirectionsChanges = settings.strongEnergyBallPattern.maxDirectionsChanges;
        const distanceToTravel = settings.strongEnergyBallPattern.sinusoidalMotions.distanceToTravel;
        const frequency = settings.strongEnergyBallPattern.sinusoidalMotions.frequency;

        // Chooses the amount of changes in the direction
        const numberOfDirectionsChanges = Random.randomInteger(minDirectionsChanges, maxDirectionsChanges);
        
        // Chooses at what distance the changes of direction take place
        // First and last index of 'breaks' are the start and end of the motion
        const breaks = [0];
        for (let i = 0; i < numberOfDirectionsChanges; i++) {
            const startPosition = Random.randomFloat(0, distanceToTravel);
            breaks.push(startPosition);
        }
        breaks.sort((a, b) => a - b);
        breaks.push(distanceToTravel);

        // Calculate the distance that each motion has to do
        const gaps = breaks.slice(1).map((value, i) => value - breaks[i]);

        // Calculate the phase shifts based on the one at then end's state of the previous motion
        const phaseShifts = [settings.strongEnergyBallPattern.sinusoidalMotions.phaseShift];
        for (let i = 0; i < gaps.length; i++) {
            // Formula to calculate the phase shift
            const D = -2 * Math.PI * gaps[i] * frequency - phaseShifts[i] - Math.PI;
            phaseShifts.push(D);
        }

        // Building the motions
        const sinusoidalMotions = [];
        for (let i = 0; i < numberOfDirectionsChanges + 1; i++) {
            const sinusoidalMotion = new SinusoidalMotion(
                gaps[i],
                settings.strongEnergyBallPattern.sinusoidalMotions.velocity,
                new SinusSignal(
                    settings.strongEnergyBallPattern.sinusoidalMotions.amplitude,
                    frequency,
                    phaseShifts[i]
                ),
                settings.strongEnergyBallPattern.sinusoidalMotions.direction
            );

            sinusoidalMotions.push(sinusoidalMotion);
        }

        return sinusoidalMotions;
    }
}