
import { RxCaretRight, RxCaretDown } from 'react-icons/rx'
import { DocsLinkItem, DocsLinkSubsections } from "../../../data/types";
import { DocsNavItems } from './DocNavItems'
import { useState, useRef, useEffect } from "react";

const DocsNavSection = ({
    docsLink,
    docsSubsections,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    docsLink: DocsLinkItem,
    docsSubsections: DocsLinkSubsections,
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void
}) => {

    const sectionRef = useRef<HTMLInputElement>(null);
    const [sectionOpen, setSectionOpen] = useState(selectedSection == docsLink.sectionName);

    useEffect(() => {

        if (docsLink.sectionName === selectedSection && sectionRef.current){
            sectionRef.current.scrollTo(0,0);
        }

    }, [selectedSection, selectedSubSection])

    return (
        <div key={docsLink.sectionPath} className='py-4'>
            <div className="flex rounded py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-7" ref={sectionRef}>
                {
                    sectionOpen &&docsLink.sectionName === selectedSection  ?
                    <button
                        className="text-left flex items-center"
                        type="button"
                        onClick={() => {
                            setSectionOpen(docsLink.sectionName === selectedSection ? !sectionOpen : false)
                        }}
                    >
                        <div className="mr-2">
                            <RxCaretDown className={docsLink.sectionName === selectedSection ? "text-xl text-[#038aff]/70" : "text-xl text-[#14151a]"} />
                        </div>
                        <h3 className={
                            "text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit"
                        }>
                        {
                            docsLink.sectionName
                        }
                        </h3>
                    </button>  :
                    <button
                        className="text-left flex items-center"
                        type="button"
                        onClick={() => {
                            setSectionOpen(docsLink.sectionName === selectedSection ? !sectionOpen : true)
                            setSelectedSection(docsLink.sectionName)
                            setSelectedSubSection(
                                docsLink.sectionSubsections .includes(selectedSubSection) ? selectedSubSection :  docsLink.sectionSubsections[0] as string
                            )
                        }}
                    >
                        <div className="mr-2">

                            <RxCaretRight className="text-xl text-[#14151a]" /> 
                        </div>
                        <h3 className={
                            "text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit"
                        }>
                        {
                            docsLink.sectionName
                        }
                        </h3>
                    </button>
                }
            </div>
            <DocsNavItems 
                sectionName={docsLink.sectionName}
                selectedSection={selectedSection}
                selectedSubSection={selectedSubSection}
                open={sectionOpen}
                setSectionOpen={setSectionOpen}
                docsItemSubsections={docsSubsections[docsLink.sectionName] as string[]}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection}
            />
        </div>
    )
}


export {
    DocsNavSection
}