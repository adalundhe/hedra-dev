import { FaGithub, FaTwitter, FaPython } from "react-icons/fa";

const FooterLinksGrid = () => <footer className="grid grid-cols-3 w-3/4 text-center font-rany text-5xl py-10 gap-x-12 gap-y-8 max-w-7xl mx-auto">
    <div className="flex justify-center">
        <FaGithub color="#eeeeee" />
    </div>
    <div className="flex justify-center">
        <FaTwitter color="#eeeeee" />
    </div>
    <div  className="flex justify-center">
        <FaPython color="#eeeeee"/>
    </div>
</footer>

export {
    FooterLinksGrid
}