export class InstancesManager {
    static #classes = new Map();

    static push(classObject, instance) {
        if (!this.#classes.has(classObject)) {
          this.#classes.set(classObject, []);
        }
        this.#classes.get(classObject).push(instance);
      }

    static delete(classObject, instance) {
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