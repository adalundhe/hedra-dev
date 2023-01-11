import { Transition } from "@headlessui/react";
import { DocsNavSection } from "./DocsNavSection";
import { DocsLinkItem } from "../../../store/types";
import { NavOpenContext } from "../main/NavProvider"
import { useContext, Fragment, useState, useCallback } from "react"
import { useWindowDimensions } from '../../../hooks'
import { Menu } from '@headlessui/react'
import { DocsNavSearch } from "./DocsNavSearch";
import { GrClose } from 'react-icons/gr'
import { GiArchiveResearch } from 'react-icons/gi'
import { useDocsStore, useScrollStore } from "../../../store";
import shallow from 'zustand/shallow'
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig()


const DocsNavMobile = () => {

    const { width } = useWindowDimensions();
    const [searchVisible, setSearchVisible] = useState(false);
    const { isOpen, docsNavOpen, setDocsNavOpen } = useContext(NavOpenContext);

    const { 
        articles
    } = useDocsStore(useCallback((state) => ({
        articles: state.articles
    }), []), shallow)

    const {
        scrollDirection
    } = useScrollStore(useCallback((state) => ({
        scrollDirection: state.scrollDirection
    }), []))

    return (
        
            <Menu as="div" className={`lg:hidden inline-block w-full text-left ${scrollDirection !== 'down' || docsNavOpen ? 'mt-6' : 'mt-1'} sticky top-0 z-50  ${docsNavOpen && width <= 1024 ? 'bg-[#eeeeee]' : ''} ${isOpen ? 'hidden' : ''}`}>
                <div className="flex justify-center">
                    <Transition  
                        as={Fragment}
                        show={scrollDirection !== "down" || docsNavOpen}
                        enter="transform transition ease-in-out duration-100"
                        enterFrom="opacity-0 -translate-y-1/3"
                        enterTo="opacity-100 translate-y-0"
                        leave="transform transition ease-in-out duration-100"
                        leaveFrom="opacity-100 translate-y-0 "
                        leaveTo="-translate-y-1/3 opacity-0"
                    >
                        <Menu.Button className="inline-flex justify-center rounded px-2 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none">
                            {
                                !docsNavOpen ?
                                <GiArchiveResearch 
                                    className="text-[3rem] lg:hover:text-[#038aff]/80" 
                                    onClick={() => setDocsNavOpen(true)}
                                /> :  
                                <GrClose className="text-[3rem] lg:hover:text-[#038aff]/80 lg:text-[#2e3131] text-[#038aff]/80" onClick={() => setDocsNavOpen(false)}/>
                            }
                        </Menu.Button>
                    
                    </Transition>
                    
                </div>
                <Transition
                    as={Fragment}
                    appear={true}
                    show={docsNavOpen && width <= 1024 }
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className="w-full py-6 px-2 flex text-center text-[#2e3131]">
                        <div className="flex flex-col font-rany items-center w-full overflow-y-scroll">
                            <div className="flex flex-col justify-center text-left w-full h-full">
                                    <div className="py-4 px-8 w-full">

                                        <h3 className="text-lg">Version: {publicRuntimeConfig.hedraVersion}</h3>
                                    </div>
                                    <DocsNavSearch 
                                        setSearchVisible={setSearchVisible}
                                    />
                                    <div className={`px-8 h-[30vh] w-full ${searchVisible ? 'invisible' : ''}`}>
                                    {
                                        articles.map((docsLink: DocsLinkItem, idx: number) => 
                                            <div key={`docs-group-mobile-${idx}`}>
                                                <DocsNavSection 
                                                    docsLink={docsLink}
                                                />
                                            </div>
                                        )
                                    }
                                    </div>
                                </div>
                        </div>
                    </div>
                </Transition>
            </Menu>
    )
}


export { 
    DocsNavMobile
}