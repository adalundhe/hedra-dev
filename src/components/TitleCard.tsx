import { Transition } from "@headlessui/react"


const TitleCard = () => {


    return (
            <div className="w-screen h-screen flex justify-center items-center bg-transparent text-center font-monserrat text-[#2e3131] gap-20 md:bg-[url('../../public/hedra_logo.png')] bg-contain bg-no-repeat bg-center md:mt-20">
          
                <Transition
                        appear={true}
                        show={true}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                            <h1 className="2xl:text-[12rem] xl:text-9xl text-[6rem] tracking-wide uppercase w-100">Hedra</h1>
                            <h3 className="text-5xl w-100 font-rany">Test at scale</h3>
                                
                    </Transition>
            </div>

    )
}

export {
    TitleCard
}