import { GoSearch } from 'react-icons/go'
import { DocsLinkItem, DocsLinkSubsections } from "../../../store/types";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDocsSearch, useKeyCommand, useFocus } from '../../../hooks';
import { AiFillMacCommand } from 'react-icons/ai'
import { useRouter } from 'next/router';
import { useDocsStore, useScrollStore } from '../../../store';
import { shallow } from 'zustand/shallow'


const DocsNavSearch = ({
    setSearchVisible
}: {
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

    const { 
        section,
        subsection,
        refs,
        subsections,
        navRefs,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        refs: state.subSectionRefs,
        subsections: state.subsections,
        navRefs: state.docsNavRefs,
        setSubSections: state.setSubSections,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection
    }), []), shallow)


    const {
        scrollRef,
        setLastScrollY

    } = useScrollStore(useCallback((state) => ({
        scrollRef: state.scrollRef,
        setLastScrollY: state.setLastScrollY
    }), []))
    

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

                        let subSectionSlug = subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
                        if (subSectionSlug[subSectionSlug.length -1] === '-'){
                            subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
                        }
                        
                        return (
                            <div key={`search-item-${idx}`}>
                                <button 
                                    className="text-left flex items-center rounded-sm py-2 pl-2 hover:bg-[#038aff]/5 w-full"
                                    type="button" 
                                    onClick={() => {
                                        
                            
                                        setSection(sectionName);
                                        setSubSection(subSectionName);
                                        
                                        setQuery("");
                                        setIsFocused(false);
                                        ref.current?.blur();

                                        navRefs[subSectionName]?.scrollRef?.current?.scrollIntoView({ 
                                            inline: 'start',
                                            block: 'start',
                                            behavior: 'smooth'
                                         })

                                        if (sectionName !== section || subSectionName !== subsection){
                                            const selectedSubSectionIdx = subsections[sectionName]?.indexOf(subSectionName) as number
                                            const sectionHeight = subsections[sectionName]?.slice(0, selectedSubSectionIdx).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

                                            setLastScrollY(sectionHeight)
                                
                                            refs[subSectionName]?.scrollRef?.current?.scrollIntoView({ inline: 'nearest', block: 'center' });
                                        }

                                        
                                        
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