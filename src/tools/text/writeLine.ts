const writeLine = ({
    text,
    targetText,
    setTargetText
}: {
    text: string,
    targetText: string,
    setTargetText(target: string): void
}) => {

    let sliceEnd = 1;

    const interval = setInterval(() => {
        if(targetText.length <= text.length){
            setTargetText(text.slice(0, sliceEnd))
            sliceEnd += 1;
        
        } else {
            clearInterval(interval);
        }
    }, 30)


}

export {
    writeLine
}