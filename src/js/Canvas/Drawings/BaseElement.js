import { Coordinates } from "../../Coordinates/Coordinates.js";
import { NotImplementedError } from "../../Exceptions/NotImplementedError.js";
import { InstantiateAbstractClassError } from "../../Exceptions/InstantiateAbstractClassError.js";

export class BaseElement {
    constructor(canvas) {
        if (new.target === BaseElement)
            throw new InstantiateAbstractClassError(this.constructor.name);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvasPosition = new Coordinates();
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