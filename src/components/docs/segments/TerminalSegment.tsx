
import Terminal, { ColorMode, TerminalOutput } from '@shapes-org/react-terminal-ui';
import { useInView } from 'react-intersection-observer';
import { Transition } from "@headlessui/react";


const TerminalSegment = ({
    command
}: {
    command: string
}) => {

    const { ref, inView } = useInView();


  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className='font-sans text-left text-base flex mt-8 h-full' ref={ref}>
        <div className="h-[100%] w-[100%] flex items-center justify-center" >
            <Terminal colorMode={ ColorMode.Dark} onInput={null}>
                    <TerminalOutput>
                    <div className='terminal-command-segment-wrapper'>
                        <p className='terminal-segment pl-[2%]'>{command}</p>
                    </div>
                </TerminalOutput>
            </Terminal>
        </div>
    </div>
  )
};


export {
    TerminalSegment
}