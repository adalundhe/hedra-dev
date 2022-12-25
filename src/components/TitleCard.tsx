import { Transition } from "@headlessui/react"


const TitleCard = () => {


    return (
            <div className="w-100 h-full sm:row-span-2 shadow">
                <div className="w-100 h-[768px] text-center font-monserrat flex flex-col justify-center text-[#2e3131] bg-transparent">
                    <Transition
                        appear={true}
                        show={true}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                            <h1 className="2xl:text-[12rem] xl:text-9xl text-[6rem] tracking-wide uppercase w-100">Hedra</h1>
                            <h3 className="text-5xl w-100 font-rany">Test at scale</h3>
                                
                    </Transition>
                </div>   
            </div>

    )
}

export {
    TitleCard
}