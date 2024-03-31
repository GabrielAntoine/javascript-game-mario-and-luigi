import { Coordinates } from "../Coordinates/Coordinates.js";
import { Motion } from "./Motion.js";

export class CircularMotion extends Motion {
    constructor(distanceToTravel, staticVelocity, radius, initialAngle, isClockwise) {
        super(distanceToTravel, staticVelocity);

        this.radius = radius;
        this.initialAngle = initialAngle;
        this.direction = isClockwise ? -1 : 1;
        this.center = Coordinates.origin.translated(this.radius, this.initialAngle, true);
    }

    getRelativePosition(travelledDistance) {
        const currentAngle = this.initialAngle + this.getAngleVelocity(travelledDistance)

        this._relativePosition = this.center.translated(this.radius, currentAngle, false);

        return this._relativePosition;
    }

    getAngleVelocity(velocity) {
        return velocity / this.radius * this.direction;
    }

    copy(other) {
        super.copy(other);

        this.radius = other.radius;
        this.initialAngle = other.initialAngle;
        this.direction = other.direction;
        if (this?.center?.copy(other.center) === undefined) {
            this.center = new Coordinates().copy(other.center);
        };

        return this;
    }
}