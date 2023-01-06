import { DocsArticle } from "./docs";
import { useState, useContext, useEffect, useCallback, useRef, RefObject, useMemo, UIEventHandler, UIEvent } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions, useScrollDirection } from '../hooks'
import { Footer } from "./footer";
import { DocsSectionGuide } from "./docs";
import { DocsNavMobile } from "./nav";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useDocsStore, useScrollStore } from "../store";
import shallow from 'zustand/shallow'
import { useRouter } from "next/router";


const DocsPageView = ({
    children
}: {
    children: JSX.Element
}) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { isOpen } = useContext(NavOpenContext);

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
        scrollDirection,
        lastScrollY,
        scrollThreshold,
        setScrollDirection,
        setLastScrollY

    } = useScrollStore(useCallback((state) => ({
        scrollDirection: state.scrollDirection,
        lastScrollY: state.lastScrollY,
        scrollThreshold: state.scrollThreshold,
        setScrollDirection: state.setScrollDirection,
        setLastScrollY: state.setLastScrollY
    }), []))

    const ref = useRef<HTMLDivElement>(null);
    const trackingRef = useRef<HTMLDivElement>(null);

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
    
            setSection(article as string)
            setSubSection(subsectionPath as string)

            setReady(true)
        }
        
    }, [router.isReady])


    const currentSubsection = useMemo(() => {
        let subSectionSlug = subsection?.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
        if (subSectionSlug[subSectionSlug.length -1] === '-'){
            subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
        }

        if (typeof window !== "undefined"){

            history.pushState(window.history.state, "page 2", `${section}#${subSectionSlug}`);
        }

        const currentSubsections = subsections[section] ?? [];
        const currentSubSectionIdx = currentSubsections?.indexOf(subsection) as number
        const sectionHeight = subsections[section]?.slice(0, currentSubSectionIdx + 1).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

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

    return (
        <>
            <DocsNavMobile />
           <div 
                className={`grid grid-cols-[auto] lg:grid-cols-[24rem_auto] 2xl:grid-cols-[24rem_auto_24rem] overflow-x-hidden mt-0  mt-10 ${isOpen ?  'hidden' : ''}`}
                ref={ref}
                onScroll={(event: UIEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    const scrollY = ref.current?.scrollTop ?? 0;
                    const scrollDistance = Math.abs(scrollY - lastScrollY);
                
                    if (scrollDistance >= scrollThreshold) {

                        const nextScrollDir = scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : "none";
                        
                        setScrollDirection(nextScrollDir);
                        setLastScrollY(scrollY > 0 ? scrollY : 0)
                    }


                    if (scrollDirection === 'down' && lastScrollY > currentSubsection.height){
                            ref.current?.focus({preventScroll: true});
                            setSubSection(currentSubsection.next)

                    } else if (scrollDirection === 'up' && lastScrollY < currentSubsection.height){
                        ref.current?.focus({preventScroll: true});
                        setSubSection(currentSubsection.previous)
                    }

                }}
            >
                <DocsNav /> 
                <main className="bg-[#eeeeee] min-w-0 lg:pl-6">
                    <div className="max-w-7xl mx-auto px-5 sm:px-12 break-words block">
                        <DocsArticle>
                        {children}
                        </DocsArticle>
                       
                    </div> 
                    <div className="grid grid-cols-2 max-w-6xl ml-0 2xl:mx-auto">
                        <div className="flex justify-center items-center">
                        {
                            previousSection ? 
                            <button 
                                className="px-8 mx-4 py-2 font-rany text-2xl flex items-center"
                                onClick={() => {
                                    setSection(previousSection);
                                    setSubSection(subsections[previousSection]?.at(0) as string)
                                }}
                            >
                                <RxCaretLeft />
                                <div className="flex flex-col items-center justify-center ml-4">
                                    
                                     <p>Previous</p>
                                     <a href={`#${subsections[previousSection]?.at(0)}`}>
                                        <p className="mt-2">{previousSection}</p>      
                                    </a>  
                                </div>
                            </button> : null
                        }
                        </div>
                        <div className="flex justify-center items-center">
                        {
                            nextSection ? 
                            <button 
                                className="px-8 mx-4 py-2 font-rany text-2xl flex items-center"
                                onClick={() => {
                                    setSection(nextSection);
                                    setSubSection(subsections[nextSection]?.at(0) as string)
                                }}
                            >
                                <div className="flex flex-col items-center justify-center mr-4">
                                    
                                     <p>Next</p>
                                    <p className="mt-2">{nextSection}</p>        
                                </div>
                                <RxCaretRight />
                            </button> : null
                        }
                        </div>
                    </div>
                </main>
                <DocsSectionGuide />
            </div>
                   
        </>
        
    )
}


export {
    DocsPageView
}