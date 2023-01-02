import { RxDotFilled, RxDot } from 'react-icons/rx';
import { useInView } from "react-intersection-observer"
import { useEffect, useLayoutEffect, useRef } from 'react';


const DocsNavItem = ({ 
    sectionName,
    selectedSection,
    subSectionName,
    selectedSubSection,
    docsItemSubsections,
    setSelectedSection,
    setSelectedSubSection
 }: {
    sectionName: string,
    selectedSection: string,
    subSectionName: string,
    docsItemSubsections: string[]
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void
 }) => {

    const subSectionStyle = subSectionName === selectedSubSection ? 
                'text-xl text-[#038aff]/70 hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-medium underline' : 'text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-light' ;
    
    const caretStyle = subSectionName === selectedSubSection ? 
        "h-full text-xl mr-2 text-[#038aff]/80 hover:text-[#038aff]/70" : "h-full text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70";

    const subSectionSlug = `#${subSectionName.toLowerCase().replace(/\s+/g, '-')}`;

    const linkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (selectedSubSection === subSectionName){
            linkRef.current?.scrollIntoView({behavior: 'smooth', block: "center"});
        }

    }, [selectedSection, selectedSubSection]);


    return (
        <div
            className='pb-2'
            ref={linkRef}
        >
            <div className={`${subSectionName === selectedSubSection ? 'bg-[#038aff]/5 rounded-sm py-2' : ''}`}>
                <button 
                    className="w-fit text-left flex items-center"
                    type="button" 
                    onClick={() => {
                        setSelectedSection(sectionName)
                        setSelectedSubSection(subSectionName)
                    }}
                >
                    <div className={caretStyle}>
                        {
                            subSectionName === selectedSubSection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                        }
                    </div>
                    <a href={subSectionSlug} id={subSectionSlug}>
                        <p className={subSectionStyle}>{subSectionName}</p>
                    </a>
                </button>
            </div>
        </div>
    )

}

export {
    DocsNavItem
}