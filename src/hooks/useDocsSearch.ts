import { useMemo, useState } from "react";
import { useDocsStore } from "../store";
import { SearchDoc } from "../store/types";


const useDocsSearch = () => {

    const [query, setQuery] = useState("")

    if (useDocsStore){
        const searchData = useDocsStore((state) => state.searchDocs)

        const searchMatches: {[key: string]: SearchDoc} = {};
        
        const matches = useMemo(() => {

            if (query.length > 0){
                for (const searchable in searchData){
                    if (searchable.includes(query.toLowerCase())){
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

        }, [query]);

        return {
            query,
            setQuery,
            matches
        }
    }

    return {
        query,
        setQuery,
        matches: {}
    }
}


export {
    useDocsSearch
}