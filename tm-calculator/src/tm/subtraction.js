export function generateSubtractionSteps(a, b) {
    const steps = [];

    const left = [...a];
    const right = [...b];

    const tape = [...left, "-", ...right];

    let step = 0;

    steps.push({
        step: step++,
        tape: [...tape],
        head: 0,
        state: "q0",
        read: tape[0],
        write: tape[0],
        move: "R",
        nextState: "q0",
        description: "Start subtraction."
    });

    if (a.length < b.length) {
        steps.push({
            step: step++,
            tape: [...tape],
            head: 0,
            state: "qReject",
            read: tape[0],
            write: tape[0],
            move: "S",
            nextState: "qReject",
            description: "Negative unary result is not supported."
        });

        return steps;
    }

    let remainingLeft = a.length;
    let remainingRight = b.length;

    while (remainingRight > 0) {
        // Find an unused 1 on left
        let leftIndex = tape.findIndex(
            (symbol, index) => symbol === "1" && index < a.length
        );

        // Find an unused 1 on right
        let rightIndex = tape.findIndex(
            (symbol, index) => symbol === "1" && index > a.length
        );

        if (leftIndex === -1 || rightIndex === -1) {
            break;
        }

        tape[leftIndex] = "X";

        steps.push({
            step: step++,
            tape: [...tape],
            head: leftIndex,
            state: "q1",
            read: "1",
            write: "X",
            move: "R",
            nextState: "q2",
            description: "Mark one 1 from the minuend."
        });

        tape[rightIndex] = "X";

        steps.push({
            step: step++,
            tape: [...tape],
            head: rightIndex,
            state: "q2",
            read: "1",
            write: "X",
            move: "L",
            nextState: "q1",
            description: "Mark one 1 from the subtrahend."
        });

        remainingRight--;
    }

    // Remove separator and processed X symbols
    const result = tape
        .filter(symbol => symbol === "1")
        .join("");

    steps.push({
        step: step++,
        tape: [...result],
        head: Math.max(0, result.length - 1),
        state: "qAccept",
        read: result[result.length - 1] || "B",
        write: result[result.length - 1] || "B",
        move: "S",
        nextState: "qAccept",
        description: "Subtraction completed."
    });

    return steps;
}