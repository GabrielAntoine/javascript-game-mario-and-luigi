import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteMario extends Sprite {
    static image;
    static durationInterval = settings.sprites.mario.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.mario.height;
    static width = settings.sprites.mario.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.mario.img;

        const source = settings.sprites.mario.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}