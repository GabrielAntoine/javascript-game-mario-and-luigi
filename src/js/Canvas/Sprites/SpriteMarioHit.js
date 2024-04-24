import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteMarioHit extends Sprite {
    static image;
    static durationInterval = settings.sprites.marioHit.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.marioHit.height;
    static width = settings.sprites.marioHit.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.marioHit.img;

        const source = settings.sprites.marioHit.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}