import { createContext, useState, useEffect } from "react";

export const InfoContext = createContext();

export const ContextProvider = ({ children }) => {
  const [infoPersonal, setInfoPersonal] = useState(() => {
    const storedInfo = localStorage.getItem("infoPersonal");
    return storedInfo
      ? JSON.parse(storedInfo)
      : {
        name: "",
        email: "",
        phone: "",
        selectedPlan: null,
      };
  });

  const [inputErrors, setInputErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    localStorage.setItem("infoPersonal", JSON.stringify(infoPersonal));
  }, [infoPersonal]);

  const validateFields = () => {
    const errors = {};
    if (infoPersonal.name.trim() === "") {
      errors.name = "This field is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(infoPersonal.email.trim())) {
      errors.email = "This field is required";
    }
    const phoneRegex = /^[\d\s+-]+$/;
    if (!phoneRegex.test(infoPersonal.phone.trim())) {
      errors.phone = "This field is required";
    }
    return errors;
  };

  const personalInfo = (newInfo) => {
    setInputErrors({});
    setInfoPersonal((prevInfo) => ({
      ...prevInfo,
      ...newInfo,
    }));
  };

  const resetInfo = () => {
    localStorage.removeItem("step2Info");
    setInfoPersonal({
      name: "",
      email: "",
      phone: "",
      selectedPlan: null,
    });
  };

  const handleStep1 = () => {
    const errors = validateFields();
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      setInputErrors(errors);
      return false;
    }
  };

  const handleStep2 = () => {
    if (infoPersonal.selectedPlan) {
      // Devolver el resultado de la validación y el plan seleccionado
      return { isValid: true, selectedPlan: infoPersonal.selectedPlan };
    } else {
      setInputErrors({ plan: "Please select a plan" });
      return { isValid: false, selectedPlan: null };
    }
  };

  const handleStep3 = () => {
    // Recuperar información del Step 2 desde LocalStorage si existe
    const step2Info = localStorage.getItem("step2Info");
    if (step2Info) {
      const parsedStep2Info = JSON.parse(step2Info);
      // Usa la información como sea necesario
    }

    // Lógica para el paso 3 usando la información del paso 2
    // Ejemplo: Si el plan seleccionado en el paso 2 es "Pro", entonces realizar alguna acción.
    if (infoPersonal.selectedPlan === "Pro") {
      // Realizar acciones necesarias para el Step 3
      console.log("Step 3 logic for Pro plan");
    }
    return true; // Cambia esto según tu lógica
  };

  const changeStep = (newStep) => {
    setCurrentStep(newStep);
  };

  const getNextStep = () => {
    const errors = validateFields();
    if (Object.keys(errors).length === 0 && infoPersonal.selectedPlan) {
      // Aquí podrías hacer algo antes de pasar al siguiente paso si es necesario
      changeStep((prevStep) => prevStep + 1);
      return true;
    } else {
      setInputErrors(errors);
      return false;
    }
  };

  return (
    <InfoContext.Provider
      value={{
        infoPersonal,
        setInfoPersonal,
        personalInfo,
        getNextStep,
        handleStep1,
        handleStep2,
        handleStep3,
        inputErrors,
        changeStep,
        resetInfo,
        currentStep,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
