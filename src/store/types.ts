import { type } from "os";

export type DocsLinkItem = {
    sectionPath: string;
    sectionName: string;
    sectionSubsections: string[];
    slugs: {[slug: string]: string};
}

export type DocsLinkSubsections = {
    [subsectionName: string]: string[]
}

export type SearchDoc = {
    name: string,
    link: string,
    section: string,
    subSection: string
}


export type NewsPostSummary = {
    summaryIntro: string;
    summaryItems: string[];
}


export type NewsPost = {
    title: string;
    link: string;
    summary?: NewsPostSummary;
    publishedDate: string;
}