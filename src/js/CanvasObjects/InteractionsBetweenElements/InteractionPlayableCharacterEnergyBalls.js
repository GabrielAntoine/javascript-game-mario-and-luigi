import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { PlayableCharacter } from "../ElementsOnCanvas/PlayableCharacter.js";
import { InteractionBetweenTwoObjects } from "./InteractionBetweenTwoObjects.js";

export class InteractionPlayableCharacterEnergyBalls extends InteractionBetweenTwoObjects{
    static fails = 0;

    static {
        this.Class1 = PlayableCharacter;
        this.Class2 = EnergyBall;
    }

    static haveToInteract(playableCharacter, energyBall) {
        return !PlayableCharacter.areInvicible && !energyBall.shouldBeDestroyed && energyBall.isOverlapping(playableCharacter) && !energyBall.isOutOfCanvas();
    }

    static makeInteract(playableCharacter) {
        this.fails++;

        playableCharacter.hasGetHit();
    }
}