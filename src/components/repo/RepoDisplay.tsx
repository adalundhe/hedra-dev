import { BadgeDisplay } from "./badges"
import { InstallCommandText } from "./InstallCommandText"

const RepoDisplay = () => <div className="h-screen flex flex-col items-center justify-center my-10">
<InstallCommandText />
{/* <div className="flex justify-center">
    <BadgeDisplay />
</div> */}
</div>


export {
    RepoDisplay
}