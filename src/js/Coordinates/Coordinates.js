export class Coordinates {
    static #origin = new Coordinates(0, 0);

    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
    }

    get onFrameX() {
        return Math.floor(this.x);
    }

    get onFrameY() {
        return Math.floor(this.y);
    }

    static get origin() {
        return Coordinates.#origin;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;

        return this;
    }

    clampX(min, max) {
        this.x = Math.max(min, Math.min(max, this.x));
    }

    clampY(min, max) {
        this.y = Math.max(min, Math.min(max, this.y));
    }

    distanceTo(other) {
        return Math.sqrt(
            (this.x - other.x) ** 2 + (this.y - other.y) ** 2
        );
    }

    // Returns the trigonometric direction or NaN if 'this' is the same coordinates as 'other'
    directionTo(other) {
        let angle =  Math.acos(
            (other.x - this.x) / this.distanceTo(other)
        );

        if (other.y > this.y) {
            angle = 2 * Math.PI - angle;
        }
        
        return angle;
    }

    translated(distance, direction, isDirectionTowardsThis = false) {
        if (distance === 0) {
            direction = 0; // When distance is 0, direction will most likely be NaN or unknown, which would lead to bad calcul. 0 stands for a placeholder in this very specific case
        } else if (isDirectionTowardsThis) {
            direction += Math.PI;
        }

        return new Coordinates(
            this.x +  Math.cos(direction) * distance,
            this.y + -Math.sin(direction) * distance
        );
    }

    translate(distance, direction, isDirectionTowardsThis) {
        return this.copy(this.translated(distance, direction, isDirectionTowardsThis));
    }

    translateX(x) {
        this.x += x;
    }

    translateY(y) {
        this.y += y;
    }

    rotated(center, angle, isClockwise) { 
        return center.translated(
            center.distanceTo(this),
            center.directionTo(this) + angle * (isClockwise ? -1 : 1)
        );
    }

    rotate(center, angle, isClockwise) {
        return this.copy(this.rotated(center, angle, isClockwise));
    }
}