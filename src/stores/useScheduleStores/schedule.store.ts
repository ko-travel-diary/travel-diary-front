import { expenditureListItem, scheduleListItem } from "src/types";
import { create } from "zustand";

interface Schedule {
    travelSchedulePeople: number;
    setTravelSchedulePeople: (travelSchedulePeople: number) => void;
    travelScheduleTotalMoney: number;
    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => void;
    expenditureListItem: expenditureListItem[];
    setExpenditureListItem: (expenditureListItem: expenditureListItem[]) => void;
    scheduleListItem: scheduleListItem[];
    setScheduleListItem: (scheduleListItem: scheduleListItem[]) => void;
}

const useScheduleStore = create<Schedule>((set) => ({
    travelSchedulePeople: 0,
    travelScheduleTotalMoney: 0,
    expenditureListItem: [],
    scheduleListItem: [],

    setTravelSchedulePeople: (travelSchedulePeople: number) => set((state) => ({ ...state, travelSchedulePeople })),

    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => set((state) => ({ ...state, travelScheduleTotalMoney })),

    setExpenditureListItem: (expenditureListItem: expenditureListItem[]) => set((state) => ({ ...state, expenditureListItem })),

    setScheduleListItem: (scheduleListItem: scheduleListItem[]) => set((state) => ({ ...state, scheduleListItem })),
}));

export default useScheduleStore;
