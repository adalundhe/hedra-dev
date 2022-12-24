import { docsLinks } from "../../data"
import Link from "next/link"
import { docsSubSections } from "../../data";


const DocsNav = ({
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void
}) => {

    return (
        <div className="py-10 text-xl flex flex-col font-rany items-center shadow-2xl sticky">
            <div className="flex flex-col justify-center w-full">
                <div className="py-4 pl-10">

                    <h3 className="text-xl">Version: 0.6.21</h3>
                </div>
                <div className="overflow-y-scroll pl-10 h-[70vh]">
                {
                    docsLinks.map((docsLink, idx: number) => 
                        <div key={docsLink.sectionPath} className='py-4'>
                            <button
                                className="w-full"
                                type="button"
                                onClick={() => {
                                    setSelectedSection(docsLink.sectionName)
                                    setSelectedSubSection(docsLink.sectionSubsections[0] as string)
                                }}
                            >
                                <h3 className="text-2xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff] w-fit">
                                {
                                    docsLink.sectionName
                                }
                                </h3>
                            </button>
                            {
                                docsSubSections[docsLink.sectionName]?.map(subSectionName => {

                                    const subSectionStyle = subSectionName === selectedSubSection ? 
                                                'text-xl text-[#038aff] hover:bold cursor-pointer hover:text-[#038aff] w-fit' : 'text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff] w-fit' ;

                                    return (
                                        <button 
                                            className="w-full"
                                            type="button" 
                                            onClick={() => {
                                                setSelectedSection(docsLink.sectionName)
                                                setSelectedSubSection(subSectionName)
                                            }}
                                        >
                                            <p className={subSectionStyle}>{subSectionName}</p>
                                        </button>
                                    )

                                })
                            }
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}


export { 
    DocsNav
}