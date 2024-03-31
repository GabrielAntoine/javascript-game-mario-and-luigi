import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { PlayableCharacter } from "./PlayableCharacter.js";

export class Mario extends PlayableCharacter {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            settings.character.mario.color,
            new Coordinates(settings.character.mario.x, settings.character.mario.y),
            {left: settings.character.mario.limit.left, right: settings.character.mario.limit.right},
            settings.character.mario.width,
            settings.character.mario.height,
            settings.character.mario.velocity,
            settings.character.keys.left,
            settings.character.keys.right,
            {
                type: settings.projectile.mario.type,
                radius: settings.projectile.mario.radius,
                velocity: settings.projectile.mario.velocity,
                shootingKeys: settings.projectile.mario.shootingKeys,
                timeBetweenProjectiles: settings.projectile.mario.timeBetweenProjectiles,
                color: settings.projectile.mario.color
            }
        );
    }
}