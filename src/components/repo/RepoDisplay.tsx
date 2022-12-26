import { BadgeDisplay } from "./badges"
import { InstallCommandText } from "./InstallCommandText"

const RepoDisplay = () => <div className="h-[25vh] grid grid-rows-2 auto-rows-min my-10">
<InstallCommandText />
<div className="flex justify-center">
    <BadgeDisplay />
</div>
</div>


export {
    RepoDisplay
}