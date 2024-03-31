import { Coordinates } from "../../Coordinates/Coordinates.js";
import { NotImplementedError } from "../../Exceptions/NotImplementedError.js";
import { InstantiateAbstractClassError } from "../../Exceptions/InstantiateAbstractClassError.js";
import { MouseState } from "../../Helpers/MouseState.js";

export class BaseElement {
    constructor(canvas) {
        if (new.target === BaseElement)
            throw new InstantiateAbstractClassError(this.constructor.name);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvasPosition = new Coordinates();
    }

    get mouseX() {
        return MouseState.x === null ? null : MouseState.x - this.canvas.getBoundingClientRect().x;
    }

    get mouseY() {
        return MouseState.y === null ? null : MouseState.y - this.canvas.getBoundingClientRect().y;
    }

    draw() {
        throw new NotImplementedError('draw', this.constructor.name);
    }

    clear() {
        throw new NotImplementedError('clear', this.constructor.name);
    }

    isCurrentlyDrawn() {
        return this.canvasPosition.x !== null && this.canvasPosition.y !== null;
    }

    removeCanvasPosition() {
        this.canvasPosition.x = null;
        this.canvasPosition.y = null;
    }
}