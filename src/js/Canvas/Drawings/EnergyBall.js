import { Coordinates } from "../../Coordinates/Coordinates.js";
import { GameStatus } from "../../Game/GameStatus.js";
import { CompoundMotion } from "../../Motions/CompoundMotion.js";
import { LinearMotion } from "../../Motions/LinearMotion.js";
import { settings } from "../../settings.js";
import { GamesBall } from "./GamesBall.js";
import { PlayableCharacter } from "./PlayableCharacter.js";

export class EnergyBall extends GamesBall {
    #compoundMotion;
    #health;

    constructor(canvas, color, position, radius, type, health, scoreEarned, compoundMotion, delay) {
        super(canvas, color, position, radius, 0, type); // EnergyBalls don't have velocity because it's included in compoundMotion

        this.#compoundMotion = compoundMotion;
        this.delay = delay;
        this.#health = health;
        this.hasBecomeAggresive = false;
        this.scoreEarned = scoreEarned;
    }

    decreaseHealth() {
        this.#health -= 1;

        if (this.#health <= 0) {
            this.startDestruction();
        }
    }

    update() {
        if (this.#compoundMotion.hasReachedEnd && this.delay === null) {
            this.destroy();
        } else {
            this.checkAllCollisions();
            this.delay = this.#compoundMotion.moveTogether(this.initialPosition, this.position, this.delay);
        }
    }

    becomeAggressive() {
        if (this.hasBecomeAggresive) {
            return;
        }

        this.hasBecomeAggresive = true;

        this.setCompoundMotion(new CompoundMotion([
            new LinearMotion(settings.gameArea.height - this.position.y + 1, settings.energyBall.aggressiveVelocity, - Math.PI / 2)
        ]));
    }

    startDestruction() {
        if (this.shouldBeDestroyed) {
            return;
        }

        this.shouldBeDestroyed = true;

        const finalPosition = new Coordinates(settings.gameArea.width / 2, settings.energyBall.initialY);

        this.setCompoundMotion(new CompoundMotion([
            new LinearMotion(this.position.distanceTo(finalPosition), settings.energyBall.deadVelocity, this.position.directionTo(finalPosition))
        ]));
    }

    setCompoundMotion(compoundMotion, delay = null) {
        this.initialPosition.copy(this.position);

        this.#compoundMotion = compoundMotion;
        this.delay = delay;
    }

    isCollidingCharacter(playableCharacter) {
        return !PlayableCharacter.areInvicible && !this.shouldBeDestroyed && !this.isOutOfCanvas() && this.isOverlapping(playableCharacter);
    }
    
    hitCharacter(playableCharacter) {
        GameStatus.addFail();
        playableCharacter.hasGetHit();
    }
    
    checkAllCollisions() {
        PlayableCharacter.instances.forEach(playableCharacter => {
            if (this.isCollidingCharacter(playableCharacter)) {
                this.hitCharacter(playableCharacter);
            }
        });
    }
}