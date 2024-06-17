import { Destination, MarkerOpen, Position } from "src/types";
import { create } from "zustand";

interface OpenListStore {
    openList: MarkerOpen[];
    setOpenList: (openList: MarkerOpen[]) => void;
}

const useOpenListStore = create<OpenListStore>((set) => ({
    openList: [],
    setOpenList: (openList: MarkerOpen[]) => set((state) => ({ ...state, openList })),
}));

export default useOpenListStore;
