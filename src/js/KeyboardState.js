export class KeyboardState {
    static #keyboard = null;
    
    static start() {
        if (KeyboardState.#keyboard !== null) {
            return false;
        }

        KeyboardState.#keyboard = {};

        window.addEventListener('keydown', (event) => {
            KeyboardState.#keyboard[event.key] = true;
        });
        
        window.addEventListener('keyup', (event) => {
            KeyboardState.#keyboard[event.key] = false;
        });

        window.addEventListener('blur', () => {
            for (const key in KeyboardState.#keyboard) {
                KeyboardState.#keyboard[key] = false;
            }
        });

        return true;
    }

    static getKeyState(key) {
        return KeyboardState.#keyboard[key] ?? false;
    }
}