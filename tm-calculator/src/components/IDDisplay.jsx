function IDDisplay({
    step,
    state,
    read,
    write,
    move,
    nextState,
    description
}) {
    return (
        <section className="card">

            <h2>Instantaneous Description</h2>

            <div className="id-grid">

                <div>
                    <strong>Step</strong>
                    <span>{step}</span>
                </div>

                <div>
                    <strong>Current State</strong>
                    <span>{state}</span>
                </div>

                <div>
                    <strong>Read</strong>
                    <span>{read}</span>
                </div>

                <div>
                    <strong>Write</strong>
                    <span>{write}</span>
                </div>

                <div>
                    <strong>Move</strong>
                    <span>{move}</span>
                </div>

                <div>
                    <strong>Next State</strong>
                    <span>{nextState}</span>
                </div>

            </div>

            <div className="description">
                <strong>Transition:</strong>{" "}
                {description}
            </div>

        </section>
    );
}

export default IDDisplay;