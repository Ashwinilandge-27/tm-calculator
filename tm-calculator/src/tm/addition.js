export function generateAdditionSteps(a, b) {
    const steps = [];

    const tape = [...a, "+", ...b];

    let head = 0;
    let state = "q0";

    steps.push({
        step: 0,
        tape: [...tape],
        head,
        state,
        read: tape[head],
        write: tape[head],
        move: "R",
        nextState: "q0",
        description: "Start scanning the first operand."
    });

    let step = 1;

    // Move right until +
    while (head < tape.length && tape[head] !== "+") {
        const read = tape[head];

        head++;

        steps.push({
            step: step++,
            tape: [...tape],
            head,
            state: "q0",
            read,
            write: read,
            move: "R",
            nextState: "q0",
            description: "Read 1 and move right."
        });
    }

    // Remove +
    if (tape[head] === "+") {
        const read = tape[head];

        tape.splice(head, 1);

        steps.push({
            step: step++,
            tape: [...tape],
            head: Math.min(head, tape.length - 1),
            state: "q1",
            read,
            write: "B",
            move: "R",
            nextState: "qAccept",
            description: "Remove the addition separator."
        });
    }

    steps.push({
        step: step++,
        tape: [...tape],
        head: Math.max(0, tape.length - 1),
        state: "qAccept",
        read: tape[tape.length - 1] || "B",
        write: tape[tape.length - 1] || "B",
        move: "S",
        nextState: "qAccept",
        description: "Addition completed. Machine accepted."
    });

    return steps;
}