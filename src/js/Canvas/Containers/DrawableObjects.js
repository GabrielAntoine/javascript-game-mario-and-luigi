import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";
import { Impact } from "../Drawings/Impact.js";
import { PlayableCharacter } from "../Drawings/PlayableCharacter.js";
import { Projectile } from "../Drawings/Projectile.js";

export class DrawableObjects {
    static #layers = [
        Projectile,
        PlayableCharacter,
        EnergyBall,
        Impact
    ];

    static draw() {
        this.#layers.forEach(layer => {
            layer.instances.forEach(instance => {
                instance.draw();
            });
        });
    }

    static clearObjects() {
        this.#layers.forEach(layer => InstancesManager.clear(layer));
    }
}