import { Transition } from "@headlessui/react"
import { useInView } from "react-intersection-observer"


const TitleCard = () => {

    const { ref, inView } = useInView();    


    return (
            <div className="w-screen h-screen flex justify-center items-center bg-transparent text-center font-monserrat text-[#2e3131] my-auto" ref={ref}>
          
                <Transition
                    show={inView}
                    enter="transition-opacity duration-[1500ms]"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-[5000ms]"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                        <div className="flex flex-col items-center justify-center h-screen">
                            <h1 className="2xl:text-[12rem] xl:text-9xl text-[6rem] tracking-wide uppercase w-100">Hedra</h1>
                            <h3 className="text-5xl w-100 font-rany">Test at scale</h3>
                        </div>
                                
                    </Transition>
            </div>

    )
}

export {
    TitleCard
}