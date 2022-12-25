
import { Transition } from "@headlessui/react";
import { useInView } from 'react-intersection-observer';


const TenantsCard = () => {

    const {ref, inView} = useInView()
    const leaveRef= useInView()

    return (
        <div className="row-span-2 flex flex-col items-center" ref={leaveRef.ref}>
            <div className="border-t border-[#14151a] w-1/2"></div>
            <div className="text-center flex items-center w-1/2 font-rany mt-20 mb-20">
                <ul className="grid grid-rows-3 w-full">  
                        <li className="my-20" ref={ref}>
                            <Transition
                                show={inView || leaveRef.inView}
                                enter="transition-opacity duration-[1500ms] delay-[1000ms]"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-[5000ms] delay-[1000ms]"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >   
                                <h3 className="text-4xl">Speed and efficiency by default.</h3>

                            </Transition>
                        </li>  
                        <li  className="my-20">
                            <Transition
                                show={inView || leaveRef.inView}
                                enter="transition-opacity duration-[3500ms] delay-[1500ms]"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-[5000ms] delay-[1500ms]"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <h3 className="text-4xl">Run with ease anywhere.</h3>

                        </Transition>
                        </li>
                    <li  className="my-20">
                        <Transition
                            show={inView || leaveRef.inView}
                            enter="transition-opacity duration-[4500ms] delay-[2000ms]"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-[5000ms] delay-[2000ms]"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <h3 className="text-4xl">Flexibility and and painless extensibility.</h3>

                        </Transition>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export {
    TenantsCard
}