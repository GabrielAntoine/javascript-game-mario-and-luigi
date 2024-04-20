import { settings } from "../settings.js";
import { Interface } from "./Interface.js";

export class GameStatus {
    static score = 0;
    static fails = 0;
    static animationFrameId = null;

    static increaseScore(points) {
        this.score += points;

        Interface.notifyScoreChanged();
    }

    static addFail() {
        this.fails++;

        Interface.notifyLivesChanged();
    }

    static reset() {
        this.score = 0;
        this.fails = 0;

        Interface.notifyScoreChanged();
        Interface.notifyLivesChanged();
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