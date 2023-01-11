const CenterTextBlock = ({
    icon,
    children
}: {
    icon?: JSX.Element,
    children: string
}) => <div className="flex justify-center items-center my-12 text-[1.65rem] text-center lg:px-20 md:px-10 px-8 w-full">
        <div className="mr-3">
            {icon ?? null}
        </div>
        <p className="break-words">{children}</p>
    </div>


export {
    CenterTextBlock
}