import { TerminalController } from "./terminal";
import { DiGit } from 'react-icons/di'
import { TbReportAnalytics } from 'react-icons/tb'
import { GoTerminal } from 'react-icons/go'
import { TfiPlug } from 'react-icons/tfi'


const FlippedDescriptionCard = () => <div className="w-full row-span-3 h-100 text-center font-rany flex flex-col bg-[#2e3131]">
    <div className="flex justify-center items-center shadow-md 2xl:border-none border-b border-[#14151a] mx-10 2xl:border-none border-t border-[#14151a]">
        <h3 className="text-3xl w-full text-[#eeeeee] py-20">Use the powerful CLI to manage and run test projects.</h3>
    </div>
    <div className="w-full flex 2xl:flex-row flex-col">
        <div className="font-sans text-left text-base 2xl:w-1/2 w-full shadow-2xl">
            <TerminalController />
        </div>
        <div className="text-3xl 2xl:w-1/2 w-full flex items-center justify-center bg-[#eeeeee] py-10">
            <ul className="w-1/2 w-full py-10">
                <li className="my-20 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <DiGit />
                    </p>
                    <p className="ml-4">
                        Keep your tests organized with Projects and in sync with the built-in Git integration
                    </p>
                </li>
                <li className="my-20 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <TbReportAnalytics />
                    </p>
                    <p className="ml-4">
                        Comprehesive start template generation to get you up and running
                    </p>
                </li>
                <li className="my-20 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <GoTerminal />
                    </p>
                    <p className="ml-4">
                        One CLI - whether running tests on your laptop or in the cloud
                    </p>
                </li>
                <li className="my-20 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <TfiPlug />
                    </p>
                    <p className="ml-4">
                        Powerul yet friendly plugin API - just generate, create, and use, no compilation or awkward extra steps
                    </p>
                </li>
            </ul>
        </div>   
    </div>
</div>


export {
    FlippedDescriptionCard
}