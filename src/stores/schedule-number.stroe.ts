import { create } from "zustand";

interface ScheduleNumber {
    travelScheduleNumber: number;
    setTravelScheduleNumber: (travelScheduleNumber: number) => void;
}

const useScheduleNumberStore = create<ScheduleNumber>((set) => ({
    travelScheduleNumber: 0,
    setTravelScheduleNumber: (travelScheduleNumber: number) => set((state) => ({ ...state, travelScheduleNumber })),
}));

export default useScheduleNumberStore;
