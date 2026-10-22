export class TMEngine {
    constructor(steps = []) {
        this.steps = steps;
        this.currentStep = 0;
    }

    reset() {
        this.currentStep = 0;
    }

    hasNext() {
        return this.currentStep < this.steps.length - 1;
    }

    next() {
        if (this.hasNext()) {
            this.currentStep++;
        }

        return this.getCurrent();
    }

    previous() {
        if (this.currentStep > 0) {
            this.currentStep--;
        }

        return this.getCurrent();
    }

    getCurrent() {
        return this.steps[this.currentStep];
    }

    getAllSteps() {
        return this.steps;
    }
}