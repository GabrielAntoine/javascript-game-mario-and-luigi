import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { Random } from "../../Helpers/Random.js";
import { settings } from "../../settings.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";
import { InlineWaitPattern } from "./InlineWaitPattern.js";
import { NodePattern } from "./NodePattern.js";
import { RainPattern } from "./RainPattern.js";
import { StairsPattern } from "./StairsPatttern.js";
import { StrongEnergyBallPattern } from "./StrongEnergyBallPattern.js";

export class EnergyBallsGenerator {
    static patterns = new Map([
        [NodePattern, settings.probabilities.nodePattern],
        [InlineWaitPattern, settings.probabilities.inlineWaitPattern],
        [StrongEnergyBallPattern, settings.probabilities.strongEnergyBallPattern],
        [StairsPattern, settings.probabilities.stairsPattern],
        [RainPattern, settings.probabilities.rainPattern]
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