import { HiClipboardCopy, HiClipboardCheck } from 'react-icons/hi'
import { useState, useEffect } from 'react';

const CodeSegmentCopyable = ({
    children
}: {
    children: string
}) => {

    const [sectionActive, setSectionActive] = useState(false);

    useEffect(() => {

      
        
        const interval = setInterval(() => {

            setSectionActive(false);

        }, 3000)

        return () => clearInterval(interval)

    }, []);
    


    return (
        <div className={`my-6 flex`}>
            <button
                className={`cursor-pointer font-rany  w-full`}
                id='copy-pip-install'
                type='button'
                onClick={() => {

                    setSectionActive(true)
                    if ("clipboard" in navigator) {
                        navigator.clipboard.writeText(children);
                    } else {
                        document.execCommand("copy", true, children);
                    }

                }}
            >
                <code 
                    className={`h-[80px] bg-[#2e3131] text-[#eeeeee] text-lg py-3 pr-6 flex items-center w-full rounded border border-[3px]  ${sectionActive ? 'border-[#038aff]/70' : 'border-transparent'} `}
                >
                    <div className={`mx-4 text-[28px]`}>
                        {
                            sectionActive ? <HiClipboardCheck/> : <HiClipboardCopy/>
                        }
                    </div>
                    <p className='flex flex-col justify-center items-center text-left'>{
                        sectionActive ? "Copied!" : children
                    }</p>
                </code>
            </button>
        </div>
    )
}


 export {
    CodeSegmentCopyable
 }