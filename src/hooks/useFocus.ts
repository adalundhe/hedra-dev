import { useState, useRef } from "react";


const useFocus = <T extends HTMLElement>() => {

    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<T>(null)


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