import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteLuigi extends Sprite {
    static image;
    static durationInterval = settings.sprites.luigi.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.luigi.height;
    static width = settings.sprites.luigi.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.luigi.img;

        const source = settings.sprites.luigi.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}