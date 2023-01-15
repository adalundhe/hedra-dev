import { Fragment, useCallback, useEffect } from "react"
import { Transition } from "@headlessui/react"
import { useWindowDimensions } from '../../../hooks'
import { DocsNavItem } from "./DocsNavItem"
import { useDocsStore } from "../../../store"
import { shallow } from 'zustand/shallow'


const DocsNavItems = ({ 
    sectionName,
    open,
    setSectionOpen,
    docsItemSubsections
 }: {
    sectionName: string,
    open: boolean,
    setSectionOpen: (open: boolean) => void,
    docsItemSubsections: string[]
 }) => {

    const { 
        section,
        subsection,
    } = useDocsStore(useCallback((state) => ({
        section: state.selectedSection,
        subsection: state.selectedSubSection
    }), []), shallow)
    
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 1024 || section !== sectionName){
            setSectionOpen(false)
        }
    }, [width])

    useEffect(() => {

        if (sectionName === section){
            setSectionOpen(true)
        }

    }, [section, subsection])

    return (
        <Transition
            as={Fragment}
            show={sectionName === section && open}
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
                        <div key={`${sectionName}-${subSectionName}-Section-Guide`} className='my-1'>
                            <DocsNavItem 

                                sectionName={sectionName}
                                subSectionName={subSectionName}
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