import { EnergyBall } from "../Drawings/EnergyBall.js";
import { PlayableCharacter } from "../Drawings/PlayableCharacter.js";
import { Projectile } from "../Drawings/Projectile.js";

export class DrawableObjects {
    static #layers = [
        Projectile,
        PlayableCharacter,
        EnergyBall
    ];

    static draw() {
        this.#layers.forEach(layer => {
            layer.instances.forEach(instance => {
                instance.draw();
            });
        });
    }
}