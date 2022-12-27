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
                    "Introduction to Projects",
                    "Engines, Personas, Optimizers and Reporters",
                    "Putting it all together",
                ]
        
            },
            {
                sectionName: "Deeper Dive",
                sectionPath: "/docs/deeper_dive",
                sectionSubsections: [
                    "Engines and Hook Lifecycle",
                    "Personas and Hook Schedulng",
                    "Optimizers and automated test configuration",
                    "Getting results with Reporters",
                ]
        
            },
            {
                sectionName: "Command Line",
                sectionPath: "/docs/command_line",
                sectionSubsections: [
                    "CLI Overview",
                    "CLI Reference",
                    "CLI Logging Options"
                ]
        
            },
            {
                sectionName: "Working with Graphs",
                sectionPath: "/docs/working_with_graphs",
                sectionSubsections: [
                    "Running an existing graph",
                    "Validating graph changes",
                    "Creating a graph from template"
                ]
        
            },
            {
                sectionName: "Working with Projects",
                sectionPath: "/docs/working_with_projects",
                sectionSubsections: [
                    "Initializing a project",
                    "Hedra config and .hedra.json",
                    "Referencing graphs by name",
                    "Getting a project from Github",
                    "Checking the project",
                    "Syncing updates",
                ]
        
            },
            {
                sectionName: "Projects",
                sectionPath: "/docs/projects",
                sectionSubsections: [
                    "Projects Overview",
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
                sectionName: "Plugins",
                sectionPath: "/docs/plugins",
                sectionSubsections: [
                    "Plugin development",
                    "Engine plugins",
                    "Optimizer plugins",
                    "Persona plugins",
                    "Reporter plugins",
                    "Using plugins"
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

