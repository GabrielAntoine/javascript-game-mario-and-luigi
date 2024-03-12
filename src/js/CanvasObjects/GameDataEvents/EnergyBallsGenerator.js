import { Random } from "../../Helpers/Random.js";
import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { EnergyBallsPatterns } from "./EnergyBallsPatterns.js";

export class EnergyBallsGenerator {
    constructor(canvas) {
        this.canvas = canvas;
    }

    update() {
        if (EnergyBall.everyInstance.length === 0) {
            const patternName = Random.choose(EnergyBallsPatterns.patterns, EnergyBallsPatterns.patternsProbabilities);
            
            EnergyBallsPatterns[patternName](this.canvas);
        }
    }
}