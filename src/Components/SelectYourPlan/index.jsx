import React, { useState, useContext, useEffect } from "react";
import { InfoContext } from "../../Context/ContextProvider";
import ArcadeIcon from "/icon-arcade.svg";
import AdvancedIcon from "/icon-advanced.svg";
import ProIcon from "/icon-pro.svg";

export default function SelectYourPlan() {
    const { personalInfo, getNextStep } = useContext(InfoContext);
    const [showYearlyPlans, setShowYearlyPlans] = useState(true);
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        // Al montar el componente, intenta cargar la información desde localStorage
        const savedInfo = localStorage.getItem("infoPersonal");
        if (savedInfo) {
            personalInfo(JSON.parse(savedInfo));
        }

        // Verifica si hay un plan seleccionado en el LocalStorage
        const selectedPlan = localStorage.getItem("selectedPlan");
        if (selectedPlan) {
            const parsedPlan = JSON.parse(selectedPlan);
            // Si hay un plan seleccionado, llama a la función getNextStep
            getNextStep(parsedPlan.id);
        }

        // Define la variable `plans`
        const initialPlans = showYearlyPlans
            ? [
                { id: 1, icon: ArcadeIcon, title: "Arcade", price: "$9/mo" },
                { id: 2, icon: AdvancedIcon, title: "Advanced", price: "$12/mo" },
                { id: 3, icon: ProIcon, title: "Pro", price: "$15/mo" },
            ]
            : [
                { id: 4, icon: ArcadeIcon, title: "Arcade", price: "$90/yr", discount: "2 months free" },
                { id: 5, icon: AdvancedIcon, title: "Advanced", price: "$120/yr", discount: "2 months free" },
                { id: 6, icon: ProIcon, title: "Pro", price: "$150/yr", discount: "2 months free" },
            ];

        // Marcar el plan seleccionado al cargar
        const selectedPlanId = personalInfo.selectedPlan ? personalInfo.selectedPlan.id : null;
        const updatedPlans = initialPlans.map((p) => ({
            ...p,
            isSelected: p.id === selectedPlanId,
        }));

        // Actualizar el estado de los planes
        setPlans(updatedPlans);
    }, [personalInfo.selectedPlan, showYearlyPlans]);

    const handleToggle = () => {
        setShowYearlyPlans((prev) => !prev);
        setToggleSwitch((prev) => !prev);
    };

    const handleSelectPlan = (plan) => {
        personalInfo((prevInfo) => ({
            ...prevInfo,
            selectedPlan: plan,
        }));

        // Marcar el plan seleccionado
        const updatedPlans = plans.map((p) => ({
            ...p,
            isSelected: p.id === plan.id,
        }));

        // Actualizar el estado de los planes
        setPlans(updatedPlans);

        // Almacena la información del plan seleccionado en localStorage
        localStorage.setItem("selectedPlan", JSON.stringify(plan));

        // Llama a la función getNextStep directamente si se selecciona un plan
        getNextStep(plan.id);
    };

    return (
        <article className="w-[90vw] tablet:w-[auto] tablet:max-w-[32rem] tablet:[32rem] z-10 absolute mt-[-4.2rem] bg-White tablet:bg-none min-h-[23rem] max-h-[auto] rounded-2xl p-[1.5rem] tablet:p-0 shadow-xl tablet:shadow-none mx-[1rem]">
            <div className="mt-1 tablet:mt-[-2rem] tablet:mb-[2rem]">
                <h2 className="font-bold text-xl tablet:text-[2rem] text-Marineblue">Select your plan</h2>
                <p className="text-Coolgray my-3">You have the option of monthly or yearly billing.</p>
            </div>
            <div className=" tablet:w-[30rem] tablet:items-center tablet:justify-center tablet:grid tablet:grid-cols-3 tablet:grid-rows-1 tablet:gap-4">
                {plans.map((plan, id) => (
                    <div
                        key={id}
                        className={`flex tablet:min-w-[auto] tablet:cursor-pointer tablet:h-[10rem] tablet:flex-col tablet:items-start tablet:justify-between tablet:w-[8rem] items-center hover:bg-Alabaster border-[1px] border-Lightgray hover:border-Purplishblue rounded-lg min-w-[77vw] ${showYearlyPlans ? "h-[4rem]" : "h-[5rem]"
                            } ${id !== 0 ? "mt-5" : "mt-5"} ${plan.isSelected ? "selected-plan" : ""}`}
                        onClick={() => handleSelectPlan(plan)}
                    >
                        <img className="w-[2.5rem] h-[2.5rem] mx-4 tablet:my-4" src={plan.icon} alt={`${plan.title} icon`} />
                        <div className="py-1 tablet:mx-4 tablet:my-2">
                            <p className={`font-bold text-Marineblue text-[.93rem]`}>{plan.title}</p>
                            <span className={`text-[.80rem] text-Coolgray`}>{plan.price}</span>
                            {!showYearlyPlans && <p className="font-bold text-Marineblue text-[.80rem]">{plan.discount}</p>}
                        </div>
                    </div>
                ))}
                {/* Toggle para cambiar entre mensual y anual */}
                <div
                    className={`flex tablet:col-span-3 tablet:min-w-[auto] items-center justify-center min-w-[77vw] h-[3rem] bg-Alabaster rounded-lg mt-4 cursor-pointer`}
                    onClick={handleToggle}
                >
                    <p className={`font-medium text-Coolgray cursor-pointer ${showYearlyPlans ? "text-Marineblue" : ""}`}>Monthly</p>
                    <div className={`flex items-center bg-Marineblue w-10 h-5 rounded-3xl mx-6`}>
                        <span
                            className={`w-4 h-4 bg-White text-White rounded-full mx-1 my-1 text-base ${toggleSwitch ? "ml-auto" : ""}`}
                        ></span>
                    </div>
                    <p className={`font-medium text-Coolgray cursor-pointer ${!showYearlyPlans ? "text-Marineblue" : ""}`}>Yearly</p>
                </div>
            </div>
        </article>
    );
}
