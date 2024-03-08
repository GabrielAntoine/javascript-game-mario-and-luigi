import { Coordinates } from "../Coordinates/Coordinates.js";

export class MotionsPattern {
    constructor(motions) {
        this.motions = [...motions];
        this.currentMotionIndex = 0;
        this.initialRelativePosition = new Coordinates(0, 0);
        this.relativePosition = new Coordinates().copy(this.initialRelativePosition);
    }

    get currentMotion() {
        return this.motions[this.currentMotionIndex];
    }

    get hasReachedEnd() {
        return this.currentMotionIndex >= this.motions.length;
    }

    move() {
        
        let overflowTravelledDistance = null;
        
        do {
            if (this.hasReachedEnd) {
                return;
            }

            overflowTravelledDistance = this.currentMotion.move(overflowTravelledDistance);
            this.currentMotion.mergePositions(this.initialRelativePosition, this.relativePosition);
    
            if (this.currentMotion.hasReachedEnd) {
                this.currentMotionIndex++;
                this.initialRelativePosition.copy(this.relativePosition);
            }
        } while (overflowTravelledDistance > 0);
    }

    mergePositions(initialPosition, outPosition) {
        outPosition.x = initialPosition.x + this.relativePosition.x;
        outPosition.y = initialPosition.y + this.relativePosition.y;
    }
}