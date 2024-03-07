import { Coordinates } from "../CanvasObjects/Coordinates.js";
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

    get relativePosition() {
        throw new NotImplementedError('relativePosition', this.constructor.name);
    }

    move() {
        this.travelledDistance += this.dynamicVelocity;

        if (this.hasReachedEnd) {
            this.travelledDistance = this.distanceToTravel;
        }
    }

    mergePositions(initialPosition, outPosition) {
        outPosition.x = initialPosition.x + this.relativePosition.x;
        outPosition.y = initialPosition.y + this.relativePosition.y;
    }
}