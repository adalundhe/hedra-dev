import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { HiClipboardCopy, HiClipboardCheck } from 'react-icons/hi'


const InstallCommandText = () => {

    const installCommand = "pip install hedra";
    const [sectionActive, setSectionActive] = useState(false);
    useEffect(() => {

      
        
        const interval = setInterval(() => {

            setSectionActive(false);

        }, 3000)

        return () => clearInterval(interval)

    }, []);
    
    
    const { ref, inView } = useInView();

    return(
        <div className="text-center w-screen h-[50vh]">   
            <button 
                className='cursor-pointer font-rany'
                id='copy-pip-install'
                type='button'
                onClick={() => {

                    setSectionActive(true)
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(installCommand);
                    } else {
                        document.execCommand("copy", true, installCommand);
                    }

                }}
            >
                <code 
                    className={`bg-[#2e3131] text-[#eeeeee] 2xl:text-4xl text-2xl py-3 px-6 rounded flex justify-center border border-[3px] ${sectionActive ? 'border-[#038aff]/70' : 'border-transparent'}`} 
                    ref={ref}
                >
                    <div className='mr-2'>
                        {
                            sectionActive && inView ? <HiClipboardCheck /> : <HiClipboardCopy />
                        }
                    </div>
                        {
                            sectionActive && inView ? "Copied! Let's go!" : installCommand
                        }
                </code>
            </button>
        </div>
    )
}


export {
    InstallCommandText
}