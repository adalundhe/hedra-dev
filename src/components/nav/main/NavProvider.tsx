
import { createContext, useState } from "react"



const NavOpenContext = createContext({
    isOpen: false,
    setIsOpen: (openState: boolean): void => undefined,
    docsNavOpen: false,
    setDocsNavOpen: (openState: boolean): void => undefined
});


const MobileNavView = ({
    children
}: {
    children: JSX.Element
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [docsNavOpen, setDocsNavOpen] = useState(false);

    return (
        <NavOpenContext.Provider value={{
            isOpen: isOpen,
            setIsOpen: setIsOpen,
            docsNavOpen: docsNavOpen,
            setDocsNavOpen: setDocsNavOpen
        }}>
            {children}
        </NavOpenContext.Provider>
    )
}


export {
    NavOpenContext,
    MobileNavView
}