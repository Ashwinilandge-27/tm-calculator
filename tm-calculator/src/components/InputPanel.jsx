function InputPanel({
    first,
    second,
    operation,
    setFirst,
    setSecond,
    setOperation,
    onStart
}) {
    return (
        <section className="card">

            <h2>Calculator Input</h2>

            <div className="input-grid">

                <div>
                    <label>First Unary Number</label>

                    <input
                        value={first}
                        onChange={(e) =>
                            setFirst(e.target.value)
                        }
                        placeholder="Example: 111"
                    />

                    <small>
                        111 = 3
                    </small>
                </div>

                <div>
                    <label>Operation</label>

                    <select
                        value={operation}
                        onChange={(e) =>
                            setOperation(e.target.value)
                        }
                    >
                        <option value="+">Addition (+)</option>
                        <option value="-">Subtraction (-)</option>
                        <option value="*">
                            Multiplication (*)
                        </option>
                        <option value="/">
                            Division (/)
                        </option>
                    </select>
                </div>

                <div>
                    <label>Second Unary Number</label>

                    <input
                        value={second}
                        onChange={(e) =>
                            setSecond(e.target.value)
                        }
                        placeholder="Example: 11"
                    />

                    <small>
                        11 = 2
                    </small>
                </div>

            </div>

            <button
                className="start-btn"
                onClick={onStart}
            >
                Start TM Simulation
            </button>

        </section>
    );
}

export default InputPanel;