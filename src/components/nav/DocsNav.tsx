import { Transition } from "@headlessui/react";
import { useData } from "../../data";
import { RxDotFilled, RxDot } from 'react-icons/rx'


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
        <Transition
            as='div'
            className="w-full"
            appear={true}
            show={true}
            enter='transform transition ease-in-out duration-500 sm:duration-700'
            enterFrom='translate-x-0'
            enterTo='translate-x-[10%] w-full'
            leave='transform transition ease-in-out duration-500 sm:duration-700'
            leaveFrom='translate-x-[10%]'
            leaveTo='translate-x-0'
        >
            <div className="py-10 flex flex-col font-rany items-center shadow-2xl">
                <div className="flex flex-col justify-center text-left">
                        <div className="py-4 px-4 w-full">

                            <h3 className="text-[2vmin]">Version: 0.6.21</h3>
                        </div>
                        <div className="overflow-y-scroll px-4 h-[70vh] w-full">
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
                                                        'text-[1.40vmin] text-[#038aff] hover:bold cursor-pointer hover:text-[#038aff] w-fit font-medium underline' : 'text-[1.40vmin] text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff] w-fit font-light' ;
                                            
                                            const caretStyle = subSectionName === selectedSubSection ? 
                                                "h-full text-[1.40vmin] mr-2 text-[#038aff] hover:text-[#038aff]" : "h-full text-[1.40vmin] mr-2 text-[#14151a] hover:text-[#038aff]";

                                            return (
                                                <div
                                                    key={`${selectedSection}-${subSectionName}-Section-Guide`}
                                                    className='w-full pb-2'
                                                >
                                                    <button 
                                                        className="w-fit text-left flex items-center"
                                                        type="button" 
                                                        onClick={() => {
                                                            setSelectedSection(docsLink.sectionName)
                                                            setSelectedSubSection(subSectionName)
                                                        }}
                                                    >
                                                        <div className={caretStyle}>
                                                            {
                                                                subSectionName === selectedSubSection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                                                            }
                                                        </div>
                                                        <p className={subSectionStyle}>{subSectionName}</p>
                                                    </button>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            )
                        }
                        </div>
                    </div>
            </div>
        </Transition>
    )
}


export { 
    DocsNav
}