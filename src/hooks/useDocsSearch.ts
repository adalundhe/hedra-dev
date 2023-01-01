import { useMemo, useState } from "react";
import { useSearchData } from "./useSearchData";


const useDocsSearch = () => {

    const searchData = useSearchData();
    const [query, setQuery] = useState("")
    const searchMatches: {[key: string]: {
        name: string,
        link: string,
        section: string,
        subSection: string
    }} = {};
    
    const matches = useMemo(() => {

        if (query.length > 0){
            for (const searchable in searchData){
                if (searchable.includes(query.toLocaleLowerCase())){
                    searchMatches[searchable] = searchData[searchable] as {
                        name: string,
                        link: string,
                        section: string,
                        subSection: string
                    };
                }
            }    
        }

        return searchMatches;

    }, [query, searchData]);

    return {
        query,
        setQuery,
        matches
    }
}


export {
    useDocsSearch
}