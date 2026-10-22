function TransitionTable({ steps, currentStep }) {
    return (
        <section className="card">

            <h2>Transition History</h2>

            <div className="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>State</th>
                            <th>Read</th>
                            <th>Write</th>
                            <th>Move</th>
                            <th>Next State</th>
                        </tr>
                    </thead>

                    <tbody>

                        {steps.map((item, index) => (
                            <tr
                                className={
                                    index === currentStep
                                        ? "selected-row"
                                        : ""
                                }
                                key={index}
                            >
                                <td>{item.step}</td>
                                <td>{item.state}</td>
                                <td>{item.read}</td>
                                <td>{item.write}</td>
                                <td>{item.move}</td>
                                <td>{item.nextState}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </section>
    );
}

export default TransitionTable;