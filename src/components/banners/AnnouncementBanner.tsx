import getConfig from 'next/config'
import Link from 'next/link'

const { publicRuntimeConfig } = getConfig()


const AnnouncementBanner = () => <Link
    className='font-creato tracking-wide font-extralight w-screen flex justify-center items-center sticky top-0 bg-[#2e3131] hover:bg-[#2e3131]/80 cursor-pointer text-white font-rany text-md py-4 font-semibold'
    href={`/news/${publicRuntimeConfig.bannerAnnouncementLink}`}
>
    {publicRuntimeConfig.bannerAnnouncement}
</Link>


export {
    AnnouncementBanner
}