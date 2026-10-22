import { useEffect, useState } from "react";

import InputPanel from "./components/InputPanel";
import Tape from "./components/Tape";
import ControlPanel from "./components/ControlPanel";
import TransitionTable from "./components/TransitionTable";
import IDDisplay from "./components/IDDisplay";
import ResultPanel from "./components/ResultPanel";

import { generateAdditionSteps } from "./tm/addition";
import { generateSubtractionSteps } from "./tm/subtraction";
import { generateMultiplicationSteps } from "./tm/multiplication";
import { generateDivisionSteps } from "./tm/division";

import { unaryToDecimal } from "./tm/unary";

import "./App.css";

function App() {
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [operation, setOperation] = useState("+");

    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    const [error, setError] = useState("");

    // Auto Run state
    const [isRunning, setIsRunning] = useState(false);

    function startSimulation() {
        setError("");
        setIsRunning(false);

        if (!/^[1]+$/.test(first) || !/^[1]+$/.test(second)) {
            setError("Enter valid unary numbers using only 1.");
            return;
        }

        let generatedSteps = [];

        switch (operation) {
            case "+":
                generatedSteps = generateAdditionSteps(first, second);
                break;

            case "-":
                generatedSteps = generateSubtractionSteps(first, second);
                break;

            case "*":
                generatedSteps = generateMultiplicationSteps(
                    first,
                    second
                );
                break;

            case "/":
                generatedSteps = generateDivisionSteps(first, second);
                break;

            default:
                break;
        }

        setSteps(generatedSteps);
        setCurrentStep(0);
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsRunning(false);
        }
    }

    function previousStep() {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    function reset() {
        setIsRunning(false);
        setCurrentStep(0);
    }

    // AUTO RUN
    useEffect(() => {
        if (!isRunning) {
            return;
        }

        if (currentStep >= steps.length - 1) {
            setIsRunning(false);
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStep((prevStep) => prevStep + 1);
        }, 500);

        return () => clearTimeout(timer);
    }, [isRunning, currentStep, steps.length]);

    function toggleAutoRun() {
        if (steps.length === 0) {
            return;
        }

        if (currentStep >= steps.length - 1) {
            setCurrentStep(0);
            setIsRunning(true);
        } else {
            setIsRunning(!isRunning);
        }
    }

    const current = steps[currentStep];

    const finalStep =
        steps.length > 0 ? steps[steps.length - 1] : null;

    const accepted =
        finalStep && finalStep.state === "qAccept";

    return (
        <div className="app">

            <header className="header">
                <h1>TM-Calc</h1>

                <p>
                    Turing Machine Based Unary Calculator
                </p>
            </header>

            <main>

                <InputPanel
                    first={first}
                    second={second}
                    operation={operation}
                    setFirst={setFirst}
                    setSecond={setSecond}
                    setOperation={setOperation}
                    onStart={startSimulation}
                />

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {current && (
                    <>
                        <Tape
                            tape={current.tape}
                            head={current.head}
                        />

                        <IDDisplay
                            step={current.step}
                            state={current.state}
                            read={current.read}
                            write={current.write}
                            move={current.move}
                            nextState={current.nextState}
                            description={current.description}
                        />

                        <ControlPanel
                            onPrevious={previousStep}
                            onNext={nextStep}
                            onReset={reset}
                            disablePrevious={currentStep === 0}
                            disableNext={
                                currentStep === steps.length - 1
                            }
                        />

                        {/* AUTO RUN BUTTON */}
                        <div className="auto-run-container">

                            <button
                                className="auto-run-button"
                                onClick={toggleAutoRun}
                            >
                                {isRunning
                                    ? "⏸ Stop Auto Run"
                                    : "▶ Auto Run"}
                            </button>

                            <p className="auto-run-status">
                                {isRunning
                                    ? "Simulation is running automatically..."
                                    : "Click Auto Run to execute the TM step-by-step automatically."}
                            </p>

                        </div>

                        <TransitionTable
                            steps={steps}
                            currentStep={currentStep}
                        />

                        {accepted && (
                            <ResultPanel
                                unaryResult={finalStep.tape.join("")}
                                decimalResult={unaryToDecimal(
                                    finalStep.tape.join("")
                                )}
                            />
                        )}
                    </>
                )}

            </main>
        </div>
    );
}

export default App;