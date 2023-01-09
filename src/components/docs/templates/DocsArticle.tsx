import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../../../hooks";
import { useDocsStore } from "../../../store";
import shallow from 'zustand/shallow'

const DocsArticle = ({ children }: {children: JSX.Element}) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions()

    const { 
        subsections
    } = useDocsStore(useCallback((state) => ({
        subsections: state.selectedSubSections
    }), []), shallow)

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])


    return (
        <div className="max-w-6xl ml-0 2xl:mx-auto overflow-x-hidden">
            <div className="font-rany text-[18px] leading-[30px]">
                <div className="w-full">
                {
                cloneElement(children, {
                        subsections
                    })
                }
                </div>
            </div>  
        </div>
    )
}

export {
    DocsArticle
}