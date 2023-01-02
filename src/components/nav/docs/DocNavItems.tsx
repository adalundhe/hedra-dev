import { Fragment, useEffect } from "react"
import { Transition } from "@headlessui/react"
import { useWindowDimensions } from '../../../hooks'
import { DocsNavItem } from "./DocsNavItem"


const DocsNavItems = ({ 
    sectionName,
    selectedSection,
    selectedSubSection,
    open,
    setSectionOpen,
    docsItemSubsections,
    setSelectedSection,
    setSelectedSubSection
 }: {
    sectionName: string,
    selectedSection: string,
    selectedSubSection: string,
    open: boolean,
    setSectionOpen: (open: boolean) => void,
    docsItemSubsections: string[]
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void
 }) => {
    
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 1024 || selectedSection !== sectionName){
            setSectionOpen(false)
        }
    }, [width])

    useEffect(() => {

        if (sectionName === selectedSection){
            setSectionOpen(true)
        }

    }, [selectedSection, selectedSubSection])

    return (
        <Transition
            as={Fragment}
            show={sectionName === selectedSection && open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 cale-95"
            >
            <div className="font-rany hover:bold hover:text-[#038aff]/70 text-2xl">
                <div className="bg-[#eeeeee] flex flex-col">
                {
                    docsItemSubsections?.map((subSectionName: string) => 
                        <div key={`${sectionName}-${subSectionName}-Section-Guide`}>
                            <DocsNavItem 

                                sectionName={sectionName}
                                selectedSection={selectedSection}
                                subSectionName={subSectionName}
                                selectedSubSection={selectedSubSection}
                                docsItemSubsections={docsItemSubsections}
                                setSelectedSection={setSelectedSection}
                                setSelectedSubSection={setSelectedSubSection}
                            />
                        </div>
                    )
                }
                </div>
            </div>
        </Transition>
    )
 }


 export {
    DocsNavItems
 }