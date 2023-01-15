import { type } from "os";
import { RefObject } from "react";

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


export type ScrollRef = {
    scrollRef?: RefObject<HTMLElement>;
    viewRef?: (node?: Element | null | undefined) => void;
    inView?: boolean;
    height?: number;
    isOpen?: boolean;
}


export type CommandRequiredArgument = {
    name: string;
    description: string;
    valueType: string;
    example: string | number | boolean
}


export type CommandOptionalArgument ={
    name: string;
    description: string;
    valueType: string;
    example: string | number | boolean;
    defaultValue: string | number | boolean;
    isFlag: boolean;
}


export type CommandReference = {
    command: string;
    commandCategory: string;
    description: string;
    requiredArguments: CommandRequiredArgument[];
    optionalArguments: CommandOptionalArgument[];
    exampleCommand: string;
    exampleOutput: string;
}