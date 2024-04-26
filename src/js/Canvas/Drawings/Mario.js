import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { SpriteMario } from "../Sprites/SpriteMario.js";
import { SpriteMarioHit } from "../Sprites/SpriteMarioHit.js";
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

        this.sprite = new SpriteMario(this.canvas, {height: this.height}, this.position, {type: 'centered', width: this.width});
        this.spriteWhenInvincible = new SpriteMarioHit(this.canvas, {height: this.height}, this.position, {type: 'centered', width: this.width});
    }

    draw() {
        if (settings.hitBox.show) {
            this.ctx.strokeStyle = settings.hitBox.color;
            this.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }

        if (PlayableCharacter.areInvicible) {
            this.spriteWhenInvincible.draw();
        } else {
            this.sprite.draw();
        }
    }
}