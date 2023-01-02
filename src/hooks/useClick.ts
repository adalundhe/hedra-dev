import { useState, useRef } from "react";


const useClick = () => {

    const clickRef = useRef<HTMLInputElement>(null)


    const onClick = () => {
        clickRef.current?.focus();
        clickRef.current?.click();
    };

    return {
        clickRef,
        onClick
    }

}


export {
    useClick
}