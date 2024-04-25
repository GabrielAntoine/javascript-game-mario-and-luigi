import { Coordinates } from "../../Coordinates/Coordinates.js";

export class Sprite {
    // Abstract static variables
    static image;
    static durationInterval;
    static sourceCoordinatesList;
    static height;
    static width;

    constructor(canvas, dimensions, position, shift = new Coordinates(0, 0)) {
        this.lastTime = document.timeline.currentTime;
        this.currentFrame = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.position = position;

        if (dimensions.width !== undefined) {
            this.width = dimensions.width;
            this.height = this.constructor.getHeight(this.width);
        } else {
            this.height = dimensions.height;
            this.width = this.constructor.getWidth(this.height);
        }

        if (shift instanceof Coordinates) {
            this.shift = shift;
        } else if (shift.type === 'centered') {
            this.shift = new Coordinates(
                shift.width === undefined ? 0 : (shift.width - this.width) / 2,
                shift.height === undefined ? 0 : (shift.height - this.height) / 2
            );
        } else if (shift.type === 'circle-centered') {
            this.shift = new Coordinates(
                - this.width / 2,
                - this.height / 2
            );
        }
    }

    draw() {
        if (document.timeline.currentTime - this.lastTime > this.constructor.durationInterval * 1000) {
            this.currentFrame = (this.currentFrame + 1) % this.constructor.sourceCoordinatesList.length;
            this.lastTime = document.timeline.currentTime;
        }

        if(this.constructor.image.complete) {
            this.ctx.drawImage(
                this.constructor.image,
                this.constructor.sourceCoordinatesList[this.currentFrame].onFrameX,
                this.constructor.sourceCoordinatesList[this.currentFrame].onFrameY,
                this.constructor.width,
                this.constructor.height,
                this.position.onFrameX + this.shift.onFrameX,
                this.position.onFrameY + this.shift.onFrameY,
                this.width,
                this.height
            );  
        }
    }

    static getWidth(height) {
        return height * this.width / this.height;
    }

    static getHeight(width) {
        return width * this.height / this.width;
    }
}