import { FaGithub, FaTwitter, FaPython } from "react-icons/fa";

const FooterLinksGrid = () => <div className="h-full grid grid-cols-3 w-1/2 text-center font-rany text-5xl">
    <div className="flex justify-center items-center py-20">
        <FaGithub color="#eeeeee" />
    </div>
    <div className="flex justify-center items-center py-20">
        <FaTwitter color="#eeeeee" />
    </div>
    <div  className="flex justify-center items-center py-20">
        <FaPython color="#eeeeee"/>
    </div>
</div>

export {
    FooterLinksGrid
}