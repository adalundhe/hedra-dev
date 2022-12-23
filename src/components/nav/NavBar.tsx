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
            navText: "Github",
            navLink: "/github",
            key: "github-page-link"

        },
        {
            navText: "Blog",
            navLink: "/blog",
            key: "blog-page-link"
        },
        {
            navText: "About",
            navLink: "/about",
            key: "about-page-link"
        }
    ]);

    return (
        <div className='w-full flex flex-col md:items-end items-center'>
            <div className='h-full grid grid-cols-4 gap-20 mx-20 mt-5 bg-[#eeeeee]'>
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
            <div className='md:border-b md:border-[#2e3131] w-1/4'></div>
        </div>
    )
}


export {
    NavBar
}