export class FPS {
    static count = null;
    static #animationHandle = null;
    static #lastFrameTime = null;

    static get frameInterval() {
        if (FPS.count == null) {
            throw new Error('Cannot get frameInterval since frame count is unknown. Did you execute FPS.start() ?');
        }

        return 1 / FPS.count;
    }

    static start() {
        if (this.#animationHandle !== null) {
            return false;
        }

        this.count = 144; // default value not to have null right away

        const calculateFPS = currentFrameTime => {
            if (this.#lastFrameTime !== null) {
                this.count = 1000 / (currentFrameTime - this.#lastFrameTime);
            }

            this.#lastFrameTime = currentFrameTime;
            this.#animationHandle = requestAnimationFrame(calculateFPS);
        }

        this.#animationHandle = requestAnimationFrame(calculateFPS);

        return true;
    }

    static stop() {
        if (this.#animationHandle === null) {
            return false;
        }
    
        cancelAnimationFrame(this.#animationHandle);
        this.#animationHandle = null;
        this.count = null;
        this.#lastFrameTime = null;

        return true;
    }

    static perSecondToPerFrame(perSecondRate) {
        if (this.count === null) {
            throw new Error('Cannot convert if frame\'s count is unknown');
        }

        return perSecondRate / this.count;
    }
}