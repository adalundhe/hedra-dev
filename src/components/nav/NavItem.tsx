import Link from 'next/link'


const NavItem = ({ 
    navText,
    navLink,
}: {
    navText: string,
    navLink: string
}) => {
    
    return (
        <div className='w-100 py-8 flex justify-center text-center'>
            {
                <Link href={navLink} className="w-100 text-2xl font-rany hover:bold hover:text-[#038aff]">
                {navText}
                </Link>
            }

        </div>
    )
}

export {
    NavItem
}