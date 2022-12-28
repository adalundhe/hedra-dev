export type DocsLinkItem = {
    sectionPath: string;
    sectionName: string;
    sectionSubsections: string[]
}

export type DocsLinkSubsections = {
    [subsectionName: string]: string[]
}