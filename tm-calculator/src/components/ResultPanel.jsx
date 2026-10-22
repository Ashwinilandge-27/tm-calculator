function ResultPanel({
    unaryResult,
    decimalResult
}) {
    return (
        <section className="result-card">

            <h2>TM Accepted</h2>

            <div className="result">

                <p>
                    <strong>Unary Result:</strong>
                </p>

                <div className="unary-result">
                    {unaryResult || "0"}
                </div>

                <p>
                    <strong>Decimal Result:</strong>{" "}
                    {decimalResult}
                </p>

                <p className="accepted">
                    Machine halted in qAccept
                </p>

            </div>

        </section>
    );
}

export default ResultPanel;