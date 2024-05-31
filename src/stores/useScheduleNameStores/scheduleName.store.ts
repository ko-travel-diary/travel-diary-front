import { create } from "zustand";

interface ScheduleName {
    travelScheduleName: string;
    setTravelScheduleName: (travelScheduleName: string) => void;
}

const useScheduleNameStore = create<ScheduleName>((set) => ({
    travelScheduleName: "",
    setTravelScheduleName: (travelScheduleName: string) => set((state) => ({ ...state, travelScheduleName })),
}));

export default useScheduleNameStore;
