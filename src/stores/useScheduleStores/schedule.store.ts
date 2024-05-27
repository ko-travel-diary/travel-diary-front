import { expendList, scheduleList } from "src/types";
import { create } from "zustand";

interface Schedule {
    travelSchedulePeople: number,
    setTravelSchedulePeople: (travelSchedulePeople: number) => void,
    travelScheduleTotalMoney: number,
    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => void,
    expenditureListItem: expendList[],
    setExpenditureListItem: (expenditureListItem: expendList[]) => void,
    scheduleListItem: scheduleList[],
    setScheduleListItem: (scheduleListItem: scheduleList[]) => void
}

const useScheduleStore = create<Schedule>(set => ({
    travelSchedulePeople: 0,
    travelScheduleTotalMoney: 0,
    expenditureListItem: [],
    scheduleListItem: [],

    setTravelSchedulePeople: (travelSchedulePeople: number) => set(state => ({...state, travelSchedulePeople})),

    setTravelScheduleTotalMoney: (travelScheduleTotalMoney: number) => set(state => ({...state, travelScheduleTotalMoney})),

    setExpenditureListItem: (expenditureListItem: expendList[]) => set(state => ({...state, expenditureListItem})),

    setScheduleListItem: (scheduleListItem: scheduleList[]) => set(state => ({...state, scheduleListItem})),
}))

export default useScheduleStore;