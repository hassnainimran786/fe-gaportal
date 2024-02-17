function useMultiSteps() {
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const addStep = (step) => {
    setSteps([...steps, step]);
  };

  const removeStep = (step) => {
    setSteps(steps.filter((s) => s !== step));
  };

  const resetSteps = () => {
    setSteps([]);
  };

  return {
    step,
    steps,
    nextStep,
    previousStep,
    addStep,
    removeStep,
    resetSteps
  };
}

export default useMultiSteps;
