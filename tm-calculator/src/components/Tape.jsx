function Tape({ tape, head }) {
    return (
        <section className="card">

            <h2>Turing Machine Tape</h2>

            <div className="tape">

                {tape.map((symbol, index) => (
                    <div
                        className={
                            index === head
                                ? "tape-cell active"
                                : "tape-cell"
                        }
                        key={index}
                    >
                        {symbol}
                    </div>
                ))}

            </div>

            <div className="head-label">
                {Array(head + 1).join("   ")}↑
            </div>

            <p className="tape-info">
                Head Position: {head}
            </p>

        </section>
    );
}

export default Tape;