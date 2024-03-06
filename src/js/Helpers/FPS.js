export class FPS {
    static count = null;
    static #animationHandle = null;

    static start() {
        if (FPS.#animationHandle !== null) {
            return false;
        }

        FPS.count = 144; // default value not to have null right away

        function calculateFPS(lastFrameTime) {
            const currentTime = performance.now();
            const timeBetweenFrames = currentTime - lastFrameTime;
    
            FPS.count = (1 / timeBetweenFrames) * 1000;
    
            FPS.#animationHandle = requestAnimationFrame(() => calculateFPS(currentTime));
        }

        FPS.#animationHandle = requestAnimationFrame(() => calculateFPS(performance.now()));

        return true;
    }

    static stop() {
        if (FPS.#animationHandle === null) {
            return false;
        }
    
        cancelAnimationFrame(FPS.#animationHandle);
        FPS.#animationHandle = null;
        FPS.count = null;

        return true;
    }

    static PerFrametoPerSecond(perFrameRate) {
        if (FPS.count === null) {
            throw new Error('Cannot convert if frame\'s count is unknown');
        }

        return perFrameRate / FPS.count;
    }
}