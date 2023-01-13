import { DocsArticle } from "./docs";
import { useState, useContext, useEffect, useCallback, useRef, RefObject, useMemo, UIEventHandler, UIEvent } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions, useScrollDirection } from '../hooks'
import { DocsSectionGuide } from "./docs";
import { DocsNavMobile } from "./nav";
import { Footer } from "./footer";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useDocsStore, useScrollStore } from "../store";
import shallow from 'zustand/shallow'
import { useRouter } from "next/router";
import Articles from "./docs/pages";


const DocsPageView = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { isOpen, docsNavOpen } = useContext(NavOpenContext);

    const [ready, setReady] = useState(false);

    const router = useRouter();

    const { article } = router.query;


    const { 
        articles,
        section,
        subsection,
        subsections,
        refs,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        articles: state.articles,
        subsections: state.subsections,
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        refs: state.subSectionRefs,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection,
        setRefs: state.setSubSectionRefs
    }), []), shallow)

    const {
        clickedScroll,
        lastScrollY,
        scrollThreshold,
        scrollTimer,
        mobileLastScrollY,
        docsNavTimer,
        setScrollDirection,
        setLastScrollY,
        setScrollRef,
        setClickedScroll,
        setScrollTimer,
        setShowMobileDocsNav,
        setMobileLastScrollY,
        setDocsNavTimer

    } = useScrollStore(useCallback((state) => ({
        clickedScroll: state.clickedScroll,
        scrollDirection: state.scrollDirection,
        lastScrollY: state.lastScrollY,
        scrollThreshold: state.scrollThreshold,
        scrollTimer: state.scrollTimer,
        lastDirectionScrollY: state.lastDirectionScrollY,
        mobileLastScrollY: state.mobileLastScrollY,
        docsNavTimer: state.docsNavTimer,
        setScrollDirection: state.setScrollDirection,
        setLastScrollY: state.setLastScrollY,
        setScrollRef: state.setScrollRef,
        setClickedScroll: state.setClickedScroll,
        setScrollTimer: state.setScrollTimer,
        setShowMobileDocsNav: state.setShowMobileDocsNav,
        setMobileLastScrollY: state.setMobileLastScrollY,
        setDocsNavTimer: state.setDocsNavTimer
    }), []))

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {

        if (router.isReady){

            const routerPath = router.asPath.split('#')
            const slugs: {[articleName: string]: {[slug: string]: string}} = articles.reduce((slugs, article) => ({
                ...slugs,
                [article.sectionName]: article.slugs
            }), {})

            const articleSlugs = slugs[article as string] ?? {};

            
            const subsectionPath = routerPath.length > 1 ? articleSlugs[routerPath.at(1) as string] as string : subsection;
            ref.current?.focus({preventScroll: true});
    
            setSection(article as string);
            setSubSection(subsectionPath as string);

            setScrollRef(ref);

            setReady(true);
        }
        
    }, [router.isReady])


    const currentSubsection = useMemo(() => {

        refs[subsection]?.scrollRef?.current?.focus({preventScroll: true})
        let subSectionSlug = subsection?.toLowerCase().replace(/[^A-Za-z0-9]/g, '-') ?? ""
        if (subSectionSlug[subSectionSlug.length -1] === '-'){
            subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
        }

        if (typeof window !== "undefined"){

            history.pushState(window.history.state, "page 2", `${section}#${subSectionSlug}`);
        }

        const currentSubsections = subsections[section] ?? [];
        const currentSubSectionIdx = currentSubsections?.indexOf(subsection) as number
        let sectionHeight = subsections[section]?.slice(0, currentSubSectionIdx).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;
        const heightBuffer = (refs[subsection]?.height ?? 0)/2
        
        if ((sectionHeight + heightBuffer) < (ref.current?.clientHeight ?? 0)){
            sectionHeight += heightBuffer;
        }
1
        const nextSubSection = currentSubsections[(currentSubSectionIdx + 1) < currentSubsections.length ? (currentSubSectionIdx + 1) : currentSubsections.length - 1] as string;
        const previousSubSection = currentSubsections[(currentSubSectionIdx - 1) > 0 ? (currentSubSectionIdx - 1) : 0] as string

        return ({
            height: sectionHeight,
            next: nextSubSection,
            previous: previousSubSection,
            slug: subSectionSlug
        });

    }, [subsection, section]);
    

    const docsSectionNames = articles.map(article => article.sectionName);
    const currentSectionIdx = docsSectionNames.indexOf(section);
    const previousSection = currentSectionIdx - 1 >= 0 ? docsSectionNames[currentSectionIdx - 1] : undefined;
    const nextSection = currentSectionIdx + 1 < docsSectionNames.length ? docsSectionNames[currentSectionIdx + 1] : undefined;

    const selectedArticle = useMemo(() => Articles[section] ?? <div></div>, [section]);

    return (
        <>
            <DocsNavMobile />
           <div 
                className={`h-screen lg:mt-10 grid grid-cols-[auto] lg:grid-cols-[24rem_auto] 2xl:grid-cols-[24rem_auto_24rem] overflow-x-hidden ${isOpen ?  'invisible' : ''} ${docsNavOpen ? 'invisible' : ''}`}
                ref={ref}
                onWheel={(() => {

                    if (scrollTimer !== null){
                        clearTimeout(scrollTimer)
                        setScrollTimer(null)
                    } 

                    const scrollY = ref.current?.scrollTop ?? 0;
                    const scrollDistance = Math.abs(scrollY - lastScrollY);

                    const nextScrollDir = scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : "none";

                    if (scrollDistance >= scrollThreshold) {
                        
                        setScrollDirection(nextScrollDir);
                        setLastScrollY(scrollY > 0 ? scrollY : 0)
                    }

                    if (nextScrollDir === 'down' && lastScrollY >= currentSubsection.height ){
                        setSubSection(currentSubsection.next)

                    } else if (nextScrollDir === 'up' && lastScrollY <= currentSubsection.height){
                        setSubSection(currentSubsection.previous)
                    }
                })}
                onScroll={(event: UIEvent<HTMLDivElement>) => {

                    if (clickedScroll){
                        event.stopPropagation();
                        event.preventDefault();
                        setShowMobileDocsNav(true);
                    } else {

                        if (docsNavTimer !== null){
                            clearTimeout(docsNavTimer)
                            setDocsNavTimer(null)

                        }

                        const scrollY = ref.current?.scrollTop ?? 0;
                        const scrollDistance = Math.abs(scrollY - mobileLastScrollY);

                        if (scrollDistance >= 150) {
                            setMobileLastScrollY(scrollY > 0 ? scrollY : 0)
                        }

                        if (scrollY > mobileLastScrollY ){

                            const hideTimeout = setTimeout(() => {
                                setShowMobileDocsNav(false);
                            }, 250)
                            
                            setDocsNavTimer(hideTimeout);

                        } else {

                            const hideTimeout = setTimeout(() => {
                                setShowMobileDocsNav(true);
                            }, 250)
                            
                            setDocsNavTimer(hideTimeout);

                        }

                    }

              
                }}
            >
                <DocsNav /> 
                <div className={`bg-[#eeeeee] min-w-0 lg:pl-6 lg:mt-10`}>
                    <div className="max-w-7xl mx-auto px-5 sm:px-12 break-words block">
                        <DocsArticle>
                        {
                            router.isReady ? selectedArticle : <div></div>
                        }
                        </DocsArticle>
                    </div> 
                    <div className="max-w-7xl mx-auto px-5 sm:px-12 mb-12">
                        <div className="max-w-6xl ml-0 2xl:mx-auto overflow-x-hidden lg:grid grid-cols-2 flex flex-col items-center justify-center">
                            <div className="flex items-center justify-self-start">
                            {
                                previousSection ? 
                                <button 
                                    className="px-4 mx-4 w-[20rem] h-[8rem] font-rany text-2xl flex justify-start items-center hover:bg-[#2e3131]/5 rounded-sm break-words"
                                    onClick={() => {

                                        setClickedScroll(true)

                                        const sectionHeight = 0;
                                        const selectedSubSection = subsections[previousSection]?.at(0) as string;

                                        setLastScrollY(sectionHeight);
                                        setSection(previousSection);
                                        setSubSection(selectedSubSection);
                                        refs[previousSection]?.scrollRef?.current?.scrollTo({top: 0});

                                        router.push(`/docs/${section}#${selectedSubSection}`)
                                    }}
                                >
                                    <RxCaretLeft />
                                    <div className="flex flex-col justify-center items-start justify-center ml-6">
                                        
                                        <p>Previous</p>
                                        <a href={`#${subsections[previousSection]?.at(0)}`}>
                                            <p className="mt-2 text-[#038aff] text-left text-[1.35rem]">{previousSection}</p>      
                                        </a>  
                                    </div>
                                </button> : null
                            }
                            </div>
                            <div className="flex items-center justify-self-end">
                            {
                                nextSection ? 
                                <button 
                                    className="px-4 mx-4 w-[20rem] h-[8rem] font-rany text-2xl flex justify-end items-center hover:bg-[#2e3131]/5 rounded-sm break-words"
                                    onClick={() => {

                                        setClickedScroll(true)

                                        const sectionHeight = 0;
                                        const selectedSubSection = subsections[nextSection]?.at(0) as string;

                                        setLastScrollY(sectionHeight);
                                        setSection(nextSection);
                                        setSubSection(selectedSubSection);
                                        refs[nextSection]?.scrollRef?.current?.scrollTo({top: 0});

                                        router.push(`/docs/${section}#${selectedSubSection}`)
                                    }}
                                >
                                    <div className="flex flex-col justify-center items-end justify-center mr-6">
                                        
                                        <p>Next</p>
                                        <p className="mt-2 text-[#038aff] text-right text-[1.35rem]">{nextSection}</p>        
                                    </div>
                                    <RxCaretRight />
                                </button> : null
                            }
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto lg:px-12 h-fit">
                        <div className="max-w-6xl ml-0 2xl:mx-auto overflow-hidden h-full">
                            <Footer/>
                        </div>
                    </div>
                </div>
                <DocsSectionGuide />
            </div>
        </>
        
    )
}


export {
    DocsPageView
}