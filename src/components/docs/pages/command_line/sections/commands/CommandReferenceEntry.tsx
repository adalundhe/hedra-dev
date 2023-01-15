import { CommandOptionalArgument, CommandReference, CommandRequiredArgument } from "../../../../../../store/types"
import { CodeSegmentCopyable, CodeShortSegment, TerminalSegment } from "../../../../segments"

const CommandReferenceEntry = ({
    command,
    description,
    requiredArguments,
    optionalArguments,
    exampleCommand,
    exampleOutput,
    commandIdx
}: CommandReference & {commandIdx: number}) => <div className="shadow-2xl flex flex-col mb-36">
    <div className="w-full border-b border-[#2e3131]/5 flex flex-col"></div>
    <div className="pb-8">
        <div className="w-full grid grid-cols-8">
            <h2 className="col-span-8">
                <CodeSegmentCopyable>{command}</CodeSegmentCopyable>
            </h2>
        </div>
        <div>
            {description}
        </div>
        {
            requiredArguments.length > 0 ?
            <div>
                <div className="mt-12">
                    <p className="text-3xl">
                        Required arguments
                    </p>
                </div>
                <div className="w-fit">
                    {
                        requiredArguments.map(({ name, description, valueType, example }: CommandRequiredArgument, idx: number) => 
                            
                            <div className="my-6 w-full flex flex-col" key={`command-required-argument-${commandIdx}-${idx}`}>
                            <div className="w-full grid grid-cols-8 pt-1 mt-1 border-t border-[#2e3131]/20 sm:text-xl text-[3.75vmin]">
                                <h2 className="col-span-2 py-2 my-1 border-t border-transparent pr-4">{name}</h2>
                                <p className="col-span-6 py-2 my-1 border-t border-transparent">{description}</p>
                            </div>
                            <div className="w-full grid grid-cols-8 sm:text-xl text-[3.75vmin]">
                                <p className="col-span-2 py-2 mt-1 border-t border-transparent"></p>
                                <p className="col-span-6 py-2 mt-1 border-t border-[#2e3131]/10">This argument takes a {valueType}</p>
                            </div>
                            <div className="w-full flex flex-col">
                                <p className="pt-2 mt-1 border-t border-transparent">
                                    For example:
                                </p>
                                <div>
                                    <CodeShortSegment size="medium">{`${name} ${example}`}</CodeShortSegment>
                                </div>
                                
                            </div>
                        </div>   
                        )
                    }
                </div>
            </div> : null
        }
        {
            optionalArguments.length > 0 ?
            <div>
                <div className={`mt-12 ${optionalArguments.length > 0 ? '' : 'flex flex-row items-end w-fit text-2xl'}`}>
                    <p className="text-3xl">
                        Optional arguments
                    </p>
                    <p className="ml-6">
                    {optionalArguments.length > 0 ? null : 'None'}
                    </p>
                </div>
                <div>
                    {
                        optionalArguments.map(({ name, description, example, valueType, defaultValue, isFlag }: CommandOptionalArgument, idx: number) => 
                            
                            <div className="my-6 w-full flex flex-col" key={`command-required-argument-${commandIdx}-${idx}`}>
                                <div className="w-full grid grid-cols-8 pt-1 mt-1 border-t border-[#2e3131]/20 sm:text-xl text-[3.75vmin]">
                                    <h2 className="col-span-2 py-2 my-1 border-t border-transparent pr-4">{name}</h2>
                                    <p className="col-span-6 py-2 my-1 border-t border-transparent">{description}</p>
                                </div>
                                <div className="w-full grid grid-cols-8 sm:text-xl text-[3.75vmin]">
                                    <p className="col-span-2 py-2 mt-1 border-t border-transparent"></p>
                                    <p className="col-span-6 py-2 mt-1 border-t border-[#2e3131]/10">This argument takes a {valueType}</p>
                                </div>
                                <div className="w-full grid grid-cols-8 sm:text-xl text-[3.75vmin]">
                                    <p className="col-span-2 py-2 mt-1 border-t border-transparent"></p>
                                    <div className="col-span-6 py-2 mt-1 border-t border-[#2e3131]/10 ">
                                        The default value is:
                                        <code className="tracking-wide font-thin p-0">{
                                            <p className="inline-block">
                                                {defaultValue}
                                            </p>
                                        }</code>
                                    </div>
                                </div>
                                <div className="w-full grid grid-cols-8 sm:text-xl text-[3.75vmin]">
                                    <p className="col-span-2 py-2 mt-1 border-t border-transparent"></p>
                                    <p className="col-span-6 py-2 mt-1 border-t border-[#2e3131]/10">This argument {isFlag ? 'is' : 'is not'} a flag</p>
                                    
                                </div>
                                <div className="w-full flex flex-col">
                                    <p className="pt-2 mt-1 border-t border-transparent">
                                        For example:
                                    </p>
                                    <div>
                                        <CodeShortSegment size="medium">{`${name} ${example}`}</CodeShortSegment>
                                    </div>
                                    
                                </div>
                            </div>    
                        )
                    }
                </div>
            </div> : null
        }
        <div className="mt-12">
            <p className="text-3xl">
                Example
            </p>
        </div>
        <div>
            <div className="my-6 text-2xl">
                Command:
            </div>
            <div>
                <CodeSegmentCopyable>{exampleCommand}</CodeSegmentCopyable>
            </div>
            <div className="my-6 text-2xl">
                Result:
            </div>
            <div>
                <TerminalSegment command={exampleOutput}/>
            </div>
        </div>
    </div>
</div>


export {
    CommandReferenceEntry
}