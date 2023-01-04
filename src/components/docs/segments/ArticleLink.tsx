import Link from "next/link"


const ArticleLink = ({
    article,
    subsection,
    text
}: {
    article: string,
    subsection: string,
    text: string
}) => {

    let subSectionSlug = subsection?.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
    if (subSectionSlug[subSectionSlug.length -1] === '-'){
        subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
    }

    return (
        <Link href={`/docs/${article}#${subsection}`} className="text-[#038aff] hover:underline">{text}</Link> 
    )
}


export {
    ArticleLink
}