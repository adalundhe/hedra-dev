import { useRef } from 'react'
import { NavItem } from './NavItem'
import { MobileNav } from './MobileNav'
import Link from 'next/link'
import { AnnouncementBanner } from '../../banners'


const NavBar = () => {

    const navItems = useRef([
        {
            navText: "Docs",
            navLink: "/docs/Introduction#welcome",
            key: "docs-page-link",
            navTarget: ""
        },
        {
            navText: "Github",
            navLink: "https://github.com/scorbettUM/hedra",
            key: "github-page-link",
            navTarget: "_blank"
        },
        {
            navText: "News",
            navLink: "/news",
            key: "news-page-link",
            navTarget: ""
        },
        {
            navText: "About",
            navLink: "/about",
            key: "about-page-link",
            navTarget: ""
        }
    ]);


    return (
        <header 
            className='w-full sticky top-0 bg-[#eeeeee]/50 shadow-lg'
        >
            <div className='flex flex-col justify-center items-center w-full'>
            <AnnouncementBanner />
            <div className='w-full md:max-w-7xl md:px-5'>
                <div className='max-w-6xl md:mx-auto '>
                    <div className='flex items-center w-full'>
                        <div className='h-full w-fit md:flex hidden mr-10 items-center font-monserrat uppercase'>
                            <Link href="/" className='flex items-center'>
                                <p className='ml-2 text-2xl'>Hedra</p>
                            </Link>
                        </div>
                        <div className='h-full w-1/3 hidden md:grid grid-cols-4 h-[97px] gap-20 ml-10'>
                            {
                                navItems.current.map(navItem => {
                                    const { navText, navLink, key, navTarget } = navItem;
                                    return (
                                        <div key={key}>
                                            <NavItem 
                                                navLink={navLink}
                                                navText={navText}
                                                navTarget={navTarget}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='h-full w-full md:hidden h-full opacity-100 bg-[#eeeeee]'>
                    <MobileNav navItems={navItems.current} />
                </div>
            </div>
            </div>
        </header> 
    )
}


export {
    NavBar
}