import Link from 'next/link'


const NavItem = ({ 
    navText,
    navLink,
}: {
    navText: string,
    navLink: string
}) => {
    
    return (
        <div className='w-100 py-8'>
            {
                <Link href={navLink} className="w-100 md:text-2xl text-3xl lowercase font-rany hover:bold hover:text-[#038aff]">
                {navText}
                </Link>
            }

        </div>
    )
}

export {
    NavItem
}