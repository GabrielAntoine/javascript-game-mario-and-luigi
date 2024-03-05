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

    distanceTo(other) {
        return Math.sqrt(
            (this.x - other.x) ** 2 + (this.y - other.y) ** 2
        );
    }
}