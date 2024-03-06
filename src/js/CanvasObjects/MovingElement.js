import { NotImplementedError } from "../Exceptions/NotImplementedError.js";
import { InstantiateAbstractClassError } from "../Exceptions/InstantiateAbstractClassError.js";
import { BaseElement } from "./BaseElement.js";
import { FPS } from "../Helpers/FPS.js";

FPS.start();

export class MovingElement extends BaseElement {
    constructor(canvas, position, velocity) {
        if (new.target === MovingElement)
            throw new InstantiateAbstractClassError(this.constructor.name);

        super(canvas);

        this.position = position;
        this.staticVelocity = velocity;
    }

    get velocity() {
        return FPS.PerFrametoPerSecond(this.staticVelocity);
    }

    update() {
        throw new NotImplementedError('update', this.constructor.name);
    }

    refreshCanvasPosition() {
        this.canvasPosition.x = this.position.x;
        this.canvasPosition.y = this.position.y;
    }
}