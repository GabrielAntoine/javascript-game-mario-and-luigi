import { InstancesManager } from "../../Helpers/InstancesManager.js";
import { Random } from "../../Helpers/Random.js";
import { EnergyBall } from "../Drawings/EnergyBall.js";
import { EnergyBallsPatterns } from "./EnergyBallsPatterns.js";

export class EnergyBallsGenerator {
    constructor(canvas) {
        this.canvas = canvas;

        InstancesManager.push(this);
    }

    static get instances() {
        return InstancesManager.getInstances(this);
    }

    update() {
        if (EnergyBall.instances.length === 0) {
            const patternName = Random.choose(EnergyBallsPatterns.patterns, EnergyBallsPatterns.patternsProbabilities);
            
            EnergyBallsPatterns[patternName](this.canvas);
        }
    }
}