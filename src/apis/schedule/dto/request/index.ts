import { expenditureListItem, scheduleListItem } from "src/types";

export interface PostScheduleRequestDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureListItem: expenditureListItem[];
    scheduleListItem: scheduleListItem[];
}

export interface PatchScheduleRequestDto {
    travelSchedulePeople: number;
    travelScheduleTotalMoney: number;
    travelScheduleName: string;
    expenditureListItem: expenditureListItem[];
    scheduleListItem: scheduleListItem[];
}
