
import { Transition } from "@headlessui/react";
import { useInView } from 'react-intersection-observer';
import { Footer } from "../footer";


const TenantsCard = () => {

    const {ref, inView} = useInView()
    const leaveRef= useInView()

    return (
        <div className="w-screen my-10 h-[99vh]" ref={leaveRef.ref}>
            <div className="text-center flex flex-col items-center font-rany">
                <ul className="h-full w-screen grid grid-rows-[auto] gap-10">  
                        <li ref={ref} className="flex justify-center items-center py-96">
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
                        <li className="flex justify-center items-center pb-96">
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
                    <li className="flex justify-center items-center pb-96">
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