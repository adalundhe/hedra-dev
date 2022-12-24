import { docsSubSections } from "../../../data";


const DocsSectionGuide = ({
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
        <div className="fixed grid grid-cols-6 w-full">
            <div className="col-span-4"></div>
            <div className="col-span-2 flex flex-col items-center h-full w-full font-rany px-20 ml-52 my-20 pt-24 w-1/2">
            {
                docsSubSections[selectedSection]?.map(subSectionName => {

                    const subSectionStyle = subSectionName === selectedSubSection ? 
                    'text-lg text-[#038aff] hover:bold cursor-pointer hover:text-[#038aff] w-fit' : 'text-lg text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff] w-fit' ;


                    return (
                        <button
                            key={`${selectedSection}-${subSectionName}-Section-Guide`}
                            className="w-full"
                            type="button" 
                            onClick={() => {
                                setSelectedSection(selectedSection)
                                setSelectedSubSection(subSectionName)
                            }}
                        >
                            <p className={subSectionStyle}>{subSectionName}</p>
                        </button>
                    )
                })
            }
        </div>
        </div>
    )
}


export {
    DocsSectionGuide
}