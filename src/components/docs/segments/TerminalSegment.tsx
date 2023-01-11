
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
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
        <Transition
            as='div'
            show={inView}
            className='w-full'
            enter="transition-opacity duration-[50ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-[50ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <Terminal colorMode={ ColorMode.Dark} onInput={null}>
                 <TerminalOutput>
                    <div className='terminal-command-segment-wrapper'>
                        <p className='terminal-segment pl-[2%]'>{command}</p>
                    </div>
                </TerminalOutput>
            </Terminal>
        </Transition>
        </div>
    </div>
  )
};


export {
    TerminalSegment
}