import { create } from "zustand";

interface SearchWordStore {
    searchWord: string;
    setSearchWord: (searchWord: string) => void;
}

const useSearchWordStore = create<SearchWordStore>(set => ({
    searchWord: '',
    setSearchWord: (searchWord: string) => set(state => ({ ...state, searchWord })),
}));

export default useSearchWordStore;