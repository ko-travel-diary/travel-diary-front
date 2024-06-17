import { Destination, Position } from "src/types";
import { create } from "zustand";

interface PathStore {
    path: Position[];
    setPath: (path: Position[]) => void;
}

const usePathStore = create<PathStore>((set) => ({
    path: [],
    setPath: (path: Position[]) => set((state) => ({ ...state, path })),
}));

export default usePathStore;
