import { expenditureList, scheduleList } from "src/types";
import { create } from "zustand";

interface ViewListStore {
    scheduleListItemViewList: scheduleList[];
    setScheduleListItemViewList: (scheduleListItemViewList: scheduleList[]) => void;
    expenditureViewList: expenditureList[];
    setExpenditureViewList: (expenditureViewList: expenditureList[]) => void;
}

const useViewListStore = create<ViewListStore>((set) => ({
    scheduleListItemViewList: [],
    setScheduleListItemViewList: (scheduleListItemViewList: scheduleList[]) => set((state) => ({ ...state, scheduleListItemViewList })),
    expenditureViewList: [],
    setExpenditureViewList: (expenditureViewList: expenditureList[]) => set((state) => ({ ...state, expenditureViewList })),
}));

export default useViewListStore;
