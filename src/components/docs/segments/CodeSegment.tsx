import { CodeBlock, a11yDark } from "react-code-blocks";
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';


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

    const [tooltipText, setTooltipText] = useState("Click me!");
    return (
        <div>
            <div 
                id='copy-dev-install'
                className={`rounded cursor-pointer w-full py-2 my-4 code-block text-[0.95rem] font-medium font-rany leading-xl text-left shadow-2xl bg-[#2e3131] h-[100%] ${showLines ? '' : 'pl-4'}`}
                onMouseEnter={()=> setTooltipText("Click me!")}
                onClick={() => {
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(children);
                    } else {
                        document.execCommand("copy", true, children);
                    }

                    setTooltipText("Copied!")
                }}
            >
                <CodeBlock 
                    text={children}
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
            <Tooltip anchorId="copy-dev-install" content={tooltipText} events={['hover', 'click']} />
        </div>
    )
}

export {
    CodeSegment
}