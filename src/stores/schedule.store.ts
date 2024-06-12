import { ExpenditureList, ScheduleList } from "src/types";
import { create } from "zustand";

interface Schedule {
    travelSchedulePeople: number;
    setTravelSchedulePeople: (travelSchedulePeople: number) => void;
    travelScheduleTotalMoney: number;
    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => void;
    expenditureListItem: ExpenditureList[];
    setExpenditureListItem: (expenditureListItem: ExpenditureList[]) => void;
    scheduleListItem: ScheduleList[];
    setScheduleListItem: (scheduleListItem: ScheduleList[]) => void;
}

const useScheduleStore = create<Schedule>((set) => ({
    travelSchedulePeople: 0,
    travelScheduleTotalMoney: 0,
    expenditureListItem: [],
    scheduleListItem: [],

    setTravelSchedulePeople: (travelSchedulePeople: number) => set((state) => ({ ...state, travelSchedulePeople })),

    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => set((state) => ({ ...state, travelScheduleTotalMoney })),

    setExpenditureListItem: (expenditureListItem: ExpenditureList[]) => set((state) => ({ ...state, expenditureListItem })),

    setScheduleListItem: (scheduleListItem: ScheduleList[]) => set((state) => ({ ...state, scheduleListItem })),
}));

export default useScheduleStore;
