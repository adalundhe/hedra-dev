import { AiFillWarning } from 'react-icons/ai'


const WarningSegment = ({
    text
}: {
    text: string
}) => <div className='flex md:flex-row flex-col items-center text-[#eeeeee] px-8 py-4 my-10 mx-10 bg-[#2e3131] rounded-sm'>
    <div className='mr-4 text-[3rem] my-4 md:my-0'>
        <AiFillWarning />
    </div>
    <p className='text-basic'>{text}</p>
</div>


export {
    WarningSegment
}