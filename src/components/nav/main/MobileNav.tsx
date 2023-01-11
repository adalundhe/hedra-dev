import { NavItem } from "./types"
import { Menu } from '@headlessui/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { NavOpenContext } from "./NavProvider"
import { useContext } from "react"
import { useWindowDimensions } from '../../../hooks'
import { MobileNavItems } from './MobileNavItems'
import Link from "next/link"


const MobileNav = ({
    navItems
}: {
    navItems: NavItem[]
}) => {

    const { width } = useWindowDimensions();
    const { isOpen, setIsOpen } = useContext(NavOpenContext);

    return (
        <div 
            className={`w-full py-4 px-2 flex text-center text-[#2e3131] ${isOpen && width <= 768 ? 'h-screen bg-[#eeeeee]' : ''}`}
        >

            <Menu as="div" className={`relative inline-block text-left w-full ${isOpen && width <= 768 ? 'h-screen' : ''}`}>
               {
                ({ open, close }) => (
                    <>
                        <div className="grid grid-cols-4 w-full">
                            <Menu.Button className="inline-flex justify-center rounded px-2 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-7">
                                {
                                    !isOpen ?
                                    <AiOutlineMenu className="text-[3rem]" onClick={() => setIsOpen(true)}/> :  
                                    <GrClose className="text-[3rem]" onClick={() => setIsOpen(false)}/>
                                }
                            </Menu.Button>
                            <div className='col-span-2 h-full w-full md:hidden flex items-center justify-center font-monserrat uppercase pr-4'>
                                <Link href="/" className='flex items-center'>
                                    <p className='ml-2 text-2xl'>Hedra</p>
                                </Link>
                            </div>
                        </div>
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