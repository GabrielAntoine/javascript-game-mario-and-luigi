import { NotImplementedError } from "../../Exceptions/NotImplementedError.js";
import { InstantiateAbstractClassError } from "../../Exceptions/InstantiateAbstractClassError.js";
import { BaseElement } from "./BaseElement.js";
import { FPS } from "../../Helpers/FPS.js";
import { Coordinates } from "../../Coordinates/Coordinates.js";

FPS.start();

export class MovingElement extends BaseElement {
    constructor(canvas, position, velocity) {
        if (new.target === MovingElement)
            throw new InstantiateAbstractClassError(this.constructor.name);

        super(canvas);

        this.position = position;
        this.initialPosition = new Coordinates(position.x, position.y);
        this.staticVelocity = velocity;
    }

    get dynamicVelocity() {
        return FPS.perSecondToPerFrame(this.staticVelocity);
    }

    update() {
        throw new NotImplementedError('update', this.constructor.name);
    }

    refreshCanvasPosition() {
        this.canvasPosition.x = this.position.x;
        this.canvasPosition.y = this.position.y;
    }
}