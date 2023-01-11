import { useState, useRef, useLayoutEffect } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


const TerminalSegment = ({
    command
}: {
    command: string
}) => {

    const { ref, inView } = useInView();


  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className='font-sans text-left text-base flex mt-8'>
        <div className="h-[100%] w-[100%] flex items-center justify-center" ref={ref}>
            {
                inView ?
                    <Terminal colorMode={ ColorMode.Dark} onInput={null}>
                        <TerminalOutput>
                        <div className='terminal-command-segment-wrapper'>
                            <p className='terminal-segment pl-[2%]'>{command}</p>
                        </div>
                    </TerminalOutput>
                    </Terminal>
                : <p></p>
            }
        </div>
    </div>
  )
};


export {
    TerminalSegment
}