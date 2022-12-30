import { Transition } from "@headlessui/react";
import { DocsNavSection } from "./DocsNavSection";
import { DocsLinkItem, DocsLinkSubsections } from "../../../data/types";
import { useEffect } from "react";


const DocsNav = ({
    docsData,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    docsData: {
        all: DocsLinkItem[],
        subsections: DocsLinkSubsections
    },
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void
}) => {

    return (
        <Transition
            as='div'
            className="lg:flex hidden lg:sticky top-0 left-0 right-0 py-0 z-50 h-[88vh]"
            appear={true}
            show={true}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <div className="font-rany shadow-2x flex flex-col justify-center text-left w-full h-3/4">
                <div className="py-4 px-8 w-full">
                    <h3 className="text-2xl">Version: 0.6.21</h3>
                </div>
                <div className="overflow-y-scroll px-8 h-[70vh] w-full">
                {
                    docsData.all.map((docsLink: DocsLinkItem, idx: number) => 
                        <div key={`docs-group-${idx}`}>
                            <DocsNavSection 
                                docsLink={docsLink}
                                docsSubsections={docsData.subsections}
                                selectedSection={selectedSection}
                                selectedSubSection={selectedSubSection}
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
    DocsNav
}