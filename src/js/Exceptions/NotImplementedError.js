export class NotImplementedError extends Error {
    constructor(method, className) {
        super(`Method \'${method}\' of class \'${className}\' must be implemented`);
        
        this.name = this.constructor.name;
    }
}