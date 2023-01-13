import { HiClipboardCopy, HiClipboardCheck } from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { asBuffer } from '../../../tools';

const CodeSegmentCopyable = ({
    children
}: {
    children: string
}) => {

    const [sectionActive, setSectionActive] = useState(false);
    const [sectionText, setSectionText] = useState(children);
    const buffer = asBuffer(children);

    useEffect(() => {

      
        
        const interval = setInterval(() => {

            setSectionActive(false);

        }, 3000)

        return () => clearInterval(interval)

    }, []);
    


    return (
        <div className={`my-6 flex`}>
            <button
                className={`cursor-pointer font-informe font-lighter tracking-wider w-full flex items-start overflow-hidden`}
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
                    className={`bg-[#2e3131] w-full h-[90px] text-[#eeeeee] text-2xl overflow-x-auto flex items-center rounded border border-[3px] ${sectionActive ? 'border-[#038aff]/90' : 'border-transparent lg:hover:border-[#038aff]/60'}`}
                >
                    <div className={`mx-4 lg:text-3xl text-2xl`}>
                        {
                            sectionActive ? <HiClipboardCheck/> : <HiClipboardCopy/>
                        }
                    </div>
                    <p className='flex flex-col justify-center break-keep whitespace-nowrap w-full text-left mt-1'>{
                        sectionActive ? "Copied!" + buffer : sectionText
                    }</p>
                </code>
            </button>
        </div>
    )
}


 export {
    CodeSegmentCopyable
 }