import { Transition } from "@headlessui/react"
import { InstallCommandText } from "./InstallCommandText"
import { useInView } from "react-intersection-observer"

const RepoDisplay = () => {

    const { ref, inView } = useInView();    

    return (
        <Transition
            show={inView}
            unmount={false}
            enter="transition-opacity duration-[500ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-[5000ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >    
            <div className="h-screen flex flex-col items-center justify-center my-10 w-screen" ref={ref}>
                <InstallCommandText />
            </div>          
        </Transition>
    )
}


export {
    RepoDisplay
}