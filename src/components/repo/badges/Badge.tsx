const Badge = ({ 
    badgeImageURL,
    badgeLink, 
    altText 
}: { 
    badgeImageURL: string,
    badgeLink: string,
    altText: string, 
}) =>  (
    <a href={badgeLink} className="h-full w-100">
        <img src={badgeImageURL} alt={altText} className="w-100 h-22"/>
    </a>
)

export {
    Badge
}