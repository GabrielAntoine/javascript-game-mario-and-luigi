import { NotImplementedError } from "../../Exceptions/NotImplementedError.js";

export class InteractionBetweenTwoObjects {
    static Class1;
    static Class2;

    static update() {
        for (const instanceClass1 of this.Class1.everyInstance) {
            for (const instanceClass2 of this.Class2.everyInstance) {
                if (this.haveToInteract(instanceClass1, instanceClass2)) {
                    this.makeInteract(instanceClass1, instanceClass2);
                }
            }
        }
    }

    static haveToInteract(_instanceClass1, _instanceClass2) {
        throw new NotImplementedError('haveToInteract', this.constructor.name);
    }

    static makeInteract(_instanceClass1, _instanceClass2) {
        throw new NotImplementedError('makeInteract', this.constructor.name);
    }
}