import { RefObject } from 'react';
import create from 'zustand';


export interface ScrollState {
    scrollRef?: RefObject<HTMLElement>;
    scrollDirection: string;
    lastScrollY: number;
    scrollThreshold: number;
    setScrollRef: (updatedScrollRef: RefObject<HTMLElement>) => void;
    setScrollDirection: (updatedScrollDirection: string) => void;
    setLastScrollY: (updatedScrollY: number) => void;
    setScrollThreshold: (updatedScrollThreshold: number) => void;
}


const useScrollStore = create<ScrollState>()((set) => ({
    scrollRef: undefined,
    scrollDirection: 'none',
    lastScrollY: 0,
    scrollThreshold: 0,
    setScrollRef: (updatedScrollRef) => set(() => ({ scrollRef: updatedScrollRef })),
    setScrollDirection: (updatedScrollDirection) => set(() => ({ scrollDirection: updatedScrollDirection })),
    setLastScrollY: (updatedScrollY) => set(() => ({ lastScrollY: updatedScrollY })),
    setScrollThreshold: (updatedScrollThreshold) => set(() => ({ scrollThreshold: updatedScrollThreshold }))
}));


export {
    useScrollStore
}