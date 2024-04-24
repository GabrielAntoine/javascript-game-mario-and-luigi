export class Sprite {
    // Abstract static variables
    static image;
    static durationInterval;
    static sourceCoordinatesList;
    static height;
    static width;

    constructor(canvas, importantDimension, width, height, position) {
        this.lastTime = document.timeline.currentTime;
        this.currentFrame = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.position = position;
        this.expectedWidth = width;
        this.expectedHeight = height;

        if (importantDimension === 'width') {
            this.width = width;
            this.height = this.width * (this.constructor.height / this.constructor.width);
        } else {
            this.height = height;
            this.width = this.height * (this.constructor.width / this.constructor.height);
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
                this.position.onFrameX + (this.expectedWidth - this.width) / 2,
                this.position.onFrameY + (this.expectedHeight - this.height) / 2,
                this.width,
                this.height
            );  
        }
    }
}