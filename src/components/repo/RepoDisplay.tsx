import { BadgeDisplay } from "./badges"
import { InstallCommandText } from "./InstallCommandText"

const RepoDisplay = () => <div className="w-100 flex justify-center items-center bg-[#2e3131] row-span-1 h-[100%] py-10">
    <div className="flex flex-col items-center justify-between md:py-10 w-full">
        <InstallCommandText />
        <BadgeDisplay />
    </div>
</div>


export {
    RepoDisplay
}