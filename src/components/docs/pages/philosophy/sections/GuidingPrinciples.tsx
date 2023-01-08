import { Section } from "../../../sections";
import { CenterTextBlock } from "../../../segments";


const GuidingPrinciples = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>Hedra development adheres to three core principles.</p>
            <CenterTextBlock>
                Speed and efficiency by default.
            </CenterTextBlock>
            <p>
                Hedra aims to maximize concurrency and throughput, minimize memory footprint and wasted CPU cycles, and achieve this without users waisting 
                time tinkering with parameters, execution environment, or having to implement a complex deployment. 
            </p>
            <br/>
            <p>
                We optimize code whenever and wherever possible, make the most of parallelism and concurrency, provide sound defaults and intuitive mechanisms 
                for automating the process of improving performance. 
            </p>
            <CenterTextBlock>
                Run with ease anywhere.
            </CenterTextBlock>
            <p>
                Hedra aims to make the experiences of running tests locally and distributed mirror each other as closely as possible. Test code that works on 
                someone's laptop should feel like it executes almost exactly the same when running in a large scale cluster. An intuitive CLI, carefully crafted
                API, and thoughtful architecture are key to this.
            </p>
            <br/>
            <p>
                We strive to maintain compatibility with all common operating systems, and provide well-tested solutions to run both in containerized and virtual
                machine environments. This means batteries-included templates and thorough documentation for running on popular platforms or using popular 
                tooling like Kubernetes.
            </p>
            <br/>
            <p>
                Scaling and running large tests should be painless. Fault-tolerant distributed architecture and communication systems are the bedrock of this.
            </p>
            <CenterTextBlock>
                Flexibility and painless extensibility.
            </CenterTextBlock>
            <p>
                Hedra aims to make integrating with existing platoforms and architecture as seamless as possible. We provide a comprehensive suite of protocols
                and integrations for testing systems or submitting results and strive to incorporate new protocols or integrations as often as possible.
            </p>
            <br/>
            <p>
                If we chose not to support a protocol, integration, or feature - we make implementing such an extension of functionality as intuitive as 
                possible through a friendly plugin system. We eschew additional complexity in implementing such extensions. This means no compilation, 
                no complex path setting, and writing extensions in the same language tests are written in.
            </p>
        </div>
        </Section>


export {
    GuidingPrinciples
}