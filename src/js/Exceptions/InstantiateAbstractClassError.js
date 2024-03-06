export class InstantiateAbstractClassError extends Error{
    constructor(className) {
        super(`Cannot instantiate abstract class \'${className}\'`);

        this.name = this.constructor.name;
    }
}