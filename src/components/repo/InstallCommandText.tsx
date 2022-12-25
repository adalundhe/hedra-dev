import { Tooltip } from 'react-tooltip';
import { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';


const InstallCommandText = () => {

    const installCommand = "pip install hedra";
    const [tooltipText, setTooltipText] = useState("Copy me!")
    


    return(
        <div className="text-center my-12">   
            <button className='h-full cursor-pointer font-rany'
                id='copy-pip-install'
                type='button'
                onMouseEnter={()=> setTooltipText("Copy me!")}
                onClick={() => {
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(installCommand);
                    } else {
                        document.execCommand("copy", true, installCommand);
                    }

                    setTooltipText("Copied!")
                }}
            >
                <code className="bg-[#14151a] text-white 2xl:text-4xl text-2xl py-3 px-6 rounded">
                {installCommand}
                </code>
            </button>
            <Tooltip anchorId="copy-pip-install" content={tooltipText} events={['hover', 'click']} />
        </div>
    )
}


export {
    InstallCommandText
}