import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";

export class Background {
    static image;
    static sourceCoordinates;
    static height;
    static width;

    static {
        this.image = new Image();
        this.image.src = settings.sprites.background.img;
        this.height = settings.sprites.background.height;
        this.width = settings.sprites.background.width;
        this.sourceCoordinates = new Coordinates(
            settings.sprites.background.source.x,
            settings.sprites.background.source.y
        );

        this.image.addEventListener('load', () => {
            this.draw();
        });
    }

    static draw() {
        if(this.image.complete) {
            settings.canvas.ctx.drawImage(
                this.image,
                this.sourceCoordinates.onFrameX,
                this.sourceCoordinates.onFrameY,
                this.width,
                this.height,
                0,
                0,
                settings.canvas.width,
                settings.canvas.height
            );  
        }
    }
}