import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteLuigiHit extends Sprite {
    static image;
    static durationInterval = settings.sprites.luigiHit.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.luigiHit.height;
    static width = settings.sprites.luigiHit.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.luigiHit.img;

        const source = settings.sprites.luigiHit.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}