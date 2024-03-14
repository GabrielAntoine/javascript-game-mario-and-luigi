import { config } from "../../config.js";
import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { Projectile } from "../ElementsOnCanvas/Projectile.js";
import { InteractionBetweenTwoObjects } from "./InteractionBetweenTwoObjects.js";

export class InteractionProjectilesEnergyBalls extends InteractionBetweenTwoObjects{
    static score = 0;

    static {
        this.Class1 = Projectile;
        this.Class2 = EnergyBall;
    }

    static haveToInteract(projectile, energyBall) {
        return !projectile.shouldBeDestroyed && !energyBall.shouldBeDestroyed && projectile.isOverlapping(energyBall) && !energyBall.isOutOfCanvas();
    }

    static makeInteract(projectile, energyBall) {
        if (projectile.type === energyBall.type || energyBall.type === config.energyBall.all.type) {
            energyBall.decreaseHealth();
            if (energyBall.shouldBeDestroyed) {
                this.score += energyBall.scoreEarned;
            }
        } else {
            energyBall.becomeAggressive();
        }

        projectile.hasHitTarget();
    }
}