import { useRouter } from 'next/router'


const NavItem = ({ 
    navText,
    navLink
}: {
    navText: string,
    navLink: string
}) => {
    const router = useRouter()
    
    return (
        <div className='w-100 py-8'>
            <button 
                className='w-100 text-xl lowercase font-monserrat hover:underline'
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