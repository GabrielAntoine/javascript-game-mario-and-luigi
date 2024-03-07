import { Coordinates } from "../CanvasObjects/Coordinates.js";
import { Motion } from "./Motion.js";

export class CircularMotion extends Motion {
    constructor(distanceToTravel, staticVelocity, radius, initialAngle, isClockwise) {
        super(distanceToTravel, staticVelocity);

        this.radius = radius;
        this.initialAngle = initialAngle;
        this.direction = isClockwise ? 1 : -1;
        this.center = new Coordinates(0, 0).getCenterOfCircle(this.radius, this.initialAngle);
    }

    get relativePosition() {
        const currentAngle = this.initialAngle + this.getAngleVelocity(this.travelledDistance)

        this._relativePosition = this.center.getPointOnCircle(this.radius, currentAngle);

        return this._relativePosition;
    }

    getAngleVelocity(velocity) {
        return velocity / this.radius * this.direction;
    }
}