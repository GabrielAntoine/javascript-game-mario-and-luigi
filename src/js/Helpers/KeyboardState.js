export class KeyboardState {
    static #keyboard = null;
    
    static start() {
        if (KeyboardState.#keyboard !== null) {
            return false;
        }

        KeyboardState.#keyboard = {};

        window.addEventListener('keydown', (event) => {
            // console.log(event.key, event.keyCode, event.code);
            KeyboardState.#keyboard[event.code] = true;
            console.log(KeyboardState.#keyboard);
        });
        
        window.addEventListener('keyup', (event) => {
            KeyboardState.#keyboard[event.code] = false;
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

    static getKeysStateOR(keys) {
        for (const key of keys) {
            if (KeyboardState.getKeyState(key)) {
                return true;
            }
        }

        return false;
    }

    static getKeysStateAND(keys) {
        for (const key of keys) {
            if (!KeyboardState.getKeyState(key)) {
                return false;
            }
        }

        return true;
    }
}