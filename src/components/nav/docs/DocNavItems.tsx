import { Fragment, useEffect } from "react"
import { Menu } from '@headlessui/react'
import { Transition } from "@headlessui/react"
import { useWindowDimensions } from '../../../hooks'
import Link from "next/link"
import { RxDotFilled, RxDot } from 'react-icons/rx'


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

    return (
        <Transition
            as={Fragment}
            appear={true}
            show={sectionName === selectedSection && open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
            <div className="font-rany hover:bold hover:text-[#038aff]/70 text-2xl">
                <div className="bg-[#eeeeee] flex flex-col">
                {
                    docsItemSubsections?.map((subSectionName: string) => {

                        const subSectionStyle = subSectionName === selectedSubSection ? 
                                    'text-xl text-[#038aff]/70 hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-medium underline' : 'text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-light' ;
                        
                        const caretStyle = subSectionName === selectedSubSection ? 
                            "h-full text-xl mr-2 text-[#038aff]/80 hover:text-[#038aff]/70" : "h-full text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70";

                        return (
                            <div
                                key={`${sectionName}-${subSectionName}-Section-Guide`}
                                className='pb-2'
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
                                        <p className={subSectionStyle}>{subSectionName}</p>
                                    </button>
                                </div>
                            </div>
                        )

                    })
                }
                </div>
            </div>
        </Transition>
    )
 }


 export {
    DocsNavItems
 }