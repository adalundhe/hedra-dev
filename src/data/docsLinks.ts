import { useRef } from "react"





const useData = () => {

    const docsLinks = useRef([
            {
                sectionName: "Introduction",
                sectionPath: "/docs/introduction",
                sectionSubsections: [
                    "Welcome",
                    "What is performance testing?",
                    "What is Hedra?",
                    "Core tenants",
                    "Workflows as graphs",
                    "Graphs as tests"
                ]
            },
            {
                sectionName: "Core Concepts",
                sectionPath: "/docs/core_concepts",
                sectionSubsections: [
                    "Introduction to Hooks",
                    "Introduction to Stages",
                    "Introduction to Graphs",
                    "Putting it all together",
                    "Personas and Hook Schedulng",
                    "Engines and Hook Lifecycle",
                    "Optimizers and automated test configuration",
                    "Getting results with Reporters",
                    "Projects and Test Graph management",
                    "Plugins and plugin development"
                ]
        
            },
            {
                sectionName: "Command Line",
                sectionPath: "/docs/command_line",
                sectionSubsections: [
                    "CLI Overview",
                    "Running an existing graph",
                    "Validating graph changes",
                    "Creating a graph from template",
                    "Initializing a project",
                    "Hedra config and .hedra.json",
                    "Referencing graphs by name",
                    "Getting a project from Github",
                    "Adding a plugin",
                    "Checking the project",
                    "Syncing updates",
                    "Logging"
                ]
        
            },
            {
                sectionName: "Projects",
                sectionPath: "/docs/projects",
                sectionSubsections: [
                    "Projects Overview",
                    "Project CLI commands",
                    "Directory structure",
                    "Config options for .hedra.json",
                    "Remote projects and project management"
                ]
        
            },
            {
                sectionName: "Graphs",
                sectionPath: "/docs/graphs",
                sectionSubsections: [
                    "Graphs overview",
                    "Graph CLI commands",
                    "Graph requirements",
                    "Graph lifecycle",
                    "Virtual Users and concurrency",
                    "CPUs and graph resource provisioning",
                    "Gotchas"
                ]
        
            },
            {
                sectionName: "Stages",
                sectionPath: "/docs/stages",
                sectionSubsections: [
                    "Stages overview",
                    "Stage requirements",
                    "Internal vs Public Stages",
                    "Stage lifecycle",
                    "Stage state and state isolation",
                    "Analyze",
                    "Checkpoint",
                    "Complete",
                    "Error",
                    "Execute",
                    "Idle",
                    "Optimize",
                    "Setup",
                    "Submit",
                    "Teardown",
                    "Validate",
                    "Wait"
                ]
        
            },
            {
                sectionName: "Hooks",
                sectionPath: "/docs/hooks",
                sectionSubsections: [
                    "Hooks overview",
                    "Why async functions?",
                    "Internal vs external hooks",
                    "Hook lifecycle",
                    "Dynamic vs static hooks",
                    "Action",
                    "After",
                    "Before",
                    "Channel",
                    "Check",
                    "Context",
                    "Depends",
                    "Event",
                    "Metric",
                    "Restore",
                    "Save",
                    "Setup",
                    "Task",
                    "Teardown",
                    "Validate",
                ]
        
            },
            {
                sectionName: "Engines",
                sectionPath: "/docs/engines",
                sectionSubsections: [
                    "Engines overview",
                    "Engine exeuction lifecycle",
                    "Client calls vs optimized calls",
                    "Hook overhead",
                    "GraphQL",
                    "GraphQL-HTTP2",
                    "HTTP",
                    "HTTP2",
                    "Playwright",
                    "UDP",
                    "Websocket"
                ]
        
            },
            {
                sectionName: "Personas",
                sectionPath: "/docs/personas",
                sectionSubsections: [
                    "Persona overview",
                    "Persona execution lifecycle",
                    "Batched Persona",
                    "Constant Arrival Rate Persona",
                    "Constant Spawn Rate Persona",
                    "Default Persona",
                    "Ramped Internal Persona",
                    "Sequenced Persona",
                    "Weighted Selection Persona"
                ]
        
            },
            {
                sectionName: "Reporters",
                sectionPath: "/docs/reporters",
                sectionSubsections: [
                    "Reporters Overview",
                    "Reporter Lifecycle",
                    "AWS Lambda",
                    "AWS Timestream",
                    "BigQuery",
                    "BigTable",
                    "Cassandra",
                    "Cloudwatch",
                    "CosmosDB",
                    "CSV",
                    "Datadog",
                    "DogStatsD",
                    "Google Cloud Storage",
                    "Graphite",
                    "Honeycomb",
                    "InfluxDB",
                    "JSON",
                    "Kafka",
                    "MongoDB",
                    "MySQL",
                    "Netdata",
                    "New Relic",
                    "Postgres",
                    "Prometheus",
                    "Redis",
                    "S3",
                    "Snowflake",
                    "SQLite",
                    "StatsD",
                    "Telegraf",
                    "Telegraf StatsD",
                    "TimescaleDB"
                ]
        
            },
            {
                sectionName: "Optimizers",
                sectionPath: "/docs/optimizers",
                sectionSubsections: [
                    "Optimizers Overview",
                    "Optimizer Lifecycle",
                    "When should I use optimization?",
                    "Optimization best practices",
                    "SHG",
                    "Dual Annealing",
                    "Differential Evolution"
                ]
        
            },
            {
                sectionName: "Writing Plugins",
                sectionPath: "/docs/writing_plugins",
                sectionSubsections: [
                    "Painless Extensibility",
                    "Engine Plugins",
                    "Optimizer Plugins",
                    "Persona Plugins",
                    "Reporter Plugins"
                ]
        
            },
            {
                sectionName: "Examples and Recipes",
                sectionPath: "/docs/examples_and_recipies",
                sectionSubsections: [
                    "Simulating login",
                    "Context sharing",
                    "Cross-graph communication",
                    "Optimization cycling",
                    "Avoiding timeouts and deadlocks",
                    "Graph optimization"
                ]
        
            },
            {
                sectionName: "Debugging",
                sectionPath: "/docs/debugging",
                sectionSubsections: [
                    "Working with Hedra logs",
                    "Reporting issues"
                ]
        
            },
            {
                sectionName: "Other",
                sectionPath: "/docs/other",
                sectionSubsections: [
                    "Thanks"
                ]
        
            },
        ])

    const docsSubSections: {[k: string]: string[]} = docsLinks.current.reduce((
        subSections, 
        docsLink
    ) => ({...subSections, [docsLink.sectionName]: docsLink.sectionSubsections}), {})
        

    return {
        all: docsLinks.current,
        subsections: docsSubSections
    }
}

export {
    useData
}

