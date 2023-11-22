import React, { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../Context/ContextProvider";

export default function FinishingUp() {
    const { changeStep } = useContext(InfoContext);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState([]);

    useEffect(() => {
        // Obtener el plan seleccionado desde el LocalStorage
        const savedPlan = localStorage.getItem("selectedPlan");
        if (savedPlan) {
            setSelectedPlan(JSON.parse(savedPlan));
        }

        // Obtener la información de los complementos seleccionados desde el LocalStorage
        const savedAddons = localStorage.getItem("selectedAddons");
        if (savedAddons) {
            setSelectedAddons(JSON.parse(savedAddons));
        }
    }, []);

    const getPlanName = () => {
        if (selectedPlan) {
            return selectedPlan.title;
        }
        return "No plan selected";
    };

    const getBillingPeriod = () => {
        if (selectedPlan && selectedPlan.id >= 4) {
            return "(Yearly)";
        } else {
            return "(Monthly)";
        }
    };

    const calculateTotal = () => {
        let total = 0;

        // Sumar el precio del plan seleccionado
        if (selectedPlan) {
            const planPrice = selectedPlan.price.replace(/\D/g, ''); // Eliminar caracteres no numéricos
            total += parseFloat(planPrice) || 0;
        }

        // Sumar el precio de los complementos
        selectedAddons.forEach((addon) => {
            const addonPrice = selectedPlan && selectedPlan.id >= 4 ? addon.priceYearly : addon.priceMonthly || addon.price;
            const parsedAddonPrice = parseFloat(addonPrice.replace(/\D/g, '')) || 0; // Eliminar caracteres no numéricos
            total += parsedAddonPrice;
        });

        return total;
    };

    const handlePlanChange = () => {
        // Llevar al usuario de vuelta a SelectYourPlan
        changeStep(2);
    };

    return (
        <section className="w-[90vw] tablet:w-[35%] tablet:max-w-[32rem] tablet:[32rem] z-10 absolute mt-[-4.2rem] bg-White tablet:bg-none min-h-[23rem] max-h-[54vh] rounded-2xl p-[1.5rem] tablet:p-0 shadow-xl tablet:shadow-none mx-[1rem]">
            <div className="mt-1 tablet:mt-[-2rem] tablet:mb-[2rem]">
                <h2 className="font-bold text-xl tablet:text-[2rem] text-Marineblue">Finishing up</h2>
                <p className="text-Coolgray my-3">Double-check everything looks OK before confirming.</p>
            </div>
            <div className="bg-Alabaster">
                <div className="flex py-3 justify-between items-center border-b-[1px] mx-3 border-Lightgray">
                    <div>
                        <h3 className="font-bold text-Marineblue text-[.93rem]">{getPlanName()} <span>{getBillingPeriod()}</span></h3>
                        <button className="text-Coolgray underline" onClick={handlePlanChange}>
                            Change
                        </button>
                    </div>
                    <p className="text-Marineblue text-sm font-bold">{selectedPlan ? selectedPlan.price : "$0/mo"}</p>
                </div>
                <div className="py-3 border-b-[1px] mx-3 border-Lightgray">
                    {selectedAddons.map((addon, index) => (
                        <div className="flex justify-between" key={index}>
                            <p className="text-Coolgray pb-2">{addon.title}</p>
                            <p className="text-Marineblue text-sm">{selectedPlan && selectedPlan.id >= 4 ? addon.priceYearly : addon.priceMonthly}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mx-3 my-5">
                <p className="text-Coolgray">Total (per <span>{selectedPlan && selectedPlan.id >= 4 ? "year" : "month"}</span>)</p>
                <p className="text-Purplishblue font-bold">$
                    {isNaN(calculateTotal()) ? "N/A" : calculateTotal()}
                    {selectedPlan && selectedPlan.id >= 4 ? "/yr" : "/mo"}
                </p>            </div>
        </section>
    );
}
