import { expendList, scheduleList } from "src/types";

export interface PostScheduleRequestDto{
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureListItem: expendList[];
    scheduleListItem: scheduleList[];
}

export interface PatchScheduleRequestDto{
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureListItem: expendList[];
    scheduleListItem: scheduleList[];
}