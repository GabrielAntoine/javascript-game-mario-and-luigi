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

    distanceTo(other) {
        return Math.sqrt(
            (this.x - other.x) ** 2 + (this.y - other.y) ** 2
        );
    }

    directionTo(other) {
        let angle =  Math.acos(
            (other.x - this.x) / Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2)
        )

        if (other.y > this.y) {
            angle = 2 * Math.PI - angle;
        }
        
        return angle;
    }

    pointTo (distance, direction, isDirectionTowardsThis) {
        if (distance === 0) {
            return new Coordinates().copy(this);
        }

        if (isDirectionTowardsThis) {
            direction += Math.PI;
        }

        return new Coordinates(
            this.x +  Math.cos(direction) * distance,
            this.y + -Math.sin(direction) * distance
        );
    }
}