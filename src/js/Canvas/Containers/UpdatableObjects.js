import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";
import { Impact } from "../Drawings/Impact.js";
import { PlayableCharacter } from "../Drawings/PlayableCharacter.js";
import { Projectile } from "../Drawings/Projectile.js";
import { EnergyBallsGenerator } from "../EnergyBallsPatterns/EnergyBallsGenerator.js";

export class UpdatableObjects {
    static #layers = [
        Impact,
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

    static clearObjects() {
        this.#layers.forEach(layer => InstancesManager.clear(layer));
    }
}