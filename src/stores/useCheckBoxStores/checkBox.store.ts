import { create } from "zustand";

interface CheckBoxStore {
    tourCheckStatus: boolean,
    setTourCheckStatus: (tourCheckStatus: boolean) => void, 
    restCheckStatus: boolean,
    setRestCheckStatus: (restCheckStatus: boolean) => void, 
}

const useCheckBoxStore = create<CheckBoxStore>(set => ({
    tourCheckStatus: true,
    setTourCheckStatus: (tourCheckStatus: boolean) => set(state => ({...state, tourCheckStatus})),
    restCheckStatus: false,
    setRestCheckStatus: (restCheckStatus: boolean) => set(state => ({...state, restCheckStatus}))
}));

export default useCheckBoxStore;