import { FooterLinksGrid } from "./FooterLinksGrid"


const Footer = () => <div className="h-full flex flex-col justify-center items-center bg-[#2e3131] shadow-2xl">
    <FooterLinksGrid />
    <div className="w-full text-center text-[#eeeeee]">
        <p className="font-rany py-10">
            Copyright © 2022 Sean Corbett. All rights reserved.
        </p>
    </div>
</div>


export {
    Footer
}