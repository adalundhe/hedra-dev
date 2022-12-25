const Badge = ({ 
    badgeImageURL,
    badgeLink, 
    altText 
}: { 
    badgeImageURL: string,
    badgeLink: string,
    altText: string, 
}) =>  (
    <a href={badgeLink} className="w-100 h-[1.5rem]">
        <img src={badgeImageURL} alt={altText} className="w-[100%] object-fill h-[100%]"/>
    </a>
)

export {
    Badge
}