import { RefObject } from 'react';
import { create } from 'zustand';


export interface ScrollState {
    scrollRef?: RefObject<HTMLElement>;
    navScrollRef?: RefObject<HTMLElement>;
    scrollDirection: string;
    lastScrollY: number;
    lastDirectionScrollY: number;
    scrollThreshold: number;
    clickedScroll: boolean;
    scrollTimer: NodeJS.Timeout | null;
    docsNavTimer: NodeJS.Timeout | null;
    showMobileDocsNav: boolean;
    mobileLastScrollY: number;
    setScrollRef: (updatedScrollRef: RefObject<HTMLElement>) => void;
    setScrollDirection: (updatedScrollDirection: string) => void;
    setLastScrollY: (updatedScrollY: number) => void;
    setScrollThreshold: (updatedScrollThreshold: number) => void;
    setClickedScroll: (updatedClickedScroll: boolean) => void;
    setScrollTimer: (updatedTimer: NodeJS.Timeout | null) => void;
    setLastDirectionScrollY: (updatedScrollY: number) => void;
    setShowMobileDocsNav: (updatedShowState: boolean) => void;
    setMobileLastScrollY: (updatedScroll: number) => void;
    setDocsNavTimer: (updatedTimer: NodeJS.Timeout | null) => void;
    setNavScrollRef: (updatedRef: RefObject<HTMLElement>) => void;
}


const useScrollStore = create<ScrollState>()((set) => ({
    scrollRef: undefined,
    scrollDirection: 'none',
    lastScrollY: 0,
    scrollThreshold: 0,
    clickedScroll: false,
    scrollTimer: null,
    lastDirectionScrollY: 0,
    showMobileDocsNav: true,
    mobileLastScrollY: 0,
    docsNavTimer: null,
    navScrollRef: undefined,
    setScrollRef: (updatedScrollRef) => set(() => ({ scrollRef: updatedScrollRef })),
    setScrollDirection: (updatedScrollDirection) => set(() => ({ scrollDirection: updatedScrollDirection })),
    setLastScrollY: (updatedScrollY) => set(() => ({ lastScrollY: updatedScrollY })),
    setScrollThreshold: (updatedScrollThreshold) => set(() => ({ scrollThreshold: updatedScrollThreshold })),
    setClickedScroll: (updatedClickedScroll) => set(() => ({ clickedScroll: updatedClickedScroll })),
    setScrollTimer: (updatedTimer) => set(() => ({ scrollTimer: updatedTimer })),
    setLastDirectionScrollY: (updatedScrollY) => set(() => ({ lastDirectionScrollY: updatedScrollY })),
    setShowMobileDocsNav: (updatedShowState) => set(() => ({ showMobileDocsNav: updatedShowState })),
    setMobileLastScrollY: (updatedScroll) => set(() => ({ mobileLastScrollY: updatedScroll })),
    setDocsNavTimer: (updatedTimer) => set(() => ({ scrollTimer: updatedTimer })),
    setNavScrollRef: (updatedRef) => set(() => ({ navScrollRef: updatedRef }))
}));


export {
    useScrollStore
}