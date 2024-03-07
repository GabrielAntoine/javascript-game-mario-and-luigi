import { DocumentVisibilityTime } from "../Helpers/DocumentVisibilityTime.js";
import { Motion } from "./Motion.js";

DocumentVisibilityTime.start();

// This class is used along other 'Motion' classes, that's why it inherits of super-class 'Motion'
// but it's technically not a motion
export class WaitMotion extends Motion {
    constructor(waitingTime) {
        super(0, 0);

        this.waitingTime = waitingTime;
        this.startingTime = null;
        this._relativePosition.set(0, 0);
    }

    get hasReachedEnd() {
        return this.startingTime !== null && DocumentVisibilityTime.now - this.startingTime >= this.waitingTime;
    }

    get hasStarted() {
        return this.startingTime !== null;
    }
    
    get relativePosition() {
        return this._relativePosition;
    }

    start() {
        this.startingTime = DocumentVisibilityTime.now;
    }

    move() {
        if (this.startingTime === null) {
            this.start();
        }
    }
}