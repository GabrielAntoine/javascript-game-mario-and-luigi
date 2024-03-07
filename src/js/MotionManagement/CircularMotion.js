import { Coordinates } from "../CanvasObjects/Coordinates.js";
import { Motion } from "./Motion.js";

export class CircularMotion extends Motion {
    constructor(distanceToTravel, staticVelocity, radius, initialAngle, isClockwise) {
        super(distanceToTravel, staticVelocity);

        this.radius = radius;
        this.initialAngle = initialAngle;
        this.direction = isClockwise ? 1 : -1;
        this.center = Coordinates.origin.pointTo(this.radius, this.initialAngle, true);
    }

    getRelativePosition(travelledDistance) {
        const currentAngle = this.initialAngle + this.getAngleVelocity(travelledDistance)

        this._relativePosition = this.center.pointTo(this.radius, currentAngle, false);

        return this._relativePosition;
    }

    getAngleVelocity(velocity) {
        return velocity / this.radius * this.direction;
    }
}