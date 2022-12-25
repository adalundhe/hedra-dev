import { CodeBlock, a11yDark } from "react-code-blocks";
import { GiBoxingGlove } from 'react-icons/gi'
import { BsGearWide } from 'react-icons/bs'
import { FaPython } from 'react-icons/fa'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { GoBeaker } from 'react-icons/go'
import { Transition } from "@headlessui/react";
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from "react";
import { writeLine } from "../../tools";



const codeExample = `
from hedra import (
	Setup,
	Execute,
	action,
	Analyze,
	JSONConfig,
	Submit,
	depends,
)

class SetupStage(Setup):
    batch_size=1000
    total_time='1m'


@depends(SetupStage)
class ExecuteHTTPStage(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')


@depends(ExecuteHTTPStage)
class AnalyzeStage(Analyze):
    pass


@depends(AnalyzeStage)
class SubmitJSONResultsStage(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )

`

const DescriptionCard = () => {

    const { ref, inView } = useInView();
    const leaveRef= useInView()
    const tagLineText = useRef("Write performance tests as workflows in Python code, then run them wherever and however you want.")
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

    return (
        <div className="w-full row-span-3 text-center font-rany flex flex-col items-center bg-[#eeeeee] " ref={leaveRef.ref}>
            <div className="flex justify-center items-center px-10 h-[480px]">
                <h3 className="md:text-4xl xs:text-2xl text-[2rem] break-words w-full text-[#2e3131] py-20 flex flex-col items-center justify-center h-[100%]" ref={textInView.ref}>
                    <p>
                    {tagLine}
                    </p>
                    <div className="mt-4">
                    {textInView.inView || tagLine.length == tagLineText.current.length ? <FaPython /> : null}
                    </div>
                </h3>
            </div>
            <div ref={ref}></div>
            <div className="w-full grid min-[2048px]:grid-cols-2 grid-cols-1 mb-10">
                <div className="text-3xl w-full flex justify-center bg-[#eeeeee] ">
                    <div className="w-[95%] px-2 h-[1536px] flex items-center">
                        <ul className="w-full flex flex-col justify-center ">
                            <li className="my-10 flex justify-center items-center">
                                <Transition
                                    show={inView || leaveRef.inView}
                                    enter="transition-opacity duration-[5000ms] delay-[1000ms]"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-[5000ms]  delay-[1000ms]"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-6xl mb-4 flex justify-center">
                                        <GiBoxingGlove />
                                    </p>
                                    <p className="my-10 text-center">
                                        Hit hard with the power of multiprocessing and asyncio
                                    </p>
                                 </Transition>
                            </li>
                            <li className="my-10 min-[2048]:text-left flex justify-center  items-center">
                                <Transition
                                    show={inView || leaveRef.inView}
                                    enter="transition-opacity duration-[3500ms]  delay-[1500ms]"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-[5000ms]  delay-[1500ms]"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-6xl mb-4 flex justify-center">
                                        <BsGearWide />
                                    </p>
                                    <p className="my-10 text-center">
                                        Use http, http2, playwright, and more in the same test
                                    </p>

                                </Transition>
                            </li>
                            <li className="my-10 text-left flex justify-center  items-center">
                                <Transition
                                    show={inView || leaveRef.inView}
                                    enter="transition-opacity duration-[4500ms]  delay-[2000ms]"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-[5000ms]  delay-[2000ms]"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                <p className="text-6xl mb-4 flex justify-center">
                                    <HiOutlineDocumentReport />
                                </p>
                                <p className="my-10 text-center">
                                    30 reporting integrations at the ready to send test results where you need
                                </p>
                                </Transition>
                            </li>
                            <li className="my-10 text-left flex justify-center items-center">
                                <Transition
                                    show={inView || leaveRef.inView}
                                    enter="transition-opacity duration-[5500ms]  delay-[2500ms]"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-[5000ms]  delay-[2500ms]"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                <p className="text-6xl mb-4 flex justify-center">
                                    <GoBeaker />
                                </p>
                                <p className="my-10 text-center">
                                    Use SciPy's proven optimizaton algorithms to find the best parameters for your test
                                </p>

                                </Transition>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="code-block text-xs sm:text-sm md:text-basic lg:text-lg xl:text-xl 2xl:text-2xl font-sans text-left w-full shadow-2xl bg-[#2e3131] py-10 flex items-center h-[100%]">
                    <CodeBlock 
                        text={codeExample}
                        language={'python'}
                        showLineNumbers={true}
                        theme={{
                            ...a11yDark,
                            lineNumberColor: "eeeeee",
                            lineNumberBgColor: "#14151a",
                            backgroundColor: "#2e3131",
                            textColor: "#eeeeee",
                            keywordColor: "#abb7b7",
                            sectionColor: "#fff9de",
                            numberColor: "white",
                            stringColor: "#95a5a6",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}


export {
    DescriptionCard
}