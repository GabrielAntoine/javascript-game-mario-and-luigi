import { Motion } from "./Motion.js";

export class LinearMotion extends Motion {
    constructor(distanceToTravel, staticVelocity, direction) {
        super(distanceToTravel, staticVelocity);

        // An angle expressed in radians
        this.direction = direction;
    }

    get relativePosition() {
        this._relativePosition.set(
            this.getVelocityX(this.travelledDistance),
            this.getVelocityY(this.travelledDistance)
        );

        return this._relativePosition;
    }

    getVelocityX(velocity) {
        return velocity * Math.cos(this.direction);
    }

    getVelocityY(velocity) {
        return velocity * -Math.sin(this.direction);
    }
}