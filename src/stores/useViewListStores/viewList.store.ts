import { expenditureListItem, scheduleListItem } from "src/types";
import { create } from "zustand";

interface ViewListStore {
    scheduleListItemViewList: scheduleListItem[];
    setScheduleListItemViewList: (scheduleListItemViewList: scheduleListItem[]) => void;
    expenditureViewList: expenditureListItem[];
    setExpenditureViewList: (expenditureViewList: expenditureListItem[]) => void;
}

const useViewListStore = create<ViewListStore>((set) => ({
    scheduleListItemViewList: [],
    setScheduleListItemViewList: (scheduleListItemViewList: scheduleListItem[]) => set((state) => ({ ...state, scheduleListItemViewList })),
    expenditureViewList: [],
    setExpenditureViewList: (expenditureViewList: expenditureListItem[]) => set((state) => ({ ...state, expenditureViewList })),
}));

export default useViewListStore;
