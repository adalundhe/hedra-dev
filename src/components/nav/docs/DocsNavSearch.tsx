import { GoSearch } from 'react-icons/go'
import { DocsLinkItem, DocsLinkSubsections } from "../../../data/types";
import { useEffect, useState } from 'react';
import { useDocsSearch, useKeyCommand, useFocus } from '../../../hooks';
import { AiFillMacCommand } from 'react-icons/ai'
import Link from 'next/link';


const DocsNavSearch = ({
    docsData,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection,
    setSearchVisible
}: {
    docsData: {
        all: DocsLinkItem[],
        subsections: DocsLinkSubsections
    },
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void,
    setSearchVisible(searchVisible: boolean): void
}) => {
    
    const { query, setQuery, matches } = useDocsSearch();

    const { isFocused, setIsFocused, ref } = useFocus();

    useEffect(() => {
        setSearchVisible(isFocused)
        setQuery("")
    }, [isFocused])

    useKeyCommand({
        command: ["control", 'k'],
        callback: () => setIsFocused(true)
    })

    return (
        <div className="w-full px-8 relative inline-block">
            <form className='flex flex-col'>
               <div className={`flex border ${isFocused ? 'border-[#038aff]/70': 'border-transparent'} border-[2px] rounded bg-[#2e3131]/5 w-full text-lg `} ref={ref}>
                    <div className='flex items-center justify-center max-w-fit mx-2'>
                        <GoSearch className={`${isFocused ? 'text-[#2e3131]' : 'text-[#2e3131]/50'} shadow-2xl`} />
                    </div>
                    <div className='w-full'>
                        <input 
                            type="text"
                            onChange={(event) => setQuery(event.target.value)}
                            onFocus={() => setIsFocused(true)}     
                            placeholder="search" 
                            className={`w-full outline-none border-[2px] py-2 px-2 rounded bg-transparent ${isFocused ? 'text-[#2e3131]' : 'text-[#2e3131]/50'}`} 
                            id="nav-search-input"
                            enterKeyHint="search"
                            value={query}
                        />
                    </div>
                    <div className={`max-w-fit mx-2 text-md text-[#2e3131]/50 font-rany flex items-center ${isFocused ? 'invisible' : ''}`}>
                        <AiFillMacCommand />
                        <p className='ml-2'>+</p>
                        <p className='ml-2'>k</p>
                    </div>
               </div>
            </form>
            <div className='w-full'>
                <div className='max-h-[50vh] overflow-x-hidden overflow-y-scroll mt-2'>
                {
                    Object.keys(matches).sort().map(matchName => 
                        <div className='text-xl rounded-sm w-full' ref={ref}>
                            <button 
                                className='mr-4 w-[95%] hover:bg-[#038aff]/5 hover:text-[#038aff]/70 py-4 px-2 text-left'
                                onClick={() => {
                                    
                                    console.log(matches[matchName]?.section , matches[matchName]?.subSection)
                                    setIsFocused(false)
                                }}
                            >
                                <Link href={matches[matchName]?.link as string} className='w-full h-full'>
                                    <p>{matches[matchName]?.name}</p>
                                </Link>
                            </button>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}


export {
    DocsNavSearch
}