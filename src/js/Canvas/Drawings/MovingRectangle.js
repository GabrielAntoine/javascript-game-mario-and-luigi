import { MovingElement } from "./MovingElement.js";

export class MovingRectangle extends MovingElement {
    constructor(canvas, color, position, width, height, velocity) {
        super(canvas, position, velocity);

        this.width = width;
        this.height = height;
        this.color = color;
    }

    clear() {
        if (this.isCurrentlyDrawn()) {
            this.ctx.clearRect(this.canvasPosition.onFrameX, this.canvasPosition.onFrameY, this.width, this.height);
            this.removeCanvasPosition();
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.onFrameX, this.position.onFrameY, this.width, this.height);

        this.refreshCanvasPosition();
    }
}
