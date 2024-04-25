import { Coordinates } from "../../Coordinates/Coordinates.js";
import { settings } from "../../settings.js";
import { SpriteLuigi } from "../Sprites/SpriteLuigi.js";
import { SpriteLuigiHit } from "../Sprites/SpriteLuigiHit.js";
import { PlayableCharacter } from "./PlayableCharacter.js";

export class Luigi extends PlayableCharacter {
    constructor() {
        super(
            settings.canvas.HTMLElement,
            settings.character.luigi.color,
            new Coordinates(settings.character.luigi.x, settings.character.luigi.y),
            {left: settings.character.luigi.limit.left, right: settings.character.luigi.limit.right},
            settings.character.luigi.width,
            settings.character.luigi.height,
            settings.character.luigi.velocity,
            settings.character.keys.left,
            settings.character.keys.right,
            {
                type: settings.projectile.luigi.type,
                radius: settings.projectile.luigi.radius,
                velocity: settings.projectile.luigi.velocity,
                shootingKeys: settings.projectile.luigi.shootingKeys,
                timeBetweenProjectiles: settings.projectile.luigi.timeBetweenProjectiles,
                color: settings.projectile.luigi.color
            }
        );

        this.sprite = new SpriteLuigi(this.canvas, {height: this.height}, this.position);
        this.spriteWhenInvincible = new SpriteLuigiHit(
            this.canvas,
            {height: this.height},
            this.position,
            {type: 'centered', width: this.width}
        );
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