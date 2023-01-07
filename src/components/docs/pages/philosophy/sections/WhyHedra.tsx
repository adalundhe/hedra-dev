import { Section } from "../../../sections"
import { PointList } from "../../../segments"
import { GiImpactPoint } from 'react-icons/gi'
import { GrDeploy } from "react-icons/gr"


const WhyHedra = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const performanceTestingIssuePoints = [
        "Scaling performance test workloads is often difficult",
        "Perfomance tests struggle to simulate real-world usage of systems like integraion/E2E tests",
        "Writing performance tests is complex and often requires specialized practicioners",
        "Performance testing frameworks often lack integrations with popular external resources for storing results",
        "Performance testing frameworks often lack extensibility, and/or make adding your own functionality difficult",
        "Key functionality addressing the above issues is often walled behind expensive SaaS plans"
    ]

    const scalabilitySolutionItems = [
        "Ready container image and Helm charts",
        "Install via pip with additional features available via pip install extras",
        "CLI and API that ensure that running tests locally or distributed are as similar as possible",
        "Managment of graph collections as Projects via built-in Git integration"
    ]

    return (
        <Section 
            subSectionName={subSectionName}
            >
            <div>
                <p>
                    Hedra was written to solve the following problems:
                </p>
                <PointList 
                    name="performance-testing-issues-items"
                    icons={performanceTestingIssuePoints.map(_ => <GiImpactPoint />)}
                    points={performanceTestingIssuePoints}
                />
                <p>
                    Performance testing frameworks struggle with scalability for a variety of reasons, most commonly convoluted deployment process, resource mismanagement and inefficiency,
                    and frail distributed architecture. Hedra addresses each of these issues by:
                </p>
                <PointList 
                    name="scalability-solution-items"
                    icons={scalabilitySolutionItems.map(_ => <GrDeploy />)}
                    points={scalabilitySolutionItems}
                />
                <p>
                    Performance testing tools tend to one of two extremes - efficient but limited tools that offer incredible workload
                    generation capabilities but can only target one API endpoint or execute a single task at a time (often with limited
                    support for protcols or connection types) or tools that offer a myriad of testing capabilties but are resource inefficient
                    and/or notably slow (thus requiring more machines running tests to generate appropriate load).
                </p>
                <PointList 
                    name="resource-solution-items"
                    icons={[
                        <GrDeploy />
                    ]}
                    points={[
                        "Hedra seeks to strike a balance between workload generation power, resource efficiency, and flexibility"
                    ]}
                />
                <p>
                </p>
                <p>   
                    The API allows you to write tests as workflows and even chain together individual test tasks like you would steps of an integration test.
                    It utilizes both multiprocessing and asyncio to retain execution speed while executing these complex tests while a custom
                    memory management algorithm ensures memory usage remains low - even for large tests simulating tens of thousands of concurrent
                    users. We embrace bboth the cutting edge of Python features like per-process and proven optimization techniques.
                </p>
                <PointList 
                    name="adoption-solution-items"
                    icons={[
                        <GrDeploy />
                    ]}
                    points={[
                        "Hedra is written in pure Python - both the framework and tests"
                    ]}
                />
                <p>
                    Consitency between impleentation and software language is critical to speedy adoption, quick debugging, and framework accessibility. The 
                    API is opinionated but flexible/composable. Only a handful of building blocks are necessary to write the majority of tests. This is 
                    an approach taken from UI libraries like modern React that strive to make using the tooling feel as close as possible to simply programming 
                    in the language in which it was developed.
                </p>
                <PointList 
                    name="results-solution-items"
                    icons={[
                        <GrDeploy />
                    ]}
                    points={[
                        "Hedra comes with thirty integrations readily written"
                    ]}
                />
                <p>
                    By default we offer both JSON and CSV results output. New options for outputing results are constantly being added via 
                    Hedra's Reporters integrations, and you can quickly implement your own via Hedra's Plugins. We strive to minimize dependency
                    bloat while offering comprehensive integration options - add only the ones you need as pip install extras
                </p>
                <PointList 
                    name="extensibility-solution-items"
                    icons={[
                        <GrDeploy />
                    ]}
                    points={[
                        "Hedra's Plugins are written as plain old Python classes"
                    ]}
                />
                <p>
                    Provide and wrap required methods with provided decorators, import the plugin, provide it to a single Stage (class) in the
                    test file, and you're good to go. You could even write a seperate Python package of plugins and install them as dependencies via Pip! 
                    We aim to avoid additional steps like compilation or convoluted linking/path setting.
                </p>
                <PointList 
                    name="openness-solution-items"
                    icons={[
                        <GrDeploy />
                    ]}
                    points={[
                        "Hedra is and will always remain open source and free"
                    ]}
                />
                <p>
                    Hedra was created out of frustration with the limitations of existing open source options and the exorbitant pricing of paid 
                    ones for key features. What was initially spite-driven-development has grown into a genuine passion project that seeks to
                    make performance testing intuitive, insightful, and even fun.
                </p>
            </div>
            </Section>
    )
}


export {
    WhyHedra
}
