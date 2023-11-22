import IconThanks from "/icon-thank-you.svg"
export default function ThanksYou() {
    return (
        <section className="w-[90vw] tablet:w-[31rem] tablet:max-w-[32rem] tablet:[32rem] z-10 absolute mt-[-4.2rem] bg-White tablet:bg-none min-h-[23rem] max-h-[54vh] rounded-2xl p-[1.5rem] tablet:p-0 shadow-xl tablet:shadow-none mx-[1rem]">
            <div className="flex flex-col mt-10 px-4 justify-center items-center">
                <div>
                    <img className="w-14 h-14 tablet:w-[5rem] tablet:h-[5rem]" src={IconThanks} alt="" />
                </div>
                <h2 className="font-bold text-xl tablet:mt-[3rem] tablet:text-[2rem] text-Marineblue">Thank you!</h2>
                <p className="text-Coolgray p-[1rem] font-medium text-[15px] text-center min-w-[20rem]">
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support.
                    please feel free to email us at support@loremgaming.com.
                </p>
            </div>
        </section>
    )
}