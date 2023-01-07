import { Section } from "../../../sections"
import { GiBoxingGlove } from 'react-icons/gi';
import { ExternalLink, PointList } from "../../../segments";


const WhatIsPerformanceTesting = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                This section is for those new to performance testing and is designed to help you better understand what performance testing is, it's benefits, and 
                potential risks. If you've done performance testing before, feel free to skip this section.
            </p>
            <br/>
            <p>You've likely written tests as code before - whether unit tests, integration tests, or end-to-end tests. These types of tests assess the
                functionality of the target service/code/application, generally for expected behavior given a defined scenario.
            </p>
            <br/>
            <p>
                Performance testing differs from this "functional testing" in that it focuses less on determining whether the target executes expected
                behaviors and more on how quickly and efficiently the target handles heavy amounts of traffic or usage. For distributed services, websites, and modern
                applications in general, this information can be critical in determining:
            </p>
            <PointList 
                name="performance-testing-scenario-items"
                icons={[
                    <GiBoxingGlove />,
                    <GiBoxingGlove />,
                    <GiBoxingGlove />,
                    <GiBoxingGlove />
                ]}
                points={[
                    "Stability of services when a sudden spike in user traffic occurs",
                    "CPU and memory usage of the target system under simulated increasing or defined traffic levels",
                    "Identifying memory leaks or tricky transient issues",
                    "Page load or API response times"

                ]}
            />
            <p>
                as well as other target system behavior characteristics such as ready/write times to file or database, how quickly autoscaling adapts to simulated
                traffic or usage influx, etc. For these reasons, performance testing is now widely consider as a component of "chaos testing", or testing that determines how a system behaves under unexpected
                conditions.
            </p>
            <br/>
            <p>
                However, we would argue that performance testing's domain and usefulness extend far beyond this area and are as critical a component of determining the quality, 
                scalability, and durability of software as any type of functional testing. It's not enough that systems function, they must function <b>well</b> under a variety
                of usage and use cases. 
            </p>
            <br/>
            <p>
                <ExternalLink link="https://www.portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm" text="Portent's often cited 2019 study"/>{" "}
                clearly shows the impact of page load times on conversion rates. These load times are a product of both UI and API performance, and can increase drastically
                if a system is experiencing significant traffic. The speed and efficiency of your services and applications directly impact and in many cases correspond to
                business success. 
            </p>
            <br/>
            <p>
                Performance testing helps you provide essential metrics that illustrate what parts have the greatest impact on your application's the overall speed, stability, and 
                efficiency. Hedra is one such tool that can provide these insights.
            </p>
        </div>
        </Section>


export {
    WhatIsPerformanceTesting
}