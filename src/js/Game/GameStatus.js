import { settings } from "../settings.js";

export class GameStatus {
    static score = 0;
    static fails = 0;
    static animationFrameId = null;

    static increaseScore(points) {
        this.score += points;
    }

    static addFail() {
        this.fails++;
    }

    static get hasEnded() {
        return this.fails >= settings.maxFails;
    }

    static get isBeingAnimated() {
        return this.animationFrameId !== null;
    }

    static requestAnimationFrame(callback) {
        this.animationFrameId = requestAnimationFrame(callback);
    }

    static cancelAnimationFrame() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}