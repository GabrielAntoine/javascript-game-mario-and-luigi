export class MouseState {
    static #x;
    static #y;
    static #isPressed = false;

    static {
        window.addEventListener('mousemove', (event) => {
            this.#x = event.clientX;
            this.#y = event.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.#x = null;
            this.#y = null;
        });

        window.addEventListener('mouseup', () => {
            this.#isPressed = false;
        });

        window.addEventListener('mousedown', () => {
            this.#isPressed = true;
        });
    }

    static get x() {
        return this.#x;
    }

    static get y() {
        return this.#y;
    }

    static get isPressed() {
        return this.#isPressed;
    }
}