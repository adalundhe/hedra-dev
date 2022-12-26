import { Fragment, useEffect } from "react"
import { Menu } from '@headlessui/react'
import { Transition } from "@headlessui/react"
import { NavOpenContext } from "./NavProvider"
import { useContext } from "react"
import { useWindowDimensions } from '../../hooks'
import Link from "next/link"
import { NavItem } from "./types"


const MobileNavItems = ({ 
    open,
    close,
    navItems
 }: {
    open: boolean,
    close: () => void,
    navItems: NavItem[]
 }) => {
    
    const { width } = useWindowDimensions();
    const { isOpen, setIsOpen } = useContext(NavOpenContext);

    useEffect(() => {
        if (width > 768){
            close()
            setIsOpen(false)
        }
    }, [width])

    return (
        <Transition
            as={Fragment}
            show={open && width <= 768}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items static>
                <div className="w-full h-screen bg-[#eeeeee] flex flex-col px-8">
                {
                    navItems.map(navItem => 
                        <Menu.Item key={navItem.key}>
                            <div className="py-10 font-rany hover:bold hover:text-[#038aff] text-2xl">
                                <Link href={navItem.navLink}>{navItem.navText}</Link>
                            </div>
                        </Menu.Item>    
                    )
                }
                </div>
            </Menu.Items>
        </Transition>
    )
 }


 export {
    MobileNavItems
 }