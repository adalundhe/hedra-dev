import { useNewsStore } from "../store"
import { NewsPost } from "../store/types";
import { NewsPostCard } from "./cards";
import { Footer } from "./footer";


const NewsPageView = () => {

    const posts = useNewsStore((state) => state.posts);
 
    return (
        <>
        <div className={`grid grid-cols-[auto] overflow-x-hidden mt-0 h-full mt-10`}>
            <main className="bg-[#eeeeee] min-w-0 h-full text-[#2e3131]">

                <div className="font-rany w-full flex flex-col items-center py-24 text-center">
                    <h1 className="text-3xl font-semibold">News</h1>
                    <p className="my-2 text-md text-[#2e3131]/70">The latest on Hedra.</p>
                </div>
                <div className="w-full break-words block h-full">
                {
                    posts.map((post: NewsPost, idx: number) => 
                        <div key={`${post.title.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')}-${idx}`}>
                            <NewsPostCard post={post}/>
                        </div>
                    )
                }
                </div>

            <Footer />
            </main>
        </div>
        </>
    )
}

export {
    NewsPageView
}