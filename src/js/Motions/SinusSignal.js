export class SinusSignal {
    constructor(amplitude, frequency, phaseShift) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phaseShift = phaseShift;
    }
    
    static sin(t, amplitude, frequency, phaseShift) {
        return amplitude * Math.sin(2 * Math.PI * frequency * t + phaseShift);
    }

    get period() {
        return 1 / this.frequency;
    }

    sin(t) {
        return SinusSignal.sin(t, this.amplitude, this.frequency, this.phaseShift);
    }

    copy(other) {
        this.amplitude = other.amplitude;
        this.frequency = other.frequency;
        this.phaseShift = other.phaseShift;

        return this;
    }

}