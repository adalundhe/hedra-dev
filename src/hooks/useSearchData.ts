import { useData } from "../data"
import { useMemo } from "react"


const useSearchData = (): {[itemName: string]: {
    name: string,
    link: string,
    section: string,
    subSection: string
}} => {
    const data = useData();

    const searchData: {[itemName: string]: {
        name: string,
        link: string,
        section: string,
        subSection: string
    }} = {}

    const titles = useMemo(() => {

        data.all.forEach(docsItem => {
            searchData[docsItem.sectionName] = {
                name: docsItem.sectionName,
                link: `${docsItem.sectionPath}#${docsItem.sectionSubsections[0]}`,
                section: docsItem.sectionName,
                subSection: docsItem.sectionSubsections[0] as string
            };
        })

        return searchData;
    }, 
    [data])

    const subSections = useMemo(() => {
        const docsSubSections: {[subsectionName: string]: string} = {};
    
        data.all.forEach(docsItem => {
            docsItem.sectionSubsections.forEach(subsectionName => {
                searchData[subsectionName.toLowerCase()] = {
                    name: subsectionName,
                    link: `${docsItem.sectionPath}#${subsectionName.toLowerCase().replace(/\s+/g, '-')}`,
                    section: docsItem.sectionName,
                    subSection: subsectionName
                };
            });
        });

        return docsSubSections

    }, [data])

    return searchData;

}


export {
    useSearchData
}