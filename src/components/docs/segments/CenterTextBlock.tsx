const CenterTextBlock = ({
    icon,
    children
}: {
    icon?: JSX.Element,
    children: string
}) => <div className="flex justify-center items-center my-12 text-[1.65rem] text-center px-20">
        <div className="mr-3">
            {icon ?? null}
        </div>
        <p>{children}</p>
    </div>


export {
    CenterTextBlock
}