import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteProjectileMario extends Sprite {
    static image;
    static durationInterval = settings.sprites.projectile.mario.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.projectile.mario.height;
    static width = settings.sprites.projectile.mario.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.projectile.mario.img;

        const source = settings.sprites.projectile.mario.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}