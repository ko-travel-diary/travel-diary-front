import { expenditureList, scheduleList } from "src/types";
import { create } from "zustand";

interface Schedule {
    travelSchedulePeople: number;
    setTravelSchedulePeople: (travelSchedulePeople: number) => void;
    travelScheduleTotalMoney: number;
    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => void;
    expenditureListItem: expenditureList[];
    setExpenditureListItem: (expenditureListItem: expenditureList[]) => void;
    scheduleListItem: scheduleList[];
    setScheduleListItem: (scheduleListItem: scheduleList[]) => void;
}

const useScheduleStore = create<Schedule>((set) => ({
    travelSchedulePeople: 0,
    travelScheduleTotalMoney: 0,
    expenditureListItem: [],
    scheduleListItem: [],

    setTravelSchedulePeople: (travelSchedulePeople: number) => set((state) => ({ ...state, travelSchedulePeople })),

    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => set((state) => ({ ...state, travelScheduleTotalMoney })),

    setExpenditureListItem: (expenditureListItem: expenditureList[]) => set((state) => ({ ...state, expenditureListItem })),

    setScheduleListItem: (scheduleListItem: scheduleList[]) => set((state) => ({ ...state, scheduleListItem })),
}));

export default useScheduleStore;
