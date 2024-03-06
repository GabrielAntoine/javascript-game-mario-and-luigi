import { MovingElement } from "./MovingElement.js";

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
        return this.position.distanceTo(other.position) <= this.radius + other.radius;
    }
}