import { NewsPost } from "../../store/types"
import Link from "next/link";
import { RxCaretRight } from 'react-icons/rx';

const NewsPostCard = ({
    post
}: {
    post: NewsPost
}) => {

    const postSlug = post.title.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
    return (
        <div className="font-rany hover:shadow-2xl w-full flex flex-col items-center py-10 border-y border-thin border-[#2e3131]/10">
            <div>
                <h1 className="text-3xl font-semibold">{post.title}</h1>
                <p className="my-2 text-sm text-[#2e3131]/70">{post.publishedDate}</p>
                <h3 className="mt-4 mb-2">{post.summary?.summaryIntro}</h3>
                <ul className="list-disc mx-10">
                    {
                        post.summary?.summaryItems.map((summaryItem: string, idx: number) => {

                            let itemSlug = summaryItem.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
                            if (itemSlug[itemSlug.length -1] === '-'){
                                itemSlug = itemSlug.slice(0, itemSlug.length - 1)
                            }

                            return (
                                <li key={`${postSlug}-summmary-item-${idx}`} className="py-1 text-md">
                                    <Link className="text-[#038aff]/90" href={`/news/${post.link}#${itemSlug}`}>
                                    {summaryItem}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="mt-10 text-[#038aff]/90 flex items-center">
                    <a href={`/news/${post.link}`}>
                        <p>Continue reading</p>
                    </a>
                    <RxCaretRight className="ml-1" />
                </div>
            </div>
        </div>

    )
}

export {
    NewsPostCard
}