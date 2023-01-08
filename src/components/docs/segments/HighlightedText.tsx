const HighlightedText = ({
    children,
    color
}: {
    children: string,
    color?: string 
}) => {

    return (
        <div className={`text-[${color ?? '#2e3131'}] font-semibold inline-block mr-1`}>{children}</div>
    )
}

export {
    HighlightedText
}