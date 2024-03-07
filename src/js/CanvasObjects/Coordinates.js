export class Coordinates {
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

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;
    }

    distanceTo(other) {
        return Math.sqrt(
            (this.x - other.x) ** 2 + (this.y - other.y) ** 2
        );
    }

    getPointOnCircle (radius, angle) {
        return new Coordinates(
            this.x +  Math.cos(angle) * radius,
            this.y + -Math.sin(angle) * radius
        );
    }

    getCenterOfCircle (radius, angle) {
        return new Coordinates(
            this.x -  Math.cos(angle) * radius,
            this.y - -Math.sin(angle) * radius
        )
    }
}