import { ExpenditureList, ScheduleList } from "src/types";
import { create } from "zustand";

interface ViewListStore {
    scheduleListItemViewList: ScheduleList[];
    setScheduleListItemViewList: (scheduleListItemViewList: ScheduleList[]) => void;
    expenditureViewList: ExpenditureList[];
    setExpenditureViewList: (expenditureViewList: ExpenditureList[]) => void;
}

const useViewListStore = create<ViewListStore>((set) => ({
    scheduleListItemViewList: [],
    setScheduleListItemViewList: (scheduleListItemViewList: ScheduleList[]) => set((state) => ({ ...state, scheduleListItemViewList })),
    expenditureViewList: [],
    setExpenditureViewList: (expenditureViewList: ExpenditureList[]) => set((state) => ({ ...state, expenditureViewList })),
}));

export default useViewListStore;
