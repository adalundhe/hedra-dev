import { NavItem } from "./types"
import { Menu } from '@headlessui/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { NavOpenContext } from "./NavProvider"
import { useContext } from "react"
import { useWindowDimensions } from '../../../hooks'
import { MobileNavItems } from './MobileNavItems'


const MobileNav = ({
    navItems
}: {
    navItems: NavItem[]
}) => {

    const { width } = useWindowDimensions();
    const { isOpen, setIsOpen } = useContext(NavOpenContext);

    return (
        <div 
            className={`w-full py-6 px-2 flex text-center text-[#2e3131] ${isOpen && width <= 768 ? 'h-screen fixed overflow-clip bg-[#eeeeee]' : ''}`}
        >

            <Menu as="div" className="relative inline-block text-left">
               {
                ({ open, close }) => (
                    <>
                        <Menu.Button className="inline-flex justify-center rounded px-2 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-7">
                            {
                                !isOpen ?
                                <AiOutlineMenu className="text-[3rem]" onClick={() => setIsOpen(!isOpen)}/> :  
                                <GrClose className="text-[3rem]" onClick={() => setIsOpen(!isOpen)}/>
                            }
                        </Menu.Button>
                        <MobileNavItems open={open} close={close} navItems={navItems} />
                    </>
                )
               }
            </Menu>
        </div>
    )
}


export {
    MobileNav
}