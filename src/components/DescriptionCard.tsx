import { CodeBlock, a11yDark } from "react-code-blocks";
import { GiBoxingGlove } from 'react-icons/gi'
import { BsGearWide } from 'react-icons/bs'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { GoBeaker } from 'react-icons/go'


const codeExample = `
from hedra import (
	Setup,
	Execute,
	action,
	Analyze,
	JSONConfig,
	Submit,
	depends,
)

class SetupStage(Setup):
    batch_size=1000
    total_time='1m'


@depends(SetupStage)
class ExecuteHTTPStage(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')


@depends(ExecuteHTTPStage)
class AnalyzeStage(Analyze):
    pass


@depends(AnalyzeStage)
class SubmitJSONResultsStage(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )

`

const DescriptionCard = () => <div className="w-full row-span-3 text-center font-rany flex flex-col  bg-[#eeeeee]">
    <div className="flex justify-center items-center shadow-inner">
        <h3 className="2xl:text-3xl text-[3rem] break-words w-full text-[#2e3131] py-20">Write performance tests as workflows in Python code, then run them wherever and however you want.</h3>
    </div>
    <div className="w-full flex 2xl:flex-row flex-col">
        <div className="text-3xl 2xl:w-1/2 w-full flex items-center justify-center 2xl:py-10 pb-10">
            <ul className="2xl:w-1/2 mx-10">
                <li className="2xl:my-20 my-10 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <GiBoxingGlove />
                    </p>
                    <p className="ml-4">
                        Hit hard at any scale with the power of both multiprocessing and asyncio
                    </p>
                </li>
                <li className="2xl:my-20 my-10 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <BsGearWide />
                    </p>
                    <p className="ml-4">
                        Use http, http2, playwright, and more in the same test
                    </p>
                </li>
                <li className="2xl:my-20 my-10 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <HiOutlineDocumentReport />
                    </p>
                    <p className="ml-4">
                        30 reporting integrations at the ready to send test results where you need
                    </p>
                </li>
                <li className="2xl:my-20 my-10 text-left flex items-center">
                    <p className="text-6xl mr-2">
                        <GoBeaker />
                    </p>
                    <p className="ml-4">
                        Use SciPy's proven optimizaton algorithms to find the best parameters for your test
                    </p>
                </li>
            </ul>
        </div>
        <div className="font-sans text-left text-base 2xl:w-1/2 w-full shadow-2xl">
            <CodeBlock 
                text={codeExample}
                language={'python'}
                showLineNumbers={true}
                theme={{
                    ...a11yDark,
                    lineNumberColor: "eeeeee",
                    lineNumberBgColor: "#14151a",
                    backgroundColor: "#2e3131",
                    textColor: "#eeeeee",
                    keywordColor: "#abb7b7",
                    sectionColor: "#fff9de",
                    numberColor: "white",
                    stringColor: "#95a5a6"
                }}
            />
        </div>
    </div>
</div>


export {
    DescriptionCard
}