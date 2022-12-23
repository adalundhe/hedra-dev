import { CodeBlock, a11yDark } from "react-code-blocks";
import { TerminalController } from "./terminal";

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

const FlippedDescriptionCard = () => <div className="w-100 row-span-3 h-100 text-center font-monserrat grid grid-rows-6 bg-[#2e3131]">
    <div className="row-span-1 flex justify-center items-center shadow-inner">
        <h3 className="text-2xl w-100 text-[#eeeeee]">Use the powerful CLI to manage and run test projects.</h3>
    </div>
    <div className="w-100 row-span-5 flex shadow-inner">
        <div className="font-sans text-left text-base w-1/2 border-t border-[#14151a]">
            <TerminalController />
        </div>
        <div className="text-2xl w-1/2 flex items-center justify-center bg-[#eeeeee]">
            <ul className="list-disc w-1/2">
                <li className="my-20 text-left">Keep your tests in sync with the built-in Git integration</li>
                <li className="my-20 text-left">Comprehesive start template generation to get you up and running</li>
                <li className="my-20 text-left">One CLI - whether running tests on your laptop or in the cloud</li>
                <li className="my-20 text-left">Intuitive UI presents the information you need when you need it</li>
            </ul>
        </div>   
    </div>
</div>


export {
    FlippedDescriptionCard
}