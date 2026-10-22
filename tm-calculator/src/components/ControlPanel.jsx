function ControlPanel({
    onPrevious,
    onNext,
    onReset,
    disablePrevious,
    disableNext
}) {
    return (
        <section className="controls">

            <button
                onClick={onPrevious}
                disabled={disablePrevious}
            >
                ← Previous
            </button>

            <button
                onClick={onReset}
            >
                Reset
            </button>

            <button
                onClick={onNext}
                disabled={disableNext}
            >
                Next →
            </button>

        </section>
    );
}

export default ControlPanel;