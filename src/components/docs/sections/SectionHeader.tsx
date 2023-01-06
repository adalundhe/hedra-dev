import { RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer"
import { useDocsStore } from "../../../store";
import shallow from 'zustand/shallow';
import { ScrollRef } from "../../../store/types";

const SectionHeader = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    let sectionHref = subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
    if (sectionHref[sectionHref.length -1] === '-'){
        sectionHref = sectionHref.slice(0, sectionHref.length - 1)
    }


    return (
        <div>
            <a id={sectionHref} href={`#${sectionHref}`} >
                <h1 className="text-[2rem] mb-8 font-semibold">{subSectionName}</h1>
            </a>
        </div>
    )
}


export {
    SectionHeader
}