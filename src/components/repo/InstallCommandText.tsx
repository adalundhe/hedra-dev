import { Tooltip } from 'react-tooltip';
import { RxCaretRight } from 'react-icons/rx';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io'
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'react-tooltip/dist/react-tooltip.css';


const InstallCommandText = () => {

    const installCommand = "pip install hedra";
    const [tooltipText, setTooltipText] = useState("Click me!");
    const [caretOpacity, setCaretOpacity] = useState(100);

    useEffect(() => {

        const interval = setInterval(() => {

            setCaretOpacity(caretOpacity === 100 ? 0 : 100)

            if (!inView){
                setTooltipText("Click me!")
            }

        }, 1000)

        return () => clearInterval(interval)

    }, [caretOpacity]);
    
    const { ref, inView } = useInView();

    return(
        <div className="text-center">   
            <button 
                className='cursor-pointer font-rany'
                id='copy-pip-install'
                type='button'
                onMouseEnter={()=> setTooltipText("Click me!")}
                onClick={() => {
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(installCommand);
                    } else {
                        document.execCommand("copy", true, installCommand);
                    }

                    setTooltipText("Copied!")
                }}
            >
                <code className="bg-[#14151a] text-white 2xl:text-4xl text-2xl py-3 px-6 rounded-sm flex justify-center" ref={ref}>
                    <div className='mr-2'>
                        {
                            tooltipText === "Click me!" && inView ? <BsCurrencyDollar /> : <RxCaretRight />
                        }
                    </div>
                        {
                            tooltipText === "Click me!" && inView ? installCommand : "Copied! Let's go!"
                        }
                    {
                        tooltipText === "Click me!" && inView ? 
                        <div className={`ml-2 opacity-${caretOpacity}`}>
                            <RxCaretRight />
                        </div> :
                        <div className='ml-2'>
                            <IoMdCheckmark />
                        </div>
                    }
                </code>
                <Tooltip anchorId="copy-pip-install" content={tooltipText} events={['hover', 'click']} />
            </button>
        </div>
    )
}


export {
    InstallCommandText
}