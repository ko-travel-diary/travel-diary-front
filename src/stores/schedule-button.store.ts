import { create } from "zustand";

interface ScheduleButtonStore {
    scheduleButtonStatus: boolean;
    setScheduleButtonStatus: (loginUserId: boolean) => void;
    scheduleRenderStatus: boolean;
    setScheduleRenderStatus: (loginUserId: boolean) => void;
}

const useScheduleButtonStore = create<ScheduleButtonStore>((set) => ({
    scheduleButtonStatus: false,
    setScheduleButtonStatus: (scheduleButtonStatus: boolean) => set((state) => ({ ...state, scheduleButtonStatus })),
    scheduleRenderStatus: false,
    setScheduleRenderStatus: (scheduleRenderStatus: boolean) => set((state) => ({ ...state, scheduleRenderStatus })),
}));

export default useScheduleButtonStore;
