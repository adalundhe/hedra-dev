import { RxCaretRight } from 'react-icons/rx'
import { useState, useEffect } from 'react';
import { asBuffer } from '../../../tools';

const CodeShortSegment = ({
    children,
    size
}: {
    children: string,
    size?: string
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

    const heightMap: {[key: string]: string} = {
        'small': '60px',
        'medium': '75px',
        'large': '90px'
    }

    const iconSizeMap: {[key: string]: string} = {
        'small': 'lg:text-xl text-lg',
        'medium': 'lg:text-2xl text-xl',
        'large': 'lg:text-3xl text-2xl'
    }

    const textSizeMap: {[key: string]: string} = {
        'small': 'text-lg',
        'medium': 'text-xl',
        'large': 'text-2xl'
    }
    
    const segmentHeight = heightMap[size as string] ?? '90px';
    const iconSize = iconSizeMap[size as string] ?? '3xl';
    const textSize = textSizeMap[size as string] ?? 'text-2xl'

    return (
        <div className={`my-6 flex`}>
            <div className={`font-informe font-lighter tracking-wider w-full flex items-start overflow-hidden`}>
                <code 
                    className={`bg-[#2e3131] w-full h-[${segmentHeight}] text-[#eeeeee] ${textSize} overflow-x-auto flex items-center rounded border border-[3px] border-transparent`}
                >
                    <div className={`mx-4 ${iconSize}`}>
                       <RxCaretRight/>
                    </div>
                    <p className='flex flex-col justify-center break-keep whitespace-nowrap w-full text-left mt-1'>{
                        sectionActive ? "Copied!" + buffer : sectionText
                    }</p>
                </code>
            </div>
        </div>
    )
}


 export {
    CodeShortSegment
 }