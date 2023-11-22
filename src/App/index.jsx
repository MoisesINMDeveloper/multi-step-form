import { useEffect } from "react";
import { ContextProvider } from "../Context/ContextProvider";
import StepsForm from "../Components/StepsForm";
import './App.css';

export default function App() {
  useEffect(() => {
    // Limpia la información al cargar la aplicación
    localStorage.removeItem("infoPersonal");
    localStorage.removeItem("selectedPlan");
  }, []);

  return (
    <ContextProvider>
      <StepsForm />
    </ContextProvider>
  );
}
