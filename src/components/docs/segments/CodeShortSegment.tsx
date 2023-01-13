import { BsCurrencyDollar } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import 'react-tooltip/dist/react-tooltip.css';

const CodeShortSegment = ({
    children
}: {
    children: string
}) => {


    const [caretOpacity, setCaretOpacity] = useState(100);

    useEffect(() => {

        const interval = setInterval(() => {

            setCaretOpacity(caretOpacity === 100 ? 0 : 100)

        }, 1000)

        return () => clearInterval(interval)

    }, [caretOpacity]);
    

    return (
        <div className="my-6">
            <code className="font-informe font-lighter tracking-wider bg-[#2e3131] text-[#eeeeee] text-xl py-3 pr-6 rounded flex items-center">
                <div className={`ml-2`}>
                    <BsCurrencyDollar /> 
                </div>
                <p className='flex items-center'>{children}</p>
                <div className={`ml-4 h-full flex items-center opacity-${caretOpacity}`}>
                    <div className='py-[14px] px-[8px] bg-[#eeeeee]'></div>
                </div>
            </code>
        </div>
    )
}


 export {
    CodeShortSegment
 }