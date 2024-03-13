import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { PlayableCharacter } from "../ElementsOnCanvas/PlayableCharacter.js";

export class InteractionPlayableCharacterEnergyBalls {
    static fails = 0;

    static update() {
        for (const playableCharacter of PlayableCharacter.everyInstance) {
            if (playableCharacter.isInvincible) {
                continue;
            }

            for (const energyBall of EnergyBall.everyInstance) {
                if (energyBall.shouldBeDestroyed) {
                    continue;
                }

                if (this.haveToInteract(playableCharacter, energyBall)) {
                    this.makeInteract(playableCharacter, energyBall);
                }
            }
        }
    }

    static haveToInteract(playableCharacter, energyBall) {
        return energyBall.isOverlapping(playableCharacter) && !energyBall.isOutOfCanvas();
    }

    static makeInteract(playableCharacter, energyBall) {
        this.fails++;

        playableCharacter.hasGetHit();
    }
}