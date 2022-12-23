import { useRouter } from 'next/router'


const NavItem = ({ 
    navText,
    navLink,
}: {
    navText: string,
    navLink: string
}) => {
    const router = useRouter()
    
    return (
        <div className='w-100 py-8'>
            <button 
                className='w-100 md:text-2xl text-3xl lowercase font-rany hover:underline hover:text-[#14151a]'
                type="button" 
                onClick={() => router.push(navLink)}
            >
                {navText}
            </button>

        </div>
    )
}

export {
    NavItem
}