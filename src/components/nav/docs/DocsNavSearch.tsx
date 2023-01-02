import { GoSearch } from 'react-icons/go'
import { DocsLinkItem, DocsLinkSubsections } from "../../../data/types";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDocsSearch, useKeyCommand, useFocus } from '../../../hooks';
import { AiFillMacCommand } from 'react-icons/ai'
import Link from 'next/link';
import { useRouter } from 'next/router';


const DocsNavSearch = ({
    setSelectedSection,
    setSelectedSubSection,
    setSearchVisible
}: {
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void,
    setSearchVisible(searchVisible: boolean): void
}) => {
    
    const { query, setQuery, matches } = useDocsSearch();

    const { isFocused, setIsFocused, ref } = useFocus<HTMLInputElement>();
    const router = useRouter();

    useEffect(() => {
        setSearchVisible(isFocused)
    }, [isFocused])

    useKeyCommand({
        command: ["Control", 'k'],
        callback: () => {
            setIsFocused(true)
            ref.current?.focus();
            ref.current?.click();
        }
    })

    useKeyCommand({
        command: ['Escape'],
        callback: () => {
            setIsFocused(false);
            ref.current?.blur();
        }
    })

    return (
        <div className="w-full px-8 relative inline-block">
            <form className='flex flex-col'>
               <div className={`flex border ${isFocused ? 'border-[#038aff]/70': 'border-transparent'} border-[2px] rounded bg-[#2e3131]/5 w-full text-lg `}>
                    <div className='flex items-center justify-center max-w-fit mx-2'>
                        <GoSearch className={`${isFocused ? 'text-[#2e3131]' : 'text-[#2e3131]/50'} shadow-2xl`} />
                    </div>
                    <div className='w-full'>
                        <input 
                            ref={ref}
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
                <div className='max-h-[30vh] overflow-x-hidden overflow-y-scroll mt-2'>
                {
                    Object.keys(matches).sort().map((matchName: string, idx: number) => {
                        
                        const sectionName = matches[matchName]?.section as string;
                        const subSectionName = matches[matchName]?.subSection as string;
                        return (
                            <div key={`search-item-${idx}`}>
                                <button 
                                    className="text-left flex items-center rounded-sm py-2 pl-2 hover:bg-[#038aff]/5 w-full"
                                    type="button" 
                                    onClick={() => {
                                        setSelectedSection(sectionName);
                                        setSelectedSubSection(subSectionName);
                                        setQuery("");
                                        setIsFocused(false);
                                        ref.current?.blur();
                                        router.push(`${sectionName}/#${subSectionName.toLowerCase().replace(/\s+/g, '-')}`)
                                    }}
                                >   
                                    <p className='h-full text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70'>{matches[matchName]?.name}</p>
                                </button>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}


export {
    DocsNavSearch
}