import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { Sprite } from "./Sprite.js";

export class SpriteEnergyBallAll extends Sprite {
    static image;
    static durationInterval = settings.sprites.energyBall.all.durationInterval;
    static sourceCoordinatesList = [];
    static height = settings.sprites.energyBall.all.height;
    static width = settings.sprites.energyBall.all.width;

    static {
        this.image = new Image()
        this.image.src = settings.sprites.energyBall.all.img;

        const source = settings.sprites.energyBall.all.source;

        for (const frame of source) {
            this.sourceCoordinatesList.push(
                new Coordinates(frame.x, frame.y)
            );
        }
    }
}