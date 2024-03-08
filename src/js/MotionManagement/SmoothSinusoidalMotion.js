import { Motion } from "./Motion.js";
import { Coordinates } from "../Coordinates/Coordinates.js";

export class SmoothSinusoidalMotion extends Motion {
    constructor(distanceToTravel, staticVelocity, sinusSignal, direction) {
        super(distanceToTravel, staticVelocity);

        this.sinusSignal = sinusSignal;
        this.direction = direction;
    }

    getRelativePosition(travelledDistance) {
        this._relativePosition.set(
            travelledDistance,
            -this.sinusSignal.sin(travelledDistance)
        );
            
        this._relativePosition.rotate(Coordinates.origin, this.direction, false);

        return this._relativePosition;
    }
}