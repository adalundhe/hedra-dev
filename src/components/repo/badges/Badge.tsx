const Badge = ({ 
    label,
    value,
    badgeLink
}: { 
    label: string,
    value: string,
    badgeLink: string
}) =>  (
    <div className="mx-[20%]">
        <a href={badgeLink} className="w-100 h-fit text-[2vmin] text-center font-rany subpixel-antialiased">
            <p className="bg-[#2e3131]/70 w-full flex justify-center items-center text-[#eeeeee] shadow-2xl rounded-sm">{label}</p>
            <p className="w-full flex justify-center items-center bg-[#eeeeee]">{value}</p>
        </a>
    </div>
)

export {
    Badge
}