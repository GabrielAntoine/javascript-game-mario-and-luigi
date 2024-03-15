export class FPS {
    static count = 144;
    static #animationHandle = null;
    static #lastFrameTime = null;

    static get frameInterval() {
        return 1 / FPS.count;
    }

    static start() {
        if (this.#animationHandle !== null) {
            return false;
        }

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
        return perSecondRate / this.count;
    }
}