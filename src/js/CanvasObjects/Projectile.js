import { MovingCircle } from "./MovingCircle.js";

export class Projectile extends MovingCircle {
    static everyInstance = [];

    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity);

        this.type = type;
        this.shouldBeDestroyed = false;

        Projectile.everyInstance.push(this);
    }

    isOutOfCanvas() {
        return this.position.x + this.radius < 0
            || this.position.x - this.radius > this.canvas.width
            || this.position.y + this.radius < 0
            || this.position.y - this.radius > this.canvas.height;
    }

    allowDestruction() {
        if (this.isCurrentlyDrawn()) {
            this.shouldBeDestroyed = true;
        } else {
            this.destroy();
        }
    }

    destroy() {
        const indexOfThis = Projectile.everyInstance.indexOf(this);

        if (indexOfThis !== -1)
            Projectile.everyInstance.splice(indexOfThis, 1);
    }

    clear() {
        super.clear();

        if (this.shouldBeDestroyed) {
            this.destroy();
        }
    }

    update() {
        if (this.isOutOfCanvas()) {
            // This line is necessary only if the canvas is not totally cleared every frame
            //this.allowDestruction();
            // Otherwise, this line is necessary
            this.destroy();
        } else {
            this.position.y -= this.dynamicVelocity;
        }
    }
}