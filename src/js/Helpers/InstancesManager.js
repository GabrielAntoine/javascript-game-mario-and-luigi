export class InstancesManager {
    static #classes = new Map();

    static push(instance) {
        if (!this.#classes.has(instance.constructor)) {
          this.#classes.set(instance.constructor, []);
        }

        const classesArray = this.#classes.get(instance.constructor);

        if (!classesArray.includes(instance)) {
            classesArray.push(instance);
        }
      }

    static delete(instance) {
        const classesArray = this.#classes.get(instance.constructor);

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