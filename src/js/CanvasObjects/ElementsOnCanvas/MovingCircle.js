import { Coordinates } from "../../Coordinates/Coordinates.js";
import { MovingElement } from "./MovingElement.js";
import { MovingRectangle } from "./MovingRectangle.js";

export class MovingCircle extends MovingElement {
    constructor(canvas, color, position, radius, velocity) {
        super(canvas, position, velocity);

        this.color = color;
        this.radius = radius;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.position.onFrameX, this.position.onFrameY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();

        this.refreshCanvasPosition();
    }

    clear() {
        if (this.isCurrentlyDrawn()) {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.beginPath();
            this.ctx.arc(this.canvasPosition.onFrameX, this.canvasPosition.onFrameY, this.radius + 0.55, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.globalCompositeOperation = 'source-over';

            this.removeCanvasPosition();
        }
    }

    isOverlapping(other) {
        if (other instanceof MovingCircle) {
            return this.position.distanceTo(other.position) <= this.radius + other.radius;

        } else if (other instanceof MovingRectangle) {
            const nearestPoint = new Coordinates().copy(this.position);
            nearestPoint.clampX(other.position.x, other.position.x + other.width);
            nearestPoint.clampY(other.position.y, other.position.y + other.height);

            return this.position.distanceTo(nearestPoint) <= this.radius;

        } else if (other instanceof HTMLCanvasElement) {
            const nearestPoint = new Coordinates().copy(this.position);
            nearestPoint.clampX(0, other.width);
            nearestPoint.clampY(0, other.height);

            return this.position.distanceTo(nearestPoint) <= this.radius;
        
        } else {
            throw new Error(`isOverlapping is not defined when 'other' is instance of class ${other.constructor.name}`);
        }
    }

    isOutOfCanvas() {
        return !this.isOverlapping(this.canvas);
    }
}