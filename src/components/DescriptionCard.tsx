import { CodeBlock, a11yDark } from "react-code-blocks";

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

const DescriptionCard = () => <div className="w-100 row-span-3  h-100 text-center font-monserrat grid grid-rows-6 bg-[#eeeeee]">
    <div className="row-span-1 flex justify-center items-center shadow-inner">
        <h3 className="text-2xl w-100 text-[#2e3131]">Write performance tests as workflows in Python code, then run them wherever and however you want.</h3>
    </div>
    <div className="w-100 row-span-5 flex">
        <div className="text-2xl w-1/2 flex items-center justify-center">
            <ul className="list-disc w-1/2">
                <li className="my-20 text-left">Hit hard at any scale with the power of both multiprocessing and asyncio</li>
                <li className="my-20 text-left">Use http, http2, playwright, and more in the same test - no extensions needed</li>
                <li className="my-20 text-left">30 reporting integrations at the ready to send test results where you need</li>
                <li className="my-20 text-left">Use SciPy's proven optimizaton algorithms to find the best parameters for your test</li>
            </ul>
        </div>
        <div className="font-sans text-left text-base w-1/2 shadow-inner border-b border-[#14151a]">
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