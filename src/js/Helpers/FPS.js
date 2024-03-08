export class FPS {
    static count = null;
    static #animationHandle = null;
    static #lastFrameTime = null;

    static start() {
        if (FPS.#animationHandle !== null) {
            return false;
        }

        FPS.count = 144; // default value not to have null right away

        function calculateFPS(currentFrameTime) {
            if (FPS.#lastFrameTime !== null) {
                FPS.count = 1000 / (currentFrameTime - FPS.#lastFrameTime);
            }

            FPS.#lastFrameTime = currentFrameTime;
            FPS.#animationHandle = requestAnimationFrame(calculateFPS);
        }

        FPS.#animationHandle = requestAnimationFrame(calculateFPS);

        return true;
    }

    static stop() {
        if (FPS.#animationHandle === null) {
            return false;
        }
    
        cancelAnimationFrame(FPS.#animationHandle);
        FPS.#animationHandle = null;
        FPS.count = null;
        FPS.#lastFrameTime = null;

        return true;
    }

    static perSecondToPerFrame(perSecondRate) {
        if (FPS.count === null) {
            throw new Error('Cannot convert if frame\'s count is unknown');
        }

        return perSecondRate / FPS.count;
    }
}