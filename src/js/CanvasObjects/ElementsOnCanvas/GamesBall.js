import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { MovingCircle } from "./MovingCircle.js";

export class GamesBall extends MovingCircle {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity);

        this.type = type;
        this.shouldBeDestroyed = false;

        InstancesManager.push(this);
    }

    static get everyInstance() {
        return InstancesManager.getInstances(this);
    }

    allowDestruction() {
        this.shouldBeDestroyed = true;

        this.destroy();
    }

    destroy() {
        InstancesManager.delete(this);
    }

    clear() {
        super.clear();

        if (this.shouldBeDestroyed) {
            this.destroy();
        }
    }

}