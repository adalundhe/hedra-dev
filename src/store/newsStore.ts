
import create from 'zustand'
import { NewsPost } from './types';


export interface NewsState {
    selectedPost: string;
    posts: NewsPost[];
    setSelectedPost: (updatedPost: string) => void;
    setPosts: (updatedPosts: NewsPost[]) => void;
}

const useNewsStore = create<NewsState>()((set) => {

    const posts: NewsPost[] = [
        {
            title: "Hedra 0.6.21 released",
            link: "hedra-0-6-21",
            publishedDate: "Tuesday, Jan 3rd 2022",
            summary: {
                summaryIntro: "Hedra 0.6.21 marks the public alpha release of local functionality, including:",
                summaryItems: [
                    "New @channel hook",
                    "New @event hook",
                    "New @context hook",
                    "New @restore hook",
                    "Introduction of Hedra logger system",
                    "Starter graph generator CLI",
                    "Projects CLI"
                ]
            }
        }
    ]

    return ({
        selectedPost: posts.at(0)?.title as string,
        posts: posts,
        setSelectedPost: (updatedPost) => set(() => ({ selectedPost: updatedPost })),
        setPosts: (updatedPosts) => set(() => ({ posts: updatedPosts }))
    })
});


export {
    useNewsStore
}