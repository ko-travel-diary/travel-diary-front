import { create } from "zustand";

interface ButtonStatusStore {
    buttonStatus: boolean;
    setButtonStatus: (status: boolean) => void;
}

const useButtonStatusStore = create<ButtonStatusStore>((set) => ({
    buttonStatus: false,
    setButtonStatus: (status: boolean) => set({ buttonStatus: status }),
}));

export default useButtonStatusStore;
