import { EnergyBall } from "../Drawings/EnergyBall.js";
import { PlayableCharacter } from "../Drawings/PlayableCharacter.js";
import { Projectile } from "../Drawings/Projectile.js";
import { EnergyBallsGenerator } from "../DrawingsGenerators/EnergyBallsGenerator.js";

export class UpdatableObjects {
    static #layers = [
        Projectile,
        EnergyBall,
        PlayableCharacter,
        EnergyBallsGenerator
    ];

    static update() {
        this.#layers.forEach(layer => {
            layer.instances.forEach(instance => {
                instance.update();
            });
        });
    }
}