import { Coordinates } from "../Coordinates/Coordinates.js";
import { FPS } from "../Helpers/FPS.js";

FPS.start();

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

    get elapsedTime() {
        let time = 0;
        for (let i = 0; i <= this.currentMotionIndex; i++) {
            time += this.motions[i].elapsedTime;
        }

        return time;
    }

    createInitialsStateCopy() {
        const motionsCopy = [];

        this.motions.forEach(motion => {
            motionsCopy.push(motion.createInitialsStateCopy());
        });

        return new this.constructor(motionsCopy);
    }

    #getInitialRelativePosition(relativeTimeObject) {
        const initialRelativePosition = new Coordinates().copy(Coordinates.origin);

        for (let i = 0; i < this.currentMotionIndex; i++) {
            if (relativeTimeObject.elapsedTime < this.motions[i].elapsedTime) {
                relativeTimeObject.motionIndex = i;
                return initialRelativePosition;
            } else {
                relativeTimeObject.elapsedTime -= this.motions[i].elapsedTime;
            }

            this.motions[i].mergePositions(initialRelativePosition, initialRelativePosition);
        }

        relativeTimeObject.motionIndex = this.currentMotionIndex;

        return initialRelativePosition;
    }

    #getRelativePosition(relativeTimeObject) {
        const initialRelativePosition = this.#getInitialRelativePosition(relativeTimeObject);
        const relativePosition = new Coordinates();
        const currentMotion = this.motions[relativeTimeObject.motionIndex];

        currentMotion.mergePositions(
            initialRelativePosition,
            relativePosition,
            (currentMotion.elapsedTime - relativeTimeObject.elapsedTime) * currentMotion.staticVelocity
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

    mergePositions(initialPosition, outPosition, delay = 0) {
        delay ??= 0;

        const delayedTimeTravelled = Math.max(this.elapsedTime - delay, 0);
        const relativeTimeObject = {elapsedTime: delayedTimeTravelled, motionIndex: null};

        const relativePosition = this.#getRelativePosition(relativeTimeObject);
        outPosition.set(initialPosition.x + relativePosition.x, initialPosition.y)
        outPosition.x = initialPosition.x + relativePosition.x;
        outPosition.y = initialPosition.y + relativePosition.y;

        if (delay === null || delay === 0) {
            return null;
        }

        if (!this.hasReachedEnd) {
            return delay;
        }

        return Math.max(delay - FPS.frameInterval, 0);
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