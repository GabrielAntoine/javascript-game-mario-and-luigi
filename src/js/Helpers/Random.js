export class Random {
    static randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomBoolean() {
        return Math.random() < 0.5;
    }

    static choose(values, probabilities = new Array(values.length).fill(1)) {
        const sumOfProbabilities = probabilities.reduce((accumulator, currentValue) => accumulator + currentValue);
        const randomPercentage = Math.random();

        let cumulativeProbabilites = 0;

        for (const [i, probability] of probabilities.entries()) {
            cumulativeProbabilites += probability;

            if (cumulativeProbabilites / sumOfProbabilities > randomPercentage) {
                return values[i];
            }
        }

        return values[values.length - 1];
    }
}