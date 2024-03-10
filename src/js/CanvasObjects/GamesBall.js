import { InstancesManager } from "../Helpers/InstancesManager.js";
import { MovingCircle } from "./MovingCircle.js";

export class GamesBall extends MovingCircle {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity);

        this.type = type;
        this.shouldBeDestroyed = false;

        InstancesManager.push(this.constructor, this);
    }

    static get everyInstance() {
        return InstancesManager.getInstances(this);
    }

    // This method's purpose is to destroy 'this' when it's removed from the canvas
    allowDestruction() {
        if (this.isCurrentlyDrawn()) {
            this.shouldBeDestroyed = true;
        } else {
            this.destroy();
        }
    }

    destroy() {
        InstancesManager.delete(this.constructor, this);
    }

    clear() {
        super.clear();

        if (this.shouldBeDestroyed) {
            this.destroy();
        }
    }

}