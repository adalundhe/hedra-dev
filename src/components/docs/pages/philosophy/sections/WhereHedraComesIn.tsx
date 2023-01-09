import { Section } from "../../../sections"
import { CenterTextBlock, HighlightedText } from "../../../segments"
import { RiTestTubeFill } from 'react-icons/ri'


const WhereHedraComesIn = ({
    subSectionName
}: {
    subSectionName: string
}) => {


    return (
        <Section 
        subSectionName={subSectionName}
        >
            <div>
                <div>
                    It might be easier to better describe what Hedra is by describing what it is not.
                </div>
                <CenterTextBlock>Hedra is not a unit testing framework.</CenterTextBlock>
                <p>
                    Hedra is designed to test APIs and UIs, not the individual functions that are makeup an endpoint or lie behind a button click. However, what 
                    you'll write in a Hedra tests shares many characteristics with unit tests (granularity, composable, fast). Hedra also allows you to make assertions 
                    against test results much in the same way you would with unit testing frameworks like Jest, PyTest, JUnit, etc.
                </p>
                <CenterTextBlock>Hedra is not an integration testing framework.</CenterTextBlock>
                <p>
                    While Hedra allows you to orchestrate execution of test "steps" and share state between those steps, the mechanisms for doing so 
                    are vastly different than those from integration testing frameworks you've used before. Whereas most integration testing frameworks assume 
                    a test is sequential and entirelyy linear in execution, Hedra imposes no such bounds on ordering of such steps unless you tell it too. 
                    Even then, the mechanisms for doing so are written in a way that is designed to explicitly denote that state is being shared and to 
                    maximize concurrency.
                </p>
                <CenterTextBlock>Hedra is not an end-to-end testing framework.</CenterTextBlock>
                <p>
                    Hedra does not replace manual end-to-end testing. Hedra can orchestrate incredibly complex workflows at a scale that can allow you to 
                    effectively test an entire system under stress. However, end-to-end testing also often involves testing things like third-party integraions,
                    slower and more complex scenaros (like downloading a massive video file after signing in) that either cannot or should not be executed 
                    at the level of parallelism/concurrency at which Hedra operates due to operational risk.
                </p>
                <CenterTextBlock>Hedra is a new type of tool.</CenterTextBlock>
                <div>
                    Hedra implements tests as graph workflows, borrowing the best qualities from all the above domains. It then provides mechanisms for scaling 
                    these tests far beyond what any traditional unit, integration, or end-to-end frameworks allow so that you can assess a system for both 
                    correctness <HighlightedText>and</HighlightedText> performance.         
                </div>
                <div className="text-[2.5rem] text-center flex items-center justify-center my-12">
                    <RiTestTubeFill className="rotate-45"/>
                </div>
            </div>
        </Section>
    )
}


export {
    WhereHedraComesIn
}