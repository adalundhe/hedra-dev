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

        const keyName = event.key.toLocaleLowerCase()
        if (pressed.current.indexOf(keyName) < 0 && command.includes(keyName)){
            pressed.current.push(keyName)
        }

        if (pressed.current.length === command.length){
            event.preventDefault();
            callback()
        }

      }, []);

    const handleKeyRelease = useCallback((event: KeyboardEvent) => {

        const keyName = event.key.toLowerCase();
        if (pressed.current.includes(keyName)){
            pressed.current.splice(pressed.current.indexOf(keyName));
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