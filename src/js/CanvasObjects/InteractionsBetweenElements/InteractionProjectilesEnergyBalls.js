import { config } from "../../config.js";
import { EnergyBall } from "../ElementsOnCanvas/EnergyBall.js";
import { Projectile } from "../ElementsOnCanvas/Projectile.js";

export class InteractionProjectilesEnergyBalls {
    static score = 0;

    static update() {
        for (const projectile of Projectile.everyInstance) {
            if (projectile.shouldBeDestroyed) {
                continue;
            }

            for (const energyBall of EnergyBall.everyInstance) {
                if (energyBall.shouldBeDestroyed) {
                    continue;
                }

                if (this.haveToInteract(projectile, energyBall)) {
                    this.makeInteract(projectile, energyBall);
                }
            }
        }
    }

    static haveToInteract(projectile, energyBall) {
        return projectile.isOverlapping(energyBall) && !energyBall.isOutOfCanvas();
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