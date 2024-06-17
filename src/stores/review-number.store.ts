import { create } from "zustand";

interface ReviewNumber {
    updateReviewNumber: number | string;
    setUpdateReviewNumber: (updateReviewNumber: number | string) => void;
}

const useReviewNumberStore = create<ReviewNumber>((set) => ({
    updateReviewNumber: 0,
    setUpdateReviewNumber: (updateReviewNumber: number | string) => set((state) => ({ ...state, updateReviewNumber })),
}));

export default useReviewNumberStore;
