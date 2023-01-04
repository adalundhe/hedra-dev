import Link from 'next/link'


const NavItem = ({ 
    navText,
    navLink,
    navTarget
}: {
    navText: string,
    navLink: string,
    navTarget: string
}) => {
    const externalLink = navLink.startsWith('https')
    return (
        <div className='w-100 py-8 flex justify-center text-center items-center'>
            { externalLink ?
                <a target={navTarget} rel="noopener noreferrer" href={navLink}  className="w-100 text-lg font-rany hover:bold hover:text-[#038aff]/70" >
                    {navText}
                </a> :
                <Link href={navLink} className="w-100 text-lg font-rany hover:bold hover:text-[#038aff]/90" target={navTarget}>
                {navText}
                </Link>
                
            }

        </div>
    )
}

export {
    NavItem
}