import { CodeBlock, a11yDark } from "react-code-blocks";
import { useEffect, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { asBuffer } from "../../../tools";
import { HiClipboardCopy, HiClipboardCheck } from 'react-icons/hi'


const CodeSegment = ({
    children,
    showLines,
    theme,
    language
}: {
    children: string,
    showLines?: boolean,
    theme?: {[key: string]: string},
    language?: string
}) => {

    const [sectionActive, setSectionActive] = useState(false);

    const buffer = asBuffer(children)

    useEffect(() => {

        const interval = setInterval(() => {

            setSectionActive(false);

        }, 3000)

        return () => clearInterval(interval)

    }, []);
    

    return (
        <>
        <br/>
        <div>
            <div 
                id='copy-dev-install'
                className={`font-informe font-lighter tracking-wider rounded cursor-pointer w-full my-4 code-block text-[1.1rem] leading-[1.25vmin] text-left shadow-2xl bg-[#2e3131] w-full border border-[3px] ${sectionActive ? 'border-[#038aff]/90' : 'border-transparent hover:border-[#038aff]/60'}`}
                onClick={() => {

                    setSectionActive(true)
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(children);
                    } else {
                        document.execCommand("copy", true, children);
                    }
                }}
            >
                <div className="flex justify-center w-full">
                    <div className="flex w-[90%] h-full code-segment-copyable">
                        <CodeBlock 
                            text={sectionActive ? 'Copied!' + buffer : children}
                            language={language ?? 'text'}
                            showLineNumbers={showLines ?? true}
                            theme={
                                theme ? {
                                    ...a11yDark,
                                    ...theme
                                } : {
                                    ...a11yDark,
                                    lineNumberColor: "eeeeee",
                                    lineNumberBgColor: "#14151a",
                                    backgroundColor: "#2e3131",
                                    textColor: "#eeeeee",
                                    keywordColor: "#abb7b7",
                                    sectionColor: "#fff9de",
                                    numberColor: "white",
                                    stringColor: "#95a5a6",
                                }
                            }
                            wrapLines
                        />
                    </div>
                    <div className="flex pt-[1vmin] text-[#eeeeee] text-[1.75rem] pr-[1vmin] text-center h-full pl-[2vmin]">
                    {
                        sectionActive ? <HiClipboardCheck/> : <HiClipboardCopy/>
                    }
                    </div>
                </div>
            </div>
        </div>
        <br/>
        </>
    )
}

export {
    CodeSegment
}