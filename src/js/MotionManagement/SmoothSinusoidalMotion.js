import { Motion } from "./Motion.js";
import { Coordinates } from "../CanvasObjects/Coordinates.js";

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
            
        this._relativePosition = Coordinates.origin.pointTo(
            Coordinates.origin.distanceTo(this._relativePosition),
            Coordinates.origin.directionTo(this._relativePosition) + this.direction,
            false
        );

        return this._relativePosition;
    }
}