import { RefObject } from 'react';
import create from 'zustand';


export interface ScrollState {
    scrollRef?: RefObject<HTMLElement>;
    scrollDirection: string;
    lastScrollY: number;
    lastDirectionScrollY: number;
    scrollThreshold: number;
    clickedScroll: boolean;
    scrollTimer: NodeJS.Timeout | null,
    setScrollRef: (updatedScrollRef: RefObject<HTMLElement>) => void;
    setScrollDirection: (updatedScrollDirection: string) => void;
    setLastScrollY: (updatedScrollY: number) => void;
    setScrollThreshold: (updatedScrollThreshold: number) => void;
    setClickedScroll: (updatedClickedScroll: boolean) => void;
    setScrollTimer: (updatedTimer: NodeJS.Timeout | null) => void;
    setLastDirectionScrollY: (updatedScrollY: number) => void;
}


const useScrollStore = create<ScrollState>()((set) => ({
    scrollRef: undefined,
    scrollDirection: 'none',
    lastScrollY: 0,
    scrollThreshold: 0,
    clickedScroll: false,
    scrollTimer: null,
    lastDirectionScrollY: 0,
    setScrollRef: (updatedScrollRef) => set(() => ({ scrollRef: updatedScrollRef })),
    setScrollDirection: (updatedScrollDirection) => set(() => ({ scrollDirection: updatedScrollDirection })),
    setLastScrollY: (updatedScrollY) => set(() => ({ lastScrollY: updatedScrollY })),
    setScrollThreshold: (updatedScrollThreshold) => set(() => ({ scrollThreshold: updatedScrollThreshold })),
    setClickedScroll: (updatedClickedScroll) => set(() => ({ clickedScroll: updatedClickedScroll })),
    setScrollTimer: (updatedTimer) => set(() => ({ scrollTimer: updatedTimer })),
    setLastDirectionScrollY: (updatedScrollY) => set(() => ({ lastDirectionScrollY: updatedScrollY }))
}));


export {
    useScrollStore
}