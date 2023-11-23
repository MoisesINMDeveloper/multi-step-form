import { useContext, useState } from "react";
import { InfoContext } from "../../Context/ContextProvider";
import InfoPersonal from "../InfoPersonal";
import SelectYourPlan from "../SelectYourPlan";
import PickAddons from "../PickAddOns";
import FinishingUp from "../FinishingUp";
import ThanksYou from "../ThanksYou";

export default function StepsForm() {
    const {
        handleStep1,
        handleStep3,
        changeStep,
        currentStep,
        infoPersonal,
        setSelectedPlanId,
    } = useContext(InfoContext);

    const [showThanksYou, setShowThanksYou] = useState(false);

    const handleNextStep = async () => {
        let isValid = false;

        switch (currentStep) {
            case 1:
                isValid = await handleStep1();
                break;
            case 2:
                if (infoPersonal.selectedPlan) {
                    setSelectedPlanId(infoPersonal.selectedPlan.id);
                    changeStep((prevStep) => prevStep + 1);
                    return;
                }
                changeStep((prevStep) => prevStep + 1);
                break;
            case 3:
                isValid = handleStep3();
                break;
            case 4:
                // Aquí puedes establecer el estado para mostrar ThanksYou y seguir mostrando el paso 4 sombreado
                setShowThanksYou(true);
                return; // No avanzar al siguiente paso cuando llegas al paso 4
            default:
                break;
        }

        if (isValid && currentStep !== 4) {
            changeStep((prevStep) => prevStep + 1);
        }
    };

    const handleGoBack = () => {
        changeStep((prevStep) => Math.max(prevStep - 1, 1));
        setShowThanksYou(false); // Reiniciar el estado cuando retrocedes
    };

    return (
        <main className="tablet:flex tablet:justify-center tablet:items-center w-[100vw] h-[100vh] min-w-[20rem] tablet:bg-Magnolia">
            <div className="tablet:w-[auto] tablet:h-[auto] tablet:flex-col tablet:justify-center tablet:p-4 tablet:rounded-xl tablet:shadow-xl tablet:items-center tablet:bg-White">
                <div className="flex-col">
                    <div className="tablet:flex tablet:justify-center tablet:items-center">
                        <nav className="bg-bgmobile bg-cover bg-center tablet:z-10 tablet:bg-bgdesktop tablet:bg-cover tablet:mr-[1rem] tablet:bg-center tablet:max-w-[22rem] tablet:min-w-[10rem] tablet:rounded-xl tablet:w-[18rem] tablet:h-[37rem] w-[100vw] h-[25vh]">
                            <div className="flex items-center justify-center tablet:justify-start ">

                                <ul className="steps-list tablet:pt-[2.5rem] tablet:pr-[0.5rem] tablet:pl-[1.5rem] tablet:flex-col ">
                                    {[1, 2, 3, 4].map((step) => (
                                        <li className={`step-item tablet:my-[1rem] ${step === currentStep || (showThanksYou && step === 4) ? "active bg-Lightblue" : ""}`} key={step}>
                                            <p className={`font-bold text-sm ${step === currentStep || (showThanksYou && step === 4) ? "text-Marineblue" : ""}`}>{step}</p>
                                        </li>
                                    ))}

                                </ul>
                                <ul className="hidden tablet:flex tablet:flex-col tablet:justify-center">
                                    <li className=" tablet:my-[1rem]">
                                        <h4 className="text-xs text-Coolgray" >STEP 1</h4>
                                        <p className="text-sm font-semibold text-Lightgray" >YOUR INFO</p>
                                    </li>
                                    <li className=" tablet:my-[1rem]">
                                        <h4 className="text-xs text-Coolgray" >STEP 2</h4>
                                        <p className="text-sm font-semibold text-Lightgray">SELECT PLAN</p>
                                    </li>
                                    <li className=" tablet:my-[1rem]">
                                        <h4 className="text-xs text-Coolgray" >STEP 3</h4>
                                        <p className="text-sm font-semibold text-Lightgray">ADD-ONS</p>
                                    </li>
                                    <li className="tablet:my-[1rem]">
                                        <h4 className="text-xs text-Coolgray" >STEP 4</h4>
                                        <p className="text-sm font-semibold text-Lightgray">SUMMARY</p>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                        <div className="tablet:flex-col">

                            <section className="tablet:items-center tablet:w-[auto] tablet:min-w-[34rem] tablet:h-[auto] flex justify-center w-[100vw] h-[31rem] bg-Magnolia tablet:bg-White">
                                {/* Renderiza los componentes según el paso actual */}
                                {currentStep === 1 && <InfoPersonal />}
                                {currentStep === 2 && <SelectYourPlan />}
                                {currentStep === 3 && <PickAddons />}
                                {currentStep === 4 && !showThanksYou && <FinishingUp />}
                                {showThanksYou && <ThanksYou />} {/* Renderiza ThanksYou si showThanksYou es true */}
                                {/* Agrega más componentes para cada paso según sea necesario */}
                            </section>
                            <div className="tablet:flex tablet:justify-end tablet:mr-[2rem]">
                                {!showThanksYou && (
                                    <div className={`fixed ${currentStep === 1 ? 'tablet:justify-end' : 'tablet:justify-between'} tablet:mt-[10rem] tablet:items-start tablet:mr-0 bg-White w-[100vw] tablet:w-[30rem] tablet:min-w-[10rem] tablet:h-0 h-[10rem] flex justify-between mt-[-5rem] pt-3 items-start px-4`} style={{ display: currentStep === showThanksYou ? "none" : "flex" }}>
                                        {currentStep > 1 && (
                                            <button className="flex items-center w-[7rem] h-[3rem] text-Coolgray font-bold rounded-md tablet:hover:text-Marineblue" onClick={handleGoBack}>
                                                Go Back
                                            </button>
                                        )}
                                        {currentStep > 0 && (
                                            <button
                                                className={` w-[7rem] h-[3rem] bg-Marineblue text-Alabaster font-bold rounded-md ${currentStep === 4 ? "bg-Confirm  bg-Purplishblue" : ""}`}
                                                onClick={handleNextStep}
                                            >
                                                {currentStep === 4 ? "Confirm" : "Next Step"}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
