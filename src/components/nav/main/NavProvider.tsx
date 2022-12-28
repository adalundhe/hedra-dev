
import { createContext, useState } from "react"



const NavOpenContext = createContext({
    isOpen: false,
    setIsOpen: (openState: boolean): void => undefined
});


const MobileNavView = ({
    children
}: {
    children: JSX.Element
}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavOpenContext.Provider value={{
            isOpen: isOpen,
            setIsOpen: setIsOpen
        }}>
            {children}
        </NavOpenContext.Provider>
    )
}


export {
    NavOpenContext,
    MobileNavView
}