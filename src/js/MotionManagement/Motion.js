import { Coordinates } from "../Coordinates/Coordinates.js";
import { InstantiateAbstractClassError } from "../Exceptions/InstantiateAbstractClassError.js";
import { NotImplementedError } from "../Exceptions/NotImplementedError.js";
import { FPS } from "../Helpers/FPS.js";

FPS.start();

export class Motion {

    constructor(distanceToTravel, staticVelocity) {
        if (new.target === Motion) {
            throw new InstantiateAbstractClassError(this.constructor.name);
        }

        this.distanceToTravel = distanceToTravel;
        this.travelledDistance = 0;
        this._relativePosition = new Coordinates();
        this.staticVelocity = staticVelocity;
    }

    get hasReachedEnd() {
        return this.travelledDistance >= this.distanceToTravel;
    }

    get hasStarted() {
        return this.travelledDistance > 0;
    }

    get dynamicVelocity() {
        return FPS.perSecondToPerFrame(this.staticVelocity);
    }

    copy(other) {
        this.distanceToTravel = other.distanceToTravel;
        this.travelledDistance = other.travelledDistance;
        this._relativePosition.copy(other._relativePosition);
        this.staticVelocity = other.staticVelocity;

        return this;
    }

    createInitialsStateCopy() {
        const copy = new this.constructor().copy(this);

        copy.travelledDistance = 0;
        copy._relativePosition.copy(Coordinates.origin);

        return copy;
    }

    getRelativePosition(_delayedTravelledDistance, _delayObject) {
        throw new NotImplementedError('getRelativePosition', this.constructor.name);
    }

    move(percentageOfVelocity = 1) {
        this.travelledDistance += this.dynamicVelocity * percentageOfVelocity;

        if (this.hasReachedEnd) {
            const percentageOfOverflow = (this.travelledDistance - this.distanceToTravel) / this.dynamicVelocity;
            this.travelledDistance = this.distanceToTravel;
            return percentageOfOverflow;
        }

        return 0;
    }

    mergePositions(initialPosition, outPosition, delay = 0) {
        const delayedTravelledDistance = Math.max(this.travelledDistance - delay, 0);
        
        const relativePosition = this.getRelativePosition(delayedTravelledDistance);
        outPosition.x = initialPosition.x + relativePosition.x;
        outPosition.y = initialPosition.y + relativePosition.y;
        
        if (delay === null || delay === 0) {
            return null;
        }

        if (this.hasReachedEnd) {
            delay = Math.max(delay - this.dynamicVelocity, 0);
        }

        return delay;
    }
}