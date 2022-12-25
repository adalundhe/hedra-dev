
import { TerminalController } from "./terminal";
import { DiGit } from 'react-icons/di'
import { TbReportAnalytics } from 'react-icons/tb'
import { GoTerminal } from 'react-icons/go'
import { TfiPlug } from 'react-icons/tfi'
import { FaPython } from 'react-icons/fa'
import { Transition } from "@headlessui/react"
import { useRef, useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { writeLine } from "../../tools";

const FlippedDescriptionCard = () => {

    const { ref, inView } = useInView();
    const leaveRef = useInView();

    const tagLineText = useRef("Embrace a powerful CLI to unleash your tests and push the limits as one team.")
    const [tagLine, updateTagLine] = useState("")
    const textInView = useInView();

    useEffect(() => {
        if (textInView.inView && tagLine.length < tagLineText.current.length){
            writeLine({
                text: tagLineText.current,
                targetText: tagLine,
                setTargetText: updateTagLine
            })
        }
    }, [textInView.inView])


    return(
        <div className="w-full row-span-3 h-[100%] text-center font-rany flex flex-col items-center bg-[#eeeeee]" ref={leaveRef.ref}>
            <div className="flex justify-center items-center px-10 h-[420px] mt-20">
                <h3 className="md:text-4xl xs:text-2xl text-[2rem] w-full text-[#2e3131] py-20 flex flex-col items-center justify-center h-[100%]" ref={textInView.ref}>
                    <p>
                    {tagLine}
                    </p>
                    <div className="mt-2">
                    {textInView.inView || tagLine.length == tagLineText.current.length ? <FaPython /> : null}
                    </div>
                </h3>
            </div>
            <div className="border-t border-[#14151a] w-1/2" ref={ref}></div>
            <div className="w-full grid min-[2048px]:grid-cols-2 grid-cols-1 my-10">
                <div className="font-sans text-left text-base w-full flex justify-center">
                    {
                        (inView || leaveRef.inView )? <TerminalController /> : null
                    }
                </div>
                <div className="text-3xl w-full flex justify-center items-center bg-[#eeeeee]">
                    <div className="w-[95%] px-2 h-[100%]" >
                            <ul className="w-full flex flex-col justify-center">
                                <li className="my-10 flex justify-center items-center">
                                    <Transition
                                        show={inView || leaveRef.inView}
                                        enter="transition-opacity duration-[1500ms] delay-[500ms]"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-[5000ms] delay-[500ms]"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-6xl mb-4 flex justify-center">
                                            <DiGit />
                                        </p>
                                        <p className="my-10 text-center">
                                            Keep your tests organized with Projects and in sync with the built-in Git integration
                                        </p>

                                    </Transition>
                                </li>
                                <li className="my-10 my-10 text-center flex justify-center items-center">
                                    <Transition
                                            show={inView || leaveRef.inView}
                                            enter="transition-opacity duration-[3500ms] delay-[1000ms]"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity duration-[5000ms] delay-[1000ms]"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                        <p className="text-6xl mb-4 flex justify-center">
                                            <TbReportAnalytics />
                                        </p>
                                        <p className="my-10 text-center">
                                            Comprehesive template generation to get you up and running
                                        </p>
                                    </Transition>
                                </li>
                                <li className="my-10 my-10 text-center flex justify-center items-center">
                                    <Transition
                                        show={inView || leaveRef.inView}
                                        enter="transition-opacity duration-[4500ms] delay-[1500ms]"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-[5000ms] delay-[1500ms]"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-6xl mb-4 flex justify-center">
                                            <GoTerminal />
                                        </p>
                                        <p className="my-10 text-center">
                                            One CLI - whether running tests on your laptop or in the cloud
                                        </p>

                                    </Transition>
                                </li>
                                <li className="my-10 my-10 text-center flex justify-center items-center">
                                    <Transition
                                        show={inView || leaveRef.inView}
                                        enter="transition-opacity duration-[5500ms] delay-[2000ms]"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-[5000ms] delay-[2000ms]"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-6xl mb-4 flex justify-center">
                                            <TfiPlug />
                                        </p>
                                        <p className="my-10 text-center">
                                            Powerul yet friendly plugin API - just generate, create, and use, no compilation or awkward extra steps
                                        </p>

                                    </Transition>
                                </li>
                            </ul>
                    </div>
                </div>   
            </div>
        </div>
    )
}


export {
    FlippedDescriptionCard
}