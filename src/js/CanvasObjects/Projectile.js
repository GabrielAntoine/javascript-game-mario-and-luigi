import { GamesBall } from "./GamesBall.js";

export class Projectile extends GamesBall {
    constructor(canvas, color, position, radius, velocity, type) {
        super(canvas, color, position, radius, velocity, type);
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