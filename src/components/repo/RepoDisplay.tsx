import { BadgeDisplay } from "./badges"
import { InstallCommandText } from "./InstallCommandText"

const RepoDisplay = () => <div className="w-100 h-full bg-[#2e3131] flex justify-center items-center shadow-2xl">
    <div className="grid grid-rows-2">
        <InstallCommandText />
        <BadgeDisplay />
    </div>
</div>


export {
    RepoDisplay
}