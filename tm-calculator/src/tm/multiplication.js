export function generateMultiplicationSteps(a, b) {
    const steps = [];

    const x = a.length;
    const y = b.length;

    let result = "";

    let step = 0;

    const initialTape = [...a, "*", ...b];

    steps.push({
        step: step++,
        tape: [...initialTape],
        head: 0,
        state: "q0",
        read: initialTape[0],
        write: initialTape[0],
        move: "R",
        nextState: "q0",
        description: "Start multiplication."
    });

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            result += "1";

            steps.push({
                step: step++,
                tape: [...result],
                head: result.length - 1,
                state: "qMultiply",
                read: "B",
                write: "1",
                move: "R",
                nextState: "qMultiply",
                description:
                    `Copy 1 for repetition ${i + 1} of the second operand.`
            });
        }
    }

    steps.push({
        step: step++,
        tape: [...result],
        head: Math.max(0, result.length - 1),
        state: "qAccept",
        read: result[result.length - 1],
        write: result[result.length - 1],
        move: "S",
        nextState: "qAccept",
        description: "Multiplication completed."
    });

    return steps;
}