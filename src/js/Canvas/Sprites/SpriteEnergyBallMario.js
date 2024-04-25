import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteEnergyBallMario extends Sprite {
    static image;
    static durationInterval = settings.sprites.energyBall.mario.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.energyBall.mario.height;
    static width = settings.sprites.energyBall.mario.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.energyBall.mario.img;

        const source = settings.sprites.energyBall.mario.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}