import { create } from "zustand";

interface SearchAddressStore {
    searchAddress: string;
    setSearchAddress: (searchWord: string) => void;
}

const useSearchAddressStore = create<SearchAddressStore>((set) => ({
    searchAddress: "",
    setSearchAddress: (searchWord: string) => set({ searchAddress: searchWord }),
}));

export default useSearchAddressStore;
