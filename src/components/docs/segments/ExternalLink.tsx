import Link from "next/link"


const ExternalLink = ({
    link,
    text
}: {
    link: string,
    text: string
}) => {

    return (
        <a 
            href={link} 
            className="text-[#038aff] hover:underline"
            target="_blank"
            rel="noopener noreferrer" 
        >{text}</a> 
    )
}


export {
    ExternalLink
}