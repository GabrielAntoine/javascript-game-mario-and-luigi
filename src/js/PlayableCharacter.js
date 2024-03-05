import { KeyboardState } from "./KeyboardState.js";
import { FPS } from "./FPS.js";
import { Coordinates } from "./Coordinates.js";

KeyboardState.start();
FPS.start();

export class PlayableCharacter {
    constructor(canvas, color, position, limit, width, height, pixelsPerSecond) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvasPosition = new Coordinates();
        this.position = position;
        this.limit = limit;
        this.color = color;
        this.velocity = pixelsPerSecond;
    }

    clear() {
        if (this.canvasPosition.x !== null && this.canvasPosition.y !== null) {
            this.ctx.clearRect(this.canvasPosition.onFrameX, this.canvasPosition.onFrameY, this.width, this.height);
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.onFrameX, this.position.onFrameY, this.width, this.height);
        this.canvasPosition.x = this.position.x;
        this.canvasPosition.y = this.position.y;
    }

    goLeft() {
        this.position.x -= FPS.PerFrametoPerSecond(this.velocity);
        this.position.x = Math.max(this.position.x, this.limit.left);
    }

    goRight() {
        this.position.x += FPS.PerFrametoPerSecond(this.velocity);
        this.position.x = Math.min(this.position.x, this.limit.right - this.width);
    }

    update() {
        const isArrowLeftPressed = KeyboardState.getKeyState('ArrowLeft');
        const isArrowRightPressed = KeyboardState.getKeyState('ArrowRight');

        if (isArrowLeftPressed && isArrowRightPressed) {
            return;
        }

        if (isArrowLeftPressed) {
            this.goLeft();
        } else if (isArrowRightPressed) {
            this.goRight();
        }
    }
}