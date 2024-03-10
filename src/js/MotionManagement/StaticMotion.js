import { Coordinates } from "../Coordinates/Coordinates.js";
import { Motion } from "./Motion.js";

export class StaticMotion extends Motion {
    constructor(waitingTime) {
        super(waitingTime, 1);

        this._relativePosition.copy(Coordinates.origin);
    }

    getRelativePosition() {
        return this._relativePosition;
    }
}