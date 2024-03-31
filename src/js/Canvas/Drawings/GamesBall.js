import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { Circle } from "./Circle.js";

export class GamesBall extends Circle {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity);

        this.type = type;
        this.shouldBeDestroyed = false;

        InstancesManager.push(this);
    }

    static get instances() {
        return InstancesManager.getInstances(this);
    }

    destroy() {
        this.shouldBeDestroyed = true;

        InstancesManager.delete(this);
    }

    clear() {
        super.clear();

        if (this.shouldBeDestroyed) {
            this.destroy();
        }
    }

}