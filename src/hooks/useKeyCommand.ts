import { useEffect, useCallback, useState, ChangeEvent, useRef } from "react";


const useKeyCommand = ({
     command,
     callback
}: {
    command: string[],
    callback(): void
}) => {

    const pressed = useRef<string[]>([])

    const handleKeyPress = useCallback((event: KeyboardEvent) => {

        if (pressed.current.indexOf(event.key) < 0 && command.includes(event.key)){
            pressed.current.push(event.key)
        }

        if (pressed.current.length === command.length){
            event.preventDefault();
            callback()
        }

      }, []);

    const handleKeyRelease = useCallback((event: KeyboardEvent) => {

        if (pressed.current.includes(event.key)){
            pressed.current.splice(pressed.current.indexOf(event.key));
        }
    }, [])
    
    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('keyup', handleKeyRelease);
        };
    }, [handleKeyPress]);

    return pressed;
}


export {
    useKeyCommand
}