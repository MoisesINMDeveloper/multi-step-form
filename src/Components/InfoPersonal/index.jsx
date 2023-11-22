import { useContext } from "react";
import { InfoContext } from "../../Context/ContextProvider";

export default function InfoPersonal() {
    const { infoPersonal, personalInfo, inputErrors } = useContext(InfoContext);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        personalInfo({ [id]: value });
    };

    return (
        <article className="w-[90vw] tablet:w-[35%] tablet:max-w-[32rem] tablet:[32rem] z-10 absolute mt-[-4.2rem] bg-White tablet:bg-none min-h-[23rem] max-h-[54vh] rounded-2xl p-[1.5rem] tablet:p-0 shadow-xl tablet:shadow-none mx-[1rem]">
            <div className="mt-1 tablet:mt-[-2rem] tablet:mb-[2rem]">
                <h1 className="font-bold text-xl tablet:text-[2rem] text-Marineblue">Personal info</h1>
                <p className="text-Coolgray my-3">
                    Please provide your name, email address, and phone number.
                </p>
            </div>
            <form className="flex flex-col">
                {[
                    { label: "Name", id: "name", type: "text", placeholder: "e.g. Stephen King" },
                    { label: "Email Address", id: "email", type: "email", placeholder: "e.g. stephenking@lorem.com" },
                    { label: "Phone Number", id: "phone", type: "tel", placeholder: "e.g. +1 234 567890" },
                ].map((input) => (
                    <div className="flex flex-col" key={input.id}>
                        <div className="flex justify-between items-center">
                            <label htmlFor={input.id}>{input.label}</label>
                            {/* Mostrar el mensaje de error solo si existe y si se ha intentado pasar al siguiente paso */}
                            {inputErrors[input.id] && (
                                <p className="text-Strawberryred text-xs font-semibold ml-2">{inputErrors[input.id]}</p>
                            )}
                        </div>
                        <input
                            type={input.type}
                            id={input.id}
                            placeholder={input.placeholder}
                            value={infoPersonal[input.id]}
                            onChange={handleInputChange}
                            className={`outline-[1px] ${inputErrors[input.id] ? "border border-Strawberryred" : ""}`}
                        />
                    </div>
                ))}
            </form>
        </article>
    );
}
