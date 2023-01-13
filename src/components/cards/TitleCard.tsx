import { Transition } from "@headlessui/react"
import { useInView } from "react-intersection-observer"


const TitleCard = () => {

    const { ref, inView } = useInView();    


    return (
            <div className="w-screen h-screen flex justify-center items-center bg-transparent text-center font-monserrat text-[#2e3131] my-auto" ref={ref}>
                <div className="flex flex-col items-center justify-center h-screen w-screen">
                    <h1 className="2xl:text-[12rem] xl:text-[9rem] text-[6rem] tracking-widest uppercase w-100">Hedra</h1>
                    <Transition
                    show={inView}
                    unmount={false}
                    enter="transition-opacity duration-[1500ms]"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-[5000ms]"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    
                
                    <h3 className="text-5xl w-100 font-rany">Test at scale</h3>
                </Transition>
                </div>
            </div>

    )
}

export {
    TitleCard
}