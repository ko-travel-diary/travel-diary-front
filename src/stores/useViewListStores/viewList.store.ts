import { expendList, scheduleList } from "src/types";
import { create } from "zustand";

interface ViewListStore {
    scheduleListItemViewList: scheduleList[],
    setScheduleListItemViewList: (scheduleListItemViewList: scheduleList[]) => void,
    expenditureViewList: expendList[],
    setExpenditureViewList: (expenditureViewList: expendList[]) => void
}

const useViewListStore = create<ViewListStore>(set => ({
    scheduleListItemViewList: [],
    setScheduleListItemViewList: (scheduleListItemViewList: scheduleList[]) => set(state => ({...state, scheduleListItemViewList})),
    expenditureViewList: [],
    setExpenditureViewList: (expenditureViewList: expendList[]) => set(state => ({...state, expenditureViewList}))
}));

export default useViewListStore;