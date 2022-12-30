import { useRef } from 'react'
import { NavItem } from './NavItem'
import { MobileNav } from './MobileNav'
import Link from 'next/link'



const NavBar = () => {

    const navItems = useRef([
        {
            navText: "Docs",
            navLink: "/docs",
            key: "docs-page-link"
        },
        {
            navText: "Github",
            navLink: "https://github.com/scorbettUM/hedra",
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
        <div 
            className='w-screen flex items-center sticky top-0 bg-[#eeeeee] shadow-lg'
        >
                <div className='h-full w-1/4 md:flex hidden pl-10 items-center font-monserrat uppercase'>
                    <Link href="/" className='flex items-center'>
                        <p className='ml-2 text-2xl'>Hedra</p>
                    </Link>
                </div>
                <div className='h-full w-1/2 hidden md:grid grid-cols-4 h-[97px]'>
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
                <div className='h-full w-screen grid grid-cols-4 md:hidden h-[97px] opacity-100 bg-[#eeeeee]'>
                    <MobileNav navItems={navItems.current} />
                    <div className='col-span-2 h-full w-full md:hidden flex items-center justify-center font-monserrat uppercase pr-4'>
                        <Link href="/" className='flex items-center'>
                            <img src='/hedra_logo.png' className='h-[45px] w-[45px]' />
                            <p className='ml-2'>Hedra</p>
                        </Link>
                    </div>
                </div>
        </div> 
    )
}


export {
    NavBar
}