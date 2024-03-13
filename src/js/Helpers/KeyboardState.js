export class KeyboardState {
    static #keyboard = null;
    
    static start() {
        if (this.#keyboard !== null) {
            return false;
        }

        this.#keyboard = {};

        window.addEventListener('keydown', (event) => {
            if (!event.repeat) {
                this.#keyboard[event.code] = true;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            if (!event.repeat) {
                this.#keyboard[event.code] = false;
            }
        });

        window.addEventListener('blur', () => {
            for (const key in this.#keyboard) {
                this.#keyboard[key] = false;
            }
        });

        return true;
    }

    static getKeyState(key) {
        return this.#keyboard[key] ?? false;
    }

    static getKeysStateOR(keys) {
        for (const key of keys) {
            if (this.getKeyState(key)) {
                return true;
            }
        }

        return false;
    }

    static getKeysStateAND(keys) {
        for (const key of keys) {
            if (!this.getKeyState(key)) {
                return false;
            }
        }

        return true;
    }
}