import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../Context/ContextProvider";
import IconCheck from "/icon-checkmark.svg";

export default function PickAddOns() {
    const { showYearlyPlans } = useContext(InfoContext);
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

    const addons = [
        { id: 1, title: "Online Service", description: "Access to multiplayer games", priceMonthly: "+$1/mo", priceYearly: "+$10/yr" },
        { id: 2, title: "Larger storage", description: "Extra 1TB of cloud save", priceMonthly: "+$2/mo", priceYearly: "+$20/yr" },
        { id: 3, title: "Customizable profile", description: "Custom theme on your profile", priceMonthly: "+$2/mo", priceYearly: "+$20/yr" },
        // Agrega más add-ons según sea necesario
    ];

    const handleAddonClick = (addon) => {
        // Verificar si el complemento ya está seleccionado
        const isSelected = selectedAddons.some((selectedAddon) => selectedAddon.id === addon.id);

        // Actualizar la lista de complementos seleccionados
        if (isSelected) {
            const updatedAddons = selectedAddons.filter((selectedAddon) => selectedAddon.id !== addon.id);
            setSelectedAddons(updatedAddons);
        } else {
            const updatedAddons = [...selectedAddons, addon];
            setSelectedAddons(updatedAddons);
        }
    };

    // Almacenar la información de los complementos seleccionados en el LocalStorage
    useEffect(() => {
        localStorage.setItem("selectedAddons", JSON.stringify(selectedAddons));
    }, [selectedAddons]);

    return (
        <article className="w-[90vw] tablet:w-[35%] tablet:max-w-[32rem] tablet:[32rem] z-10 absolute mt-[-4.2rem] bg-White tablet:bg-none min-h-[23rem] max-h-[54vh] rounded-2xl p-[1.5rem] tablet:p-0 shadow-xl tablet:shadow-none mx-[1rem]">
            <div className="mt-1 tablet:mt-[-2rem] tablet:mb-[2rem]">
                <h2 className="font-bold text-xl tablet:text-[2rem] text-Marineblue">Pick add-ons</h2>
                <p className="text-Coolgray my-3">Add-ons help enhance your gaming experience.</p>
            </div>
            <div>
                {addons.map((addon, index) => (
                    <div
                        key={index}
                        className={`flex justify-between my-3 items-center px-4 hover:bg-Alabaster border-[1px] border-Lightgray hover:border-Purplishblue rounded-lg min-w-[77vw] tablet:min-w-[20rem] py-2 ${selectedAddons.some((selectedAddon) => selectedAddon.id === addon.id) ? 'bg-Alabaster border-Purplishblue' : ''}`}
                        onClick={() => handleAddonClick(addon)}
                    >
                        <div className="flex space-x-4 items-center">
                            <div className={`w-[1.4rem] h-[1.4rem] rounded-md border-[1px] border-Lightgray ${selectedAddons.some((selectedAddon) => selectedAddon.id === addon.id) ? 'bg-Purplishblue' : 'hover:bg-Purplishblue'} flex justify-center`}>
                                <img className="w-3" src={IconCheck} alt="icon-check-mark" />
                            </div>
                            <div className="flex-col w-[10.5rem]">
                                <p className="font-bold text-Marineblue text-[.93rem]">{addon.title}</p>
                                <p className="text-[.75rem] text-Coolgray">{addon.description}</p>
                            </div>
                        </div>
                        <span className={`text-Purplishblue text-sm ${selectedPlan && selectedPlan.id >= 4 ? '' : 'hidden'}`}>
                            {addon.priceYearly}
                        </span>
                        <span className={`text-Purplishblue text-sm ${selectedPlan && selectedPlan.id < 4 ? '' : 'hidden'}`}>
                            {addon.priceMonthly}
                        </span>
                    </div>
                ))}
            </div>
        </article>
    );
}
