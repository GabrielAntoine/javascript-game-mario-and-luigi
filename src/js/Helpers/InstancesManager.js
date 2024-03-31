export class InstancesManager {
    static #classes = new Map();

    static push(instance) {
        let baseClass = Object.getPrototypeOf(instance);

        while (baseClass !== null) {
            this.#pushForOneClassOnly(instance, baseClass.constructor);
            baseClass = Object.getPrototypeOf(baseClass);
        }
    }

    static #pushForOneClassOnly(instance, classObject) {
        if (!this.#classes.has(classObject)) {
            this.#classes.set(classObject, []);
        }
  
        const classesArray = this.#classes.get(classObject);
  
        if (!classesArray.includes(instance)) {
            classesArray.push(instance);
        }
    }

    static delete(instance) {
        let baseClass = Object.getPrototypeOf(instance);

        while (baseClass !== null) {
            if (this.#deleteForOneClassOnly(instance, baseClass.constructor) === false) {
                return false;
            }
            baseClass = Object.getPrototypeOf(baseClass);
        }

        return true;
    }

    static #deleteForOneClassOnly(instance, classObject) {
        const classesArray = this.#classes.get(classObject);

        if (classesArray === undefined) {
            return false;
        }

        const instanceIndex = classesArray.indexOf(instance);

        if (instanceIndex === -1) {
            return false;
        }

        classesArray.splice(instanceIndex, 1);

        return true;
    }

    static getInstances(classObject) {
        return [...this.#classes.get(classObject) ?? []];
    }

    static forEach(callback, classObject = null) {
        if (classObject) {
            this.getInstances(classObject).forEach(callback);
        } else {
            this.#classes.forEach(classesArray => {
                classesArray.forEach(callback);
            });
        }
    }
} 