import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteEnergyBallLuigi extends Sprite {
    static image;
    static durationInterval = settings.sprites.energyBall.luigi.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.energyBall.luigi.height;
    static width = settings.sprites.energyBall.luigi.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.energyBall.luigi.img;

        const source = settings.sprites.energyBall.luigi.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}