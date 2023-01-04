import { useContext } from "react"
import { ParticlesBackground } from './ParticlesBackground'
import { RepoDisplay } from "./repo"
import { TitleCard, DescriptionCard, FlippedDescriptionCard, TenantsCard } from "./cards"
import { NavOpenContext } from "./nav"
import { useWindowDimensions } from '../hooks'


const MainPageView = () => {

    const { isOpen } = useContext(NavOpenContext)
    const { width } = useWindowDimensions();

    return (
        !isOpen || width > 768 ? 
        <div className="w-screen">
            <ParticlesBackground />
            <TitleCard />
            <RepoDisplay />
            <DescriptionCard />
            <FlippedDescriptionCard />
            <div className="w-screen flex justify-center">
                <div className="border-t border-[#14151a] w-1/2"></div>
            </div>
            <TenantsCard />
        </div> : <div></div>
    )
}


export {
    MainPageView
}