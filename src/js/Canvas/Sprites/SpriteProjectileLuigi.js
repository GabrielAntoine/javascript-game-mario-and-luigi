import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteProjectileLuigi extends Sprite {
    static image;
    static durationInterval = settings.sprites.projectile.luigi.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.projectile.luigi.height;
    static width = settings.sprites.projectile.luigi.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.projectile.luigi.img;

        const source = settings.sprites.projectile.luigi.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}