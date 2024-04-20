import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { Random } from "../../Helpers/Random.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";
import { InlineWaitPattern } from "./InlineWaitPattern.js";
import { NodePattern } from "./NodePattern.js";
import { StrongEnergyBallPattern } from "./StrongEnergyBallPattern.js";

export class EnergyBallsGenerator {
    static patterns = new Map([
        [NodePattern, 2],
        [InlineWaitPattern, 2],
        [StrongEnergyBallPattern, 1]
    ]);

    constructor(canvas) {
        this.canvas = canvas;

        InstancesManager.push(this);
    }

    static get instances() {
        return InstancesManager.getInstances(this);
    }

    update() {
        if (EnergyBall.instances.length === 0) {
            const Pattern = Random.choose([...this.constructor.patterns.keys()], [...this.constructor.patterns.values()]);
            const pattern = new Pattern();
            
            pattern.create();
        }
    }
}