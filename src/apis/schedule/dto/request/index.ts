import { ExpenditureListItem, ScheduleListItem } from "src/types";

export interface PostScheduleRequestDto{
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureListItem: ExpenditureListItem[];
    scheduleListItem: ScheduleListItem[];
}

export interface PatchScheduleRequestDto{
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureListItem: ExpenditureListItem[];
    scheduleListItem: ScheduleListItem[];
}