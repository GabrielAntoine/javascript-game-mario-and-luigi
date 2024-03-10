import { Coordinates } from "../Coordinates/Coordinates.js";

export class CompoundMotion {
    #attachedObjects;

    constructor(motions) {
        this.motions = [...motions];
        this.currentMotionIndex = 0;
        this.#attachedObjects = [];
        this.lastFrameTime = null;
    }

    get attachedObjects() {
        return [...this.#attachedObjects];
    }

    get currentMotion() {
        return this.motions[this.currentMotionIndex];
    }

    get hasReachedEnd() {
        return this.currentMotionIndex === this.motions.length - 1 && this.currentMotion.hasReachedEnd; 
    }

    get hasEverybodyReachedEnd() {
        return this.hasReachedEnd && this.#attachedObjects.every(object => object.delay === null);
    }

    get hasStarted() {
        return this.motions[0].hasStarted;
    }

    get travelledDistance() {
        let distance = 0;
        for (let i = 0; i <= this.currentMotionIndex; i++) {
            distance += this.motions[i].travelledDistance;
        }

        return distance;
    }

    createInitialsStateCopy() {
        const motionsCopy = [];

        this.motions.forEach(motion => {
            motionsCopy.push(motion.createInitialsStateCopy());
        });

        return new this.constructor(motionsCopy);
    }

    #getInitialRelativePosition(relativeDistanceObject) {
        const initialRelativePosition = new Coordinates().copy(Coordinates.origin);

        for (let i = 0; i < this.currentMotionIndex; i++) {
            if (relativeDistanceObject.travelledDistance < this.motions[i].travelledDistance) {
                relativeDistanceObject.motionIndex = i;
                return initialRelativePosition;
            } else {
                relativeDistanceObject.travelledDistance -= this.motions[i].travelledDistance;
            }

            this.motions[i].mergePositions(initialRelativePosition, initialRelativePosition);
        }

        relativeDistanceObject.motionIndex = this.currentMotionIndex;

        return initialRelativePosition;
    }

    #getRelativePosition(relativeDistanceObject) {
        const initialRelativePosition = this.#getInitialRelativePosition(relativeDistanceObject);
        const relativePosition = new Coordinates();

        this.motions[relativeDistanceObject.motionIndex].mergePositions(
            initialRelativePosition,
            relativePosition,
            this.motions[relativeDistanceObject.motionIndex].travelledDistance - relativeDistanceObject.travelledDistance
        );

        return relativePosition;
    }

    // move method can only be executed once by frame.
    move() {
        if (this.lastFrameTime === document.timeline.currentTime) {
            return false;
        }
        this.lastFrameTime = document.timeline.currentTime;

        let percentageOfVelocity = 1;

        while (!this.hasReachedEnd && percentageOfVelocity > 0) {
            percentageOfVelocity = this.currentMotion.move(percentageOfVelocity);
            
            if (this.currentMotion.hasReachedEnd && this.currentMotionIndex < this.motions.length - 1) {
                this.currentMotionIndex++;
            }
        }

        this.#attachedObjects.forEach(attachedObject => {
            attachedObject.delay = this.mergePositions(attachedObject.initialPosition, attachedObject.position, attachedObject.delay);
        });

        return true;
    }

    moveTogether(initialPosition, outPosition, delay) {
        this.move();
        delay = this.mergePositions(initialPosition,outPosition, delay);

        return delay;
    }

    // ! Delay should be a time variable instead of a distance to take into account several velocities
    // Currently it doesn't work fine

    mergePositions(initialPosition, outPosition, delay = 0) {
        delay ??= 0;

        const delayedTravelledDistance = Math.max(this.travelledDistance - delay, 0);
        const relativeDistanceObject = {travelledDistance: delayedTravelledDistance, motionIndex: null};

        const relativePosition = this.#getRelativePosition(relativeDistanceObject);
        outPosition.set(initialPosition.x + relativePosition.x, initialPosition.y)
        outPosition.x = initialPosition.x + relativePosition.x;
        outPosition.y = initialPosition.y + relativePosition.y;

        return this.#getNewDelay(delay, relativeDistanceObject.travelledDistance, relativeDistanceObject.motionIndex);
    }

    // This method should only be called if this.hasReachedEnd
    // Otherwise, behavior is unknown
    #getNewDelay(delay, travelledDistance, motionIndex) {
        if (delay === null || delay === 0) {
            return null;
        }

        if (!this.hasReachedEnd) {
            return delay
        }

        let percentageOfVelocity = 1;
        
        while (percentageOfVelocity > 0 && motionIndex < this.motions.length) {
            const remainingDistance = this.motions[motionIndex].travelledDistance - travelledDistance;
            const velocity = this.motions[motionIndex].dynamicVelocity * percentageOfVelocity; 

            if (remainingDistance < velocity) {
                delay -= remainingDistance;
                percentageOfVelocity -= remainingDistance / velocity;
                motionIndex++;
                travelledDistance = 0;                
            } else {
                delay -= velocity;
                percentageOfVelocity = 0;
            }
        }

        // No more delay
        if (motionIndex === this.motions.length) {
            return 0;
        }

        return delay;
    }

    attach(positionReference, initialDelay) {
        if (this.hasStarted) {
            throw new Error('Cannot attach an object to a CompoundPattern if it has already started');
        }

        const attachedObject = {
            initialPosition: new Coordinates().copy(positionReference),
            position: positionReference,
            delay: initialDelay
        };

        this.#attachedObjects.push(attachedObject);
    }

    detach(positionReference) {
        const objectIndex = this.#attachedObjects.findIndex(attachedObject => attachedObject.position === positionReference);

        if (objectIndex !== -1) {
            this.#attachedObjects.splice(objectIndex, 1);
        } else {
            throw new Error('Object to detached was not firstly attached');
        }
    }

    hasAttachedObjectReachedEnd(positionReference) {
        const objectIndex = this.#attachedObjects.findIndex(attachedObject => attachedObject.position === positionReference);

        if (objectIndex !== -1) {
            return this.#attachedObjects[objectIndex].delay === null && this.hasReachedEnd;
        } else {
            throw new Error('Object is not attached');
        }
    }
}