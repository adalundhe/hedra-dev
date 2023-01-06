import create from 'zustand';


export interface ScrollState {
    scrollDirection: string;
    lastScrollY: number;
    scrollThreshold: number
    setScrollDirection: (updatedScrollDirection: string) => void;
    setLastScrollY: (updatedScrollY: number) => void;
    setScrollThreshold: (updatedScrollThreshold: number) => void;
}


const useScrollStore = create<ScrollState>()((set) => ({
    scrollDirection: 'none',
    lastScrollY: 0,
    scrollThreshold: 10,
    setScrollDirection: (updatedScrollDirection) => set(() => ({ scrollDirection: updatedScrollDirection })),
    setLastScrollY: (updatedScrollY) => set(() => ({ lastScrollY: updatedScrollY })),
    setScrollThreshold: (updatedScrollThreshold) => set(() => ({ scrollThreshold: updatedScrollThreshold }))
}));


export {
    useScrollStore
}