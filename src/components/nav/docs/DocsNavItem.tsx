import { RxDotFilled, RxDot } from 'react-icons/rx';
import { useInView } from "react-intersection-observer"
import { useCallback, useEffect, useRef } from 'react';
import shallow from 'zustand/shallow'
import { useDocsStore } from '../../../store';


const DocsNavItem = ({ 
    sectionName,
    subSectionName
 }: {
    sectionName: string,
    subSectionName: string
 }) => {

    const { 
        section,
        subsection,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection
    }), []), shallow)
    
    const subSectionStyle = subSectionName === subsection ? 
                'text-xl text-[#038aff]/70 hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-medium underline' : 'text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-light' ;
    
    const caretStyle = subSectionName === subsection ? 
        "h-full text-xl mr-2 text-[#038aff]/80 hover:text-[#038aff]/70" : "h-full text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70";

    let subSectionSlug = `#${subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')}`;
    if (subSectionSlug[subSectionSlug.length -1] === '-'){
        subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
    }


    const linkRef = useRef<HTMLAnchorElement>(null);

    const { ref, inView } = useInView();

    useEffect(() => {
        

        if (subsection === subSectionName && !inView){
            linkRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
        }

    }, [section, subsection, inView]);


    return (
        <div
            className='pb-2'
        >
            <div className={`${subSectionName === subsection ? 'bg-[#038aff]/5 rounded-sm py-2' : ''}`}>
                <button 
                    className="w-fit text-left flex items-center"
                    type="button" 
                    onClick={() => {
                        setSection(sectionName)
                        setSubSection(subSectionName)
                    }}
                >
                    <div className={caretStyle}>
                        {
                            subSectionName === subsection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                        }
                    </div>
                    <a href={subSectionSlug} id={subSectionSlug} ref={linkRef}>
                        <p ref={ref} className={subSectionStyle}>{subSectionName}</p>
                    </a>
                </button>
            </div>
        </div>
    )

}

export {
    DocsNavItem
}