import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { settings } from "../../settings.js";
import { BaseElement } from "./BaseElement.js";

export class Impact extends BaseElement {
    constructor(canvas, position) {
        super(canvas);

        this.canvasPosition = position;
        this.spawnTime = document.timeline.currentTime / 1000;

        InstancesManager.push(this);
    }

    static get instances() {
        return InstancesManager.getInstances(this);
    }

    get timesUp() {
        return document.timeline.currentTime / 1000 - this.spawnTime > settings.impact.duration;
    }

    destroy() {
        InstancesManager.delete(this);
    }

    update() {
        if (this.timesUp) {
            this.destroy();
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = settings.impact.color;
        this.ctx.arc(this.canvasPosition.onFrameX, this.canvasPosition.onFrameY, settings.impact.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
}