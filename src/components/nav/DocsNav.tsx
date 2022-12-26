import Link from "next/link"
import { useData } from "../../data";
import { useWindowDimensions } from '../../hooks'


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

    const docsLinks = useData();

    return (
    <div className="py-10 flex flex-col font-rany items-center shadow-2xl sticky">
        <div className="flex flex-col justify-center text-left">
                <div className="py-4 px-4">

                    <h3 className="text-[2vmin]">Version: 0.6.21</h3>
                </div>
                <div className="overflow-y-scroll px-4 h-[70vh]">
                {
                    docsLinks.all.map((docsLink, idx: number) => 
                        <div key={docsLink.sectionPath} className='py-4'>
                            <button
                                className="w-full text-left"
                                type="button"
                                onClick={() => {
                                    setSelectedSection(docsLink.sectionName)
                                    setSelectedSubSection(docsLink.sectionSubsections[0] as string)
                                }}
                            >
                                <h3 className="text-[2vmin] text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff] w-fit">
                                {
                                    docsLink.sectionName
                                }
                                </h3>
                            </button>
                            {
                                docsLinks.subsections[docsLink.sectionName]?.map(subSectionName => {

                                    const subSectionStyle = subSectionName === selectedSubSection ? 
                                                'text-[1.5vmin] text-[#038aff] hover:bold cursor-pointer hover:text-[#038aff] w-fit' : 'text-[1.5vmin] text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff] w-fit' ;

                                    return (
                                        <button 
                                            className="w-full text-left"
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