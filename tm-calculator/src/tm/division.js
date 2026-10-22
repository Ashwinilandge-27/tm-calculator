export function generateDivisionSteps(a, b) {
    const steps = [];

    const dividend = a.length;
    const divisor = b.length;

    let step = 0;

    const tape = [...a, "/", ...b];

    steps.push({
        step: step++,
        tape: [...tape],
        head: 0,
        state: "q0",
        read: tape[0],
        write: tape[0],
        move: "R",
        nextState: "q0",
        description: "Start division."
    });

    if (divisor === 0) {
        steps.push({
            step: step++,
            tape: [...tape],
            head: 0,
            state: "qReject",
            read: tape[0],
            write: tape[0],
            move: "S",
            nextState: "qReject",
            description: "Division by zero."
        });

        return steps;
    }

    if (dividend % divisor !== 0) {
        steps.push({
            step: step++,
            tape: [...tape],
            head: 0,
            state: "qReject",
            read: tape[0],
            write: tape[0],
            move: "S",
            nextState: "qReject",
            description: "Only exact division is supported."
        });

        return steps;
    }

    let remaining = dividend;
    let quotient = "";

    while (remaining >= divisor) {
        remaining -= divisor;

        quotient += "1";

        steps.push({
            step: step++,
            tape: [...quotient],
            head: quotient.length - 1,
            state: "qDivide",
            read: "1",
            write: "1",
            move: "R",
            nextState: "qDivide",
            description:
                `Subtract divisor. Remaining unary value: ${"1".repeat(
                    remaining
                ) || "0"}`
        });
    }

    steps.push({
        step: step++,
        tape: [...quotient],
        head: Math.max(0, quotient.length - 1),
        state: "qAccept",
        read: quotient[quotient.length - 1] || "B",
        write: quotient[quotient.length - 1] || "B",
        move: "S",
        nextState: "qAccept",
        description: "Division completed."
    });

    return steps;
}