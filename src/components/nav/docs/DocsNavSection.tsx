
import { RxCaretRight, RxCaretDown } from 'react-icons/rx'
import { DocsLinkItem } from "../../../store/types";
import { DocsNavItems } from './DocNavItems'
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { useDocsStore } from '../../../store';
import { shallow } from 'zustand/shallow'


const DocsNavSection = ({docsLink}: { docsLink: DocsLinkItem}) => {

    const sectionRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { ref, inView } = useInView()

    const { 
        docsNavRefs,
        section,
        subsection,
        setSection, 
        setSubSection,
        setDocsNavRefs
    } = useDocsStore(useCallback((state) => ({
        docsNavRefs: state.docsNavRefs,
        articles: state.articles,
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection,
        setDocsNavRefs: state.setDocsNavRefs
    }), []), shallow)


    const [sectionOpen, setSectionOpen] = useState(true);


    useEffect(() => {

        if (router.isReady){
            docsNavRefs[docsLink.sectionName] = {
                scrollRef: sectionRef,
                height: sectionRef.current?.clientHeight,
                viewRef: ref,
                inView: inView,
                isOpen: docsLink.sectionName === section
            }
        
            setDocsNavRefs(docsNavRefs)
        }

    }, [router.isReady])


    // useEffect(() => {

    //     if (docsLink.sectionName === section){
    //         const currentSection = docsNavRefs[docsLink.sectionName] ?? {};
    //         currentSection.isOpen = docsLink.sectionName === section ? !docsNavRefs[docsLink.sectionName]?.isOpen : true;
    //         docsNavRefs[docsLink.sectionName] = currentSection;
    //         setDocsNavRefs(docsNavRefs);

    //     }


    // }, [section, subsection])

    return (
        <div key={docsLink.sectionPath} className='py-4' ref={sectionRef}>
            <div className="flex rounded py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-7">
                {
                    docsNavRefs[docsLink.sectionName]?.isOpen &&docsLink.sectionName === section  ?
                    <button
                        className="text-left flex items-center"
                        type="button"
                        onClick={() => {
                            const currentSection = docsNavRefs[docsLink.sectionName] ?? {};
                            currentSection.isOpen = docsLink.sectionName === section ? !docsNavRefs[docsLink.sectionName]?.isOpen : false;
                            docsNavRefs[docsLink.sectionName] = currentSection;
                            setDocsNavRefs(docsNavRefs);
                        }}
                    >
                        <div className="mr-2">
                            <RxCaretDown className={docsLink.sectionName === section ? "text-xl text-[#038aff]/70" : "text-xl text-[#14151a]"} />
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

                            const currentSection = docsNavRefs[docsLink.sectionName] ?? {};
                            currentSection.isOpen = docsLink.sectionName === section ? !docsNavRefs[docsLink.sectionName]?.isOpen : true;
                            docsNavRefs[docsLink.sectionName] = currentSection;
                            setDocsNavRefs(docsNavRefs);

                            setSection(docsLink.sectionName)

                            const updatedSubSection =  docsLink.sectionSubsections.includes(subsection) ? subsection :  docsLink.sectionSubsections.at(0) as string;
                            setSubSection(updatedSubSection)

                            router.push(`${docsLink.sectionName}/#${updatedSubSection.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')}`)

                        }}
                    >
                        <div className="mr-2" ref={ref}>

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
                open={docsNavRefs[docsLink.sectionName]?.isOpen as boolean}
                docsItemSubsections={docsLink.sectionSubsections as string[]}
            />
        </div>
    )
}


export {
    DocsNavSection
}