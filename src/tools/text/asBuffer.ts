const asBuffer = (
    source: string
) => source.split("\n")
        .map(line => line
            .split("")
            .map(_ => "")
            .join("")
        )
        .join("\n")


export {
    asBuffer
}