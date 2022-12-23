import { useRef } from 'react'
import { NavItem } from './NavItem'


const NavBar = () => {

    const navItems = useRef([
        {
            navText: "Docs",
            navLink: "/docs",
            key: "docs-page-link"
        },
        {
            navText: "Examples",
            navLink: "/examples",
            key: "examples-page-link"
        },
        {
            navText: "About",
            navLink: "/about",
            key: "about-page-link"
        }
    ]);

    return (
        <div className='w-100 flex flex-col items-end'>
            <div className='h-full grid grid-cols-3 gap-20 mx-20 mt-5'>
                {
                    navItems.current.map(navItem => {
                        const { navText, navLink, key } = navItem;
                        return (
                            <div key={key}>
                                <NavItem 
                                    navLink={navLink}
                                    navText={navText}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className='border-b border-[#2e3131] w-1/4'></div>
        </div>
    )
}


export {
    NavBar
}