import { Motion } from "./Motion.js";
import { Coordinates } from "../Coordinates/Coordinates.js";
import { SinusSignal } from "./SinusSignal.js";

export class SinusoidalMotion extends Motion {
    constructor(distanceToTravel, staticVelocity, sinusSignal, direction) {
        super(distanceToTravel, staticVelocity);

        this.sinusSignal = sinusSignal;
        this.direction = direction;
    }

    getRelativePosition(travelledDistance) {
        this._relativePosition.set(
            travelledDistance,
            -this.sinusSignal.sin(travelledDistance) - -this.sinusSignal.sin(0)
        );
            
        this._relativePosition.rotate(Coordinates.origin, this.direction, false);

        return this._relativePosition;
    }

    copy(other) {
        super.copy(other);

        if (this?.sinusSignal?.copy(other.sinusSignal) === undefined) {
            this.sinusSignal = new SinusSignal().copy(other.sinusSignal);
        }
        this.direction = other.direction;

        return this;
    }
}