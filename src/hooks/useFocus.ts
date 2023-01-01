import { useState, useRef } from "react";


const useFocus = () => {

    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLDivElement>(null)


    document.addEventListener("mousedown", (event: MouseEvent) => {
    if (ref.current?.contains(event.target as HTMLElement)) {
        setIsFocused(true)
    } else {
        setIsFocused(false);
    }
    });

    return {
        ref,
        isFocused,
        setIsFocused
    }

}


export {
    useFocus
}